# Land Evaluation — Complete Design Specification

**Purpose:** Single reference for the Land module — from pipeline through management decision to project conversion. Covers Settings (configuration engine), Operational screens (daily work), User roles, Report mapping, and Build plan.

**Supersedes:** This document refines and replaces the Land-related sections of `13-land-workspace-detail.md` and `14-evaluation-framework-detail.md`. Those remain for historical context but this document is the implementation authority.

**Key Design Date:** August 2026

---

## 1. Core Architecture

### 1.1 Three-Layer Separation

The Land module separates three distinct concerns that most ERPs conflate:

```
WORK              What must be done, by whom, by when
EVALUATION         What have teams discovered, what does the land look like
DECISION           Consolidate everything so management can decide
```

Each layer has a different audience and a different question:

| Layer | Audience | Question |
|---|---|---|
| Work | Doers, coordinators | "What's my next task? What's blocked?" |
| Evaluation | Department heads, coordinators | "What have we learned? What's the score?" |
| Decision | CEO, MD, directors | "Should we proceed? At what risk?" |

### 1.2 Information Flow (Never Re-entered)

Data enters once at the lowest level and flows upward through aggregation:

```
Criterion Assessment (doer fills in)
       ↓
Finding (formal observation extracted)
       ↓
Risk (created from finding if warranted)
       ↓
Department Summary (auto-aggregated from criteria + findings)
       ↓
Department Sign-off (head reviews + comments)
       ↓
Evaluation Overview (all departments consolidated)
       ↓
Management Report (auto-assembled from sign-offs)
       ↓
Management Decision (approve / reject / conditions)
```

### 1.3 Configuration Drives Operation

Settings define the shape. Operation fills it with data. Reporting reads it.

```
WORKFLOW TEMPLATE (company configures once in Settings)
       ↓
WORKFLOW STEP (defines criteria, department, outputs, dependencies)
       ↓
LAND CREATED (event trigger)
       ↓
TASK INSTANCE (generated per land, assigned to person)
       ↓
ASSESSMENT / WORK OUTPUT (structured business output)
       ↓
DEPARTMENT REVIEW (head signs off)
       ↓
MANAGEMENT REPORT (auto-assembled)
```

### 1.4 Stage Derived from Business Events

Stage is NOT a dropdown. It's derived from what happened:

```
NEW            → land record created
ASSESSMENT     → workflow started, tasks generated
FEASIBILITY    → assessments progressing, financial model active
DECISION       → required sections signed off, submitted to management
ACQUISITION    → management approved, acquisition in progress
CONVERTED      → project created from land
CLOSED         → rejected or dropped with rationale
```

Users cannot arbitrarily change status. Administrators may override with audit trail.

---

## 2. User Roles & Screen Usage

### 2.1 Role Definitions

| Role | Typical BD Title | What they care about |
|---|---|---|
| **BD Head** | GM (Land & BD) | Pipeline health, team performance, deals moving |
| **BD Executive / Land Officer** | Land Officer | My assigned leads, what I need to do today |
| **Department Assessor** | Engineer / Legal Officer / Analyst | My assessment criteria, evidence, findings |
| **Department Head** | Chief Engineer / Head of Legal | Review my team's work, sign off |
| **Coordinator** | Land Coordinator | Who's doing what, what's blocked, what's late |
| **CEO / MD** | Managing Director | Portfolio view, decisions, risk, returns |
| **CFO** | Head of Finance | Financial feasibility, cost assumptions, traceability |

### 2.2 Who Uses What

#### BD Head (GM Land & BD)

Primary screens:
- **Land Pipeline** (daily) — "How many leads? What stage? Who's slow?"
- **Team Performance** — "Rahim converted 8/12, Kamal converted 3/10"
- **Opportunity Aging** — "Gulshan Plot in Feasibility for 45 days"
- **Evaluation Overview** (per land) — "What do departments say?"
- **Rejection Analysis** — "Why are we losing leads?"

Key reports from architecture: #93, #94, #103, #105, #106, #107

#### BD Executive / Land Officer

Primary screens:
- **My Work** (daily) — "What tasks are assigned to me?"
- **Land Workspace Overview** — "Where is Gulshan Plot? What's next?"
- **Add Land** — "New lead from broker"
- **Initial Selection** — "Quick screen: worth pursuing?"
- **Activity / Notes** — "Update for my manager"

#### Department Assessor (Engineer, Legal Officer, etc.)

Primary screens:
- **My Work** (daily) — "I have 3 assessments across 2 lands"
- **Criterion Assessment** — "Fill in Foundation Requirement evaluation"
- **Upload Evidence** — "Attach soil report"
- **Create Finding** — "Pile foundation likely required"
- **Submit for Review** — "Send to Chief Engineer"

#### Department Head (Chief Engineer, Head of Legal, etc.)

Primary screens:
- **Department Work Queue** — "My team has 5 pending assessments"
- **Review Assessment** — "Is Engineering's work complete?"
- **Sign Off / Return** — "Approve with comments or send back"
- **Department Assessment Report** — "What did my department conclude?"

#### Coordinator

Primary screens:
- **Work Board** (daily) — "Board: Not Started / In Progress / Review / Done"
- **Assignment Management** — "Reassign from Kamal to Sumon"
- **Dependency Tracking** — "Financial can't start until Engineering"
- **Decision Readiness** — "5/7 departments signed off"

#### CEO / MD

Primary screens:
- **Land Pipeline Summary** — "12 active leads, 3 in decision stage"
- **Management Report** — "Gulshan: Recommended, 82/100, IRR 20.8%"
- **Decision Screen** — "Approve / Conditions / Reject"
- **Portfolio Dashboard** — "All projects + land pipeline"

