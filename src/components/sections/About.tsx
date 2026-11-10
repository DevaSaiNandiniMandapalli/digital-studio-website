import { PRINCIPLES } from '../../data';
import { Reveal, SectionHeading, TiltCard } from '../ui';

function PortalMotif() {
  return (
    <TiltCard className="relative aspect-square w-full overflow-hidden rounded-2xl border border-white/[0.07] bg-[radial-gradient(circle_at_50%_45%,rgba(24,42,40,0.9),#0b111a_70%)]" glow="rgba(114,201,255,0.16)">
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id="core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#b7f45a" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#72c9ff" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#72c9ff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="steel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e6edf5" />
            <stop offset="45%" stopColor="#7d8b9c" />
            <stop offset="100%" stopColor="#2c3a4a" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="150" fill="url(#core)" />
        <g fill="none">
          <circle cx="200" cy="200" r="120" stroke="url(#steel)" strokeWidth="2.5" />
          <circle cx="200" cy="200" r="120" stroke="#b7f45a" strokeWidth="1" strokeOpacity="0.65" />
          <circle cx="200" cy="200" r="96" stroke="#72c9ff" strokeOpacity="0.35" strokeWidth="1" />
          <circle
            cx="200"
            cy="200"
            r="150"
            stroke="#a5adba"
            strokeOpacity="0.22"
            strokeWidth="1"
            strokeDasharray="3 10"
          >
            <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="52s" repeatCount="indefinite" />
          </circle>
          <circle
            cx="200"
            cy="200"
            r="175"
            stroke="#8fa6ff"
            strokeOpacity="0.16"
            strokeWidth="1"
            strokeDasharray="1 14"
          >
            <animateTransform attributeName="transform" type="rotate" from="360 200 200" to="0 200 200" dur="70s" repeatCount="indefinite" />
          </circle>
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2;
            const x1 = 200 + Math.cos(a) * 120;
            const y1 = 200 + Math.sin(a) * 120;
            const x2 = 200 + Math.cos(a) * 134;
            const y2 = 200 + Math.sin(a) * 134;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#9aa6b4" strokeOpacity="0.6" strokeWidth="1.5" />;
          })}
        </g>
        <circle cx="200" cy="200" r="70" fill="#080b12" stroke="#b7f45a" strokeOpacity="0.5" />
        <text x="200" y="206" textAnchor="middle" className="fill-paper" style={{ font: '600 20px "Space Grotesk", sans-serif', letterSpacing: '2px' }}>
          YDS
        </text>
      </svg>
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-muted">
        <span>The Digital Atelier</span>
        <span className="text-lime">Est. Hyderabad</span>
      </div>
    </TiltCard>
  );
}

export function About() {
  return (
    <section id="studio" className="section-pad relative z-10 bg-ink">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="The Studio"
              title={
                <>
                  We build more than
                  <br className="hidden sm:block" /> <span className="text-lime">websites.</span>
                </>
              }
              lead="We help businesses establish their digital presence through thoughtful design, modern development and practical technology. Every project starts with understanding the business and ends with a website built around its goals."
            />

            <div className="mt-14 space-y-0">
              {PRINCIPLES.map((p, i) => (
                <Reveal key={p.index} delay={i * 0.08}>
                  <div className="group grid grid-cols-[auto_1fr] gap-5 border-t border-white/[0.08] py-6 transition-colors hover:border-white/20 md:gap-8">
                    <span className="font-display text-xs tracking-[0.2em] text-lime/80">{p.index}</span>
                    <div>
                      <h3 className="font-display text-xl font-medium tracking-tight text-paper md:text-2xl">
                        {p.title}
                      </h3>
                      <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">{p.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 lg:pt-6">
            <Reveal delay={0.1}>
              <PortalMotif />
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-5 grid grid-cols-3 divide-x divide-white/10 rounded-xl border border-white/[0.07] bg-card/50 py-5 text-center">
                {[
                  ['12', 'Projects'],
                  ['5', 'Industries'],
                  ['100%', 'Responsive'],
                ].map(([n, l]) => (
                  <div key={l}>
                    <div className="font-display text-2xl font-medium text-paper">{n}</div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-muted">{l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
