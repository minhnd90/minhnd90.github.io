export interface Job {
  slug: string
  title: string
  category: string
  type: string
  location: string
  salary: string
  date: string
  description: string
  tags: string[]
}

export interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
}

export type T_SystemTheme = 'light' | 'dark'

export type T_Theme = T_SystemTheme | 'system'

export type T_ThemeContextValue = {
  theme: T_Theme
  resolvedTheme: T_SystemTheme
  systemTheme: T_SystemTheme
  setTheme: (value: T_Theme | ((current: T_Theme) => T_Theme)) => void
}