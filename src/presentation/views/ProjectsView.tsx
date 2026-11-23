import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useProjectModal, useProjects } from '../../application/state';
import { TechnologyTag } from '../components/common/TechnologyTag';

export function ProjectsView() {
  const { t } = useTranslation();
  const { projects } = useProjects();
  const { openProject } = useProjectModal();
  const [selectedTechnologies, setSelectedTechnologies] = useState<readonly string[]>([]);

  const allTechnologies = useMemo(
    () =>
      Array.from(new Set(projects.flatMap((project) => project.technologies))).sort((a, b) =>
        a.localeCompare(b),
      ),
    [projects],
  );

  const filteredProjects = useMemo(() => {
    if (selectedTechnologies.length === 0) {
      return projects;
    }

    return projects.filter((project) =>
      project.technologies.some((technology) => selectedTechnologies.includes(technology)),
    );
  }, [projects, selectedTechnologies]);

  const toggleTechnology = useCallback((technology: string) => {
    setSelectedTechnologies((current) =>
      current.includes(technology)
        ? current.filter((item) => item !== technology)
        : [...current, technology],
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedTechnologies([]);
  }, []);

  return (
    <section className="flex flex-1 flex-col gap-5">
      <header className="glass-panel flex flex-wrap items-end justify-between gap-4 rounded-[24px] px-6 py-5">
        <div>
          <span className="text-xs font-bold tracking-[0.8px] text-accent uppercase">
            {t('nav.projects')}
          </span>
          <h1 className="mt-1 text-2xl font-extrabold sm:text-3xl">{t('projects.heading')}</h1>
        </div>
        <span className="text-sm font-semibold text-text-secondary">
          {t('projects.resultCount', { count: filteredProjects.length })}
        </span>
      </header>

      <div className="glass-panel flex flex-wrap items-center gap-2 rounded-[20px] p-4">
        <span className="mr-1 text-xs font-bold tracking-[0.8px] text-text-secondary uppercase">
          {t('projects.filterByTechnology')}
        </span>
        {allTechnologies.map((technology) => {
          const isSelected = selectedTechnologies.includes(technology);

          return (
            <button
              key={technology}
              type="button"
              aria-pressed={isSelected}
              onClick={() => toggleTechnology(technology)}
              className={`rounded-full border px-3 py-1.5 text-[0.82rem] font-semibold transition ${
                isSelected
                  ? 'border-accent bg-accent-soft text-accent'
                  : 'border-glass-border bg-glass-hover hover:border-accent'
              }`}
            >
              {technology}
            </button>
          );
        })}
        {selectedTechnologies.length > 0 ? (
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-full border border-glass-border px-3 py-1.5 text-[0.82rem] font-semibold text-text-secondary transition hover:border-accent hover:text-text-primary"
          >
            {t('projects.clearFilters')}
          </button>
        ) : null}
      </div>

      {filteredProjects.length === 0 ? (
        <div className="glass-panel rounded-[24px] px-6 py-10 text-center">
          <h2 className="text-xl font-bold">
            {selectedTechnologies.length === 0 ? t('projects.empty') : t('projects.noMatches')}
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            {selectedTechnologies.length === 0
              ? t('projects.emptyDescription')
              : t('projects.noMatchesDescription')}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => openProject(project.id)}
              aria-label={t('projects.openProject', { title: project.title })}
              className="glass-panel group flex flex-col overflow-hidden rounded-[22px] text-left transition hover:-translate-y-1 hover:border-accent hover:shadow-[0_12px_30px_var(--accent-glow),var(--glass-highlight)]"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 rounded-full bg-[var(--glass-bg-strong)] px-2.5 py-1 text-[0.72rem] font-bold tracking-[0.8px] text-accent uppercase backdrop-blur-[10px]">
                  {project.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg leading-snug font-bold">{project.title}</h2>
                  {project.year ? (
                    <span className="text-xs font-semibold text-text-secondary">{project.year}</span>
                  ) : null}
                </div>
                <p className="line-clamp-3 text-sm leading-relaxed text-text-secondary">
                  {project.description}
                </p>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.map((technology) => (
                    <TechnologyTag key={technology} label={technology} compact />
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
