import React from 'react';
import { useApp } from '../context/AppContext';
import { AccountTier } from '../types';
import { 
  Check, 
  User, 
  Briefcase, 
  Award,
  Star, 
  CheckCircle2
} from 'lucide-react';
import { getTierPlans } from '../data/tierPlans';

interface TierCardsSectionProps {
  onOpenDetails: (tier: AccountTier) => void;
}

export const TierCardsSection: React.FC<TierCardsSectionProps> = ({ onOpenDetails }) => {
  const { user } = useApp();
  const plans = getTierPlans();

  return (
    <section className="space-y-4 sm:space-y-8 max-w-6xl mx-auto px-1.5 sm:px-4 py-4 sm:py-6">
      
      {/* ============================================================== */}
      {/* 👑 ১. শীর্ষ ব্যানার */}
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
            <span>১ মিনিটেই দেখে নিন এবং নিজের প্রয়োজন অনুযায়ী বেছে নিন।</span>
          </span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 🎯 ২. ৩টি কার্ড — সব ডিভাইসে পাশাপাশি ৩ কলাম, সমান উচ্চতা */}
      {/* ============================================================== */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-6 items-stretch pt-2">
        
        {/* ============================================================== */}
        {/* --- Card 1: পার্সোনাল অ্যাকাউন্ট (নীল থিম) --- */}
        {/* ============================================================== */}
        <div 
          className={`min-w-0 w-full h-full relative rounded-[16px] sm:rounded-[38px] overflow-hidden border-2 sm:border-[3.5px] border-[#0070e0] bg-gradient-to-b from-[#f2f8ff] via-white to-[#edf5ff] shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col ${
            user?.activeTier === 'personal' ? 'ring-2 sm:ring-4 ring-blue-400/50' : ''
          }`}
        >
          {/* সক্রিয় মোড ব্যাজ */}
          {user?.activeTier === 'personal' && (
            <div className="absolute top-1 right-1 sm:top-3 sm:right-3 px-1.5 sm:px-3 py-0.5 sm:py-1 bg-blue-600 text-white text-[7px] sm:text-[10px] font-black rounded-full flex items-center gap-0.5 sm:gap-1 shadow-md z-20">
              <CheckCircle2 className="w-2 h-2 sm:w-3 sm:h-3 text-blue-200" />
              <span>সক্রিয় মোড</span>
            </div>
          )}

          <div className="flex-1">
            {/* টপ আর্চ ও আইকন */}
            <div className="relative pt-3 sm:pt-7 pb-1 sm:pb-2 flex flex-col items-center">
              {/* আর্চ ব্যাকড্রপ */}
              <div className="absolute top-0 w-16 sm:w-40 h-9 sm:h-20 bg-gradient-to-b from-[#0091ff] via-[#38bdf8] to-transparent rounded-b-full opacity-90 -z-0"></div>

              {/* সার্কুলার আইকন */}
              <div className="relative z-10 w-10 h-10 sm:w-20 sm:h-20 rounded-full bg-white p-0.5 sm:p-1.5 shadow-md ring-2 sm:ring-4 ring-[#0070e0] flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#0070e0] to-[#00a6ff] flex items-center justify-center">
                  <User className="w-5 h-5 sm:w-10 sm:h-10 text-white stroke-[2.5]" />
                </div>
              </div>

              {/* ক্যাপসুল ব্যাজ */}
              <div className="relative z-10 -mt-1 sm:-mt-2 px-1.5 sm:px-6 py-0.5 sm:py-1 rounded-full bg-[#0a48a3] text-white font-black text-[8px] sm:text-sm tracking-wide shadow-md text-center whitespace-nowrap">
                {plans.personal.name}
              </div>

              {/* প্রাইস */}
              <div className="mt-1 sm:mt-2 text-lg sm:text-5xl font-black text-[#0a48a3] tracking-tight">
                {plans.personal.priceFormatted}
              </div>
            </div>

            <div className="px-1.5 sm:px-6 space-y-1 sm:space-y-3">
              {/* সাবটাইটেল বক্স — mobile এ hidden, desktop এ দেখাবে */}
              <div className="hidden sm:flex bg-[#e5f1ff] border border-[#b3d7ff] text-[#0a48a3] rounded-2xl py-2 px-3 text-center text-sm font-extrabold shadow-2xs leading-snug break-words items-center justify-center">
                <span>{plans.personal.subtitle}</span>
              </div>

              {/* ৩-ডট ডিভাইডার */}
              <div className="flex items-center justify-center gap-1 sm:gap-1.5 text-[#0091ff] py-0.5">
                <span className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-[#0091ff]"></span>
                <span className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-[#0091ff]"></span>
                <span className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-[#0091ff]"></span>
              </div>

              {/* পার্সোনাল একাউন্ট বিশেষ সুবিধা — mobile এ compact, desktop এ বড় */}
              <div className="bg-[#dbeafe]/60 border border-[#93c5fd]/50 rounded-lg sm:rounded-xl px-1 sm:px-3 py-1 sm:py-2 space-y-0.5 sm:space-y-1">
                {[
                  { short: 'তথ্য যাচাই', full: 'নিজের প্রয়োজনীয় তথ্য যাচাই' },
                  { short: 'সহজ ব্যবহার', full: 'সহজ ও সুবিধাজনক ব্যবহার' },
                  { short: 'ব্যক্তিগত কাজ', full: 'ব্যক্তিগত কাজের উপযোগী' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-0.5 sm:gap-1">
                    <span className="text-[#2563eb] font-black text-[7px] sm:text-sm shrink-0">✦</span>
                    <span className="sm:hidden text-[7px] font-bold text-[#1e3a8a] leading-tight break-words min-w-0">{item.short}</span>
                    <span className="hidden sm:inline text-xs font-bold text-[#1e3a8a] leading-snug break-words min-w-0">{item.full}</span>
                  </div>
                ))}
              </div>

              {/* ফিচার লিস্ট */}
              <div className="space-y-1.5 sm:space-y-3 pt-0.5 sm:pt-1">
                {plans.personal.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-1 sm:gap-3">
                    <div className="w-3 h-3 sm:w-6 sm:h-6 rounded-full bg-[#0070e0] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Check className="w-2 h-2 sm:w-4 sm:h-4 stroke-[3.5]" />
                    </div>
                    <span className="min-w-0 break-words text-slate-900 font-black text-[8px] sm:text-sm leading-tight">
                      {feat.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ক্যাপসুল বাটন (সবসময় কার্ডের নিচে) */}
          <div className="p-1.5 sm:p-6 pt-2 sm:pt-4 mt-auto">
            <button
              onClick={() => onOpenDetails('personal')}
              className="w-full py-1.5 sm:py-3.5 px-1 sm:px-6 rounded-full bg-gradient-to-r from-[#0057d9] via-[#0070f3] to-[#0057d9] hover:from-[#0047b3] hover:to-[#005cdb] text-white font-black text-[8px] sm:text-base flex items-center justify-center gap-0.5 sm:gap-2 shadow-lg shadow-blue-500/30 hover:scale-[1.02] active:scale-98 transition-all cursor-pointer whitespace-nowrap"
            >
              <span className="text-[9px] sm:text-lg">➔</span>
              <span>বিস্তারিত দেখুন</span>
              <span className="text-[9px] sm:text-sm font-bold">&gt;</span>
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* --- Card 2: বিজনেস অ্যাকাউন্ট (সবুজ থিম - সবচেয়ে জনপ্রিয়) --- */}
        {/* ============================================================== */}
        <div 
          className={`min-w-0 w-full h-full relative rounded-[16px] sm:rounded-[38px] overflow-hidden border-2 sm:border-[3.5px] border-[#00c853] bg-gradient-to-b from-[#f2fff6] via-white to-[#edfff2] shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col ${
            user?.activeTier === 'business' ? 'ring-2 sm:ring-4 ring-emerald-400/50' : ''
          }`}
        >
          {/* লাল রিবন: ★ সবচেয়ে জনপ্রিয় ★ */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
            <div className="relative px-1.5 sm:px-6 py-0.5 sm:py-1 rounded-b-md sm:rounded-b-xl bg-gradient-to-r from-[#d32f2f] via-[#e53935] to-[#d32f2f] text-white font-black text-[7px] sm:text-sm tracking-normal sm:tracking-wider flex items-center gap-0.5 sm:gap-1.5 shadow-md border-b-2 border-[#9a0007] whitespace-nowrap">
              <Star className="w-2 h-2 sm:w-3.5 sm:h-3.5 fill-amber-300 text-amber-300" />
              <span>সবচেয়ে জনপ্রিয়</span>
              <Star className="w-2 h-2 sm:w-3.5 sm:h-3.5 fill-amber-300 text-amber-300" />
            </div>
          </div>

          <div className="flex-1">
            {/* টপ আর্চ ও আইকন */}
            <div className="relative pt-5 sm:pt-9 pb-1 sm:pb-2 flex flex-col items-center">
              {/* আর্চ ব্যাকড্রপ */}
              <div className="absolute top-0 w-16 sm:w-40 h-9 sm:h-20 bg-gradient-to-b from-[#00c853] via-[#69f0ae] to-transparent rounded-b-full opacity-90 -z-0"></div>

              {/* সার্কুলার আইকন */}
              <div className="relative z-10 w-10 h-10 sm:w-20 sm:h-20 rounded-full bg-white p-0.5 sm:p-1.5 shadow-md ring-2 sm:ring-4 ring-[#00c853] flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#00c853] to-[#00e676] flex items-center justify-center">
                  <Briefcase className="w-5 h-5 sm:w-10 sm:h-10 text-white stroke-[2.5]" />
                </div>
              </div>

              {/* ক্যাপসুল ব্যাজ */}
              <div className="relative z-10 -mt-1 sm:-mt-2 px-1.5 sm:px-6 py-0.5 sm:py-1 rounded-full bg-[#007e33] text-white font-black text-[8px] sm:text-sm tracking-wide shadow-md text-center whitespace-nowrap">
                {plans.business.name}
              </div>

              {/* প্রাইস */}
              <div className="mt-1 sm:mt-2 text-lg sm:text-5xl font-black text-[#007e33] tracking-tight">
                {plans.business.priceFormatted}
              </div>
            </div>

            <div className="px-1.5 sm:px-6 space-y-1 sm:space-y-3">
              {/* সাবটাইটেল বক্স — mobile এ hidden, desktop এ দেখাবে */}
              <div className="hidden sm:flex bg-[#e8f8ee] border border-[#b7ecc6] text-[#006d2c] rounded-2xl py-2 px-3 text-center text-sm font-extrabold shadow-2xs leading-snug break-words items-center justify-center">
                <span>{plans.business.subtitle}</span>
              </div>

              {/* ৩-ডট ডিভাইডার */}
              <div className="flex items-center justify-center gap-1 sm:gap-1.5 text-[#00c853] py-0.5">
                <span className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-[#00c853]"></span>
                <span className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-[#00c853]"></span>
                <span className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-[#00c853]"></span>
              </div>

              {/* বিজনেস একাউন্ট বিশেষ সুবিধা — mobile এ compact, desktop এ বড় */}
              <div className="bg-[#dcfce7]/60 border border-[#86efac]/50 rounded-lg sm:rounded-xl px-1 sm:px-3 py-1 sm:py-2 space-y-0.5 sm:space-y-1">
                {[
                  { short: 'কাস্টমার সেবা', full: 'নিজের পাশাপাশি কাস্টমারের কাজ' },
                  { short: 'আয়ের সুযোগ', full: 'ডিজিটাল সেবা দিয়ে আয়ের সুযোগ' },
                  { short: 'বিভিন্ন সার্ভিস', full: 'এক অ্যাকাউন্টে বিভিন্ন সার্ভিস' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-0.5 sm:gap-1">
                    <span className="text-[#16a34a] font-black text-[7px] sm:text-sm shrink-0">✦</span>
                    <span className="sm:hidden text-[7px] font-bold text-[#14532d] leading-tight break-words min-w-0">{item.short}</span>
                    <span className="hidden sm:inline text-xs font-bold text-[#14532d] leading-snug break-words min-w-0">{item.full}</span>
                  </div>
                ))}
              </div>

              {/* ফিচার লিস্ট */}
              <div className="space-y-1.5 sm:space-y-3 pt-0.5 sm:pt-1">
                {plans.business.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-1 sm:gap-3">
                    <div className="w-3 h-3 sm:w-6 sm:h-6 rounded-full bg-[#00c853] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Check className="w-2 h-2 sm:w-4 sm:h-4 stroke-[3.5]" />
                    </div>
                    <span className="min-w-0 break-words text-slate-900 font-black text-[8px] sm:text-sm leading-tight">
                      {feat.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ক্যাপসুল বাটন (সবসময় কার্ডের নিচে) */}
          <div className="p-1.5 sm:p-6 pt-2 sm:pt-4 mt-auto">
            <button
              onClick={() => onOpenDetails('business')}
              className="w-full py-1.5 sm:py-3.5 px-1 sm:px-6 rounded-full bg-gradient-to-r from-[#00993d] via-[#00c853] to-[#00993d] hover:from-[#007a30] hover:to-[#00b048] text-white font-black text-[8px] sm:text-base flex items-center justify-center gap-0.5 sm:gap-2 shadow-lg shadow-green-500/30 hover:scale-[1.02] active:scale-98 transition-all cursor-pointer whitespace-nowrap"
            >
              <span className="text-[9px] sm:text-lg">➔</span>
              <span>বিস্তারিত দেখুন</span>
              <span className="text-[9px] sm:text-sm font-bold">&gt;</span>
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* --- Card 3: Sub Admin Panel (পার্পল থিম - Recommended) --- */}
        {/* ============================================================== */}
        <div 
          className={`min-w-0 w-full h-full relative rounded-[16px] sm:rounded-[38px] overflow-hidden border-2 sm:border-[3.5px] border-[#9c27b0] bg-gradient-to-b from-[#fdf6ff] via-white to-[#f9edff] shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col ${
            user?.activeTier === 'sub_admin' ? 'ring-2 sm:ring-4 ring-purple-400/50' : ''
          }`}
        >
          {/* গোল্ডেন রিবন: ★ Recommended */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
            <div className="relative px-1.5 sm:px-6 py-0.5 sm:py-1 rounded-b-md sm:rounded-b-xl bg-gradient-to-r from-[#fbc02d] via-[#f57f17] to-[#fbc02d] text-amber-950 font-black text-[7px] sm:text-sm tracking-normal sm:tracking-wider flex items-center gap-0.5 sm:gap-1.5 shadow-md border-b-2 border-[#b26a00] whitespace-nowrap">
              <Star className="w-2 h-2 sm:w-3.5 sm:h-3.5 fill-amber-950 text-amber-950" />
              <span>Recommended</span>
            </div>
          </div>

          <div className="flex-1">
            {/* টপ আর্চ ও আইকন */}
            <div className="relative pt-5 sm:pt-9 pb-1 sm:pb-2 flex flex-col items-center">
              {/* আর্চ ব্যাকড্রপ */}
              <div className="absolute top-0 w-16 sm:w-40 h-9 sm:h-20 bg-gradient-to-b from-[#9c27b0] via-[#ce93d8] to-transparent rounded-b-full opacity-90 -z-0"></div>

              {/* সার্কুলার আইকন */}
              <div className="relative z-10 w-10 h-10 sm:w-20 sm:h-20 rounded-full bg-white p-0.5 sm:p-1.5 shadow-md ring-2 sm:ring-4 ring-[#9c27b0] flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#7b1fa2] to-[#ab47bc] flex items-center justify-center">
                  <Award className="w-5 h-5 sm:w-10 sm:h-10 text-amber-300 fill-amber-300/30 stroke-[2.2]" />
                </div>
              </div>

              {/* ক্যাপসুল ব্যাজ */}
              <div className="relative z-10 -mt-1 sm:-mt-2 px-1.5 sm:px-6 py-0.5 sm:py-1 rounded-full bg-[#4a148c] text-white font-black text-[8px] sm:text-sm tracking-wide shadow-md text-center whitespace-nowrap">
                {plans.sub_admin.name}
              </div>

              {/* প্রাইস */}
              <div className="mt-1 sm:mt-2 text-lg sm:text-5xl font-black text-[#4a148c] tracking-tight">
                {plans.sub_admin.priceFormatted}
              </div>
            </div>

            <div className="px-1.5 sm:px-6 space-y-1 sm:space-y-3">
              {/* সাবটাইটেল বক্স — mobile এ hidden, desktop এ দেখাবে */}
              <div className="hidden sm:flex bg-[#f6ebff] border border-[#e3beff] text-[#58168f] rounded-2xl py-2 px-3 text-center text-sm font-extrabold shadow-2xs leading-snug break-words items-center justify-center">
                <span>{plans.sub_admin.badgeUnderPrice || plans.sub_admin.subtitle}</span>
              </div>

              {/* ৩-ডট ডিভাইডার */}
              <div className="flex items-center justify-center gap-1 sm:gap-1.5 text-[#9c27b0] py-0.5">
                <span className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-[#9c27b0]"></span>
                <span className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-[#9c27b0]"></span>
                <span className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-[#9c27b0]"></span>
              </div>

              {/* ফিচার লিস্ট */}
              <div className="space-y-1.5 sm:space-y-3 pt-0.5 sm:pt-1">
                {plans.sub_admin.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-1 sm:gap-3">
                    <div className="w-3 h-3 sm:w-6 sm:h-6 rounded-full bg-[#8e24aa] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Check className="w-2 h-2 sm:w-4 sm:h-4 stroke-[3.5]" />
                    </div>
                    <span className="min-w-0 break-words text-slate-900 font-black text-[8px] sm:text-sm leading-tight">
                      {feat.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ক্যাপসুল বাটন (সবসময় কার্ডের নিচে) */}
          <div className="p-1.5 sm:p-6 pt-2 sm:pt-4 mt-auto">
            <button
              onClick={() => onOpenDetails('sub_admin')}
              className="w-full py-1.5 sm:py-3.5 px-1 sm:px-6 rounded-full bg-gradient-to-r from-[#7b1fa2] via-[#9c27b0] to-[#7b1fa2] hover:from-[#6a1b9a] hover:to-[#8e24aa] text-white font-black text-[8px] sm:text-base flex items-center justify-center gap-0.5 sm:gap-2 shadow-lg shadow-purple-500/30 hover:scale-[1.02] active:scale-98 transition-all cursor-pointer whitespace-nowrap"
            >
              <span className="text-[9px] sm:text-lg">➔</span>
              <span>বিস্তারিত দেখুন</span>
              <span className="text-[9px] sm:text-sm font-bold">&gt;</span>
            </button>
          </div>
        </div>

      </div>

    </section>
  );
};