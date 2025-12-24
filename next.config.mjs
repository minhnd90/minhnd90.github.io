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
  output: 'export',
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    unoptimized: true,
  },
})
