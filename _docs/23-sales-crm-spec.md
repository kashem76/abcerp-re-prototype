# Sales CRM & Pre-Booking Pipeline — Complete Specification

**Module:** Lead Capture, Follow-up, Site Visit, Quotation, Reservation, Broker Management, Sales Funnel
**Gap Reference:** Doc 22, Gap Group C (G14-G21)
**Connects To:** Doc 14 (Sales, Booking & Collections) — CRM feeds into the existing booking workflow
**Priority:** P0 — biggest blind spot. Every developer has a sales team working leads before booking.

---

## 1. Overview & Core Principle

The existing Sales module starts at **booking** — when a buyer has already decided to purchase. But in reality, 90% of the sales team's work happens **before** booking: capturing inquiries, following up, scheduling site visits, presenting quotations, negotiating discounts, managing brokers, and converting interest into commitment.

Without a pre-booking pipeline, the developer cannot answer:
- "How many inquiries did we get this month?" (marketing ROI)
- "How many leads converted to bookings?" (sales effectiveness)
- "Which broker brings the most business?" (channel management)
- "Why did we lose that buyer?" (competitive intelligence)
- "How full is our pipeline?" (revenue forecasting)

The CRM is not a separate product. It's the **front half** of the sales module. Lead → Follow-up → Site Visit → Quotation → Reservation → Booking → Payment → Handover. One continuous chain.

> **Non-Negotiable Core Principle:**
> _The CRM is the top of the revenue funnel. Every rupee of revenue starts here — as a phone call, a walk-in, or a broker referral. If this data isn't captured, marketing spend is untrackable, sales performance is unmeasurable, and revenue forecasting is guesswork. The CRM must be lightweight enough that sales executives actually use it (not a heavy form), but structured enough that management can analyze the pipeline._

---

## 2. Real-World Workflow

### What the Sales Team Actually Does (Every Day)

```
8:00 AM   Sales executive opens "My Leads" dashboard.
          → 3 follow-ups due today, 1 site visit scheduled, 2 new walk-ins yesterday

8:30 AM   Phone call from a broker: "I have a buyer for 3-bed in Tower A."
          → Create lead: source = Broker (Ahmed & Associates), interested in 3-bed
          → Auto-assign to the sales exec covering Tower A

9:00 AM   Follow up call #1: Mr. Hasan (lead from last week).
          → Called. Interested but wants to see the site first.
          → Log follow-up: "Wants site visit. Wife also needs to come."
          → Schedule site visit for Saturday 10 AM

9:30 AM   Walk-in customer: Mr. Rahman walks into sales office.
          → Create lead: source = Walk-in, interested in 2-bed, budget ৳70-80L
          → Show available units on inventory grid
          → Generate quotation: Unit 7A, 1,450 sqft, ৳14,500/sqft = ৳21.025M
          → Customer takes quotation home. Valid for 7 days.

10:00 AM  Site visit with Mrs. Begum (scheduled earlier).
          → Walk through model apartment. She likes it.
          → Record site visit feedback: "Positive. Wants corner unit."
          → She asks to reserve Unit 9C for 48 hours.
          → Reserve unit → status: AVAILABLE → RESERVED (expires 48hrs)

10:30 AM  Mrs. Begum decides to book.
          → Convert reservation to booking (existing booking wizard)
          → CRM lead status: CONVERTED

11:00 AM  Review broker pipeline.
          → Ahmed & Associates brought 8 leads this quarter, 2 converted
          → Commission: ৳50,000 per converted booking (from agreement)
          → 2 × ৳50,000 = ৳100,000 pending payout

12:00 PM  Sales Head reviews the funnel:
          → 45 active leads, 12 site visits this month, 8 quotations, 3 bookings
          → Conversion rate: Lead → Booking = 6.7%
          → Average time from lead to booking: 18 days
          → Top source: Digital ads (35%), Broker (30%), Walk-in (25%), Referral (10%)
```

---

## 3. Sales Funnel Stages

```
INQUIRY           Customer contacts us (phone, walk-in, digital, broker)
    ↓
FOLLOW-UP         Sales executive contacts customer (call, WhatsApp, email)
    ↓
SITE VISIT        Customer visits site / model apartment
    ↓
QUOTATION         Formal price quote given (unit, price, payment plan)
    ↓
NEGOTIATION       Discount discussion, payment plan adjustment
    ↓
RESERVATION       Unit temporarily held (24-72 hours, configurable)
    ↓
BOOKING           Formal booking with payment (→ existing booking wizard)
    ↓
LOST              Didn't convert (reason captured for analysis)
```

