import { useEffect } from "react";

const SITE = "Elsewhere Dept.";

/** Sets document title + description per route. */
export function usePageMeta(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${SITE}` : `${SITE} — Small games. Other worlds.`;
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    }
  }, [title, description]);
}
