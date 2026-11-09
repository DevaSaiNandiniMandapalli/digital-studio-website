import { useState } from 'react';
import { cn } from '../lib/utils';

type BrowserFrameProps = {
  image: string;
  alt: string;
  url?: string;
  className?: string;
  /** Extra classes for the viewport area (aspect ratio lives here). */
  viewportClassName?: string;
  priority?: boolean;
  hover?: 'zoom' | 'none';
};

/**
 * A slim macOS-style browser chrome around a real site screenshot.
 * Chrome stays fixed; only the screenshot scales on hover.
 */
export function BrowserFrame({
  image,
  alt,
  url,
  className,
  viewportClassName = 'aspect-[16/10]',
  priority = false,
  hover = 'zoom',
}: BrowserFrameProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={cn(
        'frame-shadow relative overflow-hidden border border-line bg-surface',
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-line bg-surface-2/70 px-2.5 py-1.5">
        <span aria-hidden="true" className="flex gap-1">
          <span className="size-[5px] rounded-full bg-[#d8d4c9]" />
          <span className="size-[5px] rounded-full bg-[#d8d4c9]" />
          <span className="size-[5px] rounded-full bg-[#d8d4c9]" />
        </span>
        <span className="min-w-0 flex-1 truncate rounded-[2px] bg-canvas px-2 py-[3px] text-[0.44rem] tracking-[0.02em] text-mute sm:text-[0.5rem]">
          {url ?? 'yourdigitalstudio'}
        </span>
      </div>

      <div className={cn('relative overflow-hidden bg-surface-2', viewportClassName)}>
        {failed ? (
          <div className="grid h-full place-items-center px-4 text-center">
            <span className="font-display text-[0.6rem] tracking-[0.2em] text-mute uppercase">
              {alt}
            </span>
          </div>
        ) : (
          <img
            src={image}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onError={() => setFailed(true)}
            className={cn(
              'h-full w-full object-cover object-top transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
              hover === 'zoom' && 'group-hover:scale-[1.04]',
            )}
          />
        )}
      </div>
    </div>
  );
}
