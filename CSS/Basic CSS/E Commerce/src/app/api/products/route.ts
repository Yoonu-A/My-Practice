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

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sort = searchParams.get('sort') || 'newest';
    const featured = searchParams.get('featured');
    const bestSeller = searchParams.get('bestSeller');
    const newArrival = searchParams.get('newArrival');
    const inStock = searchParams.get('inStock');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM products WHERE 1=1';
    const params: any[] = [];

    if (category && category !== 'all') {
      query += ' AND category_id = ?';
      params.push(category.toLowerCase());
    }

    if (search) {
      query += ' AND (name LIKE ? OR description LIKE ? OR category_name LIKE ?)';
      const term = `%${search.trim()}%`;
      params.push(term, term, term);
    }

    if (minPrice) {
      query += ' AND price >= ?';
      params.push(parseFloat(minPrice));
    }

    if (maxPrice) {
      query += ' AND price <= ?';
      params.push(parseFloat(maxPrice));
    }

    if (featured === 'true' || featured === '1') {
      query += ' AND is_featured = 1';
    }

    if (bestSeller === 'true' || bestSeller === '1') {
      query += ' AND is_best_seller = 1';
    }

    if (newArrival === 'true' || newArrival === '1') {
      query += ' AND is_new_arrival = 1';
    }

    if (inStock === 'true' || inStock === '1') {
      query += ' AND stock > 0';
    }

    // Sort order
    switch (sort) {
      case 'price-asc':
        query += ' ORDER BY price ASC';
        break;
      case 'price-desc':
        query += ' ORDER BY price DESC';
        break;
      case 'rating':
        query += ' ORDER BY rating DESC, review_count DESC';
        break;
      case 'popular':
        query += ' ORDER BY is_best_seller DESC, review_count DESC';
        break;
      case 'newest':
      default:
        query += ' ORDER BY created_at DESC';
        break;
    }

    // Count total matches
    const countQuery = query.replace('SELECT *', 'SELECT COUNT(*) as total');
    const countRow = db.prepare(countQuery).get(...params) as { total: number };
    const total = countRow ? countRow.total : 0;

    query += ' LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const rows = db.prepare(query).all(...params);
    const products = rows.map(parseProductRow);

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Fetch products error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

// Admin Product Creation
export async function POST(req: Request) {
  try {
    const authUser = extractAuthUser(req);
    if (!authUser || authUser.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 });
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

    if (!name || !price || !categoryId) {
      return NextResponse.json({ error: 'Name, price, and category are required' }, { status: 400 });
    }

    const id = `prod-${Date.now()}`;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const createdAt = new Date().toISOString();

    db.prepare(`
      INSERT INTO products (
        id, name, slug, description, price, original_price, category_id,
        category_name, stock, images, rating, review_count, is_featured,
        is_best_seller, is_new_arrival, specs, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 5.0, 0, ?, ?, ?, ?, ?)
    `).run(
      id,
      name,
      slug,
      description || '',
      Number(price),
      originalPrice ? Number(originalPrice) : null,
      categoryId,
      categoryName || categoryId,
      Number(stock) || 0,
      JSON.stringify(images && images.length ? images : ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800']),
      isFeatured ? 1 : 0,
      isBestSeller ? 1 : 0,
      isNewArrival ? 1 : 0,
      JSON.stringify(specs || {}),
      createdAt
    );

    const created = db.prepare('SELECT * FROM products WHERE id = ?').get(id);

    return NextResponse.json({
      message: 'Product created successfully',
      product: parseProductRow(created),
    }, { status: 201 });
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
