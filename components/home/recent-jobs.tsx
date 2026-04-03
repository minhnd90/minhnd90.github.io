'use client'

import { Box, Typography, Container, Grid, Button } from '@mui/material'
import Link from 'next/link'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { JobCard } from '../jobs/job-card'
import { Job } from '../../lib/types'

export default function RecentJobs({ jobs }: { jobs: Job[] }) {
  // Get up to 3 latest jobs
  const recentJobs = jobs.slice(0, 3)

  return (
    <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 6 }}>
          <Box>
            <Typography component="h2" variant="h3" fontWeight={700} gutterBottom>
              Việc Làm Mới Nhất
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Công việc tốt nhất dành riêng cho bạn.
            </Typography>
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Link href="/jobs" passHref style={{ textDecoration: 'none' }}>
              <Button endIcon={<ArrowForwardIcon />} color="primary" sx={{ fontWeight: 'bold' }}>
                Xem tất cả
              </Button>
            </Link>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {recentJobs.map((job) => (
            <Grid size={{ xs: 12, md: 4 }} key={job.slug}>
              <JobCard job={job} showDescription={false} />
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ display: { xs: 'block', sm: 'none' }, mt: 4, textAlign: 'center' }}>
          <Link href="/jobs" passHref style={{ textDecoration: 'none' }}>
            <Button variant="outlined" endIcon={<ArrowForwardIcon />} color="primary" fullWidth sx={{ py: 1.5, borderRadius: 2, fontWeight: 'bold' }}>
              Xem tất cả việc làm
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  )
}
