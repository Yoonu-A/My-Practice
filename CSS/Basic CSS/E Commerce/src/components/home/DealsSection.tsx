'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Timer, ArrowRight, Tag, Copy, Check } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function DealsSection() {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  // Countdown timer (e.g. 2 days, 14 hours, 28 minutes, 45 seconds)
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 42,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const copyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    showToast(`Coupon code ${code} copied to clipboard!`, 'success');
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-navy-900 border border-navy-800 text-white shadow-premium">
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-electric-600/25 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12 relative z-10">
            {/* Left text */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-500/20 border border-electric-500/40 text-electric-300 text-xs font-bold uppercase tracking-wider">
                <Timer className="w-3.5 h-3.5 text-electric-400" />
                <span>Limited Time Colombo Flash Sale</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
                Get an Extra <span className="electric-gradient-text">10% OFF</span> on All Flagship Devices
              </h2>

              <p className="text-sm text-slate-300 max-w-lg leading-relaxed">
                Apply discount code at checkout. Valid for both Cash on Delivery orders and upcoming card payments nationwide. Free delivery included for orders above Rs. 25,000.
              </p>

              {/* Coupon Code Pill */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="flex items-center gap-2 bg-navy-950 border border-navy-700 px-4 py-2 rounded-xl">
                  <Tag className="w-4 h-4 text-electric-400" />
                  <span className="font-mono font-bold text-white text-sm tracking-wider">
                    NEXORA10
                  </span>
                  <button
                    onClick={() => copyCoupon('NEXORA10')}
                    className="p-1 hover:text-electric-400 text-slate-400 transition-colors ml-1"
                    title="Copy coupon"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <span className="text-xs text-slate-400">Click icon to copy code</span>
              </div>
            </div>

            {/* Right: Countdown Boxes & Shop Button */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end space-y-6">
              <div className="flex items-center gap-2 sm:gap-3 text-center">
                <div className="bg-navy-950/80 border border-navy-700/80 rounded-2xl p-3 sm:p-4 min-w-[65px] sm:min-w-[75px]">
                  <span className="block text-2xl sm:text-3xl font-black text-white leading-none">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-400 mt-1 block">Days</span>
                </div>

                <span className="text-xl font-bold text-slate-600">:</span>

                <div className="bg-navy-950/80 border border-navy-700/80 rounded-2xl p-3 sm:p-4 min-w-[65px] sm:min-w-[75px]">
                  <span className="block text-2xl sm:text-3xl font-black text-white leading-none">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-400 mt-1 block">Hours</span>
                </div>

                <span className="text-xl font-bold text-slate-600">:</span>

                <div className="bg-navy-950/80 border border-navy-700/80 rounded-2xl p-3 sm:p-4 min-w-[65px] sm:min-w-[75px]">
                  <span className="block text-2xl sm:text-3xl font-black text-white leading-none">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-400 mt-1 block">Mins</span>
                </div>

                <span className="text-xl font-bold text-slate-600">:</span>

                <div className="bg-navy-950/80 border border-navy-700/80 rounded-2xl p-3 sm:p-4 min-w-[65px] sm:min-w-[75px]">
                  <span className="block text-2xl sm:text-3xl font-black text-electric-400 leading-none">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-400 mt-1 block">Secs</span>
                </div>
              </div>

              <Link
                href="/products"
                className="flex items-center gap-2 bg-electric-600 hover:bg-electric-500 text-white font-bold px-7 py-3.5 rounded-2xl shadow-electric transition-all text-sm group"
              >
                <span>Claim Offer Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
