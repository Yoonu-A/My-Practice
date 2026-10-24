'use client';

import React from 'react';
import Link from 'next/link';
import { Truck, PhoneCall, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function TopAnnouncementBar() {
  const { user, isAdmin } = useAuth();

  return (
    <div className="bg-navy-950 text-slate-300 text-xs py-2 px-4 border-b border-navy-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        {/* Left message */}
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="flex items-center gap-1.5 text-electric-400 font-medium">
            <Truck className="w-3.5 h-3.5" />
            <span>Island-wide Delivery across Sri Lanka</span>
          </div>
          <span className="hidden md:inline text-slate-600">•</span>
          <span className="hidden md:inline text-slate-300">
            Free Delivery on orders above <span className="font-semibold text-white">Rs. 25,000</span>
          </span>
          <span className="hidden lg:inline text-slate-600">•</span>
          <span className="hidden lg:flex items-center gap-1 text-emerald-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            Cash on Delivery Available
          </span>
        </div>

        {/* Right utility links */}
        <div className="flex items-center gap-4">
          <a
            href="tel:+94112345678"
            className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
          >
            <PhoneCall className="w-3 h-3 text-electric-400" />
            <span>+94 11 234 5678</span>
          </a>
          <span className="text-slate-700">|</span>
          <Link
            href="/faq"
            className="hover:text-white transition-colors"
          >
            FAQ & Help
          </Link>

          {isAdmin && (
            <>
              <span className="text-slate-700">|</span>
              <Link
                href="/admin"
                className="flex items-center gap-1 bg-electric-500/20 text-electric-300 hover:text-white px-2 py-0.5 rounded border border-electric-500/30 font-medium transition-colors"
              >
                <Sparkles className="w-3 h-3 text-electric-400" />
                Admin Panel
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
