import type { Project } from '../../domain/entities/project';
import type { IProjectRepository } from '../../domain/repositories/project_repository';
import { DataLoadError } from '../../errors/data_load_error';
import { fetchJson } from '../http/fetch_json';
import { publicAssetUrl } from '../http/public_asset_url';
import { parseProjects } from './json_validators';

export class JsonProjectRepository implements IProjectRepository {
  private cache: Promise<readonly Project[]> | null = null;

  constructor(private readonly url = publicAssetUrl('projects.json')) {}

  private load(): Promise<readonly Project[]> {
    if (!this.cache) {
      this.cache = fetchJson(this.url)
        .then((payload) => parseProjects(payload))
        .catch((error: unknown) => {
          this.cache = null;
          throw error instanceof DataLoadError
            ? error
            : new DataLoadError(`Could not load projects from ${this.url}.`, {
                cause: error,
              });
        });
    }

    return this.cache;
  }

  async getAll(): Promise<readonly Project[]> {
    return this.load();
  }

  async getFeatured(): Promise<readonly Project[]> {
    return (await this.load()).filter((project) => project.featured);
  }

  async getById(id: string): Promise<Project | null> {
    return (await this.load()).find((project) => project.id === id) ?? null;
  }
}
