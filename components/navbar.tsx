'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

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
                    <Link href="/">
                        MinhND
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
                </div>
            </div>
        </nav>
    )
}
