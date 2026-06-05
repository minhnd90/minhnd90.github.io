'use client'

import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

type ThemeContextValue = {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  systemTheme: 'light' | 'dark'
  setTheme: (value: Theme | ((current: Theme) => Theme)) => void
}

const STORAGE_KEY = 'theme'

const DEFAULT_CONTEXT_VALUE: ThemeContextValue = {
  theme: 'system',
  resolvedTheme: 'light',
  systemTheme: 'light',
  setTheme: () => {}
}

const ThemeContext = createContext<ThemeContextValue>(DEFAULT_CONTEXT_VALUE)

function getSystemTheme() {
  if (typeof window === 'undefined') {
    return 'light'
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getStoredTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'system'
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored
    }
  } catch {
    // ignore
  }

  return 'system'
}

function applyTheme(theme: Theme, systemTheme: 'light' | 'dark') {
  const resolvedTheme = theme === 'system' ? systemTheme : theme
  const root = document.documentElement

  root.classList.remove('light', 'dark')
  root.classList.add(resolvedTheme)
  root.style.colorScheme = resolvedTheme
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getStoredTheme)
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(() => getSystemTheme())
  const resolvedTheme = theme === 'system' ? systemTheme : theme

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (event: MediaQueryListEvent) => {
      setSystemTheme(event.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener?.('change', handleChange)
    mediaQuery.addListener?.(handleChange)

    return () => {
      mediaQuery.removeEventListener?.('change', handleChange)
      mediaQuery.removeListener?.(handleChange)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    applyTheme(theme, systemTheme)
  }, [theme, systemTheme])

  const setTheme = useCallback((nextTheme: Theme | ((current: Theme) => Theme)) => {
    setThemeState((currentTheme) => {
      const newTheme = typeof nextTheme === 'function' ? nextTheme(currentTheme) : nextTheme

      if (typeof window !== 'undefined') {
        try {
          window.localStorage.setItem(STORAGE_KEY, newTheme)
        } catch {
          // ignore write failures
        }
      }

      return newTheme
    })
  }, [])

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      systemTheme,
      setTheme
    }),
    [theme, resolvedTheme, systemTheme, setTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  return context || DEFAULT_CONTEXT_VALUE
}
