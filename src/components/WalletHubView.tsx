import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { HeroBanner } from './HeroBanner';
import { 
  PlusCircle, 
  ArrowDownCircle, 
  History, 
  Copy, 
  Check, 
  RefreshCw, 
  CreditCard,
  Building2,
  ChevronRight,
  Award,
  Crown,
  ArrowLeft,
  LayoutDashboard,
  Sparkles,
  ShieldCheck,
  Zap,
  Clock
} from 'lucide-react';
import { AccountTier } from '../types';
import { TIER_PRICES } from '../data/tierPlans';

export const WalletHubView: React.FC = () => {
  const { 
    user, 
    transactions, 
    addBalance, 
    withdrawBalance, 
    setActiveTab,
    showToast 
  } = useApp();

  // Active view tier: Defaults to logged-in user's active tier (e.g. 'personal' or 'business')
  const [selectedViewTier, setSelectedViewTier] = useState<AccountTier>(() => user?.activeTier || 'personal');
  const [txFilter, setTxFilter] = useState<'all' | AccountTier>('all');

  // Keep synced if user's active tier changes
  useEffect(() => {
    if (user?.activeTier) {
      setSelectedViewTier(user.activeTier);
    }
  }, [user?.activeTier]);

  // Sync deposit target when changing selectedViewTier
  const handleSelectViewTier = (tier: AccountTier) => {
    setSelectedViewTier(tier);
    if (tier === 'personal') setDepositAmount('500');
    else if (tier === 'business') setDepositAmount('1450');
    else setDepositAmount('2950');
  };

  // Add Balance Form State
  const [depositMethod, setDepositMethod] = useState<'bKash' | 'Nagad'>('bKash');
  const [depositPhone, setDepositPhone] = useState('');
  const [depositTrxId, setDepositTrxId] = useState('');
  const [depositAmount, setDepositAmount] = useState(() => 
    user?.activeTier === 'business' ? '1450' : user?.activeTier === 'sub_admin' ? '2950' : '500'
  );
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [isDepositSubmitting, setIsDepositSubmitting] = useState(false);

  // Withdraw Form State
  const [withdrawMethod, setWithdrawMethod] = useState<'bKash' | 'Nagad' | 'Bank' | 'Card'>('bKash');
  const [withdrawAccount, setWithdrawAccount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [isWithdrawSubmitting, setIsWithdrawSubmitting] = useState(false);

  // বিকাশ ও নগদের নাম্বার (ব্যবহারকারী কপি করে সেন্ড মানি / পেমেন্ট করবেন)
  const bkashNumber = '01603054567';
  const nagadNumber = '01350084236';

  // নির্বাচিত মেথড অনুযায়ী বর্তমান নাম্বার
  const currentDepositNumber = depositMethod === 'bKash' ? bkashNumber : nagadNumber;

  // ১০০% নির্ভরযোগ্য কপি ফাংশন (যেকোনো মোবাইল ও ব্রাউজারে কাজ করবে)
  const handleCopyNumber = async () => {
    const rawDigits = currentDepositNumber.replace(/[^0-9]/g, '');
    let isCopied = false;

    // ১. মডার্ন Clipboard API ট্রাই করবে
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(rawDigits);
        isCopied = true;
      } catch {
        isCopied = false;
      }
    }

    // ২. যদি ব্রাউজার পারমিশন না দেয়, নির্ভরযোগ্য ফলব্যাক (Fallback)
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
    showToast(`${depositMethod} নাম্বার (${currentDepositNumber}) কপি হয়েছে! সেন্ড মানি করুন।`);
    setTimeout(() => setCopiedNumber(false), 2500);
  };

  const handleDepositSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(depositAmount);
    if (isNaN(num) || num <= 0) {
      showToast('দয়া করে সঠিক টাকার পরিমাণ দিন।');
      return;
    }
    setIsDepositSubmitting(true);
    try {
      const res = await addBalance(num, depositMethod, depositTrxId, depositPhone, selectedViewTier);
      if (res.success) {
        setDepositPhone('');
        setDepositTrxId('');
      }
    } finally {
      setIsDepositSubmitting(false);
    }
  };

  const handleWithdrawSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(withdrawAmount);
    if (isNaN(num) || num < 100) {
      showToast('সর্বনিম্ন উইথড্র পরিমাণ ৳১০০ টাকা।');
      return;
    }

    const availableBal = user?.tierBalances?.[selectedViewTier] ?? 0;
    if (num > availableBal) {
      const tierTitle = selectedViewTier === 'personal' ? 'পার্সোনাল' : selectedViewTier === 'sub_admin' ? 'সাব-এডমিন' : 'বিজনেস';
      showToast(`আপনার ${tierTitle} একাউন্টে পর্যাপ্ত ব্যালেন্স নেই (বর্তমান: ৳${availableBal.toLocaleString('bn-BD')})।`);
      return;
    }

    setIsWithdrawSubmitting(true);
    try {
      const res = await withdrawBalance(num, withdrawMethod, withdrawAccount, selectedViewTier);
      if (res.success) {
        setWithdrawAccount('');
        setWithdrawAmount('');
      }
    } finally {
      setIsWithdrawSubmitting(false);
    }
  };

  const filteredTransactions = transactions.filter(tx => tx.accountType === selectedViewTier);

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <HeroBanner variant="wallet" />

      {/* Top Navigation & Account Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/90 shadow-xs">
        <button
          type="button"
          onClick={() => setActiveTab('dashboard')}
          className="inline-flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-800 hover:text-emerald-700 font-extrabold text-xs sm:text-sm border border-slate-200 hover:border-emerald-300 transition-all duration-200 hover:-translate-x-0.5 cursor-pointer shadow-xs group"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-600 group-hover:-translate-x-1 transition-transform" />
          <LayoutDashboard className="w-4 h-4 text-emerald-600" />
          <span>মূল ড্যাশবোর্ডে ফিরে যান</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-slate-600 hidden sm:inline">অ্যাকাউন্ট ভিউ:</span>
          <span className={`text-xs font-black px-3.5 py-1.5 rounded-xl border shadow-2xs flex items-center gap-1.5 ${
            selectedViewTier === 'personal' 
              ? 'bg-blue-50 text-blue-800 border-blue-200' 
              : selectedViewTier === 'sub_admin'
              ? 'bg-purple-50 text-purple-800 border-purple-200'
              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
          }`}>
            <span>{selectedViewTier === 'personal' ? '👤' : selectedViewTier === 'business' ? '💼' : '★'}</span>
            <span>{selectedViewTier === 'personal' ? 'পার্সোনাল অ্যাকাউন্ট' : selectedViewTier === 'sub_admin' ? 'সাব-এডমিন প্যানেল' : 'বিজনেস অ্যাকাউন্ট'}</span>
          </span>
        </div>
      </div>

      {/* Single Dedicated Account Card View based on selectedViewTier */}
      <div className="max-w-2xl mx-auto w-full">
        
        {/* 1. Personal Account Only (Blue Theme) */}
        {selectedViewTier === 'personal' && (
          <div className="rounded-3xl border-2 border-blue-400 bg-gradient-to-b from-blue-50/80 via-white to-blue-50/50 p-5 sm:p-7 flex flex-col justify-between shadow-xl relative overflow-hidden transition-all animate-in fade-in zoom-in-95 duration-200">
            <div>
              <div className="w-full py-2 px-4 rounded-full bg-blue-600 text-white font-extrabold text-center text-xs sm:text-sm tracking-wide shadow-sm flex items-center justify-center gap-2">
                <span>👤</span>
                <span>Personal Account (পার্সোনাল অ্যাকাউন্ট)</span>
              </div>

              <div className="flex flex-col items-center my-5">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-3xl sm:text-4xl shadow-inner border-2 border-blue-200">
                  👤
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-500 mt-3">
                  আপনার পার্সোনাল ব্যালেন্স
                </span>
                <span className="text-3xl sm:text-5xl font-black text-blue-700 tracking-tight my-1">
                  ৳ {(user?.tierBalances?.personal ?? 0).toLocaleString('bn-BD', { minimumFractionDigits: 2 })}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  (প্রথম ডিপোজিট: ৳৫০০)
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-blue-100">
              <button
                type="button"
                onClick={() => {
                  setDepositAmount('500');
                  document.getElementById('add-balance-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-extrabold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>পার্সোনাল অ্যাকাউন্টে ব্যালেন্স যোগ করুন</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById('withdraw-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="py-2.5 px-3 rounded-xl bg-white hover:bg-blue-50 text-blue-700 border border-blue-300 text-xs font-extrabold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                >
                  <ArrowDownCircle className="w-3.5 h-3.5" />
                  <span>উইথড্র করুন</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTxFilter('personal');
                    document.getElementById('recent-transactions')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="py-2.5 px-3 rounded-xl bg-white hover:bg-blue-50 text-blue-700 border border-blue-300 text-xs font-extrabold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                >
                  <History className="w-3.5 h-3.5" />
                  <span>লেনদেন ইতিহাস</span>
                </button>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('dashboard')}
                className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-300 text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs group"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-blue-600 group-hover:-translate-x-0.5 transition-transform" />
                <LayoutDashboard className="w-3.5 h-3.5 text-blue-600" />
                <span>মূল ড্যাশবোর্ডে ফিরে যান</span>
              </button>
            </div>
          </div>
        )}

        {/* 2. Business Account Only (Green Theme, "Most Popular" Crown) */}
        {selectedViewTier === 'business' && (
          <div className="rounded-3xl border-2 border-emerald-500 bg-gradient-to-b from-emerald-50/90 via-white to-green-50/60 p-5 sm:p-7 flex flex-col justify-between shadow-xl relative overflow-hidden transition-all animate-in fade-in zoom-in-95 duration-200">
            <div className="absolute top-0 right-5 px-3.5 py-1 rounded-b-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-black flex items-center gap-1.5 shadow-md">
              <Crown className="w-3.5 h-3.5 fill-white" /> Most Popular
            </div>

            <div>
              <div className="w-full py-2 px-4 rounded-full bg-emerald-600 text-white font-extrabold text-center text-xs sm:text-sm tracking-wide shadow-sm flex items-center justify-center gap-2">
                <span>💼</span>
                <span>Business Account (বিজনেস অ্যাকাউন্ট)</span>
              </div>

              <div className="flex flex-col items-center my-5">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-3xl sm:text-4xl shadow-inner border-2 border-emerald-300">
                  💼
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-500 mt-3">
                  আপনার বিজনেস ব্যালেন্স
                </span>
                <span className="text-3xl sm:text-5xl font-black text-emerald-700 tracking-tight my-1">
                  ৳ {(user?.tierBalances?.business ?? 0).toLocaleString('bn-BD', { minimumFractionDigits: 2 })}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  (প্রথম ডিপোজিট: ৳{TIER_PRICES.business.toLocaleString('en-US')})
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-emerald-100">
              <button
                type="button"
                onClick={() => {
                  setDepositAmount('1450');
                  document.getElementById('add-balance-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-600 text-white text-sm font-extrabold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>বিজনেস অ্যাকাউন্টে ব্যালেন্স যোগ করুন</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById('withdraw-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="py-2.5 px-3 rounded-xl bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-300 text-xs font-extrabold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                >
                  <ArrowDownCircle className="w-3.5 h-3.5" />
                  <span>উইথড্র করুন</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTxFilter('business');
                    document.getElementById('recent-transactions')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="py-2.5 px-3 rounded-xl bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-300 text-xs font-extrabold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                >
                  <History className="w-3.5 h-3.5" />
                  <span>লেনদেন ইতিহাস</span>
                </button>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('dashboard')}
                className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 hover:border-emerald-300 text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs group"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-emerald-600 group-hover:-translate-x-0.5 transition-transform" />
                <LayoutDashboard className="w-3.5 h-3.5 text-emerald-600" />
                <span>মূল ড্যাশবোর্ডে ফিরে যান</span>
              </button>
            </div>
          </div>
        )}

        {/* 3. Sub Admin Panel Only (Purple Theme) */}
        {selectedViewTier === 'sub_admin' && (
          <div className="rounded-3xl border-2 border-purple-400 bg-gradient-to-b from-purple-50/90 via-white to-indigo-50/60 p-5 sm:p-7 flex flex-col justify-between shadow-xl relative overflow-hidden transition-all animate-in fade-in zoom-in-95 duration-200">
            <div className="absolute top-0 right-5 px-3.5 py-1 rounded-b-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-amber-950 text-xs font-black flex items-center gap-1.5 shadow-md">
              <Award className="w-3.5 h-3.5 fill-amber-700" /> Recommended
            </div>

            <div>
              <div className="w-full py-2 px-4 rounded-full bg-purple-700 text-white font-extrabold text-center text-xs sm:text-sm tracking-wide shadow-sm flex items-center justify-center gap-2">
                <span>★</span>
                <span>Sub Admin Panel (সাব-এডমিন প্যানেল)</span>
              </div>

              <div className="flex flex-col items-center my-5">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-3xl sm:text-4xl shadow-inner border-2 border-purple-300">
                  ★
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-500 mt-3">
                  আপনার সাব-এডমিন ব্যালেন্স
                </span>
                <span className="text-3xl sm:text-5xl font-black text-purple-800 tracking-tight my-1">
                  ৳ {(user?.tierBalances?.sub_admin ?? 0).toLocaleString('bn-BD', { minimumFractionDigits: 2 })}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  (প্রথম ডিপোজিট: ৳{TIER_PRICES.sub_admin.toLocaleString('en-US')})
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-purple-100">
              <button
                type="button"
                onClick={() => {
                  setDepositAmount('2950');
                  document.getElementById('add-balance-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-purple-700 via-indigo-600 to-amber-600 hover:from-purple-600 hover:to-amber-500 text-white text-sm font-extrabold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>সাব-এডমিন অ্যাকাউন্টে ব্যালেন্স যোগ করুন</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById('withdraw-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="py-2.5 px-3 rounded-xl bg-white hover:bg-purple-50 text-purple-700 border border-purple-300 text-xs font-extrabold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                >
                  <ArrowDownCircle className="w-3.5 h-3.5" />
                  <span>উইথড্র করুন</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTxFilter('sub_admin');
                    document.getElementById('recent-transactions')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="py-2.5 px-3 rounded-xl bg-white hover:bg-purple-50 text-purple-700 border border-purple-300 text-xs font-extrabold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                >
                  <History className="w-3.5 h-3.5" />
                  <span>লেনদেন ইতিহাস</span>
                </button>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('dashboard')}
                className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-purple-50 text-slate-700 hover:text-purple-700 border border-slate-200 hover:border-purple-300 text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs group"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-purple-600 group-hover:-translate-x-0.5 transition-transform" />
                <LayoutDashboard className="w-3.5 h-3.5 text-purple-600" />
                <span>মূল ড্যাশবোর্ডে ফিরে যান</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Middle Two Columns: Add Balance & Withdraw Forms */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
        
        {/* Left Column: ব্যালেন্স অ্যাড করুন (Add Balance Form) */}
        <div 
          id="add-balance-form" 
          className={`rounded-3xl bg-white border shadow-md p-4 sm:p-6 space-y-4 transition-all ${
            selectedViewTier === 'personal'
              ? 'border-blue-200/90'
              : selectedViewTier === 'business'
              ? 'border-emerald-200/90'
              : 'border-purple-200/90'
          }`}
        >
          <div className={`flex items-center justify-between pb-2 border-b ${
            selectedViewTier === 'personal'
              ? 'border-blue-100'
              : selectedViewTier === 'business'
              ? 'border-emerald-100'
              : 'border-purple-100'
          }`}>
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm ${
                selectedViewTier === 'personal'
                  ? 'bg-blue-100 text-blue-700'
                  : selectedViewTier === 'business'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-purple-100 text-purple-700'
              }`}>
                +
              </div>
              <h2 className="text-base sm:text-lg font-black text-slate-800">
                {selectedViewTier === 'personal' 
                  ? 'পার্সোনাল ওয়ালেটে ব্যালেন্স অ্যাড করুন' 
                  : selectedViewTier === 'business' 
                  ? 'বিজনেস ওয়ালেটে ব্যালেন্স অ্যাড করুন' 
                  : 'সাব-এডমিন ওয়ালেটে ব্যালেন্স অ্যাড করুন'}
              </h2>
            </div>
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
              selectedViewTier === 'personal'
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : selectedViewTier === 'business'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-purple-50 text-purple-700 border-purple-200'
            }`}>
              {selectedViewTier === 'personal' ? '👤 পার্সোনাল একাউন্ট' : selectedViewTier === 'sub_admin' ? '★ সাব-এডমিন প্যানেল' : '💼 বিজনেস একাউন্ট'}
            </span>
          </div>

          <p className="text-xs font-semibold text-slate-600">
            আপনার বিকাশ/নগদ নম্বর থেকে সেন্ড মানি করার পর নিচের তথ্য দিন।
          </p>

          {/* bKash & Nagad Selector Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setDepositMethod('bKash')}
              className={`p-2.5 rounded-2xl border-2 flex items-center justify-center gap-2 font-black text-sm transition-all cursor-pointer ${
                depositMethod === 'bKash'
                  ? 'border-pink-500 bg-pink-50 text-pink-700 ring-2 ring-pink-200'
                  : 'border-slate-200 hover:border-pink-300 text-slate-700'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-pink-600 text-white flex items-center justify-center text-[10px]">
                ৳
              </span>
              <span>bKash বিকাশ</span>
            </button>

            <button
              type="button"
              onClick={() => setDepositMethod('Nagad')}
              className={`p-2.5 rounded-2xl border-2 flex items-center justify-center gap-2 font-black text-sm transition-all cursor-pointer ${
                depositMethod === 'Nagad'
                  ? 'border-orange-500 bg-orange-50 text-orange-700 ring-2 ring-orange-200'
                  : 'border-slate-200 hover:border-orange-300 text-slate-700'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-orange-600 text-white flex items-center justify-center text-[10px]">
                ৳
              </span>
              <span>নগদ Nagad</span>
            </button>
          </div>

          {/* Send Money Number Box with Smart One-Click Copy (Only if number is configured) */}
          {currentDepositNumber ? (
            <div 
              onClick={handleCopyNumber}
              title="নাম্বার কপি করতে ক্লিক করুন"
              className={`group p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-2 shadow-xs ${
                copiedNumber 
                  ? 'bg-emerald-100 border-emerald-400 ring-2 ring-emerald-300' 
                  : depositMethod === 'bKash'
                  ? 'bg-gradient-to-r from-pink-50 via-rose-50 to-pink-50/50 border-pink-200 hover:border-pink-400'
                  : 'bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50/50 border-orange-200 hover:border-orange-400'
              }`}
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-slate-600">
                    {depositMethod === 'bKash' ? 'bKash মার্চেন্ট / পার্সোনাল নাম্বার' : 'নগদ পার্সোনাল নাম্বার'} (Send Money করুন)
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">(ট্যাপ করে কপি)</span>
                </div>
                <div className={`text-lg sm:text-xl font-black tracking-wider transition-colors ${
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
                className={`px-3 py-1.5 rounded-xl font-bold text-xs border flex items-center gap-1.5 shadow-xs transition-all cursor-pointer active:scale-95 ${
                  copiedNumber
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 group-hover:border-slate-400'
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
          ) : null}

          {/* Form Fields */}
          <form onSubmit={handleDepositSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                আপনার প্রেরক মোবাইল নাম্বার দিন
              </label>
              <input
                type="text"
                value={depositPhone}
                onChange={(e) => setDepositPhone(e.target.value)}
                placeholder="01XXXXXXXXX"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none text-sm font-medium transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ট্রানজেকশন আইডি দিন (TrxID)
              </label>
              <input
                type="text"
                value={depositTrxId}
                onChange={(e) => setDepositTrxId(e.target.value)}
                placeholder="যেমন: BK9A72LK19"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none text-sm font-medium uppercase transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700">
                  কত টাকা পাঠিয়েছেন?
                </label>
                <span className="text-[11px] font-bold text-slate-500">
                  টার্গেট: {selectedViewTier === 'personal' ? 'পার্সোনাল (৳৫০০)' : selectedViewTier === 'sub_admin' ? 'সাব-এডমিন (৳২,৯৫০)' : 'বিজনেস (৳১,৪৫০)'}
                </span>
              </div>
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="যেমন: 500 বা 1450"
                min="10"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none text-sm font-medium transition-all"
              />

              {/* Quick Select Buttons */}
              <div className="flex items-center gap-1.5 flex-wrap pt-2">
                <span className="text-[10px] font-bold text-slate-400">দ্রুত নির্বাচন:</span>
                {(selectedViewTier === 'personal' 
                  ? [500, 1000, 2000, 5000]
                  : selectedViewTier === 'business'
                  ? [1450, 2500, 5000, 10000]
                  : [2950, 5000, 10000, 20000]
                ).map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setDepositAmount(amt.toString())}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      depositAmount === amt.toString()
                        ? selectedViewTier === 'personal'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : selectedViewTier === 'business'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-purple-700 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    ৳{amt.toLocaleString('bn-BD')}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isDepositSubmitting}
              className={`w-full py-3.5 rounded-2xl text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-all duration-300 cursor-pointer disabled:opacity-60 ${
                selectedViewTier === 'personal'
                  ? 'bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-blue-600/20 hover:shadow-blue-500/35 hover:-translate-y-0.5 active:translate-y-0'
                  : selectedViewTier === 'business'
                  ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-600 shadow-emerald-600/20 hover:shadow-emerald-500/35 hover:-translate-y-0.5 active:translate-y-0'
                  : 'bg-gradient-to-r from-purple-700 via-indigo-600 to-amber-600 hover:from-purple-600 hover:to-amber-500 shadow-purple-600/20 hover:shadow-purple-500/35 hover:-translate-y-0.5 active:translate-y-0'
              }`}
            >
              {isDepositSubmitting ? (
                <span>যাচাই করা হচ্ছে...</span>
              ) : (
                <>
                  <span>
                    {selectedViewTier === 'personal' ? 'পার্সোনাল ওয়ালেটে জমা দিন' : selectedViewTier === 'sub_admin' ? 'সাব-এডমিন ওয়ালেটে জমা দিন' : 'বিজনেস ওয়ালেটে জমা দিন'}
                  </span>
                  <span className="transition-transform group-hover:translate-x-1">➔</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Personal Animated Showcase OR Business/Sub-Admin Withdraw Form */}
        {selectedViewTier === 'personal' ? (
          <div 
            id="withdraw-form"
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#022f66] via-[#044a9e] to-[#011e42] text-white p-5 sm:p-7 shadow-xl border-2 border-blue-400/50 flex flex-col justify-between space-y-5 animate-in fade-in zoom-in-95 duration-300 min-h-[460px]"
          >
            <style>{`
              @keyframes pw-particle {
                0% { transform: translateY(15px) scale(0.7) rotate(0deg); opacity: 0; }
                25% { opacity: 0.9; }
                75% { opacity: 0.9; }
                100% { transform: translateY(-140px) scale(1.15) rotate(240deg); opacity: 0; }
              }
              @keyframes pw-glow {
                0%, 100% { transform: scale(1); opacity: 0.45; }
                50% { transform: scale(1.25); opacity: 0.8; }
              }
              @keyframes pw-spin {
                to { transform: rotate(360deg); }
              }
              @keyframes pw-shimmer {
                0% { background-position: -200% 0; }
                100% { background-position: 200% 0; }
              }
              .pw-particle-item { position: absolute; bottom: 10px; animation: pw-particle linear infinite; pointer-events: none; }
              .pw-glow-orb { animation: pw-glow 4s ease-in-out infinite; }
              .pw-spinning { animation: pw-spin 12s linear infinite; }
              .pw-shimmer-txt {
                background-size: 200% 100%;
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
                animation: pw-shimmer 3s linear infinite;
              }
            `}</style>

            {/* Glowing Ambient Orbs */}
            <div className="pw-glow-orb absolute -top-12 -right-12 w-48 h-48 rounded-full bg-cyan-400/25 blur-3xl pointer-events-none" />
            <div className="pw-glow-orb absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-blue-500/30 blur-3xl pointer-events-none" style={{ animationDelay: '2s' }} />

            {/* Floating Particles */}
            {[
              { left: '10%', delay: '0s', dur: '5s', icon: '✨', size: 'text-base' },
              { left: '28%', delay: '1.5s', dur: '6s', icon: '⚡', size: 'text-sm' },
              { left: '50%', delay: '0.8s', dur: '5.5s', icon: '💎', size: 'text-xs' },
              { left: '72%', delay: '2.2s', dur: '6.5s', icon: '🛡️', size: 'text-sm' },
              { left: '88%', delay: '1.1s', dur: '5.2s', icon: '✨', size: 'text-base' },
            ].map((p, i) => (
              <span
                key={i}
                className={`pw-particle-item ${p.size} select-none drop-shadow`}
                style={{ left: p.left, animationDelay: p.delay, animationDuration: p.dur }}
              >
                {p.icon}
              </span>
            ))}

            <div className="relative z-10 space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/15">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center text-lg shadow-md shadow-blue-500/30">
                    <span className="relative">👤</span>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-1.5">
                      <span>পার্সোনাল স্মার্ট সেবা হাব</span>
                      <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
                    </h3>
                    <p className="text-[11px] text-blue-200 font-medium">ব্যক্তিগত গ্রাহক পোর্টাল</p>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-400/20 border border-emerald-400/40 text-emerald-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>১০০% ডিরেক্ট সার্ভিস</span>
                </span>
              </div>

              {/* Animated Center Spotlight */}
              <div className="py-2.5 px-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-3.5">
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center shrink-0">
                  <div className="pw-spinning absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/60" />
                  <div className="absolute inset-1.5 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-700 shadow-inner flex items-center justify-center text-2xl">
                    ⚡
                  </div>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider block">
                    উইথড্র প্রয়োজন নেই
                  </span>
                  <h4 
                    className="pw-shimmer-txt text-xs sm:text-sm font-black tracking-tight"
                    style={{
                      backgroundImage: 'linear-gradient(90deg, #ffffff 0%, #38bdf8 30%, #fef08a 60%, #ffffff 100%)'
                    }}
                  >
                    সরাসরি আবেদন ও তাত্ক্ষণিক ডেলিভারি!
                  </h4>
                  <p className="text-[11px] text-blue-100/80 leading-relaxed font-medium">
                    পার্সোনাল অ্যাকাউন্টে কোনো ব্যালেন্স জমা রাখতে হয় না, সরাসরি যেকোনো সেবায় আবেদন করুন।
                  </p>
                </div>
              </div>

              {/* 3 Animated Micro Feature Pills */}
              <div className="space-y-2">
                {[
                  {
                    icon: <Clock className="w-4 h-4 text-cyan-300 shrink-0" />,
                    title: '১-৫ মিনিটে দ্রুত ডেলিভারি',
                    desc: 'অটোমেটিক সার্ভার ভেরিফিকেশনে তাৎক্ষণিক ডিজিটাল কপি'
                  },
                  {
                    icon: <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />,
                    title: '১০০% অফিসিয়াল ও অথেনটিক',
                    desc: 'সরকারি ডেটাবেজ ও এনক্রিপ্টেড প্রটোকলে সরাসরি কানেক্টেড'
                  }
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-start gap-2.5 group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-black text-white block">{item.title}</span>
                      <span className="text-[10px] text-blue-200/80 font-medium block leading-tight">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Upgrade Notice for Earning / Withdraw */}
              <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-amber-500/10 border border-amber-400/30 flex items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <span className="text-xs font-black text-amber-300 flex items-center gap-1">
                    <span>💼 ইনকাম ও উইথড্র করতে চান?</span>
                  </span>
                  <p className="text-[10px] text-amber-100/90 font-medium">
                    কাস্টমারের কাজ করতে বিজনেস বা সাব-এডমিন একাউন্টে স্যুইচ করুন
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleSelectViewTier('business')}
                    className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black shadow-xs transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    💼 বিজনেস
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectViewTier('sub_admin')}
                    className="px-2.5 py-1 rounded-lg bg-purple-700 hover:bg-purple-600 text-white text-[10px] font-black shadow-xs transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    ★ সাব-এডমিন
                  </button>
                </div>
              </div>

              {/* ফাঁকা জায়গায় আকর্ষণীয় পার্সোনাল সেবাসমূহ (Quick Direct Services Grid) */}
              <div className="p-3 sm:p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-cyan-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>জনপ্রিয় জরুরি ডিজিটাল সেবাসমূহ</span>
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                    সরাসরি আবেদন
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    { title: 'NID অনলাইন কপি', icon: '🆔', speed: '১ মিনিট' },
                    { title: 'জন্ম নিবন্ধন কপি', icon: '👶', speed: 'তাৎক্ষণিক' },
                    { title: 'টিন সার্টিফিকেট', icon: '📄', speed: '২ মিনিট' },
                    { title: 'অনলাইন চালান ফি', icon: '💳', speed: 'ইনস্ট্যান্ট' },
                  ].map((svc, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveTab('dashboard')}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-cyan-400/40 text-left transition-all duration-200 group/s cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-base group-hover/s:scale-110 transition-transform shrink-0">{svc.icon}</span>
                        <span className="text-[11px] font-bold text-white group-hover/s:text-cyan-200 truncate">
                          {svc.title}
                        </span>
                      </div>
                      <span className="text-[9px] font-semibold text-emerald-300 bg-emerald-500/20 px-1.5 py-0.2 rounded shrink-0">
                        {svc.speed}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Direct CTA: Changed from payment live support to direct dashboard services action */}
            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className="relative z-10 w-full py-3.5 px-5 rounded-2xl overflow-hidden bg-gradient-to-r from-blue-500 via-sky-500 to-indigo-600 hover:from-blue-400 hover:via-sky-400 hover:to-indigo-500 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer group"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12" />
              <Sparkles className="relative w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
              <span className="relative">সরাসরি সেবা নিতে মূল ড্যাশবোর্ডে যান</span>
              <ChevronRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ) : (
          <div 
            id="withdraw-form" 
            className={`rounded-3xl bg-white border shadow-md p-4 sm:p-6 space-y-4 transition-all ${
              selectedViewTier === 'business'
                ? 'border-emerald-200/90'
                : 'border-purple-200/90'
            }`}
          >
            <div className={`flex items-center justify-between pb-2 border-b ${
              selectedViewTier === 'business'
                ? 'border-emerald-100'
                : 'border-purple-100'
            }`}>
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm ${
                  selectedViewTier === 'business'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-purple-100 text-purple-700'
                }`}>
                  💳
                </div>
                <h2 className="text-base sm:text-lg font-black text-slate-800">
                  {selectedViewTier === 'business' 
                    ? 'বিজনেস থেকে উইথড্র করুন' 
                    : 'সাব-এডমিন থেকে উইথড্র করুন'}
                </h2>
              </div>
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                selectedViewTier === 'business'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-purple-50 text-purple-700 border-purple-200'
              }`}>
                {selectedViewTier === 'sub_admin' ? '★ সাব-এডমিন' : '💼 বিজনেস'}
              </span>
            </div>

            <p className="text-xs font-semibold text-slate-600">
              আপনার পছন্দ অনুযায়ী যেকোনো মাধ্যমে টাকা তুলুন।
            </p>

            {/* 4 Method Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setWithdrawMethod('bKash')}
                className={`p-2 rounded-xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                  withdrawMethod === 'bKash'
                    ? 'border-pink-500 bg-pink-50 text-pink-800 ring-2 ring-pink-200'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <span className="text-lg">৳</span>
                <span className="text-xs font-bold mt-1">bKash</span>
                <span className="text-[10px] text-slate-400">বিকাশ</span>
              </button>

              <button
                type="button"
                onClick={() => setWithdrawMethod('Nagad')}
                className={`p-2 rounded-xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                  withdrawMethod === 'Nagad'
                    ? 'border-orange-500 bg-orange-50 text-orange-800 ring-2 ring-orange-200'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <span className="text-lg">💸</span>
                <span className="text-xs font-bold mt-1">নগদ</span>
                <span className="text-[10px] text-slate-400">Nagad</span>
              </button>

              <button
                type="button"
                onClick={() => setWithdrawMethod('Bank')}
                className={`p-2 rounded-xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                  withdrawMethod === 'Bank'
                    ? 'border-blue-600 bg-blue-50 text-blue-800 ring-2 ring-blue-200'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <Building2 className="w-5 h-5 text-blue-600" />
                <span className="text-xs font-bold mt-1">ব্যাংক</span>
                <span className="text-[10px] text-slate-400">ট্রান্সফার</span>
              </button>

              <button
                type="button"
                onClick={() => setWithdrawMethod('Card')}
                className={`p-2 rounded-xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                  withdrawMethod === 'Card'
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-800 ring-2 ring-indigo-200'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <CreditCard className="w-5 h-5 text-indigo-600" />
                <span className="text-xs font-bold mt-1">কার্ড</span>
                <span className="text-[10px] text-slate-400">ডেবিট/ক্রেডিট</span>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleWithdrawSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {withdrawMethod === 'Bank' ? 'ব্যাংক একাউন্ট নম্বর ও নাম' : withdrawMethod === 'Card' ? 'কার্ড নম্বর' : `${withdrawMethod} নাম্বার`}
                </label>
                <input
                  type="text"
                  value={withdrawAccount}
                  onChange={(e) => setWithdrawAccount(e.target.value)}
                  placeholder={withdrawMethod === 'Bank' ? 'একাউন্ট নং, ব্যাংক ও ব্রাঞ্চ নাম' : '01XXXXXXXXX'}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-sm font-medium transition-all"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700">
                    উইথড্র করার পরিমাণ (টাকা)
                  </label>
                  <span className={`text-[11px] font-bold ${
                    selectedViewTier === 'business' ? 'text-emerald-700' : 'text-purple-700'
                  }`}>
                    সর্বোচ্চ: ৳{(user?.tierBalances?.[selectedViewTier] ?? 0).toLocaleString('bn-BD')}
                  </span>
                </div>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="ন্যূনতম ৳১০০"
                  min="100"
                  max={user?.tierBalances?.[selectedViewTier] ?? undefined}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-sm font-medium transition-all"
                />
              </div>

              {/* Info Notes */}
              <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1 text-xs text-blue-900">
                <div className="flex items-center gap-1.5 font-semibold">
                  <span className="w-3.5 h-3.5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[9px]">
                    i
                  </span>
                  <span>উইথড্র অনুরোধ করার পর দ্রুত প্রসেস করা হবে।</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>সর্বনিম্ন উইথড্র পরিমাণ: ৳১০০</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isWithdrawSubmitting}
                className={`w-full py-3.5 rounded-2xl text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-all duration-300 cursor-pointer disabled:opacity-60 ${
                  selectedViewTier === 'business'
                    ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:via-teal-500 hover:to-cyan-600 shadow-emerald-600/20 hover:shadow-emerald-500/35 hover:-translate-y-0.5 active:translate-y-0'
                    : 'bg-gradient-to-r from-purple-700 via-indigo-600 to-amber-600 hover:from-purple-600 hover:via-indigo-500 hover:to-amber-500 shadow-purple-600/20 hover:shadow-purple-500/35 hover:-translate-y-0.5 active:translate-y-0'
                }`}
              >
                {isWithdrawSubmitting ? 'প্রসেসিং হচ্ছে...' : `${selectedViewTier === 'sub_admin' ? 'সাব-এডমিন' : 'বিজনেস'} একাউন্ট থেকে উইথড্র করুন ➔`}
              </button>
            </form>
          </div>
        )}

      </div>

      {/* Bottom Section: সাম্প্রতিক লেনদেন */}
      <div id="recent-transactions" className="rounded-3xl bg-white border border-slate-200 shadow-md p-4 sm:p-6 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
              +
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-800">
              সাম্প্রতিক লেনদেন
            </h3>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
              selectedViewTier === 'personal'
                ? 'bg-blue-50 text-blue-800 border-blue-200'
                : selectedViewTier === 'business'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-purple-50 text-purple-800 border-purple-200'
            }`}>
              {selectedViewTier === 'personal' ? '👤 পার্সোনাল লেনদেন' : selectedViewTier === 'business' ? '💼 বিজনেস লেনদেন' : '★ সাব-এডমিন লেনদেন'}
            </span>

            <button
              onClick={() => showToast('লেনদেন ডাটা রিফ্রেশ করা হয়েছে।')}
              className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>রিফ্রেশ</span>
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold">
                <th className="pb-3 px-2">তারিখ ও সময়</th>
                <th className="pb-3 px-2">একাউন্ট</th>
                <th className="pb-3 px-2">বিবরণ</th>
                <th className="pb-3 px-2">টাকা</th>
                <th className="pb-3 px-2 text-right">স্ট্যাটাস</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-slate-400">
                    কোনো লেনদেন রেকর্ড পাওয়া যায়নি।
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-2 text-slate-600 font-medium whitespace-nowrap">
                      {tx.date}
                    </td>
                    <td className="py-3 px-2 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-extrabold ${
                        tx.accountType === 'personal'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : tx.accountType === 'sub_admin'
                          ? 'bg-purple-50 text-purple-700 border border-purple-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {tx.accountType === 'personal' ? '👤 পার্সোনাল' : tx.accountType === 'sub_admin' ? '★ সাব-এডমিন' : '💼 বিজনেস'}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <span className="font-bold text-slate-800 block">
                        {tx.description}
                      </span>
                      {tx.trxId && (
                        <span className="text-[11px] text-slate-400 font-mono">
                          Trx: {tx.trxId}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-2 font-black whitespace-nowrap">
                      <span className={tx.amount > 0 ? 'text-emerald-600' : 'text-slate-700'}>
                        {tx.amount > 0 ? `+৳${tx.amount.toLocaleString('bn-BD')}` : `-৳${Math.abs(tx.amount).toLocaleString('bn-BD')}`}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        tx.status === 'সফল'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : tx.status === 'প্রক্রিয়াধীন'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-red-100 text-red-800 border border-red-300'
                      }`}>
                        {tx.status === 'সফল' && <Check className="w-3 h-3 text-emerald-600" />}
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4 Trust Badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl shrink-0">
            🎧
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-800">সাপোর্ট (২৪/৭)</h4>
            <p className="text-[11px] text-slate-500">সার্বক্ষণিক সহায়তা</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl shrink-0">
            🛡️
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-800">নিরাপদ লেনদেন</h4>
            <p className="text-[11px] text-slate-500">১০০% সিকিউরড</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-xl shrink-0">
            ⚡
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-800">দ্রুত সেবা</h4>
            <p className="text-[11px] text-slate-500">তাৎক্ষণিক ডেলিভারি</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center text-xl shrink-0">
            ❤️
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-800">আমাদের সাথে থাকুন</h4>
            <p className="text-[11px] text-slate-500">স্মার্ট হাব পরিবার</p>
          </div>
        </div>

      </div>

      {/* Return to Dashboard Bottom CTA */}
      <div className="flex justify-center pt-2 pb-6">
        <button
          type="button"
          onClick={() => setActiveTab('dashboard')}
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