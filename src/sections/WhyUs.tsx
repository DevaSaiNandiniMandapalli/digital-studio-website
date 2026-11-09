import { ArrowUpRight, Check } from 'lucide-react';
import { Reveal } from '../components/Reveal';

const reasons = [
  'Affordable and transparent pricing',
  'Modern and creative designs',
  'Mobile-first development',
  'Custom solutions',
  'Fast and optimized websites',
  'Direct communication',
  'Attention to detail',
  'Support during project delivery',
];

export function WhyUs() {
  return (
    <section id="why" className="relative overflow-hidden bg-ink-2 py-20 md:py-28 lg:py-32">
      <div className="shell grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow mb-5">Why work with us</p>
            <h2 className="text-[clamp(2rem,4.2vw,3.35rem)] leading-[0.98]">
              Premium website experiences.
              <br />
              Without <span className="font-serif italic text-lime">agency-level</span> budgets.
            </h2>
            <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-mute">
              You work directly with the people designing and building your website — no account
              managers, no hand-offs, no inflated retainers. Just careful work, delivered on time.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#contact" className="btn btn-primary">
                Get a quote for your project
                <ArrowUpRight className="size-4" />
              </a>
              <a href="#pricing" className="text-[0.82rem] font-medium text-mute link-underline hover:text-paper">
                See package pricing
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-8">
              <div>
                <p className="font-display text-2xl font-medium text-paper">100%</p>
                <p className="mt-1 text-[0.72rem] uppercase tracking-[0.1em] text-mute">Custom-built, no page builders</p>
              </div>
              <div>
                <p className="font-display text-2xl font-medium text-paper">Direct</p>
                <p className="mt-1 text-[0.72rem] uppercase tracking-[0.1em] text-mute">Chat with the builders</p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
            {reasons.map((reason, i) => (
              <li
                key={reason}
                className="group flex items-start gap-3 bg-ink-2 p-5 transition-colors duration-400 hover:bg-ink-3"
              >
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-lime/30 bg-lime/10 text-lime transition-colors duration-300 group-hover:bg-lime group-hover:text-ink">
                  <Check className="size-3" strokeWidth={2.75} />
                </span>
                <span className="text-[0.85rem] leading-snug text-paper/85">{reason}</span>
                <span className="ml-auto font-mono text-[0.58rem] text-mute/40">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
