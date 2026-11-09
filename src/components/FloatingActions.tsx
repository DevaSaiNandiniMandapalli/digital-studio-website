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
          'grid size-10 place-items-center border border-line bg-surface text-ink transition-all duration-300 hover:border-ink',
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
        className="flex items-center gap-2 bg-ink px-4 py-3.5 text-canvas shadow-[0_12px_36px_-18px_rgba(22,26,27,0.9)] transition-colors duration-300 hover:bg-[#2e3a3f] active:bg-[#2e3a3f]"
      >
        <MessageCircle className="size-[1.15rem]" strokeWidth={2.1} />
        <span className="hidden text-[0.78rem] font-semibold sm:inline">Chat on WhatsApp</span>
      </a>
    </div>
  );
}
