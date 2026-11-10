import { useEffect, useRef } from 'react';
import { ScrollTrigger, scrollToEl } from '../../lib/smooth';
import { scrollState } from '../../lib/scrollState';
import { WHATSAPP } from '../../data';
import { Arrow, Reveal } from '../ui';

export function FinalCTA() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        scrollState.final = self.progress;
        scrollState.phase = self.progress > 0.02 ? 'final' : 'main';
      },
      onLeave: () => {
        scrollState.final = 1;
        scrollState.phase = 'final';
      },
      onLeaveBack: () => {
        scrollState.final = 0;
        scrollState.phase = 'main';
      },
    });
    return () => trigger.kill();
  }, []);

  return (
    <section
      ref={ref}
      id="final"
      className="relative z-10 flex min-h-[115svh] flex-col justify-end overflow-hidden"
      aria-label="Closing statement"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(8,11,18,0.96)_0%,rgba(8,11,18,0.55)_38%,transparent_72%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_72%,rgba(8,11,18,0.75),transparent_75%)]" />

      <div className="shell relative z-10 pb-24 pt-40 text-center md:pb-28">
        <Reveal>
          <p className="eyebrow justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-lime" />
            The Digital Atelier
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mx-auto mt-7 max-w-4xl font-display text-[clamp(2.1rem,6vw,4.6rem)] font-medium leading-[0.98] tracking-[-0.03em] text-paper text-balance">
            We don't just build websites.
            <br />
            We build <span className="text-lime text-glow-lime">digital experiences.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mx-auto mt-7 max-w-xl text-sm leading-relaxed text-muted md:text-base">
            If your business deserves a website that actually moves it forward, let's talk. One
            conversation is usually enough to know if we're the right fit.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <button onClick={() => scrollToEl('#contact', -60)} className="btn btn-lime">
              Start your project <Arrow />
            </button>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              Chat on WhatsApp
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.32}>
          <div className="mx-auto mt-16 flex max-w-2xl items-center justify-center gap-3">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/20" />
            <span className="font-display text-[10px] uppercase tracking-[0.3em] text-muted">
              Your Digital Studio
            </span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/20" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
