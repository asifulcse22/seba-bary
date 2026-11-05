import React from 'react';
import { useApp } from '../context/AppContext';
import { AccountTier } from '../types';
import { TIER_PRICES } from '../data/tierPlans';
import { 
  X, 
  Check, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Flame, 
  Award, 
  ArrowRight,
  TrendingUp,
  Wallet
} from 'lucide-react';

interface TierDetailModalProps {
  initialTier: AccountTier;
  onClose: () => void;
}

export const TierDetailModal: React.FC<TierDetailModalProps> = ({ initialTier, onClose }) => {
  const { user, switchTier, upgradeTier, setActiveTab, openAuthModal } = useApp();
  const [activeTabTier, setActiveTabTier] = React.useState<AccountTier>(initialTier);

  const tierInfo = {
    personal: {
      name: 'পার্সোনাল অ্যাকাউন্ট',
      nameEn: 'Personal Account',
      price: TIER_PRICES.personal,
      badge: 'শুধু নিজের কাজের জন্য!',
      theme: 'from-blue-600 to-indigo-600',
      border: 'border-blue-500',
      bgLight: 'bg-blue-50/70',
      icon: '👤',
      features: [
        'ব্যক্তিগত NID কার্ড, সার্ভার কপি ও স্মার্ট কার্ড আবেদন',
        'জন্ম নিবন্ধন সনদ অনুসন্ধান ও সংশোধন সহায়তা',
        'TIN সার্টিফিকেট ও আয়কর সংক্রান্ত মৌলিক সেবা',
        'মোবাইল নম্বর ও বায়োমেট্রিক তথ্য অনুসন্ধান',
        'যেকোনো সময় ২৪/৭ ডিজিটাল সার্ভিস সাপোর্ট',
        'ব্যক্তিগত লেনদেন ইতিহাস ও ডাউনলোড ভল্ট'
      ],
      discountRate: 'রেগুলার মূল্য'
    },
    business: {
      name: 'বিজনেস অ্যাকাউন্ট',
      nameEn: 'Business Account',
      price: TIER_PRICES.business,
      badge: 'সবচেয়ে জনপ্রিয় 🔥',
      theme: 'from-emerald-600 to-teal-600',
      border: 'border-emerald-500',
      bgLight: 'bg-emerald-50/70',
      icon: '💼',
      features: [
        'নিজের কাজের পাশাপাশি কাস্টমারদের সব ধরনের কাজ করার সুযোগ',
        'প্রতিটি সার্ভিসে ১৫% ফ্ল্যাট ডিসকাউন্ট সুবিধা',
        'কাস্টমারদের জন্য কাস্টম ডিজিটাল রিসিপ্ট ও স্লিপ প্রিন্ট',
        'নিজের নির্ধারিত লাভে কাস্টমারের নিকট সেবা বিক্রির সুযোগ',
        'NID, সিম বায়োমেট্রিক, কল লিস্ট, TIN, ট্রেড লাইসেন্স ও ভূমি সেবা',
        'উদ্যোক্তাদের জন্য ফাস্ট-ট্র্যাক প্রসেসিং ও সাপোর্ট'
      ],
      discountRate: '১৫% বিশেষ ছাড়'
    },
    sub_admin: {
      name: 'Sub Admin Panel',
      nameEn: 'Sub Admin Panel',
      price: TIER_PRICES.sub_admin,
      badge: 'RECOMMENDED 🌟 (সবচেয়ে বেশি ভ্যালু)',
      theme: 'from-purple-700 to-indigo-700',
      border: 'border-purple-600',
      bgLight: 'bg-purple-50/70',
      icon: '★',
      features: [
        'সব সার্ভিস সবচেয়ে কম খরচে পাইকারি রেটে পাবেন (৩৫% পর্যন্ত ছাড়)',
        'প্রতি কাজে আপনার নিজস্ব খরচ সর্বনিম্ন — বাকি সব লাভ আপনার পকেটে!',
        'নির্ধারিত Dashboard এ সকল অর্ডার, ব্যালেন্স ও আর্থিক হিসাবরক্ষণ',
        'নিজের কাস্টমার ও সাব-এজেন্টদের রেট নিজেই নির্ধারণের ক্ষমতা',
        '৮টি অফিসিয়াল ভূমি সেবা, নামজারি ও রেকর্ড ভেরিফিকেশনে অগ্রাধিকার',
        'ডেডিকেটেড ২৪/৭ অ্যাকাউন্ট ম্যানেজার ও ভিআইপি প্রসেসিং'
      ],
      discountRate: '৩৫% পাইকারি হোলসেল রেট'
    }
  };

  const current = tierInfo[activeTabTier];
  const isCurrentActive = user?.activeTier === activeTabTier;
  const isUnlocked = user ? Boolean(user.tierStatus[activeTabTier]) : false;

  const handleActivateOrSwitch = async () => {
    if (!user) {
      onClose();
      openAuthModal('login');
      return;
    }
    if (isCurrentActive) {
      onClose();
      return;
    }
    if (isUnlocked) {
      await switchTier(activeTabTier);
      onClose();
    } else {
      const res = await upgradeTier(activeTabTier);
      if (res.success) {
        onClose();
      } else {
        // Prompt recharge
        onClose();
        setActiveTab('wallet_hub');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95">
        
        {/* Modal Top Strip */}
        <div className={`p-5 text-white bg-gradient-to-r ${current.theme} flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl backdrop-blur-xs">
              {current.icon}
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-white/80">
                {current.nameEn}
              </span>
              <h2 className="text-xl font-black">
                {current.name}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher between the 3 tiers */}
        <div className="grid grid-cols-3 border-b border-slate-200 bg-slate-50 text-xs font-bold text-center">
          <button
            onClick={() => setActiveTabTier('personal')}
            className={`py-3 px-2 border-b-2 transition-all cursor-pointer ${
              activeTabTier === 'personal'
                ? 'border-blue-600 text-blue-700 bg-white font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            পার্সোনাল (৳{TIER_PRICES.personal})
          </button>
          <button
            onClick={() => setActiveTabTier('business')}
            className={`py-3 px-2 border-b-2 transition-all cursor-pointer ${
              activeTabTier === 'business'
                ? 'border-emerald-600 text-emerald-700 bg-white font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            বিজনেস (৳{TIER_PRICES.business.toLocaleString('en-US')})
          </button>
          <button
            onClick={() => setActiveTabTier('sub_admin')}
            className={`py-3 px-2 border-b-2 transition-all cursor-pointer ${
              activeTabTier === 'sub_admin'
                ? 'border-purple-600 text-purple-700 bg-white font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Sub Admin (৳{TIER_PRICES.sub_admin.toLocaleString('en-US')})
          </button>
        </div>

        {/* Plan Body */}
        <div className="p-5 sm:p-6 space-y-4">
          
          <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-100">
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                {current.badge}
              </span>
              <p className="text-xs text-slate-500 mt-1.5 font-medium">
                সার্ভিস ডিসকাউন্ট রেট: <span className="font-bold text-emerald-600">{current.discountRate}</span>
              </p>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">
                প্ল্যান অ্যাক্টিভেশন ফি
              </span>
              <span className="text-2xl sm:text-3xl font-black text-slate-800">
                ৳ {current.price}
              </span>
            </div>
          </div>

          {/* Features list */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              এই অ্যাকাউন্টের সুযোগ-সুবিধাসমূহ:
            </h4>
            <div className="space-y-2 text-xs text-slate-700">
              {current.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span className="font-medium leading-relaxed">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* User balance and Action Button */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-slate-700">
                আপনার ওয়ালেট: ৳{(user?.walletBalance ?? 0).toLocaleString('bn-BD')}
              </span>
            </div>

            <button
              onClick={handleActivateOrSwitch}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md transition-all duration-300 cursor-pointer ${
                isCurrentActive
                  ? 'bg-slate-200 text-slate-600 cursor-default'
                  : `bg-gradient-to-r ${current.theme} text-white hover:opacity-95 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0`
              }`}
            >
              {isCurrentActive ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>বর্তমান সক্রিয় মোড</span>
                </>
              ) : isUnlocked ? (
                <>
                  <span>এই মোডে পরিবর্তন করুন</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>৳{current.price} দিয়ে সক্রিয় করুন</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
