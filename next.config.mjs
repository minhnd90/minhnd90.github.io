import path from 'path'
import { fileURLToPath } from 'url'
import nextra from 'nextra'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const withNextra = nextra({
  defaultShowCopyCode: false,
  readingTime: false
})

export default withNextra({
  output: 'export',
  reactStrictMode: true,
  cleanDistDir: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    unoptimized: true,
  },
  turbopack: {
    resolveAlias: {
      'next-mdx-import-source-file': './mdx-components.tsx',
    },
  },
  env: {
    APP_NAME: 'BM Group',
    COMPANY_NAME: 'CÔNG TY TNHH DỊCH VỤ VIỆC LÀM BÌNH MINH GROUP',
    COMPANY_DESC: 'Việc Chất, Lương Chuẩn, Tương Lai Vững Vàng',
    CONTACT_EMAIL: process.env.CONTACT_EMAIL || 'tuyendung@bm-group.info.vn',
    CONTACT_PHONE: process.env.CONTACT_PHONE || '0988 108 250',
    CONTACT_ADDRESS: process.env.CONTACT_ADDRESS || 'Địa chỉ đang cập nhật',
    FB_PAGE_URL: process.env.FB_PAGE_URL || 'https://facebook.com',
    ZALO_URL: process.env.ZALO_URL || 'https://zalo.me',
    SITE_URL: process.env.SITE_URL || 'https://bm-group.info.vn'
  },
})
