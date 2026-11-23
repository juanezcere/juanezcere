import type { UserProfile } from '../../domain/entities/user_profile';
import type { IUserProfileRepository } from '../../domain/repositories/user_profile_repository';
import rawProfile from './data/profile.json';

export class StaticUserProfileRepository implements IUserProfileRepository {
  constructor(private readonly profile: UserProfile = rawProfile) {}

  getProfile(): UserProfile {
    return this.profile;
  }
}
