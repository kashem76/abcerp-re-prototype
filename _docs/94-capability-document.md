# AbcERP Real Estate — Capability Document

**What this system does for your company — told by department.**

---

## For the Managing Director / CEO

### What You Get

You built your company on instinct and relationships. AbcERP doesn't replace that — it gives you **visibility** so your instinct has data behind it.

**One screen to start your day:**
- All projects with health scores — who's on track, who's bleeding
- Profit erosion waterfall — where did the margin go, factor by factor
- Pending decisions — land approvals, variation orders, contractor awards
- Cash position — what's in the bank, what's committed, what's the gap
- Risk matrix — which projects are red, why, and who's accountable

**Decisions that come to you, not decisions you chase:**
- Land evaluation: the system assembles a 1-page decision screen from department assessments — not a 50-page report. You see financial summary, department recommendations, key risks, and 4 clear options (Approve / Conditions / Return / Reject)
- Variation orders above your threshold automatically route to you
- Projects approaching budget limits flag automatically

**Accountability at closure:**
- Every project ends with a Feasibility vs Actual comparison — line by line, what was promised vs what was delivered
- Profit erosion waterfall shows exactly which cost category overran and by how much
- This is the organizational learning loop that makes the next project better

---

## For the Land & Business Development Team

### What You Get

Your job is finding land, evaluating it, and getting it to management for a decision. Currently, this lives in WhatsApp, Excel, and your head. AbcERP makes it systematic without making it slow.

### Day-to-Day Operations

**Finding & Capturing Land (30 seconds per lead)**
- Add a land lead with just: name, location, area, owner, source
- System creates a workspace automatically — you don't set up folders or spreadsheets
- Post-save screen shows exactly what to do next: schedule site visit, start selection, add documents
- No opportunity is lost because the form was too long

**Quick Screening (Initial Selection)**
- Before spending money on full evaluation, screen the land with configurable criteria
- Score updates in real time as you fill in: area acceptable? price in range? owner cooperative? any red flags?
- One click: Qualify (proceed to evaluation), Hold (revisit later), or Reject (close with reason)
- Critical criteria (e.g., title dispute) automatically block qualification regardless of score

**Team Coordination**
- See your entire pipeline: which leads are new, which are being evaluated, which are in decision
- Aging indicators show at a glance: green (on track), amber (aging), red (stale)
- Filter by stage, sort by value or age, search by name or location

### Evaluation Process

**How the evaluation actually works:**
1. You qualify a land → system auto-generates work steps from your company's configured evaluation framework
2. Assignment Review screen shows who's assigned: Engineering → Eng. Rafi, Legal → Adv. Rahman, Marketing → Nadia
3. Each department works independently on their assessment — you see progress on the Work Board
4. Board view (Kanban), List view, or By Department view — whichever helps you track
5. When departments sign off, the evaluation overview shows consolidated scores, findings, risks
6. Financial model auto-computes from department inputs (Marketing gives selling price, Engineering gives cost)
7. When ready, the system auto-assembles a management report — no one prepares Word documents

**What you see as coordinator:**
- Which departments are done, which are in progress, which are blocked
- Dependency tracking: "Financial Feasibility waiting on Engineering cost estimate"
- Attention items: overdue assessments, missing documents, above-baseline costs
- Overall score with result label: Recommended / Conditional / Not Recommended

**After management decides:**
- Approved → Acquisition tab unlocks, you proceed with purchase or JV
- Approved with conditions → conditions tracked until resolved
- Returned → specific departments get revision instructions
- Rejected → workspace becomes read-only, reason documented

---

## For the Engineering & Site Team

### What You Get

Your daily life is concrete, steel, and deadlines — not spreadsheets. AbcERP gives you tools that match how you actually work on site, while automatically feeding the financial system.

### Planning & BOQ

