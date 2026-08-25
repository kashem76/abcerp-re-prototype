# Contractor Management — Complete Specification

**Module:** Tendering, Contracts, Work Orders, Running Bills, Retention, Advance Recovery
**Code Reference:** `13-contractor-management.md`
**Prototype Screens:** Tender/CS, Create Tender, Contract Entry, Work Order, Running Bill Entry/View

---

## 1. Overview & Core Principle

Contractors represent **40–60% of total project cost**. No other spend category carries more financial risk or more documentation obligation. This module governs the complete lifecycle: tendering → bid evaluation → contract execution → work order → joint measurement → running bill certification → retention control → advance recovery → final settlement.

A contractor is a **Supplier** (`Supplier.supplierType = CONTRACTOR`). There is no separate payable entity. Contractor bills flow through the same AP module as supplier invoices. One AP ledger, one truth.

> **Non-Negotiable Core Principle:**
> _Every certified running bill posts a standard AP journal with full project dimensions. Retention is a separate balance sheet liability — not a discount, not a memo. The AP ledger and the contractor ledger are the same ledger. No parallel tracking systems._

---

## 2. Real-World Workflow

### What the Procurement Team Actually Does

**Week 1-2: Tendering**
1. QS identifies work packages from approved BOQ (e.g., "Structural Steel Supply", "Plumbing & Sanitary Works")
2. Creates a Tender document with BOQ scope, invites 3-5 shortlisted contractors
3. Contractors submit bids with line-level rates against BOQ items
4. QS builds a Comparative Statement — side-by-side price + technical + delivery comparison
5. Comparative Statement goes through approval workflow

**Week 3: Contract Award**
6. Winning contractor selected. Contract created from tender award.
7. Contract terms set: item rate / lump sum / cost plus, retention %, advance %, TDS %, payment terms
8. Work Order issued under the contract for specific scope

**Ongoing: Execution**
9. Contractor executes work on site
10. Site engineer conducts **joint measurement** — both parties agree on quantities
11. Contractor submits **running bill (RA bill)** based on joint measurement
12. Site engineer certifies → PM approves → Finance posts to GL

**Close-out:**
13. Final measurement and bill
14. Retention released: 50% at practical completion, 50% after DLP
15. Completion certificate issued

### What the Site Engineer Actually Does (Management Side)

Beyond the financial chain, the site engineer tracks contractor performance daily:

| Activity | When | What's Tracked | Feeds Into |
|---|---|---|---|
| **Daily contractor workforce count** | Every day via DSR | Trade-wise count per contractor | Manpower reports, productivity analysis |
| **Work quality inspection** | During/after each activity | Pass/fail/rework against spec | Contractor performance score |
| **Schedule adherence** | Weekly | Planned vs actual progress per work order | SPI (Schedule Performance Index) |
| **Safety compliance** | Daily | PPE, scaffolding, barricades | Safety incident reports |
| **Material wastage by contractor** | On occurrence | Wastage qty, cause, responsibility | Wastage reports, back-charge to contractor |
| **Rework tracking** | On occurrence | What was redone, cost, who's responsible | Quality cost reports, contractor deduction |
| **Equipment utilization** | Daily via DSR | Hours used, idle time, breakdown | Equipment cost allocation |

---

## 3. Entity Model with Data Sources

### Tender

| Field | Source |
|---|---|
| Tender Reference | Auto-generated. Config: Settings > Numbering > Tender format |
| Work Package | User selects from BOQ categories / WBS nodes |
| BOQ Items Included | Auto-populated from selected work package → ProjectBOQLine[] |
| Estimated Value | Computed: SUM(BOQ lines in scope) |
| Tender Type | User selects: Item Rate / Lump Sum / Combination |
| Submission Deadline | User input |
| Invited Contractors | User selects. Source: Core > Supplier (where type = CONTRACTOR) |
| Terms & Conditions | User input. Reference: org standard terms template |

### Comparative Statement

| Field | Source |
|---|---|
| Bid prices per item | From contractor TenderBid responses |
| BOQ estimate rate | From ProjectBOQLine.rate |
| Technical score | User input (evaluation by technical team) |
| Financial score | Computed: inverse ranking by price |
| Overall rank | Computed: weighted (technical × financial) |
| Recommendation | User input: which contractor + rationale |
| Approval | Config: Settings > Approval Workflows > Tender |

### Contract

