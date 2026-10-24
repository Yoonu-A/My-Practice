import React from 'react';
import db from '@/lib/db';
import HeroBanner from '@/components/home/HeroBanner';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedSection from '@/components/home/FeaturedSection';
import DealsSection from '@/components/home/DealsSection';
import Newsletter from '@/components/home/Newsletter';
import { Product } from '@/lib/types';

// Force dynamic server rendering
export const dynamic = 'force-dynamic';

function getInitialProducts(): Product[] {
  try {
    const rows = db.prepare('SELECT * FROM products ORDER BY created_at DESC').all();
    return rows.map((row: any) => ({
      id: row.id,
      name: row.name,
      slug: row.slug,
      description: row.description,
      price: Number(row.price),
      originalPrice: row.original_price ? Number(row.original_price) : undefined,
      categoryId: row.category_id,
      categoryName: row.category_name,
      stock: Number(row.stock),
      images: typeof row.images === 'string' ? JSON.parse(row.images) : row.images || [],
      rating: Number(row.rating),
      reviewCount: Number(row.review_count),
      isFeatured: Boolean(row.is_featured),
      isBestSeller: Boolean(row.is_best_seller),
      isNewArrival: Boolean(row.is_new_arrival),
      specs: typeof row.specs === 'string' ? JSON.parse(row.specs) : row.specs || {},
      createdAt: row.created_at,
    }));
  } catch (e) {
    console.error('Error fetching home products', e);
    return [];
  }
}

export default function HomePage() {
  const products = getInitialProducts();

  return (
    <div className="flex flex-col">
      <HeroBanner />
      <CategoryGrid />
      <FeaturedSection initialProducts={products} />
      <DealsSection />
      <Newsletter />
    </div>
  );
}
