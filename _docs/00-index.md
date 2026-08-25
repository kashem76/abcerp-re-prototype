# AbcERP Real Estate Prototype — Specification Index

**26 documents, 297 user stories, 133+ screens planned across 16 releases.**

> **Prototype = UX truth.** Code reference = Implementation truth. This directory bridges them.

---

## Quick Start

1. Read `03-operations-to-financials.md` — the master flow (Land Lead → Project Closure)
2. Read `01-ux-philosophy.md` — "ERP navigates the user" principle
3. Read `05-build-plan.md` — what to build, in what order
4. Read the spec doc for the release you're working on (numbered by release)

---

## Document Map — Organized by Release

### Foundation (00–05) — Read First, Always

| # | File | What It Is |
|---|---|---|
| 00 | `00-index.md` | This file — master guide |
| 01 | `01-ux-philosophy.md` | Core UX principles, 4 work areas, navigation rules, role-based views |
| 02 | `02-configuration-architecture.md` | 4-layer config hierarchy, complete registry, settings governance |
| 03 | `03-operations-to-financials.md` | **The spine.** Master flow, 7 dimensions, every GL entry, data source traceability |
| 04 | `04-architecture-decisions.md` | 14 platform ADRs + 10 prototype PDRs, unified with cross-reference |
| 05 | `05-build-plan.md` | Release roadmap R1-R16, dependency graph, parallel tracks, effort estimates |

### R1: Land Evaluation (10–14) — ✅ DONE

| # | File | What It Is |
|---|---|---|
| 10 | `10-land-evaluation-design.md` | Settings engine (7 pages) + operational screens (8 pages) + natural workflow story |
| 11 | `11-land-module-spec.md` | Entities, workflows, business rules, GL, screen-to-entity mapping |
| 12 | `12-evaluation-engine-spec.md` | 30 Prisma models, server actions, criteria library, report auto-assembly |
| 13 | `13-land-workspace-detail.md` | Earlier workspace design — kept for Investigation/Site Visit detail |
| 14 | `14-evaluation-framework-detail.md` | Earlier engine design — kept for collaboration system detail |

### R2: Project + BOQ (20–22) — ✅ DONE

| # | File | What It Is |
|---|---|---|
| 20 | `20-project-master-lifecycle.md` | Project entity, 14-stage lifecycle, gate conditions, module activation matrix |
| 21 | `21-boq-estimation.md` | Master data (cost codes, BOQ items, rate templates), WBS, measurement, rate analysis |
| 22 | `22-project-workspace-design.md` | Project workspace UX — 8 tabs with sub-tabs and forms |

### R3: Execution (30–31) — ✅ DONE

| # | File | What It Is |
|---|---|---|
| 30 | `30-contractor-management.md` | Tendering, contracts, work orders, running bills, retention, performance |
| 31 | `31-site-operations.md` | DSR, material req/issue, quality, safety, progress. Financial + management |

### R4: Sales & Revenue (40) — ✅ DONE

| # | File | What It Is |
|---|---|---|
| 40 | `40-sales-booking-collections.md` | Unit inventory, pricing, booking wizard, payment schedules, cancellation, transfer |

### R5: Change Control & Close (50–51) — ✅ DONE

| # | File | What It Is |
|---|---|---|
| 50 | `50-variation-change-control.md` | Change requests, variation orders, budget waterfall, BOQ versioning |
| 51 | `51-handover-closure.md` | Handover, snag management, DLP, retention release, closure, buyer portal |

### R6: Dashboards & Reports (60) — ✅ DONE

| # | File | What It Is |
|---|---|---|
| 60 | `60-reporting-architecture.md` | Dimensions × measures framework, 22 reports + 8 dashboards |

### R8: Sales CRM (70) — NEXT

| # | File | What It Is |
|---|---|---|
| 70 | `70-sales-crm-spec.md` | Lead → follow-up → quotation → reservation → booking. Broker commission. 12 screens |

### R9: Loans & Collections (71) — NEXT

| # | File | What It Is |
|---|---|---|
| 71 | `71-construction-loans-collections.md` | Loan draw-down, IAS 23 interest, demand letters, penalty, FIFO allocation. 9 screens |

### R10-R16: Future (80) — PLANNED

