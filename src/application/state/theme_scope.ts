import { createContext, useContext } from 'react';
import type { ThemeAccentId, ThemeMode } from '../../domain/entities';

export interface ThemeContextValue {
  readonly theme: ThemeAccentId;
  readonly mode: ThemeMode;
  readonly setTheme: (theme: ThemeAccentId) => void;
  readonly setMode: (mode: ThemeMode) => void;
  readonly toggleMode: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider.');
  }

  return context;
}
