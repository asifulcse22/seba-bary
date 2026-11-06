import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { 
  initDb, 
  getDbStatus,
  findUserByPhone, 
  createUser, 
  updateUserAvatar,
  updateUserBalance, 
  updateUserTier,
  addTransaction, 
  getTransactions, 
  addOrder, 
  getOrders 
} from './src/server/db.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// CORS মিডলওয়্যার (ফ্রন্টএন্ড ও ব্যাকএন্ডের মধ্যে ডাটা আদান-প্রদান নিশ্চিত করতে)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

// Initialize database
initDb().catch(err => {
  console.error('Database initialization error:', err);
});

// Database & Neon status endpoint
app.get('/api/db/status', (_req, res) => {
  res.json(getDbStatus());
});

// Authentication Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, phone, password, activeTier, email } = req.body;
    if (!name || !phone || !password) {
      return res.status(400).json({ error: 'নাম, মোবাইল নম্বর ও পাসওয়ার্ড আবশ্যক।' });
    }

    const existing = await findUserByPhone(phone);
    if (existing) {
      return res.status(400).json({ error: 'এই মোবাইল নম্বর দিয়ে ইতিমধ্যে অ্যাকাউন্ট রয়েছে। লগইন করুন।' });
    }

    const user = await createUser({
      name,
      phone,
      email,
      password,
      activeTier: activeTier || 'personal'
    });

    res.json({
      success: true,
      message: 'রেজিস্ট্রেশন সফল হয়েছে!',
      user: {
        id: user.id,
        name: user.name,
        displayNameEn: user.displayNameEn,
        phone: user.phone,
        email: user.email,
        activeTier: user.activeTier,
        walletBalance: user.walletBalance,
        personalBalance: user.personalBalance,
        businessBalance: user.businessBalance,
        subAdminBalance: user.subAdminBalance,
        avatarUrl: user.avatarUrl
      }
    });
  } catch (err: any) {
    console.error('Register error:', err);
    res.status(500).json({ error: err.message || 'রেজিস্ট্রেশনে ত্রুটি হয়েছে।' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { phone, password } = req.body;
    if (!phone || !password) {
      return res.status(400).json({ error: 'মোবাইল নম্বর ও পাসওয়ার্ড প্রদান করুন।' });
    }

    const user = await findUserByPhone(phone);
    if (!user) {
      return res.status(401).json({ error: 'অ্যাকাউন্ট খুঁজে পাওয়া যায়নি। সঠিক মোবাইল নম্বর দিন।' });
    }

    if (user.passwordHash !== password) {
      return res.status(401).json({ error: 'পাসওয়ার্ড সঠিক নয়। আবার চেষ্টা করুন।' });
    }

    res.json({
      success: true,
      message: 'সফলভাবে লগইন হয়েছে!',
      user: {
        id: user.id,
        name: user.name,
        displayNameEn: user.displayNameEn,
        phone: user.phone,
        email: user.email,
        activeTier: user.activeTier,
        walletBalance: user.walletBalance,
        personalBalance: user.personalBalance,
        businessBalance: user.businessBalance,
        subAdminBalance: user.subAdminBalance,
        avatarUrl: user.avatarUrl
      }
    });
  } catch (err: any) {
    console.error('Login error:', err);
    res.status(500).json({ error: err.message || 'লগইনে সমস্যা হয়েছে।' });
  }
});

