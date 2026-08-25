# Project Workspace Design

**Purpose:** This document defines the Project workspace — the second primary work area in AbcERP Real Estate. A project is created from a Land workspace after feasibility approval and land acquisition. The project workspace follows the same UX philosophy as Land: one workspace, tabs for activities, guided next actions.

---

## 1. Project List

```
PROJECTS

[ + Create Project ]

Search projects...        [All] [Active] [Need Attention] [On Hold]

┌─────────────────────────────────────────────────────────────────────┐
│ Gulshan Residence                                   CONSTRUCTION    │
│ Gulshan, Dhaka                                                      │
│                                                                     │
│ Construction      27%          Budget Used     31%                  │
│ Units Sold        38%          Collection      24%                  │
│                                                                     │
│ ⚠ BOQ forecast exceeds budget by ৳18.4M                           │
│                                                   [Open →]          │
├─────────────────────────────────────────────────────────────────────┤
│ Bay View Residence                              SALES & COLLECTION  │
│ Patenga, Chattogram                                                 │
│                                                                     │
│ Construction      92%          Budget Used     82%                  │
│ Units Sold        85%          Collection      71%                  │
│                                                                     │
│ Next: 3 units pending handover                                     │
│                                                   [Open →]          │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 2. Project Workspace

Same UX philosophy as Land workspace. One screen, tabs for all activities.

```
GULSHAN RESIDENCE                         CONSTRUCTION

Overview   Plan   BOQ   Buy   Build   Inventory   Sales   Finance

────────────────────────────────────────────────────────────────────
```

### Tab Mapping to Domain Activities

| Tab | What's Inside | Old Standalone Screens Replaced |
|---|---|---|
| **Overview** | Health, KPIs, attention items, next actions | Portfolio dashboard, Project detail |
| **Plan** | WBS, phases, timeline, milestones | WBS Builder, Project phases |
| **BOQ** | BOQ lines, measurement, rate analysis, approval, variance | BOQ list, BOQ entry, Measurement, Rate Analysis, BOQ Approval |
| **Buy** | Tenders, contracts, work orders, material requisition | Tender, Contract, Work Order, MR pages |
| **Build** | DSR, running bills, variation orders, progress | DSR, Running Bill, Variation pages |
| **Inventory** | Material issue, returns, wastage, consumption | Material Issue page |
| **Sales** | Unit booking, cancellation, transfer, buyer portal | Booking, Cancellation, Transfer pages |
| **Finance** | Budget vs actual, cost tracking, revenue recognition | Budget page, financial reports |

---

## 3. Overview Tab

```
PROJECT HEALTH

Construction      27%          Sales             38%
Budget Used       31%          Collection         24%

Budget            ৳1.39B
Actual            ৳431M
Committed         ৳287M
Forecast           ৳1.44B

Expected Profit    ৳380M       ↓ ৳50M from baseline

────────────────────────────────────────────────────────────────────

NEEDS ATTENTION

🔴 Structural BOQ forecast exceeds budget by ৳18.4M
🟠 3 contractor bills awaiting certification
🟠 2 purchase requisitions awaiting approval
🟡 Collections ৳12.8M behind schedule

────────────────────────────────────────────────────────────────────

NEXT ACTIONS

[Review BOQ Variance]
[Certify Contractor Bills]
[Review Requisitions]
```

---

## 4. Plan Tab

WBS structure, phases, and timeline. This is where the project is organized before BOQ begins.

```
PLAN

Gulshan Residence

[WBS] [Phases] [Timeline] [Team]
```

### WBS Sub-tab

```
WBS BUILDER                                    4 levels

▼ Gulshan Residence (RE-00027)
  ▼ Tower A
    ▼ Foundation
      ├── Pile Work                          12 BOQ items
      ├── Pile Cap                            8 BOQ items
      └── Grade Beam                          6 BOQ items
    ▼ Structure
      ├── Column                             14 BOQ items
      ├── Beam                               12 BOQ items
      ├── Slab                               10 BOQ items
      └── Staircase                           4 BOQ items
    ▼ Masonry
    ▼ Plaster & Finishing
    ▼ Electrical
    ▼ Plumbing
    ▼ Fire Safety
  ▼ Tower B
    ...
  ▼ Common Areas
    ├── Parking
    ├── Lift Lobby
    └── External Works

[+ Add Node]                               Total: 186 BOQ items
```

Only Level 4 (leaf) nodes carry BOQ items. The tree is drag-reorderable.

### Phases Sub-tab

```
PHASES

Phase              Start         End           Budget        Status

