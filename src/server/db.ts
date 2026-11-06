import { Pool } from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

export interface DbUser {
  id: string;
  name: string;
  displayNameEn: string;
  phone: string;
  email: string;
  passwordHash: string;
  activeTier: 'personal' | 'business' | 'sub_admin';
  walletBalance: number;
  personalBalance: number;
  businessBalance: number;
  subAdminBalance: number;
  avatarUrl: string;
  createdAt: string;
}

export interface DbTransaction {
  id: string;
  userId: string;
  date: string;
  type: 'deposit' | 'withdraw' | 'order' | 'commission';
  description: string;
  amount: number;
  status: 'সফল' | 'প্রক্রিয়াধীন' | 'বাতিল';
  method: string;
  trxId: string;
  phone: string;
  accountType: string;
  createdAt: string;
}

export interface DbOrder {
  id: string;
  userId: string;
  serviceId: string;
  serviceTitle: string;
  category: string;
  tier: string;
  customerName: string;
  customerPhone: string;
  inputData: any;
  originalPrice: number;
  discount: number;
  paidAmount: number;
  status: string;
  createdAt: string;
  tokenNumber: string;
  remarks: string;
}

export function getDbStatus() {
  const hasUrl = !!(process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('MY_NEON_DATABASE_URL'));
  return {
    isNeonConnected,
    hasDatabaseUrl: hasUrl,
    engine: isNeonConnected ? 'Neon PostgreSQL' : 'Local Persistent Storage'
  };
}

let pool: Pool | null = null;
export let isNeonConnected = false;

export function getPool(): Pool | null {
  if (pool) return pool;
  const connectionString = process.env.DATABASE_URL;
  if (connectionString && !connectionString.includes('MY_NEON_DATABASE_URL')) {
    try {
      pool = new Pool({
        connectionString,
        ssl: {
          rejectUnauthorized: false
        }
      });
      console.log('[Neon PostgreSQL] Pool created with connection string.');
    } catch (err) {
      console.error('[Neon PostgreSQL] Pool creation failed:', err);
    }
  }
  return pool;
}

// Memory / JSON storage fallback for instant local execution
const DB_FILE = path.resolve(process.cwd(), '.db_store.json');

interface LocalStore {
  users: DbUser[];
  transactions: DbTransaction[];
  orders: DbOrder[];
}

function loadLocalStore(): LocalStore {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      const store: LocalStore = JSON.parse(data);
      if (Array.isArray(store.users)) {
        let changed = false;
        store.users.forEach(u => {
          if (u.walletBalance >= 800000) {
            u.walletBalance = 0;
            u.businessBalance = 0;
            u.personalBalance = 0;
            u.subAdminBalance = 0;
            changed = true;
          }
        });
        if (changed) {
          saveLocalStore(store);
        }
      }
      return store;
    }
  } catch (e) {
    console.error('Failed to read local store, using default', e);
  }

  // Default seed user matching Image 1 & 2 ("Riaz Khan", balance: ৳811,551, phone: "01712-345678")
  const defaultStore: LocalStore = {
    users: [
      {
        id: 'usr_riaz',
        name: 'Riaz',
        displayNameEn: 'Hello, Riaz Khan',
        phone: '01712-345678',
        email: 'riaz.khan@smarthubbd.com',
        passwordHash: 'password123',
        activeTier: 'business',
        walletBalance: 0,
        personalBalance: 0,
        businessBalance: 0,
        subAdminBalance: 0,
        avatarUrl: '',
        createdAt: new Date().toISOString()
      }
    ],
    transactions: [
      {
        id: 'TRX-94812',
        userId: 'usr_riaz',
        date: '03-11-2025 10:45 AM',
        type: 'deposit',
        description: 'Deposit (Business)',
        amount: 1450,
        status: 'সফল',
        method: 'bKash',
        trxId: 'BK9A72LK19',
        phone: '01712-345678',
        accountType: 'business',
        createdAt: new Date().toISOString()
      },
      {
        id: 'TRX-94811',
        userId: 'usr_riaz',
        date: '02-11-2025 04:20 PM',
        type: 'order',
        description: 'সার্ভার কপি - NID সেবা',
        amount: -15,
        status: 'সফল',
        method: 'Wallet',
        trxId: 'ORD-8921',
        phone: '01712-345678',
        accountType: 'business',
        createdAt: new Date().toISOString()
      },
      {
        id: 'TRX-94810',
        userId: 'usr_riaz',
        date: '01-11-2025 02:15 PM',
        type: 'deposit',
        description: 'ওয়ালেট রিচার্জ (Nagad)',
        amount: 5000,
        status: 'সফল',
        method: 'Nagad',
        trxId: 'NG810283K2',
        phone: '01819-998877',
        accountType: 'personal',
        createdAt: new Date().toISOString()
      }
    ],
    orders: [
      {
        id: 'ORD-8921',
        userId: 'usr_riaz',
        serviceId: 'server-copy',
        serviceTitle: 'সার্ভার কপি',
        category: 'nid',
        tier: 'business',
        customerName: 'Md. Karim Ullah',
        customerPhone: '01700112233',
        inputData: {
          nidNumber: '19902692019001234',
          dob: '15/08/1990'
        },
        originalPrice: 18,
        discount: 3,
        paidAmount: 15,
        status: 'completed',
        createdAt: '03-11-2025 11:30 AM',
        tokenNumber: 'SHB-NID-88291',
        remarks: 'অফিসিয়াল সার্ভার কপি প্রস্তুত হয়েছে।'
      },
      {
        id: 'ORD-8922',
        userId: 'usr_riaz',
        serviceId: 'land-mutation-official',
        serviceTitle: '১. নামজারি (Mutation) সেবা',
        category: 'land',
        tier: 'business',
        customerName: 'Rafiqul Islam',
        customerPhone: '01811223344',
        inputData: {
          district: 'ঢাকা, সাভার',
          mouza: 'মৌজা: কাউন্দিয়া, জেএল ১২',
          khatianNo: 'RS-452',
          dagNo: '1092',
          applicantName: 'রফিকুল ইসলাম'
        },
        originalPrice: 250,
        discount: 38,
        paidAmount: 212,
        status: 'processing',
        createdAt: '04-11-2025 09:15 AM',
        tokenNumber: 'SHB-LND-90184',
        remarks: 'উপজেলা ভূমি অফিসে নথি যাচাই চলছে।'
      }
    ]
  };

  saveLocalStore(defaultStore);
  return defaultStore;
}

