import type { ReactNode } from 'react';
import { useTilt } from '../lib/useTilt';
import { cn } from '../lib/utils';

export function Tilt({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useTilt<HTMLDivElement>();
  return (
    <div ref={ref} className={cn('transition-transform duration-500 ease-out', className)}>
      {children}
    </div>
  );
}
