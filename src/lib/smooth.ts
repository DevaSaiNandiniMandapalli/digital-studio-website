import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

export function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.6,
    });

    const onScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onScroll);

    const raf = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    const t = setTimeout(refresh, 600);

    return () => {
      clearTimeout(t);
      window.removeEventListener('load', refresh);
      gsap.ticker.remove(raf);
      lenis?.destroy();
      lenis = null;
    };
  }, [enabled]);
}

export function scrollToEl(target: string, offset = 0) {
  if (lenis) lenis.scrollTo(target, { offset, duration: 1.4 });
  else {
    const el = document.querySelector(target);
    if (el) window.scrollTo({ top: (el as HTMLElement).offsetTop + offset, behavior: 'smooth' });
  }
}

export { gsap, ScrollTrigger };
