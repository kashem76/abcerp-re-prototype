# Project Master & Lifecycle — Complete Specification

**Module:** Project Entity, Lifecycle Stages, Phase Management, and Project Conversion
**Code Reference:** `01-project-master.md` + `08-project-lifecycle.md`
**Prototype Screens:** Project List, Project Detail, Create Project, Project Conversion

---

## 1. Overview & Core Principle

The **Project** is the gravity well of AbcERP Real Estate. Every BOQ line, every material requisition, every contractor bill, every unit booking, every running bill, every GL posting — all reference a Project. Without a Project, no cost can be tracked, no unit can be sold, no profit can be measured.

A Project is **not created manually by filling a form**. It is born from the Land module — when management approves a land acquisition and the acquisition milestones are complete, the Land workspace offers [Create Project]. Most information carries forward automatically.

### How a Real Estate Project Actually Starts

In the real world, a developer doesn't wake up one morning and "create a project." The journey is:

1. A broker calls about a plot → **Land Lead created**
2. BD team visits, qualifies, starts evaluation → **departments assess**
3. Financial model shows 20% IRR → **management approves**
4. Land is purchased or JV agreement signed → **acquisition complete**
5. Now — and only now — does the **Project exist**

The Project inherits everything: land information, approved feasibility baseline, documents, risks, conditions, JV terms, pre-development costs. The developer doesn't re-enter anything.

> **Non-Negotiable Core Principle:**
> _Every financial transaction related to a real estate project must be tagged to a Project with at minimum: projectId, costCodeId, and the appropriate responsibility center. This is not optional — the GL posting gate rejects entries without required dimensions. The Project is both the cost object and the profit measurement unit._

---

## 2. What This Module Delivers

### Project Entity
- Centralized project record: name, code, location, type, dates, budget
- Linkage to Responsibility Center (Cost Center + Profit Center)
- Building/Tower hierarchy: Project → Building → Floor → Unit
- Phase management with budget allocation and date tracking

### Lifecycle State Machine
- 14 controlled stages from PLANNING through CLOSED
- Gate conditions per stage (financial + documentary)
- Module activation matrix (which tabs/features are available per stage)
- Stage overlap rules (Sales runs parallel to Construction)
- Audit trail for every transition (who, when, why, gate check results)

### Project Conversion (from Land)
- One-click creation from Land Acquisition tab
- Auto-carry-forward of land data, feasibility, documents, conditions
- Pre-development cost reclassification (P&L → WIP)
- Accounting dimension auto-assignment

---

## 3. Real-World Workflow

### 3.1 Project Creation (from Land Conversion)

**Who does it:** Land Coordinator or Project Director
**When:** All acquisition milestones are complete (deed registered, possession taken, or JV agreement signed)
**Where:** Land Workspace → Acquisition tab → [Create Project]

```
Step 1: Click [Create Project] on acquisition-complete screen

Step 2: Conversion Form (most fields pre-filled)
┌─────────────────────────────────────────────────────────────┐
│ Project Name *         [ Gulshan Residence          ]       │  ← Suggested from land name
│ Project Code *         [ GR-2026-01                 ]       │  ← Source: Settings > Numbering > Project
│                                                             │
│ Expected Start         [ 01 Sep 2026                ]       │  ← User input
│ Expected Completion    [ 31 Dec 2029                ]       │  ← User input
│                                                             │
│ Responsibility Center  [ Real Estate Development ▼  ]       │  ← Source: Core > Responsibility Centers
│ Cost Center            [ Gulshan Residence ▼        ]       │  ← Auto-created or selected
│ Profit Center          [ Gulshan Residence ▼        ]       │  ← Auto-created or selected
│                                                             │
│ Carry Forward:                                              │
│ ✓ Approved feasibility (V3)                                │  ← Source: EvaluationStudy.decision
│ ✓ Land acquisition cost (৳450M)                            │  ← Source: Acquisition.totalCost
│ ✓ Pre-development costs (৳8.4M)                            │  ← Source: PreDevExpense.sum
│ ✓ 37 documents                                             │  ← Source: LandDocument.count
│ ✓ JV / agreement terms                                     │  ← Source: Acquisition.agreement
│ ✓ Open conditions (2)                                      │  ← Source: DecisionCondition.where(OPEN)
│                                                             │
│ Transfer pre-dev costs?                                     │
│ ● Transfer to Project WIP                                  │
│ ○ Keep as corporate expense                                │
│                                                             │
│                          [Create Project →]                 │
└─────────────────────────────────────────────────────────────┘

Step 3: System creates:
  - RealEstateProject record with all carry-forward data
  - ProjectPhase[] (empty — user defines in PLANNING stage)
  - Links to Land record (bidirectional)
  - Land stage → CONVERTED (read-only)
  - If cost transfer selected:
      DR Pre-Construction WIP (Asset)    ৳8.4M
        CR Pre-Development Expense         ৳8.4M
```

