# Architecture Decisions — Unified Record

**Purpose:** Every major design decision for AbcERP Real Estate, unified from both the code reference (14 ADRs) and the prototype design (10 decisions). Each records **what** was decided, **why**, and **what was rejected**.

**Code Reference:** `ARCHITECTURE-DECISIONS.md`

---

## Platform Architecture (from Code Reference)

### ADR-001: Extend Core, Don't Rebuild

**Decision:** Real Estate modules extend existing core modules (Procurement, AR, AP, Inventory, Budget, GL) by adding project dimension fields. They do NOT create parallel systems.

**Why:** A separate "RE Procurement" or "RE AP" would mean two places to track payables, two ledgers to reconcile. Contractors are Suppliers (`supplierType = CONTRACTOR`). Installment demands are SalesInvoices. One AP ledger, one AR ledger, one truth.

**Rejected:** Self-contained RE modules with their own AP/AR. This is what most construction software does — and why their numbers never match the accounting.

**Impact:** Every core model gets nullable `projectId`/`wbsId`/`costCodeId` columns. Dormant until RE pack activated.

---

### ADR-002: Material Req/Issue/Return/Wastage in Core, Not RE

**Decision:** MR, MI, MRT, Wastage workflows are core inventory features. RE extends with project dimensions.

**Why:** Every industry with a store needs: request → approve → issue → return → wastage. Manufacturing, hospital, food & agro — all same pattern. RE-specific part is only: `projectId`, `wbsId`, `costCodeId` on lines, and DR account being Construction WIP.

**Rejected:** Building MR/MI inside the RE pack. Analysis showed 80% of logic is generic.

---

### ADR-003: Seven Dimensions, Not One Cost Center

**Decision:** Every transaction carries seven independent dimensions: Project, WBS, Cost Code, RC, CC, PC, GL Account.

**Why:** A single cost center hierarchy cannot answer "who spent this?" AND "on what work?" AND "what type of cost?" AND "where is profit measured?" simultaneously. Each dimension answers a different management question.

**Impact:** `projectId`, `wbsId`, `costCodeId` are first-class FK fields (not generic analytics) for query performance. Config: Settings > Dimension Rules enforces which are required per transaction type.

---

### ADR-004: Project ≠ Profit Center (Configurable)

**Decision:** Project references a default Profit Center but is not the same entity. Configurable per project.

**Why:** Most developers want 1 Project = 1 PC. But: a holding company might group 3 projects into one "Residential Division" PC. A mixed-use project might have Residential Tower (PC1) and Commercial Block (PC2) within one project.

**Impact:** `RealEstateProject.defaultProfitCenterId` is a FK reference, not an identity.

---

### ADR-005: JV P&L Shows Honest Cost

**Decision:** Developer's P&L shows 100% of construction cost, not proportional share. Landowner's units are the implicit land cost.

**Why:** Developer actually paid ৳520M for ALL 20 units. Showing only 14/20 proportional (৳364M) makes margin appear 45.3% — misleadingly high. The 6 units given to landowner ARE the land cost — paid in kind.

**Rejected:** Proportional allocation (hides ৳156M of real cost).

---

### ADR-006: BOQ Baseline Is Immutable

**Decision:** Approved BOQ V1 (baseline) is never overwritten. All changes go through Variation Orders creating delta versions.

**Why:** Without a frozen baseline, "how much did the project change?" is unanswerable. `BASELINE + APPROVED VARIATIONS = CURRENT APPROVED BUDGET` — this formula requires immutability.

**Rejected:** Direct BOQ edits after approval. This is what spreadsheets do.

---

### ADR-007: Booking Advances Are Liabilities, Not Revenue

**Decision:** Customer booking payments are recorded as Current Liability (`Booking Advance — Customer`), not Revenue.

