import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { services, categories } from '../data/servicesData';
import { Service } from '../types';
import { 
  Search, 
  Sparkles, 
  ChevronRight, 
  Tag, 
  CheckCircle2, 
  Flame, 
  HelpCircle,
  FileText,
  SlidersHorizontal,
  Landmark
} from 'lucide-react';

interface ServicesListProps {
  onSelectService: (service: Service) => void;
}

export const ServicesList: React.FC<ServicesListProps> = ({ onSelectService }) => {
  const { user, selectedCategory, setSelectedCategory, getDiscountedPrice } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyPopular, setOnlyPopular] = useState(false);

  const filteredServices = useMemo(() => {
    return services.filter((svc) => {
      // Category filter
      if (selectedCategory !== 'all' && svc.category !== selectedCategory) {
        return false;
      }
      // Popular filter
      if (onlyPopular && !svc.popular) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = svc.title.toLowerCase().includes(q);
        const matchesTitleEn = svc.titleEn.toLowerCase().includes(q);
        const matchesDesc = svc.description.toLowerCase().includes(q);
        const matchesSub = svc.subServices?.some(s => s.toLowerCase().includes(q));
        if (!matchesTitle && !matchesTitleEn && !matchesDesc && !matchesSub) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, searchQuery, onlyPopular]);

  return (
    <div className="space-y-6">
      
      {/* Search and Category Filter Strip */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-emerald-100 shadow-md space-y-4">
        
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="যেকোনো সেবা খুঁজুন (যেমন: NID, সার্ভার কপি, নামজারি, খতিয়ান, TIN, সিম)..."
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none text-xs sm:text-sm font-medium transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Popular toggle and active tier badge */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setOnlyPopular(!onlyPopular)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-all duration-300 cursor-pointer shadow-xs hover:scale-105 active:scale-95 ${
                onlyPopular
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25'
                  : 'bg-slate-100 text-slate-700 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-200'
              }`}
            >
              <Flame className={`w-3.5 h-3.5 ${onlyPopular ? 'fill-white' : 'text-orange-500'}`} />
              <span>শুধু জনপ্রিয় সেবা</span>
            </button>

            <div className="px-3 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-1.5">
              <span>আপনার রেট:</span>
              <span className="text-emerald-600 uppercase">
                {user?.activeTier === 'personal' ? 'Regular' : user?.activeTier === 'business' ? 'Business (-15%)' : user?.activeTier === 'sub_admin' ? 'Wholesale (-35%)' : 'Guest'}
              </span>
            </div>
          </div>

        </div>

        {/* Category Pills Slider */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-50 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                {cat.badge && (
                  <span className={`px-1 py-0.2 rounded-full text-[9px] ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {cat.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

      </div>

      {/* Special Official Land Banner if Land category or general browsing */}
      {(selectedCategory === 'all' || selectedCategory === 'land') && !searchQuery && (
        <div className="rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-800 to-green-900 text-white p-4 sm:p-6 shadow-lg border border-emerald-500/30">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-emerald-700/60">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl border border-white/20">
                🏡
              </div>
              <div>
                <h3 className="text-base sm:text-xl font-black flex items-center gap-2">
                  <span>বাংলাদেশ ভূমি মন্ত্রণালয় ও ই-নামজারি অফিসিয়াল সেবা</span>
                </h3>
                <p className="text-xs sm:text-sm text-emerald-200">
                  খতিয়ান (CS, SA, RS, BS), দাগের নক্সা, ভূমি কর ও জরিপ সহায়তা
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-200 text-xs font-bold border border-emerald-400/30">
              ৮টি অফিসিয়াল ক্যাটাগরি
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 text-xs text-emerald-100">
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-300">✓</span> ১. নামজারি (Mutation)
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-300">✓</span> ২. ভূমি উন্নয়ন কর
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-300">✓</span> ৩. খতিয়ান ও রেকর্ড
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-300">✓</span> ৪. মৌজা ম্যাপ ও দাগ
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-300">✓</span> ৫. জমি জরিপ (Survey)
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-300">✓</span> ৬. ভূমি আইনগত সেবা
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-300">✓</span> ৭. ভূমি অধিগ্রহণ (LA)
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-300">✓</span> ৮. অনলাইন e-Service
            </div>
          </div>
        </div>
      )}

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServices.length === 0 ? (
          <div className="col-span-full bg-white rounded-3xl p-10 text-center border border-slate-200 space-y-2">
            <div className="text-4xl">🔍</div>
            <h4 className="text-base font-bold text-slate-700">কোনো সেবা খুঁজে পাওয়া যায়নি</h4>
            <p className="text-xs text-slate-500">অন্য শব্দ দিয়ে অনুসন্ধান করুন অথবা সকল সেবা ক্যাটাগরি নির্বাচন করুন।</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setOnlyPopular(false);
              }}
              className="mt-2 px-4 py-2 rounded-full bg-emerald-600 text-white text-xs font-bold"
            >
              ফিল্টার রিসেট করুন
            </button>
          </div>
        ) : (
          filteredServices.map((service) => {
            const finalPrice = getDiscountedPrice(service.price);
            const hasDiscount = finalPrice < service.price;

            return (
              <div
                key={service.id}
                className="group bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 hover:border-emerald-400 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between relative overflow-hidden"
              >
                {/* Popular badge */}
                {service.popular && (
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 border border-orange-200 text-[10px] font-bold flex items-center gap-1">
                    <Flame className="w-3 h-3 fill-orange-500 text-orange-600" />
                    <span>জনপ্রিয়</span>
                  </div>
                )}

                <div>
                  {/* Top row with icon and titles */}
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl shadow-xs group-hover:scale-105 transition-transform shrink-0">
                      {service.icon}
                    </div>

                    <div className="flex-1 pr-12">
                      <h3 className="font-bold text-sm sm:text-base text-slate-800 group-hover:text-emerald-700 transition-colors leading-tight">
                        {service.title}
                      </h3>
                      <span className="text-[11px] font-medium text-slate-400 block mt-0.5">
                        {service.titleEn}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Sub services tags if available (e.g. for official land categories) */}
                  {service.subServices && service.subServices.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-1">
                      {service.subServices.slice(0, 3).map((sub, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-medium border border-emerald-100">
                          {sub}
                        </span>
                      ))}
                      {service.subServices.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-semibold">
                          +{service.subServices.length - 3} আরও
                        </span>
                      )}
                    </div>
                  )}

                  {/* Input Label hint */}
                  <div className="mt-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-500 flex items-center gap-1.5">
                    <span className="text-slate-400 font-semibold">প্রয়োজন:</span>
                    <span className="truncate">{service.inputLabel}</span>
                  </div>
                </div>

                {/* Bottom Pricing and Order Action */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      ফি / খরচ
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-black text-emerald-700">
                        ৳{finalPrice}
                      </span>
                      {hasDiscount && (
                        <span className="text-xs font-semibold text-slate-400 line-through">
                          ৳{service.price}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectService(service)}
                    className="px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:via-teal-500 hover:to-cyan-600 active:scale-95 text-white font-extrabold text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group cursor-pointer"
                  >
                    <span>আবেদন করুন</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
