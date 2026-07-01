import { SvgIcon } from '@mui/material'

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
export interface JobCardProps {
  job: Job
  showDescription?: boolean
}

export interface JobFiltersProps {
  jobs: Job[]
  category: string
  type: string
  location: string
  keyword: string
  onCategoryChange: (value: string) => void
  onTypeChange: (value: string) => void
  onLocationChange: (value: string) => void
  onKeywordChange: (value: string) => void
}

export interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
}

export type FrontMatter = {
  title?: string
  category?: string
  type?: string
  location?: string
  salary?: string
  date?: string
  description?: string
  tags?: string[]
}

export type T_SystemTheme = 'light' | 'dark'

export type T_Theme = T_SystemTheme | 'system'

export type T_ThemeContextValue = {
  theme: T_Theme
  resolvedTheme: T_SystemTheme
  systemTheme: T_SystemTheme
  setTheme: (value: T_Theme | ((current: T_Theme) => T_Theme)) => void
}

export interface ContactRequestData {
  name: string
  email: string
  message: string
  submittedAt: string
  clientIp?: string
}

// ─── API Type Definitions ───────────────────────────────────────────────────

export type T_JobMetadata = {
  title: string
  description: string
  tags?: string[]
  responsibilities?: string[]
  requirements?: string[]
  benefits?: string[]
  location: string
  salary: string
  date: string
  type: string
  applyInstructions: string
  applyEmail?: string
}

export interface UserData {
  em?: string
  ph?: string
  ge?: string
  db?: string
  ln?: string
  fn?: string
  ct?: string
  st?: string
  zp?: string
  country?: string
}

export interface FacebookEvent {
  event_name: string
  event_time?: number
  event_source_url?: string
  user_data?: UserData
  custom_data?: Record<string, unknown>
  event_id?: string
}

export interface ConversionsPayload {
  data: FacebookEvent[]
  test_event_code?: string
}

export interface ValidationError {
  field: string
  message: string
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  details?: string[]
}

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface PageBreadcrumbProps {
  items: BreadcrumbItem[]
}

export interface EmptyStateProps {
  icon: typeof SvgIcon
  message: string
}

export interface PageHeaderProps {
  title: string
  subtitle?: string
  centered?: boolean
}
