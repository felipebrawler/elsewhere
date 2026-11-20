import { useEffect, useState } from "react";
import type { GameModuleProps } from "@/games/types";
import "./tiny-living.css";

type PlaceholderSave = { openedCount: number; firstOpened: string };

/**
 * Explicitly-labelled development placeholder. There is no gameplay here.
 * It records how many times this browser opened the placeholder purely to
 * demonstrate that saves are namespaced and versioned by the shell.
 */
export function TinyLivingPlaceholder({ gameId, storage, isFullscreen, reducedMotion }: GameModuleProps) {
  const [save, setSave] = useState<PlaceholderSave | null>(null);

  useEffect(() => {
    const prev = storage.load() as PlaceholderSave | null;
    const next: PlaceholderSave = {
      openedCount: (prev?.openedCount ?? 0) + 1,
      firstOpened: prev?.firstOpened ?? new Date().toISOString(),
    };
    storage.save(next);
    setSave(next);
  }, [storage]);

  const clear = () => {
    storage.clear();
    setSave(null);
  };

  return (
    <div className="tl-root flex flex-1 items-center justify-center p-4 py-10 md:p-10">
      <section aria-labelledby="tl-title" className="tl-card w-full max-w-2xl overflow-hidden">
        <div className="tl-tape" aria-hidden="true" />
        <div className="p-6 md:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.12em]">{gameId} · Development placeholder</p>
          <h2 id="tl-title" className="mt-4 font-display text-4xl font-medium leading-none tracking-[-0.04em] md:text-5xl">
            Tiny Living is not playable yet.
          </h2>
          <p className="mt-5 text-[1.0625rem] leading-relaxed">
            This room is still being built. What you're seeing is a stand-in that checks the game player works —
            loading, saving and fullscreen — before the real game moves in. There's nothing to play here.
          </p>

          <h3 className="mt-8 font-mono text-xs uppercase tracking-[0.12em]">Shell diagnostics</h3>
          <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-4 border-t-2 border-[var(--tl-ink)] pt-4 sm:grid-cols-2">
            <div>
              <dt>Save namespace</dt>
              <dd className="mt-1 break-all font-mono text-sm">{storage.key}</dd>
            </div>
            <div>
              <dt>Save schema</dt>
              <dd className="mt-1 font-mono text-sm">v{storage.version}</dd>
            </div>
            <div>
              <dt>Placeholder opened (this browser)</dt>
              <dd className="mt-1 font-mono text-sm">{save ? `${save.openedCount}×` : "No save data"}</dd>
            </div>
            <div>
              <dt>Fullscreen · reduced motion</dt>
              <dd className="mt-1 font-mono text-sm">
                {isFullscreen ? "on" : "off"} · {reducedMotion ? "on" : "off"}
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" className="tl-btn" onClick={clear}>
              Clear placeholder save data
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
