import { Check, Info } from 'lucide-react';
import { plans, pricingRules, comparison } from '../data/pricing';
import { formatINR } from '../lib/utils';
import { selectPlan } from '../lib/plan';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { cn } from '../lib/utils';

export function Pricing() {
  return (
    <section id="pricing" className="relative bg-paper py-20 text-ink md:py-28 lg:py-32">
      <div className="shell">
        <SectionHeading
          tone="dark"
          eyebrow="Pricing"
          title={
            <>
              Straightforward packages.
              <br />
              <span className="font-serif italic">Serious</span> websites.
            </>
          }
          description="Three advertised starting packages with no hidden extras. Pick the scope that fits your business today — upgrade whenever you are ready."
        />

        <div className="mt-12 grid items-start gap-5 lg:mt-16 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.08}>
              <div
                className={cn(
                  'relative flex h-full flex-col rounded-xl border p-6 transition-transform duration-500 md:p-7',
                  plan.highlight
                    ? 'border-ink bg-ink text-paper shadow-[0_30px_70px_-40px_rgba(11,12,14,0.65)] lg:-mt-4 lg:pb-9 lg:pt-9'
                    : 'border-ink/12 bg-white/55 hover:-translate-y-1 hover:border-ink/25',
                )}
              >
                {plan.badge && (
                  <span
                    className={cn(
                      'absolute right-6 top-6 rounded-full px-2.5 py-1 text-[0.58rem] font-bold uppercase tracking-[0.14em]',
                      plan.highlight ? 'bg-lime text-ink' : 'bg-ink/8 text-ink/60',
                    )}
                  >
                    {plan.badge}
                  </span>
                )}

                <p className={cn('text-[0.68rem] uppercase tracking-[0.18em]', plan.highlight ? 'text-lime/80' : 'text-ink/40')}>
                  {plan.tagline}
                </p>
                <h3 className="mt-2 text-[1.3rem] font-medium tracking-tight">{plan.name}</h3>

                <div className="mt-6 flex items-baseline gap-1.5">
                  <span className="font-display text-[2.9rem] font-medium leading-none tracking-[-0.04em]">
                    {formatINR(plan.price)}
                  </span>
                  <span className={cn('text-[0.72rem]', plan.highlight ? 'text-mute' : 'text-ink/45')}>
                    / one-time
                  </span>
                </div>
                <p className={cn('mt-3 text-[0.85rem] leading-relaxed', plan.highlight ? 'text-paper/70' : 'text-ink/55')}>
                  {plan.description}
                </p>

                <div className={cn('my-6 h-px w-full', plan.highlight ? 'bg-line' : 'bg-ink/10')} />

                <ul className="flex flex-1 flex-col gap-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check
                        className={cn('mt-0.5 size-3.5 shrink-0', plan.highlight ? 'text-lime' : 'text-ink/70')}
                        strokeWidth={2.5}
                      />
                      <span className={cn('text-[0.83rem] leading-snug', plan.highlight ? 'text-paper/80' : 'text-ink/70')}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => selectPlan(plan.id)}
                  className={cn('btn mt-7 w-full', plan.highlight ? 'btn-primary' : 'btn-outline-dark')}
                >
                  Choose {plan.name.split(' ')[0]}
                </button>
                {plan.highlight && (
                  <p className="mt-3 text-center text-[0.66rem] text-mute">Most chosen by new businesses</p>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <div className="flex items-start gap-3 rounded-lg border border-ink/10 bg-ink/[0.03] px-4 py-3.5">
            <Info className="mt-0.5 size-4 shrink-0 text-ink/40" />
            <p className="text-[0.78rem] leading-relaxed text-ink/55">
              All packages include 2–4 revision rounds and are delivered in roughly 5–25 days
              depending on scope, confirmed after requirements review. Domain, premium hosting, paid
              APIs and third-party subscriptions are additional. E-commerce, complex payments and
              custom applications are quoted separately.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-16 md:mt-20">
          <h3 className="text-[1.4rem] font-medium tracking-tight md:text-[1.7rem]">Compare the packages</h3>
          <div className="mt-6 overflow-x-auto rounded-xl border border-ink/12 bg-white/40">
            <table className="w-full min-w-[38rem] border-collapse text-left">
              <caption className="sr-only">Feature comparison of the Starter, Professional and Premium website packages</caption>
              <thead>
                <tr className="border-b border-ink/12">
                  <th scope="col" className="sticky left-0 z-10 bg-paper px-4 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink/40">
                    Feature
                  </th>
                  {comparison.columns.map((col, i) => (
                    <th
                      key={col}
                      scope="col"
                      className={cn(
                        'px-4 py-4 text-[0.78rem] font-semibold',
                        i === 1 && 'bg-ink/[0.045] text-ink',
                      )}
                    >
                      {col}
                      <span className="ml-1.5 font-normal text-ink/45">{formatINR(plans[i].price)}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row, r) => (
                  <tr key={row.label} className={cn('border-b border-ink/8 last:border-0', r % 2 === 1 && 'bg-ink/[0.018]')}>
                    <th scope="row" className="sticky left-0 z-10 bg-paper px-4 py-3 text-[0.8rem] font-medium text-ink/70">
                      {row.label}
                    </th>
                    {row.values.map((v, i) => (
                      <td
                        key={i}
                        className={cn('px-4 py-3 text-[0.8rem] text-ink/60', i === 1 && 'bg-ink/[0.045] font-medium text-ink/80')}
                      >
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="mt-6 grid gap-2 md:grid-cols-2 md:gap-x-10">
            {pricingRules.map((rule) => (
              <li key={rule} className="flex gap-2 text-[0.72rem] leading-relaxed text-ink/45">
                <span aria-hidden="true" className="mt-1.5 size-1 shrink-0 rounded-full bg-ink/30" />
                {rule}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
