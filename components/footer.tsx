import Link from 'next/link'
import {
  COMPANY_NAME,
  CONTACT_PHONE,
  CONTACT_EMAIL,
  CONTACT_ADDRESS,
  FB_PAGE_URL,
  ZALO_URL
} from '../lib/constants'

const YEAR = new Date().getFullYear()

export default function Footer() {
  const cleanPhone = CONTACT_PHONE.replace(/\D/g, '')

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>{COMPANY_NAME}</h3>
            <p>{CONTACT_ADDRESS}</p>
          </div>
          <div className="footer-section">
            <h4>Liên hệ</h4>
            <p>
              Hotline:{' '}
              <Link href={`tel:+84${cleanPhone}`} aria-label={`Call ${COMPANY_NAME} at ${CONTACT_PHONE}`}>
                {CONTACT_PHONE}
              </Link>
            </p>
            <p>
              Email:{' '}
              <Link href={`mailto:${CONTACT_EMAIL}`} aria-label={`Send email to ${COMPANY_NAME}`}>
                {CONTACT_EMAIL}
              </Link>
            </p>
          </div>
          <div className="footer-section">
            <h4>Kết nối</h4>
            <div className="social-links" role="list">
              <Link href={FB_PAGE_URL} target="_blank" rel="noopener noreferrer" aria-label="Visit our Facebook page">
                Facebook
              </Link>
              <Link href={ZALO_URL} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on Zalo">
                Zalo
              </Link>
              <Link href="/feed.xml" aria-label="Subscribe to our RSS feed">
                RSS
              </Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            <time dateTime={YEAR.toString()}>{YEAR}</time> © {COMPANY_NAME}. Bảo lưu mọi quyền.
          </p>
        </div>
      </div>
    </footer>
  )
}
