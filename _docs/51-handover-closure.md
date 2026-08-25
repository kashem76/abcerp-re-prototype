# Handover, Defect Liability & Project Closure — Complete Specification

**Module:** Unit Handover, Snag Management, DLP, Retention Release, Project Closure, Buyer Portal
**Code Reference:** `19-handover-defect-closure.md`
**Prototype Screens:** Handover Dashboard, Unit Handover Form, Project Closure, Buyer Portal

---

## 1. Overview & Core Principle

These are the final three lifecycle stages. They are not administrative formalities — they are the **financial culmination** of every decision since land acquisition.

- **Handover** — the buyer takes possession. Under Completed Contract method, this is the only moment revenue may be recognized.
- **DLP** — the contractual warranty window. Carries a real GL-posted provision. Contractor retention is the recovery lever.
- **Closure** — permanent seal. No further postings. The Feasibility vs Actual report is the final accountability document.

> **Non-Negotiable Core Principle:**
> _Handover is the revenue recognition trigger (CC method). DLP provision is a real balance sheet liability, not a spreadsheet note. A CLOSED project is permanently sealed — no further postings, no reopening. The Feasibility vs Actual comparison is a financial accountability document reviewed and approved by management before closure._

---

## 2. Real-World Workflow

### What Actually Happens at Handover

**2-3 Months Before Handover:**
1. Construction nears completion for a building/floor. PM triggers pre-handover inspection.
2. QA engineer conducts internal walkthrough. Creates snag list (punch list).
3. Each snag: category (Civil/Plumbing/Electrical/Painting/Flooring/Door), severity, photo, assigned to responsible contractor.
4. Contractor fixes snags. Engineer re-inspects. Marks resolved or re-assigned.

**1 Month Before:**
5. Sales team contacts buyers. Schedules buyer walkthrough.
6. Clearance checklist started: financial (all dues clear?), technical (construction complete?), legal (registration done?), utility (connections active?), municipal (OC obtained?).

**Handover Day:**
7. Buyer walkthrough. Any new snags raised by buyer added to list.
8. If critical snags remain → handover postponed.
9. If clear → key handover ceremony. Documents handed over (deed, NOC, warranty cards, manuals).
10. Customer signs handover acknowledgment.
11. Unit status: SOLD → HANDED_OVER.
12. Revenue recognition triggered (CC method).

**After Handover:**
13. DLP clock starts (Config: dlpPeriodMonths).
14. Buyer reports defects through Buyer Portal.
15. Developer assigns to contractor. Contractor fixes under warranty.
16. If contractor refuses → developer back-charges against held retention.
17. DLP expires → retention released to contractor.

### What Actually Happens at Closure

18. All units handed over. All contractor bills settled. All retentions released.
19. PM initiates closure. System runs automated checks.
20. Finance prepares final P&L. Compares against feasibility baseline.
21. Management reviews Feasibility vs Actual report. Signs off.
22. Project status → CLOSED. Sealed permanently.

---

## 3. Entity Model with Data Sources

### Unit Inspection

| Field | Source |
|---|---|
| Inspection Type | Pre-Handover / Buyer Walkthrough / Final | User selects |
| Unit | From PropertyUnit (for this project) |
| Inspector | User selects. Source: project team members |
| Date | User input |
| Result | Pass / Conditional / Fail |
| Snags Created | Auto-generated from inspection findings |

### Snag (Punch List Item)

| Field | Source |
|---|---|
| Snag Code | Auto-generated. Per-project sequential |
| Unit | From inspection |
| Category | Config: snag categories (Civil, Plumbing, Electrical, Painting, Flooring, Door/Window, Kitchen, Bathroom) |
| Severity | User selects: Critical / Major / Minor / Cosmetic |
| Description | User input |
| Photo(s) | User uploads |
| Location in Unit | User input (e.g., "Master bedroom — north wall") |
| Assigned Contractor | User selects. Source: project's active contractors. Based on who did original work |
| Status | System-managed: OPEN → ASSIGNED → IN_PROGRESS → FIXED → VERIFIED → CLOSED |
| Due Date | User input or Config: default snag resolution days |

