'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Search,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Order, OrderStatus, PaymentStatus } from '@/lib/types';
import { formatLKR } from '@/lib/utils';

export default function AdminOrdersPage() {
  const { token } = useAuth();
  const { showToast } = useToast();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      setLoading(true);
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
      setLoading(false);
    }
  }

  const handleUpdateStatus = async (orderId: string, orderStatus: OrderStatus, paymentStatus?: PaymentStatus) => {
    try {
      setUpdatingId(orderId);
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderStatus,
          paymentStatus,
        }),
      });

      if (res.ok) {
        showToast('Order status updated.', 'success');
        setOrders((prev) =>
          prev.map((o) =>
            o.id === orderId
              ? {
                  ...o,
                  orderStatus,
                  paymentStatus: paymentStatus || o.paymentStatus,
                }
              : o
          )
        );
      } else {
        showToast('Failed to update status', 'error');
      }
    } catch {
      showToast('Error updating status', 'error');
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === 'all' || o.orderStatus === statusFilter;
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.deliveryDistrict.toLowerCase().includes(search.toLowerCase()) ||
      o.customerPhone.includes(search);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-black text-navy-900 tracking-tight">
          Customer Orders & Dispatch Management
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Track incoming Sri Lanka orders, verify customer delivery details, and update dispatch statuses.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search order ref, customer name, district, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs text-navy-900 outline-none"
          />
        </div>

        {/* Status filter tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-navy-900 text-white'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400 bg-white rounded-3xl border border-slate-200">
            Loading customer orders...
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400 bg-white rounded-3xl border border-slate-200">
            No orders match your filter criteria.
          </div>
        ) : (
          filteredOrders.map((ord) => (
            <div
              key={ord.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-subtle p-6 space-y-4"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-sm text-navy-900 bg-slate-100 px-3 py-1 rounded-xl">
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
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    Status: {ord.orderStatus}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Total (LKR)</span>
                    <span className="font-black text-navy-900 text-sm">{formatLKR(ord.total)}</span>
                  </div>
                  <Link
                    href={`/order-confirmation/${ord.id}`}
                    target="_blank"
                    className="p-1.5 text-slate-400 hover:text-navy-900 rounded-lg hover:bg-slate-100 transition-colors"
                    title="View Receipt"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Customer & Address Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs bg-slate-50 p-4 rounded-2xl">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Customer</span>
                  <p className="font-bold text-navy-900 mt-0.5">{ord.customerName}</p>
                  <p className="text-slate-500 flex items-center gap-1 mt-0.5">
                    <Phone className="w-3 h-3 text-slate-400" />
                    {ord.customerPhone}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Delivery Address</span>
                  <p className="text-slate-700 mt-0.5 flex items-start gap-1">
                    <MapPin className="w-3.5 h-3.5 text-electric-600 shrink-0 mt-0.5" />
                    <span>
                      {ord.deliveryAddress}, {ord.deliveryCity}, <strong>{ord.deliveryDistrict}</strong>
                    </span>
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Payment</span>
                  <p className="font-bold text-navy-900 mt-0.5 capitalize">
                    {ord.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                  </p>
                  <p className="text-[11px] font-semibold text-emerald-600 capitalize">
                    Payment: {ord.paymentStatus}
                  </p>
                </div>
              </div>

              {/* Items Preview */}
              <div className="space-y-1.5 text-xs text-slate-600">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Ordered Items</span>
                <div className="flex flex-wrap gap-2">
                  {ord.items.map((item, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-slate-200 text-slate-800 text-[11px] font-semibold"
                    >
                      <span>{item.productName}</span>
                      <strong className="text-electric-600">×{item.quantity}</strong>
                    </span>
                  ))}
                </div>
              </div>

              {/* Update Status Controls */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-700">Update Order Dispatch:</span>
                  <div className="flex items-center gap-1.5">
                    {(['pending', 'processing', 'shipped', 'delivered', 'cancelled'] as OrderStatus[]).map((st) => (
                      <button
                        key={st}
                        disabled={updatingId === ord.id || ord.orderStatus === st}
                        onClick={() =>
                          handleUpdateStatus(
                            ord.id,
                            st,
                            st === 'delivered' ? 'paid' : ord.paymentStatus
                          )
                        }
                        className={`px-2.5 py-1 rounded-lg font-bold text-[11px] capitalize transition-all ${
                          ord.orderStatus === st
                            ? 'bg-navy-900 text-white cursor-default'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-50'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {ord.paymentStatus !== 'paid' && (
                  <button
                    disabled={updatingId === ord.id}
                    onClick={() => handleUpdateStatus(ord.id, ord.orderStatus, 'paid')}
                    className="flex items-center gap-1 px-3 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-lg font-bold text-[11px] transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark Cash Collected (Paid)</span>
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