### Stage Transition Rules

| Transition | Trigger | What Happens |
|---|---|---|
| → INQUIRY | New lead created | Lead appears in sales exec's queue |
| INQUIRY → FOLLOW_UP | First contact attempt logged | Follow-up task created |
| FOLLOW_UP → SITE_VISIT | Site visit scheduled | Calendar event created, notification sent |
| SITE_VISIT → QUOTATION | Quotation generated | PDF quote created, validity timer starts |
| QUOTATION → NEGOTIATION | Customer requests discount/change | Modified quote created |
| NEGOTIATION → RESERVATION | Customer wants to hold unit | Unit status: AVAILABLE → RESERVED. Timer starts. Config: reservationExpiryHours |
| RESERVATION → BOOKING | Reservation converted | Links to existing booking wizard (Doc 14) |
| Any → LOST | Lead didn't convert | Lost reason captured. Unit released if reserved. |

---

## 4. Entity Model with Data Sources

### Sales Lead

| Field | Source | Config/Master |
|---|---|---|
| Lead Code | Auto-generated | Config: Settings > Numbering (SL-{YYYY}-{SEQ:5}) |
| Customer Name | User input | — |
| Phone / Email | User input | — |
| Source | User selects | Config: Lead Source types (Walk-in, Phone, Digital, Broker, Referral, Event, Re-inquiry) |
| Source Detail | User input | If broker: which broker. If digital: which campaign/portal |
| Interested Project | User selects | From: RealEstateProject[] |
| Interested Unit Type | User selects | 1-BHK, 2-BHK, 3-BHK, Penthouse, Commercial |
| Budget Range | User input | Min-Max amount |
| Preferred Floor/Facing | User input | High/Mid/Low floor; N/S/E/W facing |
| Assigned To | Auto or manual | Config: lead assignment rules (round-robin, area-based, manual) |
| Stage | System-managed | INQUIRY → FOLLOW_UP → SITE_VISIT → QUOTATION → NEGOTIATION → RESERVATION → BOOKING → LOST |
| Priority | User or system | Hot / Warm / Cold (based on engagement recency) |
| Broker ID | If source = Broker | Master: Broker/Agent master |
| Created Date | Auto | — |
| Last Activity Date | Auto: updated on every follow-up/visit/quote | — |
| Expected Booking Date | User input | For pipeline forecasting |
| Lost Reason | User selects (if LOST) | Config: Lost reasons (Too Expensive, Competitor, Location, Financing, Delayed, Not Serious, Other) |

### Follow-Up Log

| Field | Source |
|---|---|
| Lead ID | From lead |
| Type | User selects: Phone Call, WhatsApp, Email, In-Person, SMS |
| Date/Time | User input or auto (now) |
| Notes | User input (free text) |
| Outcome | User selects: Interested, Not Interested, Call Back Later, No Answer, Wants Site Visit, Ready to Book |
| Next Follow-Up Date | User input (creates reminder) |
| Logged By | Auto: current user |

### Site Visit

| Field | Source |
|---|---|
| Lead ID | From lead |
| Visit Date/Time | User input (scheduled) |
| Actual Visit | Boolean: did they show up? |
| Accompanied By | User selects: which sales exec |
| Units Shown | User selects from project inventory |
| Feedback | User input: Positive / Neutral / Negative + notes |
| Objections | User input: what concerns did they raise? |
| Next Step | User selects: Send Quotation / Follow Up / Not Interested |
| Photos | Optional: photos of the visit/model apartment |

### Quotation

| Field | Source |
|---|---|
| Quotation Code | Auto-generated. Config: Settings > Numbering |
| Lead ID | From lead |
| Project | From lead.interestedProject |
| Unit | User selects from available units |
| Base Price / sqft | From PropertyUnit.basePrice. Source: project price list |
| Floor Premium | Computed. Config: per-project premium rules |
| Facing Premium | Computed. Config: per-project premium rules |
| Discount % | User input. If > threshold → flag (no approval needed at quote stage) |
| Final Price | Computed: (base + premiums) × (1 − discount) |
| Payment Plan | User selects from project payment plan templates |
| Installment Schedule | Auto-computed from plan template |
| Valid Until | Auto: today + validityDays. Config: Settings > Sales > quotationValidityDays (default 7) |
| Status | ACTIVE → EXPIRED → CONVERTED → SUPERSEDED |
| PDF Generated | Auto: quotation PDF with company letterhead |

### Reservation

