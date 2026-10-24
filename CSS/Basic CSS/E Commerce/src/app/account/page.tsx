'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User,
  Package,
  MapPin,
  Phone,
  Mail,
  Shield,
  LogOut,
  Calendar,
  Truck,
  CheckCircle2,
  Clock,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Order } from '@/lib/types';
import { formatLKR } from '@/lib/utils';
import { SRI_LANKA_DISTRICTS } from '@/lib/sriLankaData';

export default function AccountPage() {
  const router = useRouter();
  const { user, token, logout, isAdmin, isLoading, updateUser } = useAuth();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'orders' | 'profile'>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Profile form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('Colombo');
  const [savingProfile, setSavingProfile] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setPhone(user.phone || '');
      setAddress(user.address || '');
      setCity(user.city || '');
      setDistrict(user.district || 'Colombo');

      // Fetch user's orders
      loadUserOrders();
    }
  }, [user]);

  async function loadUserOrders() {
    try {
      setLoadingOrders(true);
      const res = await fetch('/api/orders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingOrders(false);
    }
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSavingProfile(true);
      const res = await fetch('/api/auth/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, phone, address, city, district }),
      });

      if (res.ok) {
        const data = await res.json();
        updateUser(data.user);
        showToast('Your customer profile has been updated.', 'success');
      } else {
        showToast('Failed to update profile.', 'error');
      }
    } catch {
      showToast('Error updating profile.', 'error');
    } finally {
      setSavingProfile(false);
    }
  };

  if (isLoading || !user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center animate-pulse">
        <p className="text-sm text-slate-500">Loading your account details...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-subtle p-6 sm:p-8 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-navy-900 text-electric-400 font-black text-2xl flex items-center justify-center shadow-md">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-navy-900">
                  {user.name}
                </h1>
                {isAdmin && (
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-electric-100 text-electric-700 px-2.5 py-0.5 rounded-full">
                    Admin
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{user.email}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Delivery District: <span className="text-navy-900 font-semibold">{user.district || 'Colombo'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <Link
                href="/admin"
                className="flex items-center gap-1.5 bg-electric-600 hover:bg-electric-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-electric transition-all"
              >
                <Shield className="w-4 h-4" />
                <span>Admin Dashboard</span>
              </Link>
            )}

            <button
              onClick={logout}
              className="flex items-center gap-1.5 bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 font-bold text-xs px-4 py-2.5 rounded-xl border border-slate-200 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Account Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Nav (3 cols) */}
          <div className="lg:col-span-3 space-y-2">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'orders'
                  ? 'bg-navy-900 text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Package className="w-4 h-4" />
                <span>My Orders History</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeTab === 'orders' ? 'bg-navy-800 text-white' : 'bg-slate-100 text-slate-600'}`}>
                {orders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'profile'
                  ? 'bg-navy-900 text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <User className="w-4 h-4" />
                <span>Profile & Addresses</span>
              </div>
            </button>
          </div>

          {/* Main Tab Content (9 cols) */}
          <div className="lg:col-span-9">
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-bold text-navy-900">Your Orders in Sri Lanka</h2>
                  <span className="text-xs text-slate-400">Total {orders.length} orders</span>
                </div>

                {loadingOrders ? (
                  <div className="p-12 text-center text-xs text-slate-400 bg-white rounded-3xl border border-slate-200">
                    Loading your orders...
                  </div>
                ) : orders.length === 0 ? (
                  <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 shadow-subtle">
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                      <Package className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-navy-900">No orders placed yet</h3>
                      <p className="text-xs text-slate-500 mt-1">
                        When you purchase items via Cash on Delivery, your orders will appear here.
                      </p>
                    </div>
                    <Link
                      href="/products"
                      className="inline-block bg-navy-900 text-white font-bold px-6 py-2.5 rounded-full text-xs shadow-sm hover:bg-electric-600 transition-colors"
                    >
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="bg-white rounded-3xl border border-slate-200/90 shadow-subtle p-6 space-y-4"
                    >
                      {/* Order Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-sm text-navy-900">
                              {ord.orderNumber}
                            </span>
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                                ord.orderStatus === 'delivered'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : ord.orderStatus === 'shipped'
                                  ? 'bg-blue-100 text-blue-800'
                                  : ord.orderStatus === 'processing'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-slate-100 text-slate-800'
                              }`}
                            >
                              {ord.orderStatus}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(ord.createdAt).toLocaleDateString('en-LK', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>

                        <div className="text-left sm:text-right">
                          <span className="text-xs text-slate-400 block">Total Amount</span>
                          <span className="font-extrabold text-base text-navy-900">
                            {formatLKR(ord.total)}
                          </span>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="space-y-2.5">
                        {ord.items.map((item, i) => (
                          <div key={i} className="flex items-center justify-between gap-4 text-xs">
                            <div className="flex items-center gap-3 min-w-0">
                              <img
                                src={item.productImage}
                                alt={item.productName}
                                className="w-10 h-10 object-cover rounded-xl border border-slate-200 shrink-0"
                              />
                              <div className="min-w-0">
                                <p className="font-bold text-navy-900 truncate">{item.productName}</p>
                                <p className="text-slate-400 text-[11px]">
                                  Qty: {item.quantity} × {formatLKR(item.price)}
                                </p>
                              </div>
                            </div>
                            <span className="font-bold text-navy-900 shrink-0">
                              {formatLKR(item.total)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Delivery address & tracking link */}
                      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-2">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-electric-600 shrink-0" />
                          <span>
                            Delivery to: <strong>{ord.deliveryCity}, {ord.deliveryDistrict}</strong>
                          </span>
                        </div>

                        <Link
                          href={`/order-confirmation/${ord.id}`}
                          className="font-bold text-electric-600 hover:text-navy-900 flex items-center gap-1"
                        >
                          <span>View Full Receipt</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-subtle p-6 sm:p-8 space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-lg font-bold text-navy-900">Customer Profile & Address</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Update your Sri Lankan shipping address for faster future checkouts.
                  </p>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-navy-900 outline-none focus:border-electric-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address</label>
                      <input
                        type="email"
                        readOnly
                        value={user.email}
                        className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-500 outline-none cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Mobile Phone</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-navy-900 outline-none focus:border-electric-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">District</label>
                      <select
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-navy-900 outline-none focus:border-electric-500 cursor-pointer"
                      >
                        {SRI_LANKA_DISTRICTS.map((d) => (
                          <option key={d.name} value={d.name}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Street Address</label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-navy-900 outline-none focus:border-electric-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">City</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-navy-900 outline-none focus:border-electric-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={savingProfile}
                    className="bg-navy-900 hover:bg-electric-600 text-white font-bold text-xs px-6 py-3 rounded-xl transition-colors shadow-sm"
                  >
                    {savingProfile ? 'Saving Changes...' : 'Save Profile Changes'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
