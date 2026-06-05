import { Metadata } from 'next'
import JobList from '../../components/jobs/job-list'
import { META } from '../../lib/constants'
import { getAllJobs } from '../../lib/markdown'

export const metadata: Metadata = META.jobs

export default async function JobsPage() {
  const jobs = await getAllJobs()

  return <JobList jobs={jobs} />
}
