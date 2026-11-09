import { ArrowUpRight, Mail, MessageCircle, Phone } from 'lucide-react';
import { navLinks, site, whatsappMessage } from '../data/site';
import { services } from '../data/services';
import { Logo } from '../components/Logo';

const socialKeys = [
  ['instagram', 'Instagram'],
  ['linkedin', 'LinkedIn'],
  ['x', 'X'],
  ['github', 'GitHub'],
  ['behance', 'Behance'],
  ['dribbble', 'Dribbble'],
] as const;

const base = import.meta.env.BASE_URL;

export function Footer() {
  const socials = socialKeys.filter(([key]) => site.socials[key]);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ink pt-16 md:pt-20">
      <div className="shell">
        <div className="grid gap-12 pb-14 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr] lg:gap-10">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-[0.86rem] leading-relaxed text-mute">
              {site.description}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-line py-1.5 pl-2 pr-3">
              <span className="status-dot size-1.5 rounded-full bg-lime" />
              <span className="text-[0.68rem] text-mute">{site.availability}</span>
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="text-[0.65rem] uppercase tracking-[0.18em] text-mute/60">Explore</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={`${base}${link.href}`} className="text-[0.85rem] text-paper/75 transition-colors hover:text-lime">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={`${base}#faq`} className="text-[0.85rem] text-paper/75 transition-colors hover:text-lime">
                  FAQ
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Services">
            <h2 className="text-[0.65rem] uppercase tracking-[0.18em] text-mute/60">Services</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {services.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <a href={`${base}#services`} className="text-[0.85rem] text-paper/75 transition-colors hover:text-lime">
                    {s.title.replace(' Development', '')}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[0.65rem] uppercase tracking-[0.18em] text-mute/60">Get in touch</h2>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a href={`tel:${site.phoneRaw}`} className="group flex items-center gap-2.5 text-[0.9rem] text-paper/85 transition-colors hover:text-lime">
                  <Phone className="size-3.5 text-mute" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={whatsappMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 text-[0.9rem] text-paper/85 transition-colors hover:text-lime"
                >
                  <MessageCircle className="size-3.5 text-mute" />
                  WhatsApp
                </a>
              </li>
              {site.email && (
                <li>
                  <a href={`mailto:${site.email}`} className="group flex items-center gap-2.5 text-[0.9rem] text-paper/85 transition-colors hover:text-lime">
                    <Mail className="size-3.5 text-mute" />
                    {site.email}
                  </a>
                </li>
              )}
            </ul>

            {socials.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {socials.map(([key, label]) => (
                  <li key={key}>
                    <a
                      href={site.socials[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-line px-2.5 py-1 text-[0.68rem] text-mute transition-colors hover:border-lime/40 hover:text-lime"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            )}

            <a href={`${base}#contact`} className="mt-7 inline-flex items-center gap-1.5 text-[0.8rem] font-semibold text-lime link-underline">
              Start a project
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-line py-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[0.72rem] text-mute/70">
            © {year} {site.name}. All rights reserved.
          </p>
          <ul className="flex items-center gap-5">
            <li>
              <a href={`${base}privacy.html`} className="text-[0.72rem] text-mute/70 transition-colors hover:text-paper">
                Privacy policy
              </a>
            </li>
            <li>
              <a href={`${base}terms.html`} className="text-[0.72rem] text-mute/70 transition-colors hover:text-paper">
                Terms &amp; conditions
              </a>
            </li>
            <li>
              <a href={`${base}#home`} className="text-[0.72rem] text-mute/70 transition-colors hover:text-paper">
                Back to top ↑
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
