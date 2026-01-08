import Navbar from '../components/navbar'
import Footer from '../components/footer'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ThemeProvider } from 'next-themes'
import { ViewTransitions } from 'next-view-transitions'
import '../styles/main.scss'

export const metadata = {
    title: process.env.COMPANY_NAME,
    description: process.env.COMPANY_DESC,
    verification: {
        other: {
            'facebook-domain-verification': process.env.FB_DOMAIN_VERI,
        },
    },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body suppressHydrationWarning>
                <ViewTransitions>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                        <Navbar />
                        <main>{children}</main>
                        <Footer />
                        <Analytics />
                        <SpeedInsights />
                    </ThemeProvider>
                </ViewTransitions>
            </body>
        </html>
    )
}
