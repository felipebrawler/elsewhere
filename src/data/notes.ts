export type FieldNote = {
  id: string;
  date: string; // ISO
  title: string;
  summary: string;
  tags: string[];
};

/** Field Notes. Add entries here; the Notes page and homepage read from this list. */
export const notes: FieldNote[] = [
  {
    id: "FN-001",
    date: "2026-11-20",
    title: "The department opens its doors",
    summary:
      "A small studio, a short list of places we'd like to visit, and one room we're building first. Tiny Living is in prototype; everything else is still being imagined.",
    tags: ["Studio", "Tiny Living"],
  },
];
