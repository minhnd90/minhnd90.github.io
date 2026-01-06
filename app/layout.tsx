import Navbar from '../components/navbar'
import Footer from '../components/footer'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ThemeProvider } from 'next-themes'
import { ViewTransitions } from 'next-view-transitions'
import '../styles/main.scss'

export const metadata = {
    title: 'Nextra Portfolio',
    description: 'Portfolio built with Nextra',
    verification: {
        other: {
            'facebook-domain-verification': '5ajy96lzwf0s8gcgpxihdestxuoxik',
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
