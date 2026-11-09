import { ArrowUpRight, Phone } from 'lucide-react';
import { navLinks, site, whatsappMessage } from '../data/site';
import { projects } from '../data/projects';
import { Logo } from './Logo';

const serviceLinks = [
  'Business websites',
  'Restaurant & cafe sites',
  'E-commerce',
  'Corporate & startup',
  'Portfolio websites',
];

const legal = [
  { label: 'Privacy policy', href: '/privacy.html' },
  { label: 'Terms of service', href: '/terms.html' },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="shell py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-5 max-w-[26rem] text-[0.86rem] leading-relaxed text-mute">
              {site.description}
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <a
                href={whatsappMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline w-fit text-[0.84rem] text-ink"
              >
                WhatsApp
                <ArrowUpRight className="size-3.5 text-accent" />
              </a>
              <a
                href={`tel:${site.phoneRaw}`}
                className="link-underline w-fit items-center text-[0.84rem] text-ink"
              >
                <Phone className="size-3.5 text-accent" />
                {site.phone}
              </a>
            </div>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <p className="rule-label">Navigate</p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-[0.84rem] text-mute transition-colors hover:text-ink">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contact" className="text-[0.84rem] text-mute transition-colors hover:text-ink">
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          <div className="md:col-span-2">
            <p className="rule-label">Services</p>
            <ul className="mt-4 space-y-2.5">
              {serviceLinks.map((s) => (
                <li key={s} className="text-[0.84rem] text-mute">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="rule-label">Portfolio</p>
            <ul className="mt-4 space-y-2.5">
              {projects.slice(0, 5).map((p) => (
                <li key={p.id}>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.84rem] text-mute transition-colors hover:text-ink"
                  >
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
            <p className="rule-label mt-6">Pricing</p>
            <a href="#pricing" className="mt-3 inline-block text-[0.84rem] text-mute transition-colors hover:text-ink">
              From ₹2,999
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[0.74rem] text-mute">© 2026 Your Digital Studio. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legal.map((l) => (
              <a key={l.href} href={l.href} className="text-[0.74rem] text-mute transition-colors hover:text-ink">
                {l.label}
              </a>
            ))}
            <span className="text-[0.74rem] text-mute">Hyderabad, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
