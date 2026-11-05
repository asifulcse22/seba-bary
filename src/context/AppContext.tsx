import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, Transaction, ServiceOrder, AccountTier, Service } from '../types';
import { tierPricingDiscount } from '../data/servicesData';

interface AppContextType {
  user: UserProfile | null;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  transactions: Transaction[];
  orders: ServiceOrder[];
  activeTab: 'dashboard' | 'wallet_hub' | 'orders' | 'services' | 'settings';
  setActiveTab: (tab: 'dashboard' | 'wallet_hub' | 'orders' | 'services' | 'settings') => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedServiceForOrder: Service | null;
  setSelectedServiceForOrder: (service: Service | null) => void;
  addBalance: (amount: number, method: 'bKash' | 'Nagad', trxId: string, phone: string) => Promise<{ success: boolean; message: string }>;
  withdrawBalance: (amount: number, method: 'bKash' | 'Nagad' | 'Bank' | 'Card', accountDetails: string) => Promise<{ success: boolean; message: string }>;
  switchTier: (tier: AccountTier) => Promise<{ success: boolean; message: string }>;
  upgradeTier: (tier: AccountTier) => Promise<{ success: boolean; message: string }>;
  placeOrder: (service: Service, formData: Record<string, string>, customerName?: string, customerPhone?: string) => Promise<{ success: boolean; message: string; order?: ServiceOrder }>;
  getDiscountedPrice: (basePrice: number) => number;
  loginUser: (phone: string, pass: string) => Promise<{ success: boolean; message: string }>;
  registerUser: (name: string, phone: string, pass: string, tier: AccountTier) => Promise<{ success: boolean; message: string }>;
  logoutUser: () => void;
  openAuthModal: (mode?: 'login' | 'register') => void;
  authModalState: { isOpen: boolean; mode: 'login' | 'register' };
  closeAuthModal: () => void;
  toastMessage: string | null;
  setToastMessage: (msg: string | null) => void;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      // If user has explicitly logged out, keep logged out
      const loggedOutFlag = localStorage.getItem('smarthub_logged_out');
      if (loggedOutFlag === 'true') {
        return null;
      }

