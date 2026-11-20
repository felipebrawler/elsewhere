import { PORTAL_ARM, PORTAL_ARM_ANGLES, PORTAL_DISC_PATH, PORTAL_VIEWBOX } from "./geometry";

type PortalMarkProps = {
  className?: string;
  /** Accessible label. Omit for decorative use (the mark is then aria-hidden). */
  title?: string;
  /** Rotate the arms slowly. Disabled under prefers-reduced-motion. */
  spin?: boolean;
  /** Gentle scale pulse on the central disc. Disabled under prefers-reduced-motion. */
  breathe?: boolean;
};

/** Monochrome by design: it inherits `currentColor`, so any text colour is a valid colourway. */
export function PortalMark({ className, title, spin = false, breathe = false }: PortalMarkProps) {
  return (
    <svg
      viewBox={PORTAL_VIEWBOX}
      className={className}
      fill="currentColor"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <g
        className={spin ? "motion-safe:animate-portal-spin" : undefined}
        style={{ transformBox: "view-box", transformOrigin: "center" }}
      >
        {PORTAL_ARM_ANGLES.map((angle) => (
          <rect key={angle} {...PORTAL_ARM} transform={`rotate(${angle} 32 32)`} />
        ))}
      </g>
      <path
        d={PORTAL_DISC_PATH}
        fillRule="evenodd"
        className={breathe ? "motion-safe:animate-portal-breathe" : undefined}
        style={{ transformBox: "view-box", transformOrigin: "center" }}
      />
    </svg>
  );
}
