# RentWork — System Architecture

## 1. High-Level Architecture Overview

RentWork is architected as a secure, full-stack B2B marketplace application leveraging Next.js App Router conventions with TypeScript, Tailwind CSS, Supabase (PostgreSQL, Auth, Storage), Resend (transactional email), and Razorpay (payment processing).

```
┌────────────────────────────────────────────────────────┐
│                   Client Tier (Browser)                │
│  - Server Components (SSR / RSC for fast initial load) │
│  - Client Components (Interactive form inputs/tabs)   │
│  - Lucide React Icons & Tailwind Responsive Styling   │
└─────────────────────────┬──────────────────────────────┘
                          │ HTTPS / JSON
                          ▼
┌────────────────────────────────────────────────────────┐
│                   Next.js Application Tier             │
│  - Server Actions (Secure Mutations & Form Submissions)│
│  - Route Handlers (/api/webhooks, /api/auth)           │
│  - Server-side Session & Permission Middleware         │
│  - Zod Input & Output Validation Engine                │
│  - Core Rental Calculation & Overlap Evaluation Engine │
└─────────────┬──────────────────────────┬───────────────┘
              │ Direct Service Access     │ Webhooks / API
              ▼                          ▼
┌───────────────────────────┐  ┌─────────────────────────┐
│     Supabase Platform     │  │   Third-Party Services  │
│  - PostgreSQL 15+         │  │  - Resend (Email)       │
│  - Row Level Security     │  │  - Razorpay (Payments)  │
│  - Supabase Auth (OAuth)  │  └─────────────────────────┘
│  - Supabase Storage       │
└───────────────────────────┘
```

## 2. Component Boundaries & Responsibilities

### 2.1 Server Components vs. Client Components
* **Server Components (Default)**:
  - Data fetching directly from Supabase server clients.
  - Initial layout rendering, metadata injection, and SEO tags.
  - Prevents leaking server tokens, secrets, or internal table schemas to the DOM.
* **Client Components (`'use client'`)**:
  - Interactive widgets (date pickers, quantity selectors, filter menus).
  - Client-side form validation feedback with React Hook Form + Zod.
  - Dynamic client state (e.g. mobile navigation drawer toggle).

### 2.2 Server Actions & Route Handlers
* **Server Actions**:
  - Used for authenticated state mutations (creating rental requests, updating inventory, updating company profiles).
  - Strict input validation via Zod schemas prior to database operations.
  - Enforces session identity extraction from `auth.getUser()`, never from request payloads.
* **Route Handlers**:
  - Used for external webhooks requiring raw signature verification (Razorpay webhooks at `/api/webhooks/razorpay`).
  - OAuth callback handlers (`/auth/callback`).

## 3. Directory Structure
```text
app/
├── (marketing)/           # Public landing, product discovery, how it works
│   ├── page.tsx
│   └── layout.tsx
├── (auth)/                # Authentication views (login, register, forgot-password)
│   ├── login/
│   ├── register/
│   └── callback/
├── dashboard/             # Customer management portal
├── company/               # Rental vendor inventory & rental management portal
├── admin/                 # Platform administration portal
└── api/                   # Webhook and external integration endpoints

components/
├── ui/                    # Reusable shadcn/ui primitives (button, badge, card, etc.)
├── layout/                # Shell components (navbar, footer, sidebar)
├── shared/                # Global shared components (empty-state, error-state, loading)
├── marketing/             # Landing page sections
├── products/              # Product cards, grids, image galleries
└── rentals/               # Rental calendars, request forms, status chips

lib/
├── supabase/              # Browser, Server, and Middleware Supabase clients
├── validations/           # Zod schema definitions (auth, products, rentals)
├── pricing/               # Rental duration calculation, tiered rate formulas
├── email/                 # Resend integration and dispatch helpers
└── utils.ts               # Class merging (`cn`), formatting helpers

actions/                   # Type-safe Server Actions for mutations
types/                     # TypeScript definitions (database schema, domain models)
supabase/                  # Database migrations and seed scripts
docs/                      # Single source of truth architectural documentation
```

## 4. Key Architectural Invariants
1. **Never Trust the Client**: Inventory availability, unit prices, tenant IDs, and user roles are always verified and recalculated on the server.
2. **Database-Enforced Multi-Tenancy**: Supabase Row Level Security (RLS) protects all sensitive tables. No application code relies solely on application-level `WHERE` clauses.
3. **Auditability**: All critical rental status changes, payments, and inventory adjustments generate immutable log entries.
