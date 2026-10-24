'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  SlidersHorizontal,
  Search,
  X,
  ChevronDown,
  ArrowUpDown,
  Check,
  RotateCcw,
  Package,
} from 'lucide-react';
import ProductGrid from '@/components/products/ProductGrid';
import { Product } from '@/lib/types';
import { formatLKR } from '@/lib/utils';

const CATEGORIES = [
  { id: 'all', name: 'All Categories' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'smartphones', name: 'Smartphones' },
  { id: 'fashion', name: 'Fashion' },
  { id: 'shoes', name: 'Shoes' },
  { id: 'watches', name: 'Watches' },
  { id: 'accessories', name: 'Accessories' },
];

const SORT_OPTIONS = [
  { id: 'newest', label: 'Newest Arrivals' },
  { id: 'popular', label: 'Most Popular' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Customer Rating' },
];

function ProductListingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Search query params
  const paramCategory = searchParams.get('category') || 'all';
  const paramSearch = searchParams.get('search') || '';
  const paramSort = searchParams.get('sort') || 'newest';
  const paramMinPrice = searchParams.get('minPrice') || '';
  const paramMaxPrice = searchParams.get('maxPrice') || '';
  const paramInStock = searchParams.get('inStock') === 'true';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter state
  const [selectedCategory, setSelectedCategory] = useState(paramCategory);
  const [searchInput, setSearchInput] = useState(paramSearch);
  const [sortBy, setSortBy] = useState(paramSort);
  const [minPrice, setMinPrice] = useState(paramMinPrice);
  const [maxPrice, setMaxPrice] = useState(paramMaxPrice);
  const [inStockOnly, setInStockOnly] = useState(paramInStock);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Sync state if URL changes
  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || 'all');
    setSearchInput(searchParams.get('search') || '');
    setSortBy(searchParams.get('sort') || 'newest');
  }, [searchParams]);

  // Fetch products from backend API
  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const query = new URLSearchParams();
        if (selectedCategory && selectedCategory !== 'all') query.set('category', selectedCategory);
        if (searchInput.trim()) query.set('search', searchInput.trim());
        if (sortBy) query.set('sort', sortBy);
        if (minPrice) query.set('minPrice', minPrice);
        if (maxPrice) query.set('maxPrice', maxPrice);
        if (inStockOnly) query.set('inStock', '1');
        query.set('page', String(page));
        query.set('limit', '12');

        const res = await fetch(`/api/products?${query.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setProducts(data.products || []);
          setTotalPages(data.pagination?.totalPages || 1);
          setTotalCount(data.pagination?.total || 0);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [selectedCategory, searchInput, sortBy, minPrice, maxPrice, inStockOnly, page]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchInput('');
    setSortBy('newest');
    setMinPrice('');
    setMaxPrice('');
    setInStockOnly(false);
    setPage(1);
    router.push('/products');
  };

  const activeFiltersCount = [
    selectedCategory !== 'all',
    searchInput.trim().length > 0,
    minPrice !== '',
    maxPrice !== '',
    inStockOnly,
  ].filter(Boolean).length;

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-2">
            <span>Home</span>
            <span>/</span>
            <span className="text-navy-900 capitalize">
              {selectedCategory === 'all' ? 'All Products' : selectedCategory}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-black text-navy-900 tracking-tight">
                {selectedCategory === 'all' ? 'Explore Store Catalog' : `${selectedCategory.toUpperCase()} Collection`}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Showing {totalCount} authentic products available for Island-wide Cash on Delivery in Sri Lanka.
              </p>
            </div>

            {/* Quick Actions (Mobile filter trigger + Sort) */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-xs font-bold text-navy-900 shadow-sm"
              >
                <SlidersHorizontal className="w-4 h-4 text-electric-600" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-electric-600 text-white text-[10px] flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 rounded-xl text-xs font-bold text-navy-900 shadow-sm">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline text-slate-400">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent font-bold text-navy-900 outline-none cursor-pointer"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-subtle space-y-6 sticky top-28">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 font-black text-navy-900 text-sm">
                  <SlidersHorizontal className="w-4 h-4 text-electric-600" />
                  <span>Filter Products</span>
                </div>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={handleResetFilters}
                    className="text-xs text-electric-600 hover:text-navy-900 font-bold flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              {/* Keyword Search */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                  Search by Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search keywords..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-navy-900 outline-none focus:border-electric-500"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                  Categories
                </label>
                <div className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        selectedCategory === cat.id
                          ? 'bg-navy-900 text-white shadow-sm'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-navy-900'
                      }`}
                    >
                      <span>{cat.name}</span>
                      {selectedCategory === cat.id && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                  Price Range (LKR)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min Rs."
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-electric-500"
                  />
                  <input
                    type="number"
                    placeholder="Max Rs."
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-electric-500"
                  />
                </div>
              </div>

              {/* In-Stock Filter */}
              <div className="pt-2 border-t border-slate-100">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 rounded text-electric-600 focus:ring-electric-500 border-slate-300"
                  />
                  <span className="text-xs font-bold text-slate-700">In-Stock Items Only</span>
                </label>
              </div>
            </div>
          </div>

          {/* Product Listing Area */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="bg-white rounded-2xl h-80 border border-slate-200 p-4 space-y-4">
                    <div className="w-full h-44 bg-slate-200 rounded-xl" />
                    <div className="h-4 bg-slate-200 rounded w-3/4" />
                    <div className="h-4 bg-slate-200 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : (
              <>
                <ProductGrid
                  products={products}
                  emptyMessage="No products match your selected category or price filters. Try adjusting your parameters."
                />

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="mt-12 flex items-center justify-center gap-2">
                    <button
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-navy-900 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
                    >
                      Previous
                    </button>

                    {Array.from({ length: totalPages }).map((_, idx) => (
                      <button
                        key={idx + 1}
                        onClick={() => setPage(idx + 1)}
                        className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                          page === idx + 1
                            ? 'bg-navy-900 text-white shadow-sm'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}

                    <button
                      onClick={() => setPage(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages}
                      className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-navy-900 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            onClick={() => setMobileFilterOpen(false)}
            className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm"
          />

          <div className="relative ml-auto w-full max-w-xs bg-white h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto z-10 animate-in slide-in-from-right">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="font-bold text-navy-900 text-base">Filter Products</span>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-slate-400 hover:text-navy-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Categories */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Category
                </label>
                <div className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setMobileFilterOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold ${
                        selectedCategory === cat.id
                          ? 'bg-navy-900 text-white'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{cat.name}</span>
                      {selectedCategory === cat.id && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Price (LKR)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>

              {/* In stock */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 rounded text-electric-600"
                  />
                  <span className="text-xs font-semibold text-slate-800">In-Stock Only</span>
                </label>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex gap-2">
              <button
                onClick={handleResetFilters}
                className="flex-1 py-3 text-xs font-bold text-slate-600 bg-slate-100 rounded-xl"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-3 text-xs font-bold text-white bg-navy-900 rounded-xl shadow-md"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProductListingPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center">Loading product catalog...</div>}>
      <ProductListingContent />
    </Suspense>
  );
}
