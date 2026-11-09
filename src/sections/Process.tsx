import { Reveal, Stagger, StaggerItem } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';

const steps = [
  {
    title: 'Discover',
    copy: 'A short call to understand your business, customers and what the website has to achieve.',
    meta: 'Day 1–2',
  },
  {
    title: 'Design',
    copy: 'Structure, copy direction and a visual design built around your brand — reviewed with you before any code.',
    meta: 'Day 2–5',
  },
  {
    title: 'Build',
    copy: 'Clean, fast development with responsive layouts, tested forms and content in place.',
    meta: 'Day 5–14',
  },
  {
    title: 'Launch',
    copy: 'Domain, hosting, analytics and a walkthrough so you know how to update and use the site.',
    meta: 'Launch day',
  },
];

export function Process() {
  return (
    <section id="process" className="bg-night py-20 text-white md:py-28">
      <div className="shell">
        <SectionHeading
          tone="dark"
          eyebrow="Process"
          title="A simple, transparent way to get online."
          copy="No jargon and no endless back and forth. Four clear steps from first conversation to a live website."
        />

        <Stagger className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-night-line bg-[color:var(--color-night-line)] sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <StaggerItem key={step.title} className="bg-night p-6 md:p-7">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-[0.8rem] font-semibold text-white/35">0{i + 1}</span>
                <span className="text-[0.65rem] tracking-[0.1em] text-white/35 uppercase">{step.meta}</span>
              </div>
              <h3 className="mt-8 font-display text-[1.3rem] font-semibold tracking-[-0.02em] text-white">
                {step.title}
              </h3>
              <p className="mt-2.5 text-[0.83rem] leading-relaxed text-white/55">{step.copy}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-8 flex flex-col gap-3 border-t border-night-line pt-6 text-[0.8rem] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>Typical delivery: 5–7 days for a starter site, 10–14 days for a business site, 18–25 days for e-commerce.</p>
          <a href="#contact" className="font-medium text-white underline decoration-white/25 underline-offset-4 hover:decoration-accent">
            Book an intro call
          </a>
        </Reveal>
      </div>
    </section>
  );
}
