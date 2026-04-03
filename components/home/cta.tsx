import { Box, Typography, Container, Button } from '@mui/material'
import Link from 'next/link'
import { APP_NAME } from '../../lib/constants'

export default function CTA() {
  return (
    <Box sx={{ py: 10, bgcolor: 'secondary.main', color: 'secondary.contrastText' }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', px: { xs: 2, md: 8 }, py: { xs: 6, md: 8 }, borderRadius: 4, bgcolor: 'rgba(255,255,255,0.05)' }}>
          <Typography component="h2" variant="h3" fontWeight={700} gutterBottom>
            Sẵn sàng làm việc cùng {APP_NAME}?
          </Typography>
          <Typography variant="h6" paragraph sx={{ mb: 4, opacity: 0.9, fontWeight: 400 }}>
            Kết nối ngay với đội ngũ để được tư vấn và nhận lộ trình đi làm trong vòng 48h.
          </Typography>
          <Link href="/contact" passHref style={{ textDecoration: 'none' }}>
            <Button
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
              Liên hệ ứng tuyển ngay
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  )
}