**Data Source Trace:**

| Field | Source | Config/Master/Computed |
|---|---|---|
| Project Name | User input (suggested from Land.name) | — |
| Project Code | Auto-generated | Config: Settings > Numbering > Project format |
| Start / End Dates | User input | — |
| Responsibility Center | User selects | Master: Core > Responsibility Centers |
| Cost Center | User selects or auto-created | Master: Core > Responsibility Centers (type=COST) |
| Profit Center | User selects or auto-created | Master: Core > Responsibility Centers (type=PROFIT) |
| Feasibility baseline | Auto-carried | Computed: ManagementReport.snapshot (locked version) |
| Land cost | Auto-carried | Computed: Acquisition.totalCost |
| Pre-dev costs | Auto-carried | Computed: SUM(PreDevExpense.amount) |
| Documents | Auto-linked | Source: LandDocument[] |
| JV terms | Auto-linked | Source: JVAgreement + EntitlementRule[] |
| Open conditions | Auto-linked | Source: DecisionCondition[].where(status=OPEN) |
| Currency | Inherited | Config: Settings > General > defaultCurrency |

### 3.2 Project Setup (PLANNING Stage)

**Who does it:** Project Director + Project Manager
**When:** Immediately after project creation
**Where:** Project Workspace → Plan tab

```
Step 1: Define Building Structure
  Project → Building/Tower → Floor → Unit
  
  Example:
  Gulshan Residence
  ├── Tower A (14 floors)
  │   ├── GF: Commercial (4 units)
  │   ├── 1F-10F: Residential (4 units per floor = 40 units)
  │   └── 11F-14F: Penthouse (2 units per floor = 8 units)
  └── Common Areas
      ├── Basement Parking (40 spaces)
      ├── Lift Lobby
      └── External Works

Step 2: Define Phases
┌──────────────────────────────────────────────────────────────────────┐
│ Phase              Start         End           Budget        Status  │
│                                                                      │
│ Foundation         01 Sep 2026   31 Jan 2027   ৳168M         Plan   │
│ Structure          01 Dec 2026   30 Sep 2027   ৳352M         Plan   │
│ MEP                01 Jun 2027   31 Mar 2028   ৳144M         Plan   │
│ Finishing          01 Jan 2028   30 Sep 2028   ৳190M         Plan   │
│ External Works     01 Jul 2028   31 Dec 2028   ৳46M          Plan   │
│ Handover           01 Oct 2028   31 Mar 2029   —             Plan   │
└──────────────────────────────────────────────────────────────────────┘

Step 3: Define Unit Inventory
  Each unit: type, area (sqft), floor, facing, base price
  Status: AVAILABLE (all units start here)
  
Step 4: Define WBS (Work Breakdown Structure)
  Project → Tower → Trade → Activity
  Leaf nodes accept BOQ items
```

**Data Source Trace:**

| Field | Source | Config/Master/Computed |
|---|---|---|
| Phase names | User input | — (common pattern: Foundation, Structure, MEP, Finishing, External, Handover) |
| Phase budget | User input | Validated against: EvaluationStudy.financialModel.totalCost |
| Unit types | User input | — |
| Unit base price | User input | Reference: EvaluationStudy.financialModel.sellingPrice |
| Floor premium % | User input | Config: Settings > General (if org-level default exists) |
| Facing premium % | User input | Config: Settings > General (if org-level default exists) |
| WBS structure | User input | — (typically mirrors phase + building structure) |

### 3.3 Day-to-Day Operations (CONSTRUCTION Stage)

During construction, the Project workspace is the central hub. Each tab maps to a distinct operational concern:

