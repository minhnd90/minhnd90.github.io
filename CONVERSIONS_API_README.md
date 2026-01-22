# Facebook Conversions API Integration

This project integrates Meta's Conversions API for server-side event tracking and forwarding.

## Overview

- **Server Route**: `app/api/conversions/route.ts` accepts POST events and forwards them to Meta Graph API
- **Client Helper**: Lightweight `window.sendConversionEvent()` helper in `app/layout.tsx` captures browser identifiers (`_fbp`, `_fbc`) and POSTs events to the server
- **PII Hashing**: All PII fields (email, phone, name, etc.) are automatically SHA256-hashed server-side per Meta requirements

## Setup

### 1. Create `.env.local`

Copy `.env.example` to `.env.local` and fill in your Facebook/Meta credentials:

```bash
cp .env.example .env.local
```

Required variables:
- `FB_PIXEL_ID`: Your Meta Pixel ID (from Ads Manager > Pixels > Settings)
- `FB_ACCESS_TOKEN`: Server-only token for API calls (from Meta App > Tools > Business Settings > Data Sources > Generate Token)
- `FB_DOMAIN_VERI`: Domain verification string (from Facebook App > Settings)

Optional:
- `FB_API_VERSION`: Graph API version (defaults to `16.0`)
- `FB_TEST_EVENT_CODE`: For testing in development (from Events Manager > Test Events)

**⚠️ Security**: Never commit `.env.local`—it contains secrets. Add it to `.gitignore` (already ignored by default in Next.js).

### 2. Local Development

Start the Next.js dev server:

```bash
npm run dev
```

Test the endpoint with curl:

```bash
curl -X POST http://localhost:3000/api/conversions \
  -H "Content-Type: application/json" \
  -d '{
    "event_name": "Purchase",
    "event_time": '$(date +%s)',
    "action_source": "website",
    "user_data": {
      "em": "user@example.com",
      "ph": "+1234567890"
    },
    "custom_data": {
      "value": 99.99,
      "currency": "USD"
    }
  }'
```

The server will automatically hash PII fields before sending to Meta.

### 3. Deployment (Vercel, AWS, etc.)

Set environment variables in your hosting platform's secrets/environment settings:

**Vercel**:
1. Go to your project Settings > Environment Variables
2. Add: `FB_PIXEL_ID`, `FB_ACCESS_TOKEN`, `FB_API_VERSION`, `FB_TEST_EVENT_CODE`
3. Mark `FB_ACCESS_TOKEN` as sensitive

**GitHub Actions / Other CI/CD**:
Add the same variables to your CI/CD secrets.

## Client-Side Usage

Use the `sendConversionEvent()` function from any client-side script:

```javascript
// Example: Track a purchase event
window.sendConversionEvent({
  event_name: 'Purchase',
  event_time: Math.floor(Date.now() / 1000),
  action_source: 'website',
  user_data: {
    em: 'user@example.com',      // Will be hashed server-side
    ph: '+1234567890',            // Will be hashed server-side
    client_ip_address: undefined, // Optional
    client_user_agent: navigator.userAgent
  },
  custom_data: {
    value: 99.99,
    currency: 'USD',
    content_ids: ['product_id_1'],
    content_name: 'My Product'
  },
  event_source_url: window.location.href
});
```

The helper automatically:
- Reads `_fbp` and `_fbc` cookies (set by Meta Pixel or your pixel library)
- Merges them into `user_data`
- POSTs the event to `/api/conversions`
- Handles errors gracefully (logged to console)

## Testing

### Facebook Test Events

1. Go to Meta Events Manager > Your Pixel
2. Click Settings > Test Events
3. Copy the Test Event Code
4. Set `FB_TEST_EVENT_CODE` in `.env.local` (and deployed environments)
5. Send test events—they'll appear in the Test Events stream within seconds

### Verify in Events Manager

1. Go to Meta Events Manager > Your Pixel > All Events
2. Set date filter to "Today"
3. Look for your test event names

## PII Hashing

All user_data fields are automatically hashed with SHA256:

- `em` (email)
- `ph` (phone)
- `ge` (gender)
- `db` (date of birth)
- `ln` (last name)
- `fn` (first name)
- `ct` (city)
- `st` (state)
- `zp` (zip code)
- `country` (country)

No PII is logged or exposed. The server processes raw PII, hashes it, and sends only the hash to Meta.

## Security & Privacy

- **Tokens**: Keep `FB_ACCESS_TOKEN` in server-only env vars; never expose to client
- **Logging**: Do not log raw PII or access tokens
- **HTTPS**: Use HTTPS in production; Meta requires it for security
- **Rotation**: If an access token is exposed, rotate it immediately in your Meta App settings
- **Privacy**: PII is hashed before leaving the server; comply with CCPA, GDPR, etc.

## Troubleshooting

**"Missing FB_PIXEL_ID or FB_ACCESS_TOKEN"**
- Ensure both variables are set in `.env.local` (or your deployment env)
- Check variable names match exactly

**"No event data provided"**
- Ensure the POST body includes a valid JSON event object

**Events not appearing in Meta Events Manager**
- Verify `FB_TEST_EVENT_CODE` is set and correct
- Check that events use the correct `event_name` values (e.g., `Purchase`, `ViewContent`)
- Allow 10–30 seconds for events to appear in the dashboard

**"Fetch error" in client console**
- Check browser network tab for `/api/conversions` requests
- Ensure the server route is deployed and accessible

## References

- [Meta Conversions API Documentation](https://developers.facebook.com/docs/marketing-api/conversions-api)
- [PII Hashing Guide](https://developers.facebook.com/docs/marketing-api/conversions-api/hashing)
- [Test Events Setup](https://developers.facebook.com/docs/marketing-api/conversions-api/test-events)