### Handover Clearance Checklist

| Clearance | Checked By | Source of Truth |
|---|---|---|
| Financial clearance | Finance | All installments paid (AR balance = 0 for this unit) |
| Technical clearance | Engineer | Construction complete, all snags resolved |
| Legal clearance | Legal | Registration done, stamp duty paid |
| Utility clearance | Admin | Water, electricity, gas connections active |
| Municipal clearance | Admin | Occupancy Certificate obtained |
| Management clearance | PM/Director | Overall sign-off |

**Gate Rule:** Cannot hand over until all clearances are complete AND no Critical/Major open snags remain.

### Handover Event

| Field | Source |
|---|---|
| Unit | From clearance-complete unit |
| Handover Date | User input (actual date) |
| Customer | From UnitBooking.customer |
| Key Issued | Checkbox confirmation |
| Customer Signature | Digital signature capture |
| Documents Handed Over | Checklist: Deed, NOC, Warranty, Floor Plan, Parking Allotment, Utility Meter Nos. |
| Handover Certificate | Auto-generated |

### GL Entry at Handover (CC Method)

```
Revenue Recognition:
DR  Accounts Receivable — Buyer           ৳ Unit Revenue
  CR  Revenue — Unit Sales                   ৳ Unit Revenue

Cost of Sales:
DR  Cost of Sales — Project                ৳ Unit COGS (allocated cost)
  CR  Construction WIP — Project              ৳ Unit COGS

Advance Adjustment:
DR  Booking Advance — Customer (Liability)  ৳ Total Advances Collected
  CR  Accounts Receivable — Buyer              ৳ Total Advances Collected

Net AR after adjustment = Revenue − Advances = remaining dues (if any)

Dimensions: projectId, unitId, profitCenterId
GL Accounts: Source: Core > Chart of Accounts (seeded)
Unit COGS: Source: CostAllocation module — allocated construction cost per unit
```

### Defect Liability

| Field | Source |
|---|---|
| Project / Contract | From contract that completed the work |
| DLP Start | From handover date of last unit under this contract |
| DLP End | Computed: start + dlpPeriodMonths. Config: Settings > General > dlpPeriodMonths |
| Retention Held | From RetentionPayable balance for this contract |
| Provision Amount | User input or computed (typically = retention held) |
| Status | System: ACTIVE → EXPIRED → SETTLED |

### Retention Release GL

```
At Practical Completion (50% release):
DR  Retention Payable                     ৳ 50% of held retention
  CR  Accounts Payable — Contractor         ৳ 50% of held retention

At DLP Expiry (remaining 50%):
DR  Retention Payable                     ৳ Remaining retention
  CR  Accounts Payable — Contractor         ৳ Remaining retention

If contractor defaults → forfeiture:
DR  Retention Payable                     ৳ Forfeited amount
  CR  Other Income — Retention Forfeiture    ৳ Forfeited amount
```

### Project Closure — Automated Checks

| Check | Source | Must Be True |
|---|---|---|
| All units handed over | PropertyUnit[].status | All = HANDED_OVER |
| WIP balance = 0 | GL balance: WIP accounts | Zero |
| AR balance = 0 | GL balance: AR accounts | Zero |
| No open POs | PurchaseOrder[].status | All CLOSED or CANCELLED |
| No open WOs | WorkOrder[].status | All CLOSED or CANCELLED |
| All retentions released | RetentionPayable balance | Zero |
| All advances recovered | AdvanceToContractor balance | Zero |
| All DLP cases closed | DefectLiabilityCase[].status | All SETTLED or EXPIRED |
| Final P&L approved | ManagementSignoff | Signed |
| Feasibility vs Actual reviewed | ManagementSignoff | Signed |

### Feasibility vs Actual Report

