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
import ContactForm from './contact-form'
import { CONTACT_EMAIL, CONTACT_PHONE, META, PAGE_HEADERS, APPLY_EMAIL_SUBJECT, APPLY_EMAIL_TEMPLATE, CONTACT_UI } from '../../lib/constants'

export const metadata: Metadata = META.contact

export default function ContactPage() {
  const contactEmail = CONTACT_EMAIL
  const contactPhone = CONTACT_PHONE
  const applySubject = encodeURIComponent(APPLY_EMAIL_SUBJECT)

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <PageHeader
          title={PAGE_HEADERS.contact.title}
          subtitle={PAGE_HEADERS.contact.subtitle}
        />

        <Grid container spacing={5}>
          {/* Contact Info Column */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Stack spacing={4}>
              <Box>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  {CONTACT_UI.recruitmentInfo}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  {CONTACT_UI.contactDescription}
                </Typography>

                <Paper sx={{ p: 4, borderRadius: 4, border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
                  <Stack spacing={3}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Box sx={{ bgcolor: 'rgba(255, 140, 0, 0.1)', p: 1.5, borderRadius: 2, display: 'flex' }}>
                        <EmailIcon color="primary" />
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">{CONTACT_UI.emailLabel}</Typography>
                        <Typography variant="h6" fontWeight="bold">{contactEmail}</Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Box sx={{ bgcolor: 'rgba(255, 140, 0, 0.1)', p: 1.5, borderRadius: 2, display: 'flex' }}>
                        <PhoneIcon color="primary" />
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">{CONTACT_UI.hotlineLabel}</Typography>
                        <Typography variant="h6" fontWeight="bold">{contactPhone}</Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Box sx={{ bgcolor: 'rgba(255, 140, 0, 0.1)', p: 1.5, borderRadius: 2, display: 'flex' }}>
                        <LocationOnIcon color="primary" />
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">{CONTACT_UI.locationLabel}</Typography>
                        <Typography variant="h6" fontWeight="bold">{CONTACT_UI.locationValue}</Typography>
                      </Box>
                    </Box>
                  </Stack>
                </Paper>
              </Box>

              <ContactForm />

              <Card sx={{ bgcolor: 'primary.main', color: 'white', borderRadius: 4, p: 2 }}>
                <CardContent>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {CONTACT_UI.applyNowTitle}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9, mb: 3 }}>
                    {CONTACT_UI.applyNowDescription}
                  </Typography>
                  <Link href={`mailto:${contactEmail}?subject=${applySubject}`} passHref style={{ textDecoration: 'none' }}>
                    <Button
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
                  </Link>
                </CardContent>
              </Card>
            </Stack>
          </Grid>

          {/* Instructions Column */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper sx={{ p: { xs: 4, md: 6 }, borderRadius: 4, height: '100%' }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {CONTACT_UI.applicationGuide}
              </Typography>

              <List sx={{ mt: 2, mb: 4 }}>
                {[
                  {
                    icon: <AssignmentIcon color="primary" />,
                    title: CONTACT_UI.positionTitle,
                    desc: CONTACT_UI.positionDesc
                  },
                  {
                    icon: <InfoIcon color="primary" />,
                    title: CONTACT_UI.basicInfoTitle,
                    desc: CONTACT_UI.basicInfoDesc
                  },
                  {
                    icon: <AssignmentIcon color="primary" />,
                    title: CONTACT_UI.documentsTitle,
                    desc: CONTACT_UI.documentsDesc
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
                {CONTACT_UI.emailTemplateTitle}
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
                  {CONTACT_UI.copyHint}
                </Typography>
                {APPLY_EMAIL_TEMPLATE}
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 3, fontStyle: 'italic' }}>
                {CONTACT_UI.disclaimer}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
