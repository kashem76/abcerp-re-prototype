# AbcERP Real Estate Prototype — Build Plan

**Purpose:** This is the build roadmap for the prototype. It defines what to build, in what order, what depends on what, and where to find the spec for each piece.

**Rule:** Each release is independently demoable. No release depends on a future release. Within a release, screens can be built in parallel.

**Current State:** 80+ screens built, 6 rewritten (Land module), 25 spec docs completed.

---

## Release Summary

| Release | Name | New Screens | Focus | Depends On | Spec Docs |
|---|---|---|---|---|---|
| **R1** | Land Evaluation Module | 15 | Land pipeline → evaluation → decision | — | 05, 06, 07 |
| **R2** | Project Foundation | 10 | Project creation, WBS, phases, BOQ | R1 (conversion) | 09, 11 |
| **R3** | Execution Core | 14 | Tender, contract, running bill, DSR, MR/MI | R2 (BOQ) | 12, 13 |
| **R4** | Sales & Revenue | 12 | Booking, collections, revenue recognition | R2 (units) | 14 |
| **R5** | Change Control & Close | 6 | Variation, handover, closure | R3, R4 | 15, 16 |
| **R6** | Dashboards & Reports | 30 | 8 dashboards + 22 reports | R4 (data) | 18 |
| **R7** | Configuration & Settings | 9 | All settings screens | — (can build anytime) | 08 |
| — | **ABOVE = DONE (80+ screens)** | — | — | — | — |
| **R8** | Sales CRM Pipeline | 12 | Lead → follow-up → quote → reservation → booking | R4 (booking) | 23 |
| **R9** | Construction Loans & Collections | 9 | Loan tracking, demand letters, penalty, FIFO allocation | R4 (payments) | 24 |
| **R10** | Construction Scheduling | 6 | Gantt, baseline, CPM, S-curve, look-ahead | R3 (WBS) | 20 §1 |
| **R11** | Quality Management | 5 | Inspection plans, NCR, concrete testing | R3 (WBS) | 20 §3 |
| **R12** | Safety Management | 4 | Incidents, permits, toolbox talks, equipment certs | R3 (DSR) | 20 §4 |
| **R13** | Drawing & Document Mgmt | 5 | Drawing register, revision control, RFI, site instructions | R3 (project) | 20 §2 |
| **R14** | Resource Management | 4 | Labour muster roll, equipment register, cost allocation | R3 (DSR) | 20 §5 |
| **R15** | Contractor Enhancements | 4 | EOT claims, LD calculation, hindrance register, performance scoring | R3 (contracts) | 20 §6 |
| **R16** | Regulatory & Compliance | 4 | Permit tracking, escrow, tax certificates, e-invoicing | R7 (config) | 22 §B |

---

## What's Done (R1-R7)

```
R1 ✅  Land Evaluation (15 screens)
       Pipeline, Add Land, Workspace Overview, Work Board, Step Assessment,
       Site Assessment, Evaluation Overview, Financial Model, Decision,
       + 7 Settings screens

R2 ✅  Project Foundation (10 screens)
       Project List, Project Detail, Create Project, WBS Builder,
       BOQ List, BOQ Entry, Measurement Sheet, Rate Analysis, BOQ Approval,
       + 3 Master screens (Cost Codes, BOQ Items, Rate Templates)

R3 ✅  Execution Core (14 screens)
       Tender/CS, Create Tender, Contract Entry, Work Order, Running Bill,
       Running Bill Entry, DSR List, DSR Entry, Material Requisition,
       Create MR, Material Issue, Variation Order

R4 ✅  Sales & Revenue (12 screens)
       Booking/Inventory Grid, Booking Wizard, Cancellation, Transfer,
       Budget vs Actual, Buyer Portal

R5 ✅  Change Control & Close (6 screens)
       Handover Dashboard, Unit Handover, Project Closure

R6 ✅  Dashboards & Reports (30 screens)
       8 dashboards (CEO, CFO, PM, Procurement, Sales, Site Eng, Land Dev, Portfolio)
       22 reports (P&L, BS, Cash Flow, BOQ Variance, Commitment, EAC, AR Aging, etc.)

R7 ✅  Configuration & Settings (9 screens)
       General Settings, Lifecycle, Numbering, Approval Workflows, Dimension Rules,
       Land Evaluation Hub, Selection, Frameworks, Criteria, Cost, Report
```

---

## What's Next (R8-R16) — Dependency Graph

