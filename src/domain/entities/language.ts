export type LanguageCode = 'es' | 'en' | 'pt' | 'fr' | 'de';

export interface Language {
  readonly code: LanguageCode;
  readonly label: string;
}
