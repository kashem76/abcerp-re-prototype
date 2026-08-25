# BOQ & Estimation — Complete Specification

**Module:** Bill of Quantities, Work Breakdown Structure, Measurement, Rate Analysis, Budget Generation
**Code Reference:** `11-boq-estimation.md` + `12-rate-analysis-costing.md`
**Prototype Screens:** WBS Builder, BOQ List, BOQ Entry, Measurement Sheet, Rate Analysis, BOQ Approval, Cost Code Master, BOQ Item Master, Rate Templates

---

## 1. Overview & Core Principle

The **Bill of Quantities (BOQ)** is the cost-planning engine. It transforms an approved budget into an item-level, quantified, and priced cost breakdown — organized by Work Breakdown Structure (WBS), Cost Code, and construction phase. Without a BOQ, cost control is guesswork. With a locked BOQ, every taka spent can be measured against a deliberate estimate.

The BOQ sits at the junction of planning and execution — it is both the budget and the control instrument:

```
WBS (structure — what work)           ← Per-project. Source: PM builds it
    │
    ▼
Cost Code (classification — what type)  ← Org-level. Source: Masters > Cost Codes
    │
    ▼
BOQ Line (item × quantity × rate)      ← Per-project. Source: Estimator creates
    │
    ├──► Measurement Sheet              ← Per-line. Source: L×W×H×Nos formula
    │      Config: Masters > Measurement Formulas
    │
    ├──► Rate Analysis                  ← Per-line. Source: Masters > Rate Templates
    │      Materials from: Core > Item Master
    │      Rates from: Cost Intelligence Engine (latest PO, avg, historical)
    │
    ├──► Budget Line                    ← Auto-generated when BOQ approved
    │      Feeds: Budget module for variance tracking
    │
    ├──► Purchase Requisition           ← During execution. boqLineId on MR
    │      Checks: Budget − (Committed + Actual) ≥ requested
    │
    ├──► Contractor Running Bill        ← During execution. boqLineId on RA bill
    │
    └──► Actual Cost Report             ← GL actuals tagged by costCodeId + boqLineId
```

> **Non-Negotiable Core Principle:**
> _The BOQ, once approved and locked as BASELINE, is immutable. All changes must flow through the Variation Order process (doc 15) — never by editing the original BOQ. The formula is: BASELINE + APPROVED VARIATIONS = CURRENT APPROVED BUDGET. No procurement, no contractor bill, and no material issue may be processed without a reference to a BOQ line._

---

## 2. What This Module Delivers

### Master Data (Org-Level — Setup Once, Used Everywhere)
- **Cost Code Categories** — 6 groups: Foundation, Structure, MEP, Finishing, External, General
- **Cost Codes** — 23 codes with GL account mapping. The universal connector between BOQ, procurement, contractor, and GL
- **BOQ Item Master** — reusable work items (RCC Column, Plastering, Tiling) with default UOM and linked materials
- **Rate Analysis Templates** — component breakdowns: Material + Labour + Equipment + Overhead per unit of work
- **Measurement Formulas** — reusable calculation patterns: L×W, L×W×H, L×W×H×Nos, πr²×H

### Per-Project (Created Each Project)
- **WBS Builder** — hierarchical tree: Project → Tower/Block → Trade/Discipline → Activity
- **Project BOQ** — section-by-section cost plan with full quantity + rate capture
- **Measurement Sheets** — site dimension calculations per BOQ line
- **BOQ Versioning** — V1 locked as BASELINE; Variation Orders create incremental versions
- **BOQ → Budget** — approved BOQ auto-generates BudgetLine entries

### Cost Intelligence (Continuous)
- **Rate snapshots** from actual transactions: latest PO, weighted average, RFQ average, historical project average
- **Variance alerts** when actual exceeds estimate by configurable threshold
- **EAC forecasting** — Actual + Committed + Estimated-to-Complete = Estimate at Completion

---

## 3. Master Data — The Foundation Everything Depends On

### 3.1 Cost Code Categories

**Source:** Masters > Cost Codes (org-level)
**Seeded by:** Industry Pack activation (Layer 2 config)
**Used by:** BOQ entry, procurement classification, running bill posting, budget reports

