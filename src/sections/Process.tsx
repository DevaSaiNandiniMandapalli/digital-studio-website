import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';

const steps = [
  {
    n: '01',
    title: 'Discover',
    body: 'We understand your business, audience, goals and requirements — then recommend the right scope.',
  },
  {
    n: '02',
    title: 'Design',
    body: 'We create a professional design based on your brand identity, industry and content.',
  },
  {
    n: '03',
    title: 'Develop',
    body: 'We build, optimize and test your website across devices, browsers and connection speeds.',
  },
  {
    n: '04',
    title: 'Launch',
    body: 'We deploy your website and help you establish your online presence from day one.',
  },
];

export function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-ink py-20 md:py-28 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent"
      />
      <div className="shell">
        <SectionHeading
          eyebrow="How we work"
          title={
            <>
              A clear process.
              <br />
              No <span className="font-serif italic text-lime">guesswork</span>.
            </>
          }
          description="Four deliberate stages from first conversation to launch day. You always know what is happening and what comes next."
        />

        <ol className="mt-14 grid gap-0 border-t border-line md:mt-20 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal as="li" key={step.n} delay={i * 0.08} className="group relative border-b border-line md:border-b-0">
              <div className="relative flex h-full flex-col gap-7 px-0 py-8 md:px-7 md:py-9 xl:border-l xl:border-line xl:px-8 xl:first:border-l-0 xl:first:pl-0">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.7rem] text-lime">{step.n}</span>
                  <span className="hidden h-px w-8 bg-line-strong transition-all duration-500 group-hover:w-12 group-hover:bg-lime md:block" />
                </div>
                <div>
                  <h3 className="text-[1.45rem] font-medium tracking-tight text-paper transition-colors duration-300 group-hover:text-lime md:text-[1.6rem]">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-xs text-[0.86rem] leading-relaxed text-mute">{step.body}</p>
                </div>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-0 top-4 font-display text-[5rem] font-medium leading-none text-white/[0.035] transition-colors duration-500 group-hover:text-white/[0.06] xl:right-4"
                >
                  {step.n}
                </span>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-12 flex flex-col items-start justify-between gap-4 rounded-lg border border-line bg-ink-2 px-5 py-4 md:flex-row md:items-center">
          <p className="text-[0.86rem] text-mute">
            <span className="font-medium text-paper">Timelines:</span> Starter ≈ 5–7 days ·
            Professional ≈ 10–14 days · Premium ≈ 18–25 days, confirmed after scope review.
          </p>
          <a href="#contact" className="text-[0.8rem] font-semibold text-lime link-underline">
            Book a discovery chat
          </a>
        </Reveal>
      </div>
    </section>
  );
}
