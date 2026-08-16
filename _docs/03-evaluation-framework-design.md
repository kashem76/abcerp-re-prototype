# Evaluation Framework Engine — Design Specification

**Purpose:** This document defines the configurable evaluation engine that powers both Feasibility Studies and Due Diligence (and any future evaluation type). It replaces hardcoded feasibility forms with an organization-configurable, multi-department, AI-ready evaluation system.

**Key Principle:** We're not giving organizations our feasibility template. We're giving each organization the ability to encode their own investment methodology into the ERP.

---

## 1. Core Concept

An **Evaluation Framework** is a configurable system that allows an organization to define:
- **What** it evaluates (areas and criteria)
- **How** it evaluates it (response types, rating scales, rules)
- **Who** is responsible (department and individual assignment)
- **What evidence** is required
- **How results are interpreted** (thresholds, deal-breakers, scoring)
- **How approval decisions are made** (workflow, sign-offs)

Feasibility and Due Diligence are **applications** of the same engine.

```
                  EVALUATION ENGINE
                         │
        ┌────────────────┼─────────────────┐
        ↓                ↓                 ↓
 Due Diligence      Feasibility       Other Evaluations
        │                │                 │
        └────────────────┼─────────────────┘
                         ↓
                    Criteria
                         ↓
                 Department Work
                         ↓
              Findings + Evidence
                         ↓
                 Rules + Scoring
                         ↓
                    Sign-offs
                         ↓
               Consolidated Decision
```

---

## 2. Configuration UI — Settings

Located at: **Settings > Real Estate > Evaluation Frameworks**

### 2.1 Framework List

```
EVALUATION FRAMEWORKS

Use our templates or create your own evaluation process.

┌──────────────────────────────────────────────────────────────┐
│ Land Feasibility                              ACTIVE         │
│ 8 evaluation areas · 42 criteria                             │
│ Used before land/project approval                            │
│                                            [Configure →]     │
├──────────────────────────────────────────────────────────────┤
│ Land Due Diligence                            ACTIVE         │
│ 6 evaluation areas · 31 criteria                             │
│ Used during land investigation                              │
│                                            [Configure →]     │
└──────────────────────────────────────────────────────────────┘

[+ Create Evaluation Framework]
```

### 2.2 Creating a Framework

```
CREATE EVALUATION FRAMEWORK

Start with:

○ Land Feasibility Template
○ Land Due Diligence Template
○ Development Feasibility Template
○ Blank Framework

                         [Continue →]
```

Seeds are starting points, not system rules. Any organization can modify them.

### 2.3 Framework Configuration

```
LAND FEASIBILITY

Evaluation Areas

☰  Location & Site                      Development
☰  Market Assessment                    Marketing
☰  Sales Potential                      Sales
☰  Legal                                Legal
☰  Regulatory                           Legal
☰  Technical                            Engineering
☰  Financial                            Finance
☰  Risk                                 Management

                                        [+ Add Evaluation Area]
```

Organizations can add any area they need:
- Environmental Assessment
- Traffic Assessment
- Competitor Assessment
- Soil Condition
- Utility Availability
- Political/Regulatory Risk
- Flood Risk
- Brand Fit
- Islamic Financing Suitability

Nothing is permanently hard-coded.

---

## 3. Evaluation Areas

### 3.1 Adding an Area

```
ADD EVALUATION AREA

Name *
[ Environmental Impact                     ]

Description
[ Evaluate environmental risks and development
  constraints associated with the site.          ]

Responsible Department
[ Environmental / ESG ▼ ]

Default Reviewer
[ Department Head ▼ ]

[Cancel]                            [Add Area]
```

Departments come from the organization's department master — not hard-coded.

### 3.2 Department Assignment

Default: all criteria in an area inherit the area's department.

Override: individual criteria can be assigned to a different department.

```
Market Assessment
│
├── Market Size                Marketing
├── Competition                Marketing
├── Customer Demand            Marketing
├── Achievable Price           Sales      ← override
└── Historical Sales           Sales      ← override
```

---

## 4. Criteria — Where the Power Sits

Each criterion is a configurable evaluation point with rich metadata.

### 4.1 Criterion Configuration

```
CRITERION

Name *
[ Flood Risk                                ]

What should be evaluated?
[ Assess the site's exposure to flooding.   ]

How should this normally be evaluated?
[ Review historical flooding, site elevation,
  drainage, surrounding development and
  available environmental studies.           ]

Responsible Department
[ Environmental / ESG ▼ ]

Response Type
[ Risk Rating ▼ ]

Required
[✓]

Critical / Deal Breaker
[ ]

Evidence Required
[✓]

AI Instructions
[ Use environmental data, historical records
  and site elevation when assessing risk.    ]
```

The **"How should this normally be evaluated?"** field is critical. It:
- Helps employees today
- Becomes the instruction set for AI agents tomorrow
- Encodes organizational knowledge into the system

### 4.2 Response Types

Not everything should be points-based. Support multiple response types:

| Response Type | Example | When to Use |
|---|---|---|
| **Yes / No** | Road access available? | Binary facts |
| **Pass / Fail** | Title verified? | Gate conditions |
| **Rating (1-5)** | Location attractiveness | Subjective quality |
| **Risk Level** | Low / Medium / High / Critical | Risk assessment |
| **Number** | Expected selling price/sqft | Quantitative data |
| **Percentage** | Expected sales growth | Ratios |
| **Currency** | Estimated land cost | Financial amounts |
| **Measurement** | Buildable area in sqft | Physical quantities |
| **Date** | Expected completion | Timeline |
| **Single Choice** | Acquisition type: Purchase/JV/Lease | Fixed options |
| **Multiple Choice** | Required approvals | Multiple selections |
| **Checklist** | Legal documents needed | Task completion |
| **Text / Findings** | Lawyer's title observations | Narrative |
| **Formula / Calculated** | FAR / saleable area | Derived values |
| **Recommendation** | Proceed / Conditional / Reject | Decision |

### 4.3 Response-Type-Specific Configuration

**For Rating:**
```
Rating Scale
1  Very Poor
2  Poor
3  Acceptable
4  Good
5  Excellent

Weight          [ 10 ] %
Minimum         [ 3  ]
```

**For Pass / Fail:**
```
If Failed:

☑ Show warning
☑ Require explanation
☑ Require evidence
☑ Block final approval
```

**For Numeric (e.g., Expected IRR):**
```
Type              Percentage
Target            ≥ 20%

Warning           < 20%
Critical          < 15%

Source
○ Manual
○ Calculated
○ ERP Data
```

### 4.4 Critical / Deal-Breaker Rules