Foundation         01 Sep 2026   31 Jan 2027   ৳168M         ● Active
Structure          01 Dec 2026   30 Sep 2027   ৳352M         ○ Planned
MEP                01 Jun 2027   31 Mar 2028   ৳144M         ○ Planned
Finishing          01 Jan 2028   30 Sep 2028   ৳190M         ○ Planned
External Works     01 Jul 2028   31 Dec 2028   ৳46M          ○ Planned
Handover           01 Oct 2028   31 Mar 2029   —             ○ Planned

[+ Add Phase]
```

---

## 5. BOQ Tab

```
BOQ

Gulshan Residence                         V4 · APPROVED

[Summary] [Line Items] [Measurement] [Rate Analysis] [Approval Log]

Search items...    [All Categories ▼]  [All WBS ▼]

Category              Budget          Current        Variance

Site Work             ৳32M            ৳31M            -3%
Foundation            ৳88M            ৳91M            +3%
Structure             ৳280M           ৳298M           +6% ⚠
Masonry               ৳72M            ৳70M            -3%
Electrical            ৳81M            ৳82M            +1%
Plumbing              ৳63M            ৳63M             0%
Finishing             ৳190M           ৳196M           +3%

────────────────────────────────────────────────────────────────────

Total                 ৳806M           ৳831M           +৳25M

PROJECT IMPACT

Expected Profit        ৳430M → ৳405M
Margin                 23.6% → 22.3%

[View Changes]                         [+ Add BOQ Item]
```

### Expanding a Category → Line Items

```
▼ STRUCTURE                     Budget ৳280M   Current ৳298M   +6% ⚠

Item        WBS              Unit   BOQ Qty   Actual   Rate        Budget        Current      Var

MS Rod      Tower A >        kg     82,000    51,200   ৳105/kg     ৳8,610,000    ৳9,120,000   +6%
            Structure > Col

RCC M20     Tower A >        cft    12,400     7,800   ৳480/cft    ৳5,952,000    ৳5,952,000    0%
            Structure > Slab

Formwork    Tower A >        sqft   38,000    22,100   ৳85/sqft    ৳3,230,000    ৳3,400,000   +5%
            Structure > Slab
...

                                               [+ Add Line]  [Export]
```

### Adding a BOQ Line

```
ADD BOQ LINE

WBS Node *
[ Tower A > Structure > Column ▼ ]

Cost Code *
[ STR-REBAR — Reinforcement Steel ▼ ]

Item *
[ MS Rod 60 Grade ▼ ]

Unit
[ kg ]

Quantity
[ 82,000 ]    [Open Measurement Sheet →]

Rate
[ ৳ 105 ]     [Open Rate Analysis →]

Amount
৳8,610,000 (auto-calculated)

Phase
[ Structure ▼ ]

[Cancel]                              [Add to BOQ]
```

### Measurement Sheet (inline or modal)

```
MEASUREMENT SHEET

Item: MS Rod 60 Grade
WBS: Tower A > Structure > Column

Description              Nos    L(m)    W(m)    H(m)    Qty(kg)

Ground Floor Columns      16    3.5     —       —       4,200
1st Floor Columns          16    3.2     —       —       3,840
2nd Floor Columns          16    3.2     —       —       3,840
...
Lap/Splice allowance       —     —       —       —       8,200

────────────────────────────────────────────────────────
Total                                                   82,000 kg

[+ Add Row]                            [Apply to BOQ Line]
```

### Rate Analysis (inline or modal)

```
RATE ANALYSIS

Item: MS Rod 60 Grade
Template: Structural Steel (Standard)

Component        Type        Unit    Qty/Unit   Rate       Amount

MS Rod 60 Grade  Material    kg      1.000      ৳92.00     ৳92.00
Binding Wire     Material    kg      0.012      ৳120.00    ৳1.44
Rod Binder       Labour      day     0.004      ৳800.00    ৳3.20
Helper           Labour      day     0.002      ৳500.00    ৳1.00
Cutting/Bending  Equipment   hr      0.001      ৳500.00    ৳0.50
Overhead         Overhead    %       5.0%       —          ৳4.91
──────────────────────────────────────────────────────────
Rate per kg                                               ৳103.05

ⓘ Latest PO rate: ৳98.50/kg (ABC Steel, 3 Aug 2026)
ⓘ Company avg: ৳101.20/kg across 4 projects

[Apply Rate to BOQ Line]
```

### BOQ Approval

```
BOQ APPROVAL

Status: SUBMITTED → REVIEWED → APPROVED → LOCKED

Current Version: V4

Submitted by          Eng. Karim        12 Aug 2026
Reviewed by           QS Manager        14 Aug 2026   ✓
Approved by           Project Director  — pending

Reviewer Comments:
"Structure quantities verified against structural drawings.
 Recommend 3% reduction on formwork estimate."

