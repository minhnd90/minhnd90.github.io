import { FORM_VALIDATION, API_ERRORS } from '../../../lib/constants'
import { persistContactRequest, sendContactEmail, ContactRequestData } from '../../../lib/contact'
import DOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string, maxRequests: number = 5, windowMs: number = 15 * 60 * 1000): boolean {
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

export async function POST(req: Request) {
  // Get client IP (in production, this would come from headers like x-forwarded-for)
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'

  if (!checkRateLimit(ip)) {
    return new Response(JSON.stringify({ error: 'Too many requests from this IP, please try again later.' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const body = await req.json()
    const { name, email, message } = body || {}

    const issues: string[] = []

    if (!name || typeof name !== 'string' || !name.trim()) {
      issues.push(FORM_VALIDATION.nameRequired)
    }

    if (!email || typeof email !== 'string' || !email.trim()) {
      issues.push('Vui lòng nhập email')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      issues.push('Email không hợp lệ')
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      issues.push(FORM_VALIDATION.messageRequired)
    }

    if (issues.length > 0) {
      return new Response(JSON.stringify({ error: API_ERRORS.validationFailed, details: issues }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Sanitize the message to prevent XSS
    const window = new JSDOM('').window
    const DOMPurifyServer = DOMPurify(window as any)
    const sanitizedMessage = DOMPurifyServer.sanitize(message)

    const contactData: ContactRequestData = {
      name: name.trim(),
      email: email.trim(),
      message: sanitizedMessage,
      submittedAt: new Date().toISOString(),
      clientIp: ip,
    }

    try {
      await persistContactRequest(contactData)
    } catch (err) {
      console.error('Error persisting contact request:', err)
      return new Response(JSON.stringify({ error: API_ERRORS.internalServerError }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Send email if configured (don't fail request if email fails)
    try {
      await sendContactEmail(contactData)
    } catch (err) {
      console.error('Error sending contact email:', err)
      // Continue, as persistence succeeded
    }

    console.info('Contact request received', {
      timestamp: contactData.submittedAt,
      hasName: !!contactData.name,
      hasEmail: !!contactData.email,
      messageLength: contactData.message?.length || 0,
    })

    return new Response(JSON.stringify({ success: true, message: API_ERRORS.contactSuccess }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('Error in /api/contact', err)
    return new Response(JSON.stringify({ error: API_ERRORS.internalServerError }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
