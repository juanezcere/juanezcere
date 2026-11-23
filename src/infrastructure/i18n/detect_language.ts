import { DEFAULT_LANGUAGE_CODE, isLanguageCode } from '../../domain/constants';
import type { LanguageCode } from '../../domain/entities';

export function detectPreferredLanguage(): LanguageCode {
  if (typeof navigator === 'undefined') {
    return DEFAULT_LANGUAGE_CODE;
  }

  const [primary] = navigator.language.toLowerCase().split('-');
  return isLanguageCode(primary) ? primary : DEFAULT_LANGUAGE_CODE;
}
