import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { ProjectModalContext, type ProjectModalContextValue } from './project_modal_scope';

export function ProjectModalProvider({ children }: { readonly children: ReactNode }) {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const openProject = useCallback((projectId: string) => {
    setSelectedProjectId(projectId);
  }, []);

  const closeProject = useCallback(() => {
    setSelectedProjectId(null);
  }, []);

  const value = useMemo<ProjectModalContextValue>(
    () => ({ selectedProjectId, openProject, closeProject }),
    [closeProject, openProject, selectedProjectId],
  );

  return <ProjectModalContext.Provider value={value}>{children}</ProjectModalContext.Provider>;
}
