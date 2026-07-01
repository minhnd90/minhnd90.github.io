import { Box, SvgIcon, Typography } from '@mui/material'
import { TXT_EMPTY_STATE } from '@/lib/constants'

export function EmptyState() {
  return (
    <Box sx={{ textAlign: 'center', py: 10, width: '100%' }}>
      <SvgIcon
        component={TXT_EMPTY_STATE.icon}
        sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }}
      />
      <Typography variant="h6" color="text.secondary">
        {TXT_EMPTY_STATE.message}
      </Typography>
    </Box>
  )
}
