# Operations to Financials — Master Flow

**Purpose:** This is the architectural bridge between real estate operations and AbcERP's financial engine. It answers the question: _"How does a broker's phone call about a plot become a closed project with a final P&L — step by step, entity by entity, journal by journal?"_

**Code Reference:** `09-operations-to-financials-flow.md`
**Audience:** System architects, developers, product owners, CFO reviewing ERP capability

> **This is the most important document.** Every other spec describes a module. This one describes how they connect. If you read only one document, read this.

---

## 1. The Master Flow — Land Lead to Project Closure

Every real estate development follows this pipeline. The financial story is always sequential: cost before revenue, WIP before COGS, collection before closure.

```
LAND LEAD                          No financial commitment. Evaluation only.
    │                              Source: Broker / Direct / Auction / Referral
    │                              Config: Settings > Numbering > Land Lead format
    ▼
INITIAL SELECTION                  Quick screening. Qualify / Hold / Reject.
    │                              Source: Settings > Land Evaluation > Selection Templates
    │                              No GL posting. No cost object.
    ▼
EVALUATION                         Multi-department assessment.
    │                              Source: Settings > Land Evaluation > Frameworks
    │                              7 response types, findings, risks, sign-offs.
    │                              Pre-dev expenses start here → GL posted.
    │                              Cost Object: Land record (tagged, not a project)
    ▼
FINANCIAL MODEL                    Revenue × Cost × Scenarios → IRR, Margin.
    │                              Source: Department assessment outputs
    │                              Every assumption traced to source dept + assessor + date.
    ▼
MANAGEMENT DECISION                CEO reviews auto-assembled report.
    │                              4 options: Approve / Conditions / Return / Reject.
    │
    ├── Rejected ──────────────► Land CLOSED. Pre-dev costs remain as P&L expense.
    │
    ▼
LAND ACQUISITION                   Capital committed. Land on Balance Sheet.
    │                              Purchase: DR Land Asset / CR Cash or AP
    │                              JV: DR Land-JV Contribution / CR Landowner Equity
    │                              Config: Settings > General > stampDutyRate
    ▼
PROJECT CREATION ◄─────────────── THE CONVERSION POINT
    │                              Project Master created. RC / CC / PC assigned.
    │                              Config: Settings > Numbering > Project format
    │                              Feasibility baseline locked for closure comparison.
    │                              Pre-dev costs optionally transferred to WIP.
    ▼
PLANNING & BUDGETING               Phases defined. Budget allocated per phase.
    │                              Unit inventory created (all AVAILABLE).
    │                              No GL postings — planning only.
    ▼
BOQ & ESTIMATION                   Item-level cost breakdown.
    │                              WBS → Cost Code → BOQ Line → Rate Analysis.
    │                              BOQ locked as BASELINE → variance tracking begins.
    │                              Source: Masters > Cost Codes, BOQ Items, Rate Templates
    ▼
TENDERING & CONTRACTS              Work packages tendered. Contractors appointed.
    │                              Commitments registered (off-balance-sheet).
    │                              Config: Settings > General > retentionPercent
    │
    ├─────────────────────────────────────────────────────┐
    │                                                     │
    ▼                                                     ▼
PRE-SALES ◄──────────────────────────────────► CONSTRUCTION
    │         (parallel execution)                │
    │                                             │
    │  Bookings collected                         │  PO → GRN → AP → WIP
    │  DR Cash / CR Booking Advance (Liability)   │  Contractor bills → WIP
    │  NOT revenue — ADR-007                      │  DR Construction WIP / CR AP
    │  Source: Config > revenueMethod              │  Source: Masters > Cost Codes for GL mapping
    │                                             │  Source: Config > retentionPercent, tdsRate
    │                                             │
    ▼                                             ▼
SALES & COLLECTIONS ◄───────────────────► FINISHING
    │         (parallel execution)                │
    │                                             │
    │  Installment demands raised                 │  Final contractor bills
    │  Collections → AR reduced                   │  Retention partially released
    │  Revenue recognized (POC or CC)             │  Source: Config > dlpPeriodMonths
    │  DR AR / CR Revenue                         │
    │  DR COGS / CR WIP                           │
    │                                             │
    └─────────────────────────────────────────────┘
                        │
                        ▼
HANDOVER & POSSESSION              Unit inspection → clearances → key handover.
    │                              Revenue trigger (CC method).
    │                              WIP → COGS final transfer.
    │                              Unit status → HANDED_OVER.
    ▼
DEFECT LIABILITY PERIOD            Duration: Config > Settings > dlpPeriodMonths
    │                              Retention held. Defect provision created.
    │                              Source: Config > retentionPercent
    ▼
PROJECT CLOSEOUT                   WIP = 0. AR = 0. All retentions released.
                                   Feasibility vs Actual comparison.
                                   Project sealed — no further postings.
```

