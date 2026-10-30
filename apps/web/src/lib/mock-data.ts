// Mock product and category data — replace with real API calls in production

export interface Product {
  id: number;
  slug: string;
  title: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  badge: string | null;
  inStock: boolean;
  prime: boolean;
  image: string;
  images: string[];
  category: string;
  description: string;
  brand: string;
  variants?: { label: string; options: string[] }[];
  specs?: Record<string, string>;
  stockCount?: number;
}

export const PRODUCTS: Product[] = [
  {
    id: 1, slug: 'apple-airpods-pro-2nd-gen',
    title: 'Apple AirPods Pro (2nd Gen)', price: 24999, originalPrice: 29999,
    rating: 4.7, reviews: 12847, badge: 'Best Seller', inStock: true, prime: true,
    category: 'Electronics', brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1588423771073-b8903fead714?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=600&h=600&fit=crop',
    ],
    description: 'AirPods Pro feature up to 2x more Active Noise Cancellation than the previous generation, plus Adaptive Transparency, Personalized Spatial Audio with dynamic head tracking, and an all-new H2 chip.',
    variants: [{ label: 'Color', options: ['White', 'Midnight'] }],
    specs: { 'Chip': 'Apple H2', 'Battery': 'Up to 6 hours', 'Connectivity': 'Bluetooth 5.3', 'Water Resistance': 'IPX4' },
    stockCount: 23,
  },
  {
    id: 2, slug: 'samsung-galaxy-s24-ultra',
    title: 'Samsung Galaxy S24 Ultra', price: 129999, originalPrice: 134999,
    rating: 4.5, reviews: 3421, badge: 'New', inStock: true, prime: true,
    category: 'Electronics', brand: 'Samsung',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&h=600&fit=crop',
    ],
    description: 'The Galaxy S24 Ultra is the ultimate AI smartphone. With the built-in S Pen and Galaxy AI, you can do more than ever before.',
    variants: [
      { label: 'Color', options: ['Titanium Black', 'Titanium Gray', 'Titanium Violet'] },
      { label: 'Storage', options: ['256 GB', '512 GB', '1 TB'] },
    ],
    specs: { 'Display': '6.8" QHD+ Dynamic AMOLED', 'Processor': 'Snapdragon 8 Gen 3', 'RAM': '12 GB', 'Battery': '5000 mAh' },
    stockCount: 8,
  },
  {
    id: 3, slug: 'sony-wh-1000xm5',
    title: 'Sony WH-1000XM5 Headphones', price: 29990, originalPrice: 34990,
    rating: 4.8, reviews: 8921, badge: 'Deal', inStock: true, prime: true,
    category: 'Electronics', brand: 'Sony',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=600&fit=crop',
    ],
    description: 'Industry-leading noise cancellation with 8 microphones and two processors. Up to 30-hour battery life with quick charging.',
    variants: [{ label: 'Color', options: ['Black', 'Silver'] }],
    specs: { 'Driver': '30 mm', 'Battery': '30 hours', 'Connectivity': 'Bluetooth 5.2', 'Weight': '250 g' },
    stockCount: 15,
  },
  {
    id: 4, slug: 'apple-macbook-air-m3',
    title: 'Apple MacBook Air M3', price: 114900, originalPrice: 119900,
    rating: 4.9, reviews: 2156, badge: null, inStock: false, prime: false,
    category: 'Computers', brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop',
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop'],
    description: 'MacBook Air with M3 chip. Supercharged by the next-generation Apple Silicon. Up to 18 hours of battery life.',
    variants: [
      { label: 'Color', options: ['Midnight', 'Starlight', 'Space Gray', 'Silver'] },
      { label: 'Memory', options: ['8 GB', '16 GB', '24 GB'] },
    ],
    specs: { 'Chip': 'Apple M3', 'Display': '13.6" Liquid Retina', 'Battery': '18 hours', 'Weight': '1.24 kg' },
    stockCount: 0,
  },
  {
    id: 5, slug: 'kindle-paperwhite-16gb',
    title: 'Kindle Paperwhite (16 GB)', price: 13999, originalPrice: 16999,
    rating: 4.6, reviews: 45231, badge: 'Best Seller', inStock: true, prime: true,
    category: 'Books & Kindle', brand: 'Amazon',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=600&fit=crop',
    images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=600&fit=crop'],
    description: 'Our thinnest, lightest Kindle Paperwhite ever — with a flush-front design, 7" glare-free display, and weeks of battery life.',
    variants: [{ label: 'Color', options: ['Black', 'Agave Green', 'Denim'] }],
    specs: { 'Display': '7" 300 ppi', 'Storage': '16 GB', 'Battery': 'Up to 12 weeks', 'Waterproof': 'IPX8' },
    stockCount: 50,
  },
  {
    id: 6, slug: 'nike-air-max-270',
    title: 'Nike Air Max 270', price: 9995, originalPrice: 12995,
    rating: 4.4, reviews: 7823, badge: null, inStock: true, prime: false,
    category: 'Fashion', brand: 'Nike',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop'],
    description: 'The Nike Air Max 270 delivers visible cushioning under every step. Updated for modern comfort, it features Nike\'s biggest heel Air unit yet.',
    variants: [
      { label: 'Size', options: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'] },
      { label: 'Color', options: ['Black/White', 'White/Red', 'Blue/Grey'] },
    ],
    specs: { 'Upper': 'Mesh and synthetic', 'Sole': 'Rubber', 'Closure': 'Lace-up', 'Technology': 'Air Max 270' },
    stockCount: 12,
  },
  {
    id: 7, slug: 'instant-pot-duo-7-in-1',
    title: 'Instant Pot Duo 7-in-1', price: 8499, originalPrice: 9999,
    rating: 4.7, reviews: 23456, badge: 'Deal', inStock: true, prime: true,
    category: 'Home & Kitchen', brand: 'Instant Pot',
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&h=600&fit=crop',
    images: ['https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&h=600&fit=crop'],
    description: '7-in-1 multi-use programmable pressure cooker, slow cooker, rice cooker, steamer, sauté, yogurt maker and warmer.',
    variants: [{ label: 'Size', options: ['3 Litre', '5.7 Litre', '8 Litre'] }],
    specs: { 'Capacity': '5.7 L', 'Programs': '14 smart programs', 'Material': 'Stainless steel', 'Wattage': '1000 W' },
    stockCount: 34,
  },
  {
    id: 8, slug: 'lego-technic-bugatti',
    title: 'LEGO Technic Bugatti Chiron', price: 34999, originalPrice: 39999,
    rating: 4.9, reviews: 1234, badge: 'New', inStock: true, prime: true,
    category: 'Toys & Games', brand: 'LEGO',
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&h=600&fit=crop',
    images: ['https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&h=600&fit=crop'],
    description: '3,599 pieces. 1:8 scale model with working W16 engine, gearbox, and rear wing. For ages 16+.',
    specs: { 'Pieces': '3,599', 'Scale': '1:8', 'Age': '16+', 'Dimensions': '56 × 25 × 14 cm' },
    stockCount: 7,
  },
  {
    id: 9, slug: 'dyson-v15-detect',
    title: 'Dyson V15 Detect Vacuum', price: 52900, originalPrice: 59900,
    rating: 4.6, reviews: 4312, badge: 'Deal', inStock: true, prime: true,
    category: 'Home & Kitchen', brand: 'Dyson',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop',
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop'],
    description: 'Laser detects invisible dust. Automatically adapts suction and reports what it has captured on an LCD screen.',
    specs: { 'Suction': '230 AW', 'Battery': '60 min', 'Bin Volume': '0.77 L', 'Weight': '3.1 kg' },
    stockCount: 19,
  },
  {
    id: 10, slug: 'canon-eos-r50',
    title: 'Canon EOS R50 Mirrorless Camera', price: 64990, originalPrice: 74990,
    rating: 4.5, reviews: 987, badge: 'New', inStock: true, prime: false,
    category: 'Electronics', brand: 'Canon',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=600&fit=crop',
    images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=600&fit=crop'],
    description: 'Compact mirrorless camera with 24.2 MP APS-C sensor, 4K video, and RF lens mount.',
    variants: [{ label: 'Kit', options: ['Body Only', 'With 18-45mm Lens'] }],
    specs: { 'Sensor': '24.2 MP APS-C', 'Video': '4K 30p', 'AF Points': '651', 'Weight': '375 g' },
    stockCount: 6,
  },
  {
    id: 11, slug: 'fitbit-charge-6',
    title: 'Fitbit Charge 6 Fitness Tracker', price: 14999, originalPrice: 17999,
    rating: 4.3, reviews: 6543, badge: null, inStock: true, prime: true,
    category: 'Sports & Fitness', brand: 'Fitbit',
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&h=600&fit=crop',
    images: ['https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&h=600&fit=crop'],
    description: 'Built-in GPS, heart rate, SpO2, stress management score, and 6 months of Fitbit Premium.',
    variants: [{ label: 'Color', options: ['Obsidian', 'Coral', 'Porcelain'] }],
    specs: { 'Battery': '7 days', 'Water Resistance': '50 m', 'GPS': 'Built-in', 'Display': 'AMOLED' },
    stockCount: 41,
  },
  {
    id: 12, slug: 'bosch-cordless-drill',
    title: 'Bosch 18V Cordless Drill', price: 7499, originalPrice: 8999,
    rating: 4.5, reviews: 3210, badge: 'Best Seller', inStock: true, prime: false,
    category: 'Tools & Hardware', brand: 'Bosch',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=600&fit=crop',
    images: ['https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=600&fit=crop'],
    description: '18V Li-Ion cordless drill with 2-speed gearbox, 25+1 torque settings, and LED work light.',
    specs: { 'Voltage': '18 V', 'Torque': '55 Nm', 'Chuck': '13 mm', 'Weight': '1.5 kg' },
    stockCount: 28,
  },
];

