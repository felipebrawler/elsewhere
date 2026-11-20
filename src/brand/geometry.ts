/**
 * The Portal — Elsewhere Dept.'s secondary symbol.
 * An eight-arm asterisk orbiting a disc with an arched doorway cut through it:
 * a mark that reads as "note to self" (asterisk) and "way through" (portal).
 * Drawn on a 64×64 grid so it stays crisp at 16/32px.
 */
export const PORTAL_VIEWBOX = "0 0 64 64";
export const PORTAL_ARM_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315] as const;
export const PORTAL_ARM = { x: 28.5, y: 2, width: 7, height: 15, rx: 3.5 } as const;
/** Disc (r=11) with the doorway as an even-odd hole: transparent in every colourway. */
export const PORTAL_DISC_PATH =
  "M32 21a11 11 0 1 1 0 22a11 11 0 1 1 0-22zM28 39V31a4 4 0 0 1 8 0v8z";
