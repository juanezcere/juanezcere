import { Check, Moon, RotateCcw, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSettings, useTheme } from '../../application/state';
import { DEFAULT_APP_SETTINGS, LANGUAGES, THEMES } from '../../domain/constants';

export function SettingsView() {
  const { t } = useTranslation();
  const { theme, mode, setTheme, setMode } = useTheme();
  const { settings, setLanguage, setActiveProject } = useSettings();

  const resetSettings = () => {
    setTheme(DEFAULT_APP_SETTINGS.theme);
    setMode(DEFAULT_APP_SETTINGS.mode);
    setLanguage(DEFAULT_APP_SETTINGS.language);
    setActiveProject(null);
  };

  return (
    <section className="flex flex-1 flex-col gap-5">
      <header className="glass-panel rounded-[24px] px-6 py-5">
        <span className="text-xs font-bold tracking-[0.8px] text-accent uppercase">
          {t('nav.settings')}
        </span>
        <h1 className="mt-1 text-2xl font-extrabold sm:text-3xl">{t('settings.heading')}</h1>
        <p className="mt-2 max-w-[720px] text-sm text-text-secondary">
          {t('settings.description')}
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="glass-panel flex flex-col gap-4 rounded-[24px] p-6">
          <div>
            <h2 className="text-base font-bold">{t('controls.themeTitle')}</h2>
            <p className="mt-1 text-xs text-text-secondary">{t('settings.themeDescription')}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {THEMES.map((themeItem) => {
              const isSelected = theme === themeItem.id;

              return (
                <button
                  key={themeItem.id}
                  type="button"
                  aria-label={themeItem.label}
                  aria-pressed={isSelected}
                  onClick={() => setTheme(themeItem.id)}
                  style={{ backgroundColor: themeItem.color }}
                  className={`grid h-10 w-10 place-items-center rounded-full border-2 transition hover:scale-110 ${
                    isSelected ? 'scale-110 border-white' : 'border-white/40'
                  }`}
                >
                  {isSelected ? <Check size={16} className="text-white" aria-hidden="true" /> : null}
                </button>
              );
            })}
          </div>
        </section>

        <section className="glass-panel flex flex-col gap-4 rounded-[24px] p-6">
          <div>
            <h2 className="text-base font-bold">{t('settings.modeTitle')}</h2>
            <p className="mt-1 text-xs text-text-secondary">{t('settings.modeDescription')}</p>
          </div>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              aria-pressed={mode === 'dark'}
              onClick={() => setMode('dark')}
              className={`flex items-center justify-between rounded-[14px] border px-4 py-3 text-sm font-semibold transition ${
                mode === 'dark'
                  ? 'border-accent bg-accent-soft text-accent'
                  : 'border-glass-border bg-glass-hover hover:border-accent'
              }`}
            >
              <span className="flex items-center gap-2">
                <Moon size={17} aria-hidden="true" />
                {t('settings.darkMode')}
              </span>
              {mode === 'dark' ? <Check size={16} aria-hidden="true" /> : null}
            </button>
            <button
              type="button"
              aria-pressed={mode === 'light'}
              onClick={() => setMode('light')}
              className={`flex items-center justify-between rounded-[14px] border px-4 py-3 text-sm font-semibold transition ${
                mode === 'light'
                  ? 'border-accent bg-accent-soft text-accent'
                  : 'border-glass-border bg-glass-hover hover:border-accent'
              }`}
            >
              <span className="flex items-center gap-2">
                <Sun size={17} aria-hidden="true" />
                {t('settings.lightMode')}
              </span>
              {mode === 'light' ? <Check size={16} aria-hidden="true" /> : null}
            </button>
          </div>
        </section>

        <section className="glass-panel flex flex-col gap-4 rounded-[24px] p-6">
          <div>
            <h2 className="text-base font-bold">{t('controls.languageTitle')}</h2>
            <p className="mt-1 text-xs text-text-secondary">{t('settings.languageDescription')}</p>
          </div>
          <div className="flex flex-col gap-1.5">
            {LANGUAGES.map((language) => {
              const isSelected = settings.language === language.code;

              return (
                <button
                  key={language.code}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setLanguage(language.code)}
                  className={`flex items-center justify-between rounded-[10px] px-3 py-2 text-left text-sm transition hover:bg-accent-soft ${
                    isSelected ? 'bg-accent-soft font-semibold text-accent' : ''
                  }`}
                >
                  <span>{language.label}</span>
                  <span className="text-[0.75rem] opacity-60">{language.code.toUpperCase()}</span>
                </button>
              );
            })}
          </div>
        </section>
      </div>

      <section className="glass-panel flex flex-wrap items-center justify-between gap-4 rounded-[24px] p-6">
        <div>
          <h2 className="text-base font-bold">{t('settings.reset')}</h2>
          <p className="mt-1 text-sm text-text-secondary">{t('settings.resetDescription')}</p>
        </div>
        <button
          type="button"
          onClick={resetSettings}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-text-on-media shadow-[0_4px_16px_var(--accent-glow)] transition hover:brightness-110"
        >
          <RotateCcw size={16} aria-hidden="true" />
          {t('settings.reset')}
        </button>
      </section>
    </section>
  );
}
