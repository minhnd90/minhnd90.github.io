import '../styles/main.scss'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function Nextra({ Component, pageProps }: { Component: React.ComponentType; pageProps: any }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights />
    </>
  )
}
