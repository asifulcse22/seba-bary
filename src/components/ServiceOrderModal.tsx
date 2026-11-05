import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Service, ServiceOrder } from '../types';
import { 
  X, 
  CheckCircle2, 
  Wallet, 
  Printer, 
  ArrowRight, 
  Clock, 
  Sparkles, 
  Download, 
  FileCheck,
  ShieldCheck,
  Building,
  UserCheck
} from 'lucide-react';

interface ServiceOrderModalProps {
  service: Service;
  onClose: () => void;
  onOrderSuccess: (order: ServiceOrder) => void;
}

export const ServiceOrderModal: React.FC<ServiceOrderModalProps> = ({
  service,
  onClose,
  onOrderSuccess,
}) => {
  const { user, placeOrder, getDiscountedPrice, setActiveTab } = useApp();

  const [formData, setFormData] = useState<Record<string, string>>({});
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerRetailCharge, setCustomerRetailCharge] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<ServiceOrder | null>(null);

  const finalPrice = getDiscountedPrice(service.price);
  const hasSufficientBalance = (user?.walletBalance ?? 0) >= finalPrice;

  // Potential profit for business/sub admin
  const retailChargeNum = parseFloat(customerRetailCharge);
  const profitMargin = !isNaN(retailChargeNum) && retailChargeNum > finalPrice ? retailChargeNum - finalPrice : 0;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasSufficientBalance) return;

    setIsSubmitting(true);
    try {
      const result = await placeOrder(
        service,
        formData,
        customerName.trim() || undefined,
        customerPhone.trim() || undefined
      );

      if (result.success && result.order) {
        setCompletedOrder(result.order);
        onOrderSuccess(result.order);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-xl backdrop-blur-xs">
              {service.icon}
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black leading-tight">
                {service.title}
              </h2>
              <p className="text-xs text-emerald-100 mt-0.5">
                অফিসিয়াল সার্ভিস আবেদন ও যাচাই ফরম
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-4">
          
          {completedOrder ? (
            /* Order Success View */
            <div className="space-y-4 text-center py-2 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center text-3xl">
                ✓
              </div>

              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                  আবেদন সফল হয়েছে
                </span>
                <h3 className="text-lg sm:text-xl font-black text-slate-800 mt-2">
                  টোকেন নম্বর: {completedOrder.tokenNumber}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  আপনার {service.title} আবেদনটি অফিসিয়াল সার্ভারে প্রসেস করা হচ্ছে।
                </p>
              </div>

              {/* Digital Slip preview box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2 font-mono">
                <div className="flex justify-between border-b pb-1.5 border-slate-200">
                  <span className="text-slate-500">সার্ভিস:</span>
                  <span className="font-bold text-slate-800">{completedOrder.serviceTitle}</span>
                </div>
                <div className="flex justify-between border-b pb-1.5 border-slate-200">
                  <span className="text-slate-500">আবেদনকারী:</span>
                  <span className="font-bold text-slate-800">{completedOrder.customerName || user?.name || 'গ্রাহক'}</span>
                </div>
                <div className="flex justify-between border-b pb-1.5 border-slate-200">
                  <span className="text-slate-500">কর্তনকৃত ফি:</span>
                  <span className="font-bold text-emerald-600">৳{completedOrder.paidAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">স্ট্যাটাস:</span>
                  <span className="font-bold text-amber-600">যাচাইকরণ চলমান (Processing)</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    setActiveTab('orders');
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Clock className="w-4 h-4" />
                  <span>অর্ডার ট্র্যাকিং এ যান</span>
                </button>
                <button
                  onClick={() => {
                    setCompletedOrder(null);
                    setFormData({});
                  }}
                  className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  আরেকটি আবেদন
                </button>
              </div>
            </div>
          ) : (
            /* Order Input Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Fee and Wallet Status Banner */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] font-bold text-slate-500">সার্ভিস ফি (অফিসিয়াল)</span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-xl font-black text-emerald-700">৳{finalPrice}</span>
                    {service.price > finalPrice && (
                      <span className="text-xs text-slate-400 line-through">৳{service.price}</span>
                    )}
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-1.5 py-0.2 rounded-md ml-1">
                      {user?.activeTier === 'personal' ? 'Regular' : user?.activeTier === 'business' ? '১৫% ডিসকাউন্ট' : '৩৫% ডিসকাউন্ট'}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-bold text-slate-500">আপনার ওয়ালেট</span>
                  <div className={`text-base font-black ${hasSufficientBalance ? 'text-slate-800' : 'text-red-600'}`}>
                    ৳{(user?.walletBalance ?? 0).toLocaleString('bn-BD')}
                  </div>
                </div>
              </div>

              {!hasSufficientBalance && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center justify-between">
                  <span>আপনার ওয়ালেটে পর্যাপ্ত ব্যালেন্স নেই। রিচার্জ করুন।</span>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      setActiveTab('wallet_hub');
                    }}
                    className="font-bold underline text-red-800 cursor-pointer"
                  >
                    রিচার্জ করুন &gt;
                  </button>
                </div>
              )}

              {/* Business / Sub-admin customer details field */}
              {(user?.activeTier === 'business' || user?.activeTier === 'sub_admin') && (
                <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-amber-600" />
                      কাস্টমারের তথ্য (উদ্যোক্তা / এজেন্ট সুবিধা)
                    </span>
                    <span className="text-[10px] text-amber-700 font-semibold">ঐচ্ছিক</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <input
                        type="text"
                        placeholder="কাস্টমারের পূর্ণ নাম"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-amber-200 text-xs font-medium focus:ring-1 focus:ring-amber-400 outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="কাস্টমারের মোবাইল নম্বর"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-amber-200 text-xs font-medium focus:ring-1 focus:ring-amber-400 outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="number"
                      placeholder="কাস্টমার থেকে কত ফি নিচ্ছেন? (৳)"
                      value={customerRetailCharge}
                      onChange={(e) => setCustomerRetailCharge(e.target.value)}
                      className="w-48 px-3 py-1.5 rounded-xl bg-white border border-amber-200 text-xs font-medium focus:ring-1 focus:ring-amber-400 outline-none"
                    />
                    {profitMargin > 0 && (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-lg">
                        আপনার নিট লাভ: +৳{profitMargin}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Dynamic Service Inputs matching official requirements */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">
                    আবেদনের প্রয়োজনীয় তথ্যসমূহ
                  </label>
                  <span className="text-[11px] text-emerald-600 font-semibold">
                    {service.category === 'nid' ? 'NID জাতীয় ডাটাবেজ' : service.category === 'land' ? 'ভূমি মন্ত্রণালয়' : 'অফিসিয়াল'}
                  </span>
                </div>

                {service.fields && service.fields.length > 0 ? (
                  service.fields.map((field) => (
                    <div key={field.name}>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </label>
                      <input
                        type={field.type || 'text'}
                        required={field.required}
                        placeholder={field.placeholder}
                        value={formData[field.name] || ''}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none text-xs sm:text-sm font-medium transition-all"
                      />
                    </div>
                  ))
                ) : (
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      {service.inputLabel} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={service.inputPlaceholder}
                      value={formData['primaryInput'] || ''}
                      onChange={(e) => handleInputChange('primaryInput', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none text-xs sm:text-sm font-medium transition-all"
                    />
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl text-slate-600 font-bold text-xs sm:text-sm hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  বাতিল
                </button>

                <button
                  type="submit"
                  disabled={!hasSufficientBalance || isSubmitting}
                  className={`px-6 py-3 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all duration-300 group cursor-pointer ${
                    hasSufficientBalance
                      ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:via-teal-500 hover:to-cyan-600 text-white shadow-emerald-500/25 hover:shadow-lg hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0'
                      : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <span>অর্ডার প্রসেস হচ্ছে...</span>
                  ) : (
                    <>
                      <span>৳{finalPrice} দিয়ে অর্ডার নিশ্চিত করুন</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
