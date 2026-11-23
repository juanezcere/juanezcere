import { LANGUAGES } from '../../domain/constants';
import type {
  LanguageCode,
  Project,
  ProjectTranslation,
  SocialLink,
  UserProfile,
  UserProfileTranslation,
} from '../../domain/entities';
import { DataLoadError } from '../../errors/data_load_error';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readString(record: Record<string, unknown>, key: string, path: string): string {
  const value = record[key];

  if (typeof value !== 'string' || value.trim() === '') {
    throw new DataLoadError(`Expected a non-empty string at ${path}.${key}.`);
  }

  return value;
}

function readOptionalString(
  record: Record<string, unknown>,
  key: string,
  path: string,
): string | undefined {
  const value = record[key];

  if (value === undefined) {
    return undefined;
  }

  if (typeof value !== 'string') {
    throw new DataLoadError(`Expected a string at ${path}.${key}.`);
  }

  return value;
}

function readOptionalUrl(
  record: Record<string, unknown>,
  key: string,
  path: string,
): string | undefined {
  const value = readOptionalString(record, key, path);

  if (value === undefined) {
    return undefined;
  }

  try {
    const url = new URL(value);

    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      throw new Error('Unsupported protocol.');
    }
  } catch {
    throw new DataLoadError(`Expected an HTTP(S) URL at ${path}.${key}.`);
  }

  return value;
}

function readBoolean(record: Record<string, unknown>, key: string, path: string): boolean {
  const value = record[key];

  if (typeof value !== 'boolean') {
    throw new DataLoadError(`Expected a boolean at ${path}.${key}.`);
  }

  return value;
}

function readOptionalNumber(
  record: Record<string, unknown>,
  key: string,
  path: string,
): number | undefined {
  const value = record[key];

  if (value === undefined) {
    return undefined;
  }

  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new DataLoadError(`Expected a number at ${path}.${key}.`);
  }

  return value;
}

function readStringArray(value: unknown, path: string): readonly string[] {
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string')) {
    throw new DataLoadError(`Expected an array of strings at ${path}.`);
  }

  return value;
}

function readTranslation(value: unknown, path: string): ProjectTranslation {
  if (!isRecord(value)) {
    throw new DataLoadError(`Expected an object at ${path}.`);
  }

  return {
    title: readString(value, 'title', path),
    category: readString(value, 'category', path),
    description: readString(value, 'description', path),
  };
}

function readTranslations(value: unknown, path: string): Record<LanguageCode, ProjectTranslation> {
  if (!isRecord(value)) {
    throw new DataLoadError(`Expected an object at ${path}.`);
  }

  const entries = LANGUAGES.map(
    ({ code }) => [code, readTranslation(value[code], `${path}.${code}`)] as const,
  );

  return Object.fromEntries(entries) as Record<LanguageCode, ProjectTranslation>;
}

function readProfileTranslation(value: unknown, path: string): UserProfileTranslation {
  if (!isRecord(value)) {
    throw new DataLoadError(`Expected an object at ${path}.`);
  }

  return {
    title: readString(value, 'title', path),
    bio: readString(value, 'bio', path),
  };
}

function readProfileTranslations(
  value: unknown,
  path: string,
): Record<LanguageCode, UserProfileTranslation> {
  if (!isRecord(value)) {
    throw new DataLoadError(`Expected an object at ${path}.`);
  }

  const entries = LANGUAGES.map(
    ({ code }) => [code, readProfileTranslation(value[code], `${path}.${code}`)] as const,
  );

  return Object.fromEntries(entries) as Record<LanguageCode, UserProfileTranslation>;
}

function readProject(value: unknown, path: string): Project {
  if (!isRecord(value)) {
    throw new DataLoadError(`Expected an object at ${path}.`);
  }

  return {
    id: readString(value, 'id', path),
    translations: readTranslations(value.translations, `${path}.translations`),
    technologies: readStringArray(value.technologies, `${path}.technologies`),
    imageUrl: readString(value, 'imageUrl', path),
    featured: readBoolean(value, 'featured', path),
    year: readOptionalNumber(value, 'year', path),
    repositoryUrl: readOptionalUrl(value, 'repositoryUrl', path),
    demoUrl: readOptionalUrl(value, 'demoUrl', path),
  };
}

function readSocialLink(value: unknown, path: string): SocialLink {
  if (!isRecord(value)) {
    throw new DataLoadError(`Expected an object at ${path}.`);
  }

  return {
    id: readString(value, 'id', path),
    label: readString(value, 'label', path),
    url: readString(value, 'url', path),
  };
}

function readOptionalSocialLinks(value: unknown, path: string): readonly SocialLink[] | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (!Array.isArray(value)) {
    throw new DataLoadError(`Expected an array at ${path}.`);
  }

  return value.map((item, index) => readSocialLink(item, `${path}[${index}]`));
}

export function parseProjects(payload: unknown): readonly Project[] {
  if (!Array.isArray(payload)) {
    throw new DataLoadError('Projects payload must be a JSON array.');
  }

  return payload.map((item, index) => readProject(item, `projects[${index}]`));
}

export function parseUserProfile(payload: unknown): UserProfile {
  if (!isRecord(payload)) {
    throw new DataLoadError('Profile payload must be a JSON object.');
  }

  const avatarUrls = payload.avatarUrls;

  if (!isRecord(avatarUrls)) {
    throw new DataLoadError('Expected an object at profile.avatarUrls.');
  }

  return {
    name: readString(payload, 'name', 'profile'),
    badge: readOptionalString(payload, 'badge', 'profile'),
    avatarUrls: {
      light: readString(avatarUrls, 'light', 'profile.avatarUrls'),
      dark: readString(avatarUrls, 'dark', 'profile.avatarUrls'),
    },
    stack: readStringArray(payload.stack, 'profile.stack'),
    translations: readProfileTranslations(payload.translations, 'profile.translations'),
    email: readOptionalString(payload, 'email', 'profile'),
    socialLinks: readOptionalSocialLinks(payload.socialLinks, 'profile.socialLinks'),
  };
}
