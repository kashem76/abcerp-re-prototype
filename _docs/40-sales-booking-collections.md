# Sales, Booking & Collections — Complete Specification

**Module:** Property Unit Inventory, Pricing, Booking, Payment Schedules, Collections, Cancellations, Transfers
**Code Reference:** `16-sales-booking-collections.md`
**Prototype Screens:** Booking/Inventory Grid, Booking Wizard, Cancellation, Transfer

---

## 1. Overview & Core Principle

This is the **revenue engine**. It covers the full lifecycle of property unit sales: inventory management, pricing, booking, payment scheduling, installment demands, collections, cancellations, transfers, and customer advance ledger management.

The module does NOT rebuild AR. It extends existing `SalesInvoice`, `CustomerReceipt`, and the AR subledger with real estate dimensions (`projectId`, `unitId`) — so every booking installment and collection flows through the same posting gates.

> **Non-Negotiable Core Principle:**
> _Booking advances collected from buyers are **Current Liabilities — not Revenue** (ADR-007). Revenue is recognized only when the configured accounting policy criterion is met (POC at completion %, or CC at handover). Until then, every collection increases a liability account on the Balance Sheet. One active booking per unit at a time. No exceptions._

---

## 2. Real-World Workflow

### What the Sales Team Actually Does

**Before Launch:**
1. Marketing sets unit pricing: base price/sqft + floor premium + facing premium + corner premium
2. Payment plans defined: milestone-based (20/80, 30/70) or time-based (quarterly installments)
3. Brochure and price list published

**During Sales:**
4. Customer walks in. Selects unit from inventory grid. Unit reserved temporarily (24-48 hrs configurable).
5. Booking form completed: customer details, unit selection, price calculation, discount (if any), payment plan.
6. If discount > threshold → approval workflow triggered.
7. Booking confirmed. Unit status: AVAILABLE → BOOKED. GL: DR Cash / CR Booking Advance (Liability).
8. Payment schedule auto-generated based on selected plan.

**Ongoing Collections:**
9. As milestones hit (or dates arrive), installment demands are raised → SalesInvoice in AR.
10. Customer pays → CustomerReceipt posted → AR reduced.
11. Overdue follow-up → reminder letters, phone calls, escalation.
12. Revenue recognized per policy (POC: proportional to construction progress, CC: at handover).

**Exceptions:**
13. Cancellation: forfeiture deducted, refund processed, unit released.
14. Transfer: old buyer → new buyer, settlement, new booking created.
15. Swap/Upgrade: customer moves to different unit, price difference adjusted.

---

## 3. Entity Model with Data Sources

### Property Unit

| Field | Source |
|---|---|
| Unit Code | Auto: Project-Building-Floor-Unit (e.g., GR-A-5F-01). Config: Settings > Numbering |
| Building / Floor | From ProjectBuilding / ProjectFloor |
| Type | User input: 1BHK / 2BHK / 3BHK / Studio / Penthouse / Commercial / Parking |
| Area (sqft) | User input |
| Facing | User input: North / South / East / West / Corner |
| Base Price / sqft | User input. Reference: EvaluationStudy.financialModel.sellingPrice |
| Floor Premium | Computed: floor level × premium %. Config: per-project or org default |
| Facing Premium | Computed: facing type × premium %. Config: per-project |
| Final Unit Price | Computed: (area × base price) + floor premium + facing premium |
| Status | System-managed state machine |
| Landowner Flag | Boolean: is this unit allocated to JV landowner? Source: JVAgreement.entitlementRules |

### Unit Status State Machine

```
AVAILABLE → RESERVED → BOOKED → SOLD → HANDED_OVER
                ↓          ↓
            (expires)   CANCELLED → AVAILABLE
                                    ↑
                          TRANSFERRED (old) → new booking created
```

| Transition | Trigger | Financial Event | Config Source |
|---|---|---|---|
| AVAILABLE → RESERVED | Sales team temporarily holds | None | Config: reservationExpiryHours (default 48) |
| RESERVED → AVAILABLE | Expiry or release | None | — |
| AVAILABLE/RESERVED → BOOKED | Booking confirmed | DR Cash / CR Booking Advance | — |
| BOOKED → SOLD | All installments paid | Status update only | — |
| SOLD → HANDED_OVER | Handover event | Revenue recognition (CC method) | Config: revenueMethod |
| BOOKED → CANCELLED | Cancellation processed | Forfeiture + Refund | Config: forfeiturePercent |

### Booking

