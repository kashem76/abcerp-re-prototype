# AbcERP Real Estate Prototype — Specification Index

## What This Is

This directory is the **design authority** for the AbcERP Real Estate prototype. It defines the UX philosophy, workflow architecture, evaluation engine, and screen specifications that the prototype demonstrates. When the production system is built, these specs (plus the code reference in `abcERPCode/07-abcerp-code-reference/13-real-estate-development/`) are the two sources of truth.

> **Prototype = UX truth.** Code reference = Implementation truth. This directory bridges them.

---

## Quick Start

### Understand the Design Philosophy
1. Read `01-ux-philosophy-and-navigation.md` — the 4-area model, "ERP navigates the user" principle
2. Read `05-land-evaluation-complete-design.md` Section 11 — the natural workflow story (Day 1 → Day 17)

### Understand the Land Module (Most Complex)
3. Read `06-land-module-spec.md` — complete Land module: entities, workflows, business rules, screen mapping
4. Read `05-land-evaluation-complete-design.md` — Settings engine + operational screens + build status

### Understand Other Modules
5. Read `04-project-workspace-design.md` — Project workspace tabs (Plan, BOQ, Buy, Build, Sales, Finance)

### Track What's Built
6. Read `build-tracker.md` — 80+ screens built, flow diagrams, land evaluation rewrite status

---

## Document Map

### Design Philosophy

| File | What It Is | When to Read |
|---|---|---|
| `01-ux-philosophy-and-navigation.md` | Core UX principles, 4 work areas, universal interaction pattern, navigation rules, role-based views | Before designing any screen |
| `build-tracker.md` | All 80+ built screens, flow diagrams, technical notes | To see what exists and how users walk through it |

### Land Module (Pre-Project Lifecycle)

| File | What It Is | When to Read |
|---|---|---|
| `06-land-module-spec.md` | **Complete Land module specification** — entities, workflows, business rules, GL integration, screen-to-entity mapping. The implementation-ready reference. | Before building any Land module code |
| `05-land-evaluation-complete-design.md` | Land Evaluation detailed design — 3-layer architecture, Settings engine (7 pages), Operational screens (8 pages), natural workflow story, build status tracker | For screen-level detail and Settings configuration |
| `02-land-workspace-design.md` | Earlier workspace design (37 screens). Superseded by doc 05/06 but kept for investigation/site-visit detail | For Investigation tab and Site Visit flow detail |
| `03-evaluation-framework-design.md` | Earlier evaluation engine design. Superseded by doc 05/06 but kept for collaboration system detail | For criterion evaluation UX and discussion threading detail |

### Architecture & Configuration

| File | What It Is | When to Read |
|---|---|---|
| `10-operations-to-financials.md` | **Master flow document** — the complete pipeline from Land Lead to Project Closure. Dimension model (7 questions per transaction). Every GL entry. Every config/master dependency. Data source traceability chain. | **Day 1. Before everything else.** |
| `08-configuration-architecture.md` | **Configuration governance** — 4-layer config hierarchy, complete registry of every configurable element, settings screen architecture, what's hardcoded vs configurable, centralization plan | Before adding any new configurable element. Before hardcoding any value. |

### Project Module (Post-Acquisition)

| File | What It Is | When to Read |
|---|---|---|
| `09-project-master-lifecycle.md` | **Complete Project spec** — entity, 14-stage lifecycle, gate conditions, module activation matrix, project conversion from Land, every field traced to config/master source | Before building any Project module code |
| `04-project-workspace-design.md` | Project workspace UX design — 8 tabs (Overview, Plan, BOQ, Buy, Build, Inventory, Sales, Finance), each with sub-tabs and forms | For screen-level UX detail |

### BOQ & Cost Control

| File | What It Is | When to Read |
|---|---|---|
| `11-boq-estimation.md` | **BOQ & Estimation** — master data (cost codes, BOQ items, rate templates, measurement formulas), WBS, BOQ entry, rate analysis, approval, budget generation, progressive refinement chain | Before building any BOQ or cost control code |

### Execution Modules

