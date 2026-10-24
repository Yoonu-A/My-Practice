import { NextResponse } from 'next/server';
import { z } from 'zod';
import db from '@/lib/db';
import { hashPassword, signJwtToken } from '@/lib/auth';

const RegisterSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  district: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = RegisterSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    const { name, email, password, phone, address, city, district } = result.data;

    // Check if user already exists
    const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(email.toLowerCase());
    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    const userId = `usr-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const passwordHash = hashPassword(password);
    const createdAt = new Date().toISOString();

    db.prepare(`
      INSERT INTO users (id, name, email, password_hash, role, phone, address, city, district, created_at)
      VALUES (?, ?, ?, ?, 'customer', ?, ?, ?, ?, ?)
    `).run(
      userId,
      name.trim(),
      email.toLowerCase().trim(),
      passwordHash,
      phone || null,
      address || null,
      city || null,
      district || null,
      createdAt
    );

    const token = signJwtToken({
      userId,
      email: email.toLowerCase().trim(),
      role: 'customer',
      name: name.trim(),
    });

    const response = NextResponse.json({
      message: 'Account created successfully',
      user: {
        id: userId,
        name: name.trim(),
        email: email.toLowerCase().trim(),
        role: 'customer',
        phone,
        address,
        city,
        district,
      },
      token,
    });

    response.cookies.set('nexora_token', token, {
      httpOnly: false, // Accessible to client-side auth context or set true with companion header
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Failed to create account. Please try again.' },
      { status: 500 }
    );
  }
}
