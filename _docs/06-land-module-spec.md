# Land Module — Complete Specification

**Module:** Pre-Project Lifecycle — Land Pipeline through Project Conversion
**Prototype Authority:** This document + `05-land-evaluation-complete-design.md`
**Code Reference:** `abcERPCode/07-abcerp-code-reference/13-real-estate-development/15-land-acquisition-jv.md`

---

## 1. Overview & Core Principle

The Land module governs everything that happens **before** a Real Estate Project exists — from the first broker call about a plot to the moment it is formally acquired and a project is created. This is the most complex pre-project lifecycle in real estate ERP because it involves multiple departments, configurable evaluation frameworks, financial modelling, and management decision-making.

AbcERP models this through a unified workspace per land record with three distinct layers:

| Layer | Audience | Question |
|---|---|---|
| **Work** | Doers, coordinators | "What's my next task? What's blocked?" |
| **Evaluation** | Department heads, coordinators | "What have we learned? What's the score?" |
| **Decision** | CEO, MD, directors | "Should we proceed? At what risk?" |

Data enters once at the lowest level (criterion assessment) and flows upward through aggregation — never re-entered.

> **Non-Negotiable Core Principle:**
> _Creating a land record creates a work package, not merely a database row. The configured workflow template auto-generates tasks, assigns departments, sets deadlines, and tracks dependencies. Stage advances via business events, not dropdown selection. Users cannot arbitrarily change stage. The system tells the user what to do next — the user doesn't navigate the ERP._

---

## 2. What This Module Delivers

### Land Pipeline
- Land record capture with minimal fields (60-second entry)
- Pipeline view with stage filters, sort, search (table-like layout)
- Team performance and workload tracking
- Aging indicators (On Track < 30d, Aging 30-60d, Stale > 60d)

### Land Workspace (per land record)
- Persistent header with stage badge, location, coordinator, target date
- 6-tab workspace: Overview | Work | Feasibility | Acquisition | Financials | Documents
- Stage progress stepper (visual connected nodes)
- Guided next-step with blocking item identification

### Initial Selection (Quick Screening)
- Configurable criteria from Selection Templates (Settings)
- Quick qualify/hold/reject decision before committing to full evaluation
- Score computation with critical failure detection
- Result: Likely Suitable / Hold / Not Suitable

### Evaluation Framework Engine
- Configurable frameworks with sections, criteria, response types, weights, rules
- Multi-department collaborative evaluation
- Department assignment with 4 resolution modes (Role / Person / Queue / Decide at creation)
- Dependency tracking between departments (Finance waits for Engineering)
- Department sign-off workflow (Assignee → Reviewer → Head → Locked)

### Work Board
- Assignment Review mode (one-time team confirmation before work starts)
- Active Board with 4 views: Board (Kanban) | List | By Department | My Work
- Filters: All | Overdue | Waiting | In Review
- Cards show: step name, department, assignee, progress, due, dependency warnings

### Step Assessment (Per Department)
- 5-tab workspace per work step: Assessment | Findings | Files | Discussion | History
- Expandable criterion forms with response type-specific inputs
- Formal Findings as first-class objects (title, severity, impact, recommendation, owner, status)
- Department Sign-off section when all criteria complete
- "Create Risk" promotion path from findings

### Evaluation Overview
- Overall score with result label (Strongly Recommended / Recommended / Conditional / Not Recommended)
- Department assessments table with scores, results, status
- Key findings by severity (Critical / Important / Advisory)
- Risk register auto-aggregated from findings
- Preliminary cost summary with benchmark comparison
- Department drill-in (score, criteria, findings, cost, head comment)

### Financial Model
- Revenue section with source attribution per assumption
- Cost section with source attribution and staleness warnings (>30 days)
- Result KPIs: Revenue, Cost, Profit, Margin, IRR, Payback, Cost/SFT, Break-Even
- Scenario comparison (Conservative / Base / Optimistic)
- Source Assumptions table (assumption, value, source dept, assessor, last updated)

### Management Decision
- Readiness check gate (all departments signed off, no critical findings)
- Auto-assembled Management Report (10 sections from department work)
- 4 decision options: Approve / Approve with Conditions / Return for Revision / Reject
- Structured condition builder (condition, must-complete-before, responsible, due)
- Return with per-department revision instructions
- Post-decision states: Approved (baseline locked), Rejected (read-only), Returned (work reopened)

### Acquisition (Post-Approval)
- Method selection: Purchase / JV / Lease / Development Rights
- Agreement details, milestones, obligations
- JV entitlement rules (contractual percentages, not unit allocation)
- Payment requisitions (demand → Finance workflow → GL posting)

