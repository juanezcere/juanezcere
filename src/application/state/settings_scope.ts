import { createContext, useContext } from 'react';
import type {
  AppSettings,
  LanguageCode,
  ThemeAccentId,
  ThemeMode,
} from '../../domain/entities';

export interface SettingsContextValue {
  readonly settings: AppSettings;
  readonly setTheme: (theme: ThemeAccentId) => void;
  readonly setMode: (mode: ThemeMode) => void;
  readonly toggleMode: () => void;
  readonly setLanguage: (language: LanguageCode) => void;
  readonly setActiveProject: (projectId: string | null) => void;
}

export const SettingsContext = createContext<SettingsContextValue | null>(null);

export function useSettings(): SettingsContextValue {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider.');
  }

  return context;
}
