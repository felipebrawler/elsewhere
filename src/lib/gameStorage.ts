/**
 * Namespaced, versioned localStorage for game saves.
 * Key format: `elsewhere:<gameId>:<slot>` — games can never read each other's data.
 */
type Envelope = { v: number; savedAt: string; data: unknown };

export type GameStorage<T> = {
  readonly key: string;
  readonly version: number;
  load(): T | null;
  save(data: T): void;
  clear(): void;
};

const PREFIX = "elsewhere";

function safeStorage(): Storage | null {
  try {
    const s = window.localStorage;
    const probe = `${PREFIX}:__probe__`;
    s.setItem(probe, "1");
    s.removeItem(probe);
    return s;
  } catch {
    return null; // private mode, disabled storage, SSR
  }
}

export function createGameStorage<T>(options: {
  gameId: string;
  version: number;
  slot?: string;
  migrate?: (data: unknown, fromVersion: number) => unknown | null;
}): GameStorage<T> {
  const { gameId, version, slot = "save", migrate } = options;
  const key = `${PREFIX}:${gameId}:${slot}`;
  const store = safeStorage();

  return {
    key,
    version,
    load() {
      if (!store) return null;
      const raw = store.getItem(key);
      if (!raw) return null;
      try {
        const env = JSON.parse(raw) as Envelope;
        if (env.v === version) return env.data as T;
        if (env.v < version && migrate) {
          const upgraded = migrate(env.data, env.v);
          if (upgraded !== null) {
            this.save(upgraded as T);
            return upgraded as T;
          }
        }
        // Unknown or un-migratable schema: discard rather than crash the game.
        store.removeItem(key);
        return null;
      } catch {
        store.removeItem(key);
        return null;
      }
    },
    save(data) {
      if (!store) return;
      const env: Envelope = { v: version, savedAt: new Date().toISOString(), data };
      try {
        store.setItem(key, JSON.stringify(env));
      } catch {
        /* quota exceeded — fail quietly, the game keeps running */
      }
    },
    clear() {
      store?.removeItem(key);
    },
  };
}