```
CRITERION: Clear Land Title

Department        Legal
Type              Pass / Fail
Required          Yes
Critical          YES

Rule:

IF result = FAIL
THEN overall feasibility cannot be APPROVED

Unless:
Management records an override with justification.
```

This prevents the "84/100 but defective title" problem — where a high aggregate score masks a critical failure.

---

## 5. Criterion Response Model

Every criterion response can contain:

```
Criterion Response
│
├── Answer / Value
├── Findings (narrative)
├── Recommendation
├── Risk Level
├── Confidence (High / Medium / Low)
├── Evidence (documents)
├── Data Source
├── Comments
└── Evaluator + Timestamp
```

Not every field appears every time. Configuration determines what is required per criterion.

---

## 6. Department Outputs — Findings AND Inputs

Each department evaluation produces two types of output:

```
                  DEPARTMENT EVALUATION
                          │
              ┌───────────┴───────────┐
              ▼                       ▼
          FINDINGS                 INPUTS
              │                       │
              │                       ▼
              │              Financial Model
              │
              ▼
       Risk / Decision
```

### Examples

**Marketing** → Finding: Demand = Strong. Input: Expected selling price = ৳14,500/sqft.

**Sales** → Finding: Absorption = Good. Inputs: Expected sales/month = 7 units, collection pattern.

**Engineering** → Finding: Site suitable. Inputs: Buildable area = 186,000 sqft, construction cost = ৳3,850/sqft.

**Legal** → Finding: Title clear subject to mutation. Risk: MEDIUM. Condition: Mutation must complete before registration.

**Finance** → Uses all department inputs to compute: Revenue, Cost, Cash Flow, Profit, Margin, IRR, NPV, Payback.

Department inputs flow into the financial model. If Engineering changes construction cost from ৳20M to ৳23M, the financial feasibility auto-updates with impact analysis.

---

## 7. Department Sign-off Workflow

Lightweight internal approval before results reach the feasibility committee.

```
Marketing Executive
      ↓
enters assessment
      ↓
Marketing Head
      ↓
reviews / returns / approves
      ↓
MARKETING ASSESSMENT LOCKED
      ↓
available to Feasibility Committee
```

Configurable per organization — not every company requires department-level sign-off.

---

## 8. Collaborative Feasibility in Action

### 8.1 Starting an Evaluation

```
START EVALUATION

Framework
[ Land Feasibility ▼ ]

Version
Feasibility #1

Coordinator
[ Karim Ahmed ▼ ]

Target Completion
[ 30 Aug 2026 ]

─────────────────────────────────────

8 areas · 42 criteria

Departments involved:

Marketing       8 criteria
Sales           5 criteria
Legal           9 criteria
Engineering    11 criteria
Finance         6 criteria
Management      3 criteria

[Start Evaluation]
```

### 8.2 Department View — My Work

Each department member sees only their assignments:

```
MY WORK

Gulshan Land
Land Feasibility

Engineering Assessment
7 of 11 complete

──────────────────────────────────

✓ Site accessibility
✓ Soil condition
✓ Utility availability
✓ Buildable area
✓ Construction constraints
✓ Preliminary design
✓ Construction period

○ Construction cost        [Evaluate →]
○ Foundation requirement   [Evaluate →]
○ Site preparation         [Evaluate →]
○ Technical risk           [Evaluate →]
```

### 8.3 Evaluating a Criterion

Every criterion evaluation captures five standardized things: assessment value, findings, evidence, risk, and recommendation.

```
EXPECTED SELLING PRICE

Gulshan Plot 07

Guidance
Review comparable projects, current asking prices,
recent transactions and company historical sales.

--------------------------------------------------

ASSESSMENT

Expected Price
[ ৳ 14,500 ] / sqft

Rating
[ Good ▼ ]

Risk
[ Low ▼ ]

--------------------------------------------------

FINDINGS

[ Comparable projects are currently selling between
  ৳13,800–15,200/sqft. Based on location and planned
  specification we recommend ৳14,500/sqft.            ]

--------------------------------------------------

EVIDENCE

+ Add Comparable Project
+ Upload Document
+ Attach Photo
+ Link ERP Data

--------------------------------------------------

RECOMMENDATION

● Accept
○ Accept with condition
○ Reconsider
○ Reject


[Save Draft]                         [Complete]
```

### 8.4 After Completion — Next Step

```
✓ Expected selling price completed.

Engineering Assessment is now 73% complete.

NEXT

Foundation requirement is still pending.

[Complete Foundation Requirement →]

                     or [Back to Assessment]
```

### 8.5 Coordinator View — Overall Progress

```
GULSHAN PLOT 07
FEASIBILITY

Overall Progress                         63%

------------------------------------------------------

AREA                         OWNER              STATUS

Legal & Title                Legal              90%   ⚠
Market Assessment            Marketing         100%  ✓
Sales Potential              Sales             100%  ✓
Development Potential        Engineering        60%
Project Cost                 Engineering        45%
Financial Feasibility        Finance             0%
Risk Assessment              Management          —

------------------------------------------------------

3 items need attention
2 critical findings

                         [View Findings]
```

---

## 9. Dependencies Between Departments

The architecture supports dependencies even if the first UI keeps it simple.

```
Financial Feasibility
        ↓ depends on

Engineering
    → Construction Area
    → Construction Cost
    → Development Duration

Sales
    → Selling Price
    → Sales Velocity

Land
    → Acquisition Cost

Finance
    → Financing Cost
```

When a dependency changes:

```
⚠ Engineering updated Construction Cost

$20.0M → $23.0M

Financial feasibility is now outdated.

Impact:
Expected Profit       ↓ $3.0M
Margin                24.1% → 20.8%
IRR                   22.6% → 18.9%

[Review Financial Model]
```

---

## 10. Due Diligence vs Feasibility

They are related but distinct:

| Aspect | Due Diligence | Feasibility |
|---|---|---|
| **Question** | Is what we're being told about this land true, legal, and acceptable? | Given everything we know, should we undertake this development? |
| **Nature** | Verification of facts | Evaluation of opportunity |
| **Output** | Pass / Fail / Conditional | Financial model + recommendation |
| **Timing** | During investigation | After DD, before acquisition |

DD results **feed** feasibility. Legal findings from DD become inputs to feasibility's Legal & Title area. No duplication.

```
LAND
 ↓
Initial Screening
 ↓
Investigation / Due Diligence
 ↓
             FEASIBILITY
                  │
     ┌────────────┼────────────┐
     ▼            ▼            ▼
   Legal       Marketing    Engineering
     │            │            │
     ├──── Sales ─┼── Finance ─┤
     │            │            │
     └────────────┼────────────┘
                  ▼
        Consolidated Assessment
                  ↓
             Scenarios
                  ↓
          Management Decision
            ↙     ↓      ↘
        Reject  Revise  Approve
                         ↓
                    Acquisition
```

