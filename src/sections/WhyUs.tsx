import { BadgeCheck, Clock3, MessagesSquare, Palette } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { Stagger, StaggerItem } from '../components/Reveal';

const reasons = [
  {
    icon: Palette,
    title: 'Design that fits your business',
    copy: 'No recycled template. Every layout, colour and type choice is made for your industry, your customers and what you are selling.',
  },
  {
    icon: Clock3,
    title: 'Fast, mobile-first builds',
    copy: 'Sites are tested on phones, tablets and desktops, and optimised so pages open quickly — where most of your visitors actually are.',
  },
  {
    icon: MessagesSquare,
    title: 'Direct communication',
    copy: 'You speak with the person doing the work. Updates happen on WhatsApp, with clear milestones and no agency layers.',
  },
  {
    icon: BadgeCheck,
    title: 'Fixed pricing, written scope',
    copy: 'You get a written scope and a fixed price before anything starts. No hourly surprises at the end of the project.',
  },
];

export function WhyUs() {
  return (
    <section id="why" className="border-t border-line bg-canvas py-20 md:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Why us"
          title="A small studio, with the standards of a large one."
          copy="You get senior attention on design and code, plus a working relationship that stays simple from the first message to launch day."
        />

        <Stagger className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {reasons.map((r, i) => (
            <StaggerItem key={r.title} className="flex gap-5">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-white/[0.05] text-accent">
                <r.icon className="size-[1.1rem]" strokeWidth={1.6} />
              </span>
              <div>
                <p className="font-mono text-[0.65rem] tracking-[0.12em] text-mute-soft">0{i + 1}</p>
                <h3 className="h3 mt-1.5">{r.title}</h3>
                <p className="mt-2 max-w-sm text-[0.86rem] leading-relaxed text-mute">{r.copy}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
