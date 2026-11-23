export interface SocialLink {
  readonly id: string;
  readonly label: string;
  readonly url: string;
}

export interface UserProfile {
  readonly name: string;
  readonly title: string;
  readonly bio: string;
  readonly avatarUrl: string;
  readonly email?: string;
  readonly socialLinks?: readonly SocialLink[];
}
