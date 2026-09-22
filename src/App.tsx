/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from '../lib/auth/auth-context.tsx';
import { RentWorkNavbar } from '../components/layout/RentWorkNavbar.tsx';
import { RentWorkFooter } from '../components/layout/RentWorkFooter.tsx';
import { HeroSection } from '../components/marketing/rentwork/HeroSection.tsx';
import { CategoryGrid } from '../components/marketing/rentwork/CategoryGrid.tsx';
import { HowItWorksSection } from '../components/marketing/rentwork/HowItWorksSection.tsx';
import { SmarterWaySection } from '../components/marketing/rentwork/SmarterWaySection.tsx';
import { ReadyToRentBanner } from '../components/marketing/rentwork/ReadyToRentBanner.tsx';
import {
  ProductCatalogSection,
  type OfficeProduct,
} from '../components/marketing/officefurnrent/ProductCatalogSection.tsx';
import { InstantQuoteCalculator } from '../components/marketing/officefurnrent/InstantQuoteCalculator.tsx';
import { CoverageAreasSection } from '../components/marketing/officefurnrent/CoverageAreasSection.tsx';
import { ContactSection } from '../components/marketing/officefurnrent/ContactSection.tsx';
import { QuoteModal } from '../components/marketing/officefurnrent/QuoteModal.tsx';
import { RentalOrderModal } from '../components/order/RentalOrderModal.tsx';
import { PaymentGatewayModal } from '../components/payment/PaymentGatewayModal.tsx';
import { OrdersDashboardModal } from '../components/order/OrdersDashboardModal.tsx';
import { SignInView } from '../components/auth/SignInView.tsx';
import { SignUpView } from '../components/auth/SignUpView.tsx';
import { CustomerDashboardView } from '../components/dashboard/CustomerDashboardView.tsx';
import {
  getStoredOrders,
  type PlacedRentalOrder,
  type OrderDeliveryAddress,
} from '../lib/orders/order-store.ts';

type AppView = 'home' | 'signin' | 'signup' | 'dashboard';

