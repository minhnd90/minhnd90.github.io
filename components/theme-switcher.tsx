'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { IconButton } from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

export default function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false)
    const { resolvedTheme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <IconButton
            onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
            color="inherit"
            aria-label="toggle theme"
        >
            {resolvedTheme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
    )
}
