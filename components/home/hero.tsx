import AppButton from '@/components/shared/button'
import { APP_NAME, TXT_HERO } from '@/lib/constants'
import ContactSupportIcon from '@mui/icons-material/ContactSupport'
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined'
import { Box, Container, Stack, Typography } from '@mui/material'

export default function Hero() {
  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        pt: { xs: 8, md: 12 },
        pb: { xs: 8, md: 14 },
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            component="h1"
            variant="h2"
            color="text.primary"
            gutterBottom
            sx={{ fontWeight: 800, fontSize: { xs: '2.5rem', md: '3.75rem' } }}
          >
            {APP_NAME}
            <Box
              component="span"
              sx={{ color: 'primary.main', display: 'block' }}
            >
              {TXT_HERO.heading}
            </Box>
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            component="p"
            sx={{
              mb: 4,
              fontWeight: 400,
              maxWidth: 640,
              mx: 'auto',
              lineHeight: 1.6,
              fontSize: '1.25rem'
            }}
          >
            {TXT_HERO.description}
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ justifyContent: 'center' }}
          >
            <AppButton
              href="/jobs"
              variant="contained"
              size="large"
              startIcon={<WorkOutlinedIcon />}
              sx={{
                py: 1.5,
                px: 4,
                fontWeight: 'bold',
                borderRadius: 2,
                fontSize: '1.1rem'
              }}
            >
              {TXT_HERO.ctaButton}
            </AppButton>
            <AppButton
              href="/contact"
              variant="outlined"
              color="secondary"
              size="large"
              startIcon={<ContactSupportIcon />}
              sx={{
                py: 1.5,
                px: 4,
                fontWeight: 'bold',
                borderRadius: 2,
                fontSize: '1.1rem'
              }}
            >
              {TXT_HERO.contactButton}
            </AppButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}
