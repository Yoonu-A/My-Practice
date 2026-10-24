'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const CATEGORIES = [
  {
    name: 'Electronics',
    slug: 'electronics',
    tagline: 'High-Fidelity Audio & Gear',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
    itemCount: 'Headphones & Speakers',
  },
  {
    name: 'Smartphones',
    slug: 'smartphones',
    tagline: 'Flagship 5G Devices',
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=800&auto=format&fit=crop',
    itemCount: 'iPhone & Galaxy',
  },
  {
    name: 'Fashion',
    slug: 'fashion',
    tagline: 'Italian Wool & Streetwear',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop',
    itemCount: 'Blazers & Jackets',
  },
  {
    name: 'Shoes',
    slug: 'shoes',
    tagline: 'Performance & Sneakers',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
    itemCount: 'Nike, Adidas & Classics',
  },
  {
    name: 'Watches',
    slug: 'watches',
    tagline: 'Luxury Chronographs',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop',
    itemCount: 'Seiko & Apple Watch',
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    tagline: 'RFID Wallets & Eyewear',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop',
    itemCount: 'Bellroy & Ray-Ban',
  },
];

export default function CategoryGrid() {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-electric-600 block mb-1">
              Curated Collections
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-900 tracking-tight">
              Explore By Category
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-electric-600 hover:text-navy-900 transition-colors group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="group relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-subtle hover:shadow-premium card-hover-effect flex flex-col transition-all duration-300"
            >
              <div className="aspect-[4/5] relative overflow-hidden bg-slate-900">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent" />

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-extrabold text-sm sm:text-base tracking-tight leading-snug group-hover:text-electric-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[10px] text-slate-300 truncate mt-0.5">
                    {cat.itemCount}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
