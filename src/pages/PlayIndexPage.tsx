import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { PageIntro } from "@/components/ui/PageIntro";
import { GameGrid } from "@/components/games/GameGrid";
import { Button } from "@/components/ui/Button";
import { allGenres, allStatuses, games } from "@/data/games";
import { STATUS_LABEL } from "@/data/status";
import type { GameStatus, Genre } from "@/data/types";
import { cn } from "@/lib/cn";
import { usePageMeta } from "@/lib/usePageMeta";

type FilterGroupProps<T extends string> = {
  label: string;
  options: { value: T; label: string }[];
  value: T | null;
  onChange: (v: T | null) => void;
};

function FilterGroup<T extends string>({ label, options, value, onChange }: FilterGroupProps<T>) {
  const pill =
    "min-h-10 rounded-full border px-4 text-sm transition-colors duration-200 aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper";
  return (
    <div role="group" aria-label={label} className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
      <span className="meta w-20 shrink-0 text-ink-soft">{label}</span>
      <div className="flex flex-wrap gap-2">
        <button type="button" aria-pressed={value === null} onClick={() => onChange(null)} className={cn(pill, "border-ink/25 hover:border-ink")}>
          All
        </button>
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            aria-pressed={value === o.value}
            onClick={() => onChange(value === o.value ? null : o.value)}
            className={cn(pill, "border-ink/25 hover:border-ink")}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function PlayIndexPage() {
  usePageMeta("The collection", "Every Elsewhere Dept. game on file — prototypes and worlds currently being imagined.");
  const [params, setParams] = useSearchParams();
  const genres = allGenres();
  const statuses = allStatuses();

  // URL is the source of truth so filtered views are linkable; unknown values are ignored.
  const genre = genres.find((g) => g === params.get("genre")) ?? null;
  const status = statuses.find((s) => s === params.get("status")) ?? null;

  const update = (key: "genre" | "status", value: string | null) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true, preventScrollReset: true });
  };

  const filtered = useMemo(
    () => games.filter((g) => (!genre || g.genre === genre) && (!status || g.status === status)),
    [genre, status],
  );

  return (
    <>
      <PageIntro label={`The collection · ${games.length} files`} title={["Find", "somewhere new."]}>
        <p>
          Every world currently on file at the department. Some are being built, most are still being imagined. We'll
          only open the door when there's something real behind it.
        </p>
      </PageIntro>

      <section aria-labelledby="collection-heading" className="container-dept pb-24 md:pb-36">
        <h2 id="collection-heading" className="sr-only">
          Games
        </h2>
        <div className="flex flex-col gap-5 border-y rule py-6">
          <FilterGroup<Genre>
            label="Genre"
            options={genres.map((g) => ({ value: g, label: g }))}
            value={genre}
            onChange={(v) => update("genre", v)}
          />
          <FilterGroup<GameStatus>
            label="Status"
            options={statuses.map((s) => ({ value: s, label: STATUS_LABEL[s] }))}
            value={status}
            onChange={(v) => update("status", v)}
          />
        </div>
        <p className="meta mt-6 text-ink-soft" role="status" aria-live="polite">
          Showing {filtered.length} of {games.length}
        </p>

        <div className="mt-12">
          {filtered.length ? (
            <GameGrid games={filtered} />
          ) : (
            <div className="flex flex-col items-start gap-6 border border-dashed border-ink/30 p-10">
              <p className="font-display text-3xl font-medium tracking-[-0.03em]">Nothing filed under that combination.</p>
              <Button variant="secondary" onClick={() => setParams({}, { replace: true })}>
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
