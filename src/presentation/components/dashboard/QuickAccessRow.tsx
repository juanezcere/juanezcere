import {
  FolderKanban,
  IdCard,
  Play,
  SlidersHorizontal,
  type LucideIcon,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { LocalizedProject } from '../../../domain/entities';

interface QuickAccessRowProps {
  readonly activeProject: LocalizedProject;
  readonly onExplore: () => void;
  readonly onAbout: () => void;
  readonly onFeatured: () => void;
  readonly onSettings: () => void;
}

interface QuickAccessItem {
  readonly id: string;
  readonly label: string;
  readonly title: string;
  readonly icon: LucideIcon;
  readonly onClick: () => void;
}

export function QuickAccessRow({
  activeProject,
  onExplore,
  onAbout,
  onFeatured,
  onSettings,
}: QuickAccessRowProps) {
  const { t } = useTranslation();

  const items: readonly QuickAccessItem[] = [
    {
      id: 'explore',
      label: t('home.explore'),
      title: t('home.allProjects'),
      icon: FolderKanban,
      onClick: onExplore,
    },
    {
      id: 'about',
      label: t('home.profile'),
      title: t('home.aboutMe'),
      icon: IdCard,
      onClick: onAbout,
    },
    {
      id: 'featured',
      label: t('home.featured'),
      title: activeProject.title,
      icon: Play,
      onClick: onFeatured,
    },
    {
      id: 'settings',
      label: t('home.customize'),
      title: t('home.glassSettings'),
      icon: SlidersHorizontal,
      onClick: onSettings,
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map(({ id, label, title, icon: Icon, onClick }) => (
        <button
          key={id}
          type="button"
          onClick={onClick}
          className="glass-panel flex items-center justify-between gap-4 rounded-[18px] px-5 py-4 text-left transition hover:-translate-y-1 hover:border-accent hover:bg-glass-hover hover:shadow-[0_10px_26px_var(--accent-glow),var(--glass-highlight)]"
        >
          <span className="flex min-w-0 flex-col gap-1">
            <span className="text-[0.72rem] font-bold tracking-[0.8px] text-accent uppercase">
              {label}
            </span>
            <span className="truncate text-base font-bold">{title}</span>
          </span>
          <span className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
            <Icon size={20} aria-hidden="true" />
          </span>
        </button>
      ))}
    </section>
  );
}
