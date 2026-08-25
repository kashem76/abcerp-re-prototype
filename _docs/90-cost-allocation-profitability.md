# Cost Allocation & Profitability — Complete Specification

**Module:** Overhead Allocation, Unit Cost Allocation, Project/Unit Profitability, Feasibility vs Actual
**Code Reference:** `90-cost-allocation-profitability.md`
**Prototype Screens:** Budget vs Actual, Feasibility vs Actual, Unit Profitability, Overhead Allocation, Profit Erosion

---

## 1. Overview & Core Principle

This module answers three questions every developer must answer with precision:
1. **What did this project really cost?** (Including allocated overheads, not just direct costs)
2. **What did each unit cost?** (For per-unit profitability and pricing decisions)
3. **Did we deliver what the feasibility promised?** (Accountability at closure)

Three interconnected systems:

| System | Level | GL Impact | Audience |
|---|---|---|---|
| **Overhead Allocation** | Organization → Project | Real GL postings | CFO, Finance |
| **Unit Cost Allocation** | Project → Unit | Reporting only (no GL) | PM, Sales Head |
| **Profitability Analysis** | Project + Unit | Reads GL | CEO, CFO, PM |

> **Non-Negotiable Core Principle:**
> _Overhead allocation produces posted GL journal entries — not report-only calculations. Unit cost allocation is a management reporting layer: costs remain at project level in GL. No profitability number is valid unless it traces back to a posted GL entry._

---

## 2. Real-World Workflow

### What the CFO Actually Needs

**Monthly (Overhead Allocation):**
1. Corporate costs that can't be tagged to a single project are pooled: head office rent, senior management salaries, insurance, corporate marketing.
2. These are allocated to active projects using a driver: sellable area ratio, direct cost ratio, or revenue ratio.
3. System previews allocation → CFO approves → GL entries posted.
4. Each project's WIP/overhead account now carries its fair share of corporate cost.

**Quarterly (Profitability Review):**
5. Generate project profitability snapshot: revenue recognized vs total cost (direct + allocated).
6. Compare against feasibility baseline: where are we ahead, where behind?
7. Flag projects where margin is eroding — drill into what cost category is over.
8. Generate unit-level cost allocation: distribute total project cost across units by area.

**At Closure (Accountability):**
9. Lock final costs. All WIP transferred to COGS.
10. Generate Feasibility vs Actual comparison — line by line.
11. Management reviews and signs off.
12. Lessons learned captured for future feasibilities.

---

## 3. Overhead Allocation Engine

### Setup (One-Time)

| Config Item | Source | Example |
|---|---|---|
| Allocation Driver | Settings > Cost Allocation > Drivers | Sellable Area Ratio, Direct Cost Ratio, Revenue Ratio, Custom Weights |
| Allocation Rule | Settings > Cost Allocation > Rules | Source: GL 6100 (Head Office Rent) → Driver: Sellable Area → Targets: all active projects |
| Frequency | Settings > Cost Allocation > Rules | Monthly / Quarterly |
| Target Projects | Per rule | User selects active projects that participate |

### Allocation Run

```
OVERHEAD ALLOCATION — January 2027

Source Account: 6100 — Head Office Rent
Pool Amount: ৳800,000
Driver: Sellable Area Ratio

Project              Sellable SFT    Ratio     Allocated    GL Account (DR)
─────────────────────────────────────────────────────────────────────────────
Gulshan Residence    151,400         42.3%     ৳338,400     5060-02 (Project Overhead)
Uttara Heights       120,000         33.5%     ৳268,000     5060-02
Banani Tower          86,600         24.2%     ৳193,600     5060-02
─────────────────────────────────────────────────────────────────────────────
Total                358,000        100.0%     ৳800,000

GL Entry:
DR  5060-02 Project Overhead — Gulshan (WIP)     ৳338,400
DR  5060-02 Project Overhead — Uttara (WIP)      ৳268,000
DR  5060-02 Project Overhead — Banani (WIP)      ৳193,600
  CR  6100 Head Office Rent (Corporate P&L)        ৳800,000

Dimensions per line: projectId, costCenterId, profitCenterId
```

**Data Source Trace:**

| Value | Source |
|---|---|
| Pool Amount (৳800,000) | GL balance: Account 6100 for the period |
| Sellable SFT per project | From PropertyUnit[].area WHERE status != CANCELLED |
| Ratio | Computed: project SFT / total SFT |
| Allocated Amount | Computed: pool × ratio |
| Target GL Account | Config: Allocation Rule → target account (5060-02) |

