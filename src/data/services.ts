import {
  Sparkles,
  MonitorSmartphone,
  UtensilsCrossed,
  ShoppingBag,
  UserRound,
  Hotel,
  Building2,
  MousePointerClick,
  RefreshCw,
  Search,
  Code2,
} from 'lucide-react';

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: typeof MonitorSmartphone;
  tags: string[];
};

export const services: Service[] = [
  {
    id: 'business-website',
    title: 'Business Website Development',
    description:
      'A clear, credible online home for your company — services, trust signals and a direct line to enquiries.',
    icon: MonitorSmartphone,
    tags: ['Company profile', 'Lead focused'],
  },
  {
    id: 'restaurant-website',
    title: 'Restaurant & Cafe Websites',
    description:
      'Menus, ambience and location details designed to turn hungry visitors into walk-ins and table enquiries.',
    icon: UtensilsCrossed,
    tags: ['Menu', 'Location'],
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Website Development',
    description:
      'Product catalogues, collections and a checkout flow built around how people actually shop.',
    icon: ShoppingBag,
    tags: ['Catalogue', 'Payments'],
  },
  {
    id: 'portfolio',
    title: 'Portfolio & Personal Websites',
    description:
      'For creators, consultants and professionals who need a presence as sharp as their work.',
    icon: UserRound,
    tags: ['Personal brand', 'Showcase'],
  },
  {
    id: 'hotel',
    title: 'Hotel & Resort Websites',
    description:
      'Rooms, amenities and booking enquiries presented with the atmosphere your property deserves.',
    icon: Hotel,
    tags: ['Rooms', 'Bookings'],
  },
  {
    id: 'corporate',
    title: 'Corporate Websites',
    description:
      'Structured, professional websites for organisations that need clarity across teams and offerings.',
    icon: Building2,
    tags: ['Multi-section', 'Professional'],
  },
  {
    id: 'landing-page',
    title: 'Landing Page Development',
    description:
      'Focused single pages built for a campaign, a launch or a single conversion goal.',
    icon: MousePointerClick,
    tags: ['Conversion', 'Campaigns'],
  },
  {
    id: 'redesign',
    title: 'Website Redesign',
    description:
      'Take an outdated site and rebuild it around modern design, speed and mobile usability.',
    icon: RefreshCw,
    tags: ['Modernise', 'Migration'],
  },
  {
    id: 'seo',
    title: 'SEO & Website Optimization',
    description:
      'Semantic structure, metadata, performance and accessibility — the technical foundation of visibility.',
    icon: Search,
    tags: ['Core Web Vitals', 'Metadata'],
  },
  {
    id: 'ai-automation',
    title: 'AI & Automation Solutions',
    description:
      'Practical automation and AI-assisted tools on custom quotation — enquiry routing, content workflows and internal dashboards.',
    icon: Sparkles,
    tags: ['Custom quote', 'Automation'],
  },
  {
    id: 'web-apps',
    title: 'Custom Web Applications',
    description:
      'Dashboards, portals and internal tools built around your specific operations and workflow.',
    icon: Code2,
    tags: ['Custom logic', 'Dashboards'],
  },
];
