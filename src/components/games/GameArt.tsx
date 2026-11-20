import type { Game } from "@/data/types";
import { cn } from "@/lib/cn";

type Props = {
  game: Game;
  variant?: "cover" | "thumb";
  className?: string;
  /** Hero images load eagerly; everything else lazily. */
  priority?: boolean;
  /** Pass true when the art sits next to a visible title and adds nothing new. */
  decorative?: boolean;
};

export function GameArt({ game, variant = "thumb", className, priority = false, decorative = false }: Props) {
  const src = variant === "cover" ? game.coverImage : game.thumbnailImage;
  return (
    <div
      className={cn("relative overflow-hidden", variant === "cover" ? "aspect-[16/10]" : "aspect-[4/3]", className)}
      style={{ backgroundColor: game.accentColor }}
    >
      <img
        src={src}
        alt={decorative ? "" : game.imageAlt}
        width={variant === "cover" ? 1600 : 1333}
        height={1000}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="size-full object-cover transition-transform duration-700 ease-[var(--ease-department)] group-hover:scale-[1.03]"
      />
    </div>
  );
}
