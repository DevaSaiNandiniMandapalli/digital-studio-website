import { site } from '../data/site';
import { cn } from '../lib/utils';

export function Logo({ tone = 'light', className }: { tone?: 'light' | 'dark'; className?: string }) {
  return (
    <a
      href="#home"
      aria-label={`${site.name} — home`}
      className={cn(
        'group flex items-center gap-2.5 text-[0.95rem] font-semibold tracking-tight',
        tone === 'dark' ? 'text-ink' : 'text-paper',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'relative grid size-8 place-items-center rounded-[7px] border text-[0.7rem] font-bold tracking-[-0.02em] transition-colors duration-500',
          tone === 'dark'
            ? 'border-ink/15 bg-ink text-lime'
            : 'border-line-strong bg-white/[0.04] text-lime group-hover:bg-lime group-hover:text-ink',
        )}
      >
        {site.shortName}
      </span>
      <span className="whitespace-nowrap">{site.name}</span>
    </a>
  );
}
