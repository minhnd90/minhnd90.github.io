import JobList from '../../components/jobs/job-list'
import { Metadata } from 'next'
import { META } from '../../lib/constants'
import { getAllJobs } from '../../lib/markdown'

export const metadata: Metadata = META.jobs

export default async function JobsPage() {
  const jobs = getAllJobs()

  return <JobList jobs={jobs} />
}
