import { Service, Category } from '../types';

export const categories: Category[] = [
  { id: 'all', label: 'সকল সেবা', icon: '⚡' },
  { id: 'nid', label: 'NID সেবা', icon: '🪪', badge: 'জনপ্রিয়' },
  { id: 'birth', label: 'জন্ম নিবন্ধন', icon: '👶' },
  { id: 'tax', label: 'TIN/ট্যাক্স', icon: '📄' },
  { id: 'land', label: 'ভূমি সেবা', icon: '🏡', badge: 'অফিসিয়াল' },
  { id: 'mobile', label: 'মোবাইল সেবা', icon: '📱' },
  { id: 'education', label: 'শিক্ষা', icon: '🎓' },
  { id: 'bill', label: 'বিল পরিশোধ', icon: '🧾' },
  { id: 'cert', label: 'সনদপত্র', icon: '📜' },
  { id: 'trade', label: 'ট্রেড/ব্যবসা', icon: '🏪' },
  { id: 'location', label: 'লোকেশন', icon: '📍' },
  { id: 'other', label: 'অন্যান্য সেবা', icon: '🔧' },
];

export const stats = [
  { label: 'মোট সেবা সংখ্যা', value: '৫০+', icon: '⚡' },
  { label: 'মোট ব্যবহারকারী', value: '৩,৩৯,৯৭১', icon: '👥' },
  { label: 'মোট উদ্যোক্তা', value: '৭,৬২৯', icon: '👤' },
  { label: 'মোট সেন্টার', value: '৩২৯', icon: '🏢' },
];

