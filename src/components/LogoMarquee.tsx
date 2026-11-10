import { projects } from '../data/projects';

const rowA = projects.slice(0, 6).map((p) => p.name);
const rowB = projects.slice(6).map((p) => p.name);

function Row({ names, reverse }: { names: string[]; reverse?: boolean }) {
  const items = [...names, ...names, ...names];

  return (
    <div className="flex overflow-hidden">
      <div className={`marquee flex w-max shrink-0 items-center ${reverse ? 'marquee-reverse' : ''}`}>
        {items.map((name, i) => (
          <span key={`${name}-${i}`} className="flex items-center whitespace-nowrap">
            <span className="px-7 font-display text-[1.05rem] font-medium tracking-[-0.02em] text-ink/80 md:text-[1.35rem]">
              {name}
            </span>
            <span aria-hidden="true" className="size-[3px] shrink-0 rounded-full bg-accent/70" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function LogoMarquee() {
  return (
    <section
      aria-label="Selected clients"
      className="relative overflow-hidden border-y border-line bg-canvas py-9 md:py-12"
    >
      <p className="shell micro mb-7">Selected clients</p>
      <div className="space-y-4">
        <Row names={rowA} />
        <Row names={rowB} reverse />
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-canvas to-transparent md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-canvas to-transparent md:w-40" />
    </section>
  );
}
