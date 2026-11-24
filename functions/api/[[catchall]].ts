// @ts-nocheck
import { Hono } from 'hono';
import { handle } from 'hono/cloudflare-pages';
import { getCookie, setCookie, deleteCookie } from 'hono/cookie';
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = new Hono().basePath('/api');

function getSql(c) {
  const dbUrl = c.env.DATABASE_URL || process.env.DATABASE_URL;
  if (!dbUrl) return null;
  return neon(dbUrl);
}

// 1. Test API Route
app.get('/test', (c) => {
  return c.json({ success: true, message: 'Cloudflare Functions API is working perfectly!' });
});

// 2. Login Route
app.post('/auth/login', async (c) => {
  const sql = getSql(c);
  if (!sql) return c.json({ success: false, message: 'Database URL not configured in Cloudflare env' }, 503);

  try {
    const { identifier, password } = await c.req.json();
    const rows = await sql`SELECT * FROM users WHERE phone = ${identifier} OR email = ${identifier} LIMIT 1;`;
    const user = rows[0];

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return c.json({ success: false, message: 'ভুল মোবাইল নম্বর বা পাসওয়ার্ড।' }, 401);
    }

    const token = jwt.sign({ sub: user.id }, c.env.JWT_SECRET || 'fallback_secret', { expiresIn: '7d' });
    setCookie(c, 'sz_token', token, { httpOnly: true, secure: true, sameSite: 'Lax', path: '/' });

    return c.json({ 
      success: true, 
      user: { id: user.id, name: user.name, phone: user.phone, role: user.role } 
    });
  } catch (err) {
    return c.json({ success: false, message: err.message }, 500);
  }
});

// 3. Register Route
app.post('/auth/register', async (c) => {
  const sql = getSql(c);
  if (!sql) return c.json({ success: false, message: 'Database URL not configured' }, 503);

  try {
    const body = await c.req.json();
    const { name, email, phone, password } = body;

    if (!name || !phone || !password) {
      return c.json({ success: false, message: 'নাম, মোবাইল নম্বর এবং পাসওয়ার্ড আবশ্যক।' }, 400);
    }

    const id = `usr-${Date.now().toString(36)}`;
    const passwordHash = await bcrypt.hash(password, 10);

    await sql`
      INSERT INTO users (id, name, email, phone, password_hash, role)
      VALUES (${id}, ${name}, ${email || ''}, ${phone}, ${passwordHash}, 'customer');
    `;

    const token = jwt.sign({ sub: id }, c.env.JWT_SECRET || 'fallback_secret', { expiresIn: '7d' });
    setCookie(c, 'sz_token', token, { httpOnly: true, secure: true, sameSite: 'Lax', path: '/' });

    return c.json({ 
      success: true, 
      user: { id, name, phone, role: 'customer' } 
    });
  } catch (err) {
    return c.json({ success: false, message: err.message || 'রেজিস্ট্রেশন করা যায়নি।' }, 500);
  }
});

export const onRequest = handle(app);