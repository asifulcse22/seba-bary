/**
 * ONE-TIME CLEANUP SCRIPT
 * Run this to delete test/seed users from Neon DB:
 *   node scripts/cleanup-test-users.js
 * 
 * Or set DATABASE_URL env and run directly.
 */

require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const TEST_PHONES = ['01804624046', '01723456789', '01712-345678'];
const TEST_IDS = ['usr_riaz'];

async function cleanup() {
  const client = await pool.connect();
  try {
    console.log('Connecting to Neon...');

    // Delete transactions of test users first (foreign key constraint)
    const t1 = await client.query(
      `DELETE FROM transactions WHERE user_id IN (
        SELECT id FROM users WHERE phone = ANY($1) OR id = ANY($2)
      )`,
      [TEST_PHONES, TEST_IDS]
    );
    console.log(`Deleted ${t1.rowCount} test transactions`);

    // Delete orders of test users
    const o1 = await client.query(
      `DELETE FROM orders WHERE user_id IN (
        SELECT id FROM users WHERE phone = ANY($1) OR id = ANY($2)
      )`,
      [TEST_PHONES, TEST_IDS]
    );
    console.log(`Deleted ${o1.rowCount} test orders`);

    // Delete test users
    const u1 = await client.query(
      `DELETE FROM users WHERE phone = ANY($1) OR id = ANY($2) RETURNING phone, name`,
      [TEST_PHONES, TEST_IDS]
    );
    console.log(`Deleted ${u1.rowCount} test users:`, u1.rows.map(r => `${r.name} (${r.phone})`));

    console.log('✅ Cleanup complete! Real users are untouched.');
  } catch (err) {
    console.error('❌ Cleanup failed:', err.message);
  } finally {
    client.release();
    await pool.end();
  }
}

cleanup();
