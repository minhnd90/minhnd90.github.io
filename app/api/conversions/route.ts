import { createHash } from 'node:crypto'
import { API_ERRORS, UserData, FacebookEvent, ConversionsPayload } from '../../../lib/constants'

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string, maxRequests: number = 10, windowMs: number = 60 * 1000): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (record.count >= maxRequests) {
    return false
  }

  record.count++
  return true
}

// Hash PII value with SHA256 as required by Meta
function hashPII(value: string): string {
  if (!value) return ''
  return createHash('sha256').update(value.trim().toLowerCase()).digest('hex')
}

// Hash user_data object: em, ph, ge, db, ln, fn, etc.
function hashUserData(userData: UserData): UserData {
  if (!userData || typeof userData !== 'object') return userData
  const piiFields: (keyof UserData)[] = [
    'em',
    'ph',
    'ge',
    'db',
    'ln',
    'fn',
    'ct',
    'st',
    'zp',
    'country'
  ]
  const hashed = { ...userData }

  for (const field of piiFields) {
    const value = hashed[field]
    if (value && typeof value === 'string') {
      (hashed as any)[field] = hashPII(value)
    }
  }

  return hashed
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function validateEvent(event: FacebookEvent): string[] {
  const errors: string[] = []

  if (!event || typeof event !== 'object') {
    errors.push('Event must be an object')
    return errors
  }

  if (!isNonEmptyString(event.event_name)) {
    errors.push('event_name is required')
  }

  if (event.event_time !== undefined && typeof event.event_time !== 'number') {
    errors.push('event_time must be a number when provided')
  }

  if (event.user_data !== undefined && typeof event.user_data !== 'object') {
    errors.push('user_data must be an object when provided')
  }

  return errors
}

export async function POST(req: Request) {
  try {
    // Rate limiting check
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
                     req.headers.get('x-real-ip') ||
                     'unknown'
    if (!checkRateLimit(clientIP)) {
      return new Response(JSON.stringify({ error: 'Too many requests' }), { status: 429 })
    }

    const body = await req.json()
    const pixelId = process.env.FB_PIXEL_ID
    const accessToken = process.env.FB_ACCESS_TOKEN
    const apiVersion = process.env.FB_API_VERSION || '16.0'
    const testEventCode = process.env.FB_TEST_EVENT_CODE

    if (!pixelId || !accessToken) {
      return new Response(
        JSON.stringify({ error: 'Missing FB_PIXEL_ID or FB_ACCESS_TOKEN' }),
        { status: 500 }
      )
    }

    if (!body || (typeof body !== 'object')) {
      return new Response(JSON.stringify({ error: API_ERRORS.invalidJson }), { status: 400 })
    }

    const payload: ConversionsPayload = { data: [] }

    const events: FacebookEvent[] = []

    if (Array.isArray(body.data)) {
      events.push(...body.data)
    } else if (Object.keys(body).length > 0) {
      // Accept single object as event if no wrapper data
      events.push(body)
    }

    if (events.length === 0) {
      return new Response(JSON.stringify({ error: API_ERRORS.noEventData }), { status: 400 })
    }

    const validationErrors = events.flatMap((event, idx) => {
      const errs = validateEvent(event)
      return errs.map((err) => `events[${idx}]: ${err}`)
    })

    if (validationErrors.length > 0) {
      return new Response(
        JSON.stringify({ error: API_ERRORS.validationFailed, details: validationErrors }),
        { status: 400 }
      )
    }

    payload.data = events.map((event) => ({
      ...event,
      user_data: event.user_data ? hashUserData(event.user_data) : undefined
    }))

    if (testEventCode) payload.test_event_code = testEventCode

    const endpoint = `https://graph.facebook.com/v${apiVersion}/${pixelId}/events`
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(payload)
    })

    const text = await res.text()
    const contentType = res.headers.get('content-type') || 'text/plain'

    return new Response(text, {
      status: res.status,
      headers: { 'Content-Type': contentType }
    })
  } catch (err: unknown) {
    console.error('Conversion API error:', err)
    return new Response(JSON.stringify({ error: API_ERRORS.internalServerError }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
