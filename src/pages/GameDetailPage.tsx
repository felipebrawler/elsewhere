import type { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { Monitor, Smartphone, Tablet } from "lucide-react";
import { GameArt } from "@/components/games/GameArt";
import { GameActions } from "@/components/games/GameActions";
import { GameGrid } from "@/components/games/GameGrid";
import { ArrowGlyph } from "@/components/ui/Button";
import { LineReveal } from "@/components/ui/LineReveal";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getGameBySlug, getRelatedGames, isPlayable } from "@/data/games";
import { DEVICE_LABEL, STATUS_DETAIL, STATUS_LABEL, releaseText } from "@/data/status";
import type { Device } from "@/data/types";
import { usePageMeta } from "@/lib/usePageMeta";
import { NotFoundPage } from "./NotFoundPage";

const deviceIcon: Record<Device, typeof Monitor> = { desktop: Monitor, tablet: Tablet, mobile: Smartphone };

export function GameDetailPage() {
  const { slug } = useParams();
  const game = getGameBySlug(slug);
  usePageMeta(game ? game.title : "Undiscovered", game?.tagline);
  if (!game) return <NotFoundPage />;

  const related = getRelatedGames(game);
  const playable = isPlayable(game);

  return (
    <article>
      <header className="container-dept pt-8 md:pt-12">
        <nav aria-label="Breadcrumb">
          <ol className="meta flex flex-wrap items-center gap-2 text-ink-soft">
            <li>
              <Link to="/play" className="group inline-flex items-center gap-2 py-2 hover:text-ink">
                <ArrowGlyph direction="left" /> The collection
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">
              {game.id}
            </li>
          </ol>
        </nav>

        <div className="mt-8 grid gap-8 md:mt-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="meta text-ink-soft">{game.id}</span>
              <span aria-hidden="true" className="meta text-ink-soft">·</span>
              <span className="meta text-ink-soft">{game.genre}</span>
              <StatusBadge status={game.status} />
            </div>
            <h1 className="mt-6 text-[clamp(3.25rem,10vw,9rem)] font-medium leading-[0.86] tracking-[-0.055em]">
              <LineReveal lines={[game.title]} />
            </h1>
          </div>
          <Reveal delay={0.2} className="md:col-span-4 md:pb-3">
            <p className="font-display text-2xl leading-snug tracking-[-0.015em] md:text-[1.75rem]">{game.tagline}</p>
          </Reveal>
        </div>
      </header>

      <Reveal className="container-dept mt-10 md:mt-16">
        <figure>
          <GameArt game={game} variant="cover" priority className="rounded-[4px]" />
          {game.placeholderArt ? (
            <figcaption className="meta mt-3 text-ink-soft">Placeholder artwork · final art in progress</figcaption>
          ) : null}
        </figure>
      </Reveal>

      <div className="container-dept grid gap-14 py-16 md:py-24 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <h2 className="meta text-ink-soft">The file</h2>
          <p className="mt-5 text-xl leading-relaxed md:text-[1.375rem]">{game.description}</p>

          <div className="mt-10">
            <GameActions game={game} />
          </div>

          {!playable ? (
            <aside aria-label="Preview" className="mt-12 border-l-4 border-butter bg-paper-deep/70 p-6 md:p-8">
              <p className="meta text-ink-soft">Preview · {STATUS_LABEL[game.status]}</p>
              <p className="mt-3 font-display text-2xl font-medium leading-snug tracking-[-0.02em]">
                {game.status === "coming-soon"
                  ? "This world is currently being imagined."
                  : "This world is under construction."}
              </p>
              <p className="mt-3 leading-relaxed text-ink-soft">
                Everything on this page — name, artwork, details — is provisional and may change before release.
                Progress reports land in the{" "}
                <Link to="/notes" className="font-medium text-ink underline underline-offset-4 hover:no-underline">
                  field notes
                </Link>
                .
              </p>
            </aside>
          ) : null}
        </div>

        <aside aria-labelledby="facts-title" className="lg:col-span-4 lg:col-start-9">
          <h2 id="facts-title" className="meta border-b border-ink pb-3 text-ink-soft">
            Index card
          </h2>
          <dl className="divide-y divide-[var(--color-rule)]">
            <Fact term="Catalogue no.">{game.id}</Fact>
            <Fact term="Genre">{game.genre}</Fact>
            <Fact term="Status">
              {STATUS_LABEL[game.status]}
              <span className="mt-1 block text-sm text-ink-soft">{STATUS_DETAIL[game.status]}</span>
            </Fact>
            <Fact term="Release">{releaseText(game)}</Fact>
            <Fact term={playable ? "Devices" : "Planned devices"}>
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {game.supportedDevices.map((d) => {
                  const Icon = deviceIcon[d];
                  return (
                    <li key={d} className="inline-flex items-center gap-2">
                      <Icon aria-hidden="true" className="size-4" strokeWidth={1.75} />
                      {DEVICE_LABEL[d]}
                    </li>
                  );
                })}
              </ul>
            </Fact>
            <Fact term={playable ? "Controls" : "Planned controls"}>
              {game.controls.length ? (
                <table className="w-full text-left text-[0.9375rem]">
                  <caption className="sr-only">Controls for {game.title}</caption>
                  <thead className="sr-only">
                    <tr>
                      <th scope="col">Input</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {game.controls.map((c) => (
                      <tr key={c.input} className="align-baseline">
                        <th scope="row" className="py-1 pr-4 font-normal">
                          <kbd className="rounded-[3px] border border-ink/30 bg-paper px-1.5 py-0.5 font-mono text-xs">
                            {c.input}
                          </kbd>
                        </th>
                        <td className="py-1 text-ink-soft">{c.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <span className="text-ink-soft">To be documented once the design settles.</span>
              )}
            </Fact>
          </dl>
        </aside>
      </div>

      {related.length ? (
        <section aria-labelledby="related-title" className="border-t rule bg-paper-deep/60 py-20 md:py-28">
          <div className="container-dept">
            <SectionHeading kicker="Elsewhere on file" id="related-title" title="Nearby worlds." />
            <div className="mt-14">
              <GameGrid games={related} />
            </div>
          </div>
        </section>
      ) : null}
    </article>
  );
}

function Fact({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[8.5rem_1fr] gap-4 py-4">
      <dt className="meta pt-1 text-ink-soft">{term}</dt>
      <dd>{children}</dd>
    </div>
  );
}
