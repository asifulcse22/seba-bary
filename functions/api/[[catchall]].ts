// @ts-nocheck
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

export const onRequest: PagesFunction = async (context) => {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname;

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
    return new Response(JSON.stringify({ success: false, message: 'DATABASE_URL কনফিগার করা নেই।' }), {
      status: 503,
      headers: corsHeaders,
    });
  }

  const sql = neon(dbUrl);

  try {
    // 1. Login Route
    if (path === '/api/auth/login' && request.method === 'POST') {
      const body = await request.json();
      const { identifier, password } = body;

      if (!identifier || !password) {
        return new Response(JSON.stringify({ success: false, message: 'মোবাইল/ইমেইল এবং পাসওয়ার্ড দিন।' }), { status: 400, headers: corsHeaders });
      }

      const cleanIdentifier = String(identifier).trim();
      const rows = await sql`
        SELECT * FROM users WHERE phone = ${cleanIdentifier} OR email = ${cleanIdentifier.toLowerCase()} LIMIT 1;
      `;
      const user = rows[0];

      if (!user) {
        return new Response(JSON.stringify({ success: false, message: 'এই নম্বর বা ইমেইল দিয়ে কোনো অ্যাকাউন্ট পাওয়া যায়নি।' }), { status: 401, headers: corsHeaders });
      }

      // Bcrypt দিয়ে পাসওয়ার্ড চেক করা (যদি হ্যাশ করা থাকে)
      let isPasswordValid = false;
      try {
        isPasswordValid = await bcrypt.compare(password, user.password_hash);
      } catch (e) {
        // যদি ডাটাবেজে পাসওয়ার্ড হ্যাশ করা না থাকে, সরাসরি ম্যাচ করবে
        isPasswordValid = (user.password_hash === password);
      }

      if (!isPasswordValid) {
        return new Response(JSON.stringify({ success: false, message: 'পাসওয়ার্ড ভুল হয়েছে।' }), { status: 401, headers: corsHeaders });
      }

      return new Response(JSON.stringify({
        success: true,
        user: { 
          id: user.id, 
          name: user.name, 
          email: user.email, 
          phone: user.phone, 
          role: user.role 
        }
      }), { status: 200, headers: corsHeaders });
    }

    // 2. Register Route
    if (path === '/api/auth/register' && request.method === 'POST') {
      const body = await request.json();
      const { name, email, phone, password } = body;

      if (!name || !phone || !password) {
        return new Response(JSON.stringify({ success: false, message: 'নাম, মোবাইল এবং পাসওয়ার্ড আবশ্যক।' }), { status: 400, headers: corsHeaders });
      }

      // পাসওয়ার্ড bcrypt দিয়ে হ্যাশ করে সেভ করা
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      const id = `usr-${Date.now()}`;

      try {
        await sql`
          INSERT INTO users (id, name, email, phone, password_hash, role)
          VALUES (${id}, ${name}, ${email ? email.toLowerCase() : ''}, ${phone}, ${passwordHash}, 'customer');
        `;
      } catch (dbErr: any) {
        if (dbErr.message && dbErr.message.includes('unique constraint')) {
          return new Response(JSON.stringify({ success: false, message: 'এই মোবাইল নম্বর বা ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে।' }), { status: 409, headers: corsHeaders });
        }
        throw dbErr;
      }

      return new Response(JSON.stringify({
        success: true,
        user: { id, name, email, phone, role: 'customer' }
      }), { status: 200, headers: corsHeaders });
    }

    return new Response(JSON.stringify({ success: false, message: 'API Route Not Found' }), {
      status: 404,
      headers: corsHeaders,
    });

  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, message: err.message || 'সার্ভার এরর হয়েছে।' }), {
      status: 500,
      headers: corsHeaders,
    });
  }
};