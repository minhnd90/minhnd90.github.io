'use client'

import { useState, type FormEvent } from 'react'
import {
  Card,
  CardContent,
  Box,
  TextField,
  Button,
  Alert,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { FORM_VALIDATION } from '../../lib/constants'

interface ContactFormValues {
  name: string
  email: string
  message: string
}

interface ContactFormErrors {
  name?: string
  email?: string
  message?: string
  submit?: string
}

interface ContactFormProps {}

export default function ContactForm(_: ContactFormProps) {
  const [form, setForm] = useState<ContactFormValues>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [success, setSuccess] = useState('')

  const validate = () => {
    const nextErrors: ContactFormErrors = {}

    if (!form.name.trim()) nextErrors.name = FORM_VALIDATION.nameRequired
    if (!form.email.trim()) {
      nextErrors.email = FORM_VALIDATION.emailRequired
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = FORM_VALIDATION.emailInvalid
    }

    if (!form.message.trim()) nextErrors.message = FORM_VALIDATION.messageRequired

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSuccess('')
    setErrors((prev) => ({ ...prev, submit: undefined }))

    if (!validate()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => null)
        setErrors((prev) => ({
          ...prev,
          submit: payload?.error || FORM_VALIDATION.submitError,
        }))
      } else {
        setSuccess(FORM_VALIDATION.successMessage)
        setForm({ name: '', email: '', message: '' })
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        submit: FORM_VALIDATION.networkError,
      }))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card sx={{ mb: 4, borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
      <CardContent>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            label="Họ tên"
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            error={Boolean(errors.name)}
            helperText={errors.name}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            error={Boolean(errors.email)}
            helperText={errors.email}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Nội dung"
            multiline
            minRows={4}
            value={form.message}
            onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
            error={Boolean(errors.message)}
            helperText={errors.message}
            sx={{ mb: 2 }}
          />

          {errors.submit && <Alert severity="error" sx={{ mb: 2 }}>{errors.submit}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

          <Button type="submit" variant="contained" size="large" startIcon={<SendIcon />} fullWidth disabled={isSubmitting}>
            {isSubmitting ? FORM_VALIDATION.submitting : FORM_VALIDATION.submitButton}
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}
