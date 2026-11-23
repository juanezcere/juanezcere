import { useMemo, type ReactNode } from 'react';
import type { UserProfile } from '../../domain/entities';
import { localizeProfile } from '../use_cases';
import { ProfileContext } from './profile_scope';
import { useSettings } from './settings_scope';

interface ProfileProviderProps {
  readonly profile: UserProfile;
  readonly children: ReactNode;
}

export function ProfileProvider({ profile, children }: ProfileProviderProps) {
  const { settings } = useSettings();
  const localizedProfile = useMemo(
    () => localizeProfile(profile, settings.language),
    [profile, settings.language],
  );

  return <ProfileContext.Provider value={localizedProfile}>{children}</ProfileContext.Provider>;
}
