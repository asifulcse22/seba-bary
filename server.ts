import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
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
import { 
  generateToken, 
  verifyToken, 
  hashPassword, 
  verifyPassword 
} from './src/server/security.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Security & CORS Middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Initialize database
initDb().catch(err => {
  console.error('Database initialization error:', err);
});

// Database status endpoint (Sanitized)
app.get('/api/db/status', (_req, res) => {
  const status = getDbStatus();
  res.json({
    isNeonConnected: status.isNeonConnected,
    engine: status.engine
  });
});

// 🎯 ১. নিরাপদ অথেন্টিকেশন হেল্পার: শুধুমাত্র ভ্যালিড JWT Token যাচাই করবে (কোনো ব্যাকডোর নেই)
async function getAuthUser(req: express.Request) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return null;
    }

    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
    if (!token) {
      return null;
    }

    // টোকেন ক্রিপ্টোগ্রাফিক্যালি ডিকোড ও যাচাই
    const payload = verifyToken(token);
    if (!payload || !payload.phone) {
      return null;
    }

    const user = await findUserByPhone(payload.phone);
    return user || null;
  } catch (err) {
    return null;
  }
}

// Session route (Strictly Protected)
app.post('/api/auth/session', async (req, res) => {
  try {
    const user = await getAuthUser(req);
    if (!user) {
      return res.status(401).json({ error: 'অননুমোদিত এক্সেস।' });
    }
    const token = generateToken({ id: user.id, phone: user.phone });
    res.json({ success: true, token });
  } catch (err: any) {
    res.status(500).json({ error: 'সার্ভার ত্রুটি।' });
  }
});

// Authentication Routes: Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, phone, password, activeTier, email } = req.body;
    if (!name || !phone || !password) {
      return res.status(400).json({ error: 'নাম, মোবাইল নম্বর ও পাসওয়ার্ড আবশ্যক।' });
    }

    const cleanPhone = phone.trim();
    const existing = await findUserByPhone(cleanPhone);
    if (existing) {
      return res.status(400).json({ error: 'এই মোবাইল নম্বর দিয়ে ইতিমধ্যে অ্যাকাউন্ট রয়েছে। লগইন করুন।' });
    }

    // Secure password hashing
    const hashedPassword = hashPassword(password);

    const user = await createUser({
      name: name.trim(),
      phone: cleanPhone,
      email: email ? email.trim() : undefined,
      password: hashedPassword,
      activeTier: activeTier || 'personal'
    });

    const token = generateToken({ id: user.id, phone: user.phone });

    res.json({
      success: true,
      message: 'রেজিস্ট্রেশন সফল হয়েছে!',
      token,
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
    res.status(500).json({ error: 'রেজিস্ট্রেশনে ত্রুটি হয়েছে।' });
  }
});

// Authentication Routes: Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { phone, password } = req.body;
    if (!phone || !password) {
      return res.status(400).json({ error: 'মোবাইল নম্বর ও পাসওয়ার্ড প্রদান করুন।' });
    }

    const cleanPhone = phone.trim();
    const user = await findUserByPhone(cleanPhone);
    if (!user) {
      return res.status(401).json({ error: 'অ্যাকাউন্ট খুঁজে পাওয়া যায়নি। সঠিক মোবাইল নম্বর দিন।' });
    }

    // Cryptographic password verification
    const isValid = verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ error: 'পাসওয়ার্ড সঠিক নয়। আবার চেষ্টা করুন।' });
    }

    const token = generateToken({ id: user.id, phone: user.phone });

    res.json({
      success: true,
      message: 'সফলভাবে লগইন হয়েছে!',
      token,
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
    res.status(500).json({ error: 'লগইনে সমস্যা হয়েছে।' });
  }
});