| File | What It Is | When to Read |
|---|---|---|
| `12-contractor-management.md` | **Contractor Management** — tendering, comparative statement, contracts, work orders, running bills, retention, advance recovery. Financial chain + contractor performance tracking. | Before building procurement/contractor code |
| `13-site-operations.md` | **Site Operations & Construction Management** — DSR, material req/issue, quality management (concrete testing, inspections), safety incidents, progress tracking. Both financial and management perspectives. | Before building any site operations code |
| `14-sales-booking-collections.md` | **Sales, Booking & Collections** — unit inventory, pricing, booking wizard, payment schedules, collections, cancellation, transfer, revenue recognition (POC/CC). | Before building sales or revenue code |
| `15-variation-change-control.md` | **Variation & Change Control** — change requests, variation orders, budget waterfall, approval authority matrix, contingency tracking, BOQ versioning. | Before building change control code |
| `16-handover-closure.md` | **Handover, DLP & Closure** — unit handover, snag management, defect liability, retention release, project closure, buyer portal, feasibility vs actual report. | Before building handover or closure code |

### Analytics & Governance

| File | What It Is | When to Read |
|---|---|---|
| `17-cost-allocation-profitability.md` | **Cost Allocation & Profitability** — overhead allocation engine, unit cost allocation, feasibility vs actual, profit erosion waterfall, JV honest P&L. | Before building allocation or profitability code |
| `18-reporting-architecture.md` | **Reporting Architecture** — dimensions × measures framework, 22 reports + 8 dashboards, drill-down paths, data source trace per widget. | Before building any report or dashboard |
| `19-architecture-decisions.md` | **All Architecture Decisions** — 14 platform ADRs + 10 prototype PDRs, unified with cross-reference. The "why" behind every design choice. | Before making any design decision |

### Construction Management (Engineering Gaps)

| File | What It Is | When to Read |
|---|---|---|
| `20-construction-management-gaps.md` | **Engineering & site management gaps** — scheduling (Gantt/CPM), drawing management (RFI), quality (NCR), safety (permits), labour/equipment costing, contractor EOT/LD, hindrance register, coordination tools. Entity models for each. Priority matrix (P1/P2/P3). | When planning construction management features beyond financial tracking |

### Capacity & User Stories

| File | What It Is | When to Read |
|---|---|---|
| `21-capacity-and-user-stories.md` | **Complete system capacity** — 256 user stories across 19 roles, organized by module. Every story mapped to spec doc + prototype screen + status (Built/Designed/Planned). Coverage analysis by role. | Product demos, investor pitches, developer onboarding, feature prioritization, QA planning |
| `22-market-gap-analysis.md` | **Market gap analysis** — 52 new user stories from analyzing target companies across BD (Shanta, Concord, Bashundhara), UAE (Emaar, ALDAR, DAMAC), KSA (Roshn, Dar Al Arkan), Africa (Rendeavour, Centum). Sales CRM, construction loans, regulatory compliance, mobile access, multi-currency, Islamic finance. | Feature prioritization, market entry planning, investor pitch |

---

## How Prototype Docs Relate to Code Reference

| Prototype Doc (this directory) | Code Reference (`abcERPCode/07-abcerp-code-reference/13-real-estate-development/`) | Relationship |
|---|---|---|
| `06-land-module-spec.md` | `15-land-acquisition-jv.md` | Same domain. Prototype doc adds UX screens, natural workflow, evaluation engine. Code ref adds Prisma schemas, server actions, GL entries. |
| `05-land-evaluation-complete-design.md` | No direct equivalent | Evaluation engine is prototype-first — the configurable framework, criteria library, department collaboration system. Will need a code reference spec when implemented. |
| `04-project-workspace-design.md` | `11-boq-estimation.md`, `13-contractor-management.md`, `16-sales-booking-collections.md` | Prototype doc shows the unified workspace UX. Code ref docs have the per-domain schemas and business rules. |
| `01-ux-philosophy-and-navigation.md` | `00-real-estate-industry-guide.md` | Prototype doc defines UX. Code ref defines industry context. Together they answer "what does the user see?" and "why does the business need it?" |
| `build-tracker.md` | `BUILD-TRACKER.md` | Prototype tracks screens built. Code ref tracks implementation phases, dependencies, acceptance criteria. |

