import crypto from 'crypto';

// Secret key for HMAC token signing (uses env var or persistent secret)
const JWT_SECRET = process.env.JWT_SECRET || process.env.DATABASE_URL || 'sheba-bary-secure-auth-secret-key-2026';
const PASSWORD_SALT = 'sheba_bary_salt_2026';

export interface TokenPayload {
  id: string;
  phone: string;
  exp?: number;
}

/**
 * Generate a cryptographically signed HMAC-SHA256 Token
 */
export function generateToken(payload: TokenPayload): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  // Expires in 30 days
  const body = Buffer.from(JSON.stringify({ 
    ...payload, 
    exp: Date.now() + 30 * 24 * 60 * 60 * 1000 
  })).toString('base64url');
  
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${signature}`;
}

/**
 * Verify HMAC-SHA256 Token and return payload if valid
 */
export function verifyToken(token: string): TokenPayload | null {
  if (!token || typeof token !== 'string') return null;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [header, body, signature] = parts;
    const expectedSig = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url');
    
    // Constant-time comparison to prevent timing attacks
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) {
      return null;
    }

    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    if (payload.exp && Date.now() > payload.exp) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

/**
 * Secure SHA-256 password hash with salt
 */
export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password + PASSWORD_SALT).digest('hex');
}

/**
 * Verify password against stored hash with backward compatibility for legacy accounts
 */
export function verifyPassword(provided: string, stored: string): boolean {
  if (!provided || !stored) return false;
  if (stored === provided) return true; // Legacy plain password compatibility
  return hashPassword(provided) === stored;
}
