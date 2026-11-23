import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

interface ProjectModalContextValue {
  readonly selectedProjectId: string | null;
  readonly openProject: (projectId: string) => void;
  readonly closeProject: () => void;
}

const ProjectModalContext = createContext<ProjectModalContextValue | null>(null);

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

export function useProjectModal(): ProjectModalContextValue {
  const context = useContext(ProjectModalContext);

  if (!context) {
    throw new Error('useProjectModal must be used within a ProjectModalProvider.');
  }

  return context;
}
