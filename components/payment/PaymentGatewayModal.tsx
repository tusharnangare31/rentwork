import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  QrCode,
  CreditCard,
  Building2,
  ArrowRight,
  CheckCircle2,
  Lock,
  Smartphone,
  Copy,
  Check,
  RefreshCw,
} from 'lucide-react';
import { Button } from '../ui/button.tsx';
import { Input } from '../ui/input.tsx';
import { Label } from '../ui/label.tsx';
import type { OfficeProduct } from '../marketing/officefurnrent/ProductCatalogSection.tsx';
import {
  saveOrder,
  generateOrderNumber,
  generateInvoiceNumber,
  type OrderDeliveryAddress,
  type PlacedRentalOrder,
} from '../../lib/orders/order-store.ts';
import { useAuth } from '../../lib/auth/auth-context.tsx';

interface PaymentGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: {
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
  } | null;
  onPaymentSuccess: (order: PlacedRentalOrder) => void;
}

export function PaymentGatewayModal({
  isOpen,
  onClose,
  orderData,
  onPaymentSuccess,
}: PaymentGatewayModalProps) {
  const { user } = useAuth();
  const [selectedMethod, setSelectedMethod] = useState<'UPI' | 'NET_BANKING' | 'CARD' | 'NEFT_RTGS'>('UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<PlacedRentalOrder | null>(null);

  // Card fields
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8912');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('382');
  const [cardHolder, setCardHolder] = useState(user?.fullName || 'Tushar Nangare');

  // Net banking bank
  const [selectedBank, setSelectedBank] = useState('HDFC');

  // UPI
  const [upiId, setUpiId] = useState(`${user?.email.split('@')[0] || 'tushar'}@okaxis`);
  const [copiedAccount, setCopiedAccount] = useState(false);

  if (!isOpen || !orderData) return null;

  const handleProcessPayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const orderNumber = generateOrderNumber();
      const invoiceNumber = generateInvoiceNumber();
      const txnRef = `pay_${Date.now().toString().slice(-8)}_${Math.random().toString(36).substring(2, 7)}`;

      const newOrder: PlacedRentalOrder = {
        id: `ord_${Date.now()}`,
        orderNumber,
        createdAt: new Date().toISOString(),
        customerId: user?.id || 'usr_pune_89421',
        customerName: orderData.deliveryAddress.contactName || user?.fullName || 'Valued Client',
        customerEmail: user?.email || 'tushar@technova.in',
        companyName: orderData.deliveryAddress.companyName || user?.companyName || 'Enterprise Client',
        startDate: orderData.startDate,
        endDate: orderData.endDate,
        durationMonths: orderData.durationMonths,
        items: [
          {
            id: `item_${Date.now()}`,
            productId: orderData.product.id,
            productName: orderData.product.name,
            category: orderData.product.categoryLabel,
            quantity: orderData.quantity,
            monthlyRate: orderData.product.rentalPriceMonthly,
            subtotal: orderData.pricing.baseSubtotal,
            imageUrl: orderData.product.imageUrl,
          },
        ],
        pricing: orderData.pricing,
        deliveryAddress: orderData.deliveryAddress,
        status: 'CONFIRMED',
        paymentStatus: 'PAID',
        paymentDetails: {
          paymentId: txnRef,
          method: selectedMethod,
          paidAt: new Date().toISOString(),
          transactionRef: txnRef,
          bankName: selectedMethod === 'NET_BANKING' ? `${selectedBank} Corporate NetBanking` : undefined,
        },
        invoiceNumber,
      };

      saveOrder(newOrder);
      setCompletedOrder(newOrder);
      setIsProcessing(false);
      setPaymentComplete(true);
    }, 1800);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                RentWork B2B Payment Gateway
              </h3>
              <p className="text-[11px] text-slate-400">
                Official Merchant ID: RW-PUN-MERCHANT-27 | 256-bit SSL Secure
              </p>
            </div>
          </div>
          {!paymentComplete && !isProcessing && (
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {paymentComplete && completedOrder ? (
          /* Payment Success Screen */
          <div className="p-6 sm:p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-[11px] font-bold text-emerald-700 uppercase bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                Payment Authorized & Verified
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-2">
                Order Confirmed!
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Your commercial rental contract has been registered successfully.
              </p>
            </div>

            {/* Receipt Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-slate-500">Order Reference:</span>
                <span className="font-mono font-bold text-slate-900">{completedOrder.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tax Invoice Number:</span>
                <span className="font-mono font-bold text-amber-700">{completedOrder.invoiceNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Amount Paid:</span>
                <span className="font-bold text-slate-900">
                  ₹{completedOrder.pricing.totalAmount.toLocaleString('en-IN')} (incl. GST)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Equipment Setup:</span>
                <span className="font-medium text-slate-800">
                  {completedOrder.items[0]?.quantity}x {completedOrder.items[0]?.productName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Delivery Location:</span>
                <span className="font-medium text-slate-800">
                  {completedOrder.deliveryAddress.area}, Pune
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                variant="default"
                size="lg"
                onClick={() => {
                  onClose();
                  onPaymentSuccess(completedOrder);
                }}
                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-8 cursor-pointer shadow-md"
              >
                View Active Orders & Invoices
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        ) : (
          /* Payment Selection & Checkout */
          <div className="p-5 sm:p-6 space-y-6">
            {/* Amount Banner */}
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                  Total Payable Amount
                </span>
                <div className="text-2xl font-black text-slate-950 font-mono">
                  ₹{orderData.pricing.totalAmount.toLocaleString('en-IN')}
                </div>
              </div>
              <div className="text-right text-xs text-amber-900">
                <div className="font-bold">{orderData.quantity} Units for {orderData.durationMonths} Months</div>
                <div className="text-[10px] text-amber-700">Includes 18% GST + Refundable Deposit</div>
              </div>
            </div>

            {/* Payment Method Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'UPI', label: 'UPI / QR', icon: QrCode },
                { id: 'NET_BANKING', label: 'Net Banking', icon: Building2 },
                { id: 'CARD', label: 'Corporate Card', icon: CreditCard },
                { id: 'NEFT_RTGS', label: 'NEFT / RTGS', icon: Smartphone },
              ].map((m) => {
                const Icon = m.icon;
                const isSel = selectedMethod === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedMethod(m.id as any)}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isSel
                        ? 'border-amber-500 bg-amber-500 text-slate-950 shadow-sm'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Method Details */}
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/60 min-h-[190px]">
              {selectedMethod === 'UPI' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    {/* Simulated Dynamic UPI QR */}
                    <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs shrink-0 text-center">
                      <div className="w-32 h-32 bg-slate-900 rounded-lg p-2 flex flex-col items-center justify-center text-white relative">
                        <QrCode className="w-20 h-20 text-amber-400" />
                        <span className="text-[9px] font-mono text-amber-300">Scan via GPay/PhonePe</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-semibold block mt-1">
                        B2B Dynamic QR Code
                      </span>
                    </div>

                    <div className="space-y-2 flex-1 w-full">
                      <Label htmlFor="upi-vpa">Or Pay via Corporate UPI ID (VPA)</Label>
                      <Input
                        id="upi-vpa"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="company@okhdfcbank"
                      />
                      <p className="text-[11px] text-slate-500">
                        Works with Google Pay, PhonePe, Paytm, BHIM, and Cred UPI.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedMethod === 'NET_BANKING' && (
                <div className="space-y-3">
                  <Label>Select Corporate / Retail Banking Partner</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'HDFC', name: 'HDFC Bank' },
                      { id: 'ICICI', name: 'ICICI Bank' },
                      { id: 'SBI', name: 'State Bank of India' },
                      { id: 'AXIS', name: 'Axis Bank' },
                      { id: 'KOTAK', name: 'Kotak Corporate' },
                      { id: 'OTHER', name: 'Other Banks' },
                    ].map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setSelectedBank(b.id)}
                        className={`p-2.5 rounded-lg border text-xs font-bold text-left transition-colors cursor-pointer ${
                          selectedBank === b.id
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {b.name}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-500 pt-1">
                    Direct server-to-server authorization for seamless corporate ledger reconciliation.
                  </p>
                </div>
              )}

              {selectedMethod === 'CARD' && (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input
                      id="card-number"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="card-expiry">Expiry Date</Label>
                      <Input
                        id="card-expiry"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="card-cvv">CVV</Label>
                      <Input
                        id="card-cvv"
                        type="password"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="card-holder">Cardholder Name</Label>
                    <Input
                      id="card-holder"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {selectedMethod === 'NEFT_RTGS' && (
                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Virtual Account Number:</span>
                      <span className="font-mono font-bold text-slate-900">RWPU894210948</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">IFSC Code:</span>
                      <span className="font-mono font-bold text-slate-900">HDFC0000060</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Beneficiary Name:</span>
                      <span className="font-bold text-slate-900">RentWork Solutions Private Limited</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Account Type:</span>
                      <span className="font-medium text-slate-900">B2B Escrow Current Account</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy('RWPU894210948')}
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-700 hover:text-amber-800"
                  >
                    {copiedAccount ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedAccount ? 'Copied to Clipboard!' : 'Copy Bank Coordinates'}
                  </button>
                </div>
              )}
            </div>

            {/* Pay Button */}
            <Button
              variant="default"
              size="lg"
              disabled={isProcessing}
              onClick={handleProcessPayment}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-3 rounded-xl gap-2 cursor-pointer shadow-lg text-sm"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  Authorizing Payment with Banking Gateway...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5 text-slate-950" />
                  Pay ₹{orderData.pricing.totalAmount.toLocaleString('en-IN')} & Confirm Order
                </>
              )}
            </Button>

            <div className="text-center text-[10px] text-slate-400">
              By authorizing, you agree to RentWork Pune’s commercial equipment rental terms and condition.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
