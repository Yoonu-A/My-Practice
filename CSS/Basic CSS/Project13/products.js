/**
 * Yoonu Store - Product Catalog Database
 * High-quality sample data across 12 product categories with LKR (Sri Lankan Rupee) pricing.
 */

const INITIAL_PRODUCTS = [
  // 1. Smartphones
  {
    id: "sp-01",
    name: "Apple iPhone 15 Pro Max (256GB, Natural Titanium)",
    category: "Smartphones",
    brand: "Apple",
    price: 389900,
    originalPrice: 429900,
    discountPercent: 9,
    rating: 4.9,
    reviewsCount: 342,
    stock: 14,
    badge: "Best Seller",
    featured: true,
    deal: true,
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"],
    description: "Features a strong and light aerospace-grade titanium design with a textured matte-glass back. Powered by the A17 Pro chip for next-level mobile gaming and 48MP main camera with 5x telephoto optical zoom.",
    specs: {
      "Display": "6.7-inch Super Retina XDR OLED 120Hz",
      "Processor": "Apple A17 Pro (3nm)",
      "Storage": "256GB NVMe",
      "Camera": "48MP Main + 12MP Ultra Wide + 12MP 5x Telephoto",
      "Battery": "Up to 29 hours video playback, USB-C"
    },
    reviews: [
      { user: "Kasun Perera", rating: 5, date: "2026-03-12", comment: "Outstanding performance and battery life. Titanium feel is featherweight compared to 14 Pro Max.", verified: true },
      { user: "Nadeeka Fernando", rating: 5, date: "2026-02-28", comment: "Camera zoom for wildlife and events in Sri Lanka is phenomenal. 100% recommended!", verified: true }
    ]
  },
  {
    id: "sp-02",
    name: "Samsung Galaxy S24 Ultra 5G (512GB, Titanium Gray)",
    category: "Smartphones",
    brand: "Samsung",
    price: 364900,
    originalPrice: 399900,
    discountPercent: 9,
    rating: 4.8,
    reviewsCount: 218,
    stock: 9,
    badge: "Galaxy AI",
    featured: true,
    deal: false,
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Titanium Gray", "Titanium Black", "Titanium Violet"],
    description: "Welcome to the era of mobile AI. With Galaxy S24 Ultra in your hands, you can unleash whole new levels of creativity, productivity and possibility.",
    specs: {
      "Display": "6.8-inch Dynamic LTPO AMOLED 2X, 2600 nits",
      "Processor": "Snapdragon 8 Gen 3 for Galaxy",
      "S-Pen": "Integrated stylus included",
      "Camera": "200MP Quad Tele System with AI Nightography",
      "Battery": "5000 mAh with 45W fast charging"
    },
    reviews: [
      { user: "Dinuka Silva", rating: 5, date: "2026-03-01", comment: "The anti-reflective screen makes sunlight viewing outdoors in Colombo effortless.", verified: true }
    ]
  },
  {
    id: "sp-03",
    name: "Google Pixel 8 Pro (128GB, Obsidian Black)",
    category: "Smartphones",
    brand: "Google",
    price: 249000,
    originalPrice: 285000,
    discountPercent: 13,
    rating: 4.7,
    reviewsCount: 164,
    stock: 12,
    badge: "Deal of the Day",
    featured: false,
    deal: true,
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02560?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Obsidian Black", "Bay Blue", "Porcelain"],
    description: "Google Tensor G3 chip built with Google AI. Features pro-level camera hardware and exclusive software capabilities like Best Take, Magic Editor, and Audio Magic Eraser.",
    specs: {
      "Display": "6.7-inch Super Actua OLED 1-120Hz",
      "Processor": "Google Tensor G3 & Titan M2 security",
      "Camera": "50MP wide + 48MP ultrawide + 48MP 5x telephoto",
      "Software": "Pure Android with 7 years of OS updates"
    },
    reviews: [
      { user: "Thilina Jayawardena", rating: 5, date: "2026-02-14", comment: "Best point-and-shoot camera on any phone. The software simplicity is unbeatable.", verified: true }
    ]
  },

  // 2. Computers & Laptops
  {
    id: "cl-01",
    name: "Apple MacBook Air 15\" M3 Chip (16GB RAM, 512GB SSD, Midnight)",
    category: "Computers & Laptops",
    brand: "Apple",
    price: 495000,
    originalPrice: 535000,
    discountPercent: 7,
    rating: 4.9,
    reviewsCount: 198,
    stock: 8,
    badge: "Top Rated",
    featured: true,
    deal: false,
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Midnight", "Starlight", "Space Gray", "Silver"],
    description: "Strikingly thin and fast. MacBook Air with M3 chip breezes through work and play with an expansive 15.3-inch Liquid Retina display and up to 18 hours of battery life.",
    specs: {
      "Display": "15.3-inch Liquid Retina with True Tone (2880x1864)",
      "Processor": "Apple M3 8-core CPU / 10-core GPU",
      "Memory": "16GB Unified Memory",
      "Storage": "512GB PCIe SSD",
      "Weight": "1.51 kg super portable"
    },
    reviews: [
      { user: "Ruwan Senaratne", rating: 5, date: "2026-03-20", comment: "Silent fanless operation and charges once every two days for office work.", verified: true }
    ]
  },
  {
    id: "cl-02",
    name: "ASUS ROG Zephyrus G16 OLED Gaming Laptop (RTX 4070, Core Ultra 9)",
    category: "Computers & Laptops",
    brand: "ASUS",
    price: 685000,
    originalPrice: 749000,
    discountPercent: 9,
    rating: 4.8,
    reviewsCount: 87,
    stock: 5,
    badge: "High Performance",
    featured: false,
    deal: true,
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Eclipse Gray", "Platinum White"],
    description: "Precision CNC milled aluminum chassis, 2.5K 240Hz ROG Nebula OLED display, Intel Core Ultra 9 185H processor, and NVIDIA GeForce RTX 4070 laptop GPU.",
    specs: {
      "Display": "16-inch 2.5K 240Hz 0.2ms OLED G-Sync",
      "GPU": "NVIDIA GeForce RTX 4070 8GB GDDR6",
      "RAM": "32GB LPDDR5X 7467MHz",
      "Storage": "1TB PCIe Gen4 NVMe M.2"
    },
    reviews: [
      { user: "Harsha Dissanayake", rating: 5, date: "2026-01-30", comment: "The OLED screen is jaw-dropping and AAA games run over 100 FPS easily.", verified: true }
    ]
  },
  {
    id: "cl-03",
    name: "Dell XPS 15 9530 Touchscreen (Core i7, 32GB RAM, 1TB SSD, RTX 4060)",
    category: "Computers & Laptops",
    brand: "Dell",
    price: 610000,
    originalPrice: 659000,
    discountPercent: 7,
    rating: 4.6,
    reviewsCount: 72,
    stock: 6,
    badge: "Pro Choice",
    featured: false,
    deal: false,
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Platinum Silver with Black Carbon Fiber"],
    description: "Engineered for creators. Masterfully crafted with premium carbon fiber and CNC machined aluminum with an infinity-edge 3.5K OLED touch display.",
    specs: {
      "Display": "15.6-inch 3.5K (3456 x 2160) OLED Touch",
      "CPU": "13th Gen Intel Core i7-13700H",
      "RAM": "32GB DDR5 4800MHz",
      "Storage": "1TB M.2 PCIe NVMe SSD"
    },
    reviews: [
      { user: "Mahesh Gunawardena", rating: 4, date: "2026-02-19", comment: "Superb color accuracy for Premier Pro and Lightroom work.", verified: true }
    ]
  },

  // 3. Electronics
  {
    id: "el-01",
    name: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    category: "Electronics",
    brand: "Sony",
    price: 99500,
    originalPrice: 125000,
    discountPercent: 20,
    rating: 4.9,
    reviewsCount: 520,
    stock: 22,
    badge: "Best Seller",
    featured: true,
    deal: true,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Silver", "Black", "Midnight Blue"],
    description: "Industry-leading noise cancellation optimized automatically with two processors and 8 microphones. Magnificent sound quality with 30-hour battery life and quick charging.",
    specs: {
      "ANC": "Dual Processor V1 + HD Noise Cancelling QN1",
      "Battery": "Up to 30 hours (3 min charge = 3 hours playback)",
      "Audio": "LDAC, Hi-Res Audio Wireless, DSEE Extreme",
      "Weight": "250g ultra comfortable"
    },
    reviews: [
      { user: "Sahan Wickramasinghe", rating: 5, date: "2026-03-10", comment: "Blocks out all ambient Colombo bus and road noise on daily commutes. Essential gear.", verified: true }
    ]
  },
  {
    id: "el-02",
    name: "Canon EOS R50 Mirrorless Camera with 18-45mm IS STM Lens",
    category: "Electronics",
    brand: "Canon",
    price: 265000,
    originalPrice: 299000,
    discountPercent: 11,
    rating: 4.7,
    reviewsCount: 89,
    stock: 7,
    badge: "Creator Kit",
    featured: false,
    deal: false,
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Black", "White"],
    description: "Compact and lightweight mirrorless camera built for content creators. 24.2 Megapixel APS-C CMOS sensor, Dual Pixel CMOS AF II, and uncropped 6K oversampled 4K video.",
    specs: {
      "Sensor": "24.2 MP APS-C CMOS Sensor",
      "Video": "4K 30p oversampled, Full HD 120p slow motion",
      "Autofocus": "Dual Pixel CMOS AF II with Subject Detection",
      "Screen": "3.0-inch Vari-Angle Touchscreen LCD"
    },
    reviews: [
      { user: "Nimesh Karunaratne", rating: 5, date: "2026-02-05", comment: "Perfect camera for YouTube videos and travel photos.", verified: true }
    ]
  },
  {
    id: "el-03",
    name: "Bose SoundLink Max Portable Bluetooth Boombox Speaker",
    category: "Electronics",
    brand: "Bose",
    price: 119000,
    originalPrice: 139000,
    discountPercent: 14,
    rating: 4.8,
    reviewsCount: 142,
    stock: 18,
    badge: "Outdoor Favorite",
    featured: false,
    deal: true,
    images: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Black", "Blue Dusk"],
    description: "Deep, epic bass that turns every gathering into a party. IP67 waterproof and dustproof design with a removable soft rope handle and up to 20 hours battery life.",
    specs: {
      "Water Resistance": "IP67 waterproof and dustproof",
      "Battery Life": "Up to 20 hours with USB-C phone charging port",
      "Audio": "Stereo transducers with dual custom passive radiators",
      "Inputs": "Bluetooth 5.3 + 3.5mm AUX input"
    },
    reviews: [
      { user: "Pradeep Fonseka", rating: 5, date: "2026-03-15", comment: "Took it on a beach trip down south to Mirissa. Sound filled the whole villa garden!", verified: true }
    ]
  },

  // 4. Men’s Fashion
  {
    id: "mf-01",
    name: "Pure European Linen Casual Long-Sleeve Shirt",
    category: "Men’s Fashion",
    brand: "Yoonu Signature",
    price: 8490,
    originalPrice: 11990,
    discountPercent: 29,
    rating: 4.6,
    reviewsCount: 310,
    stock: 45,
    badge: "Trending",
    featured: true,
    deal: true,
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Sky Blue", "Olive Green", "Crisp White", "Sand Beige"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Crafted from 100% natural breathable European flax linen. Soft washed finish, button-down spread collar, and relaxed modern fit perfect for tropical climates.",
    specs: {
      "Material": "100% Breathable European Linen",
      "Fit": "Tailored Relaxed Fit",
      "Care": "Machine wash cold or hand wash gentle"
    },
    reviews: [
      { user: "Amila Bandara", rating: 5, date: "2026-03-04", comment: "Super soft linen, doesn't scratch at all. Cool even in 32C humidity.", verified: true }
    ]
  },
  {
    id: "mf-02",
    name: "Men's Stretch Slim-Fit Chino Trousers",
    category: "Men’s Fashion",
    brand: "UrbanCraft",
    price: 6990,
    originalPrice: 9490,
    discountPercent: 26,
    rating: 4.5,
    reviewsCount: 204,
    stock: 38,
    badge: "Wardrobe Essential",
    featured: false,
    deal: false,
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Navy", "Khaki", "Charcoal Gray"],
    sizes: ["30", "32", "34", "36", "38"],
    description: "Premium combed cotton with 3% elastane for maximum stretch and mobility. Ideal for office work, dinner dates, and casual weekend getaways.",
    specs: {
      "Fabric": "97% Combed Cotton, 3% Elastane",
      "Closure": "YKK Zip fly with tortoiseshell button",
      "Pockets": "Front slant pockets, twin buttoned rear welt pockets"
    },
    reviews: [
      { user: "Gayan Mendis", rating: 5, date: "2026-01-22", comment: "Comfortable waist and sharp silhouette.", verified: true }
    ]
  },
  {
    id: "mf-03",
    name: "Vintage Distressed Genuine Leather Biker Jacket",
    category: "Men’s Fashion",
    brand: "Kavalan",
    price: 34500,
    originalPrice: 48000,
    discountPercent: 28,
    rating: 4.8,
    reviewsCount: 79,
    stock: 10,
    badge: "Limited Edition",
    featured: false,
    deal: true,
    images: [
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Vintage Brown", "Classic Black"],
    sizes: ["M", "L", "XL"],
    description: "100% full-grain cowhide leather with a burnished vintage patina. Heavy-duty gunmetal hardware, asymmetric moto zip closure, and diamond-quilted polyester lining.",
    specs: {
      "Leather": "Full Grain Natural Milled Leather",
      "Zippers": "Heavy Duty Antiqued Brass YKK",
      "Lining": "Quilted thermal interior with two inner stash pockets"
    },
    reviews: [
      { user: "Shanaka Ratnayake", rating: 5, date: "2026-02-17", comment: "Substantial weight and authentic leather aroma. Looks like a million bucks.", verified: true }
    ]
  },

  // 5. Women’s Fashion
  {
    id: "wf-01",
    name: "Bohemian Tiered Floral Print Silk-Blend Maxi Dress",
    category: "Women’s Fashion",
    brand: "Aura Boutique",
    price: 11900,
    originalPrice: 16500,
    discountPercent: 28,
    rating: 4.8,
    reviewsCount: 280,
    stock: 30,
    badge: "Bestseller",
    featured: true,
    deal: true,
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Botanical Emerald", "Rose Bloom", "Midnight Navy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Flowy, feminine, and effortlessly graceful. Featuring a sweetheart neckline, delicate smocked bodice, flutter sleeves, and sweeping tiered ruffle skirt.",
    specs: {
      "Material": "70% Rayon Georgette, 30% Mulberry Silk",
      "Length": "Full Maxi Length with side slit",
      "Care": "Dry clean recommended or cold hand wash"
    },
    reviews: [
      { user: "Dilini Weerasinghe", rating: 5, date: "2026-03-08", comment: "Wore this to a garden wedding in Kandy and received endless compliments!", verified: true }
    ]
  },
  {
    id: "wf-02",
    name: "Cashmere-Blend Knit Cardigan with Pearl Buttons",
    category: "Women’s Fashion",
    brand: "Celeste",
    price: 14200,
    originalPrice: 18900,
    discountPercent: 25,
    rating: 4.7,
    reviewsCount: 115,
    stock: 20,
    badge: "New Arrival",
    featured: false,
    deal: false,
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Oatmeal Melange", "Blush Pink", "Ivory White"],
    sizes: ["S", "M", "L"],
    description: "Ultra-plush cashmere and fine Merino wool knit. Ribbed trim cuffs and faux pearl button accents make this a timeless layering piece for air-conditioned offices and breezy evenings.",
    specs: {
      "Composition": "35% Cashmere, 65% Superfine Merino Wool",
      "Fit": "Slightly oversized drape",
      "Neckline": "Classic V-Neck"
    },
    reviews: [
      { user: "Shenali Senanayake", rating: 5, date: "2026-02-24", comment: "So soft on skin, no itchiness whatsoever.", verified: true }
    ]
  },
  {
    id: "wf-03",
    name: "High-Waisted Tailored Wide-Leg Linen Palazzo Trousers",
    category: "Women’s Fashion",
    brand: "Aura Boutique",
    price: 7990,
    originalPrice: 10500,
    discountPercent: 24,
    rating: 4.6,
    reviewsCount: 153,
    stock: 25,
    badge: "Trending",
    featured: false,
    deal: true,
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Pecan Tan", "Crisp White", "Olive"],
    sizes: ["XS", "S", "M", "L"],
    description: "Elegant, pleated high-waist trousers that elongate your silhouette. Featuring side slant pockets, belt loops, and an ultra-breathable linen drape.",
    specs: {
      "Fabric": "100% Pure Washed Linen",
      "Rise": "High Rise (12.5 inches)",
      "Leg": "Wide leg relaxed fit"
    },
    reviews: [
      { user: "Poornima Alwis", rating: 5, date: "2026-01-19", comment: "Super chic and breathable for office wear in tropical heat.", verified: true }
    ]
  },

  // 6. Shoes
  {
    id: "sh-01",
    name: "Nike Air Max 270 Running & Lifestyle Sneakers",
    category: "Shoes",
    brand: "Nike",
    price: 46900,
    originalPrice: 55000,
    discountPercent: 15,
    rating: 4.8,
    reviewsCount: 412,
    stock: 22,
    badge: "Best Seller",
    featured: true,
    deal: true,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Bred Red/Black", "Triple Black", "White/Pure Platinum"],
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    description: "Boasting Nike's biggest heel Air unit yet, the Air Max 270 delivers a super-soft ride that feels as impossible as it looks. Engineered mesh upper for breathable comfort.",
    specs: {
      "Cushioning": "Max Air 270 heel unit",
      "Upper": "Engineered breathable mesh with synthetic overlays",
      "Sole": "Dual-density foam with durable rubber waffle outsole"
    },
    reviews: [
      { user: "Ravindu Gamage", rating: 5, date: "2026-03-02", comment: "Unreal cushioning. Like walking on clouds during long mall shopping sessions.", verified: true }
    ]
  },
  {
    id: "sh-02",
    name: "Clarks Tilden Cap Genuine Leather Oxford Dress Shoes",
    category: "Shoes",
    brand: "Clarks",
    price: 32000,
    originalPrice: 39500,
    discountPercent: 19,
    rating: 4.7,
    reviewsCount: 167,
    stock: 14,
    badge: "Executive",
    featured: false,
    deal: false,
    images: [
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Dark Tan Leather", "Classic Black Leather"],
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10"],
    description: "A refined cap-toe Oxford shoe in rich full-grain leather. Built with discreet elastic gore panels for easy entry and an OrthoLite footbed with Cushion Soft padding.",
    specs: {
      "Leather": "Full Grain Polished Cow Leather",
      "Footbed": "OrthoLite moisture-wicking foam",
      "Outsole": "Flexible non-slip TPR rubber"
    },
    reviews: [
      { user: "Lasantha Wickrama", rating: 5, date: "2026-02-12", comment: "Wore straight out of the box for an 8-hour corporate conference with zero blisters.", verified: true }
    ]
  },
  {
    id: "sh-03",
    name: "Adidas Ultraboost Light Running Shoes",
    category: "Shoes",
    brand: "Adidas",
    price: 52900,
    originalPrice: 62000,
    discountPercent: 15,
    rating: 4.9,
    reviewsCount: 230,
    stock: 16,
    badge: "Deal",
    featured: false,
    deal: true,
    images: [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Core Black / Cloud White", "Solar Red / Flash"],
    sizes: ["UK 7.5", "UK 8.5", "UK 9.5", "UK 10.5"],
    description: "Experience epic energy return with the lightest Ultraboost yet. 30% lighter Light BOOST material paired with Linear Energy Push system on the outsole.",
    specs: {
      "Midsole": "Ultralight BOOST responsive foam",
      "Upper": "adidas PRIMEKNIT+ textile yarn containing 50% Parley Ocean Plastic",
      "Outsole": "Continental Better Rubber traction"
    },
    reviews: [
      { user: "Kavinda De Silva", rating: 5, date: "2026-03-14", comment: "Night and day difference for 10km morning runs. Best running shoe of the year.", verified: true }
    ]
  },

  // 7. Watches
  {
    id: "wt-01",
    name: "Seiko Presage Cocktail Time 'Blue Moon' Automatic Watch",
    category: "Watches",
    brand: "Seiko",
    price: 145000,
    originalPrice: 175000,
    discountPercent: 17,
    rating: 4.9,
    reviewsCount: 184,
    stock: 7,
    badge: "Luxury Choice",
    featured: true,
    deal: false,
    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Sunburst Blue Dial with Steel Bracelet"],
    description: "Inspired by the glamor of cocktail lounges. The dial features an intricate radial sunburst pattern with deep blue lacquer gradient, polished faceted indices, and an exhibition caseback.",
    specs: {
      "Movement": "Seiko Caliber 4R35 Automatic with manual winding",
      "Power Reserve": "Approximately 41 hours",
      "Glass": "Box-shaped Hardlex crystal",
      "Water Resistance": "50 meters (5 bar)"
    },
    reviews: [
      { user: "Dr. Anura Somaratne", rating: 5, date: "2026-03-01", comment: "The blue dial catches the light like an ocean jewel. High horology aesthetic for great value.", verified: true }
    ]
  },
  {
    id: "wt-02",
    name: "Apple Watch Series 9 GPS (45mm, Midnight Aluminum)",
    category: "Watches",
    brand: "Apple",
    price: 139000,
    originalPrice: 159000,
    discountPercent: 13,
    rating: 4.8,
    reviewsCount: 310,
    stock: 19,
    badge: "Best Seller",
    featured: false,
    deal: true,
    images: [
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Midnight", "Starlight", "Silver", "(PRODUCT)RED"],
    description: "Smarter, brighter, mightier. Features S9 SiP processor, magic Double Tap gesture control, precision finding for iPhone, and advanced health tracking including ECG and blood oxygen.",
    specs: {
      "Display": "Always-On Retina display up to 2000 nits",
      "Chip": "S9 SiP with 64-bit dual-core processor",
      "Sensors": "Blood Oxygen, ECG, Temperature sensing, Fall Detection",
      "Water Resistance": "WR50 Swimproof up to 50 meters"
    },
    reviews: [
      { user: "Keshani Abeywickrama", rating: 5, date: "2026-02-18", comment: "Double tap gesture while carrying groceries is pure wizardry.", verified: true }
    ]
  },
  {
    id: "wt-03",
    name: "Fossil Grant Chronograph Blue Dial Brown Leather Watch",
    category: "Watches",
    brand: "Fossil",
    price: 44900,
    originalPrice: 58000,
    discountPercent: 23,
    rating: 4.6,
    reviewsCount: 147,
    stock: 12,
    badge: "Classic",
    featured: false,
    deal: true,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547996160-71dfabb190ed?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Brown Leather with Rose Gold & Navy Dial"],
    description: "Classic styling meets vintage proportion. Roman numeral markers, rich blue satin dial, and genuine supple leather strap with interchangeable band capability.",
    specs: {
      "Case Size": "44mm stainless steel",
      "Movement": "Quartz Chronograph with stopwatch sub-dials",
      "Strap": "22mm interchangeable genuine calfskin leather",
      "Water Resistance": "5 ATM"
    },
    reviews: [
      { user: "Nuwan Tennakoon", rating: 5, date: "2026-01-29", comment: "Looks much more expensive than it is. Great for gifts.", verified: true }
    ]
  },

  // 8. Home & Kitchen
  {
    id: "hk-01",
    name: "Philips XXL Digital Airfryer (7.2L, Rapid CombiAir)",
    category: "Home & Kitchen",
    brand: "Philips",
    price: 68500,
    originalPrice: 85000,
    discountPercent: 19,
    rating: 4.9,
    reviewsCount: 390,
    stock: 15,
    badge: "Must Have",
    featured: true,
    deal: true,
    images: [
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Matte Black with Rose Gold Accents"],
    description: "Cooks up to 90% less fat with Twin TurboStar technology. Fits a whole roast chicken or 1.4kg of crispy fries. Features 16 preset programs and NutriU smart recipe app integration.",
    specs: {
      "Capacity": "7.2 Liters (XXL family size)",
      "Power": "2200W high speed hot air circulation",
      "Display": "Digital touch screen with QuickControl dial",
      "Cleaning": "Dishwasher safe QuickClean basket with non-stick mesh"
    },
    reviews: [
      { user: "Priyanka Rajapaksa", rating: 5, date: "2026-03-11", comment: "We make cutlets, samosas, and roast chicken with just a teaspoon of oil. Incredible!", verified: true }
    ]
  },
  {
    id: "hk-02",
    name: "Nespresso Vertuo Pop Espresso & Coffee Machine",
    category: "Home & Kitchen",
    brand: "Nespresso",
    price: 59000,
    originalPrice: 72000,
    discountPercent: 18,
    rating: 4.7,
    reviewsCount: 165,
    stock: 11,
    badge: "Coffee Lover",
    featured: false,
    deal: false,
    images: [
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Liquorice Black", "Spicy Red", "Pacific Blue"],
    description: "Centrifusion extraction technology spins capsules at 4000 RPM to craft velvety crema and rich coffee across 5 cup sizes from espresso to large mugs.",
    specs: {
      "Technology": "Centrifusion barcode recognition brewing",
      "Cup Sizes": "Espresso (40ml), Double Espresso (80ml), Gran Lungo (150ml), Mug (230ml)",
      "Heating Time": "Fast heat-up in 30 seconds"
    },
    reviews: [
      { user: "Tharindu Perera", rating: 5, date: "2026-02-27", comment: "Barista quality coffee right in my kitchen every morning.", verified: true }
    ]
  },
  {
    id: "hk-03",
    name: "Roborock S8 Pro Ultra Robot Vacuum and Mop with Auto Dock",
    category: "Home & Kitchen",
    brand: "Roborock",
    price: 345000,
    originalPrice: 389000,
    discountPercent: 11,
    rating: 4.9,
    reviewsCount: 94,
    stock: 4,
    badge: "Smart Home",
    featured: false,
    deal: true,
    images: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Polar White"],
    description: "The ultimate hands-free cleaning machine. RockDock Ultra auto empties dust, auto washes the mop pad with hot air drying, and auto refills water.",
    specs: {
      "Suction": "6000 Pa HyperForce extreme suction",
      "Mopping": "VibraRise 2.0 dual sonic vibration 3000 times/min",
      "Navigation": "PreciSense LiDAR 3D Structured Light obstacle avoidance",
      "Battery": "5200 mAh cleans up to 300 sq.m per charge"
    },
    reviews: [
      { user: "Chandana Lokuge", rating: 5, date: "2026-02-02", comment: "Tile floors in our two-story house stay spotless. Cleans under sofa beds easily.", verified: true }
    ]
  },

  // 9. Beauty & Personal Care
  {
    id: "bp-01",
    name: "Dyson Supersonic Nural Intelligent Hair Dryer",
    category: "Beauty & Personal Care",
    brand: "Dyson",
    price: 189000,
    originalPrice: 219000,
    discountPercent: 14,
    rating: 4.9,
    reviewsCount: 220,
    stock: 8,
    badge: "Trending Luxury",
    featured: true,
    deal: false,
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Patina & Topaz", "Ceramic Pink"],
    description: "Equipped with Nural sensors that automatically reduce heat as it nears your head to protect scalp health and enhance natural shine. Includes 5 magnetic styling attachments.",
    specs: {
      "Motor": "Dyson digital motor V9 spinning up to 110,000 RPM",
      "Sensors": "Time of Flight sensor, Hall sensor, Capsule illumination",
      "Attachments": "Gentle air attachment, Styling concentrator, Flyaway attachment, Diffuser"
    },
    reviews: [
      { user: "Oshadhi Hettiarachchi", rating: 5, date: "2026-03-05", comment: "Cuts drying time in half with zero heat damage. Hair is so shiny!", verified: true }
    ]
  },
  {
    id: "bp-02",
    name: "CeraVe Complete Hydrating Skincare Bundle (Cleanser, Cream, Serum)",
    category: "Beauty & Personal Care",
    brand: "CeraVe",
    price: 18500,
    originalPrice: 24500,
    discountPercent: 24,
    rating: 4.8,
    reviewsCount: 650,
    stock: 50,
    badge: "Dermatologist Recommended",
    featured: false,
    deal: true,
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608248597359-002d29505872?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Signature Blue/White"],
    description: "Developed with dermatologists. Formulated with 3 essential ceramides (1, 3, 6-II) and hyaluronic acid using MVE delivery technology to restore and maintain the protective skin barrier.",
    specs: {
      "Bundle Includes": "Hydrating Cleanser 473ml + Moisturizing Cream 340g + Hyaluronic Acid Serum 30ml",
      "Skin Type": "Normal to Dry, Sensitive Skin",
      "Attributes": "Fragrance-free, non-comedogenic, hypoallergenic"
    },
    reviews: [
      { user: "Sachini Gamage", rating: 5, date: "2026-02-21", comment: "Cleared my dry skin irritation completely within one week.", verified: true }
    ]
  },
  {
    id: "bp-03",
    name: "The Ordinary The Daily Routine Glowing Skin Regimen Set",
    category: "Beauty & Personal Care",
    brand: "The Ordinary",
    price: 15400,
    originalPrice: 19800,
    discountPercent: 22,
    rating: 4.7,
    reviewsCount: 410,
    stock: 35,
    badge: "Cult Classic",
    featured: false,
    deal: true,
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Classic Amber Dropper"],
    description: "Simple science for healthy skin. Features Squalane Cleanser, Hyaluronic Acid 2% + B5 hydration booster, and Niacinamide 10% + Zinc 1% to balance sebum and minimize pores.",
    specs: {
      "Items": "Niacinamide 10% (30ml) + HA 2% (30ml) + Squalane Cleanser (50ml) + Natural Moisturizing Factors (30ml)",
      "Formula": "Cruelty-free, vegan, alcohol-free, oil-free"
    },
    reviews: [
      { user: "Hansika Disanayake", rating: 5, date: "2026-03-09", comment: "Texture of my skin improved dramatically. Very cost effective skincare.", verified: true }
    ]
  },

  // 10. Sports & Fitness
  {
    id: "sf-01",
    name: "Bowflex SelectTech 552 Adjustable Dumbbells Pair (5 to 52.5 lbs)",
    category: "Sports & Fitness",
    brand: "Bowflex",
    price: 145000,
    originalPrice: 179000,
    discountPercent: 19,
    rating: 4.9,
    reviewsCount: 178,
    stock: 8,
    badge: "Gym Grade",
    featured: true,
    deal: false,
    images: [
      "https://images.unsplash.com/photo-1586401100295-7a8096fd231a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Matte Black with Red Dial"],
    description: "Replaces 15 pairs of dumbbells with a twist of a dial. Adjusts in 2.5 lb increments from 5 to 52.5 lbs (2.5 to 24 kg) for a compact home workout setup.",
    specs: {
      "Weight Range": "5 to 52.5 lbs per dumbbell",
      "Mechanism": "Smooth turn dial selection system",
      "Plates": "Durable molding around metal plates for smooth quiet lift-off",
      "Includes": "Two dumbbell units and two resting trays"
    },
    reviews: [
      { user: "Isuru Ranasinghe", rating: 5, date: "2026-02-15", comment: "Saves so much floor space in my apartment gym. Built like a tank.", verified: true }
    ]
  },
  {
    id: "sf-02",
    name: "Garmin Forerunner 265 GPS AMOLED Running Smartwatch",
    category: "Sports & Fitness",
    brand: "Garmin",
    price: 169000,
    originalPrice: 195000,
    discountPercent: 13,
    rating: 4.8,
    reviewsCount: 122,
    stock: 10,
    badge: "Athlete Choice",
    featured: false,
    deal: true,
    images: [
      "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Black & Powder Gray", "Whitestone & Tidal Blue"],
    description: "Brilliant 1.3\" AMOLED touch display. Training readiness metrics, morning report, HRV status, multi-band GPS tracking, and up to 13 days of battery life in smartwatch mode.",
    specs: {
      "Display": "1.3-inch AMOLED (416 x 416 pixels) with Corning Gorilla Glass 3",
      "Battery": "Up to 13 days in smartwatch mode, up to 20 hours in GPS mode",
      "Sensors": "Garmin Elevate Gen 4 heart rate, Pulse Ox, Multi-band GNSS satIQ",
      "Water Rating": "5 ATM"
    },
    reviews: [
      { user: "Roshan Abeyratne", rating: 5, date: "2026-03-03", comment: "VO2 max tracking and marathon training plans are spot-on.", verified: true }
    ]
  },
  {
    id: "sf-03",
    name: "Manduka PRO 6mm Non-Slip High-Density Yoga Mat",
    category: "Sports & Fitness",
    brand: "Manduka",
    price: 28500,
    originalPrice: 35000,
    discountPercent: 19,
    rating: 4.7,
    reviewsCount: 88,
    stock: 20,
    badge: "Lifetime Guarantee",
    featured: false,
    deal: false,
    images: [
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Black Sage", "Odyssey Blue", "Purple"],
    description: "The #1 mat recommended by yoga teachers worldwide. Ultra-dense 6mm cushioning protects joints, closed-cell surface prevents sweat absorption, and dot pattern bottom grips any floor.",
    specs: {
      "Thickness": "6mm high-density foam cushioning",
      "Dimensions": "180cm x 66cm (standard)",
      "Standard": "OEKO-TEX certified emission-free manufacturing"
    },
    reviews: [
      { user: "Chamari Atapattu", rating: 5, date: "2026-01-11", comment: "Incredible joint protection on knees during Ashtanga sessions.", verified: true }
    ]
  },

  // 11. Gaming Accessories
  {
    id: "ga-01",
    name: "Razer BlackWidow V4 Pro Mechanical Gaming Keyboard",
    category: "Gaming Accessories",
    brand: "Razer",
    price: 78500,
    originalPrice: 94000,
    discountPercent: 16,
    rating: 4.8,
    reviewsCount: 162,
    stock: 14,
    badge: "Pro Gamer",
    featured: true,
    deal: true,
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Chroma RGB Black"],
    description: "Equipped with Razer Command Dial, 8 dedicated macro keys, magnetic plush leatherette wrist rest with underglow, and Razer Green clicky optical mechanical switches.",
    specs: {
      "Switches": "Razer Green Clicky Mechanical (100M keystroke lifespan)",
      "Polling Rate": "True 8000 Hz HyperPolling",
      "Lighting": "Per-key Razer Chroma RGB with 3-side chassis underglow",
      "Keycaps": "Doubleshot ABS keycaps"
    },
    reviews: [
      { user: "Devinda Alahakoon", rating: 5, date: "2026-02-14", comment: "The command dial lets me scrub timelines in Premiere and change sound volumes instantly.", verified: true }
    ]
  },
  {
    id: "ga-02",
    name: "Logitech G502 X Plus LIGHTSPEED Wireless RGB Gaming Mouse",
    category: "Gaming Accessories",
    brand: "Logitech G",
    price: 49900,
    originalPrice: 59000,
    discountPercent: 15,
    rating: 4.9,
    reviewsCount: 304,
    stock: 25,
    badge: "Top Seller",
    featured: false,
    deal: true,
    images: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Black", "White"],
    description: "The world's favorite gaming mouse icon reimagined. Features LIGHTFORCE hybrid optical-mechanical switches, HERO 25K gaming sensor, and active 8-LED LIGHTSYNC RGB.",
    specs: {
      "Sensor": "HERO 25K sub-micron tracking, 100-25,600 DPI",
      "Weight": "106 grams lightweight redesign",
      "Switches": "Hybrid optical-mechanical LIGHTFORCE",
      "Battery": "Up to 120 hours motion on single charge"
    },
    reviews: [
      { user: "Binura Silva", rating: 5, date: "2026-03-01", comment: "Zero latency wireless. The scroll wheel dual mode is irreplaceable.", verified: true }
    ]
  },
  {
    id: "ga-03",
    name: "SteelSeries Arctis Nova 7 Wireless Multi-Platform Gaming Headset",
    category: "Gaming Accessories",
    brand: "SteelSeries",
    price: 64900,
    originalPrice: 77000,
    discountPercent: 16,
    rating: 4.7,
    reviewsCount: 110,
    stock: 12,
    badge: "Esports Choice",
    featured: false,
    deal: false,
    images: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Stealth Black"],
    description: "Nova Acoustic System with High Fidelity drivers. Simultaneous 2.4GHz wireless for gaming and Bluetooth for your phone. AI-powered ClearCast Gen 2 noise cancelling microphone.",
    specs: {
      "Audio": "Custom Neodymium Magnetic Drivers with Sonar Audio Software Suite",
      "Battery": "38-hour battery life with 15-minute USB-C fast charging (6 hrs play)",
      "Mic": "ClearCast Gen 2 bidirectional retractable microphone"
    },
    reviews: [
      { user: "Tharaka Fernando", rating: 5, date: "2026-01-18", comment: "Can play PS5 audio while answering incoming phone calls at the same time!", verified: true }
    ]
  },

  // 12. Baby Products
  {
    id: "bp-baby-01",
    name: "Graco 4Ever DLX 4-in-1 Convertible Car Seat (Infant to Booster)",
    category: "Baby Products",
    brand: "Graco",
    price: 135000,
    originalPrice: 159000,
    discountPercent: 15,
    rating: 4.9,
    reviewsCount: 240,
    stock: 9,
    badge: "Safety Award",
    featured: true,
    deal: false,
    images: [
      "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Matrix Gray", "Fairmont Charcoal"],
    description: "Gives you 10 years of use with one car seat. Transforms seamlessly from rear-facing infant car seat (4-40 lb) to forward-facing 5-point harness (22-65 lb), highback booster, and backless booster.",
    specs: {
      "Weight Range": "4 to 120 lbs (10 years of growth)",
      "Safety": "Graco ProtectPlus Engineered for frontal, side, rear & rollover crashes",
      "Harness": "Simply Safe Adjust Harness System with 10 headrest positions"
    },
    reviews: [
      { user: "Dr. Dilrukshi Jayasuriya", rating: 5, date: "2026-03-07", comment: "Installed in our SUV with the InRight LATCH system in under 2 minutes. Rock solid stability.", verified: true }
    ]
  },
  {
    id: "bp-baby-02",
    name: "Philips Avent Natural Baby Bottle Essentials Newborn Gift Set",
    category: "Baby Products",
    brand: "Philips Avent",
    price: 24500,
    originalPrice: 31000,
    discountPercent: 21,
    rating: 4.8,
    reviewsCount: 380,
    stock: 35,
    badge: "Hospital Choice",
    featured: false,
    deal: true,
    images: [
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Crystal Clear BPA Free"],
    description: "Natural Response nipple releases milk only when the baby actively drinks, just like breastfeeding. Anti-colic valve designed to reduce colic and discomfort.",
    specs: {
      "Set Includes": "4 Natural Response bottles (2x 125ml, 2x 260ml), 1 bottle brush, 2 Soothie pacifiers",
      "Material": "0% BPA high purity polypropylene",
      "Safety": "Anti-colic AirFree vent valve"
    },
    reviews: [
      { user: "Menaka Warnakula", rating: 5, date: "2026-02-19", comment: "Zero tummy gas or fussiness. Easiest bottle to transition from breastfeeding.", verified: true }
    ]
  },
  {
    id: "bp-baby-03",
    name: "Nanit Pro Smart Baby Monitor & Wall Mount with Sleep Tracking",
    category: "Baby Products",
    brand: "Nanit",
    price: 115000,
    originalPrice: 135000,
    discountPercent: 15,
    rating: 4.8,
    reviewsCount: 114,
    stock: 7,
    badge: "Smart Nursery",
    featured: false,
    deal: true,
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Pristine White"],
    description: "1080p HD video overhead view of the crib with night vision. Sensor-free breathing motion monitoring, real-time sound and motion alerts, two-way audio, and white noise sound machine.",
    specs: {
      "Camera": "1080p HD wide-angle camera with infrared night vision",
      "Audio": "Two-way talkback and customizable white noise sound generator",
      "App": "Nanit App with personalized sleep coaching analytics"
    },
    reviews: [
      { user: "Chathura Wickramatunga", rating: 5, date: "2026-01-25", comment: "Gives new parents pure peace of mind at night. The sleep graphs are unbelievable.", verified: true }
    ]
  }
];

// Product Category Metadata with Icons & Badges
const CATEGORIES_METADATA = [
  { name: "Smartphones", icon: "fa-mobile-screen-button", count: 3, banner: "https://images.unsplash.com/photo-1511707171634-5f897ff02560?auto=format&fit=crop&w=1200&q=80" },
  { name: "Computers & Laptops", icon: "fa-laptop", count: 3, banner: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80" },
  { name: "Electronics", icon: "fa-headphones-simple", count: 3, banner: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80" },
  { name: "Men’s Fashion", icon: "fa-shirt", count: 3, banner: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1200&q=80" },
  { name: "Women’s Fashion", icon: "fa-person-dress", count: 3, banner: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1200&q=80" },
  { name: "Shoes", icon: "fa-shoe-prints", count: 3, banner: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80" },
  { name: "Watches", icon: "fa-clock", count: 3, banner: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=80" },
  { name: "Home & Kitchen", icon: "fa-kitchen-set", count: 3, banner: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=1200&q=80" },
  { name: "Beauty & Personal Care", icon: "fa-spa", count: 3, banner: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80" },
  { name: "Sports & Fitness", icon: "fa-dumbbell", count: 3, banner: "https://images.unsplash.com/photo-1586401100295-7a8096fd231a?auto=format&fit=crop&w=1200&q=80" },
  { name: "Gaming Accessories", icon: "fa-gamepad", count: 3, banner: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80" },
  { name: "Baby Products", icon: "fa-baby", count: 3, banner: "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=1200&q=80" }
];

// Initial mock orders for customer order history & admin dashboard
const INITIAL_ORDERS = [
  {
    orderId: "YS-2026-8714",
    customer: {
      name: "Kasun Perera",
      email: "kasun.p@gmail.com",
      phone: "+94 77 123 4567",
      address: "No. 42/B, Galle Road",
      city: "Colombo 03",
      postalCode: "00300"
    },
    date: "2026-03-14",
    items: [
      { id: "el-01", name: "Sony WH-1000XM5 Wireless Headphones", price: 99500, quantity: 1, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80" },
      { id: "mf-01", name: "Pure European Linen Casual Shirt", price: 8490, quantity: 2, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=200&q=80" }
    ],
    subtotal: 116480,
    shippingFee: 0,
    discount: 10000,
    total: 106480,
    status: "Delivered",
    paymentMethod: "Online Card Payment"
  },
  {
    orderId: "YS-2026-9022",
    customer: {
      name: "Nadeeka Fernando",
      email: "nadeeka.f@outlook.com",
      phone: "+94 71 890 1234",
      address: "18A Kandy Road",
      city: "Kiribathgoda",
      postalCode: "11600"
    },
    date: "2026-03-18",
    items: [
      { id: "hk-01", name: "Philips XXL Digital Airfryer", price: 68500, quantity: 1, image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=200&q=80" }
    ],
    subtotal: 68500,
    shippingFee: 0,
    discount: 6850,
    total: 61650,
    status: "Processing",
    paymentMethod: "Cash on Delivery"
  },
  {
    orderId: "YS-2026-9430",
    customer: {
      name: "Sahan Wickramasinghe",
      email: "sahan.w@gmail.com",
      phone: "+94 76 555 4321",
      address: "Villa 5, Beach Road",
      city: "Bentota",
      postalCode: "80500"
    },
    date: "2026-03-21",
    items: [
      { id: "ga-02", name: "Logitech G502 X Plus Wireless Gaming Mouse", price: 49900, quantity: 1, image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=200&q=80" }
    ],
    subtotal: 49900,
    shippingFee: 650,
    discount: 0,
    total: 50550,
    status: "Shipped",
    paymentMethod: "Online Card Payment"
  }
];
