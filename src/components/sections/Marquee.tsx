import { CAPABILITIES } from '../../data';

function Row({ items, direction }: { items: string[]; direction: 'left' | 'right' }) {
  const doubled = [...items, ...items, ...items, ...items];
  return (
    <div className="mask-fade-x overflow-hidden py-3">
      <div
        className={`marquee-track flex w-max items-center gap-10 ${
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
        }`}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="whitespace-nowrap font-display text-[clamp(1.1rem,2.6vw,2rem)] font-medium uppercase tracking-[-0.01em] text-paper/85">
              {item}
            </span>
            <span className="text-lime/70" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Marquee() {
  const first = CAPABILITIES.slice(0, 4);
  const second = CAPABILITIES.slice(4);
  return (
    <section aria-label="Capabilities" className="relative z-10 overflow-hidden border-y border-white/[0.06] bg-ink2/60 py-8 backdrop-blur-sm">
      <Row items={first} direction="left" />
      <div className="shell">
        <div className="h-px w-full bg-white/[0.06]" />
      </div>
      <Row items={second} direction="right" />
    </section>
  );
}
