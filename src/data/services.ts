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
    title: 'Business Website Development',
    shortTitle: 'Business websites',
    description: 'Professional business websites that build trust and generate enquiries.',
    icon: MonitorSmartphone,
  },
  {
    id: 'restaurant-website',
    index: '02',
    title: 'Restaurant & Cafe Websites',
    shortTitle: 'Restaurant sites',
    description: 'Beautiful restaurant websites with menus, galleries, location details and enquiry functionality.',
    icon: UtensilsCrossed,
  },
  {
    id: 'ecommerce',
    index: '03',
    title: 'E-commerce Development',
    shortTitle: 'E-commerce',
    description: 'Online storefronts and product-focused shopping experiences.',
    icon: ShoppingBag,
  },
  {
    id: 'corporate',
    index: '04',
    title: 'Corporate & Startup Websites',
    shortTitle: 'Corporate sites',
    description: 'Professional digital identities for ambitious companies and startups.',
    icon: Building2,
  },
  {
    id: 'portfolio',
    index: '05',
    title: 'Portfolio & Personal Websites',
    shortTitle: 'Portfolio sites',
    description: 'Modern websites for creators, consultants and professionals.',
    icon: UserRound,
  },
  {
    id: 'web-apps',
    index: '06',
    title: 'Custom Web Applications',
    shortTitle: 'Web applications',
    description: 'Custom-built digital platforms, dashboards and business applications.',
    icon: Code2,
  },
];
