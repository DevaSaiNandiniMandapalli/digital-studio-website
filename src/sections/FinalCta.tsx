import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { site, whatsappMessage } from '../data/site';
import { Reveal } from '../components/Reveal';

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-lime py-20 text-ink md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #0b0c0e 1px, transparent 1px), linear-gradient(to bottom, #0b0c0e 1px, transparent 1px)',
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse 80% 90% at 50% 50%, black, transparent 75%)',
        }}
      />
      <div className="shell relative">
        <Reveal>
          <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-6 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-ink/50">
                Ready when you are
              </p>
              <h2 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-medium uppercase leading-[0.86] tracking-[-0.045em]">
                Your next website
                <br />
                starts <span className="font-serif lowercase italic tracking-[-0.01em]">here.</span>
              </h2>
              <p className="mt-6 max-w-lg text-[0.95rem] leading-relaxed text-ink/60">
                From your first business website to your next big digital idea, let&apos;s create
                something worth remembering.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col lg:pb-2">
              <a href="#contact" className="btn btn-dark w-full justify-center sm:w-auto">
                Start Your Project
                <ArrowUpRight className="size-4" />
              </a>
              <a
                href={whatsappMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-dark w-full justify-center sm:w-auto"
              >
                <MessageCircle className="size-4" />
                Chat on WhatsApp
              </a>
              <p className="text-center text-[0.68rem] text-ink/45 sm:text-left lg:text-center">
                or call {site.phone}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