[View Change Log]

[Return for Revision]    [Approve & Lock Baseline →]
```

---

## 6. Buy Tab

Procurement activities within the project context.

```
BUY

Gulshan Residence

[Tenders] [Contracts] [Work Orders] [Requisitions]
```

### Tenders Sub-tab

```
TENDERS                                          3 active

┌─────────────────────────────────────────────────────────────────┐
│ TND-027-003  Structural Steel Supply                           │
│ BOQ Scope: ৳28.4M · 4 bids received                           │
│                                                                 │
│ Status: EVALUATION                                             │
│ Due: 20 Aug 2026                                               │
│                                                                 │
│ [View Comparative Statement →]                                 │
├─────────────────────────────────────────────────────────────────┤
│ TND-027-004  Electrical Works (Full Package)                   │
│ BOQ Scope: ৳81M · Bid submission open                          │
│                                                                 │
│ Status: OPEN · Closes 25 Aug                                   │
│ 2 bids so far                                                  │
│                                                                 │
│ [View Details →]                                               │
└─────────────────────────────────────────────────────────────────┘

[+ Create Tender]
```

### Create Tender

```
CREATE TENDER

Tender Reference
[ TND-027-005 ] (auto)

Work Package *
[ Plumbing & Sanitary Works ▼ ]
  (populated from BOQ categories / WBS nodes)

BOQ Items Included                    12 items · ৳63M
[View / Edit Scope →]

Tender Type
[ Item Rate ▼ ]
  (Item Rate / Lump Sum / Combination)

Submission Deadline *
[ 30 Aug 2026 ]

──────────────────────────────────────────────

INVITED CONTRACTORS

+ Add Contractor

ABC Plumbing Ltd.               Invited
National Sanitary Works          Invited
Metro MEP Solutions              Invited

──────────────────────────────────────────────

Terms & Conditions
[ Standard terms apply. Retention 5%.
  Mobilization advance 10%.              ]

[Cancel]                        [Issue Tender →]
```

### Comparative Statement

```
COMPARATIVE STATEMENT

TND-027-003  Structural Steel Supply

                    ABC Steel    National    Metro      Estimate
                                 Steel       Steel

Total Bid           ৳26.8M       ৳28.1M     ৳27.4M     ৳28.4M

MS Rod 60G /kg      ৳98.50       ৳102.00    ৳99.80     ৳105.00
Binding Wire /kg    ৳118.00      ৳125.00    ৳120.00    ৳120.00
Transport           Included     ৳180K      Included   —
Delivery            14 days      21 days    18 days    —

Technical Score     82/100       78/100     85/100     —
Financial Score     95/100       88/100     92/100     —
────────────────────────────────────────────────────────────
Overall Rank        #1           #3         #2         —

RECOMMENDATION

Award to ABC Steel Ltd.
৳1.6M below BOQ estimate (5.6% saving)

[Return to Tender]    [Award Contract →]
```

### Create Contract (after tender award)

Triggered from [Award Contract] on the comparative statement.

```
CREATE CONTRACT

Gulshan Residence

──────────────────────────────────────────────

SOURCE

Tender              TND-027-003  Structural Steel Supply
Awarded To          ABC Steel Ltd.
Bid Amount          ৳26,800,000

──────────────────────────────────────────────

CONTRACT DETAILS

Contract Ref        [ CON-027-005 ] (auto)

Contract Type *
[ Item Rate ▼ ]
  (Item Rate / Lump Sum / Cost Plus)

Contract Value *
[ ৳ 26,800,000 ]

──────────────────────────────────────────────

SCOPE (from tender BOQ items)

Item              Unit    Qty       Rate        Amount

MS Rod 60G        kg      82,000    ৳98.50      ৳8,077,000
Binding Wire      kg      960       ৳118.00     ৳113,280
Transport         lot     1         Included    ৳0
...
                                                ───────────
Total                                           ৳26,800,000

[Edit Scope →]

──────────────────────────────────────────────

TERMS

Retention              [ 5 ] %
Mobilization Advance   [ 10 ] %
Advance Recovery Rate  [ 10 ] % per bill
TDS                    [ 2 ] %

Payment Terms
[ Within 14 days of certified running bill ▼ ]

Defect Liability
[ 12 ] months after practical completion

──────────────────────────────────────────────

MILESTONES (optional)

#    Milestone                  Target Date     Value

1    Material delivery start    01 Sep 2026     —
2    50% supply                 15 Oct 2026     —
3    100% supply                30 Nov 2026     —
4    Practical completion       31 Dec 2026     —

[+ Add Milestone]

──────────────────────────────────────────────

