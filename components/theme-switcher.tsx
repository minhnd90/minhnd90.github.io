'use client'

import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { IconButton } from '@mui/material'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

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
