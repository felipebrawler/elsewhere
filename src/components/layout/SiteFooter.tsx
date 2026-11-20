import { Link } from "react-router-dom";
import { PortalMark } from "@/brand/PortalMark";
import { Wordmark } from "@/brand/Wordmark";
import { NAV_ITEMS } from "./SiteHeader";

export function SiteFooter() {
  return (
    <footer className="on-ink mt-auto bg-ink text-paper">
      <div className="container-dept grid gap-12 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-7">
          <p className="meta mb-6 text-paper/70">Somewhere else starts here.</p>
          <Link to="/" aria-label="Elsewhere Dept. — home" className="inline-block">
            <Wordmark className="text-[clamp(4rem,14vw,11rem)] text-paper" />
          </Link>
        </div>
        <nav aria-label="Footer" className="md:col-span-3 md:col-start-9 md:self-end">
          <ul className="grid gap-3">
            <li>
              <Link to="/" className="link-draw text-lg">Home</Link>
            </li>
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="link-draw text-lg">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-1 md:self-end md:justify-self-end">
          <PortalMark className="size-14 text-butter" spin />
        </div>
      </div>
      <div className="border-t border-paper/15">
        <div className="container-dept flex flex-col gap-2 py-6 text-paper/70 sm:flex-row sm:justify-between">
          <p className="meta">Elsewhere Dept. · Independent digital game label</p>
          <p className="meta">© {new Date().getFullYear()} · All worlds provisional</p>
        </div>
      </div>
    </footer>
  );
}
