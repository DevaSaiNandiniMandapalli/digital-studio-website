export type Plan = {
  id: 'starter' | 'professional' | 'premium';
  name: string;
  price: number;
  tagline: string;
  description: string;
  badge?: string;
  features: string[];
  highlight: boolean;
};

export const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter Website',
    price: 2999,
    tagline: 'Get online, properly.',
    description: 'Everything you need to establish your business online.',
    features: [
      'Single-page website',
      'Up to 5 content sections',
      'Mobile-responsive design',
      'Professional UI',
      'Business information',
      'Contact details',
      'WhatsApp integration',
      'Basic SEO setup',
      'Deployment assistance',
    ],
    highlight: false,
  },
  {
    id: 'professional',
    name: 'Professional Website',
    price: 5999,
    tagline: 'The studio favourite.',
    description: 'More features, more flexibility and a stronger online presence.',
    badge: 'Most Popular',
    features: [
      'Up to 5 pages',
      'Custom UI/UX',
      'Responsive design',
      'Interactive website sections',
      'Contact form',
      'WhatsApp integration',
      'Google Maps integration',
      'Gallery or portfolio section',
      'Social media integration',
      'Basic SEO',
      'Modern animations',
      'Deployment assistance',
    ],
    highlight: true,
  },
  {
    id: 'premium',
    name: 'Premium Website',
    price: 8999,
    tagline: 'Built to grow.',
    description: 'A feature-rich digital experience for businesses ready to grow.',
    badge: 'Premium',
    features: [
      'Up to 8 pages',
      'Premium custom UI/UX',
      'Advanced animations',
      'Interactive galleries',
      'Advanced enquiry forms',
      'Booking or enquiry functionality',
      'Enhanced SEO setup',
      'Analytics integration',
      'Lead capture features',
      'Performance optimization',
      'Deployment assistance',
    ],
    highlight: false,
  },
];

export const comparison = {
  rows: [
    { label: 'Pages / sections', values: ['1 page · 5 sections', 'Up to 5 pages', 'Up to 8 pages'] },
    { label: 'Custom UI/UX design', values: ['Standard professional UI', 'Yes', 'Premium, fully custom'] },
    { label: 'Mobile-responsive', values: ['Yes', 'Yes', 'Yes'] },
    { label: 'Contact form', values: ['Contact details only', 'Yes', 'Advanced enquiry forms'] },
    { label: 'WhatsApp integration', values: ['Yes', 'Yes', 'Yes'] },
    { label: 'Google Maps', values: ['—', 'Yes', 'Yes'] },
    { label: 'Gallery / portfolio', values: ['—', 'Yes', 'Interactive galleries'] },
    { label: 'Animations', values: ['Subtle', 'Modern', 'Advanced'] },
    { label: 'Booking / enquiry flow', values: ['—', '—', 'Yes'] },
    { label: 'SEO setup', values: ['Basic', 'Basic', 'Enhanced'] },
    { label: 'Analytics', values: ['—', '—', 'Yes'] },
    { label: 'Performance optimization', values: ['Standard', 'Standard', 'Included'] },
    { label: 'Deployment assistance', values: ['Yes', 'Yes', 'Yes'] },
    { label: 'Revision rounds', values: ['2', '3', '4'] },
    { label: 'Estimated delivery', values: ['5–7 days', '10–14 days', '18–25 days'] },
  ],
  columns: ['Starter', 'Professional', 'Premium'],
};

export const pricingRules = [
  'Prices shown are starting packages in Indian Rupees (INR).',
  'Domain registration, premium hosting, paid APIs and third-party subscriptions are billed separately at actual cost.',
  'E-commerce platforms, complex payment integrations, extensive backend systems and custom applications require a separate quotation.',
  'Revision rounds and delivery timelines are confirmed in writing after your project requirements are reviewed.',
  'Additional pages, sections or features beyond the package scope are quoted before any work begins.',
];

export const priceFaqs = [
  {
    q: 'What is included in the ₹2,999 package?',
    a: 'The Starter package is a single-page website with up to five content sections: your business information, services, contact details and a WhatsApp button, plus a professional mobile-responsive design, basic SEO setup and deployment assistance.',
  },
  {
    q: 'Can I upgrade my package later?',
    a: 'Yes. Many clients start with Starter and move up once they know which pages they need. We quote the difference based on the extra pages and features, so you never pay twice for work already delivered.',
  },
  {
    q: 'Will my website work on mobile?',
    a: 'Every package is mobile-first. Layouts are tested across 360px phones, tablets, laptops and large desktop screens, with touch-friendly buttons and no horizontal scrolling.',
  },
  {
    q: 'Do you provide domain and hosting?',
    a: 'We help you choose and connect a domain and hosting, and we handle deployment. Domain registration and premium hosting are charged at actual cost and are not included in the package price.',
  },
  {
    q: 'Can you redesign my existing website?',
    a: 'Yes. Website redesign is one of our core services. We review your current site, keep what works, and rebuild the design, speed and mobile experience around your brand.',
  },
  {
    q: 'Can you build e-commerce websites?',
    a: 'Yes, but e-commerce, payment gateways, inventory and order management sit outside the three advertised packages. They are scoped and quoted separately after we understand your catalogue and fulfilment process.',
  },
  {
    q: 'How long does website development take?',
    a: 'As a guide, Starter takes about 5–7 days, Professional 10–14 days and Premium 18–25 days once all content and requirements are confirmed. Custom work is scheduled after a written scope.',
  },
  {
    q: 'Do you provide website maintenance?',
    a: 'Yes, ongoing maintenance — content updates, small design changes, backups and dependency updates — is available as a separate monthly or per-task arrangement.',
  },
  {
    q: 'How do I get started?',
    a: 'Send us your requirements through the enquiry form or on WhatsApp. We discuss your business, recommend the right package, confirm the scope in writing and then begin with a 50% advance.',
  },
];
