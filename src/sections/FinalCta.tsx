import { ArrowUpRight, MessageCircle, Phone } from 'lucide-react';
import { site, whatsappMessage } from '../data/site';
import { Reveal } from '../components/Reveal';

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-line bg-night py-20 text-white md:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="grid-floor absolute inset-0 opacity-50" />
        <div className="absolute top-1/2 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/10 spin-slow [transform:rotateX(70deg)]" />
        <div className="absolute top-1/2 left-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5 spin-slow [transform:rotateX(70deg)]" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-accent/12 blur-[130px]"
      />
      <div className="shell relative">
        <Reveal>
          <p className="font-mono text-[0.66rem] tracking-[0.16em] text-white/55 uppercase">
            Ready when you are
          </p>
          <h2 className="display mt-5 max-w-3xl text-white">
            Let's Build Something Worth Remembering.
          </h2>
          <p className="mt-5 max-w-lg text-[0.92rem] leading-relaxed text-white/55">
            Tell us what you do and what you need. We will recommend the right approach, a clear price and a realistic timeline — usually within one business day.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#contact" className="btn btn-accent">
              Start Your Project
              <ArrowUpRight className="size-4" />
            </a>
            <a
              href={whatsappMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn border border-white/20 text-white hover:border-white/50 hover:bg-white/5"
            >
              <MessageCircle className="size-4" />
              Chat on WhatsApp
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-6 text-[0.8rem] text-white/60">
            <a href={`tel:${site.phoneRaw}`} className="inline-flex items-center gap-2 transition-colors hover:text-white">
              <Phone className="size-3.5" />
              {site.phone}
            </a>
            <span>{site.location}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
