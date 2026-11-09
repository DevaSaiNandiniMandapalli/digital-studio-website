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
    <span className={cn('flex items-start gap-2.5', className)}>
      <span
        className={cn(
          'font-display text-[1.6rem] leading-[0.72] font-bold tracking-[-0.06em] lowercase',
          dark ? 'text-white' : 'text-ink',
        )}
      >
        {site.shortName.toLowerCase()}
        <span aria-hidden="true" className={dark ? 'text-white/45' : 'text-mute-soft'}>
          .
        </span>
      </span>
      {showName && !compact && (
        <span
          aria-hidden="true"
          className={cn(
            'mt-px flex flex-col text-[0.48rem] leading-[1.35] font-medium tracking-[0.18em] uppercase',
            dark ? 'text-white/55' : 'text-mute',
          )}
        >
          <span>Digital</span>
          <span>Studio</span>
        </span>
      )}
    </span>
  );
}
