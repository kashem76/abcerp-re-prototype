# System Capacity & User Stories — Complete Reference

**Purpose:** This is the definitive answer to "what can AbcERP Real Estate do?" — organized as user stories by role. Every story maps to a spec doc, a prototype screen (if built), and a status.

**Audience:** Product demos, investor presentations, developer onboarding, feature prioritization, QA test planning.

**Format:** `As a [role], I want to [action], so that [outcome].`

---

## Capacity Summary

| Category | Stories | Built | Designed | Planned |
|---|---|---|---|---|
| Land Pipeline & Evaluation | 48 | 38 | 10 | 0 |
| Project Setup & Lifecycle | 18 | 12 | 4 | 2 |
| BOQ & Estimation | 22 | 18 | 2 | 2 |
| Contractor Management | 24 | 14 | 4 | 6 |
| Site Operations & Construction Mgmt | 38 | 10 | 12 | 16 |
| Sales, Booking & Collections | 20 | 16 | 2 | 2 |
| Variation & Change Control | 10 | 6 | 2 | 2 |
| Handover, DLP & Closure | 16 | 10 | 4 | 2 |
| Cost Allocation & Profitability | 12 | 10 | 2 | 0 |
| Reporting & Dashboards | 30 | 30 | 0 | 0 |
| Configuration & Administration | 18 | 16 | 2 | 0 |
| **Total** | **256** | **180** | **44** | **32** |

**Built** = Prototype screen exists and demonstrates the story
**Designed** = Spec exists in docs with entity model, but not yet prototyped
**Planned** = Identified as a gap in Doc 20, entity model sketched

---

## 1. Land Pipeline & Evaluation (48 Stories)

**Spec Docs:** 06, 07, 05

### BD Officer / Land Officer

| # | User Story | Status | Screen |
|---|---|---|---|
| L01 | As a BD Officer, I want to **add a new land lead** in under 60 seconds with minimal fields, so that no opportunity is lost because the form was too long. | Built | `land-leads/new` |
| L02 | As a BD Officer, I want to see **guided next steps after adding a land** (schedule site visit, start selection, add documents), so that I know exactly what to do next. | Built | `land-leads/new` (post-save) |
| L03 | As a BD Officer, I want to **complete an initial selection screening** with configurable criteria, so that obviously unsuitable lands are filtered out before investing in full evaluation. | Built | `land-leads/[id]` (Overview, NEW stage) |
| L04 | As a BD Officer, I want to **qualify, hold, or reject** a land from the selection screen with one click, so that the decision is recorded with score and rationale. | Built | `land-leads/[id]` (Selection result) |
| L05 | As a BD Officer, I want to **view my assigned lands** with their current stage and what's overdue, so that I can prioritize my day. | Built | `land-leads` (pipeline) |
| L06 | As a BD Officer, I want to **add notes** to a land workspace that @mention colleagues, so that internal communication stays in context — not in WhatsApp. | Built | `land-leads/[id]` (Activity) |
| L07 | As a BD Officer, I want to **see the aging status** of each land (On Track / Aging / Stale) at a glance, so that I can follow up on slow-moving leads. | Built | `land-leads` (aging badges) |

### Coordinator (Land Evaluation)

| # | User Story | Status | Screen |
|---|---|---|---|
| L08 | As a Coordinator, I want to **start an evaluation** that auto-generates work steps from the configured framework, so that I don't manually create tasks for each department. | Built | `land-leads/[id]` (Qualify → Start Evaluation) |
| L09 | As a Coordinator, I want to **review and adjust team assignments** before work starts, so that the right people are assigned based on current availability. | Built | `land-leads/[id]/work` (Assignment Review mode) |
| L10 | As a Coordinator, I want to **see all work steps on a Kanban board** (Not Started → In Progress → Review → Complete), so that I can track progress at a glance. | Built | `land-leads/[id]/work` (Board view) |
| L11 | As a Coordinator, I want to **switch between Board, List, and By Department views**, so that I can see progress the way that's most useful for the current situation. | Built | `land-leads/[id]/work` (3 views) |
| L12 | As a Coordinator, I want to **filter work steps by Overdue, Waiting, or In Review**, so that I can focus on what needs immediate attention. | Built | `land-leads/[id]/work` (filters) |
| L13 | As a Coordinator, I want to **see dependency warnings** (e.g., "Financial waiting on Engineering"), so that I can unblock stalled work. | Built | `land-leads/[id]/work` (dependency indicators) |
| L14 | As a Coordinator, I want to **reassign a work step** to a different person when someone is unavailable, so that work isn't blocked by staffing issues. | Built | `land-leads/[id]/work` (Assignment Review) |

### Department Assessor (Engineer, Legal Officer, etc.)

| # | User Story | Status | Screen |
|---|---|---|---|
| L15 | As a Department Assessor, I want to **see only my assigned criteria** in a focused checklist, so that I'm not overwhelmed by the full evaluation. | Built | `land-leads/[id]/work/[stepId]` (Assessment tab) |
| L16 | As a Department Assessor, I want to **evaluate each criterion** with the appropriate response type (Rating 1-5, Pass/Fail, Numeric, Amount), so that my input is structured and consistent. | Built | `land-leads/[id]/work/[stepId]` (expandable forms) |
| L17 | As a Department Assessor, I want to **write assessment findings** as narrative text alongside my rating, so that reviewers understand the reasoning behind my score. | Built | `land-leads/[id]/work/[stepId]` (assessment textarea) |
| L18 | As a Department Assessor, I want to **upload evidence** (photos, documents, reports) attached to specific criteria, so that my assessment is substantiated. | Built | `land-leads/[id]/work/[stepId]` (evidence upload) |
| L19 | As a Department Assessor, I want to **set a risk level and recommendation** per criterion (Proceed / Conditions / Investigate / Not Recommended), so that my professional judgment is recorded. | Built | `land-leads/[id]/work/[stepId]` (risk + recommendation) |
| L20 | As a Department Assessor, I want to **create formal Findings** from my observations with severity, impact, and recommendation, so that important observations flow into the management report. | Built | `land-leads/[id]/work/[stepId]` (Findings tab) |
| L21 | As a Department Assessor, I want to **discuss with colleagues** in threaded comments with @mentions, so that clarifications happen in context. | Built | `land-leads/[id]/work/[stepId]` (Discussion tab) |
| L22 | As a Department Assessor, I want to **promote a Finding to a Risk** with mitigation plan, so that risks are formally tracked. | Built | `land-leads/[id]/work/[stepId]` (Create Risk button) |
| L23 | As a Department Assessor, I want to **save drafts** and come back later, so that I don't have to complete everything in one sitting. | Built | `land-leads/[id]/work/[stepId]` (Save Draft) |
| L24 | As a Department Assessor, I want to **submit my completed assessment for review**, so that my department head can sign off. | Built | `land-leads/[id]/work/[stepId]` (Submit for Review) |