### Project Conversion
- One-click conversion when acquisition milestones complete
- Auto-carries forward: feasibility, costs, documents, risks, conditions, JV terms
- Pre-development costs reclassified from P&L to Project WIP
- Land workspace becomes read-only

---

## 3. Stage Lifecycle

Stage is derived from business events. Users cannot set it via dropdown.

| Stage | Meaning | Triggered When | What's Available |
|---|---|---|---|
| **NEW** | Just captured, no activity | Land record created | Overview (Initial Selection), Documents |
| **ASSESSMENT** | Evaluation workflow started | Initial Selection qualified + evaluation started | Work Board, Documents |
| **FEASIBILITY** | Departments evaluating, financial model building | First assessment submitted | Work Board, Evaluation Overview, Financial Model |
| **DECISION** | All departments signed off, awaiting management | All required sections signed off | Decision (Readiness → Report → Decision) |
| **ACQUISITION** | Management approved, purchase/JV in progress | Management approves | Acquisition tab unlocked |
| **CONVERTED** | Project created, workspace read-only | Project created from acquisition | Read-only workspace with project link |
| **CLOSED** | Rejected or dropped with rationale | Management rejects or BD drops at any stage | Read-only workspace |

### Stage Transition Rules

```
NEW → ASSESSMENT          When: Selection qualified + evaluation started
ASSESSMENT → FEASIBILITY  When: First department assessment submitted
FEASIBILITY → DECISION    When: All required departments signed off
DECISION → ACQUISITION    When: Management approves (with or without conditions)
DECISION → CLOSED         When: Management rejects
ACQUISITION → CONVERTED   When: All milestones complete + project created
Any → CLOSED              When: BD drops with reason (admin override with audit)
```

Admin override available for exceptional cases (e.g., reopen a closed land). Requires authorization + audit trail.

---

## 4. Entity Model

### 4.1 Entity Diagram

```
Land
  ├── LandParcel (1:N)
  │     └── LandOwnership (N:N via LandOwner)
  ├── LandDocument (1:N)
  │
  ├── InitialSelection (1:1)
  │     └── SelectionCriterionResponse (1:N)
  │
  ├── EvaluationStudy (1:1)
  │     ├── EvaluationVersion (1:N, versioned)
  │     │
  │     ├── WorkStep (1:N) ← generated from EvaluationFramework
  │     │     ├── WorkStepAssignment (1:1)
  │     │     ├── CriterionResponse (1:N)
  │     │     │     ├── ResponseEvidence (1:N)
  │     │     │     └── ResponseComment (1:N)
  │     │     ├── Finding (1:N) ← promoted from criterion work
  │     │     │     └── Risk (0:1) ← promoted from finding
  │     │     └── DepartmentSignoff (1:1)
  │     │
  │     ├── FinancialModel (1:1)
  │     │     ├── RevenueAssumption (1:N)
  │     │     ├── CostAssumption (1:N)
  │     │     └── Scenario (1:N)
  │     │
  │     ├── ManagementReport (1:N, versioned)
  │     │     └── ReportSection (1:N)
  │     │
  │     └── ManagementDecision (1:1)
  │           ├── DecisionCondition (1:N)
  │           └── DecisionRevision (1:N) ← for return-for-revision
  │
  ├── Acquisition (1:1) ← unlocked after approval
  │     ├── PurchaseAgreement (1:1, if PURCHASE)
  │     │     ├── PaymentMilestone (1:N)
  │     │     └── PaymentRequisition (1:N) → Finance
  │     ├── JVAgreement (1:1, if JV)
  │     │     ├── EntitlementRule (1:N)
  │     │     └── CompensationSchedule (1:N)
  │     ├── AcquisitionMilestone (1:N)
  │     └── AcquisitionDocument (1:N)
  │
  ├── PreDevExpense (1:N) ← GL posted
  │
  ├── ActivityLog (1:N)
  │     └── Note (subset with type=NOTE)
  │
  └── → RealEstateProject (1:1, after conversion)
```

### 4.2 Key Entity Descriptions

