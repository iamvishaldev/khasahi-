import React, {PropsWithChildren, createContext, useContext} from 'react';
import {AppTheme, theme} from './tokens';

const ThemeContext = createContext<AppTheme>(theme);

export function ThemeProvider({
  children,
}: PropsWithChildren): React.JSX.Element {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): AppTheme {
  return useContext(ThemeContext);
}

