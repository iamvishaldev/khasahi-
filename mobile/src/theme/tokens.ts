export const colors = {
  background: {
    primary: '#FAFAF8',
    secondary: '#FFFFFF',
  },
  surface: {
    primary: '#FFFFFF',
    subtle: '#EAF7F1',
  },
  text: {
    primary: '#0A0F0D',
    secondary: '#5B6B63',
    inverse: '#FFFFFF',
  },
  border: {
    subtle: '#E4E7E2',
  },
  accent: {
    primary: '#10B981',
    secondary: '#14B8A6',
  },
  feedback: {
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
  },
  brand: {
    emerald: '#10B981',
    teal: '#14B8A6',
    amber: '#F59E0B',
    coral: '#EF4444',
    ink: '#0A0F0D',
    warmWhite: '#FAFAF8',
  },
  scanner: {
    background: '#050807',
    glassSurface: 'rgba(255,255,255,0.10)',
    glassSurfaceActive: 'rgba(255,255,255,0.16)',
    glassBorder: 'rgba(255,255,255,0.18)',
    vignette: 'rgba(3,8,6,0.55)',
    textSecondary: 'rgba(255,255,255,0.72)',
  },
  scoreBand: {
    excellent: '#10B981',
    good: '#65C87A',
    moderate: '#F59E0B',
    needsImprovement: '#EF4444',
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radii = {
  sm: 10,
  md: 16,
  lg: 24,
  pill: 999,
} as const;

export const typography = {
  display: {fontSize: 32, lineHeight: 38, fontFamily: 'Onest-Bold'},
  title: {fontSize: 24, lineHeight: 30, fontFamily: 'Onest-SemiBold'},
  heading: {fontSize: 18, lineHeight: 24, fontFamily: 'Onest-Medium'},
  body: {fontSize: 16, lineHeight: 22, fontFamily: 'PlusJakartaSans-Regular'},
  caption: {fontSize: 13, lineHeight: 18, fontFamily: 'PlusJakartaSans-Regular'},
  label: {fontSize: 14, lineHeight: 18, fontFamily: 'PlusJakartaSans-Medium'},
  button: {fontSize: 16, lineHeight: 20, fontFamily: 'PlusJakartaSans-SemiBold'},
  wordmark: {fontSize: 20, lineHeight: 24, fontFamily: 'Onest-Bold'},
} as const;

export const shadows = {
  card: {
    shadowColor: '#0A0F0D',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 3,
  },
} as const;

export const theme = {
  colors,
  spacing,
  radii,
  typography,
  shadows,
} as const;

export type AppTheme = typeof theme;