---

## 11. AI Readiness

The configuration data becomes the instruction set for future AI agents.

```
             FEASIBILITY AGENT
                    │
       ┌────────────┼─────────────┐
       ▼            ▼             ▼
   Company      ERP Historical   Current
   Rules            Data          Inputs
       │            │             │
       └────────────┼─────────────┘
                    ▼
              Draft Analysis
                    │
                    ▼
            Human Department
               Review/Edit
                    │
                    ▼
              Head Approval
                    │
                    ▼
          Consolidated Feasibility
```

Each criterion's configuration provides:
- **What to investigate** (criterion name + question)
- **Why** (evaluation guidance — "how does your org normally evaluate this?")
- **What data is needed** (evidence expected)
- **How to interpret results** (thresholds, scales, deal-breakers)
- **What output format** (response type)
- **Explicit AI instructions** (optional field per criterion)

AI assists — it does not silently make investment decisions.

---

## 12. Cost Estimation Templates

### The Problem

At feasibility stage, engineers don't estimate every individual BOQ item. They estimate by **major construction categories** — foundation, reinforcement, bricks, concrete, etc. The level of detail increases as the project matures:

```
LAND FEASIBILITY
      ↓
Rough Cost / sqft                        (earliest, least precise)
      ↓
Major Component Estimate                 (feasibility-level)
Foundation + Steel + Concrete + Brick + MEP...
      ↓
Preliminary BOQ                          (planning stage)
      ↓
Detailed BOQ                             (estimation stage)
      ↓
Procurement / Actual Cost                (execution)
```

This gives AbcERP a powerful comparison chain later: **Feasibility Estimate → Approved BOQ → Procurement → Actual Cost** for every major category.

### 12.1 Configuration — Cost Estimation Templates

Located at: **Settings > Real Estate > Cost Estimation Templates**

Organizations define their own category list — the headings their engineers write on paper/Excel when estimating a new building before the BOQ exists.

```
COST ESTIMATION TEMPLATES

┌──────────────────────────────────────────────────────────────┐
│ Building Construction (Default)                 ACTIVE       │
│ 17 categories                                                │
│ Used for residential/commercial estimation                   │
│                                            [Configure →]     │
└──────────────────────────────────────────────────────────────┘

[+ Create Template]
```

### 12.2 Template Configuration

Engineers select which categories to include and set estimation methods per category.

```
BUILDING CONSTRUCTION TEMPLATE

Select categories for estimation. Drag to reorder.

STRUCTURAL
☑ ☰ Foundation / Piling
☑ ☰ Reinforcement (Rod/Rebar)
☑ ☰ Concrete (RCC)
☑ ☰ Formwork / Shuttering
☑ ☰ Brick / Block Work

FINISHING
☑ ☰ Plastering & Waterproofing
☑ ☰ Flooring & Tiles
☑ ☰ Doors & Windows
☑ ☰ Painting
☐ ☰ Wood / Joinery                    (optional — not all projects)

MEP
☑ ☰ Electrical Works
☑ ☰ Plumbing & Sanitary
☑ ☰ Fire Protection
☐ ☰ HVAC / Mechanical                 (optional — not all projects)
☑ ☰ Lift / Elevator

EXTERNAL & OTHER
☑ ☰ Site Preparation & Earthwork
☑ ☰ External / Site Development
☐ ☰ Utility & Services                (optional)
☑ ☰ Contingency

                         [+ Add Category]
```

### 12.3 Per-Category Estimation Method

Each category can have its own estimation approach:

**Quantity x Rate (most common):**

```
REINFORCEMENT

Department
Engineering

Estimation Method
[ Quantity × Rate ▼ ]

Quantity Basis
[ kg steel / sqft of construction ▼ ]

Default Consumption Rate
[ 4.2 ] kg/sqft

Rate Source
● Company historical rate
○ Material master (latest)
○ Latest purchase rate
○ Engineer entered

Current Rate
[ ৳ 105 ] / kg

────────────────────────────────────

For 186,000 sqft building:
Quantity: 781,200 kg
Cost: ৳82,026,000
```

**Lump Sum:**

```
FOUNDATION / PILING

Estimation Method
[ Lump Sum ▼ ]

or

[ Number of piles × Average cost/pile ]

or

[ Area × Historical rate/sqft ]
```

**Percentage of Total:**

```
CONTINGENCY

Estimation Method
[ % of Subtotal ▼ ]

Percentage
[ 7 ] %
```

### 12.4 Seeded Categories (Default Template)

| # | Category | Group | Default Estimation Method |
|---|---|---|---|
| 1 | Foundation / Piling | Structural | Area × rate or lump sum |
| 2 | Reinforcement (Rod/Rebar) | Structural | kg/sqft × rate/kg |
| 3 | Concrete (RCC) | Structural | cft/sqft × rate/cft |
| 4 | Formwork / Shuttering | Structural | % of structural cost |
| 5 | Brick / Block Work | Structural | Nos × rate/brick |
| 6 | Plastering & Waterproofing | Finishing | sqft × rate/sqft |
| 7 | Flooring & Tiles | Finishing | sqft × rate/sqft |
| 8 | Doors & Windows | Finishing | Count × avg cost |
| 9 | Painting | Finishing | sqft × rate/sqft |
| 10 | Electrical Works | MEP | sqft × rate/sqft or lump |
| 11 | Plumbing & Sanitary | MEP | sqft × rate/sqft or lump |
| 12 | Fire Protection | MEP | Lump sum or sqft × rate |
| 13 | Lift / Elevator | MEP | Count × cost/lift |
| 14 | Site Preparation & Earthwork | External | Lump sum |
| 15 | External / Site Development | External | Lump sum |
| 16 | Contingency | Other | % of subtotal (5-10%) |

All categories are editable. Organizations add/remove/rename based on what their engineers actually estimate.

### 12.5 How It Appears in Feasibility

When an engineer opens the Construction Cost criterion in a feasibility evaluation, they choose their estimation approach:

