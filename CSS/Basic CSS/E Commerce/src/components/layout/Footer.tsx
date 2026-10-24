'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ShieldCheck, Truck, RefreshCw, Award, CreditCard } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-navy-800">
      {/* Value Proposition Highlights */}
      <div className="border-b border-navy-800/80 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-electric-500/10 border border-electric-500/20 flex items-center justify-center text-electric-400 shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Island-wide Fast Delivery</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Reliable courier dispatch across Colombo, Kandy, Galle and all 25 districts.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Cash on Delivery (COD)</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Inspect your package and pay cash right at your doorstep upon arrival.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">100% Genuine Warranty</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Official TRCSL-approved devices and verified manufacturer brand warranties.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">7-Day Return Guarantee</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Hassle-free replacement policy for defective or damaged items.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-electric-600 flex items-center justify-center text-white font-black text-xl">
                N
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                NEXORA<span className="text-electric-400">.</span> STORE
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Sri Lanka&apos;s premier destination for curated flagships, high-fidelity audio, designer fashion, luxury timepieces, and modern lifestyle essentials.
            </p>

            <div className="space-y-2.5 text-xs text-slate-400 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-electric-400 shrink-0 mt-0.5" />
                <span>No. 45, Galle Road, Colombo 03, Western Province, Sri Lanka</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-electric-400 shrink-0" />
                <span>+94 11 234 5678 / +94 77 123 4567</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-electric-400 shrink-0" />
                <span>support@nexorastore.lk</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h5 className="font-bold text-white text-sm mb-4 tracking-wide uppercase">Shop Categories</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/products?category=electronics" className="hover:text-electric-400 transition-colors">
                  Audio & Electronics
                </Link>
              </li>
              <li>
                <Link href="/products?category=smartphones" className="hover:text-electric-400 transition-colors">
                  Smartphones & 5G
                </Link>
              </li>
              <li>
                <Link href="/products?category=fashion" className="hover:text-electric-400 transition-colors">
                  Men & Women Fashion
                </Link>
              </li>
              <li>
                <Link href="/products?category=shoes" className="hover:text-electric-400 transition-colors">
                  Sneakers & Footwear
                </Link>
              </li>
              <li>
                <Link href="/products?category=watches" className="hover:text-electric-400 transition-colors">
                  Luxury Chronographs
                </Link>
              </li>
              <li>
                <Link href="/products?category=accessories" className="hover:text-electric-400 transition-colors">
                  Wallets & Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h5 className="font-bold text-white text-sm mb-4 tracking-wide uppercase">Customer Care</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/account" className="hover:text-electric-400 transition-colors">
                  My Account & Orders
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-electric-400 transition-colors">
                  View Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-electric-400 transition-colors">
                  My Wishlist
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-electric-400 transition-colors">
                  Delivery & Shipping Rates
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-electric-400 transition-colors">
                  Colombo Showroom Contact
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-electric-400 transition-colors">
                  Store Management
                </Link>
              </li>
            </ul>
          </div>

          {/* Payment & Security */}
          <div>
            <h5 className="font-bold text-white text-sm mb-4 tracking-wide uppercase">Payment & Safety</h5>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              We prioritize Cash on Delivery (COD) for 100% customer confidence across Sri Lanka.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2.5 py-1 rounded bg-navy-900 border border-navy-700 text-[11px] font-semibold text-slate-300">
                Cash on Delivery
              </span>
              <span className="px-2.5 py-1 rounded bg-navy-900 border border-navy-700 text-[11px] font-semibold text-slate-300">
                PayHere Ready
              </span>
              <span className="px-2.5 py-1 rounded bg-navy-900 border border-navy-700 text-[11px] font-semibold text-slate-300">
                Bank Transfer
              </span>
              <span className="px-2.5 py-1 rounded bg-navy-900 border border-navy-700 text-[11px] font-semibold text-slate-300">
                Visa / Mastercard
              </span>
            </div>
            <div className="mt-4 pt-3 border-t border-navy-800 text-[11px] text-slate-500">
              Currency: <span className="text-white font-bold">LKR (Sri Lankan Rupees)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Sub-footer */}
      <div className="border-t border-navy-900 bg-black/40 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} NEXORA STORE Sri Lanka. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/faq" className="hover:text-slate-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="/faq" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/faq" className="hover:text-slate-400 transition-colors">
              TRCSL & Warranty Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