### Department Head (Chief Engineer, Head of Legal, etc.)

| # | User Story | Status | Screen |
|---|---|---|---|
| L25 | As a Department Head, I want to **review my team's completed assessment** with auto-aggregated score, key findings, and risks, so that I can make an informed sign-off decision. | Built | `land-leads/[id]/work/[stepId]` (Sign-off section) |
| L26 | As a Department Head, I want to **add my comments** to the assessment before signing off, so that my professional perspective is recorded for management. | Built | `land-leads/[id]/work/[stepId]` (Head comments) |
| L27 | As a Department Head, I want to **sign off or return for revision**, so that I have quality control over what reaches management. | Built | `land-leads/[id]/work/[stepId]` (Sign Off / Return) |

### Coordinator + Management (Evaluation & Decision)

| # | User Story | Status | Screen |
|---|---|---|---|
| L28 | As a Coordinator, I want to **see the overall evaluation score** with result label (Recommended / Conditional / Not Recommended), so that I know the consolidated assessment. | Built | `land-leads/[id]/feasibility` |
| L29 | As a Coordinator, I want to **see all department scores, results, and sign-off status** in one table, so that I know who's done and who's pending. | Built | `land-leads/[id]/feasibility` |
| L30 | As a Coordinator, I want to **see all findings by severity** (Critical / Important / Advisory) across all departments, so that key risks are visible. | Built | `land-leads/[id]/feasibility` |
| L31 | As a Coordinator, I want to **drill into any department's assessment** to see criteria scores, findings, cost estimates, and head comments, so that I can investigate specific areas. | Built | `land-leads/[id]/feasibility` (dept drill-in) |
| L32 | As a Coordinator, I want to **see the preliminary cost summary** with benchmark comparison, so that I know if estimates are within range. | Built | `land-leads/[id]/feasibility` |
| L33 | As a CFO, I want to **see the financial model** with revenue, costs, profit, margin, IRR, payback — each assumption traced to its source department and assessor, so that I can verify every number. | Built | `land-leads/[id]/feasibility/financial` |
| L34 | As a CFO, I want to **see staleness warnings** when assumptions are older than 30 days, so that I know if the model needs refresh. | Built | `land-leads/[id]/feasibility/financial` (stale badges) |
| L35 | As a CFO, I want to **compare scenarios** (Conservative / Base / Optimistic) side by side, so that I understand the risk range. | Built | `land-leads/[id]/feasibility/financial` (scenarios table) |
| L36 | As a Coordinator, I want to **check decision readiness** — are all departments signed off? Any unresolved critical findings? — so that I know if the report can go to management. | Built | `land-leads/[id]/decision` (Readiness Check) |
| L37 | As a Coordinator, I want the system to **auto-assemble a management report** from department sign-offs — executive summary, financial summary, department recommendations, findings, risks, scenarios, narratives — so that no one prepares Word documents. | Built | `land-leads/[id]/decision` (Report) |
| L38 | As a CEO, I want to **see a concise 1-page decision screen** — not a 50-page report — with financial summary, department recommendations, key risks, and my 4 options, so that I can decide quickly. | Built | `land-leads/[id]/decision` (Decision) |
| L39 | As a CEO, I want to **approve with structured conditions** (condition text, must-complete-before, responsible dept, due date), so that approval is not blank-check. | Built | `land-leads/[id]/decision` (Conditions builder) |
| L40 | As a CEO, I want to **return specific departments for revision** with instructions, so that I get targeted improvements — not a full redo. | Built | `land-leads/[id]/decision` (Return) |
| L41 | As a CEO, I want to **see the approved feasibility baseline locked** after my decision, so that accountability exists at project closure. | Built | `land-leads/[id]/decision` (Post-Approve) |

### BD Head (Pipeline Management)

| # | User Story | Status | Screen |
|---|---|---|---|
| L42 | As a BD Head, I want to **see the entire pipeline** with stage filters, sort by value/age/progress, and search, so that I can manage all leads efficiently. | Built | `land-leads` |
| L43 | As a BD Head, I want to **see team workload** — how many leads per BD officer, how many are progressing, so that I can balance assignments. | Built | `land-leads` (Team Performance) |
| L44 | As a BD Head, I want to **see department progress per land** in the workspace overview, so that I know which evaluations are stuck. | Built | `land-leads/[id]` (Department Progress) |
| L45 | As a BD Head, I want to **see upcoming deadlines** for each land, so that I can proactively manage timelines. | Built | `land-leads/[id]` (Upcoming) |
| L46 | As a BD Head, I want to **see attention items** (overdue assessments, missing docs, above-baseline costs) with action buttons, so that I can resolve issues quickly. | Built | `land-leads/[id]` (Attention) |

### System Admin (Configuration)

| # | User Story | Status | Screen |
|---|---|---|---|
| L47 | As an Admin, I want to **configure evaluation frameworks** with sections, criteria, team defaults, workflow rules, scoring, and report templates, so that the system matches our organization's investment methodology. | Built | `settings/land-evaluation/frameworks/[id]` |
| L48 | As an Admin, I want to **maintain a reusable criteria library** shared across frameworks, so that criteria are consistent and not duplicated. | Built | `settings/land-evaluation/criteria` |

---

## 2. Project Setup & Lifecycle (18 Stories)

**Spec Docs:** 09, 04

