import { ArrowUpRight, Check } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { Sculpture } from '../components/Sculpture';
import { projects } from '../data/projects';
import { site, whatsappMessage } from '../data/site';
import { asset } from '../lib/utils';

const base =
  'edge-card group relative flex flex-col justify-between overflow-hidden border border-line bg-surface p-6 md:p-7 transition-colors duration-300 hover:border-line-strong';

export function Bento() {
  return (
    <section id="craft" className="relative overflow-hidden border-t border-line bg-canvas py-20 md:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="What you get"
          title={
            <>
              Everything a serious
              <br className="hidden sm:block" /> website needs.
            </>
          }
          copy="Not a page builder, not a template. A designed, engineered, mobile-first website — delivered quickly and priced openly."
          action={
            <a href="#pricing" className="btn btn-ghost">
              See pricing
              <ArrowUpRight className="size-4" />
            </a>
          }
        />

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal className="sm:col-span-2 lg:col-span-2">
            <article className={`${base} h-full min-h-[19rem]`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="micro">Portfolio</p>
                  <p className="mt-3 font-display text-[3.2rem] leading-none font-medium tracking-[-0.05em]">
                    12<span className="text-accent">+</span>
                  </p>
                  <p className="mt-1 text-[0.78rem] text-mute">live client websites</p>
                </div>
                <span className="micro hidden sm:block">2024 — 2026</span>
              </div>

              <div className="relative mt-8 h-32">
                <img
                  src={asset(projects[0].image)}
                  alt="Kasoori restaurant website preview"
                  loading="lazy"
                  className="absolute left-0 top-0 h-28 w-[58%] border border-line object-cover object-top shadow-[0_18px_40px_-24px_rgba(0,0,0,0.9)] transition-transform duration-500 group-hover:-translate-y-1"
                />
                <img
                  src={asset(projects[6].image)}
                  alt="Fluids Store e-commerce website preview"
                  loading="lazy"
                  className="absolute right-0 top-6 h-28 w-[52%] border border-line object-cover object-top shadow-[0_18px_40px_-24px_rgba(0,0,0,0.9)] transition-transform duration-500 group-hover:translate-y-1"
                />
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.05} className="lg:col-span-2">
            <article className={`${base} h-full min-h-[19rem]`}>
              <div className="flex items-start justify-between gap-4">
                <p className="micro">Starting price</p>
                <span className="grid size-8 place-items-center rounded-full border border-line text-accent">
                  <Check className="size-3.5" />
                </span>
              </div>
              <div className="mt-6">
                <p className="font-display text-[2.6rem] leading-none font-medium tracking-[-0.05em] md:text-[3rem]">
                  ₹2,999
                </p>
                <p className="mt-3 max-w-[26ch] text-[0.85rem] leading-relaxed text-mute">
                  A complete one-page website. Three packages, fixed scope, no hidden extras.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4 text-[0.72rem] text-mute">
                <span>₹2,999 Starter</span>
                <span>₹5,999 Business</span>
                <span>₹8,999 Premium</span>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.08} className="sm:row-span-2">
            <article className="edge-card group relative flex h-full flex-col justify-between overflow-hidden border border-line bg-surface transition-colors duration-300 hover:border-line-strong">
              <Sculpture className="h-[17rem] w-full sm:h-[21rem] lg:h-[23rem]" />
              <div className="border-t border-line bg-surface p-6">
                <p className="micro">Craft</p>
                <h3 className="mt-3 text-[1.05rem] font-medium tracking-[-0.02em]">
                  Sculpted, not templated.
                </h3>
                <p className="mt-2 text-[0.82rem] leading-relaxed text-mute">
                  Real 3D, real lighting, real type. Every surface of your site is designed on purpose.
                </p>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.1}>
            <article className={`${base} h-full min-h-[10.5rem]`}>
              <p className="micro">Delivery</p>
              <p className="mt-4 font-display text-[1.9rem] leading-none font-medium tracking-[-0.04em]">
                3–7 days
              </p>
              <p className="mt-2 text-[0.8rem] text-mute">Typical build after content is final.</p>
            </article>
          </Reveal>

          <Reveal delay={0.14}>
            <article className={`${base} h-full min-h-[10.5rem]`}>
              <p className="micro">Enquiries</p>
              <p className="mt-4 font-display text-[1.9rem] leading-none font-medium tracking-[-0.04em]">
                WhatsApp
              </p>
              <p className="mt-2 text-[0.8rem] text-mute">One tap from any page, straight to the studio.</p>
            </article>
          </Reveal>

          <Reveal delay={0.18} className="sm:col-span-2 lg:col-span-2">
            <article className={`${base} h-full min-h-[10.5rem]`}>
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="micro">Built for</p>
                  <h3 className="mt-3 max-w-[22ch] text-[1.15rem] leading-snug font-medium tracking-[-0.02em]">
                    Phones first, then tablets, then desktop.
                  </h3>
                  <p className="mt-2 max-w-[34ch] text-[0.82rem] leading-relaxed text-mute">
                    Every layout is composed at 360px before it is scaled up.
                  </p>
                </div>
                <div className="hidden h-[7.5rem] w-[4.2rem] shrink-0 rounded-[0.9rem] border border-line-strong bg-canvas p-1 sm:block">
                  <div className="h-full w-full rounded-[0.6rem] border border-line bg-[linear-gradient(180deg,rgba(214,96,58,0.22),transparent_45%)]" />
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.22} className="sm:col-span-2 lg:col-span-2">
            <article className={`${base} h-full min-h-[10.5rem]`}>
              <div className="flex items-center justify-between">
                <p className="micro">Included as standard</p>
                <a
                  href={whatsappMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="micro text-accent transition-colors hover:text-ink"
                >
                  Ask a question ↗
                </a>
              </div>
              <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-[0.82rem] text-mute">
                {['SEO foundations', 'Speed budget', 'Analytics', 'Domain setup', 'Editable content', 'Launch support'].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-2">
                      <Check className="size-3 shrink-0 text-accent" />
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </article>
          </Reveal>
        </div>

        <p className="mt-6 text-[0.72rem] text-mute">
          Based in {site.location} · working with clients across India and worldwide.
        </p>
      </div>
    </section>
  );
}
