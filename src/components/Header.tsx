import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Home, 
  Clock, 
  Wallet, 
  Settings, 
  Bell, 
  ChevronDown, 
  CheckCircle2, 
  LogIn,
  LogOut,
  UserPlus
} from 'lucide-react';
import { AccountTier } from '../types';
import { UserAvatar } from './UserAvatar';

interface HeaderProps {
  onOpenTierModal: (tier?: AccountTier) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenTierModal }) => {
  const { user, activeTab, setActiveTab, orders, openAuthModal, logoutUser } = useApp();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const pendingOrdersCount = orders.filter(o => o.status === 'processing' || o.status === 'pending').length;

  const getTierLabel = (tier: AccountTier) => {
    switch (tier) {
      case 'personal': return 'পার্সোনাল';
      case 'business': return 'বিজনেস';
      case 'sub_admin': return 'Sub Admin';
    }
  };

  const getTierBadgeColor = (tier: AccountTier) => {
    switch (tier) {
      case 'personal': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'business': return 'bg-emerald-100 text-emerald-700 border-emerald-300';
      case 'sub_admin': return 'bg-purple-100 text-purple-700 border-purple-300';
    }
  };

  const balance = user ? user.walletBalance : 0;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-2">
          
          {/* Logo & Brand matching Image 1 & 2 */}
          <div 
            onClick={() => setActiveTab('dashboard')} 
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group select-none shrink-0"
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-[#00a86b] via-teal-500 to-[#2ecc71] p-0.5 shadow-md flex items-center justify-center transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                <span className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                  S
                </span>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-base sm:text-xl md:text-2xl font-black text-slate-800 tracking-tight leading-none group-hover:text-emerald-700 transition-colors whitespace-nowrap">
                Smart Hub BD
              </span>
              <span className="text-[11px] sm:text-xs font-bold text-emerald-600 tracking-wide mt-0.5 leading-none whitespace-nowrap">
                স্মার্ট হাব বিডি
              </span>
            </div>
          </div>

          {/* Navigation Items (Matching Image 1: ড্যাশবোর্ড, অর্ডার ট্র্যাকিং, সেটিংস) */}
          <nav className="hidden md:flex items-center gap-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 shadow-xs whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/25 scale-102'
                  : 'bg-emerald-50/70 text-emerald-800 hover:bg-emerald-100 hover:text-emerald-900 border border-emerald-200/60 hover:scale-102'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>ড্যাশবোর্ড</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 shadow-xs whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/25 scale-102'
                  : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 hover:scale-102'
              }`}
            >
              <Clock className="w-4 h-4 text-blue-600" />
              <span>অর্ডার ট্র্যাকিং</span>
              {pendingOrdersCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-amber-500 text-white text-[11px] font-bold rounded-full animate-pulse">
                  {pendingOrdersCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 shadow-xs whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/25 scale-102'
                  : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 hover:scale-102'
              }`}
            >
              <Settings className="w-4 h-4 text-indigo-600" />
              <span>সেটিংস</span>
            </button>
          </nav>

          {/* Right Section: Balance, Notification & Profile or Login/Register */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Quick Wallet balance tag matching Image 1 & 2 */}
            <div 
              onClick={() => setActiveTab('wallet_hub')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100/90 border border-emerald-200 hover:border-emerald-300 rounded-full cursor-pointer transition-all duration-300 shadow-xs hover:shadow-md hover:scale-105 active:scale-95 whitespace-nowrap shrink-0 group"
              title="বর্তমান ওয়ালেট ব্যালেন্স (ক্লিক করে রিচার্জ করুন)"
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-600 group-hover:bg-teal-600 text-white flex items-center justify-center text-xs font-black shadow-xs transition-colors">
                ৳
              </div>
              <span className="font-black text-emerald-800 text-xs sm:text-sm md:text-base tabular-nums">
                {balance.toLocaleString('bn-BD', { minimumFractionDigits: 0 })}
              </span>
            </div>

            {/* Notification Bell matching Image 2 */}
            <div className="relative">
              <button
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="relative p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                aria-label="নোটিফিকেশন"
              >
                <Bell className="w-5 h-5 text-slate-700" />
                {user && user.unreadNotifications > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                    {user.unreadNotifications}
                  </span>
                )}
              </button>

              {notificationOpen && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                    <span className="font-bold text-slate-800 text-xs sm:text-sm">নোটিফিকেশন</span>
                    <span className="text-[11px] text-emerald-600 cursor-pointer hover:underline">পঠিত চিহ্নিত করুন</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2 bg-emerald-50/70 rounded-lg border border-emerald-100">
                      <p className="font-semibold text-emerald-900">ডিপোজিট সিস্টেম প্রস্তুত</p>
                      <p className="text-slate-600 text-[11px] mt-0.5">বিকাশ ও নগদে তাৎক্ষণিক রিচার্জ করুন।</p>
                      <span className="text-[10px] text-slate-400">এখনই সক্রিয়</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown OR Login/Register if logged out */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-1.5 sm:gap-2 pl-1 pr-2.5 py-1 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-emerald-300 transition-all text-left cursor-pointer shrink-0 shadow-xs hover:shadow-md hover:scale-102 active:scale-98"
                >
                  <UserAvatar user={user} size="sm" showRing={false} />
                  <div className="hidden sm:flex flex-col text-left">
                    <span className="text-xs font-bold text-slate-800 leading-tight whitespace-nowrap">
                      {user.displayNameEn || user.name}
                    </span>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded-full border w-fit mt-0.5 ${getTierBadgeColor(user.activeTier)}`}>
                      {getTierLabel(user.activeTier)}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {/* Profile Menu */}
                {profileDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 animate-in fade-in"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <div className="p-3 bg-gradient-to-r from-emerald-600 to-teal-700 rounded-xl text-white mb-2 shadow-xs">
                      <p className="text-[11px] font-medium opacity-90">লগইন করা অ্যাকাউন্ট</p>
                      <p className="font-bold text-sm sm:text-base">{user.name} ({getTierLabel(user.activeTier)})</p>
                      <p className="text-xs opacity-80 mt-0.5">{user.phone}</p>
                    </div>

                    <div className="px-2 py-1.5 space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        অ্যাকাউন্ট মোড পরিবর্তন
                      </p>
                      <button
                        onClick={() => onOpenTierModal('personal')}
                        className={`w-full flex items-center justify-between p-2 rounded-lg text-xs font-semibold ${
                          user.activeTier === 'personal'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                          পার্সোনাল অ্যাকাউন্ট
                        </span>
                        {user.activeTier === 'personal' && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                      </button>

                      <button
                        onClick={() => onOpenTierModal('business')}
                        className={`w-full flex items-center justify-between p-2 rounded-lg text-xs font-semibold ${
                          user.activeTier === 'business'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          বিজনেস অ্যাকাউন্ট
                        </span>
                        {user.activeTier === 'business' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                      </button>

                      <button
                        onClick={() => onOpenTierModal('sub_admin')}
                        className={`w-full flex items-center justify-between p-2 rounded-lg text-xs font-semibold ${
                          user.activeTier === 'sub_admin'
                            ? 'bg-purple-50 text-purple-700 border border-purple-200'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                          Sub Admin Panel
                        </span>
                        {user.activeTier === 'sub_admin' && <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />}
                      </button>
                    </div>

                    <div className="border-t border-slate-100 my-1 pt-1 space-y-0.5">
                      <button
                        onClick={() => openAuthModal('login')}
                        className="w-full flex items-center justify-between p-2 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50"
                      >
                        <span className="flex items-center gap-1.5">
                          <LogIn className="w-3.5 h-3.5 text-emerald-600" />
                          অ্যাকাউন্ট পরিবর্তন / লগইন
                        </span>
                      </button>
                      <button
                        onClick={() => openAuthModal('register')}
                        className="w-full flex items-center justify-between p-2 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50"
                      >
                        <span className="flex items-center gap-1.5">
                          <UserPlus className="w-3.5 h-3.5 text-blue-600" />
                          নতুন অ্যাকাউন্ট নিবন্ধন
                        </span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setProfileDropdownOpen(false);
                          logoutUser();
                        }}
                        className="w-full flex items-center justify-between p-2 rounded-lg text-xs font-bold text-red-600 hover:bg-red-50 cursor-pointer"
                      >
                        <span className="flex items-center gap-1.5">
                          <LogOut className="w-3.5 h-3.5 text-red-500" />
                          লগআউট করুন
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* If logged out: Show Login and Register buttons clearly */
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => openAuthModal('login')}
                  className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:via-teal-500 hover:to-cyan-600 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>লগইন</span>
                </button>
                <button
                  onClick={() => openAuthModal('register')}
                  className="hidden sm:inline-flex px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 hover:text-emerald-900 border border-emerald-300 hover:border-emerald-400 font-bold text-xs sm:text-sm shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5 text-emerald-600" />
                  <span>রেজিস্ট্রেশন</span>
                </button>
              </div>
            )}

          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-100 text-xs">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg font-bold ${
              activeTab === 'dashboard' ? 'text-emerald-600 bg-emerald-50' : 'text-slate-600'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>ড্যাশবোর্ড</span>
          </button>
          <button
            onClick={() => setActiveTab('wallet_hub')}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg font-bold ${
              activeTab === 'wallet_hub' ? 'text-emerald-600 bg-emerald-50' : 'text-slate-600'
            }`}
          >
            <Wallet className="w-4 h-4" />
            <span>ওয়ালেট</span>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg font-bold relative ${
              activeTab === 'orders' ? 'text-emerald-600 bg-emerald-50' : 'text-slate-600'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>অর্ডার</span>
            {pendingOrdersCount > 0 && (
              <span className="absolute top-0 right-1 w-2 h-2 bg-amber-500 rounded-full"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg font-bold ${
              activeTab === 'settings' ? 'text-emerald-600 bg-emerald-50' : 'text-slate-600'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>সেটিংস</span>
          </button>
        </div>

      </div>
    </header>
  );
};
