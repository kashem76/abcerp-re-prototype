# Reporting Architecture — Complete Specification

**Module:** Reports, Dashboards, Intelligence Layer, Dimensions × Measures Framework
**Code Reference:** `21-reporting-architecture.md`
**Prototype Screens:** 22 reports + 8 dashboards

---

## 1. Overview & Core Principle

The reporting architecture is not 500 independent report implementations. It is a **dimensions × measures** framework where most reports are different views of the same trusted data model.

Every number in every report must be traceable to a posted journal entry. This is absolute — no report contains a number that cannot be drilled down to its source transaction → source document → GL entry.

> **Non-Negotiable Core Principle (ADR-012):**
> _Build a reporting architecture around reusable dimensions and measures. Most reports are: "Show me [measure] grouped by [dimension] filtered by [criteria]." Build 6-7 report templates, then configure them. Specialized reports (health score, profit erosion, sensitivity) are built individually._

---

## 2. Reporting Hierarchy — Drill-Down Path

Every report supports drilling from summary to detail to source:

```
Company → Business Unit → Project → Phase → Tower → Floor → Unit
```

Analyzed using:
```
Responsibility Center → Profit Center → Cost Center → WBS → Cost Code → BOQ Item
```

Drill path example:
```
Project P&L
  → Construction Cost (৳738M)
    → Structural (৳298M)
      → STR-REBAR Reinforcement (৳91M)
        → PO-2026-0891 (৳8.6M)
          → Supplier Invoice SI-2026-1204
            → Journal Entry JE-2026-8847
              → JournalLine: DR 5020-03 ৳8,610,000 / CR 2100 ৳8,610,000
```

---

## 3. Dimensions × Measures Framework

### Dimensions (the "group by" / "filter by")

| Dimension | Source | Used In |
|---|---|---|
| Project | RealEstateProject | Almost all reports |
| Phase | ProjectPhase | Cost reports, progress |
| Building / Tower | ProjectBuilding | Sales, handover |
| Floor | ProjectFloor | Sales, unit reports |
| Unit | PropertyUnit | Sales, profitability |
| WBS | ProjectWBS | Cost, BOQ, variance |
| Cost Code | CostCode | Cost classification |
| Cost Code Category | CostCodeCategory | Summary cost reports |
| Responsibility Center | ResponsibilityCenter | Management analysis |
| Cost Center | ResponsibilityCenter (type=COST) | Cost control |
| Profit Center | ResponsibilityCenter (type=PROFIT) | Profitability |
| Supplier / Contractor | Supplier | Procurement, AP |
| Customer | Customer | Sales, AR |
| Period (Month/Quarter/Year) | Transaction date | All time-series reports |
| Department | Department | Evaluation, HR |

### Measures (the "what to show")

| Measure | Source | Type |
|---|---|---|
| Budget | BudgetLine.amount | Planning |
| Actual Cost | JournalLine.debit (WIP accounts) | Financial |
| Committed | PO.amount + WO.amount (not yet invoiced) | Financial |
| Available | Budget − Actual − Committed | Computed |
| EAC | Actual + Committed + Estimate-to-Complete | Computed |
| Revenue Recognized | JournalLine.credit (Revenue accounts) | Financial |
| Revenue Deferred | Booking Advance balance | Financial |
| Collection | CustomerReceipt.amount | Financial |
| AR Balance | GL balance: AR accounts | Financial |
| AP Balance | GL balance: AP accounts | Financial |
| WIP Balance | GL balance: WIP accounts | Financial |
| Retention Held | GL balance: Retention Payable | Financial |
| Completion % | ProjectPhase.completionPercent | Operational |
| Units Sold | PropertyUnit.count(status IN BOOKED,SOLD,HANDED_OVER) | Operational |
| Manpower Count | DSR.totalManpower | Operational |
| Equipment Hours | DSR.equipmentHours | Operational |

### Report = Dimension × Measure × Filter

