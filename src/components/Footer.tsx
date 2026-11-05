import React from 'react';
import { ShieldCheck, Zap, Heart, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="space-y-4 pt-6 pb-12">
      
      {/* Bottom Trust Strip matching Image 1: "নিরাপদ লেনদেন | দ্রুত সেবা | বিশ্বস্ততা" */}
      <div className="relative overflow-hidden rounded-2xl bg-white border border-emerald-100 shadow-sm p-4 sm:p-5 flex items-center justify-center">
        
        {/* Leaf decoration matching screenshot */}
        <div className="absolute right-0 top-0 bottom-0 w-24 pointer-events-none opacity-30 flex items-center justify-end pr-3">
          <svg viewBox="0 0 100 100" className="w-16 h-16 text-emerald-500 fill-current">
            <path d="M50 0 C70 30 90 40 100 50 C80 60 70 80 50 100 C30 80 20 60 0 50 C10 40 30 30 50 0 Z" />
          </svg>
        </div>

        <div className="flex items-center gap-3 sm:gap-6 flex-wrap justify-center text-xs sm:text-sm font-black text-slate-700">
          <div className="flex items-center gap-1.5 text-emerald-700">
            <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <span>নিরাপদ লেনদেন</span>
          </div>

          <span className="text-slate-300 font-bold hidden sm:inline">|</span>

          <div className="flex items-center gap-1.5 text-emerald-700">
            <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <span>দ্রুত সেবা</span>
          </div>

          <span className="text-slate-300 font-bold hidden sm:inline">|</span>

          <div className="flex items-center gap-1.5 text-emerald-700">
            <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <span>বিশ্বাসযোগ্যতা</span>
          </div>
        </div>

      </div>

      {/* Brand & Copyright bar */}
      <div className="text-center text-xs text-slate-500 space-y-1">
        <p className="font-semibold text-slate-700">
          Smart Hub BD — স্মার্ট হাব বিডি © {new Date().getFullYear()}। সর্বস্বত্ব সংরক্ষিত।
        </p>
        <p className="text-[11px] text-slate-400">
          গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের ডিজিটাল সেবা ও আইসিটি ডিভিশন নির্দেশিকা মোতাবেক পরিচালিত।
        </p>
      </div>

    </footer>
  );
};
