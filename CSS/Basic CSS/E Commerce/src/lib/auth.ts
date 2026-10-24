import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'nexora_secure_default_secret_key_sri_lanka_2026';

export interface TokenPayload {
  userId: string;
  email: string;
  role: 'admin' | 'customer';
  name: string;
}

export function hashPassword(password: string): string {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

export function comparePassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

export function signJwtToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyJwtToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

export function extractAuthUser(req: Request): TokenPayload | null {
  // Try Authorization header
  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    return verifyJwtToken(token);
  }

  // Try Cookie
  const cookieHeader = req.headers.get('cookie');
  if (cookieHeader) {
    const cookies = Object.fromEntries(
      cookieHeader.split('; ').map((c) => {
        const [k, ...v] = c.split('=');
        return [k, decodeURIComponent(v.join('='))];
      })
    );
    if (cookies.nexora_token) {
      return verifyJwtToken(cookies.nexora_token);
    }
  }

  return null;
}
