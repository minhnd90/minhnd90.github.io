'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeSwitcher from './theme-switcher'
import Image from 'next/image'
import { APP_NAME, COMPANY_NAME } from '../lib/constants'

const navLinks = [
  { name: 'Trang Chủ', href: '/' },
  { name: 'Góc Chia Sẻ', href: '/blog' },
  { name: 'Việc Làm', href: '/jobs' },
  { name: 'Giới Thiệu', href: '/about' },
  { name: 'Liên Hệ', href: '/contact' }
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-container">
        <div className="logo">
          <Link href="/" title={COMPANY_NAME} aria-label={`Go to ${COMPANY_NAME} homepage`}>
            <Image
              src="/logo.png"
              alt={APP_NAME}
              width={48}
              height={48}
            />
          </Link>
        </div>
        <div className="nav-links">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${pathname === link.href ? 'active' : ''}`}
              aria-current={pathname === link.href ? 'page' : undefined}
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
