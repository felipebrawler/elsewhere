import { STATUS_LABEL } from "@/data/status";
import type { GameStatus } from "@/data/types";
import { cn } from "@/lib/cn";

const tone: Record<GameStatus, string> = {
  released: "bg-sage border-sage",
  prototype: "bg-butter border-ink/20",
  "in-development": "bg-butter border-ink/20",
  "coming-soon": "bg-paper/80 border-ink/30 border-dashed",
};

const dot: Record<GameStatus, string> = {
  released: "bg-sage-deep",
  prototype: "bg-coral",
  "in-development": "bg-coral",
  "coming-soon": "border border-ink bg-transparent",
};

export function StatusBadge({ status, className }: { status: GameStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[0.6875rem] uppercase leading-none tracking-[0.1em] text-ink",
        tone[status],
        className,
      )}
    >
      <span aria-hidden="true" className={cn("size-1.5 rounded-full", dot[status])} />
      <span>
        <span className="sr-only">Status: </span>
        {STATUS_LABEL[status]}
      </span>
    </span>
  );
}