```
CONSTRUCTION COST ESTIMATE

Estimation Method
○ Cost / sqft (quick estimate)
● Major Component Estimate (recommended)
○ Import from existing BOQ

────────────────────────────────────────

Template: Building Construction
Construction Area: 186,000 sqft

STRUCTURAL
Foundation / Piling              ৳  80.0M
Reinforcement                    ৳  82.0M
Concrete (RCC)                   ৳  71.6M
Formwork                         ৳  42.0M
Brick / Block Work               ৳  38.0M
                                 ─────────
                                 ৳ 313.6M

FINISHING
Plastering & Waterproofing       ৳  22.0M
Flooring & Tiles                 ৳  35.0M
Doors & Windows                  ৳  28.0M
Painting                         ৳  18.0M
                                 ─────────
                                 ৳ 103.0M

MEP
Electrical                       ৳  32.0M
Plumbing & Sanitary              ৳  25.0M
Fire Protection                  ৳  14.0M
Lift (2 nos)                     ৳  16.0M
                                 ─────────
                                 ৳  87.0M

EXTERNAL & OTHER
Site Preparation                 ৳  12.0M
External Works                   ৳  15.0M
Contingency (7%)                 ৳  37.1M
                                 ─────────
                                 ৳  64.1M

════════════════════════════════════════
TOTAL CONSTRUCTION COST          ৳ 567.7M
Cost / sqft                      ৳ 3,052

────────────────────────────────────────

ⓘ Company average for similar projects: ৳3,150/sqft
  This estimate is 3.1% below average.

[Save Estimate]
```

### 12.6 Progressive Refinement

The same categories track through the project lifecycle:

```
                    Feasibility    Approved BOQ    Actual
                    ──────────     ───────────     ──────
Foundation          ৳80.0M         ৳82.5M          ৳84.1M
Reinforcement       ৳82.0M         ৳88.0M          ৳91.2M
Concrete            ৳71.6M         ৳70.0M          ৳69.8M
...

TOTAL              ৳567.7M        ৳592.0M         ৳431.0M (in progress)
```

This is the **Feasibility vs Actual** comparison that the domain spec requires at project closure.

---

## 13. Collaborative Workspace & Report Generation

**Central design principle:** Feasibility is not a form that one employee completes. It is a collaborative investment-decision workspace that continuously builds the final management report while the departments work.

```
Department Work → Assessment → Findings → Comments → Recommendation
      → Department Head Sign-off → Consolidated Report → Management Decision
```

Everything users do during evaluation becomes structured report content automatically.

### Tab Hierarchy Clarification

The Feasibility tab in the Land Workspace has two navigation levels:

```
Land Workspace > Feasibility
│
├── Level 1: Collaboration tabs (how people work together)
│   [Overview] [Assessments] [Financial Model] [Discussion] [Risks] [Report] [Activity]
│
└── Level 2: Financial Model data tabs (what data is entered — inside "Financial Model")
    [Summary] [Land] [Development] [Sales] [Costs] [Finance] [Scenarios]
```

- **Level 1** is covered in this section (13-15) — the collaboration system
- **Level 2** is covered in `02-land-workspace-design.md` section 3.3 — the financial model content
- The Financial Model auto-computes from department inputs (selling price from Marketing, velocity from Sales, construction cost from Engineering, financing from Finance)

### 13.1 Task Board — The Coordinator's View

When a feasibility study is created, the system generates a card/task for each section from the configured evaluation framework. The coordinator sees all sections as a task board and assigns each to a person or department.

```
GULSHAN PLOT 07
FEASIBILITY STUDY

Overall Status: IN PROGRESS
Target Date: 25 Aug 2026
Coordinator: Karim Ahmed

[Task Board] [Assessments] [Financial Model] [Discussion] [Risks] [Report] [Activity]

──────────────────────────────────────────────────────────────────────

TASK BOARD                                    8 sections · 42 criteria

NOT STARTED          IN PROGRESS          UNDER REVIEW          DONE
─────────────        ─────────────        ─────────────         ─────────

┌──────────────┐  ┌──────────────┐  ┌──────────────┐   ┌──────────────┐
│ Risk         │  │ Engineering  │  │ Legal        │   │ Marketing    │
│ Assessment   │  │ Assessment   │  │ Assessment   │   │ Assessment   │
│              │  │              │  │              │   │              │
│ ○ Unassigned │  │ Engineering  │  │ Legal Dept   │   │ Marketing    │
│              │  │ Eng. Karim   │  │ Adv. Rahim   │   │ Nadia Rahman │
│              │  │              │  │              │   │              │
│ 3 criteria   │  │ 11 criteria  │  │ 9 criteria   │   │ 8 criteria   │
│              │  │ ████░░ 60%   │  │ ████████ 80% │   │ ██████ 100%  │
│              │  │              │  │              │   │ ✓ Submitted  │
│ [Assign →]   │  │ [View →]     │  │ [View →]     │   │ [View →]     │
└──────────────┘  └──────────────┘  └──────────────┘   └──────────────┘

┌──────────────┐  ┌──────────────┐                     ┌──────────────┐
│ Financial    │  │ Project Cost │                     │ Sales        │
│ Feasibility  │  │              │                     │ Assessment   │
│              │  │ Engineering  │                     │              │
│ Finance Dept │  │ + Finance    │                     │ Sales Dept   │
│ ○ Unassigned │  │ Eng. Karim   │                     │ Tanvir Ali   │
│              │  │              │                     │              │
│ 5 criteria   │  │ 8 criteria   │                     │ 5 criteria   │
│ ⏳ Waiting   │  │ ████░ 45%    │                     │ ██████ 100%  │
│ for Eng.     │  │              │                     │ ✓ Submitted  │
│ [Assign →]   │  │ [View →]     │                     │ [View →]     │
└──────────────┘  └──────────────┘                     └──────────────┘
```

### 13.1.1 Task Card Detail

Clicking a card opens the full detail view. Shows status, assignment, progress, and communication.

**Assigned card:**

```
ENGINEERING ASSESSMENT

Gulshan Plot 07 · Land Feasibility

──────────────────────────────────────────────

STATUS              In Progress
PROGRESS            ████████░░░░ 60%  (7 of 11 criteria)
DEADLINE            22 Aug 2026

──────────────────────────────────────────────

ASSIGNMENT

Department          Engineering
Owner               Eng. Karim (Head — accountable)
Assigned To         Eng. Rafi (doing the work)
Reviewer            Eng. Karim (signs off)

[Reassign]  [Delegate]

──────────────────────────────────────────────

CRITERIA

✓ Site accessibility
✓ Soil condition
✓ Utility availability
✓ Buildable area
✓ Construction constraints
✓ Preliminary design
✓ Construction period

○ Construction cost                    [Evaluate →]
○ Foundation requirement               [Evaluate →]
○ Site preparation                     [Evaluate →]
○ Technical risk                       [Evaluate →]

──────────────────────────────────────────────

COMMENTS                               3

Karim (Coordinator) · 16 Aug
Please prioritize construction cost — Finance
is waiting for this to start their model.

    Eng. Karim · 16 Aug
    Working on it. Estimation template filled.
    Will submit by 20 Aug.

        Karim (Coordinator) · 16 Aug
        Thanks. Flag if you need rate data from
        procurement.

[Write a comment...]                   [Send]

──────────────────────────────────────────────

[View Full Assessment]
```