**WBS Builder:**
- Build the work breakdown structure: Project → Tower → Trade → Activity
- Drag to reorder, add/remove nodes
- Only leaf nodes accept BOQ items — keeps the structure clean

**BOQ Entry (for the QS / Estimator):**
- Select WBS node + Cost Code + BOQ Item → enter quantity and rate
- Quantity: enter manually or open the **Measurement Sheet** (Nos × L × W × H with live calculation)
- Rate: use the default, or open the **Rate Analysis** (Material + Labour + Equipment + Overhead breakdown)
- Rate analysis pulls latest PO prices from the system — no manual rate hunting
- Company average rate shown for benchmarking
- BOQ goes through approval: Estimator → QS Manager → Director → CFO (if above threshold)
- Approved BOQ locks as BASELINE — immutable. All changes through Variation Orders.

**Budget Generation:**
- Approved BOQ automatically generates budget lines — no separate budget entry
- Budget vs Actual dashboard shows: Budget − Actual − Committed = Truly Available
- Variance alerts when any cost code exceeds estimate by configurable threshold

### Daily Site Operations

**Daily Site Report (5 tabs, submitted by end of day):**
- **Manpower:** trade-wise count (masons, rod binders, helpers, etc.) by contractor
- **Equipment:** crane running/idle, generator fuel, mixer hours
- **Work Done:** which WBS activity, what progress %, description
- **Issues:** what went wrong, severity, action taken
- **Photos:** site photos with captions

The DSR is not just a form — work done updates feed construction progress, which feeds revenue recognition (POC method).

**Material Management:**
- **Requisition:** site engineer raises MR against a BOQ item → system checks remaining BOQ quantity and budget → PM approves
- **Issue:** store keeper issues material with gate pass → GL auto-posts (DR WIP / CR Inventory) → BOQ consumption updated
- **Consumption tracking:** BOQ planned vs purchased vs consumed vs wasted — all visible

### Contractor Management

**The complete contractor lifecycle:**
- **Tender:** create from BOQ work package, invite contractors, set deadline
- **Comparative Statement:** side-by-side bid comparison (price + technical score + delivery), ranked
- **Contract:** item rate / lump sum / cost plus, with retention %, advance %, TDS %, payment terms
- **Work Order:** scoped work under a contract
- **Running Bill (RA Bill):** measurement lines → system auto-computes retention, advance recovery, TDS, net payable → GL preview before posting
- **Retention:** tracked as a balance sheet liability (not a discount) — released 50% at completion, 50% after defect liability period

### Change Control

**When scope changes (and it always does):**
- Site engineer raises a Change Request with evidence (bore-log showing unexpected soil, revised drawing, client request)
- QS evaluates cost impact: which BOQ lines affected, additional cost, contingency impact
- Schedule impact assessed: days added, critical path affected?
- Approval routes based on value: PM → Director → CFO → Board
- Approved Variation Order creates a BOQ version delta — baseline untouched
- Budget waterfall always visible: Baseline + Approved VOs = Current Approved Budget

### Quality Management *(Designed — Coming Soon)*

- Inspection plans with hold points per WBS activity
- Checklist execution with pass/fail, photos, inspector sign-off
- Concrete cube test log: cube ID, pour location, grade, slump, 7-day/28-day strength
- Non-Conformance Reports (NCR) when inspections fail: root cause, corrective action, rework cost
- Quality dashboard: first-time-pass rate, NCR trend, rework cost %

### Safety Management *(Designed — Coming Soon)*

- Safety incident reporting: type, severity, injured persons, action taken
- Permit to Work: hot work, confined space, excavation, height, crane
- Daily toolbox talk register with attendees
- Equipment certification tracking (crane load test, scaffolding) with expiry alerts
- Safety dashboard: incident-free days, open corrective actions

### Construction Scheduling *(Planned — Future)*

- Master schedule with activities, durations, dependencies
- Baseline capture (immutable — like BOQ baseline)
- Critical path auto-computed
- S-Curve: planned vs actual progress
- 3-4 week look-ahead extracted from master schedule
- Delay analysis for EOT claims

