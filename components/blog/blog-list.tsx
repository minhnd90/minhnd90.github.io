'use client'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Box, Card, CardActions, CardContent, Chip, Container, Grid, Typography, useTheme } from '@mui/material'
import PageBreadcrumb from '../shared/breadcrumb'
import AppButton from '../shared/button'
import PageHeader from '../shared/page-header'

import { formatVietnameseDate } from '../../lib/date'
import { COMMON_STYLES, getCardShadow } from '../../lib/styles'
import { BlogPost } from '../../lib/types'

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  const theme = useTheme()

  return (
    <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <PageBreadcrumb items={[{ label: 'Blog' }]} />
        <PageHeader
          title="Góc Chia Sẻ"
          subtitle="Kinh nghiệm tìm việc, mẹo phỏng vấn và các kỹ năng sống dành cho người lao động phổ thông."
        />

        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid size={{ xs: 12, md: 6 }} key={post.slug}>
              <Card
                className="card-hover"
                sx={{
                  boxShadow: getCardShadow(theme),
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 4 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold', display: 'block' }} gutterBottom>
                    {formatVietnameseDate(post.date)}
                  </Typography>
                  <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mt: 1 }}>
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
                  <AppButton
                    href={`/blog/${post.slug}`}
                    endIcon={<ArrowForwardIcon />}
                    color={theme.palette.mode === 'dark' ? 'primary' : 'secondary'}
                    sx={COMMON_STYLES.boldText}
                  >
                    Đọc tiếp
                  </AppButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
