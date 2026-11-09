import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { navLinks, site, whatsappMessage } from '../data/site';
import { cn } from '../lib/utils';
import { Logo } from './Logo';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="shell">
          <div
            className={cn(
              'mt-3 flex items-center justify-between gap-4 border border-line bg-surface/92 px-4 py-3 backdrop-blur-md transition-all duration-500 md:px-6',
              scrolled ? 'border-line-strong shadow-[0_10px_30px_-24px_rgba(22,26,27,0.55)]' : 'border-line',
            )}
          >
            <a href="#home" aria-label={`${site.name} — home`} className="shrink-0">
              <Logo />
            </a>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-8">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="link-underline text-[0.72rem] font-medium tracking-[0.14em] text-ink/75 uppercase transition-colors hover:text-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <a
                href="#contact"
                className="btn btn-primary hidden h-11 px-5 text-[0.68rem] lg:inline-flex"
              >
                Let&rsquo;s Talk
                <ArrowUpRight className="size-4" />
              </a>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                aria-expanded={open}
                className="grid size-11 place-items-center border border-line-strong text-ink transition-colors hover:border-ink lg:hidden"
              >
                <Menu className="size-[1.15rem]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-canvas lg:hidden"
            initial={reduce ? undefined : { opacity: 0 }}
            animate={reduce ? undefined : { opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="shell flex items-center justify-between py-6">
              <Logo compact />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid size-11 place-items-center border border-line-strong text-ink"
              >
                <X className="size-[1.15rem]" />
              </button>
            </div>

            <nav aria-label="Mobile" className="shell flex flex-1 flex-col justify-center pb-10">
              <ul className="border-t border-line">
                {navLinks.map((link, i) => (
                  <li key={link.href} className="border-b border-line">
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between py-5"
                    >
                      <span className="font-display text-[1.9rem] font-semibold tracking-[-0.05em] lowercase">
                        {link.label}
                      </span>
                      <span className="text-[0.62rem] tracking-[0.16em] text-mute">
                        0{i + 1}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3">
                <a href="#contact" onClick={() => setOpen(false)} className="btn btn-primary w-full">
                  Start a Project
                  <ArrowUpRight className="size-4" />
                </a>
                <a
                  href={whatsappMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost w-full"
                >
                  Chat on WhatsApp
                </a>
                <p className="pt-2 text-[0.72rem] text-mute">
                  {site.phone} · Hyderabad, India
                </p>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
