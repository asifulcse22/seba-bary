import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { WalletCard } from './components/WalletCard';
import { TierCardsSection } from './components/TierCardsSection';
import { CategoryGrid } from './components/CategoryGrid';
import { ServicesList } from './components/ServicesList';
import { WalletHubView } from './components/WalletHubView';
import { OrderTrackingView } from './components/OrderTrackingView';
import { SettingsProfileView } from './components/SettingsProfileView';
import { ServiceOrderModal } from './components/ServiceOrderModal';
import { TierDetailModal } from './components/TierDetailModal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { Service, AccountTier } from './types';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const MainApp: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    selectedCategory, 
    setSelectedCategory,
    selectedServiceForOrder,
    setSelectedServiceForOrder,
    toastMessage,
    authModalState,
    closeAuthModal
  } = useApp();

  const [tierModalOpen, setTierModalOpen] = useState(false);
  const [selectedTierForModal, setSelectedTierForModal] = useState<AccountTier>('business');

  const handleOpenTierModal = (tier: AccountTier = 'business') => {
    setSelectedTierForModal(tier);
    setTierModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f0fdf4] text-slate-800 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* Sticky Header matching Image 1 and Image 2 */}
      <Header onOpenTierModal={handleOpenTierModal} />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900 text-white text-xs sm:text-sm font-semibold shadow-2xl border border-emerald-500/30">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 space-y-6">
        
        {/* View 1: Main Dashboard (Matching Image 1) */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Hero Welcome Banner */}
            <HeroBanner variant="home" />

            {/* Current Wallet Balance Card */}
            <WalletCard onOpenRecharge={() => setActiveTab('wallet_hub')} />

            {/* Account Tier Choice ("কোন অ্যাকাউন্টটি আপনার জন্য? 🤔") */}
            <TierCardsSection onOpenDetails={handleOpenTierModal} />

            {/* Service Categories Grid ("সেবার বিভাগসমূহ") */}
            <CategoryGrid onSelectCategory={(catId) => setSelectedCategory(catId)} />

            {/* Featured & Filtered Services Catalog */}
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-1 border-b border-emerald-200/60">
                <h3 className="font-black text-base sm:text-lg text-slate-800 flex items-center gap-2">
                  <span>জনপ্রিয় ও জরুরি ডিজিটাল সেবাসমূহ</span>
                </h3>
                <span className="text-xs text-emerald-600 font-bold">
                  {selectedCategory === 'all' ? 'সকল সেবা' : selectedCategory}
                </span>
              </div>
              <ServicesList onSelectService={(svc) => setSelectedServiceForOrder(svc)} />
            </div>

            {/* Trust Footer Strip */}
            <Footer />
          </div>
        )}

        {/* View 2: Wallet & Finance Hub (Matching Image 2 in exact detail) */}
        {activeTab === 'wallet_hub' && (
          <div className="space-y-6">
            <WalletHubView />
            <Footer />
          </div>
        )}

        {/* View 3: Order Tracking & Digital Slips */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <OrderTrackingView />
            <Footer />
          </div>
        )}

        {/* View 4: Full Services Catalog */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <ServicesList onSelectService={(svc) => setSelectedServiceForOrder(svc)} />
            <Footer />
          </div>
        )}

        {/* View 5: Settings & Profile */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <SettingsProfileView onOpenTierModal={handleOpenTierModal} />
            <Footer />
          </div>
        )}

      </main>

      {/* Service Application Order Modal */}
      {selectedServiceForOrder && (
        <ServiceOrderModal
          service={selectedServiceForOrder}
          onClose={() => setSelectedServiceForOrder(null)}
          onOrderSuccess={() => {}}
        />
      )}

      {/* Tier Details & Upgrade Modal */}
      {tierModalOpen && (
        <TierDetailModal
          initialTier={selectedTierForModal}
          onClose={() => setTierModalOpen(false)}
        />
      )}

      {/* Login & Registration Modal (Neon DB Synced) */}
      <AuthModal
        isOpen={authModalState.isOpen}
        onClose={closeAuthModal}
        initialMode={authModalState.mode}
      />

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
