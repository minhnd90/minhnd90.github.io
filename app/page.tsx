import { Container, Stack } from '@mui/material'
import { Metadata } from 'next'

import CTA from '@/components/home/cta'
import Features from '@/components/home/features'
import Hero from '@/components/home/hero'
import RecentJobs from '@/components/home/recent-jobs'
import { META } from '@/lib/constants'
import { getAllJobs } from '@/lib/markdown'

export const metadata: Metadata = META.home

/**
 * Home page that displays hero, features, recent jobs, and CTA sections.
 *
 * This page fetches all job postings at build time and passes them to the
 * `RecentJobs` component.
 */
export default async function HomePage() {
  const jobs = await getAllJobs()

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Stack spacing={4}>
        <Hero />
        <Features />
        <RecentJobs jobs={jobs} />
        <CTA />
      </Stack>
    </Container>
  )
}
