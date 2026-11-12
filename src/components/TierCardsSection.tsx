import React from 'react';
import { useApp } from '../context/AppContext';
import { AccountTier } from '../types';
import { 
  Check, 
  CheckCircle2, 
  User, 
  Briefcase, 
  Award,
  Star
} from 'lucide-react';
import { getTierPlans } from '../data/tierPlans';

interface TierCardsSectionProps {
  onOpenDetails: (tier: AccountTier) => void;
}

export const TierCardsSection: React.FC<TierCardsSectionProps> = ({ onOpenDetails }) => {
  const { user } = useApp();
  const plans = getTierPlans();

  return (
    <section className="space-y-3 sm:space-y-5 max-w-6xl mx-auto px-1 sm:px-4 py-1 sm:py-2">
      
      {/* ============================================================== */}
      {/* 👑 ক্রাউন ব্যানার হেডার */}
      {/* ============================================================== */}
      <div className="text-center space-y-1.5 sm:space-y-2 max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-1.5 sm:gap-3">
          <div className="h-0.5 w-5 sm:w-14 bg-gradient-to-r from-transparent to-blue-600 rounded-full"></div>
          
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-1 sm:py-2 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#003875] via-[#004e9c] to-[#002f6c] text-white shadow-md border border-blue-400/50">
            <span className="text-amber-300 text-sm sm:text-xl animate-bounce">👑</span>
            <span className="text-[11px] sm:text-base md:text-lg font-black tracking-wide text-white">
              কোন অ্যাকাউন্টটি আপনার জন্য? 🤔
            </span>
          </div>

          <div className="h-0.5 w-5 sm:w-14 bg-gradient-to-l from-transparent to-blue-600 rounded-full"></div>
        </div>

        {/* সাবটাইটেল গ্রিন রিবন */}
        <div>
          <span className="inline-flex items-center gap-1 px-3 sm:px-4 py-0.5 sm:py-1 rounded-full bg-emerald-100 border border-emerald-400/80 text-emerald-950 font-bold text-[9px] sm:text-xs shadow-xs">
            <CheckCircle2 className="w-3 h-3 text-emerald-700" />
            <span>১ মিনিটেই দেখে নিন এবং নিজের প্রয়োজন অনুযায়ী বেছে নিন।</span>
          </span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 🎯 ৩টি কার্ড: কোনো ডানে-বামে স্ক্রোল ছাড়াই মোবাইলে পাশাপাশি ৩ কলাম */}
      {/* ============================================================== */}
      <div className="grid grid-cols-3 gap-1 sm:gap-3 md:gap-5 w-full items-stretch pt-1 sm:pt-2">
        
        {/* ============================================================== */}
        {/* --- Card 1: পার্সোনাল অ্যাকাউন্ট (Personal Account) --- */}
        {/* ============================================================== */}
        <div 
          className={`w-full relative rounded-2xl sm:rounded-3xl overflow-hidden border sm:border-2 transition-all duration-300 flex flex-col justify-between bg-gradient-to-b from-sky-50/90 via-white to-blue-50/70 shadow-xs hover:shadow-lg ${
            user?.activeTier === 'personal'
              ? 'border-blue-500 ring-2 sm:ring-4 ring-blue-300/40'
              : 'border-blue-200 hover:border-blue-400'
          }`}
        >
          {user?.activeTier === 'personal' && (
            <div className="absolute top-1 right-1 sm:top-2 sm:right-2 px-1 sm:px-2 py-0.5 bg-blue-600 text-white text-[7.5px] sm:text-[10px] font-black rounded-full flex items-center gap-0.5 shadow-xs z-10">
              <CheckCircle2 className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-blue-200" />
              <span className="hidden sm:inline">সক্রিয় মোড</span>
              <span className="sm:hidden">সক্রিয়</span>
            </div>
          )}

          <div className="p-1.5 sm:p-4 flex-1 flex flex-col items-center text-center">
            
            {/* Avatar Circle */}
            <div className="w-8 h-8 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-blue-600 via-sky-400 to-indigo-600 p-0.5 sm:p-1 shadow-xs ring-1 sm:ring-4 ring-white flex items-center justify-center mb-1 sm:mb-2">
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-blue-600 to-sky-500 flex items-center justify-center">
                <User className="w-4 h-4 sm:w-7 sm:h-7 text-white stroke-[2.5]" />
              </div>
            </div>

            {/* Title Pill Badge */}
            <div className="px-1.5 sm:px-3 py-0.5 rounded-full bg-gradient-to-r from-blue-600 to-sky-600 text-white font-black text-[8px] sm:text-xs tracking-tight sm:tracking-wide shadow-2xs mb-0.5 sm:mb-1 whitespace-nowrap">
              {plans.personal.name}
            </div>

            {/* Price */}
            <div className="flex items-baseline justify-center gap-0.5 my-0.5">
              <span className="text-sm sm:text-2xl md:text-3xl font-black text-blue-800 tracking-tight">
                {plans.personal.priceFormatted}
              </span>
            </div>

            {/* Subtitle Badge */}
            <div className="min-h-[22px] sm:min-h-[34px] flex items-center justify-center mt-0.5 px-0.5">
              <div className="inline-flex items-center justify-center gap-0.5 sm:gap-1 px-1.5 sm:px-2.5 py-0.5 rounded-full bg-gradient-to-r from-blue-50 to-sky-50 border border-blue-200 text-blue-900 font-bold text-[7.5px] sm:text-[10px] shadow-2xs text-center leading-tight">
                <span className="text-[8px] sm:text-xs">👤</span>
                <span className="line-clamp-1 sm:line-clamp-none">{plans.personal.subtitle}</span>
              </div>
            </div>

            {/* Three Dots Separator (•••) */}
            <div className="flex items-center justify-center gap-0.5 sm:gap-1 text-sky-400 my-1 sm:my-1.5">
              <span className="w-1 h-1 rounded-full bg-sky-400"></span>
              <span className="w-1 h-1 rounded-full bg-sky-400"></span>
              <span className="w-1 h-1 rounded-full bg-sky-400"></span>
            </div>

            {/* Features List */}
            <div className="w-full pt-1 border-t border-blue-100 flex-1 flex flex-col justify-center gap-1.5 sm:gap-2.5 text-left">
              {plans.personal.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-1 sm:gap-2 py-0.5">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Check className="w-2 h-2 sm:w-2.5 sm:h-2.5 stroke-[3.5]" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[8.5px] sm:text-xs md:text-sm font-extrabold text-slate-800 leading-tight sm:leading-snug">
                      {feat.title}
                    </span>
                    {feat.subText && (
                      <span className="hidden sm:block text-[9.5px] sm:text-[10.5px] font-semibold text-slate-500 mt-0.5">
                        {feat.subText}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Action Button */}
          <div className="p-1.5 sm:p-3.5 pt-0">
            <button
              onClick={() => onOpenDetails('personal')}
              className="w-full py-1.5 sm:py-2.5 px-1 sm:px-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-[9px] sm:text-xs md:text-sm flex items-center justify-center gap-0.5 sm:gap-1 shadow-xs transition-all cursor-pointer group"
            >
              <span>বিস্তারিত</span>
              <span className="text-[9px] sm:text-xs">&gt;</span>
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* --- Card 2: বিজনেস অ্যাকাউন্ট (Business Account) --- */}
        {/* ============================================================== */}
        <div 
          className={`w-full relative rounded-2xl sm:rounded-3xl overflow-hidden border sm:border-2 transition-all duration-300 flex flex-col justify-between bg-gradient-to-b from-emerald-50/90 via-white to-green-50/70 shadow-xs hover:shadow-lg ${
            user?.activeTier === 'business'
              ? 'border-emerald-500 ring-2 sm:ring-4 ring-emerald-300/40'
              : 'border-emerald-300 hover:border-emerald-500'
          }`}
        >
          {/* লাল তারকা খচিত রিবন: ★ সবচেয়ে জনপ্রিয় ★ */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
            <div className="px-1.5 sm:px-3.5 py-0.5 rounded-b-md sm:rounded-b-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-600 text-white font-black text-[7.5px] sm:text-[11px] tracking-tight sm:tracking-wider flex items-center gap-0.5 shadow-xs border-b border-red-800 whitespace-nowrap">
              <Star className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 fill-amber-300 text-amber-300" />
              <span className="sm:hidden">জনপ্রিয়</span>
              <span className="hidden sm:inline">সবচেয়ে জনপ্রিয়</span>
              <Star className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 fill-amber-300 text-amber-300" />
            </div>
          </div>

          <div className="p-1.5 sm:p-4 pt-4 sm:pt-6 flex-1 flex flex-col items-center text-center">
            
            {/* Avatar Circle */}
            <div className="w-8 h-8 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-emerald-600 via-teal-400 to-green-500 p-0.5 sm:p-1 shadow-xs ring-1 sm:ring-4 ring-white flex items-center justify-center mb-1 sm:mb-2">
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center">
                <Briefcase className="w-4 h-4 sm:w-7 sm:h-7 text-white stroke-[2.5]" />
              </div>
            </div>

            {/* Title Pill Badge */}
            <div className="px-1.5 sm:px-3 py-0.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-[8px] sm:text-xs tracking-tight sm:tracking-wide shadow-2xs mb-0.5 sm:mb-1 whitespace-nowrap">
              {plans.business.name}
            </div>

            {/* Price */}
            <div className="flex items-baseline justify-center gap-0.5 my-0.5">
              <span className="text-sm sm:text-2xl md:text-3xl font-black text-emerald-800 tracking-tight">
                {plans.business.priceFormatted}
              </span>
            </div>

            {/* Subtitle Badge */}
            <div className="min-h-[22px] sm:min-h-[34px] flex items-center justify-center mt-0.5 px-0.5">
              <div className="inline-flex items-center justify-center gap-0.5 sm:gap-1 px-1.5 sm:px-2.5 py-0.5 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-950 font-bold text-[7.5px] sm:text-[10px] shadow-2xs text-center leading-tight">
                <span className="text-[8px] sm:text-xs">💼</span>
                <span className="line-clamp-1 sm:line-clamp-none">{plans.business.subtitle}</span>
              </div>
            </div>

            {/* Three Dots Separator (•••) */}
            <div className="flex items-center justify-center gap-0.5 sm:gap-1 text-emerald-400 my-1 sm:my-1.5">
              <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
              <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
              <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
            </div>

            {/* Features List */}
            <div className="w-full pt-1 border-t border-emerald-100 flex-1 flex flex-col justify-center gap-2 sm:gap-3 text-left">
              {plans.business.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-1 sm:gap-2 py-0.5">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Check className="w-2 h-2 sm:w-2.5 sm:h-2.5 stroke-[3.5]" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[8.5px] sm:text-xs md:text-sm font-extrabold text-slate-800 leading-tight sm:leading-snug">
                      {feat.title}
                    </span>
                    {feat.subText && (
                      <span className="hidden sm:block text-[9.5px] sm:text-[10.5px] font-semibold text-slate-500 mt-0.5">
                        {feat.subText}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Action Button */}
          <div className="p-1.5 sm:p-3.5 pt-0">
            <button
              onClick={() => onOpenDetails('business')}
              className="w-full py-1.5 sm:py-2.5 px-1 sm:px-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-[9px] sm:text-xs md:text-sm flex items-center justify-center gap-0.5 sm:gap-1 shadow-xs transition-all cursor-pointer group"
            >
              <span>বিস্তারিত</span>
              <span className="text-[9px] sm:text-xs">&gt;</span>
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* --- Card 3: Sub Admin Panel --- */}
        {/* ============================================================== */}
        <div 
          className={`w-full relative rounded-2xl sm:rounded-3xl overflow-hidden border sm:border-2 transition-all duration-300 flex flex-col justify-between bg-gradient-to-b from-purple-50/90 via-white to-indigo-50/70 shadow-xs hover:shadow-lg ${
            user?.activeTier === 'sub_admin'
              ? 'border-purple-600 ring-2 sm:ring-4 ring-purple-300/40'
              : 'border-purple-300 hover:border-purple-500'
          }`}
        >
          {/* গোল্ডেন রিবন: ★ Recommended */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
            <div className="px-1.5 sm:px-3.5 py-0.5 rounded-b-md sm:rounded-b-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-amber-950 font-black text-[7.5px] sm:text-[11px] tracking-tight sm:tracking-wider flex items-center gap-0.5 shadow-xs border-b border-amber-600 whitespace-nowrap">
              <Star className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 fill-amber-800 text-amber-800" />
              <span>Recommended</span>
            </div>
          </div>

          <div className="p-1.5 sm:p-4 pt-4 sm:pt-6 flex-1 flex flex-col items-center text-center">
            
            {/* Avatar Circle */}
            <div className="w-8 h-8 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-purple-700 via-indigo-500 to-amber-500 p-0.5 sm:p-1 shadow-xs ring-1 sm:ring-4 ring-white flex items-center justify-center mb-1 sm:mb-2">
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-purple-700 to-indigo-600 flex items-center justify-center">
                <Award className="w-4 h-4 sm:w-7 sm:h-7 text-amber-300 fill-amber-300/30 stroke-[2.2]" />
              </div>
            </div>

            {/* Title Pill Badge */}
            <div className="px-1.5 sm:px-3 py-0.5 rounded-full bg-gradient-to-r from-purple-700 to-indigo-700 text-white font-black text-[8px] sm:text-xs tracking-tight sm:tracking-wide shadow-2xs mb-0.5 sm:mb-1 whitespace-nowrap">
              {plans.sub_admin.name}
            </div>

            {/* Price */}
            <div className="flex items-baseline justify-center gap-0.5 my-0.5">
              <span className="text-sm sm:text-2xl md:text-3xl font-black text-purple-900 tracking-tight">
                {plans.sub_admin.priceFormatted}
              </span>
            </div>

            {/* Subtitle Badge */}
            <div className="min-h-[22px] sm:min-h-[34px] flex items-center justify-center mt-0.5 px-0.5">
              <div className="inline-flex items-center justify-center gap-0.5 sm:gap-1 px-1.5 sm:px-2.5 py-0.5 rounded-full bg-gradient-to-r from-purple-100 via-indigo-50 to-amber-50 border border-purple-300 text-purple-950 font-black text-[7.5px] sm:text-[10px] shadow-2xs text-center leading-tight">
                <span className="text-amber-500 text-[8px] sm:text-xs">👑</span>
                <span className="line-clamp-1 sm:line-clamp-none">{plans.sub_admin.badgeUnderPrice || plans.sub_admin.subtitle}</span>
              </div>
            </div>

            {/* Three Dots Separator (•••) */}
            <div className="flex items-center justify-center gap-0.5 sm:gap-1 text-purple-400 my-1 sm:my-1.5">
              <span className="w-1 h-1 rounded-full bg-purple-500"></span>
              <span className="w-1 h-1 rounded-full bg-purple-500"></span>
              <span className="w-1 h-1 rounded-full bg-purple-500"></span>
            </div>

            {/* Features List */}
            <div className="w-full pt-1 border-t border-purple-100 flex-1 flex flex-col justify-center gap-1.5 sm:gap-2.5 text-left">
              {plans.sub_admin.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-1 sm:gap-2 py-0.5">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-purple-700 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Check className="w-2 h-2 sm:w-2.5 sm:h-2.5 stroke-[3.5]" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[8.5px] sm:text-xs md:text-sm font-extrabold text-slate-800 leading-tight sm:leading-snug">
                      {feat.title}
                    </span>
                    {feat.subText && (
                      <span className="hidden sm:block text-[9.5px] sm:text-[10.5px] font-semibold text-slate-500 mt-0.5">
                        {feat.subText}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Action Button */}
          <div className="p-1.5 sm:p-3.5 pt-0">
            <button
              onClick={() => onOpenDetails('sub_admin')}
              className="w-full py-1.5 sm:py-2.5 px-1 sm:px-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-purple-700 via-indigo-600 to-amber-600 hover:from-purple-600 hover:to-indigo-500 text-white font-black text-[9px] sm:text-xs md:text-sm flex items-center justify-center gap-0.5 sm:gap-1 shadow-xs transition-all cursor-pointer group"
            >
              <span>বিস্তারিত</span>
              <span className="text-[9px] sm:text-xs">&gt;</span>
            </button>
          </div>
        </div>

      </div>

    </section>
  );
};