import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
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
  ArrowUpRight,
  Layers,
  Users,
  UserCheck,
  CreditCard,
  Sparkles
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
  const { loginUser, registerUser } = useApp();
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 🎯 ১. SHEBA BARY মূল টাইটেলের টাইপরাইটার অ্যানিমেশন
  const [typedTitle, setTypedTitle] = useState('');
  const [isTitleDeleting, setIsTitleDeleting] = useState(false);

  useEffect(() => {
    const fullTitle = 'SHEBA BARY';
    const speed = isTitleDeleting ? 50 : 110;

    const timer = setTimeout(() => {
      if (!isTitleDeleting) {
        setTypedTitle(fullTitle.substring(0, typedTitle.length + 1));
        if (typedTitle === fullTitle) {
          setTimeout(() => setIsTitleDeleting(true), 4000);
        }
      } else {
        setTypedTitle(fullTitle.substring(0, typedTitle.length - 1));
        if (typedTitle === '') {
          setIsTitleDeleting(false);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [typedTitle, isTitleDeleting]);

  // 🎯 ২. সাবটাইটেল স্লোগানের টাইপরাইটার অ্যানিমেশন
  const [typedSubtitle, setTypedSubtitle] = useState('');
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [isSubtitleDeleting, setIsSubtitleDeleting] = useState(false);

  const subtitlesToType = [
    'সেবা বাড়ি • স্মার্ট সেবা',
    'স্মার্ট সেবা, সহজ সমাধান!',
    '১০০% বিশ্বস্ত ডিজিটাল প্ল্যাটফর্ম'
  ];

  useEffect(() => {
    const fullText = subtitlesToType[subtitleIndex];
    const speed = isSubtitleDeleting ? 35 : 75;

    const timer = setTimeout(() => {
      if (!isSubtitleDeleting) {
        setTypedSubtitle(fullText.substring(0, typedSubtitle.length + 1));
        if (typedSubtitle === fullText) {
          setTimeout(() => setIsSubtitleDeleting(true), 1600);
        }
      } else {
        setTypedSubtitle(fullText.substring(0, typedSubtitle.length - 1));
        if (typedSubtitle === '') {
          setIsSubtitleDeleting(false);
          setSubtitleIndex((prev) => (prev + 1) % subtitlesToType.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [typedSubtitle, isSubtitleDeleting, subtitleIndex]);

  // ৪টি রঙিন স্ট্যাটস বক্স ডাটা
  const statsData = [
    {
      count: '৭২+',
      label: 'মোট সেবা',
      fullLabel: 'মোট সেবা সংখ্যা',
      icon: <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />,
      badgeBg: 'bg-emerald-50 border border-emerald-200/90',
      glow: 'shadow-emerald-500/15'
    },
    {
      count: '৬.৩৯L',
      desktopCount: '৬,৩৯,১৪৮',
      label: 'ব্যবহারকারী',
      fullLabel: 'মোট ব্যবহারকারী',
      icon: <Users className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />,
      badgeBg: 'bg-amber-50 border border-amber-200/90',
      glow: 'shadow-amber-500/15'
    },
    {
      count: '৫.৭K',
      desktopCount: '৫,৭২৫',
      label: 'লেনদেন',
      fullLabel: 'মোট লেনদেন',
      icon: <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-500" />,
      badgeBg: 'bg-cyan-50 border border-cyan-200/90',
      glow: 'shadow-cyan-500/15'
    },
    {
      count: '৯৯২',
      label: 'পেমেন্ট',
      fullLabel: 'মোট পেমেন্ট',
      icon: <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />,
      badgeBg: 'bg-purple-50 border border-purple-200/90',
      glow: 'shadow-purple-500/15'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

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
      
      {/* BACKGROUND MESH GRADIENT */}
      <div className="fixed inset-0 -z-30 overflow-hidden bg-gradient-to-br from-[#071836] via-[#0b2b64] to-[#043328]">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-sky-400/35 via-cyan-500/25 to-blue-600/20 blur-[120px] pointer-events-none animate-pulse-glow" />
        <div className="absolute -bottom-36 left-1/4 w-[700px] h-[550px] rounded-full bg-gradient-to-tr from-emerald-500/30 via-teal-400/25 to-sky-400/20 blur-[130px] pointer-events-none" />
        <div className="absolute top-1/6 -right-24 w-[650px] h-[650px] rounded-full bg-gradient-to-bl from-blue-600/40 via-indigo-600/30 to-teal-400/20 blur-[130px] pointer-events-none" />

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

        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      {/* ============================================================== */}
      {/* 🎯 TOP HEADER: স্পিনার লোগো + টাইপরাইটার অ্যানিমেশন */}
      {/* ============================================================== */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-3.5 sm:px-6 pt-2 pb-1 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer">
          
          {/* স্পিনার ঘূর্ণায়মান লোগো */}
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shrink-0">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-1 rounded-full bg-gradient-to-tr from-emerald-400 via-sky-400 to-teal-300 opacity-90 blur-[1px]"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-0.5 rounded-full border-2 border-dashed border-emerald-300/80"
            />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="relative w-full h-full rounded-full p-0.5 bg-white shadow-md flex items-center justify-center overflow-hidden"
            >
              <img 
                src="/images/sheba-logo.png" 
                alt="SHEBA BARY Logo" 
                className="w-full h-full object-contain rounded-full"
              />
            </motion.div>
          </div>

          {/* SHEBA BARY & সাবটাইটেল টাইপরাইটার */}
          <div className="flex flex-col select-none">
            <div className="flex items-center gap-1">
              <span className="text-base sm:text-xl font-black tracking-tight drop-shadow-md leading-none bg-gradient-to-r from-white via-emerald-200 to-sky-200 bg-[length:200%_auto] bg-clip-text text-transparent">
                {typedTitle}
              </span>
              <span className="w-1 h-3 sm:h-3.5 bg-sky-300 animate-pulse rounded-full inline-block" />
            </div>
            
            <div className="flex items-center gap-1 mt-0.5 text-[9px] sm:text-[11px] font-bold text-sky-200 leading-tight">
              <span>{typedSubtitle}</span>
              <span className="w-1 h-2 bg-emerald-400 animate-pulse rounded-full inline-block" />
            </div>
          </div>

        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
            <span>সিস্টেম লাইভ 🟢</span>
          </div>

          {onEnterGuest && (
            <button
              onClick={onEnterGuest}
              className="group flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full bg-white/25 hover:bg-white/35 backdrop-blur-md border border-white/40 text-white hover:text-emerald-100 text-[11px] sm:text-xs font-bold transition-all shadow-md cursor-pointer"
              title="রেজিস্ট্রেশন ছাড়া সরাসরি ড্যাশবোর্ড দেখুন"
            >
              <span>গেস্ট ভিজিট</span>
              <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          )}
        </div>
      </header>

      {/* 
        🌟 CENTER HERO AREA: মোবাইলে নো-স্ক্রোল + ডেস্কটপে ২-কলাম 🌟
      */}
      <main className="relative z-20 flex-1 flex items-center justify-center px-3 sm:px-6 py-1 overflow-hidden">
        <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-4 lg:gap-8">
          
          {/* ========================================================= */}
          {/* DESKTOP ONLY: টাইটেল ও ৪টি বড় ২x২ বক্স (মোবাইলে হাইড থাকবে) */}
          {/* ========================================================= */}
          <div className="hidden lg:flex lg:flex-col lg:max-w-xl text-left space-y-4">
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-1"
            >
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight drop-shadow-md leading-tight">
                SHEBA BARY <span className="text-emerald-300">— সেবা বাড়ি</span>
              </h1>

              <p className="text-sky-100 font-semibold text-sm max-w-md">
                স্মার্ট সেবা, সহজ সমাধান! আপনার প্রয়োজনীয় সকল ডিজিটাল ও সরকারি সেবা এক প্ল্যাটফর্মে।
              </p>
            </motion.div>

            {/* ৪টি অ্যানিমেটেড কালারফুল বক্স (ডেস্কটপ ২x২ গ্রিড) */}
            <div className="w-full max-w-md pt-0.5">
              <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-4 shadow-[0_15px_40px_rgba(0,0,0,0.2)] border border-white/90 grid grid-cols-2 gap-3">
                {statsData.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -3, scale: 1.02 }}
                    className="flex flex-col items-center text-center p-2.5 rounded-2xl bg-gradient-to-b from-white to-slate-50/80 border border-slate-100 shadow-2xs hover:shadow-md transition-all group"
                  >
                    <div className={`w-9 h-9 rounded-xl ${stat.badgeBg} ${stat.glow} shadow-2xs flex items-center justify-center mb-1 group-hover:rotate-6 group-hover:scale-110 transition-transform duration-300`}>
                      {stat.icon}
                    </div>

                    <span className="text-lg md:text-xl font-black text-slate-900 tracking-tight leading-tight">
                      {stat.desktopCount || stat.count}
                    </span>

                    <span className="text-xs font-bold text-slate-500 mt-0.5 leading-tight">
                      {stat.fullLabel}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

          {/* ========================================================= */}
          {/* CENTER/RIGHT: লোগো + ব্যাজ + কমপ্যাক্ট ফর্ম + মোবাইলে ১-লাইনের স্লিম উইজেট */}
          {/* ========================================================= */}
          <div className="w-full max-w-sm sm:max-w-md flex flex-col items-center">
            
            {/* 🎯 লোগো ও লোগোর নিচের ব্যাজ */}
            <div className="flex flex-col items-center mb-1.5 z-30">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative inline-flex items-center justify-center mb-1"
              >
                <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-emerald-400/50 via-cyan-300/50 to-blue-500/50 blur-sm animate-pulse -z-10" />
                
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-0.5 rounded-full bg-gradient-to-tr from-emerald-400 via-teal-300 to-sky-400 opacity-95 shadow-md" 
                />
                
                <motion.div 
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white p-0.5 shadow-xl flex items-center justify-center cursor-pointer group"
                >
                  <img 
                    src="/images/sheba-logo.png" 
                    alt="SHEBA BARY Logo" 
                    className="w-full h-full object-contain rounded-full transition-transform duration-300 group-hover:scale-105"
                  />
                </motion.div>
              </motion.div>

              {/* লোগোর নিচে ব্যাজ */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-emerald-300 text-[10px] sm:text-xs font-bold shadow-xs">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>বাংলাদেশের বিশ্বস্ত ডিজিটাল সেবা প্ল্যাটফর্ম</span>
              </div>
            </div>

            {/* 🎯 লগইন / রেজিস্ট্রেশন কার্ড */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full bg-white/95 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-[0_15px_45px_-15px_rgba(2,132,199,0.35)] border border-white/90 p-3 sm:p-4 text-slate-800 ring-1 ring-sky-400/20 shrink-0"
            >
              {/* Tab Switcher */}
              <div className="relative p-0.5 sm:p-1 bg-sky-50/90 rounded-xl sm:rounded-2xl flex items-center mb-2 border border-sky-100">
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setErrorMessage(null);
                  }}
                  className={`relative z-10 flex-1 py-1 sm:py-1.5 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1 transition-colors cursor-pointer ${
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
                  className={`relative z-10 flex-1 py-1 sm:py-1.5 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1 transition-colors cursor-pointer ${
                    mode === 'register' ? 'text-white font-black' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>রেজিস্ট্রেশন</span>
                </button>

                <motion.div 
                  layout
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  className={`absolute top-0.5 bottom-0.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 shadow-md ${
                    mode === 'login' ? 'left-0.5 right-1/2' : 'left-1/2 right-0.5'
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
                    className="mb-1.5 p-1.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-[11px] font-semibold flex items-center gap-1.5"
                  >
                    <div className="w-3.5 h-3.5 rounded-full bg-red-200 text-red-700 flex items-center justify-center shrink-0 font-bold text-[9px]">!</div>
                    <div className="flex-1 leading-tight">{errorMessage}</div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-1.5 sm:space-y-2">
                
                {/* Full Name (Register Only) */}
                {mode === 'register' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-0.5"
                  >
                    <label className="block text-[11px] font-bold text-slate-700">
                      আপনার পূর্ণ নাম <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400">
                        <User className="w-3.5 h-3.5" />
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-8 pr-2.5 py-1.5 rounded-lg sm:rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 outline-none text-xs sm:text-sm font-medium bg-white"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Mobile Number */}
                <div className="space-y-0.5">
                  <label className="block text-[11px] font-bold text-slate-700">
                    মোবাইল নম্বর <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="017XXXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-8 pr-2.5 py-1.5 rounded-lg sm:rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 outline-none text-xs sm:text-sm font-medium bg-white"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-0.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-[11px] font-bold text-slate-700">
                      পাসওয়ার্ড <span className="text-red-500">*</span>
                    </label>
                    {mode === 'login' && (
                      <span 
                        onClick={() => setErrorMessage('পাসওয়ার্ড রিসেটের জন্য হেল্পলাইন 01992-867758 নম্বরে যোগাযোগ করুন।')}
                        className="text-[10px] text-sky-600 hover:text-sky-700 cursor-pointer font-semibold"
                      >
                        ভুলে গেছেন?
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="পাসওয়ার্ড লিখুন"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-8 pr-8 py-1.5 rounded-lg sm:rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 outline-none text-xs sm:text-sm font-medium bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Terms Checkbox */}
                {mode === 'register' && (
                  <div className="flex items-center gap-1.5 pt-0.5 text-slate-600 text-xs">
                    <input
                      type="checkbox"
                      id="termsCheck"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="w-3 h-3 text-emerald-600 rounded border-slate-300 focus:ring-emerald-400"
                    />
                    <label htmlFor="termsCheck" className="cursor-pointer text-[10px] leading-tight select-none">
                      আমি <span className="font-bold text-slate-800">সেবা বাড়ি</span>-র নিয়মে একমত।
                    </label>
                  </div>
                )}

                {/* Submit CTA Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-1 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 hover:from-emerald-500 hover:via-teal-500 hover:to-sky-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/30 transition-all cursor-pointer disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>যাচাই হচ্ছে...</span>
                    </div>
                  ) : mode === 'login' ? (
                    <>
                      <span>লগইন করুন</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  ) : (
                    <>
                      <span>রেজিস্ট্রেশন সম্পন্ন করুন</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>

              {/* Switch link */}
              <div className="mt-1.5 text-center">
                {mode === 'login' ? (
                  <p className="text-[10px] sm:text-xs text-slate-600">
                    নতুন ব্যবহারকারী?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setMode('register');
                        setErrorMessage(null);
                      }}
                      className="text-emerald-700 font-extrabold hover:underline cursor-pointer ml-1"
                    >
                      নতুন অ্যাকাউন্ট খুলুন
                    </button>
                  </p>
                ) : (
                  <p className="text-[10px] sm:text-xs text-slate-600">
                    ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setMode('login');
                        setErrorMessage(null);
                      }}
                      className="text-emerald-700 font-extrabold hover:underline cursor-pointer ml-1"
                    >
                      এখানে লগইন করুন
                    </button>
                  </p>
                )}
              </div>

            </motion.div>

            {/* ============================================================== */}
            {/* 🌟 শুধুমাত্র মোবাইলের জন্য: ১-লাইনের স্লিম ৪-কলাম উইজেট 🌟 */}
            {/* কোনো স্ক্রোলিং লাগবে না, একদম পারফেক্ট সাইজে ১ স্ক্রিনে ফিট */}
            {/* ============================================================== */}
            <div className="grid grid-cols-4 gap-1.5 w-full max-w-sm sm:max-w-md mt-2 lg:hidden">
              {statsData.map((stat, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center p-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-white/90 shadow-sm"
                >
                  <div className={`w-6 h-6 rounded-lg ${stat.badgeBg} flex items-center justify-center mb-0.5`}>
                    {stat.icon}
                  </div>
                  <span className="text-[11px] font-black text-slate-900 leading-tight">
                    {stat.count}
                  </span>
                  <span className="text-[8px] font-bold text-slate-500 leading-tight mt-0.5">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

          </div>

        </div>
      </main>

      {/* COMPACT BOTTOM STRIP (মোবাইল ও ল্যাপটপে সর্বদা দৃশ্যমান) */}
      <footer className="relative z-20 w-full text-center py-1.5 px-3 text-white/95 text-[10px] sm:text-xs border-t border-white/20 backdrop-blur-xs bg-slate-900/10 shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-1">
          <div className="flex items-center gap-2 sm:gap-4 font-bold text-[9px] sm:text-xs">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-300" />
              নিরাপদ সেবা
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Headphones className="w-3 h-3 text-sky-300" />
              দ্রুত সাপোর্ট
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Award className="w-3 h-3 text-yellow-300" />
              বিশ্বস্ত সেবা
            </span>
          </div>

          <div className="text-[9px] sm:text-xs text-sky-100 font-semibold">
            <span>হেল্পলাইন: </span>
          </div>
        </div>
      </footer>

    </div>
  );
};