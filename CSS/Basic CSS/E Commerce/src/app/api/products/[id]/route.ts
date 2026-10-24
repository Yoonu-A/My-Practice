import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { extractAuthUser } from '@/lib/auth';
import { Product } from '@/lib/types';

function parseProductRow(row: any): Product {
  return {
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
  };
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const row = db.prepare('SELECT * FROM products WHERE id = ? OR slug = ?').get(id, id);

    if (!row) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const product = parseProductRow(row);

    // Also fetch related products in same category
    const relatedRows = db.prepare(`
      SELECT * FROM products 
      WHERE category_id = ? AND id != ?
      LIMIT 4
    `).all(product.categoryId, product.id);

    const related = relatedRows.map(parseProductRow);

    return NextResponse.json({ product, related });
  } catch (error) {
    console.error('Fetch single product error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const authUser = extractAuthUser(req);
    if (!authUser || authUser.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 });
    }

    const { id } = params;
    const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
    if (!existing) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const body = await req.json();
    const {
      name,
      description,
      price,
      originalPrice,
      categoryId,
      categoryName,
      stock,
      images,
      specs,
      isFeatured,
      isBestSeller,
      isNewArrival,
    } = body;

    db.prepare(`
      UPDATE products
      SET name = COALESCE(?, name),
          description = COALESCE(?, description),
          price = COALESCE(?, price),
          original_price = ?,
          category_id = COALESCE(?, category_id),
          category_name = COALESCE(?, category_name),
          stock = COALESCE(?, stock),
          images = COALESCE(?, images),
          specs = COALESCE(?, specs),
          is_featured = COALESCE(?, is_featured),
          is_best_seller = COALESCE(?, is_best_seller),
          is_new_arrival = COALESCE(?, is_new_arrival)
      WHERE id = ?
    `).run(
      name,
      description,
      price ? Number(price) : null,
      originalPrice !== undefined ? (originalPrice ? Number(originalPrice) : null) : null,
      categoryId,
      categoryName,
      stock !== undefined ? Number(stock) : null,
      images ? JSON.stringify(images) : null,
      specs ? JSON.stringify(specs) : null,
      isFeatured !== undefined ? (isFeatured ? 1 : 0) : null,
      isBestSeller !== undefined ? (isBestSeller ? 1 : 0) : null,
      isNewArrival !== undefined ? (isNewArrival ? 1 : 0) : null,
      id
    );

    const updated = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
    return NextResponse.json({
      message: 'Product updated successfully',
      product: parseProductRow(updated),
    });
  } catch (error) {
    console.error('Update product error:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const authUser = extractAuthUser(req);
    if (!authUser || authUser.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 });
    }

    const { id } = params;
    const result = db.prepare('DELETE FROM products WHERE id = ?').run(id);

    if (result.changes === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
