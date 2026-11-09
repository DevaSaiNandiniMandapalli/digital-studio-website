import { ArrowUpRight } from 'lucide-react';
import { services } from '../data/services';
import { SectionHeading } from '../components/SectionHeading';
import { Stagger, StaggerItem } from '../components/Reveal';
import { TiltCard } from '../components/TiltCard';

export function Services() {
  return (
    <section id="services" className="relative overflow-hidden border-t border-line py-20 md:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 h-[26rem] w-[46rem] -translate-x-1/2 rounded-full bg-[#247bff]/8 blur-[130px]" />
      </div>

      <div className="shell">
        <SectionHeading
          eyebrow="What we create"
          title="What We Create."
          copy="Digital solutions designed to help businesses establish a stronger online presence."
        />

        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <StaggerItem key={service.id} className="h-full">
              <TiltCard max={4} className="h-full">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-[linear-gradient(160deg,rgba(56,213,255,0.07),rgba(16,34,58,0.55)_45%,rgba(9,20,38,0.85))] p-6 backdrop-blur-md transition-colors duration-500 hover:border-accent/35">
                  <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="flex items-start justify-between">
                    <span className="grid size-11 place-items-center rounded-xl border border-line bg-white/[0.05] text-accent transition-colors duration-500 group-hover:border-accent/40 group-hover:bg-accent group-hover:text-[#04101f]">
                      <service.icon className="size-[1.15rem]" strokeWidth={1.6} />
                    </span>
                    <span className="font-mono text-[0.66rem] tracking-[0.14em] text-mute-soft">{service.index}</span>
                  </div>

                  <h3 className="h3 mt-6">{service.title}</h3>
                  <p className="mt-2.5 text-[0.85rem] leading-relaxed text-mute">{service.description}</p>

                  <a
                    href="#contact"
                    className="mt-6 inline-flex items-center gap-1.5 text-[0.78rem] font-medium text-ink/80 transition-colors hover:text-accent"
                  >
                    Learn more
                    <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </article>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
