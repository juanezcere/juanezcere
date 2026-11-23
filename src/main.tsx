import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import {
  NavigationProvider,
  ProfileProvider,
  ProjectsProvider,
  SettingsProvider,
  ThemeProvider,
} from './application/state';
import { DEFAULT_APP_SETTINGS } from './domain/constants';
import type { AppSettings } from './domain/entities';
import { DataLoadError } from './errors/data_load_error';
import { createI18n, detectPreferredLanguage, loadTranslations } from './infrastructure/i18n';
import {
  JsonProjectRepository,
  JsonUserProfileRepository,
} from './infrastructure/repositories';
import { LocalStorageAppSettingsStorage, LocalStorageService } from './infrastructure/storage';
import { AppShell } from './presentation/layouts/AppShell';
import './presentation/styles/tokens.css';
import './presentation/styles/global.css';

const settingsStorage = new LocalStorageAppSettingsStorage(new LocalStorageService());
const userProfileRepository = new JsonUserProfileRepository();
const projectRepository = new JsonProjectRepository();

const rootElement = document.getElementById('root');

if (!(rootElement instanceof HTMLElement)) {
  throw new Error('Root element #root was not found.');
}

async function bootstrap(root: HTMLElement): Promise<void> {
  const initialSettings: AppSettings = settingsStorage.load() ?? {
    ...DEFAULT_APP_SETTINGS,
    language: detectPreferredLanguage(),
  };

  const [translations, profile, projects] = await Promise.all([
    loadTranslations(),
    userProfileRepository.getProfile(),
    projectRepository.getAll(),
  ]);

  const i18n = createI18n(initialSettings.language, translations);

  const handleLanguageChange = (language: AppSettings['language']): void => {
    void i18n.changeLanguage(language);
  };

  createRoot(root).render(
    <StrictMode>
      <I18nextProvider i18n={i18n}>
        <SettingsProvider
          storage={settingsStorage}
          initialSettings={initialSettings}
          onLanguageChange={handleLanguageChange}
        >
          <ThemeProvider>
            <ProfileProvider profile={profile}>
              <ProjectsProvider projects={projects}>
                <NavigationProvider>
                  <AppShell />
                </NavigationProvider>
              </ProjectsProvider>
            </ProfileProvider>
          </ThemeProvider>
        </SettingsProvider>
      </I18nextProvider>
    </StrictMode>,
  );
}

void bootstrap(rootElement).catch((error: unknown) => {
  console.error(error);

  const detail =
    error instanceof DataLoadError
      ? error.message
      : 'No se pudieron cargar los datos de la aplicación.';

  createRoot(rootElement).render(
    <main className="grid min-h-screen place-items-center p-6">
      <div className="glass-panel max-w-md rounded-3xl p-8 text-center">
        <p className="text-xs font-semibold tracking-[0.8px] text-accent uppercase">
          X-Folio Series X
        </p>
        <h1 className="mt-2 text-xl font-extrabold">No se pudo iniciar la aplicación</h1>
        <p className="mt-3 text-sm text-text-secondary">{detail}</p>
      </div>
    </main>,
  );
});
