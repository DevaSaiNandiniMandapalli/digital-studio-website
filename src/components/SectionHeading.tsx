import type { ReactNode } from 'react';
import { cn } from '../lib/utils';

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'between';
  tone?: 'light' | 'dark';
  className?: string;
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'between',
  tone = 'light',
  className,
  id,
}: Props) {
  const dark = tone === 'dark';
  return (
    <div
      className={cn(
        'flex flex-col gap-8',
        align === 'between'
          ? 'lg:flex-row lg:items-end lg:justify-between lg:gap-16'
          : 'max-w-3xl',
        className,
      )}
    >
      <div className="max-w-2xl">
        {eyebrow && (
          <p className={cn('eyebrow mb-5', dark && 'text-ink/50')}>{eyebrow}</p>
        )}
        <h2
          id={id}
          className={cn(
            'text-[clamp(2rem,4.4vw,3.5rem)] leading-[0.98]',
            dark ? 'text-ink' : 'text-paper',
          )}
        >
          {title}
        </h2>
      </div>
      {description && (
        <p
          className={cn(
            'max-w-md text-[0.975rem] leading-relaxed',
            dark ? 'text-ink/60' : 'text-mute',
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
