# RentWork — Rental Engine Specification

## 1. Engine Objective
The Rental Engine is the core domain logic layer of RentWork. It executes two mission-critical tasks:
1. **Mathematical Availability Verification**: Ensuring no overbooking occurs across overlapping temporal spans.
2. **Tiered Pricing Calculation**: Computing exact rental line subtotals, security deposits, logistics fees, taxes, and total payable amounts.

## 2. Temporal Availability & Overlap Logic
Standard inventory tracking (subtracting quantities upon order placement) fails in rental systems because inventory returns back into circulation upon lease expiration.

### 2.1 The Overlap Theorem
Two time intervals `[Start_A, End_A]` and `[Start_B, End_B]` overlap if and only if:
```
Start_A <= End_B AND End_A >= Start_B
```

### 2.2 Reserved Quantity Aggregation
For any candidate product `P` with total physical fleet size `Total_Qty(P)`:
```sql
SELECT COALESCE(SUM(ri.quantity), 0) AS reserved_quantity
FROM rental_items ri
JOIN rental_orders ro ON ro.id = ri.rental_order_id
WHERE ri.product_id = $product_id
  AND ro.status IN ('APPROVED', 'CONFIRMED', 'OUT_FOR_DELIVERY', 'ACTIVE')
  AND ro.start_date <= $requested_end_date
  AND ro.end_date >= $requested_start_date;
```
Available quantity is then computed:
```
Available_Qty = Total_Qty(P) - Reserved_Qty
```
If `Requested_Qty > Available_Qty`, the rental request is strictly rejected with code `INSUFFICIENT_INVENTORY`.

## 3. Tiered Duration Pricing Strategy
Rentals span varying periods. The engine optimizes pricing into combinations of months (30-day blocks), weeks (7-day blocks), and individual days to deliver optimal B2B volume pricing.

### 3.1 Rate Optimization Algorithm
For duration `D` days:
1. `Months = floor(D / 30)`
2. `RemainingDaysAfterMonths = D % 30`
3. `Weeks = floor(RemainingDaysAfterMonths / 7)`
4. `Days = RemainingDaysAfterMonths % 7`

The base rental subtotal is calculated as:
```
Subtotal = (Months * monthly_price) + (Weeks * weekly_price) + (Days * daily_price)
```
Where applicable, the engine evaluates whether paying for a full week is cheaper than paying for `N` individual days (e.g. 5 days at daily rate vs 1 week rate).

## 4. Total Order Formula
```
Order Total = Base Subtotal
            + Security Deposit (Escrow)
            + Delivery & Logistics Fee
            + GST (18% on Subtotal + Delivery Fee)
```
* Note: Security deposits do not attract GST since they are refundable principal balances held in trust.

## 5. Security & Invariant Rules
* **Zero Client Calculation Trust**: The client supplies solely `product_id`, `quantity`, `start_date`, and `end_date`.
* The server reads rates directly from the database and runs the pricing formula inside an isolated calculation module (`lib/pricing/engine.ts`).
