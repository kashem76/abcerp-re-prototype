# AbcERP Real Estate — Prototype Build Tracker

**Purpose:** This prototype is a clickable reference for end users and developers. It demonstrates the complete real estate development lifecycle — from land lead to project closure — using static mock data. No database, no API, no auth.

**Tech:** Next.js 15 + shadcn/ui + Tailwind CSS + TypeScript
**Data:** All static JSON in `src/lib/mock-data.ts` + inline data per screen
**Live URL:** [Vercel Deployment](https://abcerp-re-prototype-8cga0texo-kashem76s-projects.vercel.app)

---

## What's Built (80 screens)

### Overview & Dashboards

| # | Route | Screen | Status | What It Shows |
|---|---|---|---|---|
| 1 | `/real-estate` | Portfolio Dashboard | DONE | All projects with budget, spent, forecast, sold units, health scores |
| 2 | `/real-estate/dashboards/ceo` | CEO Dashboard | DONE | Portfolio KPIs, financial position, sales position, profit erosion analysis, risk matrix, alerts, pending decisions |
| 3 | `/real-estate/dashboards/cfo` | CFO Dashboard | DONE | Cash position, burn rate, runway, AR/AP, fund requirements, collection performance, bank balances |
| 4 | `/real-estate/dashboards/project-director` | Project Director Dashboard | DONE | Health KPIs (SPI/CPI), today's snapshot, weekly progress, contractor performance, pending actions, critical path |
| 5 | `/real-estate/dashboards/procurement` | Procurement Head Dashboard | DONE | Active POs, pending MRs, open tenders, MR pipeline, rate intelligence, supplier performance |
| 6 | `/real-estate/dashboards/sales` | Sales Head Dashboard | DONE | Units sold, bookings, collections, sales pipeline, velocity chart, performers, payment demands |
| 7 | `/real-estate/dashboards/site-engineering` | Site Engineering Dashboard | DONE | Weather, manpower, equipment, work fronts, material status, quality checkpoints, open issues |
| 8 | `/real-estate/dashboards/land-dev` | Land & Development Dashboard | DONE | Lead pipeline, opportunities, feasibility status, land agreements, upcoming milestones |
| 9 | `/real-estate/projects` | Projects List | DONE | Project cards with stage, budget, revenue, completion |
| 10 | `/real-estate/projects/[id]` | Project Detail | DONE | Phase progress, KPIs, alerts |

### Pre-Project Flow (Land → Feasibility → Project)

| # | Route | Screen | Status | What It Shows |
|---|---|---|---|---|
| 11 | `/real-estate/land-leads` | Land Lead List | DONE | Pipeline with status badges, source, area, price/katha |
| 12 | `/real-estate/land-leads/[id]` | Land Lead Detail | DONE | Parcels, owners, due diligence checklist, documents, site visits |
| 13 | `/real-estate/land-leads/new` | Add Land Lead | DONE | Form: location, mouza, area, khatian/dag, price, source, assigned to |
| 14 | `/real-estate/land-leads/[id]/site-visit` | Record Site Visit | DONE | Form: date, purpose, findings, photos, recommendation, previous visits timeline |
| 15 | `/real-estate/land-leads/[id]/due-diligence` | Due Diligence Entry | DONE | Checklist by category (legal/survey/regulatory/financial/physical) with status dropdowns |
| 16 | `/real-estate/opportunity` | Development Opportunity | DONE | Pre-dev expenses (real GL postings), cost center |
| 17 | `/real-estate/opportunity/new` | Create Opportunity | DONE | Form linked to land lead, estimated costs, RC/CC assignment, pre-dev expenses |
| 18 | `/real-estate/opportunity/convert` | Project Creation Wizard | DONE | Opportunity → Project conversion with RC/CC/PC and cost transfer |
| 19 | `/real-estate/feasibility` | Feasibility Workspace | DONE | Revenue/cost/metrics, scenario comparison, cash flow |
| 20 | `/real-estate/feasibility/new` | Create Feasibility Study | DONE | 7-step wizard: land assumptions → unit mix → revenue → cost → metrics → scenarios |
| 21 | `/real-estate/land-agreement/new` | Land Agreement Entry | DONE | Purchase/JV toggle, parties, price/share, payment schedule, registration |
| 22 | `/real-estate/land-agreement/jv` | JV Entitlement Builder | DONE | Unit allocation tool, running totals, balance check, parking allocation |
| 23 | `/real-estate/projects/new` | Create Project (Standalone) | DONE | Direct project creation with budget categories, without opportunity flow |

### Planning & BOQ

| # | Route | Screen | Status | What It Shows |
|---|---|---|---|---|
| 24 | `/real-estate/wbs` | WBS Builder | DONE | Expandable tree (4 levels), leaf nodes show BOQ item count |
| 25 | `/real-estate/boq` | BOQ List (Variance View) | DONE | Items with BOQ vs actual variance, locked baseline |
| 26 | `/real-estate/boq/new` | BOQ Line Entry | DONE | WBS + cost code + quantity + rate = amount |
| 27 | `/real-estate/boq/measurement` | Measurement Sheet | DONE | L×W×H×Nos with live calculation |
| 28 | `/real-estate/boq/rate-analysis` | Rate Analysis | DONE | Material/labour/equipment/overhead breakdown |
| 29 | `/real-estate/boq/approve` | BOQ Approval Workflow | DONE | Approval pipeline, reviewer comments, change log, approve/reject actions |
| 30 | `/real-estate/masters/cost-codes` | Cost Code Master | DONE | 18 codes, 6 categories, CRUD |
| 31 | `/real-estate/masters/boq-items` | BOQ Item Master | DONE | 8 items, linked to Item master, CRUD |
| 32 | `/real-estate/masters/rate-templates` | Rate Analysis Templates | DONE | 8 templates, component counts, CRUD |

### Execution

| # | Route | Screen | Status | What It Shows |
|---|---|---|---|---|
| 33 | `/real-estate/dsr` | DSR List | DONE | Recent DSRs with manpower/equipment/issue counts |
| 34 | `/real-estate/dsr/new` | DSR Entry | DONE | 5-tab form: manpower, equipment, work done, issues, photos |
| 35 | `/real-estate/tender` | Tender & Comparative Statement | DONE | 4 bids, scoring, line-level rate comparison, ranking |
| 36 | `/real-estate/tender/new` | Create Tender | DONE | Work package from BOQ, contractor invitation, terms, timeline |
| 37 | `/real-estate/contract/new` | Contract Entry | DONE | Item rate/lump sum/cost plus, retention %, terms, BOQ scope, milestones |
| 38 | `/real-estate/work-order/new` | Work Order Entry | DONE | Scope from contract, WBS, work items, schedule, milestones |
| 39 | `/real-estate/running-bill` | Running Bill (RA-003) | DONE | Line items, deductions, net payable, GL journal preview |
| 40 | `/real-estate/running-bill/new` | Running Bill Entry | DONE | Measurement → bill lines → deductions → certify → GL preview |
| 41 | `/real-estate/material-requisition` | Material Requisition | DONE | MR list + detail with stock availability |
| 42 | `/real-estate/material-requisition/new` | Create MR | DONE | Select items from BOQ, requested qty, WBS, estimated cost |
| 43 | `/real-estate/material-issue/new` | Material Issue | DONE | From approved MR, stock check, issue qty, gate pass, GL preview |
| 44 | `/real-estate/variation/new` | Change Request / Variation Order | DONE | CR → impact assessment → VO → budget adjustment → approval chain |

### Revenue & Finance

| # | Route | Screen | Status | What It Shows |
|---|---|---|---|---|
| 45 | `/real-estate/booking` | Unit Booking & Inventory | DONE | Unit grid with status colors + payment schedule |
| 46 | `/real-estate/booking/new` | Booking Wizard | DONE | 5-step: select unit → customer → price/discount → payment plan → confirm + GL |
| 47 | `/real-estate/booking/cancellation` | Booking Cancellation | DONE | Forfeiture calculation, refund, unit release, GL preview |
| 48 | `/real-estate/booking/transfer` | Unit Transfer | DONE | Old buyer → new buyer, settlement, transfer premium, GL preview |
| 49 | `/real-estate/budget` | Budget vs Actual | DONE | Waterfall, EAC, commitment tracking, variance |

### Close & Portal

| # | Route | Screen | Status | What It Shows |
|---|---|---|---|---|
| 50 | `/real-estate/handover` | Handover Dashboard | DONE | Clearance checklist, snag tracking |
| 51 | `/real-estate/handover/[unitId]` | Unit Handover Form | DONE | Clearances → inspection → snags → key handover → sign-off → documents |
| 52 | `/real-estate/closure` | Project Closure Wizard | DONE | Automated checks, financial summary, manual sign-offs, final actions |
| 53 | `/real-estate/buyer-portal` | Buyer Portal | DONE | Payment, progress, documents, handover, support |

### Reports (22 Reports)

| # | Route | Report | Status | What It Shows |
|---|---|---|---|---|
| 54 | `/real-estate/reports/project-pl` | Project P&L | DONE | Revenue, COGS, gross profit, overhead, net profit — feasibility vs actual |
| 55 | `/real-estate/reports/project-bs` | Project Balance Sheet | DONE | WIP by phase, AR, AP, retention, advances, net position |
| 56 | `/real-estate/reports/project-cashflow` | Project Cash Flow | DONE | Operating/investing/financing, monthly position |
| 57 | `/real-estate/reports/boq-variance` | BOQ Variance Report | DONE | Planned vs actual qty + rate + amount, variance % |
| 58 | `/real-estate/reports/commitment` | Commitment Report | DONE | Budget − Actual − Committed = Truly Available |
| 59 | `/real-estate/reports/eac` | Estimate at Completion | DONE | Actual + Committed + ETC = EAC, CPI/SPI |
| 60 | `/real-estate/reports/ar-aging` | AR Aging | DONE | Current, 30, 60, 90, >90 day buckets by customer/unit |
| 61 | `/real-estate/reports/sales-status` | Sales & Booking Status | DONE | Available/booked/sold/landowner by project |
| 62 | `/real-estate/reports/collection` | Collection Efficiency | DONE | Demanded vs collected by project/period |
| 63 | `/real-estate/reports/revenue-recognition` | Revenue Recognition Schedule | DONE | POC vs CC method, recognized vs deferred |
| 64 | `/real-estate/reports/unit-profitability` | Unit Profitability | DONE | Sale price − allocated cost per unit, margin |
| 65 | `/real-estate/reports/wip-movement` | WIP Movement | DONE | Opening + additions − transfers = closing by month |
| 66 | `/real-estate/reports/contractor-performance` | Contractor Performance | DONE | Cost, schedule, quality scores per contractor |
| 67 | `/real-estate/reports/material-consumption` | Material Consumption vs BOQ | DONE | BOQ vs purchased vs received vs consumed vs wasted |
| 68 | `/real-estate/reports/overhead-allocation` | Overhead Allocation | DONE | Driver, source account, allocation per project |
| 69 | `/real-estate/reports/feasibility-vs-actual` | Feasibility vs Actual | DONE | Line-by-line feasibility → actual comparison with variance |
| 70 | `/real-estate/reports/profit-erosion` | Profit Erosion (Detailed) | DONE | Factor-by-factor waterfall: where profit went |
| 71 | `/real-estate/reports/cost-intelligence` | Cost Intelligence | DONE | Item rates: standard, PO, market, actual, trend |
| 72 | `/real-estate/reports/cash-forecast` | Cash Flow Forecast | DONE | 12-month projection with funding gap |
| 73 | `/real-estate/reports/portfolio-risk` | Portfolio Risk Dashboard | DONE | Risk matrix, heat map, mitigation status |
| 74 | `/real-estate/reports/dsr-summary` | DSR Manpower Summary | DONE | Daily/weekly manpower by trade, equipment utilization |
| 75 | `/real-estate/reports/landowner-statement` | JV / Landowner Statement | DONE | Entitlement, allocation, payments, construction progress |

### Configuration

| # | Route | Screen | Status | What It Shows |
|---|---|---|---|---|
| 76 | `/real-estate/settings` | RE Module Settings | DONE | General settings, links to sub-config pages |
| 77 | `/real-estate/settings/lifecycle` | Lifecycle Stage Configuration | DONE | 10 stages with transitions, auto-checks, allowed operations |
| 78 | `/real-estate/settings/numbering` | Numbering Sequences | DONE | 12 entity sequences with prefix, format, reset rules |
| 79 | `/real-estate/settings/approval-workflows` | Approval Workflow Templates | DONE | 7 workflows with step chains, SLA, conditional rules |
| 80 | `/real-estate/settings/dimension-rules` | Dimension Rules | DONE | Required accounting dimensions per transaction type |

---

## Screen Flow — How a User Walks Through the System

### Flow 1: Land Lead → Project

```
Land Leads (/land-leads)
  → "+ Add Lead" button
    → Add Land Lead (/land-leads/new)
  → "View" a lead
    → Land Lead Detail (/land-leads/[id])
      → "Record Site Visit" button
        → Site Visit (/land-leads/[id]/site-visit)
      → "Due Diligence" button
        → Due Diligence (/land-leads/[id]/due-diligence)
      → "Create Opportunity" button
        → Create Opportunity (/opportunity/new)
          OR
        → Opportunity (/opportunity)
          → Pre-dev expenses tracked
          → "Start Feasibility" button
            → Create Feasibility (/feasibility/new)
              → 7-step wizard
              → "Approve" → status changes
            → Feasibility Workspace (/feasibility)
              → "Convert to Project" button
                → Project Creation Wizard (/opportunity/convert)
                  → Set RC/CC/PC
                  → Transfer pre-dev costs
                  → "Create Project"
                    → Project Detail (/projects/[id])
```

### Flow 2: Land Agreement (Purchase or JV)

```
Land Lead qualified
  → Land Agreement (/land-agreement/new)
    → PURCHASE mode: seller, price, payment schedule, registration
    → JV mode: parties, share split, entitlement
      → JV Entitlement Builder (/land-agreement/jv)
        → Allocate specific units to landowner/developer
        → Balance check
```

### Flow 3: Project → BOQ → Budget

```
Project Detail (/projects/[id])
  → "WBS" tab or link
    → WBS Builder (/wbs)
      → Build tree: Project → Tower → Trade → Activity
      → Leaf nodes accept BOQ items
  → "BOQ" tab
    → BOQ List (/boq)
      → "+ Add BOQ Line"
        → BOQ Line Entry (/boq/new)
          → Select WBS node, cost code
          → "Open Measurement Sheet"
            → Measurement Sheet (/boq/measurement)
          → "Open Rate Analysis"
            → Rate Analysis (/boq/rate-analysis)
          → Qty × Rate = Amount
          → "Add to BOQ"
      → BOQ Approval (/boq/approve)
        → Draft → Reviewed → Approved → Locked
      → "Generate Budget" → creates BudgetLine entries
```

### Flow 4: Tender → Contract → Work Order → Running Bill

```
BOQ locked
  → "Create Tender" for a work package
    → Create Tender (/tender/new)
      → Scope from BOQ, invite contractors
    → Tender & CS (/tender)
      → Comparative Statement → rank → recommend
      → "Award Contract"
        → Contract Entry (/contract/new)
          → Terms, retention, scope, milestones
          → Work Order (/work-order/new)
            → Subset of contract, specific activities
            → Contractor executes
            → Joint Measurement
              → Running Bill Entry (/running-bill/new)
                → Measurement → deductions → certify
                → GL preview: DR WIP / CR AP + Retention + TDS
              → Running Bill View (/running-bill)
                → Posted bill details
```

### Flow 5: Material Requisition → Issue → Consumption

```
Site engineer needs material
  → Create MR (/material-requisition/new)
    → Select items from BOQ, enter qty
    → PM approves
  → Material Requisition List (/material-requisition)
  → Material Issue (/material-issue/new)
    → From approved MR, select store, issue qty
    → Gate pass, batch tracking
    → GL: DR WIP / CR Inventory
    → BOQ Consumption updated
```

### Flow 6: Unit Booking → Collection → Revenue

```
Unit Inventory (/booking)
  → Available unit → "Book"
    → Booking Wizard (/booking/new)
      → Select unit → Customer → Price/Discount → Payment Plan → Confirm
      → GL: DR Cash / CR Booking Advance (Liability)
  → Unit Transfer (/booking/transfer)
    → Old buyer → new buyer, settlement
  → Booking Cancellation (/booking/cancellation)
    → Forfeiture, refund, unit released
  → Installment due → demand note generated
  → Customer pays → collection posted
  → Revenue recognized (POC or CC)
    → GL: DR AR / CR Revenue + DR COGS / CR WIP
```

### Flow 7: Variation Orders

```
Change needed during execution
  → Variation Order (/variation/new)
    → Part 1: Change Request with impact assessment
    → Part 2: Variation Order with approval chain
    → Approved VO adjusts budget and WBS allocation
```

### Flow 8: DSR → Progress → Reports

```
Engineering team daily:
  → DSR Entry (/dsr/new)
    → Manpower, equipment, work done, issues, photos
    → "Submit DSR"
  → Work logs update activity progress
  → Progress feeds:
    → CEO Dashboard (/dashboards/ceo)
    → Project Director Dashboard (/dashboards/project-director)
    → Site Engineering Dashboard (/dashboards/site-engineering)
    → Project Detail (/projects/[id])
    → Buyer Portal (/buyer-portal) → construction progress
```

### Flow 9: Handover → Closure

```
All construction complete
  → Handover Dashboard (/handover)
    → Unit inspection → snag list
  → Unit Handover Form (/handover/[unitId])
    → Clearances → inspection → key handover → sign-off
    → Revenue recognized (CC method)
    → Unit status → HANDED_OVER
  → DLP period (12-24 months)
  → All DLP expired → Project Closure (/closure)
    → Automated checks (WIP=0, AR=0, all handed over)
    → Financial summary
    → Manual sign-offs
    → Project sealed
```

---

## Reports Map

| Category | Reports |
|---|---|
| **Financial** | Project P&L, Project Balance Sheet, Project Cash Flow, Cash Forecast |
| **Cost Control** | BOQ Variance, Commitment, EAC, Profit Erosion, Cost Intelligence |
| **Revenue** | AR Aging, Sales Status, Collection Efficiency, Revenue Recognition, Unit Profitability |
| **Operations** | WIP Movement, Contractor Performance, Material Consumption, DSR Summary |
| **Corporate** | Overhead Allocation, Portfolio Risk, Feasibility vs Actual, Landowner Statement |

## Dashboards Map

| Dashboard | Audience | Key Focus |
|---|---|---|
| Portfolio Dashboard | Everyone | All projects overview |
| CEO Dashboard | CEO/MD | Portfolio KPIs, profit erosion, decisions |
| CFO Dashboard | CFO/Finance | Cash, AR/AP, fund requirements, working capital |
| Project Director | Project Head | Health indices, progress, contractors, critical path |
| Procurement | Procurement Head | MRs, tenders, rates, suppliers |
| Sales | Sales Head | Bookings, velocity, performers, demands |
| Site Engineering | Site Team | Manpower, equipment, work fronts, issues |
| Land & Development | Business Dev | Lead pipeline, opportunities, feasibility, agreements |

---

## Technical Notes for Developers

- **All data is in `src/lib/mock-data.ts` + inline constants per screen** — add new exports there for shared data
- **Sidebar navigation is in `src/app/real-estate/layout.tsx`** — 8 sections, all routes registered
- **No auth, no database** — every page is a static React component
- **shadcn/ui components available:** Card, Badge, Button, Table, Tabs, Progress, Input, Textarea, Dialog, Sheet, Separator, Select, ScrollArea, Tooltip, Avatar, Chart
- **Icons:** lucide-react
- **Currency:** Always BDT, use `formatBDT()` and `formatNumber()` helpers
- **Status badges:** Consistent colors — green (done/active), blue (in progress), yellow (warning), red (critical/overdue), gray (pending/not started), purple (planned)
- **This prototype serves as the UI reference for the real build** — when implementing in the actual ERP, developers should match these layouts and data shapes

---

## Related Spec Documents

All implementation specs are in the main repo: `abcERPCode/07-abcerp-code-reference/13-real-estate-development/`

| Document | What It Covers |
|---|---|
| `BUILD-TRACKER.md` | 18-phase implementation roadmap with dependencies |
| `ARCHITECTURE-DECISIONS.md` | 14 ADRs — why the system is designed this way |
| `CODEBASE-IMPACT-ANALYSIS.md` | Dev codebase model names + migration SQL |
| `09-operations-to-financials-flow.md` | Master flow: Land Lead → Project Closure |
| `10-entity-relationship-map.md` | ~153 entities with all FK relationships |
| `21-reporting-architecture.md` | 558 reports + 8 dashboards |

---

_This prototype is a reference tool — not a production application. Every screen is a conversation starter with end users: "Is this what you need? What's missing? What should change?"_