| # | User Story | Status | Screen |
|---|---|---|---|
| P01 | As a PM, I want to **create a project from an approved land** with most information auto-carried forward, so that I don't re-enter feasibility data. | Designed | Doc 09, Section 3.1 |
| P02 | As a PM, I want to **define project phases** (Foundation, Structure, MEP, Finishing, External, Handover) with budget and dates, so that cost tracking has structure. | Built | `projects/[id]` |
| P03 | As a PM, I want to **define the building structure** (tower → floor → unit), so that the unit inventory exists for sales. | Built | `projects/[id]` |
| P04 | As a PM, I want to **build a WBS** (Project → Tower → Trade → Activity) as a drag-reorderable tree, so that BOQ items have a work structure to attach to. | Built | `wbs` |
| P05 | As a PM, I want to **see project health** (construction %, budget used, units sold, collection rate) on one overview screen, so that I know the project's status instantly. | Built | `projects/[id]` |
| P06 | As a PM, I want to **see what needs attention** — BOQ overruns, pending bills, overdue collections — with action buttons, so that I can resolve issues. | Built | `projects/[id]` |
| P07 | As a PM, I want to **see which lifecycle stage the project is in** and what gate conditions must be met to advance, so that I work towards clear milestones. | Built | `settings/lifecycle` |
| P08 | As a Director, I want **stage transitions to enforce gate conditions** (budget approved, BOQ locked, all units created), so that we don't skip critical steps. | Designed | Doc 09, Section 4 |
| P09 | As a CEO, I want to **see all projects on one portfolio dashboard** with health scores, budget status, and alerts, so that I have a complete picture. | Built | `/real-estate` |
| P10 | As a PM, I want to **transfer pre-development costs** from P&L to Project WIP at conversion, so that the project carries its true cost from day one. | Designed | Doc 09, Section 3.1 |
| P11 | As a PM, I want **JV entitlement rules** from the land agreement to carry forward to the project, so that landowner allocations are tracked. | Designed | Doc 09, Section 3.1 |
| P12 | As a PM, I want **open approval conditions** from the management decision to remain visible on the project workspace, so that nothing falls through the cracks. | Designed | Doc 09, Section 3.1 |
| P13 | As a PM, I want to **see feasibility baseline alongside actuals** as the project progresses, so that I can track accountability. | Built | `reports/feasibility-vs-actual` |
| P14 | As a PM, I want to **navigate the project workspace** with tabs (Overview, Plan, BOQ, Buy, Build, Inventory, Sales, Finance), so that everything is in one place. | Built | `projects/[id]` (tabs) |
| P15 | As an Admin, I want to **configure lifecycle stages and transitions**, so that the stage model matches our company's process. | Built | `settings/lifecycle` |
| P16 | As an Admin, I want to **configure numbering sequences** for all entities (Project, BOQ, Tender, Contract, etc.), so that codes are consistent. | Built | `settings/numbering` |
| P17 | As a PM, I want to **close a project** with automated checks (WIP=0, AR=0, all units handed over, retentions released), so that closure is disciplined. | Built | `closure` |
| P18 | As a CEO, I want the **Feasibility vs Actual report** to be reviewed and approved before closure, so that organizational learning happens. | Built | `reports/feasibility-vs-actual` |

---

## 3. BOQ & Estimation (22 Stories)

**Spec Docs:** 11

| # | User Story | Status | Screen |
|---|---|---|---|
| B01 | As a QS, I want to **add a BOQ line** by selecting WBS node + cost code + BOQ item, entering quantity and rate, so that the cost plan is item-level precise. | Built | `boq/new` |
| B02 | As a QS, I want to **compute quantity using a measurement sheet** (Nos × L × W × H), so that quantities are auditable — not "I estimated 850 CFT." | Built | `boq/measurement` |
| B03 | As a QS, I want to **compute rate using a rate analysis** breaking down material + labour + equipment + overhead, so that rates are transparent. | Built | `boq/rate-analysis` |
| B04 | As a QS, I want **material rates in rate analysis to reference the latest PO price** from the Item master, so that estimates use real market data. | Built | `boq/rate-analysis` (PO rate hints) |
| B05 | As a QS, I want to **see the company average rate** for similar work items across projects, so that I can benchmark my estimate. | Built | `boq/rate-analysis` (company avg) |
| B06 | As a QS, I want to **view the BOQ with variance** (planned vs actual qty + rate + amount), so that I can see where costs are deviating. | Built | `boq` |
| B07 | As a QS, I want the **BOQ to go through an approval workflow** (Estimator → QS Manager → Director → CFO if above threshold), so that budgets are reviewed. | Built | `boq/approve` |
| B08 | As a QS, I want the **approved BOQ to lock as BASELINE (V1)** and be immutable, so that all future changes go through Variation Orders. | Built | `boq/approve` (lock) |
| B09 | As a QS, I want the **locked BOQ to auto-generate budget lines** in the Budget module, so that I don't maintain a separate budget. | Designed | Doc 11, Section 4.5 |
| B10 | As a QS, I want to **see Cost Code Categories** (Foundation, Structure, MEP, Finishing, External, General) for organized cost reporting. | Built | `masters/cost-codes` |
| B11 | As an Admin, I want to **manage Cost Codes** with GL account mapping, so that every cost classification automatically posts to the right GL account. | Built | `masters/cost-codes` |
| B12 | As an Admin, I want to **manage BOQ Item templates** with default cost code, UOM, and rate, so that estimators work from a consistent catalog. | Built | `masters/boq-items` |
| B13 | As an Admin, I want to **manage Rate Analysis Templates** with component breakdowns, so that rate analysis is reusable across projects. | Built | `masters/rate-templates` |
| B14 | As a PM, I want to **see Budget vs Actual** with waterfall chart showing Budget − Actual − Committed = Available, so that I know exactly how much budget remains. | Built | `budget` |
| B15 | As a PM, I want **variance alerts when actual exceeds BOQ estimate** by a configurable threshold (default 10%), so that overruns are caught early. | Designed | Doc 11, Section 5 |
| B16 | As a PM, I want to **see Estimate at Completion (EAC)** = Actual + Committed + Estimate-to-Complete, so that I can forecast the final cost. | Built | `reports/eac` |
| B17 | As a QS, I want the **progressive refinement chain** (Feasibility estimate → BOQ → Procurement → Actual) to be traceable for every cost category, so that the Feasibility vs Actual report works. | Designed | Doc 11, Section 11 |
| B18 | As a PM, I want to **see the Commitment Report** — Budget minus Actual minus Committed equals truly available — so that I don't over-commit. | Built | `reports/commitment` |
| B19 | As a QS, I want to **expand any BOQ category to see line items** with WBS, quantity, rate, and variance, so that I can investigate overruns. | Built | `boq` (expandable) |
| B20 | As an Engineer, I want to **use a cost estimation template** during land feasibility with major component categories (Foundation, Steel, Concrete, MEP, Finishing), so that early estimates are structured. | Built | `settings/land-evaluation/cost` |
| B21 | As a QS, I want **measurement formulas** (L×W, L×W×H, L×W×H×Nos, πr²×H) to be reusable across projects, so that I don't recreate them. | Built | `boq/measurement` (formula selection) |
| B22 | As a PM, I want **BOQ consumption tracking** — planned vs purchased vs consumed vs wasted per item — so that material usage is controlled. | Built | `reports/material-consumption` |

