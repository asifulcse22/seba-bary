import React from 'react';
import { useApp } from '../context/AppContext';
import { Rocket, ShieldCheck, Sparkles, LogIn, TrendingUp, CheckCircle2 } from 'lucide-react';
import { UserAvatar } from './UserAvatar';

interface HeroBannerProps {
  variant?: 'home' | 'wallet';
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ variant = 'home' }) => {
  const { user, openAuthModal, setActiveTab } = useApp();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#003c7d] via-[#0256a7] to-[#013571] text-white p-4 sm:p-6 shadow-2xl border-4 border-emerald-400/90 transition-all duration-300">
      
      {/* Top emerald wave header accent matching Image 1 */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400"></div>

      {/* Decorative gradient blur lights with subtle pulsing animation */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-56 h-56 bg-cyan-400/25 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>
      <div className="absolute bottom-0 left-1/3 -mb-10 w-56 h-56 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none animate-pulse-glow"></div>

      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left Side: Avatar & Greetings */}
        <div className="flex items-center gap-3.5 sm:gap-5 w-full sm:w-auto">
          
          {/* Dynamic User Avatar with waving hand badge */}
          <div className="relative shrink-0 group">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-sky-300 via-emerald-300 to-yellow-200 p-1 shadow-xl ring-4 ring-white/30 group-hover:ring-white/50 transition-all duration-300 group-hover:scale-105">
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 flex items-center justify-center">
                <UserAvatar user={user} size="xl" showRing={false} />
              </div>
            </div>
            
            {/* Waving hand badge with smooth hand-wave animation */}
            <span 
              className="absolute -bottom-1 -right-1 text-xl sm:text-2xl animate-hand-wave drop-shadow-md select-none cursor-default"
              title="Welcome!"
            >
              👋
            </span>
          </div>

          <div className="flex flex-col">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight flex items-center gap-2 drop-shadow-sm">
              {user ? (
                <span>স্বাগতম, <span className="bg-gradient-to-r from-white via-sky-100 to-emerald-200 bg-clip-text text-transparent">{user.name}</span>!</span>
              ) : (
                <span>স্বাগতম <span className="bg-gradient-to-r from-white via-sky-100 to-emerald-200 bg-clip-text text-transparent">Smart Hub BD</span>-তে!</span>
              )}
            </h1>

            <p className="text-xs sm:text-sm md:text-base font-semibold text-sky-100 mt-1 flex items-center gap-1.5 drop-shadow-xs">
              {user ? (
                variant === 'home' ? (
                  <span>স্মার্ট সেবা, সহজ সমাধান!</span>
                ) : (
                  <span>আপনার ডিজিটাল সেবার বিশ্বস্ত সহযোগী — Smart Hub BD</span>
                )
              ) : (
                <span>ডিজিটাল সেবা এখন হাতের মুঠোয় — দ্রুত, বিশ্বস্ত ও সহজ সমাধান!</span>
              )}
            </p>

            {/* Badges / Account status info */}
            <div className="flex flex-wrap items-center gap-2 mt-2">
              {user ? (
                <>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/30 border border-emerald-300/50 text-[11px] font-bold text-emerald-200 shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                    ভেরিফাইড অ্যাকাউন্ট
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-sky-500/20 border border-sky-300/30 text-[11px] font-bold text-sky-100">
                    {user.activeTier === 'business' && 'উদ্যোক্তা / বিজনেস মোড'}
                    {user.activeTier === 'personal' && 'ব্যক্তিগত মোড'}
                    {user.activeTier === 'sub_admin' && 'সাব অ্যাডমিন রিসেলার'}
                  </span>
                </>
              ) : (
                <>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/30 border border-emerald-300/50 text-[11px] font-bold text-emerald-200 shadow-xs">
                    <Sparkles className="w-3 h-3 text-emerald-300" />
                    ২৪/৭ ইনস্ট্যান্ট সার্ভিস
                  </span>
                  <button
                    onClick={() => openAuthModal('login')}
                    className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-white/20 hover:bg-white/30 border border-white/40 text-[11px] font-bold text-white shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <LogIn className="w-3 h-3 text-sky-200" />
                    <span>লগইন / সাইন আপ করুন</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Badge / Interactive Pill Button */}
        <div className="w-full sm:w-auto flex justify-end">
          {variant === 'home' ? (
            <button
              onClick={() => setActiveTab('services')}
              className="group flex items-center gap-2.5 bg-white/15 hover:bg-white/25 active:bg-white/30 backdrop-blur-md px-4 sm:px-5 py-2.5 rounded-2xl border border-white/30 hover:border-cyan-300/60 shadow-lg hover:shadow-cyan-400/30 text-white transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              title="সকল ডিজিটাল সেবা দেখুন"
            >
              <span className="text-xs sm:text-sm md:text-base font-extrabold text-sky-100 group-hover:text-white transition-colors">
                ডিজিটাল সেবাকে করুন আরও সহজ!
              </span>
              <span className="text-xl sm:text-2xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                🚀
              </span>
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-emerald-500/25 hover:bg-emerald-500/35 backdrop-blur-md px-4 sm:px-5 py-2.5 rounded-2xl border border-emerald-300/40 hover:border-emerald-300/70 shadow-lg hover:shadow-emerald-400/25 text-white transition-all duration-300">
              <span className="text-xs sm:text-sm md:text-base font-extrabold text-emerald-100">
                স্মার্ট হোন, সফল হোন...
              </span>
              <span className="text-xl sm:text-2xl transition-transform duration-300 hover:scale-110">
                📈
              </span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
