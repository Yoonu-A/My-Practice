'use client';

import React, { useState } from 'react';
import { Product } from '@/lib/types';
import ProductCard from './ProductCard';
import QuickViewModal from './QuickViewModal';
import { PackageOpen } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
}

export default function ProductGrid({
  products,
  emptyMessage = 'No products found matching your criteria.',
}: ProductGridProps) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center my-6 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-4">
          <PackageOpen className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-navy-900">No items available</h3>
        <p className="text-sm text-slate-500 max-w-md mx-auto mt-1">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        ))}
      </div>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </>
  );
}
