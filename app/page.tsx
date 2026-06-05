import { Metadata } from 'next'
import CTA from '../components/home/cta'
import Features from '../components/home/features'
import Hero from '../components/home/hero'
import RecentJobs from '../components/home/recent-jobs'
import { META } from '../lib/constants'
import { getAllJobs } from '../lib/markdown'

export const metadata: Metadata = META.home

export default async function HomePage() {
  const jobs = await getAllJobs()

  return (
    <>
      <Hero />
      <Features />
      <RecentJobs jobs={jobs} />
      <CTA />
    </>
  )
}
