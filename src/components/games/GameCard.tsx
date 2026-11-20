import { Link } from "react-router-dom";
import type { Game } from "@/data/types";
import { cn } from "@/lib/cn";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ArrowGlyph } from "@/components/ui/Button";
import { GameArt } from "./GameArt";

type Props = {
  game: Game;
  className?: string;
  headingLevel?: "h2" | "h3";
  size?: "default" | "large";
};

/**
 * A catalogue entry. The whole card is clickable via a stretched title link,
 * so there is exactly one tab stop and one accessible name per card.
 */
export function GameCard({ game, className, headingLevel = "h3", size = "default" }: Props) {
  const H = headingLevel;
  return (
    <article className={cn("group relative flex flex-col", className)}>
      <div className="relative">
        <GameArt game={game} decorative className="rounded-[4px]" />
        <StatusBadge status={game.status} className="absolute left-3 top-3" />
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4 border-t rule pt-3">
        <p className="meta text-ink-soft">
          <span className="sr-only">Catalogue number </span>
          {game.id}
        </p>
        <p className="meta text-ink-soft">{game.genre}</p>
      </div>
      <H
        className={cn(
          "mt-3 font-medium leading-[1.05] tracking-[-0.025em]",
          size === "large" ? "text-[clamp(1.75rem,3vw,2.5rem)]" : "text-[1.625rem]",
        )}
      >
        <Link
          to={`/play/${game.slug}`}
          className="link-draw after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-[4px] focus-visible:after:outline-3 focus-visible:after:outline-offset-4 focus-visible:after:outline-ink"
        >
          {game.title}
        </Link>
      </H>
      <p className="mt-2 max-w-[44ch] text-[0.9375rem] leading-relaxed text-ink-soft">{game.tagline}</p>
      <p aria-hidden="true" className="mt-4 inline-flex items-center gap-2 text-sm font-medium">
        Open the file <ArrowGlyph />
      </p>
    </article>
  );
}
