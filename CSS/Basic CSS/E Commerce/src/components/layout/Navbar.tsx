'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  Layers,
  Smartphone,
  Headphones,
  Shirt,
  Footprints,
  Watch,
  LogOut,
  Package,
  Shield,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import { formatLKR } from '@/lib/utils';
import { Product } from '@/lib/types';

export default function Navbar() {
  const router = useRouter();
  const { totalItems, subtotal, setIsCartOpen } = useCart();
  const { totalWishlist } = useWishlist();
  const { user, logout, isAdmin } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Live search debouncing
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setIsSearching(true);
        const res = await fetch(`/api/products?search=${encodeURIComponent(searchQuery)}&limit=5`);
        if (res.ok) {
          const data = await res.json();
          setSuggestions(data.products || []);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsSearching(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchFocused(false);
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const categories = [
    { name: 'All Products', href: '/products', icon: Layers },
    { name: 'Electronics', href: '/products?category=electronics', icon: Headphones },
    { name: 'Smartphones', href: '/products?category=smartphones', icon: Smartphone },
    { name: 'Fashion', href: '/products?category=fashion', icon: Shirt },
    { name: 'Shoes', href: '/products?category=shoes', icon: Footprints },
    { name: 'Watches', href: '/products?category=watches', icon: Watch },
    { name: 'Accessories', href: '/products?category=accessories', icon: Package },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all shadow-sm">
      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-navy-900 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-navy-900 flex items-center justify-center text-white font-black tracking-wider shadow-md group-hover:bg-electric-600 transition-colors">
              <span className="text-xl text-electric-400 group-hover:text-white">N</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-navy-900 leading-none">
                NEXORA<span className="text-electric-500">.</span>
              </span>
              <span className="text-[10px] tracking-widest font-semibold text-slate-500 uppercase">
                Store • Sri Lanka
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar with Live Suggestions */}
          <div ref={searchRef} className="hidden md:flex flex-1 max-w-xl mx-4 relative">
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <input
                type="text"
                placeholder="Search premium electronics, smartphones, fashion, watches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                className="w-full bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-slate-900 text-sm rounded-full pl-11 pr-24 py-2.5 border border-slate-200 focus:border-electric-500 focus:ring-4 focus:ring-electric-500/10 transition-all outline-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-navy-900 hover:bg-electric-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full transition-colors"
              >
                Search
              </button>
            </form>

            {/* Search Suggestions Dropdown */}
            {searchFocused && searchQuery.trim().length >= 2 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-premium border border-slate-200 overflow-hidden z-50">
                {isSearching ? (
                  <div className="p-4 text-center text-sm text-slate-500">Searching store...</div>
                ) : suggestions.length > 0 ? (
                  <div className="py-2">
                    <div className="px-4 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Product Matches
                    </div>
                    {suggestions.map((p) => (
                      <Link
                        key={p.id}
                        href={`/products/${p.id}`}
                        onClick={() => setSearchFocused(false)}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors"
                      >
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-10 h-10 object-cover rounded-lg border border-slate-200 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 truncate">{p.name}</p>
                          <p className="text-xs text-electric-600 font-semibold">{formatLKR(p.price)}</p>
                        </div>
                      </Link>
                    ))}
                    <div className="p-2 border-t border-slate-100 text-center">
                      <button
                        onClick={handleSearchSubmit}
                        className="text-xs font-semibold text-electric-600 hover:underline"
                      >
                        View all results for &ldquo;{searchQuery}&rdquo; →
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 text-center text-sm text-slate-500">
                    No products found for &ldquo;{searchQuery}&rdquo;
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2.5 text-slate-700 hover:text-navy-900 hover:bg-slate-100 rounded-full transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {totalWishlist > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-electric-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {totalWishlist}
                </span>
              )}
            </Link>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 p-2 sm:px-3 sm:py-2 text-slate-800 hover:text-navy-900 hover:bg-slate-100 rounded-full border border-slate-200 transition-colors group"
              aria-label="Open Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 group-hover:text-electric-600 transition-colors" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-electric-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <div className="hidden lg:flex flex-col text-left leading-none">
                <span className="text-[10px] text-slate-400 font-medium">Cart</span>
                <span className="text-xs font-bold text-navy-900">
                  {totalItems > 0 ? formatLKR(subtotal) : 'Rs. 0'}
                </span>
              </div>
            </button>

            {/* User Account Menu */}
            <div ref={userMenuRef} className="relative">
              {user ? (
                <div>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 text-slate-800 hover:bg-slate-100 rounded-full border border-slate-200 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full bg-navy-900 text-white flex items-center justify-center text-xs font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden md:inline text-xs font-semibold text-slate-800 max-w-[100px] truncate">
                      {user.name.split(' ')[0]}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-premium border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-xs text-slate-400">Signed in as</p>
                        <p className="text-sm font-semibold text-slate-900 truncate">{user.email}</p>
                        {user.role === 'admin' && (
                          <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider bg-electric-100 text-electric-700 px-2 py-0.5 rounded-full">
                            Administrator
                          </span>
                        )}
                      </div>

                      <Link
                        href="/account"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-navy-900 transition-colors"
                      >
                        <User className="w-4 h-4 text-slate-400" />
                        My Account & Profile
                      </Link>

                      <Link
                        href="/account#orders"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-navy-900 transition-colors"
                      >
                        <Package className="w-4 h-4 text-slate-400" />
                        My Orders
                      </Link>

                      {isAdmin && (
                        <Link
                          href="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-electric-600 hover:bg-electric-50 font-medium transition-colors"
                        >
                          <Shield className="w-4 h-4 text-electric-500" />
                          Admin Dashboard
                        </Link>
                      )}

                      <div className="border-t border-slate-100 my-1" />

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4 text-red-500" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  className="flex items-center gap-1.5 bg-navy-900 hover:bg-electric-600 text-white text-xs font-semibold px-4 py-2.5 rounded-full transition-all shadow-sm"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign In</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="pb-3 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search products in Sri Lanka..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 text-slate-900 text-sm rounded-full pl-10 pr-20 py-2 border border-slate-200 outline-none focus:border-electric-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-navy-900 text-white text-xs font-semibold px-3 py-1.5 rounded-full"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Category Navigation Bar (Desktop) */}
      <nav className="hidden md:block bg-navy-900 text-white border-t border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between overflow-x-auto py-2.5 gap-6 text-xs font-medium tracking-wide">
            <div className="flex items-center gap-6">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    className="flex items-center gap-1.5 text-slate-300 hover:text-electric-400 whitespace-nowrap transition-colors py-1"
                  >
                    <Icon className="w-3.5 h-3.5 text-slate-400" />
                    <span>{cat.name}</span>
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-4 text-[11px] text-slate-400">
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact Us
              </Link>
              <Link href="/faq" className="hover:text-white transition-colors">
                Sri Lanka Shipping FAQ
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 animate-in slide-in-from-top-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Product Categories</p>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.name}
                  href={cat.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 text-sm font-medium transition-colors"
                >
                  <Icon className="w-4 h-4 text-electric-500" />
                  <span>{cat.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="border-t border-slate-100 pt-3 space-y-2">
            <Link
              href="/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-2 rounded-lg text-slate-700 hover:bg-slate-50 text-sm"
            >
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500" />
                Wishlist
              </span>
              <span className="font-bold text-xs bg-slate-100 px-2 py-0.5 rounded-full">
                {totalWishlist}
              </span>
            </Link>

            <Link
              href="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-2 rounded-lg text-slate-700 hover:bg-slate-50 text-sm"
            >
              <span className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-electric-600" />
                Shopping Cart
              </span>
              <span className="font-bold text-xs bg-electric-100 text-electric-700 px-2 py-0.5 rounded-full">
                {totalItems} items
              </span>
            </Link>

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 text-sm text-slate-600 hover:text-navy-900"
            >
              Contact Colombo Support
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
