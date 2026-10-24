'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  Share2,
  ChevronRight,
  Info,
  Clock,
  MessageSquare,
  ThumbsUp,
} from 'lucide-react';
import { Product, Review } from '@/lib/types';
import { formatLKR, calculateDiscount } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext';
import ProductGrid from '@/components/products/ProductGrid';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();
  const { user } = useAuth();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // Gallery state
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  // Review form
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewerName, setReviewName] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    async function loadProductData() {
      try {
        setLoading(true);
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) {
          throw new Error('Product not found');
        }
        const data = await res.json();
        setProduct(data.product);
        setRelatedProducts(data.related || []);
        setSelectedImage(data.product.images[0] || '');

        // Load reviews
        const revRes = await fetch(`/api/reviews?productId=${data.product.id}`);
        if (revRes.ok) {
          const revData = await revRes.json();
          setReviews(revData.reviews || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadProductData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 animate-pulse space-y-8">
        <div className="h-6 bg-slate-200 rounded w-1/4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="h-96 bg-slate-200 rounded-3xl" />
          <div className="space-y-4">
            <div className="h-8 bg-slate-200 rounded w-3/4" />
            <div className="h-6 bg-slate-200 rounded w-1/3" />
            <div className="h-24 bg-slate-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-navy-900">Product Not Found</h2>
        <p className="text-sm text-slate-500 mt-2">
          The requested product may be discontinued or unavailable in our Sri Lanka warehouse.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-block bg-navy-900 text-white font-bold px-6 py-2.5 rounded-full text-xs"
        >
          Back to Catalog
        </Link>
      </div>
    );
  }

  const discount = calculateDiscount(product.price, product.originalPrice);
  const isWishlisted = isInWishlist(product.id);

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push('/checkout');
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) {
      showToast('Please enter your review comments', 'error');
      return;
    }

    try {
      setSubmittingReview(true);
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          rating: reviewRating,
          comment: reviewComment,
          userName: user?.name || reviewerName.trim() || 'Verified Customer',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setReviews([data.review, ...reviews]);
        setReviewComment('');
        showToast('Thank you! Your verified review has been published.', 'success');
      } else {
        showToast('Failed to post review. Please try again.', 'error');
      }
    } catch {
      showToast('Error submitting review', 'error');
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-navy-900 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link href={`/products?category=${product.categoryId}`} className="hover:text-navy-900 capitalize transition-colors">
            {product.categoryName}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="text-navy-900 truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Main Product Section */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-subtle p-6 sm:p-10 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: Gallery (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative group">
                <img
                  src={selectedImage || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-all duration-300"
                />
                {discount > 0 && (
                  <div className="absolute top-4 left-4 bg-electric-600 text-white font-extrabold text-xs px-3 py-1 rounded-full shadow-md">
                    -{discount}% OFF
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        selectedImage === img
                          ? 'border-electric-600 scale-95 shadow-sm'
                          : 'border-slate-200 hover:border-slate-400 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Details & Actions (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-electric-600 bg-electric-50 px-3 py-1 rounded-full">
                    {product.categoryName}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`p-2 rounded-full border transition-all ${
                        isWishlisted
                          ? 'bg-red-50 text-red-500 border-red-200'
                          : 'text-slate-500 hover:text-navy-900 border-slate-200'
                      }`}
                      aria-label="Add to wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500' : ''}`} />
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        showToast('Product link copied to clipboard!', 'success');
                      }}
                      className="p-2 text-slate-500 hover:text-navy-900 border border-slate-200 rounded-full transition-colors"
                      title="Share product"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-navy-900 tracking-tight leading-snug">
                  {product.name}
                </h1>

                {/* Rating summary */}
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-700">{product.rating}</span>
                  <span className="text-xs text-slate-400">({product.reviewCount} customer reviews)</span>
                </div>

                {/* Price block */}
                <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-wrap items-baseline gap-4">
                  <span className="text-3xl font-black text-navy-900">
                    {formatLKR(product.price)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <div className="flex items-center gap-2">
                      <span className="text-base text-slate-400 line-through">
                        {formatLKR(product.originalPrice)}
                      </span>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                        You save {formatLKR(product.originalPrice - product.price)} ({discount}%)
                      </span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                  {product.description}
                </p>

                {/* Availability info */}
                <div className="mt-5 flex items-center gap-3 text-xs font-bold">
                  <span
                    className={`inline-block w-3 h-3 rounded-full ${
                      product.stock > 0 ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'
                    }`}
                  />
                  {product.stock > 0 ? (
                    <span className="text-emerald-700">
                      In Stock ({product.stock} units ready for immediate Colombo dispatch)
                    </span>
                  ) : (
                    <span className="text-red-600">Currently Sold Out</span>
                  )}
                </div>
              </div>

              {/* Purchase options */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-slate-700">Select Quantity:</span>
                  <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3.5 py-2 hover:bg-slate-200 text-slate-700 font-bold transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 text-sm font-bold text-navy-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-3.5 py-2 hover:bg-slate-200 text-slate-700 font-bold transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => addToCart(product, quantity)}
                    disabled={product.stock === 0}
                    className="flex items-center justify-center gap-2 bg-navy-900 hover:bg-slate-800 text-white font-bold py-4 px-6 rounded-2xl text-sm transition-all shadow-md active:scale-98 disabled:opacity-50"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    disabled={product.stock === 0}
                    className="flex items-center justify-center gap-2 bg-electric-600 hover:bg-electric-500 text-white font-bold py-4 px-6 rounded-2xl text-sm transition-all shadow-electric hover:shadow-electric-lg active:scale-98 disabled:opacity-50"
                  >
                    <span>Buy Now with COD</span>
                  </button>
                </div>
              </div>

              {/* Delivery & Warranty Guarantees for Sri Lanka */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-electric-600 shrink-0" />
                  <span>1-2 Days in Colombo, 2-4 Days Island-wide</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Doorstep Cash on Delivery (COD)</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>7-Day Return Guarantee</span>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications Table */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-100">
              <h3 className="text-lg font-bold text-navy-900 mb-4">Technical Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-xs">
                    <span className="font-semibold text-slate-500">{key}</span>
                    <span className="font-bold text-navy-900 text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Customer Reviews & Feedback Section */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 mb-12 shadow-subtle">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-navy-900">
                Verified Customer Reviews
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Real feedback from verified shoppers across Sri Lanka.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-2xl border border-amber-200">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              <span className="text-base font-black text-navy-900">{product.rating}</span>
              <span className="text-xs text-slate-500">out of 5.0</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Reviews list */}
            <div className="lg:col-span-7 space-y-4">
              {reviews.length === 0 ? (
                <div className="p-8 text-center text-sm text-slate-400 bg-slate-50 rounded-2xl">
                  No reviews yet. Be the first customer in Sri Lanka to review this product!
                </div>
              ) : (
                reviews.map((rev) => (
                  <div key={rev.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-navy-900 text-white flex items-center justify-center font-bold text-xs">
                          {rev.userName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-navy-900">{rev.userName}</p>
                          <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                            <Check className="w-3 h-3" /> Verified Buyer
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating ? 'fill-amber-400' : 'text-slate-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed pt-1">
                      {rev.comment}
                    </p>

                    <div className="text-[10px] text-slate-400 pt-1">
                      {new Date(rev.createdAt).toLocaleDateString('en-LK', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Leave a review form */}
            <div className="lg:col-span-5 bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h3 className="font-bold text-sm text-navy-900 mb-1">Write a Review</h3>
              <p className="text-xs text-slate-500 mb-4">Share your genuine experience with other buyers.</p>

              <form onSubmit={handleReviewSubmit} className="space-y-4">
                {!user && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Ruwan Silva"
                      value={reviewerName}
                      onChange={(e) => setReviewName(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-electric-500"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Rating</label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setReviewRating(star)}
                        className="p-1 text-amber-400 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= reviewRating ? 'fill-amber-400' : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-slate-700 ml-2">{reviewRating} Stars</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Review</label>
                  <textarea
                    rows={4}
                    placeholder="Describe product quality, delivery speed, and overall satisfaction..."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs outline-none focus:border-electric-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submittingReview}
                  className="w-full bg-navy-900 hover:bg-electric-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors shadow-sm"
                >
                  {submittingReview ? 'Submitting...' : 'Post Verified Review'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-black text-navy-900">
                Related {product.categoryName} Products
              </h2>
              <Link
                href={`/products?category=${product.categoryId}`}
                className="text-xs font-bold text-electric-600 hover:underline"
              >
                View More →
              </Link>
            </div>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  );
}
