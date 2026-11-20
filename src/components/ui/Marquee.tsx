import { PortalMark } from "@/brand/PortalMark";

/** Decorative slow ticker. Hidden from assistive tech; frozen under reduced motion. */
export function Marquee({ items }: { items: string[] }) {
  const row = (
    <div className="flex shrink-0 items-center gap-8 pr-8">
      {items.map((t) => (
        <span key={t} className="flex items-center gap-8">
          <span className="font-display text-2xl font-medium tracking-[-0.02em] md:text-3xl">{t}</span>
          <PortalMark className="size-5 text-coral" />
        </span>
      ))}
    </div>
  );
  return (
    <div aria-hidden="true" className="overflow-hidden border-y rule bg-butter py-5">
      <div className="flex w-max motion-safe:animate-[marquee_40s_linear_infinite]">
        {row}
        {row}
      </div>
      <style>{`@keyframes marquee{to{transform:translateX(-50%)}}`}</style>
    </div>
  );
}
