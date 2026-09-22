# RentWork — API & Server Actions Specification

## 1. Architectural Strategy
RentWork utilizes Next.js Server Actions for authenticated client mutations and standard REST Route Handlers (`/api/*`) for webhooks and machine-to-machine integrations.

## 2. Server Actions Contract

### 2.1 Auth Actions (`actions/auth.ts`)
* `signInWithEmail(credentials: SignInInput)`: Validates credentials via Supabase Auth, redirects on success.
* `signUpWithEmail(credentials: SignUpInput)`: Registers user, creates profile row via DB trigger.
* `signOut()`: Terminates active session.
* `signInWithOAuth(provider: 'google' | 'azure')`: Generates OAuth consent URL with state token.

### 2.2 Product Actions (`actions/products.ts`)
* `createProduct(companyId: string, data: CreateProductInput)`: Enforces `COMPANY_ADMIN` role and company membership.
* `updateProduct(productId: string, data: UpdateProductInput)`: Updates pricing, fleet count, description.
* `checkProductAvailability(productId: string, startDate: string, endDate: string, quantity: number)`: Runs overlapping window query.

### 2.3 Rental Actions (`actions/rentals.ts`)
* `createRentalRequest(data: CreateRentalOrderInput)`: Calculates server-side subtotal, verifies inventory, commits `rental_orders` record.
* `updateRentalStatus(orderId: string, status: RentalStatus)`: Enforces role-based state machine transition.
* `requestRentalReturn(orderId: string)`: Customer triggers pickup workflow.

### 2.4 Payment Actions (`actions/payments.ts`)
* `createRazorpayOrder(rentalOrderId: string)`: Generates Razorpay order against server-verified total.
* `verifyRazorpayPayment(payload: PaymentVerificationInput)`: Verifies HMAC SHA-256 signature and advances rental to `CONFIRMED`.

## 3. Webhook Route Handlers

### 3.1 Razorpay Webhook (`/api/webhooks/razorpay`)
* Method: `POST`
* Headers: `x-razorpay-signature`
* Handler:
  - Verifies webhook secret signature against raw payload buffer.
  - Handles `payment.captured`, `payment.failed`, and `refund.processed`.
  - Idempotent: checks if payment ID is already settled before updating status.