function saveLocalStore(store: LocalStore) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(store, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write local store', err);
  }
}

// Database helper functions that check Neon first, then local store
export async function initDb() {
  const activePool = getPool();
  if (activePool) {
    try {
      const client = await activePool.connect();
      console.log('[Neon PostgreSQL] Successfully connected to Neon database!');
      isNeonConnected = true;

      // Create tables in Neon if not exists
      await client.query(`
        CREATE TABLE IF NOT EXISTS users (
          id VARCHAR(64) PRIMARY KEY,
          name VARCHAR(128) NOT NULL,
          display_name_en VARCHAR(128),
          phone VARCHAR(32) UNIQUE NOT NULL,
          email VARCHAR(128),
          password_hash VARCHAR(255) NOT NULL,
          active_tier VARCHAR(32) DEFAULT 'personal',
          wallet_balance NUMERIC(12, 2) DEFAULT 0.00,
          personal_balance NUMERIC(12, 2) DEFAULT 0.00,
          business_balance NUMERIC(12, 2) DEFAULT 0.00,
          sub_admin_balance NUMERIC(12, 2) DEFAULT 0.00,
          avatar_url TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        ALTER TABLE users ADD COLUMN IF NOT EXISTS personal_balance NUMERIC(12, 2) DEFAULT 0.00;
        ALTER TABLE users ADD COLUMN IF NOT EXISTS business_balance NUMERIC(12, 2) DEFAULT 0.00;
        ALTER TABLE users ADD COLUMN IF NOT EXISTS sub_admin_balance NUMERIC(12, 2) DEFAULT 0.00;

        CREATE TABLE IF NOT EXISTS transactions (
          id VARCHAR(64) PRIMARY KEY,
          user_id VARCHAR(64) REFERENCES users(id),
          date VARCHAR(64),
          type VARCHAR(32),
          description TEXT,
          amount NUMERIC(12, 2),
          status VARCHAR(32),
          method VARCHAR(32),
          trx_id VARCHAR(64),
          phone VARCHAR(32),
          account_type VARCHAR(32),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS orders (
          id VARCHAR(64) PRIMARY KEY,
          user_id VARCHAR(64) REFERENCES users(id),
          service_id VARCHAR(64),
          service_title VARCHAR(128),
          category VARCHAR(64),
          tier VARCHAR(32),
          customer_name VARCHAR(128),
          customer_phone VARCHAR(32),
          input_data JSONB,
          original_price NUMERIC(10, 2),
          discount NUMERIC(10, 2),
          paid_amount NUMERIC(10, 2),
          status VARCHAR(32),
          created_at VARCHAR(64),
          token_number VARCHAR(64),
          remarks TEXT
        );
      `);

      // Populate Neon with users from local store so newly registered accounts (e.g. Asiful Islam) exist in Neon
      const store = loadLocalStore();
      if (Array.isArray(store.users)) {
        for (const u of store.users) {
          const userCheck = await client.query('SELECT id FROM users WHERE phone = $1', [u.phone]);
          if (userCheck.rows.length === 0) {
            await client.query(`
              INSERT INTO users (id, name, display_name_en, phone, email, password_hash, active_tier, wallet_balance, personal_balance, business_balance, sub_admin_balance, avatar_url, created_at)
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
            `, [
              u.id,
              u.name,
              u.displayNameEn || `Hello, ${u.name}`,
              u.phone,
              u.email,
              u.passwordHash,
              u.activeTier || 'business',
              u.walletBalance || 0,
              u.personalBalance || 0,
              u.businessBalance || 0,
              u.subAdminBalance || 0,
              u.avatarUrl || '',
              u.createdAt || new Date().toISOString()
            ]);
            console.log(`[Neon PostgreSQL] Populated user to Neon: ${u.name} (${u.phone})`);
          }
        }
      }

      client.release();
    } catch (err) {
      console.warn('[Neon PostgreSQL] Failed to run schema migrations, falling back to local storage:', err);
      isNeonConnected = false;
    }
  } else {
    console.log('[Database] DATABASE_URL not provided, operating on persistent local storage engine.');
  }
}

