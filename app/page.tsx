import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Hero from '../components/home/hero'
import Features from '../components/home/features'
import RecentJobs from '../components/home/recent-jobs'
import CTA from '../components/home/cta'
import { Metadata } from 'next'
import { Job } from '../components/jobs/job-list'

export const metadata: Metadata = {
  title: 'Trang Chủ - Bình Minh Group',
  description: 'Việc Chất, Lương Chuẩn, Tương Lai Vững Vàng'
}

export default async function HomePage() {
  const jobsDir = path.join(process.cwd(), 'content/jobs')
  let jobs: Job[] = []
  
  try {
    if (fs.existsSync(jobsDir)) {
      const files = fs.readdirSync(jobsDir)
      const mdxFiles = files.filter((file) => file.endsWith('.mdx'))

      jobs = mdxFiles.map((filename) => {
        const fileContent = fs.readFileSync(path.join(jobsDir, filename), 'utf-8')
        const { data } = matter(fileContent)

        return {
          slug: filename.replace('.mdx', ''),
          title: data.title || filename,
          category: data.category || 'Khác',
          type: data.type || 'Toàn thời gian',
          location: data.location || 'Toàn quốc',
          salary: data.salary || 'Thỏa thuận',
          postedAt: data.postedAt || '',
          description: data.description || '',
          tags: data.tags || []
        }
      })
    }
  } catch (error) {
    console.error('Failed to read jobs for home page:', error)
  }

  return (
    <>
      <Hero />
      <Features />
      <RecentJobs jobs={jobs} />
      <CTA />
    </>
  )
}
