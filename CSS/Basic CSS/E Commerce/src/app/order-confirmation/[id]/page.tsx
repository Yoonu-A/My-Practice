'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  Phone,
  Mail,
  Printer,
  ArrowRight,
  ShieldCheck,
  Calendar,
} from 'lucide-react';
import { Order } from '@/lib/types';
import { formatLKR } from '@/lib/utils';

export default function OrderConfirmationPage() {
  const params = useParams();
  const { id } = params;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      try {
        setLoading(true);
        const res = await fetch(`/api/orders/${id}`);
        if (res.ok) {
          const data = await res.json();
          setOrder(data.order);
        }
      } catch (err) {
        console.error('Error fetching order confirmation:', err);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchOrder();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center animate-pulse space-y-4">
        <div className="w-16 h-16 rounded-full bg-slate-200 mx-auto" />
        <div className="h-6 bg-slate-200 rounded w-1/3 mx-auto" />
        <div className="h-4 bg-slate-200 rounded w-1/2 mx-auto" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-navy-900">Order Not Found</h2>
        <p className="text-sm text-slate-500 mt-2">
          We could not find the order details for reference ID: {String(id)}.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block bg-navy-900 text-white font-bold px-6 py-2.5 rounded-full text-xs"
        >
          Return to Store Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Success Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-premium p-6 sm:p-10 space-y-8">
          {/* Header */}
          <div className="text-center space-y-3 pb-6 border-b border-slate-100">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border-4 border-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="inline-block text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              Order Confirmed & Logged
            </span>

            <h1 className="text-2xl sm:text-3xl font-black text-navy-900 tracking-tight">
              Thank You For Your Order!
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              We have received your order. Our logistics team in Colombo is preparing your dispatch. Please keep cash ready for the delivery driver.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <span className="font-mono font-bold text-sm bg-slate-100 px-4 py-1.5 rounded-xl text-navy-900 border border-slate-200">
                Order Reference: {order.orderNumber}
              </span>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-navy-900 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Receipt</span>
              </button>
            </div>
          </div>

          {/* Delivery & Payment Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-navy-900">
                <Truck className="w-4 h-4 text-electric-600" />
                <span>Delivery Status</span>
              </div>
              <p className="text-xs font-semibold text-slate-700 capitalize">
                Status: <span className="text-electric-600 font-bold">{order.orderStatus}</span>
              </p>
              <p className="text-[11px] text-slate-500">
                Estimated arrival: 1-3 Business Days to {order.deliveryDistrict}.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-navy-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Payment Method</span>
              </div>
              <p className="text-xs font-semibold text-slate-700">
                {order.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Online Payment'}
              </p>
              <p className="text-[11px] text-slate-500">
                Payment status: <span className="font-bold capitalize">{order.paymentStatus}</span> upon doorstep receipt.
              </p>
            </div>
          </div>

          {/* Customer & Address Details */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Shipping & Recipient Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
              <div>
                <p className="font-bold text-navy-900 text-sm">{order.customerName}</p>
                <p className="text-slate-500 mt-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  {order.customerPhone}
                </p>
                <p className="text-slate-500 mt-0.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {order.customerEmail}
                </p>
              </div>

              <div>
                <p className="font-bold text-navy-900 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-electric-600 shrink-0 mt-0.5" />
                  <span>{order.deliveryAddress}</span>
                </p>
                <p className="text-slate-500 mt-1 pl-5">
                  {order.deliveryCity}, {order.deliveryDistrict} District
                </p>
                <p className="text-slate-500 pl-5">
                  {order.deliveryProvince} {order.postalCode ? `(${order.postalCode})` : ''}
                </p>
              </div>
            </div>
          </div>

          {/* Ordered Items Summary */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Items In This Order
            </h3>
            <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden">
              {order.items.map((item, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-12 h-12 object-cover rounded-xl border border-slate-200 shrink-0"
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
          </div>

          {/* Pricing Totals */}
          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="font-bold text-navy-900">{formatLKR(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee ({order.deliveryDistrict})</span>
              <span className="font-bold text-navy-900">
                {order.deliveryFee === 0 ? <span className="text-emerald-600">FREE</span> : formatLKR(order.deliveryFee)}
              </span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Promotional Discount</span>
                <span>-{formatLKR(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between pt-3 border-t border-slate-100 text-base font-black text-navy-900">
              <span>Total Payable (LKR)</span>
              <span className="text-xl font-black">{formatLKR(order.total)}</span>
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <Link
              href="/products"
              className="flex-1 flex items-center justify-center gap-2 bg-navy-900 hover:bg-electric-600 text-white font-bold py-3.5 px-6 rounded-2xl text-xs sm:text-sm transition-all shadow-sm"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/account"
              className="flex-1 text-center bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 px-6 rounded-2xl text-xs sm:text-sm transition-colors"
            >
              Track in Customer Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
