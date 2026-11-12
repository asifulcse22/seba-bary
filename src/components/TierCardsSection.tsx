import React from 'react';
import { useApp } from '../context/AppContext';
import { AccountTier } from '../types';
import { 
  Check, 
  User, 
  Briefcase, 
  Award,
  Star, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Headphones, 
  Handshake 
} from 'lucide-react';
import { getTierPlans } from '../data/tierPlans';

interface TierCardsSectionProps {
  onOpenDetails: (tier: AccountTier) => void;
}

export const TierCardsSection: React.FC<TierCardsSectionProps> = ({ onOpenDetails }) => {
  const { user } = useApp();
  const plans = getTierPlans();

  return (
    <section className="space-y-5 sm:space-y-8 max-w-6xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
      
      {/* ============================================================== */}
      {/* 👑 ১. শীর্ষ ব্যানার (ছবির মতো হুবহু ক্রাউন হেডার ও ডেকোরেশন) */}
      {/* ============================================================== */}
      <div className="text-center space-y-3 max-w-3xl mx-auto relative">
        
        <div className="flex items-center justify-center gap-2 sm:gap-4 relative">
          {/* বামপাশের স্পিড ড্যাশ লাইন */}
          <div className="hidden sm:flex items-center gap-1 opacity-80">
            <span className="w-5 h-1.5 bg-blue-500 rounded-full transform -rotate-12"></span>
            <span className="w-7 h-1.5 bg-blue-600 rounded-full"></span>
            <span className="w-5 h-1.5 bg-blue-500 rounded-full transform rotate-12"></span>
          </div>

          {/* মূল নীল ক্রাউন ক্যাপসুল */}
          <div className="inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-full bg-gradient-to-r from-[#003274] via-[#004e9c] to-[#002f6c] text-white shadow-xl border-2 border-blue-400/50">
            <span className="text-2xl sm:text-3xl text-amber-300 drop-shadow animate-bounce">👑</span>
            <span className="text-sm sm:text-xl md:text-2xl font-black tracking-wide text-white drop-shadow">
              কোন অ্যাকাউন্টটি আপনার জন্য ?
            </span>
            <span className="text-xl sm:text-2xl">🤔</span>
          </div>

          {/* ডানপাশের স্পিড ড্যাশ লাইন */}
          <div className="hidden sm:flex items-center gap-1 opacity-80">
            <span className="w-5 h-1.5 bg-blue-500 rounded-full transform rotate-12"></span>
            <span className="w-7 h-1.5 bg-blue-600 rounded-full"></span>
            <span className="w-5 h-1.5 bg-blue-500 rounded-full transform -rotate-12"></span>
          </div>
        </div>

        {/* সাবটাইটেল সবুজ রিবন */}
        <div>
          <span className="inline-flex items-center gap-2 px-5 sm:px-7 py-1.5 sm:py-2 rounded-full bg-[#dcfce7] border border-[#86efac] text-[#14532d] font-black text-xs sm:text-sm shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-[#16a34a] fill-[#16a34a] text-white" />
            <span>১ মিনিটেই দেখে নিন এবং নিজের প্রয়োজন অনুযায়ী বেছে নিন।</span>
          </span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 🎯 ২. ছবির মতো হুবহু ৩টি আকর্ষণীয় কার্ড */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-stretch pt-2">
        
        {/* ============================================================== */}
        {/* --- Card 1: পার্সোনাল অ্যাকাউন্ট (নীল থিম) --- */}
        {/* ============================================================== */}
        <div 
          className={`w-full relative rounded-[32px] sm:rounded-[38px] overflow-hidden border-[3.5px] border-[#0070e0] bg-gradient-to-b from-[#f2f8ff] via-white to-[#edf5ff] shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between ${
            user?.activeTier === 'personal' ? 'ring-4 ring-blue-400/50' : ''
          }`}
        >
          {/* সক্রিয় মোড ব্যাজ (যদি সক্রিয় থাকে) */}
          {user?.activeTier === 'personal' && (
            <div className="absolute top-3 right-3 px-3 py-1 bg-blue-600 text-white text-[10px] font-black rounded-full flex items-center gap-1 shadow-md z-20">
              <CheckCircle2 className="w-3 h-3 text-blue-200" />
              <span>সক্রিয় মোড</span>
            </div>
          )}

          <div>
            {/* ছবির মতো টপ আর্চ ও আইকন */}
            <div className="relative pt-6 sm:pt-7 pb-2 flex flex-col items-center">
              {/* আর্চ ব্যাকড্রপ */}
              <div className="absolute top-0 w-32 sm:w-40 h-16 sm:h-20 bg-gradient-to-b from-[#0091ff] via-[#38bdf8] to-transparent rounded-b-full opacity-90 -z-0"></div>

              {/* সার্কুলার আইকন */}
              <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white p-1.5 shadow-md ring-4 ring-[#0070e0] flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#0070e0] to-[#00a6ff] flex items-center justify-center">
                  <User className="w-8 h-8 sm:w-10 sm:h-10 text-white stroke-[2.5]" />
                </div>
              </div>

              {/* ক্যাপসুল ব্যাজ: পার্সোনাল অ্যাকাউন্ট */}
              <div className="relative z-10 -mt-2 px-6 py-1 rounded-full bg-[#0a48a3] text-white font-black text-xs sm:text-sm tracking-wide shadow-md">
                {plans.personal.name}
              </div>

              {/* বড় বোল্ড প্রাইস */}
              <div className="mt-2 text-3xl sm:text-5xl font-black text-[#0a48a3] tracking-tight">
                {plans.personal.priceFormatted}
              </div>
            </div>

            <div className="px-5 sm:px-6 space-y-3">
              {/* ছবির মতো সাবটাইটেল বক্স */}
              <div className="bg-[#e5f1ff] border border-[#b3d7ff] text-[#0a48a3] rounded-2xl py-2 px-3 text-center text-xs sm:text-sm font-extrabold shadow-2xs leading-snug">
                {plans.personal.subtitle}
              </div>

              {/* ৩-ডট ডিভাইডার (•••) */}
              <div className="flex items-center justify-center gap-1.5 text-[#0091ff] py-0.5">
                <span className="w-2 h-2 rounded-full bg-[#0091ff]"></span>
                <span className="w-2 h-2 rounded-full bg-[#0091ff]"></span>
                <span className="w-2 h-2 rounded-full bg-[#0091ff]"></span>
              </div>

              {/* ফিচার লিস্ট */}
              <div className="space-y-3 pt-1">
                {plans.personal.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#0070e0] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3.5]" />
                    </div>
                    <span className="text-slate-900 font-black text-xs sm:text-sm leading-tight">
                      {feat.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ক্যাপসুল বাটন */}
          <div className="p-5 sm:p-6 pt-4">
            <button
              onClick={() => onOpenDetails('personal')}
              className="w-full py-3 sm:py-3.5 px-6 rounded-full bg-gradient-to-r from-[#0057d9] via-[#0070f3] to-[#0057d9] hover:from-[#0047b3] hover:to-[#005cdb] text-white font-black text-xs sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 hover:scale-[1.02] active:scale-98 transition-all cursor-pointer"
            >
              <span className="text-base sm:text-lg">➔</span>
              <span>বিস্তারিত দেখুন</span>
              <span className="text-sm font-bold">&gt;</span>
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* --- Card 2: বিজনেস অ্যাকাউন্ট (সবুজ থিম - সবচেয়ে জনপ্রিয়) --- */}
        {/* ============================================================== */}
        <div 
          className={`w-full relative rounded-[32px] sm:rounded-[38px] overflow-hidden border-[3.5px] border-[#00c853] bg-gradient-to-b from-[#f2fff6] via-white to-[#edfff2] shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between ${
            user?.activeTier === 'business' ? 'ring-4 ring-emerald-400/50' : ''
          }`}
        >
          {/* ছবির মতো লাল রিবন: ★ সবচেয়ে জনপ্রিয় ★ */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
            <div className="relative px-5 sm:px-6 py-1 rounded-b-xl bg-gradient-to-r from-[#d32f2f] via-[#e53935] to-[#d32f2f] text-white font-black text-xs sm:text-sm tracking-wider flex items-center gap-1.5 shadow-md border-b-2 border-[#9a0007] whitespace-nowrap">
              <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span>সবচেয়ে জনপ্রিয়</span>
              <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
            </div>
          </div>

          <div>
            {/* ছবির মতো টপ আর্চ ও আইকন */}
            <div className="relative pt-8 sm:pt-9 pb-2 flex flex-col items-center">
              {/* আর্চ ব্যাকড্রপ */}
              <div className="absolute top-0 w-32 sm:w-40 h-16 sm:h-20 bg-gradient-to-b from-[#00c853] via-[#69f0ae] to-transparent rounded-b-full opacity-90 -z-0"></div>

              {/* সার্কুলার আইকন */}
              <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white p-1.5 shadow-md ring-4 ring-[#00c853] flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#00c853] to-[#00e676] flex items-center justify-center">
                  <Briefcase className="w-8 h-8 sm:w-10 sm:h-10 text-white stroke-[2.5]" />
                </div>
              </div>

              {/* ক্যাপসুল ব্যাজ: বিজনেস অ্যাকাউন্ট */}
              <div className="relative z-10 -mt-2 px-6 py-1 rounded-full bg-[#007e33] text-white font-black text-xs sm:text-sm tracking-wide shadow-md">
                {plans.business.name}
              </div>

              {/* বড় বোল্ড প্রাইস */}
              <div className="mt-2 text-3xl sm:text-5xl font-black text-[#007e33] tracking-tight">
                {plans.business.priceFormatted}
              </div>
            </div>

            <div className="px-5 sm:px-6 space-y-3">
              {/* ছবির মতো সাবটাইটেল বক্স */}
              <div className="bg-[#e8f8ee] border border-[#b7ecc6] text-[#006d2c] rounded-2xl py-2 px-3 text-center text-xs sm:text-sm font-extrabold shadow-2xs leading-snug">
                {plans.business.subtitle}
              </div>

              {/* ৩-ডট ডিভাইডার (•••) */}
              <div className="flex items-center justify-center gap-1.5 text-[#00c853] py-0.5">
                <span className="w-2 h-2 rounded-full bg-[#00c853]"></span>
                <span className="w-2 h-2 rounded-full bg-[#00c853]"></span>
                <span className="w-2 h-2 rounded-full bg-[#00c853]"></span>
              </div>

              {/* ফিচার লিস্ট */}
              <div className="space-y-3 pt-1">
                {plans.business.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#00c853] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3.5]" />
                    </div>
                    <span className="text-slate-900 font-black text-xs sm:text-sm leading-tight">
                      {feat.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ক্যাপসুল বাটন */}
          <div className="p-5 sm:p-6 pt-4">
            <button
              onClick={() => onOpenDetails('business')}
              className="w-full py-3 sm:py-3.5 px-6 rounded-full bg-gradient-to-r from-[#00993d] via-[#00c853] to-[#00993d] hover:from-[#007a30] hover:to-[#00b048] text-white font-black text-xs sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-green-500/30 hover:scale-[1.02] active:scale-98 transition-all cursor-pointer"
            >
              <span className="text-base sm:text-lg">➔</span>
              <span>বিস্তারিত দেখুন</span>
              <span className="text-sm font-bold">&gt;</span>
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* --- Card 3: Sub Admin Panel (পার্পল থিম - Recommended) --- */}
        {/* ============================================================== */}
        <div 
          className={`w-full relative rounded-[32px] sm:rounded-[38px] overflow-hidden border-[3.5px] border-[#9c27b0] bg-gradient-to-b from-[#fdf6ff] via-white to-[#f9edff] shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between ${
            user?.activeTier === 'sub_admin' ? 'ring-4 ring-purple-400/50' : ''
          }`}
        >
          {/* ছবির মতো গোল্ডেন রিবন: ★ Recommended */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
            <div className="relative px-5 sm:px-6 py-1 rounded-b-xl bg-gradient-to-r from-[#fbc02d] via-[#f57f17] to-[#fbc02d] text-amber-950 font-black text-xs sm:text-sm tracking-wider flex items-center gap-1.5 shadow-md border-b-2 border-[#b26a00] whitespace-nowrap">
              <Star className="w-3.5 h-3.5 fill-amber-950 text-amber-950" />
              <span>Recommended</span>
            </div>
          </div>

          <div>
            {/* ছবির মতো টপ আর্চ ও আইকন */}
            <div className="relative pt-8 sm:pt-9 pb-2 flex flex-col items-center">
              {/* আর্চ ব্যাকড্রপ */}
              <div className="absolute top-0 w-32 sm:w-40 h-16 sm:h-20 bg-gradient-to-b from-[#9c27b0] via-[#ce93d8] to-transparent rounded-b-full opacity-90 -z-0"></div>

              {/* সার্কুলার আইকন (শিল্ড ও স্টার) */}
              <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white p-1.5 shadow-md ring-4 ring-[#9c27b0] flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#7b1fa2] to-[#ab47bc] flex items-center justify-center">
                  <Award className="w-8 h-8 sm:w-10 sm:h-10 text-amber-300 fill-amber-300/30 stroke-[2.2]" />
                </div>
              </div>

              {/* ক্যাপসুল ব্যাজ: Sub Admin Panel */}
              <div className="relative z-10 -mt-2 px-6 py-1 rounded-full bg-[#4a148c] text-white font-black text-xs sm:text-sm tracking-wide shadow-md">
                {plans.sub_admin.name}
              </div>

              {/* বড় বোল্ড প্রাইস */}
              <div className="mt-2 text-3xl sm:text-5xl font-black text-[#4a148c] tracking-tight">
                {plans.sub_admin.priceFormatted}
              </div>
            </div>

            <div className="px-5 sm:px-6 space-y-3">
              {/* ছবির মতো সাবটাইটেল বক্স */}
              <div className="bg-[#f6ebff] border border-[#e3beff] text-[#58168f] rounded-2xl py-2 px-3 text-center text-xs sm:text-sm font-extrabold shadow-2xs leading-snug">
                {plans.sub_admin.badgeUnderPrice || plans.sub_admin.subtitle}
              </div>

              {/* ৩-ডট ডিভাইডার (•••) */}
              <div className="flex items-center justify-center gap-1.5 text-[#9c27b0] py-0.5">
                <span className="w-2 h-2 rounded-full bg-[#9c27b0]"></span>
                <span className="w-2 h-2 rounded-full bg-[#9c27b0]"></span>
                <span className="w-2 h-2 rounded-full bg-[#9c27b0]"></span>
              </div>

              {/* ফিচার লিস্ট */}
              <div className="space-y-3 pt-1">
                {plans.sub_admin.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#8e24aa] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3.5]" />
                    </div>
                    <span className="text-slate-900 font-black text-xs sm:text-sm leading-tight">
                      {feat.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ক্যাপসুল বাটন */}
          <div className="p-5 sm:p-6 pt-4">
            <button
              onClick={() => onOpenDetails('sub_admin')}
              className="w-full py-3 sm:py-3.5 px-6 rounded-full bg-gradient-to-r from-[#7b1fa2] via-[#9c27b0] to-[#7b1fa2] hover:from-[#6a1b9a] hover:to-[#8e24aa] text-white font-black text-xs sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30 hover:scale-[1.02] active:scale-98 transition-all cursor-pointer"
            >
              <span className="text-base sm:text-lg">➔</span>
              <span>বিস্তারিত দেখুন</span>
              <span className="text-sm font-bold">&gt;</span>
            </button>
          </div>
        </div>

      </div>

      {/* ============================================================== */}
      {/* 🛡️ ৩. ছবির নিচের সম্পূর্ণ ট্রাস্ট বার ও ব্লু রিবন */}
      {/* ============================================================== */}
      {/*<div className="w-full bg-white rounded-3xl border-2 border-slate-200 shadow-md p-4 sm:p-5 space-y-3 mt-4"> */}
        
        {/* ৪টি ফিচার কলাম */}
        {/*<div className="grid grid-cols-2 md:grid-cols-4 gap-3 divide-y md:divide-y-0 md:divide-x divide-slate-100"> */}
          
          {/* নিরাপদ প্রক্রিয়া */}
          {/*<div className="flex items-center justify-center gap-2.5 py-1 px-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-[#0070e0] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-xs sm:text-sm font-black text-slate-800">নিরাপদ প্রক্রিয়া</span>
          </div> */}

          {/* দ্রুত সেবা */}
          {/*<div className="flex items-center justify-center gap-2.5 py-1 px-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#00c853] flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 fill-[#00c853]" />
            </div>
            <span className="text-xs sm:text-sm font-black text-slate-800">দ্রুত সেবা</span>
          </div> */}

          {/* সাপোর্ট সারা বাংলাদেশে */}
          {/*<div className="flex items-center justify-center gap-2.5 py-1 px-2">
            <div className="w-8 h-8 rounded-full bg-sky-100 text-[#0091ff] flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs sm:text-sm font-black text-slate-800 leading-tight">সাপোর্ট</span>
              <span className="text-[10px] sm:text-xs text-slate-500 font-bold">সারা বাংলাদেশে</span>
            </div>
          </div>

          {/* বিশ্বস্ত সেবা */}
          {/*<div className="flex items-center justify-center gap-2.5 py-1 px-2">
            <div className="w-8 h-8 rounded-full bg-purple-100 text-[#9c27b0] flex items-center justify-center shrink-0">
              <Handshake className="w-5 h-5" />
            </div>
            <span className="text-xs sm:text-sm font-black text-slate-800">বিশ্বস্ত সেবা</span>
          </div>

        </div>

        {/* বটম ব্লু রিবন: স্মার্ট সেবা, সহজ সমাধান */}
        {/*<div className="flex items-center justify-center gap-2 sm:gap-4 pt-1">
          <div className="hidden sm:flex items-center gap-1 opacity-70">
            <span className="w-4 h-1 bg-blue-500 rounded-full"></span>
            <span className="w-6 h-1 bg-blue-600 rounded-full"></span>
          </div>

          <div className="w-full sm:w-auto px-8 py-2 rounded-xl bg-gradient-to-r from-[#003875] via-[#0057b7] to-[#003875] text-white text-center font-black text-xs sm:text-sm shadow-sm tracking-wide">
            স্মার্ট সেবা, সহজ সমাধান।
          </div>

          <div className="hidden sm:flex items-center gap-1 opacity-70">
            <span className="w-6 h-1 bg-blue-600 rounded-full"></span>
            <span className="w-4 h-1 bg-blue-500 rounded-full"></span>
          </div>
        </div>

      </div> */}

    </section>
  );
};