export async function findUserByPhone(phone: string): Promise<DbUser | null> {
  const cleanPhone = phone.replace(/\s+/g, '');
  if (isNeonConnected && pool) {
    try {
      const res = await pool.query('SELECT * FROM users WHERE phone = $1 OR phone = $2', [cleanPhone, phone]);
      if (res.rows.length > 0) {
        const row = res.rows[0];
        return {
          id: row.id,
          name: row.name,
          displayNameEn: row.display_name_en || row.name,
          phone: row.phone,
          email: row.email,
          passwordHash: row.password_hash,
          activeTier: row.active_tier,
          walletBalance: parseFloat(row.wallet_balance),
          personalBalance: parseFloat(row.personal_balance || 0),
          businessBalance: parseFloat(row.business_balance || 0),
          subAdminBalance: parseFloat(row.sub_admin_balance || 0),
          avatarUrl: row.avatar_url,
          createdAt: row.created_at
        };
      }
    } catch (e) {
      console.error('Neon query error, falling back:', e);
    }
  }

  const store = loadLocalStore();
  const user = store.users.find(u => u.phone.replace(/[^0-9]/g, '') === cleanPhone.replace(/[^0-9]/g, '') || u.phone === phone);
  if (user) {
    return {
      ...user,
      walletBalance: Number(user.walletBalance) || 0,
      personalBalance: Number(user.personalBalance) || 0,
      businessBalance: Number(user.businessBalance) || 0,
      subAdminBalance: Number(user.subAdminBalance) || 0
    };
  }
  return null;
}