**Unassigned card:**

```
RISK ASSESSMENT

Gulshan Plot 07 · Land Feasibility

──────────────────────────────────────────────

STATUS              Not Started
PROGRESS            0%  (0 of 3 criteria)
DEADLINE            —

──────────────────────────────────────────────

ASSIGNMENT

This section has not been assigned yet.

Assign to Department
[ Select Department ▼ ]

Or assign directly to a person
[ Search people...                     ]

Suggested: Management (from framework default)

                              [Assign →]

──────────────────────────────────────────────

CRITERIA (preview)

○ Overall risk rating
○ Key risk factors
○ Risk mitigation recommendations
```

### 13.1.2 Assignment Rules

- **Only the assignee** (Assigned To) can edit the criteria and enter data
- **Owner** (usually department head) is accountable — reviews and signs off
- **Coordinator** can view everything, comment on any card, reassign, set deadlines
- **Reviewer** approves the section before it's marked complete
- **Delegation**: Owner can delegate to a team member — Owner stays accountable, delegate does data entry

```
DELEGATE

Engineering Assessment

Current Owner
Eng. Karim (Head of Engineering)

Delegate data entry to
[ Eng. Rafi ▼ ]

Eng. Karim remains the reviewer and accountable owner.
Eng. Rafi will be able to edit criteria and enter findings.

[Cancel]                              [Confirm Delegation]
```

### 13.1.3 Task Board Filters & Views

```
TASK BOARD

View: [ Board ▼ ]  [ List ]  [ By Department ]

Filter: [All ▼]  [Unassigned]  [Overdue]  [Waiting]
```

**List view:**

```
Section                  Department      Assignee         Status          Progress   Deadline

Marketing Assessment     Marketing       Nadia Rahman     ✓ Done          100%       18 Aug ✓
Sales Assessment         Sales           Tanvir Ali       ✓ Done          100%       18 Aug ✓
Legal Assessment         Legal           Adv. Rahim       Under Review    80%        20 Aug
Engineering Assessment   Engineering     Eng. Rafi        In Progress     60%        22 Aug
Project Cost             Eng + Finance   Eng. Karim       In Progress     45%        22 Aug
Risk Assessment          —               ○ Unassigned     Not Started     0%         —
Financial Feasibility    Finance         ○ Unassigned     ⏳ Waiting      0%         —

                                                          Overall: 67%
```

**By Department view:**

```
ENGINEERING                              2 sections · 19 criteria

  Engineering Assessment     Eng. Rafi        60%     In Progress
  Project Cost               Eng. Karim       45%     In Progress

MARKETING                               1 section · 8 criteria

  Marketing Assessment       Nadia Rahman     100%    ✓ Done

SALES                                   1 section · 5 criteria

  Sales Assessment           Tanvir Ali       100%    ✓ Done

LEGAL                                   1 section · 9 criteria

  Legal Assessment           Adv. Rahim       80%     Under Review

FINANCE                                 1 section · 5 criteria

  Financial Feasibility      ○ Unassigned     0%      ⏳ Waiting for Engineering

UNASSIGNED                              1 section · 3 criteria

  Risk Assessment            —                0%      Not Started
```

### 13.1.4 Notifications & Communication

The coordinator communicates with assignees through:

1. **Card comments** — inline discussion visible to everyone on that card
2. **Email notifications** — triggered on assignment, deadline approaching, status change
3. **@mentions** — tag specific people in comments
4. **Status changes** — automatic notifications when a dependency unblocks

```
NOTIFICATION TRIGGERS

Assignment          "You've been assigned Engineering Assessment for Gulshan Plot 07"
Deadline warning    "Engineering Assessment is due in 2 days"
Overdue             "Engineering Assessment is 3 days overdue"
Dependency ready    "Engineering submitted — Financial Feasibility can now start"
Comment             "Karim commented on your Engineering Assessment"
Returned            "Legal Assessment returned for revision — see comments"
Completed           "All sections complete — feasibility ready for report generation"
```

### 13.2 What Each Person Sees

**Coordinator** sees the full task board (13.1) — all sections, all statuses, can comment on anything.

**Assignee** sees only their card in **My Work** and can open it to edit:

```
MY WORK

Gulshan Plot 07
Engineering Assessment

Due: 22 Aug 2026
Delegated by: Eng. Karim

7 of 11 criteria complete

──────────────────────────────────

✓ Site accessibility
✓ Soil condition
✓ Utility availability
✓ Buildable area
✓ Construction constraints
✓ Preliminary design
✓ Construction period

○ Construction cost        [Evaluate →]
○ Foundation requirement   [Evaluate →]
○ Site preparation         [Evaluate →]
○ Technical risk           [Evaluate →]
```

**Department Head** sees their department's cards across all active feasibilities:

```
MY DEPARTMENT — Engineering

ACTIVE FEASIBILITIES

Gulshan Plot 07          2 sections    60% avg     Due 22 Aug
Bashundhara Plot 12      1 section     0%          Due 30 Aug
Uttara Plot 03           Not started   —           —
```

**Management** sees the consolidated progress (section 14 — Report).

### 13.3 Criterion Response — Five Things Captured

Every assessment item captures a standardized set of data:

```
EXPECTED SELLING PRICE

------------------------------------------------

ASSESSMENT

Expected Price
[ ৳ 14,500 ] / sqft

Rating
[ Good ▼ ]

Risk
[ Low ▼ ]

------------------------------------------------

FINDINGS

[ Nearby comparable projects are currently
  selling between ৳13,800–15,200 per sqft.

  Based on proposed specification and location,
  the recommended feasibility assumption is
  ৳14,500 per sqft.                         ]

------------------------------------------------

EVIDENCE

+ Add Comparable Project
+ Upload Document
+ Attach Photo
+ Link ERP Data

------------------------------------------------

RECOMMENDATION

● Accept
○ Accept with condition
○ Reconsider
○ Reject

------------------------------------------------

[Save Draft]                       [Complete]
```

### 13.4 Discussion — Comments Around Each Assessment

Cross-department discussion happens in-context, not via email/WhatsApp:

