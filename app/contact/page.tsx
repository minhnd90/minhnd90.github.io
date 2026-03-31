import type { Metadata } from 'next'
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Button,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AssignmentIcon from '@mui/icons-material/Assignment'
import SendIcon from '@mui/icons-material/Send'
import InfoIcon from '@mui/icons-material/Info'
import Link from 'next/link'

import PageHeader from '../../components/shared/page-header'

export const metadata: Metadata = {
  title: 'Liên hệ & Ứng tuyển | BM Group',
  description: 'Gửi hồ sơ ứng tuyển hoặc liên hệ trực tiếp với BM Group để nhận việc làm nhanh chóng.',
}

export default function ContactPage() {
  const contactEmail = process.env.CONTACT_EMAIL || 'tuyendung@bm-group.info.vn'
  const contactPhone = process.env.CONTACT_PHONE || '0988 108 250'
  const applySubject = encodeURIComponent('Ứng tuyển việc làm phổ thông')

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <PageHeader 
          title="Liên hệ & Ứng tuyển" 
          subtitle="Chúng tôi luôn sẵn sàng hỗ trợ bạn tìm được công việc phù hợp nhất. Phản hồi nhanh trong vòng 24h." 
        />

        <Grid container spacing={5}>
          {/* Contact Info Column */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Stack spacing={4}>
              <Box>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Thông tin tuyển dụng
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Liên hệ trực tiếp qua Hotline hoặc Email để được sắp xếp lịch phỏng vấn sớm nhất.
                </Typography>

                <Paper sx={{ p: 4, borderRadius: 4, border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
                  <Stack spacing={3}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Box sx={{ bgcolor: 'rgba(255, 140, 0, 0.1)', p: 1.5, borderRadius: 2, display: 'flex' }}>
                        <EmailIcon color="primary" />
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">Email ứng tuyển</Typography>
                        <Typography variant="h6" fontWeight="bold">{contactEmail}</Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Box sx={{ bgcolor: 'rgba(255, 140, 0, 0.1)', p: 1.5, borderRadius: 2, display: 'flex' }}>
                        <PhoneIcon color="primary" />
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">Hotline 24/7</Typography>
                        <Typography variant="h6" fontWeight="bold">{contactPhone}</Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Box sx={{ bgcolor: 'rgba(255, 140, 0, 0.1)', p: 1.5, borderRadius: 2, display: 'flex' }}>
                        <LocationOnIcon color="primary" />
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">Khu vực làm việc</Typography>
                        <Typography variant="h6" fontWeight="bold">Hà Nội, Bắc Ninh, Hải Phòng</Typography>
                      </Box>
                    </Box>
                  </Stack>
                </Paper>
              </Box>

              <Card sx={{ bgcolor: 'primary.main', color: 'white', borderRadius: 4, p: 2 }}>
                <CardContent>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Nộp hồ sơ ngay?
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9, mb: 3 }}>
                    Gửi thông tin của bạn ngay bây giờ để nhận lịch phỏng vấn sớm nhất.
                  </Typography>
                  <Button
                    component={Link}
                    href={`mailto:${contactEmail}?subject=${applySubject}`}
                    variant="contained"
                    sx={{ 
                      bgcolor: 'white', 
                      color: 'primary.main',
                      fontWeight: 'bold',
                      borderRadius: 2,
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.9)'
                      }
                    }}
                    fullWidth
                    size="large"
                    startIcon={<SendIcon />}
                  >
                    Gửi email ứng tuyển ngay
                  </Button>
                </CardContent>
              </Card>
            </Stack>
          </Grid>

          {/* Instructions Column */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper sx={{ p: { xs: 4, md: 6 }, borderRadius: 4, height: '100%' }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Hướng dẫn nộp hồ sơ
              </Typography>
              
              <List sx={{ mt: 2, mb: 4 }}>
                {[
                  { 
                    icon: <AssignmentIcon color="primary" />, 
                    title: 'Vị trí mong muốn', 
                    desc: 'Tiêu đề email ghi rõ: Ứng tuyển [Vị trí công việc]' 
                  },
                  { 
                    icon: <InfoIcon color="primary" />, 
                    title: 'Thông tin cơ bản', 
                    desc: 'Gửi ngắn gọn: Họ tên, Năm sinh, Địa chỉ, Số điện thoại liên hệ.' 
                  },
                  { 
                    icon: <AssignmentIcon color="primary" />, 
                    title: 'Giấy tờ tùy thân', 
                    desc: 'Nếu có, đính kèm ảnh chụp CCCD/CMND để chúng tôi ưu tiên xét duyệt.' 
                  }
                ].map((item, index) => (
                  <ListItem key={index} sx={{ px: 0, py: 2 }}>
                    <ListItemIcon sx={{ minWidth: 50 }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={<Typography fontWeight="bold">{item.title}</Typography>}
                      secondary={item.desc}
                    />
                  </ListItem>
                ))}
              </List>

              <Divider sx={{ mb: 4 }} />

              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Mẫu nội dung email ứng tuyển
              </Typography>
              <Box 
                sx={{ 
                  bgcolor: 'background.default', 
                  p: 3, 
                  borderRadius: 3, 
                  border: '1px dashed', 
                  borderColor: 'divider',
                  fontFamily: 'monospace',
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  position: 'relative'
                }}
              >
                <Typography variant="caption" sx={{ position: 'absolute', top: 8, right: 12, color: 'text.disabled' }}>
                  Sao chép và sửa lại thông tin của bạn
                </Typography>
                {`Tiêu đề: Ứng tuyển Công nhân đóng gói

Xin chào Bình Minh Group,

Tôi tên là [Họ tên], sinh năm [19xx], hiện sống tại [Địa chỉ].
Tôi mong muốn ứng tuyển vị trí Công nhân đóng gói.
Số điện thoại liên hệ: [SĐT]

Trân trọng,
[Họ tên]`}
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 3, fontStyle: 'italic' }}>
                * Lưu ý: Chúng tôi không thu bất kỳ khoản phí nào của người lao động. Cẩn thận với các hành vi lừa đảo nộp phí phỏng vấn.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
