'use client'

import { Box, Typography, Container, Grid, Card, CardContent, CardActions, Button, Chip } from '@mui/material'
import Link from 'next/link'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Job } from '../../components/jobs/job-list'

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
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                borderRadius: 3, 
                border: '1px solid', 
                borderColor: 'divider', 
                boxShadow: 'none',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: 'primary.main',
                  boxShadow: '0 4px 12px rgba(255, 140, 0, 0.1)'
                }
              }}>
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                    <Chip label={job.category} size="small" color="primary" variant="outlined" />
                    <Chip label={job.type} size="small" />
                  </Box>
                  <Typography variant="h5" component="h3" fontWeight="bold" gutterBottom>
                    {job.title}
                  </Typography>
                  <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', gap: 1 }}>
                      <LocationOnIcon fontSize="small" />
                      <Typography variant="body2">{job.location}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', gap: 1 }}>
                      <AttachMoneyIcon fontSize="small" />
                      <Typography variant="body2" fontWeight="medium" color="text.primary">
                        {job.salary}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
                <CardActions sx={{ p: 3, pt: 0 }}>
                  <Link href={`/jobs/${job.slug}`} passHref style={{ textDecoration: 'none', width: '100%' }}>
                    <Button variant="contained" fullWidth disableElevation sx={{ borderRadius: 2 }}>
                      Chi tiết công việc
                    </Button>
                  </Link>
                </CardActions>
              </Card>
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
