# Site Operations & Construction Management — Complete Specification

**Module:** Daily Site Report, Material Management, Quality, Safety, Progress Tracking, Equipment
**Code Reference:** `14-site-inventory.md` (financial side) + BUILD-TRACKER Phase 4A (DSR)
**Prototype Screens:** DSR Entry/List, Material Requisition, Material Issue, Inventory screens

---

## 1. Overview & Core Principle

This is the **engineer's daily workspace** — the module that makes the ERP useful to the people who actually build the building, not just the people who account for it. A construction ERP that only tracks costs is a finance tool. A construction ERP that tracks costs AND daily operations is a management tool.

Two parallel tracks run here simultaneously:

| Track | Audience | Question | Output |
|---|---|---|---|
| **Financial** | CFO, Accountant | "How much did we spend on materials this month?" | GL postings: DR WIP / CR Inventory |
| **Management** | Site Engineer, PM | "How many masons showed up? Is concrete curing on schedule? Did we have any safety incidents?" | DSR, progress reports, quality logs |

Both tracks share the same data — manpower on the DSR also feeds labour cost allocation. Material issues feed both WIP posting and BOQ consumption tracking. The same system serves both worlds.

> **Non-Negotiable Core Principle:**
> _Every item that leaves a store must be backed by an approved issue document. Every loss must be recorded as wastage (expensed immediately — ADR-010, never capitalized). The store balance must reconcile with the GL inventory control account. For Real Estate: every issue is tagged to project dimensions (WBS + Cost Code + BOQ line) and reconciled against the BOQ._

---

## 2. What the Site Team Actually Does Every Day

### The Engineer's Day (What This Module Must Support)

```
6:30 AM  — Arrive at site. Check overnight security report.
7:00 AM  — Morning toolbox talk (safety briefing). Record attendance.
7:30 AM  — Contractor workforce arrival. Count by trade.
           → DSR > Manpower section
8:00 AM  — Equipment check. Crane operational? Generator fuel?
           → DSR > Equipment section
8:30 AM  — Work front assignment. Column casting Floor 3, beam rebar Floor 4.
           → DSR > Work Done section
9:00 AM  — Material requisition. Need 200 bags cement for slab pour tomorrow.
           → Material Requisition
10:00 AM — Concrete cube casting. Take samples, mark cube IDs.
           → Quality > Concrete Test Log
11:00 AM — Rebar inspection before concrete pour. Check spacing, cover, grade.
           → Quality > Inspection Checklist
12:00 PM — Material delivery arrives. Verify qty, quality, reject damaged bags.
           → Material receipt at site store
2:00 PM  — Scaffolding inspection. Safety officer flags missing guardrail.
           → Safety > Incident Report
3:00 PM  — Joint measurement with contractor for running bill.
           → Contractor > Measurement Sheet
4:00 PM  — Issue materials from store for tomorrow's work.
           → Material Issue
5:00 PM  — Review work done today. Take progress photos.
           → DSR > Photos + Work Done update
5:30 PM  — Record issues: cement delivery delayed, Form 2 not received.
           → DSR > Issues section
6:00 PM  — Submit DSR. System notifies PM and Project Director.
```

### What Gets Tracked (Both Financial + Management)

| Activity | Financial Impact | Management Impact | Prototype Status |
|---|---|---|---|
| **Daily Site Report** | Labour cost allocation basis | Manpower, equipment, work done, issues, photos | DONE |
| **Material Requisition** | Budget check against BOQ | Material planning, lead time tracking | DONE |
| **Material Issue** | DR WIP / CR Inventory | BOQ consumption tracking, wastage detection | DONE |
| **Material Return** | CR WIP / DR Inventory (reverse) | Unused material recovery | NOT BUILT |
| **Material Wastage** | DR Wastage Expense (P&L) | Waste analysis, contractor back-charge | NOT BUILT |
| **Concrete Test Log** | None (quality, not financial) | Cube strength results, compliance | NOT BUILT |
| **Rebar Inspection** | None | Cover, spacing, grade verification | NOT BUILT |
| **Steel Bending Schedule** | Links to BOQ rebar qty | Actual vs planned cutting lengths | NOT BUILT |
| **Quality Inspection** | None (unless rework) | Checklist pass/fail per activity | NOT BUILT |
| **Safety Incident** | Potential liability/insurance | Incident type, severity, action taken | NOT BUILT |
| **Progress Photos** | None | Visual progress evidence | Partial (DSR photos) |
| **Weather / Stoppage** | Delay cost analysis | Days lost, reason, schedule impact | Partial (DSR) |
| **Equipment Log** | Equipment cost allocation | Utilization %, idle time, breakdown | Partial (DSR equipment) |
| **Survey / Setting Out** | None | Coordinate records, boundary checks | NOT BUILT |

---

## 3. Module Sections

