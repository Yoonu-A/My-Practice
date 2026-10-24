'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { formatLKR, calculateDiscount } from '@/lib/utils';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, totalWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (totalWishlist === 0) {
    return (
      <div className="bg-slate-50 min-h-screen py-16 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 text-center shadow-subtle space-y-4">
          <div className="w-16 h-16 rounded-full bg-red-50 text-red-400 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-navy-900">Your Wishlist is Empty</h1>
          <p className="text-xs text-slate-500">
            Save items you love by tapping the heart icon on any product.
          </p>
          <Link
            href="/products"
            className="inline-block bg-navy-900 hover:bg-electric-600 text-white font-bold px-6 py-3 rounded-full text-xs transition-colors shadow-sm"
          >
            Explore Collections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-navy-900 tracking-tight">
            My Wishlist ({totalWishlist} saved items)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Items saved to your personal shopping list. Add directly to your cart anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => {
            const discount = calculateDiscount(product.price, product.originalPrice);

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-subtle hover:shadow-premium card-hover-effect flex flex-col justify-between"
              >
                <div className="relative aspect-square bg-slate-100 overflow-hidden group">
                  <Link href={`/products/${product.id}`} className="block w-full h-full">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-red-500 flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  {discount > 0 && (
                    <span className="absolute top-3 left-3 bg-electric-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full shadow-md">
                      -{discount}%
                    </span>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-electric-600">
                      {product.categoryName}
                    </span>
                    <Link
                      href={`/products/${product.id}`}
                      className="font-bold text-sm text-navy-900 line-clamp-2 hover:text-electric-600 transition-colors"
                    >
                      {product.name}
                    </Link>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="font-extrabold text-sm text-navy-900 block">
                        {formatLKR(product.price)}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(product, 1)}
                      className="flex items-center gap-1.5 bg-navy-900 hover:bg-electric-600 text-white font-bold text-xs px-3 py-2 rounded-xl transition-colors shadow-sm"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
