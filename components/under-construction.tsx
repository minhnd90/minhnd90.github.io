"use client"

import React from 'react'
import { Box, Typography, Container, keyframes } from '@mui/material'
import ConstructionIcon from '@mui/icons-material/Construction'

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
`

const UnderConstruction = () => {
    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '60vh',
                    textAlign: 'center',
                    gap: 4
                }}
            >
                <Box
                    sx={{
                        animation: `${float} 3s ease-in-out infinite`,
                        color: 'primary.main',
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <ConstructionIcon sx={{ fontSize: 100, opacity: 0.8 }} />
                </Box>

                <Box>
                    <Typography
                        variant="h2"
                        component="h1"
                        gutterBottom
                        sx={{
                            fontWeight: 800,
                            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        Under Construction
                    </Typography>

                    <Typography variant="h5" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto', lineHeight: 1.6 }}>
                        We're working hard to bring you a new experience.
                        Check back soon for updates!
                    </Typography>
                </Box>
            </Box>
        </Container>
    )
}

export default UnderConstruction
