'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    try {
      setLoading(true);
      const res = await login(email, password);
      if (res.success) {
        router.push('/account');
      } else {
        setError(res.error || 'Invalid credentials');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    showToast(`Filled credentials for ${demoEmail}`, 'info');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-20 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-premium p-8 sm:p-10 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-navy-900 text-electric-400 font-black text-xl flex items-center justify-center mx-auto shadow-md">
            N
          </div>
          <h1 className="text-2xl font-black text-navy-900 tracking-tight">
            Sign In to NEXORA
          </h1>
          <p className="text-xs text-slate-500">
            Access your order history, delivery addresses, and wishlist.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="name@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-navy-900 outline-none focus:border-electric-500"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-slate-700">Password</label>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-navy-900 outline-none focus:border-electric-500"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-navy-900 hover:bg-electric-600 text-white font-bold py-3.5 px-4 rounded-xl text-xs sm:text-sm transition-all shadow-md active:scale-98 disabled:opacity-50"
          >
            <span>{loading ? 'Signing in...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Credentials Quick-Fill Helper */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            Demo Accounts (One-Click Fill)
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleFillDemo('customer@nexorastore.lk', 'Customer123!')}
              className="text-left p-2 rounded-xl bg-white border border-slate-200 hover:border-electric-500 text-[11px] transition-colors"
            >
              <span className="font-bold text-navy-900 block">Customer Account</span>
              <span className="text-slate-500 block truncate">customer@nexorastore.lk</span>
            </button>

            <button
              type="button"
              onClick={() => handleFillDemo('admin@nexorastore.lk', 'Admin@Nexora2026!')}
              className="text-left p-2 rounded-xl bg-white border border-slate-200 hover:border-electric-500 text-[11px] transition-colors"
            >
              <span className="font-bold text-electric-600 block">Admin Account</span>
              <span className="text-slate-500 block truncate">admin@nexorastore.lk</span>
            </button>
          </div>
        </div>

        <div className="text-center pt-2 text-xs text-slate-500">
          Don&apos;t have an account yet?{' '}
          <Link href="/auth/register" className="font-bold text-electric-600 hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}
