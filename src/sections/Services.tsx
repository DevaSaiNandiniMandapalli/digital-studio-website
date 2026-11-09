import { ArrowUpRight } from 'lucide-react';
import { services } from '../data/services';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal, Stagger, StaggerItem } from '../components/Reveal';
import { whatsappMessage } from '../data/site';
import { TiltCard } from '../components/TiltCard';

const featured = ['business-website', 'restaurant-website', 'ecommerce', 'hotel', 'portfolio', 'ai-automation'];

export function Services() {
  const cards = featured
    .map((id) => services.find((s) => s.id === id))
    .filter((s): s is (typeof services)[number] => Boolean(s));
  const rest = services.filter((s) => !featured.includes(s.id));

  return (
    <section id="services" className="border-t border-line bg-canvas py-20 md:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Services"
          title={
            <>
              Whatever your business needs,
              <br className="hidden md:block" /> we can design and build it.
            </>
          }
          copy="One studio for the whole website — strategy, design, development, launch and the small details that make a business look credible online."
          action={
            <a
              href={whatsappMessage('Hi! I would like to ask about a website service.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              Discuss your requirement
              <ArrowUpRight className="size-4" />
            </a>
          }
        />

        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((service) => (
            <StaggerItem key={service.id} className="h-full">
              <TiltCard max={4} className="h-full">
              <a
                href="#contact"
                className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-accent/40 md:p-7"
              >
                <div className="flex items-start justify-between">
                  <span className="grid size-10 place-items-center rounded-xl border border-line bg-white/[0.06] text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-[#0b1204]">
                    <service.icon className="size-[1.15rem]" strokeWidth={1.6} />
                  </span>
                  <ArrowUpRight className="size-4 text-mute-soft transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                </div>
                <h3 className="h3 mt-6">{service.title}</h3>
                <p className="mt-2.5 text-[0.875rem] leading-relaxed text-mute">{service.description}</p>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-8 flex flex-col gap-4 border-t border-line pt-6 text-[0.82rem] text-mute md:flex-row md:items-center md:justify-between">
          <p>
            <span className="font-medium text-ink">Also available:</span>{' '}
            {rest.map((s) => s.title.replace(' Development', '').replace(' Websites', '')).join(' · ')}
          </p>
          <a href="#pricing" className="inline-flex items-center gap-1.5 font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">
            See packages and pricing
            <ArrowUpRight className="size-3.5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
