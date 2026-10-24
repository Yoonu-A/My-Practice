import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { extractAuthUser } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const authUser = extractAuthUser(req);
    if (!authUser || authUser.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 });
    }

    const totalOrdersRow = db.prepare('SELECT COUNT(*) as count FROM orders').get() as { count: number };
    const revenueRow = db.prepare(`
      SELECT COALESCE(SUM(total), 0) as revenue 
      FROM orders 
      WHERE order_status != 'cancelled'
    `).get() as { revenue: number };

    const totalProductsRow = db.prepare('SELECT COUNT(*) as count FROM products').get() as { count: number };
    const totalCustomersRow = db.prepare("SELECT COUNT(*) as count FROM users WHERE role = 'customer'").get() as { count: number };

    const recentOrders = db.prepare(`
      SELECT id, order_number, customer_name, customer_email, total, order_status, payment_method, payment_status, created_at
      FROM orders
      ORDER BY created_at DESC
      LIMIT 8
    `).all();

    const lowStockProducts = db.prepare(`
      SELECT id, name, category_name, price, stock
      FROM products
      WHERE stock <= 10
      ORDER BY stock ASC
      LIMIT 6
    `).all();

    const ordersByStatus = db.prepare(`
      SELECT order_status, COUNT(*) as count
      FROM orders
      GROUP BY order_status
    `).all();

    return NextResponse.json({
      stats: {
        totalRevenue: Number(revenueRow.revenue),
        totalOrders: totalOrdersRow.count,
        totalProducts: totalProductsRow.count,
        totalCustomers: totalCustomersRow.count,
      },
      recentOrders,
      lowStockProducts,
      ordersByStatus,
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json({ error: 'Failed to fetch admin stats' }, { status: 500 });
  }
}
