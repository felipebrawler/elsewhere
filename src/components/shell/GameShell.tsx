import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useReducedMotion } from "motion/react";
import { Maximize2, Minimize2, RotateCcw, TriangleAlert } from "lucide-react";
import { PortalMark } from "@/brand/PortalMark";
import { ArrowGlyph, Button, ButtonLink } from "@/components/ui/Button";
import type { Game } from "@/data/types";
import type { GameModule } from "@/games/types";
import { createGameStorage } from "@/lib/gameStorage";
import { GameErrorBoundary } from "./GameErrorBoundary";
import { useFullscreen } from "./useFullscreen";

type LoadState =
  | { status: "loading" }
  | { status: "ready"; module: GameModule }
  | { status: "error"; error: Error };

/**
 * GameShell — the studio-side frame every game runs inside.
 * Responsibilities: lazy-load the module, provide namespaced storage, fullscreen,
 * loading/error states and a way back. Games own everything inside the stage.
 */
export function GameShell({ game }: { game: Game }) {
  const [state, setState] = useState<LoadState>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const { supported, isFullscreen, toggle } = useFullscreen(stageRef);
  const reducedMotion = Boolean(useReducedMotion());

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading" });
    if (!game.gameModule) {
      setState({ status: "error", error: new Error("This game has no module yet.") });
      return;
    }
    game
      .gameModule()
      .then((m) => !cancelled && setState({ status: "ready", module: m.default }))
      .catch((error: unknown) => {
        if (!cancelled) setState({ status: "error", error: error instanceof Error ? error : new Error(String(error)) });
      });
    return () => {
      cancelled = true;
    };
  }, [game, attempt]);

  const module = state.status === "ready" ? state.module : null;
  const storage = useMemo(
    () =>
      module
        ? createGameStorage<unknown>({ gameId: game.id, version: module.saveSchemaVersion, migrate: module.migrateSave })
        : null,
    [game.id, module],
  );
  const isPlaceholder = Boolean(module?.isPlaceholder) || !game.playable;
  const canFullscreen = supported && Boolean(module?.supportsFullscreen);
  const detailHref = `/play/${game.slug}`;

  return (
    <div className="flex min-h-dvh flex-col bg-ink text-paper on-ink">
      <header className="flex items-center gap-4 border-b border-paper/15 px-4 py-3 md:px-8">
        <Link to={detailHref} className="group inline-flex min-h-11 items-center gap-2 text-sm font-medium">
          <ArrowGlyph direction="left" />
          <span>
            Leave<span className="hidden sm:inline"> this world</span>
          </span>
        </Link>
        <div className="mx-auto flex min-w-0 items-center gap-3 text-center">
          <PortalMark className="hidden size-5 shrink-0 text-butter sm:block" />
          <h1 className="truncate font-display text-lg font-medium tracking-[-0.02em]">{game.title}</h1>
          <span className="meta hidden text-paper/60 sm:inline">{game.id}</span>
        </div>
        {canFullscreen ? (
          <button
            type="button"
            onClick={toggle}
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-medium hover:bg-paper/10"
            aria-pressed={isFullscreen}
          >
            {isFullscreen ? <Minimize2 aria-hidden="true" className="size-4" /> : <Maximize2 aria-hidden="true" className="size-4" />}
            <span className="hidden sm:inline">{isFullscreen ? "Exit fullscreen" : "Fullscreen"}</span>
            <span className="sr-only sm:hidden">{isFullscreen ? "Exit fullscreen" : "Fullscreen"}</span>
          </button>
        ) : (
          <span className="w-11 sm:w-24" aria-hidden="true" />
        )}
      </header>

      {isPlaceholder && state.status === "ready" ? (
        <p role="note" className="bg-butter px-4 py-2 text-center font-mono text-xs uppercase tracking-[0.1em] text-ink">
          Development placeholder · not a playable game
        </p>
      ) : null}

      <main
        id="main"
        className="relative flex flex-1 flex-col"
        aria-busy={state.status === "loading"}
        aria-label={`${game.title} game stage`}
      >
        {/* The stage: games render here, isolated in their own stacking context. */}
        <div
          ref={stageRef}
          data-game={game.slug}
          className="relative isolate flex flex-1 flex-col bg-ink"
        >
          {state.status === "loading" ? <ShellLoading title={game.title} /> : null}

          {state.status === "error" ? (
            <ShellError
              message="This world couldn't be reached."
              detail={state.error.message}
              onRetry={() => setAttempt((n) => n + 1)}
              backHref={detailHref}
            />
          ) : null}

          {module && storage ? (
            <GameErrorBoundary
              key={attempt}
              fallback={(error, reset) => (
                <ShellError
                  message="Something went sideways in this world."
                  detail={error.message}
                  onRetry={() => {
                    reset();
                    setAttempt((n) => n + 1);
                  }}
                  backHref={detailHref}
                />
              )}
            >
              <module.component
                gameId={game.id}
                storage={storage}
                isFullscreen={isFullscreen}
                reducedMotion={reducedMotion}
              />
            </GameErrorBoundary>
          ) : null}
        </div>
      </main>
    </div>
  );
}

function ShellLoading({ title }: { title: string }) {
  return (
    <div role="status" className="flex flex-1 flex-col items-center justify-center gap-6 p-8 text-center">
      <PortalMark className="size-16 text-butter" spin breathe />
      <p className="meta text-paper/70">Opening the door to {title}…</p>
    </div>
  );
}

function ShellError({
  message,
  detail,
  onRetry,
  backHref,
}: {
  message: string;
  detail: string;
  onRetry: () => void;
  backHref: string;
}) {
  return (
    <div role="alert" className="flex flex-1 flex-col items-center justify-center gap-6 p-8 text-center">
      <TriangleAlert aria-hidden="true" className="size-10 text-butter" strokeWidth={1.5} />
      <div>
        <p className="font-display text-3xl font-medium tracking-[-0.03em]">{message}</p>
        <p className="meta mt-3 text-paper/60">{detail}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Button variant="butter" onClick={onRetry}>
          <RotateCcw aria-hidden="true" className="size-4" /> Try again
        </Button>
        <ButtonLink to={backHref} variant="ghost" arrow={false} className="text-paper">
          Back to the file
        </ButtonLink>
      </div>
    </div>
  );
}
