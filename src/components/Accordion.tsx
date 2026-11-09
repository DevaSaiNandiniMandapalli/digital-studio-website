import { useId, useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '../lib/utils';

type Item = { q: string; a: string };

export function Accordion({ items, tone = 'dark' }: { items: Item[]; tone?: 'light' | 'dark' }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();
  const dark = tone === 'dark';

  return (
    <div className={cn('border-t', dark ? 'border-ink/10' : 'border-line')}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className={cn('border-b', dark ? 'border-ink/10' : 'border-line')}>
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
                    'text-[0.95rem] font-medium leading-snug tracking-tight transition-colors duration-300 md:text-[1rem]',
                    dark ? 'text-ink group-hover:text-ink/70' : 'text-paper group-hover:text-paper/70',
                  )}
                >
                  {item.q}
                </span>
                <span
                  className={cn(
                    'mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border transition-all duration-300',
                    dark ? 'border-ink/20 text-ink/60' : 'border-line-strong text-mute',
                    isOpen && (dark ? 'rotate-45 border-ink bg-ink text-paper' : 'rotate-45 border-lime bg-lime text-ink'),
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
                    'max-w-2xl pb-6 pr-8 text-[0.875rem] leading-relaxed',
                    dark ? 'text-ink/60' : 'text-mute',
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
