import { createContext, useContext } from 'react';

export interface ProjectModalContextValue {
  readonly selectedProjectId: string | null;
  readonly openProject: (projectId: string) => void;
  readonly closeProject: () => void;
}

export const ProjectModalContext = createContext<ProjectModalContextValue | null>(null);

export function useProjectModal(): ProjectModalContextValue {
  const context = useContext(ProjectModalContext);

  if (!context) {
    throw new Error('useProjectModal must be used within a ProjectModalProvider.');
  }

  return context;
}