```
DONE (R1-R7)
    │
    ├──► R8: Sales CRM Pipeline                    ← REVENUE SIDE
    │     (leads, follow-up, quotation,              Pre-booking funnel
    │      reservation, broker commission)            fills the biggest gap
    │
    ├──► R9: Construction Loans & Collections      ← FINANCE SIDE
    │     (loan draw-down, interest capitalization,   95% of developers need this
    │      demand letters, penalty, FIFO)             IAS 23 compliance
    │
    ├──► R10: Construction Scheduling              ← DELIVERY SIDE
    │     (Gantt, baseline, CPM, S-curve,             Planning Engineer's entire job
    │      look-ahead, delay analysis)                Feeds SPI, revenue recognition
    │         │
    │         ├──► R13: Drawing & Document Mgmt    ← depends on project/WBS
    │         │
    │         └──► R15: Contractor Enhancements    ← depends on scheduling for EOT
    │
    ├──► R11: Quality Management                   ← DELIVERY SIDE
    │     (inspection plans, NCR, concrete test,     5-15% rework cost untracked
    │      rework cost tracking)                     without this
    │
    ├──► R12: Safety Management                    ← DELIVERY SIDE
    │     (incidents, permits, toolbox talks,         Mandatory in UAE/KSA
    │      equipment certifications)                  Legal compliance
    │
    ├──► R14: Resource Management                  ← COST SIDE
    │     (labour muster, equipment register,         25-35% of cost (labour)
    │      cost allocation to project/WBS)            5-10% of cost (equipment)
    │
    └──► R16: Regulatory & Compliance              ← MARKET ENTRY
          (permit tracking, escrow accounts,          Required for UAE/KSA entry
           tax certificates, e-invoicing)             Country-specific
```

### Parallel Tracks

R8, R9, R10, R11, R12, R14 can all run in parallel — they have no dependencies on each other. Only R13 (drawings) and R15 (contractor enhancements) depend on R10 (scheduling).

```
TRACK A (Revenue)        TRACK B (Finance)       TRACK C (Delivery)       TRACK D (Compliance)
─────────────────       ─────────────────       ─────────────────        ─────────────────
R8: Sales CRM           R9: Loans &             R10: Scheduling          R16: Regulatory
                         Collections             R11: Quality
                                                 R12: Safety
                                                 R13: Drawings (after R10)
                                                 R14: Resources
                                                 R15: Contractor+ (after R10)
```

---

## R8 — Sales CRM Pipeline (P0)

**What:** The pre-booking sales funnel. Lead capture → follow-up → site visit → quotation → reservation → booking conversion → broker management.

**Why First:** Biggest blind spot. Every developer has a sales team working leads before booking. Currently we jump from "unit available" to "booking wizard" with no journey in between.

**Spec:** `23-sales-crm-spec.md`

### Screens to Build

| # | Screen | Route | What It Shows | Effort |
|---|---|---|---|---|
| 8.1 | Sales Dashboard / Funnel | `sales/dashboard` | Funnel visualization, KPIs, today's tasks, lead source analysis | Large |
| 8.2 | Lead List | `sales/leads` | All leads with filters (stage, source, assigned, project, priority) | Medium |
| 8.3 | Add Lead | `sales/leads/new` | Quick form: name, phone, source, project, unit type, budget | Small |
| 8.4 | Lead Detail | `sales/leads/[id]` | Timeline (follow-ups, visits, quotes), current stage, actions | Large |
| 8.5 | Follow-Up Log | Inside lead detail | Add/view follow-up entries with outcome and next date | Small |
| 8.6 | Schedule Site Visit | Inside lead detail | Date, time, units to show, notification | Small |
| 8.7 | Generate Quotation | `sales/leads/[id]/quote` | Unit selection, pricing (from price list), payment plan, PDF preview | Medium |
| 8.8 | Reserve Unit | Inside lead detail | Select unit, set expiry, optional fee | Small |
| 8.9 | Convert to Booking | Inside lead detail | Pre-fill booking wizard from lead/quotation data | Small |
| 8.10 | Broker List | `sales/brokers` | All brokers with performance, commission balance | Medium |
| 8.11 | Broker Detail | `sales/brokers/[id]` | Leads referred, conversions, commission history | Medium |
| 8.12 | Broker Commission Approval | `sales/brokers/[id]/commission` | Pending commissions, approve/reject | Small |

### Data Dependencies

| This Screen Reads | From |
|---|---|
| Available units + prices | R4: PropertyUnit[] + PriceList (already built) |
| Payment plan templates | R4: PaymentPlanTemplate (already built) |
| Project list | R2: RealEstateProject[] (already built) |
| Broker master | NEW: Broker entity (created in this release) |
| Lead source config | NEW: Config (created in this release) |

### Acceptance Criteria

- [ ] Lead can be created in under 30 seconds (name + phone + source + project)
- [ ] Follow-up reminders appear on dashboard when overdue
- [ ] Quotation generates a PDF with pricing from project price list
- [ ] Reservation blocks the unit (RESERVED status) with auto-expiry
- [ ] Converting to booking pre-fills the existing booking wizard — no re-entry
- [ ] Broker commission computed automatically on booking conversion
- [ ] Sales funnel shows conversion rates between every stage
- [ ] Lost lead analysis shows reasons for non-conversion

