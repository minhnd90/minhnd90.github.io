import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Job, BlogPost } from './types'

export function sanitizeSlug(filename: string): string {
  // Remove known extension if present
  let base = filename.replace(/\.mdx$/i, '')
  // Allow only URL-safe characters: letters, numbers, dash and underscore
  base = base.replace(/[^a-zA-Z0-9-_]+/g, '-')
  // Collapse multiple dashes
  base = base.replace(/-+/g, '-')
  // Trim leading/trailing dashes
  base = base.replace(/^-+|-+$/g, '')
  // Fallback in case nothing remains after sanitization
  return base || 'content'
}

export function getAllJobs(): Job[] {
  const jobsDir = path.join(process.cwd(), 'content/jobs')
  if (!fs.existsSync(jobsDir)) return []

  const files = fs.readdirSync(jobsDir)
  const mdxFiles = files.filter((file) => file.endsWith('.mdx'))

  return mdxFiles.map((filename) => {
    const fileContent = fs.readFileSync(path.join(jobsDir, filename), 'utf-8')
    const { data } = matter(fileContent)

    return {
      slug: sanitizeSlug(filename),
      title: data.title || filename,
      category: data.category || 'Khác',
      type: data.type || 'Toàn thời gian',
      location: data.location || 'Toàn quốc',
      salary: data.salary || 'Thỏa thuận',
      date: data.date || new Date().toLocaleDateString('vi-VN'),
      description: data.description || '',
      tags: data.tags || []
    }
  })
}

export function getAllPosts(): BlogPost[] {
  const blogDir = path.join(process.cwd(), 'content/blog')
  if (!fs.existsSync(blogDir)) return []

  const files = fs.readdirSync(blogDir)
  const mdxFiles = files.filter((file) => file.endsWith('.mdx'))

  const posts: BlogPost[] = mdxFiles.map((filename) => {
    const fileContent = fs.readFileSync(path.join(blogDir, filename), 'utf-8')
    const { data } = matter(fileContent)

    return {
      slug: sanitizeSlug(filename),
      title: data.title || filename,
      date: data.date || new Date().toISOString(),
      description: data.description || '',
      tags: data.tags || []
    }
  })

  // Sort by date descending
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
