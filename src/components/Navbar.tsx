import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Menu, MessageCircle, X } from 'lucide-react';
import { navLinks, site, whatsappMessage } from '../data/site';
import { Logo } from './Logo';
import { cn, scrollToId } from '../lib/utils';

const base = import.meta.env.BASE_URL;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#home');
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace('#', ''));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
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

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (window.location.pathname.replace(base, '/') === '/' || window.location.pathname === base) {
      e.preventDefault();
      setOpen(false);
      setTimeout(() => scrollToId(href), open ? 260 : 0);
      history.replaceState(null, '', `${base}${href}`);
    }
  };

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500',
          scrolled
            ? 'border-b border-line bg-ink/80 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <div className="shell flex h-[4.25rem] items-center justify-between gap-4 md:h-[4.75rem]">
          <Logo />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={`${base}${link.href}`}
                    onClick={(e) => handleNav(e, link.href)}
                    className={cn(
                      'relative rounded-full px-3.5 py-2 text-[0.82rem] font-medium transition-colors duration-300',
                      active === link.href
                        ? 'text-paper'
                        : 'text-mute hover:text-paper',
                    )}
                  >
                    {link.label}
                    {active === link.href && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full border border-line bg-white/[0.05]"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`${base}#contact`}
              onClick={(e) => handleNav(e, '#contact')}
              className="btn btn-primary hidden !py-2.5 !text-[0.8rem] sm:inline-flex"
            >
              Let&apos;s Talk
              <ArrowUpRight className="size-4" strokeWidth={2.25} />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="grid size-10 place-items-center rounded-lg border border-line-strong text-paper transition-colors hover:bg-white/5 lg:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-ink lg:hidden"
            initial={reduce ? { opacity: 1 } : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={reduce ? { opacity: 1 } : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="shell flex h-[4.25rem] items-center justify-between">
              <Logo />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid size-10 place-items-center rounded-lg border border-line-strong text-paper"
              >
                <X className="size-5" />
              </button>
            </div>

            <nav aria-label="Mobile" className="shell flex flex-1 flex-col justify-center pb-8">
              <ul className="flex flex-col">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={reduce ? undefined : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.055, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-line"
                  >
                    <a
                      href={`${base}${link.href}`}
                      onClick={(e) => handleNav(e, link.href)}
                      className="flex items-baseline justify-between py-4"
                    >
                      <span className="font-display text-[1.75rem] font-medium tracking-tight text-paper">
                        {link.label}
                      </span>
                      <span className="font-mono text-[0.65rem] text-mute">
                        0{i + 1}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3">
                <a href={`${base}#contact`} onClick={(e) => handleNav(e, '#contact')} className="btn btn-primary w-full">
                  Get Your Website
                  <ArrowUpRight className="size-4" />
                </a>
                <a
                  href={whatsappMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost w-full"
                >
                  <MessageCircle className="size-4" />
                  WhatsApp us
                </a>
                <p className="pt-1 text-center text-xs text-mute">
                  {site.phone} · {site.availability}
                </p>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
