import { industries } from '../data/site';

export function Marquee() {
  const items = [...industries, ...industries];

  return (
    <section
      aria-label="Industries we build for"
      className="relative overflow-hidden border-t border-line bg-canvas py-6"
    >
      <div className="marquee flex w-max items-center gap-8 whitespace-nowrap will-change-transform">
        {items.map((industry, i) => (
          <span key={`${industry}-${i}`} className="flex items-center gap-8">
            <span className="font-display text-[0.9rem] font-medium tracking-[-0.01em] text-mute uppercase">
              {industry}
            </span>
            <span aria-hidden="true" className="size-1 shrink-0 bg-accent" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-canvas to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-canvas to-transparent" />
    </section>
  );
}
