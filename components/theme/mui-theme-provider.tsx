'use client'

import { createTheme, ThemeProvider as MuiProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { ReactNode, useMemo } from 'react'
import { useTheme } from './ThemeProvider'

const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#FF8C00' // Dark Orange / Tangelo
      },
      secondary: {
        main: '#002147' // Oxford Blue
      },
      background: {
        default: mode === 'dark' ? '#121212' : '#f6f6f6',
        paper: mode === 'dark' ? '#1e1e1e' : '#ffffff'
      },
      text: {
        primary: mode === 'dark' ? '#ffffff' : '#000000',
        secondary: mode === 'dark' ? '#bbbbbb' : '#666666'
      }
    },
    typography: {
      fontFamily: 'inherit'
    },
    shape: {
      borderRadius: 8
    }
  })

export default function MuiThemeProvider({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme()
  const mode = resolvedTheme === 'dark' ? 'dark' : 'light'
  const theme = useMemo(() => getTheme(mode), [mode])

  return (
    <MuiProvider theme={theme}>
      <CssBaseline />
      <div suppressHydrationWarning>
        {children}
      </div>
    </MuiProvider>
  )
}