export async function createUser(data: {
  name: string;
  phone: string;
  email?: string;
  password: string;
  activeTier?: 'personal' | 'business' | 'sub_admin';
}): Promise<DbUser> {
  const initialTier = data.activeTier || 'personal';
  const initialBalance = 0;

  const newUser: DbUser = {
    id: `usr_${Date.now()}`,
    name: data.name,
    displayNameEn: `Hello, ${data.name}`,
    phone: data.phone,
    email: data.email || `${data.phone.replace(/[^0-9]/g, '')}@smarthubbd.com`,
    passwordHash: data.password,
    activeTier: initialTier,
    walletBalance: 0,
    personalBalance: 0,
    businessBalance: 0,
    subAdminBalance: 0,
    avatarUrl: '',
    createdAt: new Date().toISOString()
  };

  if (isNeonConnected && pool) {
    try {
      await pool.query(
        `INSERT INTO users (id, name, display_name_en, phone, email, password_hash, active_tier, wallet_balance, personal_balance, business_balance, sub_admin_balance, avatar_url)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
        [
          newUser.id,
          newUser.name,
          newUser.displayNameEn,
          newUser.phone,
          newUser.email,
          newUser.passwordHash,
          newUser.activeTier,
          newUser.walletBalance,
          newUser.personalBalance,
          newUser.businessBalance,
          newUser.subAdminBalance,
          newUser.avatarUrl
        ]
      );
    } catch (e) {
      console.error('Neon insert user error, updating fallback store:', e);
    }
  }

  const store = loadLocalStore();
  store.users.push(newUser);
  saveLocalStore(store);
  return newUser;
}

export async function updateUserBalance(userId: string, deltaAmount: number, tierDelta?: { tier: 'personal' | 'business' | 'sub_admin'; delta: number }): Promise<DbUser | null> {
  if (isNeonConnected && pool) {
    try {
      let queryStr = `UPDATE users SET wallet_balance = wallet_balance + $1 WHERE id = $2 OR phone = $2 RETURNING *`;
      let queryParams: any[] = [deltaAmount, userId];

      if (tierDelta) {
        if (tierDelta.tier === 'personal') {
          queryStr = `UPDATE users SET wallet_balance = wallet_balance + $1, personal_balance = personal_balance + $2 WHERE id = $3 OR phone = $3 RETURNING *`;
          queryParams = [deltaAmount, tierDelta.delta, userId];
        } else if (tierDelta.tier === 'business') {
          queryStr = `UPDATE users SET wallet_balance = wallet_balance + $1, business_balance = business_balance + $2 WHERE id = $3 OR phone = $3 RETURNING *`;
          queryParams = [deltaAmount, tierDelta.delta, userId];
        } else if (tierDelta.tier === 'sub_admin') {
          queryStr = `UPDATE users SET wallet_balance = wallet_balance + $1, sub_admin_balance = sub_admin_balance + $2 WHERE id = $3 OR phone = $3 RETURNING *`;
          queryParams = [deltaAmount, tierDelta.delta, userId];
        }
      }

      const res = await pool.query(queryStr, queryParams);
      if (res.rows.length > 0) {
        const row = res.rows[0];
        return {
          id: row.id,
          name: row.name,
          displayNameEn: row.display_name_en,
          phone: row.phone,
          email: row.email,
          passwordHash: row.password_hash,
          activeTier: row.active_tier,
          walletBalance: parseFloat(row.wallet_balance),
          personalBalance: parseFloat(row.personal_balance || 0),
          businessBalance: parseFloat(row.business_balance || 0),
          subAdminBalance: parseFloat(row.sub_admin_balance || 0),
          avatarUrl: row.avatar_url,
          createdAt: row.created_at
        };
      }
    } catch (e) {
      console.error('Neon update balance error:', e);
    }
  }

  const store = loadLocalStore();
  const cleanId = userId.replace(/[^0-9]/g, '');
  const user = store.users.find(u => 
    u.id === userId || 
    u.phone === userId || 
    (cleanId && u.phone.replace(/[^0-9]/g, '') === cleanId)
  );
  if (user) {
    user.walletBalance = (Number(user.walletBalance) || 0) + deltaAmount;
    user.personalBalance = Number(user.personalBalance) || 0;
    user.businessBalance = Number(user.businessBalance) || 0;
    user.subAdminBalance = Number(user.subAdminBalance) || 0;

    if (tierDelta) {
      if (tierDelta.tier === 'personal') user.personalBalance += tierDelta.delta;
      if (tierDelta.tier === 'business') user.businessBalance += tierDelta.delta;
      if (tierDelta.tier === 'sub_admin') user.subAdminBalance += tierDelta.delta;
    }
    saveLocalStore(store);
    return user;
  }
  return null;
}

export async function updateUserAvatar(userId: string, avatarUrl: string): Promise<DbUser | null> {
  if (isNeonConnected && pool) {
    try {
      const res = await pool.query(
        `UPDATE users SET avatar_url = $1 WHERE id = $2 OR phone = $2 RETURNING *`,
        [avatarUrl, userId]
      );
      if (res.rows.length > 0) {
        const row = res.rows[0];
        return {
          id: row.id,
          name: row.name,
          displayNameEn: row.display_name_en,
          phone: row.phone,
          email: row.email,
          passwordHash: row.password_hash,
          activeTier: row.active_tier,
          walletBalance: parseFloat(row.wallet_balance),
          personalBalance: parseFloat(row.personal_balance || 0),
          businessBalance: parseFloat(row.business_balance || 0),
          subAdminBalance: parseFloat(row.sub_admin_balance || 0),
          avatarUrl: row.avatar_url,
          createdAt: row.created_at
        };
      }
    } catch (e) {
      console.error('Neon avatar update error:', e);
    }
  }

  const store = loadLocalStore();
  const user = store.users.find(u => u.id === userId || u.phone === userId);
  if (user) {
    user.avatarUrl = avatarUrl;
    saveLocalStore(store);
    return user;
  }
  return null;
}

export async function updateUserTier(userId: string, tier: 'personal' | 'business' | 'sub_admin'): Promise<DbUser | null> {
  if (isNeonConnected && pool) {
    try {
      const res = await pool.query(
        `UPDATE users SET active_tier = $1 WHERE id = $2 OR phone = $2 RETURNING *`,
        [tier, userId]
      );
      if (res.rows.length > 0) {
        const row = res.rows[0];
        return {
          id: row.id,
          name: row.name,
          displayNameEn: row.display_name_en,
          phone: row.phone,
          email: row.email,
          passwordHash: row.password_hash,
          activeTier: row.active_tier,
          walletBalance: parseFloat(row.wallet_balance),
          personalBalance: parseFloat(row.personal_balance || 0),
          businessBalance: parseFloat(row.business_balance || 0),
          subAdminBalance: parseFloat(row.sub_admin_balance || 0),
          avatarUrl: row.avatar_url,
          createdAt: row.created_at
        };
      }
    } catch (e) {
      console.error('Neon update tier error:', e);
    }
  }

  const store = loadLocalStore();
  const user = store.users.find(u => u.id === userId || u.phone === userId);
  if (user) {
    user.activeTier = tier;
    saveLocalStore(store);
    return user;
  }
  return null;
}


export async function addTransaction(tx: DbTransaction): Promise<DbTransaction> {
  if (isNeonConnected && pool) {
    try {
      await pool.query(
        `INSERT INTO transactions (id, user_id, date, type, description, amount, status, method, trx_id, phone, account_type)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [tx.id, tx.userId, tx.date, tx.type, tx.description, tx.amount, tx.status, tx.method, tx.trxId, tx.phone, tx.accountType]
      );
    } catch (e) {
      console.error('Neon addTransaction error:', e);
    }
  }

  const store = loadLocalStore();
  store.transactions.unshift(tx);
  saveLocalStore(store);
  return tx;
}

