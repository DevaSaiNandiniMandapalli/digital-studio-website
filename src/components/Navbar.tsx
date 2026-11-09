import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Menu, MessageCircle, Phone, X } from 'lucide-react';
import { navLinks, site, whatsappMessage } from '../data/site';
import { cn } from '../lib/utils';
import { Logo } from './Logo';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
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
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-all duration-300 sm:px-5 sm:pt-4">
        <div
          className={cn(
            'mx-auto flex h-[3.75rem] max-w-[76rem] items-center justify-between gap-6 rounded-full border px-4 transition-all duration-500 sm:px-5',
            scrolled
              ? 'border-line bg-[#070f1e]/85 shadow-[0_18px_44px_-28px_rgba(0,0,0,0.95)] backdrop-blur-2xl'
              : 'border-line/70 bg-[#091426]/55 backdrop-blur-xl',
          )}
        >
          <a href="#home" aria-label={`${site.name} — home`} className="shrink-0">
            <Logo showName={false} className="lg:hidden" />
            <Logo className="hidden lg:flex" />
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const id = link.href.replace('#', '');
                const isActive = active === id;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={isActive ? 'true' : undefined}
                      className={cn(
                        'relative rounded-full px-3.5 py-2 text-[0.83rem] font-medium transition-colors',
                        isActive ? 'text-ink' : 'text-mute hover:text-ink',
                      )}
                    >
                      {link.label}
                      <span
                        className={cn(
                          'absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-300',
                          isActive ? 'scale-x-100' : 'scale-x-0',
                        )}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a href="#contact" className="btn btn-primary hidden h-10 px-5 text-[0.82rem] lg:inline-flex">
              Get In Touch
              <ArrowUpRight className="size-3.5" />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="grid size-11 place-items-center rounded-full border border-line-strong bg-surface lg:hidden"
            >
              <Menu className="size-[1.1rem]" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] flex flex-col bg-canvas lg:hidden"
          >
            <div className="shell flex h-[4.5rem] items-center justify-between border-b border-line">
              <Logo />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid size-11 place-items-center rounded-full border border-line-strong bg-surface"
              >
                <X className="size-[1.1rem]" />
              </button>
            </div>

            <nav aria-label="Mobile" className="shell flex-1 overflow-y-auto pt-8">
              <ul className="flex flex-col">
                {navLinks.map((link, i) => (
                  <li key={link.href} className="border-b border-line">
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between py-4"
                    >
                      <span className="font-display text-[1.65rem] font-semibold tracking-[-0.03em]">
                        {link.label}
                      </span>
                      <span className="font-mono text-[0.7rem] text-mute-soft">
                        0{i + 1}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3">
                <a href="#contact" onClick={() => setOpen(false)} className="btn btn-primary w-full">
                  Start Your Project
                  <ArrowUpRight className="size-4" />
                </a>
                <a
                  href={whatsappMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost w-full"
                >
                  <MessageCircle className="size-4" />
                  Chat on WhatsApp
                </a>
              </div>

              <div className="mt-8 flex flex-col gap-1 pb-10 text-[0.85rem] text-mute">
                <a href={`tel:${site.phoneRaw}`} className="inline-flex items-center gap-2">
                  <Phone className="size-3.5" />
                  {site.phone}
                </a>
                <p>{site.location}</p>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