**Why:** Developer hasn't delivered anything yet. Revenue requires either completion % (POC) or handover (CC). Recording advances as revenue overstates income, violates IFRS 15/BAS, and misleads management. This is the #1 accounting mistake in real estate.

**Impact:** GL: `DR Cash / CR Booking Advance (Liability)`. Revenue only on recognition event.

---

### ADR-008: Industry Pack Activation Is Additive Only

**Decision:** Activating RE pack seeds data and tables. Deactivating hides menus but NEVER drops tables or deletes data.

**Why:** If an org creates projects then deactivates — data must survive. Re-activating restores full state. Multiple packs can coexist (RE + Food & Agro divisions).

---

### ADR-009: Retention Is a BS Liability, Not a Discount

**Decision:** Contractor retention tracked as separate `Retention Payable` liability, not deducted from bill amount.

**Why:** Retention is money owed to contractor — just not yet. Released after DLP. Treating as discount understates liabilities. GL: `DR WIP (gross) / CR AP (net) + CR Retention Payable + CR TDS Payable`.

---

### ADR-010: Wastage Is Expensed, Never Capitalized

**Decision:** Material wastage (breakage, theft, spoilage) expensed immediately to P&L. Never added to WIP.

**Why:** Capitalizing wastage inflates WIP asset. If 10 bags cement are stolen, the project didn't become more valuable. GL: `DR Wastage Expense (P&L) / CR Site Inventory`.

---

### ADR-011: Three Reconciliation Gates Block Period Close

**Decision:** Three reconciliations must pass before period close:
1. Subledger ↔ GL (AR/AP/WIP totals match control accounts)
2. Sum of Project P&Ls = Company P&L (no untagged transactions)
3. Managerial WIP = Balance Sheet WIP (PM's cost report matches auditor's asset)

**Why:** Allowing period close without reconciliation is how accounting problems compound over months until unfixable.

---

### ADR-012: Reports Built on Dimensions × Measures

**Decision:** Reporting architecture with reusable dimensions and measures. Not 500 independent implementations.

**Why:** Most reports are "Show me [measure] grouped by [dimension] filtered by [criteria]." Build 6-7 templates, configure them.

---

### ADR-013: CostCenter and ProfitCenter = ResponsibilityCenter Types

**Decision:** No separate models. Both are `ResponsibilityCenter` with `type = COST` or `PROFIT`.

**Why:** Codebase has a single RC model with type enum. Creating separate models duplicates structure.

---

### ADR-014: Use Codebase Model Names

**Decision:** All specs use exact model names from dev codebase, not simplified aliases.

**Why:** Prevents developer confusion. The codebase is truth.

---

## Prototype Design Decisions (from UX/Workflow Design)

### PDR-001: Three-Layer Separation (Work / Evaluation / Decision)

**Decision:** The Land module separates three distinct layers with different audiences and different questions.

**Why:** A doer ("what's my next task?"), a reviewer ("what's the score?"), and a CEO ("should we proceed?") need fundamentally different screens. Mixing task cards with financial KPIs with decision buttons on one screen serves no one well.

**Impact:** Work Board shows tasks only. Evaluation Overview shows scores/findings. Decision shows report + 4 options. No cross-contamination.

---

### PDR-002: Findings Are First-Class Objects

**Decision:** Findings have: title, severity, impact, recommendation, owner, status. They are not comments.

**Why:** Comments don't flow into reports. Findings do. Promotion path: Discussion → Finding → Risk → Report. Each step adds formality and accountability.

**Rejected:** Keeping findings as tagged comments. This makes formal reporting impossible.

---

### PDR-003: Stage Derived from Business Events

**Decision:** Users cannot set stage via dropdown. Stage advances when: workflow starts (→ ASSESSMENT), assessments progress (→ FEASIBILITY), sections signed off (→ DECISION), management approves (→ ACQUISITION).

**Why:** Prevents nonsense like NEW → ACQUISITION. Admin override exists with audit trail for exceptions.

---

