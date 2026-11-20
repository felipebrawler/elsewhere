/** Tiny className joiner — keeps components free of a dependency for one job. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
