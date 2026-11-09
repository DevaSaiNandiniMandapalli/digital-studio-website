import { ArrowUpRight, MessageCircle, Phone } from 'lucide-react';
import { navLinks, site, whatsappMessage } from '../data/site';
import { services } from '../data/services';
import { Logo } from './Logo';

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
  const footerServices = services.slice(0, 5);

  return (
    <footer className="border-t border-line bg-canvas pt-14 md:pt-16">
      <div className="shell">
        <div className="grid gap-10 pb-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.1fr] lg:gap-12">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-[0.84rem] leading-relaxed text-mute">
              {site.tagline} A freelance studio designing and building websites for businesses of
              every size.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface py-1.5 pr-3 pl-2.5">
              <span className="size-1.5 rounded-full bg-accent" />
              <span className="text-[0.68rem] text-mute">{site.availability}</span>
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="text-[0.62rem] tracking-[0.16em] text-mute-soft uppercase">Explore</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-[0.84rem] text-ink/70 transition-colors hover:text-ink">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[0.62rem] tracking-[0.16em] text-mute-soft uppercase">Services</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {footerServices.map((s) => (
                <li key={s.id}>
                  <a href="#services" className="text-[0.84rem] text-ink/70 transition-colors hover:text-ink">
                    {s.title}
                  </a>
                </li>
              ))}
              <li>
                <a href="#services" className="text-[0.84rem] font-medium text-ink underline decoration-line-strong underline-offset-4">
                  All services
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-[0.62rem] tracking-[0.16em] text-mute-soft uppercase">Contact</h2>
            <ul className="mt-4 flex flex-col gap-2.5 text-[0.84rem] text-ink/70">
              <li>
                <a href={`tel:${site.phoneRaw}`} className="inline-flex items-center gap-2 transition-colors hover:text-ink">
                  <Phone className="size-3.5 text-mute-soft" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={whatsappMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-ink"
                >
                  <MessageCircle className="size-3.5 text-mute-soft" />
                  WhatsApp
                </a>
              </li>
              {site.email && (
                <li>
                  <a href={`mailto:${site.email}`} className="transition-colors hover:text-ink">
                    {site.email}
                  </a>
                </li>
              )}
            </ul>
            <p className="mt-4 max-w-[16rem] text-[0.78rem] leading-relaxed text-mute-soft">{site.location}</p>
            {socials.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-3">
                {socials.map(([key, label]) => (
                  <li key={key}>
                    <a
                      href={site.socials[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[0.78rem] text-ink/70 hover:text-ink"
                    >
                      {label}
                      <ArrowUpRight className="size-3" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-line py-6 text-[0.72rem] text-mute-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a href={`${base}privacy.html`} className="transition-colors hover:text-ink">
              Privacy Policy
            </a>
            <a href={`${base}terms.html`} className="transition-colors hover:text-ink">
              Terms of Service
            </a>
            <span>Designed &amp; built in Hyderabad, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
