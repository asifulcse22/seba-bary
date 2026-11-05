import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ServiceOrder } from '../types';
import { 
  Clock, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Printer, 
  Download, 
  ChevronRight, 
  X,
  ExternalLink,
  ShieldCheck,
  Building2
} from 'lucide-react';

export const OrderTrackingView: React.FC = () => {
  const { orders, setActiveTab, setSelectedCategory } = useApp();
  const [searchToken, setSearchToken] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'processing' | 'completed'>('all');
  const [selectedOrderForSlip, setSelectedOrderForSlip] = useState<ServiceOrder | null>(null);

  const filteredOrders = orders.filter(ord => {
    if (filterStatus !== 'all' && ord.status !== filterStatus) return false;
    if (searchToken.trim()) {
      const q = searchToken.toLowerCase();
      const matchToken = ord.tokenNumber.toLowerCase().includes(q);
      const matchTitle = ord.serviceTitle.toLowerCase().includes(q);
      const matchCust = ord.customerName?.toLowerCase().includes(q);
      if (!matchToken && !matchTitle && !matchCust) return false;
    }
    return true;
  });

  const handlePrintSlip = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Header and Search Strip */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-emerald-100 shadow-md space-y-4">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-xl">
              🕒
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-800">
                অর্ডার ট্র্যাকিং ও ডেলিভারি
              </h2>
              <p className="text-xs text-slate-500">
                আপনার আবেদনের বর্তমান অগ্রগতি ও ডিজিটাল স্লিপ সংগ্রহ করুন
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                filterStatus === 'all'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              সকল ({orders.length})
            </button>
            <button
              onClick={() => setFilterStatus('processing')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                filterStatus === 'processing'
                  ? 'bg-amber-500 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              প্রক্রিয়াধীন ({orders.filter(o => o.status === 'processing' || o.status === 'pending').length})
            </button>
            <button
              onClick={() => setFilterStatus('completed')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                filterStatus === 'completed'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              সম্পন্ন ({orders.filter(o => o.status === 'completed').length})
            </button>
          </div>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchToken}
            onChange={(e) => setSearchToken(e.target.value)}
            placeholder="টোকেন নম্বর (যেমন: SHB-NID-88291) বা সার্ভিস নাম দিয়ে খুঁজুন..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none text-xs sm:text-sm font-medium transition-all"
          />
        </div>

      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 space-y-3">
            <div className="text-4xl">📂</div>
            <h3 className="font-bold text-slate-700">কোনো অর্ডার পাওয়া যায়নি</h3>
            <p className="text-xs text-slate-500">
              আপনি এখনো কোনো আবেদন করেননি অথবা আপনার সার্চ ফলাফলে কোনো মিল নেই।
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setActiveTab('services');
              }}
              className="px-4 py-2 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-md hover:bg-emerald-700 transition-colors cursor-pointer"
            >
              নতুন সেবা আবেদন করুন
            </button>
          </div>
        ) : (
          filteredOrders.map((ord) => {
            const isCompleted = ord.status === 'completed';

            return (
              <div
                key={ord.id}
                className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Left info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-mono font-bold border border-slate-200">
                      {ord.tokenNumber}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 ${
                      isCompleted
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300 animate-pulse'
                    }`}>
                      {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                      {isCompleted ? 'সম্পন্ন (Ready)' : 'যাচাই ও প্রসেসিং চলমান'}
                    </span>
                    <span className="text-xs text-slate-400">
                      তারিখ: {ord.createdAt}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-800">
                      {ord.serviceTitle}
                    </h3>
                    {ord.customerName && (
                      <p className="text-xs text-slate-600 mt-0.5">
                        গ্রাহক: <span className="font-semibold">{ord.customerName}</span> ({ord.customerPhone || 'মোবাইল সংযুক্ত'})
                      </p>
                    )}
                    {ord.remarks && (
                      <p className="text-xs text-emerald-700 font-medium mt-1 bg-emerald-50/70 px-2 py-1 rounded-lg w-fit">
                        {ord.remarks}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-3 self-end md:self-center shrink-0">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">
                      পরিশোধিত ফি
                    </span>
                    <span className="text-base font-black text-slate-800">
                      ৳{ord.paidAmount}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedOrderForSlip(ord)}
                    className="px-4 py-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>অফিসিয়াল স্লিপ</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Slip / Document Modal */}
      {selectedOrderForSlip && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
            
            {/* Slip Header */}
            <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">
                  S
                </div>
                <div>
                  <h3 className="font-black text-sm">Smart Hub BD ডিজিটাল স্লিপ</h3>
                  <p className="text-[10px] text-emerald-200">গণপ্রজাতন্ত্রী বাংলাদেশ অনুমোদিত ডিজিটাল সেবা</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedOrderForSlip(null)}
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Printable Slip Content */}
            <div id="printable-slip" className="p-5 sm:p-6 space-y-4 text-xs font-sans">
              
              {/* Official Seal and Header */}
              <div className="text-center pb-3 border-b-2 border-dashed border-slate-200 space-y-1">
                <div className="inline-block p-2 rounded-full bg-emerald-50 border border-emerald-200 mb-1">
                  <ShieldCheck className="w-8 h-8 text-emerald-600 mx-auto" />
                </div>
                <h2 className="text-base font-extrabold text-slate-800 uppercase">
                  স্মার্ট হাব ডিজিটাল রিসিপ্ট
                </h2>
                <p className="text-slate-500 text-[11px]">
                  Government & Digital e-Services Acknowledgement Token
                </p>
                <div className="mt-2 inline-block px-3 py-1 rounded-full bg-slate-100 font-mono font-bold text-slate-800 text-sm">
                  {selectedOrderForSlip.tokenNumber}
                </div>
              </div>

              {/* Data Table */}
              <div className="space-y-2">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">সেবার নাম:</span>
                  <span className="font-bold text-slate-800">{selectedOrderForSlip.serviceTitle}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">গ্রাহকের নাম:</span>
                  <span className="font-bold text-slate-800">{selectedOrderForSlip.customerName || 'স্বত্বাধিকারী'}</span>
                </div>
                {selectedOrderForSlip.customerPhone && (
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">মোবাইল:</span>
                    <span className="font-bold text-slate-800">{selectedOrderForSlip.customerPhone}</span>
                  </div>
                )}
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">আবেদন তারিখ ও সময়:</span>
                  <span className="font-bold text-slate-800">{selectedOrderForSlip.createdAt}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">পরিশোধিত সরকারি/সার্ভিস ফি:</span>
                  <span className="font-bold text-emerald-600">৳{selectedOrderForSlip.paidAmount} (PAID)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">বর্তমান স্ট্যাটাস:</span>
                  <span className="font-bold text-emerald-700">
                    {selectedOrderForSlip.status === 'completed' ? 'সার্ভিস প্রদান সম্পন্ন' : 'যাচাইকরণ চলমান'}
                  </span>
                </div>

                {/* Additional inputs summary */}
                <div className="mt-3 pt-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-600 block mb-1">আবেদনে প্রদত্ত তথ্য:</span>
                  <div className="space-y-1 text-[11px] text-slate-600 font-mono">
                    {Object.entries(selectedOrderForSlip.inputData).map(([k, v]) => (
                      <div key={k} className="flex justify-between">
                        <span className="text-slate-400 capitalize">{k}:</span>
                        <span className="font-medium text-slate-800">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* QR / Verification Note */}
              <div className="text-center pt-2 text-[10px] text-slate-400">
                <p>এটি একটি ডিজিটালভাবে তৈরিকৃত রশিদ, এতে কোনো স্বাক্ষরের প্রয়োজন নেই।</p>
                <p className="mt-0.5">যেকোনো সহায়তায় হেল্পলাইন: 01712-345678</p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={handlePrintSlip}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>প্রিন্ট / PDF সেভ করুন</span>
                </button>
                <button
                  onClick={() => setSelectedOrderForSlip(null)}
                  className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  বন্ধ করুন
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
