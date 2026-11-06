import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AccountTier } from '../types';
import { 
  Phone, 
  Lock, 
  User, 
  ArrowRight, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  LogIn, 
  UserPlus, 
  Headphones, 
  Award,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AuthLandingPageProps {
  onEnterGuest?: () => void;
  defaultMode?: 'login' | 'register';
}

export const AuthLandingPage: React.FC<AuthLandingPageProps> = ({ 
  onEnterGuest, 
  defaultMode = 'login' 
}) => {
  const { loginUser, registerUser, showToast } = useApp();
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!phone.trim()) {
      setErrorMessage('আপনার মোবাইল নম্বর লিখুন।');
      return;
    }
    if (!password.trim()) {
      setErrorMessage('পাসওয়ার্ড লিখুন।');
      return;
    }

    if (mode === 'register') {
      if (!name.trim()) {
        setErrorMessage('আপনার পূর্ণ নাম লিখুন।');
        return;
      }
      if (password.length < 6) {
        setErrorMessage('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।');
        return;
      }
      if (!agreeTerms) {
        setErrorMessage('অনুগ্রহ করে সেবা বাড়ি-র শর্তাবলী মেনে নিন।');
        return;
      }
    }

    setIsSubmitting(true);

    try {
      if (mode === 'login') {
        const res = await loginUser(phone, password);
        if (!res.success) {
          setErrorMessage(res.message);
        }
      } else {
        // Every new registration starts as a default 'personal' account
        const res = await registerUser(name, phone, password, 'personal');
        if (!res.success) {
          setErrorMessage(res.message);
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'একটি অনাকাঙ্ক্ষিত ত্রুটি হয়েছে।');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative h-screen max-h-screen w-full flex flex-col justify-between overflow-hidden selection:bg-emerald-300 selection:text-emerald-950">
      
      {/* 
        BACKGROUND: Pure color theme derived directly from the banner image
        Vibrant Royal Blue (#0b2559), Electric Sky Blue (#0284c7), and Fresh Emerald Green (#10b981)
        Clean, modern gradient mesh — NO cluttered background picture!
      */}
      <div className="absolute inset-0 -z-30 overflow-hidden bg-gradient-to-br from-[#071836] via-[#0b2b64] to-[#043328]">
        
        {/* Sky Blue & Cyan ambient aurora (Top-Left) */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-sky-400/35 via-cyan-500/25 to-blue-600/20 blur-[120px] pointer-events-none animate-pulse-glow" />

        {/* Vibrant Emerald Green wave glow (Bottom-Center & Left) */}
        <div className="absolute -bottom-36 left-1/4 w-[700px] h-[550px] rounded-full bg-gradient-to-tr from-emerald-500/30 via-teal-400/25 to-sky-400/20 blur-[130px] pointer-events-none" />

        {/* Deep Royal Sapphire Blue curve glow (Right Side) */}
        <div className="absolute top-1/6 -right-24 w-[650px] h-[650px] rounded-full bg-gradient-to-bl from-blue-600/40 via-indigo-600/30 to-teal-400/20 blur-[130px] pointer-events-none animate-pulse" />

        {/* Center luminous soft glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-400/15 via-emerald-400/10 to-transparent blur-[90px] pointer-events-none" />

        {/* Elegant swoop ribbons matching the blue & green wave ribbons of the logo and banner */}
        <svg className="absolute inset-0 w-full h-full opacity-25 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="curveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="curveGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.7" />
              <stop offset="60%" stopColor="#0284c7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <path d="M -100,180 C 350,20 650,380 1200,90 C 1500,-40 1800,180 2200,80" fill="none" stroke="url(#curveGrad1)" strokeWidth="3.5" />
          <path d="M -80,620 C 420,320 850,720 1350,390 C 1650,210 1950,520 2250,440" fill="none" stroke="url(#curveGrad2)" strokeWidth="3" />
        </svg>

        {/* Subtle grid pattern overlay for high-tech digital vibe */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      {/* TOP HEADER: Compact & elegant (NO vertical waste) */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-2.5 pb-1 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full p-0.5 bg-gradient-to-tr from-emerald-400 to-sky-400 shadow-md flex items-center justify-center">
            <img 
              src="/images/sheba-logo.png" 
              alt="SHEBA BARY Logo" 
              className="w-full h-full object-contain rounded-full bg-white"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-black text-white tracking-tight drop-shadow-md leading-none">
              SHEBA BARY
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold text-sky-200 leading-tight">
              সেবা বাড়ি • স্মার্ট সেবা
            </span>
          </div>
        </div>

        {/* Live System Badge & Guest Bypass Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[11px] font-bold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
            <span>সিস্টেম লাইভ 🟢</span>
          </div>

          {onEnterGuest && (
            <button
              onClick={onEnterGuest}
              className="group flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/25 hover:bg-white/35 backdrop-blur-md border border-white/40 text-white hover:text-emerald-100 text-xs font-bold transition-all duration-300 shadow-md cursor-pointer hover:scale-102"
              title="রেজিস্ট্রেশন ছাড়া সরাসরি ড্যাশবোর্ড দেখুন"
            >
              <span>গেস্ট ভিজিট</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          )}
        </div>
      </header>

      {/* CENTER AREA: Perfectly fitted within screen without scrolling */}
      <main className="relative z-20 flex-1 min-h-0 flex flex-col items-center justify-center px-4 py-1 sm:py-2">
        
        {/* Compact Animated Logo & Brand Tag (Image 2) */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-2 sm:mb-3 shrink-0"
        >
          {/* Animated 3-Layer Logo Emblem */}
          <div className="relative inline-flex items-center justify-center mb-1.5">
            {/* Ambient Pulsing Glow */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-emerald-400/50 via-cyan-300/50 to-blue-500/50 animate-glow-breathe -z-10" />
            
            {/* Rotating Halo Ring */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-emerald-400 via-teal-300 to-sky-400 animate-spin-slow opacity-90" />
            
            {/* Floating Logo Circle */}
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-white p-1 shadow-2xl flex items-center justify-center animate-logo-float">
              <img 
                src="/images/sheba-logo.png" 
                alt="SHEBA BARY Logo" 
                className="w-full h-full object-contain rounded-full transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>

          <h1 className="text-lg sm:text-2xl md:text-3xl font-black text-white tracking-tight drop-shadow-lg flex items-center justify-center gap-1.5 leading-tight">
            <span>SHEBA BARY</span>
            <span className="text-emerald-300 font-extrabold text-sm sm:text-lg md:text-xl">— সেবা বাড়ি</span>
          </h1>

          <p className="text-sky-100 font-bold text-xs sm:text-sm drop-shadow-md leading-tight">
            স্মার্ট সেবা, সহজ সমাধান! • আপনার প্রয়োজনীয় ডিজিটাল সেবা এক জায়গায়
          </p>
        </motion.div>

        {/* Clean Glassmorphic Auth Card (No vertical overflow) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-sm sm:max-w-md bg-white/95 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_-15px_rgba(2,132,199,0.35)] border border-white/90 p-4 sm:p-5 text-slate-800 ring-1 ring-sky-400/20 shrink-0"
        >
          {/* Animated Tab Switcher */}
          <div className="relative p-1 bg-sky-50/90 rounded-2xl flex items-center mb-3 sm:mb-4 border border-sky-100">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setErrorMessage(null);
              }}
              className={`relative z-10 flex-1 py-1.5 sm:py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                mode === 'login' ? 'text-white font-black' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>লগইন</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMode('register');
                setErrorMessage(null);
              }}
              className={`relative z-10 flex-1 py-1.5 sm:py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                mode === 'register' ? 'text-white font-black' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>রেজিস্ট্রেশন</span>
            </button>

            {/* Sliding Pill Indicator */}
            <motion.div 
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              className={`absolute top-1 bottom-1 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 shadow-md ${
                mode === 'login' ? 'left-1 right-1/2' : 'left-1/2 right-1'
              }`}
            />
          </div>

          {/* Error Alert Box */}
          <AnimatePresence mode="wait">
            {errorMessage && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-3 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2"
              >
                <div className="w-3.5 h-3.5 rounded-full bg-red-200 text-red-700 flex items-center justify-center shrink-0 font-bold text-[10px]">!</div>
                <div className="flex-1">{errorMessage}</div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3">
            
            {/* Registration-Only Field: Full Name */}
            {mode === 'register' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-0.5"
              >
                <label className="block text-xs font-bold text-slate-700">
                  আপনার পূর্ণ নাম <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: মোঃ সাকিব হাসান"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none text-xs sm:text-sm font-medium bg-white"
                  />
                </div>
              </motion.div>
            )}

            {/* Mobile Number Field (Shared) */}
            <div className="space-y-0.5">
              <label className="block text-xs font-bold text-slate-700">
                মোবাইল নম্বর <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="017XXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none text-xs sm:text-sm font-medium bg-white"
                />
              </div>
            </div>

            {/* Password Field (Shared) */}
            <div className="space-y-0.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-700">
                  পাসওয়ার্ড <span className="text-red-500">*</span>
                </label>
                {mode === 'login' && (
                  <span 
                    onClick={() => setErrorMessage('পাসওয়ার্ড রিসেটের জন্য হেল্পলাইন 01992-867758 নম্বরে যোগাযোগ করুন।')}
                    className="text-[11px] text-sky-600 hover:text-sky-700 hover:underline cursor-pointer font-semibold"
                  >
                    ভুলে গেছেন?
                  </span>
                )}
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="পাসওয়ার্ড লিখুন"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-9 py-2 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none text-xs sm:text-sm font-medium bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Terms Checkbox on Registration */}
            {mode === 'register' && (
              <div className="flex items-center gap-2 pt-0.5 text-slate-600 text-xs">
                <input
                  type="checkbox"
                  id="termsCheck"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-3.5 h-3.5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-400"
                />
                <label htmlFor="termsCheck" className="cursor-pointer text-[11px] leading-tight select-none">
                  আমি <span className="font-bold text-slate-800">সেবা বাড়ি</span>-র সকল নিয়ম ও শর্তাবলীর সাথে একমত।
                </label>
              </div>
            )}

            {/* Action CTA Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-1.5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 hover:from-emerald-500 hover:via-teal-500 hover:to-sky-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group cursor-pointer disabled:opacity-75 disabled:pointer-events-none"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>যাচাই করা হচ্ছে...</span>
                </div>
              ) : mode === 'login' ? (
                <>
                  <span>লগইন করুন</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              ) : (
                <>
                  <span>রেজিস্ট্রেশন সম্পন্ন করুন</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Switch link between Login and Register (Clean & Compact) */}
          <div className="mt-3 text-center">
            {mode === 'login' ? (
              <p className="text-xs text-slate-600">
                নতুন ব্যবহারকারী?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('register');
                    setErrorMessage(null);
                  }}
                  className="text-emerald-700 font-extrabold hover:text-sky-700 hover:underline cursor-pointer ml-1"
                >
                  নতুন অ্যাকাউন্ট খুলুন
                </button>
              </p>
            ) : (
              <p className="text-xs text-slate-600">
                ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setErrorMessage(null);
                  }}
                  className="text-emerald-700 font-extrabold hover:text-sky-700 hover:underline cursor-pointer ml-1"
                >
                  এখানে লগইন করুন
                </button>
              </p>
            )}
          </div>

        </motion.div>

      </main>

      {/* COMPACT BOTTOM STRIP: Trust & Helpline (No scrolling needed) */}
      <footer className="relative z-20 w-full text-center py-2 px-4 text-white/95 text-[11px] sm:text-xs border-t border-white/20 backdrop-blur-xs bg-slate-900/10 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5">
          <div className="flex items-center gap-3 sm:gap-5 font-bold">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              নিরাপদ সেবা
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Headphones className="w-3.5 h-3.5 text-sky-300" />
              দ্রুত সাপোর্ট
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-yellow-300" />
              বিশ্বস্ত সেবা
            </span>
          </div>

          <div className="flex items-center gap-2 text-sky-100 font-semibold">
            <span>হেল্পলাইন: 01992-867758</span>
            <span>|</span>
            <span>SHEBA BARY (সেবা বাড়ি) © {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>

    </div>
  );
};
