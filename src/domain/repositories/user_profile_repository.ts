import type { UserProfile } from '../entities/user_profile';

export interface IUserProfileRepository {
  getProfile(): UserProfile;
}
