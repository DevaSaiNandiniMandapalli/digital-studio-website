import { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { Accordion } from '../components/Accordion';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { plans, priceFaqs, pricingRules } from '../data/pricing';
import { cn } from '../lib/utils';

const ease = 'transition-all duration-500';

export function Pricing() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section
      id="pricing"
      className="on-paper relative overflow-hidden border-t border-line py-20 md:py-28"
    >
      <div className="shell">
        <SectionHeading
          eyebrow="Pricing"
          title={
            <>
              Honest packages, <span className="text-accent">clearly priced</span>.
            </>
          }
          copy="Three starting points for new websites. Every quote is confirmed in writing before work begins."
        />

        <div className="mt-12 grid gap-5 md:mt-16 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.08} className="h-full">
              <article
                className={cn(
                  'flex h-full flex-col border p-6 md:p-7',
                  ease,
                  plan.highlight
                    ? 'border-ink bg-ink text-canvas'
                    : 'border-line bg-surface hover:border-line-strong',
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3
                      className={cn(
                        'font-display text-[1.05rem] font-medium tracking-[-0.02em]',
                        plan.highlight ? 'text-canvas' : 'text-ink',
                      )}
                    >
                      {plan.name}
                    </h3>
                    <p
                      className={cn(
                        'mt-1.5 text-[0.76rem]',
                        plan.highlight ? 'text-canvas/60' : 'text-mute',
                      )}
                    >
                      {plan.tagline}
                    </p>
                  </div>
                  {plan.badge && (
                    <span
                      className={cn(
                        'shrink-0 rounded-full px-2.5 py-1 text-[0.6rem] font-semibold tracking-[0.1em] uppercase',
                        plan.highlight ? 'bg-canvas text-ink' : 'bg-surface-2 text-mute',
                      )}
                    >
                      {plan.badge}
                    </span>
                  )}
                </div>

                <div className="mt-6 flex items-baseline gap-1.5">
                  <span
                    className={cn(
                      'font-display text-[2.1rem] leading-none font-medium tracking-[-0.05em]',
                      plan.highlight ? 'text-canvas' : 'text-ink',
                    )}
                  >
                    ₹{plan.price.toLocaleString('en-IN')}
                  </span>
                  <span
                    className={cn('text-[0.72rem]', plan.highlight ? 'text-canvas/55' : 'text-mute')}
                  >
                    starting
                  </span>
                </div>

                <p
                  className={cn(
                    'mt-3 text-[0.84rem] leading-relaxed',
                    plan.highlight ? 'text-canvas/70' : 'text-mute',
                  )}
                >
                  {plan.description}
                </p>

                <ul
                  className={cn(
                    'mt-6 flex-1 space-y-2.5 border-t pt-5',
                    plan.highlight ? 'border-white/15' : 'border-line',
                  )}
                >
                  {plan.features.slice(0, expanded ? undefined : 6).map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check
                        className={cn(
                          'mt-[3px] size-3.5 shrink-0',
                          plan.highlight ? 'text-canvas/60' : 'text-blue',
                        )}
                      />
                      <span
                        className={cn(
                          'text-[0.82rem] leading-relaxed',
                          plan.highlight ? 'text-canvas/80' : 'text-ink/80',
                        )}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={cn(
                    'btn mt-7 w-full',
                    plan.highlight ? 'btn-on-dark' : 'btn-primary',
                  )}
                >
                  Choose {plan.name.split(' ')[0]}
                  <ArrowUpRight className="size-4" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-3 border-t border-line pt-5 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="text-[0.72rem] font-medium tracking-[0.1em] text-ink uppercase transition-colors hover:text-accent"
          >
            {expanded ? '— Show fewer features' : '+ Show every feature'}
          </button>
          <p className="text-[0.72rem] text-mute">{plans[0].features.length + plans[1].features.length} features across three packages</p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="rule-label">What you should know</span>
              <ul className="mt-4 space-y-3">
                {pricingRules.map((rule) => (
                  <li key={rule} className="flex gap-3 text-[0.82rem] leading-relaxed text-mute">
                    <span aria-hidden="true" className="mt-[0.55em] size-1 shrink-0 rounded-full bg-accent" />
                    {rule}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <span className="rule-label">Pricing questions</span>
              <div className="mt-3">
                <Accordion items={priceFaqs.slice(0, 5)} />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