---

## 2. The Dimension Model — Seven Questions on Every Transaction

Every financial transaction in a real estate ERP must answer seven questions simultaneously. These are not optional tags — they are the foundation of cost control and profitability analysis.

```
DIMENSION                ANSWERS                         SOURCE
─────────────────────────────────────────────────────────────────────────
Project                  WHAT are we spending for?        Selected: from Project list
WBS                      WHAT work is being done?         Selected: from ProjectWBS tree
Cost Code                WHAT TYPE of cost?               Selected: from Masters > Cost Codes
Responsibility Center    WHO is responsible?              Config: Project.defaultRC (overridable)
Cost Center              WHERE is cost controlled?        Config: Project.defaultCC (overridable)
Profit Center            WHERE is profit measured?        Config: Project.defaultPC (overridable)
GL Account               WHAT accounting class?           Derived: from Cost Code GL mapping
```

### Why Seven, Not One

A single cost center hierarchy cannot answer: "who spent this, on what work, for what project, classified how?" simultaneously.

Example: "Purchased ৳50 lakh of reinforcement steel for Tower A structural work."

| Dimension | Value | Source |
|---|---|---|
| Project | Gulshan Residence | User selects |
| WBS | Tower A > Structure > Column | User selects from WBS tree |
| Cost Code | STR-REBAR | User selects. Source: Masters > Cost Codes |
| GL Account | 5010-02 Construction Materials | Derived from Cost Code GL mapping |
| Responsibility Center | Engineering | Project.defaultRC. Source: Core > Responsibility Centers |
| Cost Center | Gulshan Residence Construction | Project.defaultCC |
| Profit Center | Gulshan Residence | Project.defaultPC |

### Dimension Enforcement

Which dimensions are required per transaction type is configured, not hardcoded.

| Transaction Type | Required Dimensions | Config Source |
|---|---|---|
| Material Purchase (PO/GRN) | Project, WBS, Cost Code, CC | Settings > Dimension Rules |
| Contractor Running Bill | Project, WBS, Cost Code, CC | Settings > Dimension Rules |
| Material Issue to Site | Project, WBS, Cost Code, CC | Settings > Dimension Rules |
| Unit Booking Receipt | Project, Unit, PC | Settings > Dimension Rules |
| Revenue Recognition | Project, Unit, PC | Settings > Dimension Rules |
| Overhead Allocation | Project, CC, PC | Settings > Dimension Rules |
| Pre-Dev Expense | Land (as cost object), CC | Settings > Dimension Rules |

The GL posting gate rejects entries missing required dimensions. This is not a validation — it is a hard block.

---

## 3. Financial Event Chain — Every Transaction Type

### 3.1 Pre-Development (Before Project Exists)

| Event | Debit | Credit | Cost Object | Config/Master Source |
|---|---|---|---|---|
| Survey fee | Pre-Dev Expense (P&L) | Cash/Bank | Land record | GL: Master > CoA |
| Legal opinion | Pre-Dev Expense (P&L) | Cash/Bank | Land record | GL: Master > CoA |
| Soil test | Pre-Dev Expense (P&L) | Cash/Bank | Land record | GL: Master > CoA |

**Approval:** Expenses above threshold require approval. Source: Settings > Approval Workflows > threshold.

### 3.2 Land Acquisition

| Event | Debit | Credit | Config Source |
|---|---|---|---|
| Cash purchase | Land Asset | Cash/Bank | — |
| Deferred purchase (token) | Advance to Seller | Cash/Bank | — |
| Deferred purchase (settlement) | Land Asset | Advance + Cash/AP | — |
| Stamp duty | Land Asset (capitalized) | Cash/Bank | Config: Settings > stampDutyRate |
| Registration fee | Land Asset (capitalized) | Cash/Bank | — |
| JV contribution | Land-JV Asset | Landowner Equity | — |
| JV cash compensation | Landowner Equity | Cash/Bank | — |

### 3.3 Project Cost (Construction)

