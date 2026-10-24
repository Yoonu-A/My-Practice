import { NextResponse } from 'next/server';
import { z } from 'zod';
import db from '@/lib/db';
import { extractAuthUser } from '@/lib/auth';
import { getDeliveryFeeForDistrict } from '@/lib/sriLankaData';
import { validatePromoCode } from '@/lib/utils';
import { Order, OrderItem } from '@/lib/types';

const OrderItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().positive(),
  selectedColor: z.string().optional(),
  selectedSize: z.string().optional(),
});

const CheckoutSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(9, 'Valid Sri Lankan phone number is required'),
  streetAddress: z.string().min(5, 'Delivery address is required'),
  city: z.string().min(2, 'City is required'),
  district: z.string().min(2, 'District is required'),
  province: z.string().min(2, 'Province is required'),
  postalCode: z.string().optional(),
  deliveryNotes: z.string().optional(),
  paymentMethod: z.enum(['cod', 'payhere_card']),
  promoCode: z.string().optional(),
  items: z.array(OrderItemSchema).min(1, 'Cart cannot be empty'),
});

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

export async function POST(req: Request) {
  try {
    const authUser = extractAuthUser(req);
    const body = await req.json();
    const result = CheckoutSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    const {
      fullName,
      email,
      phone,
      streetAddress,
      city,
      district,
      province,
      postalCode,
      deliveryNotes,
      paymentMethod,
      promoCode,
      items: rawItems,
    } = result.data;

    // Security: SERVER-SIDE PRICE & STOCK VALIDATION
    // Fetch product details strictly from the database to prevent client price spoofing
    let verifiedSubtotal = 0;
    const verifiedItems: OrderItem[] = [];

    const getProductStmt = db.prepare('SELECT id, name, price, stock, images FROM products WHERE id = ?');
    const updateStockStmt = db.prepare('UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?');

    // Run transaction
    const placeOrderTransaction = db.transaction(() => {
      for (const item of rawItems) {
        const product = getProductStmt.get(item.productId) as any;
        if (!product) {
          throw new Error(`Product not found: ${item.productId}`);
        }

        if (product.stock < item.quantity) {
          throw new Error(`Sorry, "${product.name}" only has ${product.stock} units remaining in stock.`);
        }

        const images = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
        const itemTotal = product.price * item.quantity;
        verifiedSubtotal += itemTotal;

        verifiedItems.push({
          productId: product.id,
          productName: product.name,
          productImage: images[0] || '',
          price: product.price,
          quantity: item.quantity,
          total: itemTotal,
          selectedColor: item.selectedColor,
          selectedSize: item.selectedSize,
        });

        // Decrement stock
        const stockResult = updateStockStmt.run(item.quantity, item.productId, item.quantity);
        if (stockResult.changes === 0) {
          throw new Error(`Stock error for "${product.name}". Please try again.`);
        }
      }

      // Calculate delivery fee according to Sri Lanka logistics
      const deliveryFee = getDeliveryFeeForDistrict(district, verifiedSubtotal);

      // Validate promo code server-side if provided
      let discount = 0;
      if (promoCode) {
        const promoRes = validatePromoCode(promoCode, verifiedSubtotal);
        if (promoRes.valid) {
          discount = promoRes.discount;
        }
      }

      const total = Math.max(0, verifiedSubtotal + deliveryFee - discount);

      // Order numbers: NEX-LK-2026-XXXX
      const timestamp = Date.now().toString().slice(-6);
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      const orderNumber = `NEX-LK-${timestamp}-${randomCode}`;
      const orderId = `ord-${Date.now()}`;
      const createdAt = new Date().toISOString();

      // Determine payment status
      // If paymentMethod is COD: order is confirmed as COD pending cash on delivery
      // If paymentMethod is payhere_card: requires merchant gateway redirect/callback
      const paymentStatus = paymentMethod === 'cod' ? 'pending' : 'pending_verification';
      const orderStatus = 'pending';

      db.prepare(`
        INSERT INTO orders (
          id, order_number, user_id, customer_name, customer_email,
          customer_phone, delivery_address, delivery_city, delivery_district,
          delivery_province, postal_code, delivery_notes, items, subtotal,
          delivery_fee, discount, total, payment_method, payment_status,
          order_status, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        orderId,
        orderNumber,
        authUser ? authUser.userId : null,
        fullName.trim(),
        email.toLowerCase().trim(),
        phone.trim(),
        streetAddress.trim(),
        city.trim(),
        district.trim(),
        province.trim(),
        postalCode || null,
        deliveryNotes || null,
        JSON.stringify(verifiedItems),
        verifiedSubtotal,
        deliveryFee,
        discount,
        total,
        paymentMethod,
        paymentStatus,
        orderStatus,
        createdAt
      );

      return {
        id: orderId,
        orderNumber,
        subtotal: verifiedSubtotal,
        deliveryFee,
        discount,
        total,
        paymentMethod,
        paymentStatus,
        orderStatus,
        createdAt,
        items: verifiedItems,
        customerName: fullName,
        customerEmail: email,
        customerPhone: phone,
        deliveryAddress: streetAddress,
        deliveryCity: city,
        deliveryDistrict: district,
        deliveryProvince: province,
        postalCode,
      };
    });

    const newOrder = placeOrderTransaction();

    return NextResponse.json({
      message: 'Order placed successfully',
      order: newOrder,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process order' },
      { status: 400 }
    );
  }
}

// GET user orders (or all orders for admin)
export async function GET(req: Request) {
  try {
    const authUser = extractAuthUser(req);
    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let rows: any[];
    if (authUser.role === 'admin') {
      rows = db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all();
    } else {
      rows = db.prepare('SELECT * FROM orders WHERE user_id = ? OR customer_email = ? ORDER BY created_at DESC')
        .all(authUser.userId, authUser.email);
    }

    const orders = rows.map(parseOrderRow);
    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Fetch orders error:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
