import { Box, Typography } from '@mui/material'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
import { ReactNode } from 'react'

interface EmptyStateProps {
  icon?: ReactNode
  message?: string
}

export function EmptyState({ 
  icon = <WorkOutlineIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />, 
  message = "Không tìm thấy nội dung phù hợp. Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm nhé!" 
}: EmptyStateProps) {
  return (
    <Box sx={{ textAlign: 'center', py: 10, width: '100%' }}>
      {icon}
      <Typography variant="h6" color="text.secondary">
        {message}
      </Typography>
    </Box>
  )
}
