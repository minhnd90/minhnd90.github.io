import nextra from 'nextra'
import path from 'path'
import { fileURLToPath } from 'url'

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
      "@components": path.join(__dirname, "components"),
      "@lib": path.join(__dirname, "lib"),
    },
  }
})
