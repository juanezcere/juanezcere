import type { AppSettings } from '../entities/app_settings';
import { DEFAULT_LANGUAGE_CODE } from './languages';
import { DEFAULT_THEME_ID, DEFAULT_THEME_MODE } from './themes';

export const DEFAULT_APP_SETTINGS: AppSettings = {
  theme: DEFAULT_THEME_ID,
  mode: DEFAULT_THEME_MODE,
  language: DEFAULT_LANGUAGE_CODE,
  activeProjectId: null,
};
