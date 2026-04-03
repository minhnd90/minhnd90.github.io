import Hero from '../components/home/hero'
import Features from '../components/home/features'
import RecentJobs from '../components/home/recent-jobs'
import CTA from '../components/home/cta'
import { Metadata } from 'next'
import { META } from '../lib/constants'
import { getAllJobs } from '../lib/markdown'

export const metadata: Metadata = META.home

export default async function HomePage() {
  const jobs = getAllJobs()

  return (
    <>
      <Hero />
      <Features />
      <RecentJobs jobs={jobs} />
      <CTA />
    </>
  )
}
