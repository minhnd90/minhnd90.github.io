'use client'

import { T_SystemTheme, T_Theme, T_ThemeContextValue } from '@/lib/types'
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'theme'

const DEFAULT_CONTEXT_VALUE: T_ThemeContextValue = {
  theme: 'system',
  resolvedTheme: 'light',
  systemTheme: 'light',
  setTheme: () => { }
}

const ThemeContext = createContext<T_ThemeContextValue>(DEFAULT_CONTEXT_VALUE)

function getSystemTheme(): T_SystemTheme {
  if (typeof window === 'undefined') {
    return 'light'
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getStoredTheme(): T_Theme {
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

function applyTheme(theme: T_Theme, systemTheme: T_SystemTheme) {
  const resolvedTheme = theme === 'system' ? systemTheme : theme
  const root = document.documentElement

  root.classList.remove('light', 'dark')
  root.classList.add(resolvedTheme)
  root.style.colorScheme = resolvedTheme
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Start with SSR-safe defaults so the first client render matches the
  // server render. Real values are synced in the effect below, after mount.
  const [theme, setThemeState] = useState<T_Theme>('system')
  const [systemTheme, setSystemTheme] = useState<T_SystemTheme>('light')
  const resolvedTheme = theme === 'system' ? systemTheme : theme

  useEffect(() => {
    // Sync real values from localStorage / matchMedia after hydration.
    const storedTheme = getStoredTheme()
    const currentSystemTheme = getSystemTheme()

    const updateTheme = () => {
      setThemeState(storedTheme)
      setSystemTheme(currentSystemTheme)
    }

    const timeoutId = window.setTimeout(updateTheme, 0)

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (event: MediaQueryListEvent) => {
      setSystemTheme(event.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleChange)

    return () => {
      window.clearTimeout(timeoutId)
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  useEffect(() => {
    applyTheme(theme, systemTheme)
  }, [theme, systemTheme])

  const setTheme = useCallback((nextTheme: T_Theme | ((current: T_Theme) => T_Theme)) => {
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
    () => ({ theme, resolvedTheme, systemTheme, setTheme }),
    [theme, resolvedTheme, systemTheme, setTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  return context || DEFAULT_CONTEXT_VALUE
}