Key reports: #131, #142, #145, #153

#### CFO

Primary screens:
- **Financial Feasibility** — "Revenue 1.82B, Cost 1.47B, IRR 20.8%"
- **Source Assumptions** — "Where did each number come from?"
- **Scenario Analysis** — "What if construction cost +10%?"
- **Pre-development Cost Tracking** — "2.3M spent before project exists"

---

## 3. Complete Screen Flow

### 3.1 End-to-End Journey

```
LAND PIPELINE
     │
     ├── Add Land (minimal form)
     │
     └── Open Land
           │
           ▼
   ╔══════════════════════════════════╗
   ║         LAND WORKSPACE           ║
   ╠══════════════════════════════════╣
   ║ Overview                         ║
   ║ Work                             ║
   ║ Feasibility (was "Evaluation")   ║
   ║ Acquisition                      ║
   ║ Financials                       ║
   ║ Documents                        ║
   ╚══════════════════════════════════╝
           │
           ├──── Initial Selection
           │       Quick screen → Qualify / Hold / Reject
           │
           ├──── Start Evaluation
           │       Assignment Review → Start Work
           │
           ├──── WORK
           │       ├ Work Board (Board / List / By Department / My Work)
           │       ├ Step Assessment (criteria + findings + evidence)
           │       └ Department Review & Sign-off
           │
           ├──── EVALUATION
           │       ├ Evaluation Overview (scores, findings, risks, costs)
           │       ├ Department Assessment Drill-in
           │       ├ Financial Model (revenue, costs, scenarios)
           │       └ Source Assumptions with traceability
           │
           ├──── DECISION
           │       ├ Readiness Check
           │       ├ Management Report (auto-assembled)
           │       ├ Management Decision (Approve / Conditions / Return / Reject)
           │       └ Decision Complete (baseline snapshot + next steps)
           │
           ├──── ACQUISITION (unlocked after approval)
           │       ├ Method: Purchase / JV / Lease / Development Rights
           │       ├ Agreement + Milestones + Obligations
           │       ├ JV Entitlement Rules (not unit allocation)
           │       └ Payment Requisitions (demand, not execution)
           │
           └──── Convert to Project
                   ↓
              PROJECT WORKSPACE
```

### 3.2 Key UX Principles

1. **Creating a Land creates a work package, not merely a record.** Workflow template generates tasks automatically.

2. **One task pattern across the entire ERP.** Users learn Work Board once and it works everywhere.

3. **Investigation is merged into Work.** No separate Investigation tab — all assigned steps (site inspection, legal review, market assessment) appear on the Work Board.

4. **Findings are first-class objects.** A comment ("road looks narrow") stays in discussion. A Finding ("access road may not support piling equipment") has severity, impact, recommendation, owner, status — and flows into the management report.

5. **Risks originate from findings, not re-entered.** Assessment finding → [Create Risk] → Risk Register. No duplicate entry.

6. **Financial model consumes department outputs, not manual entry.** Marketing provides selling price. Engineering provides construction cost. Finance assembles. Every assumption shows its source and "as of" date.

7. **Documents attach where the work happens, aggregate centrally.** Upload soil report inside Engineering criterion → appears in Documents > Engineering automatically.

8. **Locked stages.** Acquisition locked before approval. All prior stages become read-only after management decision. Explicit "Reopen" requires authorization + audit trail.

9. **No generic "Change Status" for normal users.** Stage advances via business events, not dropdown selection.

10. **Don't expose technical language.** No "workflow engine", "criterion schema", or "report mapping." Users see: Selection → Evaluation → Team → Workflow → Cost → Scoring → Report.

---

## 4. Settings — Configuration Engine (7 Pages)

### 4.1 Route Structure

```
src/app/real-estate/settings/land-evaluation/
├── page.tsx                          # Settings Home (8 cards)
├── selection/page.tsx                # Selection Templates + criteria editing
├── frameworks/
│   ├── page.tsx                      # Framework List
│   └── [id]/page.tsx                 # Framework Builder (6 tabs)
├── criteria/page.tsx                 # Criteria Library
├── cost/page.tsx                     # Cost Categories
└── report/page.tsx                   # Report Templates + Builder
```

### 4.2 Settings Home

8 cards linking to sub-sections. The ordering follows the business logic:

```
1. SELECTION       → What makes a lead worth pursuing?
2. FRAMEWORK       → What must be evaluated?
3. CRITERIA        → What questions must teams answer?
4. TEAM            → Who should do the work?
5. WORKFLOW        → When should they do it?
6. COST            → How should Engineering estimate cost?
7. SCORING         → How are results interpreted?
8. REPORT          → What does management see?
```

Cards 4 (Team), 5 (Workflow), 7 (Scoring) link to the Framework Builder with the appropriate tab active (`?tab=team`, etc.). Card 8 (Report) links to its own page.

### 4.3 Selection Templates

**Purpose:** Quick screening rules before detailed evaluation starts.

Screen shows:
- Template list (Standard Land Selection, JV Opportunity Selection)
- Each template: criteria count, critical criteria count, result options (Qualify / Hold / Reject), default flag
- Click → template detail with tabs: General, Criteria, Decision Rules
- Criteria are drag-orderable with ☰ handle
- Edit criterion via sheet/dialog: name, category, response type (Numeric/Rating/Choice/Pass-Fail), unit, preferred/acceptable/below-standard rules, weight %, critical flag, fail action (reject auto / flag / management exception), default department/role

### 4.4 Framework List

