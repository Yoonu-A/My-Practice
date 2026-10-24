'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, Send } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    setSubscribed(true);
    showToast('Thank you for subscribing! Check your inbox for exclusive Colombo flash drop alerts.', 'success');
  };

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white p-8 sm:p-14 border border-navy-800 shadow-premium">
          {/* Background accent */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-electric-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-electric-500/10 border border-electric-500/20 flex items-center justify-center text-electric-400 mx-auto">
              <Mail className="w-6 h-6" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Unlock Sri Lanka VIP Member Drops
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mx-auto">
              Subscribe to get notified about secret discounts, TRCSL approved restocks, and limited edition sneaker releases before anyone else.
            </p>

            {subscribed ? (
              <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl text-emerald-300 text-sm font-semibold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>You are on the VIP guest list! Welcome to NEXORA.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-navy-950 border border-navy-700 focus:border-electric-500 text-white text-sm rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-electric-500/20"
                />
                <button
                  type="submit"
                  className="bg-electric-600 hover:bg-electric-500 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-electric hover:shadow-electric-lg flex items-center justify-center gap-2"
                >
                  <span>Subscribe</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}

            <p className="text-[11px] text-slate-500">
              Zero spam. Unsubscribe anytime with a single click.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
