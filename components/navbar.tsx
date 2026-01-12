'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeSwitcher from './theme-switcher'

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
                    <Link href="/">{process.env.COMPANY_NAME}</Link>
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