GL IMPACT

Commitment registered:
Off-balance-sheet: ৳26,800,000
(Tracked in Budget vs Actual as Committed)

Mobilization advance on signing:
Dr  Advance to Contractor (Asset)     ৳2,680,000
  Cr  Cash / Bank                        ৳2,680,000

──────────────────────────────────────────────

[Cancel]                         [Create Contract →]
```

#### After Contract Created

```
✓ CONTRACT CREATED

CON-027-005  ABC Steel Ltd.
Structural Steel Supply · ৳26.8M

Commitment of ৳26.8M registered in budget.

NEXT STEPS

[Issue Work Order]    [View Contract]    [Back to Contracts]
```

### Contracts Sub-tab

```
CONTRACTS                                        4 active

Contractor            Scope              Value      Retention   Paid      Status

ABC Steel Ltd.        Structural Steel   ৳26.8M    5%          ৳12.4M    Active
BD Construction       Foundation         ৳42.0M    5%          ৳38.1M    Active
National Plumbing     Plumbing & San.    ৳27.4M    5%          ৳0        New
Elite Finishing       Painting & Tile    ৳35.6M    5%          ৳0        Pending

Total Committed                          ৳131.8M

[+ New Contract]
```

### Work Orders Sub-tab

```
WORK ORDERS                                      6 active

WO-027-008  Foundation Pile Cap Work
BD Construction · ৳8.2M · 75% complete

WO-027-009  Ground Floor Column RCC
ABC Steel Ltd. · ৳4.6M · Started

WO-027-010  Ground + 1st Floor Slab
BD Construction · ৳12.1M · Not started
...

[+ Issue Work Order]
```

### Requisitions Sub-tab

```
REQUISITIONS                                     ⚠ 2 pending approval

MR-027-042  Cement (OPC) — 500 bags
Requested by: Site Engineer · 18 Aug
For WBS: Tower A > Structure > Slab
BOQ Available: 2,400 bags remaining
Status: PENDING APPROVAL                         [Review →]

MR-027-041  MS Rod 60G — 12,000 kg
Requested by: Site Engineer · 17 Aug
For WBS: Tower A > Structure > Column
BOQ Available: 30,800 kg remaining
Status: APPROVED → PO Raised                     [View PO →]

[+ Create Requisition]
```

### Create Requisition

```
CREATE MATERIAL REQUISITION

BOQ Item *
[ MS Rod 60 Grade ▼ ]

WBS Node *
[ Tower A > Structure > Column ▼ ]

Requested Quantity *
[ 12,000 ] kg

BOQ Status
Planned:     82,000 kg
Issued:      39,200 kg
This Request: 12,000 kg
Remaining:   30,800 kg    ✓ within BOQ limit

Required By
[ 25 Aug 2026 ]

Purpose / Notes
[ For 2nd floor column work            ]

Estimated Cost
৳1,260,000 (@ ৳105/kg BOQ rate)

[Cancel]                        [Submit for Approval →]
```

---

## 7. Build Tab

Construction execution — the engineering team's daily workspace.

```
BUILD

Gulshan Residence

[DSR] [Running Bills] [Variations] [Progress]
```

### DSR Sub-tab (Daily Site Report)

```
DAILY SITE REPORT

Today: 18 Aug 2026                    [Previous Reports ▼]

Status: DRAFT

[Manpower] [Equipment] [Work Done] [Issues] [Photos]
```

#### DSR > Manpower

```
MANPOWER                              Total: 87 workers

Trade              Present    Absent    Overtime

Mason              12         2         4
Rod Binder         8          1         2
Carpenter          6          0         0
Electrician        4          1         0
Plumber            3          0         0
Helper             28         3         0
Foreman            4          0         0
Supervisor         2          0         0
────────────────────────────────────────────
Total              67         7         6

Contractor Crew
BD Construction    38
ABC Steel          14
Direct Labour      15

[+ Add Trade]
```

#### DSR > Equipment

```
EQUIPMENT                              7 active

Equipment          Status      Hours    Idle Reason

Tower Crane #1     Running     8.0      —
Concrete Mixer     Running     6.5      —
Bar Bending M/C    Running     5.0      —
Vibrator #1        Running     7.0      —
Vibrator #2        Idle        0        Repair
Pump               Running     4.0      —
Generator          Standby     1.5      Power cut

[+ Add Equipment]
```

#### DSR > Work Done

```
WORK DONE

WBS Node                        Activity                    Progress

Tower A > Structure > Column    2F Column casting           100% ✓
Tower A > Structure > Beam      2F Beam rebar binding       60%
Tower A > Structure > Slab      2F Slab formwork            40%
Tower B > Foundation            Pile cap excavation         Started

