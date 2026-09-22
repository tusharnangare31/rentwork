# RentWork — Payments & Escrow Engine

## 1. Provider & Security Strategy
RentWork utilizes **Razorpay** as the primary payment processor for Indian B2B transactions, supporting:
* Corporate NetBanking & UPI
* Corporate Credit Cards & Debit Cards
* NEFT/RTGS virtual account transfers for high-ticket orders

### 1.1 Invariants
* **Zero Client Trust**: Payment amounts, order IDs, and currency codes are created exclusively on the server.
* **Server-side Signature Verification**: Razorpay payment signatures (`razorpay_signature`) are verified using HMAC SHA-256 with the server-only `RAZORPAY_KEY_SECRET`.
* **Idempotency**: Orders cannot be double-credited or transitioned twice.

## 2. Payment Flow Sequence
```
1. Customer Submits Order Request (Status: REQUESTED)
                   │
2. Vendor Approves Order (Status: APPROVED / PAYMENT_PENDING)
                   │
3. Server Generates Razorpay Order via Server Action
   (POST https://api.razorpay.com/v1/orders with amount in paise)
                   │
4. Razorpay Checkout Modal rendered on Client
                   │
5. Client submits payment confirmation (payment_id, order_id, signature)
                   │
6. Server Action verifies HMAC SHA-256 signature
   expected_signature = hmac_sha256(order_id + "|" + payment_id, secret)
                   │
   ┌───────────────┴───────────────┐
   ▼ Valid                         ▼ Invalid
Status -> CONFIRMED             Reject & Flag Security Alert
Record in `payments` table
Trigger Tax Invoice Generation
```

## 3. Security Deposit Accounting
Security deposits are recorded as separate balance items in `payments` and `rental_orders`. They are kept in escrow and reconciled at the conclusion of the rental after physical item inspection.
