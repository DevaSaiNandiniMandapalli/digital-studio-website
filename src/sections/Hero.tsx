import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { site } from '../data/site';
import { projects } from '../data/projects';
import { asset } from '../lib/utils';

const stats = [
  { value: '13', label: 'Live websites' },
  { value: '06', label: 'Industries served' },
  { value: '₹2,999', label: 'Starting price' },
];

export function Hero() {
  const reduce = useReducedMotion();
  const [primary, secondary] = [projects[0], projects[5]];
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] h-[32rem] w-[32rem] rounded-full bg-accent/20 blur-[120px]"
      />
      <div className="shell relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <motion.span {...rise(0)} className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-[0.72rem] font-medium text-mute">
              <span className="size-1.5 rounded-full bg-accent-deep" />
              {site.availability} · Hyderabad, India
            </motion.span>

            <motion.h1 {...rise(0.06)} className="display mt-6 text-ink">
              We build websites
              <br className="hidden sm:block" /> that build{' '}
              <span className="relative whitespace-nowrap">
                businesses
                <svg
                  aria-hidden="true"
                  viewBox="0 0 300 12"
                  preserveAspectRatio="none"
                  className="absolute inset-x-0 -bottom-1 h-[0.42em] w-full text-accent"
                >
                  <path d="M2 8.5C58 3.4 148 2 298 5.6" stroke="currentColor" strokeWidth="7" fill="none" strokeLinecap="round" />
                </svg>
              </span>
              .
            </motion.h1>

            <motion.p {...rise(0.12)} className="lede mt-6">
              Good ideas deserve great websites. We design and develop fast, professional sites for
              restaurants, hotels, retail stores, startups and established companies across India and
              beyond.
            </motion.p>

            <motion.div {...rise(0.18)} className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#contact" className="btn btn-primary">
                {site.cta.primary}
                <ArrowUpRight className="size-4" />
              </a>
              <a href="#work" className="btn btn-ghost">
                {site.cta.secondary}
                <ArrowRight className="size-4" />
              </a>
            </motion.div>

            <motion.dl {...rise(0.24)} className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-[1.35rem] font-semibold tracking-[-0.03em]">{s.value}</dd>
                  <dd className="mt-1 text-[0.72rem] tracking-wide text-mute-soft uppercase">{s.label}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <motion.div
            {...(reduce
              ? {}
              : {
                  initial: { opacity: 0, y: 24 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] as const },
                })}
            className="relative"
          >
            <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_24px_60px_-30px_rgba(21,21,21,0.35)]">
              <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
                <span className="size-1.5 rounded-full bg-line-strong" />
                <span className="size-1.5 rounded-full bg-line-strong" />
                <span className="size-1.5 rounded-full bg-line-strong" />
                <span className="ml-2 truncate rounded-sm bg-canvas px-2 py-0.5 text-[0.6rem] text-mute-soft">
                  {new URL(primary.url).host}
                </span>
              </div>
              <img
                src={asset(primary.image)}
                alt={`${primary.name} website built by ${site.name}`}
                width={1440}
                height={900}
                className="aspect-[16/11] w-full object-cover object-top"
              />
            </div>

            <div className="absolute -bottom-8 -left-4 hidden w-[13.5rem] overflow-hidden rounded-xl border border-line bg-surface shadow-[0_18px_40px_-24px_rgba(21,21,21,0.4)] sm:block">
              <img
                src={asset(secondary.image)}
                alt={`${secondary.name} website built by ${site.name}`}
                width={1440}
                height={900}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover object-top"
              />
              <div className="flex items-center justify-between gap-2 px-3 py-2.5">
                <span className="truncate text-[0.7rem] font-medium">{secondary.name}</span>
                <ArrowUpRight className="size-3 text-mute-soft" />
              </div>
            </div>

            <div className="absolute -top-4 -right-3 hidden items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-[0.68rem] font-medium shadow-sm sm:flex">
              <Sparkles className="size-3 text-accent-deep" />
              Built for real businesses
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