---

## Architecture Decisions (from Prototype Design)

These decisions are documented in `05-land-evaluation-complete-design.md` Section 9 and `06-land-module-spec.md`:

| # | Decision | Why |
|---|---|---|
| 1 | **Three-layer separation: Work / Evaluation / Decision** | Different audiences, different questions. Doers see tasks. Reviewers see scores. CEO sees a 1-page decision. |
| 2 | **Findings are first-class objects, not comments** | Comments don't flow into reports. Findings have severity, impact, recommendation, owner, status — and flow into the management report automatically. |
| 3 | **Stage is derived from business events, not a dropdown** | Prevents nonsense transitions (NEW → ACQUISITION). Stage advances when: workflow starts, assessments progress, sections signed off, management approves. |
| 4 | **Financial model consumes department outputs** | No manual entry of selling price in the financial model. Marketing provides it. Engineering provides cost. Finance assembles. Every assumption shows its source and "as of" date. |
| 5 | **JV captures entitlement rules, not unit allocation** | Units don't exist at Land stage. Capture: "Landowner gets 40% residential, 10 parking, 20M cash." Map to specific units after project creation. |
| 6 | **Payments are requisitions, not execution** | Correct ERP boundary. Land workspace creates demand. Finance fulfills it. GL posting happens in Finance. |
| 7 | **Investigation merged into Work** | No separate Investigation tab. Site inspection, legal review, market assessment — all appear as work steps on the Work Board. One pattern, learned once. |
| 8 | **Criteria are configurable, not hardcoded** | Bangladesh has Khatian/Dag/Mutation. UAE has DM permits. The engine understands: Section → Criterion → Assessment → Finding → Report. The customer defines what those mean. |
| 9 | **Report auto-assembles from department work** | No one prepares Word documents. Department findings + head comments + scores → structured management report. Versioned and immutable per submission. |
| 10 | **Four assignment modes** | Role / Specific Person / Department Queue / Decide at creation. Handles real-world staffing (leave, turnover) without hardcoding names in settings. |

---

## Key Numbers

| Metric | Count |
|---|---|
| Prototype screens (total) | 80+ |
| Land module screens (rewritten) | 15 (7 settings + 8 operational) |
| Specification documents | 22 |
| User stories documented | 256 |
| Architecture decisions (ADRs + PDRs) | 24 |
| Prototype screen flows | 9 |
| Role-specific dashboards | 8 |
| Reports demonstrated | 22 |
| Total documentation size | ~500KB |

---

## File Structure

```
_docs/
│
├── 📐 DESIGN PHILOSOPHY
│   └── 01-ux-philosophy-and-navigation.md      ← UX principles, 4 work areas, navigation rules
│
├── 📋 LAND MODULE (Pre-Project Lifecycle)
│   ├── 06-land-module-spec.md                   ← Complete spec: entities, workflows, rules, screens
│   ├── 05-land-evaluation-complete-design.md    ← Settings engine + operational screens + build status
│   ├── 02-land-workspace-design.md              ← Earlier design (superseded, kept for detail)
│   └── 03-evaluation-framework-design.md        ← Earlier engine design (superseded, kept for detail)
│
├── ⚙️ CONFIGURATION
│   └── 08-configuration-architecture.md         ← Config governance, registry, centralization plan
│
├── 🏗️ PROJECT MODULE (Post-Acquisition)
│   └── 04-project-workspace-design.md           ← Project workspace: 8 tabs, sub-tabs, forms
│
├── 📊 BUILD TRACKING
│   └── build-tracker.md                         ← All screens, flows, land evaluation rewrite status
│
└── 🗂️ INDEX
    └── 00-prototype-index.md                    ← This file
```

---

_This prototype is the UI blueprint for the production AbcERP Real Estate module. Every screen is a conversation starter: "Is this what you need? What's missing? What should change?"_
