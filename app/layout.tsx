import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ViewTransitions } from 'next-view-transitions'
import { Roboto } from 'next/font/google'

import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import MuiThemeProvider from '@/components/theme/mui-theme-provider'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import '../styles/index.scss'

const roboto = Roboto({ subsets: ['vietnamese'] })

export const metadata = {
  title: process.env.COMPANY_NAME,
  description: process.env.COMPANY_DESC,
  verification: {
    other: {
      'facebook-domain-verification': process.env.FB_DOMAIN_VERI
    }
  }
}

/**
 * Root layout for the application. Wraps all pages with global providers,
 * theme, analytics, and common layout components.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='vi' className={roboto.className}>
      <body>
        <ViewTransitions>
          <ThemeProvider>
            <AppRouterCacheProvider>
              <MuiThemeProvider>
                <Navbar />
                <main>{children}</main>
                <Footer />
              </MuiThemeProvider>
            </AppRouterCacheProvider>
          </ThemeProvider>
        </ViewTransitions>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
