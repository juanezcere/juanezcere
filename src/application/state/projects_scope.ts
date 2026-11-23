import { createContext, useContext } from 'react';
import type { LocalizedProject } from '../../domain/entities';

export interface ProjectsContextValue {
  readonly projects: readonly LocalizedProject[];
}

export const ProjectsContext = createContext<ProjectsContextValue | null>(null);

export function useProjects(): ProjectsContextValue {
  const context = useContext(ProjectsContext);

  if (!context) {
    throw new Error('useProjects must be used within a ProjectsProvider.');
  }

  return context;
}
