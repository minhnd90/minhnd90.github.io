import Link from 'next/link'

const YEAR = new Date().getFullYear()
export default function Footer() {
  return (
    <>
      <small className='footer'>
        <time>{YEAR}</time> © CÔNG TY TNHH DỊCH VỤ VIỆC LÀM BÌNH MINH GROUP.
        <Link href="tel:+84988108250">
          0988.108.250
        </Link>
        <Link href="tel:+84385616604">
          0385.616.604
        </Link>
        <a href="/feed.xml">RSS</a>
      </small>
    </>
  )
}
