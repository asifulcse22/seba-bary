import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { stats } from '../data/servicesData';
import { AccountTier } from '../types';
import { UserAvatar } from './UserAvatar';
import { TIER_PRICES } from '../data/tierPlans';
import { 
  User, 
  Phone, 
  Mail, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Calculator, 
  Image as ImageIcon,
  Award,
  Crown,
  Sparkles,
  Wallet,
  LogOut
} from 'lucide-react';

interface SettingsProfileViewProps {
  onOpenTierModal: (tier: AccountTier) => void;
}

export const SettingsProfileView: React.FC<SettingsProfileViewProps> = ({ onOpenTierModal }) => {
  const { user, switchTier, showToast, openAuthModal, loginUser, logoutUser } = useApp();

  // Reference screenshots modal state
  const [showRefImages, setShowRefImages] = useState(false);

  // Profit calculator state for Business & Sub Admin
  const [calcServiceCost, setCalcServiceCost] = useState('18');
  const [calcCustomerPrice, setCalcCustomerPrice] = useState('50');
  const [calcDailyOrders, setCalcDailyOrders] = useState('20');

  const baseCost = parseFloat(calcServiceCost) || 0;
  const custPrice = parseFloat(calcCustomerPrice) || 0;
  const dailyOrders = parseInt(calcDailyOrders) || 0;

  // Tier discount: Business = 15%, Sub Admin = 35%
  const activeTier = user?.activeTier || 'business';
  const tierCost = activeTier === 'sub_admin' ? baseCost * 0.65 : activeTier === 'business' ? baseCost * 0.85 : baseCost;
  const netProfitPerOrder = Math.max(0, custPrice - tierCost);
  const monthlyEstimatedProfit = Math.round(netProfitPerOrder * dailyOrders * 30);

  return (
    <div className="space-y-6">
      
      {/* Profile Overview Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-md space-y-4">
        
        {!user ? (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h3 className="font-black text-lg text-slate-800">আপনি বর্তমানে লগআউট অবস্থায় আছেন</h3>
              <p className="text-xs text-slate-600 mt-1">
                আপনার ব্যক্তিগত ব্যালেন্স, অর্ডার ও সেবা ড্যাশবোর্ড দেখতে লগইন করুন বা অ্যাকাউন্ট তৈরি করুন।
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => openAuthModal('login')}
                className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer"
              >
                লগইন করুন
              </button>
              <button
                onClick={() => openAuthModal('register')}
                className="px-4 py-2.5 rounded-full bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm border border-slate-300 transition-colors cursor-pointer"
              >
                রেজিস্ট্রেশন
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
            
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="relative">
                <UserAvatar user={user} size="xl" />
                <span className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full"></span>
              </div>

              <div>
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <h2 className="text-xl font-black text-slate-800">{user.displayNameEn || user.name}</h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                    {user.activeTier === 'personal' ? 'পার্সোনাল' : user.activeTier === 'business' ? 'বিজনেস' : 'Sub Admin'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 flex items-center justify-center sm:justify-start gap-3">
                  <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-slate-400" /> {user.phone}</span>
                  <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-slate-400" /> {user.email}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-end">
              <button
                onClick={logoutUser}
                className="px-4 py-2 rounded-2xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-red-500" />
                <span>লগআউট করুন</span>
              </button>

              {/* Reference images inspector button */}
              <button
                onClick={() => setShowRefImages(true)}
                className="px-4 py-2 rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <ImageIcon className="w-4 h-4" />
                <span>রেফারেন্স ডিজাইন</span>
              </button>
            </div>
          </div>
        )}

        {/* 3 Tier Status Switcher Grid */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            আপনার অ্যাকাউন্ট মোড নির্বাচন করুন
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            
            {/* Personal card */}
            <div 
              onClick={() => switchTier('personal')}
              className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                user?.activeTier === 'personal'
                  ? 'border-blue-500 bg-blue-50/60 ring-2 ring-blue-200'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-blue-900">Personal</span>
                {user?.activeTier === 'personal' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
              </div>
              <p className="text-xs text-slate-500 mt-1">ব্যক্তিগত সেবা (৳500 ডিপোজিট)</p>
              <span className="text-[10px] text-blue-600 font-bold block mt-2">
                রেগুলার সার্ভিস রেট
              </span>
            </div>

            {/* Business card */}
            <div 
              onClick={() => switchTier('business')}
              className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                user?.activeTier === 'business'
                  ? 'border-emerald-500 bg-emerald-50/70 ring-2 ring-emerald-200'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-emerald-900 flex items-center gap-1">
                  Business <Crown className="w-3.5 h-3.5 text-amber-500" />
                </span>
                {user?.activeTier === 'business' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              </div>
              <p className="text-xs text-slate-500 mt-1">উদ্যোক্তা মোড (৳{TIER_PRICES.business.toLocaleString('en-US')} ডিপোজিট)</p>
              <span className="text-[10px] text-emerald-700 font-bold block mt-2">
                ১৫% স্পেশাল ডিসকাউন্ট + রসিদ প্রিন্ট
              </span>
            </div>

            {/* Sub Admin card */}
            <div 
              onClick={() => switchTier('sub_admin')}
              className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                user?.activeTier === 'sub_admin'
                  ? 'border-purple-600 bg-purple-50/70 ring-2 ring-purple-200'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-purple-900 flex items-center gap-1">
                  Sub Admin <Award className="w-3.5 h-3.5 text-amber-500" />
                </span>
                {user?.activeTier === 'sub_admin' && <CheckCircle2 className="w-4 h-4 text-purple-600" />}
              </div>
              <p className="text-xs text-slate-500 mt-1">রিসেলার মোড (৳{TIER_PRICES.sub_admin.toLocaleString('en-US')} ডিপোজিট)</p>
              <span className="text-[10px] text-purple-700 font-bold block mt-2">
                ৩৫% পাইকারি ছাড় + কাস্টম রেট সেট
              </span>
            </div>

          </div>
        </div>

      </div>

      {/* Income & Profit Calculator for Business & Sub Admin */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-emerald-500/30 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-xl">
            <Calculator className="w-5 h-5 text-emerald-300" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black">
              উদ্যোক্তা ইনকাম ক্যালকুলেটর (Business & Sub Admin)
            </h3>
            <p className="text-xs text-emerald-200">
              হিসেব করে দেখুন প্রতিদিন ও মাসে কত টাকা আয় করা সম্ভব!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs text-emerald-200 mb-1">অফিসিয়াল সার্ভিস ফি (৳)</label>
            <input
              type="number"
              value={calcServiceCost}
              onChange={(e) => setCalcServiceCost(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-sm outline-none"
            />
          </div>
          <div>
            <label className="block text-xs text-emerald-200 mb-1">কাস্টমার থেকে বিক্রয়মূল্য (৳)</label>
            <input
              type="number"
              value={calcCustomerPrice}
              onChange={(e) => setCalcCustomerPrice(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-sm outline-none"
            />
          </div>
          <div>
            <label className="block text-xs text-emerald-200 mb-1">দৈনিক আনুমানিক অর্ডার সংখ্যা</label>
            <input
              type="number"
              value={calcDailyOrders}
              onChange={(e) => setCalcDailyOrders(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-sm outline-none"
            />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-800/40 border border-emerald-400/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <span className="text-xs text-emerald-300 font-semibold">
              আপনার মোড ({user?.activeTier === 'sub_admin' ? 'Sub Admin - ৩৫% ছাড়' : 'Business - ১৫% ছাড়'}) অনুযায়ী প্রতি অর্ডারে নিট লাভ:
            </span>
            <div className="text-2xl font-black text-amber-300 mt-0.5">
              +৳{Math.round(netProfitPerOrder)} টাকা / অর্ডার
            </div>
          </div>

          <div className="sm:text-right">
            <span className="text-xs text-emerald-300 font-semibold">সম্ভাব্য মাসিক ইনকাম:</span>
            <div className="text-3xl font-black text-emerald-300 mt-0.5">
              ৳ {monthlyEstimatedProfit.toLocaleString('bn-BD')}
            </div>
          </div>
        </div>
      </div>

      {/* Official Stats Bar matching prompt */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-md">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
          স্মার্ট হাব বিডি নেটওয়ার্ক পরিসংখ্যান
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map((st, i) => (
            <div key={i} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <span className="text-xl mb-1 block">{st.icon}</span>
              <span className="text-lg sm:text-xl font-black text-slate-800">{st.value}</span>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">{st.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reference Images Modal */}
      {showRefImages && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">আপলোডকৃত রেফারেন্স ডিজাইন ও স্ক্রিনশট</h3>
                <p className="text-xs text-slate-400">Image 1 (মূল হাব ও প্ল্যান) এবং Image 2 (ওয়ালেট ও লেনদেন)</p>
              </div>
              <button
                onClick={() => setShowRefImages(false)}
                className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-4 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold block w-fit">
                  রেফারেন্স ১: ড্যাশবোর্ড ও সেবাসমূহ (1000013485)
                </span>
                <img
                  src="/public/assets/aistudio/1000013485_de6a6a05.jpg"
                  alt="Reference 1"
                  className="w-full rounded-2xl border shadow-md"
                />
              </div>

              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold block w-fit">
                  রেফারেন্স ২: ওয়ালেট, ডিপোজিট ও উইথড্র (1000013488)
                </span>
                <img
                  src="/public/assets/aistudio/1000013488_fa505e8f.jpg"
                  alt="Reference 2"
                  className="w-full rounded-2xl border shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
