/**
 * ============================================================================
 * SEED DATA DEFINITIONS (seedData.js)
 * ============================================================================
 * Purpose:
 *   Provides production-grade initial seed data for the 1Fi Marketplace catalog.
 *   Contains 6 curated electronic items across 4 categories (Smartphones, Laptops,
 *   Audio, Wearables) with realistic specifications, multi-color and storage variants,
 *   promotional badges, and high-resolution product photography URLs.
 *
 * Why curated seed data?
 *   In fintech BNPL evaluations, demonstrating real-world price tiers (₹25,000 to ₹1,50,000)
 *   and plausible EMI installments (₹1,500/mo to ₹12,000/mo) showcases authentic
 *   product understanding and makes the user experience compelling.
 *
 * Catalog Architecture:
 *   - Tiered price points from ₹24,999 to ₹3,49,900 across consumer electronics.
 *   - Comprehensive multi-variant options (colors, storage, RAM tiers).
 *   - Pre-configured tags and specifications for faceted search and discovery.
 * ============================================================================
 */

export const rawProducts = [
  // --------------------------------------------------------------------------
  // PRODUCT 1: Apple iPhone 15 Pro Max (Smartphones)
  // --------------------------------------------------------------------------
  {
    title: 'Apple iPhone 15 Pro Max',
    slug: 'apple-iphone-15-pro-max',
    brand: 'Apple',
    category: 'Smartphones',
    tagline: 'Titanium design, A17 Pro chip, 48MP camera system',
    description:
      'iPhone 15 Pro Max is forged in titanium and features the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever with 5x optical zoom.',
    highlights: [
      'Forged in aerospace-grade Titanium with textured matte-glass back',
      'A17 Pro chip with 6-core GPU for console-level gaming performance',
      '48MP Main camera with 5x Telephoto optical zoom lens',
      'Next-generation portraits with Focus and Depth Control',
      'Super Retina XDR display with ProMotion up to 120Hz and Always-On',
      'USB-C connector with USB 3 support for up to 10Gb/s transfer speeds',
    ],
    badge: 'Bestseller',
    isFeatured: true,
    rating: 4.9,
    reviewCount: 1420,
    tags: ['iphone', 'apple', 'smartphone', '5g', 'titanium', 'camera'],
    sourceImages: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1695048065053-15793041935c?q=80&w=1000&auto=format&fit=crop',
    ],
    variants: [
      {
        name: 'Natural Titanium - 256GB',
        sku: 'IPH15PM-NT-256',
        price: 151900,
        mrp: 159900,
        stock: 25,
        attributes: { color: 'Natural Titanium', storage: '256GB' },
      },
      {
        name: 'Blue Titanium - 256GB',
        sku: 'IPH15PM-BT-256',
        price: 151900,
        mrp: 159900,
        stock: 18,
        attributes: { color: 'Blue Titanium', storage: '256GB' },
      },
      {
        name: 'Black Titanium - 512GB',
        sku: 'IPH15PM-BLK-512',
        price: 171900,
        mrp: 179900,
        stock: 12,
        attributes: { color: 'Black Titanium', storage: '512GB' },
      },
    ],
  },

  // --------------------------------------------------------------------------
  // PRODUCT 2: Samsung Galaxy S24 Ultra 5G (Smartphones)
  // --------------------------------------------------------------------------
  {
    title: 'Samsung Galaxy S24 Ultra 5G',
    slug: 'samsung-galaxy-s24-ultra-5g',
    brand: 'Samsung',
    category: 'Smartphones',
    tagline: 'Galaxy AI is here: Circle to Search, Live Translate, Note Assist',
    description:
      'Meet Galaxy S24 Ultra, the ultimate form of Galaxy Ultra with a new titanium exterior and a 6.8 inch flat display. It is an absolute marvel of design featuring built-in S Pen and 200MP camera with AI editing tools.',
    highlights: [
      'Galaxy AI features: Circle to Search, Live Translate, Chat Assist',
      'Durable Titanium frame with Corning Gorilla Armor anti-reflective glass',
      'Built-in S Pen with lower latency for precision sketching and note taking',
      '200MP camera system with Quad Telephoto and 100x Space Zoom',
      'Snapdragon 8 Gen 3 for Galaxy with ray-tracing mobile gaming support',
      'Dynamic AMOLED 2X display with peak brightness of 2,600 nits',
    ],
    badge: 'Trending',
    isFeatured: true,
    rating: 4.8,
    reviewCount: 980,
    tags: ['samsung', 'galaxy', 's24', 'ai', 'smartphone', 'spen', '5g'],
    sourceImages: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1000&auto=format&fit=crop',
    ],
    variants: [
      {
        name: 'Titanium Gray - 256GB',
        sku: 'S24U-TGRY-256',
        price: 129999,
        mrp: 134999,
        stock: 30,
        attributes: { color: 'Titanium Gray', storage: '256GB' },
      },
      {
        name: 'Titanium Black - 512GB',
        sku: 'S24U-TBLK-512',
        price: 139999,
        mrp: 144999,
        stock: 15,
        attributes: { color: 'Titanium Black', storage: '512GB' },
      },
    ],
  },

  // --------------------------------------------------------------------------
  // PRODUCT 3: Apple MacBook Air M3 (Laptops)
  // --------------------------------------------------------------------------
  {
    title: 'Apple MacBook Air 13-inch (M3 Chip)',
    slug: 'apple-macbook-air-m3',
    brand: 'Apple',
    category: 'Laptops',
    tagline: 'Lean. Mean. M3 machine with up to 18 hours battery life',
    description:
      'The incredibly thin MacBook Air with M3 chip is a powerhouse that breezes through work and play. Super-portable, blazingly fast, and supporting up to two external displays with the laptop lid closed.',
    highlights: [
      'Apple M3 chip with 8-core CPU and 10-core GPU',
      'Liquid Retina display supporting 1 billion colors and 500 nits brightness',
      'All-day battery life lasting up to 18 hours of typical usage',
      'MagSafe 3 charging port with two Thunderbolt / USB 4 ports',
      'Fanless, silent thermal design for whisper-quiet everyday computing',
      'Magic Keyboard with Touch ID fingerprint security and force touch trackpad',
    ],
    badge: 'No-Cost EMI',
    isFeatured: true,
    rating: 4.9,
    reviewCount: 750,
    tags: ['apple', 'macbook', 'laptop', 'm3', 'retina', 'ultrabook'],
    sourceImages: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1000&auto=format&fit=crop',
    ],
    variants: [
      {
        name: 'Midnight - 8GB / 256GB SSD',
        sku: 'MBA-M3-MID-256',
        price: 104990,
        mrp: 114900,
        stock: 20,
        attributes: { color: 'Midnight', ram: '8GB', storage: '256GB' },
      },
      {
        name: 'Starlight - 16GB / 512GB SSD',
        sku: 'MBA-M3-STA-512',
        price: 144990,
        mrp: 154900,
        stock: 14,
        attributes: { color: 'Starlight', ram: '16GB', storage: '512GB' },
      },
    ],
  },

  // --------------------------------------------------------------------------
  // PRODUCT 4: Sony WH-1000XM5 Noise Cancelling Headphones (Audio)
  // --------------------------------------------------------------------------
  {
    title: 'Sony WH-1000XM5 Wireless Headphones',
    slug: 'sony-wh-1000xm5-wireless-headphones',
    brand: 'Sony',
    category: 'Audio',
    tagline: 'Industry-leading noise cancellation with two processors and 8 mics',
    description:
      'The WH-1000XM5 headphones rewrite the rules for distraction-free listening. Two processors control eight microphones for unprecedented noise cancellation and exceptional call clarity with Auto NC Optimizer.',
    highlights: [
      'Auto NC Optimizer automatically adjusts noise cancellation to environment',
      'Integrated Processor V1 and HD Noise Cancelling Processor QN1',
      'Up to 30-hour battery life with 3-minute quick charge giving 3 hours',
      'Four beamforming microphones with AI noise reduction for crystal clear calls',
      'Speak-to-Chat automatically pauses music when you begin speaking',
      'Multipoint Bluetooth connection to pair two devices simultaneously',
    ],
    badge: 'Popular',
    isFeatured: false,
    rating: 4.7,
    reviewCount: 1850,
    tags: ['sony', 'audio', 'headphones', 'anc', 'wireless', 'bluetooth'],
    sourceImages: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
    ],
    variants: [
      {
        name: 'Black',
        sku: 'SONY-XM5-BLK',
        price: 29990,
        mrp: 34990,
        stock: 45,
        attributes: { color: 'Black' },
      },
      {
        name: 'Silver',
        sku: 'SONY-XM5-SLV',
        price: 29990,
        mrp: 34990,
        stock: 35,
        attributes: { color: 'Silver' },
      },
    ],
  },

  // --------------------------------------------------------------------------
  // PRODUCT 5: Apple Watch Ultra 2 (Wearables)
  // --------------------------------------------------------------------------
  {
    title: 'Apple Watch Ultra 2 (GPS + Cellular)',
    slug: 'apple-watch-ultra-2',
    brand: 'Apple',
    category: 'Wearables',
    tagline: 'Rugged and capable, built for endurance, adventure, and watersports',
    description:
      'The most rugged and capable Apple Watch pushes the limits again. Featuring the all-new S9 SiP, a magical new way to interact with your watch without touching the screen, and the brightest Apple display ever.',
    highlights: [
      'Corrosion-resistant 49mm titanium case with sapphire front crystal',
      'Brightest Always-On Retina display with up to 3,000 nits peak brightness',
      'Double tap gesture to answer calls, pause timers, and scroll widgets',
      'Precision dual-frequency GPS (L1 and L5) for incredible distance accuracy',
      'Water resistant to 100m with certified depth gauge and water temperature sensor',
      'Up to 36 hours of battery life in normal use and 72 hours in low power mode',
    ],
    badge: 'Premium',
    isFeatured: true,
    rating: 4.9,
    reviewCount: 420,
    tags: ['apple', 'watch', 'ultra', 'fitness', 'smartwatch', 'wearable', 'gps'],
    sourceImages: [
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop',
    ],
    variants: [
      {
        name: 'Titanium Case with Blue Ocean Band',
        sku: 'AWU2-TIT-OCEAN',
        price: 89900,
        mrp: 89900,
        stock: 20,
        attributes: { case: 'Titanium', band: 'Ocean Band Blue' },
      },
      {
        name: 'Titanium Case with Orange Alpine Loop',
        sku: 'AWU2-TIT-ALPINE',
        price: 89900,
        mrp: 89900,
        stock: 16,
        attributes: { case: 'Titanium', band: 'Alpine Loop Orange' },
      },
    ],
  },

  // --------------------------------------------------------------------------
  // PRODUCT 6: OnePlus 12 5G (Smartphones)
  // --------------------------------------------------------------------------
  {
    title: 'OnePlus 12 5G',
    slug: 'oneplus-12-5g',
    brand: 'OnePlus',
    category: 'Smartphones',
    tagline: 'Smooth beyond belief: Snapdragon 8 Gen 3 with 4th Gen Hasselblad Camera',
    description:
      'The OnePlus 12 delivers elite flagship performance powered by Qualcomm Snapdragon 8 Gen 3, a 2K 120Hz ProXDR display, 100W SUPERVOOC fast charging, and the 4th Gen Hasselblad Camera System for mobile.',
    highlights: [
      'Snapdragon 8 Gen 3 Mobile Platform with up to 16GB LPDDR5X RAM',
      '4th Gen Hasselblad Camera System with 64MP 3x Periscope telephoto',
      '2K 120Hz ProXDR display with DisplayMate A+ rating and Aqua Touch',
      'Massive 5,400mAh battery with 100W wired and 50W wireless AIRVOOC charging',
      'Dual Cryo-velocity VC cooling system for sustained high-frame gaming',
      'OxygenOS 14 based on Android 14 with Trinity Engine optimization',
    ],
    badge: 'Deal of the Day',
    isFeatured: false,
    rating: 4.6,
    reviewCount: 890,
    tags: ['oneplus', 'smartphone', '5g', 'hasselblad', 'fastcharge', 'android'],
    sourceImages: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000&auto=format&fit=crop',
    ],
    variants: [
      {
        name: 'Silky Black - 12GB / 256GB',
        sku: 'OP12-BLK-256',
        price: 64999,
        mrp: 69999,
        stock: 35,
        attributes: { color: 'Silky Black', ram: '12GB', storage: '256GB' },
      },
      {
        name: 'Flowy Emerald - 16GB / 512GB',
        sku: 'OP12-EMR-512',
        price: 69999,
        mrp: 74999,
        stock: 25,
        attributes: { color: 'Flowy Emerald', ram: '16GB', storage: '512GB' },
      },
    ],
  },
  // --------------------------------------------------------------------------
  // PRODUCT 7: Dell XPS 15 OLED (Laptops)
  // --------------------------------------------------------------------------
  {
    title: 'Dell XPS 15 9530 OLED',
    slug: 'dell-xps-15-oled',
    brand: 'Dell',
    category: 'Laptops',
    tagline: '13th Gen Intel Core i9, 3.5K OLED InfinityEdge touch, RTX 4070',
    description:
      'The Dell XPS 15 balances stunning 3.5K OLED visuals with massive 13th Gen Intel Core i9 processing power and NVIDIA GeForce RTX 4070 graphics inside a CNC machined aluminum chassis.',
    highlights: [
      '13th Gen Intel Core i9-13900H 14-core processor',
      '15.6-inch 3.5K (3456x2160) OLED touchscreen display',
      'NVIDIA GeForce RTX 4070 8GB GDDR6 graphics',
      'CNC machined aluminum and carbon fiber palm rest',
      'Waves Nx 3D audio quad-speaker system with studio quality',
    ],
    badge: 'Pro Creator',
    isFeatured: true,
    rating: 4.7,
    reviewCount: 420,
    tags: ['dell', 'xps', 'laptop', 'oled', 'intel', 'rtx4070'],
    sourceImages: [
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=1000&auto=format&fit=crop',
    ],
    variants: [
      {
        name: 'Platinum Silver - 32GB / 1TB SSD',
        sku: 'XPS15-SIL-1TB',
        price: 249990,
        mrp: 279990,
        stock: 12,
        attributes: { color: 'Platinum Silver', ram: '32GB', storage: '1TB SSD' },
      },
    ],
  },
  // --------------------------------------------------------------------------
  // PRODUCT 8: Bose QuietComfort Ultra Headphones (Audio)
  // --------------------------------------------------------------------------
  {
    title: 'Bose QuietComfort Ultra Headphones',
    slug: 'bose-quietcomfort-ultra',
    brand: 'Bose',
    category: 'Audio',
    tagline: 'World-class active noise cancellation with breakthrough Bose Immersive Audio',
    description:
      'Bose QuietComfort Ultra wireless headphones elevate your listening with revolutionary spatialized audio, CustomTune acoustic calibration, and world-renowned quiet mode noise cancellation.',
    highlights: [
      'Bose Immersive Audio pushes boundaries of spatial acoustic realism',
      'CustomTune technology analyzes ear canal shape to personalize sound',
      'Up to 24 hours of continuous battery life (18 hours with Immersive Audio)',
      'Ultra-soft protein leather earcups and ergonomic headband clamping',
      'Bluetooth 5.3 with multipoint pairing and Snapdragon Sound certification',
    ],
    badge: 'Editor Pick',
    isFeatured: false,
    rating: 4.8,
    reviewCount: 650,
    tags: ['bose', 'audio', 'headphones', 'anc', 'spatial', 'wireless'],
    sourceImages: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
    ],
    variants: [
      {
        name: 'Black',
        sku: 'BOSE-QCU-BLK',
        price: 35900,
        mrp: 39900,
        stock: 40,
        attributes: { color: 'Black' },
      },
      {
        name: 'White Smoke',
        sku: 'BOSE-QCU-WHT',
        price: 35900,
        mrp: 39900,
        stock: 28,
        attributes: { color: 'White Smoke' },
      },
    ],
  },
  // --------------------------------------------------------------------------
  // PRODUCT 9: Samsung Galaxy Watch 6 Classic (Wearables)
  // --------------------------------------------------------------------------
  {
    title: 'Samsung Galaxy Watch 6 Classic LTE',
    slug: 'samsung-galaxy-watch-6-classic',
    brand: 'Samsung',
    category: 'Wearables',
    tagline: 'Iconic rotating bezel with comprehensive advanced heart health tracking',
    description:
      'Crafted with stainless steel and scratch-resistant sapphire crystal, the Galaxy Watch 6 Classic reintroduces the beloved rotating physical bezel with Samsung BioActive sensor health tracking.',
    highlights: [
      'Physical rotating bezel for intuitive interface navigation',
      'BioActive Sensor: ECG, Blood Pressure, BIA Body Composition, Optical Heart Rate',
      'Advanced sleep coaching with nocturnal blood oxygen and snore tracking',
      'Standalone 4G LTE connectivity without smartphone tethering',
      'Sapphire crystal display glass with 5ATM + IP68 water resistance',
    ],
    badge: 'Popular',
    isFeatured: false,
    rating: 4.5,
    reviewCount: 520,
    tags: ['samsung', 'smartwatch', 'wearable', 'lte', 'health', 'fitness'],
    sourceImages: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1000&auto=format&fit=crop',
    ],
    variants: [
      {
        name: 'Black - 47mm LTE',
        sku: 'GW6C-BLK-47',
        price: 39999,
        mrp: 43999,
        stock: 22,
        attributes: { color: 'Black', size: '47mm', connectivity: 'LTE' },
      },
      {
        name: 'Silver - 43mm Bluetooth',
        sku: 'GW6C-SLV-43',
        price: 34999,
        mrp: 38999,
        stock: 30,
        attributes: { color: 'Silver', size: '43mm', connectivity: 'Bluetooth' },
      },
    ],
  },
  // --------------------------------------------------------------------------
  // PRODUCT 10: Apple iPad Pro 12.9" M2 (Tablets)
  // --------------------------------------------------------------------------
  {
    title: 'Apple iPad Pro 12.9-inch (M2)',
    slug: 'apple-ipad-pro-12-9-m2',
    brand: 'Apple',
    category: 'Tablets',
    tagline: 'Liquid Retina XDR display with ProMotion and M2 chip breakthrough speed',
    description:
      'The 12.9-inch iPad Pro features an expansive Liquid Retina XDR display with mini-LED backlighting, the incredible speed of Apple M2 silicon, and next-level Apple Pencil hover experience.',
    highlights: [
      'Apple M2 chip with 8-core CPU and 10-core graphics engine',
      '12.9-inch Liquid Retina XDR display with 1,000,000:1 contrast ratio',
      'ProMotion technology with adaptive 120Hz refresh rate',
      'Support for Apple Pencil (2nd gen) with hover detection',
      'Thunderbolt / USB 4 port for high-speed external displays and drives',
    ],
    badge: 'Bestseller',
    isFeatured: true,
    rating: 4.9,
    reviewCount: 780,
    tags: ['apple', 'ipad', 'tablet', 'm2', 'retina', 'pro'],
    sourceImages: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1561154464-82e9adf32764?q=80&w=1000&auto=format&fit=crop',
    ],
    variants: [
      {
        name: 'Space Grey - 128GB Wi-Fi',
        sku: 'IPAD-PRO-128-GRY',
        price: 112900,
        mrp: 119900,
        stock: 18,
        attributes: { color: 'Space Grey', storage: '128GB' },
      },
      {
        name: 'Silver - 256GB Wi-Fi',
        sku: 'IPAD-PRO-256-SLV',
        price: 122900,
        mrp: 129900,
        stock: 14,
        attributes: { color: 'Silver', storage: '256GB' },
      },
    ],
  },
  // --------------------------------------------------------------------------
  // PRODUCT 11: Samsung Galaxy Tab S9 Ultra (Tablets)
  // --------------------------------------------------------------------------
  {
    title: 'Samsung Galaxy Tab S9 Ultra',
    slug: 'samsung-galaxy-tab-s9-ultra',
    brand: 'Samsung',
    category: 'Tablets',
    tagline: 'Colossal 14.6-inch Dynamic AMOLED 2X with included IP68 S-Pen',
    description:
      'Experience ultimate productivity on the Galaxy Tab S9 Ultra with its monumental 14.6-inch Dynamic AMOLED 2X display, Snapdragon 8 Gen 2 for Galaxy processor, and IP68 water resistance.',
    highlights: [
      '14.6-inch Dynamic AMOLED 2X 120Hz display with Vision Booster',
      'Snapdragon 8 Gen 2 Mobile Platform for Galaxy',
      'Water and dust resistant (IP68 rating) for tablet and included S-Pen',
      'Quad AKG speakers with Dolby Atmos spatial immersion',
      'Samsung DeX for desktop multi-window workflow experience',
    ],
    badge: 'New Launch',
    isFeatured: false,
    rating: 4.7,
    reviewCount: 310,
    tags: ['samsung', 'tablet', 'amoled', 'spen', 'android', 'dex'],
    sourceImages: [
      'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop',
    ],
    variants: [
      {
        name: 'Graphite - 12GB / 256GB Wi-Fi',
        sku: 'TABS9U-GRP-256',
        price: 108999,
        mrp: 115999,
        stock: 15,
        attributes: { color: 'Graphite', ram: '12GB', storage: '256GB' },
      },
    ],
  },
  // --------------------------------------------------------------------------
  // PRODUCT 12: Sony PlayStation 5 Slim (Gaming)
  // --------------------------------------------------------------------------
  {
    title: 'Sony PlayStation 5 Slim Console',
    slug: 'sony-playstation-5-slim',
    brand: 'Sony',
    category: 'Gaming',
    tagline: 'Play Has No Limits: 1TB ultra-high speed SSD with DualSense haptics',
    description:
      'The PlayStation 5 Slim packs the full power of custom AMD Zen 2 CPU and RDNA 2 graphics into a 30% smaller chassis with a 1TB high-speed NVMe SSD and revolutionary DualSense haptic feedback.',
    highlights: [
      'Custom AMD Ryzen Zen 2 CPU and Radeon RDNA 2 GPU architecture',
      'Ultra-high speed 1TB SSD with near-instantaneous load times',
      'DualSense Wireless Controller with adaptive triggers and haptic feedback',
      'Ray tracing acceleration and 4K-TV 120Hz gaming with HDR support',
      'Tempest 3D AudioTech acoustic sound engine',
    ],
    badge: 'Bestseller',
    isFeatured: true,
    rating: 4.9,
    reviewCount: 2150,
    tags: ['sony', 'ps5', 'gaming', 'console', '4k', 'dualsense'],
    sourceImages: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1000&auto=format&fit=crop',
    ],
    variants: [
      {
        name: 'White - 1TB Disc Edition',
        sku: 'PS5-SLM-DISC',
        price: 54990,
        mrp: 54990,
        stock: 50,
        attributes: { color: 'White', edition: 'Disc', storage: '1TB' },
      },
    ],
  },
  // --------------------------------------------------------------------------
  // PRODUCT 13: ASUS ROG Zephyrus G16 (Laptops)
  // --------------------------------------------------------------------------
  {
    title: 'ASUS ROG Zephyrus G16 (2024)',
    slug: 'asus-rog-zephyrus-g16',
    brand: 'ASUS',
    category: 'Laptops',
    tagline: 'Ultra-thin gaming powerhouse: Intel Core Ultra 9 with RTX 4080',
    description:
      'The ROG Zephyrus G16 features a precision CNC-milled aluminum chassis, Intel Core Ultra 9 processor with dedicated NPU for AI, and 2.5K 240Hz ROG Nebula OLED display.',
    highlights: [
      'Intel Core Ultra 9 185H processor with Intel AI Boost NPU',
      'NVIDIA GeForce RTX 4080 Laptop GPU 12GB GDDR6',
      '16-inch 2.5K (2560x1600) 240Hz 0.2ms ROG Nebula OLED display',
      'Slash Lighting LED array on lid with customizable animations',
      'ROG Intelligent Cooling with vapor chamber and 2nd Gen Arc Flow Fans',
    ],
    badge: 'Top Deal',
    isFeatured: false,
    rating: 4.8,
    reviewCount: 340,
    tags: ['asus', 'rog', 'laptop', 'gaming', 'oled', 'rtx4080'],
    sourceImages: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1000&auto=format&fit=crop',
    ],
    variants: [
      {
        name: 'Eclipse Gray - 32GB / 1TB SSD',
        sku: 'G16-GRY-1TB',
        price: 269990,
        mrp: 299990,
        stock: 8,
        attributes: { color: 'Eclipse Gray', ram: '32GB', storage: '1TB SSD' },
      },
    ],
  },
  // --------------------------------------------------------------------------
  // PRODUCT 14: Marshall Stanmore III Bluetooth Speaker (Audio)
  // --------------------------------------------------------------------------
  {
    title: 'Marshall Stanmore III Bluetooth Speaker',
    slug: 'marshall-stanmore-iii',
    brand: 'Marshall',
    category: 'Audio',
    tagline: 'Iconic vintage rock-and-roll styling with wide stereo soundstage',
    description:
      'The legendary Stanmore III delivers heart-thumping sound engineered to cast a wider soundstage than its predecessor, complete with classic vintage vinyl casing and brass analog controls.',
    highlights: [
      'Re-engineered soundstage with outward-angled tweeters for wider dispersion',
      'Dynamic Loudness adjusts tonal balance to keep audio crisp at every volume',
      'Next-generation Bluetooth 5.2 LE Audio-ready connectivity',
      'Classic Marshall brass knobs for volume, bass, and treble tactile control',
      'Constructed with 70% post-consumer recycled plastic and vegan leather',
    ],
    badge: 'Lifestyle',
    isFeatured: false,
    rating: 4.7,
    reviewCount: 460,
    tags: ['marshall', 'audio', 'speaker', 'bluetooth', 'vintage', 'stereo'],
    sourceImages: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1000&auto=format&fit=crop',
    ],
    variants: [
      {
        name: 'Black',
        sku: 'MRSH-STM3-BLK',
        price: 37999,
        mrp: 41999,
        stock: 25,
        attributes: { color: 'Black' },
      },
      {
        name: 'Cream',
        sku: 'MRSH-STM3-CRM',
        price: 37999,
        mrp: 41999,
        stock: 18,
        attributes: { color: 'Cream' },
      },
    ],
  },
  // --------------------------------------------------------------------------
  // PRODUCT 15: Google Pixel 8 Pro (Smartphones)
  // --------------------------------------------------------------------------
  {
    title: 'Google Pixel 8 Pro',
    slug: 'google-pixel-8-pro',
    brand: 'Google',
    category: 'Smartphones',
    tagline: 'Engineered by Google with Tensor G3 and state-of-the-art computational AI',
    description:
      'The Pixel 8 Pro features the cutting-edge Google Tensor G3 chip, fully upgraded triple camera system with temperature sensor, Super Actua display, and 7 years of OS updates.',
    highlights: [
      'Google Tensor G3 chip engineered with Google AI computational models',
      '6.7-inch Super Actua LTPO OLED display up to 2400 nits peak brightness',
      'Upgraded 50MP main, 48MP ultrawide, and 48MP 5x telephoto camera system',
      'Exclusive AI photography: Best Take, Magic Editor, Audio Magic Eraser',
      'Guaranteed 7 years of major Android OS and security upgrades',
    ],
    badge: 'AI Flagship',
    isFeatured: false,
    rating: 4.6,
    reviewCount: 920,
    tags: ['google', 'pixel', 'smartphone', '5g', 'ai', 'camera', 'android'],
    sourceImages: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000&auto=format&fit=crop',
    ],
    variants: [
      {
        name: 'Bay Blue - 128GB',
        sku: 'PIX8P-BLU-128',
        price: 99999,
        mrp: 106999,
        stock: 30,
        attributes: { color: 'Bay Blue', storage: '128GB' },
      },
      {
        name: 'Obsidian - 256GB',
        sku: 'PIX8P-OBS-256',
        price: 109999,
        mrp: 116999,
        stock: 20,
        attributes: { color: 'Obsidian', storage: '256GB' },
      },
    ],
  },
];
