'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Flame, Sparkles, Star } from 'lucide-react';
import { Product } from '@/lib/types';
import ProductGrid from '@/components/products/ProductGrid';

interface FeaturedSectionProps {
  initialProducts: Product[];
}

export default function FeaturedSection({ initialProducts }: FeaturedSectionProps) {
  const [activeTab, setActiveTab] = useState<'featured' | 'bestsellers' | 'newarrivals'>('featured');

  const filteredProducts = initialProducts.filter((product) => {
    if (activeTab === 'featured') return product.isFeatured;
    if (activeTab === 'bestsellers') return product.isBestSeller;
    if (activeTab === 'newarrivals') return product.isNewArrival;
    return true;
  });

  return (
    <section className="py-16 sm:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-electric-600 block mb-1">
              Handpicked By Experts
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-900 tracking-tight">
              Top Trending Products
            </h2>
          </div>

          {/* Tab selector */}
          <div className="flex items-center p-1.5 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
            <button
              onClick={() => setActiveTab('featured')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'featured'
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-navy-900'
              }`}
            >
              <Star className="w-3.5 h-3.5" />
              <span>Featured</span>
            </button>

            <button
              onClick={() => setActiveTab('bestsellers')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'bestsellers'
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-navy-900'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Best Sellers</span>
            </button>

            <button
              onClick={() => setActiveTab('newarrivals')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'newarrivals'
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-navy-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-electric-500" />
              <span>New Arrivals</span>
            </button>
          </div>
        </div>

        {/* Product Cards */}
        <ProductGrid
          products={filteredProducts.length > 0 ? filteredProducts : initialProducts.slice(0, 8)}
        />

        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-navy-900 font-bold px-8 py-3.5 rounded-full border border-slate-200 shadow-sm transition-all text-sm group"
          >
            <span>Explore Entire Store Inventory</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
