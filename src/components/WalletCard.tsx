import React from 'react';
import { useApp } from '../context/AppContext';
import { PlusCircle, ArrowRight, Sparkles, ChevronRight } from 'lucide-react';

interface WalletCardProps {
  onOpenRecharge: () => void;
}

export const WalletCard: React.FC<WalletCardProps> = ({ onOpenRecharge }) => {
  const { user, setActiveTab } = useApp();

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white border border-emerald-100/90 shadow-md hover:shadow-lg transition-all p-3.5 sm:p-5">
      
      {/* Decorative leaf/nature accents matching image 1 */}
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-32 pointer-events-none opacity-20 sm:opacity-30 bg-gradient-to-l from-emerald-400/30 to-transparent flex items-center justify-end pr-2">
        <svg viewBox="0 0 100 100" className="w-20 h-20 text-emerald-500 fill-current rotate-12">
          <path d="M50 0 C70 30 90 40 100 50 C80 60 70 80 50 100 C30 80 20 60 0 50 C10 40 30 30 50 0 Z" opacity="0.6"/>
          <path d="M50 10 C65 35 80 45 90 50 C75 55 65 75 50 90 C35 75 25 55 10 50 C20 45 35 35 50 10 Z" opacity="0.4"/>
        </svg>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Left: Wallet icon and current balance */}
        <div className="flex items-center gap-3.5 sm:gap-4">
          {/* 3D Wallet & Gold Coins Icon matching Image 1 */}
          <div className="relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-sky-500 via-blue-500 to-indigo-600 p-2.5 shadow-md flex items-center justify-center">
            {/* Coins decoration */}
            <div className="absolute -top-1.5 -left-1 w-6 h-6 rounded-full bg-amber-400 border-2 border-yellow-200 shadow-sm flex items-center justify-center text-[10px] font-extrabold text-amber-900">
              ৳
            </div>
            <div className="absolute -top-1 right-1 w-5 h-5 rounded-full bg-yellow-300 border border-yellow-100 shadow-xs flex items-center justify-center text-[9px] font-bold text-amber-800">
              ★
            </div>
            {/* Wallet graphic */}
            <div className="w-full h-9 bg-white/95 rounded-lg shadow-inner flex items-center justify-between px-1.5 border border-blue-200">
              <div className="w-3 h-2 bg-blue-600 rounded-xs"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-amber-400 border border-amber-600 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-bold text-slate-500 tracking-wide">
              বর্তমান ওয়ালেট ব্যালেন্স
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-3xl sm:text-4xl md:text-5xl font-black text-emerald-600 tracking-tight tabular-nums">
                ৳ {(user ? user.walletBalance : 0).toLocaleString('bn-BD')}
              </span>
            </div>
          </div>
        </div>

        {/* Divider for desktop */}
        <div className="hidden md:block w-px h-12 bg-slate-200"></div>

        {/* Right: Recharge Action Button matching Image 1 ("রিচার্জ করুন >") */}
        <div className="flex items-center">
          <button
            onClick={onOpenRecharge}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:via-teal-400 hover:to-cyan-500 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group cursor-pointer whitespace-nowrap"
          >
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <PlusCircle className="w-4 h-4 text-white group-hover:rotate-90 transition-transform duration-300" />
            </div>
            <span>রিচার্জ করুন</span>
            <ChevronRight className="w-4 h-4 text-emerald-100 group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>
        </div>

      </div>
    </div>
  );
};
