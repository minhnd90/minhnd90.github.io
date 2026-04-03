'use client'

import { createTheme, ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { ReactNode } from 'react'

const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: '#FF8C00' // Dark Orange / Tangelo
    },
    secondary: {
      main: '#002147' // Oxford Blue
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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