```
DISCUSSION                                         4 comments

Nadia — Marketing
14 Aug · 10:21 AM

We recommend ৳14,500/sqft based on five comparable
projects within approximately 2 km.

    Rahim — Finance
    14 Aug · 11:05 AM

    Can we justify this against the slower sales
    velocity in Project X?

        Nadia — Marketing
        14 Aug · 12:18 PM

        Yes. Project X is positioned differently.
        I've attached the comparison.

        📎 Competitor Comparison.xlsx


[Write a comment...]
@Mention someone                                  [Post]
```

**Important distinction — three types of content:**

| Type | Purpose | Goes in Report? |
|---|---|---|
| **Discussion** | Working conversation | No (unless promoted) |
| **Finding** | Formal assessment output | Yes — automatically |
| **Management Note** | Specifically for report | Yes — always |

Comments can be promoted:

```
[Convert to Finding]
[Add as Management Note]
```

This prevents messy internal chatter from appearing in the final report.

### 13.5 Department Assessment Summary

When a department finishes all criteria, the system generates a structured summary:

```
MARKETING ASSESSMENT SUMMARY

System-generated from completed assessments.

------------------------------------------------

MARKET OUTLOOK

Overall Rating                GOOD

Expected Selling Price        ৳14,500 / sqft
Expected Sales Velocity       6–8 units / month
Target Segment                Upper-middle income
Market Demand                 Strong
Competition                   Moderate

------------------------------------------------

KEY FINDINGS

• Strong residential demand in the target area.
• Five comparable developments identified.
• Recommended launch price: ৳14,500/sqft.
• Larger units may experience slower absorption.

------------------------------------------------

KEY RISKS

MEDIUM
Competitive supply expected during project launch.

LOW
Potential selling-price pressure during early phase.

------------------------------------------------

DEPARTMENT RECOMMENDATION

✓ PROCEED

Marketing believes the project has sufficient demand
at the proposed positioning and price.

------------------------------------------------

Prepared by
Nadia Rahman

[Edit Summary]             [Submit to Department Head]
```

### 13.6 Department Head Sign-off

```
MARKETING ASSESSMENT

Submitted by Nadia Rahman
Submitted: 18 Aug 2026

Recommendation: PROCEED

[Review Full Assessment]

------------------------------------------------

HEAD REVIEW

Comment

[ Market evidence supports the proposed positioning.
  Recommend proceeding using a conservative initial
  sales price assumption.                         ]

Decision

○ Return for Revision
● Approve Assessment

                         [Confirm]
```

After approval, the assessment is **locked**. The final report can safely represent Marketing's official position.

### 13.7 Cross-Department Dependencies

Finance can't finalize until Engineering provides construction cost:

```
FINANCE ASSESSMENT

Waiting for:

✓ Land Cost               Available
✓ Selling Price           Marketing — Approved
✓ Sales Velocity          Sales — Approved
✓ Development Area        Engineering — Approved
⚠ Construction Cost       Engineering — Pending

Finance cannot complete the financial model until
Engineering submits the construction cost estimate.
```

When Engineering completes:

```
🔔 Construction cost estimate is now available.

Engineering submitted:
৳3,850 / sqft
Estimated construction cost: ৳716.1M

[Review in Financial Model]
```

### 13.8 Issues & Risks Register

Cross-department issues that don't belong inside a single criterion:

```
OPEN ISSUES

CRITICAL

Title verification unresolved
Owner: Legal
Raised by: Legal · 12 Aug
Due: 21 Aug
Status: Open

[View Discussion]

------------------------------------------------

MEDIUM

Construction estimate exceeds initial assumption by 8%
Owner: Engineering + Finance
Status: Under Review

------------------------------------------------

LOW

Competitor launch may affect selling price
Owner: Marketing
Status: Monitoring
```

Any department can raise an issue. Issues use @mentions and assignments:

```
@Finance please review this assumption.
@Legal confirm whether this affects acquisition.

Assign to: [Ahmed ▼]
Due: [20 Aug]

[Create Task]
```

### 13.9 Activity Timeline

Complete audit trail of everything that happened:

```
ACTIVITY

Today

14:32  Finance updated Expected IRR: 21.8% → 19.6%
13:15  Engineering submitted Construction Cost Assessment
11:40  Legal raised Critical Issue: "Mutation documentation incomplete"
10:25  Marketing Head approved Market Assessment

Yesterday

16:45  Sales submitted Sales Assessment
14:10  Nadia attached competitor analysis

Filter: [All Activity ▼] Department | User | Comments | Changes | Approvals | Documents
```

---

## 14. Management Report — Auto-Generated

The report builds itself from department contributions. No one needs to prepare Word documents manually.

### 14.1 Report Status Page

```
FEASIBILITY REPORT

Gulshan Plot 07

Report Status
DRAFT — 4 of 5 departments approved

Last generated: 20 Aug 2026 · 4:22 PM

------------------------------------------------

REPORT SECTIONS

✓ Executive Summary
✓ Land Overview
✓ Marketing Assessment
✓ Sales Assessment
✓ Legal Assessment
⚠ Engineering Assessment — Awaiting approval
✓ Financial Assessment
✓ Major Risks
✓ Feasibility Scenarios
✓ Department Recommendations
✓ Management Decision

------------------------------------------------

[Preview Report]
```

### 14.2 Generated Report Structure

```
LAND DEVELOPMENT FEASIBILITY REPORT

Gulshan Plot 07 · Dhaka
Prepared: 22 Aug 2026

════════════════════════════════════════════════

1. EXECUTIVE SUMMARY

Overall Recommendation:        PROCEED WITH CONDITIONS

Expected Revenue               ৳1.82B
Expected Project Cost           ৳1.39B
Expected Profit                 ৳430M
Margin                          23.6%
IRR                             22.4%

Primary Condition:
Completion of outstanding mutation verification.

════════════════════════════════════════════════

2. LAND & PROJECT OVERVIEW

Land Area                       32 Katha
Expected Buildable Area         186,000 sqft
Expected Saleable Area          151,400 sqft
Acquisition Structure           Purchase

════════════════════════════════════════════════

3. MARKETING ASSESSMENT

Department Recommendation:      PROCEED

Market Demand                   Strong
Competition                     Moderate
Recommended Price               ৳14,500/sqft

Key Findings:
• Strong residential demand in the target area.
• Five comparable developments identified.
• Larger units may experience slower absorption.

Department Head Comment:
"Market evidence supports the proposed positioning..."

════════════════════════════════════════════════

4. SALES ASSESSMENT

Department Recommendation:      PROCEED

Expected Sales Velocity         6–8 units/month
Expected Sell-out Period        30 months

Key Findings:
...

════════════════════════════════════════════════

5. LEGAL ASSESSMENT

Department Recommendation:      PROCEED WITH CONDITIONS

Title                           Verified
Mutation                        Pending
Regulatory Risk                 Medium

Critical Condition:
Mutation must be completed before registration.

Head of Legal Comment:
...

════════════════════════════════════════════════

6. ENGINEERING ASSESSMENT

Foundation Estimate             ৳80.0M
Structural Estimate             ৳313.6M
MEP Estimate                    ৳87.0M
Construction Cost               ৳716M
Construction Period             36 months

Recommendation:                 PROCEED

════════════════════════════════════════════════

7. FINANCIAL FEASIBILITY

Revenue                         ৳1.82B
Cost                            ৳1.39B
Profit                          ৳430M
IRR                             22.4%
NPV                             ...
Payback                         4.2 years

════════════════════════════════════════════════

8. KEY RISKS & CONDITIONS

1. Mutation documentation — CRITICAL
2. Construction-cost volatility — MEDIUM
3. Competitive launch risk — LOW

════════════════════════════════════════════════

9. DEPARTMENT RECOMMENDATIONS

Marketing          ✓ PROCEED
Sales              ✓ PROCEED
Legal              ⚠ CONDITIONAL
Engineering        ✓ PROCEED
Finance            ✓ PROCEED

════════════════════════════════════════════════

10. MANAGEMENT DECISION

[ ] Approved
[ ] Approved with Conditions
[ ] Returned for Revision
[ ] Rejected

Management Comments:
...
```

