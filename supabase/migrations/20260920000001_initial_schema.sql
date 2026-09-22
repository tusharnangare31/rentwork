-- ============================================================================
-- RentWork Database Schema Migration
-- Version: 20260920000001_initial_schema.sql
-- Description: Core tables, enums, indexes, and Row Level Security policies
-- ============================================================================

-- 1. Create Enums
CREATE TYPE user_role AS ENUM (
  'CUSTOMER',
  'COMPANY_ADMIN',
  'COMPANY_STAFF',
  'PLATFORM_ADMIN'
);

CREATE TYPE company_status AS ENUM (
  'PENDING',
  'APPROVED',
  'SUSPENDED'
);

CREATE TYPE member_role AS ENUM (
  'OWNER',
  'ADMIN',
  'STAFF'
);

CREATE TYPE product_condition AS ENUM (
  'EXCELLENT',
  'GOOD',
  'REFURBISHED'
);

CREATE TYPE product_status AS ENUM (
  'DRAFT',
  'ACTIVE',
  'INACTIVE',
  'ARCHIVED'
);

CREATE TYPE duration_type AS ENUM (
  'DAILY',
  'WEEKLY',
  'MONTHLY'
);

CREATE TYPE rental_status AS ENUM (
  'REQUESTED',
  'APPROVED',
  'PAYMENT_PENDING',
  'CONFIRMED',
  'OUT_FOR_DELIVERY',
  'ACTIVE',
  'RETURN_REQUESTED',
  'RETURNED',
  'INSPECTED',
  'COMPLETED',
  'CANCELLED',
  'OVERDUE',
  'DAMAGED'
);

CREATE TYPE payment_status AS ENUM (
  'PENDING',
  'PAID',
  'FAILED',
  'REFUNDED'
);

CREATE TYPE delivery_status AS ENUM (
  'SCHEDULED',
  'IN_TRANSIT',
  'DELIVERED',
  'RETURN_SCHEDULED',
  'RETURN_IN_TRANSIT',
  'COMPLETED'
);

-- 2. Profiles Table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  role user_role NOT NULL DEFAULT 'CUSTOMER',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Companies Table
CREATE TABLE public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  legal_business_name TEXT,
  gstin TEXT,
  description TEXT,
  logo_url TEXT,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  pincode TEXT NOT NULL,
  status company_status NOT NULL DEFAULT 'PENDING',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Company Members Table
CREATE TABLE public.company_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role member_role NOT NULL DEFAULT 'STAFF',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(company_id, user_id)
);

-- 5. Categories Table
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  image_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. Products Table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT NOT NULL,
  daily_price NUMERIC(10, 2) NOT NULL CHECK (daily_price >= 0),
  weekly_price NUMERIC(10, 2) NOT NULL CHECK (weekly_price >= 0),
  monthly_price NUMERIC(10, 2) NOT NULL CHECK (monthly_price >= 0),
  security_deposit NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (security_deposit >= 0),
  total_quantity INTEGER NOT NULL CHECK (total_quantity >= 0),
  min_rental_days INTEGER NOT NULL DEFAULT 1 CHECK (min_rental_days >= 1),
  condition product_condition NOT NULL DEFAULT 'EXCELLENT',
  status product_status NOT NULL DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. Product Images Table
CREATE TABLE public.product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. Rental Orders Table
CREATE TABLE public.rental_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT NOT NULL UNIQUE,
  customer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE RESTRICT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL CHECK (end_date >= start_date),
  subtotal NUMERIC(12, 2) NOT NULL CHECK (subtotal >= 0),
  delivery_fee NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (delivery_fee >= 0),
  security_deposit NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (security_deposit >= 0),
  tax NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (tax >= 0),
  total_amount NUMERIC(12, 2) NOT NULL CHECK (total_amount >= 0),
  status rental_status NOT NULL DEFAULT 'REQUESTED',
  payment_status payment_status NOT NULL DEFAULT 'PENDING',
  delivery_address JSONB NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 9. Rental Items Table
CREATE TABLE public.rental_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rental_order_id UUID NOT NULL REFERENCES public.rental_orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(10, 2) NOT NULL CHECK (unit_price >= 0),
  duration_type duration_type NOT NULL DEFAULT 'MONTHLY',
  subtotal NUMERIC(12, 2) NOT NULL CHECK (subtotal >= 0),
  security_deposit NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (security_deposit >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 10. Payments Table
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rental_order_id UUID NOT NULL REFERENCES public.rental_orders(id) ON DELETE RESTRICT,
  amount NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
  currency TEXT NOT NULL DEFAULT 'INR',
  provider TEXT NOT NULL DEFAULT 'RAZORPAY',
  provider_order_id TEXT,
  provider_payment_id TEXT,
  provider_signature TEXT,
  status payment_status NOT NULL DEFAULT 'PENDING',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 11. Invoices Table
CREATE TABLE public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rental_order_id UUID NOT NULL REFERENCES public.rental_orders(id) ON DELETE RESTRICT,
  invoice_number TEXT NOT NULL UNIQUE,
  amount NUMERIC(12, 2) NOT NULL,
  tax_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
  invoice_url TEXT,
  issued_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 12. Deliveries Table
CREATE TABLE public.deliveries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rental_order_id UUID NOT NULL REFERENCES public.rental_orders(id) ON DELETE CASCADE,
  delivery_address TEXT NOT NULL,
  delivery_date DATE,
  pickup_date DATE,
  status delivery_status NOT NULL DEFAULT 'SCHEDULED',
  tracking_reference TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 13. Notifications Table
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'INFO',
  read BOOLEAN NOT NULL DEFAULT false,
  link TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 14. Indexes for Performance
CREATE INDEX idx_products_company ON public.products(company_id);
CREATE INDEX idx_products_category ON public.products(category_id);
CREATE INDEX idx_products_status ON public.products(status);
CREATE INDEX idx_rental_orders_customer ON public.rental_orders(customer_id);
CREATE INDEX idx_rental_orders_company ON public.rental_orders(company_id);
CREATE INDEX idx_rental_orders_dates ON public.rental_orders(start_date, end_date);
CREATE INDEX idx_rental_items_product ON public.rental_items(product_id);
CREATE INDEX idx_rental_items_order ON public.rental_items(rental_order_id);

-- 15. Profile Creation Trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url',
    'CUSTOMER'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 16. Row Level Security (RLS) Enforcements
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rental_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rental_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deliveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Profiles
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Categories (Public read)
CREATE POLICY "Anyone can view active categories"
  ON public.categories FOR SELECT
  USING (is_active = true);

-- Products & Images (Public read for active products)
CREATE POLICY "Anyone can view active products"
  ON public.products FOR SELECT
  USING (status = 'ACTIVE');

CREATE POLICY "Anyone can view product images"
  ON public.product_images FOR SELECT
  USING (true);

-- Rental Orders
CREATE POLICY "Customers can view their own orders"
  ON public.rental_orders FOR SELECT
  USING (customer_id = auth.uid());

CREATE POLICY "Company members can view their company's orders"
  ON public.rental_orders FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.company_members cm
      WHERE cm.company_id = rental_orders.company_id
        AND cm.user_id = auth.uid()
    )
  );

-- Notifications
CREATE POLICY "Users can view their own notifications"
  ON public.notifications FOR SELECT
  USING (user_id = auth.uid());