Card per framework:
- Standard Land Evaluation (DEFAULT) — 8 sections, 54 criteria, 8 workflow steps
- Joint Venture Evaluation — 9 sections, 61 criteria
- Commercial Site Evaluation — 7 sections, 48 criteria

### 4.5 Framework Builder (Most Complex Settings Page)

6 tabs covering the full evaluation configuration:

#### Tab 1: Structure
- 8 evaluation sections: Land & Location, Legal, Regulatory, Engineering, Market, Sales, Financial, Risk
- Each section shows criteria count, drag-orderable
- Click section → criteria list with [+ Add Existing Criterion] and [+ Create New Criterion]
- Criteria are REUSABLE across frameworks (shared library)

#### Tab 2: Team
- Section → department → assignment method table
- Click section → assignment configuration:
  - Assignment method: Role / Specific Person / Department Queue / Decide when evaluation starts
  - Default role + Accountable owner + Reviewer
  - Contributors (additional roles)
  - Default deadline (X working days)
  - Escalation target for overdue

#### Tab 3: Workflow
- Visual flow diagram showing dependencies + parallel tracks
- List view: step name, starts-when condition, deadline
- Click step → configuration:
  - Type: Assessment / Work Package
  - Start condition: Immediately / After dependencies / Manual
  - Dependencies with rule (all must complete / any)
  - Deadline (X working days after start)
  - Required for completion: criteria complete, estimate complete, evidence attached, reviewer sign-off
  - On completion: notify departments, unlock dependent steps

#### Tab 4: Scoring
- Section weights table (must sum to 100%)
- Overall result thresholds: 85-100 Strongly Recommended, 75-84 Recommended, 60-74 Conditional, <60 Not Recommended
- Critical decision rules (override overall score):
  - Legal Title Verification = Fail → Not Recommended
  - Critical Regulatory Restriction → Not Recommended
  - IRR < 15% → Management Exception Required
  - Critical Engineering Risk → Management Exception Required

#### Tab 5: Report
- Report structure: 16 drag-orderable sections (Executive Summary through Management Decision)
- Click section → department output configuration:
  - What to include: recommendation, head comments, score, findings (by severity), risks (by severity), costs, evidence
  - What to exclude: draft comments, internal discussions, returned assessments

#### Tab 6: Preview
- Read-only configuration summary:
  - "When a land is qualified: 8 work packages will be generated"
  - Department assignment table
  - "54 criteria across 8 sections"
  - "Workflow estimated duration: 14 working days"
  - Final outputs checklist
  - [Run Test Evaluation] [Publish Configuration]

### 4.6 Criteria Library

**Purpose:** Reusable criteria shared across frameworks. Avoids recreating the same criterion for every framework.

- Searchable/filterable table: criterion name, section, response type, used-in count
- Click → edit dialog with grouped form sections:
  - Identity: name, department, category
  - Guidance: description, evaluator instructions
  - Response: type (Rating 1-5 / Pass-Fail / Choice / Numeric / Amount / Percentage), scale labels
  - Required output: assessment, findings, evidence, risk, recommendation, cost estimate (checkboxes)
  - Scoring: weight %, minimum acceptable, critical flag
  - Reporting: include score, include findings, include recommendation, allow in management report

### 4.7 Cost Categories

- 17 drag-orderable construction cost categories (Site Prep, Foundation, RCC, Masonry, Plastering, Flooring, Doors/Windows, Painting, Electrical, Plumbing, Fire Protection, HVAC, Lift, External, Utility, Other, Contingency)
- Click → detail: code, group, responsible department
- Default estimation method + allowed methods: Lump Sum, Cost/sqft, Cost/sqm, Quantity x Rate, Percentage, Historical Average, Manual
- Benchmarking: show historical average, recent project range, variance from benchmark, lookback period
- Reporting flags

### 4.8 Report Templates

- Template list (Land Evaluation & Feasibility Report)
- Click → builder with tabs:
  - Structure: 16 drag-orderable report sections
  - Department Outputs: click department → configure what to pull (recommendation, findings by severity, risks, costs, evidence, what to exclude)
  - Management Decision: section configuration

---

## 5. Operational Screens (8 Pages)

### 5.1 Route Structure

```
src/app/real-estate/land-leads/
├── page.tsx                              # Pipeline (rewrite)
├── new/page.tsx                          # Add Land (simplify)
└── [id]/
    ├── page.tsx                          # Workspace Overview (rewrite)
    ├── work/
    │   ├── page.tsx                      # Work Board + Assignment Review
    │   └── [stepId]/page.tsx             # Step Assessment + Sign-off
    ├── feasibility/
    │   ├── page.tsx                      # Evaluation Overview + Dept Drill-in
    │   └── financial/page.tsx            # Financial Model + Scenarios
    └── decision/page.tsx                 # Readiness + Report + Decision
```

### 5.2 Land Pipeline

**Route:** `/real-estate/land-leads`

Filter tabs: All | New | Assessment | Feasibility | Decision | Acquisition | Closed

Each card shows:
- Land name + stage badge
- Location, area, owner
- Overall progress bar
- Department status summary (compact)
- Attention items (overdue, blocked) with count
- Next action (derived from workflow)
- Owner + last updated
- Aging indicator: green (<30d), amber (30-60d), red (>60d)

Top summary bar:
- Funnel counts by stage with total estimated value
- Team performance indicators (leads assigned/converted per executive)

Supports: search, filter by location/source/owner, sort by updated/created/stage

### 5.3 Add Land

**Route:** `/real-estate/land-leads/new`

