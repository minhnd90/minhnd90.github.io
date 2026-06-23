import BusinessIcon from '@mui/icons-material/Business'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import GroupsIcon from '@mui/icons-material/Groups'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import VerifiedIcon from '@mui/icons-material/Verified'
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import type { Metadata } from 'next'
import AppButton from '../../components/shared/button'
import PageHeader from '../../components/shared/page-header'
import { APP_NAME, META, PAGE_HEADERS, ABOUT_PROCESS_STEPS } from '../../lib/constants'

export const metadata: Metadata = META.about

export default function AboutPage() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <PageHeader
          title={PAGE_HEADERS.about.title}
          subtitle={PAGE_HEADERS.about.subtitle}
        />

        {/* Mission Section */}
        <Grid container spacing={8} sx={{ mb: 12 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }} gutterBottom>
                Sứ mệnh của chúng tôi
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.8 }}>
                Chúng tôi là **{APP_NAME}** — chuyên gia trong lĩnh vực tuyển dụng lao động phổ thông cho các ngành sản xuất, kho vận và công nghiệp tại Việt Nam.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                Mục tiêu của chúng tôi không chỉ là tuyển dụng, mà là xây dựng một cầu nối bền vững giúp người lao động có công việc ổn định, thu nhập tốt và các phúc lợi minh bạch, góp phần vào sự phát triển ổn định của doanh nghiệp.
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 5, borderRadius: 4, bgcolor: 'primary.main', color: 'white', position: 'relative', overflow: 'hidden' }}>
              <BusinessIcon sx={{ position: 'absolute', right: -20, bottom: -20, fontSize: 180, opacity: 0.1 }} />
              <Typography variant="h5" sx={{ fontWeight: 'bold' }} gutterBottom>
                Tại sao chọn {APP_NAME}?
              </Typography>
              <List sx={{ mt: 3 }}>
                {[
                  'Công việc có thực, nhận việc nhanh trong 48h.',
                  'Lương và thưởng minh bạch, trả đúng hạn.',
                  'Hỗ trợ hồ sơ, chỗ ở và đi lại cho người lao động.',
                  'Môi trường làm việc an toàn, chuyên nghiệp.'
                ].map((item, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 40, color: 'white' }}>
                      <CheckCircleOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>

        <Divider sx={{ mb: 12 }} />

        {/* What You Get Section */}
        <Box sx={{ mb: 12 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center' }} gutterBottom>
            Điều bạn nhận được
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 6, textAlign: 'center' }}>
            Chúng tôi cam kết mang lại những giá trị tốt nhất cho mỗi ứng viên.
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                icon: <GroupsIcon sx={{ fontSize: 40 }} />,
                title: 'Tư vấn tận tâm',
                desc: 'Mọi thắc mắc của bạn về công việc sẽ được đội ngũ tư vấn hỗ trợ chi tiết ngay khi liên hệ.'
              },
              {
                icon: <VerifiedIcon sx={{ fontSize: 40 }} />,
                title: 'Việc làm phù hợp',
                desc: 'Phân loại công việc dựa trên năng lực và yêu cầu địa lý gần nhà để tối ưu chi phí đi lại.'
              },
              {
                icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
                title: 'Cơ hội thăng tiến',
                desc: 'Hợp tác với các tập đoàn lớn có lộ trình phát triển nghề nghiệp rõ ràng cho nhân viên.'
              }
            ].map((item, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <Card sx={{ height: '100%', borderRadius: 4, textAlign: 'center', p: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.04)', border: '1px solid', borderColor: 'divider' }}>
                  <CardContent>
                    <Box sx={{ color: 'primary.main', mb: 3 }}>
                      {item.icon}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {item.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Process Section */}
        <Paper sx={{ p: { xs: 5, md: 10 }, borderRadius: 6, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', mb: 12 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 6 }}>
            Quy trình tuyển dụng đơn giản
          </Typography>

          <Grid container spacing={2}>
            {ABOUT_PROCESS_STEPS.map((node, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <Box sx={{ textAlign: { xs: 'left', md: 'center' }, p: 2 }}>
                  <Typography
                    variant="h2"
                    color="primary.main"
                    sx={{
                      fontWeight: 'bold',
                      lineHeight: 1,
                      mb: 1,
                    }}
                  >
                    {node.step}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {node.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {node.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Categories Section */}
        <Box sx={{ mb: 12, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }} gutterBottom>
            Lĩnh vực tuyển dụng trọng tâm
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 3, gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['Sản xuất đóng gói', 'Kho vận & Logictics', 'Bốc xếp phân loại', 'Lắp ráp linh kiện', 'Lao động ca kíp'].map((cat) => (
              <Paper key={cat} sx={{ px: 3, py: 1.5, borderRadius: 10, bgcolor: 'rgba(255, 140, 0, 0.05)', border: '1px solid', borderColor: 'rgba(255, 140, 0, 0.15)' }}>
                <Typography sx={{ fontWeight: 'bold' }} color="primary">{cat}</Typography>
              </Paper>
            ))}
          </Stack>
        </Box>

        {/* CTA */}
        <Box sx={{ textAlign: 'center' }}>
          <AppButton
            href="/jobs"
            variant="contained"
            size="large"
            sx={{ px: 6, py: 2, borderRadius: 3, fontWeight: 'bold', fontSize: '1.1rem' }}
          >
            Bắt đầu tìm việc ngay
          </AppButton>
        </Box>
      </Container>
    </Box>
  )
}
