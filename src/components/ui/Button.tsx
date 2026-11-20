import { Link, type LinkProps } from "react-router-dom";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "butter" | "ghost";

const base =
  "group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 text-[0.9375rem] font-medium leading-none transition-[background-color,color,border-color,transform] duration-300 ease-[var(--ease-department)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-ink/90",
  secondary: "border border-ink/80 text-ink hover:bg-ink hover:text-paper",
  butter: "bg-butter text-ink hover:bg-paper",
  ghost: "text-current underline-offset-4 hover:underline px-0 min-h-11",
};

export function buttonClasses(variant: Variant = "primary", className?: string) {
  return cn(base, variants[variant], className);
}

/** Small arrow that nudges on hover. Inherits colour. */
export function ArrowGlyph({ direction = "right" }: { direction?: "right" | "left" | "up-right" }) {
  const d =
    direction === "left" ? "M19 12H5m6-6-6 6 6 6" : direction === "up-right" ? "M7 17 17 7M8 7h9v9" : "M5 12h14m-6-6 6 6-6 6";
  const move =
    direction === "left"
      ? "group-hover:-translate-x-1"
      : direction === "up-right"
        ? "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        : "group-hover:translate-x-1";
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("size-4 shrink-0 transition-transform duration-300", move)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  );
}

type ButtonLinkProps = LinkProps & { variant?: Variant; children: ReactNode; arrow?: boolean };

export function ButtonLink({ variant = "primary", className, children, arrow = true, ...rest }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses(variant, className)} {...rest}>
      <span>{children}</span>
      {arrow ? <ArrowGlyph /> : null}
    </Link>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant };

export function Button({ variant = "primary", className, type = "button", ...rest }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, className)} {...rest} />;
}
