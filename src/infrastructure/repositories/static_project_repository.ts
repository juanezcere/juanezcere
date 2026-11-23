import type { Project } from '../../domain/entities/project';
import type { IProjectRepository } from '../../domain/repositories/project_repository';

export class StaticProjectRepository implements IProjectRepository {
  constructor(private readonly projects: readonly Project[]) {}

  async getAll(): Promise<readonly Project[]> {
    return this.projects;
  }

  async getFeatured(): Promise<readonly Project[]> {
    return this.projects.filter((project) => project.featured);
  }

  async getById(id: string): Promise<Project | null> {
    return this.projects.find((project) => project.id === id) ?? null;
  }
}
