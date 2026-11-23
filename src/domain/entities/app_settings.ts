import type { LanguageCode } from './language';
import type { ThemeAccentId, ThemeMode } from './theme';

export interface AppSettings {
  readonly theme: ThemeAccentId;
  readonly mode: ThemeMode;
  readonly language: LanguageCode;
  readonly activeProjectId: string | null;
}
