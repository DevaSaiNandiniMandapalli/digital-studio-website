import { useEffect, useRef } from 'react';

const reduce = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
  window.matchMedia('(pointer: coarse)').matches;

export function useTilt<T extends HTMLElement>(max = 5.5) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce()) return;

    let frame = 0;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.transform = `perspective(1200px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateZ(0)`;
      });
    };

    const out = () => {
      cancelAnimationFrame(frame);
      el.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
    };

    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', out);

    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', out);
    };
  }, [max]);

  return ref;
}