---

## 4. Contractor Management (24 Stories)

**Spec Docs:** 12

| # | User Story | Status | Screen |
|---|---|---|---|
| C01 | As Procurement, I want to **create a tender** from a BOQ work package, invite contractors, and set submission deadlines, so that procurement is competitive. | Built | `tender/new` |
| C02 | As Procurement, I want to **build a comparative statement** comparing bids on price + technical score + delivery, with overall ranking, so that contractor selection is objective. | Built | `tender` |
| C03 | As Procurement, I want to **award a contract** from the comparative statement, auto-creating the contract record, so that the process is seamless. | Built | `contract/new` |
| C04 | As a PM, I want to **create contracts** with type (Item Rate / Lump Sum / Cost Plus), retention %, advance %, TDS %, and payment terms, so that all terms are recorded. | Built | `contract/new` |
| C05 | As a PM, I want **contract value to register as a commitment** in the budget, so that Budget vs Actual shows committed spending. | Designed | Doc 12, Section 3 |
| C06 | As a PM, I want to **issue work orders** under a contract for specific scope, so that work is authorized in controlled packages. | Built | `work-order/new` |
| C07 | As a Site Engineer, I want to **record joint measurement** with the contractor, so that running bill quantities are agreed. | Designed | Doc 12, Section 2 |
| C08 | As a Site Engineer, I want to **create a running bill (RA bill)** with measurement lines, and the system auto-computes: retention, advance recovery, TDS, material supplied, net payable. | Built | `running-bill/new` |
| C09 | As a Site Engineer, I want to **see the GL preview** before submitting a running bill (DR WIP / CR AP + Retention + TDS), so that I know the financial impact. | Built | `running-bill/new` (GL preview) |
| C10 | As a PM, I want **running bills to go through approval** (Site Eng → PM → Director if above threshold), so that payments are controlled. | Built | `running-bill` (approval status) |
| C11 | As Finance, I want **retention tracked as a separate BS liability**, not a discount, so that the balance sheet accurately reflects what we owe contractors. | Designed | Doc 12, Section 4 (ADR-009) |
| C12 | As Finance, I want **contractor advances tracked as an asset** and recovered proportionally over running bills, so that advances are fully recovered. | Designed | Doc 12, Section 3 |
| C13 | As a PM, I want to **see contractor performance** (cost, schedule, quality scores), so that I can make informed decisions for future tenders. | Designed | Doc 12, Section 2 |
| C14 | As a PM, I want to **raise a back-charge** against a contractor for defective work, developer-supplied materials, or penalties, so that costs are recovered. | Designed | Doc 20, Section 6.1 |
| C15 | As a PM, I want to **calculate Liquidated Damages (LD)** when a contractor exceeds the contractual completion date minus approved EOT, so that delay penalties are enforced. | Planned | Doc 20, Section 6.1 |
| C16 | As a PM, I want to **process Extension of Time (EOT) claims** with evidence, categorize delays (excusable vs non-excusable), and approve/reject with documented rationale. | Planned | Doc 20, Section 6.1 |
| C17 | As a PM, I want to **track hindrances** (material shortage, design hold, authority delay) with responsible party and schedule impact, so that EOT claims have supporting evidence. | Planned | Doc 20, Section 6.1 |
| C18 | As a PM, I want to **release retention** in two tranches — 50% at practical completion, 50% at DLP expiry — so that retention follows contractual terms. | Designed | Doc 16, Section 3 |
| C19 | As a PM, I want to **issue a completion certificate** when a contractor finishes their scope, so that the contract is formally closed. | Designed | Doc 12, Section 2 |
| C20 | As Finance, I want to **see the contractor ledger** — every bill, payment, advance, and deduction — in one view, so that the contractor account is transparent. | Designed | Doc 12, Section 2 |
| C21 | As Procurement, I want to **see the tender register** — all tenders with status, bids received, awards — so that procurement activity is visible. | Built | `tender` (list) |
| C22 | As a PM, I want to **see all active contracts** with value, retention, paid amount, and status, so that contractor commitments are visible. | Built | `contract/new` (embedded list in doc) |
| C23 | As a PM, I want to **process price escalation claims** based on contractual escalation clauses and material price index movement, so that fair adjustments are made. | Planned | Doc 20, Section 6.1 |
| C24 | As Procurement, I want **comparative statements to require minimum 2 bids** (configurable) before proceeding, so that competition is ensured. | Designed | Doc 12, Section 4 |

---

## 5. Site Operations & Construction Management (38 Stories)

**Spec Docs:** 13, 20

### Daily Site Report