| Event | Debit | Credit | Dimensions | Config Source |
|---|---|---|---|---|
| Material purchase (PO → GRN → Invoice) | Construction WIP | Accounts Payable | Project, WBS, Cost Code, CC | GL: derived from Cost Code |
| Material issue from store | Construction WIP | Site Inventory | Project, WBS, Cost Code, CC | GL: derived from Cost Code |
| Contractor running bill | Construction WIP | AP − Retention − TDS | Project, WBS, Cost Code, CC | Config: retentionPercent, tdsRate |
| Labour cost allocation | Construction WIP | Payroll Payable | Project, Phase, CC | — |
| Equipment charges | Construction WIP | Equipment Pool | Project, WBS, CC | — |
| Overhead allocation | Construction WIP | Overhead Recovery | Project, CC, PC | Config: allocation rules |

### 3.4 Sales & Revenue

| Event | Debit | Credit | Dimensions | Config Source |
|---|---|---|---|---|
| Booking advance | Cash/Bank | Booking Advance (Liability) | Project, Unit, PC | NOT revenue. ADR-007 |
| Installment demand | Accounts Receivable | Booking Advance ↔ Revenue | Project, Unit, PC | — |
| Collection | Cash/Bank | Accounts Receivable | Project, Unit, PC | — |
| Revenue recognition (POC) | (adjusting entry) | Revenue − Unit Sales | Project, Unit, PC | Config: revenueMethod = POC |
| COGS transfer | Cost of Sales | Construction WIP | Project, Unit, PC | Proportionate to revenue % |
| Revenue recognition (CC) | AR | Revenue | Project, Unit, PC | Config: revenueMethod = CC. Triggered at handover |
| Booking cancellation | Booking Advance | Cash (refund) + Forfeiture Income | Project, Unit, PC | Config: forfeiturePercent |

### 3.5 Wind-Down (Handover → Closure)

| Event | Debit | Credit | Config Source |
|---|---|---|---|
| Retention release (partial) | Retention Payable | Cash/Bank | At practical completion |
| Retention release (final) | Retention Payable | Cash/Bank | After DLP. Config: dlpPeriodMonths |
| Defect repair cost | Defect Provision | Cash/Bank or AP | — |
| Final WIP → COGS | Cost of Sales | Construction WIP | Must reach zero at closure |

---

## 4. The Six Financial Reconciliation Gates

These gates must balance before period close or project close. The system enforces them.

### Gate 1: WIP Reconciliation
```
Opening WIP + Additions (costs posted this period) − Transfers (to COGS) = Closing WIP
```
**Source:** GL balances on WIP accounts by project. Config: Master > CoA > WIP account codes.

### Gate 2: AR Reconciliation
```
Opening AR + Demands Raised − Collections Received − Write-offs = Closing AR
```
**Source:** GL balances on AR accounts by project/customer.

### Gate 3: AP Reconciliation
```
Opening AP + Invoices Posted − Payments Made = Closing AP
```
**Source:** GL balances on AP accounts by project/supplier.

### Gate 4: Budget vs Actual
```
For every cost code: Actual + Committed ≤ Budget + Approved Variations
```
**Source:** BudgetLine (from BOQ) vs JournalLine actuals + PO/WO commitments. Config: contingencyPercent.

### Gate 5: Revenue Reconciliation (POC)
```
Revenue Recognized = Total Expected Revenue × Completion %
COGS Recognized = Total Expected Cost × Completion %
```
**Source:** Completion % from ProjectPhase. Revenue/Cost from feasibility baseline. Config: revenueMethod.

### Gate 6: Unit Status Reconciliation
```
Available + Reserved + Booked + Sold + Handed Over + Cancelled + Landowner = Total Units
```
**Source:** PropertyUnit[].status counts. Must match project unit inventory.

---

## 5. How Modules Connect — The Dependency Map

