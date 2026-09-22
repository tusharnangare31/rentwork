import React from 'react';
import { X, Printer, Download, Building2, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button.tsx';
import type { PlacedRentalOrder } from '../../lib/orders/order-store.ts';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: PlacedRentalOrder | null;
}

export function InvoiceModal({ isOpen, onClose, order }: InvoiceModalProps) {
  if (!isOpen || !order) return null;

  const cgst = Math.round(order.pricing.tax / 2);
  const sgst = order.pricing.tax - cgst;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl rounded-2xl bg-white shadow-2xl border border-slate-200 max-h-[92vh] flex flex-col overflow-hidden">
        {/* Modal Top Bar */}
        <div className="p-4 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-400">TAX INVOICE PREVIEW</span>
            <span className="text-xs text-slate-400">• {order.invoiceNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="bg-slate-800 hover:bg-slate-700 text-white border-slate-700 text-xs gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </Button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-6 text-slate-900 bg-white">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b-2 border-slate-900 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-black">
                  <Building2 className="w-5 h-5" />
                </div>
                <span className="text-2xl font-black tracking-tight text-slate-950">
                  RentWork<span className="text-amber-600">.in</span>
                </span>
              </div>
              <p className="text-xs text-slate-600 font-semibold">RentWork Solutions Private Limited</p>
              <p className="text-[11px] text-slate-500 max-w-xs mt-0.5">
                Survey No 48, Pune Satara Road, Katraj, Pune, Maharashtra 411046
              </p>
              <p className="text-[11px] text-slate-600 font-bold mt-1">
                GSTIN: 27AAACR9482M1Z8 | PAN: AAACR9482M
              </p>
            </div>

            <div className="text-left sm:text-right space-y-1">
              <span className="inline-block px-3 py-1 text-xs font-black uppercase tracking-wider bg-slate-900 text-white rounded">
                TAX INVOICE
              </span>
              <p className="text-xs font-bold text-slate-900 pt-1">
                Invoice No: <span className="font-mono text-amber-700">{order.invoiceNumber}</span>
              </p>
              <p className="text-xs text-slate-600">
                Date: {new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
              </p>
              <p className="text-xs text-slate-600">
                Contract Ref: <span className="font-mono">{order.orderNumber}</span>
              </p>
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 mt-1">
                <CheckCircle2 className="w-3 h-3" /> PAID VIA {order.paymentDetails?.method || 'NET BANKING'}
              </div>
            </div>
          </div>

          {/* Billed To / Shipped To Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Billed To (Client Corporate Entity)
              </span>
              <h4 className="text-sm font-bold text-slate-900 mt-1">{order.companyName}</h4>
              <p className="text-slate-600 mt-0.5">Attn: {order.customerName}</p>
              <p className="text-slate-600">{order.customerEmail} | {order.deliveryAddress.contactPhone}</p>
              <p className="font-bold text-slate-800 mt-1">
                Client GSTIN: {order.deliveryAddress.gstin || 'Unregistered Corporate'}
              </p>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Delivery Location & Site
              </span>
              <p className="font-semibold text-slate-900 mt-1">
                {order.deliveryAddress.buildingFloor}
              </p>
              <p className="text-slate-600">{order.deliveryAddress.streetAddress}</p>
              <p className="text-slate-600">
                {order.deliveryAddress.area}, {order.deliveryAddress.city} - {order.deliveryAddress.pincode}
              </p>
              <p className="text-slate-500 mt-1">
                Rental Period: <strong>{order.startDate}</strong> to <strong>{order.endDate}</strong> ({order.durationMonths} Months)
              </p>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b-2 border-slate-900 bg-slate-100 text-slate-800 font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">Service / Item Description</th>
                  <th className="py-2.5 px-3">SAC Code</th>
                  <th className="py-2.5 px-3 text-right">Qty</th>
                  <th className="py-2.5 px-3 text-right">Rate/Mo</th>
                  <th className="py-2.5 px-3 text-right">Months</th>
                  <th className="py-2.5 px-3 text-right">Taxable Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {order.items.map((item, idx) => (
                  <tr key={item.id}>
                    <td className="py-3 px-3 font-mono text-slate-500">{idx + 1}</td>
                    <td className="py-3 px-3 font-medium text-slate-900">
                      <div>{item.productName}</div>
                      <div className="text-[10px] text-slate-400 font-normal">Commercial Office Furniture Rental Service</div>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-600">9973</td>
                    <td className="py-3 px-3 text-right font-bold">{item.quantity}</td>
                    <td className="py-3 px-3 text-right font-mono">₹{item.monthlyRate.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-3 text-right font-bold">{order.durationMonths}</td>
                    <td className="py-3 px-3 text-right font-mono font-bold">
                      ₹{item.subtotal.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="py-3 px-3 font-mono text-slate-500">{order.items.length + 1}</td>
                  <td className="py-3 px-3 font-medium text-slate-900" colSpan={5}>
                    Doorstep Commercial Delivery & On-Site Assembly (Pune Hubs)
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold">
                    ₹{order.pricing.deliveryFee.toLocaleString('en-IN')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Tax Breakdown & Totals */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-200 text-xs">
            <div className="space-y-2 text-slate-600">
              <p className="font-bold text-slate-900">Tax Summary (Under Reverse Charge: No)</p>
              <div className="space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span>CGST @ 9%:</span>
                  <span className="font-mono">₹{cgst.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>SGST @ 9%:</span>
                  <span className="font-mono">₹{sgst.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-bold text-slate-800 pt-1 border-t border-slate-100">
                  <span>Total GST Output:</span>
                  <span className="font-mono">₹{order.pricing.tax.toLocaleString('en-IN')}</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 pt-2">
                Certified that the particulars given above are true and correct. Equipment remains legal property of RentWork Solutions Pvt Ltd during lease tenure.
              </p>
            </div>

            <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Taxable Amount:</span>
                <span className="font-mono">
                  ₹{(order.pricing.baseSubtotal - order.pricing.discountAmount + order.pricing.deliveryFee).toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Total GST (18%):</span>
                <span className="font-mono">₹{order.pricing.tax.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Refundable Security Deposit:</span>
                <span className="font-mono">₹{order.pricing.securityDeposit.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between font-black text-slate-950 text-base pt-2 border-t border-slate-300">
                <span>Total Received:</span>
                <span className="font-mono text-amber-700">
                  ₹{order.pricing.totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
