import type { Game } from "@/data/types";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { GameCard } from "./GameCard";

/**
 * Asymmetric editorial grid: every third card is offset downward on desktop,
 * breaking the "SaaS template" rhythm without hurting reading order.
 */
export function GameGrid({ games, headingLevel = "h3" }: { games: Game[]; headingLevel?: "h2" | "h3" }) {
  return (
    <ul className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
      {games.map((game, i) => (
        <Reveal
          as="li"
          key={game.id}
          delay={(i % 3) * 0.08}
          className={cn(i % 3 === 1 && "lg:mt-24", i % 3 === 2 && "lg:mt-12")}
        >
          <GameCard game={game} headingLevel={headingLevel} />
        </Reveal>
      ))}
    </ul>
  );
}
