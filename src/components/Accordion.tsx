import { useId, useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '../lib/utils';

type Item = { q: string; a: string };

export function Accordion({ items, tone = 'light' }: { items: Item[]; tone?: 'light' | 'dark' }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();
  const dark = tone === 'dark';

  return (
    <div className={cn('border-t', dark ? 'border-night-line' : 'border-line')}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className={cn('border-b', dark ? 'border-night-line' : 'border-line')}>
            <h3>
              <button
                type="button"
                id={`${baseId}-trigger-${i}`}
                aria-expanded={isOpen}
                aria-controls={`${baseId}-panel-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-start justify-between gap-6 py-5 text-left"
              >
                <span
                  className={cn(
                    'text-[0.92rem] leading-snug font-medium tracking-[-0.01em] transition-colors duration-300 md:text-[0.98rem]',
                    dark ? 'text-white group-hover:text-white/70' : 'text-ink group-hover:text-mute',
                  )}
                >
                  {item.q}
                </span>
                <span
                  className={cn(
                    'mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border transition-all duration-300',
                    dark
                      ? 'border-white/20 text-white/60'
                      : 'border-line-strong text-mute group-hover:border-ink group-hover:text-ink',
                    isOpen && (dark ? 'rotate-45 border-accent bg-accent text-[#14210a]' : 'rotate-45 border-ink bg-ink text-white'),
                  )}
                >
                  <Plus className="size-3.5" />
                </span>
              </button>
            </h3>
            <div
              id={`${baseId}-panel-${i}`}
              role="region"
              aria-labelledby={`${baseId}-trigger-${i}`}
              className={cn(
                'grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <div className="overflow-hidden">
                <p
                  className={cn(
                    'max-w-2xl pr-8 pb-6 text-[0.86rem] leading-relaxed',
                    dark ? 'text-white/55' : 'text-mute',
                  )}
                >
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
