import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, MessageCircle } from 'lucide-react';
import { site, whatsappMessage } from '../data/site';
import { projects } from '../data/projects';
import { asset, scrollToId } from '../lib/utils';

const previews = [
  { slug: 'grand-4-seasons', label: 'Hospitality', image: asset(projects[8].image), cls: 'left-0 top-0 w-[74%] rotate-[-4deg]' },
  { slug: 'kasoori', label: 'Restaurant', image: asset(projects[0].image), cls: 'right-0 top-[22%] w-[72%] rotate-[3deg]' },
  { slug: 'joyess-lifestyle', label: 'Retail', image: asset(projects[5].image), cls: 'left-[8%] bottom-0 w-[68%] rotate-[2deg]' },
];

const stats = [
  { value: '13', label: 'Live projects' },
  { value: '06', label: 'Industries served' },
  { value: '₹2,999', label: 'Starting from' },
];

export function Hero() {
  const reduce = useReducedMotion();
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const el = spotRef.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--mx', `${e.clientX}px`);
        el.style.setProperty('--my', `${e.clientY}px`);
      });
    };
    window.addEventListener('pointermove', onMove);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  const ease = [0.16, 1, 0.3, 1] as const;
  const rise = (delay: number) => ({
    initial: reduce ? undefined : { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease },
  });

  return (
    <section id="home" className="relative isolate overflow-hidden pt-[5rem] md:pt-[6rem]">
      <div
        ref={spotRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 hidden md:block"
        style={{
          background:
            'radial-gradient(600px circle at var(--mx, 70%) var(--my, 20%), rgba(201,248,90,0.07), transparent 65%)',
        }}
      />
      <div aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0 -z-20" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] -z-20 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.16),transparent_65%)] blur-2xl"
      />

      <div className="shell grid items-center gap-14 pb-16 pt-10 md:pb-24 md:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-28">
        <div>
          <motion.div {...rise(0.05)} className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.035] py-1.5 pl-2 pr-3.5">
            <span className="grid size-6 place-items-center rounded-full bg-lime/15">
              <span className="status-dot size-1.5 rounded-full bg-lime" />
            </span>
            <span className="text-[0.7rem] font-medium tracking-wide text-paper/80">
              {site.availability}
            </span>
            <span className="h-3 w-px bg-line-strong" />
            <span className="text-[0.7rem] text-mute">India · Remote worldwide</span>
          </motion.div>

          <h1 className="font-display text-[clamp(2.65rem,7.2vw,5.4rem)] font-medium uppercase leading-[0.87] tracking-[-0.045em]">
            <motion.span {...rise(0.12)} className="block">
              We build
            </motion.span>
            <motion.span {...rise(0.2)} className="block">
              digital{' '}
              <span className="font-serif text-[1.04em] font-normal normal-case italic tracking-[-0.01em] text-lime">
                experiences
              </span>
            </motion.span>
            <motion.span {...rise(0.28)} className="block">
              that move
            </motion.span>
            <motion.span {...rise(0.36)} className="block">
              businesses{' '}
              <span className="relative inline-block">
                forward
                <span className="text-lime">.</span>
                <motion.span
                  aria-hidden="true"
                  initial={reduce ? undefined : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.1, delay: 0.9, ease }}
                  className="absolute -bottom-1 left-0 h-[3px] w-full origin-left bg-lime/60 md:-bottom-2 md:h-1"
                />
              </span>
            </motion.span>
          </h1>

          <motion.p {...rise(0.46)} className="mt-7 max-w-xl text-[0.975rem] leading-relaxed text-mute md:text-base">
            From local businesses to ambitious brands, we design and develop beautiful, fast and
            powerful websites that help you grow online.
          </motion.p>

          <motion.div {...rise(0.54)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={`${import.meta.env.BASE_URL}#contact`}
              onClick={(e) => {
                e.preventDefault();
                scrollToId('#contact');
              }}
              className="btn btn-primary w-full sm:w-auto"
            >
              Get Your Website
              <ArrowUpRight className="size-4" strokeWidth={2.25} />
            </a>
            <a
              href={`${import.meta.env.BASE_URL}#work`}
              onClick={(e) => {
                e.preventDefault();
                scrollToId('#work');
              }}
              className="btn btn-ghost w-full sm:w-auto"
            >
              Explore Our Work
              <ArrowDownRight className="size-4" />
            </a>
          </motion.div>

          <motion.dl {...rise(0.62)} className="mt-11 flex max-w-lg divide-x divide-line border-t border-line pt-6">
            {stats.map((s) => (
              <div key={s.label} className="flex-1 pr-4 first:pl-0 [&:not(:first-child)]:pl-5">
                <dt className="order-2 mt-1 text-[0.68rem] uppercase tracking-[0.12em] text-mute">
                  {s.label}
                </dt>
                <dd className="font-display text-xl font-medium text-paper md:text-2xl">{s.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={reduce ? undefined : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease }}
          className="relative mx-auto w-full max-w-[34rem] lg:max-w-none"
        >
          <div className="relative aspect-[5/5.4] w-full sm:aspect-[5/4.7]">
            <div
              aria-hidden="true"
              className="absolute inset-x-[6%] bottom-[12%] top-[12%] rounded-[2rem] bg-gradient-to-br from-lime/[0.12] via-transparent to-violet/[0.14] blur-2xl"
            />
            {previews.map((p, i) => (
              <motion.figure
                key={p.slug}
                initial={reduce ? undefined : { opacity: 0, y: 40, rotate: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 + i * 0.12, ease }}
                className={`group absolute overflow-hidden rounded-lg border border-line-strong bg-ink-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] ${p.cls}`}
                style={
                  reduce
                    ? undefined
                    : { animation: `hero-float ${7 + i}s ease-in-out ${i * 0.6}s infinite` }
                }
              >
                <div className="flex items-center gap-1.5 border-b border-line bg-ink-3/80 px-2.5 py-1.5">
                  <span className="size-1.5 rounded-full bg-white/20" />
                  <span className="size-1.5 rounded-full bg-white/20" />
                  <span className="size-1.5 rounded-full bg-white/20" />
                  <span className="ml-2 truncate rounded-sm bg-white/[0.04] px-1.5 py-0.5 text-[0.5rem] text-mute">
                    {p.label}
                  </span>
                </div>
                <img
                  src={p.image}
                  alt={`${p.label} website preview built by the studio`}
                  width={1440}
                  height={900}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="aspect-[16/10] w-full object-cover object-top"
                />
              </motion.figure>
            ))}

            <motion.div
              initial={reduce ? undefined : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 1.05, ease }}
              className="absolute -left-1 top-[46%] z-10 flex items-center gap-2.5 rounded-lg border border-lime/25 bg-ink/85 px-3 py-2 backdrop-blur-md sm:left-[-4%]"
            >
              <span className="grid size-8 place-items-center rounded-md bg-lime text-ink">
                <MessageCircle className="size-4" />
              </span>
              <span className="leading-tight">
                <span className="block text-[0.68rem] font-semibold text-paper">Live &amp; launched</span>
                <span className="block text-[0.6rem] text-mute">13 client websites</span>
              </span>
            </motion.div>
          </div>

          <motion.div
            initial={reduce ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-2 flex items-center justify-between text-[0.65rem] uppercase tracking-[0.16em] text-mute"
          >
            <span>Selected work · 2024—2026</span>
            <a
              href={whatsappMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-paper/70 transition-colors hover:text-lime"
            >
              Quick enquiry
            </a>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @keyframes hero-float {
          0%, 100% { transform: translateY(0) }
          50% { transform: translateY(-10px) }
        }
        @media (prefers-reduced-motion: reduce) {
          figure { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
