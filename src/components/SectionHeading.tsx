import type { ReactNode } from 'react';
import { cn } from '../lib/utils';
import { Reveal } from './Reveal';

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  copy?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  className?: string;
  action?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = 'left',
  tone = 'light',
  className,
  action,
}: SectionHeadingProps) {
  const dark = tone === 'dark';
  return (
    <Reveal
      className={cn(
        'flex flex-col gap-6 md:flex-row md:flex-wrap md:items-end md:justify-between',
        align === 'center' && 'md:flex-col md:items-center md:text-center',
        className,
      )}
    >
      <div className={cn('max-w-2xl', align === 'center' && 'mx-auto')}>
        <span className={cn('eyebrow', dark && 'text-white/45')}>{eyebrow}</span>
        <h2 className={cn('h2 mt-4', dark ? 'text-white' : 'text-ink')}>{title}</h2>
        {copy && (
          <p className={cn('lede mt-4', dark && 'text-white/60', align === 'center' && 'mx-auto')}>{copy}</p>
        )}
      </div>
      {action && <div className="w-full md:w-auto md:shrink-0">{action}</div>}
    </Reveal>
  );
}