---

## For the Sales Team

### What You Get

You sell apartments. The system handles everything from the first phone inquiry to the final key handover — one unbroken chain.

### Pre-Booking Pipeline *(Coming in R8)*

**Lead Management:**
- Capture every inquiry: walk-in, phone, broker, digital ad, referral
- Quick form: name, phone, source, project, unit type, budget — 30 seconds
- Auto-assign to sales executive (round-robin or area-based)
- Follow-up reminders: system tracks when you last contacted each lead
- If no activity for 14 days → lead marked "Cold" → escalated

**Site Visits:**
- Schedule visits with date, time, which units to show
- Record feedback: positive/neutral/negative, objections raised
- Next step recommendation: send quotation, follow up, not interested

**Quotation:**
- Select unit from inventory → pricing auto-computed (base × area + floor premium + facing premium − discount)
- Payment plan from project templates (20/80, 30/70, milestone-based)
- Installment schedule auto-generated
- Quote valid for configurable days (default 7)
- PDF preview for customer

**Reservation:**
- Hold a unit for 24-72 hours (configurable) while buyer decides
- Unit shows as RESERVED to other sales execs — no double-selling
- Auto-releases if not converted to booking within expiry

**Conversion:**
- One click converts reservation → booking wizard (existing)
- All lead data (customer, unit, price, plan) carries forward — no re-entry

### Booking & Collections (Already Built)

