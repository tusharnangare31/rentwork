export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole = 'CUSTOMER' | 'COMPANY_ADMIN' | 'COMPANY_STAFF' | 'PLATFORM_ADMIN';
export type CompanyStatus = 'PENDING' | 'APPROVED' | 'SUSPENDED';
export type MemberRole = 'OWNER' | 'ADMIN' | 'STAFF';
export type ProductCondition = 'EXCELLENT' | 'GOOD' | 'REFURBISHED';
export type ProductStatus = 'DRAFT' | 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';
export type DurationType = 'DAILY' | 'WEEKLY' | 'MONTHLY';
export type RentalStatus =
  | 'REQUESTED'
  | 'APPROVED'
  | 'PAYMENT_PENDING'
  | 'CONFIRMED'
  | 'OUT_FOR_DELIVERY'
  | 'ACTIVE'
  | 'RETURN_REQUESTED'
  | 'RETURNED'
  | 'INSPECTED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'OVERDUE'
  | 'DAMAGED';
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
export type DeliveryStatus =
  | 'SCHEDULED'
  | 'IN_TRANSIT'
  | 'DELIVERED'
  | 'RETURN_SCHEDULED'
  | 'RETURN_IN_TRANSIT'
  | 'COMPLETED';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Company {
  id: string;
  name: string;
  slug: string;
  legal_business_name: string | null;
  gstin: string | null;
  description: string | null;
  logo_url: string | null;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  status: CompanyStatus;
  created_at: string;
  updated_at: string;
}

export interface CompanyMember {
  id: string;
  company_id: string;
  user_id: string;
  role: MemberRole;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
}

export interface Product {
  id: string;
  company_id: string;
  category_id: string;
  name: string;
  slug: string;
  description: string;
  daily_price: number;
  weekly_price: number;
  monthly_price: number;
  security_deposit: number;
  total_quantity: number;
  min_rental_days: number;
  condition: ProductCondition;
  status: ProductStatus;
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  alt_text: string | null;
  sort_order: number;
  created_at: string;
}

export interface RentalOrder {
  id: string;
  order_number: string;
  customer_id: string;
  company_id: string;
  start_date: string;
  end_date: string;
  subtotal: number;
  delivery_fee: number;
  security_deposit: number;
  tax: number;
  total_amount: number;
  status: RentalStatus;
  payment_status: PaymentStatus;
  delivery_address: Json;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface RentalItem {
  id: string;
  rental_order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  duration_type: DurationType;
  subtotal: number;
  security_deposit: number;
  created_at: string;
}

export interface Payment {
  id: string;
  rental_order_id: string;
  amount: number;
  currency: string;
  provider: string;
  provider_order_id: string | null;
  provider_payment_id: string | null;
  provider_signature: string | null;
  status: PaymentStatus;
  created_at: string;
}

export interface Invoice {
  id: string;
  rental_order_id: string;
  invoice_number: string;
  amount: number;
  tax_amount: number;
  invoice_url: string | null;
  issued_at: string;
}

export interface Delivery {
  id: string;
  rental_order_id: string;
  delivery_address: string;
  delivery_date: string | null;
  pickup_date: string | null;
  status: DeliveryStatus;
  tracking_reference: string | null;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  link: string | null;
  created_at: string;
}
