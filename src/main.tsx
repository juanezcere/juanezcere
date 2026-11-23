import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { NavigationProvider, SettingsProvider, ThemeProvider } from './application/state';
import { DEFAULT_APP_SETTINGS } from './domain/constants';
import type { AppSettings } from './domain/entities';
import { createI18n, detectPreferredLanguage } from './infrastructure/i18n';
import { LocalStorageAppSettingsStorage, LocalStorageService } from './infrastructure/storage';
import { PhaseStatus } from './presentation/components/common/PhaseStatus';
import './presentation/styles/tokens.css';
import './presentation/styles/global.css';

const settingsStorage = new LocalStorageAppSettingsStorage(new LocalStorageService());
const initialSettings: AppSettings = settingsStorage.load() ?? {
  ...DEFAULT_APP_SETTINGS,
  language: detectPreferredLanguage(),
};

const i18n = createI18n(initialSettings.language);

const handleLanguageChange = (language: AppSettings['language']): void => {
  void i18n.changeLanguage(language);
};

const rootElement = document.getElementById('root');

if (!(rootElement instanceof HTMLElement)) {
  throw new Error('Root element #root was not found.');
}

createRoot(rootElement).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <SettingsProvider
        storage={settingsStorage}
        initialSettings={initialSettings}
        onLanguageChange={handleLanguageChange}
      >
        <ThemeProvider>
          <NavigationProvider>
            <PhaseStatus />
          </NavigationProvider>
        </ThemeProvider>
      </SettingsProvider>
    </I18nextProvider>
  </StrictMode>,
);