| Field | Source |
|---|---|
| Contract Reference | Auto-generated. Config: Settings > Numbering > Contract format |
| Contractor | From awarded TenderBid → Supplier |
| Contract Type | User selects: Item Rate / Lump Sum / Cost Plus |
| Contract Value | From TenderBid total (editable if negotiated) |
| Retention % | Config: Settings > General > retentionPercent (overridable per contract) |
| Mobilization Advance % | User input (typically 10%) |
| Advance Recovery Rate | Config: Settings > General > advanceRecoveryRate (default 10% per bill) |
| TDS % | Config: Settings > General > tdsRate |
| Payment Terms | User input. Reference: Core > Payment Terms master |
| Defect Liability Period | Config: Settings > General > dlpPeriodMonths |
| Scope (BOQ lines) | Carried from Tender → BOQ scope |

### Running Bill (RA Bill)

| Field | Source |
|---|---|
| RA Bill Number | Auto-generated. Config: Settings > Numbering > Running Bill format |
| Contract | User selects from active contracts |
| Work Order | User selects from contract's work orders |
| Measurement Lines | From ContractMeasurement (joint measurement record) |
| Previous cumulative | Computed: SUM(all prior RA bills for this contract) |
| This bill (current) | Computed: Current measurement − Previous cumulative |
| Gross Amount | Computed: SUM(qty × rate for each line) |
| Retention deduction | Computed: Gross × retentionPercent. Source: Contract.retentionPercent |
| Advance recovery | Computed: Gross × advanceRecoveryRate. Source: Contract.advanceRecoveryRate |
| TDS deduction | Computed: Gross × tdsRate. Source: Config > tdsRate |
| Material supplied | User input: value of developer-supplied materials to deduct |
| Net Payable | Computed: Gross − Retention − Advance − TDS − Material |
| Approval | Config: Settings > Approval Workflows > Running Bill |

### GL Entry for Running Bill

```
DR  Construction WIP (GL from Cost Code)        ৳ Gross Amount
  CR  Accounts Payable — Contractor               ৳ Net Payable
  CR  Retention Payable (BS Liability)             ৳ Retention
  CR  Advance Recovery (reduces Advance Asset)     ৳ Advance Recovery
  CR  TDS Payable (BS Liability)                   ৳ TDS

Dimensions: projectId, wbsId, costCodeId, costCenterId
GL Account: Derived from CostCode.glAccountId → Core > Chart of Accounts
```

---

## 4. Business Rules

- A Tender can only be created from BOQ work packages of a BOQ in BASELINE_LOCKED status.
- Comparative Statement requires minimum 2 bids to proceed (configurable).
- Contract value creates a **commitment** — tracked in Budget vs Actual as "Committed" (not yet spent).
- Running bill certification requires: joint measurement record exists, certified qty ≤ BOQ qty, within budget.
- Retention is a **BS liability** (ADR-009) — never an expense, never a discount.
- Advance is an **Asset** — recovered proportionally over running bills until fully recovered.
- A contractor's total certified amount across all bills cannot exceed contract value without an approved Contract Variation.
- Retention release: 50% at practical completion, 50% at DLP expiry (configurable per contract).

---

## 5. Configuration Dependencies

| Config / Master | How Contractor Module Uses It |
|---|---|
| Settings > General > retentionPercent | Default retention on contracts (overridable) |
| Settings > General > tdsRate | TDS deduction on running bills |
| Settings > General > advanceRecoveryRate | Advance recovery per bill |
| Settings > General > dlpPeriodMonths | DLP duration for retention release |
| Settings > Numbering | Tender, Contract, Work Order, Running Bill formats |
| Settings > Approval Workflows > Tender | CS approval chain |
| Settings > Approval Workflows > Running Bill | Bill certification/approval chain |
| Masters > Cost Codes | Cost classification on bill lines → GL account |
| Core > Supplier (type=CONTRACTOR) | Contractor master data |
| Core > Chart of Accounts | WIP, AP, Retention, TDS GL accounts |
| Core > Payment Terms | Payment terms on contracts |
| Project > BOQ (BASELINE) | BOQ scope for tenders, qty limits for bills |

---

## 6. Reports Fed by This Module

| # | Report | Source | Key Metrics |
|---|---|---|---|
| 58 | Commitment Report | Contract + WO values | Budget − Actual − Committed = Available |
| 66 | Contractor Performance | RunningBill[], WorkOrder[] | Cost, schedule, quality scores per contractor |
| 75 | JV / Landowner Statement | JV contract, RunningBill[] | Construction progress affecting entitlements |

---

## 7. What's Built in Prototype

| Screen | Route | Status |
|---|---|---|
| Tender & Comparative Statement | `tender` | DONE |
| Create Tender | `tender/new` | DONE |
| Contract Entry | `contract/new` | DONE |
| Work Order Entry | `work-order/new` | DONE |
| Running Bill View | `running-bill` | DONE |
| Running Bill Entry | `running-bill/new` | DONE |

---

_Contractors are partners, not vendors. The system must track not just what they cost, but how they perform — quality, schedule, safety. Financial control without management visibility is half the picture._
