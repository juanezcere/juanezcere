import type { UserProfile } from '../../domain/entities/user_profile';
import type { IUserProfileRepository } from '../../domain/repositories/user_profile_repository';
import { DataLoadError } from '../../errors/data_load_error';
import { fetchJson } from '../http/fetch_json';
import { publicAssetUrl } from '../http/public_asset_url';
import { parseUserProfile } from './json_validators';

export class JsonUserProfileRepository implements IUserProfileRepository {
  private cache: Promise<UserProfile> | null = null;

  constructor(private readonly url = publicAssetUrl('profile.json')) {}

  getProfile(): Promise<UserProfile> {
    if (!this.cache) {
      this.cache = fetchJson(this.url)
        .then((payload) => parseUserProfile(payload))
        .catch((error: unknown) => {
          this.cache = null;
          throw error instanceof DataLoadError
            ? error
            : new DataLoadError(`Could not load profile from ${this.url}.`, {
                cause: error,
              });
        });
    }

    return this.cache;
  }
}
