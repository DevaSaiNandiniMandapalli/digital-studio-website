export type CategoryId =
  | 'all'
  | 'restaurants'
  | 'retail'
  | 'hospitality'
  | 'agriculture'
  | 'food-beverages';

export type Project = {
  id: string;
  index: string;
  name: string;
  category: string;
  categories: Exclude<CategoryId, 'all'>[];
  description: string;
  url: string;
  image: string;
  /** Editorial grid emphasis on large screens. */
  featured?: boolean;
  accent: string;
};

export const categories: { id: CategoryId; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'restaurants', label: 'Restaurants & Cafes' },
  { id: 'retail', label: 'Retail & Lifestyle' },
  { id: 'hospitality', label: 'Hospitality' },
  { id: 'agriculture', label: 'Agriculture' },
  { id: 'food-beverages', label: 'Food & Beverages' },
];

export const projects: Project[] = [
  {
    id: 'kasoori',
    index: '01',
    name: 'Kasoori',
    category: 'Restaurant / Food Business',
    categories: ['restaurants', 'food-beverages'],
    description:
      'A warm, appetite-first restaurant site built around signature dishes, an elegant menu and effortless table enquiries.',
    url: 'https://kasoori-website-demo.vercel.app/',
    image: '/projects/kasoori.jpg',
    featured: true,
    accent: '#E4B363',
  },
  {
    id: 'kapoors-cafe',
    index: '02',
    name: "Kapoor's Cafe",
    category: 'Cafe / Restaurant',
    categories: ['restaurants'],
    description:
      'A characterful cafe experience with a menu-led layout, ambience photography and a clear route to visit.',
    url: 'https://kapoors-cafe-website.vercel.app/',
    image: '/projects/kapoors-cafe.jpg',
    accent: '#D8A16A',
  },
  {
    id: 'siraj-juice',
    index: '03',
    name: "Siraj's International Juice Center",
    category: 'Juice Center / Beverage Business',
    categories: ['food-beverages'],
    description:
      'A vibrant juice-bar identity with a browsable menu, seasonal highlights and store details customers can act on.',
    url: 'https://sirajs-international-juice-center-c.vercel.app/',
    image: '/projects/siraj-juice.jpg',
    accent: '#F2A03D',
  },
  {
    id: 'tarigonda-farm',
    index: '04',
    name: 'Tarigonda Natukollu Farm',
    category: 'Agriculture / Farm Business',
    categories: ['agriculture'],
    description:
      'A trustworthy farm-to-family website presenting produce quality, farming practice and direct ordering.',
    url: 'https://tarigonda-natukollu-farm.vercel.app/',
    image: '/projects/tarigonda-farm.jpg',
    accent: '#9BC46B',
  },
  {
    id: 'juice-bay',
    index: '05',
    name: 'Juice Bay',
    category: 'Juice / Beverage Business',
    categories: ['food-beverages'],
    description:
      'A fresh, energetic beverage site with bold colour blocking, product menus and quick enquiry paths.',
    url: 'https://juice-bay.vercel.app/',
    image: '/projects/juice-bay.jpg',
    accent: '#F4C24E',
  },
  {
    id: 'joyess-lifestyle',
    index: '06',
    name: 'Joyess Lifestyle',
    category: 'Lifestyle / Retail',
    categories: ['retail'],
    description:
      'An editorial lifestyle storefront with a calm, curated layout that puts the products first.',
    url: 'https://joyess-lifestyle-concept.vercel.app/',
    image: '/projects/joyess-lifestyle.jpg',
    featured: true,
    accent: '#C9A6B2',
  },
  {
    id: 'special-9',
    index: '07',
    name: 'Special 9 Restaurant',
    category: 'Restaurant',
    categories: ['restaurants'],
    description:
      'A confident restaurant concept covering menu, story and reservations in one cohesive visual system.',
    url: 'https://special-9-restaurant-concept.vercel.app/',
    image: '/projects/special-9.jpg',
    accent: '#C4553B',
  },
  {
    id: 'fluids-store',
    index: '08',
    name: 'Fluids Store',
    category: 'Retail / E-commerce Concept',
    categories: ['retail'],
    description:
      'A product-led store concept with category browsing, product cards and a checkout-ready structure.',
    url: 'https://fluids-store-demo-ebdd.vercel.app/',
    image: '/projects/fluids-store.jpg',
    accent: '#6FA8DC',
  },
  {
    id: 'grand-4-seasons',
    index: '09',
    name: 'Grand 4 Seasons',
    category: 'Hotel / Hospitality',
    categories: ['hospitality'],
    description:
      'A hospitality website built on atmosphere — rooms, amenities and direct booking enquiries.',
    url: 'https://grand-4-seasons.vercel.app/',
    image: '/projects/grand-4-seasons.jpg',
    featured: true,
    accent: '#B79A6B',
  },
  {
    id: 'chutneys',
    index: '10',
    name: 'Chutneys Hyderabad',
    category: 'Restaurant / Food Business',
    categories: ['restaurants', 'food-beverages'],
    description:
      'A flavour-forward regional restaurant site with a rich menu presentation and local discovery details.',
    url: 'https://chutneys-hyderabad-concept.vercel.app/',
    image: '/projects/chutneys.jpg',
    accent: '#E0A030',
  },
  {
    id: 'balaji-juice',
    index: '11',
    name: 'Balaji Abhishek Juice Centre',
    category: 'Juice Center / Beverage Business',
    categories: ['food-beverages'],
    description:
      'A friendly local juice centre website bringing the menu, prices and shop information online.',
    url: 'https://balaji-abhishek-juice-centre.vercel.app/',
    image: '/projects/balaji-juice.jpg',
    accent: '#E8C547',
  },
  {
    id: 'tara-kitchen',
    index: '12',
    name: 'Tara South Indian Kitchen',
    category: 'Restaurant / South Indian Food',
    categories: ['restaurants'],
    description:
      'A soulful South Indian kitchen site pairing traditional warmth with a clean, modern interface.',
    url: 'https://tara-south-indian-kitchen.vercel.app/',
    image: '/projects/tara-kitchen.jpg',
    accent: '#D08A4E',
  },
  {
    id: 'deccan-waffle',
    index: '13',
    name: 'Deccan Waffle House',
    category: 'Restaurant / Dessert Business',
    categories: ['restaurants', 'food-beverages'],
    description:
      'A playful dessert brand site with a menu showcase and multi-branch information for walk-in customers.',
    url: 'https://deccan-waffle-house.vercel.app/#branches',
    image: '/projects/deccan-waffle.jpg',
    accent: '#C98B5E',
  },
];
