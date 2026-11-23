import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useProjectModal, useProjects } from '../../../application/state';
import { TechnologyTag } from '../common/TechnologyTag';

export function ProjectModal() {
  const { t } = useTranslation();
  const { selectedProjectId, closeProject } = useProjectModal();
  const { projects } = useProjects();
  const project = projects.find((item) => item.id === selectedProjectId) ?? null;
  const isOpen = project !== null;
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeProject();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) {
        return;
      }

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );

      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;

      if (previousFocus instanceof HTMLElement) {
        previousFocus.focus();
      }
    };
  }, [closeProject, isOpen]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <motion.div
            aria-hidden="true"
            onClick={closeProject}
            className="absolute inset-0 bg-[var(--modal-backdrop)] backdrop-blur-[8px]"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="glass-popover relative z-10 w-full max-w-[640px] overflow-hidden rounded-[24px]"
          >
            <img src={project.imageUrl} alt="" className="h-[220px] w-full object-cover" />
            <div className="flex flex-col gap-3.5 p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <span className="inline-flex rounded-full bg-accent-soft px-2.5 py-1 text-[0.75rem] font-bold tracking-[0.9px] text-accent uppercase">
                    {project.category}
                  </span>
                  <h2 id="project-modal-title" className="mt-2 text-2xl font-extrabold">
                    {project.title}
                  </h2>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeProject}
                  aria-label={t('projects.close')}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-glass-border text-text-secondary transition hover:border-accent hover:text-text-primary"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>

              {project.year ? (
                <span className="text-xs font-semibold tracking-[0.8px] text-text-secondary uppercase">
                  {project.year}
                </span>
              ) : null}

              <p className="text-sm leading-relaxed text-text-secondary">{project.description}</p>

              {project.technologies.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <TechnologyTag key={technology} label={technology} />
                  ))}
                </div>
              ) : null}

              {project.links && project.links.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {project.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-glass-border bg-glass-hover px-3 py-1.5 text-sm font-semibold transition hover:border-accent"
                    >
                      {link.label}
                      <ExternalLink size={14} aria-hidden="true" />
                    </a>
                  ))}
                </div>
              ) : null}

              <button
                type="button"
                onClick={closeProject}
                className="self-start rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-text-on-media shadow-[0_4px_16px_var(--accent-glow)] transition hover:brightness-110"
              >
                {t('projects.close')}
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
