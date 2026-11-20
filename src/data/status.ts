import type { Device, Game, GameStatus } from "./types";

/** Plain-language status labels: playful voice, unambiguous meaning. */
export const STATUS_LABEL: Record<GameStatus, string> = {
  released: "Out now",
  prototype: "Prototype",
  "in-development": "In development",
  "coming-soon": "Currently being imagined",
};

export const STATUS_DETAIL: Record<GameStatus, string> = {
  released: "Playable in your browser.",
  prototype: "Early build in progress. Not yet playable.",
  "in-development": "In active production. Not yet playable.",
  "coming-soon": "Coming soon. Concept stage — nothing to play yet.",
};

export const DEVICE_LABEL: Record<Device, string> = {
  desktop: "Desktop",
  tablet: "Tablet",
  mobile: "Mobile",
};

export function releaseText(game: Game): string {
  if (game.releaseDate) {
    return new Date(`${game.releaseDate}T12:00:00`).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  return game.releaseNote ?? "Date to be announced";
}
