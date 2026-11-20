import { cn } from "@/lib/cn";

type WordmarkProps = {
  className?: string;
  /** "color" adds the coral full stop; "mono" renders entirely in currentColor. */
  tone?: "color" | "mono";
};

/**
 * The primary identity: lowercase `elsewhere.` set in Space Grotesk.
 * Text-based on purpose — it stays sharp, translatable to any medium and accessible.
 */
export function Wordmark({ className, tone = "color" }: WordmarkProps) {
  return (
    <span
      className={cn(
        "font-display font-semibold lowercase leading-none tracking-[-0.045em]",
        className,
      )}
    >
      elsewhere
      <span className={tone === "color" ? "text-coral" : undefined}>.</span>
    </span>
  );
}
