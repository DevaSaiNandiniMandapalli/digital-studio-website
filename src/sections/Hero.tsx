import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Layers, Sparkles, Zap } from 'lucide-react';
import { site } from '../data/site';
import { projects } from '../data/projects';
import { asset } from '../lib/utils';
import { TiltCard } from '../components/TiltCard';

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
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="grid-floor absolute inset-0 opacity-60" />
        <div className="absolute -top-40 right-[-10%] h-[34rem] w-[34rem] rounded-full bg-accent/12 blur-[140px]" />
        <div className="absolute top-24 left-[-15%] h-[26rem] w-[26rem] rounded-full bg-[#7c5cff]/12 blur-[130px]" />
      </div>

      <div className="shell relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
          <div>
            <motion.span
              {...rise(0)}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3 py-1.5 text-[0.72rem] font-medium text-mute backdrop-blur"
            >
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
              </span>
              {site.availability} · Hyderabad, India
            </motion.span>

            <motion.h1 {...rise(0.06)} className="display mt-6">
              We build websites
              <br className="hidden sm:block" /> that build{' '}
              <span className="relative inline-block">
                <span className="text-gradient">businesses</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 300 12"
                  preserveAspectRatio="none"
                  className="absolute inset-x-0 -bottom-1 h-[0.36em] w-full text-accent opacity-80"
                >
                  <path
                    d="M2 8.5C58 3.4 148 2 298 5.6"
                    stroke="currentColor"
                    strokeWidth="5"
                    fill="none"
                    strokeLinecap="round"
                  />
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

            <motion.dl
              {...rise(0.24)}
              className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-6"
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-[1.35rem] font-semibold tracking-[-0.03em]">
                    {s.value}
                  </dd>
                  <dd className="mt-1 text-[0.72rem] tracking-wide text-mute-soft uppercase">
                    {s.label}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <motion.div
            {...(reduce
              ? {}
              : {
                  initial: { opacity: 0, y: 26, rotateX: 8 },
                  animate: { opacity: 1, y: 0, rotateX: 0 },
                  transition: { duration: 1, delay: 0.18, ease: [0.16, 1, 0.3, 1] as const },
                })}
            className="scene relative mx-auto w-full max-w-xl lg:max-w-none"
          >
            <div
              aria-hidden="true"
              className="absolute inset-6 -z-10 rounded-[2rem] bg-accent/10 blur-3xl"
            />

            <div className="preserve-3d lg:[transform:rotateY(-13deg)_rotateX(7deg)_rotateZ(1deg)]">
              <TiltCard max={4} className="preserve-3d">
                <div className="panel overflow-hidden rounded-2xl">
                  <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
                    <span className="size-2 rounded-full bg-[#ff5f57]/70" />
                    <span className="size-2 rounded-full bg-[#febc2e]/70" />
                    <span className="size-2 rounded-full bg-[#28c840]/70" />
                    <span className="ml-2 truncate rounded-sm bg-white/[0.04] px-2 py-0.5 text-[0.6rem] text-mute-soft">
                      {new URL(primary.url).host}
                    </span>
                    <span className="ml-auto hidden items-center gap-1 text-[0.58rem] tracking-wide text-mute-soft uppercase sm:flex">
                      <Layers className="size-3" />
                      Live project
                    </span>
                  </div>
                  <img
                    src={asset(primary.image)}
                    alt={`${primary.name} website built by ${site.name}`}
                    width={1440}
                    height={900}
                    className="aspect-[16/11] w-full object-cover object-top"
                  />
                  <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-3">
                    <div>
                      <p className="text-[0.78rem] font-medium">{primary.name}</p>
                      <p className="text-[0.66rem] text-mute-soft">{primary.category}</p>
                    </div>
                    <a
                      href={primary.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${primary.name} live`}
                      className="grid size-8 place-items-center rounded-full border border-line text-mute transition-colors hover:border-accent hover:text-accent"
                    >
                      <ArrowUpRight className="size-3.5" />
                    </a>
                  </div>
                </div>
              </TiltCard>

              <div className="tilt-lift-sm absolute -bottom-10 -left-3 hidden w-[12.5rem] sm:block lg:-left-10">
                <div className="panel overflow-hidden rounded-xl">
                  <img
                    src={asset(secondary.image)}
                    alt={`${secondary.name} website built by ${site.name}`}
                    width={1440}
                    height={900}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover object-top"
                  />
                  <div className="flex items-center justify-between gap-2 px-3 py-2.5">
                    <span className="truncate text-[0.68rem] font-medium">{secondary.name}</span>
                    <ArrowUpRight className="size-3 text-mute-soft" />
                  </div>
                </div>
              </div>

              <div className="tilt-lift absolute -top-5 -right-2 hidden items-center gap-1.5 rounded-full border border-line bg-white/[0.05] px-3 py-1.5 text-[0.68rem] font-medium backdrop-blur-md sm:flex">
                <Sparkles className="size-3 text-accent" />
                Built for real businesses
              </div>

              <div className="absolute top-1/2 -right-6 hidden flex-col gap-1 rounded-xl border border-line bg-white/[0.05] px-3 py-2 backdrop-blur-md xl:flex">
                <span className="flex items-center gap-1.5 text-[0.62rem] text-mute">
                  <Zap className="size-3 text-accent" />
                  98 / 100 speed
                </span>
                <span className="flex items-center gap-1.5 text-[0.62rem] text-mute">
                  <Layers className="size-3 text-accent" />
                  Mobile-first build
                </span>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-14 left-1/2 hidden h-32 w-[85%] -translate-x-1/2 rounded-[50%] bg-accent/15 blur-3xl lg:block"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
