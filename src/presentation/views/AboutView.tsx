import { Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useProfile, useTheme } from '../../application/state';
import { TechnologyTag } from '../components/common/TechnologyTag';

export function AboutView() {
  const { t } = useTranslation();
  const profile = useProfile();
  const { mode } = useTheme();
  const avatarUrl = mode === 'light' ? profile.avatarUrls.light : profile.avatarUrls.dark;
  const hasContact = Boolean(profile.email || profile.socialLinks?.length);

  return (
    <section className="glass-panel flex flex-1 flex-col gap-8 rounded-[28px] p-6 lg:flex-row lg:p-9">
      <div className="relative h-64 w-full shrink-0 overflow-hidden rounded-[24px] border border-glass-border shadow-[var(--glass-shadow)] lg:h-[340px] lg:w-[300px]">
        <img src={avatarUrl} alt={profile.name} className="h-full w-full object-cover" />
      </div>

      <div className="flex flex-1 flex-col gap-6">
        <div>
          <span className="text-xs font-bold tracking-[0.8px] text-accent uppercase">
            {t('about.heading')}
          </span>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">{profile.name}</h1>
          <p className="mt-1 text-lg font-semibold text-accent">{profile.title}</p>
          {profile.badge ? (
            <span className="mt-3 inline-flex rounded-full bg-accent-soft px-3 py-1 text-xs font-bold text-accent">
              {profile.badge}
            </span>
          ) : null}
        </div>

        <p className="max-w-[720px] text-sm leading-relaxed text-text-secondary sm:text-base">
          {profile.bio}
        </p>

        <div className="flex flex-col gap-2.5">
          <h2 className="text-xs font-bold tracking-[0.8px] text-text-secondary uppercase">
            {t('about.stack')}
          </h2>
          <div className="flex flex-wrap gap-2">
            {profile.stack.map((technology) => (
              <TechnologyTag key={technology} label={technology} />
            ))}
          </div>
        </div>

        {hasContact ? (
          <div className="flex flex-col gap-2.5">
            <h2 className="text-xs font-bold tracking-[0.8px] text-text-secondary uppercase">
              {t('about.contact')}
            </h2>
            <div className="flex flex-wrap gap-2">
              {profile.email ? (
                <a
                  href={`mailto:${profile.email}`}
                  title={profile.email}
                  className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass-hover px-3.5 py-2 text-sm font-semibold transition hover:border-accent"
                >
                  <Mail size={15} aria-hidden="true" />
                  {t('about.email')}
                </a>
              ) : null}
              {profile.socialLinks?.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass-hover px-3.5 py-2 text-sm font-semibold transition hover:border-accent"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
