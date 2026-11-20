import type { ReactNode } from "react";
import { LineReveal } from "./LineReveal";
import { Reveal } from "./Reveal";

/** Shared opening for interior pages: archival label, oversized title, standfirst. */
export function PageIntro({ label, title, children }: { label: string; title: string[]; children?: ReactNode }) {
  return (
    <div className="container-dept pb-12 pt-12 md:pb-20 md:pt-20">
      <p className="meta mb-8 flex items-center gap-3 text-ink-soft">
        <span aria-hidden="true" className="h-px w-8 bg-current" />
        {label}
      </p>
      <div className="grid gap-8 md:grid-cols-12 md:items-end">
        <h1 className="text-[clamp(3rem,9vw,8.5rem)] font-medium leading-[0.88] tracking-[-0.05em] md:col-span-8">
          <LineReveal lines={title} />
        </h1>
        {children ? (
          <Reveal delay={0.25} className="text-lg leading-relaxed text-ink-soft md:col-span-4 md:pb-3">
            {children}
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}
