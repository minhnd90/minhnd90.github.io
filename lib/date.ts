/**
 * Formats a date string or Date object to Vietnamese format (dd/mm/yyyy)
 */
export function formatVietnameseDate(date: string | Date): string {
  if (!date) return ''
  
  const d = new Date(date)
  if (isNaN(d.getTime())) return String(date) // Fallback to original string if invalid
  
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  
  return `${day}/${month}/${year}`
}
