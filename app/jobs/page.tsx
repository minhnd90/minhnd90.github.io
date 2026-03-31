import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import JobList, { Job } from '../../components/jobs/job-list'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Việc Làm - Bình Minh Group',
  description: 'Tìm kiếm việc làm lao động phổ thông, công nhân, kho vận phù hợp nhất với bạn.'
}

export default async function JobsPage() {
  const jobsDir = path.join(process.cwd(), 'content/jobs')
  let files: string[] = []
  
  try {
    if (fs.existsSync(jobsDir)) {
      files = fs.readdirSync(jobsDir)
    }
  } catch (error) {
    console.error('Failed to read jobs directory:', error)
  }

  const mdxFiles = files.filter((file) => file.endsWith('.mdx'))

  const jobs: Job[] = mdxFiles.map((filename) => {
    const fileContent = fs.readFileSync(path.join(jobsDir, filename), 'utf-8')
    const { data } = matter(fileContent)

    return {
      slug: filename.replace('.mdx', ''),
      title: data.title || filename,
      category: data.category || 'Khác',
      type: data.type || 'Toàn thời gian',
      location: data.location || 'Toàn quốc',
      salary: data.salary || 'Thỏa thuận',
      postedAt: data.postedAt || new Date().toLocaleDateString('vi-VN'),
      description: data.description || '',
      tags: data.tags || []
    }
  })

  // Optional: sort jobs by posted date if available
  // jobs.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime())

  return <JobList jobs={jobs} />
}
