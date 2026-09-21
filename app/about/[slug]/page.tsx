import PageBreadcrumb from '@/components/shared/breadcrumb'
import AppButton from '@/components/shared/button'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, Container, Divider, Typography } from '@mui/material'
import fs from 'fs'
import { notFound } from 'next/navigation'
import { importPage } from 'nextra/pages'
import path from 'path'

type AboutPageMetadata = {
  title: string
  description?: string
}

export function generateStaticParams() {
  const aboutDir = path.join(process.cwd(), 'content/about')
  if (!fs.existsSync(aboutDir)) return []

  return fs.readdirSync(aboutDir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => ({
      slug: file.replace(/\.mdx$/, '')
    }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  try {
    const { metadata } = await importPage(['about', slug])
    return metadata
  } catch {
    return {}
  }
}

export default async function AboutSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let PageContent
  let data: AboutPageMetadata

  try {
    const imported = await importPage(['about', slug])
    PageContent = imported.default
    data = imported.metadata as unknown as AboutPageMetadata
  } catch (error) {
    console.error('Failed to import MDX in /about/[slug]:', error)
    notFound()
  }

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <PageBreadcrumb items={[
            { label: 'Giới thiệu', href: '/about' },
            { label: data.title }
          ]} />

          <AppButton
            href="/about"
            startIcon={<ArrowBackIcon />}
            sx={{ mb: 4, fontWeight: 'bold' }}
            color="inherit"
          >
            Quay lại giới thiệu
          </AppButton>
        </Box>

        <Box sx={{ mb: 5 }}>
          <Typography variant="overline" color="primary" sx={{ fontWeight: 800, mb: 1, display: 'block' }}>
            Chính sách
          </Typography>
          <Typography component="h1" variant="h3" sx={{ fontWeight: 800, lineHeight: 1.2 }} gutterBottom>
            {data.title}
          </Typography>

          {data.description && (
            <Typography variant="h6" color="text.secondary" sx={{ fontStyle: 'italic', fontWeight: 400, borderLeft: '4px solid', borderColor: 'primary.main', pl: 3, my: 3 }}>
              {data.description}
            </Typography>
          )}
        </Box>

        <Divider sx={{ mb: 6 }} />

        <Box
          className="nextra-content"
          sx={{
            lineHeight: 1.8,
            fontSize: '1.125rem',
            color: 'text.primary',
            '& h2': { mt: 6, mb: 3, fontWeight: 800 },
            '& h3': { mt: 4, mb: 2, fontWeight: 700 },
            '& p': { mb: 3 },
            '& ul, & ol': { mb: 4, pl: 3 },
            '& li': { mb: 1 },
            '& a': { color: 'primary.main' }
          }}
        >
          <PageContent />
        </Box>
      </Container>
    </Box>
  )
}