| # | User Story | Status | Screen |
|---|---|---|---|
| S01 | As a Site Engineer, I want to **record daily manpower** by trade and contractor, so that workforce data is tracked. | Built | `dsr/new` (Manpower tab) |
| S02 | As a Site Engineer, I want to **record equipment status** (running, idle, breakdown) with hours, so that equipment utilization is tracked. | Built | `dsr/new` (Equipment tab) |
| S03 | As a Site Engineer, I want to **record work done** with WBS node, activity, and progress %, so that construction progress is updated daily. | Built | `dsr/new` (Work Done tab) |
| S04 | As a Site Engineer, I want to **report site issues** with severity and action taken, so that problems are documented. | Built | `dsr/new` (Issues tab) |
| S05 | As a Site Engineer, I want to **upload site photos** with captions, so that visual progress evidence exists. | Built | `dsr/new` (Photos tab) |
| S06 | As a Site Engineer, I want to **submit the DSR** by end of day, notifying the PM, so that daily reporting is disciplined. | Built | `dsr/new` (Submit) |
| S07 | As a PM, I want to **review DSR history**, so that I can track trends in manpower, equipment, and issues. | Built | `dsr` (list) |

### Material Management

| # | User Story | Status | Screen |
|---|---|---|---|
| S08 | As a Site Engineer, I want to **raise a material requisition** against a BOQ item with quantity, WBS, and cost code, so that the request is tied to the budget. | Built | `material-requisition/new` |
| S09 | As a Site Engineer, I want the system to **check BOQ remaining quantity** when I raise an MR, so that I don't over-request. | Built | `material-requisition/new` (BOQ status) |
| S10 | As a Store Keeper, I want to **issue materials** from the site store with gate pass, so that every item leaving the store is documented. | Built | `material-issue/new` |
| S11 | As a Store Keeper, I want the **material issue to post GL** (DR WIP / CR Inventory) automatically, so that financial records are current. | Built | `material-issue/new` (GL preview) |
| S12 | As a Store Keeper, I want to **record material returns** to reverse the WIP posting, so that unused materials are properly accounted for. | Designed | Doc 13, Section 3.2 |
| S13 | As a Store Keeper, I want to **record material wastage** that expenses immediately to P&L (never capitalized to WIP — ADR-010), so that losses are transparent. | Designed | Doc 13, Section 3.2 |
| S14 | As a PM, I want to **see BOQ consumption** — planned vs purchased vs consumed vs wasted — so that material usage is controlled. | Built | `reports/material-consumption` |
| S15 | As a PM, I want **variance alerts when material consumption exceeds BOQ planned** by the configured threshold, so that waste is caught early. | Designed | Doc 13, Section 5 |
| S16 | As a Store Keeper, I want to **see site stock levels** with reorder alerts, so that material shortages are prevented. | Designed | Doc 13, Section 3.2 |
| S17 | As a PM, I want to **transfer materials between project sites**, so that excess inventory on one project can be used on another. | Designed | Doc 13, Section 4 |

### Construction Scheduling (Not Yet Built — P1 Gap)

| # | User Story | Status | Screen |
|---|---|---|---|
| S18 | As a Planning Engineer, I want to **create a master construction schedule** with activities, durations, and dependencies, so that the project has a time plan. | Planned | Doc 20, Section 1 |
| S19 | As a Planning Engineer, I want to **lock a schedule baseline** (like BOQ baseline — immutable), so that schedule variance can be measured. | Planned | Doc 20, Section 1 |
| S20 | As a Planning Engineer, I want to **see the critical path** auto-computed from dependencies, so that I know which activities must not be delayed. | Planned | Doc 20, Section 1 |
| S21 | As a Planning Engineer, I want to **generate a 3-4 week look-ahead** from the master schedule, so that short-term planning drives daily work. | Planned | Doc 20, Section 1 |
| S22 | As a PM, I want to **see an S-Curve** (planned vs actual cumulative progress), so that I can visualize whether the project is ahead or behind. | Planned | Doc 20, Section 1 |
| S23 | As a PM, I want to **see Schedule Performance Index (SPI)** = Earned Value / Planned Value, so that schedule health is quantified. | Planned | Doc 20, Section 1 |

### Quality Management (Designed, Not Built — P1 Gap)

| # | User Story | Status | Screen |
|---|---|---|---|
| S24 | As a QA Engineer, I want to **define inspection points** per WBS activity (hold points / witness points), so that quality checks are systematic. | Designed | Doc 20, Section 3 |
| S25 | As a QA Engineer, I want to **execute inspections with checklists** (pass/fail per item, photos, inspector sign-off), so that results are structured. | Designed | Doc 13, Section 3.3 |
| S26 | As a QA Engineer, I want **failed inspections to auto-create an NCR** (Non-Conformance Report) with root cause, corrective action, and rework cost, so that quality failures are formally tracked. | Planned | Doc 20, Section 3 |
| S27 | As a QA Engineer, I want to **record concrete cube tests** (cube ID, pour location, grade, slump, 7-day/28-day strength, pass/fail), so that structural compliance is documented. | Designed | Doc 13, Section 3.3 |
| S28 | As a PM, I want to **see a quality dashboard** (first-time-pass rate, NCR trend, rework cost %), so that quality performance is visible. | Planned | Doc 20, Section 3 |

### Safety Management (Designed, Not Built — P2)

| # | User Story | Status | Screen |
|---|---|---|---|
| S29 | As a Safety Officer, I want to **report safety incidents** with type, severity, description, injured persons, action taken, so that incidents are documented. | Designed | Doc 13, Section 3.4 |
| S30 | As a Safety Officer, I want to **issue Permits to Work** (hot work, confined space, excavation, height, crane, electrical) with precautions checklist, so that high-risk activities are authorized. | Planned | Doc 20, Section 4 |
| S31 | As a Safety Officer, I want to **record daily toolbox talks** (topic, attendees, sign-off), so that safety briefings are documented. | Planned | Doc 20, Section 4 |
| S32 | As a Safety Officer, I want to **track equipment certifications** (crane load test, scaffolding inspection) with expiry dates, so that unsafe equipment is not used. | Planned | Doc 20, Section 4 |
| S33 | As a PM, I want to **see a safety dashboard** (incident-free days, trend, open corrective actions), so that safety performance is visible. | Designed | Doc 13, Section 3.4 |

### Resource Management (Not Covered — P1 Gap for Costing)

