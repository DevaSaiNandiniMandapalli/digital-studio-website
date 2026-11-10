import { useEffect, useState } from 'react';
import { scrollToEl } from '../lib/smooth';
import { setSound } from '../lib/sound';
import { WHATSAPP } from '../data';
import { Arrow } from './ui';

const LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Studio', href: '#studio' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [sound, setSoundOn] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    scrollToEl(href, -70);
  };

  const toggleSound = async () => {
    const next = !sound;
    setSoundOn(next);
    await setSound(next);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled ? 'border-b border-white/[0.06] bg-ink/80 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <nav className="shell flex h-[68px] items-center justify-between md:h-[76px]" aria-label="Primary">
          <button onClick={() => go('#top')} className="group flex items-center gap-3" aria-label="YDS home">
            <span className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 bg-white/[0.03] font-display text-[12px] font-bold tracking-tighter text-lime transition-colors group-hover:border-lime/50">
              YDS
            </span>
            <span className="hidden font-display text-[12px] font-medium uppercase tracking-[0.24em] text-paper/80 sm:block">
              Your Digital Studio
            </span>
          </button>

          <div className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                className="group relative font-display text-[12px] font-medium uppercase tracking-[0.14em] text-paper/65 transition-colors hover:text-paper"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-lime transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleSound}
              aria-pressed={sound}
              aria-label={sound ? 'Mute ambient sound' : 'Enable ambient sound'}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/12 text-paper/70 transition-colors hover:border-white/30 hover:text-paper"
            >
              {sound ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M4 9v6h4l5 4V5L8 9H4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  <path d="M16 8.5a5 5 0 010 7M18.5 6a8.5 8.5 0 010 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M4 9v6h4l5 4V5L8 9H4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  <path d="M17 9l4 6M21 9l-4 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              )}
            </button>
            <button
              onClick={() => go('#contact')}
              className="btn btn-lime hidden !px-5 !py-2.5 !text-[11px] sm:inline-flex"
            >
              Start a project <Arrow />
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/12 text-paper md:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              <span className="relative block h-3 w-4">
                <span className={`absolute left-0 h-px w-4 bg-paper transition-all ${open ? 'top-1.5 rotate-45' : 'top-0.5'}`} />
                <span className={`absolute left-0 h-px w-4 bg-paper transition-all ${open ? 'top-1.5 -rotate-45' : 'top-2.5'}`} />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-ink/97 backdrop-blur-xl transition-opacity duration-300 md:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="flex h-full flex-col justify-between px-6 pb-10 pt-28">
          <div className="flex flex-col gap-1">
            {[...LINKS, { label: 'Contact', href: '#contact' }].map((l, i) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                className="flex items-baseline justify-between border-b border-white/[0.06] py-4 text-left"
              >
                <span className="font-display text-3xl font-medium tracking-tight text-paper">{l.label}</span>
                <span className="font-display text-[11px] text-muted">0{i + 1}</span>
              </button>
            ))}
          </div>
          <div className="space-y-4">
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn btn-ghost w-full">
              Chat on WhatsApp
            </a>
            <p className="text-center text-[11px] uppercase tracking-[0.2em] text-muted">
              Hyderabad, India · Working globally
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
