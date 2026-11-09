import React from 'react';
import { useApp } from '../context/AppContext';
import { AccountTier } from '../types';
import { 
  Check, 
  Eye, 
  ChevronRight, 
  CheckCircle2, 
  Flame, 
  Award, 
  User, 
  Briefcase
} from 'lucide-react';
import { getTierPlans } from '../data/tierPlans';

interface TierCardsSectionProps {
  onOpenDetails: (tier: AccountTier) => void;
}

export const TierCardsSection: React.FC<TierCardsSectionProps> = ({ onOpenDetails }) => {
  const { user } = useApp();
  const plans = getTierPlans();

  return (
    <section className="space-y-4 sm:space-y-5">
      
      {/* Crown Banner Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto px-1">
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          <div className="h-0.5 w-6 sm:w-20 bg-gradient-to-r from-transparent to-blue-800"></div>
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#003875] via-[#004e9c] to-[#002f6c] text-white shadow-md sm:shadow-lg border border-blue-400/50">
            <span className="text-amber-300 text-sm sm:text-xl">👑</span>
            <span className="text-xs sm:text-base md:text-lg font-black tracking-wide text-white">
              কোন অ্যাকাউন্টটি আপনার জন্য? 🤔
            </span>
          </div>
          <div className="h-0.5 w-6 sm:w-20 bg-gradient-to-l from-transparent to-blue-800"></div>
        </div>

        {/* Subtitle Ribbon */}
        <div>
          <span className="inline-block px-3 sm:px-5 py-1 sm:py-1.5 rounded-full bg-amber-200/90 border border-amber-400 text-amber-950 font-bold text-[10px] sm:text-sm shadow-xs">
            ১ মিনিটে দেখে নিন এবং নিজের প্রয়োজন অনুযায়ী বেছে নিন।
          </span>
        </div>
      </div>

      {/* 3 Tier Cards - সমান উচ্চতা এবং বাটন একদম একই সোজা সমান্তরালে */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-4 md:gap-6 items-stretch w-full">
        
        {/* ============================================================== */}
        {/* --- Card 1: পার্সোনাল অ্যাকাউন্ট (Personal Account) --- */}
        {/* ============================================================== */}
        <div 
          className={`w-full h-full relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 transition-all duration-300 flex flex-col justify-between bg-gradient-to-b from-sky-50/90 via-white to-blue-50/60 shadow-md sm:shadow-xl hover:shadow-2xl ${
            user?.activeTier === 'personal'
              ? 'border-blue-500 ring-2 sm:ring-4 ring-blue-300/50'
              : 'border-blue-200 hover:border-blue-400'
          }`}
        >
          {user?.activeTier === 'personal' && (
            <div className="absolute top-1 right-1 sm:top-3 sm:right-3 px-1 sm:px-2.5 py-0.5 bg-blue-600 text-white text-[8px] sm:text-[11px] font-bold rounded-full flex items-center gap-0.5 sm:gap-1 shadow-md z-10">
              <CheckCircle2 className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-blue-200" />
              <span className="hidden sm:inline">সক্রিয় মোড</span>
              <span className="sm:hidden">সক্রিয়</span>
            </div>
          )}

          <div className="p-2 sm:p-6 pt-4 sm:pt-7 flex-1 flex flex-col">
            
            {/* Vector Icon & Header */}
            <div className="flex flex-col items-center text-center">
              <div className="w-9 h-9 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-blue-600 via-sky-500 to-indigo-600 p-0.5 sm:p-1 shadow-sm sm:shadow-lg shadow-blue-500/25 ring-2 sm:ring-4 ring-white flex items-center justify-center">
                <div className="w-full h-full rounded-lg sm:rounded-xl bg-gradient-to-tr from-blue-600 to-sky-500 flex items-center justify-center">
                  <User className="w-4 h-4 sm:w-8 sm:h-8 md:w-9 md:h-9 text-white stroke-[2.5]" />
                </div>
              </div>

              {/* Title Badge */}
              <div className="mt-1.5 sm:mt-3 px-1.5 sm:px-4 py-0.5 sm:py-1 rounded-full bg-blue-600 text-white font-black text-[10px] sm:text-sm md:text-base tracking-tight sm:tracking-wide shadow-xs">
                {plans.personal.name}
              </div>

              {/* Price */}
              <div className="mt-1 sm:mt-3 flex items-baseline justify-center gap-0.5">
                <span className="text-base sm:text-3xl md:text-5xl font-black text-blue-800 tracking-tight">
                  {plans.personal.priceFormatted}
                </span>
              </div>

              {/* Subtitle Area */}
              <div className="min-h-[32px] sm:min-h-[42px] flex items-center justify-center mt-0.5 sm:mt-1">
                <p className="text-[9px] sm:text-xs md:text-sm font-bold text-slate-700 leading-tight sm:leading-snug break-words">
                  {plans.personal.subtitle}
                </p>
              </div>
            </div>

            {/* Features List */}
            <div className="pt-2 sm:pt-4 border-t border-blue-200/80 mt-2 sm:mt-3 flex-1 flex flex-col justify-between gap-1.5 sm:gap-2.5">
              {plans.personal.features.map((feat, idx) => (
                <div 
                  key={idx} 
                  className="flex-1 flex items-center gap-1 sm:gap-2.5 p-1.5 sm:p-2.5 rounded-xl bg-white/85 border border-blue-100 shadow-2xs"
                >
                  <div className="w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center shrink-0 shadow-2xs">
                    <Check className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-emerald-600 stroke-[3.5]" />
                  </div>
                  <div className="flex flex-col min-w-0 text-left">
                    <span className="text-[10px] sm:text-xs md:text-sm font-black text-slate-900 leading-tight sm:leading-snug break-words">
                      {feat.title}
                    </span>
                    {feat.subText && (
                      <span className="hidden sm:block text-[11px] sm:text-xs font-semibold text-slate-600 mt-0.5">
                        {feat.subText}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Action button */}
          <div className="p-2 sm:p-5 pt-2 mt-auto">
            <button
              onClick={() => onOpenDetails('personal')}
              className="w-full py-1.5 sm:py-3 px-1 sm:px-4 rounded-lg sm:rounded-full bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600 hover:from-blue-500 hover:via-sky-500 hover:to-indigo-500 text-white font-extrabold text-[10px] sm:text-xs md:text-sm flex items-center justify-center gap-0.5 sm:gap-2 shadow-xs sm:shadow-md shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group cursor-pointer"
            >
              <Eye className="w-3 h-3 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
              <span>বিস্তারিত</span>
              <ChevronRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* --- Card 2: বিজনেস অ্যাকাউন্ট (Business Account) - Most Popular --- */}
        {/* ============================================================== */}
        <div 
          className={`w-full h-full relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 transition-all duration-300 flex flex-col justify-between bg-gradient-to-b from-emerald-50/90 via-white to-green-50/70 shadow-md sm:shadow-xl hover:shadow-2xl scale-100 md:-translate-y-1.5 ${
            user?.activeTier === 'business'
              ? 'border-emerald-500 ring-2 sm:ring-4 ring-emerald-300/70'
              : 'border-emerald-400 hover:border-emerald-500'
          }`}
        >
          {/* "সবচেয়ে জনপ্রিয়" Badge */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-0.5 z-10">
            <div className="px-1.5 sm:px-4 py-0.5 sm:py-1 rounded-b-lg sm:rounded-b-xl bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 text-white font-black text-[8px] sm:text-xs tracking-tight sm:tracking-wider flex items-center gap-0.5 sm:gap-1.5 shadow-md whitespace-nowrap">
              <Flame className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-white text-orange-100" />
              <span className="hidden sm:inline">সবচেয়ে জনপ্রিয়</span>
              <span className="sm:hidden">জনপ্রিয়</span>
            </div>
          </div>

          <div className="p-2 sm:p-6 pt-4 sm:pt-7 flex-1 flex flex-col">
            
            {/* Briefcase Icon */}
            <div className="flex flex-col items-center text-center">
              <div className="w-9 h-9 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-green-500 p-0.5 sm:p-1 shadow-sm sm:shadow-lg shadow-emerald-500/25 ring-2 sm:ring-4 ring-white flex items-center justify-center">
                <div className="w-full h-full rounded-lg sm:rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center">
                  <Briefcase className="w-4 h-4 sm:w-8 sm:h-8 md:w-9 md:h-9 text-white stroke-[2.5]" />
                </div>
              </div>

              {/* Title Badge */}
              <div className="mt-1.5 sm:mt-3 px-1.5 sm:px-4 py-0.5 sm:py-1 rounded-full bg-emerald-600 text-white font-black text-[10px] sm:text-sm md:text-base tracking-tight sm:tracking-wide shadow-xs">
                {plans.business.name}
              </div>

              {/* Price */}
              <div className="mt-1 sm:mt-3 flex items-baseline justify-center gap-0.5">
                <span className="text-base sm:text-3xl md:text-5xl font-black text-emerald-800 tracking-tight">
                  {plans.business.priceFormatted}
                </span>
              </div>

              {/* Subtitle Area */}
              <div className="min-h-[32px] sm:min-h-[42px] flex items-center justify-center mt-0.5 sm:mt-1">
                <p className="text-[9px] sm:text-xs md:text-sm font-bold text-slate-700 leading-tight sm:leading-snug break-words">
                  {plans.business.subtitle}
                </p>
              </div>
            </div>

            {/* Feature Bullets - শুধুমাত্র ২টি ফিচারই পুরো জায়গা সমানভাবে ফিলাপ করবে, কোনো গ্যাপ থাকবে না */}
            <div className="pt-2 sm:pt-4 border-t border-emerald-200/80 mt-2 sm:mt-3 flex-1 flex flex-col justify-between gap-2 sm:gap-3">
              {plans.business.features.map((feat, idx) => (
                <div 
                  key={idx} 
                  className="flex-1 flex items-center gap-1.5 sm:gap-3 p-2 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/90 border border-emerald-200/90 shadow-xs"
                >
                  <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center shrink-0 shadow-2xs">
                    <Check className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-emerald-600 stroke-[3.5]" />
                  </div>
                  <div className="flex flex-col min-w-0 text-left">
                    <span className="text-[10px] sm:text-sm md:text-base font-black text-slate-900 leading-tight sm:leading-snug break-words">
                      {feat.title}
                    </span>
                    {feat.subText && (
                      <span className="hidden sm:block text-[11px] sm:text-xs font-semibold text-slate-600 mt-1">
                        {feat.subText}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Action button */}
          <div className="p-2 sm:p-5 pt-2 mt-auto">
            <button
              onClick={() => onOpenDetails('business')}
              className="w-full py-1.5 sm:py-3 px-1 sm:px-4 rounded-lg sm:rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:via-teal-500 hover:to-cyan-600 text-white font-extrabold text-[10px] sm:text-xs md:text-sm flex items-center justify-center gap-0.5 sm:gap-2 shadow-xs sm:shadow-md shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group cursor-pointer"
            >
              <Eye className="w-3 h-3 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
              <span>বিস্তারিত</span>
              <ChevronRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* --- Card 3: Sub Admin Panel - RECOMMENDED --- */}
        {/* ============================================================== */}
        <div 
          className={`w-full h-full relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 transition-all duration-300 flex flex-col justify-between bg-gradient-to-b from-purple-50/90 via-white to-indigo-50/70 shadow-md sm:shadow-xl hover:shadow-2xl ${
            user?.activeTier === 'sub_admin'
              ? 'border-purple-600 ring-2 sm:ring-4 ring-purple-300/70'
              : 'border-purple-300 hover:border-purple-400'
          }`}
        >
          {/* Golden "RECOMMENDED" Banner */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-0.5 z-10">
            <div className="px-1.5 sm:px-4 py-0.5 sm:py-1 rounded-b-lg sm:rounded-b-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-amber-950 font-black text-[8px] sm:text-xs tracking-tight sm:tracking-wider flex items-center gap-0.5 sm:gap-1.5 shadow-md border-b border-amber-600 whitespace-nowrap">
              <Award className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-amber-700 text-amber-950" />
              <span className="hidden sm:inline">RECOMMENDED</span>
              <span className="sm:hidden">সেরা</span>
            </div>
          </div>

          <div className="p-2 sm:p-6 pt-4 sm:pt-7 flex-1 flex flex-col">
            
            {/* Award Icon */}
            <div className="flex flex-col items-center text-center">
              <div className="w-9 h-9 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-purple-700 via-indigo-600 to-amber-500 p-0.5 sm:p-1 shadow-sm sm:shadow-lg shadow-purple-500/25 ring-2 sm:ring-4 ring-white flex items-center justify-center">
                <div className="w-full h-full rounded-lg sm:rounded-xl bg-gradient-to-tr from-purple-700 to-indigo-600 flex items-center justify-center">
                  <Award className="w-4 h-4 sm:w-8 sm:h-8 md:w-9 md:h-9 text-amber-300 fill-amber-400 stroke-[2.2]" />
                </div>
              </div>

              {/* Title Badge */}
              <div className="mt-1.5 sm:mt-3 px-1.5 sm:px-4 py-0.5 sm:py-1 rounded-full bg-purple-700 text-white font-black text-[10px] sm:text-sm md:text-base tracking-tight sm:tracking-wide shadow-xs">
                {plans.sub_admin.name}
              </div>

              {/* Price */}
              <div className="mt-1 sm:mt-3 flex items-baseline justify-center gap-0.5">
                <span className="text-base sm:text-3xl md:text-5xl font-black text-purple-900 tracking-tight">
                  {plans.sub_admin.priceFormatted}
                </span>
              </div>

              {/* Subtitle / Badge Area */}
              <div className="min-h-[32px] sm:min-h-[42px] flex items-center justify-center mt-0.5 sm:mt-1">
                <span className="px-2 sm:px-3 py-0.5 rounded-full bg-purple-100 border border-purple-300 text-purple-900 text-[8px] sm:text-xs font-black">
                  {plans.sub_admin.badgeUnderPrice}
                </span>
              </div>
            </div>

            {/* Feature Bullets */}
            <div className="pt-2 sm:pt-4 border-t border-purple-200/80 mt-2 sm:mt-3 flex-1 flex flex-col justify-between gap-1.5 sm:gap-2.5">
              {plans.sub_admin.features.map((feat, idx) => (
                <div 
                  key={idx} 
                  className="flex-1 flex items-center gap-1 sm:gap-2.5 p-1.5 sm:p-2 rounded-xl bg-white/85 border border-purple-100 shadow-2xs"
                >
                  <div className="w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full bg-purple-100 border border-purple-300 text-purple-700 flex items-center justify-center shrink-0 shadow-2xs">
                    <Check className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 stroke-[3]" />
                  </div>
                  <div className="flex flex-col min-w-0 text-left">
                    <span className="text-[9px] sm:text-xs md:text-sm font-bold text-purple-950 leading-tight sm:leading-snug break-words">
                      {feat.title}
                    </span>
                    {feat.subText && (
                      <span className="hidden sm:block text-[11px] sm:text-xs font-semibold text-slate-700 mt-0.5 pl-0.5">
                        {feat.subText}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Action button */}
          <div className="p-2 sm:p-5 pt-2 mt-auto">
            <button
              onClick={() => onOpenDetails('sub_admin')}
              className="w-full py-1.5 sm:py-3 px-1 sm:px-4 rounded-lg sm:rounded-full bg-gradient-to-r from-purple-700 via-indigo-600 to-amber-600 hover:from-purple-600 hover:via-indigo-500 hover:to-amber-500 text-white font-extrabold text-[10px] sm:text-xs md:text-sm flex items-center justify-center gap-0.5 sm:gap-2 shadow-xs sm:shadow-md shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group cursor-pointer"
            >
              <Eye className="w-3 h-3 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
              <span>বিস্তারিত</span>
              <ChevronRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>

    </section>
  );
};