// @ts-nocheck
import { neon } from '@neondatabase/serverless';

export const onRequest: PagesFunction = async (context) => {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname;

  // CORS Headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  const dbUrl = env.DATABASE_URL || process.env.DATABASE_URL;
  if (!dbUrl) {
    return new Response(JSON.stringify({ success: false, message: 'DATABASE_URL is not configured in Cloudflare' }), {
      status: 503,
      headers: corsHeaders,
    });
  }

  const sql = neon(dbUrl);

  try {
    // 1. Test Route
    if (path === '/api/test' && request.method === 'GET') {
      return new Response(JSON.stringify({ success: true, message: 'API is running live on Cloudflare Pages!' }), {
        status: 200,
        headers: corsHeaders,
      });
    }

    // 2. Login Route
    if (path === '/api/auth/login' && request.method === 'POST') {
      const body = await request.json();
      const { identifier, password } = body;

      const rows = await sql`
        SELECT * FROM users WHERE phone = ${identifier} OR email = ${identifier} LIMIT 1;
      `;
      const user = rows[0];

      if (!user) {
        return new Response(JSON.stringify({ success: false, message: 'ব্যবহারকারী পাওয়া যায়নি।' }), { status: 401, headers: corsHeaders });
      }

      // Simple direct password match (or use web crypto if hashed)
      if (user.password_hash !== password) {
        return new Response(JSON.stringify({ success: false, message: 'পাসওয়ার্ড ভুল রয়েছে।' }), { status: 401, headers: corsHeaders });
      }

      return new Response(JSON.stringify({
        success: true,
        user: { id: user.id, name: user.name, phone: user.phone, role: user.role }
      }), { status: 200, headers: corsHeaders });
    }

    // 3. Register Route
    if (path === '/api/auth/register' && request.method === 'POST') {
      const body = await request.json();
      const { name, email, phone, password } = body;

      if (!name || !phone || !password) {
        return new Response(JSON.stringify({ success: false, message: 'নাম, মোবাইল এবং পাসওয়ার্ড আবশ্যক।' }), { status: 400, headers: corsHeaders });
      }

      const id = `usr-${Date.now()}`;
      await sql`
        INSERT INTO users (id, name, email, phone, password_hash, role)
        VALUES (${id}, ${name}, ${email || ''}, ${phone}, ${password}, 'customer');
      `;

      return new Response(JSON.stringify({
        success: true,
        user: { id, name, phone, role: 'customer' }
      }), { status: 200, headers: corsHeaders });
    }

    return new Response(JSON.stringify({ success: false, message: 'API Route Not Found' }), {
      status: 404,
      headers: corsHeaders,
    });

  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, message: err.message || 'Server error' }), {
      status: 500,
      headers: corsHeaders,
    });
  }
};