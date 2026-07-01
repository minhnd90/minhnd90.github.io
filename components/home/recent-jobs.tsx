'use client'

import { JobCard } from '@/components/jobs/job-card'
import AppButton from '@/components/shared/button'
import { TXT_RECENT_JOBS } from '@/lib/constants'
import { Job } from '@/lib/types'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Box, Container, Grid, Typography } from '@mui/material'

export default function RecentJobs({ jobs }: { jobs: Job[] }) {
  // Get up to 3 latest jobs
  const recentJobs = jobs.slice(0, 3)

  return (
    <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            mb: 6
          }}
        >
          <Box>
            <Typography
              component="h2"
              variant="h3"
              sx={{ fontWeight: 700 }}
              gutterBottom
            >
              {TXT_RECENT_JOBS.heading}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {TXT_RECENT_JOBS.description}
            </Typography>
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <AppButton
              href="/jobs"
              endIcon={<ArrowForwardIcon />}
              color="primary"
              sx={{ fontWeight: 'bold' }}
            >
              {TXT_RECENT_JOBS.viewAllButton}
            </AppButton>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {recentJobs.map((job) => (
            <Grid size={{ xs: 12, md: 4 }} key={job.slug}>
              <JobCard job={job} showDescription={false} />
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            display: { xs: 'block', sm: 'none' },
            mt: 4,
            textAlign: 'center'
          }}
        >
          <AppButton
            href="/jobs"
            variant="outlined"
            endIcon={<ArrowForwardIcon />}
            color="primary"
            fullWidth
            sx={{ py: 1.5, borderRadius: 2, fontWeight: 'bold' }}
          >
            {TXT_RECENT_JOBS.viewAllButton}
          </AppButton>
        </Box>
      </Container>
    </Box>
  )
}
