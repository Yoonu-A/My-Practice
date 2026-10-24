'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatLKR } from '@/lib/utils';
import { FREE_DELIVERY_THRESHOLD } from '@/lib/sriLankaData';

export default function CartDrawer() {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen, subtotal, totalItems } = useCart();

  if (!isCartOpen) return null;

  const freeDeliveryProgress = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));
  const amountNeeded = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm transition-opacity animate-in fade-in"
      />

      {/* Drawer content */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-electric-600" />
              <h2 className="font-bold text-lg text-navy-900">Shopping Cart</h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                {totalItems}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-slate-400 hover:text-navy-900 rounded-full hover:bg-slate-200/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free shipping banner */}
          <div className="p-4 bg-electric-50/70 border-b border-electric-100/60">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5 text-navy-900">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-electric-600" />
                {amountNeeded > 0 ? (
                  <span>
                    Add <span className="text-electric-600">{formatLKR(amountNeeded)}</span> more for{' '}
                    <span className="text-electric-700 font-bold">FREE Island-wide Delivery!</span>
                  </span>
                ) : (
                  <span className="text-emerald-700 font-bold">
                    You unlocked FREE Island-wide Delivery!
                  </span>
                )}
              </div>
              <span className="text-electric-600">{freeDeliveryProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-electric-500 rounded-full transition-all duration-500"
                style={{ width: `${freeDeliveryProgress}%` }}
              />
            </div>
          </div>

          {/* Cart items list */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-slate-100">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-navy-900">Your cart is empty</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Explore our collection of authentic electronics, smartphones, and fashion.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    router.push('/products');
                  }}
                  className="mt-2 bg-navy-900 hover:bg-electric-600 text-white font-semibold text-sm px-6 py-2.5 rounded-full transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} className="py-4 flex gap-4">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-xl border border-slate-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <Link
                          href={`/products/${item.product.id}`}
                          onClick={() => setIsCartOpen(false)}
                          className="font-semibold text-sm text-navy-900 hover:text-electric-600 transition-colors line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                          className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-xs text-slate-500 mt-0.5">
                        {item.selectedColor && <span className="mr-2">Color: {item.selectedColor}</span>}
                        {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                      </div>

                      <p className="font-bold text-sm text-electric-600 mt-1">
                        {formatLKR(item.product.price)}
                      </p>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedColor, item.selectedSize)}
                          className="p-1 hover:bg-slate-200 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5 text-slate-600" />
                        </button>
                        <span className="px-3 text-xs font-bold text-slate-800">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedColor, item.selectedSize)}
                          className="p-1 hover:bg-slate-200 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5 text-slate-600" />
                        </button>
                      </div>

                      <span className="text-xs font-semibold text-slate-700">
                        {formatLKR(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer actions */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-100 bg-slate-50/70 space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-navy-900">{formatLKR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Delivery (Sri Lanka)</span>
                  <span>{subtotal >= FREE_DELIVERY_THRESHOLD ? 'FREE' : 'Calculated at checkout'}</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    router.push('/checkout');
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-navy-900 hover:bg-electric-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-all group"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    router.push('/cart');
                  }}
                  className="w-full py-2.5 text-xs font-semibold text-slate-700 hover:text-navy-900 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  View Full Cart & Apply Coupons
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Cash on Delivery & Secure Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
