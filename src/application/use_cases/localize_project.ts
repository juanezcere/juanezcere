import { DEFAULT_LANGUAGE_CODE } from '../../domain/constants';
import type { LanguageCode, LocalizedProject, Project } from '../../domain/entities';

export function localizeProject(project: Project, language: LanguageCode): LocalizedProject {
  const translation =
    project.translations[language] ?? project.translations[DEFAULT_LANGUAGE_CODE];

  return {
    id: project.id,
    title: translation.title,
    category: translation.category,
    description: translation.description,
    technologies: project.technologies,
    imageUrl: project.imageUrl,
    featured: project.featured,
    year: project.year,
    repositoryUrl: project.repositoryUrl,
    demoUrl: project.demoUrl,
  };
}

export function localizeProjects(
  projects: readonly Project[],
  language: LanguageCode,
): readonly LocalizedProject[] {
  return projects.map((project) => localizeProject(project, language));
}
