export const site = {
  name: 'Your Digital Studio',
  shortName: 'YDS',
  tagline: 'We make businesses look better online.',
  supporting:
    'We create distinctive websites for ambitious businesses. From restaurants and retail brands to startups and established companies, we turn ideas into memorable digital experiences.',
  description:
    'An independent website design and development studio in Hyderabad, creating distinctive, high-performing websites for businesses across India and worldwide.',
  url: 'https://devasainandinimandapalli.github.io/digital-studio-website/',
  phone: '+91 9392194979',
  phoneRaw: '+919392194979',
  whatsapp: 'https://wa.me/919392194979',
  email: '',
  location: 'Hyderabad, India',
  clients: 'Working with clients across India and worldwide',
  availability: 'Available for new projects',
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
    primary: 'Start a Project',
    secondary: 'Explore Our Work',
    navCta: "Let's Talk",
  },
} as const;

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
] as const;

export const whatsappMessage = (message = 'Hi! I would like to discuss a website for my business.') =>
  `${site.whatsapp}?text=${encodeURIComponent(message)}`;
