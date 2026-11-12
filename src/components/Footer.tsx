import React from 'react';
import { ShieldCheck, Zap, CheckCircle2, Headphones } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full max-w-6xl mx-auto px-4 pt-6 pb-12 space-y-5">
      
      {/* 🛡️ প্রিমিয়াম ট্রাস্ট ও সিকিউরিটি বার */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white/90 backdrop-blur-md border border-emerald-200/70 shadow-[0_10px_30px_-10px_rgba(16,185,129,0.12)] p-4 sm:p-6 transition-all duration-300 hover:shadow-[0_15px_35px_-10px_rgba(16,185,129,0.18)]">
        
        {/* অ্যাম্বিয়েন্ট সফট গ্লো ব্যাকগ্রাউন্ড (স্মুথ ব্লিঙ্ক ইফেক্ট) */}
        <div className="absolute -left-10 -top-10 w-36 h-36 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-teal-400/15 rounded-full blur-3xl pointer-events-none animate-pulse" />

        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-emerald-100">
          
          {/* ১. নিরাপদ লেনদেন */}
          <div className="group flex items-center justify-center gap-3.5 py-2 sm:py-1 px-3 rounded-xl transition-all duration-300 hover:bg-emerald-50/50 cursor-default">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100/70 text-emerald-600 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
              <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="text-left">
              <h4 className="text-sm sm:text-[15px] font-bold text-slate-800 leading-tight group-hover:text-emerald-700 transition-colors">
                নিরাপদ লেনদেন
              </h4>
              <p className="text-xs text-slate-600 font-medium leading-normal mt-0.5">
                ১০০% সুরক্ষিত গেটওয়ে
              </p>
            </div>
          </div>

          {/* ২. দ্রুত সেবা */}
          <div className="group flex items-center justify-center gap-3.5 py-2 sm:py-1 px-3 rounded-xl transition-all duration-300 hover:bg-emerald-50/50 cursor-default">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100/70 text-emerald-600 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
              <Zap className="w-5 h-5 fill-current stroke-[2.5]" />
            </div>
            <div className="text-left">
              <h4 className="text-sm sm:text-[15px] font-bold text-slate-800 leading-tight group-hover:text-emerald-700 transition-colors">
                দ্রুত সেবা
              </h4>
              <p className="text-xs text-slate-600 font-medium leading-normal mt-0.5">
                তাৎক্ষণিক ডেলিভারি
              </p>
            </div>
          </div>

          {/* ৩. বিশ্বাসযোগ্যতা */}
          <div className="group flex items-center justify-center gap-3.5 py-2 sm:py-1 px-3 rounded-xl transition-all duration-300 hover:bg-emerald-50/50 cursor-default">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100/70 text-emerald-600 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
              <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="text-left">
              <h4 className="text-sm sm:text-[15px] font-bold text-slate-800 leading-tight group-hover:text-emerald-700 transition-colors">
                বিশ্বাসযোগ্যতা
              </h4>
              <p className="text-xs text-slate-600 font-medium leading-normal mt-0.5">
                যাচাইকৃত ডিজিটাল প্ল্যাটফর্ম
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* 🎯 হেল্পলাইন, ব্র্যান্ড ও কপিরাইট বার */}
      <div className="text-center space-y-2.5 pt-1">
        
        {/* হেল্পলাইন ব্যাজ (স্মুথ পালস ডট অ্যানিমেশন সহ) */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-emerald-200/80 text-slate-700 text-xs sm:text-sm font-semibold shadow-xs hover:border-emerald-300 transition-all">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <Headphones className="w-4 h-4 text-emerald-600" />
          <span className="text-slate-800">হেল্পলাইন:</span>
          <span className="text-emerald-700 font-bold">স্মার্ট সেবা, সহজ সমাধান!</span>
        </div>

        {/* কপিরাইট */}
        <p className="text-xs sm:text-[13px] font-bold text-slate-800 tracking-wide">
          SHEBA BARY (সেবা বাড়ি) © {new Date().getFullYear()}। সর্বস্বত্ব সংরক্ষিত।
        </p>

        {/* সাব-টাইটেল */}
        <p className="text-xs text-slate-600 font-medium leading-relaxed">
          একটি নিরাপদ ও নির্ভরযোগ্য ডিজিটাল সেবা প্ল্যাটফর্ম • সার্বক্ষণিক কাস্টমার কেয়ার
        </p>
      </div>

    </footer>
  );
};