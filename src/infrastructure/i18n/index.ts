import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { DEFAULT_LANGUAGE_CODE, LANGUAGES } from '../../domain/constants';
import type { LanguageCode } from '../../domain/entities';
import de from './locales/de.json';
import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import pt from './locales/pt.json';

const translations = { es, en, pt, fr, de } satisfies Record<LanguageCode, typeof es>;

export function createI18n(language: LanguageCode) {
  const instance = i18n.createInstance();

  void instance.use(initReactI18next).init({
    resources: {
      es: { translation: translations.es },
      en: { translation: translations.en },
      pt: { translation: translations.pt },
      fr: { translation: translations.fr },
      de: { translation: translations.de },
    },
    lng: language,
    fallbackLng: DEFAULT_LANGUAGE_CODE,
    supportedLngs: LANGUAGES.map((item) => item.code),
    interpolation: { escapeValue: false },
    returnNull: false,
  });

  return instance;
}

export { detectPreferredLanguage } from './detect_language';
