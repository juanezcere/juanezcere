import { DEFAULT_LANGUAGE_CODE } from '../../domain/constants';
import type { LanguageCode, LocalizedUserProfile, UserProfile } from '../../domain/entities';

export function localizeProfile(
  profile: UserProfile,
  language: LanguageCode,
): LocalizedUserProfile {
  const translation =
    profile.translations[language] ?? profile.translations[DEFAULT_LANGUAGE_CODE];

  return {
    name: profile.name,
    badge: profile.badge,
    avatarUrls: profile.avatarUrls,
    email: profile.email,
    socialLinks: profile.socialLinks,
    title: translation.title,
    bio: translation.bio,
  };
}
