import { asset } from './lib/asset';

export type Category = 'Restaurants & Cafes' | 'Food & Beverages' | 'Retail & Lifestyle' | 'Hospitality';

export const CATEGORIES: ('All' | Category)[] = [
  'All',
  'Restaurants & Cafes',
  'Food & Beverages',
  'Retail & Lifestyle',
  'Hospitality',
];

export interface Project {
  id: string;
  index: string;
  name: string;
  category: Category;
  url: string;
  shot: string;
  blurb: string;
  kind: 'Studio concept';
  accent: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'kasoori',
    index: '01',
    name: 'Kasoori',
    category: 'Restaurants & Cafes',
    url: 'https://kasoori-website-demo.vercel.app/',
    shot: asset('/shots/kasoori.webp'),
    blurb: 'A refined Indian dining concept with a menu-led narrative and warm, editorial imagery.',
    kind: 'Studio concept',
    accent: '#E0A45C',
  },
  {
    id: 'kapoors-cafe',
    index: '02',
    name: "Kapoor's Cafe",
    category: 'Restaurants & Cafes',
    url: 'https://kapoors-cafe-website.vercel.app/',
    shot: asset('/shots/kapoors-cafe.webp'),
    blurb: 'A friendly neighbourhood cafe identity built around quick browsing and clear calls to visit.',
    kind: 'Studio concept',
    accent: '#C97A5B',
  },
  {
    id: 'sirajs-juice',
    index: '03',
    name: "Siraj's International Juice Center",
    category: 'Food & Beverages',
    url: 'https://sirajs-international-juice-center-c.vercel.app/',
    shot: asset('/shots/sirajs-juice.webp'),
    blurb: 'A vibrant juice bar site with a long menu, freshness cues and mobile-first ordering intent.',
    kind: 'Studio concept',
    accent: '#F0B23E',
  },
  {
    id: 'juice-bay',
    index: '04',
    name: 'Juice Bay',
    category: 'Food & Beverages',
    url: 'https://juice-bay.vercel.app/',
    shot: asset('/shots/juice-bay.webp'),
    blurb: 'A crisp, modern beverage brand experience focused on product clarity and visual energy.',
    kind: 'Studio concept',
    accent: '#7CD6A2',
  },
  {
    id: 'joyess-lifestyle',
    index: '05',
    name: 'Joyess Lifestyle',
    category: 'Retail & Lifestyle',
    url: 'https://joyess-lifestyle-concept.vercel.app/',
    shot: asset('/shots/joyess-lifestyle.webp'),
    blurb: 'A lifestyle retail concept balancing editorial storytelling with a shoppable catalogue.',
    kind: 'Studio concept',
    accent: '#D9A7C0',
  },
  {
    id: 'special-9',
    index: '06',
    name: 'Special 9 Restaurant',
    category: 'Restaurants & Cafes',
    url: 'https://special-9-restaurant-concept.vercel.app/',
    shot: asset('/shots/special-9.webp'),
    blurb: 'A bold multi-cuisine restaurant presence designed to drive reservations and walk-ins.',
    kind: 'Studio concept',
    accent: '#E2705A',
  },
  {
    id: 'fluids-store',
    index: '07',
    name: 'Fluids Store',
    category: 'Retail & Lifestyle',
    url: 'https://fluids-store-demo-ebdd.vercel.app/',
    shot: asset('/shots/fluids-store.webp'),
    blurb: 'A streetwear-forward storefront with strong product framing and a confident visual voice.',
    kind: 'Studio concept',
    accent: '#8FA6FF',
  },
  {
    id: 'grand-4-seasons',
    index: '08',
    name: 'Grand 4 Seasons',
    category: 'Hospitality',
    url: 'https://grand-4-seasons.vercel.app/',
    shot: asset('/shots/grand-4-seasons.webp'),
    blurb: 'A hospitality venue site built to present spaces, events and enquiries with calm confidence.',
    kind: 'Studio concept',
    accent: '#C9B77A',
  },
  {
    id: 'chutneys',
    index: '09',
    name: 'Chutneys Hyderabad',
    category: 'Restaurants & Cafes',
    url: 'https://chutneys-hyderabad-concept.vercel.app/',
    shot: asset('/shots/chutneys.webp'),
    blurb: 'A heritage South Indian brand reimagined with a rich editorial layout and heritage cues.',
    kind: 'Studio concept',
    accent: '#D98B4A',
  },
  {
    id: 'balaji-juice',
    index: '10',
    name: 'Balaji Abhishek Juice Centre',
    category: 'Food & Beverages',
    url: 'https://balaji-abhishek-juice-centre.vercel.app/',
    shot: asset('/shots/balaji-juice.webp'),
    blurb: 'A local juice centre brought online with a clean menu grid and simple ordering pathways.',
    kind: 'Studio concept',
    accent: '#F2C24E',
  },
  {
    id: 'tara-kitchen',
    index: '11',
    name: 'Tara South Indian Kitchen',
    category: 'Restaurants & Cafes',
    url: 'https://tara-south-indian-kitchen.vercel.app/',
    shot: asset('/shots/tara-kitchen.webp'),
    blurb: 'A warm South Indian kitchen concept focused on authenticity, texture and appetite.',
    kind: 'Studio concept',
    accent: '#E4B76A',
  },
  {
    id: 'deccan-waffle',
    index: '12',
    name: 'Deccan Waffle House',
    category: 'Restaurants & Cafes',
    url: 'https://deccan-waffle-house.vercel.app/#branches',
    shot: asset('/shots/deccan-waffle.webp'),
    blurb: 'A playful dessert destination with a bold menu, branch locator and social-first styling.',
    kind: 'Studio concept',
    accent: '#E89B5C',
  },
];

