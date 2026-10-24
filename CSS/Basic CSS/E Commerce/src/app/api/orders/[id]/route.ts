import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { Order } from '@/lib/types';

function parseOrderRow(row: any): Order {
  return {
    id: row.id,
    orderNumber: row.order_number,
    userId: row.user_id || undefined,
    customerName: row.customer_name,
    customerEmail: row.customer_email,
    customerPhone: row.customer_phone,
    deliveryAddress: row.delivery_address,
    deliveryCity: row.delivery_city,
    deliveryDistrict: row.delivery_district,
    deliveryProvince: row.delivery_province,
    postalCode: row.postal_code || undefined,
    deliveryNotes: row.delivery_notes || undefined,
    items: JSON.parse(row.items),
    subtotal: Number(row.subtotal),
    deliveryFee: Number(row.delivery_fee),
    discount: Number(row.discount),
    total: Number(row.total),
    paymentMethod: row.payment_method,
    paymentStatus: row.payment_status,
    orderStatus: row.order_status,
    createdAt: row.created_at,
  };
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const row = db.prepare('SELECT * FROM orders WHERE id = ? OR order_number = ?').get(id, id);

    if (!row) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ order: parseOrderRow(row) });
  } catch (error) {
    console.error('Fetch order error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