app.get('/api/auth/me', async (req, res) => {
  try {
    const phone = req.query.phone as string;
    if (!phone) {
      return res.json({ user: null });
    }
    const user = await findUserByPhone(phone);
    if (!user) {
      return res.status(404).json({ error: 'User not found', user: null });
    }
    res.json({
      user: {
        id: user.id,
        name: user.name,
        displayNameEn: user.displayNameEn,
        phone: user.phone,
        email: user.email,
        activeTier: user.activeTier,
        walletBalance: user.walletBalance,
        personalBalance: user.personalBalance,
        businessBalance: user.businessBalance,
        subAdminBalance: user.subAdminBalance,
        avatarUrl: user.avatarUrl
      }
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Update user avatar photo
app.post('/api/user/avatar', async (req, res) => {
  try {
    const { userId, avatarUrl } = req.body;
    if (!userId || !avatarUrl) {
      return res.status(400).json({ error: 'ব্যবহারকারী আইডি ও ছবি আবশ্যক।' });
    }
    const updated = await updateUserAvatar(userId, avatarUrl);
    res.json({ success: true, user: updated });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Tier switch route
app.post('/api/user/switch-tier', async (req, res) => {
  try {
    const { userId, tier } = req.body;
    const user = await updateUserTier(userId || 'usr_riaz', tier);
    res.json({ success: true, user });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Wallet Routes
app.post('/api/wallet/deposit', async (req, res) => {
  try {
    const { userId, amount, method, trxId, phone, targetTier } = req.body;
    const numAmount = parseFloat(amount);

    if (!numAmount || numAmount <= 0) {
      return res.status(400).json({ error: 'সঠিক টাকার পরিমাণ দিন।' });
    }
    if (!trxId) {
      return res.status(400).json({ error: 'ট্রানজেকশন আইডি প্রদান করুন।' });
    }

    const uid = userId || 'usr_riaz';
    const depositTier = (targetTier === 'personal' || targetTier === 'sub_admin' || targetTier === 'business') 
      ? targetTier 
      : 'personal';

    const updatedUser = await updateUserBalance(uid, numAmount, {
      tier: depositTier,
      delta: numAmount
    });

    const tx = await addTransaction({
      id: `TRX-${Date.now().toString().slice(-5)}`,
      userId: uid,
      date: new Date().toLocaleString('bn-BD', { dateStyle: 'short', timeStyle: 'short' }),
      type: 'deposit',
      description: `${depositTier === 'personal' ? 'পার্সোনাল' : depositTier === 'sub_admin' ? 'সাব অ্যাডমিন' : 'বিজনেস'} ডিপোজিট (${method || 'bKash'})`,
      amount: numAmount,
      status: 'সফল',
      method: method || 'bKash',
      trxId: trxId.toUpperCase(),
      phone: phone || '',
      accountType: depositTier,
      createdAt: new Date().toISOString()
    });

    res.json({ success: true, user: updatedUser, transaction: tx });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/wallet/withdraw', async (req, res) => {
  try {
    const { userId, amount, method, accountDetails, sourceTier } = req.body;
    const numAmount = parseFloat(amount);

    if (numAmount < 100) {
      return res.status(400).json({ error: 'সর্বনিম্ন উইথড্র পরিমাণ ৳১০০।' });
    }

    const uid = userId || 'usr_riaz';
    const withdrawTier = (sourceTier === 'personal' || sourceTier === 'business' || sourceTier === 'sub_admin')
      ? sourceTier
      : 'personal';

    const updatedUser = await updateUserBalance(uid, -numAmount, {
      tier: withdrawTier,
      delta: -numAmount
    });

    const tx = await addTransaction({
      id: `WTH-${Date.now().toString().slice(-5)}`,
      userId: uid,
      date: new Date().toLocaleString('bn-BD', { dateStyle: 'short', timeStyle: 'short' }),
      type: 'withdraw',
      description: `${withdrawTier === 'personal' ? 'পার্সোনাল' : withdrawTier === 'sub_admin' ? 'সাব অ্যাডমিন' : 'বিজনেস'} একাউন্ট উইথড্র অনুরোধ (${method})`,
      amount: -numAmount,
      status: 'প্রক্রিয়াধীন',
      method: method || 'bKash',
      trxId: `WTH-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      phone: accountDetails || '',
      accountType: withdrawTier,
      createdAt: new Date().toISOString()
    });

    res.json({ success: true, user: updatedUser, transaction: tx });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Orders & Transactions Routes
app.get('/api/transactions', async (req, res) => {
  try {
    const userId = (req.query.userId as string) || 'usr_riaz';
    const txs = await getTransactions(userId);
    res.json({ transactions: txs });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const userId = (req.query.userId as string) || 'usr_riaz';
    const orders = await getOrders(userId);
    res.json({ orders });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const {
      userId,
      serviceId,
      serviceTitle,
      category,
      tier,
      customerName,
      customerPhone,
      inputData,
      originalPrice,
      discount,
      paidAmount
    } = req.body;

    const uid = userId || 'usr_riaz';
    const numPaid = parseFloat(paidAmount) || 0;

    // Deduct user balance in database
    const updatedUser = await updateUserBalance(uid, -numPaid);

    const token = `SHB-${category ? category.toUpperCase() : 'SRV'}-${Math.floor(10000 + Math.random() * 90000)}`;

    const newOrder = await addOrder({
      id: `ORD-${Date.now().toString().slice(-4)}`,
      userId: uid,
      serviceId,
      serviceTitle,
      category,
      tier: tier || 'business',
      customerName: customerName || '',
      customerPhone: customerPhone || '',
      inputData: inputData || {},
      originalPrice: parseFloat(originalPrice) || 0,
      discount: parseFloat(discount) || 0,
      paidAmount: numPaid,
      status: 'processing',
      createdAt: new Date().toLocaleString('bn-BD', { dateStyle: 'short', timeStyle: 'short' }),
      tokenNumber: token,
      remarks: 'আবেদন গৃহীত হয়েছে, ডাটাবেজ যাচাইকরণ চলমান।'
    });

    // Record order transaction
    await addTransaction({
      id: `TRX-${Date.now().toString().slice(-5)}`,
      userId: uid,
      date: new Date().toLocaleString('bn-BD', { dateStyle: 'short', timeStyle: 'short' }),
      type: 'order',
      description: `${serviceTitle} - ফি প্রদান`,
      amount: -numPaid,
      status: 'সফল',
      method: 'Wallet',
      trxId: token,
      phone: customerPhone || '',
      accountType: tier || 'business',
      createdAt: new Date().toISOString()
    });

    res.json({ success: true, order: newOrder, user: updatedUser });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Mount Vite or serve static
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on : http://localhost:${PORT}`);
  });
}

startServer();

// Cloudflare Workers / Serverless এক্সপোর্ট
export default app;