export interface Service {
  index: string;
  title: string;
  body: string;
  span: string;
  tags: string[];
}

export const SERVICES: Service[] = [
  {
    index: '01',
    title: 'Business Websites',
    body: 'Professional digital presence for growing businesses — clear, credible and built to convert enquiries.',
    span: 'md:col-span-3',
    tags: ['One-pagers', 'Multi-page', 'SEO basics'],
  },
  {
    index: '02',
    title: 'Restaurant & Cafe Websites',
    body: 'Menus, galleries, locations and enquiry experiences designed around appetite and footfall.',
    span: 'md:col-span-3',
    tags: ['Menus', 'Galleries', 'WhatsApp orders'],
  },
  {
    index: '03',
    title: 'E-Commerce Websites',
    body: 'Product catalogues and online shopping experiences with fast, responsive browsing.',
    span: 'md:col-span-2',
    tags: ['Catalogues', 'Checkout', 'Payments'],
  },
  {
    index: '04',
    title: 'Corporate & Startup Websites',
    body: 'Professional online identities for companies and entrepreneurs who need to look the part.',
    span: 'md:col-span-2',
    tags: ['Brand sites', 'Investor pages'],
  },
  {
    index: '05',
    title: 'Portfolio Websites',
    body: 'Personal brands, professionals and creative portfolios that put the work first.',
    span: 'md:col-span-2',
    tags: ['Cases', 'Galleries', 'Contact'],
  },
  {
    index: '06',
    title: 'Custom Web Applications',
    body: 'Tailored platforms and business tools — dashboards, bookings and workflow systems.',
    span: 'md:col-span-6',
    tags: ['Dashboards', 'Booking', 'Integrations', 'Automation'],
  },
];

export interface Tier {
  name: string;
  price: string;
  note: string;
  popular?: boolean;
  features: string[];
}

export const TIERS: Tier[] = [
  {
    name: 'Starter Website',
    price: '₹2,999',
    note: 'A sharp, single-page presence to get your business online.',
    features: [
      'One-page website',
      'Up to five content sections',
      'Responsive design',
      'Professional UI',
      'Business information',
      'WhatsApp integration',
      'Basic SEO',
      'Deployment assistance',
    ],
  },
  {
    name: 'Professional Website',
    price: '₹5,999',
    note: 'The complete multi-page website for a growing business.',
    popular: true,
    features: [
      'Up to five pages',
      'Custom UI/UX',
      'Responsive design',
      'Contact forms',
      'WhatsApp integration',
      'Google Maps',
      'Gallery or portfolio',
      'Social media integration',
      'Basic SEO',
      'Modern animations',
      'Deployment assistance',
    ],
  },
  {
    name: 'Premium Website',
    price: '₹8,999',
    note: 'Advanced interactions, richer content and lead capture.',
    features: [
      'Up to eight pages',
      'Premium custom UI/UX',
      'Advanced interactions',
      'Interactive galleries',
      'Advanced enquiry forms',
      'Booking or enquiry functionality',
      'Enhanced SEO',
      'Analytics integration',
      'Lead capture',
      'Performance optimization',
      'Deployment assistance',
    ],
  },
];

export const PRINCIPLES = [
  {
    index: '01',
    title: 'Creative Thinking',
    body: 'Every website should have a distinctive visual identity — not a template with your logo dropped in.',
  },
  {
    index: '02',
    title: 'Modern Engineering',
    body: 'We build responsive, accessible and performance-conscious websites that hold up on real devices.',
  },
  {
    index: '03',
    title: 'Business Understanding',
    body: 'Design around the needs of real businesses and their customers, from the first click to the enquiry.',
  },
];

export const PROCESS = [
  { index: '01', title: 'Discover', body: 'Understand your business, goals and audience.' },
  { index: '02', title: 'Design', body: 'Create a professional design tailored to your brand.' },
  { index: '03', title: 'Develop', body: 'Build, optimize and test your website.' },
  { index: '04', title: 'Launch', body: 'Deploy your website and establish your online presence.' },
];

export const CAPABILITIES = [
  'Web Design',
  'Web Development',
  'Digital Experiences',
  'Responsive Design',
  'E-Commerce',
  'Custom Development',
  'Creative Solutions',
  'Business Websites',
];

export const PHONE = '+91 9392194979';
export const PHONE_RAW = '919392194979';
export const WHATSAPP = 'https://wa.me/919392194979';
export const STUDIO = 'Hyderabad, India';
