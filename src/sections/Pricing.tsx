import { Check, Sparkles } from 'lucide-react';
import { comparison, plans, pricingRules } from '../data/pricing';
import { site, whatsappMessage } from '../data/site';
import { selectPlan } from '../lib/plan';
import { cn } from '../lib/utils';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal, Stagger, StaggerItem } from '../components/Reveal';
import { TiltCard } from '../components/TiltCard';

const inr = (v: number) => `${site.pricing.symbol}${v.toLocaleString('en-IN')}`;

export function Pricing() {
  return (
    <section id="pricing" className="border-t border-line bg-canvas py-20 md:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Pricing"
          title="Clear packages. No surprises."
          copy="One-time project pricing in Indian Rupees. Pick the level of website your business needs today — you can always upgrade later."
          action={
            <div className="rounded-xl border border-line bg-surface px-4 py-3 text-[0.78rem] text-mute">
              <p className="font-medium text-ink">Custom work quoted separately</p>
              <p className="mt-1">E-commerce, web apps, AI & automation</p>
            </div>
          }
        />

        <Stagger className="mt-12 grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <StaggerItem key={plan.id} className="h-full">
              <TiltCard max={plan.highlight ? 5 : 3} className="h-full">
              <article
                className={cn(
                  'relative flex h-full flex-col rounded-2xl border p-6 md:p-7',
                  plan.highlight
                    ? 'border-accent/40 bg-[linear-gradient(180deg,rgba(163,230,53,0.16),rgba(255,255,255,0.02))] text-white shadow-[0_40px_90px_-45px_rgba(163,230,53,0.45)]'
                    : 'border-line bg-surface',
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className={cn('font-display text-[1.05rem] font-semibold', plan.highlight ? 'text-white' : 'text-ink')}>
                      {plan.name}
                    </h3>
                    <p className={cn('mt-1 text-[0.78rem]', plan.highlight ? 'text-white/50' : 'text-mute-soft')}>
                      {plan.tagline}
                    </p>
                  </div>
                  {plan.badge && (
                    <span
                      className={cn(
                        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.62rem] font-semibold tracking-wide uppercase',
                        plan.highlight ? 'bg-accent text-[#14210a]' : 'border border-line bg-white/[0.05] text-ink',
                      )}
                    >
                      {plan.highlight && <Sparkles className="size-2.5" />}
                      {plan.badge}
                    </span>
                  )}
                </div>

                <div className="mt-8 flex items-end gap-1.5">
                  <span className={cn('font-display text-[2.4rem] leading-none font-semibold tracking-[-0.04em]', plan.highlight ? 'text-white' : 'text-ink')}>
                    {inr(plan.price)}
                  </span>
                  <span className={cn('pb-1 text-[0.72rem]', plan.highlight ? 'text-white/45' : 'text-mute-soft')}>
                    one-time
                  </span>
                </div>
                <p className={cn('mt-2 text-[0.82rem] leading-relaxed', plan.highlight ? 'text-white/60' : 'text-mute')}>
                  {plan.description}
                </p>

                <button
                  type="button"
                  onClick={() => selectPlan(plan.id)}
                  className={cn('btn mt-6 w-full', plan.highlight ? 'btn-accent' : 'btn-ghost')}
                >
                  Choose {plan.name.split(' ')[0]}
                </button>

                <ul className={cn('mt-6 space-y-2.5 border-t pt-6 text-[0.82rem]', plan.highlight ? 'border-night-line' : 'border-line')}>
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <Check
                        className={cn('mt-0.5 size-3.5 shrink-0', plan.highlight ? 'text-accent' : 'text-accent-deep')}
                        strokeWidth={2.5}
                      />
                      <span className={plan.highlight ? 'text-white/70' : 'text-mute'}>{f}</span>
                    </li>
                  ))}
                </ul>
              </article>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-14">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <h3 className="h3">Compare every detail</h3>
            <p className="text-[0.78rem] text-mute-soft">Swipe the table sideways on smaller screens.</p>
          </div>
          <div className="no-scrollbar mt-5 overflow-x-auto rounded-2xl border border-line bg-surface">
            <table className="w-full min-w-[42rem] border-collapse text-left text-[0.82rem]">
              <thead>
                <tr className="border-b border-line bg-white/[0.03]">
                  <th scope="col" className="px-5 py-3.5 font-medium text-mute">Feature</th>
                  {comparison.columns.map((c) => (
                    <th key={c} scope="col" className="px-5 py-3.5 font-semibold text-ink">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row) => (
                  <tr key={row.label} className="border-b border-line/70 last:border-0">
                    <th scope="row" className="px-5 py-3 font-normal text-mute">{row.label}</th>
                    {row.values.map((v, i) => (
                      <td key={i} className="px-5 py-3 text-ink/85">{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal className="mt-8 grid gap-3 rounded-2xl border border-line bg-surface p-5 text-[0.78rem] leading-relaxed text-mute md:grid-cols-2 md:p-6">
          <div>
            {pricingRules.slice(0, 3).map((r) => (
              <p key={r} className="mb-2 last:mb-0">· {r}</p>
            ))}
          </div>
          <div className="flex flex-col items-start gap-2 md:items-end md:text-right">
            {pricingRules.slice(3).map((r) => (
              <p key={r}>· {r}</p>
            ))}
            <a
              href={whatsappMessage('Hi! I need a custom quotation for my website.')}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
            >
              Ask for a custom quotation
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
