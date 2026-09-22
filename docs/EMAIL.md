# RentWork — Transactional Email System

## 1. Provider & Architecture
RentWork integrates **Resend** for high-deliverability transactional B2B notifications.
* **Server-Only Execution**: The Resend client is initialized strictly inside server-side actions/route handlers. The `RESEND_API_KEY` is never bundled into client components.
* **Idempotency**: Notification events store log references in `public.notifications` to prevent duplicate dispatch on retries.

## 2. Notification Matrix
| Event Category | Email Trigger | Recipient | Key Data Elements |
| :--- | :--- | :--- | :--- |
| **Authentication** | Welcome / Verification | Customer / Vendor | Onboarding link, getting started guide. |
| **Rental Lifecycle** | Rental Requested | Customer | Order #, item summary, dates, approval pending alert. |
| **Rental Lifecycle** | Request Received | Vendor Admin | Client company, requested items, dates, link to approve. |
| **Rental Lifecycle** | Rental Approved | Customer | Payment link, approval confirmation, schedule details. |
| **Payment** | Payment Received | Customer & Vendor | Razorpay receipt ID, GST tax invoice download link. |
| **Fulfillment** | Dispatched / Delivery | Customer | Scheduled delivery date, driver/tracking contact. |
| **Return** | 7-Day Return Reminder | Customer | Scheduled end date, extension options, return checklist. |
| **Return** | Inspection & Settlement | Customer | Condition report, deposit refund amount, settlement summary. |

## 3. Email Component Structure
```text
emails/
├── components/
│   ├── EmailHeader.tsx       # RentWork B2B logo & header styling
│   ├── OrderSummaryTable.tsx # Line items, dates, and amounts
│   └── EmailFooter.tsx       # Support contact, GST details, unsub
├── WelcomeEmail.tsx
├── RentalRequestedEmail.tsx
├── RentalApprovedEmail.tsx
├── PaymentSuccessfulEmail.tsx
└── ReturnReminderEmail.tsx
```
