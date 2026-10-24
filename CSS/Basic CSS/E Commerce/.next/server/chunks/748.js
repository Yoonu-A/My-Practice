"use strict";exports.id=748,exports.ids=[748],exports.modules={5456:(e,a,t)=>{t.d(a,{Ge:()=>m,Oe:()=>c,c_:()=>n,fZ:()=>l});var r=t(1482),i=t.n(r),s=t(8691);let o=process.env.JWT_SECRET||"nexora_secure_default_secret_key_sri_lanka_2026";function n(e){let a=s.ZP.genSaltSync(10);return s.ZP.hashSync(e,a)}function c(e,a){return s.ZP.compareSync(e,a)}function l(e){return i().sign(e,o,{expiresIn:"7d"})}function p(e){try{return i().verify(e,o)}catch{return null}}function m(e){let a=e.headers.get("authorization");if(a&&a.startsWith("Bearer "))return p(a.split(" ")[1]);let t=e.headers.get("cookie");if(t){let e=Object.fromEntries(t.split("; ").map(e=>{let[a,...t]=e.split("=");return[a,decodeURIComponent(t.join("="))]}));if(e.nexora_token)return p(e.nexora_token)}return null}},5748:(e,a,t)=>{t.d(a,{Z:()=>u});var r=t(5890),i=t.n(r),s=t(5315),o=t.n(s),n=t(2048),c=t.n(n),l=t(5456);let p=o().join(process.cwd(),"data");c().existsSync(p)||c().mkdirSync(p,{recursive:!0});let m=o().join(p,"nexora.db"),d=new(i())(m);d.pragma("journal_mode = WAL"),d.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'customer',
      phone TEXT,
      address TEXT,
      city TEXT,
      district TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      image TEXT NOT NULL,
      description TEXT
    );

    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT NOT NULL,
      price REAL NOT NULL,
      original_price REAL,
      category_id TEXT NOT NULL,
      category_name TEXT NOT NULL,
      stock INTEGER NOT NULL DEFAULT 10,
      images TEXT NOT NULL,
      rating REAL NOT NULL DEFAULT 4.8,
      review_count INTEGER NOT NULL DEFAULT 0,
      is_featured INTEGER DEFAULT 0,
      is_best_seller INTEGER DEFAULT 0,
      is_new_arrival INTEGER DEFAULT 0,
      specs TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      order_number TEXT UNIQUE NOT NULL,
      user_id TEXT,
      customer_name TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      customer_phone TEXT NOT NULL,
      delivery_address TEXT NOT NULL,
      delivery_city TEXT NOT NULL,
      delivery_district TEXT NOT NULL,
      delivery_province TEXT NOT NULL,
      postal_code TEXT,
      delivery_notes TEXT,
      items TEXT NOT NULL,
      subtotal REAL NOT NULL,
      delivery_fee REAL NOT NULL,
      discount REAL NOT NULL DEFAULT 0,
      total REAL NOT NULL,
      payment_method TEXT NOT NULL,
      payment_status TEXT NOT NULL,
      order_status TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS reviews (
      id TEXT PRIMARY KEY,
      product_id TEXT NOT NULL,
      user_name TEXT NOT NULL,
      rating INTEGER NOT NULL,
      comment TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `),function(){if(0===d.prepare("SELECT COUNT(*) as count FROM users").get().count){let e=(0,l.c_)(process.env.ADMIN_PASSWORD||"Admin@Nexora2026!"),a=(0,l.c_)("Customer123!"),t=d.prepare(`
      INSERT INTO users (id, name, email, password_hash, role, phone, address, city, district, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);t.run("usr-admin-01","Nexora Admin",process.env.ADMIN_EMAIL||"admin@nexorastore.lk",e,"admin","+94 77 123 4567","No. 45, Galle Road","Colombo 03","Colombo",new Date().toISOString()),t.run("usr-demo-01","Kasun Perera","customer@nexorastore.lk",a,"customer","+94 71 987 6543","24/B, Flower Road","Colombo 07","Colombo",new Date().toISOString())}if(0===d.prepare("SELECT COUNT(*) as count FROM categories").get().count){let e=d.prepare(`
      INSERT INTO categories (id, name, slug, image, description)
      VALUES (?, ?, ?, ?, ?)
    `);for(let a of[{id:"electronics",name:"Electronics",slug:"electronics",image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",description:"Audio, high-fidelity headphones, speakers, and smart gadgets"},{id:"smartphones",name:"Smartphones",slug:"smartphones",image:"https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=800&auto=format&fit=crop",description:"Flagship smartphones, 5G devices, and modern tablets"},{id:"fashion",name:"Fashion",slug:"fashion",image:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop",description:"Contemporary apparel, designer jackets, and premium tailoring"},{id:"shoes",name:"Shoes",slug:"shoes",image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",description:"Performance sneakers, sports footwear, and formal shoes"},{id:"watches",name:"Watches",slug:"watches",image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",description:"Luxury chronographs, smart timepieces, and automatic watches"},{id:"accessories",name:"Accessories",slug:"accessories",image:"https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop",description:"Premium leather wallets, minimalist bags, sunglasses and tech cases"}])e.run(a.id,a.name,a.slug,a.image,a.description)}if(0===d.prepare("SELECT COUNT(*) as count FROM products").get().count){let e=d.prepare(`
      INSERT INTO products (
        id, name, slug, description, price, original_price, category_id,
        category_name, stock, images, rating, review_count, is_featured,
        is_best_seller, is_new_arrival, specs, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);for(let a of[{id:"prod-001",name:"Sony WH-1000XM5 Wireless Noise-Cancelling Headphones",slug:"sony-wh1000xm5-wireless-headphones",description:"Industry-leading noise cancellation with two processors and 8 microphones. High-Resolution Audio with LDAC, up to 30 hours battery life with quick charging, and speak-to-chat smart listening technology.",price:118e3,originalPrice:135e3,categoryId:"electronics",categoryName:"Electronics",stock:14,images:["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop","https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1000&auto=format&fit=crop","https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000&auto=format&fit=crop"],rating:4.9,reviewCount:48,isFeatured:1,isBestSeller:1,isNewArrival:0,specs:{"Battery Life":"30 Hours",Bluetooth:"v5.2, Multipoint",Weight:"250g","Noise Cancelling":"Dual Processor V1 + HD QN1",Warranty:"1 Year Singer/Sony Sri Lanka"}},{id:"prod-002",name:"Marshall Stanmore III Bluetooth Home Speaker",slug:"marshall-stanmore-iii-speaker",description:"The heavyweight of Marshall home lineup, Stanmore III re-engineered for a wider, room-filling soundstage. Features Bluetooth 5.2, RCA and 3.5mm inputs, and iconic vintage brass accents.",price:145e3,originalPrice:165e3,categoryId:"electronics",categoryName:"Electronics",stock:8,images:["https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1000&auto=format&fit=crop","https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1000&auto=format&fit=crop"],rating:4.8,reviewCount:22,isFeatured:1,isBestSeller:0,isNewArrival:1,specs:{"Frequency Range":"45–20,000 Hz","Power Amplifiers":"One 50 Watt Class D (Woofer), Two 15 Watt Class D (Tweeters)",Connectivity:"Bluetooth 5.2, 3.5mm Aux, RCA",Dimensions:"350 x 203 x 188 mm"}},{id:"prod-003",name:"Apple iPhone 16 Pro Max - 256GB Natural Titanium",slug:"apple-iphone-16-pro-max-256gb",description:"Forged in Grade 5 Titanium with the powerful A18 Pro chip. Features Camera Control, 48MP Fusion camera system, and the biggest battery leap ever in an iPhone. Includes TRCSL approval for Sri Lanka.",price:485e3,originalPrice:515e3,categoryId:"smartphones",categoryName:"Smartphones",stock:9,images:["https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1000&auto=format&fit=crop","https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1000&auto=format&fit=crop","https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1000&auto=format&fit=crop"],rating:5,reviewCount:65,isFeatured:1,isBestSeller:1,isNewArrival:1,specs:{Display:"6.9-inch Super Retina XDR OLED 120Hz",Chip:"Apple A18 Pro (3nm)",Camera:"48MP Main + 48MP Ultra-Wide + 12MP 5x Telephoto",Storage:"256GB NVMe",Certification:"TRCSL Approved with 1 Year Apple Care"}},{id:"prod-004",name:"Samsung Galaxy S24 Ultra 5G - Titanium Gray",slug:"samsung-galaxy-s24-ultra-5g",description:"Meet Galaxy S24 Ultra with Galaxy AI built-in. Titanium shield body, built-in S Pen, 200MP camera with ProVisual Engine, and Snapdragon 8 Gen 3 for Galaxy.",price:395e3,originalPrice:425e3,categoryId:"smartphones",categoryName:"Smartphones",stock:11,images:["https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=1000&auto=format&fit=crop","https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1000&auto=format&fit=crop"],rating:4.8,reviewCount:39,isFeatured:0,isBestSeller:1,isNewArrival:0,specs:{Display:"6.8-inch Dynamic AMOLED 2X, 2600 nits peak",Processor:"Snapdragon 8 Gen 3",Battery:"5000mAh with 45W Fast Charging",Stylus:"Embedded S-Pen with Air Actions"}},{id:"prod-005",name:"Seiko Prospex Speedtimer Solar Chronograph",slug:"seiko-prospex-speedtimer-solar",description:"Precision Japanese solar chronograph powered by any light source. Features a classic panda dial, anti-reflective sapphire crystal, tachymeter bezel, and solid stainless steel bracelet.",price:198e3,originalPrice:22e4,categoryId:"watches",categoryName:"Watches",stock:6,images:["https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop","https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop"],rating:4.9,reviewCount:19,isFeatured:1,isBestSeller:1,isNewArrival:0,specs:{Caliber:"Solar V192 (6-month power reserve)","Case Size":"39mm diameter, 13.3mm thickness",Glass:"Curved Sapphire Crystal with AR coating","Water Resistance":"100m (10 Bar)"}},{id:"prod-006",name:"Apple Watch Ultra 2 - Titanium Ocean Band",slug:"apple-watch-ultra-2-ocean-band",description:"The most rugged and capable Apple Watch. 49mm aerospace-grade titanium case, precision dual-frequency GPS, up to 36 hours of battery life, and 3000 nits Always-On display.",price:295e3,originalPrice:32e4,categoryId:"watches",categoryName:"Watches",stock:7,images:["https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=1000&auto=format&fit=crop","https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1000&auto=format&fit=crop"],rating:4.9,reviewCount:31,isFeatured:1,isBestSeller:0,isNewArrival:1,specs:{"Case Material":"Titanium 49mm",Display:"3,000 nits sapphire crystal","Water Resistance":"100m EN13319 certified dive computer",Battery:"Up to 36 hours regular, 72 hours low-power"}},{id:"prod-007",name:"Nike Air Max Pulse Roam - Midnight Navy Edition",slug:"nike-air-max-pulse-roam-navy",description:"Durable textiles and leather overlays combine with a point-loaded Air cushioning system for superior comfort and rugged urban style. Perfect for everyday wear and workouts.",price:46500,originalPrice:52e3,categoryId:"shoes",categoryName:"Shoes",stock:18,images:["https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop","https://images.unsplash.com/photo-1607522370275-f14206abe5d3?q=80&w=1000&auto=format&fit=crop"],rating:4.7,reviewCount:54,isFeatured:1,isBestSeller:1,isNewArrival:0,specs:{Upper:"Breathable Mesh with Suede & Rubber mudguards",Sole:"Waffle-inspired rubber outsole",Cushioning:"Point-loaded Nike Air system",Origin:"Imported Vietnam"}},{id:"prod-008",name:"Adidas Originals Samba OG Leather Classic",slug:"adidas-originals-samba-og-classic",description:"Born on the pitch, the Samba is a timeless icon of street style. Features soft leather upper with suede T-toe overlay, signature 3-stripes, and gum rubber cupsole.",price:38e3,originalPrice:42e3,categoryId:"shoes",categoryName:"Shoes",stock:22,images:["https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=1000&auto=format&fit=crop","https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1000&auto=format&fit=crop"],rating:4.8,reviewCount:42,isFeatured:0,isBestSeller:1,isNewArrival:0,specs:{Upper:"Full grain leather with gritty suede",Lining:"Synthetic leather",Outsole:"Low-profile gum rubber"}},{id:"prod-009",name:"Nexora Tailored Italian Wool Minimalist Blazer",slug:"nexora-tailored-wool-minimalist-blazer",description:"Crafted from super 130s Italian virgin wool with half-canvas construction. Modern slim silhouette designed for boardroom meetings and upscale evening events.",price:49500,originalPrice:58e3,categoryId:"fashion",categoryName:"Fashion",stock:12,images:["https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop","https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop"],rating:4.9,reviewCount:17,isFeatured:1,isBestSeller:0,isNewArrival:1,specs:{Material:"100% Super 130s Virgin Wool",Lining:"Breathable Cupro Bemberg",Fit:"Modern Slim Structured",Care:"Dry Clean Only"}},{id:"prod-010",name:"Nexora Urban Tech Utility Overshirt Jacket",slug:"nexora-urban-tech-utility-overshirt",description:"Water-resistant Japanese nylon ripstop overshirt with dual magnetic chest pockets, concealed YKK zippers, and relaxed drop-shoulder cut.",price:26500,originalPrice:31e3,categoryId:"fashion",categoryName:"Fashion",stock:15,images:["https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000&auto=format&fit=crop","https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop"],rating:4.7,reviewCount:28,isFeatured:0,isBestSeller:1,isNewArrival:1,specs:{Fabric:"DWR Coated 100% Nylon Ripstop",Zippers:"YKK Aquaguard matte finish",Pockets:"4 ergonomic utility compartments"}},{id:"prod-011",name:"Bellroy Apex Full Grain RFID Leather Slim Wallet",slug:"bellroy-apex-rfid-leather-slim-wallet",description:"Precision molded leather with magnetic closures and stitchless bonded construction. Holds 6-10 cards, flat bills, and features RFID protection.",price:24500,originalPrice:28500,categoryId:"accessories",categoryName:"Accessories",stock:25,images:["https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000&auto=format&fit=crop","https://images.unsplash.com/photo-1606503829068-1249e0c65507?q=80&w=1000&auto=format&fit=crop"],rating:4.9,reviewCount:36,isFeatured:1,isBestSeller:1,isNewArrival:0,specs:{Material:"Certified Environmentally Sourced Leather",Capacity:"6-10 Cards + Flat Banknotes",Security:"RFID Blocking Lining",Warranty:"3 Year Manufacturer Warranty"}},{id:"prod-012",name:"Ray-Ban Aviator Classic Polarized Sunglasses",slug:"ray-ban-aviator-classic-polarized",description:"Originally created for U.S. Aviators in 1937, featuring gold metal frame with G-15 crystal green polarized lenses for 100% UV protection and clarity.",price:58e3,originalPrice:66e3,categoryId:"accessories",categoryName:"Accessories",stock:12,images:["https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000&auto=format&fit=crop","https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000&auto=format&fit=crop"],rating:4.8,reviewCount:44,isFeatured:0,isBestSeller:1,isNewArrival:0,specs:{Frame:"Polished Arista Gold Metal",Lenses:"Polarized Green Classic G-15","Lens Width":"58 mm",Case:"Original Leather Case & Microfiber Cloth included"}}])e.run(a.id,a.name,a.slug,a.description,a.price,a.originalPrice,a.categoryId,a.categoryName,a.stock,JSON.stringify(a.images),a.rating,a.reviewCount,a.isFeatured,a.isBestSeller,a.isNewArrival,JSON.stringify(a.specs),new Date().toISOString())}if(0===d.prepare("SELECT COUNT(*) as count FROM reviews").get().count){let e=d.prepare(`
      INSERT INTO reviews (id, product_id, user_name, rating, comment, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `);e.run("rev-01","prod-001","Nuwan Samaraweera (Colombo)",5,"The noise cancellation on the Sony XM5 is unreal during my flights from Colombo to Singapore. Outstanding build quality and fast 2-day delivery by Nexora Store!","2026-09-12T10:15:00Z"),e.run("rev-02","prod-003","Dilshan Fernando (Kandy)",5,"Verified TRCSL unit with genuine warranty. COD process was super smooth and driver called in advance before delivering in Kandy. 100% recommended!","2026-09-18T14:30:00Z"),e.run("rev-03","prod-007","Chamari Wickramasinghe (Galle)",5,"Great pair of Nike shoes, genuine and extremely comfortable. Fits true to size. Will buy again from Nexora.","2026-10-02T11:45:00Z")}}();let u=d}};