### Allocation Reversal

If an allocation error is found, the reversal creates a **new reverse entry** — never deletes the original.

```
DR  6100 Head Office Rent (Corporate)     ৳338,400
  CR  5060-02 Gulshan Overhead (WIP)        ৳338,400

Reference: Reversal of Allocation Run ALR-2027-01-001
```

---

## 4. Unit Cost Allocation

### How It Works

Total project cost is distributed to individual units for profitability analysis. This is a **reporting calculation** — costs stay at project level in GL.

```
UNIT COST ALLOCATION — Gulshan Residence

Allocation Basis: Sellable Area (default)         ← Config: per-project

Total Project Cost Breakdown:
  Land Cost           ৳450M      Source: Acquisition.totalCost
  Construction        ৳738M      Source: GL actuals (WIP accounts by project)
  Marketing           ৳48M       Source: GL actuals
  Finance Cost        ৳92M       Source: GL actuals
  Overhead Allocated  ৳43M       Source: GL actuals (from allocation engine)
  ─────────────────────────
  Total               ৳1,371M

Unit Allocation:
  Total Sellable Area: 151,400 sqft
  Cost per SFT: ৳9,057

Unit        Area      Allocated Cost    Sale Price    Gross Profit    Margin
──────────────────────────────────────────────────────────────────────────────
Unit 1A     1,450     ৳13.13M           ৳17.40M       ৳4.27M         24.5%
Unit 1B     1,200     ৳10.87M           ৳14.40M       ৳3.53M         24.5%
Unit 2A     1,450     ৳13.13M           ৳17.98M       ৳4.85M         27.0%  ← floor premium
...
Penthouse   2,200     ৳19.93M           ৳33.00M       ৳13.07M        39.6%

Average margin: 26.1%
```

**Data Source Trace:**

| Value | Source |
|---|---|
| Land Cost | From Acquisition (carried to project at conversion) |
| Construction Cost | GL actuals: SUM(JournalLine.debit) WHERE account IN WIP accounts AND projectId = this project |
| Marketing / Finance | GL actuals by project dimension |
| Overhead Allocated | GL actuals from overhead allocation entries |
| Unit Area | From PropertyUnit.area |
| Sale Price | From UnitBooking.finalPrice (if sold) or PropertyUnit.computedPrice (if available) |
| Cost per SFT | Computed: Total Cost / Total Sellable Area |
| Allocated Cost per unit | Computed: Cost per SFT × Unit Area |
| Gross Profit | Computed: Sale Price − Allocated Cost |
| Margin | Computed: Profit / Sale Price |

### Allocation Basis Options

| Basis | Formula | When to Use | Config Source |
|---|---|---|---|
| Sellable Area | unit.area / totalArea × totalCost | Default. Fair for similar unit types | Per-project setting |
| Gross Area | unit.grossArea / totalGross × totalCost | When common areas vary significantly | Per-project setting |
| Equal | totalCost / unitCount | Simple, for identical units | Per-project setting |
| Floor Weighted | area × floorWeight / totalWeightedArea × totalCost | When higher floors cost more (foundation load) | Per-project + floor weights |
| Custom | manualWeight / totalWeights × totalCost | Special situations | Per-project per-unit weights |

---

## 5. Feasibility vs Actual — The Accountability Report

Generated at project closure. Compares every feasibility line against actual result.

```
FEASIBILITY vs ACTUAL — Gulshan Residence

                        Feasibility    Actual       Variance    %       Source
                        (Baseline)     (GL)
──────────────────────────────────────────────────────────────────────────────
REVENUE
  Unit Sales            ৳1,820M        ৳1,856M      +৳36M      +2.0%   GL: Revenue accounts
  Other Income          —              ৳12M         +৳12M      —       GL: Other Income

TOTAL REVENUE           ৳1,820M        ৳1,868M      +৳48M      +2.6%

COSTS
  Land Acquisition      ৳450M          ৳450M         ৳0         0.0%   GL: Land Asset
  Construction          ৳716M          ৳738M        +৳22M      +3.1%   GL: WIP → COGS
  Marketing & Sales     ৳56M           ৳48M         −৳8M       −14.3%  GL: Marketing expense
  Finance Cost          ৳84M           ৳92M         +৳8M       +9.5%   GL: Finance cost
  Overhead              ৳42M           ৳43M         +৳1M       +2.4%   GL: Allocated overhead
  Contingency           ৳40M           ৳27M         −৳13M      −32.5%  GL: Used from contingency
──────────────────────────────────────────────────────────────────────────────
TOTAL COST              ৳1,348M        ৳1,371M      +৳23M      +1.7%

NET PROFIT              ৳472M          ৳497M        +৳25M      +5.3%
MARGIN                  25.9%          26.6%        +0.7pp
IRR                     22.4%          23.1%        +0.7pp
DURATION (months)       36             38           +2

Feasibility column source: ManagementReport.snapshot (locked at approval date)
Actual column source: GL actuals aggregated by projectId
```

