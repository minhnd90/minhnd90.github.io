import { FORM_VALIDATION, API_ERRORS } from '../../../lib/constants'
import { persistContactRequest, sendContactEmail, ContactRequestData } from '../../../lib/contact'
import { checkRateLimit } from '../../../lib/rate-limit'
import { errorResponse, successResponse } from '../../../lib/api-responses'
import DOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'

export async function POST(req: Request) {
  // Get client IP (in production, this would come from headers like x-forwarded-for)
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'

  if (!checkRateLimit(ip)) {
    return errorResponse('Too many requests from this IP, please try again later.', 429)
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
      return errorResponse(API_ERRORS.validationFailed, 400)
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
      return errorResponse(API_ERRORS.internalServerError, 500)
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

    return successResponse({ success: true, message: API_ERRORS.contactSuccess })
  } catch (err) {
    console.error('Error in /api/contact', err)
    return errorResponse(API_ERRORS.internalServerError, 500)
  }
}
