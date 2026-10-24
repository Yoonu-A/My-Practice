'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Eye, Star, Check } from 'lucide-react';
import { Product } from '@/lib/types';
import { formatLKR, calculateDiscount } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const discountPercent = calculateDiscount(product.price, product.originalPrice);
  const isWishlisted = isInWishlist(product.id);
  const displayImage = isHovered && product.images[1] ? product.images[1] : product.images[0];

  return (
    <div
      className="group relative bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-subtle hover:shadow-premium card-hover-effect flex flex-col transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
        <Link href={`/products/${product.id}`} className="block w-full h-full">
          <img
            src={displayImage}
            alt={product.name}
            className={`w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </Link>

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {discountPercent > 0 && (
            <span className="bg-electric-600 text-white font-extrabold text-[11px] px-2.5 py-1 rounded-full shadow-md">
              -{discountPercent}% OFF
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-navy-900 text-white font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm">
              New
            </span>
          )}
          {product.isBestSeller && !product.isNewArrival && (
            <span className="bg-amber-500 text-white font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm">
              Best Seller
            </span>
          )}
        </div>

        {/* Action Buttons Overlay */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
          {/* Wishlist Button */}
          <button
            onClick={() => toggleWishlist(product)}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md ${
              isWishlisted
                ? 'bg-red-50 text-red-500 border border-red-200'
                : 'bg-white/90 text-slate-700 hover:text-red-500 hover:bg-white backdrop-blur-sm'
            }`}
            aria-label="Add to wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500' : ''}`} />
          </button>

          {/* Quick View Button */}
          {onQuickView && (
            <button
              onClick={() => onQuickView(product)}
              className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-electric-600 flex items-center justify-center transition-all shadow-md backdrop-blur-sm opacity-0 group-hover:opacity-100"
              aria-label="Quick view"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Stock Alert Overlay */}
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute bottom-2 left-2 right-2 bg-amber-500/90 text-white text-[11px] font-semibold text-center py-1 rounded-lg backdrop-blur-sm">
            Only {product.stock} units left in stock!
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center">
            <span className="bg-red-600 text-white font-bold text-xs uppercase px-4 py-1.5 rounded-full shadow-lg">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="font-semibold uppercase tracking-wider text-[11px] text-electric-600">
              {product.categoryName}
            </span>
            <div className="flex items-center gap-1 text-slate-700 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-400 text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <Link href={`/products/${product.id}`} className="block group-hover:text-electric-600 transition-colors">
            <h3 className="font-bold text-sm sm:text-base text-navy-900 line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Pricing and Add to Cart */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="font-extrabold text-base sm:text-lg text-navy-900 leading-tight">
              {formatLKR(product.price)}
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="text-xs text-slate-400 line-through">
                {formatLKR(product.originalPrice)}
              </div>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            disabled={product.stock === 0}
            className={`p-2.5 sm:px-3 sm:py-2 rounded-xl flex items-center gap-1.5 font-bold text-xs transition-all shadow-sm ${
              product.stock === 0
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-navy-900 hover:bg-electric-600 text-white hover:shadow-electric active:scale-95'
            }`}
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
