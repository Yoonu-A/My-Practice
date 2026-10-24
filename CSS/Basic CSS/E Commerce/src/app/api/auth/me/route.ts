import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { extractAuthUser } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const authUser = extractAuthUser(req);
    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = db.prepare(`
      SELECT id, name, email, role, phone, address, city, district, created_at
      FROM users WHERE id = ?
    `).get(authUser.userId) as any;

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const authUser = extractAuthUser(req);
    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { name, phone, address, city, district } = body;

    db.prepare(`
      UPDATE users
      SET name = COALESCE(?, name),
          phone = COALESCE(?, phone),
          address = COALESCE(?, address),
          city = COALESCE(?, city),
          district = COALESCE(?, district)
      WHERE id = ?
    `).run(name, phone, address, city, district, authUser.userId);

    const updated = db.prepare(`
      SELECT id, name, email, role, phone, address, city, district, created_at
      FROM users WHERE id = ?
    `).get(authUser.userId) as any;

    return NextResponse.json({
      message: 'Profile updated successfully',
      user: updated,
    });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
