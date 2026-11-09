// ============================================================================
// 💰 টিয়ার প্ল্যানের মূল প্রাইসিং ও কনফিগারেশন
// এখানে যে কোনো প্ল্যানের মূল্য (Price) বা তথ্য পরিবর্তন করলে পুরো ওয়েবসাইটে
// (কার্ড, মোডাল, ডিপোজিট, রেজিস্ট্রেশন) স্বয়ংক্রিয়ভাবে আপডেট হয়ে যাবে।
// ============================================================================

export interface TierFeature {
  title: string;
  subText?: string;
  iconType?: 'check' | 'gift' | 'trend' | 'shield' | 'zap';
}

export interface TierPlanConfig {
  id: 'personal' | 'business' | 'sub_admin';
  name: string;
  nameEn: string;
  price: number;
  priceFormatted: string;
  topBadge?: string;
  badgeType?: 'popular' | 'recommended';
  subtitle: string;
  badgeUnderPrice?: string;
  theme: string;
  borderClass: string;
  accentColor: string;
  discountRate: string;
  discountPercentage: number;
  features: TierFeature[];
}

// 🎯 ১ জায়গায় দাম পরিবর্তন করলেই পুরো সাইটে আপডেট হবে:
export const TIER_PRICES = {
  personal: 500,      // পার্সোনাল অ্যাকাউন্ট মূল্য (৳)
  business: 1450,     // বিজনেস অ্যাকাউন্ট মূল্য (৳)
  sub_admin: 2950,    // সাব অ্যাডমিন প্যানেল মূল্য (৳)
};

// 🎯 প্রতিটি প্ল্যানের ডিসকাউন্ট রেট:
export const TIER_DISCOUNTS = {
  personal: 0,        // রেগুলার প্রাইস
  business: 0.15,     // ১৫% ডিসকাউন্ট
  sub_admin: 0.35,    // ৩৫% পাইকারি ডিসকাউন্ট
};

export const getTierPlans = (): Record<'personal' | 'business' | 'sub_admin', TierPlanConfig> => {
  return {
    personal: {
      id: 'personal',
      name: 'পার্সোনাল অ্যাকাউন্ট',
      nameEn: 'Personal Account',
      price: TIER_PRICES.personal,
      priceFormatted: `৳ ${TIER_PRICES.personal.toLocaleString('en-US')}`,
      subtitle: 'শুধু নিজের ব্যক্তিগত কাজের জন্য উপযুক্ত',
      theme: 'from-blue-600 via-sky-600 to-indigo-600',
      borderClass: 'border-blue-400',
      accentColor: 'blue',
      discountRate: 'রেগুলার মূল্য',
      discountPercentage: TIER_DISCOUNTS.personal,
      features: [
        {
          title: 'NID চেক',
          subText: 'জাতীয় পরিচয়পত্র ও ভোটার তথ্য যাচাই',
          iconType: 'check'
        },
        {
          title: 'জন্ম নিবন্ধন চেক',
          subText: 'অনলাইন জন্ম নিবন্ধন ভেরিফিকেশন ও তথ্য যাচাই',
          iconType: 'check'
        },
        {
          title: 'TIN চেক',
          subText: 'ই-টিন সার্টিফিকেট ও আয়কর তথ্য যাচাই',
          iconType: 'check'
        }
      ]
    },

    business: {
      id: 'business',
      name: 'বিজনেস অ্যাকাউন্ট',
      nameEn: 'Business Account',
      price: TIER_PRICES.business,
      priceFormatted: `৳ ${TIER_PRICES.business.toLocaleString('en-US')}`,
      topBadge: 'সবচেয়ে জনপ্রিয় 🔥',
      badgeType: 'popular',
      subtitle: 'নিজের কাজের পাশাপাশি কাস্টমারের কাজও করতে পারবেন',
      theme: 'from-emerald-600 via-teal-600 to-green-600',
      borderClass: 'border-emerald-500',
      accentColor: 'emerald',
      discountRate: '১৫% বিশেষ ছাড়',
      discountPercentage: TIER_DISCOUNTS.business,
      features: [
        {
          title: 'NID, সিম, কল লিস্ট, TINসহ ৫০+ ডিজিটাল সার্ভিস',
          subText: 'দোকান বা ব্যবসা থেকে আনলিমিটেড কাস্টমার সার্ভিস',
          iconType: 'check'
        },
        {
          title: 'কাজ করলেই দারুণ ইনকামের সুযোগ (১৫% ফ্ল্যাট ছাড়)',
          subText: 'প্রতিটি সার্ভিসে সরাসরি কমিশন ও খরচ কম',
          iconType: 'gift'
        },
        {
          title: 'কাস্টমার রসিদ ও স্লিপ প্রিন্ট করার পূর্ণ সুবিধা',
          subText: 'নিজের দোকান/এজেন্ট নামে কাস্টম রিসিপ্ট দিন',
          iconType: 'trend'
        }
      ]
    },

    sub_admin: {
      id: 'sub_admin',
      name: 'Sub Admin Panel',
      nameEn: 'Sub Admin Panel',
      price: TIER_PRICES.sub_admin,
      priceFormatted: `৳ ${TIER_PRICES.sub_admin.toLocaleString('en-US')}`,
      topBadge: 'RECOMMENDED 🌟',
      badgeType: 'recommended',
      subtitle: 'রিসেলার ও মাস্টার উদ্যোক্তাদের জন্য সর্বোচ্চ লাভজনক',
      badgeUnderPrice: 'সবচেয়ে বেশি ভ্যালুর প্ল্যান',
      theme: 'from-purple-700 via-indigo-600 to-amber-600',
      borderClass: 'border-purple-500',
      accentColor: 'purple',
      discountRate: '৩৫% পাইকারি ছাড়',
      discountPercentage: TIER_DISCOUNTS.sub_admin,
      features: [
        {
          title: 'সব সার্ভিস পাইকারি রেটে পাবেন (৩৫% পর্যন্ত সর্বোচ্চ ছাড়)',
          subText: '➔ প্রতি কাজে খরচ সর্বনিম্ন, বাকি পুরো লাভই আপনার পকেটে',
          iconType: 'check'
        },
        {
          title: 'আলাদা Sub Admin Dashboard ও সম্পূর্ণ হিসাবরক্ষণ',
          subText: '➔ সব অর্ডার, সাব-ইউজার ও ওয়ালেট ব্যালেন্স নিয়ন্ত্রণ',
          iconType: 'trend'
        },
        {
          title: 'নিজের রেট নিজেই নির্ধারণ ও রিসেলিং সুবিধা',
          subText: '➔ কাস্টমার ও সাব-এজেন্টদের ইচ্ছামতো মূল্যে সেবা বিক্রি',
          iconType: 'gift'
        }
      ]
    }
  };
};