export const CATEGORIES = [
  { id: 'electronics', label: 'Electronics', icon: '📱', count: 4820 },
  { id: 'computers', label: 'Computers', icon: '💻', count: 1230 },
  { id: 'fashion', label: 'Fashion', icon: '👟', count: 9870 },
  { id: 'home-kitchen', label: 'Home & Kitchen', icon: '🏠', count: 6540 },
  { id: 'books', label: 'Books & Kindle', icon: '📚', count: 3210 },
  { id: 'sports', label: 'Sports & Fitness', icon: '🏃', count: 2340 },
  { id: 'toys', label: 'Toys & Games', icon: '🎮', count: 1890 },
  { id: 'tools', label: 'Tools & Hardware', icon: '🔧', count: 980 },
];

export const HERO_SLIDES = [
  {
    id: 1,
    headline: 'Up to 70% off on Electronics',
    sub: 'Shop the biggest sale of the year. Phones, laptops, audio and more.',
    cta: 'Shop Deals',
    bg: 'from-[#131921] to-[#232F3E]',
    accent: '#FF9900',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=500&fit=crop',
  },
  {
    id: 2,
    headline: 'New Season Fashion Arrivals',
    sub: 'Discover the latest trends in clothing, shoes and accessories.',
    cta: 'Explore Fashion',
    bg: 'from-[#1a0533] to-[#3b0764]',
    accent: '#a855f7',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=500&fit=crop',
  },
  {
    id: 3,
    headline: 'Smart Home, Smarter Living',
    sub: 'Automate your home with the best smart devices on the market.',
    cta: 'Shop Smart Home',
    bg: 'from-[#0c2340] to-[#1a4a7a]',
    accent: '#38bdf8',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, count = 4): Product[] {
  return PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, count);
}

export function getTrendingProducts(count = 8): Product[] {
  return [...PRODUCTS].sort((a, b) => b.reviews - a.reviews).slice(0, count);
}
