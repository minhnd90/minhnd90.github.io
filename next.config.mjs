import path from 'path'
import { fileURLToPath } from 'url'
import nextra from 'nextra'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const withNextra = nextra({
  defaultShowCopyCode: true,
  readingTime: true
})

export default withNextra({
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
    COMPANY_DESC: 'Việc Chất, Lương Chuẩn, Tương Lai Vững Vàng'
  },
})