export const services: Service[] = [
  // --- NID সেবা ---
  {
    id: 'server-copy',
    title: 'সার্ভার কপি',
    titleEn: 'Server Copy',
    description: 'NID কার্ডের তথ্য যাচাই (সার্ভার কপি)',
    icon: '📋',
    color: 'bg-blue-500',
    category: 'nid',
    price: 18,
    popular: true,
    inputLabel: 'আইডি নাম্বার ও জন্ম তারিখ',
    inputPlaceholder: '১০/১৩/১৭ ডিজিট আইডি নাম্বার / DD-MM-YYYY',
    fields: [
      { name: 'nidNumber', label: 'এনআইডি নাম্বার', placeholder: '১০ বা ১৭ সংখ্যার এনআইডি নম্বর', required: true },
      { name: 'dob', label: 'জন্ম তারিখ', placeholder: 'DD/MM/YYYY', required: true },
    ]
  },
  {
    id: 'sign-copy',
    title: 'সাইন কপি',
    titleEn: 'Sign Copy',
    description: 'NID কার্ডের সাইন কপি সংগ্রহ',
    icon: '🖋️',
    color: 'bg-blue-600',
    category: 'nid',
    price: 18,
    inputLabel: 'ভোটার/আইডি নাম্বার',
    inputPlaceholder: 'ভোটার নাম্বার বা আইডি নাম্বার দিন',
    fields: [
      { name: 'identifier', label: 'ভোটার বা এনআইডি নম্বর', placeholder: 'নম্বর লিখুন', required: true },
    ]
  },
  {
    id: 'nid-pdf',
    title: 'NID কার্ড PDF',
    titleEn: 'NID Card PDF',
    description: 'অরিজিনাল জাতীয় পরিচয়পত্রের PDF',
    icon: '🪪',
    color: 'bg-indigo-600',
    category: 'nid',
    price: 33,
    popular: true,
    inputLabel: 'আইডি নাম্বার ও জন্ম তারিখ',
    inputPlaceholder: 'আইডি নাম্বার / জন্ম তারিখ (DD/MM/YYYY)',
    fields: [
      { name: 'nidNumber', label: 'এনআইডি নম্বর', placeholder: 'এনআইডি নম্বর দিন', required: true },
      { name: 'dob', label: 'জন্ম তারিখ', placeholder: 'DD/MM/YYYY', required: true },
      { name: 'motherName', label: 'মাতার নাম (প্রয়োজনে)', placeholder: 'মাতার নাম দিন' }
    ]
  },
  {
    id: 'form-sign-copy',
    title: 'ফরম নং → সাইন কপি',
    titleEn: 'Form to Sign Copy',
    description: 'ফরম নাম্বার দিয়ে সাইন কপি সংগ্রহ',
    icon: '📝',
    color: 'bg-indigo-500',
    category: 'nid',
    price: 23,
    inputLabel: 'ফরম নাম্বার',
    inputPlaceholder: 'ভোটার নিবন্ধন ফরম নাম্বার দিন',
    fields: [
      { name: 'formNumber', label: 'ভোটার ফরম নম্বর (Form No)', placeholder: 'যেমন: ৮ ডিজিটের ফরম নম্বর', required: true },
      { name: 'dob', label: 'জন্ম তারিখ', placeholder: 'DD/MM/YYYY', required: true }
    ]
  },
  {
    id: 'nid-voter-number',
    title: 'NID ভোটার নাম্বার দিয়ে সার্ভিস',
    titleEn: 'NID service by Voter Number',
    description: 'ভোটার নাম্বার দিয়ে NID সেবা',
    icon: '🗳️',
    color: 'bg-teal-500',
    category: 'nid',
    price: 45,
    inputLabel: 'ভোটার নাম্বার',
    inputPlaceholder: 'ভোটার নাম্বার দিন',
    fields: [
      { name: 'voterNumber', label: 'ভোটার নম্বর', placeholder: 'ভোটার নম্বর প্রদান করুন', required: true }
    ]
  },
  {
    id: 'official-server-copy',
    title: 'অফিসিয়াল সার্ভার কপি',
    titleEn: 'Official Server Copy',
    description: 'সরকারি অফিসিয়াল সার্ভার কপি সরাসরি ডাটাবেজ থেকে',
    icon: '🏛️',
    color: 'bg-blue-800',
    category: 'nid',
    price: 59,
    popular: true,
    inputLabel: 'আইডি নাম্বার ও জন্ম তারিখ',
    inputPlaceholder: 'আইডি নাম্বার / জন্ম তারিখ (DD/MM/YYYY)',
    fields: [
      { name: 'nidNumber', label: 'এনআইডি নম্বর', placeholder: '১০ বা ১৭ সংখ্যার এনআইডি নম্বর', required: true },
      { name: 'dob', label: 'জন্ম তারিখ', placeholder: 'DD/MM/YYYY', required: true }
    ]
  },
  {
    id: 'nid-correction',
    title: 'NID সংশোধন',
    titleEn: 'NID Correction',
    description: 'NID সংশোধন আবেদন প্রক্রিয়া ও সহযোগিতা',
    icon: '✏️',
    color: 'bg-blue-600',
    category: 'nid',
    price: 0,
    inputLabel: 'আইডি নাম্বার ও সংশোধনের তথ্য',
    inputPlaceholder: 'আইডি নাম্বার ও কী সংশোধন করতে চান লিখুন',
    fields: [
      { name: 'nidNumber', label: 'বর্তমান এনআইডি নম্বর', placeholder: 'নম্বর দিন', required: true },
      { name: 'correctionDetails', label: 'সংশোধনের বিবরণ', placeholder: 'নাম / জন্মতারিখ / পিতা-মাতার নাম কি পরিবর্তন চান লিখুন', required: true }
    ]
  },
  {
    id: 'nid-address-change',
    title: 'NID ঠিকানা পরিবর্তন',
    titleEn: 'NID Address Change',
    description: 'জাতীয় পরিচয়পত্রের ঠিকানা আপডেট',
    icon: '🏠',
    color: 'bg-blue-500',
    category: 'nid',
    price: 1750,
    inputLabel: 'আইডি নাম্বার ও নতুন ঠিকানা',
    inputPlaceholder: 'আইডি নাম্বার / নতুন ঠিকানা লিখুন',
    fields: [
      { name: 'nidNumber', label: 'এনআইডি নম্বর', placeholder: 'এনআইডি নম্বর', required: true },
      { name: 'newAddress', label: 'নতুন ঠিকানা', placeholder: 'গ্রাম/রাস্তা, পোস্ট অফিস, উপজেলা, জেলা', required: true }
    ]
  },
  {
    id: 'smart-id-card',
    title: 'স্মার্ট ID কার্ড',
    titleEn: 'Smart ID Card',
    description: 'অরিজিনাল স্মার্ট আইডি কার্ড কপি ও স্ট্যাটাস',
    icon: '💳',
    color: 'bg-purple-700',
    category: 'nid',
    price: 699,
    popular: true,
    inputLabel: 'নাম ও আইডি নাম্বার',
    inputPlaceholder: 'পূর্ণ নাম / আইডি নাম্বার দিন',
    fields: [
      { name: 'name', label: 'পূর্ণ নাম (ইংরেজি বা বাংলা)', placeholder: 'নাম লিখুন', required: true },
      { name: 'nidNumber', label: 'এনআইডি বা ফরম নম্বর', placeholder: 'নম্বর লিখুন', required: true }
    ]
  },
  {
    id: 'nid-by-name-address',
    title: 'নাম ঠিকানা দিয়ে এনআইডি',
    titleEn: 'NID by Name Address',
    description: 'নাম ও ঠিকানা দিয়ে NID নম্বর ও তথ্য অনুসন্ধান',
    icon: '🪪',
    color: 'bg-blue-600',
    category: 'nid',
    price: 130,
    inputLabel: 'নাম ও ঠিকানা',
    inputPlaceholder: 'পূর্ণ নাম / বিস্তারিত ঠিকানা দিন',
    fields: [
      { name: 'personName', label: 'ব্যক্তির পূর্ণ নাম', placeholder: 'নাম লিখুন', required: true },
      { name: 'address', label: 'ঠিকানা ও এলাকা', placeholder: 'উপজেলা ও জেলা উল্লেখ করুন', required: true }
    ]
  },
  {
    id: 'nid-by-name-address-pdf',
    title: 'নাম ঠিকানা দিয়ে এনআইডি (PDF)',
    titleEn: 'NID by Name Address PDF',
    description: 'নাম ও ঠিকানা দিয়ে NID এর PDF কপি প্রদান',
    icon: '📄',
    color: 'bg-indigo-600',
    category: 'nid',
    price: 130,
    inputLabel: 'নাম ও ঠিকানা',
    inputPlaceholder: 'পূর্ণ নাম / বিস্তারিত ঠিকানা দিন',
    fields: [
      { name: 'personName', label: 'ব্যক্তির পূর্ণ নাম', placeholder: 'নাম লিখুন', required: true },
      { name: 'address', label: 'ঠিকানা ও এলাকা', placeholder: 'উপজেলা ও জেলা', required: true }
    ]
  },
  {
    id: 'nid-user-password-set',
    title: 'NID User & Password সেট',
    titleEn: 'NID User & Password Set',
    description: 'NID একাউন্টের ইউজার ও পাসওয়ার্ড সেট সহায়তা',
    icon: '🔐',
    color: 'bg-teal-600',
    category: 'nid',
    price: 120,
    inputLabel: 'আইডি নাম্বার ও জন্ম তারিখ',
    inputPlaceholder: 'আইডি নাম্বার / জন্ম তারিখ (DD/MM/YYYY)',
    fields: [
      { name: 'nidNumber', label: 'এনআইডি নম্বর', placeholder: 'এনআইডি নম্বর দিন', required: true },
      { name: 'dob', label: 'জন্ম তারিখ', placeholder: 'DD/MM/YYYY', required: true },
      { name: 'mobile', label: 'ব্যবহৃত মোবাইল নম্বর', placeholder: '01XXXXXXXXX', required: true }
    ]
  },
  {
    id: 'mobile-to-nid',
    title: 'মোবাইল দিয়ে NID উত্তোলন',
    titleEn: 'Mobile to NID Card',
    description: 'মোবাইল নাম্বার দিয়ে NID কার্ডের তথ্য উত্তোলন',
    icon: '🔍',
    color: 'bg-violet-600',
    category: 'nid',
    price: 99,
    popular: true,
    inputLabel: 'মোবাইল নাম্বার',
    inputPlaceholder: '01XXXXXXXXX নাম্বার দিন',
    fields: [
      { name: 'mobile', label: 'মোবাইল নম্বর', placeholder: '01XXXXXXXXX', required: true }
    ]
  },
  {
    id: 'nid-to-all-sim-info',
    title: 'NID দিয়ে অল সিম ইনফো',
    titleEn: 'NID to All SIM Info',
    description: 'NID কার্ড নাম্বার দিয়ে সকল সিমের বিস্তারিত তথ্য',
    icon: '📶',
    color: 'bg-indigo-600',
    category: 'nid',
    price: 99,
    popular: true,
    inputLabel: 'আইডি নাম্বার',
    inputPlaceholder: 'জাতীয় পরিচয়পত্র নাম্বার দিন',
    fields: [
      { name: 'nidNumber', label: 'এনআইডি নম্বর', placeholder: '১০ বা ১৭ সংখ্যার নম্বর', required: true }
    ]
  },

  // --- জন্ম ও মৃত্যু নিবন্ধন ---
  {
    id: 'new-birth-reg',
    title: 'নতুন জন্মনিবন্ধন',
    titleEn: 'New Birth Registration',
    description: 'সম্পূর্ণ নতুন জন্মনিবন্ধন আবেদন',
    icon: '👶',
    color: 'bg-green-700',
    category: 'birth',
    price: 510,
    inputLabel: 'নাম ও জন্ম তারিখ',
    inputPlaceholder: 'শিশুর নাম / জন্ম তারিখ / পিতামাতার নাম',
    fields: [
      { name: 'childName', label: 'শিশুর নাম (বাংলা ও ইংরেজি)', placeholder: 'নাম লিখুন', required: true },
      { name: 'dob', label: 'জন্ম তারিখ', placeholder: 'DD/MM/YYYY', required: true },
      { name: 'fatherNid', label: 'পিতার এনআইডি / জন্মনিবন্ধন', placeholder: 'নম্বর লিখুন' },
      { name: 'motherNid', label: 'মাতার এনআইডি / জন্মনিবন্ধন', placeholder: 'নম্বর লিখুন' }
    ]
  },
  {
    id: 'birth-copy',
    title: 'জন্ম নিবন্ধন কপি',
    titleEn: 'Birth Reg Copy',
    description: 'জন্মনিবন্ধন সনদের ডিজিটাল কপি সংগ্রহ',
    icon: '📄',
    color: 'bg-green-600',
    category: 'birth',
    price: 35,
    popular: true,
    inputLabel: 'জন্ম নিবন্ধন নাম্বার',
    inputPlaceholder: '১৭ ডিজিটের জন্ম নিবন্ধন নাম্বার দিন',
    fields: [
      { name: 'brn', label: '১৭ ডিজিটের জন্মনিবন্ধন নম্বর', placeholder: '১৭ সংখ্যার নম্বর দিন', required: true },
      { name: 'dob', label: 'জন্ম তারিখ', placeholder: 'DD/MM/YYYY', required: true }
    ]
  },
  {
    id: 'birth-correction',
    title: 'জন্মনিবন্ধন সংশোধন',
    titleEn: 'Birth Reg Correction',
    description: 'জন্মনিবন্ধনের তথ্য সংশোধন আবেদন',
    icon: '✏️',
    color: 'bg-green-600',
    category: 'birth',
    price: 200,
    inputLabel: 'জন্ম নিবন্ধন নাম্বার ও সংশোধনের তথ্য',
    inputPlaceholder: 'জন্ম নিবন্ধন নাম্বার / কী সংশোধন করতে চান',
    fields: [
      { name: 'brn', label: '১৭ ডিজিট জন্মনিবন্ধন নম্বর', placeholder: 'নম্বর দিন', required: true },
      { name: 'correctionInfo', label: 'কী তথ্য সংশোধন করতে চান', placeholder: 'বিস্তারিত লিখুন', required: true }
    ]
  },
  {
    id: 'death-certificate',
    title: 'মৃত্যু সনদ',
    titleEn: 'Death Certificate',
    description: 'মৃত্যু নিবন্ধন সনদ সংগ্রহ ও আবেদন',
    icon: '📜',
    color: 'bg-gray-600',
    category: 'birth',
    price: 150,
    inputLabel: 'মৃত ব্যক্তির নাম ও তথ্য',
    inputPlaceholder: 'মৃত ব্যক্তির নাম / মৃত্যু তারিখ',
    fields: [
      { name: 'deceasedName', label: 'মৃত ব্যক্তির নাম', placeholder: 'নাম লিখুন', required: true },
      { name: 'dateOfDeath', label: 'মৃত্যুর তারিখ', placeholder: 'DD/MM/YYYY', required: true },
      { name: 'deathPlace', label: 'মৃত্যুর স্থান ও জেলা', placeholder: 'উপজেলা/জেলা' }
    ]
  },

  // --- TIN / ট্যাক্স ---
  {
    id: 'tin-certificate',
    title: 'টিন সার্টিফিকেট',
    titleEn: 'TIN Certificate',
    description: 'নতুন বা পুরাতন টিন সার্টিফিকেট সংগ্রহ',
    icon: '📄',
    color: 'bg-orange-600',
    category: 'tax',
    price: 59,
    inputLabel: 'আইডি কার্ড নাম্বার',
    inputPlaceholder: 'জাতীয় পরিচয়পত্র নাম্বার দিন',
    fields: [
      { name: 'nidNumber', label: 'জাতীয় পরিচয়পত্র নম্বর', placeholder: 'এনআইডি নম্বর', required: true },
      { name: 'tinNumber', label: 'TIN নম্বর (যদি থাকে)', placeholder: '১২ ডিজিটের ই-টিন নম্বর' }
    ]
  },
  {
    id: 'tin-new',
    title: 'নতুন TIN রেজিস্ট্রেশন',
    titleEn: 'New TIN Registration',
    description: 'নতুন ট্যাক্স আইডেন্টিফিকেশন নম্বর তৈরি',
    icon: '🧾',
    color: 'bg-orange-500',
    category: 'tax',
    price: 99,
    popular: true,
    inputLabel: 'আইডি কার্ড নাম্বার ও নাম',
    inputPlaceholder: 'আইডি নাম্বার / পূর্ণ নাম দিন',
    fields: [
      { name: 'nidNumber', label: 'এনআইডি নম্বর', placeholder: 'এনআইডি নম্বর দিন', required: true },
      { name: 'dob', label: 'জন্ম তারিখ', placeholder: 'DD/MM/YYYY', required: true },
      { name: 'mobile', label: 'সচল মোবাইল নম্বর', placeholder: '01XXXXXXXXX', required: true }
    ]
  },
  {
    id: 'income-tax-return',
    title: 'আয়কর রিটার্ন',
    titleEn: 'Income Tax Return',
    description: 'বার্ষিক আয়কর রিটার্ন জমা ও একনলেজমেন্ট',
    icon: '💼',
    color: 'bg-orange-700',
    category: 'tax',
    price: 350,
    inputLabel: 'TIN নাম্বার',
    inputPlaceholder: '১২ সংখ্যার TIN নাম্বার দিন',
    fields: [
      { name: 'tinNumber', label: 'ই-টিন নম্বর (12 digits)', placeholder: 'TIN নম্বর দিন', required: true },
      { name: 'taxYear', label: 'কর বর্ষ', placeholder: 'যেমন: ২০২৪-২০২৫', required: true }
    ]
  },

  // --- ভূমি সেবা (Land Services - Comprehensive 8 Official Sections) ---
  {
    id: 'land-mutation-official',
    title: '১. নামজারি (Mutation) সেবা',
    titleEn: 'Land Mutation Service',
    description: 'মালিকানা পরিবর্তন, উত্তরাধিকারসূত্রে ও ক্রয়-বিক্রয় নামজারি, রেকর্ড সংশোধন',
    icon: '🏛️',
    color: 'bg-emerald-700',
    category: 'land',
    price: 250,
    popular: true,
    inputLabel: 'দাগ নাম্বার, খতিয়ান ও মৌজা',
    inputPlaceholder: 'দাগ নাম্বার / খতিয়ান / মৌজা / জেলা',
    subServices: [
      'মালিকানা পরিবর্তন',
      'উত্তরাধিকারসূত্রে নামজারি',
      'ক্রয়-বিক্রয় অনুযায়ী নামজারি',
      'রেকর্ড সংশোধন'
    ],
    fields: [
      { name: 'district', label: 'জেলা ও উপজেলা', placeholder: 'জেলা এবং উপজেলা', required: true },
      { name: 'mouza', label: 'মৌজা ও জেএল নম্বর', placeholder: 'যেমন: বাড্ডা, জেএল নং ১২', required: true },
      { name: 'khatianNo', label: 'খতিয়ান নম্বর', placeholder: 'খতিয়ান নম্বর', required: true },
      { name: 'dagNo', label: 'দাগ নম্বর', placeholder: 'দাগ নম্বর', required: true },
      { name: 'applicantName', label: 'আবেদনকারীর নাম', placeholder: 'নাম লিখুন', required: true }
    ]
  },
  {
    id: 'land-tax-official',
    title: '২. ভূমি উন্নয়ন কর সেবা',
    titleEn: 'Land Development Tax',
    description: 'ভূমি কর নির্ধারণ, কর পরিশোধ (অনলাইন/অফলাইন), কর রসিদ (দাখিলা) ইস্যু ও বকেয়া নিষ্পত্তি',
    icon: '💵',
    color: 'bg-emerald-600',
    category: 'land',
    price: 120,
    inputLabel: 'খতিয়ান ও হোল্ডিং নম্বর',
    inputPlaceholder: 'খতিয়ান নম্বর / হোল্ডিং নম্বর / জেলা',
    subServices: [
      'ভূমি কর নির্ধারণ',
      'কর পরিশোধ (অনলাইন/অফলাইন)',
      'কর রসিদ (দাখিলা) ইস্যু',
      'বকেয়া কর নিষ্পত্তি'
    ],
    fields: [
      { name: 'holdingNo', label: 'হোল্ডিং নম্বর (যদি জানা থাকে)', placeholder: 'হোল্ডিং নম্বর' },
      { name: 'khatianNo', label: 'খতিয়ান নম্বর', placeholder: 'খতিয়ান নম্বর', required: true },
      { name: 'mouza', label: 'মৌজা ও জেলা', placeholder: 'মৌজা ও জেলা দিন', required: true }
    ]
  },
  {
    id: 'land-record-official',
    title: '৩. খতিয়ান ও ভূমি রেকর্ড সেবা',
    titleEn: 'Khatian & Land Record Service',
    description: 'খতিয়ান প্রদানে সহায়তা (CS, SA, RS, BS), দাগ/খতিয়ান অনুসন্ধান, রেকর্ড আপডেট ও নথি যাচাই',
    icon: '📑',
    color: 'bg-lime-700',
    category: 'land',
    price: 150,
    popular: true,
    inputLabel: 'খতিয়ানের ধরন ও নম্বর',
    inputPlaceholder: 'CS/SA/RS/BS খতিয়ান নম্বর ও জেলা',
    subServices: [
      'খতিয়ান প্রদানে সহায়তা (CS, SA, RS, BS)',
      'জমির দাগ/খতিয়ান অনুসন্ধান',
      'রেকর্ড সংশোধন বা আপডেট',
      'ভূমি নথি যাচাই'
    ],
    fields: [
      { name: 'khatianType', label: 'রেকর্ডের ধরন', placeholder: 'CS / SA / RS / BS / বিআরএস', required: true },
      { name: 'khatianNo', label: 'খতিয়ান নম্বর', placeholder: 'খতিয়ান নম্বর', required: true },
      { name: 'location', label: 'বিভাগ, জেলা, উপজেলা ও মৌজা', placeholder: 'পূর্ণ ঠিকানা দিন', required: true }
    ]
  },
  {
    id: 'land-map-official',
    title: '৪. ম্যাপ/দাগ নক্সা সেবা',
    titleEn: 'Mauza Map & Plot Sketch',
    description: 'মৌজা ম্যাপ সরবরাহ, দাগ ভিত্তিক জমির অবস্থান নিশ্চিত, ডিজিটাল ম্যাপ/নক্সা প্রদান',
    icon: '🗺️',
    color: 'bg-lime-600',
    category: 'land',
    price: 180,
    inputLabel: 'মৌজা ও দাগ নম্বর',
    inputPlaceholder: 'মৌজা নাম / জেএল নম্বর / দাগ নম্বর',
    subServices: [
      'মৌজা ম্যাপ সরবরাহ',
      'দাগ ভিত্তিক জমির অবস্থান নিশ্চিত',
      'ডিজিটাল ম্যাপ/নক্সা প্রদান'
    ],
    fields: [
      { name: 'mouza', label: 'মৌজার নাম ও জেএল নং', placeholder: 'মৌজা ও জেএল', required: true },
      { name: 'dagNo', label: 'দাগ নম্বর', placeholder: 'দাগ নম্বর', required: true },
      { name: 'upazilaDistrict', label: 'উপজেলা ও জেলা', placeholder: 'উপজেলা ও জেলা', required: true }
    ]
  },
  {
    id: 'land-survey-official',
    title: '৫. ভূমি জরিপ (Survey) সেবা',
    titleEn: 'Land Survey & Plot Demarcation',
    description: 'জমি মাপঝোক, GPS/ETS জরিপ, সাইট প্ল্যান তৈরি, প্লট ডেমার্কেশন সীমানা নির্ধারণ',
    icon: '📐',
    color: 'bg-teal-700',
    category: 'land',
    price: 350,
    inputLabel: 'জমির অবস্থান ও ঠিকানা',
    inputPlaceholder: 'জমির বিস্তারিত ঠিকানা ও যোগাযোগের নম্বর',
    subServices: [
      'জমি মাপঝোক',
      'GPS/ETS জরিপ',
      'সাইট প্ল্যান তৈরি',
      'প্লট ডেমার্কেশন'
    ],
    fields: [
      { name: 'landLocation', label: 'জমির ঠিকানা', placeholder: 'দাগ নম্বর সহ জমির অবস্থান', required: true },
      { name: 'contactPhone', label: 'যোগাযোগের মোবাইল নম্বর', placeholder: '01XXXXXXXXX', required: true }
    ]
  },
  {
    id: 'land-legal-official',
    title: '৬. ভূমি সংক্রান্ত আইনগত সেবা',
    titleEn: 'Land Legal Services',
    description: 'ভূমি বিরোধ নিষ্পত্তি সহায়তা, দলিল যাচাই, মালিকানা যাচাইকরণ, দলিল লেখক সহযোগিতা',
    icon: '⚖️',
    color: 'bg-emerald-800',
    category: 'land',
    price: 300,
    inputLabel: 'দলিল নম্বর ও সাল',
    inputPlaceholder: 'দলিল নম্বর / সাব-রেজিস্ট্রি অফিস / সাল',
    subServices: [
      'ভূমি বিরোধ নিষ্পত্তি সহায়তা',
      'দলিল যাচাই',
      'মালিকানা যাচাইকরণ',
      'দলিল লেখক সহযোগিতা'
    ],
    fields: [
      { name: 'deedNumber', label: 'দলিল নম্বর ও সাল', placeholder: 'দলিল নম্বর ও সাল', required: true },
      { name: 'subRegistry', label: 'সাব-রেজিস্ট্রি অফিসের নাম', placeholder: 'অফিসের নাম ও জেলা', required: true }
    ]
  },
  {
    id: 'land-acquisition-official',
    title: '৭. ভূমি অধিগ্রহণ সংক্রান্ত সেবা',
    titleEn: 'Land Acquisition Support',
    description: 'জমি অধিগ্রহণ কাগজপত্র, ক্ষতিপূরণ যাচাই, LA (Land Acquisition) ফাইল প্রসেস',
    icon: '📂',
    color: 'bg-green-800',
    category: 'land',
    price: 400,
    inputLabel: 'LA কেস নম্বর বা দাগ',
    inputPlaceholder: 'LA কেস নম্বর / নোটিশ নম্বর / জেলা',
    subServices: [
      'জমি অধিগ্রহণ কাগজপত্র',
      'ক্ষতিপূরণ যাচাই',
      'LA (Land Acquisition) ফাইল প্রসেস'
    ],
    fields: [
      { name: 'laCaseNo', label: 'এল এ কেস নম্বর (যদি থাকে)', placeholder: 'যেমন: LA Case 04/2023' },
      { name: 'dagKhatian', label: 'দাগ ও খতিয়ান নম্বর', placeholder: 'দাগ ও খতিয়ান নম্বর', required: true }
    ]
  },
  {
    id: 'land-eservice-official',
    title: '৮. অনলাইন ভূমি সেবা (e-Service)',
    titleEn: 'Land e-Services Portal',
    description: 'e-Mutation, অনলাইন ভূমি উন্নয়ন কর, অনলাইন খতিয়ান/ম্যাপ আবেদন, অনলাইন দাগভিত্তিক তথ্য',
    icon: '🌐',
    color: 'bg-green-700',
    category: 'land',
    price: 100,
    popular: true,
    inputLabel: 'আবেদনের তথ্য',
    inputPlaceholder: 'ই-নামজারি ট্র্যাকিং বা খতিয়ান তথ্য দিন',
    subServices: [
      'e-Mutation',
      'অনলাইন ভূমি উন্নয়ন কর',
      'অনলাইন খতিয়ান/ম্যাপ আবেদন',
      'অনলাইন দাগভিত্তিক তথ্য',
      'মোবাইল অ্যাপ সেবা'
    ],
    fields: [
      { name: 'eserviceType', label: 'সেবার নাম', placeholder: 'যেমন: e-Mutation বা অনলাইন কর', required: true },
      { name: 'trackingOrKhatian', label: 'আবেদন আইডি বা খতিয়ান নম্বর', placeholder: 'নম্বর লিখুন', required: true }
    ]
  },
  {
    id: 'porcha-copy',
    title: 'পর্চা কপি',
    titleEn: 'Porcha Copy',
    description: 'ডিজিটাল পর্চা কপি সংগ্রহ ও যাচাই',
    icon: '🗃️',
    color: 'bg-green-900',
    category: 'land',
    price: 80,
    popular: true,
    inputLabel: 'দাগ নাম্বার ও মৌজা',
    inputPlaceholder: 'দাগ নাম্বার / মৌজা দিন',
    fields: [
      { name: 'mouza', label: 'মৌজা ও উপজেলা', placeholder: 'মৌজা ও উপজেলা', required: true },
      { name: 'khatianNo', label: 'খতিয়ান নম্বর', placeholder: 'খতিয়ান নম্বর', required: true }
    ]
  },

  // --- মোবাইল সেবা ---
  {
    id: 'sim-biometric',
    title: 'সিম বায়োমেট্রিক',
    titleEn: 'SIM Biometric',
    description: 'বায়োমেট্রিক দিয়ে সিম তথ্য যাচাই',
    icon: '📲',
    color: 'bg-pink-600',
    category: 'mobile',
    price: 49,
    inputLabel: 'মোবাইল নাম্বার',
    inputPlaceholder: '01XXXXXXXXX নাম্বার দিন',
    fields: [
      { name: 'mobile', label: 'মোবাইল নম্বর', placeholder: '01XXXXXXXXX', required: true }
    ]
  },
  {
    id: 'call-list',
    title: '৩ মাস কল লিস্ট',
    titleEn: '3 Months Call List',
    description: 'মোবাইলের ৩ মাসের কল রেকর্ড বিবরণ',
    icon: '📞',
    color: 'bg-cyan-600',
    category: 'mobile',
    price: 349,
    popular: true,
    inputLabel: 'মোবাইল নাম্বার',
    inputPlaceholder: '01XXXXXXXXX নাম্বার দিন',
    fields: [
      { name: 'mobile', label: 'মোবাইল নম্বর', placeholder: '01XXXXXXXXX', required: true },
      { name: 'simOperator', label: 'অপারেটর', placeholder: 'Grameenphone / Robi / Banglalink / Teletalk' }
    ]
  },
  {
    id: 'sms-list',
    title: '৩ মাস SMS লিস্ট',
    titleEn: '3 Months SMS List',
    description: 'মোবাইলের ৩ মাসের SMS রেকর্ড',
    icon: '💬',
    color: 'bg-cyan-700',
    category: 'mobile',
    price: 349,
    inputLabel: 'মোবাইল নাম্বার',
    inputPlaceholder: '01XXXXXXXXX নাম্বার দিন',
    fields: [
      { name: 'mobile', label: 'মোবাইল নম্বর', placeholder: '01XXXXXXXXX', required: true }
    ]
  },
  {
    id: 'imei-number',
    title: 'IMEI টু নাম্বার',
    titleEn: 'IMEI to Number',
    description: 'IMEI দিয়ে সক্রিয় নাম্বার বের করুন',
    icon: '📱',
    color: 'bg-cyan-500',
    category: 'mobile',
    price: 210,
    inputLabel: 'IMEI নাম্বার',
    inputPlaceholder: '15 সংখ্যার IMEI নাম্বার দিন',
    fields: [
      { name: 'imei', label: '১৫ সংখ্যার IMEI নম্বর', placeholder: 'IMEI নম্বর দিন', required: true }
    ]
  },
  {
    id: 'bkash-info',
    title: 'বিকাশ তথ্য',
    titleEn: 'Bkash Info',
    description: 'বিকাশ একাউন্টের তথ্য ও নাম অনুসন্ধান',
    icon: '💰',
    color: 'bg-pink-500',
    category: 'mobile',
    price: 399,
    popular: true,
    inputLabel: 'বিকাশ নাম্বার',
    inputPlaceholder: 'বিকাশ নাম্বার দিন (01XXXXXXXXX)',
    fields: [
      { name: 'bkashNo', label: 'বিকাশ অ্যাকাউন্ট নম্বর', placeholder: '01XXXXXXXXX', required: true }
    ]
  },
  {
    id: 'nagad-info',
    title: 'নগদ তথ্য',
    titleEn: 'Nagad Info',
    description: 'নগদ একাউন্টের তথ্য অনুসন্ধান',
    icon: '💸',
    color: 'bg-orange-500',
    category: 'mobile',
    price: 399,
    inputLabel: 'নগদ নাম্বার',
    inputPlaceholder: 'নগদ নাম্বার দিন (01XXXXXXXXX)',
    fields: [
      { name: 'nagadNo', label: 'নগদ অ্যাকাউন্ট নম্বর', placeholder: '01XXXXXXXXX', required: true }
    ]
  },
  {
    id: 'rocket-info',
    title: 'রকেট তথ্য',
    titleEn: 'Rocket Info',
    description: 'ডাচ বাংলা রকেট তথ্য অনুসন্ধান',
    icon: '🚀',
    color: 'bg-purple-500',
    category: 'mobile',
    price: 399,
    inputLabel: 'রকেট নাম্বার',
    inputPlaceholder: 'রকেট নাম্বার দিন (01XXXXXXXXX)',
    fields: [
      { name: 'rocketNo', label: 'রকেট নম্বর (১২ সংখ্যার)', placeholder: '01XXXXXXXXX-X', required: true }
    ]
  },
  {
    id: 'cdr',
    title: 'সিডিআর',
    titleEn: 'CDR',
    description: 'কল ডিটেইল রেকর্ড (CDR)',
    icon: '📞',
    color: 'bg-cyan-600',
    category: 'mobile',
    price: 250,
    inputLabel: 'মোবাইল নাম্বার',
    inputPlaceholder: '01XXXXXXXXX নাম্বার দিন',
    fields: [
      { name: 'mobile', label: 'মোবাইল নম্বর', placeholder: '01XXXXXXXXX', required: true }
    ]
  },
  {
    id: 'nid-to-all-number',
    title: 'NID টু অল নাম্বার',
    titleEn: 'NID to All Number',
    description: 'NID দিয়ে রেজিস্ট্রেশন করা সকল নাম্বার বের করুন',
    icon: '📱',
    color: 'bg-teal-500',
    category: 'mobile',
    price: 150,
    popular: true,
    inputLabel: 'আইডি নাম্বার',
    inputPlaceholder: 'জাতীয় পরিচয়পত্র নাম্বার দিন',
    fields: [
      { name: 'nidNumber', label: 'এনআইডি নম্বর', placeholder: '১০ বা ১৭ সংখ্যার নম্বর', required: true }
    ]
  },

  // --- লোকেশন ট্র্যাকিং ---
  {
    id: 'number-location',
    title: 'নম্বর টু লোকেশন',
    titleEn: 'Number to Location',
    description: 'মোবাইল নম্বর দিয়ে লোকেশন ট্র্যাকিং',
    icon: '📍',
    color: 'bg-red-500',
    category: 'location',
    price: 170,
    popular: true,
    inputLabel: 'মোবাইল নাম্বার',
    inputPlaceholder: '01XXXXXXXXX নাম্বার দিন',
    fields: [
      { name: 'mobile', label: 'মোবাইল নম্বর', placeholder: '01XXXXXXXXX', required: true }
    ]
  },
  {
    id: 'live-location',
    title: 'লাইভ লোকেশন',
    titleEn: 'Live Location',
    description: 'রিয়েলটাইম লোকেশন ট্র্যাকিং সেবা',
    icon: '🗺️',
    color: 'bg-red-600',
    category: 'location',
    price: 250,
    inputLabel: 'মোবাইল নাম্বার',
    inputPlaceholder: '01XXXXXXXXX নাম্বার দিন',
    fields: [
      { name: 'mobile', label: 'মোবাইল নম্বর', placeholder: '01XXXXXXXXX', required: true }
    ]
  },

  // --- সনদপত্র ---
  {
    id: 'bmet-service',
    title: 'BMET সেবা',
    titleEn: 'BMET Service',
    description: 'বৈদেশিক কর্মসংস্থান সংক্রান্ত সেবা ও স্মার্ট কার্ড',
    icon: '✈️',
    color: 'bg-sky-600',
    category: 'cert',
    price: 210,
    inputLabel: 'পাসপোর্ট / আইডি নাম্বার',
    inputPlaceholder: 'পাসপোর্ট নাম্বার বা আইডি নাম্বার দিন',
    fields: [
      { name: 'passportNo', label: 'পাসপোর্ট নম্বর', placeholder: 'পাসপোর্ট নম্বর দিন', required: true },
      { name: 'nidNo', label: 'এনআইডি নম্বর', placeholder: 'এনআইডি নম্বর' }
    ]
  },
  {
    id: 'police-clearance',
    title: 'পুলিশ ক্লিয়ারেন্স',
    titleEn: 'Police Clearance',
    description: 'পুলিশ ক্লিয়ারেন্স সার্টিফিকেট আবেদন ও সহায়তা',
    icon: '👮',
    color: 'bg-blue-700',
    category: 'cert',
    price: 300,
    inputLabel: 'আইডি নাম্বার ও ঠিকানা',
    inputPlaceholder: 'আইডি নাম্বার / স্থায়ী ঠিকানা দিন',
    fields: [
      { name: 'nidNumber', label: 'এনআইডি নম্বর', placeholder: 'এনআইডি নম্বর দিন', required: true },
      { name: 'thana', label: 'থানা ও জেলা', placeholder: 'থানা ও জেলা দিন', required: true }
    ]
  },
  {
    id: 'char-certificate',
    title: 'চারিত্রিক সনদ',
    titleEn: 'Character Certificate',
    description: 'চারিত্রিক সনদপত্র সংগ্রহ ও আবেদন',
    icon: '🎓',
    color: 'bg-teal-600',
    category: 'cert',
    price: 100,
    inputLabel: 'নাম ও ঠিকানা',
    inputPlaceholder: 'পূর্ণ নাম / ঠিকানা দিন',
    fields: [
      { name: 'fullName', label: 'পূর্ণ নাম', placeholder: 'নাম লিখুন', required: true },
      { name: 'address', label: 'ঠিকানা', placeholder: 'ইউনিয়ন / ওয়ার্ড', required: true }
    ]
  },
  {
    id: 'driving-license',
    title: 'ড্রাইভিং লাইসেন্স',
    titleEn: 'Driving License',
    description: 'ড্রাইভিং লাইসেন্স আবেদন ও নবায়ন সহায়তা',
    icon: '🚗',
    color: 'bg-yellow-600',
    category: 'cert',
    price: 350,
    inputLabel: 'আইডি নাম্বার ও নাম',
    inputPlaceholder: 'আইডি নাম্বার / পূর্ণ নাম দিন',
    fields: [
      { name: 'nidNumber', label: 'এনআইডি নম্বর', placeholder: 'এনআইডি নম্বর', required: true },
      { name: 'licenseType', label: 'লাইসেন্সের ধরন', placeholder: 'পেশাদার / অপেশাদার' }
    ]
  },
  {
    id: 'passport-apply',
    title: 'পাসপোর্ট আবেদন',
    titleEn: 'Passport Apply',
    description: 'নতুন ই-পাসপোর্ট আবেদন ও রিনিউ সহায়তা',
    icon: '🛂',
    color: 'bg-green-800',
    category: 'cert',
    price: 500,
    popular: true,
    inputLabel: 'আইডি নাম্বার ও নাম',
    inputPlaceholder: 'আইডি নাম্বার / পূর্ণ নাম দিন',
    fields: [
      { name: 'nidNumber', label: 'এনআইডি নম্বর', placeholder: 'এনআইডি নম্বর দিন', required: true },
      { name: 'dob', label: 'জন্ম তারিখ', placeholder: 'DD/MM/YYYY', required: true }
    ]
  },

  // --- ট্রেড / ব্যবসা ---
  {
    id: 'trade-license',
    title: 'ট্রেড লাইসেন্স',
    titleEn: 'Trade License',
    description: 'ট্রেড লাইসেন্স আবেদন ও নবায়ন (পৌরসভা/ইউনিয়ন/সিটি কর্পোরেশন)',
    icon: '🏪',
    color: 'bg-yellow-700',
    category: 'trade',
    price: 600,
    inputLabel: 'ব্যবসার নাম ও ঠিকানা',
    inputPlaceholder: 'ব্যবসার নাম / ঠিকানা দিন',
    fields: [
      { name: 'businessName', label: 'ব্যবসা প্রতিষ্ঠানের নাম', placeholder: 'ব্যবসার নাম দিন', required: true },
      { name: 'ownerName', label: 'মালিকের নাম', placeholder: 'মালিকের নাম দিন', required: true },
      { name: 'businessAddress', label: 'ব্যবসার ঠিকানা', placeholder: 'ঠিকানা ও ওয়ার্ড নম্বর' }
    ]
  },
  {
    id: 'company-reg',
    title: 'কোম্পানি রেজিস্ট্রেশন',
    titleEn: 'Company Registration',
    description: 'RJSC ব্যবসা প্রতিষ্ঠান নিবন্ধন ও প্রক্রিয়া',
    icon: '🏢',
    color: 'bg-yellow-500',
    category: 'trade',
    price: 1500,
    inputLabel: 'কোম্পানির নাম ও তথ্য',
    inputPlaceholder: 'কোম্পানির নাম / ধরন / মালিকের নাম',
    fields: [
      { name: 'companyName', label: 'কোম্পানির প্রস্তাবিত নাম', placeholder: 'কোম্পানির নাম', required: true },
      { name: 'natureOfBusiness', label: 'ব্যবসার ধরন', placeholder: 'যেমন: আইটি / ট্রেডিং' }
    ]
  },
  {
    id: 'vat-reg',
    title: 'VAT রেজিস্ট্রেশন',
    titleEn: 'VAT Registration',
    description: 'ভ্যাট নিবন্ধন ও ৯ ডিজিটের বিআইএন সনদ',
    icon: '🧾',
    color: 'bg-amber-600',
    category: 'trade',
    price: 400,
    inputLabel: 'TIN নাম্বার ও ব্যবসার নাম',
    inputPlaceholder: 'TIN নাম্বার / ব্যবসার নাম দিন',
    fields: [
      { name: 'tinNumber', label: '১২ সংখ্যার টিন নম্বর', placeholder: 'TIN নম্বর দিন', required: true },
      { name: 'businessName', label: 'ব্যবসার নাম', placeholder: 'নাম লিখুন', required: true }
    ]
  },

  // --- শিক্ষা সেবা ---
  {
    id: 'ssc-certificate',
    title: 'SSC সনদ',
    titleEn: 'SSC Certificate',
    description: 'SSC/দাখিল সনদের সত্যায়িত ডিজিটাল কপি',
    icon: '🎓',
    color: 'bg-purple-600',
    category: 'education',
    price: 200,
    inputLabel: 'রোল নাম্বার ও বোর্ড',
    inputPlaceholder: 'রোল নাম্বার / পাসের সাল / বোর্ড দিন',
    fields: [
      { name: 'rollNo', label: 'রোল নম্বর', placeholder: 'রোল দিন', required: true },
      { name: 'regNo', label: 'রেজিস্ট্রেশন নম্বর', placeholder: 'রেজি নম্বর' },
      { name: 'board', label: 'শিক্ষা বোর্ড', placeholder: 'যেমন: ঢাকা, কুমিল্লা, মাদ্রাসা', required: true },
      { name: 'year', label: 'পাসের সাল', placeholder: 'যেমন: ২০২৪', required: true }
    ]
  },
  {
    id: 'hsc-certificate',
    title: 'HSC সনদ',
    titleEn: 'HSC Certificate',
    description: 'HSC/আলিম সনদের সত্যায়িত ডিজিটাল কপি',
    icon: '📚',
    color: 'bg-purple-700',
    category: 'education',
    price: 200,
    inputLabel: 'রোল নাম্বার ও বোর্ড',
    inputPlaceholder: 'রোল নাম্বার / পাসের সাল / বোর্ড দিন',
    fields: [
      { name: 'rollNo', label: 'রোল নম্বর', placeholder: 'রোল দিন', required: true },
      { name: 'board', label: 'শিক্ষা বোর্ড', placeholder: 'বোর্ড দিন', required: true },
      { name: 'year', label: 'পাসের সাল', placeholder: 'পাসের সাল', required: true }
    ]
  },
  {
    id: 'marksheet',
    title: 'মার্কশিট',
    titleEn: 'Mark Sheet',
    description: 'SSC/HSC অফিসিয়াল মার্কশিটের কপি',
    icon: '📊',
    color: 'bg-violet-600',
    category: 'education',
    price: 150,
    popular: true,
    inputLabel: 'রোল নাম্বার ও পরীক্ষার নাম',
    inputPlaceholder: 'রোল নাম্বার / পাসের সাল / পরীক্ষার নাম',
    fields: [
      { name: 'examType', label: 'পরীক্ষা (SSC/HSC/JSC)', placeholder: 'পরীক্ষার নাম', required: true },
      { name: 'rollNo', label: 'রোল নম্বর', placeholder: 'রোল নম্বর দিন', required: true },
      { name: 'board', label: 'বোর্ড ও সাল', placeholder: 'যেমন: ঢাকা, ২০২৩', required: true }
    ]
  },

  // --- বিল পরিশোধ ---
  {
    id: 'electric-bill',
    title: 'বিদ্যুৎ বিল',
    titleEn: 'Electric Bill',
    description: 'পল্লী বিদ্যুৎ / ডেসকো / ডিপিডিসি বিল পেমেন্ট ও তথ্য',
    icon: '⚡',
    color: 'bg-yellow-500',
    category: 'bill',
    price: 20,
    popular: true,
    inputLabel: 'মিটার / একাউন্ট নাম্বার',
    inputPlaceholder: 'বিদ্যুৎ মিটার বা SMS একাউন্ট নাম্বার দিন',
    fields: [
      { name: 'biller', label: 'বিদ্যুৎ বিতরণ কোম্পানি', placeholder: 'BREB / DESCO / DPDC / NESCO / WZPDCL', required: true },
      { name: 'accountNo', label: 'মিটার বা এসএমএস একাউন্ট নম্বর', placeholder: 'নম্বর লিখুন', required: true }
    ]
  },
  {
    id: 'water-bill',
    title: 'পানি বিল',
    titleEn: 'Water Bill',
    description: 'ঢাকা/চট্টগ্রাম ওয়াসা পানি বিলের তথ্য ও পরিশোধ',
    icon: '💧',
    color: 'bg-blue-400',
    category: 'bill',
    price: 20,
    inputLabel: 'একাউন্ট নাম্বার',
    inputPlaceholder: 'ওয়াসা একাউন্ট নাম্বার দিন',
    fields: [
      { name: 'wasaAccount', label: 'ওয়াসা গ্রাহক নম্বর', placeholder: 'ওয়াসা একাউন্ট নম্বর', required: true }
    ]
  },
  {
    id: 'gas-bill',
    title: 'গ্যাস বিল',
    titleEn: 'Gas Bill',
    description: 'তিতাস/বাখরাবাদ/জালালাবাদ গ্যাস বিল পরিশোধ',
    icon: '🔥',
    color: 'bg-orange-500',
    category: 'bill',
    price: 20,
    inputLabel: 'গ্যাস একাউন্ট নাম্বার',
    inputPlaceholder: 'গ্যাস একাউন্ট নাম্বার দিন',
    fields: [
      { name: 'gasCustomerCode', label: 'গ্যাস গ্রাহক কোড', placeholder: 'গ্রাহক কোড নম্বর', required: true }
    ]
  },

  // --- অন্যান্য সেবা ---
  {
    id: 'make-cv',
    title: 'CV তৈরি',
    titleEn: 'Make CV',
    description: 'পেশাদার স্ট্যান্ডার্ড সিভি ও বায়োডাটা তৈরি করুন',
    icon: '📃',
    color: 'bg-violet-500',
    category: 'other',
    price: 50,
    popular: true,
    inputLabel: 'নাম ও তথ্য',
    inputPlaceholder: 'আপনার নাম / পেশা / যোগাযোগ নাম্বার দিন',
    fields: [
      { name: 'fullName', label: 'পূর্ণ নাম', placeholder: 'নাম লিখুন', required: true },
      { name: 'profession', label: 'পেশা / শিক্ষাগত যোগ্যতা', placeholder: 'বিবরণ লিখুন', required: true }
    ]
  },
  {
    id: 'voter-list',
    title: 'ভোটার লিস্ট',
    titleEn: 'Voter List',
    description: 'এলাকাভিত্তিক ভোটার তালিকা ডাউনলোড ও যাচাই',
    icon: '🗳️',
    color: 'bg-emerald-600',
    category: 'other',
    price: 30,
    inputLabel: 'এলাকার নাম ও ঠিকানা',
    inputPlaceholder: 'ইউনিয়ন / ওয়ার্ড / উপজেলা দিন',
    fields: [
      { name: 'areaDetails', label: 'ইউনিয়ন / ওয়ার্ড ও উপজেলা', placeholder: 'বিস্তারিত দিন', required: true }
    ]
  },
  {
    id: 'marriage-cert',
    title: 'বিবাহ সনদ',
    titleEn: 'Marriage Certificate',
    description: 'কাবিননামা ও বিবাহ নিবন্ধন সার্টিফিকেট সংগ্রহ',
    icon: '💍',
    color: 'bg-rose-500',
    category: 'other',
    price: 300,
    inputLabel: 'নাম ও বিবাহের তারিখ',
    inputPlaceholder: 'বর/কনের নাম / বিবাহের তারিখ দিন',
    fields: [
      { name: 'groomName', label: 'বরের নাম', placeholder: 'বরের নাম', required: true },
      { name: 'brideName', label: 'কনের নাম', placeholder: 'কনের নাম', required: true },
      { name: 'marriageDate', label: 'বিবাহের তারিখ', placeholder: 'DD/MM/YYYY' }
    ]
  }
];

import { TIER_DISCOUNTS } from './tierPlans';

export const tierPricingDiscount: Record<string, number> = TIER_DISCOUNTS;