| Category | Code Prefix | What It Covers | GL Account Range |
|---|---|---|---|
| Foundation | FND- | Earthwork, RCC foundation, pile work | 5010-xx |
| Structure | STR- | RCC structural, brickwork, rebar | 5020-xx |
| MEP | MEP- | Electrical, plumbing, HVAC, fire | 5030-xx |
| Finishing | FIN- | Plastering, tiling, painting, doors/windows | 5040-xx |
| External | EXT- | Landscaping, internal roads, boundary | 5050-xx |
| General | GEN- | Site establishment, project overhead | 5060-xx |

**Data Source Trace:**

| Field | Source |
|---|---|
| Category name | Industry Pack seed (editable by admin) |
| Code prefix | Industry Pack seed (editable) |
| GL Account range | Mapped in Cost Code. Source: Core > Chart of Accounts |
| Sort order | Admin configurable |

### 3.2 Cost Codes (23 Seeded)

**Source:** Masters > Cost Codes (org-level)
**Each cost code connects:** BOQ line → Procurement → Contractor bill → GL account

| Code | Name | Category | GL Account | Source |
|---|---|---|---|---|
| FND-EARTH | Earthwork | Foundation | 5010-01 | Seed (editable) |
| FND-RCC | RCC Foundation | Foundation | 5010-02 | Seed |
| FND-PILE | Pile Work | Foundation | 5010-03 | Seed |
| STR-RCC | RCC Structural | Structure | 5020-01 | Seed |
| STR-BRICK | Brickwork | Structure | 5020-02 | Seed |
| STR-REBAR | Reinforcement Steel | Structure | 5020-03 | Seed |
| MEP-ELECT | Electrical | MEP | 5030-01 | Seed |
| MEP-PLUMB | Plumbing | MEP | 5030-02 | Seed |
| MEP-HVAC | HVAC | MEP | 5030-03 | Seed |
| MEP-FIRE | Fire Fighting | MEP | 5030-04 | Seed |
| FIN-PLSTR | Plastering | Finishing | 5040-01 | Seed |
| FIN-TILE | Tiling | Finishing | 5040-02 | Seed |
| FIN-PAINT | Painting | Finishing | 5040-03 | Seed |
| FIN-DOOR | Doors & Windows | Finishing | 5040-04 | Seed |
| FIN-SANI | Sanitary Fittings | Finishing | 5040-05 | Seed |
| FIN-WOOD | Woodwork / Joinery | Finishing | 5040-06 | Seed |
| EXT-LAND | Landscaping | External | 5050-01 | Seed |
| EXT-ROAD | Internal Roads | External | 5050-02 | Seed |
| EXT-BOUND | Boundary Wall | External | 5050-03 | Seed |
| EXT-PARK | Parking Area | External | 5050-04 | Seed |
| GEN-SITE | Site Establishment | General | 5060-01 | Seed |
| GEN-OVER | Project Overhead | General | 5060-02 | Seed |
| GEN-CONT | Contingency | General | 5060-03 | Seed |

**Why GL mapping matters:** When a contractor running bill is posted for "RCC Column Work" tagged to cost code STR-RCC, the system knows to debit GL account 5020-01 (Construction WIP — Structural). The estimator never picks a GL account — it's derived from the cost code.

### 3.3 BOQ Item Master

**Source:** Masters > BOQ Items (org-level)
**Relationship:** Each BOQ Item → has a default Cost Code → links to GL Account

