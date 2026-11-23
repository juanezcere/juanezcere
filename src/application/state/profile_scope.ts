import { createContext, useContext } from 'react';
import type { LocalizedUserProfile } from '../../domain/entities';

export const ProfileContext = createContext<LocalizedUserProfile | null>(null);

export function useProfile(): LocalizedUserProfile {
  const profile = useContext(ProfileContext);

  if (!profile) {
    throw new Error('useProfile must be used within a ProfileProvider.');
  }

  return profile;
}