### PDR-004: Financial Model Consumes Department Outputs

**Decision:** Marketing provides selling price. Engineering provides cost. Finance assembles. Every assumption shows source department + assessor + date.

**Why:** Eliminates "who entered ৳12,000/sqft?" mystery. If the number is wrong, you know who to ask. If it's stale (>30 days), the system flags it.

**Rejected:** Manual entry of all financial model inputs. This disconnects the model from the assessment evidence.

---

### PDR-005: JV Captures Entitlement Rules, Not Unit Allocation

**Decision:** At Land stage, capture contractual percentages. Unit allocation happens after Project → Building → Floor → Unit exists.

**Why:** Units don't exist yet. Capture: "Landowner gets 40% residential, 10 parking, 20M cash." Map to specific units after project creation.

---

### PDR-006: Payments Are Requisitions, Not Execution

**Decision:** Land workspace creates Payment Requisitions. Finance executes payments and posts GL.

**Why:** Correct ERP boundary. Land creates demand. Finance fulfills. Keeps GL posting authority in Finance module.

---

### PDR-007: Investigation Merged into Work

**Decision:** No separate Investigation tab. Site inspection, legal review, market assessment — all appear as work steps on the Work Board.

**Why:** Having Investigation behave differently from Feasibility task management creates UX inconsistency. Users learn Work Board once.

---

### PDR-008: Criteria Are Configurable, Not Hardcoded

**Decision:** Bangladesh has Khatian/Dag/Mutation. UAE has DM permits. Engine understands: Section → Criterion → Assessment → Finding → Report. Customer defines the content.

**Why:** A hardcoded "Mutation Verification" criterion is useless in UAE. Templates are configuration, not code.

**Impact:** Full Settings engine: Framework Builder (6 tabs), Criteria Library, Selection Templates, Cost Categories, Report Templates.

---

### PDR-009: Report Auto-Assembles from Department Work

**Decision:** No one prepares Word documents. Department findings + head comments + scores → structured management report. Versioned and immutable.

**Why:** Manual report preparation is slow, error-prone, and not auditable. Auto-assembly ensures completeness (every department's input is included) and versioning (no silent edits).

---

### PDR-010: Four Assignment Modes

**Decision:** Role / Specific Person / Department Queue / Decide at creation.

**Why:** Hardcoding "Adv. Rahman" breaks when Rahman is on leave. Role-based resolution with coordinator override handles real-world staffing. Config: Settings > Land Evaluation > Frameworks > Team tab.

---

## Decision Cross-Reference

| Domain | Financial Decisions | Workflow Decisions |
|---|---|---|
| **Core GL** | ADR-001 (extend core), ADR-003 (7 dimensions), ADR-011 (reconciliation gates) | — |
| **BOQ** | ADR-006 (baseline immutable) | — |
| **Sales** | ADR-007 (advances are liabilities) | — |
| **Contractors** | ADR-009 (retention is liability) | — |
| **Inventory** | ADR-002 (MR/MI in core), ADR-010 (wastage expensed) | — |
| **JV** | ADR-005 (honest cost) | PDR-005 (rules not allocation) |
| **Reporting** | ADR-012 (dimensions × measures) | — |
| **Land Evaluation** | — | PDR-001 (3 layers), PDR-002 (findings), PDR-003 (derived stage), PDR-004 (department inputs), PDR-007 (merged investigation), PDR-008 (configurable), PDR-009 (auto-report), PDR-010 (4 assignment modes) |
| **Configuration** | ADR-008 (additive activation), ADR-013 (RC types) | PDR-006 (payment requisitions), PDR-008 (criteria are config) |

---

_These decisions are the "why" behind the "what." When a developer asks "why isn't there a separate Contractor AP module?" — ADR-001. When a PM asks "why can't I just change the BOQ?" — ADR-006. When a sales manager asks "why isn't this booking showing as revenue?" — ADR-007. The answers are here._
