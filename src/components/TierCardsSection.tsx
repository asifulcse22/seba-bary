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
  Briefcase, 
  Gift, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles,
  PlusCircle
} from 'lucide-react';
import { getTierPlans, TIER_PRICES } from '../data/tierPlans';

interface TierCardsSectionProps {
  onOpenDetails: (tier: AccountTier) => void;
}

export const TierCardsSection: React.FC<TierCardsSectionProps> = ({ onOpenDetails }) => {
  const { user, setActiveTab, switchTier } = useApp();
  const plans = getTierPlans();

  return (
    <section className="space-y-5">
      
      {/* Crown Banner Header matching Image 1 */}
      <div className="text-center space-y-2.5 max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          <div className="h-0.5 w-10 sm:w-20 bg-gradient-to-r from-transparent to-blue-800"></div>
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-gradient-to-r from-[#003875] via-[#004e9c] to-[#002f6c] text-white shadow-lg border border-blue-400/50">
            <span className="text-amber-300 text-lg sm:text-xl">👑</span>
            <span className="text-sm sm:text-base md:text-lg font-black tracking-wide text-white">
              কোন অ্যাকাউন্টটি আপনার জন্য? 🤔
            </span>
          </div>
          <div className="h-0.5 w-10 sm:w-20 bg-gradient-to-l from-transparent to-blue-800"></div>
        </div>

        {/* Subtitle Ribbon: High contrast & readable font */}
        <div>
          <span className="inline-block px-5 py-1.5 rounded-full bg-amber-200/90 border border-amber-400 text-amber-950 font-bold text-xs sm:text-sm shadow-xs">
            ১ মিনিটে দেখে নিন এবং নিজের প্রয়োজন অনুযায়ী বেছে নিন।
          </span>
        </div>
      </div>

      {/* 3 Tier Cards Grid - Horizontal Carousel on mobile, 3-column grid on desktop */}
      <div className="flex md:grid md:grid-cols-3 gap-4 sm:gap-6 items-stretch overflow-x-auto pb-4 pt-1 px-1 -mx-1 sm:mx-0 snap-x snap-mandatory scroll-smooth no-scrollbar">
        
        {/* ============================================================== */}
        {/* --- Card 1: পার্সোনাল অ্যাকাউন্ট (Personal Account) --- */}
        {/* ============================================================== */}
        <div 
          className={`w-[85vw] max-w-[340px] shrink-0 snap-center md:w-auto md:max-w-none relative rounded-3xl overflow-hidden border-2 transition-all duration-300 flex flex-col justify-between bg-gradient-to-b from-sky-50/80 via-white to-blue-50/60 shadow-lg hover:shadow-2xl ${
            user?.activeTier === 'personal'
              ? 'border-blue-500 ring-4 ring-blue-300/50'
              : 'border-blue-200 hover:border-blue-400'
          }`}
        >
          {user?.activeTier === 'personal' && (
            <div className="absolute top-3 right-3 px-2.5 py-0.5 bg-blue-600 text-white text-[11px] font-bold rounded-full flex items-center gap-1 shadow-md z-10">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-200" /> সক্রিয় মোড
            </div>
          )}

          <div className="p-5 sm:p-6 space-y-4">
            
            {/* Clear High-Definition Vector Icon & Header */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-tr from-blue-600 via-sky-500 to-indigo-600 p-1 shadow-lg shadow-blue-500/25 ring-4 ring-white flex items-center justify-center">
                <div className="w-full h-full rounded-xl bg-gradient-to-tr from-blue-600 to-sky-500 flex items-center justify-center">
                  <User className="w-9 h-9 text-white stroke-[2.5]" />
                </div>
              </div>

              {/* Title Badge */}
              <div className="mt-3.5 px-4 py-1 rounded-full bg-blue-600 text-white font-extrabold text-sm sm:text-base tracking-wide shadow-sm">
                {plans.personal.name}
              </div>

              {/* Price: Auto updates when TIER_PRICES.personal changes */}
              <div className="mt-3 flex items-baseline justify-center gap-1">
                <span className="text-3xl sm:text-4xl md:text-5xl font-black text-blue-800 tracking-tight">
                  {plans.personal.priceFormatted}
                </span>
              </div>

              <p className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
                {plans.personal.subtitle}
              </p>
            </div>

            {/* Features List with clear Bangla text and sharp icons */}
            <div className="space-y-3 pt-3 border-t border-blue-200/80">
              {plans.personal.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-blue-100 border border-blue-300 text-blue-700 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      {feat.title}
                    </span>
                    {feat.subText && (
                      <span className="text-[11px] sm:text-xs font-semibold text-slate-600 mt-0.5">
                        {feat.subText}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Wallet Balance inside Personal Card */}
          <div className="px-5 pb-3">
            <div className="p-3 rounded-2xl bg-white border border-blue-200/90 shadow-xs flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-500 text-white flex items-center justify-center font-black text-sm shadow-xs shrink-0">
                  ৳
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 block leading-tight">
                    বর্তমান ওয়ালেট ব্যালেন্স
                  </span>
                  <span className="text-lg sm:text-xl font-black text-blue-900 tracking-tight tabular-nums">
                    ৳ {(user?.tierBalances?.personal ?? 0).toLocaleString('bn-BD')}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  switchTier('personal');
                  setActiveTab('wallet_hub');
                }}
                className="px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all flex items-center gap-1 cursor-pointer shrink-0"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>রিচার্জ</span>
              </button>
            </div>
          </div>

          {/* Action button */}
          <div className="p-5 pt-0">
            <button
              onClick={() => onOpenDetails('personal')}
              className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600 hover:from-blue-500 hover:via-sky-500 hover:to-indigo-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group cursor-pointer"
            >
              <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>বিস্তারিত দেখুন</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* --- Card 2: বিজনেস অ্যাকাউন্ট (Business Account) - Most Popular --- */}
        {/* ============================================================== */}
        <div 
          className={`w-[85vw] max-w-[340px] shrink-0 snap-center md:w-auto md:max-w-none relative rounded-3xl overflow-hidden border-2 transition-all duration-300 flex flex-col justify-between bg-gradient-to-b from-emerald-50/90 via-white to-green-50/70 shadow-xl hover:shadow-2xl scale-100 md:-translate-y-1.5 ${
            user?.activeTier === 'business'
              ? 'border-emerald-500 ring-4 ring-emerald-300/70'
              : 'border-emerald-400 hover:border-emerald-500'
          }`}
        >
          {/* "সবচেয়ে জনপ্রিয়" Badge */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-0.5 z-10">
            <div className="px-4 py-1 rounded-b-xl bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 text-white font-black text-xs sm:text-sm tracking-wider flex items-center gap-1.5 shadow-md">
              <Flame className="w-3.5 h-3.5 fill-white text-orange-100" />
              <span>সবচেয়ে জনপ্রিয়</span>
            </div>
          </div>

          <div className="p-5 sm:p-6 pt-7 space-y-4">
            
            {/* Clear High-Definition Briefcase Vector Icon */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-green-500 p-1 shadow-lg shadow-emerald-500/25 ring-4 ring-white flex items-center justify-center">
                <div className="w-full h-full rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center">
                  <Briefcase className="w-9 h-9 text-white stroke-[2.5]" />
                </div>
              </div>

              {/* Title Badge */}
              <div className="mt-3.5 px-4 py-1 rounded-full bg-emerald-600 text-white font-extrabold text-sm sm:text-base tracking-wide shadow-sm">
                {plans.business.name}
              </div>

              {/* Price: Auto updates when TIER_PRICES.business changes */}
              <div className="mt-3 flex items-baseline justify-center gap-1">
                <span className="text-3xl sm:text-4xl md:text-5xl font-black text-emerald-800 tracking-tight">
                  {plans.business.priceFormatted}
                </span>
              </div>

              <p className="text-xs sm:text-sm font-bold text-slate-800 mt-1 max-w-[260px]">
                {plans.business.subtitle}
              </p>
            </div>

            {/* Feature Bullets matching Image 1 with clear Bengali text */}
            <div className="space-y-3 pt-3 border-t border-emerald-200/80">
              {plans.business.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  {feat.iconType === 'gift' ? (
                    <div className="w-5 h-5 rounded-full bg-amber-100 border border-amber-300 text-amber-700 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <Gift className="w-3.5 h-3.5 text-amber-700 stroke-[2.5]" />
                    </div>
                  ) : feat.iconType === 'trend' ? (
                    <div className="w-5 h-5 rounded-full bg-teal-100 border border-teal-300 text-teal-700 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <TrendingUp className="w-3.5 h-3.5 text-teal-700 stroke-[2.5]" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      {feat.title}
                    </span>
                    {feat.subText && (
                      <span className="text-[11px] sm:text-xs font-semibold text-slate-600 mt-0.5">
                        {feat.subText}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Wallet Balance inside Business Card */}
          <div className="px-5 pb-3">
            <div className="p-3 rounded-2xl bg-white border border-emerald-200/90 shadow-xs flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-black text-sm shadow-xs shrink-0">
                  ৳
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 block leading-tight">
                    বর্তমান ওয়ালেট ব্যালেন্স
                  </span>
                  <span className="text-lg sm:text-xl font-black text-emerald-900 tracking-tight tabular-nums">
                    ৳ {(user?.tierBalances?.business ?? 0).toLocaleString('bn-BD')}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  switchTier('business');
                  setActiveTab('wallet_hub');
                }}
                className="px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all flex items-center gap-1 cursor-pointer shrink-0"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>রিচার্জ</span>
              </button>
            </div>
          </div>

          {/* Action button */}
          <div className="p-5 pt-0">
            <button
              onClick={() => onOpenDetails('business')}
              className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:via-teal-500 hover:to-cyan-600 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group cursor-pointer"
            >
              <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>বিস্তারিত দেখুন</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* --- Card 3: Sub Admin Panel - RECOMMENDED --- */}
        {/* ============================================================== */}
        <div 
          className={`w-[85vw] max-w-[340px] shrink-0 snap-center md:w-auto md:max-w-none relative rounded-3xl overflow-hidden border-2 transition-all duration-300 flex flex-col justify-between bg-gradient-to-b from-purple-50/90 via-white to-indigo-50/70 shadow-lg hover:shadow-2xl ${
            user?.activeTier === 'sub_admin'
              ? 'border-purple-600 ring-4 ring-purple-300/70'
              : 'border-purple-300 hover:border-purple-400'
          }`}
        >
          {/* Golden "RECOMMENDED" Banner */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-0.5 z-10">
            <div className="px-4 py-1 rounded-b-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-amber-950 font-black text-xs sm:text-sm tracking-wider flex items-center gap-1.5 shadow-md border-b border-amber-600">
              <Award className="w-3.5 h-3.5 fill-amber-700 text-amber-950" />
              <span>RECOMMENDED</span>
            </div>
          </div>

          <div className="p-5 sm:p-6 pt-7 space-y-4">
            
            {/* Clear Golden Crest / Award Vector Icon */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-tr from-purple-700 via-indigo-600 to-amber-500 p-1 shadow-lg shadow-purple-500/25 ring-4 ring-white flex items-center justify-center">
                <div className="w-full h-full rounded-xl bg-gradient-to-tr from-purple-700 to-indigo-600 flex items-center justify-center">
                  <Award className="w-9 h-9 text-amber-300 fill-amber-400 stroke-[2.2]" />
                </div>
              </div>

              {/* Title Badge */}
              <div className="mt-3.5 px-4 py-1 rounded-full bg-purple-700 text-white font-extrabold text-sm sm:text-base tracking-wide shadow-sm">
                {plans.sub_admin.name}
              </div>

              {/* Price: Auto updates when TIER_PRICES.sub_admin changes */}
              <div className="mt-3 flex items-baseline justify-center gap-1">
                <span className="text-3xl sm:text-4xl md:text-5xl font-black text-purple-900 tracking-tight">
                  {plans.sub_admin.priceFormatted}
                </span>
              </div>

              <div className="mt-1 px-3 py-0.5 rounded-full bg-purple-100 border border-purple-300 text-purple-900 text-xs font-extrabold">
                {plans.sub_admin.badgeUnderPrice}
              </div>
            </div>

            {/* Feature Bullets matching Image 1 with clear Bengali text */}
            <div className="space-y-3 pt-3 border-t border-purple-200/80">
              {plans.sub_admin.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-purple-100 border border-purple-300 text-purple-700 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm font-bold text-purple-950 leading-snug">
                      {feat.title}
                    </span>
                    {feat.subText && (
                      <span className="text-[11px] sm:text-xs font-semibold text-slate-700 mt-0.5 pl-0.5">
                        {feat.subText}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Wallet Balance inside Sub Admin Card */}
          <div className="px-5 pb-3">
            <div className="p-3 rounded-2xl bg-white border border-purple-200/90 shadow-xs flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-700 to-indigo-600 text-white flex items-center justify-center font-black text-sm shadow-xs shrink-0">
                  ৳
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 block leading-tight">
                    বর্তমান ওয়ালেট ব্যালেন্স
                  </span>
                  <span className="text-lg sm:text-xl font-black text-purple-900 tracking-tight tabular-nums">
                    ৳ {(user?.tierBalances?.sub_admin ?? 0).toLocaleString('bn-BD')}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  switchTier('sub_admin');
                  setActiveTab('wallet_hub');
                }}
                className="px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all flex items-center gap-1 cursor-pointer shrink-0"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>রিচার্জ</span>
              </button>
            </div>
          </div>

          {/* Action button */}
          <div className="p-5 pt-0">
            <button
              onClick={() => onOpenDetails('sub_admin')}
              className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-purple-700 via-indigo-600 to-amber-600 hover:from-purple-600 hover:via-indigo-500 hover:to-amber-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group cursor-pointer"
            >
              <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>বিস্তারিত দেখুন</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>

      {/* Mobile Horizontal Swipe Indicator */}
      <div className="flex md:hidden items-center justify-center gap-1.5 pt-1 text-slate-500">
        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
        <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
        <span className="w-2 h-2 rounded-full bg-purple-600"></span>
        <span className="text-[11px] font-bold text-slate-500 ml-1">
          বামে-ডানে স্ক্রোল করে অন্য অ্যাকাউন্ট দেখুন
        </span>
      </div>

    </section>
  );
};
