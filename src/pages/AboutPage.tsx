import { PortalMark } from "@/brand/PortalMark";
import { Wordmark } from "@/brand/Wordmark";
import { ButtonLink } from "@/components/ui/Button";
import { PageIntro } from "@/components/ui/PageIntro";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { usePageMeta } from "@/lib/usePageMeta";

const remit = [
  {
    title: "Small games",
    body: "We make games with edges. Short enough to finish, deep enough to come back to. A good small game respects your evening.",
  },
  {
    title: "Other worlds",
    body: "Each title starts as a place — a room, a café, an island — and only then becomes a set of rules. The world comes first.",
  },
  {
    title: "Right here",
    body: "Everything we make runs in a browser tab. No launcher, no account, no download. Somewhere else starts here.",
  },
];

const swatches = [
  { name: "Ink", hex: "#182943", cls: "bg-ink text-paper" },
  { name: "Butter", hex: "#F7E7A0", cls: "bg-butter text-ink" },
  { name: "Paper", hex: "#F4F1E9", cls: "bg-paper text-ink border border-ink/20" },
  { name: "Sage", hex: "#A8BFAE", cls: "bg-sage text-ink" },
  { name: "Coral", hex: "#EE775E", cls: "bg-coral text-ink" },
];

export function AboutPage() {
  usePageMeta("The Department", "Elsewhere Dept. — the Department of Imaginary Places. An independent digital game label.");
  return (
    <>
      <PageIntro label="About · The Department of Imaginary Places" title={["The", "Department."]}>
        <p>
          Elsewhere Dept. is an independent digital game label. We file it, unofficially, under{" "}
          <span className="text-ink">the Department of Imaginary Places</span>.
        </p>
      </PageIntro>

      <section aria-labelledby="remit-title" className="container-dept pb-20 md:pb-32">
        <div className="grid gap-12 border-t border-ink pt-10 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <h2 id="remit-title" className="text-[clamp(1.75rem,3.6vw,3rem)] font-medium leading-[1.08] tracking-[-0.03em]">
              Our remit is simple: go looking for places that don't exist yet, take careful notes, and build the
              smallest possible door into each one.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 text-lg leading-relaxed text-ink-soft md:col-span-4 md:col-start-9">
            <p>
              We're a small, independent outfit. No publisher above us and no sequels to keep up with — just a list of
              worlds we'd like to visit and the patience to make them properly.
            </p>
            <p>
              Our first project, <em className="not-italic text-ink">Tiny Living</em>, is in prototype. The rest of
              the catalogue is still being imagined, and we'll say so plainly until that changes.
            </p>
          </Reveal>
        </div>

        <ol className="mt-20 grid gap-12 md:grid-cols-3 md:gap-8">
          {remit.map((r, i) => (
            <Reveal as="li" key={r.title} delay={i * 0.08} className="border-t rule pt-6">
              <span className="meta text-ink-soft">Article 0{i + 1}</span>
              <h3 className="mt-4 text-3xl font-medium tracking-[-0.03em]">{r.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{r.body}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section aria-labelledby="insignia-title" className="border-t rule bg-paper-deep/60 py-20 md:py-32">
        <div className="container-dept">
          <SectionHeading kicker="Department insignia" id="insignia-title" title="How we sign our work.">
            <p className="leading-relaxed">
              A lowercase wordmark and an eight-armed portal: half asterisk, half doorway. A footnote that leads
              somewhere else.
            </p>
          </SectionHeading>

          <div className="mt-14 grid gap-4 md:grid-cols-12">
            <figure className="flex min-h-64 flex-col justify-between bg-paper p-8 md:col-span-6">
              <Wordmark className="text-[clamp(3.5rem,8vw,6rem)]" />
              <figcaption className="meta mt-8 text-ink-soft">Wordmark · primary</figcaption>
            </figure>
            <figure className="on-ink flex min-h-64 flex-col justify-between bg-ink p-8 text-paper md:col-span-6">
              <Wordmark tone="mono" className="text-[clamp(3.5rem,8vw,6rem)]" />
              <figcaption className="meta mt-8 text-paper/70">Wordmark · monochrome reversed</figcaption>
            </figure>
            {[
              ["bg-butter text-ink", "Portal · ink on butter"],
              ["bg-ink text-butter", "Portal · butter on ink"],
              ["bg-paper text-ink", "Portal · monochrome"],
              ["bg-sage text-ink", "Portal · ink on sage"],
            ].map(([cls, label]) => (
              <figure key={label} className={`flex aspect-square flex-col justify-between p-6 md:col-span-3 ${cls}`}>
                <PortalMark className="m-auto size-24 md:size-28" />
                <figcaption className="meta opacity-80">{label}</figcaption>
              </figure>
            ))}
          </div>

          <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-5" aria-label="Brand colours">
            {swatches.map((s) => (
              <li key={s.name} className={`flex h-32 flex-col justify-end p-4 ${s.cls}`}>
                <span className="font-display text-lg font-medium">{s.name}</span>
                <span className="meta mt-1 opacity-80">{s.hex}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-dept flex flex-col items-start gap-8 py-20 md:flex-row md:items-end md:justify-between md:py-28">
        <h2 className="max-w-[16ch] text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[0.95] tracking-[-0.04em]">
          Somewhere else starts here.
        </h2>
        <ButtonLink to="/play">Find somewhere new</ButtonLink>
      </section>
    </>
  );
}
