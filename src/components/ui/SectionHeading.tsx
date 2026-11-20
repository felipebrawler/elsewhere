import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  index?: string;
  kicker: string;
  title: ReactNode;
  id?: string;
  className?: string;
  as?: "h1" | "h2";
  children?: ReactNode;
};

/** Numbered editorial section header: "§ 02 — The catalogue". */
export function SectionHeading({ index, kicker, title, id, className, as = "h2", children }: Props) {
  const H = as;
  return (
    <div className={cn("grid gap-6 md:grid-cols-12 md:items-end", className)}>
      <div className="md:col-span-7">
        <p className="meta mb-4 flex items-center gap-3 text-ink-soft">
          {index ? <span>§ {index}</span> : null}
          <span aria-hidden="true" className="h-px w-8 bg-current" />
          <span>{kicker}</span>
        </p>
        <H
          id={id}
          className="text-[clamp(2.25rem,5.5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.035em]"
        >
          {title}
        </H>
      </div>
      {children ? <div className="text-ink-soft md:col-span-5 md:pb-2">{children}</div> : null}
    </div>
  );
}
