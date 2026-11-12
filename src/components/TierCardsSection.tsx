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
    <section className="space-y-2 sm:space-y-5 max-w-6xl mx-auto px-1 sm:px-4 py-1 sm:py-2">
      
      {/* ============================================================== */}
      {/* 👑 ক্রাউন ব্যানার হেডার */}
      {/* ============================================================== */}
      <div className="text-center space-y-1 sm:space-y-2 max-w-2xl mx-auto">
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
            <span>১ মিনিটেই দেখে নিন এবং নিজের প্রয়োজন অনুযায়ী বেছে নিন।</span>
          </span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 🎯 ৩টি কার্ড: মোবাইলে পাশাপাশি ৩ কলাম — Image 1 এর মতো */}
      {/* ============================================================== */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-4 w-full items-stretch pt-1 sm:pt-2">
        
        {/* ============================================================== */}
        {/* --- Card 1: পার্সোনাল অ্যাকাউন্ট --- */}
        {/* ============================================================== */}
        <div 
          className={`w-full relative rounded-xl sm:rounded-3xl overflow-hidden border-2 transition-all duration-300 flex flex-col justify-between bg-gradient-to-b from-sky-50 via-white to-blue-50 shadow-sm hover:shadow-lg ${
            user?.activeTier === 'personal'
              ? 'border-blue-500 ring-2 sm:ring-4 ring-blue-300/40'
              : 'border-blue-200 hover:border-blue-400'
          }`}
        >
          {/* সক্রিয় badge */}
          {user?.activeTier === 'personal' && (
            <div className="absolute top-1 right-1 sm:top-2 sm:right-2 px-1 sm:px-2 py-0.5 bg-blue-600 text-white text-[7px] sm:text-[10px] font-black rounded-full flex items-center gap-0.5 shadow-xs z-10">
              <CheckCircle2 className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-blue-200" />
              <span className="hidden sm:inline">সক্রিয় মোড</span>
              <span className="sm:hidden">সক্রিয়</span>
            </div>
          )}

          <div className="p-2 sm:p-4 flex-1 flex flex-col items-center text-center gap-1 sm:gap-0">
            
            {/* Avatar Circle */}
            <div className="w-9 h-9 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-blue-600 via-sky-400 to-indigo-600 p-0.5 sm:p-1 shadow ring-2 sm:ring-4 ring-white flex items-center justify-center mb-1">
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-blue-600 to-sky-500 flex items-center justify-center">
                <User className="w-4 h-4 sm:w-7 sm:h-7 text-white stroke-[2.5]" />
              </div>
            </div>

            {/* Title Pill Badge */}
            <div className="px-2 sm:px-3 py-0.5 rounded-full bg-gradient-to-r from-blue-600 to-sky-600 text-white font-black text-[8px] sm:text-xs shadow-sm leading-tight text-center">
              পার্সোনাল<br className="sm:hidden" />{' '}
              <span className="hidden sm:inline">অ্যাকাউন্ট</span>
              <span className="sm:hidden">অ্যাকাউন্ট</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline justify-center gap-0.5 mt-1 sm:mt-2">
              <span className="text-base sm:text-2xl md:text-3xl font-black text-blue-800 tracking-tight">
                {plans.personal.priceFormatted}
              </span>
            </div>

            {/* Subtitle */}
            <div className="px-1 py-0.5 rounded-lg bg-blue-50 border border-blue-100 text-blue-900 font-semibold text-[7px] sm:text-[10px] text-center leading-tight mt-0.5">
              {plans.personal.subtitle}
            </div>

            {/* Divider */}
            <div className="w-full border-t border-blue-100 mt-1.5 sm:mt-2 pt-1.5 sm:pt-2 flex flex-col gap-1 sm:gap-2 text-left">
              {plans.personal.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-1 sm:gap-1.5">
                  <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Check className="w-2 h-2 sm:w-2.5 sm:h-2.5 stroke-[3.5]" />
                  </div>
                  <span className="text-[8px] sm:text-[11px] md:text-sm font-bold text-slate-800 leading-tight">
                    {feat.title}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* Action Button */}
          <div className="p-2 sm:p-3.5 pt-0">
            <button
              onClick={() => onOpenDetails('personal')}
              className="w-full py-1.5 sm:py-2.5 px-1 sm:px-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-[9px] sm:text-xs md:text-sm flex items-center justify-center gap-0.5 sm:gap-1 shadow-xs transition-all cursor-pointer"
            >
              <span className="hidden sm:inline">👁</span>
              <span>বিস্তারিত</span>
              <span className="text-[9px] sm:text-xs">&gt;</span>
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* --- Card 2: বিজনেস অ্যাকাউন্ট --- */}
        {/* ============================================================== */}
        <div 
          className={`w-full relative rounded-xl sm:rounded-3xl overflow-hidden border-2 transition-all duration-300 flex flex-col justify-between bg-gradient-to-b from-emerald-50 via-white to-green-50 shadow-sm hover:shadow-lg ${
            user?.activeTier === 'business'
              ? 'border-emerald-500 ring-2 sm:ring-4 ring-emerald-300/40'
              : 'border-emerald-400 hover:border-emerald-600'
          }`}
        >
          {/* 🔥 সবচেয়ে জনপ্রিয় ব্যানার — উপরে */}
          <div className="absolute -top-px left-1/2 -translate-x-1/2 z-20 w-full flex justify-center">
            <div className="px-2 sm:px-4 py-0.5 sm:py-1 bg-gradient-to-r from-red-600 via-rose-500 to-red-600 text-white font-black text-[7px] sm:text-[11px] flex items-center gap-0.5 sm:gap-1 shadow border-b-2 border-red-800 whitespace-nowrap rounded-b-lg sm:rounded-b-xl">
              <Star className="w-2 h-2 sm:w-3 sm:h-3 fill-amber-300 text-amber-300 shrink-0" />
              <span className="sm:hidden">সবচেয়ে জনপ্রিয়</span>
              <span className="hidden sm:inline">★ সবচেয়ে জনপ্রিয় ★</span>
              <Star className="w-2 h-2 sm:w-3 sm:h-3 fill-amber-300 text-amber-300 shrink-0" />
            </div>
          </div>

          <div className="p-2 sm:p-4 pt-5 sm:pt-7 flex-1 flex flex-col items-center text-center gap-1 sm:gap-0">
            
            {/* Avatar Circle */}
            <div className="w-9 h-9 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-emerald-600 via-teal-400 to-green-500 p-0.5 sm:p-1 shadow ring-2 sm:ring-4 ring-white flex items-center justify-center mb-1">
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center">
                <Briefcase className="w-4 h-4 sm:w-7 sm:h-7 text-white stroke-[2.5]" />
              </div>
            </div>

            {/* Title */}
            <div className="px-2 sm:px-3 py-0.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-[8px] sm:text-xs shadow-sm leading-tight text-center">
              বিজনেস<br className="sm:hidden" />{' '}
              <span className="hidden sm:inline">অ্যাকাউন্ট</span>
              <span className="sm:hidden">অ্যাকাউন্ট</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline justify-center gap-0.5 mt-1 sm:mt-2">
              <span className="text-base sm:text-2xl md:text-3xl font-black text-emerald-800 tracking-tight">
                {plans.business.priceFormatted}
              </span>
            </div>

            {/* Subtitle */}
            <div className="px-1 py-0.5 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-900 font-semibold text-[7px] sm:text-[10px] text-center leading-tight mt-0.5">
              {plans.business.subtitle}
            </div>

            {/* Divider + Features */}
            <div className="w-full border-t border-emerald-100 mt-1.5 sm:mt-2 pt-1.5 sm:pt-2 flex flex-col gap-1 sm:gap-2 text-left">
              {plans.business.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-1 sm:gap-1.5">
                  <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Check className="w-2 h-2 sm:w-2.5 sm:h-2.5 stroke-[3.5]" />
                  </div>
                  <span className="text-[8px] sm:text-[11px] md:text-sm font-bold text-slate-800 leading-tight">
                    {feat.title}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* Action Button */}
          <div className="p-2 sm:p-3.5 pt-0">
            <button
              onClick={() => onOpenDetails('business')}
              className="w-full py-1.5 sm:py-2.5 px-1 sm:px-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-[9px] sm:text-xs md:text-sm flex items-center justify-center gap-0.5 sm:gap-1 shadow-xs transition-all cursor-pointer"
            >
              <span className="hidden sm:inline">👁</span>
              <span>বিস্তারিত</span>
              <span className="text-[9px] sm:text-xs">&gt;</span>
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* --- Card 3: Sub Admin Panel --- */}
        {/* ============================================================== */}
        <div 
          className={`w-full relative rounded-xl sm:rounded-3xl overflow-hidden border-2 transition-all duration-300 flex flex-col justify-between bg-gradient-to-b from-purple-50 via-white to-indigo-50 shadow-sm hover:shadow-lg ${
            user?.activeTier === 'sub_admin'
              ? 'border-purple-600 ring-2 sm:ring-4 ring-purple-300/40'
              : 'border-purple-300 hover:border-purple-500'
          }`}
        >
          {/* ⭐ Recommended ব্যানার — উপরে */}
          <div className="absolute -top-px left-1/2 -translate-x-1/2 z-20 w-full flex justify-center">
            <div className="px-2 sm:px-4 py-0.5 sm:py-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-amber-950 font-black text-[7px] sm:text-[11px] flex items-center gap-0.5 sm:gap-1 shadow border-b-2 border-amber-600 whitespace-nowrap rounded-b-lg sm:rounded-b-xl">
              <Star className="w-2 h-2 sm:w-3 sm:h-3 fill-amber-700 text-amber-700 shrink-0" />
              <span>Recommended</span>
            </div>
          </div>

          <div className="p-2 sm:p-4 pt-5 sm:pt-7 flex-1 flex flex-col items-center text-center gap-1 sm:gap-0">
            
            {/* Avatar Circle */}
            <div className="w-9 h-9 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-purple-700 via-indigo-500 to-amber-500 p-0.5 sm:p-1 shadow ring-2 sm:ring-4 ring-white flex items-center justify-center mb-1">
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-purple-700 to-indigo-600 flex items-center justify-center">
                <Award className="w-4 h-4 sm:w-7 sm:h-7 text-amber-300 fill-amber-300/30 stroke-[2.2]" />
              </div>
            </div>

            {/* Title */}
            <div className="px-2 sm:px-3 py-0.5 rounded-full bg-gradient-to-r from-purple-700 to-indigo-700 text-white font-black text-[8px] sm:text-xs shadow-sm leading-tight text-center">
              Sub Admin<br className="sm:hidden" />{' '}Panel
            </div>

            {/* Price */}
            <div className="flex items-baseline justify-center gap-0.5 mt-1 sm:mt-2">
              <span className="text-base sm:text-2xl md:text-3xl font-black text-purple-900 tracking-tight">
                {plans.sub_admin.priceFormatted}
              </span>
            </div>

            {/* Subtitle */}
            <div className="px-1 py-0.5 rounded-lg bg-purple-50 border border-purple-100 text-purple-900 font-semibold text-[7px] sm:text-[10px] text-center leading-tight mt-0.5">
              {plans.sub_admin.badgeUnderPrice || plans.sub_admin.subtitle}
            </div>

            {/* Divider + Features */}
            <div className="w-full border-t border-purple-100 mt-1.5 sm:mt-2 pt-1.5 sm:pt-2 flex flex-col gap-1 sm:gap-2 text-left">
              {plans.sub_admin.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-1 sm:gap-1.5">
                  <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-purple-700 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Check className="w-2 h-2 sm:w-2.5 sm:h-2.5 stroke-[3.5]" />
                  </div>
                  <span className="text-[8px] sm:text-[11px] md:text-sm font-bold text-slate-800 leading-tight">
                    {feat.title}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* Action Button */}
          <div className="p-2 sm:p-3.5 pt-0">
            <button
              onClick={() => onOpenDetails('sub_admin')}
              className="w-full py-1.5 sm:py-2.5 px-1 sm:px-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-purple-700 via-indigo-600 to-amber-600 hover:from-purple-600 hover:to-indigo-500 text-white font-black text-[9px] sm:text-xs md:text-sm flex items-center justify-center gap-0.5 sm:gap-1 shadow-xs transition-all cursor-pointer"
            >
              <span className="hidden sm:inline">👁</span>
              <span>বিস্তারিত</span>
              <span className="text-[9px] sm:text-xs">&gt;</span>
            </button>
          </div>
        </div>

      </div>

    </section>
  );
};
