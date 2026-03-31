'use client'

import { useMemo, useState } from 'react'
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Stack
} from '@mui/material'
import Link from 'next/link'
import SearchIcon from '@mui/icons-material/Search'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
import PageHeader from '../shared/page-header'

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

  const filters = {
    category: ['Tất cả', ...Array.from(new Set(jobs.map((job) => job.category)))],
    type: ['Tất cả', ...Array.from(new Set(jobs.map((job) => job.type)))],
    location: ['Tất cả', ...Array.from(new Set(jobs.map((job) => job.location)))]
  }

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchCategory = category === 'Tất cả' || job.category === category
      const matchType = type === 'Tất cả' || job.type === type
      const matchLocation = location === 'Tất cả' || job.location === location
      const text = `${job.title} ${job.description} ${job.tags.join(' ')}`.toLowerCase()
      const matchKeyword = keyword.trim() === '' || text.includes(keyword.toLowerCase())
      return matchCategory && matchType && matchLocation && matchKeyword
    })
  }, [category, type, location, keyword, jobs])

  return (
    <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <PageHeader
          title="Cơ Hội Việc Làm"
          subtitle="Kết nối bạn với các doanh nghiệp uy tín. Việc làm thật, lương thật, nhận việc nhanh trong 48h."
        />

        {/* Filters Section */}
        <Card sx={{ p: 3, mb: 6, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'visible' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                placeholder="Vị trí, công việc, kỹ năng..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    )
                  }
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4, md: 2.6 }}>
              <FormControl fullWidth>
                <InputLabel>Ngành nghề</InputLabel>
                <Select value={category} label="Ngành nghề" onChange={(e) => setCategory(e.target.value)}>
                  {filters.category.map((f) => (
                    <MenuItem key={f} value={f}>
                      {f}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 4, md: 2.6 }}>
              <FormControl fullWidth>
                <InputLabel>Hình thức</InputLabel>
                <Select value={type} label="Hình thức" onChange={(e) => setType(e.target.value)}>
                  {filters.type.map((f) => (
                    <MenuItem key={f} value={f}>
                      {f}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 4, md: 2.8 }}>
              <FormControl fullWidth>
                <InputLabel>Địa điểm</InputLabel>
                <Select value={location} label="Địa điểm" onChange={(e) => setLocation(e.target.value)}>
                  {filters.location.map((f) => (
                    <MenuItem key={f} value={f}>
                      {f}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Card>

        {/* Results Info */}
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          {filteredJobs.length} công việc phù hợp
        </Typography>

        {/* Jobs List */}
        <Grid container spacing={3}>
          {filteredJobs.map((job) => (
            <Grid size={{ xs: 12, md: 6 }} key={job.slug}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                  }
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
                  <Button
                    component={Link}
                    href={`/jobs/${job.slug}`}
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{ borderRadius: 2, fontWeight: 'bold', textTransform: 'none' }}
                  >
                    Xem chi tiết và ứng tuyển
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
          {filteredJobs.length === 0 && (
            <Grid size={{ xs: 12 }}>
              <Box sx={{ textAlign: 'center', py: 10 }}>
                <WorkOutlineIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  Không tìm thấy công việc phù hợp. Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm nhé!
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  )
}
