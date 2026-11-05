import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HeroBanner } from './HeroBanner';
import { 
  PlusCircle, 
  ArrowDownCircle, 
  History, 
  Copy, 
  Check, 
  RefreshCw, 
  Headphones, 
  ShieldCheck, 
  Zap, 
  Heart,
  CreditCard,
  Building2,
  ChevronRight,
  Sparkles,
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
    switchTier, 
    showToast 
  } = useApp();

  // Add Balance Form State
  const [depositMethod, setDepositMethod] = useState<'bKash' | 'Nagad'>('bKash');
  const [depositPhone, setDepositPhone] = useState('');
  const [depositTrxId, setDepositTrxId] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [isDepositSubmitting, setIsDepositSubmitting] = useState(false);

  // Withdraw Form State
  const [withdrawMethod, setWithdrawMethod] = useState<'bKash' | 'Nagad' | 'Bank' | 'Card'>('bKash');
  const [withdrawAccount, setWithdrawAccount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [isWithdrawSubmitting, setIsWithdrawSubmitting] = useState(false);

  const bkashNagadNumber = '01712-345678';

  const handleCopyNumber = () => {
    navigator.clipboard.writeText('01712345678');
    setCopiedNumber(true);
    showToast('নাম্বার কপি হয়েছে: 01712-345678 (Send Money করুন)');
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
      const res = await addBalance(num, depositMethod, depositTrxId, depositPhone);
      if (res.success) {
        setDepositPhone('');
        setDepositTrxId('');
        setDepositAmount('');
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
    setIsWithdrawSubmitting(true);
    try {
      const res = await withdrawBalance(num, withdrawMethod, withdrawAccount);
      if (res.success) {
        setWithdrawAccount('');
        setWithdrawAmount('');
      }
    } finally {
      setIsWithdrawSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner matching Image 2 */}
      <HeroBanner variant="wallet" />

      {/* 3 Account Tier Status Panels (Matching Image 2 top row) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        
        {/* 1. Personal Account (Blue Theme) */}
        <div className="rounded-3xl border-2 border-blue-200 bg-gradient-to-b from-blue-50/70 via-white to-blue-50/40 p-4 sm:p-5 flex flex-col justify-between shadow-md relative overflow-hidden">
          <div>
            <div className="w-full py-1.5 px-3 rounded-full bg-blue-600 text-white font-bold text-center text-xs tracking-wide">
              Personal Account
            </div>

            <div className="flex flex-col items-center my-3">
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-2xl shadow-inner border border-blue-200">
                👤
              </div>
              <span className="text-xs font-semibold text-slate-500 mt-2">
                আপনার ব্যালেন্স
              </span>
              <span className="text-2xl sm:text-3xl font-black text-blue-700 tracking-tight">
                ৳ {(user?.tierBalances?.personal ?? 0).toLocaleString('bn-BD', { minimumFractionDigits: 2 })}
              </span>
              <span className="text-[11px] font-semibold text-slate-400">
                (প্রথম ডিপোজিট: ৳500)
              </span>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-blue-100">
            <button
              onClick={() => {
                switchTier('personal');
                document.getElementById('add-balance-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-1.5 px-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>ব্যালেন্স অ্যাড করুন</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => document.getElementById('withdraw-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="py-1 px-2 rounded-full bg-white hover:bg-blue-50 text-blue-700 border border-blue-300 text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
              >
                <ArrowDownCircle className="w-3 h-3" />
                <span>উইথড্র করুন &gt;</span>
              </button>
              <button
                onClick={() => document.getElementById('recent-transactions')?.scrollIntoView({ behavior: 'smooth' })}
                className="py-1 px-2 rounded-full bg-white hover:bg-blue-50 text-blue-700 border border-blue-300 text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
              >
                <History className="w-3 h-3" />
                <span>লেনদেন ইতিহাস &gt;</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. Business Account (Green Theme, "Most Popular" Crown) */}
        <div className="rounded-3xl border-2 border-emerald-400 bg-gradient-to-b from-emerald-50/80 via-white to-green-50/50 p-4 sm:p-5 flex flex-col justify-between shadow-lg relative overflow-hidden scale-100 md:-translate-y-1">
          {/* Most popular crown banner */}
          <div className="absolute top-0 right-4 px-2.5 py-0.5 rounded-b-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black flex items-center gap-1 shadow-sm">
            <Crown className="w-3 h-3 fill-white" /> Most Popular
          </div>

          <div>
            <div className="w-full py-1.5 px-3 rounded-full bg-emerald-600 text-white font-bold text-center text-xs tracking-wide">
              Business Account
            </div>

            <div className="flex flex-col items-center my-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-2xl shadow-inner border border-emerald-200">
                💼
              </div>
              <span className="text-xs font-semibold text-slate-500 mt-2">
                আপনার ব্যালেন্স
              </span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-700 tracking-tight">
                ৳ {(user?.tierBalances?.business ?? 0).toLocaleString('bn-BD', { minimumFractionDigits: 2 })}
              </span>
              <span className="text-[11px] font-semibold text-slate-400">
                (প্রথম ডিপোজিট: ৳{TIER_PRICES.business.toLocaleString('en-US')})
              </span>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-emerald-100">
            <button
              onClick={() => {
                switchTier('business');
                document.getElementById('add-balance-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-1.5 px-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>ব্যালেন্স অ্যাড করুন</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => document.getElementById('withdraw-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="py-1 px-2 rounded-full bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-300 text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
              >
                <ArrowDownCircle className="w-3 h-3" />
                <span>উইথড্র করুন &gt;</span>
              </button>
              <button
                onClick={() => document.getElementById('recent-transactions')?.scrollIntoView({ behavior: 'smooth' })}
                className="py-1 px-2 rounded-full bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-300 text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
              >
                <History className="w-3 h-3" />
                <span>লেনদেন ইতিহাস &gt;</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. Sub Admin Panel (Purple Theme, "Recommended" Ribbon) */}
        <div className="rounded-3xl border-2 border-purple-300 bg-gradient-to-b from-purple-50/80 via-white to-indigo-50/50 p-4 sm:p-5 flex flex-col justify-between shadow-md relative overflow-hidden">
          {/* Recommended ribbon */}
          <div className="absolute top-0 right-4 px-2.5 py-0.5 rounded-b-lg bg-gradient-to-r from-amber-400 to-yellow-400 text-amber-950 text-[10px] font-black flex items-center gap-1 shadow-sm">
            <Award className="w-3 h-3 fill-amber-700" /> Recommended
          </div>

          <div>
            <div className="w-full py-1.5 px-3 rounded-full bg-purple-700 text-white font-bold text-center text-xs tracking-wide">
              Sub Admin Panel
            </div>

            <div className="flex flex-col items-center my-3">
              <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center text-2xl shadow-inner border border-purple-200">
                ★
              </div>
              <span className="text-xs font-semibold text-slate-500 mt-2">
                আপনার ব্যালেন্স
              </span>
              <span className="text-2xl sm:text-3xl font-black text-purple-800 tracking-tight">
                ৳ {(user?.tierBalances?.sub_admin ?? 0).toLocaleString('bn-BD', { minimumFractionDigits: 2 })}
              </span>
              <span className="text-[11px] font-semibold text-slate-400">
                (প্রথম ডিপোজিট: ৳{TIER_PRICES.sub_admin.toLocaleString('en-US')})
              </span>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-purple-100">
            <button
              onClick={() => {
                switchTier('sub_admin');
                document.getElementById('add-balance-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-1.5 px-3 rounded-full bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>ব্যালেন্স অ্যাড করুন</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => document.getElementById('withdraw-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="py-1 px-2 rounded-full bg-white hover:bg-purple-50 text-purple-700 border border-purple-300 text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
              >
                <ArrowDownCircle className="w-3 h-3" />
                <span>উইথড্র করুন &gt;</span>
              </button>
              <button
                onClick={() => document.getElementById('recent-transactions')?.scrollIntoView({ behavior: 'smooth' })}
                className="py-1 px-2 rounded-full bg-white hover:bg-purple-50 text-purple-700 border border-purple-300 text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
              >
                <History className="w-3 h-3" />
                <span>লেনদেন ইতিহাস &gt;</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Middle Two Columns: Add Balance & Withdraw matching Image 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
        
        {/* Left Column: ব্যালেন্স অ্যাড করুন (Add Balance) */}
        <div id="add-balance-form" className="rounded-3xl bg-white border border-emerald-200/90 shadow-md p-4 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-emerald-100">
            <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
              +
            </div>
            <h2 className="text-base sm:text-lg font-black text-slate-800">
              ব্যালেন্স অ্যাড করুন
            </h2>
          </div>

          <p className="text-xs font-semibold text-slate-600">
            আপনার বিকাশ/নগদ নম্বরে সেন্ড মানি করার পর নিচের ফরম পূরণ করুন।
          </p>

          {/* bKash & Nagad Selector Buttons matching Image 2 */}
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

          {/* Send Money Number Box with Copy Action */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 flex items-center justify-between gap-2">
            <div>
              <span className="text-[11px] font-bold text-slate-500">
                {depositMethod} পার্সোনাল নাম্বার (Send Money করুন)
              </span>
              <div className="text-lg sm:text-xl font-black text-emerald-800 tracking-wider">
                {bkashNagadNumber}
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopyNumber}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-100 text-emerald-700 font-bold text-xs border border-emerald-300 flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              {copiedNumber ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>কপি হয়েছে</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>কপি করুন</span>
                </>
              )}
            </button>
          </div>

          {/* Form Fields matching Image 2 */}
          <form onSubmit={handleDepositSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                আপনার মোবাইল নাম্বার দিন
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
              <label className="block text-xs font-bold text-slate-700 mb-1">
                কত টাকা পাঠিয়েছেন?
              </label>
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="যেমন: 500 বা 1450"
                min="10"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none text-sm font-medium transition-all"
              />
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
                  <span>জমা দিন</span>
                  <span className="transition-transform group-hover:translate-x-1">➔</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: উইথড্র করুন (Withdraw) matching Image 2 */}
        <div id="withdraw-form" className="rounded-3xl bg-white border border-blue-200/90 shadow-md p-4 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-blue-100">
            <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
              💳
            </div>
            <h2 className="text-base sm:text-lg font-black text-slate-800">
              উইথড্র করুন
            </h2>
          </div>

          <p className="text-xs font-semibold text-slate-600">
            আপনার পছন্দ অনুযায়ী যেকোনো মাধ্যমে টাকা তুলুন।
          </p>

          {/* 4 Method Selectors matching Image 2 */}
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
              <label className="block text-xs font-bold text-slate-700 mb-1">
                উইথড্র করার পরিমাণ (টাকা)
              </label>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="ন্যূনতম ৳১০০"
                min="100"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-sm font-medium transition-all"
              />
            </div>

            {/* Info Notes matching Image 2 */}
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
              {isWithdrawSubmitting ? 'প্রসেসিং হচ্ছে...' : 'উইথড্র নিশ্চিত করুন ➔'}
            </button>
          </form>
        </div>

      </div>

      {/* Bottom Section: সাম্প্রতিক লেনদেন (Recent Transactions Table) matching Image 2 */}
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

          <button
            onClick={() => showToast('লেনদেন ডাটা রিফ্রেশ করা হয়েছে।')}
            className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>রিফ্রেশ করুন</span>
          </button>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold">
                <th className="pb-3 px-2">তারিখ ও সময়</th>
                <th className="pb-3 px-2">বিবরণ</th>
                <th className="pb-3 px-2">টাকা</th>
                <th className="pb-3 px-2 text-right">স্ট্যাটাস</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-slate-400">
                    কোনো লেনদেন রেকর্ড পাওয়া যায়নি।
                  </td>
                </tr>
              ) : (
                transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-2 text-slate-600 font-medium whitespace-nowrap">
                      {tx.date}
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

      {/* 4 Trust Badges matching the bottom of Image 2 */}
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
