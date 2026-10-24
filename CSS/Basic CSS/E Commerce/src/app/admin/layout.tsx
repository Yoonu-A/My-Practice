'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  ArrowLeft,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAdmin, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push('/auth/login?redirect=/admin');
      } else if (!isAdmin) {
        router.push('/');
      }
    }
  }, [user, isAdmin, isLoading, router]);

  if (isLoading || !isAdmin) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 space-y-4">
        <ShieldAlert className="w-12 h-12 text-amber-400 animate-pulse" />
        <h2 className="text-xl font-bold">Verifying Administrator Privileges...</h2>
        <p className="text-xs text-slate-400">
          Only authorized store administrators can access the NEXORA control center.
        </p>
      </div>
    );
  }

  const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Product Inventory', href: '/admin/products', icon: Package },
    { label: 'Orders & Dispatch', href: '/admin/orders', icon: ShoppingBag },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Admin Top Header */}
      <header className="bg-navy-950 text-white px-6 py-3.5 border-b border-navy-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors mr-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Store Front</span>
          </Link>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-electric-600 flex items-center justify-center text-white text-xs font-black">
              N
            </div>
            <span className="font-extrabold text-sm tracking-tight text-white">
              NEXORA <span className="text-electric-400">CONTROL CENTER</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400">
            Signed in as <strong className="text-white">{user?.name}</strong> (Administrator)
          </span>
        </div>
      </header>

      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  active
                    ? 'bg-navy-900 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Content */}
        {children}
      </div>
    </div>
  );
}
