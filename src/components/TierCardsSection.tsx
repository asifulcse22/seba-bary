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
      
      {/* ===== হেডার ===== */}
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
        <div>
          <span className="inline-flex items-center gap-1 px-3 sm:px-4 py-0.5 sm:py-1 rounded-full bg-emerald-100 border border-emerald-400/80 text-emerald-950 font-bold text-[9px] sm:text-xs shadow-xs">
            <CheckCircle2 className="w-3 h-3 text-emerald-700" />
            <span>১ মিনিটেই দেখে নিন এবং নিজের প্রয়োজন অনুযায়ী বেছে নিন।</span>
          </span>
        </div>
      </div>

      {/* ===== ৩টি কার্ড ===== */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-4 w-full pt-1">

        {/* ===== Card 1: পার্সোনাল ===== */}
        <div className={`relative rounded-xl sm:rounded-3xl overflow-hidden border-2 flex flex-col bg-gradient-to-b from-sky-50 via-white to-blue-50 shadow-sm transition-all duration-300 hover:shadow-blue-200 hover:shadow-lg hover:-translate-y-0.5 ${
          user?.activeTier === 'personal' ? 'border-blue-500 ring-2 ring-blue-300/40' : 'border-blue-200 hover:border-blue-400'
        }`}>

          {user?.activeTier === 'personal' && (
            <div className="absolute top-1 right-1 z-10 px-1 py-px bg-blue-600 text-white text-[6px] sm:text-[9px] font-black rounded-full flex items-center gap-0.5">
              <CheckCircle2 className="w-1.5 h-1.5 text-blue-200" />
              <span>সক্রিয়</span>
            </div>
          )}

          <div className="p-1.5 sm:p-4 flex flex-col items-center text-center flex-1">
            {/* আইকন */}
            <div className="w-8 h-8 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-blue-600 to-sky-500 flex items-center justify-center mb-1 ring-2 sm:ring-4 ring-white shadow-sm">
              <User className="w-4 h-4 sm:w-7 sm:h-7 text-white stroke-[2.5]" />
            </div>
            {/* টাইটেল */}
            <div className="px-1.5 sm:px-4 py-0.5 sm:py-1 rounded-full bg-gradient-to-r from-blue-600 to-sky-600 text-white font-black text-[7.5px] sm:text-sm shadow-sm mb-1 leading-tight text-center">
              পার্সোনাল অ্যাকাউন্ট
            </div>
            {/* মূল্য */}
            <div className="text-[15px] sm:text-3xl md:text-4xl font-black text-blue-800 leading-tight mb-1">
              {plans.personal.priceFormatted}
            </div>
            {/* সাবটাইটেল — মোবাইলে লুকানো */}
            <div className="hidden sm:block text-xs sm:text-sm text-blue-700 font-semibold mb-2 leading-tight">
              {plans.personal.subtitle}
            </div>
            {/* ফিচার লিস্ট — মোবাইলে ২টি, desktop এ সব */}
            <div className="w-full border-t border-blue-100 pt-1.5 sm:pt-3 flex flex-col gap-1 sm:gap-3 text-left">
              {plans.personal.features.map((feat, idx) => (
                <div key={idx} className={`flex items-start gap-1 sm:gap-2 ${idx >= 2 ? 'hidden sm:flex' : ''}`}>
                  <div className="w-3 h-3 sm:w-5 sm:h-5 rounded-full bg-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-1.5 h-1.5 sm:w-3 sm:h-3 text-white stroke-[3.5]" />
                  </div>
                  <span className="text-[7.5px] sm:text-sm font-bold text-slate-800 leading-tight">
                    {feat.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* বাটন */}
          <div className="p-1.5 sm:p-3.5 pt-0">
            <button
              onClick={() => onOpenDetails('personal')}
              className="w-full py-1.5 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-[8px] sm:text-base flex items-center justify-center gap-0.5 shadow-sm cursor-pointer transition-all duration-200 hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-400/50 hover:shadow-md active:scale-95 group"
            >
              <span className="group-hover:tracking-wide transition-all duration-200">বিস্তারিত</span>
              <span className="group-hover:translate-x-0.5 transition-transform duration-200">&gt;</span>
            </button>
          </div>
        </div>

        {/* ===== Card 2: বিজনেস ===== */}
        <div className={`relative rounded-xl sm:rounded-3xl overflow-hidden border-2 flex flex-col bg-gradient-to-b from-emerald-50 via-white to-green-50 shadow-sm transition-all duration-300 hover:shadow-emerald-200 hover:shadow-lg hover:-translate-y-0.5 ${
          user?.activeTier === 'business' ? 'border-emerald-500 ring-2 ring-emerald-300/40' : 'border-emerald-400 hover:border-emerald-600'
        }`}>

          {/* সবচেয়ে জনপ্রিয় ব্যানার */}
          <div className="w-full flex justify-center bg-gradient-to-r from-red-600 via-rose-500 to-red-600 py-0.5 sm:py-1 shrink-0">
            <div className="flex items-center gap-0.5 sm:gap-1">
              <Star className="w-2 h-2 sm:w-3 sm:h-3 fill-amber-300 text-amber-300" />
              <span className="text-white font-black text-[7px] sm:text-[11px] whitespace-nowrap">সবচেয়ে জনপ্রিয়</span>
              <Star className="w-2 h-2 sm:w-3 sm:h-3 fill-amber-300 text-amber-300" />
            </div>
          </div>

          <div className="p-1.5 sm:p-4 flex flex-col items-center text-center flex-1">
            <div className="w-8 h-8 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center mb-1 ring-2 sm:ring-4 ring-white shadow-sm">
              <Briefcase className="w-4 h-4 sm:w-7 sm:h-7 text-white stroke-[2.5]" />
            </div>
            <div className="px-1.5 sm:px-4 py-0.5 sm:py-1 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-[7.5px] sm:text-sm shadow-sm mb-1 leading-tight text-center">
              বিজনেস অ্যাকাউন্ট
            </div>
            <div className="text-[15px] sm:text-3xl md:text-4xl font-black text-emerald-800 leading-tight mb-1">
              {plans.business.priceFormatted}
            </div>
            <div className="hidden sm:block text-xs sm:text-sm text-emerald-700 font-semibold mb-2 leading-tight">
              {plans.business.subtitle}
            </div>
            <div className="w-full border-t border-emerald-100 pt-1.5 sm:pt-3 flex flex-col gap-1 sm:gap-3 text-left">
              {plans.business.features.map((feat, idx) => (
                <div key={idx} className={`flex items-start gap-1 sm:gap-2 ${idx >= 2 ? 'hidden sm:flex' : ''}`}>
                  <div className="w-3 h-3 sm:w-5 sm:h-5 rounded-full bg-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-1.5 h-1.5 sm:w-3 sm:h-3 text-white stroke-[3.5]" />
                  </div>
                  <span className="text-[7.5px] sm:text-sm font-bold text-slate-800 leading-tight">
                    {feat.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-1.5 sm:p-3.5 pt-0">
            <button
              onClick={() => onOpenDetails('business')}
              className="w-full py-1.5 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-[8px] sm:text-base flex items-center justify-center gap-0.5 shadow-sm cursor-pointer transition-all duration-200 hover:from-emerald-500 hover:to-teal-500 hover:shadow-emerald-400/50 hover:shadow-md active:scale-95 group"
            >
              <span className="group-hover:tracking-wide transition-all duration-200">বিস্তারিত</span>
              <span className="group-hover:translate-x-0.5 transition-transform duration-200">&gt;</span>
            </button>
          </div>
        </div>

        {/* ===== Card 3: Sub Admin ===== */}
        <div className={`relative rounded-xl sm:rounded-3xl overflow-hidden border-2 flex flex-col bg-gradient-to-b from-purple-50 via-white to-indigo-50 shadow-sm transition-all duration-300 hover:shadow-purple-200 hover:shadow-lg hover:-translate-y-0.5 ${
          user?.activeTier === 'sub_admin' ? 'border-purple-600 ring-2 ring-purple-300/40' : 'border-purple-300 hover:border-purple-500'
        }`}>

          {/* Recommended ব্যানার */}
          <div className="w-full flex justify-center bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 py-0.5 sm:py-1 shrink-0">
            <div className="flex items-center gap-0.5 sm:gap-1">
              <Star className="w-2 h-2 sm:w-3 sm:h-3 fill-amber-700 text-amber-700" />
              <span className="text-amber-950 font-black text-[7px] sm:text-[11px] whitespace-nowrap">Recommended</span>
            </div>
          </div>

          <div className="p-1.5 sm:p-4 flex flex-col items-center text-center flex-1">
            <div className="w-8 h-8 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-purple-700 to-indigo-600 flex items-center justify-center mb-1 ring-2 sm:ring-4 ring-white shadow-sm">
              <Award className="w-4 h-4 sm:w-7 sm:h-7 text-amber-300 fill-amber-300/30 stroke-[2.2]" />
            </div>
            <div className="px-1.5 sm:px-4 py-0.5 sm:py-1 rounded-full bg-gradient-to-r from-purple-700 to-indigo-700 text-white font-black text-[7.5px] sm:text-sm shadow-sm mb-1 leading-tight text-center">
              Sub Admin Panel
            </div>
            <div className="text-[15px] sm:text-3xl md:text-4xl font-black text-purple-900 leading-tight mb-1">
              {plans.sub_admin.priceFormatted}
            </div>
            <div className="hidden sm:block text-xs sm:text-sm text-purple-700 font-semibold mb-2 leading-tight">
              {plans.sub_admin.badgeUnderPrice || plans.sub_admin.subtitle}
            </div>
            <div className="w-full border-t border-purple-100 pt-1.5 sm:pt-3 flex flex-col gap-1 sm:gap-3 text-left">
              {plans.sub_admin.features.map((feat, idx) => (
                <div key={idx} className={`flex items-start gap-1 sm:gap-2 ${idx >= 2 ? 'hidden sm:flex' : ''}`}>
                  <div className="w-3 h-3 sm:w-5 sm:h-5 rounded-full bg-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-1.5 h-1.5 sm:w-3 sm:h-3 text-white stroke-[3.5]" />
                  </div>
                  <span className="text-[7.5px] sm:text-sm font-bold text-slate-800 leading-tight">
                    {feat.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-1.5 sm:p-3.5 pt-0">
            <button
              onClick={() => onOpenDetails('sub_admin')}
              className="w-full py-1.5 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-purple-700 to-indigo-600 text-white font-black text-[8px] sm:text-base flex items-center justify-center gap-0.5 shadow-sm cursor-pointer transition-all duration-200 hover:from-purple-600 hover:to-indigo-500 hover:shadow-purple-400/50 hover:shadow-md active:scale-95 group"
            >
              <span className="group-hover:tracking-wide transition-all duration-200">বিস্তারিত</span>
              <span className="group-hover:translate-x-0.5 transition-transform duration-200">&gt;</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
