import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { NavigationContext, type NavigationContextValue, type ViewId } from './navigation_scope';

interface NavigationProviderProps {
  readonly initialView?: ViewId;
  readonly children: ReactNode;
}

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
