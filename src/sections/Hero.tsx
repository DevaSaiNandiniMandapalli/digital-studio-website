import { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { ArrowRight, ArrowUpRight, Globe2, Layers, Sparkles } from 'lucide-react';
import { site, whatsappMessage } from '../data/site';
import { projects } from '../data/projects';
import { asset } from '../lib/utils';

const DimensionScene = lazy(() => import('../three/DimensionScene'));

function useWebGL() {
  const [supported, setSupported] = useState(false);
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      setSupported(Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl')));
    } catch {
      setSupported(false);
    }
  }, []);
  return supported;
}

function useMedia(query: string, fallback = false) {
  const [matches, setMatches] = useState(fallback);
  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const onChange = () => setMatches(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

/** CSS-only composition used before the scene loads and whenever WebGL is unavailable. */
function StaticScene() {
  const shots = useMemo(() => projects.slice(0, 3), []);
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-x-6 top-1/2 h-64 -translate-y-1/2 rounded-[2rem] border border-line bg-[radial-gradient(70%_60%_at_50%_40%,rgba(36,123,255,0.28),transparent_70%)]" />
      <div className="absolute left-1/2 top-1/2 w-[74%] -translate-x-1/2 -translate-y-[58%] overflow-hidden rounded-xl border border-line bg-surface shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]">
        <div className="flex items-center gap-1.5 border-b border-line bg-white/[0.04] px-3 py-2">
          <span className="size-1.5 rounded-full bg-white/25" />
          <span className="size-1.5 rounded-full bg-white/25" />
          <span className="size-1.5 rounded-full bg-white/25" />
        </div>
        <img src={asset(shots[0]?.image ?? '')} alt="" className="aspect-[16/10] w-full object-cover" />
      </div>
      <div className="absolute bottom-6 right-3 w-[26%] overflow-hidden rounded-[1.1rem] border border-line bg-surface shadow-2xl sm:right-6">
        <img src={asset(shots[1]?.image ?? '')} alt="" className="aspect-[9/17] w-full object-cover" />
      </div>
      <div className="absolute bottom-16 left-2 w-[34%] overflow-hidden rounded-lg border border-line bg-surface shadow-xl sm:left-5">
        <img src={asset(shots[2]?.image ?? '')} alt="" className="aspect-[16/10] w-full object-cover" />
      </div>
    </div>
  );
}

export function Hero() {
  const webgl = useWebGL();
  const reduced = useMedia('(prefers-reduced-motion: reduce)');
  const compact = useMedia('(max-width: 767px)');

  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-14 md:pt-32 md:pb-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-floor absolute inset-0 opacity-60" />
        <div className="absolute -top-40 left-[8%] h-[32rem] w-[32rem] rounded-full bg-[#247bff]/18 blur-[130px]" />
        <div className="absolute top-24 right-[2%] h-[26rem] w-[26rem] rounded-full bg-[#38d5ff]/12 blur-[120px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-canvas" />
      </div>

      <div className="shell grid items-center gap-12 lg:grid-cols-[1.02fr_1fr] lg:gap-8">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.04] px-3 py-1.5 text-[0.66rem] font-semibold tracking-[0.14em] text-mute uppercase backdrop-blur">
            <Sparkles className="size-3.5 text-accent" />
            Digital Design · Development · Innovation
          </span>

          <h1 className="display mt-6 text-[2.6rem] leading-[1.03] sm:text-[3.1rem] lg:text-[3.6rem]">
            We Build Smarter{' '}
            <span className="relative inline-block text-transparent [background:linear-gradient(120deg,#38d5ff,#247bff_65%,#7fb2ff)] [-webkit-background-clip:text] [background-clip:text]">
              Digital Experiences
            </span>
            .
          </h1>

          <p className="mt-6 max-w-lg text-[0.98rem] leading-relaxed text-mute">
            Your business deserves more than an ordinary website. We create powerful digital
            experiences that combine beautiful design, modern technology and business-focused
            functionality.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#contact" className="btn btn-primary">
              Start Your Project
              <ArrowRight className="size-4" />
            </a>
            <a href="#work" className="btn btn-ghost">
              Explore Our Work
              <ArrowUpRight className="size-4" />
            </a>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-6 sm:grid-cols-3">
            {[
              { value: '12+', label: 'Website projects' },
              { value: 'Multiple', label: 'Industries served' },
              { value: '₹2,999', label: 'Starting package' },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-[1.35rem] leading-none font-semibold tracking-[-0.02em] text-ink">
                  {stat.value}
                </dt>
                <dd className="mt-1.5 text-[0.72rem] text-mute-soft">{stat.label}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.74rem] text-mute-soft">
            <span className="inline-flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-accent/70" />
                <span className="relative inline-block size-2 rounded-full bg-accent" />
              </span>
              {site.availability}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Globe2 className="size-3.5" />
              India & worldwide
            </span>
            <a href={whatsappMessage()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 transition-colors hover:text-accent">
              <Layers className="size-3.5" />
              WhatsApp
            </a>
          </div>
        </div>

        <div className="relative h-[22rem] w-full sm:h-[26rem] lg:h-[34rem]">
          <div className="scene absolute inset-0">
            {webgl && !reduced ? (
              <Suspense fallback={<StaticScene />}>
                <DimensionScene compact={compact} reduced={reduced} />
              </Suspense>
            ) : (
              <StaticScene />
            )}
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-canvas" />
        </div>
      </div>
    </section>
  );
}
