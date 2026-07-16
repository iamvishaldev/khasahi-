export const colors = {
  background: {
    primary: '#F5F7F4',
    secondary: '#FFFFFF',
  },
  surface: {
    primary: '#FFFFFF',
    subtle: '#EEF3EE',
  },
  text: {
    primary: '#152018',
    secondary: '#4E5C50',
    inverse: '#FFFFFF',
  },
  border: {
    subtle: '#D7E0D8',
  },
  accent: {
    primary: '#264D3B',
    secondary: '#5F8A72',
  },
  feedback: {
    success: '#2F7D4B',
    warning: '#C3871E',
    danger: '#B5493A',
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
  display: 32,
  title: 24,
  heading: 18,
  body: 16,
  caption: 13,
} as const;

export const shadows = {
  card: {
    shadowColor: '#152018',
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

