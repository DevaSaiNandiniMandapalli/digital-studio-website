import { ArrowUpRight } from 'lucide-react';
import { services } from '../data/services';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';

export function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-ink py-20 md:py-28 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-lime/40 to-transparent"
      />
      <div className="shell">
        <SectionHeading
          eyebrow="What we do"
          title={
            <>
              Whatever your business needs, we can <span className="font-serif italic text-lime">design &amp; build</span> it.
            </>
          }
          description="Ten focused services covering everything a modern business needs online — from a single launch page to a fully custom web platform."
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.id} delay={(i % 3) * 0.05} y={16}>
                <a
                  href="#contact"
                  className="group relative flex h-full flex-col justify-between gap-8 bg-ink p-6 transition-colors duration-500 hover:bg-ink-2 md:p-7"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <span className="grid size-10 place-items-center rounded-md border border-line bg-white/[0.03] text-mute transition-all duration-500 group-hover:border-lime/30 group-hover:bg-lime group-hover:text-ink">
                        <Icon className="size-[1.15rem]" strokeWidth={1.6} />
                      </span>
                      <span className="font-mono text-[0.62rem] text-mute/60">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="mt-6 text-[1.03rem] font-medium leading-snug tracking-tight text-paper md:text-[1.1rem]">
                      {service.title}
                    </h3>
                    <p className="mt-2.5 text-[0.855rem] leading-relaxed text-mute">
                      {service.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <ul className="flex flex-wrap gap-1.5">
                      {service.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-line px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.08em] text-mute/80"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <ArrowUpRight className="size-4 -translate-x-1 translate-y-1 text-paper opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                  </div>
                </a>
              </Reveal>
            );
          })}

          <Reveal delay={0.1} y={16} className="md:col-span-2">
            <div className="flex h-full flex-col justify-between gap-6 bg-lime p-6 text-ink md:flex-row md:items-center md:p-8">
              <div>
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink/50">
                  Not on the list?
                </p>
                <h3 className="mt-3 max-w-md text-[1.35rem] font-medium leading-tight tracking-tight md:text-[1.6rem]">
                  Have a different idea? Let&apos;s build it.
                </h3>
                <p className="mt-2 max-w-md text-[0.85rem] leading-relaxed text-ink/60">
                  Custom requirements, unusual industries and ambitious concepts are exactly what we
                  like working on.
                </p>
              </div>
              <a href="#contact" className="btn btn-dark shrink-0">
                Describe your idea
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
