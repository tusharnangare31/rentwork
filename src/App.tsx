/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from '../lib/auth/auth-context.tsx';
import { TopContactBar } from '../components/layout/top-contact-bar.tsx';
import { Navbar } from '../components/layout/navbar.tsx';
import { Footer } from '../components/layout/footer.tsx';
import { HeroSlider } from '../components/marketing/officefurnrent/HeroSlider.tsx';
import { AboutSection } from '../components/marketing/officefurnrent/AboutSection.tsx';
import {
  ProductCatalogSection,
  type OfficeProduct,
} from '../components/marketing/officefurnrent/ProductCatalogSection.tsx';
import { RentVsBuySection } from '../components/marketing/officefurnrent/RentVsBuySection.tsx';
import { InstantQuoteCalculator } from '../components/marketing/officefurnrent/InstantQuoteCalculator.tsx';
import { CoverageAreasSection } from '../components/marketing/officefurnrent/CoverageAreasSection.tsx';
import { ContactSection } from '../components/marketing/officefurnrent/ContactSection.tsx';
import { QuoteModal } from '../components/marketing/officefurnrent/QuoteModal.tsx';
import { AuthModal } from '../components/shared/AuthModal.tsx';
import { RentalOrderModal } from '../components/order/RentalOrderModal.tsx';
import { PaymentGatewayModal } from '../components/payment/PaymentGatewayModal.tsx';
import { OrdersDashboardModal } from '../components/order/OrdersDashboardModal.tsx';
import {
  getStoredOrders,
  type PlacedRentalOrder,
  type OrderDeliveryAddress,
} from '../lib/orders/order-store.ts';

function MarketplaceApp() {
  const { user, isAuthenticated } = useAuth();

  // Modals state
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
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
    setOrdersModalOpen(true);
  };

  const handleExploreCategory = (category?: string) => {
    const section = document.getElementById('products');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-amber-100 selection:text-amber-900">
      {/* Toast popup */}
      {activeToast && (
        <div className="fixed bottom-5 right-5 z-50 rounded-xl bg-slate-900 text-white px-4 py-3 shadow-xl text-xs font-medium flex items-center gap-2.5 animate-in fade-in border border-slate-700">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          {activeToast}
        </div>
      )}

      {/* 1. Top Contact Bar */}
      <TopContactBar />

      {/* 2. Main Sticky Navigation with real Auth & Orders trigger */}
      <Navbar
        onNavigate={handleNavTo}
        onGetQuoteClick={() => handleOpenQuote()}
        onContactClick={() => handleNavTo('contact-us')}
        onSignInClick={() => setAuthModalOpen(true)}
        onOrdersClick={() => setOrdersModalOpen(true)}
        orderCount={orderCount}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 3. Hero Slider Banner matching officefurnrent.in */}
        <HeroSlider
          onGetQuoteClick={(cat) => handleOpenQuote(cat ? `Category: ${cat}` : undefined)}
          onExploreProducts={handleExploreCategory}
        />

        {/* 4. About Us & Value Proposition */}
        <AboutSection onGetQuoteClick={() => handleOpenQuote('General Office Rental')} />

        {/* 5. Product Catalog & Inventory with Rent Now & Quote actions */}
        <ProductCatalogSection
          onSelectProductForQuote={(productName) => handleOpenQuote(productName)}
          onRentProduct={handleRentProduct}
        />

        {/* 6. Why Rent vs Buy Comparison */}
        <RentVsBuySection onGetQuoteClick={() => handleOpenQuote('Office Setup Package')} />

        {/* 7. Instant Quote & Cost Estimator with direct online order & checkout */}
        <InstantQuoteCalculator
          onProceedToQuote={handleCalculatorProceedQuote}
          onDirectOrder={handleDirectCalculatorOrder}
        />

        {/* 8. Pune Commercial Coverage Areas */}
        <CoverageAreasSection />

        {/* 9. Direct Contact & Enquiry Section */}
        <ContactSection />
      </main>

      {/* 10. Footer */}
      <Footer />

      {/* 11. Quote Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        prefilledProduct={selectedProductForQuote}
        initialData={calculatorQuoteData}
      />

      {/* 12. Corporate Auth Modal (Sign In / Register / Demo) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={() => showToast('Authenticated successfully with corporate workspace!')}
      />

      {/* 13. Commercial Rental Order Configuration Modal */}
      <RentalOrderModal
        isOpen={rentalOrderModalOpen}
        onClose={() => setRentalOrderModalOpen(false)}
        product={selectedProductForOrder}
        onProceedToPayment={handleProceedToPayment}
      />

      {/* 14. B2B Payment Gateway (UPI, NetBanking, Card, NEFT) */}
      <PaymentGatewayModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        orderData={pendingPaymentData}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* 15. Customer Orders Dashboard & Active Leases Manager */}
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