| Field | Source |
|---|---|
| Booking Code | Auto-generated. Config: Settings > Numbering > Booking format |
| Unit | User selects from available units |
| Customer Name | User input or Core > Customer master |
| Customer NID / Phone / Email | User input |
| Base Price | From PropertyUnit.basePrice |
| Floor Premium | Computed. Config: per-project premium rules |
| Facing Premium | Computed. Config: per-project premium rules |
| Discount % | User input. If > threshold → approval required. Config: Settings > Approval Workflows > Booking Discount |
| Final Unit Price | Computed: (base + premiums) × (1 − discount%) |
| Payment Plan | User selects. Config: per-project payment plan templates |
| Booking Amount | Computed: final price × plan %. (e.g., 20% of total) |
| Payment Mode | User selects. Source: Core > Payment Methods |

### GL Entry for Booking

```
DR  Cash / Bank                           ৳ Booking Amount
  CR  Booking Advance — Customer (Liability)  ৳ Booking Amount

NOT revenue. This is a liability. ADR-007.
Dimensions: projectId, unitId, profitCenterId
GL Accounts: Source: Core > Chart of Accounts (seeded by industry pack)
```

### Payment Schedule (Auto-Generated)

| Field | Source |
|---|---|
| Installment # | Auto-sequential |
| Type | From plan template: Booking / Installment / On Slab / On Finishing / On Handover |
| Due Date | Computed from plan template intervals. Source: per-project payment plan config |
| Amount | Computed: total × plan percentage for this installment |
| Status | System-managed: UPCOMING → DUE → OVERDUE → PAID |

### Revenue Recognition

| Method | When Revenue Is Recognized | GL Entry | Config Source |
|---|---|---|---|
| **POC** | Proportional to construction completion % | DR AR / CR Revenue + DR COGS / CR WIP | Config: Settings > General > revenueMethod = POC |
| **CC** | At unit handover only | DR AR / CR Revenue + DR COGS / CR WIP | Config: Settings > General > revenueMethod = CC |

### Cancellation

| Field | Source |
|---|---|
| Reason | User selects: Customer Request / Default / Mutual / Other |
| Total Paid | Computed: SUM(CustomerReceipt for this booking) |
| Forfeiture % | Config: Settings > General > forfeiturePercent (default 10%) |
| Forfeiture Amount | Computed: Total Paid × forfeiturePercent |
| Refund Amount | Computed: Total Paid − Forfeiture |
| Unit Release | Auto: unit status → AVAILABLE |

**GL Entry:**
```
DR  Booking Advance — Customer              ৳ Total Paid
  CR  Cash / Bank (Refund)                     ৳ Refund Amount
  CR  Forfeiture Income (P&L)                  ৳ Forfeiture Amount

Dimensions: projectId, unitId, profitCenterId
```

---

## 4. Configuration Dependencies

| Config / Master | How Sales Uses It |
|---|---|
| Settings > General > revenueMethod | POC or CC — determines when revenue hits P&L |
| Settings > General > forfeiturePercent | Default forfeiture on cancellation |
| Settings > General > reservationExpiryHours | How long a unit can be reserved without booking |
| Settings > Numbering > Booking | Booking code format |
| Settings > Approval Workflows > Booking Discount | Discount approval chain + thresholds (>5%, >10%) |
| Settings > Approval Workflows > Cancellation | Cancellation approval chain |
| Core > Customer Master | Buyer details |
| Core > Payment Methods | Cash, Bank Transfer, Cheque, etc. |
| Core > Chart of Accounts | Booking Advance, Revenue, AR, COGS GL accounts |
| Project > PropertyUnit[] | Unit inventory with pricing |
| Project > Payment Plan Templates | Installment schedule configuration |
| Project > Price List | Base price, premiums per project |

---

## 5. Reports Fed by This Module

| # | Report | Source | Key Metrics |
|---|---|---|---|
| 60 | AR Aging | CustomerReceipt[], SalesInvoice[] | Current, 30, 60, 90, >90 day buckets |
| 61 | Sales & Booking Status | PropertyUnit[], UnitBooking[] | Available/Booked/Sold/Handed Over by project |
| 62 | Collection Efficiency | Demanded vs Collected | Demanded vs collected by period |
| 63 | Revenue Recognition | RevenueEntry[] | POC vs CC, recognized vs deferred |
| 64 | Unit Profitability | UnitCostAllocation vs Revenue | Sale price − allocated cost per unit |

---

## 6. What's Built in Prototype

| Screen | Route | Status |
|---|---|---|
| Unit Booking & Inventory Grid | `booking` | DONE — color-coded grid |
| Booking Wizard (5-step) | `booking/new` | DONE — unit → customer → price → plan → confirm |
| Booking Cancellation | `booking/cancellation` | DONE — forfeiture calc + GL preview |
| Unit Transfer | `booking/transfer` | DONE — old → new buyer + settlement |

---

_Sales is not just "book a unit and collect money." It's a financial liability chain — every collection is a promise until revenue is recognized. The system must enforce this distinction without burdening the sales team with accounting complexity._