Minimal form:
- Land Name *
- Location *
- Approx. Area
- Owner / Contact
- Source (Broker / Direct / Auction / Referral / Other)
- Assigned To
- Expected Price (optional)
- Notes

On save → redirect to workspace overview with toast "Land created". No success screen.

After creation, the workspace shows initial assessment work steps generated from the configured workflow template.

### 5.4 Workspace Overview (Command Center)

**Route:** `/real-estate/land-leads/[id]`

Persistent header:
- Land name + stage badge
- Location / area / owner
- Coordinator + target date
- [Actions ▼] dropdown

Tab bar: Overview | Work | Feasibility | Acquisition | Financials | Documents

**Overview tab contents:**
- **Stage progress bars** — Assessment ██████░░ 75%, Feasibility ███░░░ 40%, Acquisition (locked)
- **Next Action** — derived from workflow dependencies. Shows blocking item with assignee, deadline, [Open] button
- **Attention** — red/amber items (overdue assessments, missing docs, above-baseline costs)
- **Feasibility Snapshot** — revenue / cost / profit / margin / IRR (when available)
- **Upcoming** — next 3-5 deadlines with dates
- **Recent Activity / Notes** — timeline of system events + user notes with @mentions

**Initial Selection (embedded in Overview for NEW lands):**
- Progress checklist (e.g., 7/9 criteria)
- Quick inline evaluate for each criterion
- Score + critical failures count
- Result: Likely Suitable / Hold / Not Suitable
- [Complete Selection →] → prompts framework selection → [Start Evaluation →]

### 5.5 Work Board

**Route:** `/real-estate/land-leads/[id]/work`

**Mode A — Assignment Review** (shown once, before workflow starts):

Triggered after "Start Evaluation":
- "7 work steps created from Standard Land Evaluation"
- Card grid per step: department, auto-assigned person (or "Needs Assignment"), reviewer, due date
- [Change] per step to override assignment
- Footer: [Save Assignments] [Start Work →]

Assignments resolve from settings:
1. Specific Person (if configured)
2. Role → resolve to person in that role
3. Department Queue → unassigned, coordinator picks
4. "Decide at creation" → must assign now

**Mode B — Active Work Board** (after workflow started):

Views: Board | List | By Department | My Work

- **Board:** 4 columns (Not Started, In Progress, Review, Complete) with step cards
- **List:** Table view with step, department, assignee, progress, due, status
- **By Department:** Grouped by department with progress per group
- **My Work:** Filtered to current user's assignments across this land

Cards show: step name, department, assignee, progress fraction (7/11), due date, dependency warnings (⏳ Waiting on Engineering)

Default view: "By Department" for coordinators, "My Work" for department users.

Filters: All | Overdue | Waiting | Needs Review

### 5.6 Step Assessment (The Actual Working Screen)

**Route:** `/real-estate/land-leads/[id]/work/[stepId]`

Header: step name, department, assignee, reviewer, deadline, status

Tabs: Assessment | Findings | Files | Discussion | History

**Assessment tab:**
- Criteria checklist with inline status (✓ complete, ○ not started, ● in progress)
- Click criterion → expandable inline form:
  - Rating/response input (based on criterion type)
  - Assessment text (rich text)
  - Evidence upload (files, photos)
  - Risk level selector
  - Recommendation: Proceed / Proceed with Conditions / Further Investigation / Not Recommended
- [Save Draft] [Complete]

**Findings tab:**
- List of formal findings created from criterion work
- Each finding: title, raised by, related criterion, severity (Critical/High/Medium/Low), impact, recommendation, owner, status
- [+ Add Finding]
- [Create Risk] button on any finding → populates risk register

**Files tab:**
- Documents attached to this step's criteria
- Upload additional evidence
- Auto-tagged with department + criterion context

**Discussion tab:**
- Threaded comments within the step
- @mention team members
- Distinction: Discussion comments are informal, Findings are formal

**History tab:**
- Audit trail of all changes, submissions, returns

**Department Review mode** (when all criteria complete):
- Summary: overall score, key findings (auto-aggregated), risks
- Preliminary recommendation
- Department head comments textarea
- Reviewer name
- [Return for Revision] [Sign Off ✓]

### 5.7 Evaluation Overview

**Route:** `/real-estate/land-leads/[id]/feasibility`

Two sections:

**Evaluation Overview (top):**
- Progress %, departments complete vs in-progress
- Current score with result label (Recommended / Conditional / Not Recommended)
- Critical failures count
- Department assessments table: department, score, result, status
- Key findings by severity (Critical / Important / Advisory) with department attribution
- Key risks (auto-aggregated from findings)
- Preliminary cost summary with benchmark comparison
- [View All Findings] [Risk Register]

**Department Assessment Drill-in** (click any department):
- Report-oriented view (NOT task-oriented):
  - Score, summary, result badge
  - Criterion scores table
  - Key findings
  - Preliminary cost vs company benchmark (with % variance)
  - Department head comment + sign-off date
  - [Supporting Evidence] [Full Details]

### 5.8 Financial Model

**Route:** `/real-estate/land-leads/[id]/feasibility/financial`

**Revenue section:**
- Saleable area, selling price, expected revenue
- Each line shows source attribution: "Marketing Assessment, updated by Nadia, 18 Aug"

**Costs section:**
- Land, Development (from Engineering), Marketing & Sales, Finance, Contingency
- Each with source + "as of" date
- Staleness warning if source updated after model recalculation

**Result section:**
- Expected profit, margin, IRR, payback period
- Cost per SFT, revenue per SFT, break-even price

**Scenarios table:**
- Conservative / Base / Optimistic columns
- Revenue, Cost, Profit, Margin, IRR per scenario

