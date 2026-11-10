import { TIERS, WHATSAPP } from '../../data';
import { scrollToEl } from '../../lib/smooth';
import { Arrow, Reveal, SectionHeading, TiltCard } from '../ui';

function Check({ muted }: { muted?: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className={muted ? 'text-lime/50' : 'text-lime'}>
      <path d="M2.5 7.5l3 3 6-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="section-pad relative z-10 border-t border-white/[0.06] bg-ink2">
      <div className="shell">
        <SectionHeading
          align="center"
          eyebrow="Investment"
          title={
            <>
              Simple pricing, <span className="text-lime">serious craft.</span>
            </>
          }
          lead="Transparent starting points. Every quote is confirmed after a short conversation about your business — no retainers, no surprises."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {TIERS.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.08}>
              <TiltCard
                intensity={4}
                glow={tier.popular ? 'rgba(183,244,90,0.16)' : 'rgba(114,201,255,0.10)'}
                className={`relative flex h-full flex-col rounded-2xl border p-7 transition-colors duration-300 md:p-8 ${
                  tier.popular
                    ? 'border-lime/40 bg-[linear-gradient(180deg,rgba(183,244,90,0.06),rgba(18,29,43,0.9))]'
                    : 'border-white/[0.08] bg-card/60 hover:border-white/20'
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-7 rounded-full bg-lime px-3 py-1 font-display text-[9px] font-semibold uppercase tracking-[0.16em] text-ink">
                    Most chosen
                  </span>
                )}

                <div className="relative z-10 flex items-baseline justify-between">
                  <h3 className="font-display text-sm uppercase tracking-[0.16em] text-paper/85">{tier.name}</h3>
                  <span className="font-display text-[11px] tracking-[0.14em] text-muted">0{i + 1}</span>
                </div>

                <div className="relative z-10 mt-6 flex items-end gap-1.5">
                  <span className="font-display text-[clamp(2.1rem,4vw,2.9rem)] font-medium leading-none tracking-tight text-paper">
                    {tier.price}
                  </span>
                  <span className="pb-1.5 text-[11px] uppercase tracking-[0.12em] text-muted">starting</span>
                </div>
                <p className="relative z-10 mt-3 text-[13px] leading-relaxed text-muted">{tier.note}</p>

                <div className="relative z-10 my-6 h-px w-full bg-white/10" />

                <ul className="relative z-10 flex-1 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-paper/80">
                      <span className="mt-[3px] shrink-0">
                        <Check muted={!tier.popular} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="relative z-10 mt-8">
                  <button
                    onClick={() => scrollToEl('#contact', -60)}
                    className={`btn w-full ${tier.popular ? 'btn-lime' : 'btn-ghost'}`}
                  >
                    Start with {tier.name.split(' ')[0]} <Arrow />
                  </button>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-xl border border-white/[0.07] bg-ink/60 px-6 py-5 text-center sm:flex-row sm:text-left">
            <p className="max-w-xl text-[13px] leading-relaxed text-muted">
              <span className="text-paper">Need something bigger?</span> E-commerce, booking systems and
              custom platforms are quoted individually based on scope.
            </p>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn btn-ghost shrink-0">
              Request a custom quote <Arrow />
            </a>
          </div>
        </Reveal>

        <p className="mt-6 text-center text-[11px] uppercase tracking-[0.14em] text-muted">
          Prices in INR · GST applicable · 50% to begin, 50% on launch
        </p>
      </div>
    </section>
  );
}
