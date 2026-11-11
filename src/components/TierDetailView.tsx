import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AccountTier, Service } from '../types';
import { services, categories, personalServices } from '../data/servicesData';
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
  FileText,
  LayoutDashboard,
  Copy,
  Check,
  Zap,
  CheckCheck,
  BadgePercent,
  Clock,
  AlertTriangle,
  Smartphone,
  MapPin,
  FileCode2,
  DollarSign
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
  const [senderPhone, setSenderPhone] = useState('');
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [isDepositing, setIsDepositing] = useState(false);
  const [depositError, setDepositError] = useState<string | null>(null);

  // বিকাশ ও নগদ নাম্বার (ব্যবহারকারী কপি করে সেন্ড মানি করবেন)
  const bkashNumber = '01603054567';
  const nagadNumber = '01350084236';
  const currentDepositNumber = depositMethod === 'bKash' ? bkashNumber : nagadNumber;

  const handleCopyNumber = async () => {
    const rawDigits = currentDepositNumber.replace(/[^0-9]/g, '');
    let isCopied = false;
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(rawDigits);
        isCopied = true;
      } catch {
        isCopied = false;
      }
    }
    if (!isCopied) {
      try {
        const tempInput = document.createElement('textarea');
        tempInput.value = rawDigits;
        tempInput.style.position = 'fixed';
        tempInput.style.left = '-9999px';
        tempInput.style.top = '-9999px';
        document.body.appendChild(tempInput);
        tempInput.focus();
        tempInput.select();
        isCopied = document.execCommand('copy');
        document.body.removeChild(tempInput);
      } catch {
        isCopied = false;
      }
    }
    setCopiedNumber(true);
    showToast('নাম্বার কপি হয়েছে!');
    setTimeout(() => setCopiedNumber(false), 2000);
  };

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

  // Filter services by tier relevance:
  const personalCategories = ['all', 'nid', 'birth', 'tax'];

  const sourceServices = tier === 'personal' ? personalServices : services;

  const filteredServices = sourceServices.filter(svc => {
    // 🎯 পার্সোনাল অ্যাকাউন্ট থেকে nid-server-copy এবং jonmo-nibondhon-copy রিমুভ করা হয়েছে
    if (
      tier === 'personal' &&
      (svc.id === 'nid-server-copy' ||
       svc.id === 'jonmo-nibondhon-copy' ||
       svc.id === 'nid_server_copy' ||
       svc.id === 'jonmo_nibondhon_copy' ||
       svc.title === 'NID সার্ভার কপি' ||
       svc.title === 'জন্ম নিবন্ধন কপি')
    ) {
      return false;
    }

    // If personal, show strictly personal categories
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

  // 🎯 Calculate pricing: Sub-Admin-এর জন্য ফ্ল্যাট ৫০% (অর্ধেক দাম)
  const getTierPrice = (basePrice: number) => {
    if (tier === 'personal') return basePrice;
    if (tier === 'business') return basePrice;
    if (tier === 'sub_admin') return Math.round(basePrice * 0.50); // 🔥 ৫০% অর্ধেক দাম!
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
      gradient: 'from-[#320b63] via-[#4d168e] to-[#200542]',
      border: 'border-purple-500',
      badge: 'bg-gradient-to-r from-amber-500 to-yellow-500 text-purple-950 font-black',
      balanceText: 'text-purple-900',
      accentGradient: 'from-purple-700 via-indigo-600 to-purple-800',
      tag: '💎 Sub Admin Wholesale Panel'
    }
  };

  const colors = tierColors[tier];

  // সাব-এডমিনের স্পেশাল রেট চার্ট তালিকা
  const halfRateServices = [
    { title: 'নাম্বার টু লোকেশন', oldPrice: 170, newPrice: 85, icon: '📍' },
    { title: 'সার্ভার কপি', oldPrice: 18, newPrice: 9, icon: '💻' },
    { title: 'NID PDF', oldPrice: 33, newPrice: 16, icon: '🆔' },
    { title: 'টিন সার্টিফিকেট', oldPrice: 59, newPrice: 29, icon: '📄' },
    { title: 'সিম বায়োমেট্রিক', oldPrice: 49, newPrice: 24, icon: '📱' },
    { title: '৩ মাস কল লিস্ট', oldPrice: 349, newPrice: 175, icon: '📞' },
    { title: 'বিকাশ / নগদ ইনফো', oldPrice: 399, newPrice: 199, icon: '💳' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* ============================================================== */}
      {/* 1. TOP NAVIGATION BAR */}
      {/* ============================================================== */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-800 hover:text-emerald-700 font-extrabold text-xs sm:text-sm border border-slate-200 hover:border-emerald-300 transition-all duration-200 hover:-translate-x-0.5 cursor-pointer shadow-xs group"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-600 group-hover:-translate-x-1 transition-transform" />
          <LayoutDashboard className="w-4 h-4 text-emerald-600" />
          <span>মূল ড্যাশবোর্ডে ফিরে যান</span>
        </button>

        {/* Current Tier Dedicated Badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className={`px-3.5 py-1.5 rounded-xl font-black text-xs shadow-2xs border flex items-center gap-1.5 ${
            tier === 'personal'
              ? 'bg-blue-50 text-blue-800 border-blue-200'
              : tier === 'business'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-purple-100 text-purple-900 border-purple-300 ring-2 ring-purple-200'
          }`}>
            <span>{tier === 'personal' ? '👤' : tier === 'business' ? '💼' : '👑'}</span>
            <span>{tier === 'personal' ? 'পার্সোনাল অ্যাকাউন্ট' : tier === 'business' ? 'বিজনেস অ্যাকাউন্ট' : 'Sub Admin Wholesale Panel (৫০% ছাড়)'}</span>
          </span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. DEDICATED PROFILE & TIER HERO BANNER */}
      {/* ============================================================== */}
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${colors.gradient} text-white p-5 sm:p-7 shadow-xl border-4 ${colors.border}`}>
        
        {/* Glow ambient background orbs */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 -mb-10 w-64 h-64 bg-purple-400/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
          
          {/* User Profile info */}
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-white/20 p-1 ring-4 ring-white/40 shadow-xl overflow-hidden">
                <UserAvatar user={user} size="xl" showRing={false} />
              </div>
              <span className="absolute -bottom-1 -right-1 text-xl">
                {tier === 'personal' ? '👤' : tier === 'business' ? '💼' : '👑'}
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

              <p className="text-xs sm:text-sm text-purple-100 font-semibold">
                মোবাইল: {user ? user.phone : 'লগইন করুন'} • একাউন্ট স্ট্যাটাস: <span className="text-emerald-300 font-bold">সক্রিয় 🟢</span>
              </p>

              <div className="flex items-center gap-2 pt-1 text-[11px] sm:text-xs text-white/90 font-medium">
                {tier === 'personal' && <span>রেগুলার ডিজিটাল সেবা পোর্টাল • ১০০% নিরাপদ ও বিশ্বস্ত</span>}
                {tier === 'business' && <span className="text-amber-200 font-bold">১৫% ফ্ল্যাট ছাড় সক্রিয় • কাস্টমার কাজের আনলিমিটেড এক্সেস</span>}
                {tier === 'sub_admin' && <span className="text-amber-300 font-black">🔥 ৫০% ফ্ল্যাট ছাড় সক্রিয় • অর্ধেক রেটে পাইকারি সার্ভিস এক্সেস</span>}
              </div>
            </div>
          </div>

          {/* Current Tier Wallet Balance Box */}
          <div className="bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4 shrink-0 shadow-lg">
            <div>
              <span className="text-xs font-bold text-purple-100 block">
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
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-purple-950 font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-amber-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
            >
              <PlusCircle className="w-4 h-4 text-purple-950" />
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
                  আপনার পার্সোনাল অ্যাকাউন্টের বর্তমান ব্যালেন্স ৳ ০। ব্যক্তিগত NID, ভোটার তথ্য, জন্ম নিবন্ধন ও অন্যান্য সেবা সচল করতে bKash বা Nagad দিয়ে এখনই ডিপোজিট করুন।
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
                    placeholder="TrxID ()"
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

              {/* Send Money Number Box with Smart One-Click Copy */}
              {currentDepositNumber && (
                <div 
                  onClick={handleCopyNumber}
                  title="নাম্বার কপি করতে ক্লিক করুন"
                  className={`group p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-2 shadow-2xs ${
                    copiedNumber 
                      ? 'bg-emerald-100 border-emerald-400 ring-2 ring-emerald-300' 
                      : depositMethod === 'bKash'
                      ? 'bg-gradient-to-r from-pink-50 via-rose-50 to-pink-50/50 border-pink-200 hover:border-pink-300'
                      : 'bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50/50 border-orange-200 hover:border-orange-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold text-slate-600">
                        {depositMethod === 'bKash' ? 'bKash মার্চেন্ট / পার্সোনাল নাম্বার' : 'নগদ পার্সোনাল নাম্বার'} (Send Money করুন)
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold">(ট্যাপ করে কপি)</span>
                    </div>
                    <div className={`text-base sm:text-lg font-black tracking-wider transition-colors mt-0.5 ${
                      copiedNumber 
                        ? 'text-emerald-800' 
                        : depositMethod === 'bKash' 
                        ? 'text-pink-700' 
                        : 'text-orange-700'
                    }`}>
                      {currentDepositNumber}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyNumber();
                    }}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs border flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer active:scale-95 ${
                      copiedNumber
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 hover:border-slate-400'
                    }`}
                  >
                    {copiedNumber ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-white animate-in zoom-in" />
                        <span>কপি হয়েছে!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-900" />
                        <span>কপি করুন</span>
                      </>
                    )}
                  </button>
                </div>
              )}

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
      {/* 6. SUB ADMIN TIER: EXCLUSIVE 50% HALF-PRICE PROMO HEADER */}
      {/* ============================================================== */}
      {tier === 'sub_admin' && (
        <div className="rounded-3xl bg-gradient-to-br from-[#3b0764] via-[#581c87] to-[#1e1b4b] text-white p-5 sm:p-7 shadow-2xl border-2 border-amber-400 relative overflow-hidden">
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-3 border-b border-purple-400/40">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl sm:text-3xl animate-bounce">💎</span>
                <div>
                  <h3 className="text-lg sm:text-2xl font-black text-amber-300 flex items-center gap-2">
                    <span>SUB-ADMIN PANEL (স্পেশাল অফার) 🔥</span>
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-purple-200">
                    💰 ডিপোজিট: মাত্র <span className="text-amber-300 font-black">২৯৫০৳</span> (১ দিনেই এক্টিভ) • লাভ ১০০% আপনার পকেটে
                  </p>
                </div>
              </div>
              <div className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-purple-950 font-black text-xs sm:text-sm shadow-md whitespace-nowrap">
                ⚡ ৫০% ফ্ল্যাট ছাড় (অর্ধেক রেট)
              </div>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-amber-400/40 flex items-center justify-between gap-2 flex-wrap">
              <span className="text-xs sm:text-sm font-bold text-amber-200">
                💥 সবচেয়ে বড় সুবিধা: বিজনেস একাউন্টের সব সার্ভিস পাবেন <strong>অর্ধেক দামে</strong>! নিয়ে ফুল প্রফিটে সেল করুন 💸
              </span>
              <button
                onClick={onOpenRecharge}
                className="px-4 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-purple-950 font-black text-xs transition-all shadow-md cursor-pointer"
              >
                এখনই ডিপোজিট করুন
              </button>
            </div>
          </div>
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
              placeholder={`${tier === 'personal' ? 'পার্সোনাল' : tier === 'business' ? 'বিজনেস' : 'Sub Admin পাইকারি'} সেবা খুঁজুন...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all shadow-xs"
            />
          </div>

          {/* 🟢 পরিবর্তন করুন (বিজনেস: ৩১ টি, সাব-এডমিন: ৭২ টি): */}
          <div className="text-xs font-bold text-slate-600 flex items-center gap-1.5 self-end sm:self-auto">
            <span>
              মোট সেবা: <strong>
                {tier === 'business' ? '৩১' : tier === 'sub_admin' ? '৭২' : filteredServices.length}
              </strong> টি
            </span>
          </div>
        </div>

        {/* Categories scrollable pill list */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories
            .filter(cat => tier !== 'personal' || personalCategories.includes(cat.id))
            .map(cat => {
              const label = tier === 'personal'
                ? (cat.id === 'nid' ? 'NID চেক' : cat.id === 'birth' ? 'জন্ম নিবন্ধন চেক' : cat.id === 'tax' ? 'TIN চেক' : cat.label)
                : cat.label;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCat(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCat === cat.id
                      ? `${colors.badge} shadow-xs`
                      : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  <span>{cat.icon} {label}</span>
                </button>
              );
            })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 8. SERVICES CATALOG GRID (Sub Admin shows 50% discount automatically) */}
      {/* ============================================================== */}
      <div className="relative">
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
                className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-purple-400 transition-all flex flex-col justify-between gap-3 group cursor-pointer"
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
                          tier === 'business' ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-purple-900 border border-purple-200 font-black'
                        }`}>
                          {tier === 'sub_admin' ? `🔥 অর্ধেক দাম (সেভ ৳${discountAmount})` : `সেভ ৳${discountAmount}`}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-purple-700 transition-colors leading-snug">
                      {service.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-700">
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
                ডিপোজিট সফল হলেই উপরের সকল সেবা আনলক হবে এবং আপনি তাৎক্ষণিক আবেদন করতে পারবেন।
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

      {/* ============================================================== */}
      {/* 9. SUB ADMIN EXCLUSIVE: স্পেশাল অফার চার্ট, সুবিধা, ইনকাম আইডিয়া */}
      {/* ============================================================== */}
      {tier === 'sub_admin' && (
        <div className="space-y-6 pt-4">
          
          {/* 9.1: 🔥 স্পেশাল অর্ধেক রেট চার্ট (প্রাইস কম্প্যারিজন) */}
          <div className="rounded-3xl bg-gradient-to-br from-purple-50 via-white to-amber-50/50 border-2 border-purple-300 p-5 sm:p-7 shadow-lg space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-purple-200">
              <div>
                <h3 className="text-base sm:text-lg font-black text-purple-950 flex items-center gap-2">
                  <span>🔥 সাব-এডমিন স্পেশাল অফার রেট চার্ট</span>
                  <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200">
                    ৫০% অফ
                  </span>
                </h3>
                <p className="text-xs text-purple-800 font-semibold">
                  অর্ধেক দামে সেবা নিয়ে ফুল প্রফিটে গ্রাহকদের কাছে বিক্রয় করুন
                </p>
              </div>
              <span className="text-xs font-bold text-slate-500">
                লাইভ হোলসেল রেট
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
              {halfRateServices.map((item, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-white border border-purple-100 shadow-xs flex flex-col justify-between hover:border-purple-300 transition-all">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-xs font-black text-slate-800 leading-tight">
                      {item.title}
                    </span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-baseline justify-between">
                    <span className="text-xs text-slate-400 line-through">
                      ৳{item.oldPrice}
                    </span>
                    <span className="text-sm sm:text-base font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                      🔥 ৳{item.newPrice}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-purple-900 text-white text-center text-xs sm:text-sm font-bold shadow-xs">
              💸 মানে আপনি প্রতিটি সার্ভিসে <strong>অর্ধেক মূল্যে</strong> সাব-এডমিন হিসেবে কিনে ফুল প্রফিটে বিক্রি করতে পারবেন!
            </div>
          </div>

          {/* 9.2: 🚀 আপনি কী কী পাবেন? */}
          <div className="rounded-3xl bg-white border-2 border-purple-200 p-5 sm:p-7 shadow-lg space-y-4">
            <h3 className="text-base sm:text-lg font-black text-purple-950 flex items-center gap-2 pb-2 border-b border-purple-100">
              <span className="text-xl">🚀</span>
              <span>Sub Admin হিসেবে আপনি কী কী পাবেন?</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { title: 'নিজের নামে Dashboard', desc: 'ব্যক্তিগত ব্রান্ডিং ও স্বয়ংক্রিয় প্যানেল', icon: '💻' },
                { title: 'সব সার্ভিস এক জায়গায়', desc: 'সরকারি ও বাণিজ্যিক সব ডিজিটাল সার্ভিস', icon: '📦' },
                { title: 'নিজে অর্ডার + নিজে ডেলিভারি', desc: 'কারো ওপর নির্ভর না করে সরাসরি হ্যান্ডলিং', icon: '⚡' },
                { title: 'লাভ ১০০% আপনার', desc: 'কোনো কমিশন কাটা যাবে না, সম্পূর্ণ প্রফিট আপনার', icon: '💰' },
                { title: 'মোবাইল দিয়েই কাজ সম্ভব', desc: 'ল্যাপটপ ছাড়াই স্মার্টফোন দিয়ে ফুল অপারেট', icon: '📱' },
                { title: 'কোনো অফিস / দোকান লাগবে না', desc: 'ঘরে বসেই পার্টটাইম বা ফুলটাইম পরিচালনা', icon: '🏠' },
              ].map((benefit, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-100 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 font-bold text-sm shadow-2xs">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-purple-950">{benefit.title}</h4>
                    <p className="text-[11px] text-slate-600 mt-0.5">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 9.3: 💼 কার জন্য পারফেক্ট? এবং 💸 ইনকাম আইডিয়া (রিয়েল) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            
            {/* কার জন্য পারফেক্ট? */}
            <div className="rounded-3xl bg-gradient-to-br from-indigo-50/90 via-white to-purple-50 p-5 sm:p-6 border-2 border-indigo-200 shadow-md space-y-3.5">
              <h4 className="text-sm sm:text-base font-black text-indigo-950 flex items-center gap-2 pb-2 border-b border-indigo-100">
                <span>💼 কার জন্য এই প্যানেল পারফেক্ট?</span>
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm font-bold text-slate-800">
                <li className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-indigo-100 shadow-2xs">
                  <span className="text-emerald-600 text-base">✔️</span>
                  <span>দোকানদার (Flexiload / Computer shop / সাইবার ক্যাফে)</span>
                </li>
                <li className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-indigo-100 shadow-2xs">
                  <span className="text-emerald-600 text-base">✔️</span>
                  <span>অনলাইনে ঘরে বসে স্বাধীন ইনকাম করতে চান যারা</span>
                </li>
                <li className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-indigo-100 shadow-2xs">
                  <span className="text-emerald-600 text-base">✔️</span>
                  <span>ছাত্র-ছাত্রী / পার্টটাইম বাড়তি কাজের সন্ধানী</span>
                </li>
                <li className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-indigo-100 shadow-2xs">
                  <span className="text-emerald-600 text-base">✔️</span>
                  <span>যারা নিজের গ্রাহকদের সর্বোচ্চ মূল্যে সার্ভিস দিয়ে বড় প্রফিট রাখতে চান</span>
                </li>
              </ul>
            </div>

            {/* 💸 ইনকাম আইডিয়া (রিয়েল) */}
            <div className="rounded-3xl bg-gradient-to-br from-amber-50 via-yellow-50/60 to-orange-50 p-5 sm:p-6 border-2 border-amber-300 shadow-md space-y-3.5 flex flex-col justify-between">
              <div className="space-y-3">
                <h4 className="text-sm sm:text-base font-black text-amber-950 flex items-center gap-2 pb-2 border-b border-amber-200">
                  <span>💸 ইনকাম আইডিয়া (বাস্তব হিসাব)</span>
                </h4>
                <div className="space-y-2.5">
                  <div className="p-3 rounded-2xl bg-white border border-amber-200 flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold text-slate-700">👉 দিনে মাত্র ৫টি সাধারণ অর্ডার</span>
                    <span className="text-xs sm:text-sm font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      ৯০০৳ – ১৮০০৳ দৈনিক লাভ
                    </span>
                  </div>
                  <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex items-center justify-between shadow-md">
                    <span className="text-xs sm:text-sm font-bold">👉 মাসে সম্ভাব্য নেট ইনকাম</span>
                    <span className="text-sm sm:text-base font-black text-amber-300">
                      ১৮,০০০৳ – ৩০,০০০৳+ 🔥
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-[11px] font-semibold text-amber-900/80">
                💡 কোনো অতিরিক্ত ইনভেস্টমেন্ট বা ঝুঁকি নেই, যেকোনো সময় অর্ডার সম্পন্ন করুন।
              </div>
            </div>

          </div>

          {/* 9.4: 🚨 LIMITED OFFER সতর্কতা ও কল-টু-অ্যাকশন */}
          <div className="rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white p-5 sm:p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-black uppercase">
                <span>🚨 LIMITED OFFER</span>
              </div>
              <h4 className="text-base sm:text-lg font-black text-white">
                ⚠️ মাত্র কয়েকটি সিট খালি • আগে আসলে আগে পাবেন
              </h4>
              <p className="text-xs text-rose-100 font-medium">
                💥 আজ এই অফারে সাব-এডমিন না নিলে পরে আফসোস করবেন! ডিপোজিট করে আজই প্যানেল সক্রিয় করুন।
              </p>
            </div>

            <button
              onClick={onOpenRecharge}
              className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-purple-950 font-black text-xs sm:text-sm shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
            >
              🔥 ২৯৫০৳ ডিপোজিট করে এক্টিভ করুন
            </button>
          </div>

        </div>
      )}

      {/* ============================================================== */}
      {/* 10. PERSONAL TIER: RULES, RESTRICTIONS & RECOMMENDATION BOX */}
      {/* ============================================================== */}
      {tier === 'personal' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl bg-gradient-to-br from-rose-50/95 via-white to-amber-50/80 border-2 border-rose-300/80 p-4 sm:p-7 shadow-lg space-y-4 sm:space-y-5 relative overflow-hidden"
        >
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-rose-200/30 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-200/30 rounded-full blur-3xl pointer-events-none -ml-16 -mb-16"></div>

          {/* Header */}
          <div className="flex items-center gap-2.5 sm:gap-3 pb-3 border-b border-rose-200/70 relative z-10">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-rose-600 via-red-500 to-amber-500 text-white flex items-center justify-center text-base sm:text-lg font-black shadow-md shadow-rose-500/25 shrink-0">
              ⚠️
            </div>
            <div>
              <h3 className="text-sm sm:text-base md:text-lg font-black text-rose-950 flex items-center gap-2">
                <span>পার্সোনাল অ্যাকাউন্টের ব্যবহারের নিয়ম ও সীমাবদ্ধতা</span>
              </h3>
              <p className="text-[10px] sm:text-xs font-semibold text-rose-800/80">
                অ্যাকাউন্ট ব্যবহারের পূর্বে নিচের গুরুত্বপূর্ণ শর্তগুলো জেনে নিন
              </p>
            </div>
          </div>

          {/* Two Red Warning Restriction Boxes (❌) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 relative z-10">
            {/* Restriction 1 */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="p-3.5 sm:p-4 rounded-2xl bg-white/95 border-2 border-rose-200 shadow-xs flex items-start gap-2.5 sm:gap-3 hover:border-rose-400 transition-all"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-rose-100 border border-rose-300 text-rose-700 flex items-center justify-center text-xs sm:text-sm font-black shrink-0 mt-0.5 shadow-2xs">
                ❌
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs sm:text-sm md:text-base font-black text-rose-900 leading-snug">
                  কাস্টমারের কাজ করা যাবে না।
                </h4>
                <p className="text-[11px] sm:text-xs font-medium text-slate-600 leading-relaxed">
                  এই অ্যাকাউন্ট শুধুমাত্র নিজস্ব ব্যবহারের জন্য। দোকানদার বা বাইরের কোনো কাস্টমারের কাজ বা সেবা দেওয়া যাবে না।
                </p>
              </div>
            </motion.div>

            {/* Restriction 2 */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="p-3.5 sm:p-4 rounded-2xl bg-white/95 border-2 border-rose-200 shadow-xs flex items-start gap-2.5 sm:gap-3 hover:border-rose-400 transition-all"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-rose-100 border border-rose-300 text-rose-700 flex items-center justify-center text-xs sm:text-sm font-black shrink-0 mt-0.5 shadow-2xs">
                ❌
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs sm:text-sm md:text-base font-black text-rose-900 leading-snug">
                  ইনকামের সুযোগ নেই।
                </h4>
                <p className="text-[11px] sm:text-xs font-medium text-slate-600 leading-relaxed">
                  এটিতে কোনো কমিশন, অতিরিক্ত মার্জিন বা ব্যবসায়িক ইনকামের সুবিধা নেই। কাস্টমারের কাজ করে ইনকাম করতে চাইলে বিজনেস অ্যাকাউন্ট নিন।
                </p>
              </div>
            </motion.div>
          </div>

          {/* Golden Advisory Box (💡) */}
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="p-3.5 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-100/90 via-yellow-100/85 to-amber-50 border-2 border-amber-400/90 shadow-md flex items-start gap-3 sm:gap-3.5 relative z-10"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-950 flex items-center justify-center text-lg sm:text-xl font-black shrink-0 mt-0.5 shadow-md shadow-amber-500/25 ring-2 ring-white">
              💡
            </div>
            <div className="space-y-0.5 sm:space-y-1">
              <h4 className="text-xs sm:text-base md:text-lg font-black text-amber-950 leading-snug">
                শুধু নিজের প্রয়োজন হলে এই অ্যাকাউন্টই যথেষ্ট।
              </h4>
              <p className="text-[11px] sm:text-sm font-semibold text-amber-900/90 leading-relaxed">
                আপনার নিজের বা পরিবারের NID, জন্ম নিবন্ধন ও TIN চেক করার মতো ব্যক্তিগত কাজের জন্য অতিরিক্ত খরচে বিজনেস অ্যাকাউন্ট নেওয়ার দরকার নেই — এই পার্সোনাল অ্যাকাউন্টটিই আপনার জন্য সম্পূর্ণ যথেষ্ট!
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Return to Dashboard Bottom CTA */}
      <div className="flex justify-center pt-2 pb-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm sm:text-base shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:shadow-emerald-600/35 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer active:scale-98 group"
        >
          <ArrowLeft className="w-5 h-5 text-emerald-100 group-hover:-translate-x-1 transition-transform" />
          <LayoutDashboard className="w-5 h-5 text-emerald-100" />
          <span>মূল ড্যাশবোর্ডে ফিরে যান</span>
        </button>
      </div>

    </div>
  );
};