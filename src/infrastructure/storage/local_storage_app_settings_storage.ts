import {
  DEFAULT_APP_SETTINGS,
  isLanguageCode,
  isThemeAccentId,
  isThemeMode,
} from '../../domain/constants';
import type { AppSettings } from '../../domain/entities';
import type { IAppSettingsStorage } from '../../domain/repositories';
import type { LocalStorageService } from './local_storage_service';

const SETTINGS_KEY = 'app-settings.v1';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export class LocalStorageAppSettingsStorage implements IAppSettingsStorage {
  constructor(private readonly storage: LocalStorageService) {}

  load(): AppSettings | null {
    const stored = this.storage.read<unknown>(SETTINGS_KEY);
    if (!isRecord(stored)) {
      return null;
    }

    return {
      theme: isThemeAccentId(stored.theme) ? stored.theme : DEFAULT_APP_SETTINGS.theme,
      mode: isThemeMode(stored.mode) ? stored.mode : DEFAULT_APP_SETTINGS.mode,
      language: isLanguageCode(stored.language)
        ? stored.language
        : DEFAULT_APP_SETTINGS.language,
      activeProjectId:
        typeof stored.activeProjectId === 'string' && stored.activeProjectId.length > 0
          ? stored.activeProjectId
          : null,
    };
  }

  save(settings: AppSettings): void {
    this.storage.write(SETTINGS_KEY, settings);
  }
}
