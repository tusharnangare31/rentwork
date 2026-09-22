import React, { useState } from 'react';
import {
  LayoutDashboard,
  Calendar,
  Package,
  Heart,
  UserCheck,
  Settings,
  LogOut,
  Search,
  Bell,
  ArrowRight,
  Printer,
  FileText,
  Clock,
  MapPin,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { RentWorkLogo } from '../shared/RentWorkLogo.tsx';
import { Button } from '../ui/button.tsx';
import { useAuth } from '../../lib/auth/auth-context.tsx';
import { getStoredOrders, type PlacedRentalOrder } from '../../lib/orders/order-store.ts';
import { InvoiceModal } from '../order/InvoiceModal.tsx';

interface CustomerDashboardViewProps {
  onBackToMarketplace: () => void;
  onOpenProduct: (productName?: string) => void;
}

type TabType = 'dashboard' | 'rentals' | 'orders' | 'saved' | 'profile' | 'settings';

export function CustomerDashboardView({
  onBackToMarketplace,
  onOpenProduct,
}: CustomerDashboardViewProps) {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<PlacedRentalOrder | null>(null);

  const orders = getStoredOrders();
  const activeRentals = orders.filter((o) => o.status === 'ACTIVE' || o.status === 'CONFIRMED');

  const navItems: { id: TabType; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'rentals', label: 'My Rentals', icon: Calendar },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'saved', label: 'Saved Items', icon: Heart },
    { id: 'profile', label: 'Company Profile', icon: UserCheck },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const firstName = user?.fullName ? user.fullName.split(' ')[0] : 'John';
  const initials = user?.fullName
    ? user.fullName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'JD';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* 1. Dashboard Top Header matching image.png */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-8 py-3 flex items-center justify-between">
        {/* Left: RentWork Logo */}
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={onBackToMarketplace}
            className="cursor-pointer focus:outline-none"
          >
            <RentWorkLogo size="md" />
          </button>
        </div>

        {/* Center: Search Bar matching image.png */}
        <div className="hidden sm:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search rentals, orders, invoices..."
              className="w-full text-xs pl-9 pr-4 py-2 rounded-xl bg-slate-100/90 border border-transparent focus:border-blue-500 focus:bg-white focus:outline-none text-slate-800 transition-all"
            />
          </div>
        </div>

        {/* Right: Notifications & User Profile matching image.png */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="relative p-2 text-slate-500 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600" />
          </button>

          <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center">
              {initials}
            </div>
            <div className="hidden md:block text-left text-xs leading-tight">
              <span className="font-bold text-slate-900 block">
                {user?.fullName || 'John Doe'}
              </span>
              <span className="text-[10px] text-slate-500 block">
                {user?.companyName || 'Acme Pvt Ltd'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Main Dashboard Body: Sidebar + Content */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto p-4 sm:p-6 gap-6">
        {/* Sidebar matching image.png */}
        <aside className="w-56 shrink-0 hidden md:flex flex-col justify-between bg-white rounded-2xl border border-slate-200 p-3 shadow-2xs">
          {/* Nav List */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer text-left ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Bottom Logout */}
          <div className="pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={signOut}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Panel Content Area */}
        <main className="flex-1 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
          {/* TAB 1: Main Dashboard View matching image.png */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Header text matching image.png */}
              <div className="text-left space-y-1">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Welcome, {firstName}!
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  You&apos;re all set. Your dashboard will be available soon.
                </p>
              </div>

              {/* Ready State Box matching image.png */}
              <div className="max-w-xl mx-auto my-12 py-10 px-6 text-center rounded-3xl bg-slate-50 border border-slate-200/80 flex flex-col items-center justify-center space-y-4 shadow-2xs">
                {/* 3D Isometric Card / Box Icon matching image.png */}
                <div className="w-24 h-24 mb-2 flex items-center justify-center text-blue-600">
                  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                    <path
                      d="M50 15L85 32.5L50 50L15 32.5L50 15Z"
                      fill="#DBEAFE"
                      stroke="#93C5FD"
                      strokeWidth="2"
                    />
                    <path
                      d="M50 50L85 32.5V67.5L50 85V50Z"
                      fill="#93C5FD"
                      stroke="#60A5FA"
                      strokeWidth="2"
                    />
                    <path
                      d="M15 32.5L50 50V85L15 67.5V32.5Z"
                      fill="#BFDBFE"
                      stroke="#93C5FD"
                      strokeWidth="2"
                    />
                    <path
                      d="M50 30L65 37.5L50 45L35 37.5L50 30Z"
                      fill="#2563EB"
                      opacity="0.8"
                    />
                  </svg>
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  Your workspace is getting ready
                </h3>

                <p className="text-xs text-slate-500 max-w-md leading-relaxed">
                  We&apos;re setting up your personalized dashboard. In the meantime, explore our products and categories.
                </p>

                <Button
                  variant="default"
                  onClick={onBackToMarketplace}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs cursor-pointer shadow-xs"
                >
                  Browse Products
                </Button>
              </div>

              {/* Quick Summary Strip if orders exist */}
              {orders.length > 0 && (
                <div className="pt-6 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Recent Activity
                    </h4>
                    <button
                      type="button"
                      onClick={() => setActiveTab('orders')}
                      className="text-xs font-semibold text-blue-600 hover:underline"
                    >
                      View All Orders ({orders.length})
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {orders.slice(0, 2).map((ord) => (
                      <div
                        key={ord.id}
                        className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 flex items-center justify-between text-xs"
                      >
                        <div>
                          <span className="font-mono font-bold text-slate-900 block">
                            {ord.orderNumber}
                          </span>
                          <span className="text-slate-500 text-[11px] block mt-0.5">
                            {ord.items[0]?.productName || 'Commercial Equipment'} &times; {ord.items[0]?.quantity || 1} units
                          </span>
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                          {ord.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: My Rentals */}
          {activeTab === 'rentals' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-slate-900">My Active Rentals</h2>
                  <p className="text-xs text-slate-500">
                    Manage current leased equipment, request servicing, or extend rental tenure.
                  </p>
                </div>
                <Button
                  variant="default"
                  onClick={onBackToMarketplace}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl"
                >
                  Rent More Equipment
                </Button>
              </div>

              {activeRentals.length === 0 ? (
                <div className="py-16 text-center text-slate-500 text-xs">
                  No active equipment rentals found. Click Browse Products to outfit your office.
                </div>
              ) : (
                <div className="space-y-4">
                  {activeRentals.map((rental) => (
                    <div
                      key={rental.id}
                      className="p-5 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={rental.items[0]?.imageUrl || 'https://images.unsplash.com/photo-1580481077195-c3a82104536b?auto=format&fit=crop&w=600&q=80'}
                          alt={rental.items[0]?.productName || 'Rental Item'}
                          className="w-16 h-16 rounded-xl object-cover border border-slate-100 shrink-0"
                        />
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">
                            {rental.items[0]?.productName || 'Commercial Workspace Package'}
                          </span>
                          <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 mt-1">
                            <span className="flex items-center gap-1">
                              <Package className="w-3.5 h-3.5 text-blue-600" />
                              Qty: <strong>{rental.items[0]?.quantity || 1} units</strong>
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                              Tenure: {rental.durationMonths} Months ({rental.startDate} &rarr; {rental.endDate})
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-slate-400" />
                              {rental.deliveryAddress.area}, {rental.deliveryAddress.city}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <button
                          type="button"
                          onClick={() => setSelectedInvoiceOrder(rental)}
                          className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5 text-blue-600" />
                          GST Invoice
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Orders */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Commercial Orders &amp; Invoices</h2>
                  <p className="text-xs text-slate-500">
                    Track delivery status, payment transaction records, and download official 18% GST tax invoices.
                  </p>
                </div>
              </div>

              {orders.length === 0 ? (
                <div className="py-16 text-center text-slate-500 text-xs">
                  No orders placed yet.
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {orders.map((order) => (
                    <div key={order.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs text-slate-900">
                            {order.orderNumber}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                            {order.status}
                          </span>
                          {order.paymentDetails && (
                            <span className="text-[10px] text-slate-400 font-mono">
                              {order.paymentDetails.method} &bull; {order.paymentDetails.transactionRef}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-700 mt-1 font-semibold">
                          {order.items[0]?.productName || 'Commercial Furniture'} &times; {order.items[0]?.quantity || 1} units ({order.durationMonths} Months Lease)
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Total Paid: <strong>₹{order.pricing.totalAmount.toLocaleString('en-IN')}</strong> (incl. 18% GST) &bull; Placed: {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedInvoiceOrder(order)}
                        className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
                      >
                        <Printer className="w-3.5 h-3.5 text-blue-400" />
                        Print GST Invoice
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Saved Items */}
          {activeTab === 'saved' && (
            <div className="py-12 text-center text-slate-500 text-xs space-y-3">
              <Heart className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="font-bold text-slate-700">No saved items yet.</p>
              <p>Bookmark chairs, workstations, and monitors from the catalog to review later.</p>
              <Button
                variant="outline"
                size="sm"
                onClick={onBackToMarketplace}
                className="mt-2 text-xs font-bold"
              >
                Explore Inventory
              </Button>
            </div>
          )}

          {/* TAB 5: Company Profile */}
          {activeTab === 'profile' && (
            <div className="space-y-6 max-w-xl text-left">
              <div>
                <h2 className="text-xl font-black text-slate-900">Corporate Entity Profile</h2>
                <p className="text-xs text-slate-500">
                  Registered entity credentials used for B2B contracts and GST tax credit invoices.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Company Name:</span>
                    <span className="font-bold text-slate-900">{user?.companyName || 'Acme Pvt Ltd'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Contact Officer:</span>
                    <span className="font-bold text-slate-900">{user?.fullName || 'John Doe'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Registered Email:</span>
                    <span className="font-mono text-slate-800">{user?.email || 'john.doe@acme.in'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">GSTIN:</span>
                    <span className="font-mono font-bold text-blue-600">{user?.gstin || '27AAACT2948N1Z4'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Commercial Hub:</span>
                    <span className="font-medium text-slate-700">EON Free Zone, Kharadi, Pune</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: Settings */}
          {activeTab === 'settings' && (
            <div className="space-y-4 max-w-xl text-left text-xs">
              <h2 className="text-xl font-black text-slate-900">Account Preferences</h2>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 block">Monthly Invoicing Email Alerts</span>
                    <span className="text-[11px] text-slate-500">Receive automated tax invoices for active leases</span>
                  </div>
                  <input type="checkbox" defaultChecked className="accent-blue-600 w-4 h-4 cursor-pointer" />
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                  <div>
                    <span className="font-bold text-slate-900 block">Maintenance Reminder Notifications</span>
                    <span className="text-[11px] text-slate-500">Quarterly ergonomics &amp; chair lubrication checks</span>
                  </div>
                  <input type="checkbox" defaultChecked className="accent-blue-600 w-4 h-4 cursor-pointer" />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Invoice Modal for any selected order */}
      <InvoiceModal
        isOpen={!!selectedInvoiceOrder}
        onClose={() => setSelectedInvoiceOrder(null)}
        order={selectedInvoiceOrder}
      />
    </div>
  );
}
