import { useMemo, type ReactNode } from 'react';
import { useSettings } from './settings_scope';
import { ThemeContext, type ThemeContextValue } from './theme_scope';

interface ThemeProviderProps {
  readonly children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { settings, setTheme, setMode, toggleMode } = useSettings();

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme: settings.theme,
      mode: settings.mode,
      setTheme,
      setMode,
      toggleMode,
    }),
    [setMode, setTheme, settings.mode, settings.theme, toggleMode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
