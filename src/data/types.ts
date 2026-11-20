import type { GameModuleLoader } from "@/games/types";

export type GameStatus = "released" | "prototype" | "in-development" | "coming-soon";

export type Genre =
  | "Life sim"
  | "Cozy management"
  | "Narrative"
  | "Creature companion"
  | "Exploration"
  | "Adventure";

export type Device = "desktop" | "tablet" | "mobile";

export type ControlBinding = { input: string; action: string };

export type Game = {
  /** Catalogue number, e.g. "ED-001". Stable forever; used as save namespace. */
  id: string;
  /** URL segment: /play/:slug */
  slug: string;
  title: string;
  tagline: string;
  description: string;
  genre: Genre;
  status: GameStatus;
  /** ISO date (YYYY-MM-DD) once confirmed; null while unannounced. */
  releaseDate: string | null;
  /** Human-readable release note shown when releaseDate is null. */
  releaseNote?: string;
  /** Wide hero art, 16:10. Path under /public. */
  coverImage: string;
  /** Card art, 4:3. Path under /public. */
  thumbnailImage: string;
  /** Describes the artwork for screen readers. */
  imageAlt: string;
  /** True while artwork is a temporary placeholder. */
  placeholderArt: boolean;
  /** Background tone for the game's art surfaces. Text colour on it is derived automatically (see lib/color). */
  accentColor: string;
  supportedDevices: Device[];
  controls: ControlBinding[];
  /**
   * Only true when `gameModule` is a functional game.
   * This is the single switch that enables "Enter this world" buttons.
   */
  playable: boolean;
  gameModule?: GameModuleLoader;
  /** Show on the homepage feature slot. */
  featured?: boolean;
};
