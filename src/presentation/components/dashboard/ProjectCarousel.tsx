import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import type { LocalizedProject } from '../../../domain/entities';

interface ProjectCarouselProps {
  readonly projects: readonly LocalizedProject[];
  readonly activeIndex: number;
  readonly onSelect: (index: number) => void;
  readonly onOpen: (index: number) => void;
}

export function ProjectCarousel({ projects, activeIndex, onSelect, onOpen }: ProjectCarouselProps) {
  const { t } = useTranslation();
  const tileRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    tileRefs.current[activeIndex]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [activeIndex]);

  return (
    <section
      aria-label={t('projects.carouselLabel')}
      className="flex items-end gap-4 overflow-x-auto px-1 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {projects.map((project, index) => {
        const isActive = index === activeIndex;

        return (
          <motion.button
            key={project.id}
            ref={(element) => {
              tileRefs.current[index] = element;
            }}
            type="button"
            layout
            aria-label={
              isActive ? t('projects.openProject', { title: project.title }) : project.title
            }
            aria-pressed={isActive}
            onClick={() => (isActive ? onOpen(index) : onSelect(index))}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className={`relative flex shrink-0 flex-col justify-end overflow-hidden rounded-[18px] border-2 text-left transition-colors ${
              isActive
                ? 'h-[210px] w-[210px] border-accent shadow-[0_0_28px_var(--accent-glow),var(--glass-shadow)] sm:h-[245px] sm:w-[245px]'
                : 'h-[128px] w-[128px] border-glass-border shadow-[var(--glass-shadow)] sm:h-[148px] sm:w-[148px]'
            }`}
          >
            <img
              src={project.imageUrl}
              alt=""
              loading={isActive ? 'eager' : 'lazy'}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
            <span
              className="relative z-10 px-3 py-2.5 text-text-on-media backdrop-blur-[10px]"
              style={{
                background: 'var(--tile-overlay)',
                borderTop: '1px solid var(--tile-border)',
              }}
            >
              <span className="block text-[0.65rem] font-extrabold tracking-[0.6px] uppercase opacity-85">
                {project.category}
              </span>
              <span
                className={`mt-0.5 block font-bold ${
                  isActive ? 'text-[1.05rem] leading-snug' : 'truncate text-[0.85rem]'
                }`}
              >
                {project.title}
              </span>
            </span>
          </motion.button>
        );
      })}
    </section>
  );
}
