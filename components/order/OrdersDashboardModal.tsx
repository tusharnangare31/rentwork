import React, { useState, useEffect } from 'react';
import {
  X,
  Package,
  Calendar,
  Clock,
  CheckCircle2,
  FileText,
  MapPin,
  Truck,
  RotateCcw,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '../ui/button.tsx';
import { Badge } from '../ui/badge.tsx';
import {
  getStoredOrders,
  updateOrderStatus,
  type PlacedRentalOrder,
} from '../../lib/orders/order-store.ts';
import { InvoiceModal } from './InvoiceModal.tsx';
import { useAuth } from '../../lib/auth/auth-context.tsx';

interface OrdersDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRentMoreClick: () => void;
}

export function OrdersDashboardModal({
  isOpen,
  onClose,
  onRentMoreClick,
}: OrdersDashboardModalProps) {
  const { user } = useAuth();
  const [orders, setOrders] = useState<PlacedRentalOrder[]>([]);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<PlacedRentalOrder | null>(null);
  const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'CONFIRMED'>('ALL');
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setOrders(getStoredOrders());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredOrders = orders.filter((o) => {
    if (filter === 'ALL') return true;
    return o.status === filter;
  });

  const handleExtend = (order: PlacedRentalOrder) => {
    setActionNotice(`Rental extension request logged for ${order.orderNumber}. Our Pune dispatch manager will connect with you.`);
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleMaintenance = (order: PlacedRentalOrder) => {
    setActionNotice(`Free maintenance / replacement ticket #MNT-${Date.now().toString().slice(-4)} created for ${order.orderNumber}. Technician dispatched within 24h.`);
    setTimeout(() => setActionNotice(null), 4000);
  };

  const getStatusBadge = (status: PlacedRentalOrder['status']) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Active On-Site Lease
          </span>
        );
      case 'CONFIRMED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
            <Truck className="w-3 h-3 text-amber-600" />
            Paid & Scheduled for Delivery
          </span>
        );
      case 'OUT_FOR_DELIVERY':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
            <Truck className="w-3 h-3 text-blue-600" />
            In Transit to Site
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
            {status}
          </span>
        );
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs">
        <div className="relative w-full max-w-4xl rounded-2xl bg-white shadow-2xl border border-slate-200 max-h-[92vh] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
                  Corporate Rental Management & Orders
                </h3>
                <p className="text-xs text-slate-400">
                  {user?.companyName || 'TechNova Solutions'} • {orders.length} active/recent contracts
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Action Notice banner */}
          {actionNotice && (
            <div className="p-3 bg-amber-50 border-b border-amber-200 text-xs font-semibold text-amber-900 flex items-center gap-2 animate-in fade-in">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              {actionNotice}
            </div>
          )}

          {/* Filters Bar */}
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {(['ALL', 'ACTIVE', 'CONFIRMED'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setFilter(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    filter === tab
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab === 'ALL' ? 'All Orders' : tab === 'ACTIVE' ? 'Active Leases' : 'New Deliveries'}
                </button>
              ))}
            </div>

            <Button
              variant="default"
              size="sm"
              onClick={() => {
                onClose();
                onRentMoreClick();
              }}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs cursor-pointer"
            >
              + Rent Additional Equipment
            </Button>
          </div>

          {/* Orders List Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="p-12 text-center space-y-3">
                <Package className="w-12 h-12 text-slate-300 mx-auto" />
                <h4 className="text-base font-bold text-slate-800">No rental contracts found in this tab.</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Browse our Pune office inventory of ergonomic chairs, workstations, and executive tables to place an order.
                </p>
                <Button
                  variant="default"
                  onClick={() => {
                    onClose();
                    onRentMoreClick();
                  }}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs mt-2"
                >
                  Explore Furniture Catalog
                </Button>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs hover:border-slate-300 transition-all space-y-4"
                >
                  {/* Top Bar of Card */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-black text-slate-900">
                          {order.orderNumber}
                        </span>
                        {getStatusBadge(order.status)}
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Booked on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedInvoiceOrder(order)}
                        className="text-xs font-bold text-slate-700 hover:text-slate-950 border-slate-200 gap-1.5"
                      >
                        <FileText className="w-3.5 h-3.5 text-amber-600" />
                        GST Tax Invoice
                      </Button>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        {item.imageUrl && (
                          <img
                            src={item.imageUrl}
                            alt={item.productName}
                            className="w-14 h-14 object-cover rounded-lg border border-slate-200 shrink-0"
                          />
                        )}
                        <div className="flex-1">
                          <h5 className="text-xs font-bold text-slate-900">{item.productName}</h5>
                          <p className="text-[11px] text-slate-500">
                            {item.quantity} units @ ₹{item.monthlyRate}/month
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-mono font-bold text-slate-900">
                            ₹{item.subtotal.toLocaleString('en-IN')}
                          </span>
                          <span className="block text-[10px] text-slate-400 font-normal">
                            ({order.durationMonths} mo tenure)
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary & Actions row */}
                  <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-slate-600 text-[11px]">
                        <Calendar className="w-3.5 h-3.5 text-amber-600" />
                        <span>
                          Lease Tenure: <strong>{order.startDate}</strong> to <strong>{order.endDate}</strong> ({order.durationMonths} Months)
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600 text-[11px]">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>
                          {order.deliveryAddress.buildingFloor}, {order.deliveryAddress.streetAddress}, {order.deliveryAddress.area}, Pune
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => handleMaintenance(order)}
                        className="flex-1 sm:flex-initial px-3 py-1.5 text-[11px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                      >
                        Request Service
                      </button>
                      <button
                        type="button"
                        onClick={() => handleExtend(order)}
                        className="flex-1 sm:flex-initial px-3 py-1.5 text-[11px] font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors cursor-pointer"
                      >
                        Extend Lease
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Invoice Viewer Modal */}
      {selectedInvoiceOrder && (
        <InvoiceModal
          isOpen={!!selectedInvoiceOrder}
          onClose={() => setSelectedInvoiceOrder(null)}
          order={selectedInvoiceOrder}
        />
      )}
    </>
  );
}