| Tab | Who Uses It | What They Do | Key Entities |
|---|---|---|---|
| **Overview** | Project Director | Health check, KPIs, attention items, next actions | Project, ProjectPhase, Budget |
| **Plan** | PM, Engineers | WBS, phases, timeline, milestones | ProjectWBS, ProjectPhase |
| **BOQ** | QS, Engineers | Line items, measurement, rate analysis, approval | ProjectBOQ, ProjectBOQLine, MeasurementSheet |
| **Buy** | Procurement | Tenders, contracts, work orders, material requisitions | Tender, Contract, WorkOrder, MaterialRequisition |
| **Build** | Site Engineers | DSR, running bills, variation orders, progress | DailySiteReport, RunningBill, VariationOrder |
| **Inventory** | Store Keeper | Stock, issues, returns, wastage, consumption | MaterialIssue, MaterialReturn, BOQConsumption |
| **Sales** | Sales Team | Unit booking, cancellation, transfer, collections | UnitBooking, PaymentSchedule, Collection |
| **Finance** | CFO, Accountant | Budget vs actual, cost tracking, revenue, P&L | Budget, WIP, RevenueRecognition |

### 3.4 Project Closure

**Who does it:** Project Director + CFO
**When:** All units handed over, all contractor bills settled, DLP expired
**Where:** Project Workspace → Overview → [Close Project]

```
Automated Closure Checks:
✓ All units handed over (PropertyUnit.status = HANDED_OVER for all)
✓ WIP balance = 0 (all costs transferred to COGS)
✓ AR balance = 0 (all customer payments received)
✓ No open POs or WOs
✓ All retentions released
✓ All DLP cases closed
⚠ 2 minor defect claims pending (can be waived)

Financial Summary:
                        Feasibility    Actual       Variance
Revenue                 ৳1,820M        ৳1,856M      +2.0%
Construction Cost       ৳716M          ৳738M        +3.1%
Land Cost               ৳450M          ৳450M         0.0%
Marketing               ৳56M           ৳48M         -14.3%
Finance Cost            ৳84M           ৳92M         +9.5%
Total Cost              ৳1,348M        ৳1,371M      +1.7%
────────────────────────────────────────────────────────
Net Profit              ৳472M          ৳485M        +2.8%
Margin                  25.9%          26.1%        +0.2pp

[Close Project →]  → Stage: CLOSED (sealed, no further postings)
```

**Data Source Trace:**

| Check | Source | Config |
|---|---|---|
| All units handed over | PropertyUnit.status | — |
| WIP = 0 | GL balance: WIP accounts | Master: GL Account for Construction WIP |
| AR = 0 | GL balance: AR accounts | Master: GL Account for Trade Receivables |
| No open POs | PurchaseOrder.where(status != CLOSED) | — |
| Retentions released | RetentionPayable balance | Master: GL Account for Retention |
| DLP cases closed | DefectLiabilityCase.where(status != CLOSED) | Config: Settings > General > dlpPeriodMonths |
| Feasibility baseline | ManagementReport.snapshot (locked) | — |
| Actual figures | GL actuals by project dimension | — |

---

## 4. The 14 Lifecycle Stages

### Stage Flow

```
From Land Module:
  Land CONVERTED → Project Created at PLANNING stage

Project Lifecycle:
  PLANNING → BOQ_ESTIMATION → TENDERING → PRE_SALES → CONSTRUCTION
                                              ↕ (parallel)
                                         SALES_COLLECTION
                                              ↓
                                         FINISHING → HANDOVER → DEFECT_LIABILITY → CLOSED
```

### Stage Detail

| # | Stage | Primary Activity | Key Financial Events | Modules Active | Gate to Next |
|---|---|---|---|---|---|
| 1 | **PLANNING** | Define phases, WBS, building structure, unit inventory | None (planning only) | Plan | Phases defined, budget allocated, units created |
| 2 | **BOQ_ESTIMATION** | Create BOQ, measurement sheets, rate analysis | None (BOQ is plan, not posting) | Plan, BOQ | BOQ approved & locked as BASELINE |
| 3 | **TENDERING** | Issue tenders, evaluate bids, award contracts | Commitment registered (off-balance-sheet) | BOQ, Buy | Major work packages have contracts |
| 4 | **PRE_SALES** | Set prices, launch marketing, collect bookings | DR Cash / CR Booking Advance (Liability) | Sales | Pricing approved, min pre-sales threshold met |
| 5 | **CONSTRUCTION** | Procure, build, certify contractor bills | DR WIP / CR AP + Inventory + Payroll | All tabs | Phase completion verified, budget reviewed |
| 6 | **SALES_COLLECTION** | Raise demands, collect installments, recognize revenue | DR AR / CR Revenue + DR COGS / CR WIP | Sales, Finance | Collections on track, revenue recognized |
| 7 | **FINISHING** | Final finishing, punch lists, last contractor bills | DR WIP (Finishing) / CR AP | Build, Sales | OC/CC obtained, punch list cleared |
| 8 | **HANDOVER** | Unit inspection, key handover, clearances | Revenue recognition (CC method) | Sales, Finance | All units handed over |
| 9 | **DEFECT_LIABILITY** | Track defects, hold retention, monitor warranty | Defect provision / Retention release | Build, Finance | DLP expired for all units |
| 10 | **CLOSED** | Sealed — no further postings | Final P&L locked | Finance (read-only) | Terminal |

