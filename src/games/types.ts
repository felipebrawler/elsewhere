import type { ComponentType } from "react";
import type { GameStorage } from "@/lib/gameStorage";

/**
 * Contract between the studio site and an individual game.
 * A game module lives in `src/games/<slug>/` and default-exports a `GameModule`.
 * It must not import studio components; the shell passes in everything it needs.
 */
export type GameModuleProps = {
  /** Registry id, e.g. "ED-001". Also the save-data namespace. */
  gameId: string;
  /** Namespaced, versioned persistence created by the shell for this game. */
  storage: GameStorage<unknown>;
  /** True while the shell's stage is in browser fullscreen. */
  isFullscreen: boolean;
  /** Mirrors the user's prefers-reduced-motion setting. */
  reducedMotion: boolean;
};

export type GameModule = {
  component: ComponentType<GameModuleProps>;
  /** Whether the stage offers a fullscreen toggle. */
  supportsFullscreen?: boolean;
  /** Current local save schema version. Bump it when the save shape changes. */
  saveSchemaVersion: number;
  /** Optional upgrade path from an older save. Return null to discard it. */
  migrateSave?: (data: unknown, fromVersion: number) => unknown | null;
  /** Labels the module as a stand-in rather than a functional game. */
  isPlaceholder?: boolean;
};

/** Lazy loader so each game is code-split away from the studio bundle. */
export type GameModuleLoader = () => Promise<{ default: GameModule }>;
