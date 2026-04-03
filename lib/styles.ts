// Common styling constants for consistent UI
export const COMMON_STYLES = {
  boldText: { fontWeight: 'bold' },
  cardPadding: { p: 3 },
  buttonRadius: { borderRadius: 2 },
  cardShadow: '0 4px 12px rgba(0,0,0,0.05)',
  cardShadowDark: 2,
}

// Theme-aware card shadow function
export const getCardShadow = (theme: any) =>
  theme.palette.mode === 'dark' ? COMMON_STYLES.cardShadowDark : COMMON_STYLES.cardShadow

// Common grid sizes
export const GRID_SIZES = {
  responsiveCard: { xs: 12, md: 6 },
  responsiveFilter: { xs: 12, sm: 4, md: 2.6 },
}
