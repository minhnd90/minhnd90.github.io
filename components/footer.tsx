import {
  COMPANY_NAME,
  CONTACT_ADDRESS,
  FOOTER_CONTACTS,
  FOOTER_LABELS,
  FOOTER_SOCIALS
} from '@/lib/constants'
import Link from 'next/link'

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>{COMPANY_NAME}</h3>
            <p>{CONTACT_ADDRESS}</p>
          </div>
          <div className="footer-section">
            <h4>{FOOTER_LABELS.contact}</h4>
            {FOOTER_CONTACTS.map((contact) => (
              <Link
                key={contact.platform}
                href={contact.url}
                aria-label={contact.label}
              >
                {contact.platform}
              </Link>
            ))}
          </div>
          <div className="footer-section">
            <h4>{FOOTER_LABELS.social}</h4>
            <div className="social-links" role="list">
              {FOOTER_SOCIALS.map((social) => (
                <Link
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  {social.platform}
                </Link>
              ))}
              <Link href="/feed.xml" aria-label={FOOTER_LABELS.rss}>
                RSS
              </Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            <time dateTime={YEAR.toString()}>{YEAR}</time>
            {FOOTER_LABELS.copy}
          </p>
        </div>
      </div>
    </footer>
  )
}
