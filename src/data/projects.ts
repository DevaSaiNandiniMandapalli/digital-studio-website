export type CategoryId =
  | 'all'
  | 'restaurants'
  | 'food-beverages'
  | 'retail'
  | 'hospitality';

export type Project = {
  id: string;
  index: string;
  name: string;
  category: string;
  categories: Exclude<CategoryId, 'all'>[];
  description: string;
  url: string;
  image: string;
  /** Larger tile in the editorial grid. */
  featured?: boolean;
  /** 'concept' builds are studio concepts, not commissioned client work. */
  type: 'concept' | 'commissioned';
  accent: string;
};

export const categories: { id: CategoryId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'restaurants', label: 'Restaurants & Cafes' },
  { id: 'food-beverages', label: 'Food & Beverages' },
  { id: 'retail', label: 'Retail & Lifestyle' },
  { id: 'hospitality', label: 'Hospitality' },
];

export const projects: Project[] = [
  {
    id: 'kasoori',
    index: '01',
    name: 'Kasoori',
    category: 'Restaurant',
    categories: ['restaurants', 'food-beverages'],
    description:
      'An appetite-first restaurant experience built around signature dishes, an elegant menu and effortless table enquiries.',
    url: 'https://kasoori-website-demo.vercel.app/',
    image: '/projects/kasoori.jpg',
    featured: true,
    type: 'concept',
    accent: '#38D5FF',
  },
  {
    id: 'kapoors-cafe',
    index: '02',
    name: "Kapoor's Cafe",
    category: 'Cafe',
    categories: ['restaurants'],
    description: 'A characterful cafe site with a menu-led layout, ambience photography and a clear route to visit.',
    url: 'https://kapoors-cafe-website.vercel.app/',
    image: '/projects/kapoors-cafe.jpg',
    type: 'concept',
    accent: '#247BFF',
  },
  {
    id: 'siraj-juice',
    index: '03',
    name: "Siraj's International Juice Center",
    category: 'Food & Beverages',
    categories: ['food-beverages'],
    description: 'A colour-rich juice brand site with product highlights, branches and a fast route to order.',
    url: 'https://sirajs-international-juice-center-c.vercel.app/',
    image: '/projects/siraj-juice.jpg',
    type: 'concept',
    accent: '#38D5FF',
  },
  {
    id: 'juice-bay',
    index: '04',
    name: 'Juice Bay',
    category: 'Food & Beverages',
    categories: ['food-beverages'],
    description: 'A crisp, modern juice storefront with a fresh visual system and mobile-first browsing.',
    url: 'https://juice-bay.vercel.app/',
    image: '/projects/juice-bay.jpg',
    type: 'concept',
    accent: '#247BFF',
  },
  {
    id: 'joyess-lifestyle',
    index: '05',
    name: 'Joyess Lifestyle',
    category: 'Retail & Lifestyle',
    categories: ['retail'],
    description: 'A refined lifestyle retail concept where product storytelling leads and the store feels considered.',
    url: 'https://joyess-lifestyle-concept.vercel.app/',
    image: '/projects/joyess-lifestyle.jpg',
    featured: true,
    type: 'concept',
    accent: '#38D5FF',
  },
  {
    id: 'special-9',
    index: '06',
    name: 'Special 9 Restaurant',
    category: 'Restaurant',
    categories: ['restaurants'],
    description: 'A confident restaurant identity with menu sections, gallery moments and enquiry pathways.',
    url: 'https://special-9-restaurant-concept.vercel.app/',
    image: '/projects/special-9.jpg',
    type: 'concept',
    accent: '#247BFF',
  },
  {
    id: 'fluids-store',
    index: '07',
    name: 'Fluids Store',
    category: 'Retail & Lifestyle',
    categories: ['retail'],
    description: 'A retail storefront concept built for product discovery, collections and clean category browsing.',
    url: 'https://fluids-store-demo-ebdd.vercel.app/',
    image: '/projects/fluids-store.jpg',
    type: 'concept',
    accent: '#38D5FF',
  },
  {
    id: 'grand-4-seasons',
    index: '08',
    name: 'Grand 4 Seasons',
    category: 'Hospitality',
    categories: ['hospitality'],
    description: 'A hospitality site with a premium room-led layout, banquet highlights and enquiry-focused flows.',
    url: 'https://grand-4-seasons.vercel.app/',
    image: '/projects/grand-4-seasons.jpg',
    featured: true,
    type: 'concept',
    accent: '#247BFF',
  },
  {
    id: 'chutneys',
    index: '09',
    name: 'Chutneys Hyderabad',
    category: 'Restaurant',
    categories: ['restaurants', 'food-beverages'],
    description: 'A heritage restaurant concept that balances tradition with a clean, modern digital presence.',
    url: 'https://chutneys-hyderabad-concept.vercel.app/',
    image: '/projects/chutneys.jpg',
    type: 'concept',
    accent: '#38D5FF',
  },
  {
    id: 'balaji-juice',
    index: '10',
    name: 'Balaji Abhishek Juice Centre',
    category: 'Food & Beverages',
    categories: ['food-beverages'],
    description: 'A neighbourhood juice centre site focused on freshness, menu clarity and local discovery.',
    url: 'https://balaji-abhishek-juice-centre.vercel.app/',
    image: '/projects/balaji-juice.jpg',
    type: 'concept',
    accent: '#247BFF',
  },
  {
    id: 'tara-kitchen',
    index: '11',
    name: 'Tara South Indian Kitchen',
    category: 'Restaurant',
    categories: ['restaurants'],
    description: 'A warm South Indian kitchen experience with signature dishes, timings and direct enquiries.',
    url: 'https://tara-south-indian-kitchen.vercel.app/',
    image: '/projects/tara-kitchen.jpg',
    type: 'concept',
    accent: '#38D5FF',
  },
  {
    id: 'deccan-waffle',
    index: '12',
    name: 'Deccan Waffle House',
    category: 'Cafe / Desserts',
    categories: ['restaurants', 'food-beverages'],
    description: 'A playful dessert cafe concept with a menu-first layout, branch details and gallery storytelling.',
    url: 'https://deccan-waffle-house.vercel.app/#branches',
    image: '/projects/deccan-waffle.jpg',
    type: 'concept',
    accent: '#247BFF',
  },
];
