'use client'

import { useMemo } from 'react'
import {
  Grid,
  Card,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  useTheme,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

import { Job } from '../../lib/types'
import { getCardShadow } from '../../lib/styles'

interface JobFiltersProps {
  jobs: Job[]
  category: string
  type: string
  location: string
  keyword: string
  onCategoryChange: (value: string) => void
  onTypeChange: (value: string) => void
  onLocationChange: (value: string) => void
  onKeywordChange: (value: string) => void
}

export function JobFilters({
  jobs,
  category,
  type,
  location,
  keyword,
  onCategoryChange,
  onTypeChange,
  onLocationChange,
  onKeywordChange,
}: JobFiltersProps) {
  const theme = useTheme()
  const filters = useMemo(() => ({
    category: ['Tất cả', ...Array.from(new Set(jobs.map((job) => job.category)))],
    type: ['Tất cả', ...Array.from(new Set(jobs.map((job) => job.type)))],
    location: ['Tất cả', ...Array.from(new Set(jobs.map((job) => job.location)))]
  }), [jobs])

  return (
    <Card sx={{ p: 3, mb: 6, borderRadius: 3, boxShadow: getCardShadow(theme), overflow: 'visible' }}>
      <Grid container spacing={2} alignItems="center">
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            placeholder="Vị trí, công việc, kỹ năng..."
            value={keyword}
            onChange={(e) => onKeywordChange(e.target.value)}
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
            <Select value={category} label="Ngành nghề" onChange={(e) => onCategoryChange(e.target.value)}>
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
            <Select value={type} label="Hình thức" onChange={(e) => onTypeChange(e.target.value)}>
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
            <Select value={location} label="Địa điểm" onChange={(e) => onLocationChange(e.target.value)}>
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
  )
}
