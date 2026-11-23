import { createContext, useContext, useMemo, type ReactNode } from 'react';
import type { LocalizedProject, Project } from '../../domain/entities';
import { localizeProjects } from '../use_cases';
import { useSettings } from './settings_context';

interface ProjectsProviderProps {
  readonly projects: readonly Project[];
  readonly children: ReactNode;
}

interface ProjectsContextValue {
  readonly projects: readonly LocalizedProject[];
}

const ProjectsContext = createContext<ProjectsContextValue | null>(null);

export function ProjectsProvider({ projects, children }: ProjectsProviderProps) {
  const { settings } = useSettings();
  const localizedProjects = useMemo(
    () => localizeProjects(projects, settings.language),
    [projects, settings.language],
  );
  const value = useMemo<ProjectsContextValue>(
    () => ({ projects: localizedProjects }),
    [localizedProjects],
  );

  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>;
}

export function useProjects(): ProjectsContextValue {
  const context = useContext(ProjectsContext);

  if (!context) {
    throw new Error('useProjects must be used within a ProjectsProvider.');
  }

  return context;
}
