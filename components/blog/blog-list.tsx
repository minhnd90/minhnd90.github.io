'use client'

import { Box, Typography, Container, Grid, Card, CardContent, CardActions, Button, Chip, useTheme } from '@mui/material'
import Link from 'next/link'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

export interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
}

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  const theme = useTheme()

  return (
    <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography component="h1" variant="h3" fontWeight={800} gutterBottom color="primary.main">
            Góc Chia Sẻ
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', fontWeight: 400 }}>
            Kinh nghiệm tìm việc, mẹo phỏng vấn và các kỹ năng sống dành cho người lao động phổ thông.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {posts.map((post) => (
            <Grid size={{ xs: 12, md: 6 }} key={post.slug}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  boxShadow: theme.palette.mode === 'dark' ? 2 : '0 4px 12px rgba(0,0,0,0.05)',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.palette.mode === 'dark' ? 4 : '0 8px 24px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 4 }}>
                  <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block" gutterBottom>
                    {new Date(post.date).toLocaleDateString('vi-VN')}
                  </Typography>
                  <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom sx={{ mt: 1 }}>
                    {post.title}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, my: 2, flexWrap: 'wrap' }}>
                    {post.tags.map((tag) => (
                      <Chip key={tag} label={tag} size="small" variant="outlined" color="primary" />
                    ))}
                  </Box>
                  <Typography variant="body1" color="text.secondary" sx={{ mt: 2, lineHeight: 1.6 }}>
                    {post.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 4, pt: 0 }}>
                  <Button
                    component={Link}
                    href={`/blog/${post.slug}`}
                    endIcon={<ArrowForwardIcon />}
                    color="secondary"
                    sx={{ fontWeight: 'bold' }}
                  >
                    Đọc tiếp
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
