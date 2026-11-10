import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const SculptureCanvas = lazy(() => import('./SculptureCanvas'));

export function Sculpture({ className = '' }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [compact, setCompact] = useState(false);
  const reduce = useReducedMotion() ?? false;

  useEffect(() => {
    const node = host.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '240px' },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setCompact(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return (
    <div ref={host} className={`relative ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(214,96,58,0.16),transparent_62%)]"
      />
      {visible ? (
        <Suspense fallback={null}>
          <SculptureCanvas reduce={reduce} compact={compact} />
        </Suspense>
      ) : null}
    </div>
  );
}
