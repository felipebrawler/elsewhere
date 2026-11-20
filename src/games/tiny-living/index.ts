import type { GameModule } from "@/games/types";
import { TinyLivingPlaceholder } from "./TinyLivingPlaceholder";

/**
 * Tiny Living — ED-001.
 * DEVELOPMENT PLACEHOLDER. This module proves the shell contract (mounting,
 * namespaced saves, fullscreen) and is explicitly not a game. Replace
 * `component` with the real game and set `playable: true` in the registry
 * once it is functional.
 */
const tinyLiving: GameModule = {
  component: TinyLivingPlaceholder,
  supportsFullscreen: true,
  saveSchemaVersion: 1,
  isPlaceholder: true,
};

export default tinyLiving;
