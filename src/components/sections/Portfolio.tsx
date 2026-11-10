import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CATEGORIES, PROJECTS, type Category } from '../../data';
import { Arrow, Reveal, SectionHeading, TiltCard } from '../ui';

function BrowserFrame({ src, alt, tall }: { src: string; alt: string; tall?: boolean }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0c121b] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)]">
      <div className="flex items-center gap-1.5 border-b border-white/[0.07] bg-white/[0.02] px-3 py-2.5">
        <span className="h-2 w-2 rounded-full bg-[#3a4553]" />
        <span className="h-2 w-2 rounded-full bg-[#3a4553]" />
        <span className="h-2 w-2 rounded-full bg-[#3a4553]" />
        <span className="ml-2 h-4 flex-1 rounded-full bg-white/[0.05]" />
      </div>
      <div className={`overflow-hidden ${tall ? 'aspect-[16/11]' : 'aspect-[16/10]'}`}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.045]"
        />
      </div>
    </div>
  );
}

export function Portfolio() {
  const [filter, setFilter] = useState<'All' | Category>('All');
  const reduce = useReducedMotion();

  const visible = useMemo(
    () => (filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <section id="work" className="section-pad relative z-10 border-t border-white/[0.06] bg-ink">
      <div className="shell">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Selected Work"
            title={
              <>
                Our work speaks
                <br className="hidden sm:block" /> through <span className="text-lime">design.</span>
              </>
            }
            lead="Explore digital experiences we've developed for different businesses and industries."
          />
          <Reveal delay={0.1}>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-sky" />
              Studio concepts — self-initiated design explorations
            </div>
          </Reveal>
        </div>

        {/* filters */}
        <div className="mt-10 flex flex-wrap gap-2 border-b border-white/[0.08] pb-5">
          {CATEGORIES.map((c) => {
            const active = filter === c;
            return (
              <button
                key={c}
                onClick={() => setFilter(c)}
                aria-pressed={active}
                className={`rounded-full border px-4 py-2.5 font-display text-[11px] uppercase tracking-[0.12em] transition-all duration-300 ${
                  active
                    ? 'border-lime bg-lime text-ink'
                    : 'border-white/12 text-paper/65 hover:border-white/30 hover:text-paper'
                }`}
              >
                {c}
              </button>
            );
          })}
          <span className="ml-auto hidden items-center font-display text-[11px] tracking-[0.14em] text-muted sm:flex">
            {String(visible.length).padStart(2, '0')} projects
          </span>
        </div>

        <motion.div layout className="mt-9 grid grid-cols-1 gap-x-5 gap-y-10 md:grid-cols-12">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => {
              const pos = visible.indexOf(p);
              const row = Math.floor(pos / 2);
              const wide = row % 2 === 0 ? pos % 2 === 0 : pos % 2 === 1;
              return (
                <motion.article
                  key={p.id}
                  layout
                  initial={reduce ? false : { opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className={wide ? 'md:col-span-7' : 'md:col-span-5'}
                >
                  <TiltCard
                    className="rounded-xl"
                    intensity={4}
                    glow="rgba(114,201,255,0.12)"
                  >
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                      aria-label={`${p.name} — open live website`}
                    >
                      <BrowserFrame src={p.shot} alt={`${p.name} website preview`} tall={wide} />

                      <div className="mt-4 flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2.5">
                            <span className="font-display text-[11px] tracking-[0.18em] text-muted">{p.index}</span>
                            <h3 className="font-display text-lg font-medium tracking-tight text-paper md:text-xl">
                              {p.name}
                            </h3>
                          </div>
                          <p className="mt-1.5 max-w-md text-[13px] leading-relaxed text-muted">{p.blurb}</p>
                        </div>
                        <span
                          className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 text-paper transition-all duration-300 group-hover:border-lime group-hover:bg-lime group-hover:text-ink"
                          aria-hidden
                        >
                          <Arrow />
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] uppercase tracking-[0.14em]">
                        <span className="rounded-full border border-white/10 px-2.5 py-1 text-paper/60">
                          {p.category}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-muted">
                          <span className="h-1 w-1 rounded-full" style={{ background: p.accent }} />
                          {p.kind}
                        </span>
                        <span className="ml-auto hidden text-paper/70 transition-colors group-hover:text-lime sm:inline">
                          View live website
                        </span>
                      </div>
                    </a>
                  </TiltCard>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <p className="mt-12 text-center text-[11px] uppercase tracking-[0.16em] text-muted">
          These are studio concepts. Commissioned client work is available on request.
        </p>
      </div>
    </section>
  );
}
