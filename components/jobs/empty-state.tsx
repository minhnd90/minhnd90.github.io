import { Grid, Box, Typography } from '@mui/material'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'

export function EmptyState() {
  return (
    <Grid size={{ xs: 12 }}>
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <WorkOutlineIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          Không tìm thấy công việc phù hợp. Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm nhé!
        </Typography>
      </Box>
    </Grid>
  )
}
