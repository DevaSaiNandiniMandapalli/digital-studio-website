import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { whatsappMessage } from '../data/site';

const ease = [0.16, 1, 0.3, 1] as const;

export function FinalCta() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-night py-20 text-canvas md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 size-[22rem] rounded-full opacity-25 blur-[90px]"
        style={{ background: 'radial-gradient(circle, #93a7ad, transparent 70%)' }}
      />
      <div className="shell relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <motion.p
              initial={reduce ? undefined : { opacity: 0 }}
              whileInView={reduce ? undefined : { opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 text-[0.64rem] tracking-[0.2em] text-white/45 uppercase"
            >
              <span aria-hidden="true" className="h-px w-8 bg-accent" />
              Next project
            </motion.p>

            <h2 className="mt-6 font-display text-[clamp(2.1rem,5vw+0.5rem,4.9rem)] leading-[0.94] font-bold tracking-[-0.055em] lowercase text-[#efefeb]">
              {['Let’s build something', 'worth remembering.'].map((line, i) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    initial={reduce ? undefined : { y: '110%' }}
                    whileInView={reduce ? undefined : { y: '0%' }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 1, delay: 0.08 * i, ease }}
                    className="block"
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h2>
          </div>

          <div className="lg:col-span-4 lg:pb-3">
            <motion.div
              initial={reduce ? undefined : { opacity: 0, y: 20 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
            >
              <p className="max-w-sm text-[0.92rem] leading-relaxed text-white/55">
                Tell us what you are building. We will tell you exactly how we would make it stand
                out — and what it would cost.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col">
                <a href="#contact" className="btn btn-on-dark">
                  Start your project
                  <ArrowUpRight className="size-4" />
                </a>
                <a
                  href={whatsappMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn border border-white/20 text-white hover:border-white/50"
                >
                  <MessageCircle className="size-4" />
                  Chat on WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/12 pt-6">
          <p className="font-display text-[0.78rem] tracking-[0.16em] text-white/45 uppercase">
            We don&rsquo;t just build websites. We create digital impressions.
          </p>
          <p className="text-[0.7rem] tracking-[0.14em] text-white/35 uppercase">
            Hyderabad · India · Worldwide
          </p>
        </div>
      </div>
    </section>
  );
}
