import type { Language, LanguageCode } from '../entities/language';

export const LANGUAGES = [
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
  { code: 'pt', label: 'Português' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
] as const satisfies readonly Language[];

export const DEFAULT_LANGUAGE_CODE: LanguageCode = 'es';

export function isLanguageCode(value: unknown): value is LanguageCode {
  return LANGUAGES.some((language) => language.code === value);
}
