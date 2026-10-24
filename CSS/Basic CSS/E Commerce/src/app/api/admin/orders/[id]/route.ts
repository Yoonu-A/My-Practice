import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { extractAuthUser } from '@/lib/auth';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const authUser = extractAuthUser(req);
    if (!authUser || authUser.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 });
    }

    const { id } = params;
    const body = await req.json();
    const { orderStatus, paymentStatus } = body;

    const existing = db.prepare('SELECT id FROM orders WHERE id = ?').get(id);
    if (!existing) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    db.prepare(`
      UPDATE orders
      SET order_status = COALESCE(?, order_status),
          payment_status = COALESCE(?, payment_status)
      WHERE id = ?
    `).run(orderStatus, paymentStatus, id);

    const updated = db.prepare('SELECT * FROM orders WHERE id = ?').get(id);

    return NextResponse.json({
      message: 'Order status updated successfully',
      order: updated,
    });
  } catch (error) {
    console.error('Update order error:', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
