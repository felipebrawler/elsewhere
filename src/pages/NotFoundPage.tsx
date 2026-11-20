import { PortalMark } from "@/brand/PortalMark";
import { ButtonLink } from "@/components/ui/Button";
import { usePageMeta } from "@/lib/usePageMeta";

export function NotFoundPage() {
  usePageMeta("Undiscovered");
  return (
    <section aria-labelledby="nf-title" className="container-dept relative overflow-hidden py-20 md:py-32">
      <p className="meta text-ink-soft">Error 404 · Location unknown</p>
      <div className="relative mt-8">
        <h1
          id="nf-title"
          className="relative z-10 max-w-[12ch] text-[clamp(3rem,10vw,9rem)] font-medium leading-[0.88] tracking-[-0.055em]"
        >
          This place hasn't been discovered.
        </h1>
        <PortalMark
          spin
          className="pointer-events-none absolute -right-10 top-0 size-[40vw] max-w-[420px] text-butter"
        />
      </div>
      <p className="mt-10 max-w-[46ch] text-lg leading-relaxed text-ink-soft">
        Either it doesn't exist yet, or it slipped out of the filing cabinet. Let's get you somewhere real.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <ButtonLink to="/play">Find somewhere new</ButtonLink>
        <ButtonLink to="/" variant="secondary" arrow={false}>
          Return home
        </ButtonLink>
      </div>
    </section>
  );
}
