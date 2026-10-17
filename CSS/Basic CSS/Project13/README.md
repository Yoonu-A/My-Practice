# Yoonu Store - Modern Amazon-Inspired E-Commerce Platform

A modern, high-performance, responsive e-commerce web application inspired by tier-1 global marketplaces, custom-tailored for Sri Lankan commerce with **LKR (Sri Lankan Rupee)** pricing, islandwide delivery calculations, and rich customer and administrator workflows.

Built strictly using **HTML5**, **Vanilla CSS3**, and **Vanilla JavaScript** with zero external runtime build dependencies.

---

## 🌟 Key Highlights & Features

### 1. Homepage & Storefront Experience
- **Amazon-Inspired Header Architecture**:
  - Distinctive **Yoonu Store** brand identity with shopping bag badge.
  - "Deliver to Sri Lanka / Colombo 03" location indicator.
  - Category-scoped search bar with live autocomplete suggestions dropdown.
  - Real-time shopping cart badge with live subtotal preview.
  - User profile / account dropdown, Returns & Orders, and Saved Wishlist counter.
- **Hero Promotional Carousel**:
  - Auto-advancing slides (Tech Mega Sale, Silk & Linen Fashion, Next-Gen Gaming Gear) with pause-on-hover, arrow controls, and dot indicators.
- **Value Trust Pillars**:
  - Islandwide Fast Delivery (Free over Rs. 15,000), 100% Genuine Guaranteed, 7-Day Easy Returns, Secure Payments (COD & Cards).
- **Interactive Category Explorer**:
  - Grid covering all 12 product categories with instant one-click filtering.
- **Today's Flash Deals Section**:
  - Urgency countdown timer (Hours : Minutes : Seconds) ticking in real time.
  - Limited-time discounts, percentage claimed progress bar, and 1-click Add to Cart.
- **Recently Viewed Products**:
  - Dynamically captures items the user browses and persists them in `localStorage`.
- **Special Discount Coupon Banner**:
  - One-click copy for promo code `YOONU10` (10% extra discount).
- **Verified Customer Testimonials & Reviews**:
  - Social proof with customer names, locations, star ratings, and verified buyer badges.
- **Newsletter Subscription**:
  - Responsive form with instant validation toast.
- **Comprehensive Multi-Column Footer**:
  - Back-to-top smooth scroll button.
  - 4 categories of links: Get to Know Us, Shop With Us, Make Money With Us, and Help Center.
  - Accepted payment badges (Visa, Mastercard, Amex, Cash on Delivery, Koko, Mintpay).

---

