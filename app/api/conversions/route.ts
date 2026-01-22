import type { NextRequest } from 'next/server'
import { createHash } from 'crypto'

// Hash PII value with SHA256 as required by Meta
function hashPII(value: string): string {
  if (!value) return ''
  return createHash('sha256').update(value.trim().toLowerCase()).digest('hex')
}

// Hash user_data object: em, ph, ge, db, ln, fn, etc.
function hashUserData(userData: any): any {
  if (!userData) return userData
  const piiFields = ['em', 'ph', 'ge', 'db', 'ln', 'fn', 'ct', 'st', 'zp', 'country']
  const hashed = { ...userData }
  for (const field of piiFields) {
    if (hashed[field] && typeof hashed[field] === 'string') {
      hashed[field] = hashPII(hashed[field])
    }
  }
  return hashed
}

export async function POST(req: Request) {
  try {
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

    const endpoint = `https://graph.facebook.com/v${apiVersion}/${pixelId}/events?access_token=${accessToken}`

    const payload: any = {}
    // Accept either { data: [...] } or a single event object
    if (body && Array.isArray(body.data)) {
      payload.data = body.data.map((event: any) => ({
        ...event,
        user_data: hashUserData(event.user_data)
      }))
    } else if (body) {
      payload.data = [
        {
          ...body,
          user_data: hashUserData(body.user_data)
        }
      ]
    } else {
      return new Response(JSON.stringify({ error: 'No event data provided' }), {
        status: 400
      })
    }

    if (testEventCode) payload.test_event_code = testEventCode

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    const text = await res.text()
    const contentType = res.headers.get('content-type') || 'text/plain'
    return new Response(text, {
      status: res.status,
      headers: { 'Content-Type': contentType }
    })
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
    status: 500
    })
  }
}

export const runtime = 'edge'
