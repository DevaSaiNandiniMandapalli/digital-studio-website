import { useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { categories, projects, type CategoryId } from '../data/projects';
import { asset, cn } from '../lib/utils';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';
import { TiltCard } from '../components/TiltCard';

export function Portfolio() {
  const [filter, setFilter] = useState<CategoryId>('all');

  const filtered = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.categories.includes(filter))),
    [filter],
  );

  return (
    <section id="work" className="border-t border-line bg-surface py-20 md:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Portfolio"
          title="Real websites, built for real businesses."
          copy="A selection of live projects across restaurants, juice bars, retail, hospitality and agriculture. Every one is designed, built and maintained by the studio."
          action={
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter projects by category">
              {categories.map((c) => {
                const active = filter === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setFilter(c.id)}
                    aria-pressed={active}
                    className={cn(
                      'rounded-full border px-3.5 py-1.5 text-[0.75rem] font-medium transition-colors',
                      active
                        ? 'border-accent/60 bg-accent text-[#0b1204] shadow-[0_10px_24px_-12px_rgba(163,230,53,0.6)]'
                        : 'border-line bg-white/[0.03] text-mute hover:border-line-strong hover:text-ink',
                    )}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
          }
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
          {filtered.map((p, i) => {
            const last = i === filtered.length - 1;
            const spanning = last && filtered.length % 2 === 1 && filtered.length > 1;
            return (
              <Reveal
                key={p.id}
                delay={Math.min(i, 4) * 0.05}
                className={cn('group', spanning && 'md:col-span-2 xl:col-span-3')}
              >
                <TiltCard max={5} className="h-full">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${p.name} — view live website (opens in a new tab)`}
                  className={cn(
                    'flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-300 hover:border-accent/40',
                    spanning && 'md:grid md:grid-cols-[1.15fr_0.85fr] md:items-stretch',
                  )}
                >
                  <div className={cn('relative overflow-hidden bg-canvas', spanning && 'md:border-r md:border-line')}>
                    <img
                      src={asset(p.image)}
                      alt={`Homepage of the ${p.name} website — ${p.category}`}
                      width={1440}
                      height={900}
                      loading="lazy"
                      decoding="async"
                      className={cn(
                        'w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]',
                        spanning ? 'aspect-[16/10]' : 'aspect-[16/11]',
                      )}
                    />
                    <span className="absolute top-3 left-3 rounded-full border border-white/15 bg-black/50 px-2.5 py-1 text-[0.65rem] font-medium text-ink backdrop-blur-md">
                      {p.category}
                    </span>
                  </div>

                  <div
                    className={cn(
                      'flex items-start justify-between gap-4 p-5 md:p-6',
                      spanning && 'md:flex-col md:justify-center md:p-9',
                    )}
                  >
                    <div>
                      <p className="font-mono text-[0.65rem] tracking-[0.12em] text-mute-soft">
                        {p.index} / 13
                      </p>
                      <h3 className="h3 mt-2">{p.name}</h3>
                      <p className="mt-2 max-w-md text-[0.83rem] leading-relaxed text-mute">{p.description}</p>
                    </div>
                    <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-mute transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-[#0b1204]">
                      <ArrowUpRight className="size-3.5" />
                    </span>
                  </div>
                </a>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-8 text-[0.72rem] text-mute-soft">
          A mix of live client websites and studio concept builds, each marked by its category.
        </p>
      </div>
    </section>
  );
}
