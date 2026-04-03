# BM Group Portfolio

A modern portfolio website for BM Group, built with **Next.js** and [Nextra](https://nextra.vercel.app/). Features include:

- Job listings with filters and search
- Blog with Markdown content
- Contact form with validation, rate limiting, and persistence
- RSS feed generation
- Responsive design with Material-UI
- Facebook Conversions API integration

## Features

### Contact API
- Form validation and sanitization
- Rate limiting (5 requests per 15 minutes per IP)
- Persistent storage to JSONL file
- Optional email notifications via SMTP
- XSS protection with DOMPurify

### Job Listings
- Filter by position type
- Empty state handling
- Responsive card layout

### Blog
- MDX support for rich content
- Automatic RSS generation
- Tag-based categorization

## Configuration

1. Copy `.env.example` to `.env.local` and configure environment variables.
2. Update company info in `lib/constants.ts`.
3. Add job posts in `content/jobs/` as MDX files.
4. Add blog posts in `content/blog/` as MDX files.

## Environment Variables

See `.env.example` for all available options. Key variables:

- `CONTACT_EMAIL`: Company contact email
- `CONTACT_STORAGE_DIR`: Directory for contact logs (default: `data`)
- `SMTP_*`: For email notifications (optional)

## Development

```bash
npm install
npm run dev
npm run build
npm test
```

## Testing

Run `npm test` for unit tests. Manual API testing:

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello"}'
```