### 14.3 Management Review Screen

Management sees a concise decision screen — they don't need to read the full report first:

```
MANAGEMENT REVIEW
Gulshan Plot 07

Overall Recommendation
            PROCEED WITH CONDITIONS

------------------------------------------------

FINANCIAL

Revenue               ৳1.82B
Cost                  ৳1.39B
Profit                 ৳430M
Margin                 23.6%
IRR                    22.4%

------------------------------------------------

DEPARTMENT VIEW

Marketing       ✓ PROCEED
Sales           ✓ PROCEED
Legal           ⚠ CONDITIONAL
Engineering     ✓ PROCEED
Finance         ✓ PROCEED

------------------------------------------------

KEY CONDITIONS

🔴 Mutation must be completed before registration.
🟠 Construction cost is 8% above initial estimate.
🟠 Selling price assumes premium positioning.

------------------------------------------------

[Read Full Report]

Management Comments
[                                                ]

[Return for Revision] [Reject] [Approve with Conditions] [Approve]
```

### 14.4 Report Versioning — Snapshots Are Sacred

If any department changes an assessment after a report is generated, the existing report version is preserved. A new version is created.

```
Feasibility V1
Submitted       20 Aug
Approved        22 Aug
LOCKED ✓

Feasibility V2
Created         4 Sep
Reason: Construction cost revision
Status: IN PROGRESS
```

Every version preserves:
- Department responses and criterion data
- Comments selected for report
- Evidence and documents
- Calculated financial values
- Recommendations and sign-offs
- Final management decision

This provides a complete audit trail for accountability at project closure (Feasibility vs Actual comparison).

---

## 15. Collaboration Data Model

Five core collaboration objects:

```
FeasibilityStudy
        │
        ├── DepartmentAssessment
        │       │
        │       ├── CriterionResponse
        │       │       ├── value / rating / amount
        │       │       ├── findings (text)
        │       │       ├── recommendation
        │       │       ├── risk level
        │       │       ├── confidence
        │       │       └── Evidence[] (documents, photos, links)
        │       │
        │       ├── DepartmentSummary (generated + editable)
        │       ├── DepartmentRecommendation
        │       └── DepartmentSignoff (head approval)
        │
        ├── DiscussionThread (per criterion or general)
        │       │
        │       └── Comment
        │               ├── author + timestamp
        │               ├── content
        │               ├── mentions (@user)
        │               ├── attachments
        │               └── includeInReport (boolean)
        │
        ├── Issue / Risk
        │       ├── severity (Critical / High / Medium / Low)
        │       ├── owner (department)
        │       ├── status (Open / Under Review / Resolved / Monitoring)
        │       └── linkedCriterion (optional)
        │
        ├── CostEstimate (linked to CostEstimationTemplate)
        │       └── CostEstimateLine[]
        │
        ├── FinancialModel (computed from department inputs)
        │
        ├── Scenario[]
        │
        ├── FeasibilityReportSnapshot (immutable per version)
        │       ├── generatedAt
        │       ├── sections[] (structured report content)
        │       └── status (DRAFT / SUBMITTED / APPROVED / REJECTED)
        │
        ├── ManagementDecision
        │       ├── decision (APPROVED / CONDITIONAL / REVISION / REJECTED)
        │       ├── comments
        │       ├── conditions[]
        │       └── approvedBy + timestamp
        │
        └── Version (V1, V2, ... — each locked after superseded)
```

### The Simple UX for Each Department Member

Each person only needs to understand:

```
MY ASSIGNMENT

1. What do I need to assess?        → criteria list
2. What information do I have?      → evidence, ERP data
3. What did I find?                 → findings
4. Is there a risk?                 → risk level
5. What do I recommend?             → recommendation
6. Submit.                          → department head reviews
```

The system handles everything else:
- Assignments and progress tracking
- Department contributions aggregation
- Evidence collection
- Comments and discussion threading
- Issue tracking
- Financial calculations from department inputs
- Department sign-offs
- Auto-generated management report
- Version control and audit trail

---

## 16. Comparable Projects & Market Intelligence

Marketing teams need structured competitor/comparable project data — not free-text findings. This becomes an organization-level knowledge base that grows over time.

### 16.1 Comparable Project Library (Organization-Level)

An org-wide database of competitor and comparable projects. Marketing adds projects as they discover them. Data is reused across multiple feasibility evaluations.

Located at: **Land > Market Intelligence** (or accessible from any feasibility assessment)

```
MARKET INTELLIGENCE

Comparable Projects                              142 projects

[+ Add Project]

Search projects...    [All Areas ▼]  [All Developers ▼]  [All Status ▼]

┌─────────────────────────────────────────────────────────────────────┐
│ Green Valley Heights                                                │
│ ABC Developers · Gulshan, Dhaka                                     │
│                                                                     │
│ 72 units · ৳14,200/sqft · 68% sold                                │
│ Under Construction · Expected Dec 2027                              │
│                                                                     │
│ Last updated: 3 days ago                         [View Details →]   │
├─────────────────────────────────────────────────────────────────────┤
│ Skyline Residences                                                  │
│ XYZ Properties · Gulshan, Dhaka                                     │
│                                                                     │
│ 96 units · ৳15,800/sqft · 41% sold                                │
│ Under Construction · Expected Mar 2028                              │
│                                                                     │
│ Last updated: 1 week ago                         [View Details →]   │
└─────────────────────────────────────────────────────────────────────┘
```

