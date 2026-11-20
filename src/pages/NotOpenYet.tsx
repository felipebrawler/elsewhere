import { PortalMark } from "@/brand/PortalMark";
import { ButtonLink } from "@/components/ui/Button";
import { STATUS_LABEL } from "@/data/status";
import type { Game } from "@/data/types";

/** Shown if someone deep-links to the player of a game with nothing to load. */
export function NotOpenYet({ game }: { game: Game }) {
  return (
    <section className="container-dept grid min-h-[70vh] items-center gap-12 py-20 md:grid-cols-12">
      <div className="md:col-span-7">
        <p className="meta text-ink-soft">
          {game.id} · {STATUS_LABEL[game.status]}
        </p>
        <h1 className="mt-6 text-[clamp(2.75rem,7vw,6rem)] font-medium leading-[0.92] tracking-[-0.05em]">
          {game.title} isn't open yet.
        </h1>
        <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-ink-soft">
          This world is currently being imagined, so there's nothing to play here just yet. The file has everything
          we can share so far.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink to={`/play/${game.slug}`}>Read the file</ButtonLink>
          <ButtonLink to="/play" variant="secondary" arrow={false}>
            Back to the collection
          </ButtonLink>
        </div>
      </div>
      <PortalMark className="mx-auto size-48 text-sage md:col-span-4 md:col-start-9 md:size-72" breathe />
    </section>
  );
}
