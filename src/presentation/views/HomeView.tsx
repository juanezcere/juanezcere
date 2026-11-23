import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation, useProjects, useSettings } from '../../application/state';
import { DynamicBackdrop } from '../components/dashboard/DynamicBackdrop';
import { ProjectCarousel } from '../components/dashboard/ProjectCarousel';
import { QuickAccessRow } from '../components/dashboard/QuickAccessRow';

export function HomeView() {
  const { t } = useTranslation();
  const { navigateTo } = useNavigation();
  const { projects } = useProjects();
  const { settings, setActiveProject } = useSettings();

  const activeIndex = Math.max(
    0,
    projects.findIndex((project) => project.id === settings.activeProjectId),
  );
  const activeProject = projects[activeIndex] ?? null;

  useEffect(() => {
    if (activeProject && activeProject.id !== settings.activeProjectId) {
      setActiveProject(activeProject.id);
    }
  }, [activeProject, settings.activeProjectId, setActiveProject]);

  const selectProject = useCallback(
    (index: number) => {
      if (projects.length === 0) {
        return;
      }

      const project = projects[(index + projects.length) % projects.length];

      if (project) {
        setActiveProject(project.id);
      }
    },
    [projects, setActiveProject],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) {
        return;
      }

      const target = event.target;

      if (
        target instanceof HTMLElement &&
        (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
      ) {
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        selectProject(activeIndex + 1);
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        selectProject(activeIndex - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, selectProject]);

  return (
    <div className="relative z-10 flex flex-1 flex-col justify-end gap-5">
      <DynamicBackdrop project={activeProject} />

      <div className="relative z-10 flex flex-col gap-5">
        {activeProject ? (
          <>
            <AnimatePresence mode="wait">
              <motion.section
                key={activeProject.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="glass-panel max-w-[560px] rounded-[22px] px-6 py-5"
              >
                <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-[0.75rem] font-bold tracking-[0.9px] text-accent uppercase">
                  <Sparkles size={14} aria-hidden="true" />
                  <span>{activeProject.category}</span>
                </div>
                <h1 className="text-2xl leading-tight font-extrabold sm:text-3xl">
                  {activeProject.title}
                </h1>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {activeProject.description}
                </p>
                <div className="mt-3.5 flex flex-wrap gap-2">
                  {activeProject.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-lg border border-glass-border bg-glass-hover px-2.5 py-1 text-[0.78rem]"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </motion.section>
            </AnimatePresence>

            <ProjectCarousel
              projects={projects}
              activeIndex={activeIndex}
              onSelect={selectProject}
            />

            <QuickAccessRow
              activeProject={activeProject}
              onExplore={() => navigateTo('projects')}
              onAbout={() => navigateTo('about')}
              onFeatured={() => navigateTo('projects')}
              onSettings={() => navigateTo('settings')}
            />
          </>
        ) : (
          <section className="glass-panel max-w-[560px] rounded-[22px] px-6 py-5">
            <h1 className="text-xl font-extrabold">{t('projects.empty')}</h1>
            <p className="mt-2 text-sm text-text-secondary">{t('projects.emptyDescription')}</p>
          </section>
        )}
      </div>
    </div>
  );
}