### 16.2 Add/Edit Comparable Project

```
ADD COMPARABLE PROJECT

PROJECT IDENTITY

Project Name *
[ Green Valley Heights                       ]

Developer *
[ ABC Developers                             ]

Location *
[ Gulshan, Dhaka                             ]

Distance from Our Site (if linked to a land)
[ 1.8 ] km

Status
[ Under Construction ▼ ]
  (Announced / Pre-Launch / Launching / Under Construction / 
   Ready / Handed Over / Stalled)

Expected Completion
[ Dec 2027 ]

──────────────────────────────────────────────

UNIT & PRICING

Total Units
[ 72 ]

Unit Sizes (sqft)
From [ 1,200 ]  To [ 2,400 ]

Selling Price / sqft *
[ ৳ 14,200 ]

Price Range
From [ ৳ 12,800 ]  To [ ৳ 16,500 ]

Booking Amount
[ 20 ] %

──────────────────────────────────────────────

SALES STATUS

Units Sold / Booked
[ 49 ] / [ 72 ]

Sales Start Date
[ Jan 2026 ]

Monthly Absorption (estimated)
[ 4 ] units/month

Inventory Remaining
[ 23 ] units

Price Trend
[ Stable ▼ ]
  (Rising / Stable / Declining / Discounting)

──────────────────────────────────────────────

SPECIFICATIONS & AMENITIES

Building Type
[ Residential ▼ ]

Floors
[ 14 ]

Amenities (select all)
☑ Lift        ☑ Generator    ☑ Parking
☑ Gym         ☐ Pool         ☑ Rooftop
☑ Guard       ☑ CCTV         ☐ Clubhouse
☑ Gas Line    ☐ Central AC   ☐ Smart Home

Finishing Quality
[ Standard ▼ ]
  (Economy / Standard / Premium / Luxury)

──────────────────────────────────────────────

NOTES & EVIDENCE

Notes
[ Strong presence in the area. Known for
  timely delivery. Premium positioning.      ]

+ Upload Brochure
+ Upload Price List
+ Upload Photo
+ Add Web Link

──────────────────────────────────────────────

Source
[ Broker Visit ▼ ]
  (Broker Visit / Direct Inquiry / Website / 
   REHAB Fair / News / Customer Feedback)

Last Verified
[ 10 Aug 2026 ]

[Cancel]                         [Save Project]
```

### 16.3 Using Comparables in Feasibility

When a marketing team member evaluates a criterion like "Expected Selling Price" or "Competition," they can link comparable projects from the library:

```
EVIDENCE

Linked Comparable Projects                     5 projects

┌──────────────────────────────────────────────────────────┐
│ Green Valley Heights    1.8 km    ৳14,200/sqft    68% sold│
│ Skyline Residences      2.1 km    ৳15,800/sqft    41% sold│
│ Horizon Tower           0.9 km    ৳13,500/sqft    82% sold│
│ Park View Heights       3.2 km    ৳14,800/sqft    55% sold│
│ Lakeshore Living        2.5 km    ৳16,200/sqft    33% sold│
└──────────────────────────────────────────────────────────┘

[+ Link Comparable Project]    [+ Add New Comparable]

Average Price:     ৳14,900/sqft
Price Range:       ৳13,500 – ৳16,200
Avg Sold:          55.8%
```

### 16.4 Market Comparison View (in Feasibility Report)

Auto-generated comparison of the proposed project vs linked comparables:

```
MARKET COMPARISON

                   Our Project    Avg Comparable    Range

Price/sqft         ৳14,500        ৳14,900           ৳13,500–16,200
Unit Size          1,400–2,200    1,200–2,400       —
Total Units        64             72 avg            48–96
Amenities          12/15          9/15 avg          —
Finishing          Premium        Standard avg      —
Distance           —              2.1 km avg        0.9–3.2 km

POSITIONING

Our price is 2.7% below market average.
Premium finishing at standard pricing = competitive advantage.

RISK INDICATORS

⚠ 3 of 5 comparables have >40% unsold inventory
⚠ 1 comparable showing price decline
✓ Strong absorption in closest comparable (Horizon Tower)
```

### 16.5 Data Model

```
ComparableProject (organization-level library)
        │
        ├── name, developer, location, coordinates
        ├── status, expectedCompletion
        ├── totalUnits, unitSizeRange, sellingPrice, priceRange
        ├── unitsSold, salesStartDate, monthlyAbsorption, priceTrend
        ├── buildingType, floors, amenities[], finishingQuality
        ├── notes, source, lastVerified
        ├── ComparableProjectDocument[] (brochures, price lists, photos)
        └── updatedBy, updatedAt

FeasibilityComparable (links comparable to a feasibility)
        ├── feasibilityStudyId
        ├── comparableProjectId
        └── distanceFromSite
```

Comparable project data is never deleted — it becomes historical market intelligence. Updates create an audit trail.

---

## 17. Country Neutrality

The core engine knows only: Criterion, Response, Evidence, Finding, Risk, Department, Assignee, Rule, Approval.

It does **not** embed:
- Bangladesh-specific land records (Khatian, Dag, Mouza)
- CDA/RAJUK rules
- Local legal terminology
- Fixed ideas of what "feasibility" contains

Country-specific requirements become **templates**, not code.

```
TEMPLATE LIBRARY

General Real Estate Development
Residential Development
Commercial Development

Country / Region Templates
──────────────────────────
Bangladesh
UAE
Saudi Arabia
United Kingdom
Canada
...

[Use Template]
```

Country packs augment the universal engine — they don't change it.

---

## 17. Seeded Templates

On setup, AbcERP seeds two default frameworks:

### Land Feasibility (Default Seed)

| Area | Department | Criteria Count |
|---|---|---|
| Location & Site | Development | 5 |
| Market Assessment | Marketing | 7 |
| Sales Potential | Sales | 5 |
| Legal & Title | Legal | 6 |
| Regulatory | Legal | 4 |
| Technical / Engineering | Engineering | 8 |
| Financial Feasibility | Finance | 5 |
| Risk Assessment | Management | 3 |

### Land Due Diligence (Default Seed)

| Area | Department | Criteria Count |
|---|---|---|
| Legal | Legal | 6 |
| Title | Legal | 5 |
| Survey | Engineering | 4 |
| Environmental | Engineering | 4 |
| Regulatory | Legal | 5 |
| Financial | Finance | 4 |
| Physical | Engineering | 3 |

All seeded content is editable. Organizations customize to match their methodology.
