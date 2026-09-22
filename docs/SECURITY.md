# RentWork — Security Rules & Guidelines

## 1. Secrets & Environment Isolation
1. **Never Expose Private Keys to the Browser**:
   * `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, and `RAZORPAY_KEY_SECRET` must NEVER have a `NEXT_PUBLIC_` or `VITE_` prefix and must NEVER be imported into client components.
2. **Client-Safe Variables**:
   * Only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are safe for browser exposure.

## 2. Input Validation & Zod Enforcements
* Every Server Action and API Route Handler must validate incoming payloads with strict Zod schemas.
* Strip unrecognized fields via `.strict()` or `.strip()`.
* Sanitize all free-text fields (product descriptions, company addresses) against XSS injection.

## 3. Database Security & Row Level Security (RLS)
* **RLS Enabled on Every Table**: No table in `public` schema may omit Row Level Security.
* **Service Role Restraint**: The service role client is only utilized for background jobs or specific administrative operations that bypass user contexts. All user-triggered mutations run through the user's authenticated Supabase client.
* **Security Definer Functions**: Triggers (such as `handle_new_user`) execute with `SECURITY DEFINER` and have a strictly pinned `search_path = public`.

## 4. Financial & Inventory Defenses
* **No Client Pricing**: Unit prices, line subtotals, deposits, and tax totals sent from the browser are disregarded.
* **Temporal Overlap Query Enforcement**: Stock availability is locked and verified within database transactions to eliminate race conditions and double-booking.
* **Webhook Signature Verification**: Webhooks from Razorpay must strictly check HMAC SHA-256 signatures before modifying any order status.
