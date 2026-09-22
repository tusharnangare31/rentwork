# RentWork — Database Architecture & Schema

## 1. Overview
RentWork uses Supabase PostgreSQL 15+ with Row Level Security (RLS) enabled on every public table. The schema models multi-tenant B2B operations separating client accounts, vendor companies, product inventory, rental orders, payments, deliveries, and notifications.

## 2. Entity-Relationship Overview
```
           ┌───────────────┐
           │   profiles    │
           └───────┬───────┘
                   │ 1:M (as member)
                   ▼
           ┌───────────────┐       1:M       ┌───────────────┐
           │   companies   │─────────────────▶   products    │
           └───────┬───────┘                 └───────┬───────┘
                   │ 1:M (as vendor)                 │ 1:M
                   ▼                                 ▼
           ┌───────────────┐       1:M       ┌───────────────┐
           │ rental_orders │─────────────────▶ rental_items  │
           └───────┬───────┘                 └───────────────┘
                   │
    ┌──────────────┼──────────────┐
    ▼              ▼              ▼
┌────────┐   ┌──────────┐   ┌────────────┐
│payments│   │ invoices │   │deliveries  │
└────────┘   └──────────┘   └────────────┘
```

## 3. Core Table Definitions

### 3.1 `profiles`
Stores identity attributes extending Supabase `auth.users`.
* `id` UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE
* `email` TEXT NOT NULL
* `full_name` TEXT
* `phone` TEXT
* `avatar_url` TEXT
* `role` user_role NOT NULL DEFAULT 'CUSTOMER' (`CUSTOMER`, `COMPANY_ADMIN`, `COMPANY_STAFF`, `PLATFORM_ADMIN`)
* `created_at` TIMESTAMPTZ NOT NULL DEFAULT now()
* `updated_at` TIMESTAMPTZ NOT NULL DEFAULT now()

### 3.2 `companies`
Represents rental supplier businesses on the platform.
* `id` UUID PRIMARY KEY DEFAULT gen_random_uuid()
* `name` TEXT NOT NULL
* `slug` TEXT NOT NULL UNIQUE
* `legal_business_name` TEXT
* `gstin` TEXT
* `description` TEXT
* `logo_url` TEXT
* `email` TEXT NOT NULL
* `phone` TEXT NOT NULL
* `address` TEXT NOT NULL
* `city` TEXT NOT NULL
* `state` TEXT NOT NULL
* `pincode` TEXT NOT NULL
* `status` company_status NOT NULL DEFAULT 'PENDING' (`PENDING`, `APPROVED`, `SUSPENDED`)
* `created_at` TIMESTAMPTZ NOT NULL DEFAULT now()
* `updated_at` TIMESTAMPTZ NOT NULL DEFAULT now()

### 3.3 `company_members`
Associates authorized staff with rental companies.
* `id` UUID PRIMARY KEY DEFAULT gen_random_uuid()
* `company_id` UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE
* `user_id` UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE
* `role` member_role NOT NULL DEFAULT 'STAFF' (`OWNER`, `ADMIN`, `STAFF`)
* `created_at` TIMESTAMPTZ NOT NULL DEFAULT now()
* UNIQUE (company_id, user_id)

### 3.4 `categories`
Marketplace taxonomy for corporate equipment.
* `id` UUID PRIMARY KEY DEFAULT gen_random_uuid()
* `name` TEXT NOT NULL
* `slug` TEXT NOT NULL UNIQUE
* `description` TEXT
* `icon` TEXT
* `image_url` TEXT
* `is_active` BOOLEAN NOT NULL DEFAULT true
* `created_at` TIMESTAMPTZ NOT NULL DEFAULT now()

### 3.5 `products`
Rental items published by partner companies.
* `id` UUID PRIMARY KEY DEFAULT gen_random_uuid()
* `company_id` UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE
* `category_id` UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT
* `name` TEXT NOT NULL
* `slug` TEXT NOT NULL
* `description` TEXT NOT NULL
* `daily_price` NUMERIC(10, 2) NOT NULL CHECK (daily_price >= 0)
* `weekly_price` NUMERIC(10, 2) NOT NULL CHECK (weekly_price >= 0)
* `monthly_price` NUMERIC(10, 2) NOT NULL CHECK (monthly_price >= 0)
* `security_deposit` NUMERIC(10, 2) NOT NULL CHECK (security_deposit >= 0)
* `total_quantity` INTEGER NOT NULL CHECK (total_quantity >= 0)
* `min_rental_days` INTEGER NOT NULL DEFAULT 1 CHECK (min_rental_days >= 1)
* `condition` product_condition NOT NULL DEFAULT 'EXCELLENT' (`EXCELLENT`, `GOOD`, `REFURBISHED`)
* `status` product_status NOT NULL DEFAULT 'ACTIVE' (`DRAFT`, `ACTIVE`, `INACTIVE`, `ARCHIVED`)
* `created_at` TIMESTAMPTZ NOT NULL DEFAULT now()
* `updated_at` TIMESTAMPTZ NOT NULL DEFAULT now()

