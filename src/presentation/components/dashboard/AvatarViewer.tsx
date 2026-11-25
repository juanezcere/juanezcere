import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AvatarScene } from '../../../infrastructure/three/avatar_scene';

export function AvatarViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState<number | null>(0);
  const [hasError, setHasError] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const scene = new AvatarScene(container, '/models/avatar.glb', {
      onProgress: (percent) => setProgress(percent),
      onReady: () => setProgress(null),
      onError: () => setHasError(true),
    });

    return () => scene.dispose();
  }, []);

  return (
    <section className="relative h-full w-full" aria-label={t('home.avatarLabel')}>
      <div ref={containerRef} className="absolute inset-0" />

      {progress !== null && !hasError && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="glass-popover rounded-full px-3 py-1.5 text-xs text-text-secondary">
            {t('home.avatarLoading', { percent: progress })}
          </span>
        </div>
      )}

      {hasError && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="glass-popover rounded-full px-3 py-1.5 text-xs text-text-secondary">
            {t('home.avatarError')}
          </span>
        </div>
      )}

    </section>
  );
}