### Module Activation Matrix

| Module/Tab | PLANNING | BOQ | TENDERING | PRE_SALES | CONSTRUCTION | FINISHING | HANDOVER | DLP | CLOSED |
|---|---|---|---|---|---|---|---|---|---|
| Overview | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ (RO) |
| Plan | ✓ | ✓ | ✓ | — | — | — | — | — | — |
| BOQ | — | ✓ | ✓ | — | ✓ (RO) | ✓ (RO) | — | — | — |
| Buy | — | — | ✓ | — | ✓ | ✓ | — | — | — |
| Build | — | — | — | — | ✓ | ✓ | — | ✓ | — |
| Inventory | — | — | — | — | ✓ | ✓ | — | — | — |
| Sales | — | — | — | ✓ | ✓ | ✓ | ✓ | — | — |
| Finance | — | — | — | — | ✓ | ✓ | ✓ | ✓ | ✓ (RO) |

RO = Read Only

### Stage Transition Rules

Every stage transition requires:
1. **Gate conditions met** — checked automatically by the system
2. **Authorized user** — only users with stage-transition permission can advance
3. **Audit record** — who transitioned, when, which gates passed/were overridden
4. **No rollback** — stages move forward only. If a project needs to "go back" (e.g., re-open BOQ after construction started), it uses the Variation Order process, not a stage reversal.

**Data Source Trace for Stage Transitions:**

| Transition | Gate Conditions Source | Override Authority |
|---|---|---|
| PLANNING → BOQ | ProjectPhase[].count > 0, Budget.status = APPROVED | Config: Settings > Approval Workflows |
| BOQ → TENDERING | ProjectBOQ.status = BASELINE_LOCKED | Config: Settings > Approval Workflows |
| TENDERING → CONSTRUCTION | Contract[].count > 0, Commitment ≤ Budget + Contingency | Config: Settings > General > contingencyPercent |
| CONSTRUCTION → FINISHING | Phase(Structure).completion ≥ 90% | — |
| FINISHING → HANDOVER | OC obtained (manual check), punch list items ≤ threshold | Config: Settings > General > maxOpenPunchItems |
| HANDOVER → DLP | All PropertyUnit.status = HANDED_OVER | — |
| DLP → CLOSED | All DefectLiabilityCase.status = CLOSED, WIP = 0, AR = 0 | Config: Settings > General > dlpPeriodMonths |

---

## 5. Entity Model

### 5.1 Core Entities

```
RealEstateProject (the gravity well)
  ├── ProjectPhase (1:N)
  │     └── budget, startDate, endDate, completionPercent
  │
  ├── ProjectBuilding (1:N)
  │     └── ProjectFloor (1:N)
  │           └── PropertyUnit (1:N) → Sales module
  │
  ├── ProjectWBS (tree, self-referencing)
  │     └── ProjectBOQLine (1:N) → BOQ module
  │
  ├── ProjectBudget (1:1)
  │     └── BudgetLine (1:N) → generated from BOQ
  │
  ├── ProjectStageTransition (1:N) — audit trail
  │
  ├── → Land (1:1, back-reference to source land)
  ├── → EvaluationStudy (1:1, feasibility baseline)
  ├── → Contract[] → Contractor module
  ├── → MaterialRequisition[] → Site Operations module
  ├── → DailySiteReport[] → Site Operations module
  ├── → UnitBooking[] → Sales module
  └── → JournalLine[] (via projectId dimension) → GL
```

### 5.2 Key Fields with Data Source