### 3.6 `product_images`
Product photography gallery.
* `id` UUID PRIMARY KEY DEFAULT gen_random_uuid()
* `product_id` UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE
* `image_url` TEXT NOT NULL
* `alt_text` TEXT
* `sort_order` INTEGER NOT NULL DEFAULT 0
* `created_at` TIMESTAMPTZ NOT NULL DEFAULT now()

### 3.7 `rental_orders`
Tracks the primary contract between customer and rental vendor.
* `id` UUID PRIMARY KEY DEFAULT gen_random_uuid()
* `order_number` TEXT NOT NULL UNIQUE
* `customer_id` UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT
* `company_id` UUID NOT NULL REFERENCES companies(id) ON DELETE RESTRICT
* `start_date` DATE NOT NULL
* `end_date` DATE NOT NULL CHECK (end_date >= start_date)
* `subtotal` NUMERIC(12, 2) NOT NULL CHECK (subtotal >= 0)
* `delivery_fee` NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (delivery_fee >= 0)
* `security_deposit` NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (security_deposit >= 0)
* `tax` NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (tax >= 0)
* `total_amount` NUMERIC(12, 2) NOT NULL CHECK (total_amount >= 0)
* `status` rental_status NOT NULL DEFAULT 'REQUESTED'
* `payment_status` payment_status NOT NULL DEFAULT 'PENDING'
* `delivery_address` JSONB NOT NULL
* `notes` TEXT
* `created_at` TIMESTAMPTZ NOT NULL DEFAULT now()
* `updated_at` TIMESTAMPTZ NOT NULL DEFAULT now()

### 3.8 `rental_items`
Individual line items associated with a rental order.
* `id` UUID PRIMARY KEY DEFAULT gen_random_uuid()
* `rental_order_id` UUID NOT NULL REFERENCES rental_orders(id) ON DELETE CASCADE
* `product_id` UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT
* `quantity` INTEGER NOT NULL CHECK (quantity > 0)
* `unit_price` NUMERIC(10, 2) NOT NULL CHECK (unit_price >= 0)
* `duration_type` duration_type NOT NULL (`DAILY`, `WEEKLY`, `MONTHLY`)
* `subtotal` NUMERIC(12, 2) NOT NULL CHECK (subtotal >= 0)
* `security_deposit` NUMERIC(12, 2) NOT NULL DEFAULT 0

### 3.9 `payments`
Razorpay transaction records.
* `id` UUID PRIMARY KEY DEFAULT gen_random_uuid()
* `rental_order_id` UUID NOT NULL REFERENCES rental_orders(id) ON DELETE RESTRICT
* `amount` NUMERIC(12, 2) NOT NULL CHECK (amount > 0)
* `currency` TEXT NOT NULL DEFAULT 'INR'
* `provider` TEXT NOT NULL DEFAULT 'RAZORPAY'
* `provider_order_id` TEXT
* `provider_payment_id` TEXT
* `provider_signature` TEXT
* `status` payment_status NOT NULL DEFAULT 'PENDING'
* `created_at` TIMESTAMPTZ NOT NULL DEFAULT now()

### 3.10 `invoices`
Tax and billing documents.
* `id` UUID PRIMARY KEY DEFAULT gen_random_uuid()
* `rental_order_id` UUID NOT NULL REFERENCES rental_orders(id) ON DELETE RESTRICT
* `invoice_number` TEXT NOT NULL UNIQUE
* `amount` NUMERIC(12, 2) NOT NULL
* `tax_amount` NUMERIC(10, 2) NOT NULL
* `invoice_url` TEXT
* `issued_at` TIMESTAMPTZ NOT NULL DEFAULT now()

### 3.11 `deliveries`
Fulfillment and return logistics dispatch records.
* `id` UUID PRIMARY KEY DEFAULT gen_random_uuid()
* `rental_order_id` UUID NOT NULL REFERENCES rental_orders(id) ON DELETE CASCADE
* `delivery_address` TEXT NOT NULL
* `delivery_date` DATE
* `pickup_date` DATE
* `status` delivery_status NOT NULL DEFAULT 'SCHEDULED'
* `tracking_reference` TEXT
* `created_at` TIMESTAMPTZ NOT NULL DEFAULT now()

### 3.12 `notifications`
User alert and lifecycle message queue.
* `id` UUID PRIMARY KEY DEFAULT gen_random_uuid()
* `user_id` UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE
* `title` TEXT NOT NULL
* `message` TEXT NOT NULL
* `type` TEXT NOT NULL
* `read` BOOLEAN NOT NULL DEFAULT false
* `link` TEXT
* `created_at` TIMESTAMPTZ NOT NULL DEFAULT now()