| # | File | What It Is |
|---|---|---|
| 80 | `80-construction-management-gaps.md` | Scheduling, drawings/RFI, quality/NCR, safety/permits, labour, equipment, EOT/LD |

### Reference (90+) — Not Release-Specific

| # | File | What It Is |
|---|---|---|
| 90 | `90-cost-allocation-profitability.md` | Overhead allocation, unit cost, feasibility vs actual, profit erosion |
| 91 | `91-capacity-user-stories.md` | 256 user stories across 19 roles. Coverage analysis. |
| 92 | `92-market-gap-analysis.md` | 52 new stories from BD/UAE/KSA/Africa target companies |
| 93 | `93-screen-tracker.md` | All 80+ built screens, flow diagrams, technical notes |

---

## Numbering Convention

```
Tens digit = Release number

00-05  Foundation (read first)
10-14  R1: Land Evaluation
20-22  R2: Project + BOQ
30-31  R3: Execution (Contractor + Site Ops)
40     R4: Sales & Revenue
50-51  R5: Change Control & Close
60     R6: Reports & Dashboards
70-71  R8-R9: Sales CRM + Loans/Collections
80     R10-R16: Future (Construction Management)
90-93  Reference (cross-cutting)
```

A developer working on R3 reads docs `30-*` and `31-*`.

---

## Key Numbers

| Metric | Count |
|---|---|
| Specification documents | 26 |
| Prototype screens (built) | 80+ |
| Planned new screens (R8-R16) | 53 |
| User stories | 297 |
| Architecture decisions | 24 (14 ADR + 10 PDR) |
| Releases | 16 (7 done + 9 planned) |
| Target markets | 4 (BD, UAE, KSA, Africa) |

---

## File Structure

```
_docs/
│
├── FOUNDATION (00-05)
│   ├── 00-index.md                          ← This file
│   ├── 01-ux-philosophy.md                  ← UX principles
│   ├── 02-configuration-architecture.md     ← Config governance
│   ├── 03-operations-to-financials.md       ← Master flow (THE SPINE)
│   ├── 04-architecture-decisions.md         ← 24 ADRs/PDRs
│   └── 05-build-plan.md                     ← Release roadmap
│
├── R1: LAND (10-14)
│   ├── 10-land-evaluation-design.md         ← Screen design + build status
│   ├── 11-land-module-spec.md               ← Module spec
│   ├── 12-evaluation-engine-spec.md         ← Engine spec (30 models)
│   ├── 13-land-workspace-detail.md          ← Archive (investigation detail)
│   └── 14-evaluation-framework-detail.md    ← Archive (collaboration detail)
│
├── R2: PROJECT + BOQ (20-22)
│   ├── 20-project-master-lifecycle.md       ← Project entity + 14 stages
│   ├── 21-boq-estimation.md                 ← BOQ + master data
│   └── 22-project-workspace-design.md       ← Workspace UX
│
├── R3: EXECUTION (30-31)
│   ├── 30-contractor-management.md          ← Tender → bill
│   └── 31-site-operations.md               ← DSR + materials + quality + safety
│
├── R4: SALES (40)
│   └── 40-sales-booking-collections.md      ← Booking → collections → revenue
│
├── R5: CLOSE (50-51)
│   ├── 50-variation-change-control.md       ← CR → VO → budget
│   └── 51-handover-closure.md               ← Handover → DLP → closure
│
├── R6: REPORTS (60)
│   └── 60-reporting-architecture.md         ← 22 reports + 8 dashboards
│
├── R8-R9: NEW (70-71)
│   ├── 70-sales-crm-spec.md                 ← Pre-booking pipeline
│   └── 71-construction-loans-collections.md ← Loans + demand letters
│
├── R10-R16: FUTURE (80)
│   └── 80-construction-management-gaps.md   ← Scheduling, quality, safety, drawings
│
└── REFERENCE (90-93)
    ├── 90-cost-allocation-profitability.md   ← Overhead + unit cost + F vs A
    ├── 91-capacity-user-stories.md           ← 297 user stories
    ├── 92-market-gap-analysis.md             ← Target company analysis
    └── 93-screen-tracker.md                  ← Built screen inventory
```

---

_Tens digit = release number. Read the foundation docs first, then the docs for your release._
