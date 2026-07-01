'use client'

import { TXT_FEATURE, TXT_FEATURE_LIST } from '@/lib/constants'
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  SvgIcon,
  Typography,
  useTheme
} from '@mui/material'

export default function Features() {
  const theme = useTheme()

  return (
    <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography
            component="h2"
            variant="h3"
            sx={{ fontWeight: 700 }}
            gutterBottom
          >
            {TXT_FEATURE.heading}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {TXT_FEATURE.description}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {TXT_FEATURE_LIST.map((feature, index) => (
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
                  <Box sx={{ mb: 2 }}>
                    <SvgIcon
                      component={feature.icon}
                      fontSize="large"
                      color="primary"
                    />
                  </Box>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{ fontWeight: 'bold' }}
                    gutterBottom
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mt: 2 }}
                  >
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
