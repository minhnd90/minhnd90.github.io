import Footer from '../components/footer'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ThemeProvider } from 'next-themes'
import '../styles/main.scss'

export const metadata = {
    title: 'Nextra Portfolio',
    description: 'Portfolio built with Nextra',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <main>{children}</main>
                    <Footer />
                    <Analytics />
                    <SpeedInsights />
                </ThemeProvider>
            </body>
        </html>
    )
}