### 3.1 Daily Site Report (DSR)

**Who:** Site Engineer
**When:** Every working day, submitted by end of day
**Where:** Project Workspace → Build → DSR sub-tab

**5 Sections:**

| Section | What's Recorded | Source |
|---|---|---|
| **Manpower** | Trade-wise count: present, absent, overtime. Contractor-wise breakdown. | User input. Reference: Core > trade types (configurable) |
| **Equipment** | Equipment name, status (Running/Idle/Breakdown), hours, idle reason. | User input. Reference: Equipment master (org-level) |
| **Work Done** | WBS node, activity description, progress %. | User selects WBS → enters progress. Reference: ProjectWBS |
| **Issues** | Description, severity (Critical/Major/Minor), action taken. | User input |
| **Photos** | Site photos with captions, GPS if available. | User uploads |

**Data Source Trace:**

| DSR Field | Source |
|---|---|
| Date | Auto: today (backdate allowed with PM permission) |
| Weather | User input (Clear/Cloudy/Rain/Storm) |
| Trade types | Config: org-level master (Mason, Rod Binder, Carpenter, Electrician, Plumber, Helper, etc.) |
| Equipment list | Config: org-level equipment master |
| WBS nodes | Per-project: ProjectWBS tree |
| Approval | Auto-submitted. PM reviews next morning. |

**Financial Connection:** Manpower data feeds labour cost allocation. Equipment hours feed equipment cost reports. Work done updates ProjectPhase.completionPercent (for POC revenue recognition).

### 3.2 Material Requisition → Issue → Consumption

**The Financial Chain:**

```
Engineer requests    Store keeper     GL posts           BOQ tracks
material             issues material  
                                      
MR-027-042          MI-027-018       DR WIP ৳96,000     BOQ remaining:
Cement 200 bags     Cement 200 bags   CR Inventory       2,400 → 2,200
For: Tower A Slab   Gate pass #418    ৳96,000            bags
Approved by PM                                           
```

**Material Requisition:**

| Field | Source |
|---|---|
| MR Number | Auto-generated. Config: Settings > Numbering > MR format |
| BOQ Item | User selects. Source: ProjectBOQLine[] for this project |
| WBS Node | Auto from BOQ line (overridable) |
| Cost Code | Auto from BOQ line (overridable) |
| Requested Quantity | User input |
| BOQ Remaining | Computed: BOQ planned − already issued |
| Budget Check | Computed: Budget − (Actual + Committed) for this cost code |
| Required By Date | User input |
| Purpose | User input (e.g., "For 2nd floor column work") |
| Estimated Cost | Computed: qty × BOQ rate. Source: ProjectBOQLine.rate |
| Approval | Config: Settings > Approval Workflows > Material Requisition |

**Material Issue:**

| Field | Source |
|---|---|
| MI Number | Auto-generated. Config: Settings > Numbering > MI format |
| Source MR | Selected from approved MRs |
| Stock Available | Computed: from StockLocation (site store) inventory balance |
| Issue Quantity | User input (≤ MR qty, ≤ stock available) |
| Rate | From inventory valuation method (FIFO/Weighted Avg). Config: Core > Inventory > valuation method |
| GL Entry | Auto: DR Construction WIP (from CostCode GL) / CR Site Inventory |
| Gate Pass | Auto-generated number |
| BOQ Consumption Update | Auto: BOQConsumptionSummary.issuedQty += issue qty |

### 3.3 Quality Management (Not Yet Built — Design Spec)

**Purpose:** Track construction quality systematically, not through WhatsApp photos.

**Concrete Test Log:**

| Field | Source | Why It Matters |
|---|---|---|
| Cube ID | Auto: Project-Date-SEQ | Traceability to specific pour |
| Pour location (WBS) | User selects from ProjectWBS | Know which structural element |
| Concrete grade | User selects (M20/M25/M30/M35) | Design compliance |
| Slump test result | User input (mm) | Workability check |
| 7-day strength | Lab input (N/mm²) | Early strength indicator |
| 28-day strength | Lab input (N/mm²) | Design strength verification |
| Pass/Fail | Computed: 28-day result vs required strength | Compliance gate |
| Action if fail | User input | Re-test, core test, or structural review |

**Inspection Checklists:**

| Inspection Type | When | Key Checks |
|---|---|---|
| Pre-pour (slab/column/beam) | Before concrete | Rebar spacing, cover, grade, formwork alignment, shuttering oil |
| Post-pour | After concrete | Curing method, curing duration, surface finish |
| Rebar | Before tying to formwork | Grade (60/40), diameter, lap length, chair spacing |
| Brickwork | After each wall section | Bond pattern, mortar mix, plumb, level |
| Plastering | After each room | Thickness, surface finish, alignment |
| Waterproofing | Before covering | Membrane overlap, drainage, test ponding |
| MEP rough-in | Before closing walls | Pipe routing, electrical conduit, fire sprinkler |
| Final finishing | Before handover | Paint, tile, fixture, switch, sanitary fitting |