| Entity | Purpose | Key Fields |
|---|---|---|
| **Land** | The gravity well. Every other entity references this. | name, location, area, areaUnit, expectedPrice, stage (derived), source, assignedTo, coordinator, targetDate |
| **LandParcel** | Physical land parcels (a land record may span multiple parcels) | khatian (RS/SA/BS), dag, mouza, area, landType, jlNo |
| **LandOwner** | Seller/owner information | name, nid, tin, phone, address, ownershipType, sharePercentage |
| **InitialSelection** | Quick screening result | score, criticalFailures, result (QUALIFIED/HOLD/REJECTED), completedBy, completedAt |
| **EvaluationStudy** | Container for the evaluation process | frameworkId, coordinatorId, targetDate, version, status |
| **WorkStep** | A task card on the Work Board | name, department, assigneeId, reviewerId, due, status, progress, total, dependsOn[] |
| **CriterionResponse** | One evaluator's answer to one criterion | criterionId, value, rating, assessment (text), riskLevel, recommendation, confidence, evaluatorId, completedAt |
| **Finding** | Formal observation promoted from criterion work | title, severity, impact, recommendation, owner, status, relatedCriterionId |
| **Risk** | Risk promoted from finding | findingId, level, title, owner, status, mitigationPlan |
| **DepartmentSignoff** | Head review and approval of a work step | reviewerId, status (APPROVED/RETURNED), comments, signedAt |
| **FinancialModel** | Computed from department assumptions | revenue, totalCost, profit, margin, irr, payback, costPerSft, breakEvenPrice |
| **ManagementReport** | Auto-assembled from department sign-offs | version, sections[], status (DRAFT/SUBMITTED/APPROVED) |
| **ManagementDecision** | CEO/MD's decision | decision (APPROVE/CONDITIONS/RETURN/REJECT), comments, decidedBy, decidedAt |
| **DecisionCondition** | Structured approval condition | text, mustCompleteBefore, responsibleDept, dueDate, status |

---

## 5. Business Rules

### Land Record
- Name and Location are required. All other fields optional at creation.
- Stage is read-only for normal users. Computed from business events.
- Deleting a land record is not permitted. Use CLOSED stage with reason.

### Initial Selection
- Selection Template defines the criteria (from Settings).
- Critical criteria that fail → overall result cannot be QUALIFIED.
- Score is weighted average of non-critical criteria responses.
- Result options: QUALIFIED (→ can start evaluation), HOLD (→ revisit later), REJECTED (→ stage becomes CLOSED).

### Evaluation Workflow
- Evaluation framework (from Settings) generates WorkStep records when started.
- Each WorkStep is assigned to a department and a person.
- Assignment resolves in order: Specific Person → Role → Department Queue → Manual.
- WorkSteps with dependencies are status=WAITING until dependencies complete.
- A WorkStep can only be submitted for review when all its criteria are completed.
- Department head sign-off locks the step. Locked steps cannot be edited without admin "reopen" action.

### Findings & Risks
- Findings are created from within a WorkStep's criterion work.
- Each finding has severity: Critical / High / Medium / Low.
- A finding can be promoted to a Risk (adds mitigation plan, owner, monitoring fields).
- Critical findings block the Decision gate — cannot submit to management until resolved or explicitly acknowledged.

### Financial Model
- Revenue = Saleable Area × Selling Price. Both come from department assessments.
- Cost items come from department assessments (Engineering → construction, Marketing → marketing budget, etc.).
- Each assumption shows its source department, assessor, and last-updated date.
- Assumptions older than 30 days are flagged as "stale."
- IRR, NPV, payback are computed — not manually entered.
- Scenarios (Conservative / Base / Optimistic) vary key assumptions by configurable percentages.

### Management Decision
- Cannot submit to management until all required departments are signed off and no unresolved critical findings exist.
- 4 decision options, each with distinct post-decision behavior:
  - **Approve** → stage becomes ACQUISITION, acquisition tab unlocks.
  - **Approve with Conditions** → same as approve + structured conditions tracked until resolved.
  - **Return for Revision** → specified departments' work steps re-opened, revision instructions attached.
  - **Reject** → stage becomes CLOSED, workspace read-only, pre-dev costs remain as P&L expense.
- Approved feasibility baseline is locked (immutable snapshot). Compared against actuals at project closure.

### Acquisition
- Only available after management approval.
- Method: Purchase / JV / Lease / Development Rights (configurable in Settings).
- Purchase: seller info, price, payment schedule, registration milestones.
- JV: parties, share %, entitlement rules (not unit allocation), cash compensation schedule.
- JV entitlement rules capture: "Landowner gets X% residential, Y% commercial, Z parking, W cash." Specific unit allocation happens after project creation.
- Payment requisitions are demand-side only. Finance fulfills and posts GL entries.

### Project Conversion
- Available when all acquisition milestones are marked complete.
- Minimal form: Project Name, Code, Start/End dates, RC/CC/PC.
- Auto-carries forward: land info, parcels, owners, approved feasibility, documents, risks, conditions, JV terms.
- Optional: transfer pre-dev costs from P&L to Project WIP.
- Land stage → CONVERTED. Workspace becomes read-only with project link.
- Conversion is irreversible.

