const { promises: fs } = require('fs')
const path = require('path')
const RSS = require('rss')
const matter = require('gray-matter')

async function generate() {
  const SITE_URL = process.env.SITE_URL || 'https://bm-group.info.vn'
  const APP_NAME = process.env.APP_NAME || 'BM Group'

  const feed = new RSS({
    title: APP_NAME,
    site_url: SITE_URL,
    feed_url: `${SITE_URL}/feed.xml`,
    description: process.env.COMPANY_DESC || APP_NAME
  })

  // Directories to scan
  const contentSources = [
    { dir: 'content/blog', type: 'blog' },
    { dir: 'content/jobs', type: 'job' }
  ]

  const allPosts = []

  for (const source of contentSources) {
    const fullDir = path.join(__dirname, '..', source.dir)
    try {
      const files = await fs.readdir(fullDir)
      const mdxFiles = files.filter(f => f.endsWith('.mdx'))

      for (const filename of mdxFiles) {
        const filePath = path.join(fullDir, filename)
        const content = await fs.readFile(filePath, 'utf-8')
        const { data } = matter(content)
        const slug = filename.replace('.mdx', '')

        allPosts.push({
          title: data.title || slug,
          url: `${SITE_URL}/${source.type === 'blog' ? 'blog' : 'jobs'}/${slug}`,
          date: data.date || data.date || new Date().toISOString(),
          description: data.description || '',
          categories: [source.type, ...(data.tags || [])],
          author: data.author || APP_NAME
        })
      }
    } catch (err) {
      console.warn(`Warning: Could not read directory ${source.dir}`)
    }
  }

  // Sort by date descending
  allPosts.sort((a, b) => new Date(b.date) - new Date(a.date))

  allPosts.forEach((post) => {
    feed.item(post)
  })

  await fs.writeFile('./public/feed.xml', feed.xml({ indent: true }))
}

generate()
