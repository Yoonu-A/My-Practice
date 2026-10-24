'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Zap, Sparkles, Truck } from 'lucide-react';
import { formatLKR } from '@/lib/utils';

export default function HeroBanner() {
  return (
    <div className="relative overflow-hidden bg-navy-950 text-white border-b border-navy-800">
      {/* Decorative Background Lighting Gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-electric-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-electric-500/15 border border-electric-500/30 text-electric-300 text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-electric-400" />
              <span>NEXORA STORE SRI LANKA • 2026 COLLECTION</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              Next-Generation <br className="hidden sm:inline" />
              <span className="electric-gradient-text">Electronics & Luxury</span> <br />
              At Your Doorstep.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Explore authentic smartphones, noise-cancelling audio, precision chronographs, and curated designer fashion with <span className="text-white font-semibold">Cash on Delivery across all 25 districts</span> in Sri Lanka.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/products"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-electric-600 hover:bg-electric-500 text-white font-bold px-8 py-4 rounded-2xl shadow-electric hover:shadow-electric-lg transition-all duration-300 text-sm group"
              >
                <span>Shop All Collections</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/products?featured=1"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-7 py-4 rounded-2xl border border-white/15 backdrop-blur-md transition-all text-sm"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Featured Deals</span>
              </Link>
            </div>

            {/* Micro Trust Indicators */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-navy-800/80 max-w-lg mx-auto lg:mx-0">
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-white flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-electric-400" /> Island-wide
                </span>
                <span className="text-[11px] text-slate-400">All 25 Districts</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-white flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Genuine
                </span>
                <span className="text-[11px] text-slate-400">Official Warranty</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-white flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-400" /> COD Available
                </span>
                <span className="text-[11px] text-slate-400">Doorstep Payment</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Product Card Showcase */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Visual background card glow */}
            <div className="relative w-full max-w-md">
              <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-navy-900 to-navy-950 p-6 shadow-2xl">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 relative group">
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop"
                    alt="Sony WH-1000XM5 Premium Headphones"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-electric-600 text-white font-extrabold text-xs px-3 py-1 rounded-full shadow-md">
                    Trending In Colombo
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-bold text-electric-400 uppercase tracking-wider">
                        Electronics • Audio
                      </span>
                      <h3 className="text-lg font-bold text-white mt-0.5">
                        Sony WH-1000XM5 Wireless
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-extrabold text-white">
                        {formatLKR(118000)}
                      </div>
                      <div className="text-xs text-slate-400 line-through">
                        {formatLKR(135000)}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    Flagship dual-processor noise-cancelling headphones with 30-hour battery life. In stock with singer/local warranty.
                  </p>

                  <div className="pt-3 border-t border-navy-800 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      14 in stock (Colombo Hub)
                    </span>

                    <Link
                      href="/products/prod-001"
                      className="text-xs font-bold text-electric-400 hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <span>View Specifications</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Floating secondary badge */}
              <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-white text-navy-900 rounded-2xl p-4 shadow-xl border border-slate-100 items-center gap-3 animate-float">
                <div className="w-10 h-10 rounded-xl bg-electric-50 flex items-center justify-center text-electric-600 font-bold">
                  99%
                </div>
                <div>
                  <p className="text-xs font-extrabold">Island-wide Satisfaction</p>
                  <p className="text-[10px] text-slate-500">Over 10,000+ happy Sri Lankan shoppers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