Notes
[ 2F column casting completed. Beam rebar in progress.
  Slab formwork delayed 1 day due to material.          ]

[+ Add Activity]
```

#### DSR > Issues

```
ISSUES                                 2 open

🔴 Material delay — Cement delivery postponed to tomorrow
   Impact: Slab casting delayed 1 day
   Action: Notified supplier, rescheduled pour

🟡 Minor safety — Scaffolding inspection due
   Action: Scheduled for tomorrow morning

[+ Report Issue]
```

#### DSR Submit

```
DSR SUMMARY

18 Aug 2026
Manpower: 67 present · Equipment: 6 running · 4 activities
Issues: 1 critical · 1 minor

Weather: Clear · 32°C

[Save Draft]                    [Submit DSR →]
```

### Running Bills Sub-tab

```
RUNNING BILLS                          ⚠ 3 awaiting certification

RA-027-003  BD Construction — Foundation Phase
Gross: ৳8,420,000
Deductions: Retention ৳421,000 + Advance Recovery ৳842,000 + TDS ৳168,400
Net Payable: ৳6,988,600
Status: SUBMITTED → awaiting certification     [Certify →]

RA-027-002  ABC Steel — 2nd Running Bill
Gross: ৳4,180,000
Net Payable: ৳3,464,200
Status: CERTIFIED → awaiting approval          [Approve →]

RA-027-001  BD Construction — 1st Running Bill
Gross: ৳12,100,000
Net Payable: ৳10,023,000
Status: POSTED ✓                               [View →]

[+ Create Running Bill]
```

### Create Running Bill

```
RUNNING BILL ENTRY

RA-027-003  BD Construction

Contract: Foundation Works · ৳42.0M
Work Order: WO-027-008 Pile Cap

──────────────────────────────────────────────

MEASUREMENT (from joint measurement)

Item              Unit    Previous    This Bill    Cumulative    Rate        Amount

Pile Cap RCC      cft     1,200       800          2,000         ৳520       ৳416,000
Formwork          sqft    3,800       2,400        6,200         ৳90        ৳216,000
Rebar             kg      14,000      9,200        23,200        ৳108       ৳993,600
...

Gross Amount                                                               ৳8,420,000

──────────────────────────────────────────────

DEDUCTIONS

Retention (5%)                    ৳421,000
Advance Recovery (10% of gross)   ৳842,000
TDS (2%)                          ৳168,400
Material Supplied                 ৳0
──────────────────────────────────────────────
Total Deductions                  ৳1,431,400

NET PAYABLE                       ৳6,988,600

──────────────────────────────────────────────

GL PREVIEW

Dr  Construction WIP             ৳8,420,000
  Cr  Accounts Payable             ৳6,988,600
  Cr  Retention Payable            ৳421,000
  Cr  Advance Recovery             ৳842,000
  Cr  TDS Payable                  ৳168,400

[Save Draft]        [Certify →]
```

### Variations Sub-tab

```
VARIATIONS                             1 pending approval

VO-027-002  Additional waterproofing — basement level
Change Request: CR-027-005
Impact: +৳1.8M budget · +3 days schedule
Status: SUBMITTED → PM approved → awaiting Director

[Review →]

VO-027-001  Foundation depth increase (soil condition)
Impact: +৳4.2M budget · +7 days schedule
Status: APPROVED & ISSUED ✓
BOQ adjusted: V3 → V4

[View →]

[+ Raise Change Request]
```

### Raise Change Request

```
CHANGE REQUEST

Reference
[ CR-027-006 ] (auto)

Source
[ Site Condition ▼ ]
  (Client Request / Design Change / Site Condition / 
   Regulatory / Error Correction / Value Engineering)

Description *
[ Increased pile depth required for Tower B
  due to unexpected soil condition at -12m     ]

WBS Affected
[ Tower B > Foundation > Pile Work ▼ ]

──────────────────────────────────────────────

IMPACT ASSESSMENT

BOQ Impact
Pile quantity: 24 → 28 piles (+4)
Rate: ৳450,000/pile
Additional Cost: ৳1,800,000

Schedule Impact
[ 5 ] additional days
On critical path? [ Yes ▼ ]

──────────────────────────────────────────────

Budget Impact
Current Budget:        ৳88.0M (Foundation)
This Variation:        +৳1.8M
Revised Budget:        ৳89.8M
Contingency Remaining: ৳12.4M → ৳10.6M

[Attach Evidence]                [Submit CR →]
```

### Progress Sub-tab

```
PROGRESS

Overall Construction: 27%

Phase                  Planned    Actual     SPI     Status

