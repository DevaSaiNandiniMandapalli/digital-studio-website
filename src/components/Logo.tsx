import { site } from '../data/site';
import { cn } from '../lib/utils';

type LogoProps = {
  className?: string;
  tone?: 'light' | 'dark';
  showName?: boolean;
  compact?: boolean;
};

export function Logo({ className, tone = 'light', showName = true, compact = false }: LogoProps) {
  const dark = tone === 'dark';
  return (
    <span className={cn('flex items-baseline gap-2', className)}>
      <span
        className={cn(
          'font-display text-[1.15rem] leading-none font-bold tracking-[-0.05em]',
          dark ? 'text-white' : 'text-ink',
        )}
      >
        {site.shortName}
        <span aria-hidden="true" className="text-accent">
          .
        </span>
      </span>
      {showName && !compact && (
        <>
          <span aria-hidden="true" className={cn('h-3 w-px', dark ? 'bg-white/25' : 'bg-line-strong')} />
          <span
            className={cn(
              'text-[0.62rem] font-medium tracking-[0.16em] uppercase',
              dark ? 'text-white/70' : 'text-mute',
            )}
          >
            {site.name}
          </span>
        </>
      )}
    </span>
  );
}