**Source Assumptions section:**
- Table: assumption, value, source department, last updated, assessor

### 5.9 Decision

**Route:** `/real-estate/land-leads/[id]/decision`

Three progressive states:

**State 1 — Readiness Check:**
- Checklist: each department signed off ✓ or pending ●
- Unresolved critical findings count
- Open medium risks count
- Status: "Ready for Submission" or "Not Ready — Waiting for: X"
- [Preview Report] available even before ready

**State 2 — Management Report** (when ready):
Auto-assembled from department sign-offs:
- Executive summary
- Overall recommendation with score
- Financial summary (revenue, cost, profit, margin, IRR)
- Department recommendations table (dept, result, comments)
- Key findings (numbered, prioritized)
- Risk register
- Scenarios comparison table
- Department narratives (Engineering summary + head comment, Legal summary + head comment, etc.)
- [Submit to Management →]

**State 3 — Management Decision** (after submission):
- Radio: Approve / Approve with Conditions / Return for Revision / Reject
- **If Approve with Conditions:**
  - Structured condition builder: condition text, must complete before [stage], responsible [dept], due date
  - [+ Add Condition]
- **If Return for Revision:**
  - Select which departments need revision
  - Specific instructions per department
- Management comments textarea
- Decision By (name + role)
- [Confirm Decision]

**Post-Decision states:**
- **Approved:** "Land Approved ✓" with feasibility baseline snapshot, open conditions list, [Start Acquisition →]
- **Approved with Conditions:** Same as above + conditions tracking table (condition, owner, due, status)
- **Rejected:** "Land Rejected" with decision rationale, all prior stages become read-only, [Close Land]
- **Returned:** Redirects to Work tab with returned items flagged, specific revision instructions shown

---

## 6. Internal Communication

Notes are attached contextually, not in a separate messaging system:

```
LAND WORKSPACE — ACTIVITY & NOTES

[All Activity] [Notes] [System]

NOTE                                    2h ago
Rahim (Land Officer)

Spoke with owner today. Flexible on price if
we close before October. Wants min 2 units in JV.

@Karim please factor this into negotiations.

────────────────────────────────────────

SYSTEM                                  5h ago

Engineering Assessment submitted for review.
Reviewer: Chief Engineer
```

Notes:
- Attached to a land (context automatic)
- Can @mention team members
- Visible in Activity timeline alongside system events
- Marked as internal (never appear in management report)
- Distinction preserved: Findings (formal, flow to report) vs Notes (informal, stay in activity)

---

## 7. Report Mapping

### 7.1 Reports Embedded in Screens (Not Separate Pages)

