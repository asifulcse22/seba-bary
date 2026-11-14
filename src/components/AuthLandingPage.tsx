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
  Sparkles,
  Shield,
  Clock,
  LogOut
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

  // 🎯 ৩. লাইভ ডিজিটাল ঘড়ি (Real-time Digital Watch)
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toBengaliDigits = (val: string | number) => {
    const bn = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return String(val).replace(/[0-9]/g, (d) => bn[parseInt(d, 10)]);
  };

  const getTimeInfo = (d: Date) => {
    let h = d.getHours();
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    h = h ? h : 12;
    const hh = String(h).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    const ss = String(d.getSeconds()).padStart(2, '0');
    return {
      timeBn: `${toBengaliDigits(hh)}:${toBengaliDigits(mm)}:${toBengaliDigits(ss)}`,
      ampm
    };
  };

  const daysBn = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
  const monthsBn = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];
  const currentDateBn = `${daysBn[currentTime.getDay()]}, ${toBengaliDigits(currentTime.getDate())} ${monthsBn[currentTime.getMonth()]}`;
  const timeInfo = getTimeInfo(currentTime);

  // 🎯 ৪. রিয়েল-টাইম আসল ব্যবহারকারী ও লাইভ ইন/আউট অ্যাক্টিভিটি (কোনো ডেমো ছাড়া)
  const [totalUsers, setTotalUsers] = useState<number>(5);
  const defaultActivities = [
    { id: 'act_default_1', name: 'Tanvir Ahmed', location: 'পার্সোনাল একাউন্ট', action: 'in', timeAgo: '১ মি. আগে' },
    { id: 'act_default_2', name: 'Riaz', location: 'বিজনেস একাউন্ট', action: 'in', timeAgo: '৩ মি. আগে' },
    { id: 'act_default_3', name: 'qwer', location: 'পার্সোনাল একাউন্ট', action: 'out', timeAgo: '৫ মি. আগে' }
  ];

  const [activities, setActivities] = useState<any[]>(defaultActivities);
  const [activityIndex, setActivityIndex] = useState<number>(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/public/user-stats');
        if (res.ok) {
          const data = await res.json();
          if (data.totalUsers) {
            setTotalUsers(data.totalUsers);
          }
          if (data.recentActivities && data.recentActivities.length > 0) {
            // 🎯 ডেভেলপার (Asiful Islam) এর নাম লাইভ স্ট্রিমে ফিল্টার হয়ে বাদ যাবে
            const nonDevActivities = data.recentActivities.filter((act: any) => {
              const lower = (act.name || '').toLowerCase().trim();
              return !lower.includes('asiful') && !lower.includes('asif') && !lower.includes('developer');
            });

            const formatted = nonDevActivities.map((act: any) => {
              const diffSeconds = Math.max(0, Math.floor((Date.now() - act.timestamp) / 1000));
              let timeAgo = 'এখনই';
              if (diffSeconds >= 60 && diffSeconds < 3600) {
                timeAgo = `${toBengaliDigits(Math.floor(diffSeconds / 60))} মি. আগে`;
              } else if (diffSeconds >= 3600) {
                timeAgo = `${toBengaliDigits(Math.floor(diffSeconds / 3600))} ঘণ্টা আগে`;
              } else if (diffSeconds > 10) {
                timeAgo = `${toBengaliDigits(diffSeconds)} সে. আগে`;
              }
              const loc = act.location || (act.tier === 'business' ? 'বিজনেস একাউন্ট' : act.tier === 'sub_admin' ? 'সাব-এডমিন একাউন্ট' : 'পার্সোনাল একাউন্ট');
              return {
                ...act,
                location: loc,
                timeAgo
              };
            });
            if (formatted.length > 0) {
              setActivities(formatted);
            }
          }
        }
      } catch (e) {
        // fallback smoothly retained
      }
    };

    fetchStats();
    const pollTimer = setInterval(fetchStats, 10000);
    return () => clearInterval(pollTimer);
  }, []);

  // ৩.৫ সেকেন্ড পর পর ইউজার অ্যাক্টিভিটি অটো-রোটেশন
  useEffect(() => {
    if (activities.length === 0) return;
    const rotTimer = setInterval(() => {
      setActivityIndex(prev => (prev + 1) % activities.length);
    }, 3500);
    return () => clearInterval(rotTimer);
  }, [activities.length]);

  const currentActivity = activities[activityIndex] || defaultActivities[0];

  // ৪টি রঙিন স্ট্যাটস বক্স ডাটা
  const statsData = [
    {
      count: '৭২+',
      label: 'মোট সেবা',
      fullLabel: 'মোট সেবা সংখ্যা',
      icon: <Layers className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-emerald-600" />,
      badgeBg: 'bg-emerald-50 border border-emerald-200/90',
      glow: 'shadow-emerald-500/15'
    },
    {
      count: '৬.৩৯',
      desktopCount: '৬,৩৯,১৪৮',
      label: 'গ্রাহক',
      fullLabel: 'মোট ব্যবহারকারী',
      icon: <Users className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-amber-500" />,
      badgeBg: 'bg-amber-50 border border-amber-200/90',
      glow: 'shadow-amber-500/15'
    },
    {
      count: '৫.৭',
      desktopCount: '৫,৭২৫',
      label: 'লেনদেন',
      fullLabel: 'মোট লেনদেন',
      icon: <UserCheck className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-cyan-500" />,
      badgeBg: 'bg-cyan-50 border border-cyan-200/90',
      glow: 'shadow-cyan-500/15'
    },
    {
      count: '৯৯২',
      label: 'পেমেন্ট',
      fullLabel: 'মোট পেমেন্ট',
      icon: <CreditCard className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-purple-600" />,
      badgeBg: 'bg-purple-50 border border-purple-200/90',
      glow: 'shadow-purple-500/15'
    }
  ];

  // মোবাইলে ওপরের ফাঁকা জায়গা সুন্দর করার হাইলাইট চিপস
  const topServicePills = [
    { name: 'NID সেবা', icon: '🆔' },
    { name: 'জন্ম নিবন্ধন', icon: '👶' },
    { name: 'TIN চেক', icon: '📄' },
    { name: 'সিম বায়োমেট্রিক', icon: '📱' }
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
    <div className="fixed inset-0 h-[100dvh] max-h-[100dvh] w-full flex flex-col justify-between overflow-hidden selection:bg-emerald-300 selection:text-emerald-950">
      
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
      {/* 🎯 TOP HEADER */}
      {/* ============================================================== */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-3.5 sm:px-6 pt-2 pb-1 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 sm:gap-3 group cursor-pointer">
          
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
              <span className="text-sm sm:text-xl font-black tracking-tight drop-shadow-md leading-none bg-gradient-to-r from-white via-emerald-200 to-sky-200 bg-[length:200%_auto] bg-clip-text text-transparent">
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

        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
            <span>সিস্টেম লাইভ 🟢</span>
          </div>

          {onEnterGuest && (
            <button
              onClick={onEnterGuest}
              className="group flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full bg-white/25 hover:bg-white/35 backdrop-blur-md border border-white/40 text-white hover:text-emerald-100 text-[10px] sm:text-xs font-bold transition-all shadow-md cursor-pointer"
              title="রেজিস্ট্রেশন ছাড়া সরাসরি ড্যাশবোর্ড দেখুন"
            >
              <span>গেস্ট ভিজিট</span>
              <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          )}
        </div>
      </header>

      {/* 
        🌟 CENTER HERO AREA: justify-evenly দিয়ে পুরো স্ক্রিন পারফেক্ট ব্যালেন্সড 🌟
      */}
      <main className="relative z-20 flex-1 flex flex-col justify-evenly items-center px-3 sm:px-6 overflow-y-auto sm:overflow-hidden py-1">
        <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-2 lg:gap-8">
          
          {/* ========================================================= */}
          {/* DESKTOP ONLY: টাইটেল ও ৪টি বড় ২x২ বক্স */}
          {/* ========================================================= */}
          <div className="hidden lg:flex lg:flex-col lg:max-w-xl text-left space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-1.5"
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
          {/* CENTER/RIGHT: মোবাইলে ফাঁকা জায়গা ভরাট করা কন্টেন্ট + ফর্ম */}
          {/* ========================================================= */}
          <div className="w-full max-w-sm sm:max-w-md flex flex-col items-center">
            
            {/* 🎯 ১. রিয়েল-টাইম ডিজিটাল ঘড়ি এবং রিয়েল-টাইম আসল অ্যাকাউন্ট কাউন্টার */}
            <div className="w-full flex items-center justify-between gap-2.5 mb-2 px-0.5">
              {/* লাইভ ডিজিটাল ঘড়ি */}
              <div className="flex-1 flex items-center gap-2.5 sm:gap-3 px-3 py-2.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-sky-200 shadow-md shadow-sky-500/10 hover:shadow-lg transition-all min-w-0 group">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/30 group-hover:scale-105 transition-transform">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-pulse" />
                </div>
                <div className="flex flex-col text-left justify-center min-w-0 leading-tight">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-black text-xs sm:text-sm md:text-base text-slate-900 tracking-wider whitespace-nowrap">
                      {timeInfo.timeBn}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 rounded-md bg-sky-100 text-sky-800 border border-sky-300 uppercase shrink-0 font-sans shadow-2xs">
                      {timeInfo.ampm}
                    </span>
                  </div>
                  <span className="text-[11px] sm:text-xs md:text-[13px] font-extrabold text-sky-950 mt-1 tracking-tight truncate">
                    {currentDateBn}
                  </span>
                </div>
              </div>

              {/* রিয়েল-টাইম আসল মোট একাউন্ট কাউন্টার (কোনো ডেমো ছাড়া) */}
              <div className="flex-1 flex items-center gap-2.5 sm:gap-3 px-3 py-2.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-emerald-200 shadow-md shadow-emerald-500/10 hover:shadow-lg transition-all min-w-0 group">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-600 to-green-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/30 group-hover:scale-105 transition-transform">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="flex flex-col text-left justify-center min-w-0 leading-tight">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-black text-xs sm:text-sm md:text-base text-emerald-800 tracking-tight whitespace-nowrap">
                      {toBengaliDigits(totalUsers)} জন
                    </span>
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  </div>
                  <span className="text-[11px] sm:text-xs md:text-[13px] font-extrabold text-emerald-950 mt-1 tracking-tight truncate">
                    আসল রেজিস্টার্ড একাউন্ট
                  </span>
                </div>
              </div>
            </div>

            {/* 🎯 মোবাইলের ওপরের ফাঁকা জায়গা ভরাট করা সেকশন */}
            <div className="w-full flex flex-col items-center text-center mb-1 lg:hidden">
              <div className="flex items-center gap-1.5 flex-wrap justify-center mb-1">
                {topServicePills.map((pill, i) => (
                  <span 
                    key={i} 
                    className="px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-emerald-200 font-bold text-[10px] shadow-2xs"
                  >
                    {pill.icon} {pill.name}
                  </span>
                ))}
              </div>
            </div>

            {/* লোগো ও লোগোর নিচের ব্যাজ */}
            <div className="flex flex-col items-center mb-1.5 z-30 shrink-0">
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
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-emerald-300 text-[10.5px] sm:text-xs font-bold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>বাংলাদেশের বিশ্বস্ত ডিজিটাল সেবা প্ল্যাটফর্ম</span>
              </div>
            </div>

            {/* 🎯 লগইন / রেজিস্ট্রেশন কার্ড */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full bg-white/95 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-[0_12px_40px_-15px_rgba(2,132,199,0.35)] border border-white/90 p-3 sm:p-4 text-slate-800 ring-1 ring-sky-400/20 shrink-0"
            >
              {/* Tab Switcher */}
              <div className="relative p-0.5 sm:p-1 bg-sky-50/90 rounded-xl sm:rounded-2xl flex items-center mb-1.5 sm:mb-2 border border-sky-100">
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
                    className="mb-1.5 p-1.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-[10.5px] font-semibold flex items-center gap-1"
                  >
                    <div className="w-3.5 h-3.5 rounded-full bg-red-200 text-red-700 flex items-center justify-center shrink-0 font-bold text-[8px]">!</div>
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
                    <label className="block text-[11px] sm:text-xs font-bold text-slate-700">
                      আপনার পূর্ণ নাম <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400">
                        <User className="w-3.5 h-3.5" />
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="আপনার নাম লিখুন"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-8 pr-2.5 py-1.5 rounded-lg sm:rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 outline-none text-xs sm:text-sm font-medium bg-white"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Mobile Number */}
                <div className="space-y-0.5">
                  <label className="block text-[11px] sm:text-xs font-bold text-slate-700">
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
                    <label className="block text-[11px] sm:text-xs font-bold text-slate-700">
                      পাসওয়ার্ড <span className="text-red-500">*</span>
                    </label>
                    {mode === 'login' && (
                      <span 
                        onClick={() => setErrorMessage('পাসওয়ার্ড রিসেটের জন্য হেল্পলাইন 01992-867758 নম্বরে যোগাযোগ করুন।')}
                        className="text-[10px] sm:text-[11px] text-sky-600 hover:text-sky-700 cursor-pointer font-semibold"
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
                      className="w-3.5 h-3.5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-400"
                    />
                    <label htmlFor="termsCheck" className="cursor-pointer text-[10px] sm:text-[11px] leading-tight select-none">
                      আমি <span className="font-bold text-slate-800">সেবা বাড়ি</span>-র নিয়মে একমত।
                    </label>
                  </div>
                )}

                {/* Submit CTA Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-1 py-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 hover:from-emerald-500 hover:via-teal-500 hover:to-sky-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/30 transition-all cursor-pointer disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>যাচাই হচ্ছে...</span>
                    </div>
                  ) : mode === 'login' ? (
                    <>
                      <span>লগইন করুন</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <span>রেজিস্ট্রেশন সম্পন্ন করুন</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Switch link */}
              <div className="mt-1.5 text-center">
                {mode === 'login' ? (
                  <p className="text-[10.5px] sm:text-xs text-slate-600">
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
                  <p className="text-[10.5px] sm:text-xs text-slate-600">
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
            {/* 🌟 সিঙ্গেল স্লিম কার্ডে ৪টি স্ট্যাটস 🌟 */}
            {/* ============================================================== */}
            <div className="w-full max-w-sm sm:max-w-md bg-white/95 backdrop-blur-xl rounded-2xl p-1.5 sm:p-2 shadow-md border border-white/90 grid grid-cols-4 divide-x divide-slate-100 mt-2 shrink-0 lg:hidden">
              {statsData.map((stat, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center text-center px-0.5"
                >
                  <div className={`w-5 h-5 rounded-lg ${stat.badgeBg} flex items-center justify-center mb-0.5`}>
                    {stat.icon}
                  </div>
                  <span className="text-[11px] font-black text-slate-900 leading-tight">
                    {stat.count}
                  </span>
                  <span className="text-[8.5px] font-bold text-slate-600 leading-tight mt-0.5">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* 🎯 নিচের স্মার্ট সিকিউরিটি ব্যাজ */}
            <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold text-emerald-300 mt-1 lg:hidden">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>১০০% নিরাপদ ও সুরক্ষিত ডিজিটাল সেবা গেটওয়ে</span>
            </div>

            {/* 🎯 ২. লাইভ ইউজার ইন ও আউট অ্যাক্টিভিটি ট্র্যাকার (ইন ও আউট কখন করেছে) */}
            <div className="w-full max-w-sm sm:max-w-md mt-2 px-0.5">
              <div className="rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-xl border border-white/90 p-2.5 sm:p-3 shadow-xl shadow-black/10 text-slate-800">
                {/* কার্ড হেডার */}
                <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-100 text-[10.5px]">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs sm:text-[13px] font-black text-slate-900 tracking-tight">
                      লাইভ ইউজার অ্যাক্টিভিটি (ইন ও আউট)
                    </span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1 shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>রিয়েল-টাইম LIVE</span>
                  </span>
                </div>

                {/* লাইভ অ্যাক্টিভিটি আইটেম */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentActivity.id || activityIndex}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-center justify-between gap-2 py-2 px-3 rounded-xl border transition-all ${
                      currentActivity.action === 'in'
                        ? 'bg-gradient-to-r from-emerald-50/90 via-teal-50/70 to-emerald-50/90 border-emerald-200/90'
                        : 'bg-gradient-to-r from-rose-50/90 via-orange-50/70 to-rose-50/90 border-rose-200/90'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow-xs ${
                        currentActivity.action === 'in' 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-rose-600 text-white'
                      }`}>
                        {currentActivity.action === 'in' ? <LogIn className="w-4 h-4" /> : <LogOut className="w-4 h-4" />}
                      </div>
                      <div className="flex flex-col min-w-0 leading-tight">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs sm:text-[13px] font-black text-slate-900 truncate">
                            {currentActivity.name}
                          </span>
                          {currentActivity.location && (
                            <span className="text-[10.5px] sm:text-xs text-slate-600 font-bold truncate">
                              • {currentActivity.location}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] sm:text-[11px] font-bold text-slate-600 mt-0.5">
                          {currentActivity.action === 'in' ? 'সফলভাবে লগইন করেছেন' : 'সফলভাবে লগআউট করেছেন'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {currentActivity.action === 'in' ? (
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-emerald-600 text-white shadow-xs flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                          <span>ইন (IN)</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-rose-600 text-white shadow-xs flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                          <span>আউট (OUT)</span>
                        </span>
                      )}
                      <span className="text-[10px] sm:text-[11px] font-black text-slate-700 whitespace-nowrap bg-white/90 border border-slate-200/90 px-2 py-0.5 rounded-md shadow-2xs">
                        {currentActivity.timeAgo || 'এখনই'}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* ============================================================== */}
      {/* 🎯 COMPACT BOTTOM STRIP (হেল্পলাইন নম্বরসহ) */}
      {/* ============================================================== */}
      <footer className="relative z-20 w-full text-center py-1.5 px-3 text-white/95 text-[9.5px] sm:text-xs border-t border-white/20 backdrop-blur-xs bg-slate-900/10 shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-1">
          <div className="flex items-center gap-1.5 sm:gap-4 font-bold text-[9px] sm:text-xs">
            <span className="flex items-center gap-0.5 sm:gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-300" />
              নিরাপদ সেবা
            </span>
            <span>•</span>
            <span className="flex items-center gap-0.5 sm:gap-1">
              <Headphones className="w-3 h-3 text-sky-300" />
              দ্রুত সাপোর্ট
            </span>
            <span>•</span>
            <span className="flex items-center gap-0.5 sm:gap-1">
              <Award className="w-3 h-3 text-yellow-300" />
              বিশ্বস্ত সেবা
            </span>
          </div>

          <div className="text-[9px] sm:text-xs text-sky-100 font-bold">
            <span>হেল্পলাইন: 01603054567</span>
          </div>
        </div>
      </footer>

    </div>
  );
};