---

## 6. GL Integration

Every financial event in the Land module produces posted journal entries.

### Pre-Development Expenses (while land is in evaluation)

```
DR  Pre-Development Expense — [Category]     ৳X
  CR  Cash / Bank                                ৳X

Category: Legal / Survey / Engineering / Acquisition / Travel / Architectural / Environmental
Tagged with: landId (as cost object)
```

### Land Purchase — Token Payment

```
DR  Advance to Seller (Asset)                ৳X
  CR  Cash / Bank                                ৳X
```

### Land Purchase — Registration

```
DR  Land & Site Development (Asset)           ৳X
  CR  Cash / Bank                                ৳X

Includes: stamp duty, registration fee, mutation fee — all capitalized
```

### Land Purchase — Full Settlement

```
DR  Land (Asset)                               ৳X
  CR  Advance to Seller                          ৳Y
  CR  Cash / Bank                                ৳Z
```

### JV — Land Contribution

```
DR  Land — JV Contribution (Asset)            ৳X
  CR  Landowner Equity (Partner Capital)         ৳X

Value = agreed land value per JV agreement
```

### JV — Cash Compensation Payment

```
DR  Landowner Equity (Partner Capital)         ৳X
  CR  Cash / Bank                                ৳X
```

### Project Conversion — Cost Transfer (Optional)

```
DR  Pre-Construction WIP (Asset)              ৳X
  CR  Pre-Development Expense (P&L reversal)     ৳X

Reclassifies pre-dev costs from P&L to project WIP
If not transferred, costs remain as corporate expense
```

---

## 7. Configuration (Settings Engine)

The Land module is powered by a configurable Settings engine. See `05-land-evaluation-complete-design.md` Section 4 for full Settings screen specifications.

### 7.1 What's Configurable

| Setting | What It Controls | Where Used |
|---|---|---|
| **Selection Templates** | Quick screening criteria for initial selection | Overview tab (NEW lands) |
| **Evaluation Frameworks** | Sections, criteria, response types, weights | Work Board (task generation) |
| **Criteria Library** | Reusable criteria shared across frameworks | Framework Builder |
| **Team Defaults** | Department, role, reviewer per section | Assignment Review |
| **Workflow Rules** | Dependencies, deadlines, start conditions | Work Board (blocking indicators) |
| **Cost Categories** | Construction cost estimation categories | Cost Estimate work step |
| **Scoring Rules** | Section weights, thresholds, critical overrides | Evaluation Overview (score computation) |
| **Report Templates** | Management report structure, inclusions/exclusions | Decision (auto-assembled report) |

### 7.2 Template Approach (Country Neutrality)

The engine is country-neutral. Country-specific requirements are templates, not code:

- **Bangladesh:** Khatian, Dag, Mouza, RAJUK, mutation, CDA — seeded as default template criteria
- **UAE:** DM permit, RERA, Dubai Municipality, Title Deed, NOCs — different template, same engine
- **KSA:** Ministry of Housing, Wafi, RERA (Saudi), Balady permit — different template, same engine

Organizations can modify any seeded template or create new ones from scratch.

---

## 8. Screen-to-Entity Mapping

### 8.1 Settings Screens

| Screen | Route | Entities Read/Written |
|---|---|---|
| Settings Home | `settings/land-evaluation` | — (navigation only) |
| Selection Templates | `settings/land-evaluation/selection` | SelectionTemplate, SelectionCriterion |
| Framework List | `settings/land-evaluation/frameworks` | EvaluationFramework |
| Framework Builder | `settings/land-evaluation/frameworks/[id]` | EvaluationFramework, FrameworkSection, FrameworkCriterion, TeamDefault, WorkflowRule, ScoringRule, ReportTemplate |
| Criteria Library | `settings/land-evaluation/criteria` | Criterion (shared library) |
| Cost Categories | `settings/land-evaluation/cost` | CostCategory, EstimationMethod |
| Report Templates | `settings/land-evaluation/report` | ReportTemplate, ReportSection |

### 8.2 Operational Screens

