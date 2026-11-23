import type { Project } from '../entities/project';

export interface IProjectRepository {
  getAll(): Promise<readonly Project[]>;
  getFeatured(): Promise<readonly Project[]>;
  getById(id: string): Promise<Project | null>;
}
