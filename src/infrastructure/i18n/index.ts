import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { DEFAULT_LANGUAGE_CODE, LANGUAGES } from '../../domain/constants';
import type { LanguageCode } from '../../domain/entities';
import { DataLoadError } from '../../errors/data_load_error';
import { fetchJson } from '../http/fetch_json';
import { publicAssetUrl } from '../http/public_asset_url';

export type TranslationResources = Record<LanguageCode, Record<string, unknown>>;

export async function loadTranslations(): Promise<TranslationResources> {
  const entries = await Promise.all(
    LANGUAGES.map(async ({ code }) => {
      const resource = await fetchJson(publicAssetUrl(`locales/${code}.json`));

      if (typeof resource !== 'object' || resource === null || Array.isArray(resource)) {
        throw new DataLoadError(`Translation file for "${code}" must be a JSON object.`);
      }

      return [code, resource as Record<string, unknown>] as const;
    }),
  );

  return Object.fromEntries(entries) as TranslationResources;
}

export function createI18n(language: LanguageCode, translations: TranslationResources) {
  const instance = i18n.createInstance();
  const resources = Object.fromEntries(
    LANGUAGES.map(({ code }) => [code, { translation: translations[code] }]),
  ) as Record<LanguageCode, { translation: Record<string, unknown> }>;

  void instance.use(initReactI18next).init({
    resources,
    lng: language,
    fallbackLng: DEFAULT_LANGUAGE_CODE,
    supportedLngs: LANGUAGES.map((item) => item.code),
    interpolation: { escapeValue: false },
    returnNull: false,
  });

  return instance;
}

export { detectPreferredLanguage } from './detect_language';
