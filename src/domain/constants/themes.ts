import type { ThemeAccent, ThemeAccentId, ThemeMode } from '../entities/theme';

export const THEMES = [
  {
    id: 'xbox-green',
    label: 'Xbox Green',
    color: '#107c10',
    glow: 'rgba(16, 124, 16, 0.55)',
    soft: 'rgba(16, 124, 16, 0.22)',
  },
  {
    id: 'cyber-blue',
    label: 'Cyber Blue',
    color: '#0078d4',
    glow: 'rgba(0, 120, 212, 0.55)',
    soft: 'rgba(0, 120, 212, 0.22)',
  },
  {
    id: 'crimson-red',
    label: 'Crimson Red',
    color: '#e81123',
    glow: 'rgba(232, 17, 35, 0.55)',
    soft: 'rgba(232, 17, 35, 0.22)',
  },
  {
    id: 'solar-amber',
    label: 'Solar Amber',
    color: '#f7630c',
    glow: 'rgba(247, 99, 12, 0.55)',
    soft: 'rgba(247, 99, 12, 0.22)',
  },
  {
    id: 'neon-purple',
    label: 'Neon Purple',
    color: '#881798',
    glow: 'rgba(136, 23, 152, 0.55)',
    soft: 'rgba(136, 23, 152, 0.22)',
  },
  {
    id: 'emerald-mint',
    label: 'Emerald Mint',
    color: '#00b294',
    glow: 'rgba(0, 178, 148, 0.55)',
    soft: 'rgba(0, 178, 148, 0.22)',
  },
  {
    id: 'gold-edition',
    label: 'Gold Edition',
    color: '#ffb900',
    glow: 'rgba(255, 185, 0, 0.55)',
    soft: 'rgba(255, 185, 0, 0.22)',
  },
] as const satisfies readonly ThemeAccent[];

export const DEFAULT_THEME_ID: ThemeAccentId = 'xbox-green';
export const DEFAULT_THEME_MODE: ThemeMode = 'dark';

export function isThemeAccentId(value: unknown): value is ThemeAccentId {
  return THEMES.some((theme) => theme.id === value);
}

export function isThemeMode(value: unknown): value is ThemeMode {
  return value === 'dark' || value === 'light';
}