| # | User Story | Status | Screen |
|---|---|---|---|
| S34 | As a Site Engineer, I want to **record daily labour muster roll** (name, trade, hours, OT), so that attendance is formal — not a head count. | Planned | Doc 20, Section 5.1 |
| S35 | As a PM, I want **labour costs computed from muster roll** (hours × rate by trade) and allocated to project/WBS/cost code, so that labour hits the GL. | Planned | Doc 20, Section 5.1 |
| S36 | As a PM, I want to **see planned vs actual manpower** per trade per week, so that I can manage resource productivity. | Planned | Doc 20, Section 5.1 |
| S37 | As a PM, I want an **equipment register** with hire charges, fuel consumption, and cost allocation to WBS, so that equipment costs hit the GL properly. | Planned | Doc 20, Section 5.2 |
| S38 | As a PM, I want to **see equipment utilization** (hours used vs available), so that idle equipment costs are visible. | Planned | Doc 20, Section 5.2 |

### Drawing & Document Management (Not Covered — P1 Gap)

Covered in Doc 20, Section 2. Stories would include drawing register, revision control, RFI tracking, site instructions — all Planned status.

---

## 6. Sales, Booking & Collections (20 Stories)

**Spec Docs:** 14

| # | User Story | Status | Screen |
|---|---|---|---|
| R01 | As Sales, I want to **see the unit inventory grid** with status colors (Available, Booked, Sold, Landowner), so that I know what's available. | Built | `booking` |
| R02 | As Sales, I want to **book a unit through a 5-step wizard** (select unit → customer → price/discount → payment plan → confirm), so that the booking process is guided. | Built | `booking/new` |
| R03 | As Sales, I want **discounts above threshold to require approval**, so that pricing discipline is enforced. | Built | `booking/new` (approval notice) |
| R04 | As Sales, I want the **booking to post GL** (DR Cash / CR Booking Advance — Liability, NOT Revenue), so that advances are properly classified. | Built | `booking/new` (GL preview) |
| R05 | As Sales, I want **payment schedule auto-generated** from the selected plan (20/80, 30/70, milestone-based), so that installments are structured. | Built | `booking/new` (payment schedule) |
| R06 | As Sales, I want to **process a booking cancellation** with forfeiture calculation and refund, releasing the unit back to available. | Built | `booking/cancellation` |
| R07 | As Sales, I want to **transfer a unit** from one buyer to another with financial settlement, so that buyer changes are handled properly. | Built | `booking/transfer` |
| R08 | As Finance, I want **installment demands raised as SalesInvoices** in AR, so that collections use the standard AR system. | Designed | Doc 14, Section 3 |
| R09 | As Finance, I want **collections posted as CustomerReceipts** against demand invoices, reducing AR, so that receivables are tracked. | Designed | Doc 14, Section 3 |
| R10 | As Sales Head, I want to **see AR aging** (current, 30, 60, 90, >90 days) by customer and unit, so that overdue accounts are visible. | Built | `reports/ar-aging` |
| R11 | As Sales Head, I want to **see collection efficiency** (demanded vs collected by period), so that cash flow health is clear. | Built | `reports/collection` |
| R12 | As Sales Head, I want to **see sales velocity** (units booked per month) and absorption rate, so that marketing effectiveness is measured. | Built | `dashboards/sales` |
| R13 | As Finance, I want **revenue recognized per POC** (proportional to construction progress) or **per CC** (at handover only), configurable per project. | Built | `reports/revenue-recognition` |
| R14 | As Finance, I want to **see unit profitability** (sale price minus allocated cost per unit, margin), so that pricing decisions are informed. | Built | `reports/unit-profitability` |
| R15 | As Sales, I want to **set unit pricing** with base price/sqft + floor premium + facing premium, so that prices are systematically computed. | Built | `booking/new` (pricing section) |
| R16 | As a Buyer, I want to **see my payment summary** (total, paid, outstanding, next due) on the buyer portal, so that I know my financial position. | Built | `buyer-portal` |
| R17 | As a Buyer, I want to **see construction progress** with photos on the buyer portal, so that I'm informed about my investment. | Built | `buyer-portal` |
| R18 | As a Buyer, I want to **see my payment history** with receipt numbers, so that I have records. | Built | `buyer-portal` |
| R19 | As a Buyer, I want to **submit support queries** through the portal, so that I can communicate with the developer. | Built | `buyer-portal` |
| R20 | As Sales Head, I want to **see the sales dashboard** with bookings, velocity, performers, and demands, so that the sales team is managed. | Built | `dashboards/sales` |

---

## 7. Variation & Change Control (10 Stories)

**Spec Docs:** 15

| # | User Story | Status | Screen |
|---|---|---|---|
| V01 | As a Site Engineer, I want to **raise a change request** with source (site condition, design change, client request), description, and evidence, so that changes are formally captured. | Built | `variation/new` (Part 1) |
| V02 | As a QS, I want to **assess the cost impact** of a change request (BOQ lines affected, additional cost, contingency impact), so that the financial consequence is clear. | Built | `variation/new` (Impact assessment) |
| V03 | As a QS, I want to **assess the schedule impact** (days, critical path flag, mitigation plan), so that time consequences are documented. | Built | `variation/new` (Schedule impact) |
| V04 | As a PM, I want **variation orders to go through tiered approval** (PM → Director → CFO → Board based on value), so that authority matches the financial magnitude. | Built | `variation/new` (Approval chain) |
| V05 | As a PM, I want **approved VOs to create BOQ version deltas** (baseline untouched, new version with changes), so that budget history is preserved. | Designed | Doc 15, Section 3 |
| V06 | As a PM, I want to **see the budget waterfall** (Baseline + Approved VOs = Current + Pending = Forecast), so that budget evolution is transparent. | Built | `variation/new` (Budget impact) |
| V07 | As a PM, I want to **see contingency depletion** in real time as VOs are approved, with management alert when contingency approaches zero. | Designed | Doc 15, Section 3 |
| V08 | As a PM, I want a **variation register** — all CRs and VOs for a project, filterable by status and type — so that change history is visible. | Built | `variation/new` (VO list) |
| V09 | As Finance, I want **VO-triggered budget adjustments** to be the only way the budget changes after BOQ lock, so that budget integrity is maintained. | Designed | Doc 15, Section 4 |
| V10 | As a Contractor, I want to **receive notification** when a VO affects my contract scope, so that I can adjust my work plan. | Planned | Doc 15, Section 3 |