| Field | Source |
|---|---|
| Lead ID | From lead |
| Unit ID | From quotation |
| Reserved At | Auto: now |
| Expires At | Computed: now + reservationExpiryHours. Config: Settings > Sales > reservationExpiryHours (default 48) |
| Reservation Fee | User input (optional token — some developers charge a small amount) |
| Status | ACTIVE → CONVERTED (to booking) → EXPIRED → CANCELLED |
| Auto-Release | System: if expires and not converted, unit status reverts to AVAILABLE |

### Broker / Agent

| Field | Source |
|---|---|
| Broker Code | Auto-generated |
| Company Name | User input |
| Contact Person | User input |
| Phone / Email | User input |
| RERA License (UAE) | User input. Required in UAE market |
| Commission Structure | User selects: Fixed Amount / Percentage of Sale / Tiered |
| Commission Rate | User input: ৳ or % |
| Agreement Date | User input |
| Agreement Expiry | User input |
| Status | Active / Inactive / Suspended |
| Total Leads Referred | Computed: COUNT(leads where source = this broker) |
| Total Conversions | Computed: COUNT(leads where stage = BOOKING and broker = this) |
| Conversion Rate | Computed: conversions / leads × 100 |
| Pending Commission | Computed: SUM(unpaid commission for converted leads) |
| Commission Paid | Computed: SUM(paid commission) |

### Broker Commission

| Field | Source |
|---|---|
| Booking ID | From converted booking |
| Broker ID | From lead.brokerId |
| Commission Amount | Computed: booking value × commission rate. Source: Broker.commissionRate |
| Status | PENDING → APPROVED → PAID |
| Approved By | Config: Settings > Approval Workflows > Broker Commission |
| Payment Reference | From Finance payment |

**GL Entry for Broker Commission:**
```
DR  Sales Commission Expense (P&L)        ৳ Commission Amount
  CR  Accounts Payable — Broker              ৳ Commission Amount

Dimensions: projectId, profitCenterId
GL Account: Source: Config > Sales > commissionExpenseAccount
```

---

## 5. Business Rules

### Lead Management
- Every lead must have: customer name, phone, source, interested project. All other fields optional.
- Lead assignment can be: round-robin (auto), area-based (by project), or manual. Config: Settings > Sales > leadAssignmentMethod.
- A lead with no activity for X days is auto-marked as "Cold." Config: Settings > Sales > coldLeadDays (default 14).
- When a lead converts to booking, the lead status becomes BOOKING and links to UnitBooking.
- Lost leads must capture a reason. This feeds the "Lost Lead Analysis" report.

### Follow-Up
- Creating a follow-up with "Next Follow-Up Date" creates a task in the sales exec's My Work / calendar.
- Overdue follow-ups (past next-follow-up date) are highlighted on the dashboard.
- Minimum follow-up frequency: configurable. Config: Settings > Sales > minFollowUpDays (default 3).

### Quotation
- A quotation references a specific unit + price + payment plan. It's a snapshot — if the price list changes, existing quotations retain their original price.
- Quotations expire after configurable days. Expired quotations cannot be converted — a new one must be created.
- Multiple quotations can exist for the same lead (different units, different prices). Only one can be active.
- Quotation does NOT reserve the unit. Reservation is a separate action.

### Reservation
- Reservation temporarily blocks the unit (status: RESERVED). Other sales execs see it as unavailable.
- Reservation expires automatically after configurable hours. System releases the unit if not converted.
- Only one active reservation per unit. If a unit is already reserved, another buyer cannot reserve it.
- Reservation can be manually cancelled by the sales exec or Sales Head.
- Optional: reservation fee (token amount). If collected, posted as: DR Cash / CR Reservation Deposit (Liability). Adjusted against booking payment.

### Broker
- Broker commission is calculated on booking conversion, not on lead creation.
- Commission is approved through approval workflow before payment. Config: Settings > Approval Workflows > Broker Commission.
- Commission rates can be: per-unit fixed amount, % of unit price, or tiered (different rates for different unit types/values).
- A broker can refer leads to multiple projects. Commission structure can be per-project or org-level.

---

## 6. Configuration Dependencies