Foundation             100%       92%        0.92    ⚠ Behind
Structure               45%       27%        0.60    🔴 Behind
MEP                      0%        0%        —       Not started
Finishing                0%        0%        —       Not started
External                 0%        0%        —       Not started

──────────────────────────────────────────────

MILESTONES

✓ Piling complete                    15 Jul 2026
✓ Foundation 50%                     01 Aug 2026
● Ground floor slab                  Due 30 Aug 2026  (on track)
○ Structure 50%                      Target 15 Dec 2026
○ Topping out                        Target 30 Sep 2027

──────────────────────────────────────────────

[View S-Curve]    [View Gantt]
```

---

## 8. Inventory Tab

Site materials management.

```
INVENTORY

Gulshan Residence

[Stock] [Issues] [Returns] [Wastage] [Consumption]
```

### Stock Sub-tab

```
SITE STOCK                              Gulshan Site Store

Item                Unit    In Stock    Committed    Available    Reorder

Cement (OPC)        bag     1,200       500          700          ⚠ Low
MS Rod 60G          kg      18,400      12,000       6,400        ⚠ Low
Sand (Coarse)       cft     2,800       —            2,800        ✓
Stone Chips         cft     3,200       —            3,200        ✓
Bricks (1st Class)  nos     45,000      —            45,000       ✓
Binding Wire        kg      280         —            280          ✓

[View All Items]
```

### Issues Sub-tab

```
MATERIAL ISSUES                        Recent

MI-027-018  Cement 200 bags → Tower A Structure
Issued by: Store Keeper · 18 Aug
GL: Dr WIP ৳96,000 / Cr Site Inventory ৳96,000        ✓ Posted

MI-027-017  MS Rod 8,000 kg → Tower A Structure
Issued by: Store Keeper · 16 Aug
GL: Dr WIP ৳840,000 / Cr Site Inventory ৳840,000      ✓ Posted

[+ Issue Material]
```

### Consumption Sub-tab

```
BOQ CONSUMPTION                        ⚠ 2 items over planned

Item              BOQ Planned    Issued    Consumed    Variance

Cement (OPC)      8,400 bags     3,200     3,100       -63% ✓
MS Rod 60G        82,000 kg      39,200    38,400      -53% ✓
Sand (Coarse)     12,000 cft     5,800     5,800       -52% ✓
Bricks            850,000 nos    185,000   184,200     -78% ✓
Binding Wire      960 kg         520       518         -46% ✓
Formwork Ply      4,200 sqft     2,800     2,650       🔴 +12%

[Export Report]
```

---

## 9. Sales Tab

Revenue activities within the project.

```
SALES

Gulshan Residence

[Units] [Bookings] [Collections] [Cancellations] [Transfers]
```

### Units Sub-tab (Inventory Grid)

```
UNIT INVENTORY                         64 total

Floor    A              B              C              D

10F      ■ Available    ■ Available    □ Landowner    ■ Available
9F       ● Booked       ■ Available    □ Landowner    ● Booked
8F       ● Booked       ◆ Sold         □ Landowner    ■ Available
7F       ◆ Sold         ◆ Sold         □ Landowner    ● Booked
6F       ◆ Sold         ◆ Sold         ◆ Sold         ◆ Sold
5F       ◆ Sold         ◆ Sold         ◆ Sold         ◆ Sold
4F       ◆ Sold         ◆ Sold         ◆ Sold         ◆ Sold
3F       ◆ Sold         ◆ Sold         ◆ Sold         ◆ Sold
2F       ◆ Sold         ◆ Sold         ◆ Sold         ◆ Sold
1F       ◆ Sold         ◆ Sold         ◆ Sold         ◆ Sold
GF       ▣ Commercial   ▣ Commercial   ▣ Commercial   ▣ Commercial

Legend: ■ Available (8)  ● Booked (4)  ◆ Sold (32)
        □ Landowner (6)  ▣ Commercial (4)  ○ Reserved (0)

Click a unit for details or to start booking.
```

### Bookings Sub-tab

```
BOOKINGS                               4 active

BK-027-033  Unit 9A · 1,450 sqft · ৳14,500/sqft
Mr. Rahman · Booked 12 Aug
Total: ৳21,025,000 · Paid: ৳4,205,000 (20%)
Next: 2nd installment ৳2,102,500 due 12 Nov

BK-027-032  Unit 9D · 1,680 sqft · ৳14,200/sqft
Mrs. Begum · Booked 08 Aug
Total: ৳23,856,000 · Paid: ৳4,771,200 (20%)
Next: 2nd installment due 08 Nov

[+ New Booking]                        [View All →]
```

### New Booking Form

Triggered from [+ New Booking] or by clicking an available unit on the grid.

```
NEW BOOKING

