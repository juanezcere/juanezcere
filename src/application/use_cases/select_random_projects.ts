import type { Project } from '../../domain/entities';

export const MAX_RANDOM_PROJECTS = 5;

export function selectRandomProjects(
  projects: readonly Project[],
  limit = MAX_RANDOM_PROJECTS,
): Project[] {
  const shuffled = [...projects];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex]!, shuffled[index]!];
  }

  return shuffled.slice(0, limit);
}
