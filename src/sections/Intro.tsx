import { motion, useReducedMotion } from 'framer-motion';
import { Reveal } from '../components/Reveal';

const ease = [0.16, 1, 0.3, 1] as const;

export function Intro() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-t border-line bg-surface py-20 md:py-28">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-9">
            <Reveal>
              <span className="eyebrow">The studio</span>
            </Reveal>
            <h2 className="font-display mt-6 text-[clamp(1.7rem,3.2vw+0.5rem,3.2rem)] leading-[1.05] font-bold tracking-[-0.045em]">
              <motion.span
                initial={reduce ? undefined : { opacity: 0, y: 24 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.9, ease }}
                className="block"
              >
                We turn business ideas into
              </motion.span>
              <span className="block">
                digital experiences{' '}
                <span className="relative inline-block">
                  <span className="relative z-10">people remember.</span>
                  <motion.span
                    aria-hidden="true"
                    initial={reduce ? undefined : { scaleX: 0 }}
                    whileInView={reduce ? undefined : { scaleX: 1 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 1.1, delay: 0.35, ease }}
                    className="absolute inset-x-0 bottom-[0.12em] z-0 h-[0.16em] origin-left bg-accent/70"
                  />
                </span>
              </span>
            </h2>
          </div>

          <div className="flex items-end lg:col-span-3">
            <Reveal delay={0.15} className="w-full">
              <div className="flex items-start gap-4 border-t border-line pt-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
                <span aria-hidden="true" className="aurora-mark mt-1 size-3 shrink-0 rounded-full" />
                <p className="text-[0.9rem] leading-relaxed text-mute">
                  Your website is often the first impression your business makes. We make sure it is
                  a good one.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