```
                        Feasibility    Actual       Variance    %
Revenue                 ৳1,820M        ৳1,856M      +৳36M      +2.0%
Land Cost               ৳450M          ৳450M         ৳0         0.0%
Construction Cost       ৳716M          ৳738M        +৳22M      +3.1%
Marketing               ৳56M           ৳48M         −৳8M       −14.3%
Finance Cost            ৳84M           ৳92M         +৳8M       +9.5%
Overhead                ৳42M           ৳43M         +৳1M       +2.4%
────────────────────────────────────────────────────────────────────
Total Cost              ৳1,348M        ৳1,371M      +৳23M      +1.7%
────────────────────────────────────────────────────────────────────
Net Profit              ৳472M          ৳485M        +৳13M      +2.8%
IRR                     22.4%          23.1%        +0.7pp
Margin                  25.9%          26.1%        +0.2pp
Duration (months)       36             38           +2

Source — Feasibility column: ManagementReport.snapshot (locked at approval)
Source — Actual column: GL actuals aggregated by projectId
```

---

## 4. Configuration Dependencies

| Config / Master | How Handover/Closure Uses It |
|---|---|
| Settings > General > revenueMethod | POC or CC — determines handover GL behavior |
| Settings > General > dlpPeriodMonths | DLP duration (default 12) |
| Settings > General > retentionPercent | Retention held per contract |
| Config: snag categories | Punch list item classification |
| Config: snag resolution days | Default SLA for contractor fix |
| Config: clearance types | Which clearances required before handover |
| Core > Chart of Accounts | Revenue, COGS, WIP, AR, Retention GL accounts |
| Project > PropertyUnit[] | Unit inventory for handover tracking |
| Project > Contract[] | Contractor references for retention/DLP |
| Project > EvaluationStudy (feasibility) | Locked baseline for comparison |

---

## 5. Buyer Portal

The Buyer Portal is the customer-facing view. It shows buyers their payment status, construction progress, and handover timeline without exposing internal ERP data.

| Section | What Buyer Sees | Source |
|---|---|---|
| Payment Summary | Total, paid, outstanding, next due | PaymentSchedule + CustomerReceipt |
| Payment History | All payments with receipt numbers | CustomerReceipt[] |
| Construction Progress | Overall %, phase-wise, latest photos | ProjectPhase.completionPercent + DSR photos |
| Documents | Booking confirmation, agreement, receipts | BookingDocument[] |
| Handover Status | Clearance checklist status, expected date | HandoverClearance |
| Support | Submit query, track response | BuyerQuery[] |

---

## 6. Reports Fed by This Module

| # | Report | Source | Key Metrics |
|---|---|---|---|
| 50-51 | Handover Dashboard | Handover[], Snag[] | Units handed vs pending, snag resolution rate |
| 63 | Revenue Recognition | RevenueEntry[] | Recognized vs deferred, by method |
| 64 | Unit Profitability | UnitCostAllocation vs Revenue | Per-unit margin |
| 69 | Feasibility vs Actual | ManagementReport.snapshot vs GL | Line-by-line variance |
| 70 | Profit Erosion | Feasibility profit vs Actual | Factor-by-factor waterfall |

---

## 7. What's Built in Prototype

| Screen | Route | Status |
|---|---|---|
| Handover Dashboard | `handover` | DONE — clearance checklist, snag tracking |
| Unit Handover Form | `handover/[unitId]` | DONE — clearances → inspection → snags → key → sign-off |
| Project Closure | `closure` | DONE — automated checks, financial summary, sign-offs |
| Buyer Portal | `buyer-portal` | DONE — payment, progress, documents, support |

**Not Yet Built:**
- Structured snag management with contractor assignment and SLA tracking
- DLP registry with provision vs actual tracking
- Retention release workflow (automated at DLP expiry)
- Feasibility vs Actual report (automated comparison — prototype has the report but data is static)

---

_The end of a project is not when construction finishes. It's when the last defect is fixed, the last retention is released, and the Feasibility vs Actual report tells the honest story of what happened._
