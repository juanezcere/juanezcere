import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type ViewId = 'home' | 'about' | 'projects' | 'settings';

export const NAVIGATION_VIEWS = [
  'home',
  'about',
  'projects',
  'settings',
] as const satisfies readonly ViewId[];

interface NavigationProviderProps {
  readonly initialView?: ViewId;
  readonly children: ReactNode;
}

interface NavigationContextValue {
  readonly view: ViewId;
  readonly navigateTo: (view: ViewId) => void;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function NavigationProvider({
  initialView = 'home',
  children,
}: NavigationProviderProps) {
  const [view, setView] = useState<ViewId>(initialView);

  const navigateTo = useCallback((nextView: ViewId) => {
    setView(nextView);
  }, []);

  const value = useMemo<NavigationContextValue>(() => ({ view, navigateTo }), [
    navigateTo,
    view,
  ]);

  return (
    <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>
  );
}

export function useNavigation(): NavigationContextValue {
  const context = useContext(NavigationContext);

  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider.');
  }

  return context;
}
