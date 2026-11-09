import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { Logo } from '../components/Logo';
import { site, whatsappMessage } from '../data/site';

const facts = [
  { label: 'Studio', value: 'Independent design & development studio' },
  { label: 'Based in', value: 'Hyderabad, India' },
  { label: 'Clients', value: 'Restaurants, retail, hospitality, startups' },
  { label: 'Reach', value: 'India and worldwide, fully remote' },
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden border-t border-line bg-surface py-20 md:py-28">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="eyebrow">About the studio</span>
              <h2 className="h2 mt-5">
                A small studio with high standards.
              </h2>
            </Reveal>

            <div className="mt-6 max-w-[38rem] space-y-5">
              <Reveal delay={0.06}>
                <p className="text-[1.02rem] leading-relaxed text-ink/85">
                  Your Digital Studio is an independent website design and development practice. We
                  work with business owners who understand that a website is not decoration — it is
                  the front door of the company.
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="text-[0.94rem] leading-relaxed text-mute">
                  Our work combines editorial design thinking with careful engineering. Every project
                  starts from your business, your customers and the decision they need to make — then
                  we design and build a website that supports exactly that. No page-builder templates,
                  no recycled layouts, no stock identity.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="text-[0.94rem] leading-relaxed text-mute">
                  We keep the studio deliberately small so that the person who designs your website is
                  the person accountable for it. Clear scope, clear pricing, clear communication from
                  first message to launch.
                </p>
              </Reveal>
              <Reveal delay={0.24}>
                <a
                  href={whatsappMessage('Hi! I would like to know more about working with your studio.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost mt-2"
                >
                  Talk to the studio
                  <ArrowUpRight className="size-4" />
                </a>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="border border-line bg-canvas">
                <div className="flex items-end justify-between border-b border-line px-6 py-6">
                  <Logo compact />
                  <span className="rule-label">Est. Hyderabad</span>
                </div>
                <div className="px-6 py-2">
                  {facts.map((fact) => (
                    <div
                      key={fact.label}
                      className="flex items-baseline justify-between gap-6 border-b border-line py-4 last:border-b-0"
                    >
                      <span className="text-[0.66rem] tracking-[0.14em] text-mute uppercase">
                        {fact.label}
                      </span>
                      <span className="max-w-[16rem] text-right text-[0.84rem] leading-snug text-ink/85">
                        {fact.value}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-line px-6 py-5">
                  <p className="font-display text-[0.95rem] leading-snug tracking-[-0.02em] text-ink uppercase">
                    We don&rsquo;t just build websites. We create digital impressions.
                  </p>
                  <a
                    href={`tel:${site.phoneRaw}`}
                    className="mt-3 inline-flex text-[0.78rem] text-mute transition-colors hover:text-accent"
                  >
                    {site.phone}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
