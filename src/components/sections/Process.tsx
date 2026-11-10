import { PROCESS } from '../../data';
import { Reveal, SectionHeading } from '../ui';

export function Process() {
  return (
    <section id="process" className="section-pad relative z-10 border-t border-white/[0.06] bg-ink">
      <div className="shell">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Process"
            title={
              <>
                A clear path
                <br className="hidden sm:block" /> from idea to <span className="text-lime">launch.</span>
              </>
            }
          />
          <Reveal delay={0.08}>
            <p className="max-w-xs text-sm leading-relaxed text-muted md:text-right">
              No black boxes. You see the direction, the design and the build at every stage.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-[26px] hidden h-px bg-gradient-to-r from-lime/50 via-white/15 to-transparent md:block" />
          <div className="grid gap-10 md:grid-cols-4 md:gap-6">
            {PROCESS.map((step, i) => (
              <Reveal key={step.index} delay={i * 0.1}>
                <div className="group relative">
                  <div className="relative z-10 flex h-[52px] w-[52px] items-center justify-center rounded-full border border-white/15 bg-ink font-display text-[13px] font-medium tracking-wider text-paper transition-all duration-500 group-hover:border-lime group-hover:text-lime group-hover:shadow-[0_0_30px_-6px_rgba(183,244,90,0.6)]">
                    {step.index}
                  </div>
                  <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-paper">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[22ch] text-sm leading-relaxed text-muted">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/[0.07] bg-card/40 px-6 py-5">
            <p className="font-display text-sm uppercase tracking-[0.16em] text-paper/85">
              Typical timeline
            </p>
            <p className="text-sm text-muted">
              One-page site <span className="text-paper">7–10 days</span> · Multi-page{' '}
              <span className="text-paper">2–4 weeks</span> · Custom builds{' '}
              <span className="text-paper">4–8 weeks</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
