import { BlogPost, FrontMatter, Job } from '@/lib/types'
import { MdxFile } from 'nextra'
import { getPageMap } from 'nextra/page-map'

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
export async function getAllJobs(): Promise<Job[]> {
  const pageMap = await getPageMap('/jobs')
  return pageMap
    .filter((item): item is MdxFile => 'frontMatter' in item && item.name !== 'index')
    .map((item) => {
      const data = item.frontMatter as FrontMatter
      return {
        slug: item.name,
        title: data.title || item.name,
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

export async function getAllPosts(): Promise<BlogPost[]> {
  const pageMap = await getPageMap('/blog')
  return pageMap
    .filter((item): item is MdxFile => 'frontMatter' in item && item.name !== 'index')
    .map((item) => {
      const data = item.frontMatter as FrontMatter
      return {
        slug: item.name,
        title: data.title || item.name,
        date: data.date || new Date().toISOString(),
        description: data.description || '',
        tags: data.tags || []
      }
    })
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
}
