import { cn } from '../lib/utils';

/** Small bent arrow mark used as a recurring studio glyph. */
export function BentArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn('size-4', className)}
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="square"
    >
      <path d="M4 17V9.5A2.5 2.5 0 0 1 6.5 7H19" />
      <path d="M15 3l4 4-4 4" />
    </svg>
  );
}
