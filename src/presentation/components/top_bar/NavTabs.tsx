import { Home, LayoutGrid, Settings, User, type LucideIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { NAVIGATION_VIEWS, useNavigation, type ViewId } from '../../../application/state';
import { GlassPanel } from '../common/GlassPanel';
import { IconButton } from '../common/IconButton';

const TAB_ICONS: Record<ViewId, LucideIcon> = {
  home: Home,
  about: User,
  projects: LayoutGrid,
  settings: Settings,
};

export function NavTabs() {
  const { t } = useTranslation();
  const { view, navigateTo } = useNavigation();

  return (
    <GlassPanel className="flex items-center gap-2.5 rounded-full px-2.5 py-1.5">
      <nav aria-label={t('nav.label')} className="flex items-center gap-2.5">
        {NAVIGATION_VIEWS.map((viewId) => (
          <IconButton
            key={viewId}
            icon={TAB_ICONS[viewId]}
            label={t(`nav.${viewId}`)}
            active={view === viewId}
            indicator
            onClick={() => navigateTo(viewId)}
          />
        ))}
      </nav>
    </GlassPanel>
  );
}
