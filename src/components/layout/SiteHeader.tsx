import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Wordmark } from "@/brand/Wordmark";
import { PortalMark } from "@/brand/PortalMark";
import { cn } from "@/lib/cn";

export const NAV_ITEMS = [
  { to: "/play", label: "Play", hint: "The collection" },
  { to: "/about", label: "About", hint: "The department" },
  { to: "/notes", label: "Notes", hint: "Field notes" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the mobile menu on navigation and on Escape.
  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b rule bg-paper/90 backdrop-blur-sm">
      <div className="container-dept flex h-16 items-center justify-between gap-6 md:h-20">
        <Link to="/" className="group flex items-center gap-2.5" aria-label="Elsewhere Dept. — home">
          <PortalMark className="size-7 transition-transform duration-700 ease-[var(--ease-department)] group-hover:rotate-45" />
          <Wordmark className="text-[1.625rem]" />
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-10">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className="link-draw py-2 text-[0.9375rem] font-medium">
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <p className="meta hidden text-ink-soft lg:block" aria-hidden="true">
          The Department of Imaginary Places
        </p>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-full md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
        </button>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Primary"
        hidden={!open}
        className={cn("on-ink border-t border-ink bg-ink text-paper md:hidden")}
      >
        <ul className="container-dept py-4">
          {NAV_ITEMS.map((item, i) => (
            <li key={item.to} className="border-b border-paper/15 last:border-0">
              <NavLink
                to={item.to}
                className="flex items-baseline justify-between py-5 aria-[current=page]:text-butter"
              >
                <span className="font-display text-4xl font-medium tracking-[-0.03em]">{item.label}</span>
                <span className="meta text-paper/70">
                  0{i + 1} · {item.hint}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
