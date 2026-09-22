import React, { useState } from 'react';
import {
  X,
  Calendar,
  Building,
  MapPin,
  Truck,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Info,
} from 'lucide-react';
import { Button } from '../ui/button.tsx';
import { Input } from '../ui/input.tsx';
import { Label } from '../ui/label.tsx';
import type { OfficeProduct } from '../marketing/officefurnrent/ProductCatalogSection.tsx';
import type { OrderDeliveryAddress } from '../../lib/orders/order-store.ts';
import { useAuth } from '../../lib/auth/auth-context.tsx';

interface RentalOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: OfficeProduct | null;
  onProceedToPayment: (orderPayload: {
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
  }) => void;
}

export function RentalOrderModal({
  isOpen,
  onClose,
  product,
  onProceedToPayment,
}: RentalOrderModalProps) {
  const { user } = useAuth();

  const [quantity, setQuantity] = useState<number>(5);
  const [durationMonths, setDurationMonths] = useState<number>(6);

  // Delivery dates
  const today = new Date();
  const defaultStartDate = new Date(today.setDate(today.getDate() + 2)).toISOString().split('T')[0];
  const [startDate, setStartDate] = useState<string>(defaultStartDate);

  // Delivery Address fields prefilled from user session
  const [companyName, setCompanyName] = useState<string>(user?.companyName || 'TechNova Solutions Pvt Ltd');
  const [buildingFloor, setBuildingFloor] = useState<string>('Tower 4, 3rd Floor');
  const [streetAddress, setStreetAddress] = useState<string>('EON Free Zone, Kharadi');
  const [area, setArea] = useState<string>('Kharadi');
  const [city] = useState<string>('Pune');
  const [pincode, setPincode] = useState<string>('411014');
  const [contactName, setContactName] = useState<string>(user?.fullName || 'Tushar Nangare');
  const [contactPhone, setContactPhone] = useState<string>(user?.phone || '+91-9960466699');
  const [gstin, setGstin] = useState<string>(user?.gstin || '27AABCT3421K1ZZ');
  const [notes, setNotes] = useState<string>('');

  if (!isOpen || !product) return null;

  // Compute End Date
  const start = new Date(startDate || defaultStartDate);
  const end = new Date(start);
  end.setMonth(end.getMonth() + durationMonths);
  const endDateStr = end.toISOString().split('T')[0];

  // Pricing calculations
  const unitMonthlyRate = product.rentalPriceMonthly;
  const rawBaseSubtotal = unitMonthlyRate * quantity * durationMonths;

  // Duration discounts
  const discountPercent =
    durationMonths >= 24 ? 20 : durationMonths >= 12 ? 15 : durationMonths >= 6 ? 8 : 0;
  const discountAmount = Math.round(rawBaseSubtotal * (discountPercent / 100));
  const discountedSubtotal = rawBaseSubtotal - discountAmount;

  const deliveryFee = 1500; // Flat Pune commercial logistics & assembly fee
  const taxableAmount = discountedSubtotal + deliveryFee;
  const tax = Math.round(taxableAmount * 0.18); // 18% GST

  // Security deposit is refundable (typically 1 month unit rent per item)
  const unitDeposit = Math.round(product.rentalPriceMonthly * 0.8);
  const securityDeposit = unitDeposit * quantity;

  const totalAmount = discountedSubtotal + deliveryFee + tax + securityDeposit;

  const handleProceed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !streetAddress || !contactName || !contactPhone) return;

    onProceedToPayment({
      product,
      quantity,
      durationMonths,
      startDate,
      endDate: endDateStr,
      pricing: {
        baseSubtotal: rawBaseSubtotal,
        discountPercent,
        discountAmount,
        deliveryFee,
        tax,
        securityDeposit,
        totalAmount,
      },
      deliveryAddress: {
        companyName,
        buildingFloor,
        streetAddress,
        area,
        city,
        pincode,
        contactName,
        contactPhone,
        gstin,
        notes,
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl rounded-2xl bg-white shadow-2xl border border-slate-200 max-h-[92vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-bold flex items-center justify-center shrink-0">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                Configure Commercial Rental Order
              </h3>
              <p className="text-xs text-slate-500">
                Official B2B rental contract with doorstep delivery and GST tax invoice in Pune
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleProceed} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Selected Product Overview Card */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center gap-4">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-24 h-24 object-cover rounded-lg border border-slate-200"
            />
            <div className="flex-1 space-y-1 text-center sm:text-left">
              <span className="text-[10px] font-bold text-amber-700 uppercase bg-amber-100/70 px-2 py-0.5 rounded">
                {product.categoryLabel}
              </span>
              <h4 className="text-base font-bold text-slate-900">{product.name}</h4>
              <p className="text-xs text-slate-500 line-clamp-1">{product.description}</p>
              <div className="text-xs font-semibold text-slate-700 pt-1">
                Standard Rate: <span className="font-bold text-amber-700">₹{product.rentalPriceMonthly}/month</span> per unit
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Rental Period & Quantities */}
            <div className="lg:col-span-7 space-y-5">
              <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                1. Order Quantity & Rental Tenure
              </h4>

              {/* Quantity selector */}
              <div>
                <Label htmlFor="qty-select" required>
                  Number of Units Required
                </Label>
                <div className="flex items-center gap-3 mt-1.5">
                  <input
                    type="number"
                    min="1"
                    max="200"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-28 px-3 py-2 text-sm font-bold bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {[1, 5, 10, 25, 50].map((count) => (
                      <button
                        key={count}
                        type="button"
                        onClick={() => setQuantity(count)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
                          quantity === count
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {count} {count === 1 ? 'unit' : 'units'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Duration selector */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <Label required>Rental Duration (Tenure)</Label>
                  {discountPercent > 0 && (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      🎉 {discountPercent}% Long-term discount applied
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { m: 1, label: '1 Month' },
                    { m: 3, label: '3 Months' },
                    { m: 6, label: '6 Months', tag: '8% off' },
                    { m: 12, label: '12 Months', tag: '15% off' },
                  ].map((dur) => (
                    <button
                      key={dur.m}
                      type="button"
                      onClick={() => setDurationMonths(dur.m)}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center transition-all cursor-pointer ${
                        durationMonths === dur.m
                          ? 'border-amber-500 bg-amber-50 text-slate-950 ring-2 ring-amber-500'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{dur.label}</span>
                      {dur.tag && (
                        <span className="text-[10px] text-amber-700 font-semibold mt-0.5">
                          {dur.tag}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <Label htmlFor="start-date" required>
                    Delivery / Lease Start Date
                  </Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label>Scheduled Lease End Date</Label>
                  <div className="h-10 px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 flex items-center">
                    {endDateStr} ({durationMonths} months)
                  </div>
                </div>
              </div>

              <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 pt-3">
                2. Pune Commercial Delivery Address
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="order-company" required>Company / Legal Entity</Label>
                  <Input
                    id="order-company"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="order-gstin">GSTIN (For 18% Input Credit)</Label>
                  <Input
                    id="order-gstin"
                    placeholder="27AABCT3421K1ZZ"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value)}
                  />
                </div>

                <div className="sm:col-span-2">
                  <Label htmlFor="order-address" required>Street Address & Tech Park</Label>
                  <Input
                    id="order-address"
                    placeholder="e.g. Unit 302, Phase 1, Hinjawadi Rajiv Gandhi Infotech Park"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="order-area">Pune Commercial Zone</Label>
                  <select
                    id="order-area"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full h-10 px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Hinjawadi">Hinjawadi IT Park (Phase 1, 2, 3)</option>
                    <option value="Kharadi">Kharadi / EON Free Zone / WTC</option>
                    <option value="Baner">Baner / Balewadi High Street</option>
                    <option value="Viman Nagar">Viman Nagar / Commerzone</option>
                    <option value="Magarpatta">Magarpatta Cybercity / Hadapsar</option>
                    <option value="PCMC">Pimpri Chinchwad / Bhosari MIDC</option>
                    <option value="Central Pune">SB Road / Shivajinagar</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="order-pincode" required>Pincode</Label>
                  <Input
                    id="order-pincode"
                    placeholder="411057"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="contact-person" required>Recipient Name</Label>
                  <Input
                    id="contact-person"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="contact-phone" required>Recipient Mobile</Label>
                  <Input
                    id="contact-phone"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Pricing Summary & Checkout Action */}
            <div className="lg:col-span-5 bg-slate-900 text-white p-5 sm:p-6 rounded-2xl flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
                    Order Price Summary
                  </h4>
                  <span className="text-[11px] text-slate-400">{quantity} units • {durationMonths} mo</span>
                </div>

                <div className="space-y-2.5 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span>Base Rent ({quantity} × ₹{unitMonthlyRate} × {durationMonths}m):</span>
                    <span className="font-mono">₹{rawBaseSubtotal.toLocaleString('en-IN')}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Tenure Discount ({discountPercent}%):</span>
                      <span className="font-mono">-₹{discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Doorstep Logistics & Setup:</span>
                    <span className="font-mono">₹{deliveryFee.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>GST @ 18% (Eligible for Input Tax Credit):</span>
                    <span className="font-mono">₹{tax.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex justify-between text-slate-400 pt-1 border-t border-slate-800">
                    <span className="flex items-center gap-1">
                      Refundable Security Deposit
                      <Info className="w-3 h-3 text-slate-500" />:
                    </span>
                    <span className="font-mono">₹{securityDeposit.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline text-white">
                    <span className="font-bold text-sm">Total Payable Today:</span>
                    <div className="text-right">
                      <div className="text-2xl font-black text-amber-400 font-mono">
                        ₹{totalAmount.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] text-slate-400 font-normal">
                        Includes GST & 100% refundable deposit
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-amber-400 text-[11px]">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    B2B Commercial Rental Protection
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Zero maintenance liability. Free replacement of defective parts, castor wheels, and gas cylinders within 24 hours.
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-3 rounded-xl gap-2 cursor-pointer shadow-lg text-sm"
                >
                  Proceed to Secure Payment
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </Button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400">
                  <span>🔒 256-Bit Encrypted B2B Gateway</span> •
                  <span>Instant GST Tax Invoice</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
