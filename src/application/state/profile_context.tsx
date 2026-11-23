import { createContext, useContext, useMemo, type ReactNode } from 'react';
import type { LocalizedUserProfile, UserProfile } from '../../domain/entities';
import { localizeProfile } from '../use_cases';
import { useSettings } from './settings_context';

interface ProfileProviderProps {
  readonly profile: UserProfile;
  readonly children: ReactNode;
}

const ProfileContext = createContext<LocalizedUserProfile | null>(null);

export function ProfileProvider({ profile, children }: ProfileProviderProps) {
  const { settings } = useSettings();
  const localizedProfile = useMemo(
    () => localizeProfile(profile, settings.language),
    [profile, settings.language],
  );

  return <ProfileContext.Provider value={localizedProfile}>{children}</ProfileContext.Provider>;
}

export function useProfile(): LocalizedUserProfile {
  const profile = useContext(ProfileContext);

  if (!profile) {
    throw new Error('useProfile must be used within a ProfileProvider.');
  }

  return profile;
}
