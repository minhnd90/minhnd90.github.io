'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeSwitcher from './theme-switcher'
import Image from 'next/image'

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
]

export default function Navbar() {
    const pathname = usePathname()

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="logo">
                    <Link href="/" title={process.env.COMPANY_NAME}>
                        <Image src="/next.svg" alt={process.env.COMPANY_NAME} width={100} height={40} />
                    </Link>
                </div>
                <div className="nav-links">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`nav-link ${pathname === link.href ? 'active' : ''}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <ThemeSwitcher />
                </div>
            </div>
        </nav>
    )
}
