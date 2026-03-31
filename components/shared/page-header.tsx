import { Box, Typography } from '@mui/material'

interface PageHeaderProps {
  title: string
  subtitle?: string
  centered?: boolean
}

export default function PageHeader({ title, subtitle, centered = true }: PageHeaderProps) {
  return (
    <Box sx={{ mb: { xs: 6, md: 8 }, textAlign: centered ? 'center' : 'left' }}>
      <Typography
        component="h1"
        variant="h3"
        fontWeight={900}
        gutterBottom
        color="primary.main"
        sx={{ 
          fontSize: { xs: '2.5rem', md: '3rem' },
          lineHeight: 1.2
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            maxWidth: 700,
            mx: centered ? 'auto' : 0,
            fontWeight: 400,
            lineHeight: 1.6
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  )
}
