import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { extractAuthUser } from '@/lib/auth';
import { Review } from '@/lib/types';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json({ error: 'productId query param is required' }, { status: 400 });
    }

    const rows = db.prepare(`
      SELECT * FROM reviews 
      WHERE product_id = ? 
      ORDER BY created_at DESC
    `).all(productId) as any[];

    const reviews: Review[] = rows.map((r) => ({
      id: r.id,
      productId: r.product_id,
      userName: r.user_name,
      rating: Number(r.rating),
      comment: r.comment,
      createdAt: r.created_at,
    }));

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error('Fetch reviews error:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, rating, comment, userName } = body;

    if (!productId || !rating || !comment) {
      return NextResponse.json({ error: 'Product ID, rating, and comment are required' }, { status: 400 });
    }

    const authUser = extractAuthUser(req);
    const reviewerName = authUser ? authUser.name : (userName?.trim() || 'Verified Buyer');

    const reviewId = `rev-${Date.now()}`;
    const createdAt = new Date().toISOString();

    db.prepare(`
      INSERT INTO reviews (id, product_id, user_name, rating, comment, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      reviewId,
      productId,
      reviewerName,
      Math.min(5, Math.max(1, Number(rating))),
      comment.trim(),
      createdAt
    );

    // Update product rating and review count
    const avgRow = db.prepare(`
      SELECT AVG(rating) as avg_rating, COUNT(*) as count 
      FROM reviews 
      WHERE product_id = ?
    `).get(productId) as { avg_rating: number; count: number };

    if (avgRow) {
      const roundedRating = Math.round(avgRow.avg_rating * 10) / 10;
      db.prepare(`
        UPDATE products 
        SET rating = ?, review_count = ? 
        WHERE id = ?
      `).run(roundedRating, avgRow.count, productId);
    }

    return NextResponse.json({
      message: 'Review submitted successfully',
      review: {
        id: reviewId,
        productId,
        userName: reviewerName,
        rating: Number(rating),
        comment,
        createdAt,
      },
    }, { status: 201 });
  } catch (error) {
    console.error('Create review error:', error);
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
  }
}
