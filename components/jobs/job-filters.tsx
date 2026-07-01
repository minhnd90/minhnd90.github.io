'use client'

import SearchIcon from '@mui/icons-material/Search'
import {
  Card,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useTheme
} from '@mui/material'
import { useMemo } from 'react'
import { getCardShadow } from '@/lib/styles'
import { JobFiltersProps } from '@/lib/types'
import { TXT_JOB_FILTERS } from '@/lib/constants'

export function JobFilters({
  jobs,
  category,
  type,
  location,
  keyword,
  onCategoryChange,
  onTypeChange,
  onLocationChange,
  onKeywordChange
}: JobFiltersProps) {
  const theme = useTheme()
  const filters = useMemo(
    () => ({
      category: [
        TXT_JOB_FILTERS.all,
        ...Array.from(new Set(jobs.map((job) => job.category)))
      ],
      type: [
        TXT_JOB_FILTERS.all,
        ...Array.from(new Set(jobs.map((job) => job.type)))
      ],
      location: [
        TXT_JOB_FILTERS.all,
        ...Array.from(new Set(jobs.map((job) => job.location)))
      ]
    }),
    [jobs]
  )

  return (
    <Card
      sx={{
        p: 3,
        mb: 6,
        borderRadius: 3,
        boxShadow: getCardShadow(theme),
        overflow: 'visible'
      }}
    >
      <Grid container spacing={2} sx={{ alignItems: 'center' }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            placeholder={TXT_JOB_FILTERS.placeholder}
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
            <InputLabel>{TXT_JOB_FILTERS.category}</InputLabel>
            <Select
              value={category}
              label={TXT_JOB_FILTERS.category}
              onChange={(e) => onCategoryChange(e.target.value)}
            >
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
            <InputLabel>{TXT_JOB_FILTERS.type}</InputLabel>
            <Select
              value={type}
              label={TXT_JOB_FILTERS.type}
              onChange={(e) => onTypeChange(e.target.value)}
            >
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
            <InputLabel>{TXT_JOB_FILTERS.location}</InputLabel>
            <Select
              value={location}
              label={TXT_JOB_FILTERS.location}
              onChange={(e) => onLocationChange(e.target.value)}
            >
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