// 🎯 ২. কারেন্ট ইউজার প্রোফাইল: কোনো টোকেন না থাকলে 401 রিটার্ন করবে
app.get('/api/auth/me', async (req, res) => {
  try {
    const user = await getAuthUser(req);
    if (!user) {
      return res.status(401).json({ user: null, error: 'অননুমোদিত এক্সেস।' });
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
    res.status(500).json({ error: 'সার্ভার ত্রুটি।' });
  }
});

// Update user avatar photo
app.post('/api/user/avatar', async (req, res) => {
  try {
    const user = await getAuthUser(req);
    if (!user) {
      return res.status(401).json({ error: 'অননুমোদিত এক্সেস। প্রথমে লগইন করুন।' });
    }
    const { avatarUrl } = req.body;
    if (!avatarUrl) {
      return res.status(400).json({ error: 'ছবি আবশ্যক।' });
    }
    const updated = await updateUserAvatar(user.phone, avatarUrl);
    res.json({ success: true, user: updated });
  } catch (err: any) {
    res.status(500).json({ error: 'ছবি আপডেট করা যায়নি।' });
  }
});

// Tier switch route
app.post('/api/user/switch-tier', async (req, res) => {
  try {
    const user = await getAuthUser(req);
    if (!user) {
      return res.status(401).json({ error: 'অননুমোদিত এক্সেস। প্রথমে লগইন করুন।' });
    }
    const { tier } = req.body;
    const updated = await updateUserTier(user.phone, tier);
    res.json({ success: true, user: updated });
  } catch (err: any) {
    res.status(500).json({ error: 'টিয়ার পরিবর্তন করা যায়নি।' });
  }
});

// Wallet Deposit Route
app.post('/api/wallet/deposit', async (req, res) => {
  try {
    const user = await getAuthUser(req);
    if (!user) {
      return res.status(401).json({ error: 'ডিপোজিট করতে অনুগ্রহ করে লগইন করুন।' });
    }

    const { amount, method, trxId, phone, targetTier } = req.body;
    const numAmount = parseFloat(amount);

    if (!numAmount || numAmount <= 0) {
      return res.status(400).json({ error: 'সঠিক টাকার পরিমাণ দিন।' });
    }
    if (!trxId) {
      return res.status(400).json({ error: 'ট্রানজেকশন আইডি প্রদান করুন।' });
    }

    const uid = user.phone;
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
    res.status(500).json({ error: 'ডিপোজিট ব্যর্থ হয়েছে।' });
  }
});

// Wallet Withdraw Route
app.post('/api/wallet/withdraw', async (req, res) => {
  try {
    const user = await getAuthUser(req);
    if (!user) {
      return res.status(401).json({ error: 'উইথড্র করতে অনুগ্রহ করে লগইন করুন।' });
    }

    const { amount, method, accountDetails, sourceTier } = req.body;
    const numAmount = parseFloat(amount);

    if (numAmount < 100) {
      return res.status(400).json({ error: 'সর্বনিম্ন উইথড্র পরিমাণ ৳১০০।' });
    }

    const uid = user.phone;
    const withdrawTier = (sourceTier === 'personal' || sourceTier === 'business' || sourceTier === 'sub_admin')
      ? sourceTier
      : 'personal';

    const currentBal = withdrawTier === 'personal' ? user.personalBalance :
                       withdrawTier === 'business' ? user.businessBalance : user.subAdminBalance;
    if (currentBal < numAmount) {
      return res.status(400).json({ error: 'উইথড্র করার জন্য আপনার এই অ্যাকাউন্টে পর্যাপ্ত ব্যালেন্স নেই।' });
    }

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
    res.status(500).json({ error: 'উইথড্র ব্যর্থ হয়েছে।' });
  }
});

// Orders & Transactions Routes
app.get('/api/transactions', async (req, res) => {
  try {
    const user = await getAuthUser(req);
    if (!user) {
      return res.json({ transactions: [] });
    }
    const txs = await getTransactions(user.phone);
    res.json({ transactions: txs });
  } catch (err: any) {
    res.status(500).json({ error: 'লেনদেন তথ্য লোড করা যায়নি।' });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const user = await getAuthUser(req);
    if (!user) {
      return res.json({ orders: [] });
    }
    const orders = await getOrders(user.phone);
    res.json({ orders });
  } catch (err: any) {
    res.status(500).json({ error: 'অর্ডার তথ্য লোড করা যায়নি।' });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const user = await getAuthUser(req);
    if (!user) {
      return res.status(401).json({ error: 'অর্ডার করতে অনুগ্রহ করে লগইন করুন।' });
    }

    const {
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

    const uid = user.phone;
    const numPaid = parseFloat(paidAmount) || 0;

    if (user.walletBalance < numPaid) {
      return res.status(400).json({ error: 'পর্যাপ্ত ওয়ালেট ব্যালেন্স নেই।' });
    }

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
    res.status(500).json({ error: 'অর্ডার সাবমিট করা যায়নি।' });
  }
});

// Start Server
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

export default app;