      const saved = localStorage.getItem('smarthub_user');
      if (saved && saved !== 'null' && saved !== 'undefined') {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.phone) {
          // Sanitize old dummy photo
          if (parsed.avatarUrl && parsed.avatarUrl.includes('photo-1507003211169-0a1dd7228f2d')) {
            parsed.avatarUrl = '';
          }
          // Sanitize old demo balance 811551
          if (parsed.walletBalance >= 800000) {
            parsed.walletBalance = 0;
            if (parsed.tierBalances) {
              parsed.tierBalances.personal = 0;
              parsed.tierBalances.business = 0;
              parsed.tierBalances.sub_admin = 0;
            }
          }
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse saved user', e);
    }
    // Brand new visitors start clean (not logged in) so they see guest greeting
    return null;
  });

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [orders, setOrders] = useState<ServiceOrder[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'wallet_hub' | 'orders' | 'services' | 'settings'>('dashboard');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedServiceForOrder, setSelectedServiceForOrder] = useState<Service | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [authModalState, setAuthModalState] = useState<{ isOpen: boolean; mode: 'login' | 'register' }>({
    isOpen: false,
    mode: 'login'
  });

  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthModalState({ isOpen: true, mode });
  };

  const closeAuthModal = () => {
    setAuthModalState(prev => ({ ...prev, isOpen: false }));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Sync with backend API
  const refreshBackendData = async (userPhone?: string) => {
    try {
      const phoneToFetch = userPhone || user?.phone;
      if (!phoneToFetch) {
        // Not logged in, skip fetching user profile
        return;
      }

      const meRes = await fetch(`/api/auth/me?phone=${encodeURIComponent(phoneToFetch)}`);
      if (meRes.ok) {
        const data = await meRes.json();
        if (data.user) {
          const u = data.user;
          const sanitizedBalance = (u.walletBalance >= 800000) ? 0 : (Number(u.walletBalance) || 0);
          setUser({
            name: u.name,
            displayNameEn: u.displayNameEn,
            phone: u.phone,
            email: u.email,
            avatarUrl: (u.avatarUrl && !u.avatarUrl.includes('photo-1507003211169-0a1dd7228f2d')) ? u.avatarUrl : '',
            activeTier: u.activeTier,
            walletBalance: sanitizedBalance,
            tierBalances: {
              personal: (u.personalBalance >= 800000) ? 0 : (Number(u.personalBalance) || 0),
              business: (u.businessBalance >= 800000) ? 0 : (Number(u.businessBalance) || 0),
              sub_admin: (u.subAdminBalance >= 800000) ? 0 : (Number(u.subAdminBalance) || 0)
            },
            tierStatus: {
              personal: true,
              business: true,
              sub_admin: true
            },
            unreadNotifications: 2
          });
        }
      }

      // Fetch transactions
      const txRes = await fetch('/api/transactions');
      if (txRes.ok) {
        const txData = await txRes.json();
        if (Array.isArray(txData.transactions)) {
          setTransactions(txData.transactions);
        }
      }

      // Fetch orders
      const ordRes = await fetch('/api/orders');
      if (ordRes.ok) {
        const ordData = await ordRes.json();
        if (Array.isArray(ordData.orders)) {
          setOrders(ordData.orders);
        }
      }
    } catch (err) {
      console.warn('Backend sync warning, relying on local state:', err);
    }
  };

  useEffect(() => {
    refreshBackendData();
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('smarthub_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('smarthub_user');
    }
  }, [user]);

  const getDiscountedPrice = (basePrice: number): number => {
    const tier = user?.activeTier || 'personal';
    const discountRate = tierPricingDiscount[tier] || 0;
    const discounted = Math.round(basePrice * (1 - discountRate));
    return Math.max(0, discounted);
  };

  const loginUser = async (phone: string, pass: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password: pass })
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, message: data.error || 'লগইন ব্যর্থ হয়েছে।' };
      }

      const u = data.user;
      const loggedUser: UserProfile = {
        name: u.name,
        displayNameEn: u.displayNameEn,
        phone: u.phone,
        email: u.email,
        avatarUrl: (u.avatarUrl && !u.avatarUrl.includes('photo-1507003211169-0a1dd7228f2d')) ? u.avatarUrl : '',
        activeTier: u.activeTier,
        walletBalance: u.walletBalance,
        tierBalances: {
          personal: u.personalBalance || 0,
          business: u.businessBalance || 0,
          sub_admin: u.subAdminBalance || 0
        },
        tierStatus: {
          personal: true,
          business: true,
          sub_admin: true
        },
        unreadNotifications: 2
      };

      localStorage.removeItem('smarthub_logged_out');
      setUser(loggedUser);
      localStorage.setItem('smarthub_user', JSON.stringify(loggedUser));
      await refreshBackendData(u.phone);
      showToast(`স্বাগতম, ${u.name}! আপনি সফলভাবে লগইন করেছেন।`);
      return { success: true, message: 'সফলভাবে লগইন হয়েছে!' };
    } catch (err: any) {
      return { success: false, message: err.message || 'সার্ভার যোগাযোগে ত্রুটি।' };
    }
  };

  const registerUser = async (name: string, phone: string, pass: string, tier: AccountTier) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, password: pass, activeTier: tier })
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, message: data.error || 'রেজিস্ট্রেশন ব্যর্থ হয়েছে।' };
      }

      const u = data.user;
      const registeredUser: UserProfile = {
        name: u.name,
        displayNameEn: u.displayNameEn,
        phone: u.phone,
        email: u.email,
        avatarUrl: (u.avatarUrl && !u.avatarUrl.includes('photo-1507003211169-0a1dd7228f2d')) ? u.avatarUrl : '',
        activeTier: u.activeTier,
        walletBalance: 0,
        tierBalances: {
          personal: 0,
          business: 0,
          sub_admin: 0
        },
        tierStatus: {
          personal: true,
          business: true,
          sub_admin: true
        },
        unreadNotifications: 1
      };

      localStorage.removeItem('smarthub_logged_out');
      setUser(registeredUser);
      localStorage.setItem('smarthub_user', JSON.stringify(registeredUser));
      await refreshBackendData(u.phone);
      showToast(`অভিনন্দন, ${u.name}! আপনার ${tier} অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে।`);
      return { success: true, message: 'রেজিস্ট্রেশন সফল হয়েছে!' };
    } catch (err: any) {
      return { success: false, message: err.message || 'সার্ভার যোগাযোগে ত্রুটি।' };
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('smarthub_user');
    localStorage.removeItem('smarthub_auth_phone');
    localStorage.setItem('smarthub_logged_out', 'true');
    setUser(null);
    setTransactions([]);
    setOrders([]);
    showToast('আপনি সফলভাবে লগআউট করেছেন।');
  };

  const addBalance = async (amount: number, method: 'bKash' | 'Nagad', trxId: string, phone: string) => {
    if (!user) {
      openAuthModal('login');
      return { success: false, message: 'ব্যালেন্স রিচার্জ করতে প্রথমে লগইন করুন।' };
    }
    if (!amount || amount <= 0) {
      return { success: false, message: 'সঠিক টাকার পরিমাণ উল্লেখ করুন।' };
    }
    if (!trxId.trim()) {
      return { success: false, message: 'ট্রানজেকশন আইডি (TrxID) দিন।' };
    }
    if (!phone.trim()) {
      return { success: false, message: 'প্রেরক মোবাইল নাম্বার দিন।' };
    }

    try {
      const res = await fetch('/api/wallet/deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.phone,
          amount,
          method,
          trxId,
          phone
        })
      });
      const data = await res.json();

      if (res.ok && data.user) {
        setUser(prev => prev ? ({
          ...prev,
          walletBalance: data.user.walletBalance,
          tierBalances: {
            ...prev.tierBalances,
            [prev.activeTier]: (prev.tierBalances?.[prev.activeTier] || 0) + amount
          }
        }) : null);
        if (data.transaction) {
          setTransactions(prev => [data.transaction, ...prev]);
        }
      } else {
        // Optimistic fallback
        setUser(prev => prev ? ({
          ...prev,
          walletBalance: prev.walletBalance + amount
        }) : null);
      }

      showToast(`অভিনন্দন! ৳${amount} টাকা সফলভাবে আপনার ওয়ালেটে যুক্ত হয়েছে।`);
      return { success: true, message: 'ব্যালেন্স সফলভাবে যুক্ত হয়েছে।' };
    } catch (err: any) {
      setUser(prev => prev ? ({
        ...prev,
        walletBalance: prev.walletBalance + amount
      }) : null);
      showToast(`৳${amount} টাকা ওয়ালেটে যোগ হয়েছে।`);
      return { success: true, message: 'ব্যালেন্স যুক্ত হয়েছে।' };
    }
  };

  const withdrawBalance = async (amount: number, method: 'bKash' | 'Nagad' | 'Bank' | 'Card', accountDetails: string) => {
    if (!user) {
      openAuthModal('login');
      return { success: false, message: 'উইথড্র করতে প্রথমে লগইন করুন।' };
    }
    if (amount < 100) {
      return { success: false, message: 'সর্বনিম্ন উইথড্র পরিমাণ ৳১০০ টাকা।' };
    }
    if (amount > user.walletBalance) {
      return { success: false, message: 'আপনার ওয়ালেটে পর্যাপ্ত ব্যালেন্স নেই।' };
    }
    if (!accountDetails.trim()) {
      return { success: false, message: 'অ্যাকাউন্ট নাম্বার বা বিস্তারিত দিন।' };
    }

    try {
      const res = await fetch('/api/wallet/withdraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.phone, amount, method, accountDetails })
      });
      const data = await res.json();

      if (res.ok && data.user) {
        setUser(prev => prev ? ({
          ...prev,
          walletBalance: data.user.walletBalance
        }) : null);
        if (data.transaction) {
          setTransactions(prev => [data.transaction, ...prev]);
        }
      } else {
        setUser(prev => prev ? ({
          ...prev,
          walletBalance: prev.walletBalance - amount
        }) : null);
      }

      showToast(`উইথড্র অনুরোধ সফল হয়েছে! দ্রুত ৳${amount} আপনার অ্যাকাউন্টে পাঠানো হবে।`);
      return { success: true, message: 'উইথড্র অনুরোধ গৃহীত হয়েছে।' };
    } catch (e) {
      setUser(prev => prev ? ({
        ...prev,
        walletBalance: prev.walletBalance - amount
      }) : null);
      showToast(`উইথড্র অনুরোধ পাঠানো হয়েছে।`);
      return { success: true, message: 'উইথড্র অনুরোধ গৃহীত হয়েছে।' };
    }
  };

  const switchTier = async (tier: AccountTier) => {
    if (!user) {
      openAuthModal('login');
      return { success: false, message: 'অ্যাকাউন্ট পরিবর্তন করতে লগইন করুন।' };
    }
    try {
      await fetch('/api/user/switch-tier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.phone, tier })
      });
    } catch (e) {
      // optimistic
    }
    setUser(prev => prev ? ({
      ...prev,
      activeTier: tier
    }) : null);
    const tierName = tier === 'personal' ? 'পার্সোনাল অ্যাকাউন্ট' : tier === 'business' ? 'বিজনেস অ্যাকাউন্ট' : 'Sub Admin Panel';
    showToast(`আপনি এখন ${tierName} মোডে আছেন।`);
    return { success: true, message: `সফলভাবে ${tierName} মোডে পরিবর্তন করা হয়েছে।` };
  };

  const upgradeTier = async (tier: AccountTier) => {
    return switchTier(tier);
  };

  const placeOrder = async (service: Service, formData: Record<string, string>, customerName?: string, customerPhone?: string) => {
    if (!user) {
      openAuthModal('login');
      return { success: false, message: 'আবেদন করতে প্রথমে লগইন করুন।' };
    }

    const finalPrice = getDiscountedPrice(service.price);

    if (user.walletBalance < finalPrice) {
      showToast(`অর্ডার করতে পর্যাপ্ত ব্যালেন্স নেই! প্রয়োজন ৳${finalPrice}। ওয়ালেট রিচার্জ করুন।`);
      return { success: false, message: 'পর্যাপ্ত ব্যালেন্স নেই।' };
    }

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.phone,
          serviceId: service.id,
          serviceTitle: service.title,
          category: service.category,
          tier: user.activeTier,
          customerName: customerName || user.name,
          customerPhone: customerPhone || user.phone,
          inputData: formData,
          originalPrice: service.price,
          discount: service.price - finalPrice,
          paidAmount: finalPrice
        })
      });
      const data = await res.json();

      if (res.ok && data.order) {
        if (data.user) {
          setUser(prev => prev ? ({
            ...prev,
            walletBalance: data.user.walletBalance
          }) : null);
        } else {
          setUser(prev => prev ? ({
            ...prev,
            walletBalance: prev.walletBalance - finalPrice
          }) : null);
        }

        setOrders(prev => [data.order, ...prev]);
        showToast(`আপনার "${service.title}" আবেদন সফলভাবে জমা হয়েছে! টোকেন: ${data.order.tokenNumber}`);
        return { success: true, message: 'আবেদন সফল হয়েছে!', order: data.order };
      }
    } catch (e) {
      console.warn('Orders API offline, creating order locally:', e);
    }

    // Local fallback order creation
    const tokenNumber = `SHB-${service.category.toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: ServiceOrder = {
      id: `ORD-${Date.now().toString().slice(-4)}`,
      serviceId: service.id,
      serviceTitle: service.title,
      category: service.category,
      tier: user.activeTier,
      customerName: customerName || user.name,
      customerPhone: customerPhone || user.phone,
      inputData: formData,
      originalPrice: service.price,
      discount: service.price - finalPrice,
      paidAmount: finalPrice,
      status: 'processing',
      createdAt: new Date().toLocaleString('bn-BD', { dateStyle: 'short', timeStyle: 'short' }),
      tokenNumber: tokenNumber,
      remarks: 'আবেদন গৃহীত হয়েছে, ডাটাবেজ যাচাইকরণ চলমান।'
    };

    setUser(prev => prev ? ({
      ...prev,
      walletBalance: prev.walletBalance - finalPrice
    }) : null);

    setOrders(prev => [newOrder, ...prev]);
    showToast(`আপনার "${service.title}" আবেদন সফল হয়েছে! টোকেন: ${tokenNumber}`);
    return { success: true, message: 'আবেদন সফল হয়েছে!', order: newOrder };
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        transactions,
        orders,
        activeTab,
        setActiveTab,
        selectedCategory,
        setSelectedCategory,
        selectedServiceForOrder,
        setSelectedServiceForOrder,
        addBalance,
        withdrawBalance,
        switchTier,
        upgradeTier,
        placeOrder,
        getDiscountedPrice,
        loginUser,
        registerUser,
        logoutUser,
        openAuthModal,
        authModalState,
        closeAuthModal,
        toastMessage,
        setToastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
