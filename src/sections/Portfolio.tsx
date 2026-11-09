import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { categories, projects, type CategoryId } from '../data/projects';
import { asset, cn } from '../lib/utils';
import { Reveal } from '../components/Reveal';

// Every row is flush: 3 columns on desktop, 2 on tablet, 1 on mobile.
// When a lone card would be left over, it fills the row as a wide feature card.
const trailingSpan = (count: number) =>
  count % 2 === 0 ? 'xl:col-span-3' : 'sm:col-span-2 xl:col-span-3';

export function Portfolio() {
  const [filter, setFilter] = useState<CategoryId>('all');
  const reduce = useReducedMotion();

  const filtered = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.categories.includes(filter))),
    [filter],
  );

  const counts = useMemo(
    () =>
      Object.fromEntries(
        categories.map((c) => {
          const id = c.id;
          return [
            id,
            id === 'all' ? projects.length : projects.filter((p) => p.categories.includes(id)).length,
          ];
        }),
      ) as Record<CategoryId, number>,
    [],
  );

  return (
    <section id="work" className="relative bg-ink-2 py-20 md:py-28 lg:py-32">
      <div className="shell">
        <Reveal>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="eyebrow mb-5">Selected work</p>
              <h2 className="text-[clamp(2rem,4.6vw,3.6rem)] leading-[0.98]">
                <span className="text-lime">{projects.length} Live Website Projects.</span>
                <br />
                Multiple Industries.
                <br />
                <span className="font-serif italic">One creative approach.</span>
              </h2>
            </div>
            <div className="max-w-xs">
              <p className="text-[0.9rem] leading-relaxed text-mute">
                Restaurants, juice bars, farms, hotels and retail stores — every project shipped with
                the same standard of design and engineering.
              </p>
              <a
                href="#contact"
                className="mt-4 inline-flex items-center gap-1.5 text-[0.82rem] font-semibold text-paper link-underline"
              >
                Want something like this?
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-2 md:mt-12" role="group" aria-label="Filter projects by category">
          {categories.map((c) => {
            const active = filter === c.id;
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(c.id)}
                className={cn(
                  'relative rounded-full border px-3.5 py-2 text-[0.75rem] font-medium transition-colors duration-300',
                  active
                    ? 'border-transparent text-ink'
                    : 'border-line text-mute hover:border-line-strong hover:text-paper',
                )}
              >
                {active && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-lime"
                    transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative z-10">
                  {c.label}
                  <span className={cn('ml-1.5 text-[0.62rem]', active ? 'text-ink/50' : 'text-mute/50')}>
                    {counts[c.id]}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <motion.div layout className="mt-8 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((p, i) => {
              const spanning = filtered.length % 3 === 1 && i === filtered.length - 1;
              return (
              <motion.article
                key={p.id}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className={cn('group relative', spanning && trailingSpan(filtered.length))}
              >
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'block h-full overflow-hidden rounded-lg border border-line bg-ink transition-colors duration-500 hover:border-line-strong',
                    spanning && 'xl:grid xl:grid-cols-2 xl:items-stretch',
                  )}
                  aria-label={`${p.name} — view live website (opens in a new tab)`}
                >
                  <div
                    className={cn(
                      'relative overflow-hidden border-b border-line bg-ink-3',
                      spanning && 'xl:border-b-0 xl:border-r',
                    )}
                  >
                    <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
                      <span className="size-1.5 rounded-full bg-white/15" />
                      <span className="size-1.5 rounded-full bg-white/15" />
                      <span className="size-1.5 rounded-full bg-white/15" />
                      <span className="ml-2 truncate rounded-sm border border-line bg-black/30 px-2 py-0.5 text-[0.58rem] text-mute">
                        {new URL(p.url).host}
                      </span>
                      <ExternalLink className="ml-auto size-3 text-mute/50" />
                    </div>
                    <div
                      className={cn(
                        'overflow-hidden',
                        spanning ? 'aspect-[16/10] xl:aspect-[16/9]' : 'aspect-[16/11]',
                      )}
                    >
                      <img
                        src={asset(p.image)}
                        alt={`Homepage of the ${p.name} website — ${p.category}`}
                        width={1440}
                        height={900}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover object-top transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-90" />
                      <span className="pointer-events-none absolute bottom-4 right-4 flex translate-y-2 items-center gap-2 rounded-full bg-lime px-3.5 py-2 text-[0.7rem] font-semibold text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        Visit live site
                        <ArrowUpRight className="size-3.5" />
                      </span>
                    </div>
                  </div>

                  <div
                    className={cn(
                      'flex items-start justify-between gap-4 p-4 md:p-5',
                      spanning && 'xl:h-full xl:items-center xl:p-8',
                    )}
                  >
                    <div>
                      <div className="flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.12em] text-mute">
                        <span className="font-mono text-mute/50">{p.index}</span>
                        <span aria-hidden="true" className="size-0.5 rounded-full bg-mute/60" />
                        <span>{p.category}</span>
                      </div>
                      <h3 className="mt-1.5 text-[1.05rem] font-medium tracking-tight text-paper md:text-[1.15rem]">
                        {p.name}
                      </h3>
                      <p className="mt-1.5 max-w-md text-[0.8rem] leading-relaxed text-mute">
                        {p.description}
                      </p>
                    </div>
                    <span className="mt-1 grid size-8 shrink-0 place-items-center rounded-full border border-line text-mute transition-all duration-500 group-hover:border-lime group-hover:bg-lime group-hover:text-ink">
                      <ArrowUpRight className="size-3.5" />
                    </span>
                  </div>
                </a>
              </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <p className="mt-6 text-[0.7rem] text-mute/60">
          A mix of live client websites and studio concept builds. Concept projects are marked by
          their category and are not presented as paid client engagements.
        </p>

        <Reveal className="mt-14">
          <div className="flex flex-col items-start justify-between gap-6 rounded-xl border border-line bg-ink p-6 md:flex-row md:items-center md:p-8">
            <div>
              <h3 className="text-[1.25rem] font-medium tracking-tight md:text-[1.5rem]">
                Want a website like these? Let&apos;s build yours.
              </h3>
              <p className="mt-1.5 text-[0.85rem] text-mute">
                Tell us your industry and we&apos;ll recommend the right package.
              </p>
            </div>
            <a href="#contact" className="btn btn-primary shrink-0">
              Start Your Project
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
