import { SERVICES } from '../../data';
import { Arrow, Reveal, SectionHeading, TiltCard } from '../ui';

export function Services() {
  return (
    <section id="services" className="section-pad relative z-10 border-t border-white/[0.06] bg-ink2">
      <div className="shell">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Services"
            title={
              <>
                What we can <span className="text-lime">build.</span>
              </>
            }
          />
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm leading-relaxed text-muted md:text-right">
              From a sharp one-page site to a full custom platform — every engagement starts with your
              business, not a template.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-6">
          {SERVICES.map((s, i) => (
            <Reveal key={s.index} delay={(i % 3) * 0.06} className={s.span}>
              <TiltCard
                className="card flex h-full min-h-[220px] flex-col justify-between border-white/[0.08] bg-card p-6 transition-colors duration-300 hover:border-lime/30 md:p-7"
                intensity={5}
              >
                <div className="relative z-10 flex items-start justify-between">
                  <span className="font-display text-[11px] tracking-[0.22em] text-lime/80">{s.index}</span>
                  <Arrow className="text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lime" />
                </div>

                <div className="relative z-10 mt-10">
                  <h3 className="font-display text-xl font-medium leading-tight tracking-tight text-paper md:text-[1.45rem]">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 max-w-md text-sm leading-relaxed text-muted">{s.body}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-paper/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full border border-white/[0.06] transition-transform duration-700 group-hover:scale-125"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full border border-white/[0.04] transition-transform duration-700 group-hover:scale-110"
                />
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
