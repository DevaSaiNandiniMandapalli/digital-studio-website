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
      <span className="relative grid size-8 place-items-center overflow-hidden rounded-[0.55rem] bg-[linear-gradient(140deg,#38d5ff,#247bff_70%)] text-[0.58rem] font-bold tracking-[0.08em] text-[#04101f] shadow-[0_6px_18px_-8px_rgba(36,123,255,0.9)]">
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-white/70" />
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
