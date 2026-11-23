import { createContext, useContext, useMemo, type ReactNode } from 'react';
import type { UserProfile } from '../../domain/entities';
import type { IUserProfileRepository } from '../../domain/repositories';

interface ProfileProviderProps {
  readonly repository: IUserProfileRepository;
  readonly children: ReactNode;
}

const ProfileContext = createContext<UserProfile | null>(null);

export function ProfileProvider({ repository, children }: ProfileProviderProps) {
  const profile = useMemo(() => repository.getProfile(), [repository]);

  return <ProfileContext.Provider value={profile}>{children}</ProfileContext.Provider>;
}

export function useProfile(): UserProfile {
  const profile = useContext(ProfileContext);

  if (!profile) {
    throw new Error('useProfile must be used within a ProfileProvider.');
  }

  return profile;
}
