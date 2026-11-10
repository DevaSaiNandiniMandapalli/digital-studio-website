import {
  type ReactNode,
  type CSSProperties,
  useRef,
  useCallback,
} from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export function Reveal({
  children,
  delay = 0,
  y = 22,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Card that tilts toward the cursor and tracks a light source. */
export function TiltCard({
  children,
  className = '',
  intensity = 7,
  glow = 'rgba(183,244,90,0.14)',
  style,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
  glow?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (reduce || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      ref.current.style.transform = `perspective(1000px) rotateX(${(0.5 - py) * intensity}deg) rotateY(${(px - 0.5) * intensity}deg) translateZ(0)`;
      ref.current.style.setProperty('--mx', `${px * 100}%`);
      ref.current.style.setProperty('--my', `${py * 100}%`);
      ref.current.style.setProperty('--glow-op', '1');
    },
    [intensity, reduce],
  );

  const onLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    ref.current.style.setProperty('--glow-op', '0');
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`group relative transition-transform duration-300 ease-out will-change-transform ${className}`}
      style={{ ...style, ['--glow' as string]: glow }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-[var(--glow-op)] transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(420px circle at var(--mx,50%) var(--my,50%), var(--glow), transparent 55%)',
        }}
      />
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  light = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: string;
  align?: 'left' | 'center';
  light?: boolean;
}) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-4xl'}>
      {eyebrow && (
        <Reveal>
          <p className={`eyebrow ${light ? 'text-ink/50' : ''}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-lime" />
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.06}>
        <h2
          className={`mt-5 font-display text-[clamp(2rem,5vw,4rem)] font-medium leading-[0.98] tracking-[-0.02em] ${
            light ? 'text-ink' : 'text-paper'
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.12}>
          <p
            className={`mt-6 max-w-2xl text-base leading-relaxed md:text-lg ${
              align === 'center' ? 'mx-auto' : ''
            } ${light ? 'text-ink/65' : 'text-muted'}`}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}

export function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={className} aria-hidden>
      <path d="M2 12L12 2M12 2H4.5M12 2V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
