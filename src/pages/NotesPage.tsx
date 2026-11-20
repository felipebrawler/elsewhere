import { PageIntro } from "@/components/ui/PageIntro";
import { Reveal } from "@/components/ui/Reveal";
import { notes } from "@/data/notes";
import { usePageMeta } from "@/lib/usePageMeta";

const fmt = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export function NotesPage() {
  usePageMeta("Field Notes", "Notes from the department: progress reports from Elsewhere Dept.");
  return (
    <>
      <PageIntro label="Field notes · Updates" title={["Notes from", "the department."]}>
        <p>Dispatches, progress reports and the occasional sketch from works in progress. Filed whenever there's something worth saying.</p>
      </PageIntro>

      <section aria-label="All notes" className="container-dept pb-24 md:pb-36">
        <ol className="border-t border-ink">
          {notes.map((note) => (
            <Reveal as="li" key={note.id} className="grid gap-4 border-b rule py-10 md:grid-cols-12 md:gap-8">
              <div className="meta flex gap-4 text-ink-soft md:col-span-3 md:flex-col md:gap-2">
                <span>{note.id}</span>
                <time dateTime={note.date}>{fmt(note.date)}</time>
              </div>
              <article className="md:col-span-7">
                <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.02] tracking-[-0.035em]">
                  {note.title}
                </h2>
                <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-ink-soft">{note.summary}</p>
                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tags">
                  {note.tags.map((t) => (
                    <li key={t} className="rounded-full border border-ink/25 px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.1em]">
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ol>

        <div className="mt-16 grid gap-6 border border-dashed border-ink/30 p-8 md:grid-cols-12 md:p-12">
          <p className="meta text-ink-soft md:col-span-3">Coming up</p>
          <p className="font-display text-2xl font-medium leading-snug tracking-[-0.02em] md:col-span-8">
            More notes are currently being written. Expect prototype diaries from Tiny Living first.
          </p>
        </div>
      </section>
    </>
  );
}
