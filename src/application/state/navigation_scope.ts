import { createContext, useContext } from 'react';

export type ViewId = 'home' | 'about' | 'projects' | 'settings';

export const NAVIGATION_VIEWS = [
  'home',
  'about',
  'projects',
  'settings',
] as const satisfies readonly ViewId[];

export interface NavigationContextValue {
  readonly view: ViewId;
  readonly navigateTo: (view: ViewId) => void;
}

export const NavigationContext = createContext<NavigationContextValue | null>(null);

export function useNavigation(): NavigationContextValue {
  const context = useContext(NavigationContext);

  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider.');
  }

  return context;
}
