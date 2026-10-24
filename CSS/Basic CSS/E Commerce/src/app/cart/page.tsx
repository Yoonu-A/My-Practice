'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  Tag,
  ArrowLeft,
  Check,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { formatLKR, validatePromoCode } from '@/lib/utils';
import { FREE_DELIVERY_THRESHOLD } from '@/lib/sriLankaData';

export default function CartPage() {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, clearCart, subtotal, totalItems } = useCart();
  const { showToast } = useToast();

  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [discountLabel, setDiscountLabel] = useState('');

  const freeDeliveryProgress = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));
  const amountNeeded = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    const res = validatePromoCode(couponCode, subtotal);
    if (res.valid) {
      setAppliedDiscount(res.discount);
      setDiscountLabel(res.message);
      showToast(res.message, 'success');
    } else {
      setAppliedDiscount(0);
      setDiscountLabel('');
      showToast(res.message, 'error');
    }
  };

  const finalTotal = Math.max(0, subtotal - appliedDiscount);

  if (cart.length === 0) {
    return (
      <div className="bg-slate-50 min-h-screen py-16 flex items-center justify-center">
        <div className="max-w-md w-full mx-4 bg-white rounded-3xl p-8 border border-slate-200 text-center shadow-subtle space-y-5">
          <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-navy-900">Your Cart is Empty</h1>
            <p className="text-sm text-slate-500 mt-2">
              Looks like you haven&apos;t added any products to your shopping bag yet.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 w-full bg-navy-900 hover:bg-electric-600 text-white font-bold py-3.5 px-6 rounded-2xl text-sm transition-all shadow-md"
          >
            <span>Explore Collections</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-navy-900 tracking-tight">
              Shopping Cart ({totalItems} items)
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Review your items before proceeding to Island-wide Sri Lanka checkout.
            </p>
          </div>

          <button
            onClick={clearCart}
            className="text-xs font-bold text-red-600 hover:text-red-700 self-start sm:self-auto flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Entire Cart</span>
          </button>
        </div>

        {/* Free Shipping Alert Bar */}
        <div className="mb-8 p-4 bg-white rounded-2xl border border-electric-100 shadow-subtle">
          <div className="flex items-center justify-between text-xs font-bold text-navy-900 mb-2">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-electric-600" />
              {amountNeeded > 0 ? (
                <span>
                  Add <span className="text-electric-600">{formatLKR(amountNeeded)}</span> more for{' '}
                  <span className="text-electric-700">FREE Island-wide Delivery across Sri Lanka!</span>
                </span>
              ) : (
                <span className="text-emerald-700 flex items-center gap-1">
                  <Check className="w-4 h-4" /> You unlocked FREE Island-wide Shipping!
                </span>
              )}
            </div>
            <span className="text-electric-600 font-extrabold">{freeDeliveryProgress}%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-electric-500 rounded-full transition-all duration-500"
              style={{ width: `${freeDeliveryProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Items list (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-subtle overflow-hidden divide-y divide-slate-100">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                  className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-2xl border border-slate-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-electric-600 block">
                        {item.product.categoryName}
                      </span>
                      <Link
                        href={`/products/${item.product.id}`}
                        className="font-bold text-sm sm:text-base text-navy-900 hover:text-electric-600 transition-colors line-clamp-1"
                      >
                        {item.product.name}
                      </Link>

                      <div className="text-xs text-slate-500 mt-1">
                        Unit Price: <span className="font-semibold text-slate-800">{formatLKR(item.product.price)}</span>
                      </div>
                      <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                        In Stock ({item.product.stock} units available)
                      </div>
                    </div>
                  </div>

                  {/* Quantity and Line Total */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.quantity - 1,
                            item.selectedColor,
                            item.selectedSize
                          )
                        }
                        className="p-2 hover:bg-slate-200 text-slate-700 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-navy-900">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.quantity + 1,
                            item.selectedColor,
                            item.selectedSize
                          )
                        }
                        className="p-2 hover:bg-slate-200 text-slate-700 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right min-w-[100px]">
                      <span className="font-extrabold text-base text-navy-900 block">
                        {formatLKR(item.product.price * item.quantity)}
                      </span>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                      className="text-slate-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors"
                      title="Remove from cart"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-electric-600 hover:text-navy-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>

          {/* Order Summary Card (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-subtle p-6 space-y-6 sticky top-28">
              <h2 className="font-extrabold text-lg text-navy-900 border-b border-slate-100 pb-3">
                Order Summary
              </h2>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <label className="block text-xs font-bold text-slate-600">Have a coupon code?</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="e.g. NEXORA10"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono uppercase outline-none focus:border-electric-500"
                    />
                    <Tag className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                  <button
                    type="submit"
                    className="bg-navy-900 hover:bg-electric-600 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {discountLabel && (
                  <p className="text-[11px] font-semibold text-emerald-600">{discountLabel}</p>
                )}
              </form>

              {/* Cost Calculations */}
              <div className="space-y-3 pt-3 border-t border-slate-100 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Cart Subtotal</span>
                  <span className="font-bold text-navy-900">{formatLKR(subtotal)}</span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Coupon Discount</span>
                    <span>-{formatLKR(appliedDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-600">
                  <span>Estimated Delivery</span>
                  <span className="font-bold text-navy-900">
                    {subtotal >= FREE_DELIVERY_THRESHOLD ? (
                      <span className="text-emerald-600">FREE</span>
                    ) : (
                      'From Rs. 350'
                    )}
                  </span>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
                  <span className="font-extrabold text-sm text-navy-900">Subtotal</span>
                  <span className="font-black text-2xl text-navy-900">
                    {formatLKR(finalTotal)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <div className="space-y-3">
                <button
                  onClick={() => router.push('/checkout')}
                  className="w-full flex items-center justify-center gap-2 bg-electric-600 hover:bg-electric-500 text-white font-bold py-4 px-6 rounded-2xl text-sm transition-all shadow-electric hover:shadow-electric-lg group"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-center">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-700">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Cash on Delivery (COD) Guaranteed</span>
                  </div>
                  <p className="text-[10px] text-slate-500">
                    Inspect goods at your door before handing cash to the courier.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
