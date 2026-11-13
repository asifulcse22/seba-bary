import React from 'react';
import { ShieldCheck, Zap, CheckCircle2, Headphones } from 'lucide-react';

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

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

      {/* 🎯 হোয়াটসঅ্যাপ হেল্পলাইন, ব্র্যান্ড ও কপিরাইট বার */}
      <div className="text-center space-y-3 pt-1">
        
        {/* হোয়াটসঅ্যাপ লাইভ চ্যাট বাটন */}
        <div>
         <a
          href="https://wa.me/8801603054567"
          target="_blank"
          rel="noopener noreferrer"
          className="relative overflow-hidden inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 border border-sky-400/40 hover:border-indigo-300/70 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-blue-950/40 hover:shadow-xl hover:shadow-indigo-500/35 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer group"
        >
          {/* স্মুথ হোভার কালার লেয়ার */}
          <span className="absolute inset-0 bg-gradient-to-r from-blue-800 via-indigo-800 to-violet-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <span className="relative z-10 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </span>
          <WhatsAppIcon className="relative z-10 w-4 h-4 fill-white group-hover:rotate-12 transition-transform" />
          <span className="relative z-10">সরাসরি হোয়াটসঅ্যাপে চ্যাট করুন (২৪/৭ লাইভ সাপোর্ট)</span>
        </a>
        </div>

        {/* হেল্পলাইন ব্যাজ (স্মুথ পালস ডট অ্যানিমেশন সহ) */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-emerald-200/80 text-slate-700 text-xs sm:text-sm font-semibold shadow-xs hover:border-emerald-300 transition-all">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <Headphones className="w-4 h-4 text-emerald-600" />
          <span className="text-slate-800">হেল্পলাইন:01603054567</span>
          <span className="text-emerald-700 font-bold">সেবা বাড়ি, সহজ সমাধান!</span>
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