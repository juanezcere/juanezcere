import type { LanguageCode } from './language';

export interface SocialLink {
  readonly id: string;
  readonly label: string;
  readonly url: string;
}

export interface UserProfileAvatarUrls {
  readonly light: string;
  readonly dark: string;
}

export interface UserProfileTranslation {
  readonly title: string;
  readonly bio: string;
}

export interface UserProfile {
  readonly name: string;
  readonly badge?: string;
  readonly avatarUrls: UserProfileAvatarUrls;
  readonly translations: Readonly<Record<LanguageCode, UserProfileTranslation>>;
  readonly email?: string;
  readonly socialLinks?: readonly SocialLink[];
}

export interface LocalizedUserProfile extends Omit<UserProfile, 'translations'> {
  readonly title: string;
  readonly bio: string;
}
