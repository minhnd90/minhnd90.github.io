'use client'

import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { IconButton } from '@mui/material'
import { useEffect, useState } from 'react'
import { useTheme } from '@/components/theme/ThemeProvider'

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => { setMounted(true) }, [])

  if (!mounted) { return null }

  return (
    <IconButton
      onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
      color="inherit"
      aria-label={`Switch to ${resolvedTheme === 'light' ? 'dark' : 'light'} theme`}
      aria-pressed={resolvedTheme === 'dark'}
    >
      {resolvedTheme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  )
}
