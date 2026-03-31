import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import dynamic from 'next/dynamic'

const BlogList = dynamic(() => import('../../components/blog/blog-list'))
import { BlogPost } from '../../components/blog/blog-list'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - Bình Minh Group',
  description: 'Kinh nghiệm tìm việc và mẹo ứng tuyển'
}

export default async function BlogPage() {
  const blogDir = path.join(process.cwd(), 'content/blog')
  let files: string[] = []
  
  try {
    files = fs.readdirSync(blogDir)
  } catch (error) {
    // Directory might not exist initially
  }

  const mdxFiles = files.filter((file) => file.endsWith('.mdx'))

  const posts: BlogPost[] = mdxFiles.map((filename) => {
    const fileContent = fs.readFileSync(path.join(blogDir, filename), 'utf-8')
    const { data } = matter(fileContent)

    return {
      slug: filename.replace('.mdx', ''),
      title: data.title || filename,
      date: data.date || new Date().toISOString(),
      description: data.description || '',
      tags: data.tags || []
    }
  })

  // Sort by date descending
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return <BlogList posts={posts} />
}
