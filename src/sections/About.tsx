import { ArrowUpRight } from 'lucide-react';
import { site } from '../data/site';
import { projects } from '../data/projects';
import { asset } from '../lib/utils';
import { Reveal } from '../components/Reveal';
import { TiltCard } from '../components/TiltCard';

const beliefs = [
  'Every business deserves a website that looks as good as the work it does.',
  'Design should be simple to use, not just nice to look at.',
  'A website is a business tool — it should bring enquiries, not just visitors.',
];

export function About() {
  const shot = projects[1] ?? projects[0];

  return (
    <section id="about" className="relative overflow-hidden border-t border-line bg-surface py-20 md:py-28">
      <div className="shell grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <div>
          <Reveal>
            <span className="eyebrow">About the studio</span>
            <h2 className="h2 mt-4">
              Built On Craft, Clarity And Real Business Goals.
            </h2>
            <div className="mt-6 space-y-4 text-[0.92rem] leading-relaxed text-mute">
              <p>
                {site.name} is a digital design and development studio based in Hyderabad, building
                for businesses across India and worldwide. We are small on purpose — the person you
                speak with is the person designing and building your website.
              </p>
              <p>
                From restaurants and cafés to hotels, retail stores, farms and startups, we study how
                each business actually earns, then shape the site around that: what visitors need to
                see, what makes them enquire, and what makes them come back.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="mt-8 space-y-3 border-t border-line pt-6">
              {beliefs.map((b, i) => (
                <li key={b} className="flex gap-4 text-[0.86rem] leading-relaxed text-ink/75">
                  <span className="font-mono text-[0.65rem] text-mute-soft">0{i + 1}</span>
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.14} className="mt-8 flex flex-wrap items-center gap-6">
            <a href="#contact" className="btn btn-primary">
              Work with us
              <ArrowUpRight className="size-4" />
            </a>
            <p className="text-[0.76rem] text-mute-soft">{site.location}</p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="scene relative">
          <TiltCard max={6} className="relative">
            <div className="panel overflow-hidden rounded-2xl">
              <img
                src={asset(shot.image)}
                alt={`${shot.name} website designed by ${site.name}`}
                width={1440}
                height={900}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover object-top"
              />
            </div>
            <span className="tilt-lift-sm absolute -top-3 -right-3 hidden items-center gap-1.5 rounded-full border border-line bg-black/60 px-3 py-1.5 text-[0.66rem] font-medium backdrop-blur-md sm:flex">
              <span className="size-1.5 rounded-full bg-accent" />
              Designed in-house
            </span>
          </TiltCard>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-accent/25 bg-accent/10 p-5 text-white">
              <p className="font-display text-[1.7rem] leading-none font-semibold tracking-[-0.03em]">{projects.length}</p>
              <p className="mt-2 text-[0.72rem] text-white/60">Live websites delivered and maintained</p>
            </div>
            <div className="rounded-2xl border border-line bg-white/[0.04] p-5">
              <p className="font-display text-[1.7rem] leading-none font-semibold tracking-[-0.03em]">₹2,999</p>
              <p className="mt-2 text-[0.72rem] text-mute">Where a professional website starts</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