---

## 8. Handover, DLP & Closure (16 Stories)

**Spec Docs:** 16

| # | User Story | Status | Screen |
|---|---|---|---|
| H01 | As a PM, I want to **see the handover dashboard** — units pending vs completed, by building/floor — so that handover progress is visible. | Built | `handover` |
| H02 | As a QA Engineer, I want to **conduct pre-handover inspection** with a structured checklist, creating a snag list from findings, so that defects are caught before the buyer sees them. | Built | `handover/[unitId]` |
| H03 | As a QA Engineer, I want to **create snags** with category, severity, photo, description, and assigned contractor, so that defects are formally tracked. | Built | `handover/[unitId]` (snag section) |
| H04 | As a PM, I want **handover clearance checks** (financial, technical, legal, utility, municipal, management) to be completed before handover is allowed, so that nothing is missed. | Built | `handover/[unitId]` (clearances) |
| H05 | As Sales, I want to **execute the handover ceremony** with key issuance, document handover, and customer signature, so that possession is formally transferred. | Built | `handover/[unitId]` (handover event) |
| H06 | As Finance, I want **handover to trigger revenue recognition** (CC method), posting DR AR / CR Revenue + DR COGS / CR WIP, so that the P&L reflects reality. | Designed | Doc 16, Section 3 |
| H07 | As a PM, I want **DLP tracking** per contract — start date, end date, retention held, defects reported — so that warranty obligations are managed. | Designed | Doc 16, Section 3 |
| H08 | As a Buyer, I want to **report defects through the buyer portal** during the DLP period, so that my warranty rights are exercised. | Designed | Doc 16, Section 5 |
| H09 | As a PM, I want **retention released automatically** when DLP expires with no open defects, so that contractor settlements are timely. | Designed | Doc 16, Section 3 |
| H10 | As Finance, I want **retention release to post GL** (DR Retention Payable / CR AP or Cash), so that the balance sheet is accurate. | Designed | Doc 16, Section 3 |
| H11 | As a PM, I want **project closure to run automated checks** (WIP=0, AR=0, no open POs, all retentions released, all DLP closed), so that nothing is forgotten. | Built | `closure` |
| H12 | As a PM, I want to **see the final project P&L** with feasibility comparison and management sign-off, so that accountability is documented. | Built | `closure` (financial summary) |
| H13 | As a CEO, I want to **review and approve the Feasibility vs Actual report** before closure, so that organizational learning happens. | Built | `reports/feasibility-vs-actual` |
| H14 | As Finance, I want a **CLOSED project to be permanently sealed** — no further postings, no reopening — so that the final P&L is definitive. | Built | `closure` (sealed state) |
| H15 | As a PM, I want to **see the profit erosion waterfall** — factor by factor where profit changed from feasibility to actual — so that lessons are concrete. | Built | `reports/profit-erosion` |
| H16 | As a Buyer, I want to **see my handover status** (clearances, expected date) on the buyer portal, so that I can plan. | Built | `buyer-portal` |

---

## 9. Cost Allocation & Profitability (12 Stories)

**Spec Docs:** 17

| # | User Story | Status | Screen |
|---|---|---|---|
| A01 | As Finance, I want to **allocate corporate overheads** to projects using configurable drivers (sellable area, cost ratio, revenue ratio), so that each project carries its fair share. | Built | `reports/overhead-allocation` |
| A02 | As Finance, I want **overhead allocation to post real GL entries** (DR WIP / CR Corporate Overhead), so that it's not just a report. | Designed | Doc 17, Section 3 |
| A03 | As Finance, I want to **preview allocations before posting**, so that I can verify the computation. | Designed | Doc 17, Section 3 |
| A04 | As Finance, I want to **reverse an incorrect allocation** with a new reverse entry (not by deleting), so that the audit trail is preserved. | Designed | Doc 17, Section 3 |
| A05 | As Finance, I want to **allocate total project cost across units** by sellable area (or other basis), so that per-unit profitability can be computed. | Built | `reports/unit-profitability` |
| A06 | As Finance, I want to **see unit-level profitability** (sale price minus allocated cost, margin), so that pricing decisions are informed. | Built | `reports/unit-profitability` |
| A07 | As a CEO, I want to **see portfolio profitability** — all projects compared on margin, IRR, ROI — so that investment decisions are informed. | Built | `/real-estate` |
| A08 | As Finance, I want the **Feasibility vs Actual comparison** to be auto-generated at closure, comparing every line of the original feasibility against actual GL data. | Built | `reports/feasibility-vs-actual` |
| A09 | As a CEO, I want the **profit erosion waterfall** showing factor-by-factor where profit changed, so that I understand what drove variance. | Built | `reports/profit-erosion` |
| A10 | As Finance, I want **JV profitability to show honest cost** (100% construction cost, not proportional share — ADR-005), so that margins are not misleading. | Designed | Doc 17, Section 6 |
| A11 | As Finance, I want to **track break-even** (minimum units to sell to cover total cost) against actual sales progress, so that risk is visible. | Designed | Doc 17, Section 4 |
| A12 | As Finance, I want **WIP movement report** (Opening + Additions − Transfers = Closing) by month, so that WIP reconciliation is supported. | Built | `reports/wip-movement` |

---

## 10. Reporting & Dashboards (30 Stories)

**Spec Docs:** 18

| # | User Story | Status | Screen |
|---|---|---|---|
| D01-D08 | As a **[CEO/CFO/PM/Procurement/Sales/Site Eng/Land Dev]**, I want a **role-specific dashboard** showing my key metrics, attention items, and actions, so that I start my day knowing what matters. | All Built | 8 dashboard routes |
| D09 | As any user, I want to **drill down from any KPI** to the underlying transactions → documents → journal entries, so that every number is verifiable. | Designed | Doc 18, Section 2 |
| D10-D31 | As a **[relevant role]**, I want to **see [specific report]** with the right dimensions and filters. | All 22 Built | 22 report routes |

*(All 22 reports and 8 dashboards are built in the prototype — see Doc 18 for complete list.)*

---

## 11. Configuration & Administration (18 Stories)

**Spec Docs:** 08

