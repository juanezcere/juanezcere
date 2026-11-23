import { useTranslation } from 'react-i18next';
import { useNavigation, useProfile, useTheme } from '../../../application/state';

export function ProfileBanner() {
  const { t } = useTranslation();
  const { navigateTo } = useNavigation();
  const { mode } = useTheme();
  const { name, badge, avatarUrls, title } = useProfile();
  const avatarUrl = mode === 'dark' ? avatarUrls.dark : avatarUrls.light;

  return (
    <button
      type="button"
      onClick={() => navigateTo('about')}
      aria-label={t('nav.about')}
      className="glass-panel flex items-center gap-3.5 rounded-full py-2 pr-4 pl-2.5 text-left transition hover:-translate-y-0.5 hover:border-accent hover:bg-glass-hover lg:justify-self-start"
    >
        <span className="block h-12 w-12 shrink-0 rounded-full bg-[linear-gradient(135deg,var(--accent),var(--avatar-ring-end))] p-0.5 shadow-[0_0_14px_var(--accent-glow)]">
        <img
          src={avatarUrl}
          alt={name}
          className="h-full w-full rounded-full object-cover"
        />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="flex items-center gap-2">
          <span className="text-sm font-bold tracking-wide">{name}</span>
          {badge ? (
            <span className="rounded bg-accent px-1.5 py-0.5 text-[0.65rem] font-extrabold tracking-[0.8px] text-text-on-media uppercase">
              {badge}
            </span>
          ) : null}
        </span>
        <span className="mt-0.5 text-xs text-text-secondary">{title}</span>
      </span>
    </button>
  );
}