| Code | Name | Category | Cost Code | UOM | Default Rate | Linked Material |
|---|---|---|---|---|---|---|
| BOQ-001 | Excavation | Earthwork | FND-EARTH | CFT | ৳45 | — |
| BOQ-002 | Pile Work (RCC) | Foundation | FND-PILE | NOS | ৳28,000 | — |
| BOQ-003 | RCC Column (M25) | RCC Work | STR-RCC | CFT | ৳634 | Cement, Sand, Aggregate |
| BOQ-004 | RCC Beam Work | RCC Work | STR-RCC | CFT | ৳610 | Cement, Sand, Aggregate |
| BOQ-005 | Brickwork (5" wall) | Brickwork | STR-BRICK | SFT | ৳85 | Brick |
| BOQ-006 | Internal Plastering | Finishing | FIN-PLSTR | SFT | ৳35 | Cement |
| BOQ-007 | Floor Tiling | Finishing | FIN-TILE | SFT | ৳120 | — |
| BOQ-008 | Electrical Wiring | MEP | MEP-ELECT | UNIT | ৳45,000 | — |

**Data Source Trace:**

| Field | Source |
|---|---|
| Code | Auto-generated. Config: Settings > Numbering (if configured) or sequential |
| Name | Admin input |
| Category | Selected from BOQ Category master (org-level) |
| Cost Code | Selected from Masters > Cost Codes |
| UOM | Admin input. Common: CFT, SFT, NOS, KG, RFT, M3, M2, LS (Lump Sum) |
| Default Rate | Admin input. Reference: Rate Analysis Template or historical data |
| Linked Material | Selected from Core > Item Master. Used in Rate Analysis component |

### 3.4 Rate Analysis Templates

**Source:** Masters > Rate Templates (org-level)
**Purpose:** Break down the unit rate of a work item into its cost components

Example: **RCC Column Work — Rate per CFT**

| Component | Type | Material/Item | Coefficient | Unit | Rate | Amount | Source |
|---|---|---|---|---|---|---|---|
| Cement | Material | Cement OPC 50kg | 0.22 | bag | ৳480 | ৳105.60 | Core > Item Master (latest PO rate) |
| Sand (coarse) | Material | Sand (Sylhet) | 0.42 | CFT | ৳35 | ৳14.70 | Core > Item Master |
| Stone chips | Material | Stone 20mm | 0.85 | CFT | ৳85 | ৳72.25 | Core > Item Master |
| Formwork ply | Material | Shuttering ply | 0.04 | SFT | ৳120 | ৳4.80 | Core > Item Master |
| Mason | Labour | — | 0.08 | day | ৳800 | ৳64.00 | Rate Template (labor rate) |
| Helper | Labour | — | 0.15 | day | ৳500 | ৳75.00 | Rate Template |
| Vibrator | Equipment | — | 0.02 | hr | ৳500 | ৳10.00 | Rate Template |
| Mixer | Equipment | — | 0.01 | hr | ৳800 | ৳8.00 | Rate Template |
| Overhead | Overhead | — | 10% | — | — | ৳35.44 | Config: Rate Template overhead % |
| **Total** | | | | | | **৳389.79** | |

Rounded to ৳390/CFT. Estimator can accept, adjust, or override.

**Data Source Trace:**

| Component Field | Source |
|---|---|
| Material name | Core > Item Master |
| Material rate | Cost Intelligence Engine → latest PO rate, or manual |
| Labour rate | Rate Template (org-level default, updatable) |
| Equipment rate | Rate Template |
| Overhead % | Config in Rate Template (typically 8-12%) |
| Coefficient | Rate Template (e.g., 0.22 bags cement per CFT of RCC) |
| Computed amount | Computed: coefficient × rate |
| Total rate | Computed: SUM(component amounts) |

### 3.5 Measurement Formulas

**Source:** Org-level master (seeded)

| Formula | Expression | Used For |
|---|---|---|
| L × W | `l * w` | Area calculations (flooring, plastering) |
| L × W × H | `l * w * h` | Volume calculations (concrete, earthwork) |
| L × W × H × Nos | `l * w * h * nos` | Multiple items of same dimension |
| π × r² × H | `3.14159 * r * r * h` | Circular columns, pipes |
| Running Feet | `l * nos` | Reinforcement, beams |
| Lump Sum | `1` | Fixed-price items |

---

## 4. Per-Project Workflow — How BOQ Is Actually Built

### 4.1 Build the WBS

**Who:** Project Manager + QS (Quantity Surveyor)
**When:** PLANNING stage, before BOQ entry
**Where:** Project Workspace → Plan → WBS sub-tab

```
Gulshan Residence (RE-00027)                    ← Level 1: Project
├── Tower A                                      ← Level 2: Building
│   ├── Foundation                               ← Level 3: Trade/Discipline
│   │   ├── Pile Work                            ← Level 4: Activity (leaf node)
│   │   ├── Pile Cap                               12 BOQ items
│   │   └── Grade Beam                              6 BOQ items
│   ├── Structure
│   │   ├── Column                                  14 BOQ items
│   │   ├── Beam                                    12 BOQ items
│   │   ├── Slab                                    10 BOQ items
│   │   └── Staircase                                4 BOQ items
│   ├── Masonry
│   ├── Finishing
│   ├── Electrical
│   └── Plumbing
├── Tower B
│   └── (same structure)
└── Common Areas
    ├── Parking
    ├── Lift Lobby
    └── External Works

Total leaf nodes: ~50-80 (each accepts BOQ items)
```

**Rule:** Only Level 4 (leaf) nodes carry BOQ items. The tree is drag-reorderable.

**Data Source Trace:**

| WBS Field | Source |
|---|---|
| Level 1 (Project) | Auto: from RealEstateProject |
| Level 2 (Building) | User input. Reference: ProjectBuilding[] |
| Level 3 (Trade) | User input. Common: Foundation, Structure, Masonry, MEP, Finishing, External |
| Level 4 (Activity) | User input. These are where BOQ lines attach |

### 4.2 Create BOQ Lines

**Who:** QS / Estimator
**When:** BOQ_ESTIMATION stage
**Where:** Project Workspace → BOQ → Line Items sub-tab → [+ Add BOQ Line]

```
┌──────────────────────────────────────────────────────────────────┐
│ ADD BOQ LINE                                                     │
│                                                                  │
│ WBS Node *                                                       │
│ [ Tower A > Structure > Column ▼ ]    ← Source: ProjectWBS tree  │
│                                                                  │
│ Cost Code *                                                      │
│ [ STR-RCC — RCC Structural ▼ ]        ← Source: Masters > Cost   │
│                                         Codes. Derives GL acct   │
│                                                                  │
│ BOQ Item *                                                       │
│ [ RCC Column Work (M25) ▼ ]           ← Source: Masters > BOQ    │
│                                         Items. Pre-fills UOM     │
│                                                                  │
│ Unit of Measurement                                              │
│ [ CFT ]                               ← From BOQ Item default   │
│                                                                  │
│ Quantity                                                         │
│ [ 850 ]  [Open Measurement Sheet →]   ← User input OR computed  │
│                                         from Measurement Sheet   │
│                                                                  │
│ Rate                                                             │
│ [ ৳ 634 ] [Open Rate Analysis →]     ← From BOQ Item default    │
│                                         OR Rate Analysis         │
│                                         OR Cost Intelligence     │
│                                                                  │
│ Amount                                                           │
│ ৳538,900  (auto: qty × rate)          ← Computed                │
│                                                                  │
│ Phase                                                            │
│ [ Structure ▼ ]                       ← Source: ProjectPhase[]   │
│                                                                  │
│ Specification                                                    │
│ [ M25 grade, 60 grade rebar, 40mm cover ]  ← User input         │
│                                                                  │
│                    [Cancel]  [Add to BOQ]                        │
└──────────────────────────────────────────────────────────────────┘
```

**Data Source Trace for Every Field:**

| Field | Source | Config/Master/Computed/Input |
|---|---|---|
| WBS Node | User selects from ProjectWBS tree | Per-project (built in 4.1) |
| Cost Code | User selects | Master: Masters > Cost Codes |
| GL Account | Auto-derived from cost code | Master: Cost Code → glAccountId → Core > CoA |
| BOQ Item | User selects | Master: Masters > BOQ Items |
| UOM | Pre-filled from BOQ Item.uom (editable) | Master: BOQ Item Master |
| Quantity | User enters OR computed from Measurement Sheet | Input or Computed |
| Rate | Pre-filled from BOQ Item.defaultRate (editable) | Master: BOQ Item → default OR Rate Analysis → computed |
| Amount | Auto: quantity × rate | Computed |
| Phase | User selects | Per-project: ProjectPhase[] |
| Specification | User enters | Input |

### 4.3 Measurement Sheet (for Quantity)

**Who:** QS
**When:** During BOQ line entry
**Where:** BOQ Line → [Open Measurement Sheet]

```
MEASUREMENT SHEET

Item: RCC Column Work (M25)
WBS: Tower A > Structure > Column
Formula: L × W × H × Nos                ← Source: Masters > Measurement Formulas

Description              Nos    L(m)    W(m)    H(m)    Qty(CFT)
─────────────────────────────────────────────────────────────────
Ground Floor Columns      16    0.30    0.45    3.50     273.6
1st Floor Columns          16    0.30    0.45    3.20     250.1
2nd Floor Columns          16    0.30    0.45    3.20     250.1
...
Lap/Splice allowance       —     —       —       —        76.2
─────────────────────────────────────────────────────────────────
Total                                                    850.0 CFT

[+ Add Row]                            [Apply to BOQ Line]
```

**Data Source Trace:**

| Field | Source |
|---|---|
| Formula | Selected from Masters > Measurement Formulas |
| Nos, L, W, H | User input (site dimensions from drawings) |
| Computed quantity | Computed: formula applied to dimensions |
| Total | Computed: SUM(row quantities) |

### 4.4 Rate Analysis (for Rate)

**Who:** QS / Cost Engineer
**When:** During BOQ line entry or separately during rate review
**Where:** BOQ Line → [Open Rate Analysis] or Masters > Rate Templates

```
RATE ANALYSIS

Item: RCC Column Work (M25)
Template: Structural Concrete (Standard)    ← Source: Masters > Rate Templates

Component        Type        Item           Coeff    Unit    Rate       Amount
────────────────────────────────────────────────────────────────────────────────
Cement OPC       Material    Cement 50kg    0.22     bag     ৳480      ৳105.60
Sand (coarse)    Material    Sand Sylhet    0.42     CFT     ৳35       ৳14.70
Stone chips      Material    Stone 20mm     0.85     CFT     ৳85       ৳72.25
Shuttering ply   Material    Ply 18mm       0.04     SFT     ৳120      ৳4.80
Mason            Labour      —              0.08     day     ৳800      ৳64.00
Helper           Labour      —              0.15     day     ৳500      ৳75.00
Vibrator         Equipment   —              0.02     hr      ৳500      ৳10.00
Mixer            Equipment   —              0.01     hr      ৳800      ৳8.00
Overhead         Overhead    —              10%      —       —         ৳35.44
────────────────────────────────────────────────────────────────────────────────
Rate per CFT                                                          ৳389.79

ⓘ Latest PO rate for Cement: ৳472/bag (ABC Cement, 3 Aug 2026)
ⓘ Company avg across 4 projects: ৳395/CFT

[Apply Rate to BOQ Line]
```

**Data Source Trace:**

| Field | Source |
|---|---|
| Template | Selected from Masters > Rate Templates |
| Material name/item | From template → links to Core > Item Master |
| Coefficient | From template (e.g., 0.22 bags cement per CFT) |
| Material rate | From Cost Intelligence: latest PO, avg PO, or manual. Source: Core > Item Master > latest cost |
| Labour rate | From template (org-level default rates) |
| Equipment rate | From template |
| Overhead % | Config within template (typically 8-12%) |
| Component amount | Computed: coefficient × rate |
| Total rate | Computed: SUM(component amounts) |
| PO rate hint | From Cost Intelligence Engine: latest PurchaseOrder for this item |
| Company avg hint | From Cost Intelligence: weighted avg across projects |

### 4.5 BOQ Approval & Lock

**Who:** Estimator → QS Manager → Project Director → CFO (if above threshold)
**When:** BOQ complete, ready for lock
**Where:** Project Workspace → BOQ → Approval Log sub-tab

```
BOQ APPROVAL

Version: V1 (Baseline)
Status: SUBMITTED → REVIEWED → ● PENDING APPROVAL

Submitted by          Eng. Karim        12 Aug 2026
Reviewed by           QS Manager        14 Aug 2026   ✓
Approved by           Project Director  — pending

Reviewer Comments:
"Structure quantities verified against structural drawings.
 Recommend 3% reduction on formwork estimate."

Approval threshold check:
  BOQ Total: ৳806M
  Threshold for CFO approval: ৳500M       ← Config: Settings > Approval Workflows
  Result: CFO approval required ⚠

[View Change Log]

[Return for Revision]    [Approve & Lock Baseline →]
```

**On Lock:**
1. BOQ status → BASELINE_LOCKED
2. BOQ version = V1 (immutable — ADR-006)
3. System auto-generates BudgetLine records in Budget module
4. Variance tracking activated
5. Procurement can now reference boqLineId

**Data Source Trace:**

| Field | Source |
|---|---|
| Approval workflow steps | Config: Settings > Approval Workflows > BOQ |
| CFO threshold | Config: Settings > Approval Workflows > conditional rules |
| SLA per step | Config: Settings > Approval Workflows > SLA hours |

---

## 5. Business Rules

### Master Data
- Cost codes must have a GL account mapping before they can be used in BOQ lines. Source: Master > Cost Codes > glAccountId.
- BOQ Items must have a valid cost code assignment. The cost code determines GL posting.
- Rate Analysis Templates can reference items from Core > Item Master. Material rates update when PO prices change (manual refresh or scheduled).
- Measurement Formulas are immutable once used in a measurement sheet (versioned if changed).

### BOQ Entry
- Every BOQ line requires: WBS node (leaf only), Cost Code, BOQ Item, Quantity, Rate, Phase.
- Quantity can be manual or computed from Measurement Sheet. If computed, the sheet is linked and auditable.
- Rate can be: BOQ Item default, Rate Analysis computed, Cost Intelligence suggested, or manual entry. Manual rates are flagged "unverified."
- Amount = Quantity × Rate. Always computed, never manually entered.

### BOQ Approval & Versioning
- BOQ must be approved through the configured approval workflow before locking.
- Locked BOQ (V1) is the BASELINE. Immutable. ADR-006.
- All subsequent changes flow through Variation Orders (doc 15), which create V2, V3, etc.
- **Current Approved Budget = BASELINE + SUM(Approved Variation Deltas)**
- Budget lines auto-generated from BOQ. No separate budget entry needed.

### Budget Control During Execution
- Every procurement (MR, PO) checks: Budget − (Actual + Committed) ≥ Requested Amount.
- Two modes: **Soft** (warning) or **Hard** (block). Config: per-project or org-level.
- Variance threshold alerts when actual exceeds BOQ estimate. Config: Settings > General > varianceAlertPercent (default 10%).
- Commitment = PO value + Work Order value (not yet invoiced).

---

## 6. GL Integration

BOQ itself has **no GL postings** — it is a planning instrument. But it controls what GL postings are allowed during execution:

| Execution Event | How BOQ Controls It | GL Entry |
|---|---|---|
| Material Purchase (PO → GRN → Invoice) | PO line carries boqLineId. Budget check against BOQ amount. | DR WIP (GL from Cost Code) / CR AP |
| Material Requisition → Issue | MR carries boqLineId. Checks BOQ remaining quantity. | DR WIP (GL from Cost Code) / CR Inventory |
| Contractor Running Bill | Bill line carries boqLineId. Certified qty ≤ BOQ qty. | DR WIP (GL from Cost Code) / CR AP − Retention − TDS |
| Variation Order | Creates BOQ delta (new lines or qty/rate changes). | No GL (planning). Budget adjusted. |
| Budget vs Actual Report | Compares BudgetLine (from BOQ) vs JournalLine actuals. | Read-only (reporting) |

**GL Account derivation chain:**
```
BOQ Line → costCodeId → CostCode.glAccountId → Account.code → GL posting
```
The estimator never picks a GL account. The cost code mapping handles it.

---

## 7. Configuration Dependencies

| Config / Master | How BOQ Uses It | Where Set |
|---|---|---|
| **Cost Code Categories** | Grouping for BOQ summary view and budget reports | Masters > Cost Codes |
| **Cost Codes** | Classification on every BOQ line. Derives GL account. | Masters > Cost Codes |
| **GL Account mapping** | Each cost code maps to a GL account for WIP posting | Masters > Cost Codes > glAccountId → Core > CoA |
| **BOQ Item Master** | Reusable work items. Pre-fills UOM, default rate, cost code. | Masters > BOQ Items |
| **Rate Analysis Templates** | Component breakdown for rate computation | Masters > Rate Templates |
| **Measurement Formulas** | Quantity computation from site dimensions | Masters (org-level, seeded) |
| **Approval Workflows** | BOQ approval step chain and thresholds | Settings > Approval Workflows > BOQ |
| **Numbering** | BOQ line numbering format | Settings > Numbering |
| **Budget Control Mode** | Soft warning vs hard block on over-budget procurement | Settings > General or per-project |
| **Variance Alert %** | Threshold for cost overrun alerts | Settings > General > varianceAlertPercent |
| **Item Master** | Material items referenced in Rate Analysis | Core > Item Master |
| **WBS** | Work breakdown structure — where BOQ lines attach | Per-project (PM builds) |
| **Project Phases** | Phase assignment on BOQ lines for phase-wise budget | Per-project |

---

## 8. Screen-to-Entity Mapping

### Master Data Screens

| Screen | Route | Reads | Writes |
|---|---|---|---|
| Cost Code Master | `masters/cost-codes` | CostCodeCategory[], CostCode[] | CostCodeCategory, CostCode |
| BOQ Item Master | `masters/boq-items` | BOQCategory[], BOQItemMaster[], CostCode[] | BOQCategory, BOQItemMaster |
| Rate Templates | `masters/rate-templates` | RateAnalysisTemplate[], Item[] | RateAnalysisTemplate, RateComponent[] |

### Per-Project Screens

| Screen | Route | Reads | Writes |
|---|---|---|---|
| WBS Builder | `wbs` | ProjectWBS[] (tree) | ProjectWBS (add/reorder/delete nodes) |
| BOQ List | `boq` | ProjectBOQ, ProjectBOQLine[], BudgetLine[] | — (read-only variance view) |
| BOQ Entry | `boq/new` | ProjectWBS[], CostCode[], BOQItemMaster[], ProjectPhase[] | ProjectBOQLine |
| Measurement Sheet | `boq/measurement` | MeasurementFormula[], ProjectBOQLine | MeasurementSheet, MeasurementRow[] |
| Rate Analysis | `boq/rate-analysis` | RateAnalysisTemplate[], Item[] (rates) | RateAnalysisInstance (per BOQ line) |
| BOQ Approval | `boq/approve` | ProjectBOQ, ApprovalWorkflow, ApprovalStep[] | BOQApproval (status change), BudgetLine[] (auto-gen on lock) |

---

## 9. Reports Fed by This Module

| # | Report | Source | Key Metrics |
|---|---|---|---|
| 57 | BOQ Variance | ProjectBOQLine vs JournalLine actuals | Planned vs Actual qty + rate + amount, variance % |
| 58 | Commitment | PO + WO amounts vs BudgetLine | Budget − Actual − Committed = Available |
| 59 | EAC | Actual + Committed + ETC | Estimate at Completion, CPI, SPI |
| 67 | Material Consumption vs BOQ | MaterialIssue vs ProjectBOQLine | BOQ qty vs purchased vs consumed vs wasted |
| 71 | Cost Intelligence | RateSnapshot[] | Item rates: standard, PO, market, actual, trend |

---

## 10. What's Built in Prototype

| Screen | Route | Status |
|---|---|---|
| Cost Code Master | `masters/cost-codes` | DONE — 18 codes, 6 categories |
| BOQ Item Master | `masters/boq-items` | DONE — 8 items with cost code links |
| Rate Templates | `masters/rate-templates` | DONE — 8 templates with component counts |
| WBS Builder | `wbs` | DONE — expandable tree, 4 levels, leaf BOQ counts |
| BOQ List (Variance) | `boq` | DONE — items with BOQ vs actual variance |
| BOQ Entry | `boq/new` | DONE — WBS + cost code + qty + rate = amount |
| Measurement Sheet | `boq/measurement` | DONE — L×W×H×Nos with live calculation |
| Rate Analysis | `boq/rate-analysis` | DONE — Material/labour/equipment/overhead breakdown |
| BOQ Approval | `boq/approve` | DONE — Approval pipeline, comments, approve/reject |

**All 9 screens are DONE.** Master data + per-project BOQ workflow is fully prototyped.

---

## 11. The Progressive Refinement Chain

The same cost categories track through the entire project lifecycle, getting more precise at each stage:

```
STAGE              PRECISION        SOURCE                    COMPARISON BASIS
─────────────────────────────────────────────────────────────────────────────────
Land Feasibility   ৳/sqft rough     Evaluation Engine         None (first estimate)
                   estimate         Config: Land Eval > Cost
                                    Categories

BOQ Estimation     Item-level       Masters: Cost Codes,      Feasibility estimate
                   qty × rate       BOQ Items, Rate Templates

Procurement        PO prices        Core: Item Master,        BOQ rate
                                    Supplier quotes

Execution          Actual cost      GL postings tagged to      BOQ + Approved
                                    projectId + costCodeId     Variations

Closure            Final cost       GL actuals                 Feasibility baseline
```

This chain — **Feasibility Estimate → BOQ → Procurement → Actual → Closure** — is what makes the "Feasibility vs Actual" report (Report #69) possible. It's the accountability loop.

---

_The BOQ is not a form to fill. It is the financial blueprint for the entire project. Get it wrong and every downstream number — budget, commitment, variance, profit — is wrong._