export async function getTransactions(userId: string): Promise<DbTransaction[]> {
  if (isNeonConnected && pool) {
    try {
      const res = await pool.query('SELECT * FROM transactions WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
      return res.rows.map(row => ({
        id: row.id,
        userId: row.user_id,
        date: row.date,
        type: row.type,
        description: row.description,
        amount: parseFloat(row.amount),
        status: row.status,
        method: row.method,
        trxId: row.trx_id,
        phone: row.phone,
        accountType: row.account_type,
        createdAt: row.created_at
      }));
    } catch (e) {
      console.error('Neon getTransactions error:', e);
    }
  }

  const store = loadLocalStore();
  return store.transactions.filter(t => t.userId === userId || !t.userId);
}

export async function addOrder(ord: DbOrder): Promise<DbOrder> {
  if (isNeonConnected && pool) {
    try {
      await pool.query(
        `INSERT INTO orders (id, user_id, service_id, service_title, category, tier, customer_name, customer_phone, input_data, original_price, discount, paid_amount, status, created_at, token_number, remarks)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
        [
          ord.id,
          ord.userId,
          ord.serviceId,
          ord.serviceTitle,
          ord.category,
          ord.tier,
          ord.customerName,
          ord.customerPhone,
          JSON.stringify(ord.inputData),
          ord.originalPrice,
          ord.discount,
          ord.paidAmount,
          ord.status,
          ord.createdAt,
          ord.tokenNumber,
          ord.remarks
        ]
      );
    } catch (e) {
      console.error('Neon addOrder error:', e);
    }
  }

  const store = loadLocalStore();
  store.orders.unshift(ord);
  saveLocalStore(store);
  return ord;
}

export async function getOrders(userId: string): Promise<DbOrder[]> {
  if (isNeonConnected && pool) {
    try {
      const res = await pool.query('SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
      return res.rows.map(row => ({
        id: row.id,
        userId: row.user_id,
        serviceId: row.service_id,
        serviceTitle: row.service_title,
        category: row.category,
        tier: row.tier,
        customerName: row.customer_name,
        customerPhone: row.customer_phone,
        inputData: typeof row.input_data === 'string' ? JSON.parse(row.input_data) : row.input_data,
        originalPrice: parseFloat(row.original_price),
        discount: parseFloat(row.discount),
        paidAmount: parseFloat(row.paid_amount),
        status: row.status,
        createdAt: row.created_at,
        tokenNumber: row.token_number,
        remarks: row.remarks
      }));
    } catch (e) {
      console.error('Neon getOrders error:', e);
    }
  }

  const store = loadLocalStore();
  return store.orders.filter(o => o.userId === userId || !o.userId);
}
