import type { Game } from "@/data/types";
import { hasPreviewBuild, isPlayable } from "@/data/games";
import { ButtonLink } from "@/components/ui/Button";
import { STATUS_DETAIL } from "@/data/status";

/**
 * The one place that decides which call-to-action a game gets.
 * - Functional module  → "Enter this world"
 * - Placeholder module → clearly labelled development preview (never "Play")
 * - Nothing yet        → an honest status message, no button
 */
export function GameActions({ game, showDetailLink = false }: { game: Game; showDetailLink?: boolean }) {
  if (isPlayable(game)) {
    return (
      <div className="flex flex-wrap items-center gap-4">
        <ButtonLink to={`/play/${game.slug}/play`}>Enter this world</ButtonLink>
        {showDetailLink ? (
          <ButtonLink to={`/play/${game.slug}`} variant="secondary" arrow={false}>
            Read the file
          </ButtonLink>
        ) : null}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-4">
      <p className="max-w-[46ch] text-[0.9375rem] leading-relaxed text-ink-soft">
        <strong className="font-medium text-ink">Not playable yet.</strong> {STATUS_DETAIL[game.status]}
      </p>
      <div className="flex flex-wrap items-center gap-4">
        {showDetailLink ? <ButtonLink to={`/play/${game.slug}`}>Read the file</ButtonLink> : null}
        {hasPreviewBuild(game) ? (
          <ButtonLink to={`/play/${game.slug}/play`} variant="secondary" arrow={false}>
            View development placeholder
          </ButtonLink>
        ) : null}
      </div>
    </div>
  );
}
