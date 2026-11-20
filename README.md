# Elsewhere Dept.

**Small games. Other worlds.** — the website of Elsewhere Dept., an independent digital game label
(fictional identity: *The Department of Imaginary Places*).

React 19 · TypeScript · Vite · Tailwind CSS v4 · React Router · Motion for React · Lucide.
No backend, no auth. All game data is local and typed.

---

## Setup

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck  # tsc -b
npm run build      # typecheck + production build → dist/
npm run preview    # serve dist/ locally
```

Node 20+ (Netlify is pinned to 22 in `netlify.toml`).

## Deploying to Netlify

`netlify.toml` already contains the build command (`npm run build`), the publish directory (`dist`), an SPA fallback
redirect (so deep links like `/play/tiny-living` work), and long-cache headers for hashed assets.

1. Push the repo to GitHub/GitLab.
2. In Netlify: **Add new site → Import an existing project** and pick the repo. No settings need to change.
3. Or from the CLI: `npx netlify deploy --build --prod`.

## Routes

| Path | Page |
| --- | --- |
| `/` | Home |
| `/play` | Game collection (filter by genre/status, filters live in the URL) |
| `/play/:slug` | Game detail |
| `/play/:slug/play` | Game player (`GameShell`, full-bleed, no site chrome) |
| `/about` | The Department, including brand insignia |
| `/notes` | Field Notes |
| `*` | Branded 404 — "This place hasn't been discovered." |

## Project structure

```
public/
  favicon.svg
  brand/                 portal mark colourways (ink, paper, butter, butter-on-ink, mono)
  games/<slug>/          cover.svg (16:10) + thumb.svg (4:3) per game
scripts/
  generate-placeholder-art.mjs   regenerates the labelled placeholder art
src/
  brand/                 PortalMark, Wordmark, mark geometry
  components/
    layout/              Layout, SiteHeader (+ mobile nav), SiteFooter
    ui/                  Button/ButtonLink, StatusBadge, Reveal, LineReveal, SectionHeading, PageIntro, Marquee
    games/               GameCard, GameGrid, GameArt, GameActions (the only place that decides CTAs)
    shell/               GameShell, GameErrorBoundary, useFullscreen
  data/
    games.ts             ★ the game registry + queries (getGameBySlug, isPlayable, getRelatedGames…)
    types.ts             Game, GameStatus, Genre, Device…
    status.ts            status/device labels in brand voice
    notes.ts             Field Notes entries
  games/
    types.ts             GameModule contract
    tiny-living/         ED-001 module (currently a labelled development placeholder)
  lib/                   gameStorage (namespaced, versioned saves), color, cn, usePageMeta
  pages/                 one file per route
  styles/index.css       design tokens (@theme), base styles, focus rings, reduced motion
```

## Design system

- **Colour** — Ink `#182943` (text), Paper `#F4F1E9` (background), Butter `#F7E7A0` (brand highlight),
  Sage `#A8BFAE` and Coral `#EE775E` (restrained accents). Coral and Sage are decorative on Paper;
  text-safe variants `coral-deep` / `sage-deep` and `ink-soft` (7.1:1) exist for small text.
- **Type** — Space Grotesk (display), Inter (body/UI), IBM Plex Mono (metadata, `.meta` utility). Self-hosted via Fontsource.
- **Spacing** — 8px rhythm: use Tailwind steps 2/4/6/8/10/12/16/20/24…
- **Layout** — `.container-dept` (max 1440px), 12-column asymmetric grids, `.rule` hairlines.
- **Motion** — slow portal spin/breathe, masked line reveals, scroll fade-ins. `MotionConfig reducedMotion="user"`
  plus a CSS `prefers-reduced-motion` guard disable movement.
- **Focus** — 3px ink outline everywhere; inside dark sections add `.on-ink` and it flips to butter.

## Adding a game

1. **Artwork** — add `public/games/<slug>/cover.svg|png|webp` (16:10, ~1600×1000) and `thumb.*` (4:3, ~1333×1000).
   For a temporary placeholder, add a motif to `scripts/generate-placeholder-art.mjs` and run it.
2. **Registry entry** — append one object to `games` in `src/data/games.ts`:
   ```ts
   {
     id: "ED-007", slug: "my-game", title: "My Game", tagline: "…", description: "…",
     genre: "Exploration", status: "coming-soon", releaseDate: null,
     coverImage: "/games/my-game/cover.svg", thumbnailImage: "/games/my-game/thumb.svg",
     imageAlt: "…", placeholderArt: true, accentColor: "#C9D7E6",
     supportedDevices: ["desktop"], controls: [], playable: false,
   }
   ```
   That alone puts it on the homepage preview, collection, filters, related games and its own detail page.
   New genres go in the `Genre` union in `src/data/types.ts`.
3. **Game module** (when there's something to play) — create `src/games/my-game/index.ts`:
   ```ts
   import type { GameModule } from "@/games/types";
   import { MyGame } from "./MyGame";
   const mod: GameModule = { component: MyGame, supportsFullscreen: true, saveSchemaVersion: 1 };
   export default mod;
   ```
   Then in the registry: `gameModule: () => import("@/games/my-game")`.
4. **Make it playable** — only when the module is a functional game, set `playable: true` and `status: "released"`.
   `isPlayable()` requires both `playable` and a `gameModule`; that is the only switch that shows **Enter this world**.
   A module with `playable: false` is shown as a clearly labelled *development placeholder*, never as "Play".

### Game module rules

- The component receives `GameModuleProps`: `gameId`, `storage`, `isFullscreen`, `reducedMotion`.
- Don't import studio components into a game. Scope game CSS under a root class (see `tiny-living.css`).
- Persist through the provided `storage` only: keys are `elsewhere:<gameId>:save`, wrapped with a schema version.
  When the save shape changes, bump `saveSchemaVersion` and optionally provide `migrateSave(data, fromVersion)`;
  un-migratable saves are discarded rather than crashing the game.
- Crashes are caught by `GameErrorBoundary` and shown inside the shell with a retry; the site stays up.
- Each module is lazy-loaded into its own chunk.

The dev server logs registry problems (duplicate ids/slugs, `playable` without a module, playable but not released).

---

## Unfinished assets

- **All game artwork** is temporary, generated geometric placeholders, labelled "PLACEHOLDER ARTWORK · NOT FINAL"
  in the image and captioned on detail pages.
- **All titles, taglines, descriptions, genres, devices and Tiny Living's planned controls** are provisional.
- **Tiny Living game module**: currently a development placeholder (shell diagnostics only, no gameplay).
- No raster favicon set (`favicon.ico`, `apple-touch-icon.png`, PWA icons) or Open Graph image yet; only `favicon.svg`.
- Field Notes has one launch entry; there are no individual note pages yet.
- No contact/press details or social links (none provided, so none are shown).

## Future enhancements

- Real Tiny Living module; then flip `playable` and `status`.
- Per-note pages (`/notes/:id`), possibly MDX-driven, plus an RSS feed.
- Raster icon set and per-game Open Graph images; prerendering/SSG for better link previews and SEO.
- Newsletter or "notify me" for upcoming titles (needs a service; deliberately left out).
- Save export/import in the shell, plus a settings panel (audio, text size) passed to modules.
- Automated checks: Playwright route smoke tests and axe accessibility checks in CI.
