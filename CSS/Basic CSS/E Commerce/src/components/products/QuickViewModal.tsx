'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X, Star, ShoppingBag, ShieldCheck, Truck, Check, Heart, ExternalLink } from 'lucide-react';
import { Product } from '@/lib/types';
import { formatLKR, calculateDiscount } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const discount = calculateDiscount(product.price, product.originalPrice);
  const isWishlisted = isInWishlist(product.id);

  const handleBuyNow = () => {
    addToCart(product, quantity);
    onClose();
    router.push('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        {/* Backdrop */}
        <div
          onClick={onClose}
          className="fixed inset-0 bg-navy-950/70 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Dialog */}
        <div className="relative w-full max-w-3xl transform overflow-hidden rounded-3xl bg-white p-6 sm:p-8 text-left shadow-2xl transition-all z-10 border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-navy-900 rounded-full hover:bg-slate-100 transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Gallery */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImageIndex(i)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        selectedImageIndex === i
                          ? 'border-electric-600 scale-95 shadow-sm'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-electric-600">
                    {product.categoryName}
                  </span>
                  <div className="flex items-center gap-1 text-slate-700 text-xs font-bold">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                    <span className="text-slate-400">({product.reviewCount} reviews)</span>
                  </div>
                </div>

                <h2 className="text-xl font-extrabold text-navy-900 leading-snug">
                  {product.name}
                </h2>

                {/* Price block */}
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-2xl font-black text-navy-900">
                    {formatLKR(product.price)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <>
                      <span className="text-sm text-slate-400 line-through">
                        {formatLKR(product.originalPrice)}
                      </span>
                      <span className="text-xs font-bold text-electric-600 bg-electric-50 px-2 py-0.5 rounded-full">
                        Save {discount}%
                      </span>
                    </>
                  )}
                </div>

                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {product.description}
                </p>

                {/* Stock info */}
                <div className="mt-4 flex items-center gap-2 text-xs font-semibold">
                  <span
                    className={`inline-block w-2.5 h-2.5 rounded-full ${
                      product.stock > 0 ? 'bg-emerald-500' : 'bg-red-500'
                    }`}
                  />
                  <span className={product.stock > 0 ? 'text-emerald-700' : 'text-red-600'}>
                    {product.stock > 0 ? `${product.stock} units available in Sri Lanka warehouse` : 'Currently Out of Stock'}
                  </span>
                </div>

                {/* Key Specs snippet */}
                {product.specs && Object.keys(product.specs).length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(product.specs).slice(0, 4).map(([key, value]) => (
                        <div key={key} className="bg-slate-50 p-2 rounded-lg">
                          <span className="text-slate-400 block text-[10px] font-semibold">{key}</span>
                          <span className="font-semibold text-slate-800 truncate block">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Quantity and Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-slate-700">Quantity:</span>
                  <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 hover:bg-slate-200 text-slate-700 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-bold text-slate-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-3 py-1.5 hover:bg-slate-200 text-slate-700 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className="p-2 text-slate-500 hover:text-red-500 border border-slate-200 rounded-xl transition-colors ml-auto"
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => {
                      addToCart(product, quantity);
                      onClose();
                    }}
                    disabled={product.stock === 0}
                    className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    disabled={product.stock === 0}
                    className="flex items-center justify-center gap-2 bg-electric-600 hover:bg-electric-500 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition-all shadow-electric hover:shadow-electric-lg"
                  >
                    <span>Buy Now</span>
                  </button>
                </div>

                <div className="text-center pt-1">
                  <Link
                    href={`/products/${product.id}`}
                    onClick={onClose}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-navy-900 transition-colors"
                  >
                    <span>View full product details & customer reviews</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
