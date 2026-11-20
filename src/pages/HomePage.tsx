import { Link } from "react-router-dom";
import { PortalMark } from "@/brand/PortalMark";
import { ButtonLink, ArrowGlyph } from "@/components/ui/Button";
import { LineReveal } from "@/components/ui/LineReveal";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { GameArt } from "@/components/games/GameArt";
import { GameGrid } from "@/components/games/GameGrid";
import { GameActions } from "@/components/games/GameActions";
import { games, getFeaturedGame } from "@/data/games";
import { notes } from "@/data/notes";
import { DEVICE_LABEL, releaseText } from "@/data/status";
import { usePageMeta } from "@/lib/usePageMeta";

const PREVIEW_COUNT = 3;

export function HomePage() {
  usePageMeta();
  const featured = getFeaturedGame();
  const preview = games.filter((g) => g.id !== featured.id).slice(0, PREVIEW_COUNT);
  const latestNote = notes[0];

  return (
    <>
      {/* 1 — Hero ---------------------------------------------------------- */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden">
        <div className="container-dept pb-16 pt-10 md:pb-24 md:pt-16">
          <div className="meta flex flex-wrap items-center gap-x-6 gap-y-2 border-b rule pb-4 text-ink-soft">
            <span>Elsewhere Dept.</span>
            <span aria-hidden="true">/</span>
            <span>Independent digital game label</span>
            <span className="ml-auto hidden sm:inline">{games.length} worlds on file</span>
          </div>

          <div className="relative mt-10 md:mt-16">
            <h1
              id="hero-title"
              className="relative z-10 text-[clamp(3.5rem,13.5vw,12.5rem)] font-medium leading-[0.86] tracking-[-0.055em]"
            >
              <LineReveal
                lines={[
                  "Small games.",
                  <>
                    <span className="relative inline-block">
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-[-0.04em] bottom-[0.08em] top-[0.38em] -z-10 -rotate-1 bg-butter"
                      />
                      Other
                    </span>{" "}
                    worlds.
                  </>,
                ]}
              />
            </h1>
            <PortalMark
              spin
              breathe
              className="pointer-events-none absolute -right-10 -top-12 size-[34vw] max-h-[460px] max-w-[460px] text-sage opacity-90 md:-right-16 md:top-[-5rem]"
            />
          </div>

          <div className="mt-12 grid gap-10 md:mt-20 md:grid-cols-12">
            <Reveal delay={0.3} className="md:col-span-5">
              <p className="text-[1.1875rem] leading-relaxed md:text-xl">
                Elsewhere Dept. is an independent label making small, finishable browser games — each one a
                pocket-sized place you can visit in an afternoon. Officially, we're{" "}
                <em className="font-display not-italic">the Department of Imaginary Places</em>.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <ButtonLink to="/play">Find somewhere new</ButtonLink>
                <Link to="/about" className="link-draw text-[0.9375rem] font-medium">
                  Meet the department
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.45} className="md:col-span-5 md:col-start-8 md:self-end">
              <Link
                to={`/play/${featured.slug}`}
                className="group grid grid-cols-[96px_1fr] items-center gap-5 border-t border-ink pt-5"
              >
                <GameArt game={featured} decorative className="rounded-[4px]" />
                <span>
                  <span className="meta block text-ink-soft">On the desk · {featured.id}</span>
                  <span className="mt-2 flex items-center gap-2 font-display text-2xl font-medium tracking-[-0.02em]">
                    {featured.title} <ArrowGlyph direction="up-right" />
                  </span>
                  <span className="mt-1 block text-sm text-ink-soft">Prototype in progress</span>
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <Marquee items={["Somewhere else starts here", "Small games", "Other worlds", "Currently being imagined"]} />

      {/* 2 — Featured --------------------------------------------------- */}
      <section aria-labelledby="featured-title" className="container-dept py-20 md:py-32">
        <SectionHeading index="01" kicker="Featured file" id="featured-title" title="First on the desk." />
        <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <Link to={`/play/${featured.slug}`} className="group block" tabIndex={-1} aria-hidden="true">
              <GameArt game={featured} variant="cover" decorative className="rounded-[4px]" />
            </Link>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col lg:col-span-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="meta text-ink-soft">{featured.id}</span>
              <span className="meta text-ink-soft">·</span>
              <span className="meta text-ink-soft">{featured.genre}</span>
              <StatusBadge status={featured.status} />
            </div>
            <h3 className="mt-6 text-[clamp(3rem,6vw,5.5rem)] font-medium leading-[0.9] tracking-[-0.045em]">
              {featured.title}
            </h3>
            <p className="mt-4 font-display text-2xl leading-snug tracking-[-0.01em]">{featured.tagline}</p>
            <p className="mt-6 leading-relaxed text-ink-soft">{featured.description}</p>
            <dl className="my-8 grid grid-cols-2 gap-6 border-y rule py-6">
              <div>
                <dt className="meta text-ink-soft">Release</dt>
                <dd className="mt-2 text-[0.9375rem]">{releaseText(featured)}</dd>
              </div>
              <div>
                <dt className="meta text-ink-soft">Planned for</dt>
                <dd className="mt-2 text-[0.9375rem]">
                  {featured.supportedDevices.map((d) => DEVICE_LABEL[d]).join(", ")}
                </dd>
              </div>
            </dl>
            <GameActions game={featured} showDetailLink />
          </Reveal>
        </div>
      </section>

      {/* 3 — Collection preview ----------------------------------------- */}
      <section aria-labelledby="catalogue-title" className="border-t rule bg-paper-deep/60 py-20 md:py-32">
        <div className="container-dept">
          <SectionHeading index="02" kicker="The catalogue" id="catalogue-title" title={<>Places we're<br />still drawing.</>}>
            <p className="leading-relaxed">
              Every title on file, from working prototype to rough sketch. Names, art and dates are provisional —
              that's half the fun.
            </p>
          </SectionHeading>
          <div className="mt-16">
            <GameGrid games={preview} />
          </div>
          <div className="mt-16 flex justify-center md:mt-24 md:justify-end">
            <ButtonLink to="/play" variant="secondary">
              See all {games.length} worlds
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* 4 — The Department ---------------------------------------------- */}
      <section aria-labelledby="dept-title" className="on-ink bg-ink text-paper">
        <div className="container-dept grid gap-12 py-20 md:grid-cols-12 md:py-32">
          <div className="md:col-span-4">
            <p className="meta flex items-center gap-3 text-paper/70">
              <span>§ 03</span>
              <span aria-hidden="true" className="h-px w-8 bg-current" />
              <span>The department</span>
            </p>
            <PortalMark className="mt-10 hidden size-32 text-butter md:block" breathe />
          </div>
          <div className="md:col-span-8">
            <Reveal>
              <h2 id="dept-title" className="text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.035em]">
                A small department with a single remit: find places that don't exist yet, and make them{" "}
                <span className="text-butter">small enough to visit.</span>
              </h2>
            </Reveal>
            <ol className="mt-14 grid gap-10 sm:grid-cols-3">
              {[
                ["Small by design", "Games you can finish in an evening, or dip into for five minutes."],
                ["Worlds first", "Every project starts as a place before it becomes a mechanic."],
                ["Open a tab", "Built for the browser. No installs, no accounts, no fuss."],
              ].map(([title, body], i) => (
                <Reveal as="li" key={title} delay={i * 0.08} className="border-t border-paper/20 pt-5">
                  <span className="meta text-butter">0{i + 1}</span>
                  <h3 className="mt-3 text-xl font-medium tracking-[-0.02em]">{title}</h3>
                  <p className="mt-2 leading-relaxed text-paper/75">{body}</p>
                </Reveal>
              ))}
            </ol>
            <div className="mt-14">
              <ButtonLink to="/about" variant="butter">
                About the department
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* 5 — Latest note ------------------------------------------------- */}
      {latestNote ? (
        <section aria-labelledby="note-title" className="container-dept py-20 md:py-28">
          <div className="grid gap-6 border-t border-ink pt-6 md:grid-cols-12">
            <p className="meta text-ink-soft md:col-span-3">Notes from the department</p>
            <div className="md:col-span-6">
              <p className="meta text-ink-soft">
                {latestNote.id} · <time dateTime={latestNote.date}>{latestNote.date}</time>
              </p>
              <h2 id="note-title" className="mt-3 text-3xl font-medium tracking-[-0.03em]">
                {latestNote.title}
              </h2>
              <p className="mt-3 leading-relaxed text-ink-soft">{latestNote.summary}</p>
            </div>
            <div className="md:col-span-3 md:justify-self-end">
              <Link to="/notes" className="group inline-flex items-center gap-2 font-medium">
                <span className="link-draw">All field notes</span> <ArrowGlyph />
              </Link>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
