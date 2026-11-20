const INK = "#182943";
const PAPER = "#F4F1E9";

function luminance(hex: string): number {
  const n = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(n.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Returns ink or paper, whichever reads better on the given background. */
export function readableOn(bg: string): string {
  return luminance(bg) > 0.18 ? INK : PAPER;
}
