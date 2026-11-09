import { Building2, Code2, MonitorSmartphone, ShoppingBag, UserRound, UtensilsCrossed } from 'lucide-react';

export type Service = {
  id: string;
  index: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: typeof MonitorSmartphone;
};

export const services: Service[] = [
  {
    id: 'business-website',
    index: '01',
    title: 'Business Websites',
    shortTitle: 'Business websites',
    description: 'Professional online identities for growing businesses.',
    icon: MonitorSmartphone,
  },
  {
    id: 'restaurant-website',
    index: '02',
    title: 'Restaurant & Cafe Websites',
    shortTitle: 'Restaurant sites',
    description: 'Beautiful menus, galleries, locations and enquiry experiences.',
    icon: UtensilsCrossed,
  },
  {
    id: 'ecommerce',
    index: '03',
    title: 'E-commerce Websites',
    shortTitle: 'E-commerce',
    description: 'Product-focused digital storefronts.',
    icon: ShoppingBag,
  },
  {
    id: 'corporate',
    index: '04',
    title: 'Corporate & Startup Websites',
    shortTitle: 'Corporate sites',
    description: 'Professional websites for companies and entrepreneurs.',
    icon: Building2,
  },
  {
    id: 'portfolio',
    index: '05',
    title: 'Portfolio Websites',
    shortTitle: 'Portfolio sites',
    description: 'Personal brands and professional portfolios.',
    icon: UserRound,
  },
  {
    id: 'web-apps',
    index: '06',
    title: 'Custom Web Applications',
    shortTitle: 'Web applications',
    description: 'Tailored web platforms and business tools.',
    icon: Code2,
  },
];
