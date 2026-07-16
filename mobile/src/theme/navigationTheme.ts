import {
  DefaultTheme,
  type Theme as NavigationTheme,
} from '@react-navigation/native';
import {theme} from './tokens';

export const navigationTheme: NavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.colors.background.primary,
    card: theme.colors.surface.primary,
    text: theme.colors.text.primary,
    border: theme.colors.border.subtle,
    primary: theme.colors.accent.primary,
    notification: theme.colors.feedback.warning,
  },
};