| Report Name | Dimensions | Measures | Filters |
|---|---|---|---|
| Project P&L | Project | Revenue, Cost, Profit | Project = X |
| Budget vs Actual | Cost Code | Budget, Actual, Committed, Available | Project = X |
| BOQ Variance | BOQ Item, WBS | Planned Qty/Rate/Amt, Actual Qty/Rate/Amt | Project = X |
| AR Aging | Customer, Unit | AR Balance by age bucket | Project = X |
| Collection Efficiency | Period | Demanded, Collected, Efficiency % | Project = X, Period range |
| Contractor Performance | Supplier | Cost, Schedule score, Quality score | Project = X |
| Material Consumption | Item, Cost Code | BOQ Qty, Issued, Consumed, Wasted | Project = X |
| DSR Summary | Trade, Date | Manpower, Equipment | Project = X, Date range |
| Overhead Allocation | Project | Pool Amount, Driver Value, Allocated | Period = X |
| Unit Profitability | Unit | Allocated Cost, Revenue, Margin | Project = X |
| Feasibility vs Actual | Cost Category | Feasibility, Actual, Variance | Project = X |

---

## 4. Report Categories

### 4.1 Financial Reports (from GL)

| # | Report | Cadence | Source | Config/Master Dependencies |
|---|---|---|---|---|
| 54 | Project P&L | Monthly | GL by project | Core > CoA, project dimension |
| 55 | Project Balance Sheet | Monthly | GL by project | Core > CoA |
| 56 | Project Cash Flow | Monthly | GL (cash-tagged) | Core > CoA |
| 63 | Revenue Recognition | Monthly | RevenueEntry[] | Config: revenueMethod (POC/CC) |
| 65 | WIP Movement | Monthly | GL WIP accounts | Core > CoA (WIP account codes) |

### 4.2 Cost Control Reports (from BOQ + GL)

| # | Report | Cadence | Source | Config/Master Dependencies |
|---|---|---|---|---|
| 57 | BOQ Variance | Weekly | ProjectBOQLine vs GL | Masters > Cost Codes, BOQ baseline |
| 58 | Commitment | Weekly | PO + WO amounts vs Budget | Budget from BOQ, PO/WO values |
| 59 | EAC | Monthly | Actual + Committed + ETC | Config: varianceAlertPercent |
| 71 | Cost Intelligence | On-demand | RateSnapshot[] from POs | Core > Item Master |

### 4.3 Revenue Reports (from Sales + AR)

| # | Report | Cadence | Source | Config/Master Dependencies |
|---|---|---|---|---|
| 60 | AR Aging | Weekly | SalesInvoice + CustomerReceipt | Aging buckets (0-30, 31-60, 61-90, >90) |
| 61 | Sales & Booking Status | Weekly | PropertyUnit[], UnitBooking[] | — |
| 62 | Collection Efficiency | Monthly | Demanded vs Collected | — |
| 64 | Unit Profitability | Quarterly | UnitCostAllocation vs Revenue | Allocation basis config |

### 4.4 Operations Reports (from DSR + Site Ops)

| # | Report | Cadence | Source | Config/Master Dependencies |
|---|---|---|---|---|
| 66 | Contractor Performance | Monthly | RunningBill[], WorkOrder[] | — |
| 67 | Material Consumption vs BOQ | Weekly | MaterialIssue vs BOQ | BOQ baseline |
| 74 | DSR Manpower Summary | Daily/Weekly | DailySiteReport[] | Config: trade types |
| — | Quality Dashboard | Weekly | InspectionResult[] | Config: inspection templates |
| — | Safety Dashboard | Monthly | SafetyIncident[] | Config: incident types |

### 4.5 Management Reports (computed/aggregated)

| # | Report | Cadence | Source | Config/Master Dependencies |
|---|---|---|---|---|
| 68 | Overhead Allocation | Monthly | AllocationRun[] | Config: allocation drivers + rules |
| 69 | Feasibility vs Actual | At closure | ManagementReport.snapshot vs GL | Feasibility baseline |
| 70 | Profit Erosion | Quarterly | Feasibility.profit vs Actual | Feasibility baseline |
| 72 | Cash Flow Forecast | Monthly | GL + projected collections + commitments | — |
| 73 | Portfolio Risk | Quarterly | Project health scores | — |
| 75 | JV/Landowner Statement | Quarterly | JV terms + construction progress | JV agreement |

---

## 5. Dashboards

Each dashboard serves a specific role with a specific question:

| Dashboard | Audience | Primary Question | Key Widgets | Prototype Route |
|---|---|---|---|---|
| **Portfolio** | Everyone | "How are all projects doing?" | Project cards: budget, spent, forecast, sold, health | `/real-estate` |
| **CEO** | CEO/MD | "What decisions need me? What's at risk?" | Profit erosion, risk matrix, pending decisions, KPIs | `dashboards/ceo` |
| **CFO** | CFO/Finance | "Where's the cash? What's due?" | Cash position, burn rate, AR/AP, fund gap, collections | `dashboards/cfo` |
| **Project Director** | PM/Director | "Is my project on track?" | SPI/CPI, today's snapshot, contractor performance, critical path | `dashboards/project-director` |
| **Procurement** | Procurement Head | "What needs buying? What's the best price?" | Active POs, pending MRs, rate intelligence, supplier scores | `dashboards/procurement` |
| **Sales** | Sales Head | "How fast are we selling? Who's paying?" | Velocity, bookings, collections, performers, demands | `dashboards/sales` |
| **Site Engineering** | Site Team | "What's happening on site today?" | Weather, manpower, equipment, work fronts, issues | `dashboards/site-engineering` |
| **Land & Dev** | BD Head | "What's in the pipeline? What's slow?" | Lead pipeline, opportunities, feasibility status, aging | `dashboards/land-dev` |

### Dashboard Data Source Trace

| Widget | Source | Refresh |
|---|---|---|
| Project Health Score | Computed: weighted(SPI, CPI, collection rate, progress) | Daily |
| Cash Position | GL balance: Cash/Bank accounts | Real-time |
| AR Aging | GL balance: AR accounts by age bucket | Daily |
| Profit Erosion Waterfall | Feasibility.profit vs GL actual profit | Weekly |
| Manpower Count | Latest DSR.totalManpower | Daily |
| Collection Efficiency % | Demanded vs Collected for period | Daily |
| Sales Velocity | Units booked / months since launch | Weekly |
| SPI (Schedule Performance Index) | Earned Value / Planned Value | Weekly |
| CPI (Cost Performance Index) | Earned Value / Actual Cost | Weekly |

---

## 6. Configuration Dependencies

| Config / Master | How Reporting Uses It |
|---|---|
| Core > Chart of Accounts | Account codes define which GL balances are Revenue, Cost, WIP, AR, AP |
| Core > Responsibility Centers | CC/PC for dimension grouping |
| Masters > Cost Codes | Cost classification for BOQ/budget variance reports |
| Settings > General > revenueMethod | Determines POC vs CC in revenue recognition report |
| Settings > General > varianceAlertPercent | Threshold for variance alert highlighting |
| Per-project: Allocation Basis | Unit cost allocation method for unit profitability report |
| Config: Aging Buckets | AR/AP aging bands (0-30, 31-60, 61-90, >90 days) |
| Config: Dashboard Widgets | Which widgets appear per role |

---

## 7. What's Built in Prototype

### 22 Reports

| # | Report | Route | Status |
|---|---|---|---|
| 54 | Project P&L | `reports/project-pl` | DONE |
| 55 | Project Balance Sheet | `reports/project-bs` | DONE |
| 56 | Project Cash Flow | `reports/project-cashflow` | DONE |
| 57 | BOQ Variance | `reports/boq-variance` | DONE |
| 58 | Commitment | `reports/commitment` | DONE |
| 59 | EAC | `reports/eac` | DONE |
| 60 | AR Aging | `reports/ar-aging` | DONE |
| 61 | Sales Status | `reports/sales-status` | DONE |
| 62 | Collection Efficiency | `reports/collection` | DONE |
| 63 | Revenue Recognition | `reports/revenue-recognition` | DONE |
| 64 | Unit Profitability | `reports/unit-profitability` | DONE |
| 65 | WIP Movement | `reports/wip-movement` | DONE |
| 66 | Contractor Performance | `reports/contractor-performance` | DONE |
| 67 | Material Consumption | `reports/material-consumption` | DONE |
| 68 | Overhead Allocation | `reports/overhead-allocation` | DONE |
| 69 | Feasibility vs Actual | `reports/feasibility-vs-actual` | DONE |
| 70 | Profit Erosion | `reports/profit-erosion` | DONE |
| 71 | Cost Intelligence | `reports/cost-intelligence` | DONE |
| 72 | Cash Forecast | `reports/cash-forecast` | DONE |
| 73 | Portfolio Risk | `reports/portfolio-risk` | DONE |
| 74 | DSR Summary | `reports/dsr-summary` | DONE |
| 75 | JV/Landowner Statement | `reports/landowner-statement` | DONE |

### 8 Dashboards

All 8 dashboards DONE (listed in Section 5).

---

_Reports are not decoration. They are the reason the ERP exists. Every operational screen feeds data into the GL. Reports read that data back — organized by dimension, measured by metric, drillable to source. This is the payoff of disciplined data entry._
