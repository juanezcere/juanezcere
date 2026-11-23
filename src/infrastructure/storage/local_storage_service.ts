const STORAGE_NAMESPACE = 'juanezcere';

function getLocalStorage(): Storage | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export class LocalStorageService {
  constructor(private readonly namespace: string = STORAGE_NAMESPACE) {}

  read<T>(key: string): T | null {
    const storage = getLocalStorage();
    if (!storage) {
      return null;
    }

    try {
      const rawValue = storage.getItem(this.toKey(key));
      return rawValue === null ? null : (JSON.parse(rawValue) as T);
    } catch {
      return null;
    }
  }

  write<T>(key: string, value: T): void {
    const storage = getLocalStorage();
    if (!storage) {
      return;
    }

    try {
      storage.setItem(this.toKey(key), JSON.stringify(value));
    } catch {
      return;
    }
  }

  remove(key: string): void {
    const storage = getLocalStorage();
    if (!storage) {
      return;
    }

    try {
      storage.removeItem(this.toKey(key));
    } catch {
      return;
    }
  }

  private toKey(key: string): string {
    return `${this.namespace}:${key}`;
  }
}
