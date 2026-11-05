export type AccountTier = 'personal' | 'business' | 'sub_admin';

export interface Service {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  icon: string;
  color: string;
  category: string;
  price: number;
  popular?: boolean;
  inputLabel: string;
  inputPlaceholder: string;
  subServices?: string[];
  fields?: {
    name: string;
    label: string;
    placeholder: string;
    type?: string;
    required?: boolean;
  }[];
}

export interface Category {
  id: string;
  label: string;
  icon: string;
  badge?: string;
}

export interface Transaction {
  id: string;
  date: string;
  type: 'deposit' | 'withdraw' | 'order' | 'commission';
  description: string;
  amount: number;
  status: 'সফল' | 'প্রক্রিয়াধীন' | 'বাতিল';
  method: 'bKash' | 'Nagad' | 'Rocket' | 'Bank' | 'Card' | 'Wallet';
  trxId?: string;
  phone?: string;
  accountType?: AccountTier;
}

export interface ServiceOrder {
  id: string;
  serviceId: string;
  serviceTitle: string;
  category: string;
  tier: AccountTier;
  customerName?: string;
  customerPhone?: string;
  inputData: Record<string, string>;
  originalPrice: number;
  discount: number;
  paidAmount: number;
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  createdAt: string;
  tokenNumber: string;
  remarks?: string;
}

export interface UserProfile {
  name: string;
  displayNameEn: string;
  phone: string;
  email: string;
  avatarUrl: string;
  activeTier: AccountTier;
  walletBalance: number;
  tierBalances: {
    personal: number;
    business: number;
    sub_admin: number;
  };
  tierStatus: {
    personal: boolean;
    business: boolean;
    sub_admin: boolean;
  };
  unreadNotifications: number;
}
