/**
 * THE GAME REGISTRY — single source of truth for every title.
 * Pages never hard-code game data; they read from here.
 *
 * All titles, descriptions, release details and artwork are provisional.
 * To add a game: see README → "Adding a game".
 */
import type { Game, GameStatus, Genre } from "./types";

const art = (slug: string) => ({
  coverImage: `/games/${slug}/cover.svg`,
  thumbnailImage: `/games/${slug}/thumb.svg`,
});

export const games: Game[] = [
  {
    id: "ED-001",
    slug: "tiny-living",
    title: "Tiny Living",
    tagline: "One small room. A whole life inside it.",
    description:
      "A gentle life sim about making a home out of very little space. Arrange a single room, tend to small routines, and discover how a few square metres can hold an entire world. Tiny Living is our first prototype and planned first release.",
    genre: "Life sim",
    status: "prototype",
    releaseDate: null,
    releaseNote: "Planned first release · date to be announced",
    ...art("tiny-living"),
    imageAlt:
      "Placeholder artwork: a simple geometric cutaway of a single room with a round window, a plant and a lamp, on a butter-yellow background.",
    placeholderArt: true,
    accentColor: "#F7E7A0",
    supportedDevices: ["desktop", "tablet", "mobile"],
    controls: [
      { input: "Mouse / touch", action: "Pick up and place objects" },
      { input: "R", action: "Rotate the held object" },
      { input: "Esc", action: "Open the pause menu" },
    ],
    playable: false,
    // Development placeholder only — swaps for the real game when it exists.
    gameModule: () => import("@/games/tiny-living"),
    featured: true,
  },
  {
    id: "ED-002",
    slug: "cafe-after-hours",
    title: "Café After Hours",
    tagline: "The last customers are never quite ordinary.",
    description:
      "Run a small café that only opens once the city is asleep. Brew, listen and learn the stories of the regulars who drift in after midnight.",
    genre: "Cozy management",
    status: "coming-soon",
    releaseDate: null,
    ...art("cafe-after-hours"),
    imageAlt:
      "Placeholder artwork: a coffee cup with rising steam beneath a crescent moon, on a deep ink-blue background.",
    placeholderArt: true,
    accentColor: "#182943",
    supportedDevices: ["desktop", "tablet"],
    controls: [],
    playable: false,
  },
  {
    id: "ED-003",
    slug: "main-character-energy",
    title: "Main Character Energy",
    tagline: "Every scene is yours. Act accordingly.",
    description:
      "A short narrative game about stepping into the spotlight of your own life. Choose your lines, read the room and find out what kind of protagonist you really are.",
    genre: "Narrative",
    status: "coming-soon",
    releaseDate: null,
    ...art("main-character-energy"),
    imageAlt:
      "Placeholder artwork: a single figure standing in a cone of spotlight, with a small starburst above, on a soft pink background.",
    placeholderArt: true,
    accentColor: "#F3C6B5",
    supportedDevices: ["desktop", "tablet", "mobile"],
    controls: [],
    playable: false,
  },
  {
    id: "ED-004",
    slug: "pocket-pals",
    title: "Pocket Pals",
    tagline: "Small companions with big opinions.",
    description:
      "Look after a handful of tiny creatures who live in your pocket. Feed them, learn their quirks and discover what each one is quietly trying to tell you.",
    genre: "Creature companion",
    status: "coming-soon",
    releaseDate: null,
    ...art("pocket-pals"),
    imageAlt:
      "Placeholder artwork: two round creatures with dot eyes peeking out of a pocket, on a sage-green background.",
    placeholderArt: true,
    accentColor: "#A8BFAE",
    supportedDevices: ["mobile", "tablet", "desktop"],
    controls: [],
    playable: false,
  },
  {
    id: "ED-005",
    slug: "little-somewhere",
    title: "Little Somewhere",
    tagline: "A map with one unmarked place on it.",
    description:
      "Wander a hand-drawn countryside in search of the one spot that isn't on any map. A quiet exploration game about paths, landmarks and getting pleasantly lost.",
    genre: "Exploration",
    status: "coming-soon",
    releaseDate: null,
    ...art("little-somewhere"),
    imageAlt:
      "Placeholder artwork: a dotted path winding across contour lines towards a small flag, on a pale blue background.",
    placeholderArt: true,
    accentColor: "#C9D7E6",
    supportedDevices: ["desktop", "tablet"],
    controls: [],
    playable: false,
  },
  {
    id: "ED-006",
    slug: "lost-and-found-island",
    title: "Lost & Found Island",
    tagline: "Everything washes up somewhere.",
    description:
      "Every lost thing in the world ends up on one small island, and you are its keeper. Catalogue the curious objects that wash ashore and return them to where they belong.",
    genre: "Adventure",
    status: "coming-soon",
    releaseDate: null,
    ...art("lost-and-found-island"),
    imageAlt:
      "Placeholder artwork: a small island with a single palm, a large sun and a bottle bobbing in the waves, on a sand-coloured background.",
    placeholderArt: true,
    accentColor: "#E9DCBC",
    supportedDevices: ["desktop", "tablet", "mobile"],
    controls: [],
    playable: false,
  },
];

/* ---------------------------------------------------------------- queries */

export const getGameBySlug = (slug: string | undefined) =>
  games.find((g) => g.slug === slug);

export const getFeaturedGame = () => games.find((g) => g.featured) ?? games[0];

/** The only gate for active Play buttons: flagged playable AND a module exists. */
export const isPlayable = (game: Game) => game.playable && Boolean(game.gameModule);

/** A loadable module that is not (yet) a real game — e.g. a dev placeholder. */
export const hasPreviewBuild = (game: Game) => !game.playable && Boolean(game.gameModule);

export function getRelatedGames(game: Game, count = 3): Game[] {
  const others = games.filter((g) => g.id !== game.id);
  const sameGenre = others.filter((g) => g.genre === game.genre);
  const rest = others.filter((g) => g.genre !== game.genre);
  return [...sameGenre, ...rest].slice(0, count);
}

export const allGenres = (): Genre[] => [...new Set(games.map((g) => g.genre))];
export const allStatuses = (): GameStatus[] => [...new Set(games.map((g) => g.status))];

/* ------------------------------------------------------- dev-time checks */
if (import.meta.env.DEV) {
  const seen = new Set<string>();
  for (const g of games) {
    for (const k of [g.id, g.slug]) {
      if (seen.has(k)) console.error(`[registry] Duplicate id/slug: ${k}`);
      seen.add(k);
    }
    if (g.playable && !g.gameModule)
      console.error(`[registry] ${g.id} is marked playable but has no gameModule.`);
    if (g.playable && g.status !== "released")
      console.warn(`[registry] ${g.id} is playable but its status is "${g.status}".`);
  }
}
