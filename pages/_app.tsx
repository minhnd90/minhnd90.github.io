import '../styles/main.scss'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function Nextra({ Component, pageProps }: { Component: React.ComponentType; pageProps: any }) {
  return (
    <>
      <Component {...pageProps} />
      <SpeedInsights />
    </>
  )
}
