import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Stack,
  Box,
  Typography,
  useTheme,
} from '@mui/material'
import Link from 'next/link'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'

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

interface JobCardProps {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
  const theme = useTheme()

  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <Card
        className="card-hover"
        sx={{
          boxShadow: theme.palette.mode === 'dark' ? 2 : '0 4px 12px rgba(0,0,0,0.05)',
        }}
      >
        <CardContent sx={{ flexGrow: 1, p: 3.5 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip label={job.category} size="small" color="primary" variant="outlined" />
              <Chip label={job.type} size="small" variant="outlined" />
            </Box>
            <Typography variant="caption" color="text.secondary">
              {job.postedAt}
            </Typography>
          </Stack>

          <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
            {job.title}
          </Typography>

          <Stack spacing={1} sx={{ mt: 2, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
              <LocationOnIcon fontSize="small" />
              <Typography variant="body2">{job.location}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'success.main' }}>
              <AttachMoneyIcon fontSize="small" />
              <Typography variant="body2" fontWeight="bold">
                {job.salary}
              </Typography>
            </Box>
          </Stack>

          <Typography variant="body2" color="text.secondary" sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            lineHeight: 1.6
          }}>
            {job.description}
          </Typography>
        </CardContent>
        <CardActions sx={{ p: 3.5, pt: 0 }}>
          <Link href={`/jobs/${encodeURIComponent(job.slug)}`} passHref style={{ textDecoration: 'none', width: '100%' }}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              sx={{ borderRadius: 2, fontWeight: 'bold', textTransform: 'none' }}
            >
              Xem chi tiết và ứng tuyển
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  )
}