| Config / Master | How Sales CRM Uses It |
|---|---|
| Settings > Numbering > Sales Lead | Lead code format |
| Settings > Numbering > Quotation | Quotation code format |
| Settings > Sales > leadAssignmentMethod | Round-robin / area-based / manual |
| Settings > Sales > coldLeadDays | Days of inactivity before lead marked cold |
| Settings > Sales > quotationValidityDays | How long a quotation is valid |
| Settings > Sales > reservationExpiryHours | How long a reservation holds |
| Settings > Sales > minFollowUpDays | Minimum days between follow-ups |
| Settings > Approval Workflows > Broker Commission | Commission approval chain |
| Config: Lead Source types | Walk-in, Phone, Digital, Broker, Referral, Event |
| Config: Lost Reason types | Too Expensive, Competitor, Location, Financing, etc. |
| Config: Lead Priority rules | Hot/Warm/Cold based on engagement |
| Project > Price List | Unit prices for quotation |
| Project > Payment Plan Templates | Installment plans for quotation |
| Project > PropertyUnit[] | Available units for quotation/reservation |
| Master: Broker/Agent | Broker details, commission structure |

---

## 7. Reports & Dashboards

### Sales Funnel Dashboard

```
SALES FUNNEL — Gulshan Residence — August 2026

Inquiry        ████████████████████████████████████     45
Follow-Up      ██████████████████████████                32
Site Visit     ██████████████████                        18
Quotation      ████████████                              12
Negotiation    ████████                                   8
Reservation    ██████                                     6
Booking        ████                                       4
Lost           ████████                                   8

Conversion Rate: Lead → Booking = 8.9%
Average Days: Lead → Booking = 18 days
```

### Reports Fed by This Module

| Report | Source | Key Metrics |
|---|---|---|
| Lead Register | SalesLead[] | All leads with status, source, assigned to |
| Lead Source Analysis | SalesLead[].source | Leads per source, conversion rate per source |
| Sales Funnel | SalesLead[].stage | Count per stage, conversion rates between stages |
| Follow-Up Compliance | FollowUpLog[] | Overdue follow-ups, average response time |
| Site Visit Report | SiteVisit[] | Visits scheduled vs completed, feedback summary |
| Quotation Report | Quotation[] | Active, expired, converted quotations |
| Broker Performance | Broker[], SalesLead[] | Leads, conversions, commission per broker |
| Lost Lead Analysis | SalesLead[].lostReason | Why leads don't convert — competitive intelligence |
| Sales Executive Performance | SalesLead[].assignedTo | Leads, follow-ups, conversions per person |
| Revenue Pipeline | Quotation[].finalPrice where active | Expected revenue from active quotations |

---

## 8. Screen Inventory

| # | Screen | Route (proposed) | What It Shows |
|---|---|---|---|
| 1 | Sales Dashboard / Funnel | `sales/dashboard` | Funnel visualization, KPIs, today's tasks |
| 2 | Lead List | `sales/leads` | All leads with filters (stage, source, assigned, project) |
| 3 | Add Lead | `sales/leads/new` | Quick form: name, phone, source, project, unit type |
| 4 | Lead Detail | `sales/leads/[id]` | Timeline (follow-ups, visits, quotes), actions |
| 5 | Follow-Up Log | Inside lead detail | Add/view follow-up entries |
| 6 | Schedule Site Visit | Inside lead detail | Date, time, units to show |
| 7 | Generate Quotation | `sales/leads/[id]/quote` | Unit selection, pricing, payment plan, PDF |
| 8 | Reserve Unit | Inside lead detail | Select unit, set expiry, optional fee |
| 9 | Convert to Booking | Inside lead detail | Links to existing booking wizard |
| 10 | Broker List | `sales/brokers` | All brokers with performance, commission |
| 11 | Broker Detail | `sales/brokers/[id]` | Leads referred, conversions, commission status |
| 12 | Broker Commission Approval | `sales/brokers/[id]/commission` | Pending commissions, approve/reject |

---

## 9. Integration with Existing Modules

```
SALES CRM (this spec)
    │
    ├──► Booking Wizard (Doc 14)
    │     Lead converts → booking wizard pre-filled with lead data
    │     Quotation price carries forward (no re-entry)
    │
    ├──► Property Unit Inventory (Doc 14)
    │     Reservation changes unit status: AVAILABLE → RESERVED
    │     Booking changes: RESERVED → BOOKED
    │     CRM reads unit availability for quotation
    │
    ├──► Finance / AP (Core)
    │     Broker commission posts to AP
    │     Reservation fee posts as liability
    │
    ├──► Reporting (Doc 18)
    │     Funnel data feeds Sales Dashboard
    │     Lead source feeds Marketing ROI reports
    │
    └──► Project > Price List
          Quotation reads current pricing
          Quotation is a SNAPSHOT — price changes don't affect existing quotes
```

---

_The CRM is where revenue starts. Without it, the sales team works in WhatsApp and Excel, and management has no visibility into the pipeline. With it, every inquiry is tracked, every follow-up is reminded, every broker is accountable, and the funnel tells you exactly how healthy your revenue pipeline is._