**Booking Wizard (5 steps):**
1. Select unit from inventory grid (color-coded: available, booked, sold, landowner)
2. Customer details
3. Price calculation with discount (>5% needs approval, >10% needs director)
4. Payment plan selection with auto-generated schedule
5. Confirm + GL preview (DR Cash / CR Booking Advance — it's a LIABILITY, not revenue)

**Collections:**
- Payment schedule per unit: upcoming, due, overdue, paid
- AR aging: current, 30, 60, 90, >90 days — by customer, by unit, by project

**Demand Letters & Penalty Interest *(Coming in R9)*:**
- Auto-generate demand letters for overdue installments
- Configurable templates, sent via email/print/SMS
- Penalty interest computed automatically: overdue days × amount × rate
- Partial payments auto-allocate FIFO against oldest outstanding installment

**Cancellation & Transfer:**
- Cancellation: forfeiture calculated (configurable %), refund processed, unit released
- Transfer: old buyer → new buyer, settlement, new booking created

### Broker Management *(Coming in R8)*

- Broker register with commission structure (fixed amount, % of sale, tiered)
- Leads tracked per broker: how many referred, how many converted
- Commission auto-computed on booking conversion
- Approval workflow for commission payout
- Broker performance: conversion rate, average lead quality

### What the Sales Head Sees

- **Sales funnel:** Inquiry → Follow-up → Site Visit → Quotation → Reservation → Booking (with conversion rates between stages)
- **Lead source analysis:** which channel brings the most leads, which converts best (marketing ROI)
- **Sales velocity:** units booked per month, absorption rate
- **Collection efficiency:** demanded vs collected, by project, by period
- **Team performance:** leads, follow-ups, conversions per executive
- **Lost lead analysis:** why didn't they buy? (too expensive, competitor, location, financing)

---

## For the Finance & Accounts Team

### What You Get

Every operational action in the system — every material purchase, every contractor bill, every booking, every handover — produces a **real GL journal entry**. There are no side ledgers, no parallel tracking, no reconciliation nightmares. One GL, one truth.

### General Ledger Integration

**Seven dimensions on every transaction:**
- Project, WBS, Cost Code, Responsibility Center, Cost Center, Profit Center, GL Account
- Dimension rules configured per transaction type — the posting gate **blocks** entries missing required dimensions
- This is not optional — it's what makes project-level P&L possible

**Every transaction posts automatically:**

| What Happens | GL Entry |
|---|---|
| Material purchased | DR WIP / CR AP |
| Material issued from store | DR WIP / CR Inventory |
| Contractor running bill | DR WIP / CR AP − Retention − TDS |
| Booking advance collected | DR Cash / CR Booking Advance (Liability — NOT revenue) |
| Revenue recognized (POC) | DR AR / CR Revenue + DR COGS / CR WIP |
| Revenue recognized (CC — at handover) | DR AR / CR Revenue + DR COGS / CR WIP |
| Retention released | DR Retention Payable / CR AP |
| Wastage recorded | DR Wastage Expense (P&L — NEVER to WIP) / CR Inventory |
| Overhead allocated | DR WIP / CR Corporate Overhead |
| Pre-dev expense (before project exists) | DR Pre-Dev Expense (P&L) / CR Cash |

### Construction Loan Management *(Coming in R9)*

- Track construction loans: bank, sanctioned amount, interest rate, tenure
- Draw-down tracking against milestones (Foundation 20%, Structure 50%, etc.)
- **Interest capitalization (IAS 23):** during construction → interest goes to WIP (asset). After practical completion → interest goes to P&L (expense). System switches automatically based on project stage.
- Repayment from sales: configurable % of each collection auto-allocated to loan repayment
- Running loan balance reconciled with bank statement at period close

### Budget & Cost Control

**Budget vs Actual:**
- Approved BOQ automatically becomes the budget — no separate budget entry
- Waterfall: Budget − Actual − Committed = Truly Available
- Commitment = PO + Work Order values (not yet invoiced)
- Variance alerts when any cost code exceeds estimate by threshold
- EAC (Estimate at Completion) = Actual + Committed + Estimated-to-Complete

**Cost Allocation:**
- Corporate overhead allocated to projects using configurable drivers (sellable area ratio, cost ratio, revenue ratio)
- Allocation posts real GL entries — not just report calculations
- Unit cost allocation distributes total project cost across units by sellable area (or other basis)
- Per-unit profitability: sale price minus allocated cost = margin

### Revenue Recognition

**Two methods supported (configurable per project):**
- **Percentage of Completion (POC):** revenue recognized proportional to construction progress
- **Completed Contract (CC):** revenue recognized only at unit handover

The system handles both — including the critical rule that **booking advances are liabilities, not revenue** (ADR-007). Revenue appears on the P&L only when the recognition criterion is met.

### Reporting

**22 reports built, all traceable to GL:**

| Category | Reports |
|---|---|
| Financial Statements | Project P&L, Balance Sheet, Cash Flow |
| Cost Control | BOQ Variance, Commitment, EAC, Cost Intelligence |
| Revenue | AR Aging, Sales Status, Collection Efficiency, Revenue Recognition, Unit Profitability |
| Operations | WIP Movement, Contractor Performance, Material Consumption, DSR Summary |
| Corporate | Overhead Allocation, Portfolio Risk, Feasibility vs Actual, Profit Erosion, Landowner Statement |
| Forecasting | Cash Flow Forecast |

**Every number drills down:**
```
Project P&L → Construction Cost → Structural → STR-REBAR
→ PO-2026-0891 → Supplier Invoice → Journal Entry → Debit ৳8,610,000
```

No number exists without a source. No report exists without a GL backing.

### Period Close

**Three reconciliation gates must pass before closing a period:**
1. Subledger ↔ GL: AR/AP/WIP totals match control accounts
2. Sum of Project P&Ls = Company P&L (no untagged transactions)
3. Managerial WIP = Balance Sheet WIP (PM's cost report matches auditor's asset)

If any fails, the system shows exactly where the discrepancy is.

### Project Closure

**Automated closure checklist:**
- WIP balance = 0 (all costs transferred to COGS)
- AR balance = 0 (all payments received)
- No open POs or work orders
- All retentions released
- All DLP cases closed
- Feasibility vs Actual reviewed and signed off by management

**After closure: the project is sealed. No further postings. Ever.**

---

## For the Buyer (Customer Portal)

### What You Get

A simple portal to check your investment status — no phone calls to the sales office needed.

- **Payment summary:** total price, paid, outstanding, next installment due
- **Payment history:** all payments with receipt numbers
- **Construction progress:** overall %, phase-wise progress, latest site photos
- **Documents:** booking confirmation, agreement copy, receipts
- **Handover status:** clearance checklist, expected handover date
- **Support:** submit queries, track responses

---

## For the System Administrator

### What You Can Configure

The system is **configurable, not hardcoded**. What works for a Dhaka developer also works for a Dubai developer — because everything that differs between companies is a setting, not code.

| What | Where | Examples |
|---|---|---|
| Financial defaults | Settings > General | Currency (BDT/AED/SAR), retention %, TDS rate, DLP months, forfeiture %, revenue method |
| Lifecycle stages | Settings > Lifecycle | 14 project stages with gate conditions and allowed operations |
| Numbering | Settings > Numbering | 12 entity code formats (LL-YYYY-SEQ, RE-SEQ, etc.) |
| Approval workflows | Settings > Approval Workflows | 7 workflows with role chains, SLAs, amount thresholds |
| Dimension rules | Settings > Dimension Rules | Which dimensions required per transaction type |
| Land evaluation | Settings > Land Evaluation | Frameworks, criteria library, selection templates, cost categories, report templates |
| Cost codes | Masters > Cost Codes | 23 codes in 6 categories with GL account mapping |
| BOQ items | Masters > BOQ Items | Reusable work item catalog |
| Rate templates | Masters > Rate Templates | Rate analysis component templates |

**Country neutrality:** Bangladesh criteria (Khatian, Dag, RAJUK) are templates, not code. A UAE customer replaces them with DM permits, RERA escrow, Title Deed — same engine, different content.

---

## What AbcERP Does NOT Do

We believe in doing fewer things excellently rather than everything poorly. These are intentionally outside our scope:

| Not Included | Why | What to Use Instead |
|---|---|---|
| Architectural drawing tools (CAD/BIM) | Specialist domain — Revit, ArchiCAD are better | Integrate via API |
| Detailed construction scheduling (Primavera-level) | Complex CPM/resource leveling is a specialist tool | Integrate with MS Project/P6 |
| Customer Relationship Management (full CRM) | We cover pre-booking pipeline, not enterprise CRM | Integrate with HubSpot/Salesforce for broader CRM |
| Property management (post-handover building ops) | Separate product — facilities management | Future module or integration |
| Legal document generation | Template-based, better served by document tools | Integrate with document management |
| HR/Payroll (full suite) | Core ERP module — not RE-specific | Use AbcERP Core HR module |

**What we DO exceptionally well:** the financial chain from land lead to project closure, where every taka is tracked, every variance is explained, and every decision has data behind it.

---

## Summary: What Makes AbcERP Different

| Traditional Construction Software | AbcERP Real Estate |
|---|---|
| Separate accounting system | **One GL** — every operation posts to the same ledger |
| Contractor bills in one system, AP in another | Contractors ARE suppliers — one AP ledger |
| Booking advances booked as revenue | Advances are **liabilities** until recognition criteria met |
| BOQ is an Excel that anyone can edit | BOQ baseline is **immutable** — changes only through Variation Orders |
| Budget is a separate spreadsheet | Budget **auto-generated from BOQ** — no dual maintenance |
| Feasibility study is a PowerPoint | Feasibility is **versioned, locked**, and compared against actuals at closure |
| "Where did the money go?" answered with shrugs | 7 dimensions on every transaction — drill from P&L to journal entry |
| Period close is a hope | **3 reconciliation gates** must pass — system blocks close until they do |

---

_AbcERP doesn't make your company run differently. It makes visible what's already happening — so you can run it better._
