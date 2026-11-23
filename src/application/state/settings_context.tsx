import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { AppSettings, LanguageCode, ThemeAccentId, ThemeMode } from '../../domain/entities';
import type { IAppSettingsStorage } from '../../domain/repositories';
import { SettingsContext, type SettingsContextValue } from './settings_scope';

interface SettingsProviderProps {
  readonly storage: IAppSettingsStorage;
  readonly initialSettings: AppSettings;
  readonly onLanguageChange?: (language: LanguageCode) => void;
  readonly children: ReactNode;
}

export function SettingsProvider({
  storage,
  initialSettings,
  onLanguageChange,
  children,
}: SettingsProviderProps) {
  const [settings, setSettings] = useState<AppSettings>(initialSettings);

  const setTheme = useCallback((theme: ThemeAccentId) => {
    setSettings((current) => ({ ...current, theme }));
  }, []);

  const setMode = useCallback((mode: ThemeMode) => {
    setSettings((current) => ({ ...current, mode }));
  }, []);

  const toggleMode = useCallback(() => {
    setSettings((current) => ({
      ...current,
      mode: current.mode === 'dark' ? 'light' : 'dark',
    }));
  }, []);

  const setLanguage = useCallback((language: LanguageCode) => {
    setSettings((current) => ({ ...current, language }));
  }, []);

  const setActiveProject = useCallback((activeProjectId: string | null) => {
    setSettings((current) => ({ ...current, activeProjectId }));
  }, []);

  useEffect(() => {
    storage.save(settings);
  }, [settings, storage]);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = settings.theme;
    root.dataset.mode = settings.mode;
  }, [settings.mode, settings.theme]);

  useEffect(() => {
    document.documentElement.lang = settings.language;
    onLanguageChange?.(settings.language);
  }, [onLanguageChange, settings.language]);

  const value = useMemo<SettingsContextValue>(
    () => ({
      settings,
      setTheme,
      setMode,
      toggleMode,
      setLanguage,
      setActiveProject,
    }),
    [settings, setActiveProject, setLanguage, setMode, setTheme, toggleMode],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}
