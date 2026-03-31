import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import { Container, Box } from '@mui/material'

export function generateStaticParams() {
  const blogDir = path.join(process.cwd(), 'content/blog')
  if (!fs.existsSync(blogDir)) return []
  const files = fs.readdirSync(blogDir)
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => ({
      slug: file.replace('.mdx', '')
    }))
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  try {
    // Webpack will bundle the MDX files in content/blog thanks to this static substring
    const { default: Post } = await import(`../../../content/blog/${slug}.mdx`)
    return (
      <Container maxWidth="md">
        <Box sx={{ py: { xs: 6, md: 10 } }} className="nextra-blog-post">
          <Post />
        </Box>
      </Container>
    )
  } catch (error) {
    console.error('Failed to import MDX:', error)
    notFound()
  }
}