### 2. Full 12 Product Categories Covered
Every category contains realistic, premium items with genuine specifications, images, and prices:
1. **Smartphones** (e.g., iPhone 15 Pro Max 256GB, Samsung Galaxy S24 Ultra, Google Pixel 8 Pro)
2. **Computers & Laptops** (e.g., Apple MacBook Air M3 15", ASUS ROG Zephyrus G16 OLED, Dell XPS 15)
3. **Electronics** (e.g., Sony WH-1000XM5 ANC Headphones, Canon EOS R50 Mirrorless, Bose SoundLink Max)
4. **Men’s Fashion** (e.g., European Linen Casual Shirt, Slim-Fit Chinos, Genuine Leather Biker Jacket)
5. **Women’s Fashion** (e.g., Silk-Blend Floral Maxi Dress, Cashmere Cardigan, Wide-Leg Linen Palazzo)
6. **Shoes** (e.g., Nike Air Max 270, Clarks Leather Oxford Dress Shoes, Adidas Ultraboost Light)
7. **Watches** (e.g., Seiko Presage Automatic 'Blue Moon', Apple Watch Series 9, Fossil Grant Chronograph)
8. **Home & Kitchen** (e.g., Philips XXL Digital Airfryer, Nespresso Vertuo Pop, Roborock S8 Pro Ultra Robot Vacuum)
9. **Beauty & Personal Care** (e.g., Dyson Supersonic Hair Dryer, CeraVe Hydrating Bundle, The Ordinary Routine Set)
10. **Sports & Fitness** (e.g., Bowflex SelectTech Adjustable Dumbbells, Garmin Forerunner 265, Manduka PRO Yoga Mat)
11. **Gaming Accessories** (e.g., Razer BlackWidow V4 Pro Keyboard, Logitech G502 X Plus Wireless Mouse, SteelSeries Arctis Nova 7 Headset)
12. **Baby Products** (e.g., Graco 4Ever DLX 4-in-1 Car Seat, Philips Avent Natural Bottle Set, Nanit Pro Smart Baby Monitor)

---

### 3. Advanced Search, Filtering & Sorting
- **Live Search Autocomplete**: Filters through names, brands, descriptions, and categories in real time with keyword highlighting.
- **Category Filter**: Selectable from the search bar, category cards, subnav, or sidebar checklist.
- **Price Range Filter**: Interactive range slider and dual numeric Min/Max LKR inputs with instant updates.
- **Customer Rating Filter**: 4.8★+, 4.5★+, 4.0★+, and All Ratings options.
- **Discount Filter**: 20%+ Off, 15%+ Off, 10%+ Off, or All Discounts.
- **Availability Toggle**: "In Stock Only" checkbox.
- **Active Filter Chips**: Clickable dismiss pills showing all active filters with one-click removal.
- **Sorting Options**:
  - Featured / Recommended
  - Price: Low to High
  - Price: High to Low
  - Avg. Customer Review
  - Biggest Discount (%)

---

### 4. Fully Functional Shopping Cart (with Drawer & Persistent Storage)
- **Slide-Over Drawer**: Opens smoothly without reloading the page.
- **Live Item Count Badge**: Updates in header and drawer simultaneously.
- **Interactive Quantity Stepper**: Increment or decrement quantities with real-time subtotal updates.
- **Automatic Calculations**:
  - **Subtotal**: Sum of all items.
  - **Delivery Fee**: Automatically calculates free shipping if order exceeds **Rs. 15,000**, otherwise applies standard islandwide delivery (**Rs. 650**).
  - **Dynamic Free Shipping Progress Bar**: Visual meter showing how much more to add to unlock free delivery.
  - **Discount Voucher**: Enter `YOONU10` for 10% off or `WELCOME5` for 5% off.
  - **Final Total**: Real-time recalculation in LKR.
- **Persistence**: Cart automatically saves to `localStorage` and restores on page reload.
- **Empty Cart State**: Illustrated friendly message with a "Start Shopping" button.

---

### 5. Product Details Modal (Quick View & Comprehensive PDP)
- **Image Gallery**: Large primary view with interactive thumbnail switcher.
- **Product Overview**: Title, brand, category breadcrumb, star rating, and verified review count.
- **Pricing & Savings**: Current LKR price, strikethrough original price, and percentage discount pill.
- **Interactive Color Swatches & Size Chips**: Live selection indicators.
- **Stock Counter**: Displays "Only X left in stock!" when inventory drops below 5.
- **Quantity Selector**: Stepper controls.
- **Specifications Table**: Structured technical details (Processor, Dimensions, Battery, Materials).
- **Customer Reviews & Review Submission**: Displays real reviews with verified purchaser badges, and includes an interactive form to submit new reviews!
- **Action Buttons**: "Add to Cart" and "Buy Now" (which takes you directly to Checkout).

---

### 6. User Account, Order History & Authentication
- **Modal Switcher**: "Sign In" vs "Create Account" tabs.
- **Client-Side Form Validation**: Email syntax, minimum password length (6 characters), and Sri Lankan phone numbers.
- **User Profile Dashboard**:
  - Recipient profile details and avatar initials.
  - Order History interface with Order ID, dates, status badges (*Processing*, *Shipped*, *Delivered*), and line item breakdowns.
  - Sign Out option.
- **Security Notice**: Clear callout outlining how production systems secure user data via bcrypt, JWT tokens, and HTTPS.

---

### 7. Checkout & Order Confirmation
- **Multi-Step Checkout Flow**:
  - Step 1: Customer Information & Delivery Address (Name, Phone, Street, City, Postal Code).
  - Step 2: Payment Method Selection:
    - **Cash on Delivery (COD)** (Default)
    - **Credit / Debit Card Online** (Demonstration card input form with clear disclaimer)
    - **Koko / Mintpay (3x Installments)**
  - Step 3: Order Summary with subtotal, shipping fee, voucher savings, and final total in LKR.
- **Order Placement**:
  - Generates unique Order ID (e.g. `YS-2026-9812`).
  - Prepopulates user order history.
  - Automatically empties the cart.
  - Opens Order Confirmation modal with order details, estimated delivery date (Within 48 hours), and a **Print Receipt** action.

---

### 8. Wishlist
- Add or remove products from wishlist via heart icons on cards and modal.
- Slide-over / modal Wishlist view.
- "Move to Cart" button per item.
- "Move All to Cart" one-click action.
- Persisted in `localStorage`.

---

### 9. Administrative Dashboard (Manager Portal)
Accessible via the **Admin Portal** button in the navigation bar:
- **KPI Metrics Cards**:
  - Total Revenue (LKR)
  - Total Orders
  - Catalog Size
  - Active Customers
- **Product Catalog Management (CRUD)**:
  - Searchable products table with thumbnail, category, price, stock, and rating.
  - **Add New Product Modal**: Add items with name, category, brand, price, original price, stock, image URL, and description.
  - **Edit Product Modal**: Modify existing items with real-time updates.
  - **Delete Product**: One-click removal with confirmation.
- **Orders Management**:
  - Real-time order status selector dropdown (*Processing*, *Shipped*, *Delivered*, *Cancelled*).
  - Changes save directly to `localStorage` and immediately reflect in customer order history.
- **Backend Architecture Roadmap**: Detailed reference architecture for commercial production.

---

## 📁 Project Structure

```
Project13/
│
├── index.html       # Semantic HTML5 storefront, header, modals, checkout & drawers
├── style.css        # Vanilla CSS3 design system, responsive breakpoints, tokens & themes
├── products.js      # Catalog database (36 products across 12 categories, initial orders)
├── script.js        # Core JavaScript application logic, state, cart, wishlist, search & admin
└── README.md        # Comprehensive documentation and developer guide
```

---

## 🚀 How to Run the Project in VS Code using Live Server

1. **Open the Project in VS Code**:
   - Open Visual Studio Code.
   - Go to `File` > `Open Folder...` and select:
     ```
     c:\Users\G15\Desktop\New folder\New folder\My-Practice\CSS\Basic CSS\Project13
     ```

2. **Install the Live Server Extension** (if not already installed):
   - Click on the Extensions icon in the left sidebar (or press `Ctrl + Shift + X`).
   - Search for **Live Server** (by *Ritwick Dey*).
   - Click **Install**.

3. **Launch the Application**:
   - In the VS Code file explorer, right-click on `index.html`.
   - Select **"Open with Live Server"** (or click **"Go Live"** in the bottom status bar).
   - Your default web browser will open at:
     ```
     http://127.0.0.1:5500/index.html
     ```

*(Alternative: You can also simply double-click `index.html` to open it directly in Google Chrome, Microsoft Edge, Firefox, or Safari).*

---

## 🔑 Useful Demo Shortcuts & Testing Tips

- **Pre-configured Customer**: Signed in by default as **Kasun Perera** (`kasun.p@gmail.com`).
- **Discount Promo Code**: Type `YOONU10` in the cart drawer promo box for **10% off**, or `WELCOME5` for **5% off**.
- **Admin Portal**: Click the yellow **Admin Portal** button on the right side of the secondary navigation bar to view real-time revenue, manage orders, and add/edit products.
- **Free Shipping Threshold**: Add products with a subtotal over **Rs. 15,000** to see the delivery charge drop from Rs. 650 to **FREE**!

---

## 🏗️ Architecture: Frontend Demonstration vs. Production Enterprise Backend

This project represents a feature-complete, modern frontend interface. To deploy Yoonu Store as a commercial production enterprise, replace client-side `localStorage` with the following backend infrastructure:

| Component | Frontend Demonstration (Current) | Production Enterprise Stack |
| :--- | :--- | :--- |
| **Runtime & Server** | Client browser (HTML/CSS/JS) | **Node.js** with **Express.js** / **NestJS** or **Go** |
| **Database** | `localStorage` JSON serialization | **PostgreSQL** or **MySQL** with Prisma ORM; Redis for cache |
| **Authentication** | Client state simulation | **JWT (JSON Web Tokens)** in HttpOnly cookies, **bcrypt** password hashing, OAuth2 (Google/Apple) |
| **Payments** | Demonstration UI with COD default | Official **PayHere Sri Lanka** (IPG), **Stripe**, and **Koko/Mintpay** webhooks |
| **Product Media** | Unsplash CDN URLs | **AWS S3** or **Cloudinary** with automated WebP conversion & CDN edge caching |
| **Security** | Frontend form validation | Server-side validation (Zod/Joi), CORS policies, Helmet headers, rate limiting |
| **Deployment** | Static hosting (Vercel / Netlify / GitHub Pages) | Containerized via **Docker**, orchestrated on AWS ECS / DigitalOcean Kubernetes |
