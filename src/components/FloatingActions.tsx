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
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2.5 md:bottom-6 md:right-6">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className={cn(
          'grid size-10 place-items-center rounded-full border border-line-strong bg-ink/80 text-paper backdrop-blur-md transition-all duration-300 hover:border-lime/50 hover:text-lime',
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
        className="group relative flex items-center gap-2 rounded-full bg-[#1faf55] px-4 py-3.5 text-white shadow-[0_10px_40px_-10px_rgba(31,175,85,0.75)] transition-transform duration-300 hover:scale-[1.03] active:scale-95"
      >
        <MessageCircle className="size-5" strokeWidth={2.1} />
        <span className="hidden text-[0.78rem] font-semibold sm:inline">Chat on WhatsApp</span>
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#1faf55]/30 [animation-duration:2.8s]" />
      </a>
    </div>
  );
}
