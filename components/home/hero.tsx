'use client'

import { Box, Typography, Button, Container, Stack } from '@mui/material'
import Link from 'next/link'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
import ContactSupportIcon from '@mui/icons-material/ContactSupport'

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
            Tuyển Dụng Lao Động Phổ Thông
            <Box component="span" sx={{ color: 'primary.main', display: 'block' }}>
              Nhanh & Tin Cậy
            </Box>
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            paragraph
            sx={{ mb: 4, fontWeight: 400, maxWidth: 640, mx: 'auto', lineHeight: 1.6 }}
          >
            Chúng tôi kết nối bạn với công việc thực tế, ổn định và phù hợp với năng lực. Dễ tìm, dễ ứng tuyển, nhận việc đi làm ngay trong tuần.
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
          >
            <Link href="/jobs" passHref style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<WorkOutlineIcon />}
                sx={{
                  py: 1.5,
                  px: 4,
                  fontWeight: 'bold',
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1.1rem'
                }}
              >
                Tìm việc ngay
              </Button>
            </Link>
            <Link href="/contact" passHref style={{ textDecoration: 'none' }}>
              <Button
                variant="outlined"
                color="secondary"
                size="large"
                startIcon={<ContactSupportIcon />}
                sx={{
                  py: 1.5,
                  px: 4,
                  fontWeight: 'bold',
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1.1rem'
                }}
              >
                Liên hệ hỗ trợ
              </Button>
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}