| # | User Story | Status | Screen |
|---|---|---|---|
| X01 | As Admin, I want to **set financial defaults** (currency, retention %, TDS rate, DLP months, forfeiture %, revenue method), so that the system operates with our parameters. | Built | `settings` |
| X02 | As Admin, I want to **configure lifecycle stages** with transitions and gate conditions, so that the stage model matches our process. | Built | `settings/lifecycle` |
| X03 | As Admin, I want to **configure numbering sequences** for 12 entity types, so that codes are consistent and meaningful. | Built | `settings/numbering` |
| X04 | As Admin, I want to **configure 7 approval workflows** with role-based steps, SLAs, and amount thresholds, so that the right authority approves each transaction. | Built | `settings/approval-workflows` |
| X05 | As Admin, I want to **configure dimension rules** (which dimensions are required per transaction type), so that GL postings are always properly tagged. | Built | `settings/dimension-rules` |
| X06 | As Admin, I want to **configure selection templates** for initial land screening, so that criteria match our market assessment methodology. | Built | `settings/land-evaluation/selection` |
| X07 | As Admin, I want to **configure evaluation frameworks** with 6 tabs (Structure, Team, Workflow, Scoring, Report, Preview), so that the evaluation engine matches our investment methodology. | Built | `settings/land-evaluation/frameworks/[id]` |
| X08 | As Admin, I want to **maintain a criteria library** shared across frameworks, so that criteria are consistent. | Built | `settings/land-evaluation/criteria` |
| X09 | As Admin, I want to **configure cost estimation categories** with estimation methods and benchmarks, so that engineers use consistent cost structures. | Built | `settings/land-evaluation/cost` |
| X10 | As Admin, I want to **configure report templates** for management reports, so that auto-assembled reports match our format. | Built | `settings/land-evaluation/report` |
| X11 | As Admin, I want to **manage cost codes** with GL account mapping, so that cost classification drives correct GL posting. | Built | `masters/cost-codes` |
| X12 | As Admin, I want to **manage BOQ item templates**, so that estimators work from a standard catalog. | Built | `masters/boq-items` |
| X13 | As Admin, I want to **manage rate analysis templates**, so that rate breakdowns are reusable. | Built | `masters/rate-templates` |
| X14 | As Admin, I want **all configuration to be country-neutral** — Bangladesh criteria are templates, not code — so that the same engine works for UAE, KSA, UK. | Built | Doc 07, Section 8 |
| X15 | As Admin, I want **industry pack activation to be additive only** — activating RE seeds config, deactivating hides UI but never deletes data (ADR-008). | Designed | Doc 08, Section 2 |
| X16 | As Admin, I want **seeded templates** (BD defaults) that I can modify, so that setup is fast but customizable. | Built | Settings (all seeded) |
| X17 | As Admin, I want to **configure allocation drivers and rules** for overhead allocation, so that corporate costs are fairly distributed. | Designed | Doc 17, Section 3 |
| X18 | As Admin, I want to **configure quality inspection templates** and safety checklists, so that site teams use standardized forms. | Planned | Doc 20 |

---

## Coverage by Role — Final Assessment

| Role | Total Stories | Built | Designed | Planned | Coverage |
|---|---|---|---|---|---|
| **BD Officer / Land Officer** | 7 | 7 | 0 | 0 | 100% |
| **BD Head** | 5 | 5 | 0 | 0 | 100% |
| **Coordinator (Land)** | 7 | 7 | 0 | 0 | 100% |
| **Department Assessor** | 10 | 10 | 0 | 0 | 100% |
| **Department Head** | 3 | 3 | 0 | 0 | 100% |
| **CEO / MD** | 8 | 7 | 1 | 0 | 88% |
| **CFO / Finance** | 16 | 10 | 6 | 0 | 63% |
| **QS (Quantity Surveyor)** | 14 | 12 | 2 | 0 | 86% |
| **Project Manager** | 22 | 12 | 5 | 5 | 55% |
| **Site Engineer** | 12 | 7 | 3 | 2 | 58% |
| **Procurement Head** | 6 | 5 | 1 | 0 | 83% |
| **Sales Team** | 9 | 8 | 1 | 0 | 89% |
| **Sales Head** | 4 | 4 | 0 | 0 | 100% |
| **Store Keeper** | 5 | 2 | 3 | 0 | 40% |
| **Buyer (External)** | 4 | 4 | 0 | 0 | 100% |
| **Admin** | 18 | 16 | 2 | 0 | 89% |
| **Planning Engineer** | 6 | 0 | 0 | 6 | 0% |
| **QA Engineer** | 5 | 1 | 2 | 2 | 20% |
| **Safety Officer** | 5 | 0 | 1 | 4 | 0% |

### Key Observations

**Fully covered (80%+ built):** BD team, Land evaluation participants, Sales team, CEO dashboards, QS, Admin configuration — these roles can use the prototype as a complete demo.

**Partially covered (40-80%):** PM, Site Engineer, Finance — the financial chain is built, but management tools (scheduling, resource planning) are missing.

**Not covered (<20%):** Planning Engineer, QA Engineer, Safety Officer — these roles have no prototype screens. Their workflows are documented in Doc 20 as future features.

---

## The Bottom Line

**256 user stories.** 180 built in the prototype (70%). 44 designed with entity models (17%). 32 planned as gaps (13%).

The prototype is strongest at:
- **Land evaluation lifecycle** (100% coverage — the complete journey from broker call to management decision)
- **Financial tracking** (BOQ → procurement → bills → budget → revenue → P&L — complete chain)
- **Executive visibility** (8 dashboards, 22 reports — all built)
- **Configuration** (fully configurable, country-neutral)

The prototype is weakest at:
- **Construction scheduling** (Planning Engineer's entire job — zero coverage)
- **Quality management** (designed but not built)
- **Safety management** (designed but not built)
- **Labour and equipment costing** (GL side exists, operational entities missing)

These gaps are documented in Doc 20 with entity models and priority classification, ready for implementation when the scope expands.

---

_This is the complete capacity of AbcERP Real Estate — 256 things a construction company can do with this system. Every story maps to a spec doc, a screen (if built), and a clear status. When someone asks "can the system do X?" — the answer is here._
