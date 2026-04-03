import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Button,
  Chip,
  Paper
} from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
import SendIcon from '@mui/icons-material/Send'
import Link from 'next/link'
import { CONTACT_EMAIL } from '../../../lib/constants'
import { formatVietnameseDate } from '../../../lib/date'

export function generateStaticParams() {
  const jobsDir = path.join(process.cwd(), 'content/jobs')
  if (!fs.existsSync(jobsDir)) return []
  const files = fs.readdirSync(jobsDir)
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => ({
      slug: file.replace('.mdx', '')
    }))
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const mdxPath = path.join(process.cwd(), 'content/jobs', `${slug}.mdx`)

  if (!fs.existsSync(mdxPath)) {
    notFound()
  }

  const fileContent = fs.readFileSync(mdxPath, 'utf-8')
  const { data } = matter(fileContent)

  const applyEmail = data.applyEmail || CONTACT_EMAIL

  try {
    const { default: JobContent } = await import(`../../../content/jobs/${slug}.mdx`)
    return (
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Main Content Column */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="overline" color="primary" fontWeight="bold">
                  Chi tiết tuyển dụng
                </Typography>
                <Typography variant="h3" component="h1" fontWeight={800} gutterBottom>
                  {data.title}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                  {data.tags?.map((tag: string) => (
                    <Chip key={tag} label={tag} size="small" variant="outlined" />
                  ))}
                </Stack>
              </Box>

              <Card sx={{ borderRadius: 3, mb: 4, variant: 'outlined' }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Mô tả công việc
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.8 }}>
                    {data.description}
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Nhiệm vụ chính
                      </Typography>
                      <Box component="ul" sx={{ pl: 2, m: 0 }}>
                        {data.responsibilities?.map((item: string) => (
                          <Typography component="li" key={item} sx={{ mb: 1, color: 'text.secondary' }}>
                            {item}
                          </Typography>
                        ))}
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Yêu cầu ứng tuyển
                      </Typography>
                      <Box component="ul" sx={{ pl: 2, m: 0 }}>
                        {data.requirements?.map((item: string) => (
                          <Typography component="li" key={item} sx={{ mb: 1, color: 'text.secondary' }}>
                            {item}
                          </Typography>
                        ))}
                      </Box>
                    </Grid>
                  </Grid>

                  <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Quyền lợi
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, m: 0 }}>
                      {data.benefits?.map((item: string) => (
                        <Typography component="li" key={item} sx={{ mb: 1, color: 'text.secondary' }}>
                          {item}
                        </Typography>
                      ))}
                    </Box>
                  </Box>

                  <Box sx={{ mt: 6 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Chi tiết khác
                    </Typography>
                    <Box className="nextra-job-content" sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
                      <JobContent />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Sidebar Column */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Stack spacing={3} sx={{ position: 'sticky', top: 100 }}>
                <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Thông tin chung
                  </Typography>
                  <Stack spacing={2.5} sx={{ mt: 2 }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <LocationOnIcon color="primary" />
                      <Box>
                        <Typography variant="body2" color="text.secondary">Địa điểm</Typography>
                        <Typography variant="body1" fontWeight="bold">{data.location}</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <AttachMoneyIcon color="primary" />
                      <Box>
                        <Typography variant="body2" color="text.secondary">Lương hấp dẫn</Typography>
                        <Typography variant="body1" fontWeight="bold" color="success.main">{data.salary}</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <AccessTimeIcon color="primary" />
                      <Box>
                        <Typography variant="body2" color="text.secondary">Ngày đăng</Typography>
                        <Typography variant="body1" fontWeight="bold">{formatVietnameseDate(data.date)}</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <WorkOutlineIcon color="primary" />
                      <Box>
                        <Typography variant="body2" color="text.secondary">Loại hình</Typography>
                        <Typography variant="body1" fontWeight="bold">{data.type}</Typography>
                      </Box>
                    </Box>
                  </Stack>
                </Paper>

                <Card sx={{ bgcolor: 'secondary.main', color: 'white', borderRadius: 3, p: 1 }}>
                  <CardContent>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                      Ứng tuyển ngay?
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9, mb: 3 }}>
                      {data.applyInstructions}
                    </Typography>
                    <Link href={`mailto:${applyEmail}?subject=Ứng tuyển cho vị trí ${encodeURIComponent(data.title)}`} passHref style={{ textDecoration: 'none' }}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        startIcon={<SendIcon />}
                        sx={{ borderRadius: 2, fontWeight: 'bold' }}
                      >
                        Gửi email ứng tuyển
                      </Button>
                    </Link>
                    <Typography variant="caption" sx={{ display: 'block', mt: 2, textAlign: 'center', opacity: 0.8 }}>
                      Liên hệ: {applyEmail}
                    </Typography>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    )
  } catch (error) {
    console.error('Failed to render Job detail:', error)
    notFound()
  }
}
