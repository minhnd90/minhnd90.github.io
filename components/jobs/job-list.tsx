'use client'

import { useState, useMemo } from 'react'
import {
  Box,
  Typography,
  Container,
  Grid,
} from '@mui/material'
import PageHeader from '../shared/page-header'
import { JobFilters } from './job-filters'
import { JobCard } from './job-card'
import { EmptyState } from './empty-state'

export interface Job {
  slug: string
  title: string
  category: string
  type: string
  location: string
  salary: string
  postedAt: string
  description: string
  tags: string[]
}

export default function JobList({ jobs }: { jobs: Job[] }) {
  const [category, setCategory] = useState('Tất cả')
  const [type, setType] = useState('Tất cả')
  const [location, setLocation] = useState('Tất cả')
  const [keyword, setKeyword] = useState('')

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchCategory = category === 'Tất cả' || job.category === category
      const matchType = type === 'Tất cả' || job.type === type
      const matchLocation = location === 'Tất cả' || job.location === location
      const text = `${job.title} ${job.description} ${job.tags.join(' ')}`.toLowerCase()
      const matchKeyword = keyword.trim() === '' || text.includes(keyword.toLowerCase())
      return matchCategory && matchType && matchLocation && matchKeyword
    })
  }, [jobs, category, type, location, keyword])

  return (
    <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <PageHeader
          title="Cơ Hội Việc Làm"
          subtitle="Kết nối bạn với các doanh nghiệp uy tín. Việc làm thật, lương thật, nhận việc nhanh trong 48h."
        />

        {/* Filters Section */}
        <JobFilters
          jobs={jobs}
          category={category}
          type={type}
          location={location}
          keyword={keyword}
          onCategoryChange={setCategory}
          onTypeChange={setType}
          onLocationChange={setLocation}
          onKeywordChange={setKeyword}
        />

        {/* Results Info */}
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          {filteredJobs.length} công việc phù hợp
        </Typography>

        {/* Jobs List */}
        <Grid container spacing={3}>
          {filteredJobs.map((job) => (
            <JobCard key={job.slug} job={job} />
          ))}
          {filteredJobs.length === 0 && <EmptyState />}
        </Grid>
      </Container>
    </Box>
  )
}
