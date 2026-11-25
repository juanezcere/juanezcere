import { useMemo, useState, type ReactNode } from 'react';
import type { Project } from '../../domain/entities';
import { localizeProjects, selectRandomProjects } from '../use_cases';
import { ProjectsContext, type ProjectsContextValue } from './projects_scope';
import { useSettings } from './settings_scope';

interface ProjectsProviderProps {
  readonly projects: readonly Project[];
  readonly children: ReactNode;
}

export function ProjectsProvider({ projects, children }: ProjectsProviderProps) {
  const { settings } = useSettings();
  const [selectedProjects] = useState(() => selectRandomProjects(projects));
  const localizedProjects = useMemo(
    () => localizeProjects(selectedProjects, settings.language),
    [selectedProjects, settings.language],
  );
  const value = useMemo<ProjectsContextValue>(
    () => ({ projects: localizedProjects }),
    [localizedProjects],
  );

  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>;
}
