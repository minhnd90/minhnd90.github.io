import Link from 'next/link'

const YEAR = new Date().getFullYear()
export default function Footer() {
  return (
    <>
      <div className='footer'>
        <div className="footer-container">
          <div className="col-left">
            <time>{YEAR}</time> © {process.env.COMPANY_NAME}
          </div>
          <div className="col-right">
            <Link href="tel:+84988108250">
              0988.108.250
            </Link>
            <Link href="tel:+84385616604">
              0385.616.604
            </Link>
            <a href="/feed.xml">RSS</a>
          </div>
        </div>
      </div>
    </>
  )
}
