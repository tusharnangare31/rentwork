import { calculateRentalPricing } from '../pricing/engine.ts';

export interface OrderDeliveryAddress {
  companyName: string;
  buildingFloor: string;
  streetAddress: string;
  area: string;
  city: string;
  pincode: string;
  contactName: string;
  contactPhone: string;
  gstin?: string;
  notes?: string;
}

export interface PlacedRentalItem {
  id: string;
  productId: string;
  productName: string;
  category: string;
  quantity: number;
  monthlyRate: number;
  subtotal: number;
  imageUrl?: string;
}

export interface PlacedRentalOrder {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  companyName: string;
  startDate: string;
  endDate: string;
  durationMonths: number;
  items: PlacedRentalItem[];
  pricing: {
    baseSubtotal: number;
    discountAmount: number;
    discountPercent: number;
    deliveryFee: number;
    tax: number; // 18% GST
    securityDeposit: number;
    totalAmount: number;
  };
  deliveryAddress: OrderDeliveryAddress;
  status: 'CONFIRMED' | 'OUT_FOR_DELIVERY' | 'ACTIVE' | 'RETURN_REQUESTED' | 'COMPLETED' | 'CANCELLED';
  paymentStatus: 'PAID' | 'PENDING' | 'REFUNDED';
  paymentDetails?: {
    paymentId: string;
    method: 'UPI' | 'NET_BANKING' | 'CARD' | 'NEFT_RTGS';
    paidAt: string;
    transactionRef: string;
    bankName?: string;
  };
  invoiceNumber: string;
}

const ORDERS_STORAGE_KEY = 'rentwork_orders_db';

const INITIAL_DEMO_ORDERS: PlacedRentalOrder[] = [
  {
    id: 'ord_pune_101',
    orderNumber: 'RW-PUN-2026-7841',
    createdAt: '2026-09-18T10:30:00Z',
    customerId: 'usr_pune_89421',
    customerName: 'Tushar Nangare',
    customerEmail: 'tushar@technova.in',
    companyName: 'TechNova Solutions Pvt Ltd',
    startDate: '2026-09-20',
    endDate: '2027-03-20',
    durationMonths: 6,
    items: [
      {
        id: 'item_1',
        productId: 'medium-back-chair',
        productName: 'Medium Back Ergonomic Chair',
        category: 'Office Chairs',
        quantity: 12,
        monthlyRate: 450,
        subtotal: 32400,
        imageUrl: 'https://images.unsplash.com/photo-1580481077195-c3a82104536b?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 'item_2',
        productId: 'single-seats-workstation',
        productName: 'Single Seat Workstation',
        category: 'Workstations',
        quantity: 6,
        monthlyRate: 850,
        subtotal: 30600,
        imageUrl: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=300&q=80',
      },
    ],
    pricing: {
      baseSubtotal: 63000,
      discountPercent: 8,
      discountAmount: 5040,
      deliveryFee: 1500,
      tax: 10692,
      securityDeposit: 6000,
      totalAmount: 76152,
    },
    deliveryAddress: {
      companyName: 'TechNova Solutions Pvt Ltd',
      buildingFloor: 'Tower 4, 3rd Floor, Unit 302',
      streetAddress: 'EON Free Zone, Kharadi',
      area: 'Kharadi',
      city: 'Pune',
      pincode: '411014',
      contactName: 'Tushar Nangare',
      contactPhone: '+91-9960466699',
      gstin: '27AABCT3421K1ZZ',
      notes: 'Please coordinate with tower security at gate 2 for commercial delivery.',
    },
    status: 'ACTIVE',
    paymentStatus: 'PAID',
    paymentDetails: {
      paymentId: 'pay_pune_89412a8bc9',
      method: 'NET_BANKING',
      paidAt: '2026-09-18T10:45:12Z',
      transactionRef: 'HDFC-CORP-9482109',
      bankName: 'HDFC Corporate Banking',
    },
    invoiceNumber: 'INV-RW-2026-00482',
  },
];

export function getStoredOrders(): PlacedRentalOrder[] {
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
    // Seed initial demo orders
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_ORDERS));
    return INITIAL_DEMO_ORDERS;
  } catch (e) {
    return INITIAL_DEMO_ORDERS;
  }
}

export function saveOrder(order: PlacedRentalOrder): void {
  const current = getStoredOrders();
  const updated = [order, ...current];
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
}

export function updateOrderStatus(
  orderId: string,
  status: PlacedRentalOrder['status']
): void {
  const current = getStoredOrders();
  const updated = current.map((ord) => (ord.id === orderId ? { ...ord, status } : ord));
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString().slice(-5);
  const random = Math.floor(100 + Math.random() * 900);
  return `RW-PUN-${new Date().getFullYear()}-${timestamp}${random}`;
}

export function generateInvoiceNumber(): string {
  const random = Math.floor(1000 + Math.random() * 9000);
  return `INV-RW-${new Date().getFullYear()}-${random}`;
}