### Profit Erosion Waterfall

Explains factor-by-factor where profit changed from feasibility to actual:

```
Feasibility baseline profit              ৳472M
──────────────────────────────────────────────
+ Revenue increase (pricing)             +৳36M     More units sold at higher floors
+ Other income                           +৳12M     Parking premium, forfeiture income
− Construction cost overrun              −৳22M     Foundation cost (+৳18M), Structure (+৳4M)
− Finance cost increase                  −৳8M      Delayed collections → higher interest
+ Marketing under-spend                  +৳8M      Digital strategy reduced print budget
− Overhead increase                      −৳1M      Head office rent increased
+ Contingency saved                      +৳13M     Only ৳27M of ৳40M used
──────────────────────────────────────────────
Actual profit                            ৳497M     (+৳25M vs feasibility)
```

---

## 6. JV Profitability — Honest Cost (ADR-005)

For JV projects, the developer's P&L shows **100% of construction cost**, not a proportional share:

```
JV PROJECT P&L — Honest View

Revenue (developer's 14 units)           ৳756M      14 units × avg ৳54M
Cost (ALL 20 units built)                ৳520M      Developer paid 100% construction
Land cost (implicit — 6 units to owner)  ৳222M      6 units × avg ৳37M allocated cost
──────────────────────────────────────────────────
Developer's Profit                       ৳236M
Developer's Margin                       31.2%

NOTE: The 6 units given to the landowner ARE the land cost — paid in kind.
Showing only 14/20 proportional cost would inflate margin to 45.3% — misleading.
```

---

## 7. Configuration Dependencies

| Config / Master | How Allocation/Profitability Uses It |
|---|---|
| Settings > Cost Allocation > Drivers | Allocation driver types (Area, Cost Ratio, Revenue, Custom) |
| Settings > Cost Allocation > Rules | Source GL account, driver, frequency, target projects |
| Per-project: Allocation Basis | Unit cost allocation method (Sellable Area default) |
| Core > Chart of Accounts | Source and target GL accounts for allocation entries |
| Core > Responsibility Centers | Project CC/PC for dimension tagging |
| Project > PropertyUnit[] | Unit areas for allocation computation |
| Project > Feasibility Baseline | ManagementReport.snapshot for vs-actual comparison |

---

## 8. Reports Fed by This Module

| # | Report | Source | Key Metrics |
|---|---|---|---|
| 49 | Budget vs Actual | BudgetLine vs GL | Budget, Actual, Committed, Available, Variance |
| 64 | Unit Profitability | UnitCostSnapshot vs UnitBooking | Per-unit cost, revenue, margin |
| 68 | Overhead Allocation | AllocationRun[] | Pool, driver, allocated per project |
| 69 | Feasibility vs Actual | ManagementReport.snapshot vs GL | Line-by-line variance |
| 70 | Profit Erosion | Feasibility profit vs Actual | Factor-by-factor waterfall |
| 65 | WIP Movement | GL WIP accounts | Opening + Additions − Transfers = Closing |

---

## 9. What's Built in Prototype

| Screen | Route | Status |
|---|---|---|
| Budget vs Actual | `budget` | DONE — waterfall, EAC, commitment |
| Feasibility vs Actual | `reports/feasibility-vs-actual` | DONE — line-by-line comparison |
| Unit Profitability | `reports/unit-profitability` | DONE — per-unit margin |
| Overhead Allocation | `reports/overhead-allocation` | DONE — driver, source, allocation |
| Profit Erosion | `reports/profit-erosion` | DONE — waterfall factors |

---

_Profitability is not a number — it's an accountability chain. From feasibility promise to actual delivery, every variance must be explained. That's what separates an ERP from a spreadsheet._