**Config Source:** Inspection checklist templates → configurable per org. Industry pack seeds BD construction standards.

### 3.4 Safety Management (Not Yet Built — Design Spec)

**Purpose:** Track safety incidents, near-misses, and compliance. Required by BNBC and good practice.

**Safety Incident Report:**

| Field | Source |
|---|---|
| Date/Time | User input |
| Location (WBS) | User selects |
| Incident Type | Config: Safety incident types (Fall, Electrical, Collapse, Fire, Equipment, Other) |
| Severity | User selects: Near Miss / Minor / Major / Fatal |
| Description | User input |
| Injured Person(s) | User input: name, trade, contractor |
| Action Taken | User input: first aid, hospital, work stoppage |
| Root Cause | User input |
| Corrective Action | User input + assigned to + due date |
| Photos | User uploads |
| Reported To | Config: Safety reporting chain (Safety Officer → PM → Director) |

**Safety Dashboard (per project):**
- Incident-free days counter
- Incident trend (monthly)
- Open corrective actions
- PPE compliance checks

### 3.5 Progress Tracking

**Purpose:** Visual construction progress — not just % numbers, but evidence.

**Progress Photo Log:**

| Field | Source |
|---|---|
| Date | Auto/user input |
| WBS Node | User selects |
| Photo(s) | User uploads |
| Caption | User input |
| GPS Coordinates | Auto (if mobile) |
| Completion % | User input (updated in ProjectWBS/ProjectPhase) |

**Progress feeds:**
- ProjectPhase.completionPercent → used for POC revenue recognition
- Dashboard: CEO, Project Director, Buyer Portal (construction progress)
- S-Curve: Planned vs Actual progress over time

---

## 4. GL Integration

| Event | Debit | Credit | Dimensions | Config Source |
|---|---|---|---|---|
| Material Issue | Construction WIP | Site Inventory | Project, WBS, Cost Code, CC | GL from CostCode.glAccountId |
| Material Return | Site Inventory | Construction WIP | Project, WBS, Cost Code, CC | Reverse of issue |
| Material Wastage | Wastage Expense (P&L) | Site Inventory | Project, WBS, Cost Code, CC | ADR-010: never capitalized |
| Inter-store Transfer | Site Inventory (dest) | Site Inventory (source) | Both project contexts | — |

---

## 5. Configuration Dependencies

| Config / Master | How Site Ops Uses It |
|---|---|
| Settings > Numbering | MR, MI format |
| Settings > Approval Workflows > MR | MR approval chain |
| Settings > General > varianceAlertPercent | BOQ consumption variance threshold |
| Masters > Cost Codes | Classification on issue lines → GL account |
| Core > Item Master | Material items, UOM, valuation |
| Core > Inventory > Valuation Method | FIFO or Weighted Average for issue rate |
| Project > BOQ (BASELINE) | Planned quantities for consumption tracking |
| Project > WBS | WBS nodes for tagging issues and DSR work |
| Org-level: Trade Types | DSR manpower trade categories |
| Org-level: Equipment Master | DSR equipment list |
| Org-level: Inspection Templates | Quality checklist templates |
| Org-level: Safety Incident Types | Incident classification |

---

## 6. Reports Fed by This Module

| # | Report | Source | Key Metrics |
|---|---|---|---|
| 67 | Material Consumption vs BOQ | BOQConsumptionSummary | BOQ qty vs purchased vs consumed vs wasted |
| 74 | DSR Manpower Summary | DailySiteReport > Manpower | Daily/weekly by trade, equipment utilization |
| — | Quality Dashboard | InspectionResult[], ConcreteTestLog[] | Pass rates, rework %, cube strength trends |
| — | Safety Dashboard | SafetyIncident[] | Incident-free days, trend, open corrective actions |

---

## 7. What's Built in Prototype

| Screen | Route | Status |
|---|---|---|
| DSR List | `dsr` | DONE |
| DSR Entry (5-tab) | `dsr/new` | DONE — manpower, equipment, work done, issues, photos |
| Material Requisition | `material-requisition` | DONE |
| Create MR | `material-requisition/new` | DONE |
| Material Issue | `material-issue/new` | DONE |

**Not Yet Built:**
- Material Return, Material Wastage recording
- Concrete Test Log, Rebar Inspection
- Quality Inspection Checklists
- Safety Incident Reporting
- Steel Bending Schedule
- Progress Photo Log (systematic, beyond DSR photos)
- Equipment cost allocation
- Survey / Setting Out records

---

_A construction ERP that only tracks money is a finance tool. A construction ERP that tracks money AND operations — manpower, quality, safety, progress — is a management tool. The site team needs both._
