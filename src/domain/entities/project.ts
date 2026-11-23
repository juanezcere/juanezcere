import type { LanguageCode } from './language';

export interface ProjectTranslation {
  readonly title: string;
  readonly category: string;
  readonly description: string;
}

export interface Project {
  readonly id: string;
  readonly translations: Readonly<Record<LanguageCode, ProjectTranslation>>;
  readonly technologies: readonly string[];
  readonly imageUrl: string;
  readonly featured: boolean;
  readonly year?: number;
  readonly repositoryUrl?: string;
  readonly demoUrl?: string;
}

export interface LocalizedProject extends Omit<Project, 'translations'> {
  readonly title: string;
  readonly category: string;
  readonly description: string;
}
