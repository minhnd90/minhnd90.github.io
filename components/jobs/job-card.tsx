import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import { formatVietnameseDate } from '../../lib/date'
import { COMMON_STYLES, getCardShadow } from '../../lib/styles'
import { Job } from '../../lib/types'
import AppButton from '../shared/button'

interface JobCardProps {
  job: Job
  showDescription?: boolean
}

export function JobCard({ job, showDescription = true }: JobCardProps) {
  const theme = useTheme()

  return (
    <Card
      className="card-hover"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: getCardShadow(theme),
        borderRadius: 3,
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: 'primary.main',
          boxShadow: theme.palette.mode === 'dark' ? 4 : '0 8px 24px rgba(255, 140, 0, 0.12)',
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 3.5 }}>
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip label={job.category} size="small" color="primary" variant="outlined" />
            <Chip label={job.type} size="small" variant="outlined" />
          </Box>
          <Typography variant="caption" color="text.secondary">
            {formatVietnameseDate(job.date)}
          </Typography>
        </Stack>

        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }} gutterBottom>
          {job.title}
        </Typography>

        <Stack spacing={1} sx={{ mt: 2, mb: showDescription ? 3 : 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
            <LocationOnIcon fontSize="small" />
            <Typography variant="body2">{job.location}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'success.main' }}>
            <AttachMoneyIcon fontSize="small" />
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {job.salary}
            </Typography>
          </Box>
        </Stack>

        {showDescription && (
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
        )}
      </CardContent>
      <CardActions sx={{ p: 3.5, pt: 0 }}>
        <AppButton
          href={`/jobs/${encodeURIComponent(job.slug)}`}
          variant="contained"
          fullWidth
          size="large"
          sx={{ borderRadius: 2, ...COMMON_STYLES.boldText }}
        >
          {showDescription ? 'Xem chi tiết và ứng tuyển' : 'Chi tiết công việc'}
        </AppButton>
      </CardActions>
    </Card>
  )
}
