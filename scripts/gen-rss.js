const { promises: fs } = require('fs')
const path = require('path')
const RSS = require('rss')
const matter = require('gray-matter')

async function generate() {
  const feed = new RSS({
    title: 'Your Name',
    site_url: 'https://minhnd90.vercel.app',
    feed_url: 'https://minhnd90.vercel.app/feed.xml'
  })

  const blogDir = path.join(__dirname, '..', 'app', 'blog')
  const posts = await fs.readdir(blogDir, { withFileTypes: true })
  const allPosts = []
  await Promise.all(
    posts.map(async (dirent) => {
      if (!dirent.isDirectory()) return
      const slug = dirent.name
      const pagePath = path.join(blogDir, slug, 'page.mdx')

      try {
        const content = await fs.readFile(pagePath)
        const frontmatter = matter(content)

        allPosts.push({
          title: frontmatter.data.title,
          url: '/blog/' + slug,
          date: frontmatter.data.date,
          description: frontmatter.data.description,
          categories: frontmatter.data.tag?.split(', '),
          author: frontmatter.data.author
        })
      } catch (err) {
        // Skip if page.mdx doesn't exist or other error
      }
    })
  )

  allPosts.sort((a, b) => new Date(b.date) - new Date(a.date))
  allPosts.forEach((post) => {
    feed.item(post)
  })
  await fs.writeFile('./public/feed.xml', feed.xml({ indent: true }))
}

generate()
