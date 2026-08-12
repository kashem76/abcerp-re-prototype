# AbcERP Real Estate — Prototype Build Tracker

**Purpose:** This prototype is a clickable reference for end users and developers. It demonstrates the complete real estate development lifecycle — from land lead to project closure — using static mock data. No database, no API, no auth.

**Tech:** Next.js 15 + shadcn/ui + Tailwind CSS + TypeScript
**Data:** All static JSON in `src/lib/mock-data.ts`
**Live URL:** [Vercel Deployment](https://abcerp-re-prototype-8cga0texo-kashem76s-projects.vercel.app)

---

## What's Built (28 screens)

### Overview & Dashboards

| # | Route | Screen | Status | What It Shows |
|---|---|---|---|---|
| 1 | `/real-estate` | Portfolio Dashboard | DONE | All projects with budget, spent, forecast, sold units, health scores |
| 2 | `/real-estate/dashboards/ceo` | CEO Dashboard | DONE | Portfolio KPIs, financial position, sales position, profit erosion analysis, risk matrix, alerts, pending decisions |
| 3 | `/real-estate/projects` | Projects List | DONE | Project cards with stage, budget, revenue, completion |
| 4 | `/real-estate/projects/[id]` | Project Detail | DONE | Phase progress, KPIs, alerts |

### Pre-Project Flow (Land → Feasibility → Project)

| # | Route | Screen | Status | What It Shows |
|---|---|---|---|---|
| 5 | `/real-estate/land-leads` | Land Lead List | DONE | Pipeline with status badges, source, area, price/katha |
| 6 | `/real-estate/land-leads/[id]` | Land Lead Detail | DONE | Parcels, owners, due diligence checklist, documents, site visits |
| 7 | `/real-estate/opportunity` | Development Opportunity | DONE | Pre-dev expenses (real GL postings), cost center |
| 8 | `/real-estate/opportunity/convert` | Project Creation Wizard | DONE | Opportunity → Project conversion with RC/CC/PC and cost transfer |
| 9 | `/real-estate/feasibility` | Feasibility Workspace | DONE | Revenue/cost/metrics, scenario comparison, cash flow |

### Planning & BOQ

| # | Route | Screen | Status | What It Shows |
|---|---|---|---|---|
| 10 | `/real-estate/wbs` | WBS Builder | DONE | Expandable tree (4 levels), leaf nodes show BOQ item count |
| 11 | `/real-estate/boq` | BOQ List (Variance View) | DONE | Items with BOQ vs actual variance, locked baseline |
| 12 | `/real-estate/boq/new` | BOQ Line Entry | DONE | WBS + cost code + quantity + rate = amount |
| 13 | `/real-estate/boq/measurement` | Measurement Sheet | DONE | L×W×H×Nos with live calculation |
| 14 | `/real-estate/boq/rate-analysis` | Rate Analysis | DONE | Material/labour/equipment/overhead breakdown |
| 15 | `/real-estate/masters/cost-codes` | Cost Code Master | DONE | 18 codes, 6 categories, CRUD |
| 16 | `/real-estate/masters/boq-items` | BOQ Item Master | DONE | 8 items, linked to Item master, CRUD |
| 17 | `/real-estate/masters/rate-templates` | Rate Analysis Templates | DONE | 8 templates, component counts, CRUD |

### Execution

| # | Route | Screen | Status | What It Shows |
|---|---|---|---|---|
| 18 | `/real-estate/dsr` | DSR List | DONE | Recent DSRs with manpower/equipment/issue counts |
| 19 | `/real-estate/dsr/new` | DSR Entry | DONE | 5-tab form: manpower, equipment, work done, issues, photos |
| 20 | `/real-estate/tender` | Tender & Comparative Statement | DONE | 4 bids, scoring, line-level rate comparison, ranking |
| 21 | `/real-estate/running-bill` | Running Bill (RA-003) | DONE | Line items, deductions, net payable, GL journal preview |
| 22 | `/real-estate/material-requisition` | Material Requisition | DONE | MR list + detail with stock availability |

### Revenue & Finance

| # | Route | Screen | Status | What It Shows |
|---|---|---|---|---|
| 23 | `/real-estate/booking` | Unit Booking & Inventory | DONE | Unit grid with status colors + payment schedule |
| 24 | `/real-estate/budget` | Budget vs Actual | DONE | Waterfall, EAC, commitment tracking, variance |

### Close & Portal

| # | Route | Screen | Status | What It Shows |
|---|---|---|---|---|
| 25 | `/real-estate/handover` | Handover Dashboard | DONE | Clearance checklist, snag tracking |
| 26 | `/real-estate/buyer-portal` | Buyer Portal | DONE | Payment, progress, documents, handover, support |

---

## What Needs to Be Added

### Action Screens (Add/Create/Edit forms)

These screens let the user understand how they will add data at each step — not functional, but showing the form layout with fields, dropdowns, and buttons.

| # | Route (proposed) | Screen | Priority | What It Needs |
|---|---|---|---|---|
| 27 | `/real-estate/land-leads/new` | Add Land Lead | HIGH | Form: location, mouza, area, khatian/dag, estimated price, source, assigned to |
| 28 | `/real-estate/land-leads/[id]/site-visit` | Record Site Visit | HIGH | Form: date, purpose, findings, recommendation, photo upload |
| 29 | `/real-estate/land-leads/[id]/due-diligence` | Due Diligence Entry | HIGH | Checklist with category, check item, status dropdowns, findings |
| 30 | `/real-estate/opportunity/new` | Create Opportunity | HIGH | Form: from lead, title, estimated costs, assign RC/CC |
| 31 | `/real-estate/feasibility/new` | Create Feasibility | HIGH | Multi-step: land assumptions → development plan → area → unit mix → revenue → cost → finance → scenarios |
| 32 | `/real-estate/land-agreement/new` | Land Agreement Entry | HIGH | Purchase vs JV toggle, parties, price/share %, payment schedule |
| 33 | `/real-estate/land-agreement/jv` | JV Entitlement Builder | HIGH | Landowner share: units, parking, cash — allocation tool |
| 34 | `/real-estate/projects/new` | Create Project (Standalone) | MEDIUM | Direct project creation (not from opportunity) |
| 35 | `/real-estate/boq/approve` | BOQ Approval Workflow | MEDIUM | Draft → Reviewed → Approved → Locked flow |
| 36 | `/real-estate/booking/new` | Booking Wizard | HIGH | Select unit → customer → discount → payment plan → confirm |
| 37 | `/real-estate/booking/cancellation` | Booking Cancellation | MEDIUM | Forfeiture calculation, refund, unit release |
| 38 | `/real-estate/booking/transfer` | Unit Transfer | MEDIUM | Old buyer → new buyer, settlement |
| 39 | `/real-estate/tender/new` | Create Tender | MEDIUM | Work package from BOQ, invite contractors |
| 40 | `/real-estate/contract/new` | Contract Entry | MEDIUM | Item rate / lump sum / cost plus, retention %, terms |
| 41 | `/real-estate/work-order/new` | Work Order Entry | MEDIUM | Scope from contract, WBS, cost code |
| 42 | `/real-estate/running-bill/new` | Running Bill Entry | HIGH | Measurement → bill lines → deductions → certify |
| 43 | `/real-estate/material-requisition/new` | Create MR | MEDIUM | Select items from BOQ, requested qty, WBS |
| 44 | `/real-estate/material-issue/new` | Material Issue | MEDIUM | From approved MR, select store, issue qty |
| 45 | `/real-estate/variation/new` | Change Request / Variation Order | MEDIUM | CR → evaluate → VO → budget impact |
| 46 | `/real-estate/handover/[unitId]` | Unit Handover Form | MEDIUM | Clearance checklist → inspection → key handover → sign-off |
| 47 | `/real-estate/closure` | Project Closure Wizard | MEDIUM | Automated checks (WIP=0, AR=0) + manual sign-offs |

### Report Screens

Each report shows a sample output with realistic data. Users validate: "Is this the report I need? Does it show the right columns?"

| # | Route (proposed) | Report | Priority | Key Columns / Metrics |
|---|---|---|---|---|
| 48 | `/real-estate/reports/project-pl` | Project P&L | HIGH | Revenue, COGS, gross profit, overhead, net profit by project |
| 49 | `/real-estate/reports/project-bs` | Project Balance Sheet | HIGH | WIP, AR, AP, retention, advances per project |
| 50 | `/real-estate/reports/project-cashflow` | Project Cash Flow | HIGH | Collections vs construction payments by month |
| 51 | `/real-estate/reports/boq-variance` | BOQ Variance Report | HIGH | Planned vs actual qty + rate + amount, variance % |
| 52 | `/real-estate/reports/commitment` | Commitment Report | HIGH | Budget − Actual − Committed = Truly Available |
| 53 | `/real-estate/reports/eac` | Estimate at Completion | HIGH | Actual + Committed + Cost-to-Complete = EAC |
| 54 | `/real-estate/reports/ar-aging` | AR Aging | HIGH | Current, 30, 60, 90, >90 day buckets by customer/unit |
| 55 | `/real-estate/reports/sales-status` | Sales & Booking Status | HIGH | Available/booked/sold/landowner by project |
| 56 | `/real-estate/reports/collection` | Collection Efficiency | HIGH | Demanded vs collected by project/period |
| 57 | `/real-estate/reports/revenue-recognition` | Revenue Recognition Schedule | MEDIUM | Recognized vs total expected, % complete per project |
| 58 | `/real-estate/reports/unit-profitability` | Unit Profitability | MEDIUM | Sale price − allocated cost per unit, margin |
| 59 | `/real-estate/reports/wip-movement` | WIP Movement | MEDIUM | Opening + additions − transfers = closing by project |
| 60 | `/real-estate/reports/contractor-performance` | Contractor Performance | MEDIUM | Cost, schedule, quality scores per contractor |
| 61 | `/real-estate/reports/material-consumption` | Material Consumption vs BOQ | MEDIUM | BOQ qty vs purchased vs received vs consumed vs wasted |
| 62 | `/real-estate/reports/overhead-allocation` | Overhead Allocation | MEDIUM | Driver, source account, allocation per project |
| 63 | `/real-estate/reports/feasibility-vs-actual` | Feasibility vs Actual | HIGH | Line-by-line feasibility → actual comparison with variance |
| 64 | `/real-estate/reports/profit-erosion` | Profit Erosion (detailed) | MEDIUM | Factor-by-factor: where profit went |
| 65 | `/real-estate/reports/cost-intelligence` | Cost Intelligence | MEDIUM | Item rates: standard, PO, RFQ, actual, trend |
| 66 | `/real-estate/reports/cash-forecast` | Cash Flow Forecast | HIGH | 3/6/12 month projection with funding gap |
| 67 | `/real-estate/reports/portfolio-risk` | Portfolio Risk Dashboard | MEDIUM | Risk matrix across all projects |
| 68 | `/real-estate/reports/dsr-summary` | DSR Manpower Summary | MEDIUM | Daily/weekly manpower by trade and project |
| 69 | `/real-estate/reports/landowner-statement` | JV / Landowner Statement | MEDIUM | Entitlement, allocation, payments, outstanding |

### Additional Dashboards

| # | Route (proposed) | Dashboard | Priority |
|---|---|---|---|
| 70 | `/real-estate/dashboards/cfo` | CFO Dashboard | HIGH |
| 71 | `/real-estate/dashboards/project-director` | Project Director Dashboard | HIGH |
| 72 | `/real-estate/dashboards/procurement` | Procurement Head Dashboard | MEDIUM |
| 73 | `/real-estate/dashboards/sales` | Sales Head Dashboard | MEDIUM |
| 74 | `/real-estate/dashboards/site-engineering` | Site Engineering Dashboard | MEDIUM |
| 75 | `/real-estate/dashboards/land-dev` | Land / Development Dashboard | MEDIUM |

### Configuration Screens

| # | Route (proposed) | Screen | Priority |
|---|---|---|---|
| 76 | `/real-estate/settings` | RE Module Settings | MEDIUM |
| 77 | `/real-estate/settings/lifecycle` | Lifecycle Stage Configuration | LOW |
| 78 | `/real-estate/settings/numbering` | Numbering Sequences | LOW |
| 79 | `/real-estate/settings/approval-workflows` | Approval Workflow Templates | LOW |
| 80 | `/real-estate/settings/dimension-rules` | Dimension Rules | LOW |

---

## Screen Flow — How a User Walks Through the System

### Flow 1: Land Lead → Project

```
Land Leads (/land-leads)
  → "View" a lead
    → Land Lead Detail (/land-leads/[id])
      → Due diligence checklist
      → Site visit records
      → "Create Opportunity" button
        → Opportunity (/opportunity)
          → Pre-dev expenses tracked
          → "Start Feasibility" button
            → Feasibility (/feasibility)
              → Revenue, cost, scenarios
              → "Approve" → status changes
              → "Convert to Project" button
                → Project Creation Wizard (/opportunity/convert)
                  → Set RC/CC/PC
                  → Transfer pre-dev costs
                  → "Create Project"
                    → Project Detail (/projects/[id])
```

### Flow 2: Project → BOQ → Budget

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
              → L × W × H × Nos → computed qty
          → "Open Rate Analysis"
            → Rate Analysis (/boq/rate-analysis)
              → Material + labour + equipment + overhead → rate
          → Qty × Rate = Amount
          → "Add to BOQ"
      → Approve BOQ → Lock as Baseline
      → "Generate Budget" → creates BudgetLine entries
```

### Flow 3: Tender → Contract → Running Bill

```
BOQ locked
  → "Create Tender" for a work package
    → Tender (/tender)
      → Contractors submit bids
      → Comparative Statement → rank → recommend
      → "Award Contract"
        → Contract Entry (contract/new) [TO BUILD]
          → Work Order issued
            → Contractor executes
            → Joint Measurement
              → Running Bill (/running-bill)
                → Gross − Retention − Advance − TDS = Net Payable
                → GL preview: DR WIP / CR AP + Retention + TDS
                → "Post to GL"
```

### Flow 4: Material Requisition → Issue → Consumption

```
Site engineer needs material
  → Material Requisition (/material-requisition)
    → Select items from BOQ, enter qty
    → PM approves
    → Storekeeper creates Material Issue [TO BUILD]
      → Stock check → issue → GL: DR WIP / CR Inventory
      → BOQ Consumption updated
```

### Flow 5: Unit Booking → Collection → Revenue

```
Unit Inventory (/booking)
  → Available unit → "Book"
    → Booking Wizard [TO BUILD]
      → Customer details
      → Discount approval (if any)
      → Payment plan (milestone/time-based)
      → "Confirm Booking"
        → Unit status → BOOKED
        → GL: DR Cash / CR Booking Advance (Liability)
  → Installment due → demand note generated
  → Customer pays → collection posted
  → Revenue recognized (POC or CC)
    → GL: DR AR / CR Revenue + DR COGS / CR WIP
```

### Flow 6: DSR → Progress → Reports

```
Engineering team daily:
  → DSR Entry (/dsr/new)
    → Manpower, equipment, work done, issues, photos
    → "Submit DSR"
  → Work logs update activity progress
  → Progress feeds:
    → CEO Dashboard (/dashboards/ceo)
    → Project Detail (/projects/[id])
    → Buyer Portal (/buyer-portal) → construction progress
```

### Flow 7: Handover → Closure

```
All construction complete
  → Handover (/handover)
    → Unit inspection → snag list
    → Clearances: construction, snags, accounts, agreement, docs, registration
    → All clear → "Complete Handover"
      → Revenue recognized (CC method)
      → Unit status → HANDED_OVER
  → DLP period (12-24 months)
  → All DLP expired → Project Closure [TO BUILD]
    → WIP = 0, AR = 0, provisions settled
    → Feasibility vs Actual comparison
    → Project sealed
```

---

## Priority for Next Build

### Must Have (show end users first)

1. **Booking Wizard** — the sales team's primary workflow
2. **Add Land Lead** — how does a new lead enter the system?
3. **Running Bill Entry** — how does the engineer create a bill (not just view)?
4. **Project P&L Report** — the #1 financial report
5. **AR Aging Report** — the #1 collection report
6. **CFO Dashboard** — second most important dashboard
7. **Feasibility vs Actual Report** — the accountability report
8. **Cash Flow Forecast Report** — when do we need money?

### Should Have

9. All remaining action forms (contract, work order, MR, variation)
10. BOQ vs Variance report (detailed)
11. Commitment report
12. EAC report
13. Unit Profitability report
14. Project Director dashboard

### Nice to Have

15. Configuration screens
16. Remaining dashboards (procurement, sales, site engineering)
17. Remaining reports (contractor performance, material consumption, DSR summary)

---

## Technical Notes for Developers

- **All data is in `src/lib/mock-data.ts`** — add new exports there for new screens
- **Sidebar navigation is in `src/app/real-estate/layout.tsx`** — add new routes there
- **No auth, no database** — every page is a static React component reading from mock-data
- **shadcn/ui components available:** Card, Badge, Button, Table, Tabs, Progress, Input, Textarea, Dialog, Sheet, Separator, Select, ScrollArea, Tooltip, Avatar
- **Icons:** lucide-react
- **Currency:** Always BDT, use `formatBDT()` and `formatNumber()` helpers
- **Status badges:** Use consistent colors — green (done/active), blue (in progress), yellow (warning), red (critical/overdue), gray (pending/not started), purple (planned)
- **This prototype serves as the UI reference for the real build** — when implementing in the actual ERP (`/Users/abulkashem/projects/abcerp`), developers should match these layouts and data shapes

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
