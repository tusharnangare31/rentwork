'use client';

import React, { useState } from 'react';
import { Navbar } from '../../components/layout/navbar.tsx';
import { Footer } from '../../components/layout/footer.tsx';
import { Hero } from '../../components/marketing/Hero.tsx';
import { CategoriesSection } from '../../components/marketing/CategoriesSection.tsx';
import { HowItWorksSection } from '../../components/marketing/HowItWorksSection.tsx';
import { BusinessBenefitsSection } from '../../components/marketing/BusinessBenefitsSection.tsx';
import { CTASection } from '../../components/marketing/CTASection.tsx';
import { AuthModal } from '../../components/shared/AuthModal.tsx';

export default function MarketingHomePage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'register'>('signin');
  const [activeNotification, setActiveNotification] = useState<string | null>(null);

  const handleOpenAuth = (mode: 'signin' | 'register') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const handleSearchSubmit = (query: string) => {
    if (!query.trim()) return;
    setActiveNotification(`Filter applied: searching inventory catalog for "${query}"...`);
    setTimeout(() => setActiveNotification(null), 4000);

    const categoriesSection = document.getElementById('categories');
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (categoryId: string) => {
    setActiveNotification(`Selected Category filter: "${categoryId.toUpperCase()}".`);
    setTimeout(() => setActiveNotification(null), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-teal-100 selection:text-teal-900">
      {/* Toast Notification */}
      {activeNotification && (
        <div className="fixed bottom-5 right-5 z-50 rounded-xl bg-slate-900 text-white px-4 py-3 shadow-xl text-xs font-medium flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
          {activeNotification}
        </div>
      )}

      {/* Primary Sticky Navigation */}
      <Navbar
        onSignInClick={() => handleOpenAuth('signin')}
        onGetStartedClick={() => handleOpenAuth('register')}
      />

      {/* Main Marketing Sections */}
      <main className="flex-1">
        <Hero
          onSearchSubmit={handleSearchSubmit}
          onExploreClick={() => {
            const el = document.getElementById('categories');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <CategoriesSection onSelectCategory={handleSelectCategory} />

        <HowItWorksSection />

        <BusinessBenefitsSection />

        <CTASection
          onGetStarted={() => handleOpenAuth('register')}
          onContactSales={() => {
            setActiveNotification('Sales inquiry desk: Connecting you to enterprise accounts.');
            setTimeout(() => setActiveNotification(null), 3500);
          }}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Authentication & Onboarding Modal */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authModalMode}
        onClose={() => setAuthModalOpen(false)}
      />
    </div>
  );
}