```
SETTINGS (08)                     MASTERS
├── General Parameters            ├── Chart of Accounts (GL)
├── Lifecycle Stages              ├── Cost Codes + Categories
├── Numbering Sequences           ├── BOQ Items
├── Approval Workflows            ├── Rate Templates
├── Dimension Rules               ├── Responsibility Centers
└── Land Evaluation               └── Departments
     ├── Selection Templates
     ├── Frameworks
     ├── Criteria Library
     ├── Cost Categories
     └── Report Templates

         ↓ configures ↓                    ↓ provides master data ↓

LAND MODULE (06, 07)              PROJECT MODULE (09)
├── Land Pipeline                 ├── Project Master
├── Initial Selection             ├── Phases & Budget
├── Evaluation Engine             ├── Building → Floor → Unit
├── Work Board                    ├── WBS Tree
├── Financial Model               └── Stage Transitions
├── Management Decision
└── Acquisition
         │                                  │
         └──── CONVERSION POINT ────────────┘
                                            │
                      ┌─────────────────────┼─────────────────────┐
                      ↓                     ↓                     ↓
              BOQ & ESTIMATION (11)   SALES MODULE (14)    SITE OPS (13)
              ├── WBS → Cost Code     ├── Unit Pricing     ├── Mat. Req
              ├── BOQ Lines           ├── Booking           ├── Mat. Issue
              ├── Measurement         ├── Collections      ├── DSR
              ├── Rate Analysis       ├── Cancellation     ├── Inventory
              └── Budget Generation   └── Transfer         └── Consumption
                      │                     │                     │
                      ↓                     ↓                     ↓
              CONTRACTOR (12)         REVENUE (P&L)          COST (WIP)
              ├── Tender              ├── POC / CC           ├── By Project
              ├── Contract            ├── Installments       ├── By Phase
              ├── Work Order          └── Forfeiture         ├── By Cost Code
              ├── Running Bill                               └── By WBS
              └── Retention
                      │                     │                     │
                      └─────────────────────┼─────────────────────┘
                                            ↓
                                   GENERAL LEDGER
                                   ├── 7 dimensions per line
                                   ├── WIP accounts
                                   ├── AP / AR accounts
                                   ├── Revenue / COGS accounts
                                   └── Period close gates
                                            │
                                            ↓
                              ┌─────────────┼─────────────┐
                              ↓             ↓             ↓
                        VARIATION (15) HANDOVER (16)  ALLOCATION (17)
                        ├── Change Req ├── Inspection  ├── Overhead
                        ├── VO         ├── Snag list   ├── Unit cost
                        └── Budget adj ├── DLP         └── Profitability
                                       └── Closure
                                            │
                                            ↓
                                    REPORTING (18)
                                    ├── 22 built reports
                                    ├── 8 dashboards
                                    └── Feasibility vs Actual
```

---

## 6. Data Source Traceability — The Complete Chain

Every number on every screen traces to one of four origins:

| Origin | Examples | How to Verify |
|---|---|---|
| **Config** (Settings) | Retention %, TDS rate, DLP months, currency, numbering format, approval thresholds | Settings > [section]. Changed by admin. |
| **Master** (Master Data) | GL account codes, cost codes, departments, BOQ items, rate templates, responsibility centers | Masters > [section] or Core > [section]. Maintained by admin. |
| **User Input** | Land name, area, price, assessment text, booking customer, measurement quantities | Entered on operational screens. Audit trail on every change. |
| **Computed** | IRR, margin, BOQ total, budget variance, aging days, stage, overall score, WIP balance | Derived by system from other data. Formula documented per field. |

### Example Traceability Chain: "Project Profit ৳350M"

```
Profit = Revenue − Cost

Revenue = Saleable Area × Selling Price
  Saleable Area = 151,400 sqft         ← User Input: Engineering Assessment criterion
  Selling Price = ৳12,000/sqft         ← User Input: Marketing Assessment criterion

Cost = Land + Construction + Marketing + Finance + Contingency
  Land = ৳450M                         ← User Input: BD team acquisition assumption
  Construction = ৳716M                 ← Computed: SUM(CostCategory[].estimate)
    Foundation = ৳80M                  ← User Input: Cost Eng, using Config > Cost Categories
    Reinforcement = ৳82M               ← Computed: quantity × rate
      Quantity = 781,200 kg            ← Computed: 4.2 kg/sqft × 186,000 sqft
        4.2 kg/sqft                    ← Master: Cost Categories > Reinforcement > default consumption
        186,000 sqft                   ← User Input: Engineering Assessment > Buildable Area
      Rate = ৳105/kg                   ← Master: Rate Templates > latest rate snapshot
    ...
  Marketing = ৳56M                     ← Computed: 3% × Revenue
    3%                                 ← User Input: Marketing Assessment
  Finance = ৳84M                       ← Computed: 12% p.a. × average outstanding × duration
    12% p.a.                           ← Config: Settings > General > financeRate
  Contingency = ৳40M                   ← Computed: 5% × subtotal
    5%                                 ← Config: Settings > General > contingencyPercent

IRR = 20.8%                            ← Computed: Excel-style IRR on monthly cash flows
Margin = 19.2%                         ← Computed: Profit / Revenue
Payback = 4.4 years                    ← Computed: cumulative cash flow breakeven month
```

