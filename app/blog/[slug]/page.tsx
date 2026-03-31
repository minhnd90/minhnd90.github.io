import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import {
  Container,
  Box,
  Typography,
  Chip,
  Stack,
  Button,
  Divider
} from '@mui/material'
import Link from 'next/link'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import PageBreadcrumb from '../../../components/shared/breadcrumb'

export function generateStaticParams() {
  const blogDir = path.join(process.cwd(), 'content/blog')
  if (!fs.existsSync(blogDir)) return []
  const files = fs.readdirSync(blogDir)
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => ({
      slug: file.replace('.mdx', '')
    }))
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const mdxPath = path.join(process.cwd(), 'content/blog', `${slug}.mdx`)

  if (!fs.existsSync(mdxPath)) {
    notFound()
  }

  const fileContent = fs.readFileSync(mdxPath, 'utf-8')
  const { data } = matter(fileContent)

  try {
    const { default: PostContent } = await import(`../../../content/blog/${slug}.mdx`)

    return (
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.default', minHeight: '100vh' }}>
        <Container maxWidth="lg">
          {/* Breadcrumbs & Navigation */}
          <Box sx={{ mb: 4 }}>
            <PageBreadcrumb items={[
              { label: 'Blog', href: '/blog' },
              { label: data.title }
            ]} />

            <Button
              component={Link}
              href="/blog"
              startIcon={<ArrowBackIcon />}
              sx={{ mb: 4, fontWeight: 'bold' }}
              color="inherit"
            >
              Quay lại danh sách
            </Button>
          </Box>

          {/* Article Header */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="overline" color="primary" sx={{ fontWeight: 800, mb: 1, display: 'block' }}>
              Blog Chia Sẻ
            </Typography>
            <Typography component="h1" variant="h3" fontWeight={800} gutterBottom sx={{ lineHeight: 1.2 }}>
              {data.title}
            </Typography>

            <Stack direction="row" spacing={3} alignItems="center" sx={{ mt: 3, mb: 4, flexWrap: 'wrap', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                <CalendarTodayIcon fontSize="small" />
                <Typography variant="body2" fontWeight={500}>
                  {new Date(data.date).toLocaleDateString('vi-VN')}
                </Typography>
              </Box>
              <Stack direction="row" spacing={1}>
                {data.tags?.map((tag: string) => (
                  <Chip key={tag} label={tag} size="small" variant="outlined" color="primary" />
                ))}
              </Stack>
            </Stack>

            <Typography variant="h6" color="text.secondary" sx={{ fontStyle: 'italic', fontWeight: 400, borderLeft: '4px solid', borderColor: 'primary.main', pl: 3, my: 4 }}>
              {data.description}
            </Typography>
          </Box>

          <Divider sx={{ mb: 6 }} />

          {/* Article Content */}
          <Box
            className="nextra-job-content"
            sx={{
              lineHeight: 1.8,
              fontSize: '1.125rem',
              color: 'text.primary',
              '& h2': { mt: 6, mb: 3, fontWeight: 800 },
              '& h3': { mt: 4, mb: 2, fontWeight: 700 },
              '& p': { mb: 3 },
              '& ul, & ol': { mb: 4, pl: 3 },
              '& li': { mb: 1 }
            }}
          >
            <PostContent />
          </Box>

          {/* Article Footer */}
          <Box sx={{ mt: 10, p: 4, bgcolor: 'background.paper', borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Bạn thấy bài viết này hữu ích?
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Chia sẻ bài viết này cho bạn bè hoặc người thân đang tìm việc nhé. Nếu bạn cần hỗ trợ trực tiếp, đừng ngần ngại liên hệ với chúng tôi.
            </Typography>
            <Button
              component={Link}
              href="/contact"
              variant="contained"
              sx={{ fontWeight: 'bold', borderRadius: 2 }}
            >
              Liên hệ chúng tôi
            </Button>
          </Box>
        </Container>
      </Box>
    )
  } catch (error) {
    console.error('Failed to import MDX:', error)
    notFound()
  }
}
