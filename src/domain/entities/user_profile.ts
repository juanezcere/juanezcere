export interface SocialLink {
  readonly id: string;
  readonly label: string;
  readonly url: string;
}

export interface UserProfileAvatarUrls {
  readonly light: string;
  readonly dark: string;
}

export interface UserProfile {
  readonly name: string;
  readonly badge?: string;
  readonly avatarUrls: UserProfileAvatarUrls;
  readonly email?: string;
  readonly bio?: string;
  readonly socialLinks?: readonly SocialLink[];
}
