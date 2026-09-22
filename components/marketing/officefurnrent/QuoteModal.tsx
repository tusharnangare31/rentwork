import React, { useState } from 'react';
import { X, CheckCircle2, Phone, Mail, Building2, Send, Clock, MapPin } from 'lucide-react';
import { Button } from '../../ui/button.tsx';
import { Input } from '../../ui/input.tsx';
import { Label } from '../../ui/label.tsx';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledProduct?: string;
  initialData?: {
    chairs?: number;
    workstations?: number;
    cabins?: number;
    storage?: number;
    durationMonths?: number;
    monthlyTotal?: number;
  };
}

export function QuoteModal({ isOpen, onClose, prefilledProduct, initialData }: QuoteModalProps) {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pincode, setPincode] = useState('');
  const [productType, setProductType] = useState(prefilledProduct || 'Office Chairs & Workstations');
  const [quantity, setQuantity] = useState(initialData?.chairs || 10);
  const [tenure, setTenure] = useState(initialData?.durationMonths ? `${initialData.durationMonths} Months` : '6 Months');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="relative w-full max-w-xl rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Quotation Request Received!</h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Thank you, <strong>{name}</strong>! Our Pune commercial facilities team will review your requirements for <strong>{productType}</strong> and share a customized commercial proposal within 2 business hours.
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 text-left space-y-1">
              <p><strong>Direct Hotline:</strong> +91-9960 466 699</p>
              <p><strong>Corporate Email:</strong> sales@officefurnrent.in</p>
              <p><strong>Delivery Hub:</strong> Katraj / Pune Satara Road, Pune 411046</p>
            </div>
            <Button
              variant="default"
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6"
            >
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-left border-b border-slate-100 pb-4">
              <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 rounded">
                OfficeFurnRent.in Quotation Desk
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                Get a Fast Rental Quote
              </h3>
              <p className="text-xs text-slate-500">
                Receive customized corporate rental rates with GST invoice compliance and fast Pune setup.
              </p>
            </div>

            {initialData?.monthlyTotal && (
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex justify-between items-center">
                <span>Estimated Monthly Investment:</span>
                <span className="font-extrabold text-sm">
                  ₹{initialData.monthlyTotal.toLocaleString('en-IN')}/mo
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <Label htmlFor="contact-name" required>Contact Person</Label>
                <Input
                  id="contact-name"
                  placeholder="e.g. Rahul Patil"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="contact-company" required>Company / Office Name</Label>
                <Input
                  id="contact-company"
                  placeholder="e.g. TechSprint Innovations"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="contact-phone" required>Contact Phone Number</Label>
                <Input
                  id="contact-phone"
                  type="tel"
                  placeholder="e.g. 9960466699"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="contact-email" required>Work Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="rahul@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="product-type">Furniture Category</Label>
                <select
                  id="product-type"
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                  className="w-full h-10 px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="Office Chairs">Office Chairs (Medium / High Back)</option>
                  <option value="Modular Workstations">Modular Workstations (1, 2, 4-Seater)</option>
                  <option value="Cabin & Conference Tables">Executive Cabin & Conference Tables</option>
                  <option value="Office Storage Units">Steel File Cabinets & Mobile Pedestals</option>
                  <option value="Turnkey Office Setup">Complete Turnkey Office Setup (Chairs + Desks + Storage)</option>
                </select>
              </div>

              <div>
                <Label htmlFor="rental-tenure">Planned Rental Duration</Label>
                <select
                  id="rental-tenure"
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                  className="w-full h-10 px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="1 - 3 Months">1 - 3 Months</option>
                  <option value="3 - 6 Months">3 - 6 Months (Recommended)</option>
                  <option value="6 - 12 Months">6 - 12 Months (8-15% discount)</option>
                  <option value="12+ Months">12+ Months Long-Term Lease</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="delivery-area">Delivery Location in Pune / Pincode</Label>
                <Input
                  id="delivery-area"
                  placeholder="e.g. Phase 1 Hinjawadi / Kharadi EON IT Park / 411057"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="additional-notes">Specific Requirements / Approximate Headcount</Label>
                <textarea
                  id="additional-notes"
                  rows={2}
                  placeholder="e.g. Need 25 ergonomic chairs and 20 modular linear workstations by next Monday..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="default"
              size="lg"
              disabled={isLoading}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-3 rounded-xl gap-2 mt-2 cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4 text-slate-950" />
              {isLoading ? 'Processing Proposal...' : 'Submit Quotation Request'}
            </Button>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>🔒 100% Confidential Corporate Pricing</span>
              <a href="tel:+919960466699" className="font-bold text-amber-600 hover:underline">
                Urgent requirement? Call +91-9960 466 699
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
