import { promises as fs } from 'fs'
import path from 'path'
import nodemailer from 'nodemailer'

export interface ContactRequestData {
  name: string
  email: string
  message: string
  submittedAt: string
  clientIp?: string
}

const CONTACT_STORAGE_DIR = process.env.CONTACT_STORAGE_DIR || path.join(process.cwd(), 'data')
const CONTACT_STORAGE_FILE = process.env.CONTACT_STORAGE_FILE || 'contact-requests.log'

export async function persistContactRequest(data: ContactRequestData): Promise<void> {
  const dir = CONTACT_STORAGE_DIR
  const filePath = path.join(dir, CONTACT_STORAGE_FILE)

  await fs.mkdir(dir, { recursive: true })

  const entry = JSON.stringify(data, null, 0)
  await fs.appendFile(filePath, `${entry}\n`, 'utf8')
}

export async function sendContactEmail(data: ContactRequestData): Promise<void> {
  const smtpHost = process.env.SMTP_HOST
  const smtpPort = parseInt(process.env.SMTP_PORT || '587')
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const contactEmailTo = process.env.CONTACT_EMAIL_TO || process.env.CONTACT_EMAIL
  const contactEmailFrom = process.env.CONTACT_EMAIL_FROM || process.env.CONTACT_EMAIL

  if (!smtpHost || !smtpUser || !smtpPass || !contactEmailTo) {
    console.warn('SMTP not configured, skipping email send')
    return
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  })

  const mailOptions = {
    from: contactEmailFrom,
    to: contactEmailTo,
    subject: `Contact Form: ${data.name}`,
    text: `
Name: ${data.name}
Email: ${data.email}
IP: ${data.clientIp || 'unknown'}
Submitted: ${data.submittedAt}

Message:
${data.message}
    `.trim(),
  }

  await transporter.sendMail(mailOptions)
}