| Entity.Field | Type | Source |
|---|---|---|
| RealEstateProject.projectCode | String | Auto-generated. Config: Settings > Numbering |
| RealEstateProject.name | String | User input at conversion. Suggested from Land.name |
| RealEstateProject.location | String | Carried from Land.location |
| RealEstateProject.lifecycleStage | Enum | Computed from stage transitions. Not user-editable |
| RealEstateProject.totalBudget | Decimal | Sum of ProjectPhase[].budget. Validated against feasibility |
| RealEstateProject.currencyCode | String | Config: Settings > General > defaultCurrency |
| RealEstateProject.responsibilityCenterId | FK | Master: Core > Responsibility Centers |
| RealEstateProject.defaultCostCenterId | FK | Master: Core > Responsibility Centers (type=COST) |
| RealEstateProject.defaultProfitCenterId | FK | Master: Core > Responsibility Centers (type=PROFIT) |
| RealEstateProject.feasibilityBaselineId | FK | Carried from ManagementReport (locked version) |
| RealEstateProject.landId | FK | Carried from Land (back-reference) |
| ProjectPhase.name | String | User input. Common: Foundation, Structure, MEP, Finishing, External, Handover |
| ProjectPhase.budget | Decimal | User input. Validated: sum must ≤ totalBudget |
| ProjectPhase.startDate / endDate | DateTime | User input |
| ProjectPhase.completionPercent | Int | Computed from: DSR work logs OR manual engineer input |
| PropertyUnit.basePrice | Decimal | User input. Reference: feasibility selling price |
| PropertyUnit.floorPremium | Decimal | User input. Config: Settings > General (if default exists) |
| PropertyUnit.status | Enum | System-managed: AVAILABLE → RESERVED → BOOKED → SOLD → HANDED_OVER |
| ProjectStageTransition.fromStage / toStage | Enum | System-managed |
| ProjectStageTransition.transitionedById | FK | Current user (must have permission) |
| ProjectStageTransition.gateCheckResults | JSON | Computed: which gates passed, which overridden |

---

## 6. Business Rules

### Project Creation
- A project can only be created from a Land workspace where ManagementDecision.decision = APPROVE or CONDITIONS.
- Project code is auto-generated per Settings > Numbering format. Cannot be edited after creation.
- Currency inherits from org default. Cannot be changed after first financial posting.

### Phase Management
- Phase budgets must sum to ≤ Project total budget (soft warning at 95%, hard block at 100%).
- Phase dates can overlap (Structure can start before Foundation ends).
- Phase completion % is updated via DSR work logs or manual entry by site engineer.

### Stage Transitions
- Forward-only. No rollback.
- Gate conditions are checked automatically. Some can be overridden by authorized users with documented reason.
- Every transition creates a ProjectStageTransition audit record.

### Budget Control
- Two modes (configurable per org): **Soft** (warning when budget exceeded) or **Hard** (block procurement/bills when budget exceeded).
- Budget = BASELINE BOQ + APPROVED Variations. Not manually editable after BOQ lock.
- Commitment tracking: Budget − (Actual + Committed) = Truly Available.

### Financial Integrity
- No cost posting without projectId + costCodeId dimensions.
- Revenue recognition follows the method configured per project (POC or CC). Cannot change method after first recognition entry.
- WIP must equal zero at project closure. All WIP must be transferred to COGS via revenue recognition before closing.
- Feasibility baseline is compared against actuals at closure — this is the accountability benchmark.

---

## 7. GL Integration

All journal entries are tagged with projectId and relevant dimensions.

| Event | Debit | Credit | Dimensions Required |
|---|---|---|---|
| Material Purchase | Construction WIP | Accounts Payable | Project, WBS, Cost Code, CC |
| Material Issue | Construction WIP | Site Inventory | Project, WBS, Cost Code, CC |
| Contractor Bill | Construction WIP | AP + Retention + TDS | Project, WBS, Cost Code, CC |
| Labour Allocation | Construction WIP | Payroll Payable | Project, Phase, CC |
| Booking Advance | Cash/Bank | Booking Advance (Liability) | Project, Unit, PC |
| Revenue (POC) | Accounts Receivable | Revenue - Unit Sales | Project, Unit, PC |
| COGS Transfer | Cost of Sales | Construction WIP | Project, Unit, PC |
| Retention Release | Retention Payable | Cash/Bank | Project, Contractor |
| Overhead Allocation | Construction WIP | Overhead Recovery | Project, CC, PC |

