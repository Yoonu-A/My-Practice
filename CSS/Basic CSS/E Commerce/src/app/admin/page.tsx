'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  DollarSign,
  ShoppingBag,
  Package,
  Users,
  AlertTriangle,
  ArrowRight,
  Plus,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { formatLKR } from '@/lib/utils';

export default function AdminOverviewPage() {
  const { token } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        setLoading(true);
        const res = await fetch('/api/admin/stats', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const statsData = await res.json();
          setData(statsData);
        }
      } catch (err) {
        console.error('Error fetching admin statistics:', err);
      } finally {
        setLoading(false);
      }
    }

    if (token) {
      loadStats();
    }
  }, [token]);

  if (loading || !data) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-28 bg-white rounded-2xl border border-slate-200" />
          ))}
        </div>
      </div>
    );
  }

  const { stats, recentOrders, lowStockProducts } = data;

  return (
    <div className="space-y-8">
      {/* Page Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-navy-900 tracking-tight">
            Store Performance Overview
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time metrics, Sri Lankan orders, and warehouse inventory levels.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="flex items-center gap-1.5 bg-electric-600 hover:bg-electric-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-electric transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Revenue */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              Rs.
            </div>
          </div>
          <div className="text-2xl font-black text-navy-900">
            {formatLKR(stats.totalRevenue)}
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold">
            From verified orders in Sri Lanka
          </p>
        </div>

        {/* Total Orders */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Orders Processed</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-navy-900">
            {stats.totalOrders}
          </div>
          <p className="text-[11px] text-slate-400">
            COD & Online payments
          </p>
        </div>

        {/* Products in Catalog */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Catalog</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-navy-900">
            {stats.totalProducts} Items
          </div>
          <p className="text-[11px] text-slate-400">
            Across 6 main categories
          </p>
        </div>

        {/* Registered Customers */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Customers</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-navy-900">
            {stats.totalCustomers}
          </div>
          <p className="text-[11px] text-slate-400">
            Registered accounts
          </p>
        </div>
      </div>

      {/* Two Column Layout: Recent Orders & Inventory Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Orders (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/90 shadow-subtle p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-electric-600" />
              <h2 className="font-extrabold text-sm text-navy-900">Recent Customer Orders</h2>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs font-bold text-electric-600 hover:underline flex items-center gap-1"
            >
              <span>Manage All Orders</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">No orders received yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                    <th className="pb-2.5">Order Ref</th>
                    <th className="pb-2.5">Customer</th>
                    <th className="pb-2.5">Total</th>
                    <th className="pb-2.5">Payment</th>
                    <th className="pb-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentOrders.map((ord: any) => (
                    <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 font-mono font-bold text-navy-900">
                        {ord.order_number}
                      </td>
                      <td className="py-3">
                        <span className="font-bold text-slate-800 block">{ord.customer_name}</span>
                        <span className="text-[10px] text-slate-400">{ord.customer_email}</span>
                      </td>
                      <td className="py-3 font-extrabold text-navy-900">
                        {formatLKR(ord.total)}
                      </td>
                      <td className="py-3">
                        <span className="capitalize font-semibold text-slate-600">
                          {ord.payment_method === 'cod' ? 'COD' : 'Online'}
                        </span>
                      </td>
                      <td className="py-3">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            ord.order_status === 'delivered'
                              ? 'bg-emerald-100 text-emerald-800'
                              : ord.order_status === 'shipped'
                              ? 'bg-blue-100 text-blue-800'
                              : ord.order_status === 'processing'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {ord.order_status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Low Stock Alerts (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/90 shadow-subtle p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <h2 className="font-extrabold text-sm text-navy-900">Inventory Stock Alerts</h2>
          </div>

          <div className="space-y-3">
            {lowStockProducts.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">
                All inventory items are well stocked!
              </p>
            ) : (
              lowStockProducts.map((p: any) => (
                <div
                  key={p.id}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs gap-3"
                >
                  <div className="min-w-0">
                    <p className="font-bold text-navy-900 truncate">{p.name}</p>
                    <p className="text-slate-400 text-[10px]">{p.category_name}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        p.stock <= 5
                          ? 'bg-red-100 text-red-700 font-extrabold'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {p.stock} units left
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="pt-2">
            <Link
              href="/admin/products"
              className="block w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs transition-colors"
            >
              Update Warehouse Stock
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
