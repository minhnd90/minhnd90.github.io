'use client'

import { Box, Typography, Container, Grid, Card, CardContent, useTheme } from '@mui/material'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import SearchIcon from '@mui/icons-material/Search'

const features = [
  {
    title: 'Công Việc Chọn Lọc',
    description: 'Chỉ tuyển chọn các công việc chất lượng từ nhà máy, kho vận và các đối tác uy tín, đã được kiểm chứng.',
    icon: <AssignmentTurnedInIcon fontSize="large" color="primary" />
  },
  {
    title: 'Tìm Việc Dễ Dàng',
    description: 'Dễ dàng tra cứu việc làm theo ngành nghề, khu vực và loại hình. Đầy đủ thông tin, rõ ràng minh bạch.',
    icon: <SearchIcon fontSize="large" color="primary" />
  },
  {
    title: 'Hỗ Trợ Tận Tâm',
    description: 'Hỗ trợ hoàn thiện hồ sơ, chuẩn bị kỹ năng phỏng vấn và hướng dẫn ứng tuyển từng bước từ A-Z.',
    icon: <SupportAgentIcon fontSize="large" color="primary" />
  }
]

export default function Features() {
  const theme = useTheme()

  return (
    <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography component="h2" variant="h3" fontWeight={700} gutterBottom>
            Ưu Điểm Của Dịch Vụ
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Lý do hàng ngàn người lao động đã tin tưởng và chọn nền tảng của chúng tôi.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  boxShadow: theme.palette.mode === 'dark' ? 2 : 1,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.palette.mode === 'dark' ? 4 : 3
                  }
                }}
              >
                <CardContent sx={{ p: 4, flexGrow: 1, textAlign: 'center' }}>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h5" component="h3" fontWeight="bold" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
