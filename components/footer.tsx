import Link from 'next/link'

const YEAR = new Date().getFullYear()
export default function Footer() {
  return (
    <>
      <div className="footer">
        <div className="footer-container">
          <div className="col-left">
            <time>{YEAR}</time> © {process.env.COMPANY_NAME}
          </div>
          <div className="col-right">
            {process.env.CONTACT_PHONE && (
              <Link href={`tel:+84${process.env.CONTACT_PHONE.replace(/\D/g, '')}`}>
                {process.env.CONTACT_PHONE}
              </Link>
            )}
            <a href="/feed.xml">RSS</a>
          </div>
        </div>
      </div>
    </>
  )
}
