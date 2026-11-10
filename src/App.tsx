import { lazy, Suspense, useEffect, useState } from 'react';
import { Nav } from './components/Nav';
import { Hero } from './components/sections/Hero';
import { Marquee } from './components/sections/Marquee';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { Portfolio } from './components/sections/Portfolio';
import { Blueprint } from './components/sections/Blueprint';
import { Process } from './components/sections/Process';
import { Pricing } from './components/sections/Pricing';
import { Contact } from './components/sections/Contact';
import { FinalCTA } from './components/sections/FinalCTA';
import { Footer } from './components/Footer';
import { useSmoothScroll } from './lib/smooth';
import { useIsMobile, useReducedMotion } from './lib/hooks';

const Atelier = lazy(() =>
  import('./components/scene/Atelier').then((m) => ({ default: m.Atelier })),
);

export default function App() {
  const mobile = useIsMobile();
  const reduce = useReducedMotion();
  const [sceneActive, setSceneActive] = useState(true);
  const [ready, setReady] = useState(false);

  useSmoothScroll(!reduce);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 120);
    return () => clearTimeout(t);
  }, []);

  // The WebGL scene only runs while its sections are on screen.
  useEffect(() => {
    let raf = 0;
    let last = true;
    const check = () => {
      const hero = document.getElementById('top');
      const fin = document.getElementById('final');
      if (hero && fin) {
        const y = window.scrollY;
        const heroEnd = hero.offsetTop + hero.offsetHeight - window.innerHeight * 0.6;
        const finStart = fin.offsetTop - window.innerHeight * 1.1;
        const active = y < heroEnd || y > finStart;
        if (active !== last) {
          last = active;
          setSceneActive(active);
        }
      }
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={`relative min-h-screen bg-ink text-paper transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'}`}>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-lime focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>

      {!reduce && (
        <div className="pointer-events-none fixed inset-0 z-0">
          <Suspense fallback={null}>
            <Atelier mobile={mobile} active={sceneActive} />
          </Suspense>
        </div>
      )}

      <Nav />

      <main className="relative">
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Portfolio />
        <Blueprint />
        <Process />
        <Pricing />
        <Contact />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}
