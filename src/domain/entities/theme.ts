export type ThemeAccentId =
  | 'xbox-green'
  | 'cyber-blue'
  | 'crimson-red'
  | 'solar-amber'
  | 'neon-purple'
  | 'emerald-mint'
  | 'gold-edition';

export type ThemeMode = 'dark' | 'light';

export interface ThemeAccent {
  readonly id: ThemeAccentId;
  readonly label: string;
  readonly color: string;
  readonly glow: string;
  readonly soft: string;
}