Every link in this chain is:
1. **Documented** — which doc section defines the formula
2. **Traceable** — the Financial Model screen shows source department + assessor + date per assumption
3. **Auditable** — every change creates a new evaluation version; prior versions are immutable
4. **Flagged when stale** — if source data is >30 days old (Config: Settings > stalenessThresholdDays)

---

## 7. What the Prototype Demonstrates vs What It Cannot

### Demonstrates (Static Mock Data)

| Flow | Prototype Shows |
|---|---|
| Land Lead → Selection → Evaluation → Decision | Complete — 15 screens, all three layers |
| Work Board with department assignments | Complete — Board/List/Dept views, dependency tracking |
| Auto-assembled management report | Complete — report from department sign-offs |
| Financial model with source attribution | Complete — every assumption shows source + staleness |
| Project workspace with 8 tabs | Complete — Overview, Plan, BOQ, Buy, Build, Inventory, Sales, Finance |
| BOQ → Rate Analysis → Budget | Complete — WBS, measurement, rate breakdown, approval |
| Tender → Contract → Work Order → Running Bill | Complete — comparative statement, GL preview |
| Unit Booking → Payment Schedule → Collections | Complete — 5-step wizard, GL preview |
| Handover → Closure | Complete — clearance checklist, automated checks |
| 22 reports + 8 dashboards | Complete — all with mock data |

### Cannot Demonstrate (Requires Backend)

| Capability | Why |
|---|---|
| Actual GL posting and reconciliation | Needs double-entry accounting engine |
| Budget enforcement (hard block on over-budget) | Needs real-time budget check on transaction save |
| Stage transitions with gate checks | Needs state machine + business rule engine |
| Numbering sequence auto-generation | Needs atomic counter with race condition protection |
| Approval workflow routing | Needs role-based routing engine |
| Revenue recognition computation (POC/CC) | Needs completion % tracking + automated journal generation |
| Multi-user collaboration (who edited what) | Needs user auth + audit trail |
| Report drill-down from KPI to transaction | Needs GL query with dimension filters |

---

## 8. Configuration Dependencies Across All Modules

This is the complete list of configuration that must be set before the system is operational.

### Must Configure Before First Use

| Config | Where | Default (BD) | Affects |
|---|---|---|---|
| Currency | Settings > General | BDT | All monetary values |
| Retention % | Settings > General | 5% | Running Bill, Contract |
| TDS Rate | Settings > General | 2% | Running Bill, Payment |
| DLP Period | Settings > General | 12 months | Handover, Closure |
| Revenue Method | Settings > General | POC | Revenue Recognition |
| Contingency % | Settings > General | 5% | Cost Estimation |
| Forfeiture % | Settings > General | 10% | Booking Cancellation |

### Must Configure Before Land Module

| Config | Where | Default | Affects |
|---|---|---|---|
| Selection Template | Settings > Land Eval > Selection | 9 criteria (BD) | Initial Selection |
| Evaluation Framework | Settings > Land Eval > Frameworks | 8 sections, 54 criteria (BD) | Work Board, assessments |
| Cost Categories | Settings > Land Eval > Cost | 17 categories (BD) | Cost estimation step |
| Report Template | Settings > Land Eval > Report | 16 sections | Management Report |

### Must Configure Before Project Module

| Config | Where | Default | Affects |
|---|---|---|---|
| Project Numbering | Settings > Numbering | RE-{SEQ:5} | Project creation |
| Lifecycle Stages | Settings > Lifecycle | 14 stages | Stage transitions |
| Approval Workflows | Settings > Approval Workflows | 7 workflows | BOQ, VO, Running Bill, etc. |
| Dimension Rules | Settings > Dimension Rules | 6 transaction types | GL posting gate |
| Cost Codes | Masters > Cost Codes | 23 codes in 6 categories | BOQ, procurement, reporting |
| GL Account Mapping | Masters > Cost Codes > GL Account | Per cost code | All GL postings |
| Responsibility Centers | Core > RC | Per organization | Project CC/PC assignment |

---

_This document is the spine. Every other module spec hangs from it. When in doubt about how something connects — start here._
