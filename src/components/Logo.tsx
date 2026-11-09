import { site } from '../data/site';
import { cn } from '../lib/utils';

type LogoProps = {
  className?: string;
  tone?: 'light' | 'dark';
  showName?: boolean;
};

export function Logo({ className, tone = 'light', showName = true }: LogoProps) {
  const dark = tone === 'dark';
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <span
        className={cn(
          'grid size-8 place-items-center rounded-[0.6rem] text-[0.6rem] font-bold tracking-[0.06em]',
          dark ? 'bg-accent text-[#14210a]' : 'bg-accent text-[#14210a]',
        )}
      >
        {site.shortName}
      </span>
      {showName && (
        <span
          className={cn(
            'font-display text-[0.95rem] font-semibold tracking-[-0.02em]',
            dark ? 'text-white' : 'text-ink',
          )}
        >
          {site.name}
        </span>
      )}
    </span>
  );
}
