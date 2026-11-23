export interface ProjectLink {
  readonly label: string;
  readonly url: string;
}

export interface Project {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly description: string;
  readonly technologies: readonly string[];
  readonly imageUrl: string;
  readonly featured: boolean;
  readonly year?: number;
  readonly links?: readonly ProjectLink[];
}
