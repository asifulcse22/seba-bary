import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AccountTier, Service } from '../types';
import { services, categories } from '../data/servicesData';
import { getTierPlans } from '../data/tierPlans';
import { UserAvatar } from './UserAvatar';
import { 
  ArrowLeft, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  Sparkles, 
  Flame, 
  Award, 
  PlusCircle, 
  Phone, 
  CreditCard, 
  ChevronRight, 
  ShieldCheck, 
  Briefcase, 
  User, 
  Crown,
  Search,
  Filter,
  ArrowRight,
  TrendingUp,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TierDetailViewProps {
  tier: AccountTier;
  onBack: () => void;
  onSelectService: (service: Service) => void;
  onOpenRecharge: () => void;
  onSwitchTierView: (tier: AccountTier) => void;
}

export const TierDetailView: React.FC<TierDetailViewProps> = ({
  tier,
  onBack,
  onSelectService,
  onOpenRecharge,
  onSwitchTierView
}) => {
  const { user, addBalance, showToast } = useApp();
  const plans = getTierPlans();
  const currentPlan = plans[tier];

  // In-page quick deposit states for Personal unlock
  const [depositAmount, setDepositAmount] = useState<number>(500);
  const [depositMethod, setDepositMethod] = useState<'bKash' | 'Nagad'>('bKash');
  const [trxId, setTrxId] = useState('');
  const [senderPhone, setSenderPhone] = useState(user?.phone || '');
  const [isDepositing, setIsDepositing] = useState(false);
  const [depositError, setDepositError] = useState<string | null>(null);

  // Search and category filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('all');

  // Tier balance calculation
  const personalBalance = user?.tierBalances?.personal ?? 0;
  const businessBalance = user?.tierBalances?.business ?? 0;
  const subAdminBalance = user?.tierBalances?.sub_admin ?? 0;

  const currentTierBalance = 
    tier === 'personal' ? personalBalance :
    tier === 'business' ? businessBalance : subAdminBalance;

  // Personal lock rule: Services unlocked only after deposit (balance > 0)
  const isPersonalUnlocked = tier !== 'personal' || personalBalance > 0;

  // Filter services by tier relevance
  const personalCategories = ['nid', 'birth', 'tax', 'land', 'mobile', 'bill', 'cert', 'all'];

  const filteredServices = services.filter(svc => {
    // If personal, show personal categories
    if (tier === 'personal' && !personalCategories.includes(svc.category)) {
      return false;
    }
    // Category match
    if (selectedCat !== 'all' && svc.category !== selectedCat) {
      return false;
    }
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        svc.title.toLowerCase().includes(q) ||
        svc.titleEn.toLowerCase().includes(q) ||
        svc.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Calculate pricing based on tier discount
  const getTierPrice = (basePrice: number) => {
    if (tier === 'personal') return basePrice;
    if (tier === 'business') return Math.round(basePrice * 0.85); // 15% discount
    if (tier === 'sub_admin') return Math.round(basePrice * 0.65); // 35% wholesale discount
    return basePrice;
  };

  const handleQuickDepositSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDepositError(null);

    if (!depositAmount || depositAmount < 50) {
      setDepositError('সর্বনিম্ন ডিপোজিট পরিমাণ ৳৫০।');
      return;
    }
    if (!trxId.trim()) {
      setDepositError('ট্রানজেকশন আইডি (TrxID) লিখুন।');
      return;
    }
    if (!senderPhone.trim()) {
      setDepositError('প্রেরক মোবাইল নম্বর লিখুন।');
      return;
    }

    setIsDepositing(true);
    try {
      const res = await addBalance(depositAmount, depositMethod, trxId, senderPhone, 'personal');
      if (res.success) {
        setTrxId('');
        showToast('অভিনন্দন! আপনার পার্সোনাল ওয়ালেটে ডিপোজিট সফল হয়েছে এবং সকল সেবা আনলক হয়েছে!');
      } else {
        setDepositError(res.message);
      }
    } catch (err: any) {
      setDepositError(err.message || 'ডিপোজিটে সমস্যা হয়েছে।');
    } finally {
      setIsDepositing(false);
    }
  };

  // Color schemes per tier
  const tierColors = {
    personal: {
      gradient: 'from-[#003e85] via-[#0256a7] to-[#012d61]',
      border: 'border-blue-400',
      badge: 'bg-blue-600 text-white',
      balanceText: 'text-blue-800',
      accentGradient: 'from-blue-600 to-sky-500',
      tag: 'পার্সোনাল অ্যাকাউন্ট'
    },
    business: {
      gradient: 'from-[#004e38] via-[#026c4f] to-[#013f2d]',
      border: 'border-emerald-500',
      badge: 'bg-emerald-600 text-white',
      balanceText: 'text-emerald-800',
      accentGradient: 'from-emerald-600 via-teal-600 to-green-600',
      tag: 'বিজনেস অ্যাকাউন্ট হাব'
    },
    sub_admin: {
      gradient: 'from-[#381666] via-[#542199] to-[#270e4a]',
      border: 'border-purple-500',
      badge: 'bg-purple-700 text-white',
      balanceText: 'text-purple-900',
      accentGradient: 'from-purple-700 via-indigo-600 to-purple-800',
      tag: 'Sub Admin Wholesale Panel'
    }
  };

  const colors = tierColors[tier];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* ============================================================== */}
      {/* 1. TOP NAVIGATION BAR */}
      {/* ============================================================== */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition-all duration-200 hover:-translate-x-0.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-600" />
          <span>মূল ড্যাশবোর্ডে ফিরে যান</span>
        </button>

        {/* Tier Switcher Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => onSwitchTierView('personal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              tier === 'personal'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            👤 পার্সোনাল
          </button>
          <button
            onClick={() => onSwitchTierView('business')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              tier === 'business'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            💼 বিজনেস 🔥
          </button>
          <button
            onClick={() => onSwitchTierView('sub_admin')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              tier === 'sub_admin'
                ? 'bg-purple-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🌟 Sub Admin
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. DEDICATED PROFILE & TIER HERO BANNER */}
      {/* ============================================================== */}
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${colors.gradient} text-white p-5 sm:p-7 shadow-xl border-4 ${colors.border}`}>
        
        {/* Glow ambient background orbs */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 -mb-10 w-64 h-64 bg-emerald-400/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
          
          {/* User Profile info */}
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-white/20 p-1 ring-4 ring-white/40 shadow-xl overflow-hidden">
                <UserAvatar user={user} size="xl" showRing={false} />
              </div>
              <span className="absolute -bottom-1 -right-1 text-xl">
                {tier === 'personal' ? '👤' : tier === 'business' ? '💼' : '🌟'}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight">
                  {user ? user.name : 'অতিথি ব্যবহারকারী'}
                </h1>
                <span className={`px-3 py-0.5 rounded-full text-[11px] sm:text-xs font-black shadow-xs ${colors.badge}`}>
                  {colors.tag}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-sky-100 font-semibold">
                মোবাইল: {user ? user.phone : 'লগইন করুন'} • একাউন্ট স্ট্যাটাস: <span className="text-emerald-300 font-bold">সক্রিয় 🟢</span>
              </p>

              <div className="flex items-center gap-2 pt-1 text-[11px] sm:text-xs text-white/90 font-medium">
                {tier === 'personal' && <span>রেগুলার ডিজিটাল সেবা পোর্টাল • ১০০% নিরাপদ ও বিশ্বস্ত</span>}
                {tier === 'business' && <span className="text-amber-200 font-bold">১৫% ফ্ল্যাট ছাড় সক্রিয় • কাস্টমার কাজের আনলিমিটেড এক্সেস</span>}
                {tier === 'sub_admin' && <span className="text-yellow-200 font-bold">৩৫% হোলসেল পাইকারি রেট সক্রিয় • সাব-এডমিন রিসেলার ক্ষমতা</span>}
              </div>
            </div>
          </div>

          {/* Current Tier Wallet Balance Box */}
          <div className="bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4 shrink-0 shadow-lg">
            <div>
              <span className="text-xs font-bold text-sky-100 block">
                {tier === 'personal' ? 'পার্সোনাল ওয়ালেট ব্যালেন্স' : tier === 'business' ? 'বিজনেস ওয়ালেট ব্যালেন্স' : 'Sub Admin ওয়ালেট ব্যালেন্স'}
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight tabular-nums drop-shadow-sm">
                  ৳ {currentTierBalance.toLocaleString('bn-BD')}
                </span>
              </div>
            </div>

            <button
              onClick={onOpenRecharge}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
            >
              <PlusCircle className="w-4 h-4" />
              <span>রিচার্জ করুন</span>
            </button>
          </div>

        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. PERSONAL TIER: DEPOSIT LOCK BANNER & QUICK DEPOSIT (IF LOCKED) */}
      {/* ============================================================== */}
      {tier === 'personal' && !isPersonalUnlocked && (
        <div className="rounded-3xl bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100/70 border-2 border-amber-300 p-5 sm:p-7 shadow-lg space-y-5">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-amber-200">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
                <Lock className="w-6 h-6 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-black text-amber-950 flex items-center gap-2">
                  <span>পার্সোনাল সেবাগুলো ব্যবহার করতে প্রথমে ডিপোজিট করুন</span>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200">
                    লক করা রয়েছে 🔒
                  </span>
                </h3>
                <p className="text-xs sm:text-sm text-amber-900/90 font-medium">
                  আপনার পার্সোনাল অ্যাকাউন্টের বর্তমান ব্যালেন্স ৳ ০। ব্যক্তিগত NID সার্ভার কপি, ভোটার তথ্য, জন্ম নিবন্ধন ও অন্যান্য সেবা সচল করতে bKash বা Nagad দিয়ে এখনই ডিপোজিট করুন।
                </p>
              </div>
            </div>
          </div>

          {/* Direct Quick Deposit Form inside the Lock Card */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-amber-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-extrabold text-slate-800 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-600" />
                <span>তাৎক্ষণিক পার্সোনাল ডিপোজিট ফর্ম (১ মিনিটে সার্ভিস আনলক)</span>
              </h4>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                পার্সোনাল একাউন্ট
              </span>
            </div>

            {depositError && (
              <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                {depositError}
              </div>
            )}

            <form onSubmit={handleQuickDepositSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Method */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    পেমেন্ট মেথড
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDepositMethod('bKash')}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1 cursor-pointer transition-all ${
                        depositMethod === 'bKash'
                          ? 'border-pink-500 bg-pink-50 text-pink-700 ring-2 ring-pink-200'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span>bKash</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDepositMethod('Nagad')}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1 cursor-pointer transition-all ${
                        depositMethod === 'Nagad'
                          ? 'border-orange-500 bg-orange-50 text-orange-700 ring-2 ring-orange-200'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span>Nagad</span>
                    </button>
                  </div>
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    টাকার পরিমাণ (৳)
                  </label>
                  <input
                    type="number"
                    min="50"
                    required
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none text-xs sm:text-sm font-bold"
                  />
                  <div className="flex gap-1.5 mt-1.5">
                    {[100, 500, 1000].map(amt => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setDepositAmount(amt)}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md border cursor-pointer ${
                          depositAmount === amt ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        ৳{amt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* TrxID & Phone */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    TrxID ও মোবাইল নম্বর
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="TrxID (যেমন: 9J2KLA82)"
                    value={trxId}
                    onChange={(e) => setTrxId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none text-xs sm:text-sm font-medium mb-1.5 uppercase"
                  />
                  <input
                    type="text"
                    required
                    placeholder="প্রেরক মোবাইল নম্বর"
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none text-xs font-medium"
                  />
                </div>
              </div>

              {/* Number notice */}
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-center justify-between">
                <span>
                  {depositMethod} পার্সোনাল নাম্বার: <strong className="text-emerald-700 font-mono text-xs">01992-867758</strong> (Send Money)
                </span>
                <span className="text-emerald-600 font-bold">তাৎক্ষণিক অটো-অ্যাপ্রুভাল</span>
              </div>

              <button
                type="submit"
                disabled={isDepositing}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/25 hover:shadow-lg transition-all cursor-pointer"
              >
                {isDepositing ? (
                  <span>ডিপোজিট যাচাই করা হচ্ছে...</span>
                ) : (
                  <>
                    <Unlock className="w-4 h-4" />
                    <span>ডিপোজিট সম্পন্ন করে পার্সোনাল সেবাগুলো আনলক করুন</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. UNLOCKED SUCCESS BANNER FOR PERSONAL TIER */}
      {/* ============================================================== */}
      {tier === 'personal' && isPersonalUnlocked && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 border border-emerald-300 flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-emerald-900">
                পার্সোনাল সার্ভিস এক্সেস সক্রিয় রয়েছে!
              </h4>
              <p className="text-xs text-slate-600 font-medium">
                আপনার পার্সোনাল ওয়ালেটে পর্যাপ্ত ব্যালেন্স রয়েছে (৳ {personalBalance})। নিচের যেকোনো সেবায় সরাসরি আবেদন করতে পারেন।
              </p>
            </div>
          </div>

          <button
            onClick={onOpenRecharge}
            className="hidden sm:inline-flex px-3 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shrink-0"
          >
            + আরও ডিপোজিট
          </button>
        </div>
      )}

      {/* ============================================================== */}
      {/* 5. BUSINESS TIER: NOTICE & PROMPT (ALWAYS UNLOCKED) */}
      {/* ============================================================== */}
      {tier === 'business' && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border border-emerald-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-emerald-950">
                বিজনেস বিশেষ ডিসকাউন্ট পোর্টাল — ১৫% ফ্ল্যাট ছাড় সরাসরি সক্রিয়
              </h4>
              <p className="text-xs text-slate-600 font-medium">
                নিজের কাজের পাশাপাশি যেকোনো কাস্টমারের জন্য অর্ডার করুন। কাস্টমারের জন্য ডিজিটাল রসিদ ও স্লিপ প্রিন্ট সুবিধা অন্তর্ভূক্ত।
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-black shrink-0">
            ১৫% কমিশন ছাড়
          </span>
        </div>
      )}

      {/* ============================================================== */}
      {/* 6. SUB ADMIN TIER: NOTICE & PROMPT (ALWAYS UNLOCKED) */}
      {/* ============================================================== */}
      {tier === 'sub_admin' && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 via-indigo-50 to-purple-100/70 border border-purple-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-purple-950">
                Sub Admin পাইকারি রেট হাব — সর্বোচ্চ ৩৫% পর্যন্ত পাইকারি ছাড়
              </h4>
              <p className="text-xs text-slate-600 font-medium">
                সর্বনিম্ন পাইকারি মূল্যে সকল সরকারি ডিজিটাল সেবা। সাব-এজেন্টদের জন্য নিজস্ব রেট নির্ধারণ ও অর্ডার প্রসেসিং সুবিধা।
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-purple-700 text-white text-xs font-black shrink-0">
            ৩৫% পাইকারি রেট
          </span>
        </div>
      )}

      {/* ============================================================== */}
      {/* 7. SEARCH & CATEGORY FILTER BAR */}
      {/* ============================================================== */}
      <div className="space-y-3 pt-2">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`${tier === 'personal' ? 'পার্সোনাল' : tier === 'business' ? 'বিজনেস' : 'Sub Admin'} সেবা খুঁজুন...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all shadow-xs"
            />
          </div>

          <div className="text-xs font-bold text-slate-600 flex items-center gap-1.5 self-end sm:self-auto">
            <span>মোট সেবা: <strong>{filteredServices.length}</strong> টি</span>
          </div>
        </div>

        {/* Categories scrollable pill list */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories
            .filter(cat => tier !== 'personal' || personalCategories.includes(cat.id))
            .map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCat === cat.id
                    ? `${colors.badge} shadow-xs`
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <span>{cat.icon} {cat.label}</span>
              </button>
            ))}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 8. SERVICES CATALOG GRID */}
      {/* If personal & locked: Blurred / overlay lock display */}
      {/* ============================================================== */}
      <div className="relative">
        
        {/* If personal and not unlocked, wrap grid in blurred locked overlay */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 ${
          !isPersonalUnlocked ? 'opacity-60 pointer-events-none filter blur-[1.5px] select-none' : ''
        }`}>
          {filteredServices.map(service => {
            const finalPrice = getTierPrice(service.price);
            const discountAmount = service.price - finalPrice;

            return (
              <div
                key={service.id}
                onClick={() => isPersonalUnlocked && onSelectService(service)}
                className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-400 transition-all flex flex-col justify-between gap-3 group cursor-pointer"
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform">
                      {service.icon}
                    </div>

                    {/* Price and discount badge */}
                    <div className="text-right">
                      {discountAmount > 0 ? (
                        <div className="flex items-baseline gap-1 justify-end">
                          <span className="text-xs text-slate-400 line-through">
                            ৳{service.price}
                          </span>
                          <span className={`text-base font-black ${
                            tier === 'business' ? 'text-emerald-700' : 'text-purple-700'
                          }`}>
                            ৳{finalPrice}
                          </span>
                        </div>
                      ) : (
                        <span className="text-base font-black text-slate-800">
                          ৳{service.price}
                        </span>
                      )}

                      {discountAmount > 0 && (
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-md ${
                          tier === 'business' ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-purple-800'
                        }`}>
                          সেভ ৳{discountAmount}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                      {service.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                  <span>আবেদন করুন</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Lock Overlay for Personal Tier when balance is 0 */}
        {!isPersonalUnlocked && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-900/10 backdrop-blur-[1px] rounded-3xl p-6 text-center">
            <div className="max-w-md p-6 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-amber-300 space-y-3">
              <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-md">
                <Lock className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="font-black text-base sm:text-lg text-slate-900">
                পার্সোনাল সার্ভিসগুলো দেখতে ও আবেদন করতে ডিপোজিট করুন
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                ডিপোজিট সফল হলেই উপরের সকল সেবা আনলক হবে এবং আপনি তাৎক্ষণিক সার্ভার কপি ও আবেদন করতে পারবেন।
              </p>
              <button
                onClick={() => {
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              >
                ↑ উপরে গিয়ে ফর্ম পূরণ করে ডিপোজিট করুন
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