**Data Source Trace for GL:**

| GL Field | Source |
|---|---|
| Account Code | Master: Chart of Accounts. Mapped via: Masters > Cost Codes > GL Account |
| Project dimension | Current project context |
| WBS dimension | Selected by user on transaction (from ProjectWBS tree) |
| Cost Code dimension | Selected by user (from Masters > Cost Codes) or inherited from BOQ line |
| Cost Center | Project.defaultCostCenterId (overridable per transaction) |
| Profit Center | Project.defaultProfitCenterId |
| Amount | From transaction (PO, Running Bill, Booking, etc.) |
| Retention % | Config: Settings > General > retentionPercent (overridable per contract) |
| TDS % | Config: Settings > General > tdsRate |

---

## 8. Configuration Dependencies

| Config / Master | How Project Module Uses It |
|---|---|
| Settings > General > defaultCurrency | Project currency |
| Settings > General > retentionPercent | Default retention on contracts & running bills |
| Settings > General > tdsRate | TDS deduction on contractor payments |
| Settings > General > dlpPeriodMonths | Defect liability duration after handover |
| Settings > General > contingencyPercent | Budget tolerance for procurement commitment |
| Settings > General > revenueMethod | POC or CC revenue recognition |
| Settings > Numbering > Project | Project code format (RE-{SEQ:5}) |
| Settings > Lifecycle | Stage definitions, transitions, gate conditions |
| Settings > Approval Workflows | BOQ approval, VO approval, Running Bill approval |
| Settings > Dimension Rules | Required dimensions per transaction type |
| Masters > Cost Codes | Cost classification on BOQ, procurement, bills |
| Masters > BOQ Items | Reusable work items for BOQ entry |
| Masters > Rate Templates | Rate analysis components |
| Core > Chart of Accounts | GL accounts for all postings |
| Core > Responsibility Centers | CC, PC, RC for project |
| Core > Departments | Team assignment, approval routing |
| Land > EvaluationStudy | Feasibility baseline (carried forward) |
| Land > Acquisition | Land cost, JV terms (carried forward) |

---

## 9. Reports Fed by This Module

| # | Report | Source Entity | Key Metrics |
|---|---|---|---|
| 54 | Project P&L | JournalLine by projectId | Revenue, COGS, Gross Profit, Overhead, Net Profit |
| 55 | Project Balance Sheet | JournalLine by projectId | WIP, AR, AP, Retention, Advances |
| 56 | Project Cash Flow | JournalLine by projectId | Operating, Investing, Financing |
| 57 | BOQ Variance | ProjectBOQLine vs Actuals | Planned vs Actual qty + rate + amount |
| 58 | Commitment Report | PO + WO + Contract | Budget − Actual − Committed = Available |
| 59 | EAC | Actual + Committed + ETC | Estimate at Completion, CPI, SPI |
| 69 | Feasibility vs Actual | ManagementReport.snapshot vs GL Actuals | Line-by-line variance |
| 70 | Profit Erosion | Feasibility.profit vs Actual.profit | Factor-by-factor waterfall |

---

## 10. What's Built in Prototype

| Screen | Route | Status |
|---|---|---|
| Project List | `/real-estate/projects` | DONE |
| Project Detail | `/real-estate/projects/[id]` | DONE |
| Create Project (standalone) | `/real-estate/projects/new` | DONE |
| Create Project (from Land) | Inside Land Acquisition tab | NOT BUILT |
| Project Conversion Wizard | `/real-estate/opportunity/convert` | DONE (old flow — needs alignment with new Land workspace) |
| WBS Builder | `/real-estate/wbs` | DONE |
| Budget vs Actual | `/real-estate/budget` | DONE |
| Project Closure | `/real-estate/closure` | DONE |

---

## 11. Screens Not Yet Built

| Screen | What It Would Show | Priority |
|---|---|---|
| Project Creation from Land | Conversion form with carry-forward checklist | P1 — completes the Land → Project flow |
| Building/Floor/Unit Structure Builder | Visual builder for tower → floor → unit hierarchy | P2 — needed before Sales |
| Phase Budget Allocation | Phase-by-phase budget with validation against feasibility | P2 |
| Stage Transition UI | Gate check results, transition confirmation, audit log | P3 |

---

_The Project is where planning meets reality. Every rupee promised in the feasibility must be earned or explained in the actuals. The Project Master makes this accountability chain unbreakable._