function MarketplaceApp() {
  const { user, isAuthenticated } = useAuth();

  // Navigation view state matching image.png (Home / Sign In / Sign Up / Dashboard)
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Modals state
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [ordersModalOpen, setOrdersModalOpen] = useState(false);
  const [rentalOrderModalOpen, setRentalOrderModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  // Selected state
  const [selectedProductForQuote, setSelectedProductForQuote] = useState<string | undefined>(undefined);
  const [selectedProductForOrder, setSelectedProductForOrder] = useState<OfficeProduct | null>(null);
  const [pendingPaymentData, setPendingPaymentData] = useState<{
    product: OfficeProduct;
    quantity: number;
    durationMonths: number;
    startDate: string;
    endDate: string;
    pricing: {
      baseSubtotal: number;
      discountPercent: number;
      discountAmount: number;
      deliveryFee: number;
      tax: number;
      securityDeposit: number;
      totalAmount: number;
    };
    deliveryAddress: OrderDeliveryAddress;
  } | null>(null);

  const [calculatorQuoteData, setCalculatorQuoteData] = useState<
    | {
        chairs?: number;
        workstations?: number;
        cabins?: number;
        storage?: number;
        durationMonths?: number;
        monthlyTotal?: number;
      }
    | undefined
  >(undefined);

  const [orderCount, setOrderCount] = useState<number>(0);
  const [activeToast, setActiveToast] = useState<string | null>(null);

  // Load orders count
  useEffect(() => {
    const orders = getStoredOrders();
    setOrderCount(orders.length);
  }, []);

  const showToast = (message: string) => {
    setActiveToast(message);
    setTimeout(() => setActiveToast(null), 4500);
  };

  const handleOpenQuote = (productName?: string) => {
    setSelectedProductForQuote(productName);
    setCalculatorQuoteData(undefined);
    setQuoteModalOpen(true);
  };

  const handleCalculatorProceedQuote = (details: {
    chairs: number;
    workstations: number;
    cabins: number;
    storage: number;
    durationMonths: number;
    monthlyTotal: number;
  }) => {
    setCalculatorQuoteData(details);
    setSelectedProductForQuote(
      `Turnkey Workspace (${details.workstations} Workstations, ${details.chairs} Chairs, ${details.cabins} Cabins)`
    );
    setQuoteModalOpen(true);
  };

  // Direct "Rent Now" on any product
  const handleRentProduct = (product: OfficeProduct) => {
    setSelectedProductForOrder(product);
    setRentalOrderModalOpen(true);
  };

  // Direct "Order Configured Setup" from calculator
  const handleDirectCalculatorOrder = (details: {
    chairs: number;
    workstations: number;
    cabins: number;
    storage: number;
    durationMonths: number;
    monthlyTotal: number;
    totalRentForTenure: number;
  }) => {
    const syntheticProduct: OfficeProduct = {
      id: `turnkey_pkg_${Date.now()}`,
      name: `Turnkey Office Setup (${details.workstations} Workstations, ${details.chairs} Ergonomic Chairs, ${details.cabins} Executive Cabins)`,
      category: 'workstations',
      categoryLabel: 'Turnkey Workspace Package',
      tagline: 'Complete Turnkey Commercial Workspace Package',
      description: `Complete turnkey commercial furniture fleet for ${details.workstations} workstations, ${details.chairs} ergonomic task chairs, ${details.cabins} executive desks, and ${details.storage} mobile storage pedestals.`,
      rentalPriceMonthly: Math.round(details.monthlyTotal / 1.18),
      securityDeposit: 5000,
      minDuration: `${details.durationMonths} Months`,
      condition: 'Mint / Pristine Commercial',
      dimensions: 'Custom 2D layout planning included',
      features: [
        `${details.workstations} Linear Desks with wire raceways`,
        `${details.chairs} High-mesh breathable task chairs`,
        `${details.cabins} Executive glass/veneer director tables`,
        `${details.storage} Three-drawer lockable pedestals`,
        'Includes free assembly, cabling & layout management',
      ],
      imageUrl:
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
    };

    setSelectedProductForOrder(syntheticProduct);
    setRentalOrderModalOpen(true);
  };

  // Proceeding from configuration to payment
  const handleProceedToPayment = (payload: {
    product: OfficeProduct;
    quantity: number;
    durationMonths: number;
    startDate: string;
    endDate: string;
    pricing: {
      baseSubtotal: number;
      discountPercent: number;
      discountAmount: number;
      deliveryFee: number;
      tax: number;
      securityDeposit: number;
      totalAmount: number;
    };
    deliveryAddress: OrderDeliveryAddress;
  }) => {
    setPendingPaymentData(payload);
    setRentalOrderModalOpen(false);
    setPaymentModalOpen(true);
  };

  // Payment completed
  const handlePaymentSuccess = (newOrder: PlacedRentalOrder) => {
    setOrderCount((prev) => prev + 1);
    setPaymentModalOpen(false);
    showToast(`Order ${newOrder.orderNumber} successfully confirmed & paid! Tax invoice generated.`);
    setCurrentView('dashboard');
  };

  const handleNavTo = (sectionId: string) => {
    if (sectionId === 'home') {
      setCurrentView('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // VIEW 1: SIGN IN VIEW (Top-Middle of image.png)
  if (currentView === 'signin') {
    return (
      <SignInView
        onBackToHome={() => setCurrentView('home')}
        onSwitchToSignUp={() => setCurrentView('signup')}
        onSuccess={() => {
          showToast('Welcome back! Signed in to your corporate workspace.');
          setCurrentView('dashboard');
        }}
      />
    );
  }

  // VIEW 2: SIGN UP VIEW (Top-Right of image.png)
  if (currentView === 'signup') {
    return (
      <SignUpView
        onBackToHome={() => setCurrentView('home')}
        onSwitchToSignIn={() => setCurrentView('signin')}
        onSuccess={() => {
          showToast('Account created! Welcome to RentWork.');
          setCurrentView('dashboard');
        }}
      />
    );
  }

  // VIEW 3: CUSTOMER DASHBOARD VIEW (Bottom-Middle of image.png)
  if (currentView === 'dashboard') {
    return (
      <CustomerDashboardView
        onBackToMarketplace={() => setCurrentView('home')}
        onOpenProduct={(name) => handleOpenQuote(name)}
      />
    );
  }

  // VIEW 4: MAIN MARKETPLACE HOME VIEW (Left Column of image.png)
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Toast Notification */}
      {activeToast && (
        <div className="fixed bottom-5 right-5 z-50 rounded-xl bg-slate-900 text-white px-4 py-3 shadow-xl text-xs font-medium flex items-center gap-2.5 animate-in fade-in border border-slate-700">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
          {activeToast}
        </div>
      )}

      {/* 1. Header / Navbar matching image.png */}
      <RentWorkNavbar
        onNavigate={handleNavTo}
        onSignInClick={() => setCurrentView('signin')}
        onGetStartedClick={() => setCurrentView('signup')}
        onDashboardClick={() => setCurrentView('dashboard')}
        activeView={currentView}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 2. Hero Section matching image.png */}
        <HeroSection
          onSearch={(q) => {
            handleNavTo('products');
          }}
          onExplore={() => handleNavTo('products')}
        />

        {/* 3. Browse by Category (6 cards) matching image.png */}
        <CategoryGrid
          selectedCategory={selectedCategory}
          onSelectCategory={(catId) => {
            setSelectedCategory(catId);
            handleNavTo('products');
          }}
        />

        {/* 4. Product Catalog with real Rent Now & Quote actions */}
        <ProductCatalogSection
          initialCategory={selectedCategory}
          onSelectProductForQuote={(productName) => handleOpenQuote(productName)}
          onRentProduct={handleRentProduct}
        />

        {/* 5. How It Works (4 Steps) matching image.png */}
        <HowItWorksSection />

        {/* 6. A Smarter Way to Equip Your Business (4 benefits) matching image.png */}
        <SmarterWaySection />

        {/* 7. Instant Cost Estimator for Pune Commercial Offices */}
        <InstantQuoteCalculator
          onProceedToQuote={handleCalculatorProceedQuote}
          onDirectOrder={handleDirectCalculatorOrder}
        />

        {/* 8. Ready to rent? Callout Banner matching image.png */}
        <ReadyToRentBanner onGetStarted={() => setCurrentView('signup')} />

        {/* 9. Pune Commercial Coverage Areas */}
        <CoverageAreasSection />

        {/* 10. Contact Section */}
        <ContactSection />
      </main>

      {/* 11. Footer matching image.png */}
      <RentWorkFooter
        onNavigate={handleNavTo}
        onOpenTerms={() => showToast('Terms of Service: Standard B2B leasing contract agreement.')}
        onOpenPrivacy={() => showToast('Privacy Policy: 256-bit encrypted data protection.')}
      />

      {/* 12. Quote Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        prefilledProduct={selectedProductForQuote}
        initialData={calculatorQuoteData}
      />

      {/* 13. Commercial Rental Order Configuration Modal */}
      <RentalOrderModal
        isOpen={rentalOrderModalOpen}
        onClose={() => setRentalOrderModalOpen(false)}
        product={selectedProductForOrder}
        onProceedToPayment={handleProceedToPayment}
      />

      {/* 14. B2B Payment Gateway Modal (UPI, NetBanking, Card, NEFT) */}
      <PaymentGatewayModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        orderData={pendingPaymentData}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* 15. Orders Dashboard Modal fallback */}
      <OrdersDashboardModal
        isOpen={ordersModalOpen}
        onClose={() => setOrdersModalOpen(false)}
        onRentMoreClick={() => handleNavTo('products')}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MarketplaceApp />
    </AuthProvider>
  );
}
