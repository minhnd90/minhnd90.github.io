import Navbar from '../components/navbar'
import Footer from '../components/footer'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { ThemeProvider } from 'next-themes'
import { ViewTransitions } from 'next-view-transitions'
import { Roboto } from 'next/font/google'
const roboto = Roboto({ subsets: ['latin'] })
import '../styles/index.scss'

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
        <html lang="vi" className={roboto.className} suppressHydrationWarning>
            <body suppressHydrationWarning>
                <ViewTransitions>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                        <AppRouterCacheProvider>
                            <Navbar />
                            <main>{children}</main>
                            <Footer />
                        </AppRouterCacheProvider>
                                                {/* Lightweight helper: expose `sendConversionEvent(event)` to client code
                                                        It reads common FB identifiers from cookies (`_fbp`, `_fbc`) and forwards
                                                        an event payload to the server Conversions API route. */}
                                                <script dangerouslySetInnerHTML={{ __html: `
                                                (function(){
                                                    function readCookie(name){
                                                        const m = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')
                                                        return m ? decodeURIComponent(m[2]) : undefined
                                                    }
                                                    window.sendConversionEvent = async function(event){
                                                        try{
                                                            const fbp = readCookie('_fbp')
                                                            const fbc = readCookie('_fbc')
                                                            const payload = Object.assign({}, event)
                                                            payload.user_data = Object.assign({}, payload.user_data || {}, { fbp: fbp, fbc: fbc })
                                                            await fetch('/api/conversions', {
                                                                method: 'POST',
                                                                headers: { 'Content-Type': 'application/json' },
                                                                body: JSON.stringify(payload)
                                                            })
                                                        }catch(e){ console.warn('sendConversionEvent failed', e) }
                                                    }
                                                })();
                                                `}} />
                        <Analytics />
                        <SpeedInsights />
                    </ThemeProvider>
                </ViewTransitions>
            </body>
        </html>
    )
}