Reports from the Reporting Architecture (#93-162) that are relevant to the land evaluation flow:

#### Pipeline Page (embedded)

| # | Report | How it surfaces |
|---|---|---|
| 93 | Land Lead Register | Table/export view of pipeline |
| 94 | Land Pipeline Funnel | Funnel summary bar at top |
| 95 | Leads by Stage | Filter tab counts |
| 96 | Leads by Location | Filter/group option |
| 97 | Leads by Source | Filter/group option |
| 103 | Lead Conversion Rate | BD Head performance section |
| 106 | Opportunity Aging | Aging indicator on cards (green/amber/red) |
| 107 | BD Executive Performance | Team performance section |

#### Evaluation Overview (embedded)

| # | Report | How it surfaces |
|---|---|---|
| 108 | Due Diligence Status | Department progress section |
| 116 | Land Risk Register | Risk section (auto-aggregated from findings) |
| 117 | Due Diligence Findings | Findings by severity section |
| 118 | Pending DD Actions | Work Board blocking items |

#### Financial Model (embedded)

| # | Report | How it surfaces |
|---|---|---|
| 131 | Feasibility Summary | Result section |
| 132 | Feasibility Revenue | Revenue breakdown |
| 133 | Feasibility Cost | Cost breakdown |
| 142 | Project Profit Estimate | Result section |
| 145 | IRR | Key metric display |
| 147 | Development Cost/SFT | Benchmark comparison |
| 153 | Scenario Comparison | Scenarios table |

#### Decision / Management Report (embedded)

| # | Report | How it surfaces |
|---|---|---|
| 104 | Rejected Opportunities | Post-rejection record |
| 105 | Rejection Reason Analysis | Patterns across rejected lands |
| 131 | Feasibility Summary | Report page 1 |
| 135 | Land Cost per SFT | Market benchmark section |

### 7.2 Quality-Enhancing Reports (Nice-to-Have)

| # | Report | Value |
|---|---|---|
| 96 | Leads by Location | Geographic heat map |
| 97 | Leads by Source | Channel effectiveness (broker vs direct) |
| 111 | Missing Document Report | Compliance tracking |
| 148 | Expected Selling Price/SFT | Revenue benchmark |
| 150 | Break-Even Sales Volume | Risk awareness |
| 151 | Peak Funding Requirement | Cash planning |

---

## 8. Settings ↔ Operations Connection Map

How each settings section drives operational behavior:

| Settings Section | What it configures | Operational effect |
|---|---|---|
| Selection Templates | Quick-screen criteria + rules | Initial Selection checklist on Overview tab |
| Evaluation Frameworks | Sections, criteria, structure | Work steps generated when evaluation starts |
| Assessment Criteria | Questions, response types, weights | Criterion forms inside Step Assessment |
| Evaluation Team | Department, role, reviewer defaults | Auto-assignment on Assignment Review screen |
| Workflow | Dependencies, deadlines, triggers | Board column placement, dependency warnings |
| Preliminary Cost | Categories, estimation methods, benchmarks | Cost section in Engineering assessment + Financial Model |
| Scoring | Weights, thresholds, critical rules | Score calculation on Evaluation Overview + decision gates |
| Report Templates | Sections, inclusions, exclusions | Auto-assembled Management Report structure |

---

## 9. Key Architecture Decisions

### 9.1 Why "Work" Instead of Separate Investigation + Feasibility Task Boards

**Decision:** Merge all task management into one Work tab.

**Rationale:** Having Investigation behave differently from Feasibility task management creates UX inconsistency. Users learn Work Board once and it works across all lifecycle stages. The distinction between Investigation and Feasibility is a *business stage*, not a *UI pattern*.

### 9.2 Why Findings Are First-Class Objects

**Decision:** Findings are structured objects (title, severity, impact, recommendation, owner, status), not comments.

**Rationale:** Comments don't flow into management reports. Findings do. The promotion path is: Discussion → Finding → Risk → Report. Each step adds formality and accountability.

### 9.3 Why Financial Model Shows Source Attribution

**Decision:** Every assumption in the financial model shows which department provided it and when.

**Rationale:** Traceability. If Marketing signed off on 12,000/sqft three weeks ago and the market moved, the model is stale. Source attribution + "as of" dates make staleness visible. This also prevents the common problem of someone editing a number without knowing who set it or why.

### 9.4 Why JV Entitlement Rules (Not Unit Allocation)

**Decision:** At Land stage, capture contractual percentages and terms. Unit allocation happens after Project creation.

**Rationale:** Units don't exist yet. Before Project → Building → Floor → Unit inventory exists, you can't allocate specific units. Capture: "Landowner gets 40% residential, 25% commercial, 10 parking, 20M cash, south-facing preferred, min 2 units above 8th floor." Map to specific units after project creation.

### 9.5 Why Payments Are Requisitions, Not Execution

**Decision:** Land workspace creates Payment Requisitions. Finance executes payments.

**Rationale:** Correct ERP boundary. Land workspace creates demand. Finance fulfills it. The GL posting happens in Finance, not in Land. Land displays the status: "Requisition PR-2026-418 / Status: Finance Approved / Payment: Scheduled".

### 9.6 Why No Generic "Change Status"

**Decision:** Stage derived from business events. No dropdown for normal users.

**Rationale:** Prevents nonsense like NEW → ACQUISITION. Stage advances when: workflow starts (→ ASSESSMENT), assessments progress (→ FEASIBILITY), sections signed off (→ DECISION), management approves (→ ACQUISITION), project created (→ CONVERTED). Admin override with audit trail for exceptions.

### 9.7 Why Four Assignment Modes in Settings

**Decision:** Support Department / Role / Specific Person / Decide at creation.

**Rationale:** Hardcoding "Adv. Rahman" in settings breaks when Rahman is on leave. Role-based resolution (Legal Officer → resolve to available person) with coordinator override at the Assignment Review screen handles real-world staffing.

### 9.8 International Configurability

**Decision:** Criteria, workflow steps, and legal checks are configurable, not hardcoded.

**Rationale:** Bangladesh has Khatian/Dag/Mouza/Mutation. UAE, KSA, UK have different legal/regulatory requirements. The engine understands: Workflow → Department → Step → Criterion → Assessment → Finding → Risk → Report. The customer defines what those mean for their organization/country.

---

## 10. Build Plan

### 10.1 Route Summary (15 pages total)

| # | Route | Screens Covered |
|---|---|---|
| **Settings** |
| 1 | `settings/land-evaluation/page.tsx` | Settings Home (8 cards) |
| 2 | `settings/land-evaluation/selection/page.tsx` | Selection Templates + criteria editing |
| 3 | `settings/land-evaluation/frameworks/page.tsx` | Framework List |
| 4 | `settings/land-evaluation/frameworks/[id]/page.tsx` | Framework Builder (6 tabs) |
| 5 | `settings/land-evaluation/criteria/page.tsx` | Criteria Library |
| 6 | `settings/land-evaluation/cost/page.tsx` | Cost Categories |
| 7 | `settings/land-evaluation/report/page.tsx` | Report Templates + Builder |
| **Operational** |
| 8 | `land-leads/page.tsx` | Pipeline (rewrite) |
| 9 | `land-leads/new/page.tsx` | Add Land (simplify) |
| 10 | `land-leads/[id]/page.tsx` | Workspace Overview (rewrite) |
| 11 | `land-leads/[id]/work/page.tsx` | Work Board + Assignment Review |
| 12 | `land-leads/[id]/work/[stepId]/page.tsx` | Step Assessment + Sign-off |
| 13 | `land-leads/[id]/feasibility/page.tsx` | Evaluation Overview + Dept Drill-in |
| 14 | `land-leads/[id]/feasibility/financial/page.tsx` | Financial Model + Scenarios |
| 15 | `land-leads/[id]/decision/page.tsx` | Readiness + Report + Decision |

### 10.2 Build Phases

| Phase | Pages | Rationale |
|---|---|---|
| **1 — Settings Foundation** | #1 Settings Home, #5 Criteria Library, #2 Selection Templates | Criteria are referenced by everything else |
| **2 — Settings Engine** | #3 Framework List, #4 Framework Builder (6 tabs) | Core configuration that drives operational screens |
| **3 — Settings Remaining** | #6 Cost Categories, #7 Report Templates | Complete the settings layer |
| **4 — Operational Entry** | #8 Pipeline, #9 Add Land, #10 Workspace Overview | Users can navigate the land lifecycle |
| **5 — Work Layer** | #11 Work Board, #12 Step Assessment | Where actual evaluation work happens |
| **6 — Evaluation Layer** | #13 Evaluation Overview, #14 Financial Model | Where conclusions surface |
| **7 — Decision Layer** | #15 Decision (readiness + report + decision) | Where management acts |

Each phase is independently demoable. Navigation updates happen in Phase 1 and Phase 4.

### 10.3 Navigation Updates Required

```
Settings module sidebar — add:
  Land Evaluation → /real-estate/settings/land-evaluation

Settings home page — add card:
  "Land Evaluation" with MapPin icon

Route mappings — existing land-leads mapping already resolves to land-bd module
```

### 10.4 Build Status (as of 25 Aug 2026)

| # | Page | Status | Notes |
|---|---|---|---|
| **Settings** |
| 1 | Settings Home | DONE | 8 cards linking to sub-sections |
| 2 | Selection Templates | DONE | Template list + criteria editing |
| 3 | Framework List | DONE | Card per framework |
| 4 | Framework Builder | DONE | 6 tabs (Structure, Team, Workflow, Scoring, Report, Preview) |
| 5 | Criteria Library | DONE | Searchable table with edit dialog |
| 6 | Cost Categories | DONE | 17 drag-orderable categories |
| 7 | Report Templates | DONE | Template list + builder |
| **Operational** |
| 8 | Pipeline | DONE | Rewritten — table-like rows with dropdown filters, sort, search |
| 9 | Add Land | DONE | Minimal form |
| 10 | Workspace Overview | NEEDS REWRITE | Currently shows overview but missing Initial Selection for NEW lands, missing stage progress bars, missing guided next-step |
| 11 | Work Board | NEEDS REWRITE | Currently mixes Work/Evaluation/Decision cards into one grid. Must split into pure task board with Assignment Review mode + Kanban views |
| 12 | Step Assessment | DONE | 5 tabs (Assessment, Findings, Files, Discussion, History) + Department Sign-off. Strongest page |
| 12b | Site Assessment (unified) | DONE | All-in-one view grouping Legal/Technical/Market/Regulatory. Not in final spec but useful for small orgs — keep as Simple mode alternative |
| 13 | Evaluation Overview | PARTIAL | Exists from earlier build but needs alignment with doc spec (scores, findings by severity, dept drill-in) |
| 14 | Financial Model | PARTIAL | Exists from earlier build but missing source attribution and scenario comparison |
| 15 | Decision | PARTIAL | Exists but missing readiness check gate and structured condition builder |

### 10.5 Operational Rewrite Priority

The following pages need rewriting to align with the natural workflow. Order follows how a user actually walks through the system:

| Priority | Page | What Changes | Why |
|---|---|---|---|
| **P1** | Work Board (#11) | Remove evaluation/financial/decision cards. Add Assignment Review mode. Add Board/List/Department/My Work views. Add dependency indicators. | This is the daily workspace — everything flows through here |
| **P2** | Workspace Overview (#10) | Add Initial Selection (qualify/hold/reject) for NEW lands. Add stage progress stepper. Add guided next-step with CTA. Add upcoming deadlines. | First screen users see when opening a land — must answer "what's happening, what's next" |
| **P3** | Decision (#15) | Add readiness check (all depts signed off?). Auto-assemble report from sign-offs. Add structured condition builder for conditional approvals. Add 4 decision options with post-decision states. | Where management acts — must be airtight |
| **P4** | Evaluation Overview (#13) | Align with spec: dept scores table, findings by severity, risks auto-aggregated, cost vs benchmark. Add dept drill-in view. | Where conclusions surface — coordinators and dept heads live here |
| **P5** | Financial Model (#14) | Add source attribution per assumption. Add staleness warnings. Add scenario comparison table (Conservative/Base/Optimistic). | CFO's primary screen — every number must be traceable |

### 10.6 Estimated Scope

- 15 page files (7 settings DONE, 8 operational — 3 DONE, 5 need rewrite)
- ~5,000-6,500 lines total (all mock data inline per project convention)
- 1 navigation file update
- 1 settings home page update
- No new shared components (existing shadcn/ui covers all needs)
- No backend, no API, no database (prototype)

---

## 11. Natural Workflow — What the Prototype Must Demonstrate

The prototype must make a user feel: "this is exactly how we work, but organized." Every screen transition should feel like the next natural thing a person would do — never "where do I go now?"

### 11.1 The Complete User Journey (Happy Path)

```
DAY 1 — LEAD CAPTURE
─────────────────────────────────────────────────────────────
BD Officer gets a call from a broker about a plot in Gulshan.

1. Opens Land Pipeline → clicks [+ Add Land]
2. Fills minimal form (name, location, area, owner, source)
3. Saves → lands on Workspace Overview
   System shows: "Land created. What's next?"
   → [Schedule Site Visit]  [Start Selection]  [Add Documents]

DAY 2 — INITIAL SCREENING
─────────────────────────────────────────────────────────────
BD Head reviews the new lead.

4. Opens Workspace Overview → sees Initial Selection checklist
   - Is the area developable? ✓
   - Is the price within range? ✓
   - Is the owner contactable? ✓
   - Any immediate red flags? No
5. Clicks [Qualify → Start Evaluation]
6. System generates 7 work steps from "Standard Land Evaluation" framework
7. Assignment Review screen appears:
   - Engineering → Eng. Rafi (auto-resolved from role)
   - Legal → Adv. Rahman (auto-resolved)
   - Marketing → Nadia (auto-resolved)
   - etc.
   Coordinator confirms or overrides → clicks [Start Work]
8. Stage advances: NEW → ASSESSMENT

DAY 3-14 — DEPARTMENT WORK
─────────────────────────────────────────────────────────────
Each department works their assigned step.

9. Eng. Rafi opens My Work → sees "Engineering Assessment"
   - 11 criteria to evaluate
   - Fills in each: rating + assessment + evidence + risk + recommendation
   - Creates formal Findings from observations
   - Uploads bore-log, soil test, photos
10. When all 11 criteria complete → Department Sign-off appears
    - Chief Engineer reviews → comments → signs off
    - Engineering Assessment: LOCKED ✓

Meanwhile, Legal, Marketing, Sales, Regulatory all do the same.
Coordinator watches the Work Board — sees cards move across columns.

11. Financial Feasibility step auto-unblocks when Engineering
    provides construction cost and Marketing provides selling price.
    Finance assembles the model.

DAY 15 — EVALUATION REVIEW
─────────────────────────────────────────────────────────────
Coordinator reviews consolidated results.

12. Opens Evaluation Overview:
    - Overall score: 81/100 — Recommended
    - 6/7 departments signed off
    - 3 findings (1 Medium, 2 Low)
    - 2 risks
    - Cost: ৳716M construction (3% above benchmark)
13. Financial Model shows:
    - Revenue ৳1.82B, Cost ৳1.39B, Profit ৳430M, IRR 22.4%
    - Each assumption shows source: "Marketing: Nadia, 18 Aug"

DAY 16 — MANAGEMENT DECISION
─────────────────────────────────────────────────────────────
CEO/MD reviews and decides.

14. Opens Decision page:
    - Readiness Check: ✓ All departments signed off
    - Auto-assembled Management Report (10 sections)
    - Clicks [Submit to Management]
15. CEO sees concise decision screen:
    - Financial summary, department recommendations, key risks
    - 4 options: Approve / Approve with Conditions / Return / Reject
16. CEO approves with condition: "Mutation must complete before registration"
    - Stage advances: DECISION → ACQUISITION

DAY 17+ — ACQUISITION
─────────────────────────────────────────────────────────────
Land team executes the purchase/JV.

17. Acquisition tab unlocks
    - Purchase or JV path selected
    - Agreement terms, milestones, payment requisitions
18. All milestones complete → [Create Project]
    - Carries forward: feasibility, costs, documents, risks, conditions
    - Stage: ACQUISITION → CONVERTED
    - Project Workspace opens
```

### 11.2 Screen Transitions That Must Feel Natural

Every transition below answers: "I just did X, what's next?"

| After... | System shows... | Primary CTA |
|---|---|---|
| Add Land | Workspace Overview with "What's next?" guidance | [Start Selection] or [Schedule Site Visit] |
| Complete Selection | "Land qualified. 7 work steps ready." | [Review Assignments] |
| Confirm Assignments | Work Board with all cards in "Not Started" | Click any card to start |
| Complete a criterion | "X completed. Y/Z remaining." | [Next criterion →] |
| Complete all criteria | Department Sign-off section appears | [Submit for Review] |
| Dept Head signs off | Card moves to "Complete" column. Next blocking step highlighted. | [Open next step] |
| All departments signed off | Decision readiness shows "Ready for submission" | [Submit to Management] |
| CEO approves | "Land approved. Acquisition unlocked." | [Start Acquisition] |
| All acquisition milestones | "Ready for project conversion." | [Create Project] |
| Project created | "Project created. Land workspace is now read-only." | [Open Project Workspace] |

### 11.3 What Should Never Happen

- User adds a land and sees a blank page with no guidance
- User completes all assessments but doesn't know how to trigger the decision
- CEO sees a 50-page report instead of a 1-page decision screen
- Stage changes without a business event (no dropdown status changes)
- Data entered in one screen must be re-entered in another
- User clicks "back" and loses context of where they were

---

## 12. Post-Decision Lifecycle

### 12.1 After Approval

1. Acquisition tab unlocks with method selector: Purchase / JV / Lease / Development Rights (configurable)
2. Agreement details, milestones, obligations tracked
3. JV entitlement rules captured (contractual percentages, not unit allocation)
4. Payment requisitions created (demand → Finance workflow → GL posting)
5. Land stage → ACQUISITION

### 12.2 After Rejection

1. Decision rationale preserved with full audit trail
2. Land stage → CLOSED (Rejected)
3. All tabs become read-only
4. Can be reopened with admin authorization + audit trail
5. Rejection data feeds: Rejection Reason Analysis (Report #105), Rejected Opportunities (Report #104)

### 12.3 Project Conversion

1. One-click conversion from Acquisition tab when milestones complete
2. Minimal form: Project Name, Code, Start Date, Target Completion
3. Auto-carries forward:
   - Land information + parcels + owners
   - Approved feasibility (versioned)
   - Financial baseline (locked)
   - Open risks
   - Approval conditions (remain visible)
   - Acquisition agreement
   - All documents
   - Pre-development costs (reclassified from Opportunity to Project WIP)
   - JV entitlement rules
4. Accounting dimensions auto-assigned from organization defaults (Finance/admin can adjust)
5. Land stage → CONVERTED with project reference link
6. Project workspace back-links to land record

### 12.4 Approval Conditions Tracking

Structured conditions survive across stages:

```
CONDITION                          OWNER      DUE        BEFORE           STATUS
Mutation correction                Legal      30 Aug     Registration     Open
Foundation estimate validation     Engineering 28 Aug    Project baseline Open
```

Conditions remain visible in:
- Land workspace (Acquisition tab)
- Project workspace (Overview tab, until resolved)
- Management dashboard (open conditions count)
