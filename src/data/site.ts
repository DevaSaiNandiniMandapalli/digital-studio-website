/**
 * Central brand + business configuration.
 * Update this file to rename the studio or change contact details.
 */
export const site = {
  /** Temporary placeholder until the final brand name is supplied. */
  name: 'Your Digital Studio',
  shortName: 'YDS',
  tagline: 'Your Business Deserves More Than Just a Website.',
  description:
    'A freelance website design and development studio building modern, fast and professional websites for businesses across India and beyond.',
  founded: '',
  url: 'https://yourdigitalstudio.example',
  phone: '+91 9392194979',
  phoneRaw: '+919392194979',
  whatsapp: 'https://wa.me/919392194979',
  email: '',
  location: 'Hyderabad, India · Working with clients across India and worldwide',
  availability: 'Available for new projects',
  /** Only real URLs are rendered. Leave empty strings to hide a network. */
  socials: {
    instagram: '',
    linkedin: '',
    x: '',
    github: '',
    behance: '',
    dribbble: '',
  },
  pricing: {
    currency: 'INR',
    symbol: '₹',
    startingAt: 2999,
    note: 'Domain, premium hosting, paid APIs and third-party subscriptions are billed separately.',
  },
  cta: {
    primary: 'Get Your Website',
    secondary: 'Explore Our Work',
  },
} as const;

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Our Work', href: '#work' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
] as const;

export const whatsappMessage = (message = 'Hi! I would like to discuss a website for my business.') =>
  `${site.whatsapp}?text=${encodeURIComponent(message)}`;