Gulshan Residence

──────────────────────────────────────────────

UNIT SELECTION

Unit *              [ 10A ▼ ]  (only available units shown)
Floor               10F
Type                3 Bed
Area                1,680 sqft
Facing              South
Base Price           ৳14,500/sqft

──────────────────────────────────────────────

CUSTOMER

Customer Name *     [ Mr. Kamal Uddin                ]
Phone *             [ 01XXX-XXXXXX                   ]
Email               [ kamal@email.com                ]
NID                 [ 19XX-XXXX-XXXX                 ]
Address             [                                ]

[+ Select Existing Customer]

──────────────────────────────────────────────

PRICING

Base Price                   ৳14,500 × 1,680 sqft = ৳24,360,000

Adjustments
  Floor Premium (10F, +3%)                          +৳730,800
  South Facing Premium (+2%)                        +৳487,200
  Discount                   [ 0 ] %                  ৳0

⚠ Discounts above 5% require approval.

────────────────────────────────────────────────────
Final Unit Price                                    ৳25,578,000
Price / sqft                                        ৳15,225

──────────────────────────────────────────────

PAYMENT PLAN

Plan Type
[ Standard (20/80) ▼ ]
  (20/80 / 30/70 / 40/60 / Custom)

Booking Amount (20%)         ৳5,115,600
Instalments                  12 quarterly × ৳1,705,200

Payment Mode (booking)
[ Bank Transfer ▼ ]

──────────────────────────────────────────────

PAYMENT SCHEDULE (auto-generated)

#    Type              Due Date       Amount          Status

1    Booking           Today          ৳5,115,600      Payable now
2    Instalment 1      15 Nov 2026    ৳1,705,200
3    Instalment 2      15 Feb 2027    ৳1,705,200
4    Instalment 3      15 May 2027    ৳1,705,200
...
13   On Handover       On handover    ৳1,705,200

──────────────────────────────────────────────

GL PREVIEW (on booking confirmation)

Dr  Cash / Bank                        ৳5,115,600
  Cr  Booking Advance — Customer (Liability) ৳5,115,600

ⓘ Booking advance is a liability, not revenue.
  Revenue is recognized per POC/CC method.

──────────────────────────────────────────────

[Cancel]                         [Confirm Booking →]
```

#### After Booking Confirmed

```
✓ BOOKING CONFIRMED

BK-027-034  Unit 10A
Mr. Kamal Uddin

Unit Price:     ৳25,578,000
Booking Paid:   ৳5,115,600
Next Payment:   Instalment 1 — ৳1,705,200 due 15 Nov 2026

Unit status: AVAILABLE → BOOKED

[View Booking Details]    [Book Another Unit]    [Back to Units]
```

### Collections Sub-tab

```
COLLECTIONS                            August 2026

Demanded This Month    ৳8,420,000
Collected              ৳6,180,000
Overdue                ৳2,240,000     ⚠ 73% efficiency

OVERDUE PAYMENTS

Mr. Hasan     Unit 7A    ৳1,050,000    32 days overdue    [Record Payment]  [Send Reminder]
Mr. Ali       Unit 6B    ৳1,190,000    18 days overdue    [Record Payment]  [Send Reminder]

[+ Record Payment]                     [View AR Aging →]
```

---

## 10. Finance Tab

Financial oversight for the project.

```
FINANCE

Gulshan Residence

[Budget] [Costs] [Revenue] [Cash Flow] [P&L]
```

### Budget Sub-tab

```
BUDGET VS ACTUAL

                    Budget      Actual      Committed   Available    EAC         Var

Foundation          ৳168M       ৳152M       ৳12M        ৳4M          ৳172M       +2%
Structure           ৳352M       ৳148M       ৳186M       ৳18M         ৳370M       +5% ⚠
MEP                 ৳144M       ৳0          ৳27M        ৳117M        ৳148M       +3%
Finishing           ৳190M       ৳0          ৳0          ৳190M        ৳196M       +3%
External            ৳46M        ৳0          ৳0          ৳46M         ৳46M         0%
────────────────────────────────────────────────────────────────────────────────
Total               ৳900M       ৳300M       ৳225M       ৳375M        ৳932M       +4%

COMMITMENT SUMMARY

Budget              ৳900M
Actual Spent        ৳300M (33%)
Committed (PO/WO)   ৳225M (25%)
Truly Available     ৳375M (42%)

⚠ Structure EAC exceeds budget by ৳18M.
  Recommendation: Review variation VO-027-002.

[View Waterfall]    [Export]
```

### P&L Sub-tab

```
PROJECT P&L

Gulshan Residence · As at 18 Aug 2026

