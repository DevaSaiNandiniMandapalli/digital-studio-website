import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { services } from '../data/services';

export function Services() {
  return (
    <section id="services" className="relative overflow-hidden border-t border-line bg-canvas py-20 md:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Services"
          title={
            <>
              What we can <span className="text-accent">create</span>.
            </>
          }
          copy="Six focused services. Each one built around a business goal, not a template."
        />

        <div className="mt-12 border-t border-line md:mt-16">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.04}>
              <a
                href="#contact"
                className="group grid grid-cols-[auto_1fr_auto] items-start gap-x-4 border-b border-line py-7 transition-colors duration-500 hover:bg-surface md:grid-cols-[4rem_1fr_1.15fr_auto] md:items-center md:gap-x-8 md:py-8"
              >
                <span className="font-display pt-1 text-[0.72rem] font-medium tracking-[0.14em] text-accent transition-transform duration-500 group-hover:-translate-y-0.5 md:pt-0">
                  {service.index}
                </span>

                <h3 className="h3 max-w-[18rem] transition-colors duration-300 group-hover:text-accent md:max-w-none">
                  {service.title}
                </h3>

                <p className="col-span-2 col-start-2 mt-2 max-w-[34rem] text-[0.88rem] leading-relaxed text-mute md:col-span-1 md:col-start-auto md:mt-0">
                  {service.description}
                </p>

                <span className="col-start-3 row-start-1 grid size-9 place-items-center rounded-full border border-line text-mute transition-all duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-[#0b0b0c] md:col-start-4">
                  <ArrowUpRight className="size-4" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
