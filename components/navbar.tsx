'use client'

import ThemeSwitcher from '@/components/theme-switcher'
import { APP_NAME, COMPANY_NAME, TXT_HOME_LABEL } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

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
          <Link href="/" title={COMPANY_NAME} aria-label={TXT_HOME_LABEL}>
            <Image src="/logo.png" alt={APP_NAME} width={48} height={48} />
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
