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
  Crown
} from 'lucide-react';
import { AccountTier } from '../types';
import { TIER_PRICES } from '../data/tierPlans';

export const WalletHubView: React.FC = () => {
  const { 
    user, 
    transactions, 
    addBalance, 
    withdrawBalance, 
    showToast 
  } = useApp();

  // Active view tier: Defaults to logged-in user's active tier (e.g. 'business')
  const [selectedViewTier, setSelectedViewTier] = useState<AccountTier>(() => user?.activeTier || 'personal');
  const [depositTargetTier, setDepositTargetTier] = useState<AccountTier>(() => user?.activeTier || 'personal');
  const [withdrawSourceTier, setWithdrawSourceTier] = useState<AccountTier>(() => user?.activeTier || 'personal');
  const [txFilter, setTxFilter] = useState<'all' | AccountTier>('all');

  // Keep synced if user's active tier changes
  useEffect(() => {
    if (user?.activeTier) {
      setSelectedViewTier(user.activeTier);
      setDepositTargetTier(user.activeTier);
      setWithdrawSourceTier(user.activeTier);
    }
  }, [user?.activeTier]);

  // Sync deposit target when changing selectedViewTier
  const handleSelectViewTier = (tier: AccountTier) => {
    setSelectedViewTier(tier);
    setDepositTargetTier(tier);
    setWithdrawSourceTier(tier);
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

  // বিকাশ ও নগদের আলাদা আলাদা নাম্বার (আপনার আসল নম্বর দিন)
  const bkashNumber = '';
  const nagadNumber = '';

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
      const res = await addBalance(num, depositMethod, depositTrxId, depositPhone, depositTargetTier);
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

    const availableBal = user?.tierBalances?.[withdrawSourceTier] ?? 0;
    if (num > availableBal) {
      const tierTitle = withdrawSourceTier === 'personal' ? 'পার্সোনাল' : withdrawSourceTier === 'sub_admin' ? 'সাব-এডমিন' : 'বিজনেস';
      showToast(`আপনার ${tierTitle} একাউন্টে পর্যাপ্ত ব্যালেন্স নেই (বর্তমান: ৳${availableBal.toLocaleString('bn-BD')})।`);
      return;
    }

    setIsWithdrawSubmitting(true);
    try {
      const res = await withdrawBalance(num, withdrawMethod, withdrawAccount, withdrawSourceTier);
      if (res.success) {
        setWithdrawAccount('');
        setWithdrawAmount('');
      }
    } finally {
      setIsWithdrawSubmitting(false);
    }
  };

  const filteredTransactions = transactions.filter(tx => {
    if (txFilter === 'all') return true;
    return tx.accountType === txFilter;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <HeroBanner variant="wallet" />

      {/* Account Switcher Header */}
      <div className="flex items-center justify-between flex-wrap gap-2.5 pb-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-slate-700">অ্যাকাউন্ট ভিউ:</span>
          <span className={`text-xs font-black px-3 py-1 rounded-full border shadow-xs ${
            selectedViewTier === 'personal' 
              ? 'bg-blue-50 text-blue-800 border-blue-300' 
              : selectedViewTier === 'sub_admin'
              ? 'bg-purple-50 text-purple-800 border-purple-300'
              : 'bg-emerald-50 text-emerald-800 border-emerald-300'
          }`}>
            {selectedViewTier === 'personal' ? '👤 পার্সোনাল অ্যাকাউন্ট' : selectedViewTier === 'sub_admin' ? '★ সাব-এডমিন প্যানেল' : '💼 বিজনেস অ্যাকাউন্ট'}
          </span>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center bg-white p-1 rounded-2xl border border-slate-200 shadow-xs text-xs font-bold gap-1">
          <button
            type="button"
            onClick={() => handleSelectViewTier('personal')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedViewTier === 'personal'
                ? 'bg-blue-600 text-white shadow-xs font-black'
                : 'text-slate-600 hover:text-blue-700 hover:bg-blue-50'
            }`}
          >
            <span>👤</span>
            <span>পার্সোনাল</span>
          </button>
          <button
            type="button"
            onClick={() => handleSelectViewTier('business')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedViewTier === 'business'
                ? 'bg-emerald-600 text-white shadow-xs font-black'
                : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'
            }`}
          >
            <span>💼</span>
            <span>বিজনেস</span>
          </button>
          <button
            type="button"
            onClick={() => handleSelectViewTier('sub_admin')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedViewTier === 'sub_admin'
                ? 'bg-purple-700 text-white shadow-xs font-black'
                : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50'
            }`}
          >
            <span>★</span>
            <span>সাব-এডমিন</span>
          </button>
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
                  setDepositTargetTier('personal');
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
                    setWithdrawSourceTier('personal');
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
                  setDepositTargetTier('business');
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
                    setWithdrawSourceTier('business');
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
                  setDepositTargetTier('sub_admin');
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
                    setWithdrawSourceTier('sub_admin');
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
            </div>
          </div>
        )}

      </div>

      {/* Middle Two Columns: Add Balance & Withdraw Forms */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
        
        {/* Left Column: ব্যালেন্স অ্যাড করুন (Add Balance Form) */}
        <div id="add-balance-form" className="rounded-3xl bg-white border border-emerald-200/90 shadow-md p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-emerald-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                +
              </div>
              <h2 className="text-base sm:text-lg font-black text-slate-800">
                ব্যালেন্স অ্যাড করুন
              </h2>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              {depositTargetTier === 'personal' ? '👤 পার্সোনাল একাউন্ট' : depositTargetTier === 'sub_admin' ? '★ সাব-এডমিন প্যানেল' : '💼 বিজনেস একাউন্ট'}
            </span>
          </div>

          {/* Account Tier Selector */}
          <div className="space-y-1.5">
            <label className="block text-xs font-black text-slate-800">
              কোন অ্যাকাউন্টে ব্যালেন্স যোগ করবেন? (টার্গেট একাউন্ট)
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setDepositTargetTier('personal');
                  if (!depositAmount || depositAmount === '1450' || depositAmount === '2950') {
                    setDepositAmount('500');
                  }
                }}
                className={`p-2.5 rounded-2xl border-2 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                  depositTargetTier === 'personal'
                    ? 'border-blue-600 bg-blue-50/90 text-blue-900 ring-2 ring-blue-300 shadow-sm'
                    : 'border-slate-200 hover:border-blue-200 bg-white text-slate-700'
                }`}
              >
                <span className="text-base">👤</span>
                <span className="text-xs font-extrabold mt-0.5">পার্সোনাল</span>
                <span className="text-[10px] font-bold text-blue-700 mt-0.5">
                  ৳ {(user?.tierBalances?.personal ?? 0).toLocaleString('bn-BD')}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setDepositTargetTier('business');
                  if (!depositAmount || depositAmount === '500' || depositAmount === '2950') {
                    setDepositAmount('1450');
                  }
                }}
                className={`p-2.5 rounded-2xl border-2 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                  depositTargetTier === 'business'
                    ? 'border-emerald-600 bg-emerald-50/90 text-emerald-900 ring-2 ring-emerald-300 shadow-sm'
                    : 'border-slate-200 hover:border-emerald-200 bg-white text-slate-700'
                }`}
              >
                <span className="text-base">💼</span>
                <span className="text-xs font-extrabold mt-0.5">বিজনেস</span>
                <span className="text-[10px] font-bold text-emerald-700 mt-0.5">
                  ৳ {(user?.tierBalances?.business ?? 0).toLocaleString('bn-BD')}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setDepositTargetTier('sub_admin');
                  if (!depositAmount || depositAmount === '500' || depositAmount === '1450') {
                    setDepositAmount('2950');
                  }
                }}
                className={`p-2.5 rounded-2xl border-2 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                  depositTargetTier === 'sub_admin'
                    ? 'border-purple-600 bg-purple-50/90 text-purple-950 ring-2 ring-purple-300 shadow-sm'
                    : 'border-slate-200 hover:border-purple-200 bg-white text-slate-700'
                }`}
              >
                <span className="text-base">★</span>
                <span className="text-xs font-extrabold mt-0.5">সাব-এডমিন</span>
                <span className="text-[10px] font-bold text-purple-700 mt-0.5">
                  ৳ {(user?.tierBalances?.sub_admin ?? 0).toLocaleString('bn-BD')}
                </span>
              </button>
            </div>
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

          {/* Send Money Number Box with Smart One-Click Copy */}
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
                  {depositMethod} পার্সোনাল নাম্বার (Send Money করুন)
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
                  টার্গেট: {depositTargetTier === 'personal' ? 'পার্সোনাল (৳৫০০)' : depositTargetTier === 'sub_admin' ? 'সাব-এডমিন (৳২,৯৫০)' : 'বিজনেস (৳১,৪৫০)'}
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
                {(depositTargetTier === 'personal' 
                  ? [500, 1000, 2000, 5000]
                  : depositTargetTier === 'business'
                  ? [1450, 2500, 5000, 10000]
                  : [2950, 5000, 10000, 20000]
                ).map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setDepositAmount(amt.toString())}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      depositAmount === amt.toString()
                        ? 'bg-emerald-600 text-white shadow-xs'
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
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:via-teal-500 hover:to-cyan-600 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 hover:shadow-xl hover:shadow-emerald-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer disabled:opacity-60"
            >
              {isDepositSubmitting ? (
                <span>যাচাই করা হচ্ছে...</span>
              ) : (
                <>
                  <span>
                    {depositTargetTier === 'personal' ? 'পার্সোনাল ওয়ালেটে জমা দিন' : depositTargetTier === 'sub_admin' ? 'সাব-এডমিন ওয়ালেটে জমা দিন' : 'বিজনেস ওয়ালেটে জমা দিন'}
                  </span>
                  <span className="transition-transform group-hover:translate-x-1">➔</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: উইথড্র করুন (Withdraw Form) */}
        <div id="withdraw-form" className="rounded-3xl bg-white border border-blue-200/90 shadow-md p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-blue-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                💳
              </div>
              <h2 className="text-base sm:text-lg font-black text-slate-800">
                উইথড্র করুন
              </h2>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              {withdrawSourceTier === 'personal' ? '👤 পার্সোনাল' : withdrawSourceTier === 'sub_admin' ? '★ সাব-এডমিন' : '💼 বিজনেস'}
            </span>
          </div>

          {/* Source Account Tier Selector */}
          <div className="space-y-1.5">
            <label className="block text-xs font-black text-slate-800">
              কোন অ্যাকাউন্ট থেকে টাকা তুলবেন? (উৎস একাউন্ট)
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setWithdrawSourceTier('personal')}
                className={`p-2.5 rounded-2xl border-2 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                  withdrawSourceTier === 'personal'
                    ? 'border-blue-600 bg-blue-50/90 text-blue-900 ring-2 ring-blue-300 shadow-sm'
                    : 'border-slate-200 hover:border-blue-200 bg-white text-slate-700'
                }`}
              >
                <span className="text-base">👤</span>
                <span className="text-xs font-extrabold mt-0.5">পার্সোনাল</span>
                <span className="text-[10px] font-bold text-blue-700 mt-0.5">
                  উদ্বৃত্ত: ৳{(user?.tierBalances?.personal ?? 0).toLocaleString('bn-BD')}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setWithdrawSourceTier('business')}
                className={`p-2.5 rounded-2xl border-2 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                  withdrawSourceTier === 'business'
                    ? 'border-emerald-600 bg-emerald-50/90 text-emerald-900 ring-2 ring-emerald-300 shadow-sm'
                    : 'border-slate-200 hover:border-emerald-200 bg-white text-slate-700'
                }`}
              >
                <span className="text-base">💼</span>
                <span className="text-xs font-extrabold mt-0.5">বিজনেস</span>
                <span className="text-[10px] font-bold text-emerald-700 mt-0.5">
                  উদ্বৃত্ত: ৳{(user?.tierBalances?.business ?? 0).toLocaleString('bn-BD')}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setWithdrawSourceTier('sub_admin')}
                className={`p-2.5 rounded-2xl border-2 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                  withdrawSourceTier === 'sub_admin'
                    ? 'border-purple-600 bg-purple-50/90 text-purple-950 ring-2 ring-purple-300 shadow-sm'
                    : 'border-slate-200 hover:border-purple-200 bg-white text-slate-700'
                }`}
              >
                <span className="text-base">★</span>
                <span className="text-xs font-extrabold mt-0.5">সাব-এডমিন</span>
                <span className="text-[10px] font-bold text-purple-700 mt-0.5">
                  উদ্বৃত্ত: ৳{(user?.tierBalances?.sub_admin ?? 0).toLocaleString('bn-BD')}
                </span>
              </button>
            </div>
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
                <span className="text-[11px] font-bold text-blue-700">
                  সর্বোচ্চ: ৳{(user?.tierBalances?.[withdrawSourceTier] ?? 0).toLocaleString('bn-BD')}
                </span>
              </div>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="ন্যূনতম ৳১০০"
                min="100"
                max={user?.tierBalances?.[withdrawSourceTier] ?? undefined}
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
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600 hover:from-blue-500 hover:via-sky-500 hover:to-indigo-500 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer disabled:opacity-60"
            >
              {isWithdrawSubmitting ? 'প্রসেসিং হচ্ছে...' : `${withdrawSourceTier === 'personal' ? 'পার্সোনাল' : withdrawSourceTier === 'sub_admin' ? 'সাব-এডমিন' : 'বিজনেস'} একাউন্ট থেকে উইথড্র করুন ➔`}
            </button>
          </form>
        </div>

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
            {/* Filter buttons */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold gap-1">
              <button
                type="button"
                onClick={() => setTxFilter('all')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  txFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                সকল
              </button>
              <button
                type="button"
                onClick={() => setTxFilter('personal')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  txFilter === 'personal' ? 'bg-blue-600 text-white shadow-xs' : 'text-blue-700 hover:bg-blue-50'
                }`}
              >
                👤 পার্সোনাল
              </button>
              <button
                type="button"
                onClick={() => setTxFilter('business')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  txFilter === 'business' ? 'bg-emerald-600 text-white shadow-xs' : 'text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                💼 বিজনেস
              </button>
              <button
                type="button"
                onClick={() => setTxFilter('sub_admin')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  txFilter === 'sub_admin' ? 'bg-purple-700 text-white shadow-xs' : 'text-purple-700 hover:bg-purple-50'
                }`}
              >
                ★ সাব-এডমিন
              </button>
            </div>

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

    </div>
  );
};