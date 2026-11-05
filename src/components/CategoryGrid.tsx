import React from 'react';
import { useApp } from '../context/AppContext';
import { ChevronRight, LayoutGrid } from 'lucide-react';

interface CategoryGridProps {
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onSelectCategory }) => {
  const { setActiveTab } = useApp();

  // Visual category tiles matching the exact items in Image 1
  const displayCategories = [
    {
      id: 'nid',
      title: 'NID সেবা',
      icon: (
        <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center shadow-xs text-xl">
          🪪
        </div>
      ),
      bg: 'bg-blue-50/60 hover:bg-blue-100/70 border-blue-100',
    },
    {
      id: 'birth',
      title: 'জন্ম নিবন্ধন',
      icon: (
        <div className="w-10 h-10 rounded-xl bg-green-500 text-white flex items-center justify-center shadow-xs text-xl">
          👶
        </div>
      ),
      bg: 'bg-green-50/60 hover:bg-green-100/70 border-green-100',
    },
    {
      id: 'tax',
      title: 'TIN/ট্যাক্স',
      icon: (
        <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-xs text-xl">
          📄
        </div>
      ),
      bg: 'bg-sky-50/60 hover:bg-sky-100/70 border-sky-100',
    },
    {
      id: 'land',
      title: 'ভূমি সেবা',
      icon: (
        <div className="w-10 h-10 rounded-xl bg-lime-600 text-white flex items-center justify-center shadow-xs text-xl">
          🏡
        </div>
      ),
      bg: 'bg-lime-50/60 hover:bg-lime-100/70 border-lime-100',
      highlight: true,
    },
    {
      id: 'mobile',
      title: 'মোবাইল সেবা',
      icon: (
        <div className="w-10 h-10 rounded-xl bg-cyan-500 text-white flex items-center justify-center shadow-xs text-xl">
          📱
        </div>
      ),
      bg: 'bg-cyan-50/60 hover:bg-cyan-100/70 border-cyan-100',
    },
    {
      id: 'education',
      title: 'শিক্ষা',
      icon: (
        <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs text-xl">
          🎓
        </div>
      ),
      bg: 'bg-indigo-50/60 hover:bg-indigo-100/70 border-indigo-100',
    },
    {
      id: 'bill',
      title: 'বিল পরিশোধ',
      icon: (
        <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs text-xl">
          🧾
        </div>
      ),
      bg: 'bg-blue-50/60 hover:bg-blue-100/70 border-blue-100',
    },
    {
      id: 'cert',
      title: 'অফিসিয়াল সার্ভিস',
      icon: (
        <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-xs text-xl">
          🏛️
        </div>
      ),
      bg: 'bg-teal-50/60 hover:bg-teal-100/70 border-teal-100',
    },
    {
      id: 'other',
      title: 'অন্যান্য সেবা',
      icon: (
        <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs text-xl">
          💬
        </div>
      ),
      bg: 'bg-emerald-50/60 hover:bg-emerald-100/70 border-emerald-100',
    },
    {
      id: 'coming_soon',
      title: 'বেশি সেবা আসছে...',
      icon: (
        <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs text-xl">
          🎁
        </div>
      ),
      bg: 'bg-amber-50/60 hover:bg-amber-100/70 border-amber-100',
      isComingSoon: true,
    },
  ];

  return (
    <section className="bg-white rounded-3xl p-4 sm:p-6 border border-emerald-100 shadow-md space-y-4">
      
      {/* Header matching Image 1: Green rounded ribbon + "সকল সেবা দেখুন >" */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-600 text-white font-extrabold text-sm sm:text-base shadow-xs">
          <LayoutGrid className="w-4 h-4 text-emerald-200" />
          <span>সেবার বিভাগসমূহ</span>
        </div>

        <button
          onClick={() => {
            onSelectCategory('all');
            setActiveTab('services');
          }}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:via-teal-500 hover:to-cyan-600 text-white text-xs sm:text-sm font-extrabold shadow-md shadow-emerald-700/20 hover:shadow-lg hover:shadow-emerald-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group cursor-pointer"
        >
          <span>সকল সেবা দেখুন</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>

      {/* Grid of category tiles matching the 5x2 layout in Image 1 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
        {displayCategories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => {
              if (cat.isComingSoon) {
                onSelectCategory('all');
                setActiveTab('services');
              } else {
                onSelectCategory(cat.id);
                setActiveTab('services');
              }
            }}
            className={`group relative rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center text-center border transition-all duration-300 cursor-pointer shadow-xs hover:shadow-lg hover:-translate-y-1 hover:border-emerald-400 active:scale-95 ${cat.bg}`}
          >
            <div className="group-hover:scale-110 transition-transform">
              {cat.icon}
            </div>

            <span className="mt-2.5 font-bold text-xs sm:text-sm text-slate-800 group-hover:text-emerald-700 transition-colors">
              {cat.title}
            </span>

            {cat.highlight && (
              <span className="absolute -top-1 -right-1 px-1.5 py-0.2 bg-lime-600 text-white text-[9px] font-bold rounded-full">
                ৮ সেবা
              </span>
            )}
          </div>
        ))}
      </div>

    </section>
  );
};
