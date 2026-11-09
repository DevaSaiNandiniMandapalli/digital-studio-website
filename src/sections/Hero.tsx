import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { BentArrow } from '../components/BentArrow';
import { BrowserFrame } from '../components/BrowserFrame';
import { site, whatsappMessage } from '../data/site';

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState(false);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 20, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 60, damping: 20, mass: 0.6 });
  const ax = useTransform(sx, (v) => v * 14);
  const bx = useTransform(sx, (v) => v * -26);
  const by = useTransform(sy, (v) => v * -18);
  const cx = useTransform(sx, (v) => v * 34);
  const cy = useTransform(sy, (v) => v * 26);

  useEffect(() => {
    if (reduce) return;
    setPointer(window.matchMedia('(pointer: fine)').matches);
  }, [reduce]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!pointer || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  const line = (delay: number) => ({
    initial: reduce ? undefined : { y: '110%' },
    animate: reduce ? undefined : { y: '0%' },
    transition: { duration: 1.05, delay, ease },
  });

  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="shell">
        <motion.div
          initial={reduce ? undefined : { opacity: 0 }}
          animate={reduce ? undefined : { opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between border-b border-line pb-4"
        >
          <span className="eyebrow">Independent digital studio — Hyderabad, India</span>
          <span className="hidden items-center gap-2 text-[0.62rem] tracking-[0.16em] text-mute uppercase md:flex">
            <span className="size-1.5 bg-accent" />
            {site.availability}
            <BentArrow className="ml-2 size-3.5 text-mute-soft" />
          </span>
        </motion.div>

        <div
          ref={ref}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className="grid items-start gap-x-8 gap-y-12 pt-10 md:pt-14 lg:grid-cols-12 lg:gap-y-0"
        >
          <div className="lg:col-span-6 xl:col-span-6">
            <h1 className="display">
              <span className="block overflow-hidden">
                <motion.span className="block" {...line(0.05)}>
                  Good ideas.
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span className="block" {...line(0.16)}>
                  Deserve great
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span className="block" {...line(0.27)}>
                  <span className="outline-type">Websites</span>
                  <span aria-hidden="true">.</span>
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={reduce ? undefined : { opacity: 0, y: 18 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease }}
              className="lede mt-7 max-w-[34rem] text-[1.02rem] md:mt-8"
            >
              We design and develop beautiful, high-performing websites that help businesses build
              credibility, attract customers and grow online.
            </motion.p>

            <motion.div
              initial={reduce ? undefined : { opacity: 0, y: 18 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <a href="#contact" className="btn btn-primary">
                Let&rsquo;s build your website
                <ArrowUpRight className="size-4" />
              </a>
              <a href="#work" className="btn btn-ghost">
                Explore our work
                <ArrowDownRight className="size-4" />
              </a>
            </motion.div>

            <motion.div
              initial={reduce ? undefined : { opacity: 0 }}
              animate={reduce ? undefined : { opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.7 }}
              className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line pt-5 text-[0.66rem] tracking-[0.16em] text-mute uppercase md:mt-16"
            >
              <span>Website design</span>
              <span aria-hidden="true" className="text-mute-soft">
                /
              </span>
              <span>Development</span>
              <span aria-hidden="true" className="text-mute-soft">
                /
              </span>
              <span>Digital experiences</span>
            </motion.div>
          </div>

          {/* Stacked card composition */}
          <div className="lg:col-span-6">
            <div className="relative pb-10 lg:-mt-10 lg:ml-6 lg:pb-16">
              <div
                aria-hidden="true"
                className="steel-wash pointer-events-none absolute -inset-x-6 -top-8 bottom-6 opacity-60 lg:-inset-x-10"
              />

              <motion.div
                initial={reduce ? undefined : { opacity: 0, y: 40 }}
                animate={reduce ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease }}
                className="relative mx-auto max-w-[30rem] lg:max-w-none"
              >
                <motion.div
                  style={pointer ? { x: ax, y: by } : undefined}
                  className="relative z-10 w-[92%]"
                >
                  <BrowserFrame
                    image="/projects/kasoori.jpg"
                    alt="Kasoori restaurant website preview"
                    url="kasoori — restaurant"
                    priority
                    viewportClassName="aspect-[16/11] sm:aspect-[16/10]"
                    className="edge-card -rotate-[2.2deg]"
                  />
                </motion.div>

                <motion.div
                  style={pointer ? { x: bx, y: cy } : undefined}
                  className="absolute top-[16%] right-0 z-0 w-[46%] lg:-right-4"
                >
                  <BrowserFrame
                    image="/projects/grand-4-seasons.jpg"
                    alt="Grand 4 Seasons hospitality website preview"
                    url="grand 4 seasons"
                    viewportClassName="aspect-[4/3]"
                    className="edge-card rotate-[3.4deg]"
                  />
                </motion.div>

                <motion.div
                  style={pointer ? { x: cx } : undefined}
                  className="relative z-20 -mt-8 ml-auto w-[62%] sm:-mt-10 lg:-mt-16"
                >
                  <BrowserFrame
                    image="/projects/fluids-store.jpg"
                    alt="Fluids Store e-commerce website preview"
                    url="fluids — e-commerce"
                    viewportClassName="aspect-[4/3]"
                    className="edge-card rotate-[2.4deg]"
                  />
                </motion.div>

                <motion.div
                  initial={reduce ? undefined : { opacity: 0, y: 24 }}
                  animate={reduce ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.6, ease }}
                  style={pointer ? { x: bx, y: by } : undefined}
                  className="plate-dark absolute -bottom-4 left-0 z-30 w-[58%] px-4 py-4 sm:-bottom-8 sm:px-5 sm:py-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="font-display text-[1.35rem] leading-[0.75] font-bold tracking-[-0.06em] text-white lowercase">
                      yds
                      <span aria-hidden="true" className="text-white/40">
                        .
                      </span>
                    </div>
                    <div className="text-right text-[0.44rem] leading-[1.7] tracking-[0.14em] text-white/35 uppercase">
                      <span className="block">Design</span>
                      <span className="block">Build</span>
                      <span className="block">Launch</span>
                    </div>
                  </div>
                  <div className="mt-5 flex items-end justify-between gap-3 text-[0.44rem] leading-[1.7] tracking-[0.12em] text-white/45 uppercase">
                    <span>
                      Hyderabad
                      <br />
                      India — worldwide
                    </span>
                    <span className="text-right">
                      +91 93921 94979
                      <br />
                      wa.me/919392194979
                    </span>
                  </div>
                </motion.div>
              </motion.div>

              <div className="relative z-40 mt-16 hidden items-start gap-3 lg:flex">
                <span aria-hidden="true" className="mt-2 h-px w-8 bg-line-strong" />
                <p className="max-w-[20rem] text-[0.7rem] leading-relaxed tracking-[0.02em] text-mute">
                  A small studio with international standards — design, build and launch handled
                  end to end.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="shell mt-12 md:mt-14">
        <a
          href={whatsappMessage()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border-t border-line pt-5 text-[0.66rem] tracking-[0.16em] text-mute uppercase transition-colors hover:text-accent"
        >
          <span aria-hidden="true" className="size-1.5 bg-accent" />
          Prefer to talk first? WhatsApp the studio
        </a>
      </div>
    </section>
  );
}
