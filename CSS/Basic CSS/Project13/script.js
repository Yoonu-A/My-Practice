/**
 * ==========================================================================
 * YOONU STORE - MASTER JAVASCRIPT APPLICATION
 * Complete E-Commerce Storefront Engine, Cart, Wishlist, Search, Checkout & Admin
 * ==========================================================================
 */

(function () {
  "use strict";

  // --- 1. Global Application State ---
  const state = {
    products: [],
    categories: CATEGORIES_METADATA,
    cart: [],
    wishlist: [],
    recentlyViewed: [],
    orders: [],
    currentUser: null,
    appliedCoupon: null,
    activeFilters: {
      category: "All",
      minPrice: 0,
      maxPrice: 750000,
      minRating: 0,
      minDiscount: 0,
      inStockOnly: false,
      searchQuery: ""
    },
    activeSort: "featured",
    heroSlideIndex: 0,
    heroTimer: null
  };

  // --- 2. Storage Keys ---
  const STORAGE_KEYS = {
    PRODUCTS: "yoonu_products_v1",
    CART: "yoonu_cart_v1",
    WISHLIST: "yoonu_wishlist_v1",
    RECENTLY_VIEWED: "yoonu_recently_viewed_v1",
    ORDERS: "yoonu_orders_v1",
    USER: "yoonu_current_user_v1",
    COUPON: "yoonu_applied_coupon_v1"
  };

  // --- 3. Utility Helpers ---
  const utils = {
    // Format number to Sri Lankan Rupee (LKR)
    formatLKR(amount) {
      const rounded = Math.round(Number(amount) || 0);
      return "Rs. " + rounded.toLocaleString("en-LK");
    },

    // Render Star Rating HTML
    renderStars(rating) {
      const fullStars = Math.floor(rating);
      const hasHalf = rating % 1 >= 0.4;
      let starsHtml = "";
      for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
          starsHtml += '<i class="fa-solid fa-star"></i>';
        } else if (i === fullStars && hasHalf) {
          starsHtml += '<i class="fa-solid fa-star-half-stroke"></i>';
        } else {
          starsHtml += '<i class="fa-regular fa-star"></i>';
        }
      }
      return `<span class="rating-stars">${starsHtml}</span>`;
    },

    // Show dynamic floating toast notification
    showToast(message, type = "info", iconClass = null) {
      const container = document.getElementById("toast-container");
      if (!container) return;

      const toast = document.createElement("div");
      toast.className = `toast ${type}`;
      
      let defaultIcon = "fa-circle-info";
      if (type === "success") defaultIcon = "fa-circle-check";
      if (type === "danger") defaultIcon = "fa-circle-exclamation";
      
      const icon = iconClass || defaultIcon;
      toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
      
      container.appendChild(toast);

      setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(100%)";
        toast.style.transition = "all 0.3s ease";
        setTimeout(() => toast.remove(), 300);
      }, 3500);
    },

    // Generate unique order ID
    generateOrderId() {
      const year = new Date().getFullYear();
      const rand = Math.floor(1000 + Math.random() * 9000);
      return `YS-${year}-${rand}`;
    }
  };

  // --- 4. Initialization & State Persistence ---
  function initState() {
    // 1. Products
    const savedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (savedProducts) {
      try {
        state.products = JSON.parse(savedProducts);
      } catch (e) {
        state.products = [...INITIAL_PRODUCTS];
      }
    } else {
      state.products = [...INITIAL_PRODUCTS];
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(state.products));
    }

    // 2. Cart
    const savedCart = localStorage.getItem(STORAGE_KEYS.CART);
    if (savedCart) {
      try { state.cart = JSON.parse(savedCart); } catch (e) { state.cart = []; }
    }

    // 3. Wishlist
    const savedWishlist = localStorage.getItem(STORAGE_KEYS.WISHLIST);
    if (savedWishlist) {
      try { state.wishlist = JSON.parse(savedWishlist); } catch (e) { state.wishlist = []; }
    }

    // 4. Recently Viewed
    const savedRecent = localStorage.getItem(STORAGE_KEYS.RECENTLY_VIEWED);
    if (savedRecent) {
      try { state.recentlyViewed = JSON.parse(savedRecent); } catch (e) { state.recentlyViewed = []; }
    }

    // 5. Orders
    const savedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (savedOrders) {
      try { state.orders = JSON.parse(savedOrders); } catch (e) { state.orders = [...INITIAL_ORDERS]; }
    } else {
      state.orders = [...INITIAL_ORDERS];
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(state.orders));
    }

    // 6. User (Default logged in user for immediate seamless experience)
    const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
    if (savedUser) {
      try { state.currentUser = JSON.parse(savedUser); } catch (e) { state.currentUser = null; }
    } else {
      state.currentUser = {
        name: "Kasun Perera",
        email: "kasun.p@gmail.com",
        phone: "+94 77 123 4567",
        address: "No. 42/B, Galle Road",
        city: "Colombo 03",
        postalCode: "00300"
      };
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(state.currentUser));
    }

    // 7. Coupon
    const savedCoupon = localStorage.getItem(STORAGE_KEYS.COUPON);
    if (savedCoupon) {
      try { state.appliedCoupon = JSON.parse(savedCoupon); } catch (e) { state.appliedCoupon = null; }
    }
  }

  function saveCart() {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(state.cart));
    updateCartUI();
  }

  function saveWishlist() {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(state.wishlist));
    updateWishlistUI();
  }

  function saveProducts() {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(state.products));
    renderProducts();
    renderTodayDeals();
    renderCategoriesGrid();
    renderCategoryFilters();
    updateAdminStats();
  }

  function saveOrders() {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(state.orders));
    updateAdminStats();
  }

  // --- 5. Catalog & Homepage Rendering ---

  // Render 12 Categories in Category Explorer Grid
  function renderCategoriesGrid() {
    const container = document.getElementById("categories-grid-container");
    if (!container) return;

    container.innerHTML = state.categories.map(cat => {
      // Calculate current active items in this category
      const count = state.products.filter(p => p.category === cat.name).length;
      const isActive = state.activeFilters.category === cat.name ? "active" : "";
      return `
        <div class="category-card ${isActive}" onclick="app.filterByCategory('${cat.name}')">
          <div class="category-icon-box">
            <i class="fa-solid ${cat.icon}"></i>
          </div>
          <div class="category-name">${cat.name}</div>
          <div class="category-count">${count} Products</div>
        </div>
      `;
    }).join("");
  }

  // Render Categories inside Filter Sidebar
  function renderCategoryFilters() {
    const container = document.getElementById("category-filter-list");
    if (!container) return;

    let html = `
      <div class="filter-item">
        <label>
          <input type="radio" name="sidebar-category" value="All" ${state.activeFilters.category === "All" ? "checked" : ""}>
          All Categories
        </label>
        <span class="item-count">(${state.products.length})</span>
      </div>
    `;

    state.categories.forEach(cat => {
      const count = state.products.filter(p => p.category === cat.name).length;
      const isChecked = state.activeFilters.category === cat.name ? "checked" : "";
      html += `
        <div class="filter-item">
          <label>
            <input type="radio" name="sidebar-category" value="${cat.name}" ${isChecked}>
            ${cat.name}
          </label>
          <span class="item-count">(${count})</span>
        </div>
      `;
    });

    container.innerHTML = html;

    // Attach listener
    container.querySelectorAll('input[name="sidebar-category"]').forEach(radio => {
      radio.addEventListener("change", (e) => {
        app.filterByCategory(e.target.value);
      });
    });
  }

  // Render Today's Deals Section
  function renderTodayDeals() {
    const container = document.getElementById("deals-grid-container");
    if (!container) return;

    const deals = state.products.filter(p => p.deal || p.discountPercent >= 15).slice(0, 4);

    container.innerHTML = deals.map(product => {
      const isWishlisted = state.wishlist.includes(product.id);
      return `
        <div class="product-card">
          <div class="card-top-badges">
            <span class="badge badge-deal"><i class="fa-solid fa-fire"></i> ${product.discountPercent}% OFF</span>
          </div>
          <button class="wishlist-heart-btn ${isWishlisted ? "active" : ""}" 
                  onclick="app.toggleWishlist('${product.id}', this)" 
                  title="Add to Wishlist">
            <i class="fa-${isWishlisted ? "solid" : "regular"} fa-heart"></i>
          </button>
          <div class="product-image-wrap" onclick="app.openProductDetails('${product.id}')">
            <img src="${product.images[0]}" 
                 alt="${product.name}" 
                 class="product-img"
                 onerror="this.src='https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80'">
          </div>
          <div class="product-card-body">
            <span class="product-category-tag">${product.category}</span>
            <h3 class="product-title" onclick="app.openProductDetails('${product.id}')">${product.name}</h3>
            
            <div class="product-rating-row">
              ${utils.renderStars(product.rating)}
              <span class="rating-count">(${product.reviewsCount})</span>
            </div>

            <div class="product-price-row">
              <div class="price-container">
                <span class="price-current">${utils.formatLKR(product.price)}</span>
                <span class="price-original">${utils.formatLKR(product.originalPrice)}</span>
              </div>
            </div>

            <div style="margin-bottom: 12px;">
              <div style="display: flex; justify-content: space-between; font-size: 0.72rem; color: var(--danger); font-weight: 700; margin-bottom: 4px;">
                <span>78% Claimed</span>
                <span>Only ${product.stock} left</span>
              </div>
              <div style="height: 6px; background-color: #f3f4f6; border-radius: 999px; overflow: hidden;">
                <div style="width: 78%; height: 100%; background: linear-gradient(90deg, #cc0c39, #f08804); border-radius: 999px;"></div>
              </div>
            </div>

            <div class="product-card-actions">
              <button class="btn btn-sm btn-primary" onclick="app.addToCart('${product.id}', 1)">
                <i class="fa-solid fa-cart-plus"></i> Add
              </button>
              <button class="btn btn-sm btn-secondary" onclick="app.buyNow('${product.id}')">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  // Filter & Sort Engine
  function getFilteredProducts() {
    let list = [...state.products];

    // 1. Search Query
    if (state.activeFilters.searchQuery.trim() !== "") {
      const q = state.activeFilters.searchQuery.toLowerCase().trim();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    // 2. Category Filter
    if (state.activeFilters.category !== "All") {
      list = list.filter(p => p.category === state.activeFilters.category);
    }

    // 3. Price Range Filter
    list = list.filter(p => p.price >= state.activeFilters.minPrice && p.price <= state.activeFilters.maxPrice);

    // 4. Rating Filter
    if (state.activeFilters.minRating > 0) {
      list = list.filter(p => p.rating >= state.activeFilters.minRating);
    }

    // 5. Discount Filter
    if (state.activeFilters.minDiscount > 0) {
      list = list.filter(p => p.discountPercent >= state.activeFilters.minDiscount);
    }

    // 6. In Stock Only
    if (state.activeFilters.inStockOnly) {
      list = list.filter(p => p.stock > 0);
    }

    // 7. Sorting
    switch (state.activeSort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "discount-desc":
        list.sort((a, b) => b.discountPercent - a.discountPercent);
        break;
      case "featured":
      default:
        list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return list;
  }

  // Render Product Grid in Main Shop Section
  function renderProducts() {
    const grid = document.getElementById("products-grid");
    const countLabel = document.getElementById("results-count-text");
    if (!grid) return;

    const items = getFilteredProducts();

    if (countLabel) {
      countLabel.innerHTML = `Showing <strong>${items.length}</strong> of <strong>${state.products.length}</strong> products`;
    }

    // Update active filter chips
    renderActiveFilterChips();

    if (items.length === 0) {
      grid.innerHTML = `
        <div class="empty-results-box">
          <i class="fa-solid fa-magnifying-glass-chart empty-results-icon"></i>
          <h3>No matching products found</h3>
          <p>We couldn't find any products matching your specific filters or search keywords. Try adjusting your price range or reset filters.</p>
          <button class="btn btn-primary" onclick="app.resetAllFilters()">
            <i class="fa-solid fa-arrow-rotate-left"></i> Reset All Filters
          </button>
        </div>
      `;
      return;
    }

    grid.innerHTML = items.map(product => {
      const isWishlisted = state.wishlist.includes(product.id);
      
      let badgeHtml = "";
      if (product.badge) {
        badgeHtml = `<span class="badge badge-bestseller">${product.badge}</span>`;
      } else if (product.discountPercent >= 15) {
        badgeHtml = `<span class="badge badge-deal">${product.discountPercent}% OFF</span>`;
      }

      const stockStatusHtml = product.stock <= 5 
        ? `<span class="badge-stock-low"><i class="fa-solid fa-triangle-exclamation"></i> Only ${product.stock} left in stock!</span>`
        : `<span class="badge-stock-in"><i class="fa-solid fa-check"></i> In Stock (${product.stock} available)</span>`;

      return `
        <article class="product-card" id="card-${product.id}">
          <div class="card-top-badges">
            ${badgeHtml}
          </div>
          
          <button class="wishlist-heart-btn ${isWishlisted ? "active" : ""}" 
                  onclick="app.toggleWishlist('${product.id}', this)" 
                  aria-label="Save to Wishlist" 
                  title="Add to Wishlist">
            <i class="fa-${isWishlisted ? "solid" : "regular"} fa-heart"></i>
          </button>

          <div class="product-image-wrap" onclick="app.openProductDetails('${product.id}')">
            <img src="${product.images[0]}" 
                 alt="${product.name}" 
                 class="product-img" 
                 loading="lazy"
                 onerror="this.src='https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80'">
          </div>

          <div class="product-card-body">
            <span class="product-category-tag">${product.brand} &bull; ${product.category}</span>
            <h3 class="product-title" onclick="app.openProductDetails('${product.id}')" title="${product.name}">
              ${product.name}
            </h3>

            <div class="product-rating-row">
              ${utils.renderStars(product.rating)}
              <span class="rating-count">(${product.reviewsCount})</span>
            </div>

            <div class="product-price-row">
              <div class="price-container">
                <span class="price-current">${utils.formatLKR(product.price)}</span>
                <span class="price-original">${utils.formatLKR(product.originalPrice)}</span>
                <span class="price-discount-pill">-${product.discountPercent}%</span>
              </div>
            </div>

            <div class="product-stock-status">
              ${stockStatusHtml}
            </div>

            <div class="product-card-actions">
              <button class="btn btn-sm btn-primary" onclick="app.addToCart('${product.id}', 1)">
                <i class="fa-solid fa-cart-shopping"></i> Add to Cart
              </button>
              <button class="btn btn-sm btn-secondary" onclick="app.buyNow('${product.id}')">
                Buy Now
              </button>
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  // Render Active Filter Chips
  function renderActiveFilterChips() {
    const container = document.getElementById("active-filter-chips");
    if (!container) return;

    let chips = [];

    if (state.activeFilters.category !== "All") {
      chips.push(`
        <span class="filter-chip">
          Category: ${state.activeFilters.category}
          <button onclick="app.filterByCategory('All')">&times;</button>
        </span>
      `);
    }

    if (state.activeFilters.searchQuery.trim() !== "") {
      chips.push(`
        <span class="filter-chip">
          Search: "${state.activeFilters.searchQuery}"
          <button onclick="app.clearSearch()">&times;</button>
        </span>
      `);
    }

    if (state.activeFilters.maxPrice < 750000 || state.activeFilters.minPrice > 0) {
      chips.push(`
        <span class="filter-chip">
          Price: Up to ${utils.formatLKR(state.activeFilters.maxPrice)}
          <button onclick="app.resetPriceFilter()">&times;</button>
        </span>
      `);
    }

    if (state.activeFilters.minRating > 0) {
      chips.push(`
        <span class="filter-chip">
          Rating: ${state.activeFilters.minRating}★+
          <button onclick="app.setRatingFilter(0)">&times;</button>
        </span>
      `);
    }

    if (state.activeFilters.minDiscount > 0) {
      chips.push(`
        <span class="filter-chip">
          Discount: ${state.activeFilters.minDiscount}%+
          <button onclick="app.setDiscountFilter(0)">&times;</button>
        </span>
      `);
    }

    if (state.activeFilters.inStockOnly) {
      chips.push(`
        <span class="filter-chip">
          In Stock Only
          <button onclick="app.setStockFilter(false)">&times;</button>
        </span>
      `);
    }

    container.innerHTML = chips.join("");
  }

  // --- 6. Live Search & Autocomplete Engine ---
  function initSearchEngine() {
    const searchInput = document.getElementById("search-input");
    const categorySelect = document.getElementById("search-category-select");
    const suggestionsBox = document.getElementById("search-suggestions-dropdown");
    const clearBtn = document.getElementById("search-clear-btn");
    const submitBtn = document.getElementById("search-submit-btn");

    if (!searchInput) return;

    // Live search suggestions
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.trim();

      if (query.length > 0) {
        clearBtn.classList.add("active");
        showSearchSuggestions(query);
      } else {
        clearBtn.classList.remove("active");
        suggestionsBox.classList.remove("open");
      }

      state.activeFilters.searchQuery = query;
      renderProducts();
    });

    // Clear search
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      clearBtn.classList.remove("active");
      suggestionsBox.classList.remove("open");
      state.activeFilters.searchQuery = "";
      renderProducts();
      searchInput.focus();
    });

    // Category select dropdown in search bar
    categorySelect.addEventListener("change", (e) => {
      app.filterByCategory(e.target.value);
    });

    // Submit button
    submitBtn.addEventListener("click", () => {
      state.activeFilters.searchQuery = searchInput.value.trim();
      suggestionsBox.classList.remove("open");
      renderProducts();
      scrollToShopSection();
    });

    // Close suggestions on outside click
    document.addEventListener("click", (e) => {
      if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
        suggestionsBox.classList.remove("open");
      }
    });
  }

  function showSearchSuggestions(query) {
    const suggestionsBox = document.getElementById("search-suggestions-dropdown");
    if (!suggestionsBox) return;

    const lowerQuery = query.toLowerCase();
    const matches = state.products.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.brand.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
    ).slice(0, 5);

    if (matches.length === 0) {
      suggestionsBox.innerHTML = `
        <div style="padding: 14px 18px; font-size: 0.85rem; color: var(--text-muted); text-align: center;">
          No direct matches found for "<strong>${query}</strong>"
        </div>
      `;
      suggestionsBox.classList.add("open");
      return;
    }

    suggestionsBox.innerHTML = matches.map(p => `
      <div class="suggestion-item" onclick="app.selectSuggestion('${p.id}')">
        <img src="${p.images[0]}" alt="${p.name}" class="suggestion-thumb" onerror="this.src='https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=100&q=80'">
        <div class="suggestion-details">
          <div class="suggestion-title">${highlightMatch(p.name, query)}</div>
          <div class="suggestion-meta">${p.brand} &bull; in ${p.category}</div>
        </div>
        <div class="suggestion-price">${utils.formatLKR(p.price)}</div>
      </div>
    `).join("");

    suggestionsBox.classList.add("open");
  }

  function highlightMatch(text, query) {
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, `<mark style="background-color: #fef08a; color: #111; padding: 0 2px;">$1</mark>`);
  }

  function scrollToShopSection() {
    const el = document.getElementById("shop-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  // --- 7. Shopping Cart Logic & Calculations ---
  function addToCart(productId, quantity = 1, color = null, size = null) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    const selectedColor = color || (product.colors ? product.colors[0] : null);
    const selectedSize = size || (product.sizes ? product.sizes[0] : null);

    const existingIndex = state.cart.findIndex(item => 
      item.id === productId &&
      item.color === selectedColor &&
      item.size === selectedSize
    );

    if (existingIndex > -1) {
      const newQty = state.cart[existingIndex].quantity + quantity;
      if (newQty > product.stock) {
        utils.showToast(`Only ${product.stock} units available in stock`, "danger");
        return;
      }
      state.cart[existingIndex].quantity = newQty;
    } else {
      if (quantity > product.stock) {
        utils.showToast(`Only ${product.stock} units available in stock`, "danger");
        return;
      }
      state.cart.push({
        id: productId,
        quantity: quantity,
        color: selectedColor,
        size: selectedSize
      });
    }

    saveCart();
    utils.showToast(`Added "${product.name}" to your cart!`, "success", "fa-cart-plus");
  }

  function updateCartQuantity(cartIndex, newQty) {
    if (newQty <= 0) {
      removeFromCart(cartIndex);
      return;
    }

    const item = state.cart[cartIndex];
    const product = state.products.find(p => p.id === item.id);
    if (product && newQty > product.stock) {
      utils.showToast(`Only ${product.stock} units available in stock`, "danger");
      return;
    }

    state.cart[cartIndex].quantity = newQty;
    saveCart();
  }

  function removeFromCart(cartIndex) {
    const item = state.cart[cartIndex];
    const product = state.products.find(p => p.id === item.id);
    state.cart.splice(cartIndex, 1);
    saveCart();
    utils.showToast(`Removed from cart`, "info");
  }

  function calculateCartTotals() {
    let subtotal = 0;
    let totalItems = 0;

    state.cart.forEach(item => {
      const product = state.products.find(p => p.id === item.id);
      if (product) {
        subtotal += product.price * item.quantity;
        totalItems += item.quantity;
      }
    });

    // Islandwide shipping: Free if subtotal >= 15,000, else Rs. 650
    const shipping = (subtotal >= 15000 || subtotal === 0) ? 0 : 650;

    // Discount Voucher calculation
    let discount = 0;
    if (state.appliedCoupon && subtotal > 0) {
      discount = Math.round((subtotal * state.appliedCoupon.discountPercent) / 100);
    }

    const finalTotal = Math.max(0, subtotal - discount + shipping);

    return {
      subtotal,
      shipping,
      discount,
      finalTotal,
      totalItems
    };
  }

  function updateCartUI() {
    const totals = calculateCartTotals();

    // 1. Header Badges
    const headerBadge = document.getElementById("cart-count-badge");
    const previewTotal = document.getElementById("cart-preview-total");
    if (headerBadge) headerBadge.textContent = totals.totalItems;
    if (previewTotal) previewTotal.textContent = utils.formatLKR(totals.finalTotal);

    // 2. Drawer Count
    const drawerItemCount = document.getElementById("drawer-item-count-text");
    if (drawerItemCount) {
      drawerItemCount.textContent = `(${totals.totalItems} ${totals.totalItems === 1 ? "item" : "items"})`;
    }

    // 3. Free Shipping Progress Bar
    const shippingProgressFill = document.getElementById("shipping-progress-fill");
    const shippingProgressLabel = document.getElementById("shipping-progress-label");
    const shippingProgressPercent = document.getElementById("shipping-progress-percent");

    if (shippingProgressFill && shippingProgressLabel && shippingProgressPercent) {
      const threshold = 15000;
      if (totals.subtotal >= threshold) {
        shippingProgressFill.style.width = "100%";
        shippingProgressLabel.innerHTML = `<span style="color: var(--success); font-weight: 700;"><i class="fa-solid fa-circle-check"></i> Qualified for FREE Islandwide Delivery!</span>`;
        shippingProgressPercent.textContent = "100%";
      } else {
        const remaining = threshold - totals.subtotal;
        const pct = Math.min(100, Math.round((totals.subtotal / threshold) * 100));
        shippingProgressFill.style.width = `${pct}%`;
        shippingProgressLabel.innerHTML = `Add <strong>${utils.formatLKR(remaining)}</strong> more for FREE Delivery`;
        shippingProgressPercent.textContent = `${pct}%`;
      }
    }

    // 4. Drawer Breakdown Rows
    const drawerSubtotal = document.getElementById("cart-drawer-subtotal");
    const drawerShipping = document.getElementById("cart-drawer-shipping");
    const drawerDiscountRow = document.getElementById("cart-drawer-discount-row");
    const drawerDiscount = document.getElementById("cart-drawer-discount");
    const drawerTotal = document.getElementById("cart-drawer-total");

    if (drawerSubtotal) drawerSubtotal.textContent = utils.formatLKR(totals.subtotal);
    if (drawerShipping) drawerShipping.textContent = totals.shipping === 0 ? "FREE" : utils.formatLKR(totals.shipping);
    
    if (drawerDiscountRow && drawerDiscount) {
      if (totals.discount > 0) {
        drawerDiscountRow.style.display = "flex";
        drawerDiscount.textContent = `-${utils.formatLKR(totals.discount)} (${state.appliedCoupon.code})`;
      } else {
        drawerDiscountRow.style.display = "none";
      }
    }

    if (drawerTotal) drawerTotal.textContent = utils.formatLKR(totals.finalTotal);

    // 5. Drawer Items List
    const drawerList = document.getElementById("drawer-items-list");
    if (!drawerList) return;

    if (state.cart.length === 0) {
      drawerList.innerHTML = `
        <div class="cart-empty-view">
          <i class="fa-solid fa-cart-shopping cart-empty-icon"></i>
          <h4>Your Yoonu Cart is Empty</h4>
          <p>Explore today's hot deals and top-rated electronics to start shopping!</p>
          <button class="btn btn-primary" onclick="app.closeCartDrawer(); app.filterByCategory('All');">
            Start Shopping
          </button>
        </div>
      `;
      return;
    }

    drawerList.innerHTML = state.cart.map((item, index) => {
      const product = state.products.find(p => p.id === item.id);
      if (!product) return "";

      const variantInfo = [item.color, item.size].filter(Boolean).join(" &bull; ");

      return `
        <div class="cart-item-row">
          <img src="${product.images[0]}" alt="${product.name}" class="cart-item-img" onerror="this.src='https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=150&q=80'">
          <div class="cart-item-details">
            <h4 class="cart-item-title" onclick="app.openProductDetails('${product.id}')">${product.name}</h4>
            ${variantInfo ? `<div class="cart-item-variant">${variantInfo}</div>` : ""}
            <div class="cart-item-price">${utils.formatLKR(product.price * item.quantity)}</div>
            <div class="cart-item-actions">
              <div class="qty-stepper">
                <button onclick="app.updateCartQuantity(${index}, ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button onclick="app.updateCartQuantity(${index}, ${item.quantity + 1})">+</button>
              </div>
              <button class="remove-item-btn" onclick="app.removeFromCart(${index})">
                <i class="fa-solid fa-trash-can"></i> Remove
              </button>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  function applyCoupon(code) {
    const cleanCode = (code || "").trim().toUpperCase();
    if (!cleanCode) {
      utils.showToast("Please enter a voucher code", "danger");
      return;
    }

    if (cleanCode === "YOONU10") {
      state.appliedCoupon = { code: "YOONU10", discountPercent: 10 };
      localStorage.setItem(STORAGE_KEYS.COUPON, JSON.stringify(state.appliedCoupon));
      utils.showToast("Coupon YOONU10 applied! 10% discount added.", "success", "fa-tag");
      updateCartUI();
    } else if (cleanCode === "WELCOME5") {
      state.appliedCoupon = { code: "WELCOME5", discountPercent: 5 };
      localStorage.setItem(STORAGE_KEYS.COUPON, JSON.stringify(state.appliedCoupon));
      utils.showToast("Coupon WELCOME5 applied! 5% discount added.", "success", "fa-tag");
      updateCartUI();
    } else {
      utils.showToast("Invalid promo code. Try 'YOONU10'", "danger");
    }
  }

  // --- 8. Product Details Modal (PDP) ---
  function openProductDetails(productId) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    // Track recently viewed
    addToRecentlyViewed(productId);

    const container = document.getElementById("pdp-details-container");
    const overlay = document.getElementById("pdp-modal-overlay");
    if (!container || !overlay) return;

    const isWishlisted = state.wishlist.includes(product.id);

    // Build specs HTML
    let specsHtml = "";
    if (product.specs) {
      specsHtml = `
        <table class="pdp-specs-table">
          <tbody>
            ${Object.entries(product.specs).map(([key, val]) => `
              <tr>
                <td>${key}</td>
                <td>${val}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;
    }

    // Build reviews HTML
    const reviewsHtml = (product.reviews || []).map(r => `
      <div class="pdp-review-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <strong>${r.user}</strong>
          <span style="font-size: 0.75rem; color: var(--text-muted);">${r.date}</span>
        </div>
        <div class="rating-stars" style="font-size: 0.75rem; margin-bottom: 4px;">
          ${utils.renderStars(r.rating)}
          ${r.verified ? '<span class="verified-badge"><i class="fa-solid fa-circle-check"></i> Verified Purchase</span>' : ""}
        </div>
        <p style="font-size: 0.82rem; color: var(--text-secondary); margin: 0;">${r.comment}</p>
      </div>
    `).join("");

    container.innerHTML = `
      <!-- Left: Image Gallery -->
      <div class="pdp-gallery">
        <div class="pdp-main-image-wrap">
          <img src="${product.images[0]}" alt="${product.name}" id="pdp-active-img" class="pdp-main-image" onerror="this.src='https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80'">
        </div>
        <div class="pdp-thumbnails">
          ${product.images.map((img, i) => `
            <img src="${img}" alt="${product.name} thumb ${i+1}" class="pdp-thumb ${i === 0 ? "active" : ""}" onclick="app.switchPdpImage('${img}', this)">
          `).join("")}
        </div>
      </div>

      <!-- Right: Details & Buying Box -->
      <div class="pdp-info">
        <div class="pdp-category-breadcrumb">
          <span>Home</span> &gt; <span>${product.category}</span> &gt; <span>${product.brand}</span>
        </div>

        <h2 class="pdp-title">${product.name}</h2>

        <div style="display: flex; align-items: center; gap: 10px;">
          ${utils.renderStars(product.rating)}
          <span class="rating-count">${product.rating} (${product.reviewsCount} verified ratings)</span>
        </div>

        <div class="price-container" style="border-top: 1px solid var(--border-light); border-bottom: 1px solid var(--border-light); padding: 12px 0;">
          <span class="price-current" style="font-size: 1.75rem;">${utils.formatLKR(product.price)}</span>
          <span class="price-original" style="font-size: 1.1rem;">${utils.formatLKR(product.originalPrice)}</span>
          <span class="price-discount-pill" style="font-size: 0.9rem;">Save ${product.discountPercent}%</span>
        </div>

        <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6;">${product.description}</p>

        <!-- Colors Selection if applicable -->
        ${product.colors ? `
          <div>
            <span style="font-size: 0.85rem; font-weight: 700;">Color: <span id="pdp-selected-color-label" style="font-weight: 400;">${product.colors[0]}</span></span>
            <div class="pdp-color-swatches" id="pdp-color-swatches">
              ${product.colors.map((c, i) => `
                <button class="pdp-color-chip ${i === 0 ? "active" : ""}" onclick="app.selectPdpColor('${c}', this)">${c}</button>
              `).join("")}
            </div>
          </div>
        ` : ""}

        <!-- Sizes Selection if applicable -->
        ${product.sizes ? `
          <div>
            <span style="font-size: 0.85rem; font-weight: 700;">Size: <span id="pdp-selected-size-label" style="font-weight: 400;">${product.sizes[0]}</span></span>
            <div class="pdp-sizes-list" id="pdp-sizes-list">
              ${product.sizes.map((s, i) => `
                <button class="pdp-size-chip ${i === 0 ? "active" : ""}" onclick="app.selectPdpSize('${s}', this)">${s}</button>
              `).join("")}
            </div>
          </div>
        ` : ""}

        <!-- Stock and Quantity -->
        <div style="display: flex; align-items: center; gap: 20px; margin-top: 6px;">
          <div>
            <span style="font-size: 0.85rem; font-weight: 700; display: block; margin-bottom: 4px;">Quantity</span>
            <div class="qty-stepper">
              <button onclick="app.adjustPdpQty(-1)">-</button>
              <span id="pdp-qty-display">1</span>
              <button onclick="app.adjustPdpQty(1)">+</button>
            </div>
          </div>
          <div style="font-size: 0.85rem;">
            ${product.stock <= 5 
              ? `<span class="badge-stock-low">Only ${product.stock} items remaining in stock!</span>`
              : `<span class="badge-stock-in">In Stock (Fulfilled by Yoonu Store)</span>`}
          </div>
        </div>

        <!-- Action Buttons -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 14px;">
          <button class="btn btn-primary" onclick="app.addPdpToCart('${product.id}')">
            <i class="fa-solid fa-cart-shopping"></i> Add to Cart
          </button>
          <button class="btn btn-secondary" onclick="app.buyPdpNow('${product.id}')">
            Buy Now
          </button>
        </div>

        <!-- Technical Specifications Table -->
        ${specsHtml}

        <!-- Reviews Box -->
        <div class="pdp-reviews-box">
          <h4 style="font-size: 1rem; font-weight: 800; margin-bottom: 12px;">Customer Feedback & Reviews</h4>
          ${reviewsHtml}
          
          <!-- Add Review Form -->
          <div style="margin-top: 14px; background: #fff; padding: 14px; border: 1px solid var(--border-light); border-radius: var(--radius-md);">
            <h5 style="font-size: 0.88rem; font-weight: 700; margin-bottom: 8px;">Leave a Verified Review</h5>
            <input type="text" id="new-review-user" class="form-input" placeholder="Your Name" style="margin-bottom: 8px;" value="${state.currentUser ? state.currentUser.name : ''}">
            <textarea id="new-review-comment" class="form-input" rows="2" placeholder="How did you like this product?"></textarea>
            <button class="btn btn-sm btn-dark" style="margin-top: 8px;" onclick="app.submitPdpReview('${product.id}')">Submit Review</button>
          </div>
        </div>
      </div>
    `;

    overlay.classList.add("open");
  }

  function switchPdpImage(src, thumbElement) {
    const mainImg = document.getElementById("pdp-active-img");
    if (mainImg) mainImg.src = src;

    document.querySelectorAll(".pdp-thumb").forEach(t => t.classList.remove("active"));
    if (thumbElement) thumbElement.classList.add("active");
  }

  function selectPdpColor(color, btn) {
    const label = document.getElementById("pdp-selected-color-label");
    if (label) label.textContent = color;
    document.querySelectorAll(".pdp-color-chip").forEach(c => c.classList.remove("active"));
    if (btn) btn.classList.add("active");
  }

  function selectPdpSize(size, btn) {
    const label = document.getElementById("pdp-selected-size-label");
    if (label) label.textContent = size;
    document.querySelectorAll(".pdp-size-chip").forEach(s => s.classList.remove("active"));
    if (btn) btn.classList.add("active");
  }

  function adjustPdpQty(delta) {
    const qtySpan = document.getElementById("pdp-qty-display");
    if (!qtySpan) return;
    let curr = parseInt(qtySpan.textContent, 10) || 1;
    curr = Math.max(1, curr + delta);
    qtySpan.textContent = curr;
  }

  function addPdpToCart(productId) {
    const qtySpan = document.getElementById("pdp-qty-display");
    const qty = qtySpan ? parseInt(qtySpan.textContent, 10) || 1 : 1;
    
    const activeColorChip = document.querySelector(".pdp-color-chip.active");
    const activeSizeChip = document.querySelector(".pdp-size-chip.active");
    
    const color = activeColorChip ? activeColorChip.textContent : null;
    const size = activeSizeChip ? activeSizeChip.textContent : null;

    addToCart(productId, qty, color, size);
    document.getElementById("pdp-modal-overlay").classList.remove("open");
  }

  function buyPdpNow(productId) {
    addPdpToCart(productId);
    openCheckoutModal();
  }

  function submitPdpReview(productId) {
    const userField = document.getElementById("new-review-user");
    const commentField = document.getElementById("new-review-comment");
    
    const user = userField ? userField.value.trim() : "";
    const comment = commentField ? commentField.value.trim() : "";

    if (!user || !comment) {
      utils.showToast("Please enter your name and comment", "danger");
      return;
    }

    const product = state.products.find(p => p.id === productId);
    if (product) {
      if (!product.reviews) product.reviews = [];
      product.reviews.unshift({
        user: user,
        rating: 5,
        date: new Date().toISOString().split("T")[0],
        comment: comment,
        verified: true
      });
      product.reviewsCount = (product.reviewsCount || 0) + 1;
      saveProducts();
      utils.showToast("Review submitted successfully! Thank you.", "success");
      openProductDetails(productId); // re-render modal
    }
  }

  // --- 9. Wishlist Management ---
  function toggleWishlist(productId, btnElement) {
    const index = state.wishlist.indexOf(productId);
    const product = state.products.find(p => p.id === productId);

    if (index > -1) {
      state.wishlist.splice(index, 1);
      utils.showToast(`Removed "${product ? product.name : ''}" from wishlist`, "info");
      if (btnElement) {
        btnElement.classList.remove("active");
        btnElement.innerHTML = '<i class="fa-regular fa-heart"></i>';
      }
    } else {
      state.wishlist.push(productId);
      utils.showToast(`Saved "${product ? product.name : ''}" to your wishlist!`, "success", "fa-heart");
      if (btnElement) {
        btnElement.classList.add("active");
        btnElement.innerHTML = '<i class="fa-solid fa-heart"></i>';
      }
    }

    saveWishlist();
  }

  function updateWishlistUI() {
    const badge = document.getElementById("wishlist-count-badge");
    if (badge) badge.textContent = state.wishlist.length;

    // Update heart icons across the active DOM
    state.products.forEach(p => {
      const isSaved = state.wishlist.includes(p.id);
      const cards = document.querySelectorAll(`#card-${p.id} .wishlist-heart-btn`);
      cards.forEach(btn => {
        if (isSaved) {
          btn.classList.add("active");
          btn.innerHTML = '<i class="fa-solid fa-heart"></i>';
        } else {
          btn.classList.remove("active");
          btn.innerHTML = '<i class="fa-regular fa-heart"></i>';
        }
      });
    });

    renderWishlistModal();
  }

  function renderWishlistModal() {
    const container = document.getElementById("wishlist-modal-items");
    if (!container) return;

    if (state.wishlist.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 40px 10px;">
          <i class="fa-regular fa-heart" style="font-size: 3.5rem; color: #cbd5e1; margin-bottom: 12px;"></i>
          <h4>Your Wishlist is Empty</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted);">Click the heart icon on any product to save it here for later.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = state.wishlist.map(id => {
      const product = state.products.find(p => p.id === id);
      if (!product) return "";

      return `
        <div style="display: flex; gap: 14px; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-light); padding-bottom: 12px;">
          <img src="${product.images[0]}" alt="${product.name}" style="width: 60px; height: 60px; object-fit: contain; background: var(--bg-subtle); border-radius: var(--radius-md);">
          <div style="flex: 1;">
            <h4 style="font-size: 0.9rem; font-weight: 700; cursor: pointer;" onclick="app.openProductDetails('${product.id}')">${product.name}</h4>
            <div style="font-size: 0.95rem; font-weight: 800; color: var(--danger);">${utils.formatLKR(product.price)}</div>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-sm btn-primary" onclick="app.addToCart('${product.id}', 1)">
              <i class="fa-solid fa-cart-plus"></i> Move to Cart
            </button>
            <button class="btn btn-sm btn-outline" onclick="app.toggleWishlist('${product.id}')">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
      `;
    }).join("");
  }

  function moveAllWishlistToCart() {
    if (state.wishlist.length === 0) return;
    state.wishlist.forEach(id => {
      addToCart(id, 1);
    });
    state.wishlist = [];
    saveWishlist();
    utils.showToast("All wishlist items moved to your shopping cart!", "success");
    document.getElementById("wishlist-modal-overlay").classList.remove("open");
    openCartDrawer();
  }

  // --- 10. Recently Viewed Tracking ---
  function addToRecentlyViewed(productId) {
    const filtered = state.recentlyViewed.filter(id => id !== productId);
    filtered.unshift(productId);
    state.recentlyViewed = filtered.slice(0, 6);
    localStorage.setItem(STORAGE_KEYS.RECENTLY_VIEWED, JSON.stringify(state.recentlyViewed));
    renderRecentlyViewed();
  }

  function renderRecentlyViewed() {
    const section = document.getElementById("recently-viewed-section");
    const container = document.getElementById("recently-viewed-grid");
    if (!section || !container) return;

    if (state.recentlyViewed.length === 0) {
      section.style.display = "none";
      return;
    }

    section.style.display = "block";

    container.innerHTML = state.recentlyViewed.map(id => {
      const p = state.products.find(item => item.id === id);
      if (!p) return "";

      return `
        <div class="product-card" style="padding: 12px;">
          <div class="product-image-wrap" style="height: 140px;" onclick="app.openProductDetails('${p.id}')">
            <img src="${p.images[0]}" alt="${p.name}" class="product-img" onerror="this.src='https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80'">
          </div>
          <div style="padding-top: 8px;">
            <div style="font-size: 0.82rem; font-weight: 700; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; cursor: pointer;" onclick="app.openProductDetails('${p.id}')">
              ${p.name}
            </div>
            <div style="font-size: 0.95rem; font-weight: 800; color: var(--text-main); margin-top: 4px;">
              ${utils.formatLKR(p.price)}
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  function clearRecentlyViewed() {
    state.recentlyViewed = [];
    localStorage.removeItem(STORAGE_KEYS.RECENTLY_VIEWED);
    renderRecentlyViewed();
    utils.showToast("Cleared recently viewed history", "info");
  }

  // --- 11. Checkout & Order Placement ---
  function openCheckoutModal() {
    if (state.cart.length === 0) {
      utils.showToast("Your cart is empty! Add products before checking out.", "danger");
      return;
    }

    // Close Cart Drawer
    document.getElementById("cart-drawer").classList.remove("open");
    document.getElementById("cart-drawer-overlay").classList.remove("open");

    const overlay = document.getElementById("checkout-modal-overlay");
    const itemsPreview = document.getElementById("checkout-items-preview");
    const subtotalEl = document.getElementById("checkout-subtotal");
    const shippingEl = document.getElementById("checkout-shipping");
    const discountRow = document.getElementById("checkout-discount-row");
    const discountEl = document.getElementById("checkout-discount");
    const totalEl = document.getElementById("checkout-total");

    const totals = calculateCartTotals();

    if (itemsPreview) {
      itemsPreview.innerHTML = state.cart.map(item => {
        const product = state.products.find(p => p.id === item.id);
        if (!product) return "";
        return `
          <div style="display: flex; justify-content: space-between; font-size: 0.82rem;">
            <span style="display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; max-width: 200px;">
              ${item.quantity}x ${product.name}
            </span>
            <strong>${utils.formatLKR(product.price * item.quantity)}</strong>
          </div>
        `;
      }).join("");
    }

    if (subtotalEl) subtotalEl.textContent = utils.formatLKR(totals.subtotal);
    if (shippingEl) shippingEl.textContent = totals.shipping === 0 ? "FREE" : utils.formatLKR(totals.shipping);
    
    if (discountRow && discountEl) {
      if (totals.discount > 0) {
        discountRow.style.display = "flex";
        discountEl.textContent = `-${utils.formatLKR(totals.discount)}`;
      } else {
        discountRow.style.display = "none";
      }
    }

    if (totalEl) totalEl.textContent = utils.formatLKR(totals.finalTotal);

    if (overlay) overlay.classList.add("open");
  }

  function placeOrder() {
    const nameInput = document.getElementById("checkout-name");
    const phoneInput = document.getElementById("checkout-phone");
    const addressInput = document.getElementById("checkout-address");
    const cityInput = document.getElementById("checkout-city");
    const postalInput = document.getElementById("checkout-postal");

    const name = nameInput ? nameInput.value.trim() : "";
    const phone = phoneInput ? phoneInput.value.trim() : "";
    const address = addressInput ? addressInput.value.trim() : "";
    const city = cityInput ? cityInput.value.trim() : "";
    const postal = postalInput ? postalInput.value.trim() : "";

    if (!name || !phone || !address || !city) {
      utils.showToast("Please fill in all delivery information fields", "danger");
      return;
    }

    const paymentMethodInput = document.querySelector('input[name="payment-method"]:checked');
    const paymentMethod = paymentMethodInput ? paymentMethodInput.value : "Cash on Delivery";

    const totals = calculateCartTotals();
    const orderId = utils.generateOrderId();

    const orderItems = state.cart.map(item => {
      const p = state.products.find(prod => prod.id === item.id);
      return {
        id: item.id,
        name: p ? p.name : "Product",
        price: p ? p.price : 0,
        quantity: item.quantity,
        image: p ? p.images[0] : ""
      };
    });

    const newOrder = {
      orderId: orderId,
      customer: {
        name: name,
        email: state.currentUser ? state.currentUser.email : "customer@yoonu.lk",
        phone: phone,
        address: address,
        city: city,
        postalCode: postal
      },
      date: new Date().toISOString().split("T")[0],
      items: orderItems,
      subtotal: totals.subtotal,
      shippingFee: totals.shipping,
      discount: totals.discount,
      total: totals.finalTotal,
      status: "Processing",
      paymentMethod: paymentMethod
    };

    // Prepend to orders
    state.orders.unshift(newOrder);
    saveOrders();

    // Clear cart
    state.cart = [];
    saveCart();

    // Close checkout modal
    document.getElementById("checkout-modal-overlay").classList.remove("open");

    // Open confirmation modal
    document.getElementById("confirmed-order-id").textContent = orderId;
    document.getElementById("confirmed-payment-method").textContent = paymentMethod;
    document.getElementById("confirmed-total-amount").textContent = utils.formatLKR(totals.finalTotal);
    document.getElementById("order-confirmed-overlay").classList.add("open");

    utils.showToast(`Order ${orderId} placed successfully!`, "success", "fa-check");
  }

  // --- 12. User Authentication Simulation & Profile ---
  function updateAuthHeaderUI() {
    const greeting = document.getElementById("header-user-greeting");
    const accountLabel = document.getElementById("header-account-label");

    if (state.currentUser) {
      if (greeting) greeting.textContent = `Hello, ${state.currentUser.name.split(" ")[0]}`;
      if (accountLabel) accountLabel.textContent = "Account & Lists";
    } else {
      if (greeting) greeting.textContent = "Hello, Sign In";
      if (accountLabel) accountLabel.textContent = "Account & Lists";
    }
  }

  function handleLogin() {
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    if (!email || password.length < 6) {
      utils.showToast("Please enter valid login credentials (min 6 char password)", "danger");
      return;
    }

    // Authenticate user
    state.currentUser = {
      name: email.split("@")[0].replace(".", " "),
      email: email,
      phone: "+94 77 123 4567",
      address: "No. 42/B, Galle Road",
      city: "Colombo 03",
      postalCode: "00300"
    };

    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(state.currentUser));
    updateAuthHeaderUI();
    document.getElementById("auth-modal-overlay").classList.remove("open");
    utils.showToast(`Welcome back, ${state.currentUser.name}!`, "success");
  }

  function handleRegister() {
    const name = document.getElementById("register-name").value.trim();
    const email = document.getElementById("register-email").value.trim();
    const phone = document.getElementById("register-phone").value.trim();
    const password = document.getElementById("register-password").value;

    if (!name || !email || !phone || password.length < 6) {
      utils.showToast("Please complete all registration fields", "danger");
      return;
    }

    state.currentUser = {
      name: name,
      email: email,
      phone: phone,
      address: "Colombo, Sri Lanka",
      city: "Colombo",
      postalCode: "00100"
    };

    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(state.currentUser));
    updateAuthHeaderUI();
    document.getElementById("auth-modal-overlay").classList.remove("open");
    utils.showToast(`Account created! Welcome to Yoonu Store, ${name}!`, "success");
  }

  function signOutUser() {
    state.currentUser = null;
    localStorage.removeItem(STORAGE_KEYS.USER);
    updateAuthHeaderUI();
    document.getElementById("orders-modal-overlay").classList.remove("open");
    utils.showToast("Signed out successfully", "info");
  }

  function openOrdersModal() {
    if (!state.currentUser) {
      openAuthModal();
      return;
    }

    // Populate user details
    const nameEl = document.getElementById("profile-display-name");
    const emailEl = document.getElementById("profile-display-email");
    const avatarEl = document.getElementById("profile-avatar-initials");

    if (nameEl) nameEl.textContent = state.currentUser.name;
    if (emailEl) emailEl.textContent = state.currentUser.email;
    if (avatarEl) {
      const initials = state.currentUser.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
      avatarEl.textContent = initials || "YS";
    }

    // Populate order history
    const list = document.getElementById("order-history-list");
    if (list) {
      if (state.orders.length === 0) {
        list.innerHTML = `
          <div style="text-align: center; padding: 30px;">
            <p style="color: var(--text-muted);">You have no placed orders yet.</p>
          </div>
        `;
      } else {
        list.innerHTML = state.orders.map(order => {
          let statusClass = "status-processing";
          if (order.status === "Delivered") statusClass = "status-delivered";
          if (order.status === "Shipped") statusClass = "status-shipped";
          if (order.status === "Cancelled") statusClass = "status-cancelled";

          return `
            <div style="background-color: var(--bg-subtle); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 16px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px solid var(--border-light); padding-bottom: 8px; flex-wrap: wrap; gap: 8px;">
                <div>
                  <strong>Order #${order.orderId}</strong>
                  <span style="font-size: 0.78rem; color: var(--text-muted); margin-left: 8px;">Placed on ${order.date}</span>
                </div>
                <span class="status-badge ${statusClass}">${order.status}</span>
              </div>

              <div style="display: flex; flex-direction: column; gap: 6px; margin-bottom: 10px;">
                ${order.items.map(it => `
                  <div style="display: flex; justify-content: space-between; font-size: 0.85rem;">
                    <span>${it.quantity}x ${it.name}</span>
                    <span>${utils.formatLKR(it.price * it.quantity)}</span>
                  </div>
                `).join("")}
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed var(--border-subtle); padding-top: 8px; font-size: 0.9rem;">
                <span style="color: var(--text-muted);">Payment: ${order.paymentMethod}</span>
                <strong>Total: ${utils.formatLKR(order.total)}</strong>
              </div>
            </div>
          `;
        }).join("");
      }
    }

    document.getElementById("orders-modal-overlay").classList.add("open");
  }

  function openAuthModal() {
    document.getElementById("auth-modal-overlay").classList.add("open");
  }

  // --- 13. Admin Dashboard & Operations ---
  function openAdminModal() {
    updateAdminStats();
    renderAdminProductsTable();
    renderAdminOrdersTable();
    document.getElementById("admin-modal-overlay").classList.add("open");
  }

  function updateAdminStats() {
    const totalRevEl = document.getElementById("admin-total-revenue");
    const totalOrdersEl = document.getElementById("admin-total-orders");
    const totalProductsEl = document.getElementById("admin-total-products");
    const tabProductCount = document.getElementById("admin-tab-product-count");
    const tabOrdersCount = document.getElementById("admin-tab-orders-count");

    const totalRev = state.orders.reduce((acc, o) => acc + (o.total || 0), 0);

    if (totalRevEl) totalRevEl.textContent = utils.formatLKR(totalRev);
    if (totalOrdersEl) totalOrdersEl.textContent = state.orders.length;
    if (totalProductsEl) totalProductsEl.textContent = state.products.length;
    if (tabProductCount) tabProductCount.textContent = state.products.length;
    if (tabOrdersCount) tabOrdersCount.textContent = state.orders.length;
  }

  function renderAdminProductsTable() {
    const tbody = document.getElementById("admin-products-table-body");
    if (!tbody) return;

    tbody.innerHTML = state.products.map(p => `
      <tr>
        <td>
          <div style="display: flex; align-items: center; gap: 10px;">
            <img src="${p.images[0]}" alt="${p.name}" style="width: 40px; height: 40px; object-fit: contain; border-radius: 4px; background: #f3f4f6;">
            <div>
              <strong style="font-size: 0.88rem; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; max-width: 250px;">
                ${p.name}
              </strong>
              <span style="font-size: 0.75rem; color: var(--text-muted);">${p.brand}</span>
            </div>
          </div>
        </td>
        <td><span class="badge" style="background-color: var(--bg-subtle); color: var(--text-main);">${p.category}</span></td>
        <td><strong>${utils.formatLKR(p.price)}</strong></td>
        <td>${p.stock} units</td>
        <td>★ ${p.rating}</td>
        <td>
          <button class="btn btn-sm btn-outline" onclick="app.openEditProductModal('${p.id}')" title="Edit Product">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button class="btn btn-sm btn-outline" style="color: var(--danger); border-color: #fca5a5;" onclick="app.deleteProduct('${p.id}')" title="Delete Product">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    `).join("");
  }

  function renderAdminOrdersTable() {
    const tbody = document.getElementById("admin-orders-table-body");
    if (!tbody) return;

    tbody.innerHTML = state.orders.map(order => {
      let statusClass = "status-processing";
      if (order.status === "Delivered") statusClass = "status-delivered";
      if (order.status === "Shipped") statusClass = "status-shipped";
      if (order.status === "Cancelled") statusClass = "status-cancelled";

      return `
        <tr>
          <td><strong>#${order.orderId}</strong></td>
          <td>
            <strong>${order.customer.name}</strong>
            <div style="font-size: 0.75rem; color: var(--text-muted);">${order.customer.city}</div>
          </td>
          <td>${order.date}</td>
          <td><strong>${utils.formatLKR(order.total)}</strong></td>
          <td><span class="status-badge ${statusClass}">${order.status}</span></td>
          <td>
            <select class="sort-select" style="padding: 4px 8px; font-size: 0.8rem;" onchange="app.updateOrderStatus('${order.orderId}', this.value)">
              <option value="Processing" ${order.status === "Processing" ? "selected" : ""}>Processing</option>
              <option value="Shipped" ${order.status === "Shipped" ? "selected" : ""}>Shipped</option>
              <option value="Delivered" ${order.status === "Delivered" ? "selected" : ""}>Delivered</option>
              <option value="Cancelled" ${order.status === "Cancelled" ? "selected" : ""}>Cancelled</option>
            </select>
          </td>
        </tr>
      `;
    }).join("");
  }

  function updateOrderStatus(orderId, newStatus) {
    const order = state.orders.find(o => o.orderId === orderId);
    if (order) {
      order.status = newStatus;
      saveOrders();
      renderAdminOrdersTable();
      utils.showToast(`Order #${orderId} status updated to ${newStatus}`, "info");
    }
  }

  function openAddProductModal() {
    document.getElementById("product-form-title").textContent = "Add New Product";
    document.getElementById("edit-product-id").value = "";
    document.getElementById("admin-product-form").reset();
    document.getElementById("product-form-modal-overlay").classList.add("open");
  }

  function openEditProductModal(productId) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    document.getElementById("product-form-title").textContent = "Edit Product";
    document.getElementById("edit-product-id").value = product.id;
    document.getElementById("prod-name").value = product.name;
    document.getElementById("prod-category").value = product.category;
    document.getElementById("prod-brand").value = product.brand;
    document.getElementById("prod-price").value = product.price;
    document.getElementById("prod-orig-price").value = product.originalPrice;
    document.getElementById("prod-stock").value = product.stock;
    document.getElementById("prod-badge").value = product.badge || "";
    document.getElementById("prod-image").value = product.images[0] || "";
    document.getElementById("prod-desc").value = product.description;

    document.getElementById("product-form-modal-overlay").classList.add("open");
  }

  function saveProductForm() {
    const editId = document.getElementById("edit-product-id").value;
    const name = document.getElementById("prod-name").value.trim();
    const category = document.getElementById("prod-category").value;
    const brand = document.getElementById("prod-brand").value.trim();
    const price = Number(document.getElementById("prod-price").value);
    const origPrice = Number(document.getElementById("prod-orig-price").value);
    const stock = Number(document.getElementById("prod-stock").value);
    const badge = document.getElementById("prod-badge").value.trim();
    const image = document.getElementById("prod-image").value.trim();
    const desc = document.getElementById("prod-desc").value.trim();

    if (!name || !brand || price <= 0 || !image || !desc) {
      utils.showToast("Please fill in all product form fields", "danger");
      return;
    }

    const discountPercent = Math.max(0, Math.round(((origPrice - price) / origPrice) * 100));

    if (editId) {
      // Edit existing product
      const product = state.products.find(p => p.id === editId);
      if (product) {
        product.name = name;
        product.category = category;
        product.brand = brand;
        product.price = price;
        product.originalPrice = origPrice;
        product.discountPercent = discountPercent;
        product.stock = stock;
        product.badge = badge;
        product.images[0] = image;
        product.description = desc;
        utils.showToast(`Updated product "${name}"`, "success");
      }
    } else {
      // Add new product
      const newId = "custom-" + Date.now();
      state.products.unshift({
        id: newId,
        name: name,
        category: category,
        brand: brand,
        price: price,
        originalPrice: origPrice,
        discountPercent: discountPercent,
        rating: 5.0,
        reviewsCount: 1,
        stock: stock,
        badge: badge || "New Arrival",
        featured: true,
        deal: false,
        images: [image],
        description: desc,
        specs: { "Origin": "Official Local Import", "Warranty": "1 Year" },
        reviews: []
      });
      utils.showToast(`Added new product "${name}"`, "success");
    }

    saveProducts();
    renderAdminProductsTable();
    document.getElementById("product-form-modal-overlay").classList.remove("open");
  }

  function deleteProduct(productId) {
    if (!confirm("Are you sure you want to delete this product from Yoonu Store?")) return;

    state.products = state.products.filter(p => p.id !== productId);
    saveProducts();
    renderAdminProductsTable();
    utils.showToast("Product deleted from catalog", "info");
  }

  // --- 14. Promotional Hero Carousel Engine ---
  function initHeroCarousel() {
    const slides = document.querySelectorAll(".carousel-slide");
    const dots = document.querySelectorAll(".carousel-dot");
    const prevBtn = document.getElementById("carousel-prev-btn");
    const nextBtn = document.getElementById("carousel-next-btn");

    if (!slides.length) return;

    function goToSlide(index) {
      slides.forEach((s, i) => {
        s.classList.toggle("active", i === index);
      });
      dots.forEach((d, i) => {
        d.classList.toggle("active", i === index);
      });
      state.heroSlideIndex = index;
    }

    function nextSlide() {
      const nextIndex = (state.heroSlideIndex + 1) % slides.length;
      goToSlide(nextIndex);
    }

    function prevSlide() {
      const prevIndex = (state.heroSlideIndex - 1 + slides.length) % slides.length;
      goToSlide(prevIndex);
    }

    if (nextBtn) nextBtn.addEventListener("click", nextSlide);
    if (prevBtn) prevBtn.addEventListener("click", prevSlide);

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => goToSlide(index));
    });

    // Auto rotate every 6 seconds with hover pause
    function startTimer() {
      state.heroTimer = setInterval(nextSlide, 6000);
    }

    function stopTimer() {
      if (state.heroTimer) clearInterval(state.heroTimer);
    }

    const carousel = document.getElementById("hero-carousel");
    if (carousel) {
      carousel.addEventListener("mouseenter", stopTimer);
      carousel.addEventListener("mouseleave", startTimer);
    }

    startTimer();
  }

  // --- 15. Flash Deals Live Ticking Clock ---
  function initFlashDealCountdown() {
    const timerEl = document.getElementById("flash-countdown-timer");
    if (!timerEl) return;

    // Set end time 8 hours from now
    let remainingSeconds = 8 * 3600 + 42 * 60 + 19;

    setInterval(() => {
      if (remainingSeconds <= 0) {
        remainingSeconds = 24 * 3600; // Reset next cycle
      }
      remainingSeconds--;

      const hrs = Math.floor(remainingSeconds / 3600);
      const mins = Math.floor((remainingSeconds % 3600) / 60);
      const secs = remainingSeconds % 60;

      const format = (n) => String(n).padStart(2, "0");
      timerEl.textContent = `${format(hrs)}:${format(mins)}:${format(secs)}`;
    }, 1000);
  }

  // --- 16. Event Bindings & Listeners Setup ---
  function setupEventListeners() {
    // 1. Header Buttons
    document.getElementById("header-cart-btn").addEventListener("click", openCartDrawer);
    document.getElementById("cart-drawer-close-btn").addEventListener("click", closeCartDrawer);
    document.getElementById("cart-drawer-overlay").addEventListener("click", closeCartDrawer);

    document.getElementById("header-wishlist-btn").addEventListener("click", () => {
      renderWishlistModal();
      document.getElementById("wishlist-modal-overlay").classList.add("open");
    });
    document.getElementById("wishlist-modal-close-btn").addEventListener("click", () => {
      document.getElementById("wishlist-modal-overlay").classList.remove("open");
    });
    document.getElementById("move-all-wishlist-btn").addEventListener("click", moveAllWishlistToCart);

    document.getElementById("header-account-btn").addEventListener("click", () => {
      if (state.currentUser) {
        openOrdersModal();
      } else {
        openAuthModal();
      }
    });

    document.getElementById("header-orders-btn").addEventListener("click", openOrdersModal);
    document.getElementById("orders-modal-close-btn").addEventListener("click", () => {
      document.getElementById("orders-modal-overlay").classList.remove("open");
    });

    document.getElementById("auth-modal-close-btn").addEventListener("click", () => {
      document.getElementById("auth-modal-overlay").classList.remove("open");
    });

    document.getElementById("login-submit-btn").addEventListener("click", handleLogin);
    document.getElementById("register-submit-btn").addEventListener("click", handleRegister);

    // 2. Admin Portal
    document.getElementById("admin-portal-toggle-btn").addEventListener("click", openAdminModal);
    document.getElementById("admin-modal-close-btn").addEventListener("click", () => {
      document.getElementById("admin-modal-overlay").classList.remove("open");
    });
    document.getElementById("product-form-modal-close-btn").addEventListener("click", () => {
      document.getElementById("product-form-modal-overlay").classList.remove("open");
    });
    document.getElementById("save-product-submit-btn").addEventListener("click", saveProductForm);

    // 3. Checkout & Modals
    document.getElementById("drawer-checkout-btn").addEventListener("click", openCheckoutModal);
    document.getElementById("checkout-modal-close-btn").addEventListener("click", () => {
      document.getElementById("checkout-modal-overlay").classList.remove("open");
    });
    document.getElementById("place-order-btn").addEventListener("click", placeOrder);

    // 4. Cart Drawer Coupon Apply
    document.getElementById("apply-coupon-btn").addEventListener("click", () => {
      const code = document.getElementById("cart-coupon-input").value;
      applyCoupon(code);
    });

    // 5. Promo Code Copy Banner
    document.getElementById("copy-coupon-btn").addEventListener("click", () => {
      const code = document.getElementById("coupon-code-text").textContent;
      navigator.clipboard.writeText(code).then(() => {
        utils.showToast(`Coupon code ${code} copied to clipboard!`, "success", "fa-clipboard-check");
      });
    });

    // 6. PDP Modal Close
    document.getElementById("pdp-modal-close-btn").addEventListener("click", () => {
      document.getElementById("pdp-modal-overlay").classList.remove("open");
    });

    // 7. Filter Controls
    const priceSlider = document.getElementById("price-range-slider");
    const priceMaxInput = document.getElementById("price-max-input");
    const priceMinInput = document.getElementById("price-min-input");
    const applyPriceBtn = document.getElementById("apply-price-btn");

    if (priceSlider && priceMaxInput) {
      priceSlider.addEventListener("input", (e) => {
        priceMaxInput.value = e.target.value;
        state.activeFilters.maxPrice = Number(e.target.value);
        renderProducts();
      });

      applyPriceBtn.addEventListener("click", () => {
        state.activeFilters.minPrice = Number(priceMinInput.value) || 0;
        state.activeFilters.maxPrice = Number(priceMaxInput.value) || 750000;
        priceSlider.value = state.activeFilters.maxPrice;
        renderProducts();
      });
    }

    // Rating Radio Filters
    document.querySelectorAll('input[name="rating-filter"]').forEach(r => {
      r.addEventListener("change", (e) => {
        state.activeFilters.minRating = Number(e.target.value);
        renderProducts();
      });
    });

    // Discount Radio Filters
    document.querySelectorAll('input[name="discount-filter"]').forEach(r => {
      r.addEventListener("change", (e) => {
        state.activeFilters.minDiscount = Number(e.target.value);
        renderProducts();
      });
    });

    // In Stock Only
    const stockCheckbox = document.getElementById("in-stock-only-checkbox");
    if (stockCheckbox) {
      stockCheckbox.addEventListener("change", (e) => {
        state.activeFilters.inStockOnly = e.target.checked;
        renderProducts();
      });
    }

    // Sorting Dropdown
    const sortSelect = document.getElementById("product-sort-select");
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        state.activeSort = e.target.value;
        renderProducts();
      });
    }

    // Clear All Filters
    document.getElementById("clear-all-filters-btn").addEventListener("click", app.resetAllFilters);

    // Mobile Filter Drawer Toggle
    document.getElementById("mobile-filter-drawer-btn").addEventListener("click", app.toggleMobileFilterDrawer);

    // Payment Option radio switcher in Checkout
    document.querySelectorAll('input[name="payment-method"]').forEach(radio => {
      radio.addEventListener("change", (e) => {
        document.querySelectorAll(".payment-method-option").forEach(opt => opt.classList.remove("active"));
        e.target.closest(".payment-method-option").classList.add("active");
        
        const cardBox = document.getElementById("card-fields-box");
        if (cardBox) {
          cardBox.style.display = e.target.value === "Online Card Payment" ? "block" : "none";
        }
      });
    });

    // Back to top button
    document.getElementById("back-to-top-btn").addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Newsletter subscription form
    document.getElementById("newsletter-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const input = document.getElementById("newsletter-email-input");
      if (input && input.value) {
        utils.showToast(`Thank you for subscribing, ${input.value}! Enjoy your 10% discount.`, "success");
        input.value = "";
      }
    });

    // Brand logo home reset
    document.getElementById("brand-logo-link").addEventListener("click", (e) => {
      e.preventDefault();
      app.resetAllFilters();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Subnav category links
    document.querySelectorAll("#quick-subnav-links [data-filter-category]").forEach(link => {
      link.addEventListener("click", (e) => {
        const cat = e.currentTarget.getAttribute("data-filter-category");
        app.filterByCategory(cat);
      });
    });

    // All categories flyout trigger
    document.getElementById("all-categories-trigger").addEventListener("click", () => {
      const catSection = document.getElementById("categories-section");
      if (catSection) catSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  function openCartDrawer() {
    updateCartUI();
    document.getElementById("cart-drawer").classList.add("open");
    document.getElementById("cart-drawer-overlay").classList.add("open");
  }

  function closeCartDrawer() {
    document.getElementById("cart-drawer").classList.remove("open");
    document.getElementById("cart-drawer-overlay").classList.remove("open");
  }

  // --- 17. Public API (Attached to window.app) ---
  window.app = {
    // Cart actions
    addToCart(productId, qty = 1) {
      addToCart(productId, qty);
    },
    buyNow(productId) {
      addToCart(productId, 1);
      openCheckoutModal();
    },
    updateCartQuantity(index, qty) {
      updateCartQuantity(index, qty);
    },
    removeFromCart(index) {
      removeFromCart(index);
    },
    openCartDrawer: openCartDrawer,
    closeCartDrawer: closeCartDrawer,

    // Wishlist actions
    toggleWishlist(productId, btn) {
      toggleWishlist(productId, btn);
    },
    openWishlistModal() {
      renderWishlistModal();
      document.getElementById("wishlist-modal-overlay").classList.add("open");
    },
    moveAllWishlistToCart: moveAllWishlistToCart,

    // Product Details
    openProductDetails: openProductDetails,
    switchPdpImage: switchPdpImage,
    selectPdpColor: selectPdpColor,
    selectPdpSize: selectPdpSize,
    adjustPdpQty: adjustPdpQty,
    addPdpToCart: addPdpToCart,
    buyPdpNow: buyPdpNow,
    submitPdpReview: submitPdpReview,

    // Category & Filtering
    filterByCategory(categoryName) {
      state.activeFilters.category = categoryName;

      // Sync search bar select
      const select = document.getElementById("search-category-select");
      if (select) select.value = categoryName;

      // Sync sidebar radios
      const radio = document.querySelector(`input[name="sidebar-category"][value="${categoryName}"]`);
      if (radio) radio.checked = true;

      renderProducts();
      renderCategoriesGrid();
      scrollToShopSection();
    },
    selectSuggestion(productId) {
      document.getElementById("search-suggestions-dropdown").classList.remove("open");
      openProductDetails(productId);
    },
    clearSearch() {
      state.activeFilters.searchQuery = "";
      const input = document.getElementById("search-input");
      if (input) input.value = "";
      renderProducts();
    },
    resetPriceFilter() {
      state.activeFilters.minPrice = 0;
      state.activeFilters.maxPrice = 750000;
      document.getElementById("price-range-slider").value = 750000;
      document.getElementById("price-min-input").value = 0;
      document.getElementById("price-max-input").value = 750000;
      renderProducts();
    },
    setRatingFilter(val) {
      state.activeFilters.minRating = val;
      const radio = document.querySelector(`input[name="rating-filter"][value="${val}"]`);
      if (radio) radio.checked = true;
      renderProducts();
    },
    setDiscountFilter(val) {
      state.activeFilters.minDiscount = val;
      const radio = document.querySelector(`input[name="discount-filter"][value="${val}"]`);
      if (radio) radio.checked = true;
      renderProducts();
    },
    setStockFilter(bool) {
      state.activeFilters.inStockOnly = bool;
      const cb = document.getElementById("in-stock-only-checkbox");
      if (cb) cb.checked = bool;
      renderProducts();
    },
    resetAllFilters() {
      state.activeFilters = {
        category: "All",
        minPrice: 0,
        maxPrice: 750000,
        minRating: 0,
        minDiscount: 0,
        inStockOnly: false,
        searchQuery: ""
      };
      state.activeSort = "featured";

      const searchInput = document.getElementById("search-input");
      if (searchInput) searchInput.value = "";

      const catSelect = document.getElementById("search-category-select");
      if (catSelect) catSelect.value = "All";

      const sortSelect = document.getElementById("product-sort-select");
      if (sortSelect) sortSelect.value = "featured";

      const stockCb = document.getElementById("in-stock-only-checkbox");
      if (stockCb) stockCb.checked = false;

      const priceSlider = document.getElementById("price-range-slider");
      if (priceSlider) priceSlider.value = 750000;

      const allCatRadio = document.querySelector('input[name="sidebar-category"][value="All"]');
      if (allCatRadio) allCatRadio.checked = true;

      const allRatingRadio = document.querySelector('input[name="rating-filter"][value="0"]');
      if (allRatingRadio) allRatingRadio.checked = true;

      const allDiscountRadio = document.querySelector('input[name="discount-filter"][value="0"]');
      if (allDiscountRadio) allDiscountRadio.checked = true;

      renderProducts();
      renderCategoriesGrid();
      utils.showToast("All filters have been reset", "info");
    },
    toggleMobileFilterDrawer() {
      const sidebar = document.getElementById("filter-sidebar");
      if (sidebar) sidebar.classList.toggle("open");
    },

    // Recently viewed
    clearRecentlyViewed: clearRecentlyViewed,

    // Authentication & Orders
    switchAuthTab(tab) {
      const loginForm = document.getElementById("login-form");
      const registerForm = document.getElementById("register-form");
      const tabLogin = document.getElementById("tab-btn-login");
      const tabRegister = document.getElementById("tab-btn-register");

      if (tab === "login") {
        loginForm.style.display = "flex";
        registerForm.style.display = "none";
        tabLogin.classList.add("active");
        tabRegister.classList.remove("active");
      } else {
        loginForm.style.display = "none";
        registerForm.style.display = "flex";
        tabLogin.classList.remove("active");
        tabRegister.classList.add("active");
      }
    },
    openAccountModal: openAuthModal,
    openOrdersModal: openOrdersModal,
    signOutUser: signOutUser,

    // Checkout
    closeOrderConfirmedModal() {
      document.getElementById("order-confirmed-overlay").classList.remove("open");
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    // Admin Dashboard
    openAdminModal: openAdminModal,
    switchAdminTab(tab) {
      document.querySelectorAll(".admin-tab").forEach(t => t.classList.remove("active"));
      document.getElementById(`admin-tab-${tab}`).classList.add("active");

      document.getElementById("admin-view-products").style.display = tab === "products" ? "block" : "none";
      document.getElementById("admin-view-orders").style.display = tab === "orders" ? "block" : "none";
      document.getElementById("admin-view-architecture").style.display = tab === "architecture" ? "block" : "none";
    },
    openAddProductModal: openAddProductModal,
    openEditProductModal: openEditProductModal,
    deleteProduct: deleteProduct,
    updateOrderStatus: updateOrderStatus
  };

  // --- 18. DOM Ready Bootstrap ---
  document.addEventListener("DOMContentLoaded", () => {
    initState();
    initHeroCarousel();
    initFlashDealCountdown();
    initSearchEngine();
    setupEventListeners();

    // Render Components
    renderCategoriesGrid();
    renderCategoryFilters();
    renderTodayDeals();
    renderProducts();
    renderRecentlyViewed();
    updateCartUI();
    updateWishlistUI();
    updateAuthHeaderUI();
  });

})();
