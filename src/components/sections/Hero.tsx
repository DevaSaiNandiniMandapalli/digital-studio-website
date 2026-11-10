import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ScrollTrigger, scrollToEl } from '../../lib/smooth';
import { scrollState } from '../../lib/scrollState';
import { Arrow } from '../ui';

const SCENES = [
  { n: '01', title: 'Establishing shot', line: 'The Digital Atelier — a studio floating in the dark.' },
  { n: '02', title: 'Camera approach', line: 'Website experiences drift into view around the portal.' },
  { n: '03', title: 'Portal reveal', line: 'The central glass portal begins to open.' },
  { n: '04', title: 'Digital transformation', line: 'Interfaces become objects inside the scene.' },
  { n: '05', title: 'Project reveal', line: 'Real work from real businesses takes the stage.' },
  { n: '06', title: 'Into the work', line: 'The camera settles into the studio below.' },
];

export function Hero() {
  const wrap = useRef<HTMLDivElement>(null);
  const heroCopy = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState(0);
  const [progress, setProgress] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        scrollState.main = p;
        scrollState.phase = 'main';
        if (heroCopy.current) {
          const o = Math.max(0, 1 - p / 0.11);
          heroCopy.current.style.opacity = String(o);
          heroCopy.current.style.transform = `translateY(${-p * 90}px)`;
          heroCopy.current.style.pointerEvents = o < 0.2 ? 'none' : 'auto';
        }
        const idx = Math.min(5, Math.floor(p * 6.2));
        setScene((s) => (s === idx ? s : idx));
        setProgress(p);
      },
    });

    const onMove = (e: PointerEvent) => {
      scrollState.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      scrollState.pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      trigger.kill();
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  const words = ['We turn ideas', 'into', 'digital', 'experiences.'];

  return (
    <section id="top" ref={wrap} className="relative h-[560vh] md:h-[620vh]" aria-label="Introduction">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        {/* atmospheric vignette so text stays readable over the scene */}
        <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(120%_100%_at_12%_45%,rgba(8,11,18,0.92)_0%,rgba(8,11,18,0.55)_38%,transparent_70%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-40 bg-gradient-to-b from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-52 bg-gradient-to-t from-ink to-transparent" />

        <div className="shell relative z-10 w-full pt-24">
          <div ref={heroCopy} className="max-w-2xl will-change-transform">
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="eyebrow"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime" />
              </span>
              Independent Digital Studio · Hyderabad, India
            </motion.p>

            <h1 className="mt-7 font-display text-[clamp(2.6rem,7.4vw,5.6rem)] font-medium leading-[0.92] tracking-[-0.035em] text-paper">
              {words.map((w, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom">
                  <motion.span
                    className={`inline-block ${w === 'digital' ? 'text-lime text-glow-lime' : ''}`}
                    initial={reduce ? false : { y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay: 0.2 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {w}
                    {i < words.length - 1 ? '\u00A0' : ''}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.75 }}
              className="mt-7 max-w-md text-[15px] leading-relaxed text-muted md:text-base"
            >
              Professional websites designed to make your business stand out. We combine creative
              design, modern development and technology to bring your ideas online.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <button onClick={() => scrollToEl('#contact', -60)} className="btn btn-lime">
                Start your project <Arrow />
              </button>
              <button onClick={() => scrollToEl('#work', -60)} className="btn btn-ghost">
                Explore our work
                <Arrow className="rotate-45" />
              </button>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.05 }}
              className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] uppercase tracking-[0.18em] text-muted"
            >
              <span className="inline-flex items-center gap-2 text-paper/80">
                <span className="h-1.5 w-1.5 rounded-full bg-lime shadow-[0_0_10px_2px_rgba(183,244,90,0.6)]" />
                Available for new projects
              </span>
              <span className="hidden h-3 w-px bg-white/15 sm:block" />
              <span>12 projects · multiple industries · starting at ₹2,999</span>
            </motion.div>
          </div>
        </div>

        {/* scene captions */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
          <div className="shell flex items-end justify-between gap-6 pb-7">
            <div className="relative h-16 w-full max-w-sm">
              {SCENES.map((s, i) => (
                <div
                  key={s.n}
                  className={`absolute inset-0 transition-all duration-500 ${
                    i === scene ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-display text-[11px] tracking-[0.2em] text-lime">SCENE {s.n}</span>
                    <span className="h-px flex-1 bg-white/15" />
                  </div>
                  <p className="mt-2 font-display text-sm uppercase tracking-[0.18em] text-paper">
                    {s.title}
                  </p>
                  <p className="mt-1 text-[12px] text-muted">{s.line}</p>
                </div>
              ))}
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <div className="h-px w-28 overflow-hidden bg-white/15">
                <div className="h-full bg-lime transition-[width] duration-150" style={{ width: `${progress * 100}%` }} />
              </div>
              <span className="font-display text-[10px] tracking-[0.2em] text-muted">
                {String(scene + 1).padStart(2, '0')} / 06
              </span>
            </div>
          </div>
        </div>

        {/* scroll hint */}
        <div
          className={`pointer-events-none absolute bottom-24 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 transition-opacity duration-500 md:flex ${
            progress > 0.03 ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <span className="font-display text-[10px] uppercase tracking-[0.3em] text-muted">Scroll</span>
          <span className="relative h-10 w-px overflow-hidden bg-white/20">
            <span className="absolute inset-x-0 top-0 h-4 animate-[scrollLine_1.8s_ease-in-out_infinite] bg-lime" />
          </span>
        </div>
      </div>
    </section>
  );
}
