# RentWork — Product Requirements Document (PRD)

## 1. Product Overview
RentWork is a B2B rental marketplace that allows companies to rent business equipment and commercial furniture instead of purchasing them.

Target items include:
* Office chairs & ergonomic seating
* Office tables, desks, and height-adjustable workstations
* Conference room equipment, AV projectors, and presentation displays
* Monitors, enterprise laptops, and workstations
* Commercial printers and multi-function copiers
* Event furniture and temporary booth setups
* Commercial storage equipment and filing systems
* Modular temporary office equipment for pop-up branches

The platform connects businesses that need equipment with verified rental partners that own and service commercial inventory.

## 2. Problem Statement
Businesses frequently require equipment temporarily due to:
* Rapid team scaling and new office locations
* Short-term client projects (3–12 months)
* Corporate events, conferences, and exhibitions
* Seasonal spikes in operational staff
* Capital expenditure (CapEx) constraints where cash preservation is critical
* Asset disposal hassles when equipment becomes obsolete or unneeded

Purchasing outright causes high upfront financial lock-in, depreciation losses, and logistics burdens. RentWork transforms these heavy capital expenses into predictable, tax-efficient operational expenses (OpEx).

## 3. Target User Personas & Roles

### 3.1 Customer (Client Business)
Company representatives (Office Managers, Procurement Officers, Operations Leads, Founders) who lease equipment.
* Capabilities:
  - Browse and search verified catalog with filters (category, condition, location, rental tenure).
  - Check real-time date availability based on overlapping reservations.
  - Choose rental tenure (daily, weekly, monthly) with dynamic duration discounts.
  - Manage a multi-item rental basket.
  - Submit rental requests with delivery location details.
  - Authorize payments securely via Razorpay.
  - Track active rentals, delivery schedules, and pickup timelines.
  - Request lease extensions or early returns.
  - Access GST-compliant digital invoices and security deposit reconciliations.

### 3.2 Company Admin / Staff (Rental Partner / Vendor)
Verified rental businesses that supply and service commercial inventory.
* Capabilities:
  - Maintain company profile, business registration, and bank details.
  - Manage product listings with specifications, tiered pricing, and high-res imagery.
  - Track real-time inventory levels, maintenance schedules, and asset condition.
  - Review, approve, or decline incoming rental requests based on availability.
  - Coordinate dispatch, delivery logistics, and return pickups.
  - Record return condition inspections (Good, Damaged, Missing) and calculate deductions.
  - View settlement reports, payout histories, and revenue metrics.

### 3.3 Platform Admin (RentWork Operator)
RentWork platform staff managing marketplace health, trust, and operations.
* Capabilities:
  - Onboard and verify vendor companies (KYC/KYB document verification).
  - Curate global taxonomy (categories, subcategories, product attributes).
  - Monitor platform-wide rental orders, dispute resolutions, and payment escrow.
  - Access platform analytics (GMV, take-rate, utilization rates, churn).
  - Configure global platform parameters (default deposit multipliers, tax rates).

## 4. Core Rental Lifecycle
1. **Catalog Search & Reservation**: Customer selects product, quantity, start date, and end date.
2. **Server Availability Validation**: System ensures quantity is available for the non-overlapping window.
3. **Rental Request Submission**: Order created with status `REQUESTED`.
4. **Partner Review**: Rental partner reviews logistics and accepts (`APPROVED`) or declines (`CANCELLED`).
5. **Payment Authorization**: Customer receives payment link; upon successful capture, status transitions to `CONFIRMED`.
6. **Fulfillment & Dispatch**: Partner dispatches equipment (`OUT_FOR_DELIVERY`).
7. **Active Lease**: Delivery confirmed via delivery acknowledgment; status transitions to `ACTIVE`.
8. **Return & Inspection**: Customer requests return (`RETURN_REQUESTED`) or lease ends; equipment is retrieved (`RETURNED`) and inspected (`INSPECTED`).
9. **Settlement**: Security deposit refunded after deducting any verified damages; order marked `COMPLETED`.

## 5. Rental Status State Machine
```
REQUESTED ──> APPROVED ──> PAYMENT_PENDING ──> CONFIRMED ──> OUT_FOR_DELIVERY ──> ACTIVE
     │                                                                                │
     └──> CANCELLED                                                                   ├──> RETURN_REQUESTED ──> RETURNED ──> INSPECTED ──> COMPLETED
                                                                                      │                                           │
                                                                                      └──> OVERDUE                                └──> DAMAGED
```

## 6. Pricing Structure & Security Deposits
* **Tiered Base Rates**: Daily, weekly, and monthly rates configured per product.
* **Security Deposit**: Refundable deposit calculated based on product value and duration. Held in escrow during the lease.
* **Logistics Fees**: Calculated based on item weight, volume, and delivery pincode distance.
* **Applicable Taxes**: Standard GST calculated dynamically on rental subtotal and logistics fees.

## 7. Technical Quality Gates
* Real-time availability verified strictly server-side.
* Zero trust of client-side pricing or inventory availability.
* Strict database-level Row Level Security (RLS) for all multi-tenant boundaries.
