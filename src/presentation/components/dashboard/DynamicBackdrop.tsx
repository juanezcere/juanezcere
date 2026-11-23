import { AnimatePresence, motion } from 'framer-motion';
import type { LocalizedProject } from '../../../domain/entities';

interface DynamicBackdropProps {
  readonly project: LocalizedProject | null;
}

export function DynamicBackdrop({ project }: DynamicBackdropProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <AnimatePresence initial={false} mode="sync">
        {project ? (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1.03 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${project.imageUrl}')` }}
          />
        ) : null}
      </AnimatePresence>
      <div className="absolute inset-0" style={{ background: 'var(--backdrop-overlay)' }} />
    </div>
  );
}
