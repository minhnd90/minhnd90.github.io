import { Breadcrumbs, Typography, Box } from '@mui/material'
import Link from 'next/link'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface PageBreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function PageBreadcrumb({ items }: PageBreadcrumbProps) {
  return (
    <Box sx={{ mb: 3 }}>
      <Breadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />} 
        aria-label="breadcrumb"
      >
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography 
            variant="body2" 
            sx={{ 
              fontWeight: 500,
              '&:hover': { color: 'primary.main' } 
            }}
          >
            Trang chủ
          </Typography>
        </Link>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          
          if (isLast || !item.href) {
            return (
              <Typography 
                key={index} 
                variant="body2" 
                color="text.disabled"
                sx={{ fontWeight: 500 }}
              >
                {item.label}
              </Typography>
            )
          }

          return (
            <Link 
              key={index} 
              href={item.href} 
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 500,
                  '&:hover': { color: 'primary.main' } 
                }}
              >
                {item.label}
              </Typography>
            </Link>
          )
        })}
      </Breadcrumbs>
    </Box>
  )
}