| Screen | Route | Reads | Writes |
|---|---|---|---|
| Land Pipeline | `land-leads` | Land[] | — |
| Add Land | `land-leads/new` | — | Land |
| Workspace Overview | `land-leads/[id]` | Land, StageProgress, AttentionItems, Upcoming, ActivityLog, InitialSelection, DeptSummary | InitialSelection (for NEW), Note |
| Work Board | `land-leads/[id]/work` | Land, WorkStep[], AttentionItems, ActivityLog | WorkStepAssignment (assignment review) |
| Step Assessment | `land-leads/[id]/work/[stepId]` | WorkStep, CriterionResponse[], Finding[], File[], Discussion[], History[] | CriterionResponse, Finding, Risk, DepartmentSignoff |
| Evaluation Overview | `land-leads/[id]/feasibility` | EvaluationStudy, DeptAssessment[], Finding[], Risk[], CostSummary | — |
| Financial Model | `land-leads/[id]/feasibility/financial` | FinancialModel, RevenueAssumption[], CostAssumption[], Scenario[], SourceAssumption[] | — |
| Decision | `land-leads/[id]/decision` | DeptSignoff[], Finding[], ManagementReport, ManagementDecision | ManagementDecision, DecisionCondition |

---

## 9. Reports Fed by This Module

Reports from the Reporting Architecture (`21-reporting-architecture.md`) that this module feeds:

### Pipeline & Performance

| # | Report | Source |
|---|---|---|
| 93 | Land Lead Register | Land[] |
| 94 | Land Pipeline Funnel | Land[] grouped by stage |
| 95 | Leads by Stage | Land.stage count |
| 96 | Leads by Location | Land.location group |
| 97 | Leads by Source | Land.source group |
| 103 | Lead Conversion Rate | Land stage transitions |
| 106 | Opportunity Aging | Land.createdAt vs now |
| 107 | BD Executive Performance | Land.assignedTo group by outcome |

### Evaluation & Feasibility

| # | Report | Source |
|---|---|---|
| 108 | Due Diligence Status | WorkStep[] progress |
| 116 | Land Risk Register | Risk[] |
| 117 | Due Diligence Findings | Finding[] |
| 131 | Feasibility Summary | FinancialModel |
| 132-133 | Revenue / Cost Breakdown | RevenueAssumption[], CostAssumption[] |
| 142 | Project Profit Estimate | FinancialModel.profit |
| 145 | IRR | FinancialModel.irr |
| 147 | Development Cost/SFT | FinancialModel.costPerSft |
| 153 | Scenario Comparison | Scenario[] |

### Decision & Rejection

| # | Report | Source |
|---|---|---|
| 104 | Rejected Opportunities | ManagementDecision where REJECT |
| 105 | Rejection Reason Analysis | ManagementDecision.comments, grouped |

---

## 10. How This Module Connects to the Rest of AbcERP

```
LAND MODULE (this spec)
    │
    ├──► Settings Engine
    │     Reads: EvaluationFramework, SelectionTemplate, CostCategory, ReportTemplate
    │     These are organization-level configuration, not per-land
    │
    ├──► Finance Module (Core)
    │     Land creates PaymentRequisition → Finance posts GL entries
    │     Pre-dev expenses posted to GL with landId tag
    │     JV contribution and cash compensation posted to GL
    │
    ├──► Project Module (post-conversion)
    │     Land.convertedToProjectId → RealEstateProject
    │     Feasibility baseline → Project.feasibilityBaseline (for closure comparison)
    │     Documents, risks, conditions carry forward
    │     JV entitlement rules → Project.landownerEntitlements
    │
    ├──► Document Module (shared)
    │     Files uploaded in criterion work → aggregated in Documents tab
    │     Tagged with: landId, workStepId, criterionId, department
    │
    └──► User / RBAC Module (Core)
          WorkStep.assigneeId, reviewerId → User
          ManagementDecision.decidedBy → User
          Role-based views: BD Officer sees My Work, CEO sees Decisions
```

---

## 11. What's Built in the Prototype (as of 25 Aug 2026)

| Screen | Status | Notes |
|---|---|---|
| **Settings (7 pages)** | ALL DONE | Selection, Frameworks, Criteria, Cost, Report |
| Land Pipeline | DONE | Table-like rows, dropdown filters, sort |
| Add Land | DONE | Minimal form + post-save guidance |
| Workspace Overview | DONE | Initial Selection (NEW), stage stepper, dept progress, next-step |
| Work Board | DONE | Assignment Review + Board/List/Dept views |
| Step Assessment | DONE | 5 tabs, criterion forms, findings, dept sign-off |
| Site Assessment (unified) | DONE | All-in-one view (Simple mode alternative) |
| Evaluation Overview | DONE | 8 depts, findings, risks, cost benchmark, drill-in |
| Financial Model | DONE | Source attribution, staleness, scenarios |
| Decision | DONE | Readiness gate, report, 4 decisions, 3 post-states |

**Not yet prototyped:** Acquisition tab (Purchase/JV path), Project Conversion wizard, Pre-development expense tracking, Document vault with category aggregation.

---

_This specification is the implementation authority for the Land module. When in doubt, read the prototype — it demonstrates the intended user experience for every screen listed above._
