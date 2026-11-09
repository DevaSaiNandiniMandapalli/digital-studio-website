import { useEffect, useState } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { whatsappMessage } from '../data/site';
import { cn } from '../lib/utils';

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-2.5 md:right-6 md:bottom-6">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className={cn(
          'grid size-10 place-items-center rounded-full border border-line bg-surface text-ink shadow-sm transition-all duration-300 hover:border-ink',
          showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0',
        )}
      >
        <ArrowUp className="size-4" />
      </button>

      <a
        href={whatsappMessage()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="flex items-center gap-2 rounded-full bg-[#1faf55] px-4 py-3.5 text-white shadow-[0_12px_36px_-12px_rgba(31,175,85,0.7)] transition-transform duration-300 hover:scale-[1.03] active:scale-95"
      >
        <MessageCircle className="size-[1.15rem]" strokeWidth={2.1} />
        <span className="hidden text-[0.78rem] font-semibold sm:inline">Chat on WhatsApp</span>
      </a>
    </div>
  );
}
