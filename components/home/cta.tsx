import AppButton from '@/components/shared/button'
import { TXT_CTA } from '@/lib/constants'
import { Box, Container, Typography } from '@mui/material'

export default function CTA() {
  return (
    <Box
      sx={{
        py: 10,
        bgcolor: 'secondary.main',
        color: 'secondary.contrastText'
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            textAlign: 'center',
            px: { xs: 2, md: 8 },
            py: { xs: 6, md: 8 },
            borderRadius: 4,
            bgcolor: 'rgba(255,255,255,0.05)'
          }}
        >
          <Typography
            component="h2"
            variant="h3"
            sx={{ fontWeight: 700 }}
            gutterBottom
          >
            {TXT_CTA.heading}
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{ mb: 4, opacity: 0.9, fontWeight: 400 }}
          >
            {TXT_CTA.description}
          </Typography>
          <AppButton
            href="/contact"
            variant="contained"
            color="primary"
            size="large"
            sx={{
              py: 1.5,
              px: 5,
              fontWeight: 'bold',
              borderRadius: 2,
              fontSize: '1.1rem'
            }}
          >
            {TXT_CTA.button}
          </AppButton>
        </Box>
      </Container>
    </Box>
  )
}