**Estimated Effort:** 5-7 days

---

## R9 — Construction Loans & Collections (P0)

**What:** Construction loan tracking with IAS 23 interest capitalization. Collections management with demand letters, penalty interest, and FIFO payment allocation.

**Why:** 95% of developers use bank financing. Without loan tracking, project cost is understated. Without systematic collections, cash flow bleeds.

**Spec:** `24-construction-loans-collections.md`

### Screens to Build

| # | Screen | Route | What It Shows | Effort |
|---|---|---|---|---|
| **Loans** |
| 9.1 | Loan Register | `finance/loans` | All loans with balance, draw-down %, repayment status | Medium |
| 9.2 | Loan Detail | `finance/loans/[id]` | Draw-down history, interest schedule, repayment history, running balance | Large |
| 9.3 | Add Loan | `finance/loans/new` | Bank, amount, rate, tenure, draw-down milestones, repayment terms | Medium |
| 9.4 | Monthly Interest Run | `finance/loans/interest` | Compute + preview interest for all active loans, capitalized vs expensed | Medium |
| **Collections** |
| 9.5 | Collections Dashboard | `sales/collections` | Demanded vs collected, overdue aging, actions due, efficiency trend | Large |
| 9.6 | Generate Demand Letters | `sales/collections/demands` | Batch generate for all overdue, preview before send | Medium |
| 9.7 | Demand Letter Preview | `sales/collections/demands/[id]` | PDF letter with customer, unit, amount, due date, penalty | Small |
| 9.8 | Penalty Interest Run | `sales/collections/penalty` | Compute + preview penalty for all overdue, post to AR | Medium |
| 9.9 | Payment Allocation | Inside CustomerReceipt | FIFO allocation of partial payment against installments | Medium |

### Data Dependencies

| This Screen Reads | From |
|---|---|
| Project phases (for draw-down milestones) | R2: ProjectPhase[] (already built) |
| Unit bookings + payment schedules | R4: UnitBooking[], PaymentSchedule[] (already built) |
| Customer receipts | R4: CustomerReceipt[] (already built) |
| Bank master | Core: BankAccount (referenced) |
| GL accounts | R7: Config > Chart of Accounts mapping (already built) |

### Acceptance Criteria

- [ ] Loan draw-down cannot exceed sanctioned amount (hard block)
- [ ] Interest auto-capitalizes to WIP during construction, expenses to P&L after practical completion
- [ ] Repayment from sales auto-computes when collection is posted (configurable %)
- [ ] Demand letters generate as PDF with configurable template
- [ ] Penalty interest computes based on overdue days × rate (configurable)
- [ ] Partial payment FIFO allocates against oldest outstanding installment
- [ ] Collections dashboard shows efficiency trend by project and period
- [ ] Loan balance reconciles with bank statement (period-close check)

**Estimated Effort:** 5-7 days

---

## R10 — Construction Scheduling (P1)

**What:** Activity-level construction schedule with baseline, critical path, S-curve, look-ahead, and delay analysis.

**Why:** Planning Engineer's entire job. Without it: no baseline to measure delay, no critical path to protect, no SPI computation, no look-ahead for resource planning.

**Spec:** `20-construction-management-gaps.md` Section 1

### Screens to Build

| # | Screen | Route | What It Shows | Effort |
|---|---|---|---|---|
| 10.1 | Schedule Overview | `projects/[id]/schedule` | Simple Gantt with milestones, baseline vs actual dates | Large |
| 10.2 | Activity List | `projects/[id]/schedule/activities` | Table: activity, WBS, duration, start, finish, predecessor, % complete | Medium |
| 10.3 | Add/Edit Activity | Inside schedule | Activity form: name, WBS, duration, dependencies, contractor | Small |
| 10.4 | Baseline Capture | Inside schedule | Lock current schedule as baseline (immutable — like BOQ baseline) | Small |
| 10.5 | S-Curve | `projects/[id]/schedule/s-curve` | Planned vs actual cumulative progress, SPI indicator | Medium |
| 10.6 | Look-Ahead | `projects/[id]/schedule/look-ahead` | Next 3-4 weeks extracted from master schedule, resource implications | Medium |

### Data Dependencies

| This Screen Reads | From |
|---|---|
| WBS nodes | R2: ProjectWBS[] (already built) |
| Project phases | R2: ProjectPhase[] (already built) |
| DSR work done (for actual progress) | R3: DailySiteReport[] (already built) |
| Contractor assignments | R3: Contract[], WorkOrder[] (already built) |

### Acceptance Criteria