Revenue Recognized (POC 27%)          ৳258M
────────────────────────────────────────
COGS (WIP transferred)                ৳196M
Gross Profit                          ৳62M
Gross Margin                          24.0%
────────────────────────────────────────
Overhead Allocation                   ৳8.4M
────────────────────────────────────────
Net Profit (to date)                  ৳53.6M
Net Margin                            20.8%

────────────────────────────────────────
FORECAST (at completion)

                          Feasibility    Current       Variance

Revenue                   ৳1,820M        ৳956M         -৳864M
  (৳956M reflects sold units only — 32 of 48 units sold.
   Unsold units not included in current forecast.)

Cost — Construction       ৳716M          ৳732M         +৳16M
Cost — Land               ৳450M          ৳450M          ৳0
Cost — Marketing          ৳56M           ৳42M          -৳14M
Cost — Finance            ৳84M           ৳88M          +৳4M
Cost — Overhead           ৳42M           ৳31M          -৳11M
────────────────────────────────────────────────────────
Total Cost                ৳1,348M        ৳1,343M       -৳5M
────────────────────────────────────────────────────────
Net Profit (full project) ৳472M          ৳430M*        —
Net Profit (sold units)   —              ৳193M         —
Margin                    23.6%          20.2%         —

* Full project profit estimate assumes remaining 16 units
  sell at current pricing. Revenue shortfall is a sales
  pipeline gap, not a cost overrun.

PROFIT VARIANCE DRILL-DOWN

Feasibility baseline profit            ৳430M
──────────────────────────────────────────────
Construction cost overrun              -৳16M
Finance cost increase                  -৳ 4M
Marketing under-spend                  +৳14M
Overhead under-allocation              +৳11M
Revenue per-unit pricing               -৳ 5M
────────────────────────────────────────────
Revised full-project profit            ৳430M
Sold-units-only profit (current)       ৳193M

⚠ The ৳237M gap is primarily unsold inventory (16 units),
  not cost overruns. Sales pipeline is the key risk.

[View Full P&L]    [Feasibility Comparison →]
```

---

## 11. Project Lifecycle Stages

The project workspace adapts based on lifecycle stage. Available tabs and actions change:

| Stage | Primary Tabs | Key Actions |
|---|---|---|
| PLANNING | Plan, BOQ | Define WBS, enter BOQ, approve budget |
| BOQ_ESTIMATION | BOQ, Plan | Complete BOQ, rate analysis, lock baseline |
| TENDERING | BOQ, Buy | Create tenders, evaluate bids, award contracts |
| PRE_SALES | Sales, BOQ, Buy | Book units, generate payment plans |
| CONSTRUCTION | Build, Buy, Inventory, Sales | DSR, running bills, material issues, collections |
| FINISHING | Build, Sales, Finance | Final bills, punch lists, handover prep |
| HANDOVER | Sales, Finance | Unit handover, revenue recognition |
| DEFECT_LIABILITY | Build, Finance | Defect tracking, retention release |
| CLOSED | Finance | Final P&L, sealed — no further postings |

---

## 12. Handover & Closure Flow

### Handover (inside Sales tab or as promoted action)

```
HANDOVER

Unit A-301    Mr. Rahman

Clearances
✓ Financial clearance
✓ Technical clearance
✓ Legal clearance
✓ Utility clearance
○ Municipal clearance                    [Complete →]
○ Management clearance                   [Request →]

Inspection
✓ Pre-handover inspection done
  2 snags: 1 resolved, 1 minor (in progress)

────────────────────────────────────────────────────────

Cannot hand over until:
• Municipal clearance completed
• All critical/major snags resolved

[Schedule Handover]  (disabled until gates clear)
```

### Project Closure (promoted from Overview when all units handed over)

```
PROJECT CLOSURE

Gulshan Residence

Automated Checks
✓ All units handed over
✓ WIP balance = 0
✓ AR balance = 0
✓ No open POs/WOs
✓ All retentions released
⚠ DLP active for 3 units (expires Mar 2030)

────────────────────────────────────────────────────────

Cannot close until DLP expires for all units.

[View DLP Status]
```

---

## 13. Universal Pattern Reminder

Every tab and sub-section follows:

```
┌─────────────────────────────────────────────────────┐
│ WHAT IS HAPPENING?                                  │
│ Key information / current state / numbers          │
├─────────────────────────────────────────────────────┤
│ WHAT NEEDS ATTENTION?                               │
│ Warnings / exceptions / overdue items              │
├─────────────────────────────────────────────────────┤
│ WHAT SHOULD I DO NEXT?                              │
│ [Primary Action →]                                  │
└─────────────────────────────────────────────────────┘
```
