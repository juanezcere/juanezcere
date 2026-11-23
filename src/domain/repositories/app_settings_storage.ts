import type { AppSettings } from '../entities/app_settings';

export interface IAppSettingsStorage {
  load(): AppSettings | null;
  save(settings: AppSettings): void;
}
