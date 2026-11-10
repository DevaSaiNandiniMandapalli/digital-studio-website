import { asset } from '../../lib/asset';
import { useEffect, useRef } from 'react';
import { ScrollTrigger } from '../../lib/smooth';
import { Reveal, SectionHeading } from '../ui';

export function Blueprint() {
  const stage = useRef<HTMLDivElement>(null);
  const solid = useRef<HTMLDivElement>(null);
  const scan = useRef<HTMLDivElement>(null);
  const readout = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 78%',
      end: 'bottom 62%',
      scrub: 0.6,
      onUpdate: (self) => {
        const p = self.progress;
        if (solid.current) solid.current.style.clipPath = `inset(0 0 ${(1 - p) * 100}% 0)`;
        if (scan.current) scan.current.style.top = `${p * 100}%`;
        if (readout.current) readout.current.textContent = `${Math.round(p * 100)}%`;
      },
    });
    return () => trigger.kill();
  }, []);

  return (
    <section id="process-tech" className="section-pad relative z-10 overflow-hidden border-t border-white/[0.06] bg-ink2">
      <div className="shell">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="The Craft"
              title={
                <>
                  From concept
                  <br className="hidden sm:block" /> to <span className="text-lime">creation.</span>
                </>
              }
              lead="Every project starts as a wireframe and a plan. Then the design fills in, the build takes shape, and the finished website emerges — exactly where the scan passes."
            />
            <div className="mt-10 space-y-4">
              {[
                ['Wireframe', 'Structure, hierarchy and flow — the skeleton of the site.'],
                ['Design pass', 'Type, colour, imagery and motion bring the identity to life.'],
                ['Build & launch', 'Responsive code, tested on real devices, deployed live.'],
              ].map(([t, d], i) => (
                <Reveal key={t} delay={i * 0.08}>
                  <div className="flex gap-4 border-l border-white/10 pl-4">
                    <span className="mt-1 font-display text-[11px] tracking-[0.2em] text-lime/80">0{i + 1}</span>
                    <div>
                      <p className="font-display text-sm uppercase tracking-[0.14em] text-paper">{t}</p>
                      <p className="mt-1 text-[13px] text-muted">{d}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <div
                ref={stage}
                className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/[0.1] bg-[#070b11]"
                style={{ ['--scan-top' as string]: '0%' }}
              >
                {/* blueprint grid backdrop */}
                <div
                  className="absolute inset-0 opacity-[0.5]"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(114,201,255,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(114,201,255,0.09) 1px, transparent 1px)',
                    backgroundSize: '36px 36px',
                  }}
                />

                {/* WIREFRAME layer */}
                <svg viewBox="0 0 600 450" className="absolute inset-0 h-full w-full" aria-hidden>
                  <g stroke="#72c9ff" strokeOpacity="0.55" fill="none" strokeWidth="1.2">
                    <rect x="70" y="46" width="460" height="360" rx="8" strokeDasharray="5 6" />
                    <rect x="94" y="70" width="180" height="14" rx="3" />
                    <rect x="94" y="96" width="120" height="8" rx="3" strokeOpacity="0.45" />
                    <rect x="94" y="138" width="412" height="120" rx="5" />
                    <line x1="94" y1="138" x2="506" y2="258" strokeOpacity="0.22" />
                    <line x1="506" y1="138" x2="94" y2="258" strokeOpacity="0.22" />
                    <rect x="94" y="282" width="128" height="90" rx="5" />
                    <rect x="236" y="282" width="128" height="90" rx="5" />
                    <rect x="378" y="282" width="128" height="90" rx="5" />
                    <circle cx="300" cy="140" r="46" stroke="#b7f45a" strokeOpacity="0.5" strokeDasharray="3 7" />
                  </g>
                  {/* measurement ticks */}
                  <g stroke="#b7f45a" strokeOpacity="0.35">
                    <line x1="70" y1="34" x2="530" y2="34" />
                    <line x1="70" y1="30" x2="70" y2="38" />
                    <line x1="530" y1="30" x2="530" y2="38" />
                  </g>
                  <text x="70" y="26" fill="#b7f45a" fillOpacity="0.7" style={{ font: '10px "Space Grotesk", sans-serif', letterSpacing: '2px' }}>
                    LAYOUT / 1440 GRID
                  </text>
                </svg>

                {/* SOLID finished website, revealed by the scanner */}
                <div
                  ref={solid}
                  className="absolute inset-0"
                  style={{ clipPath: 'inset(0 0 100% 0)' }}
                >
                  <div className="flex h-full flex-col">
                    <div className="flex items-center gap-1.5 border-b border-white/10 bg-[#0c121b] px-3 py-2.5">
                      <span className="h-2 w-2 rounded-full bg-white/20" />
                      <span className="h-2 w-2 rounded-full bg-white/20" />
                      <span className="h-2 w-2 rounded-full bg-white/20" />
                    </div>
                    <img
                      src={asset('/shots/kasoori.webp')}
                      alt="Finished website preview revealed by the blueprint scanner"
                      className="h-full w-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* scanner line */}
                <div ref={scan} className="pointer-events-none absolute inset-x-0 z-20" style={{ top: '0%' }}>
                  <div className="h-px w-full bg-lime shadow-[0_0_22px_2px_rgba(183,244,90,0.8)]" />
                  <div className="h-16 w-full bg-gradient-to-b from-lime/15 to-transparent" />
                  <span className="absolute -top-6 right-3 rounded bg-lime px-2 py-0.5 font-display text-[9px] font-semibold tracking-[0.16em] text-ink">
                    SCANNING
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-muted">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" />
                  Build progress <span ref={readout} className="text-paper">0%</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