- [ ] Activities map to WBS leaf nodes (same structure as BOQ)
- [ ] Dependencies support Finish-to-Start (default), with lag
- [ ] Baseline is locked and immutable once captured (like BOQ baseline — ADR-006 pattern)
- [ ] S-curve shows planned vs actual cumulative progress
- [ ] SPI = Earned Value / Planned Value, displayed on project overview
- [ ] Look-ahead extracts upcoming 3-4 weeks with activities, contractors, material needs

**Estimated Effort:** 5-7 days

---

## R11 — Quality Management (P1)

**What:** Systematic quality inspections with checklists, NCR process, concrete testing log.

**Spec:** `20-construction-management-gaps.md` Section 3

### Screens to Build

| # | Screen | Route | What It Shows | Effort |
|---|---|---|---|---|
| 11.1 | Inspection Plan | `projects/[id]/quality/plan` | Inspection points per WBS activity (hold/witness) | Medium |
| 11.2 | Inspection Execution | `projects/[id]/quality/inspect/[id]` | Checklist with pass/fail per item, photos, sign-off | Medium |
| 11.3 | NCR List | `projects/[id]/quality/ncr` | All NCRs with status, severity, contractor, rework cost | Medium |
| 11.4 | NCR Detail | `projects/[id]/quality/ncr/[id]` | Root cause, corrective action, closure, cost tracking | Medium |
| 11.5 | Concrete Test Log | `projects/[id]/quality/concrete` | Cube tests: ID, location, grade, slump, 7/28-day strength, pass/fail | Medium |

**Estimated Effort:** 4-5 days

---

## R12 — Safety Management (P2)

**Spec:** `20-construction-management-gaps.md` Section 4

### Screens to Build

| # | Screen | Route | Effort |
|---|---|---|---|
| 12.1 | Safety Incident Report | `projects/[id]/safety/incidents/new` | Medium |
| 12.2 | Incident List | `projects/[id]/safety/incidents` | Medium |
| 12.3 | Permit to Work | `projects/[id]/safety/permits` | Medium |
| 12.4 | Safety Dashboard | `projects/[id]/safety` | Medium |

**Estimated Effort:** 3-4 days

---

## R13-R16 Summary

| Release | Screens | Effort | Depends On |
|---|---|---|---|
| R13: Drawing & Document Mgmt | 5 (register, revision, RFI, SI, transmittal) | 4-5 days | R10 |
| R14: Resource Management | 4 (muster roll, equipment register, allocation, planning) | 3-4 days | R3 |
| R15: Contractor Enhancements | 4 (EOT, LD, hindrance, performance scoring) | 3-4 days | R10 |
| R16: Regulatory & Compliance | 4 (permits, escrow, tax certs, e-invoicing) | 3-4 days | R7 |

---

## Total Effort Estimate

| Track | Releases | Screens | Days |
|---|---|---|---|
| **Done (R1-R7)** | 7 | 80+ | — |
| **Revenue (R8)** | 1 | 12 | 5-7 |
| **Finance (R9)** | 1 | 9 | 5-7 |
| **Delivery (R10-R12)** | 3 | 15 | 12-16 |
| **Support (R13-R16)** | 4 | 17 | 13-17 |
| **Total New** | **9** | **53** | **35-47 days** |
| **Grand Total** | **16** | **133+** | — |

### With 2 Parallel Tracks: ~20-25 days

```
Track A (Revenue + Finance)        Track B (Delivery + Support)
─────────────────────────         ─────────────────────────────
Week 1-2:  R8 Sales CRM           Week 1-2:  R10 Scheduling
Week 2-3:  R9 Loans/Collections   Week 3:    R11 Quality
                                   Week 3-4:  R12 Safety
Week 4:    R16 Regulatory          Week 4-5:  R13 Drawings
                                   Week 5:    R14 Resources
                                   Week 5-6:  R15 Contractor+
```

---

## Recommended Build Order (If Sequential)

If building one release at a time, this is the order that maximizes demo value at each step:

```
R8  — Sales CRM           ← "Now we can show the complete buyer journey"
R9  — Loans & Collections  ← "Now finance can track project funding + collections"
R10 — Scheduling           ← "Now the planning engineer has a tool"
R11 — Quality              ← "Now quality is systematic, not WhatsApp photos"
R12 — Safety               ← "Now we're UAE/KSA compliant"
R14 — Resources            ← "Now labour and equipment cost properly"
R13 — Drawings             ← "Now the entire engineering workflow is in one place"
R15 — Contractor+          ← "Now contractor disputes are manageable"
R16 — Regulatory           ← "Now we can enter UAE and KSA markets"
```

Each release is independently demoable. After R8+R9, the prototype covers the complete **financial lifecycle** from lead to closure. After R10-R12, it covers the complete **construction management lifecycle** too.

---

_Build what the user needs tomorrow before what they'll need next quarter. The sales team needs CRM today. The planning engineer needs a schedule today. The CFO needs loan tracking today. Everything else can wait._
