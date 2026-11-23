import { createContext, useContext, useMemo, type ReactNode } from 'react';
import type { ThemeAccentId, ThemeMode } from '../../domain/entities';
import { useSettings } from './settings_context';

interface ThemeProviderProps {
  readonly children: ReactNode;
}

interface ThemeContextValue {
  readonly theme: ThemeAccentId;
  readonly mode: ThemeMode;
  readonly setTheme: (theme: ThemeAccentId) => void;
  readonly setMode: (mode: ThemeMode) => void;
  readonly toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

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

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider.');
  }

  return context;
}
