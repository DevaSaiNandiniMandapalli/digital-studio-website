import { PHONE, PHONE_RAW, STUDIO, WHATSAPP } from '../data';
import { scrollToEl } from '../lib/smooth';
import { Arrow } from './ui';

const NAV = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Studio', href: '#studio' },
  { label: 'Contact', href: '#contact' },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.08] bg-ink">
      <div className="shell py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 font-display text-[12px] font-bold tracking-tighter text-lime">
                YDS
              </span>
              <span className="font-display text-[12px] uppercase tracking-[0.22em] text-paper/80">
                Your Digital Studio
              </span>
            </div>
            <p className="mt-5 max-w-sm text-[13px] leading-relaxed text-muted">
              An independent digital design and development studio building websites and digital
              experiences that move businesses forward.
            </p>
            <p className="mt-5 text-[11px] uppercase tracking-[0.16em] text-muted">
              {STUDIO} · Working globally
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted">Navigate</p>
            <ul className="mt-4 grid grid-cols-2 gap-y-2.5 md:grid-cols-1">
              {NAV.map((n) => (
                <li key={n.href}>
                  <button
                    onClick={() => scrollToEl(n.href, -70)}
                    className="inline-block py-1 text-[13px] text-paper/70 transition-colors hover:text-lime"
                  >
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted">Get in touch</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a href={`tel:+${PHONE_RAW}`} className="inline-block py-1 text-[13px] text-paper/70 transition-colors hover:text-lime">
                  {PHONE}
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 py-1 text-[13px] text-paper/70 transition-colors hover:text-lime"
                >
                  WhatsApp <Arrow />
                </a>
              </li>
              <li>
                <button
                  onClick={() => scrollToEl('#contact', -70)}
                  className="inline-flex items-center gap-1.5 py-1 text-[13px] text-paper/70 transition-colors hover:text-lime"
                >
                  Start a project <Arrow />
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/[0.07] pt-6 text-[11px] uppercase tracking-[0.14em] text-muted sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Your Digital Studio. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-lime" />
            THE DIGITAL ATELIER · v2.0
          </p>
        </div>
      </div>
    </footer>
  );
}
