import { Reveal } from '../components/Reveal';
import { projects } from '../data/projects';

const metrics = [
  { value: `${projects.length}`, label: 'Live website projects', detail: 'Built, launched and maintained in-house' },
  { value: 'Multiple', label: 'Business categories', detail: 'Food, retail, hospitality and services' },
  { value: '₹2,999', label: 'Starting website package', detail: 'Transparent pricing, written scope' },
];

export function Metrics() {
  return (
    <section aria-label="Studio metrics" className="relative pb-6">
      <div className="shell">
        <Reveal>
          <dl className="glass grid gap-px overflow-hidden rounded-2xl sm:grid-cols-3">
            {metrics.map((m, i) => (
              <div
                key={m.label}
                className={`relative px-6 py-7 md:px-8 ${i > 0 ? 'border-t border-line sm:border-t-0 sm:border-l' : ''}`}
              >
                <dt className="font-display text-[1.9rem] leading-none font-semibold tracking-[-0.03em] text-ink">
                  {m.value}
                </dt>
                <dd className="mt-2 text-[0.8rem] font-medium text-ink/85">{m.label}</dd>
                <p className="mt-1 text-[0.72rem] text-mute-soft">{m.detail}</p>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
