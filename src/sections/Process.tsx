import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';

const steps = [
  {
    index: '01',
    title: 'Discover',
    copy: 'We learn your business, your customers and what your website actually needs to achieve before a single pixel is designed.',
    detail: ['Goal & audience', 'Content review', 'Scope in writing'],
  },
  {
    index: '02',
    title: 'Design',
    copy: 'A distinctive design direction is presented with a clear visual system — typography, colour, layout and structure you can judge before we build.',
    detail: ['Art direction', 'Page layouts', 'Revision round'],
  },
  {
    index: '03',
    title: 'Build & launch',
    copy: 'Clean, fast, responsive development — tested on real devices, deployed to your domain and handed over with guidance.',
    detail: ['Responsive build', 'SEO & speed', 'Deployment'],
  },
];

export function Process() {
  return (
    <section id="process" className="relative overflow-hidden border-t border-line bg-surface py-20 md:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="The process"
          title={
            <>
              Clear steps. <span className="text-blue">No guesswork</span>.
            </>
          }
          copy="A simple, transparent way of working that keeps your project moving and your expectations met."
        />

        <div className="mt-12 grid gap-px border-t border-line bg-line md:mt-16 md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.index} delay={i * 0.08} className="bg-surface">
              <div className="group h-full px-0 py-8 transition-colors duration-500 md:px-7 md:py-10">
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-[2.2rem] leading-none font-medium tracking-[-0.06em] text-line-strong transition-colors duration-500 group-hover:text-accent">
                    {step.index}
                  </span>
                  <span className="rule-label">{step.title}</span>
                </div>
                <h3 className="h3 mt-6">{step.title}</h3>
                <p className="mt-3 max-w-[26rem] text-[0.88rem] leading-relaxed text-mute">{step.copy}</p>
                <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 border-t border-line pt-4">
                  {step.detail.map((d) => (
                    <li key={d} className="text-[0.7rem] tracking-[0.06em] text-mute">
                      <span aria-hidden="true" className="mr-1.5 text-accent">
                        —
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
