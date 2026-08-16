# Land Workspace Design

**Purpose:** This document defines the complete Land workspace — from initial capture through investigation, feasibility, acquisition, to project conversion. Land is one of the 4 primary work areas in AbcERP Real Estate.

**Key Principle:** There is no separate Lead List, Opportunity List, Feasibility List, or Agreement List. It is **one Land Pipeline** with a workspace per land record.

---

## 1. Screen Index

| # | Screen | Section | Notes |
|---|---|---|---|
| **Pipeline** |
| 1 | Land List (Pipeline) | 2.1 | Cards with stage, milestones, next action |
| 2 | Add Land Form | 2.2 | Minimal fields, 60-second entry |
| 3 | Post-Add Success + Next Step | 2.2 | Guided next action |
| **Workspace — Overview** |
| 4 | Workspace Header + Tab Bar | 3.1 | Status, owner, tabs, reject/status actions |
| 5 | Overview Tab | 3.2 | Progress stepper, next step, attention, upcoming, activity |
| **Investigation** |
| 6 | Investigation Tab (checklist) | 4.1 | Site visits + DD items by category |
| 7 | Schedule Site Visit | 4.2 | Purpose, engineer, date, instructions |
| 8 | Post-Schedule Confirmation | 4.2 | Notification sent, task created |
| 9 | Record Site Visit (field report) | 4.3 | Findings, photos, conditions, issues, recommendation |
| 10 | Post-Visit Completion | 4.3 | Updated progress, next task |
| 11 | Site Visit History | 4.4 | All visits chronological with reports |
| 12 | Investigation Task Detail | 4.5 | Focused form for any checklist item |
| 13 | Post-Task Completion | 4.5 | Updated progress, next incomplete item |
| 14 | Qualification Decision | 4.6 | Quick go/no-go before investigation |
| **Feasibility** |
| 15 | Start Feasibility Study | 5.0 | Framework selector, coordinator, target date |
| 16 | Post-Create → Task Board (all unassigned) | 5.0 | All cards visible, assign each section |
| 17 | Task Board (in progress) | 5.1 | Kanban with live progress, list/dept views |
| 18 | Task Card Detail (assigned) | 5.1 | Status, assignee, criteria, comments |
| 19 | Task Card Detail (unassigned) | 5.1 | Department/person selector |
| 20 | Financial Model > Summary | 5.2 | KPIs, revenue/cost/profit, versions |
| 21 | Financial Model > Costs | 5.2 | Construction cost estimation |
| 22 | Financial Model > Scenarios | 5.2 | Variable testing, comparison |
| 23 | Management Approval View | 5.3 | Decision-focused summary for CEO |
| 24 | Post-Approval → Acquisition Type | 5.3 | Purchase or JV selection |
| **Acquisition** |
| 25 | Acquisition Tab — Purchase Path | 6.1 | Seller, milestones, payments, documents |
| 26 | Acquisition Tab — JV Path | 6.2 | Parties, share, compensation schedule |
| 27 | JV Entitlement Builder | 6.2 | Unit/parking allocation grid |
| 28 | Payment Milestone Detail | 6.3 | Breakdown, GL preview, payment action |
| 29 | Acquisition Complete | 6.4 | Summary, [Create Project] |
| **Supporting Tabs** |
| 30 | Costs Tab | 7 | Pre-dev GL expenses |
| 31 | Add Pre-Dev Expense | 7 | Vendor, category, amount, GL preview |
| 32 | Files Tab | 8 | Document vault, categories, missing alerts |
| 33 | Land Info Panel | 9 | Parcels, owners, physical characteristics |
| **Status & Exit** |
| 34 | Reject / Drop Land | 10 | Reason, financial impact |
| 35 | Post-Rejection | 10 | Confirmation, workspace read-only |
| **Project Conversion** |
| 36 | Create Project Form | 11 | Pre-filled, accounting, carry-forward checklist |
| 37 | Post-Project-Created | 11 | Confirmation, [Open Project Workspace] |

**Total: 37 screens/views**

---

## 2. Land Pipeline

### 2.1 Land List

The entry point. Each card shows the land's current stage, completed milestones, and what to do next.

```
LAND

[ + Add Land ]

Search land...             [All] [Active] [Need Attention] [Closed]

┌─────────────────────────────────────────────────────────────────────┐
│ Gulshan Plot 07                                      FEASIBILITY    │
│ Gulshan · 32 Katha                                                  │
│                                                                     │
│ Due Diligence      ✓ Complete                                      │
│ Feasibility        ● In Review                                     │
│                                                                     │
│ Next: Finance approval                                             │
│                                                   [Open →]          │
├─────────────────────────────────────────────────────────────────────┤
│ Bashundhara Plot 12                                  INVESTIGATION  │
│ Bashundhara · 48 Katha                                              │
│                                                                     │
│ Site Visit         ✓ Complete                                      │
│ Due Diligence      4 / 7                                           │
│                                                                     │
│ Next: Complete legal verification                                  │
│                                                   [Continue →]      │
├─────────────────────────────────────────────────────────────────────┤
│ Uttara Plot 03                                       NEW            │
│ Uttara Sector 10, Dhaka · 18 Katha                                  │
│                                                                     │
│ No activity yet                                                    │
│                                                                     │
│ Next: Schedule initial site visit                                  │
│                                                   [Start →]         │
├─────────────────────────────────────────────────────────────────────┤
│ Mirpur Plot 09                                       REJECTED       │
│ Mirpur, Dhaka · 22 Katha                                            │
│                                                                     │
│ Rejected: Title dispute found during due diligence                 │
│ Rejected by: Head of Legal · 02 Aug 2026                           │
│                                                   [View →]          │
└─────────────────────────────────────────────────────────────────────┘
```

#### Pipeline Stages

| Stage | Meaning | Advances When |
|---|---|---|
| NEW | Just captured, no activity | First site visit scheduled or DD started |
| INVESTIGATION | Site visits and/or due diligence in progress | Evaluation framework started |
| FEASIBILITY | Departments evaluating, financial model building | All departments submitted |
| APPROVAL | Feasibility complete, awaiting management | Approved or rejected |
| ACQUISITION | Approved, purchase/JV in progress | All milestones complete + project created |
| CONVERTED | Project created, workspace read-only | Terminal |
| REJECTED | Dropped at any stage with reason | Terminal (can reopen with justification) |

### 2.2 Add Land

Minimal fields. Details are added later in the workspace.

```
ADD LAND

Tell us about the land.

Land / Reference Name *
[ Gulshan Plot 07                         ]

Location *
[ Gulshan, Dhaka                          ]

Land Area *
[ 32          ] [ Katha ▼ ]

Expected Price
[ ৳ 450,000,000                           ]

Owner / Contact
[ Mr. Ahmed                               ]

Source
[ Broker ▼ ]
  (Broker / Direct Owner / Auction / Government / Referral)

Assigned To
[ Rahim ▼ ]

Notes
[ Referred by ABC broker. Owner willing
  to discuss JV.                          ]


             [Cancel]     [Save Land →]
```

#### After Save — Guided Next Step

```
✓ Land created

Gulshan Plot 07

We've created the land workspace.

Recommended next step:

        Schedule a site visit

        [Schedule Visit]

or

[Add Documents]      [Add Land Details]      [Start Investigation]
```

---

## 3. Land Workspace

The workspace is the container. Clicking [Open →] on any land card opens this. Every tab is a **parallel activity** — not a sequential step. The user can work on investigation and costs simultaneously.

### 3.1 Header + Tabs

Always visible. Shows current stage, key info, and available actions.

```
← Land

GULSHAN PLOT 07                              ● FEASIBILITY

Gulshan, Dhaka · 32 Katha
Owner: Mr. Ahmed · Source: Broker
Assigned: Rahim · Created: 05 Aug 2026

[Reject ▼]    [Change Status ▼]

────────────────────────────────────────────────────────────────────

Overview   Investigation   Feasibility   Acquisition   Costs   Files

────────────────────────────────────────────────────────────────────
```

### 3.2 Overview Tab

Answers five questions: Where am I? What stage? What happened? Anything wrong? What next?

```
PROGRESS

  ✓             ✓             ●              ○
Initial      Due          Feasibility     Acquisition
Review       Diligence

────────────────────────────────────────────────────────────────────

NEXT STEP

┌────────────────────────────────────────────────────────────────────┐
│ Feasibility needs management approval                             │
│                                                                    │
│ Expected Revenue     ৳1.82B       IRR              22.4%           │
│ Expected Cost        ৳1.39B       Profit Margin    23.6%           │
│ Expected Profit      ৳430M                                        │
│                                                                    │
│                           [Review Feasibility →]                   │
└────────────────────────────────────────────────────────────────────┘

ATTENTION

⚠ Mutation document hasn't been uploaded.                [Resolve]
⚠ Construction estimate is 8% above initial estimate.   [Review]

────────────────────────────────────────────────────────────────────

LAND SUMMARY

Area             32 Katha                  Expected Price    ৳450M
Location         Gulshan, Dhaka            Price/Katha       ৳14.06M
Parcels          2                         Owners            3

[View Full Details →]

────────────────────────────────────────────────────────────────────

UPCOMING

📅 18 Aug    Soil test visit · Eng. Karim            [View]
📅 21 Aug    Legal verification deadline              [View]

────────────────────────────────────────────────────────────────────

RECENT ACTIVITY

Today       Feasibility submitted by Karim
Yesterday   Finance updated construction cost
Aug 10      Due diligence completed
Aug 09      Survey report uploaded
Aug 07      2nd site visit — soil test findings attached
Aug 05      Land created by Rahim
```

---

## 4. Investigation

Accessible from the Investigation tab in the workspace. Investigation is a checklist — site visits and due diligence items organized by category. The system guides the user through what's done, what's pending, and what to do next.

### 4.1 Investigation Checklist

```
GULSHAN PLOT 07 > INVESTIGATION

Investigation                                  72% complete

Complete these checks before feasibility approval.

SITE VISITS                                    [+ Schedule Visit]
✓ Initial site visit                    07 Aug · Eng. Rahim
✓ Survey visit                          09 Aug · Surveyor Jamal
✓ Soil test visit                       12 Aug · Eng. Karim
○ Authority visit                       Scheduled 18 Aug           [View →]

LEGAL
✓ Ownership verified
✓ Title search
! Mutation verification                         [Complete →]

REGULATORY
✓ Zoning checked
○ Authority requirements                        [Start →]

FINANCIAL
✓ Initial land price verified

──────────────────────────────────────────────

Documents                                      14 files    [Manage →]
Issues                                          2 open     [View →]

──────────────────────────────────────────────

                         [Continue to Feasibility →]
```

### 4.2 Schedule Site Visit

From "+ Schedule Visit" button on the investigation tab.

```
SCHEDULE SITE VISIT

Gulshan Plot 07

Visit Purpose *
[ Soil Test ▼ ]
  (Initial Inspection / Survey / Soil Test / Environmental /
   Authority Requirements / Follow-up / Final Review)

Assigned To *
[ Eng. Karim ▼ ]

Additional Team Members
[ + Add person ]
  Surveyor Jamal

Visit Date *
[ 18 Aug 2026 ]

Visit Time
[ 11:00 AM ]

Instructions / Focus Areas
[ Check soil bearing capacity at proposed
  pile locations. Collect samples for lab
  testing. Note water table level.          ]

Notify
☑ Assigned engineer
☑ BD officer (Rahim)
☐ Project Director

[Cancel]                         [Schedule Visit →]
```

#### After Scheduling

```
✓ Site visit scheduled

Soil Test Visit
18 Aug 2026 · 11:00 AM
Assigned to: Eng. Karim

Notifications sent to:
• Eng. Karim
• Rahim (BD officer)

A task has been added to Eng. Karim's My Work.

[Schedule Another Visit]    [Back to Investigation]
```

### 4.3 Record Site Visit

When the engineer opens the scheduled visit from My Work or from the Investigation tab. This is where findings are captured after (or during) the visit.

```
RECORD SITE VISIT

Gulshan Plot 07
Soil Test Visit · 18 Aug 2026

──────────────────────────────────────────────

VISIT DETAILS

Visit Date              [ 18 Aug 2026 ]
Engineer                Eng. Karim
Purpose                 Soil Test
Duration                [ 2.5 ] hours

──────────────────────────────────────────────

FINDINGS

[ Soil bearing capacity is adequate for
  pile foundation. Water table at -8m.
  Two test bore holes completed.
  Lab samples collected — results in
  5 working days.                          ]

──────────────────────────────────────────────

PHOTOS

[📷 Upload]  [📷 Upload]  [📷 Upload]  [📷 Upload]

Photo 1: Bore hole location
Photo 2: Soil sample
Photo 3: Site access road
(uploaded inline with caption)

──────────────────────────────────────────────

SITE CONDITIONS

Weather                [ Clear ▼ ]
Access                 [ Good ▼ ]  (Good / Moderate / Difficult / Restricted)
Topography            [ Flat ▼ ]  (Flat / Gentle Slope / Steep / Uneven)
Surrounding           [ Residential ▼ ]
Flood Evidence        [ None ▼ ]  (None / Minor / Moderate / Severe)

──────────────────────────────────────────────

ISSUES FOUND

○ No issues
● Issues found

Issue 1
Description  [ Access road width may be insufficient
               for heavy equipment during piling      ]
Severity     [ Medium ▼ ]
Action       [ Discuss with contractor for
               alternative access plan                ]

[+ Add Another Issue]

──────────────────────────────────────────────

RECOMMENDATION

● Proceed
○ Proceed with conditions
○ Revisit needed
○ Not recommended

Conditions (if applicable)
[ Wait for lab results before confirming
  foundation design.                        ]

──────────────────────────────────────────────

FOLLOW-UP NEEDED?

☑ Schedule follow-up visit
  Purpose: [ Lab Results Review ▼ ]
  Suggested date: [ 25 Aug 2026 ]

[Save Draft]                [Complete Visit Report →]
```

#### After Completing Visit Report

```
✓ Site visit recorded

Soil Test Visit · 18 Aug 2026
Recommendation: PROCEED

Investigation updated:
• Soil test — marked complete
• 1 medium-severity issue logged
• Follow-up visit scheduled for 25 Aug

Investigation is now 78% complete.

NEXT

Mutation verification is still pending.

[Complete Mutation Verification →]

    or [Schedule Follow-up Visit]
    or [Back to Investigation]
```

### 4.4 Site Visit History

All visits for this land, chronological. Accessible from the investigation tab.

```
SITE VISIT HISTORY

Gulshan Plot 07                                3 completed · 1 scheduled

──────────────────────────────────────────────

📅 25 Aug 2026 · Lab Results Review               SCHEDULED
   Eng. Karim
   [View / Record →]

──────────────────────────────────────────────

✓ 12 Aug 2026 · Soil Test                         COMPLETED
  Eng. Karim · 2.5 hrs
  Recommendation: PROCEED
  Findings: Soil bearing capacity adequate. Water table -8m.
  Issues: 1 (medium — access road width)
  Photos: 3
  [View Full Report →]

──────────────────────────────────────────────

✓ 09 Aug 2026 · Survey Visit                      COMPLETED
  Surveyor Jamal · 4 hrs
  Recommendation: PROCEED
  Findings: Boundaries verified. Area confirmed 32.4 katha.
  Issues: 0
  Photos: 6
  [View Full Report →]

──────────────────────────────────────────────

✓ 07 Aug 2026 · Initial Inspection                COMPLETED
  Eng. Rahim · 1.5 hrs
  Recommendation: PROCEED WITH CONDITIONS
  Findings: Good location. Flat terrain. Utilities available.
  Condition: Verify boundary dispute on east side.
  Issues: 1 (low — boundary marker unclear)
  Photos: 4
  [View Full Report →]
```

### 4.5 Investigation Task Detail

Clicking any incomplete checklist item (e.g., "Mutation verification") opens a focused form.

```
MUTATION VERIFICATION

Status
[ Pending ▼ ]

Verified By
[ Select person ▼ ]

Verification Date
[ DD / MM / YYYY ]

Findings
[                                              ]

Documents
[ + Upload Mutation Document ]

Any issue?
○ No issue
● Issue found

Issue Severity
[ Medium ▼ ]

Notes
[                                              ]


[Save Draft]                         [Mark Complete]
```

#### After Completion

```
✓ Mutation verification completed.

Investigation is now 86% complete.

NEXT

Authority requirements are still pending.

[Complete Authority Check →]

                     or [Back to Investigation]
```

### 4.6 Qualification Decision

Optional quick go/no-go when a NEW land needs assessment before investing in investigation.

```
QUALIFICATION

Gulshan Plot 07
Status: NEW

Quick Assessment

Is the area developable?            [ Yes ▼ ]
Is the price within range?          [ Yes ▼ ]
Is the owner contactable?           [ Yes ▼ ]
Any immediate red flags?            [ No  ▼ ]

Notes
[ Good location. Broker confirmed owner
  willing to discuss. Price negotiable.   ]

Decision

● Qualify — proceed to investigation
○ Hold — revisit later
○ Reject — not suitable

[Confirm →]
```

#### After Qualification

```
✓ Land qualified

Gulshan Plot 07 is ready for investigation.

Recommended next step:

[Schedule Site Visit]    [Start Due Diligence]
```

---

## 5. Feasibility

Accessible from the Feasibility tab in the workspace. Feasibility is a **collaborative workspace** — multiple departments contribute assessments that build into a management report. Powered by the configurable Evaluation Framework Engine (see `03-evaluation-framework-design.md`).

Two navigation levels:

```
Level 1: Collaboration (how people work)
[Task Board] [Assessments] [Financial Model] [Discussion] [Risks] [Report] [Activity]

Level 2: Financial Model data (what data is entered — inside "Financial Model")
[Summary] [Land] [Development] [Sales] [Costs] [Finance] [Scenarios]
```

### 5.0 Starting a Feasibility — What Happens First

Triggered from Investigation tab's "Continue to Feasibility" button, or from the Feasibility tab when no study exists yet.

```
START FEASIBILITY STUDY

Gulshan Plot 07

Framework *
[ Land Feasibility ▼ ]
  (from configured evaluation frameworks)

Coordinator *
[ Karim Ahmed ▼ ]

Target Completion
[ 25 Aug 2026 ]

──────────────────────────────────────────────

This will create:

  8 evaluation sections
  42 criteria

Based on your "Land Feasibility" framework.
You can assign sections to departments after creation.

[Cancel]                    [Create Feasibility Study →]
```

#### After Creation — Lands on Task Board (All Cards Unassigned)

The coordinator's first job is to assign each section. This is the first screen they see.

```
GULSHAN PLOT 07 > FEASIBILITY

✓ Feasibility study created

Feasibility V1 · JUST CREATED
Coordinator: Karim Ahmed · Target: 25 Aug 2026

8 sections need to be assigned to departments or people.

[Task Board] [Assessments] [Financial Model] [Discussion] [Risks] [Report] [Activity]

──────────────────────────────────────────────────────────────────────

ALL UNASSIGNED — assign each section to get started

┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Marketing    │  │ Sales        │  │ Legal        │  │ Engineering  │
│ Assessment   │  │ Assessment   │  │ Assessment   │  │ Assessment   │
│              │  │              │  │              │  │              │
│ ○ Unassigned │  │ ○ Unassigned │  │ ○ Unassigned │  │ ○ Unassigned │
│ 8 criteria   │  │ 5 criteria   │  │ 9 criteria   │  │ 11 criteria  │
│              │  │              │  │              │  │              │
│ [Assign →]   │  │ [Assign →]   │  │ [Assign →]   │  │ [Assign →]   │
└──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘

┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Project Cost │  │ Financial    │  │ Risk         │  │ Location &   │
│              │  │ Feasibility  │  │ Assessment   │  │ Site         │
│              │  │              │  │              │  │              │
│ ○ Unassigned │  │ ○ Unassigned │  │ ○ Unassigned │  │ ○ Unassigned │
│ 8 criteria   │  │ 5 criteria   │  │ 3 criteria   │  │ 5 criteria   │
│              │  │              │  │              │  │              │
│ [Assign →]   │  │ [Assign →]   │  │ [Assign →]   │  │ [Assign →]   │
└──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘

                              [Assign All from Defaults →]
```

The "Assign All from Defaults" button uses the department defaults from the evaluation framework configuration — quick setup for organizations that always assign the same departments.

#### After Assignments — Task Board Shows Progress

Once cards are assigned and work begins, the board shows live progress:

```
GULSHAN PLOT 07 > FEASIBILITY

Feasibility V3 · IN PROGRESS
Coordinator: Karim Ahmed · Target: 25 Aug 2026

[Task Board] [Assessments] [Financial Model] [Discussion] [Risks] [Report] [Activity]

──────────────────────────────────────────────────────────────────────

View: [ Board ▼ ]  [ List ]  [ By Department ]
Filter: [All ▼]  [Unassigned]  [Overdue]  [Waiting]

NOT STARTED          IN PROGRESS          UNDER REVIEW          DONE
─────────────        ─────────────        ─────────────         ──────

┌──────────────┐  ┌──────────────┐  ┌──────────────┐   ┌──────────────┐
│ Risk         │  │ Engineering  │  │ Legal        │   │ Marketing    │
│ Assessment   │  │ Assessment   │  │ Assessment   │   │ Assessment   │
│              │  │              │  │              │   │              │
│ ○ Unassigned │  │ Engineering  │  │ Legal Dept   │   │ Marketing    │
│              │  │ Eng. Karim   │  │ Adv. Rahim   │   │ Nadia Rahman │
│ 3 criteria   │  │ 11 criteria  │  │ 9 criteria   │   │ 8 criteria   │
│              │  │ ████░░ 60%   │  │ ████████ 80% │   │ ██████ 100%  │
│ [Assign →]   │  │ [View →]     │  │ [View →]     │   │ ✓ Submitted  │
└──────────────┘  └──────────────┘  └──────────────┘   └──────────────┘

┌──────────────┐  ┌──────────────┐                     ┌──────────────┐
│ Financial    │  │ Project Cost │                     │ Sales        │
│ Feasibility  │  │              │                     │ Assessment   │
│              │  │ Eng + Fin    │                     │              │
│ Finance Dept │  │ Eng. Karim   │                     │ Sales Dept   │
│ ○ Unassigned │  │ ████░ 45%    │                     │ Tanvir Ali   │
│ ⏳ Waiting   │  │ [View →]     │                     │ ██████ 100%  │
│ [Assign →]   │  └──────────────┘                     │ ✓ Submitted  │
└──────────────┘                                       └──────────────┘
```

#### Task Card Detail — Assigned

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
    Working on it. Will submit by 20 Aug.

[Write a comment...]                   [Send]

──────────────────────────────────────────────

[View Full Assessment]
```

#### Task Card Detail — Unassigned

```
RISK ASSESSMENT

Gulshan Plot 07 · Land Feasibility

──────────────────────────────────────────────

STATUS              Not Started
PROGRESS            0%  (0 of 3 criteria)

──────────────────────────────────────────────

ASSIGNMENT

This section has not been assigned yet.

Assign to Department
[ Select Department ▼ ]

Or assign directly to a person
[ Search people...                     ]

Suggested: Management (from framework default)

Set Deadline
[ DD / MM / YYYY ]

                              [Assign →]

──────────────────────────────────────────────

CRITERIA (preview)

○ Overall risk rating
○ Key risk factors
○ Risk mitigation recommendations
```

#### List View

```
Section                  Department      Assignee         Status          Progress   Deadline

Marketing Assessment     Marketing       Nadia Rahman     ✓ Done          100%       18 Aug ✓
Sales Assessment         Sales           Tanvir Ali       ✓ Done          100%       18 Aug ✓
Legal Assessment         Legal           Adv. Rahim       Under Review    80%        20 Aug
Engineering Assessment   Engineering     Eng. Rafi        In Progress     60%        22 Aug
Project Cost             Eng + Finance   Eng. Karim       In Progress     45%        22 Aug
Risk Assessment          —               ○ Unassigned     Not Started     0%         —
Financial Feasibility    Finance         ○ Unassigned     ⏳ Waiting      0%         —
```

#### Full Collaboration System → `03-evaluation-framework-design.md`

The task board shown above is the entry point. The complete collaboration workflow is documented in Doc 03:

| What | Doc 03 Section | Description |
|---|---|---|
| Task Board details | 13.1 | Board/list/department views, card states, filters |
| Card assignment model | 13.1.1–13.1.2 | Owner/assignee/reviewer, delegation, edit permissions |
| Notifications | 13.1.4 | Assignment, deadline, dependency, overdue triggers |
| What each role sees | 13.2 | Coordinator vs assignee vs dept head vs management |
| Criterion evaluation form | 13.3 (was 8.3) | 5-part: assessment + findings + evidence + risk + recommendation |
| Discussion threads | 13.4 | Per-criterion comments, @mentions, "convert to finding" |
| Department summary | 13.5 | Auto-generated from completed criteria, editable |
| Department head sign-off | 13.6 | Review → return/approve → section locked |
| Cross-department dependencies | 13.7 | Waiting indicators, unblock notifications |
| Issues & risks register | 13.8 | Severity, owner, status, linked criteria |
| Activity timeline | 13.9 | Full audit trail, filterable |
| Auto-generated report | 14 | 10-section management report from department inputs |
| Management review & decision | 14.3 | Decision screen with 4 options |
| Report versioning | 14.4 | Immutable snapshots per version |

### 5.2 Financial Model

The Financial Model tab computes from department inputs. Marketing provides selling price, Sales provides velocity, Engineering provides construction cost, Finance assembles the model. When any input changes, impact shows immediately.

#### Summary Sub-tab

```
GULSHAN PLOT 07 > FEASIBILITY > FINANCIAL MODEL

[Summary] [Land] [Development] [Sales] [Costs] [Finance] [Scenarios]

PROJECT SUMMARY

Land Area                         32 Katha
Buildable Area                    186,000 sqft
Saleable Area                     151,400 sqft

Expected Revenue                  ৳1.82 B
Total Project Cost                ৳1.39 B
──────────────────────────────────────────
Expected Profit                   ৳430 M

Margin                            23.6%
IRR                               22.4%
Payback                           4.2 yrs

⚠ Construction cost increased 7.2% from V2.

[Compare Versions]       [Run Scenario]

                               [Submit for Approval →]
```

#### Costs Sub-tab — Construction Estimation

```
CONSTRUCTION COST

Estimated Construction Area
[ 186,000 ] sqft

Cost / sqft
[ ৳ 3,850 ]

ⓘ Based on the average of 4 similar projects.
  [See calculation]

────────────────────────────────────────

Calculated Construction Cost

৳716,100,000

Previous feasibility:
৳665,400,000

▲ ৳50,700,000 (+7.6%)

IMPACT

Expected Profit       ↓ ৳50.7M
Margin                26.4% → 23.6%
IRR                   24.8% → 22.4%
```

See `03-evaluation-framework-design.md` section 12 for the full Cost Estimation Template system.

#### Scenarios Sub-tab

```
SCENARIOS

BASE CASE
Profit       ৳430M
Margin       23.6%
IRR          22.4%

──────────────────────────────────────────────

Test a change

What would you like to change?

[ Construction cost +10%                  ▼ ]

                    [Run Scenario]


RESULT

                 Base          Scenario

Revenue          ৳1.82B        ৳1.82B
Cost             ৳1.39B        ৳1.46B
Profit           ৳430M         ৳358M
Margin           23.6%         19.7%
IRR              22.4%         18.9%

⚠ IRR falls below company's target of 20%.

[Save Scenario]
```

### 5.3 Management Approval

CEO/Management gets a decision-focused view — not the full feasibility detail.

```
FEASIBILITY APPROVAL

Gulshan Plot 07

                    RECOMMENDATION
                       PROCEED

──────────────────────────────────────────────

FINANCIAL SUMMARY

Expected Revenue                     ৳1.82B
Expected Cost                        ৳1.39B
Expected Profit                      ৳430M

Margin                               23.6%
IRR                                  22.4%
Expected Duration                    36 months (Sep 2026 – Dec 2029)
Payback Period                       4.2 years

──────────────────────────────────────────────

COST BREAKDOWN

Land Acquisition                     ৳450M      32%
Construction                         ৳716M      52%
Marketing & Sales                    ৳ 56M       4%
Finance Cost                         ৳ 84M       6%
Overhead Allocation                  ৳ 42M       3%
Contingency (5%)                     ৳ 42M       3%
────────────────────────────────────────────
Total Project Cost                   ৳1.39B     100%

──────────────────────────────────────────────

KEY RISKS

MEDIUM    Mutation documentation
LOW       Construction cost volatility

─────────────────────────────────────────────────────

SCENARIO RANGE

                 Conservative     Base      Optimistic

Profit             ৳290M          ৳430M       ৳540M
IRR                  17%           22.4%        27%

─────────────────────────────────────────────────────

DEPARTMENT RECOMMENDATIONS

Marketing          ✓ PROCEED
Sales              ✓ PROCEED
Engineering        ✓ PROCEED
Legal              ⚠ PROCEED WITH CONDITIONS
Finance            ✓ PROCEED

─────────────────────────────────────────────────────

[View Full Study]

[Return for Revision]    [Reject]    [Approve with Conditions]    [✓ Approve]
```

#### After Approval — Acquisition Type Selection

```
✓ FEASIBILITY APPROVED

Gulshan Plot 07 is approved for acquisition.

Approved baseline:

Land Cost          ৳450M
Project Cost       ৳1.39B
Revenue            ৳1.82B
Target Profit      ৳430M
IRR                 22.4%


NEXT STEP

How will the land be acquired?

┌────────────────────┐    ┌────────────────────┐
│                    │    │                    │
│     PURCHASE       │    │        JV          │
│                    │    │                    │
│ Pay landowner      │    │ Share development │
│ agreed price       │    │ with landowner     │
│                    │    │                    │
│   [Select →]       │    │   [Select →]       │
└────────────────────┘    └────────────────────┘
```

---

## 6. Acquisition

Accessible from the Acquisition tab. Milestone-driven with integrated payment actions. Two paths: Purchase or JV.

### 6.1 Purchase Path

```
ACQUISITION

Gulshan Plot 07
PURCHASE · ৳450M

──────────────────────────────────────────────

SELLER

Name          Mr. Ahmed Hossain
NID           19XX-XXXX-XXXX
Phone         01XXX-XXXXXX
Address       House 12, Road 5, Gulshan

──────────────────────────────────────────────

MILESTONES

✓ Token paid                ৳10M       05 Aug 2026
✓ Agreement signed                     12 Aug 2026
● Registration              ৳35M       Due 28 Aug 2026       [Pay →]
○ Mutation                             —
○ Possession                           —

──────────────────────────────────────────────

PAYMENT SUMMARY

Agreed Price         ৳450,000,000
Token Paid           ৳ 10,000,000
Registration         ৳ 35,000,000   (stamp duty + reg fee)
Remaining            ৳405,000,000   (3 instalments)

──────────────────────────────────────────────

NEXT ACTION

Registration payment of ৳35M is due 28 Aug.

[Create Payment Requisition →]

──────────────────────────────────────────────

DOCUMENTS

✓ Agreement (signed)                    [View]
✓ Title Documents                       [View]
! Registration Deed — not yet uploaded  [Upload]

[+ Add Document]
```

### 6.2 JV Path

```
ACQUISITION

Gulshan Plot 07
JOINT VENTURE

──────────────────────────────────────────────

PARTIES

Landowner     Mr. Ahmed Hossain       60% land contribution
Developer     ABC Properties Ltd.     40% construction

──────────────────────────────────────────────

SHARE ALLOCATION

                          Landowner    Developer    Total

Residential Units         8            28           36
Commercial Units          2            6            8
Parking                   10           30           40
Cash Compensation         ৳20M         —            —

[Edit Allocation →]    [Open Entitlement Builder →]

──────────────────────────────────────────────

MILESTONES

✓ JV Agreement signed                  12 Aug 2026
✓ Deed of Agreement registered         18 Aug 2026
✓ Cash — 1st tranche   ৳5M    On signing            Paid 12 Aug
○ Cash — 2nd tranche   ৳8M    On slab L3            Pending
○ Cash — 3rd tranche   ৳7M    On handover           Pending
○ Unit allocation finalized            After project creation

──────────────────────────────────────────────

GL IMPACT

Dr  Land — JV Contribution (Asset)     ৳270M
  Cr  Landowner Equity (Partner Capital)  ৳270M

──────────────────────────────────────────────

DOCUMENTS

✓ JV Agreement
✓ Deed of Agreement
○ Unit Allocation Schedule — pending project creation

[+ Add Document]
```

#### JV Entitlement Builder

```
JV ENTITLEMENT BUILDER

Agreed: Landowner 60% · Developer 40%

──────────────────────────────────────────────

ALLOCATION SUMMARY

                    Agreed    Allocated    Balance

Landowner Units     8         6            2 remaining
Developer Units     28        28           ✓
Landowner Parking   10        8            2 remaining
Cash Compensation   ৳20M      ৳5M paid    ৳15M remaining

──────────────────────────────────────────────

UNIT ALLOCATION

Floor   Unit A         Unit B         Unit C         Unit D

10F     [ Developer ▼] [ Developer ▼] [ Landowner ▼] [ Developer ▼]
9F      [ Developer ▼] [ Developer ▼] [ Landowner ▼] [ Developer ▼]
...
1F      [ Landowner ▼] [ Developer ▼] [ Landowner ▼] [ Developer ▼]
GF      [ Landowner ▼] [ Developer ▼] [ Landowner ▼] [ Developer ▼]

──────────────────────────────────────────────

PARKING

B1-01 [L]  B1-02 [D]  B1-03 [D]  B1-04 [L]  B1-05 [D]
B1-06 [D]  B1-07 [L]  B1-08 [D]  B1-09 [D]  B1-10 [L]

L = Landowner  D = Developer  (toggle by clicking)

──────────────────────────────────────────────

⚠ 2 residential units and 2 parking spots still unallocated.

[Reset to Default]              [Save Allocation]
```

### 6.3 Payment Milestone Detail

Opened by clicking [Pay →] on any milestone.

```
PAYMENT — Registration

Gulshan Plot 07

Milestone: Registration
Amount Due: ৳35,000,000
Due Date: 28 Aug 2026

──────────────────────────────────────────────

BREAKDOWN

Stamp Duty (3%)          ৳13,500,000
Registration Fee         ৳ 5,000,000
Mutation Fee             ৳   500,000
Balance to Seller        ৳16,000,000
────────────────────────────────────
Total                    ৳35,000,000

──────────────────────────────────────────────

GL PREVIEW

Dr  Land & Site Development (Asset)    ৳35,000,000
  Cr  Cash / Bank                         ৳35,000,000

──────────────────────────────────────────────

Payment Mode
[ Bank Transfer ▼ ]

Bank Account
[ ABC Properties — SCB Current ▼ ]

Reference
[ DD/Cheque No.                          ]

[Cancel]              [Create Payment Requisition →]
```

### 6.4 Acquisition Complete

When all milestones are done:

```
LAND ACQUISITION COMPLETE ✓

Gulshan Plot 07

All required acquisition milestones are complete.

──────────────────────────────────────────────

PAYMENT RECONCILIATION

Agreed Price              ৳450,000,000
Token Paid                ৳ 10,000,000     ✓ 05 Aug
Registration Costs        ৳ 35,000,000     ✓ 28 Aug
Instalment 1              ৳135,000,000     ✓ 15 Sep
Instalment 2              ৳135,000,000     ✓ 15 Oct
Instalment 3              ৳135,000,000     ✓ 15 Nov
────────────────────────────────────────────
Total Paid                ৳450,000,000     ✓ Fully settled

──────────────────────────────────────────────

SUMMARY

Pre-development spending       ৳8.4M
Approved feasibility           V3
Documents                      37
Open issues                    0

──────────────────────────────────────────────

Ready to begin development.

                   [Create Project →]
```

---

## 7. Costs Tab

Tracks all pre-development spending. Every payment hits the GL. This replaces the standalone "Opportunity" page.

```
GULSHAN PLOT 07 > COSTS

Pre-Development Expenses                    Total: ৳8,420,000

[+ Add Expense]                             [Export]

Date         Description               Category        Amount       Status

12 Aug       Legal opinion — Title      Legal           ৳150,000     ✓ Posted
09 Aug       Survey & mapping           Survey          ৳280,000     ✓ Posted
08 Aug       Soil test — 3 bore holes   Engineering     ৳420,000     ✓ Posted
05 Aug       Broker commission          Acquisition     ৳5,000,000   ✓ Posted
05 Aug       Site visit expenses        Travel          ৳ 20,000     ✓ Posted
02 Aug       Land valuation report      Finance         ৳250,000     ✓ Posted
01 Aug       Initial legal check        Legal           ৳100,000     ✓ Posted
28 Jul       Architectural concept      Engineering     ৳2,200,000   ✓ Posted
                                                        ──────────
                                                        ৳8,420,000

GL SUMMARY

Cost Center: Pre-Development — Gulshan Plot 07
All expenses posted to P&L.
On project conversion, these can be reclassified to Project WIP.
```

#### Add Pre-Dev Expense

```
ADD EXPENSE

Date *
[ 12 Aug 2026 ]

Description *
[ Legal opinion — Title verification      ]

Category *
[ Legal ▼ ]
  (Legal / Survey / Engineering / Acquisition / Travel /
   Finance / Architectural / Environmental / Regulatory)

Vendor / Payee
[ Ahmed & Associates Law Firm ▼ ]

Amount *
[ ৳ 150,000 ]

Payment Mode
[ Bank Transfer ▼ ]

Reference
[                                          ]

Attach Receipt
[ + Upload ]

──────────────────────────────────────────────

GL PREVIEW

Dr  Pre-Development Expense — Legal    ৳150,000
  Cr  Cash / Bank                         ৳150,000

──────────────────────────────────────────────

APPROVAL

Approval required for expenses above ৳100,000.
This expense requires approval before GL posting.

Approver
[ Project Director ▼ ]

[Cancel]                         [Submit for Approval →]

ⓘ Expenses under ৳100,000 can be posted directly.
  Threshold is configurable in Settings > Approval Workflows.
```

---

## 8. Files Tab

Centralized document vault. Documents carry forward to the Project workspace after conversion.

```
GULSHAN PLOT 07 > FILES

37 documents                                [+ Upload]

Search files...    [All Types ▼]    [All Categories ▼]

──────────────────────────────────────────────

LAND DOCUMENTS
  📄 Sale Deed (Original)               Legal       12 Aug    [View]
  📄 Khatian (RS)                        Legal       09 Aug    [View]
  📄 Khatian (BS)                        Legal       09 Aug    [View]
  📄 Dag Map                             Survey      09 Aug    [View]
  📄 Mutation Certificate                Legal       —         ⚠ Missing
  📄 NOC — CDA                          Regulatory   —         ⚠ Missing

SURVEY & ENGINEERING
  📄 Land Survey Report                  Survey      09 Aug    [View]
  📄 Soil Test Report                    Engineering 15 Aug    [View]
  📄 Topographic Map                     Survey      09 Aug    [View]

AGREEMENTS
  📄 Purchase Agreement (signed)         Legal       12 Aug    [View]
  📄 Token Receipt                       Finance     05 Aug    [View]

SITE VISIT REPORTS
  📄 Initial Visit — 07 Aug              Site Visit  07 Aug    [View]
  📄 Survey Visit — 09 Aug               Site Visit  09 Aug    [View]
  📄 Soil Test Visit — 12 Aug            Site Visit  12 Aug    [View]

FEASIBILITY
  📄 Feasibility Report V3               Feasibility 20 Aug   [View]
  📄 Competitor Analysis — Marketing     Feasibility 14 Aug   [View]

OTHER
  📄 Site Photos (12 photos)             Photos      Various   [View]
  📄 Architectural Concept               Design      28 Jul    [View]

──────────────────────────────────────────────

⚠ 2 required documents missing:
  • Mutation Certificate
  • NOC — CDA

[Upload Missing Documents]
```

---

## 9. Land Info Panel

Accessible from Overview tab's "View Full Details" link, or as a slide-out panel.

```
LAND DETAILS

Gulshan Plot 07

──────────────────────────────────────────────

LOCATION

District             Dhaka
Thana                Gulshan
Mouza                Gulshan Model Town
Address              Plot 07, Block C, Road 12

──────────────────────────────────────────────

PARCELS                                    2 parcels

Parcel 1
  RS Khatian     1234        BS Khatian     5678
  SA Dag         456         BS Dag         789
  Area           22 Katha    Land Type      Residential
  JL No          12
  [Edit]

Parcel 2
  RS Khatian     1235        BS Khatian     5679
  SA Dag         457         BS Dag         790
  Area           10 Katha    Land Type      Residential
  [Edit]

[+ Add Parcel]

──────────────────────────────────────────────

OWNERS                                     3 owners

Mr. Ahmed Hossain          Sole Owner       60%
  NID: 19XX-XXXX-XXXX · Phone: 01XXX-XXXXXX
  [Edit]

Mrs. Fatema Hossain        Joint Owner      25%
  NID: 19XX-XXXX-XXXX · Phone: 01XXX-XXXXXX
  [Edit]

Mr. Jamal Hossain          Inherited        15%
  NID: 19XX-XXXX-XXXX · Phone: 01XXX-XXXXXX
  [Edit]

Total Share: 100% ✓

[+ Add Owner]

──────────────────────────────────────────────

PHYSICAL CHARACTERISTICS

Frontage Road        40 ft road (west side)
Road Width           12 meters
Elevation            Standard
Soil Type            Alluvial (per soil test)
Flood Risk           None
Encumbrance          None identified

[Edit Details]
```

---

## 10. Rejection & Status Changes

#### Reject / Drop Land

Available from the workspace header at any stage.

```
REJECT LAND

Gulshan Plot 07
Current Stage: INVESTIGATION

──────────────────────────────────────────────

Reason for Rejection *
[ Title Dispute ▼ ]
  (Title Dispute / Price Too High / Area Not Suitable /
   Legal Issues / Regulatory Block / Owner Uncooperative /
   Better Alternative Found / Market Conditions / Other)

Details *
[ Title search revealed disputed ownership on
  Parcel 2. Legal team advises not to proceed.  ]

Rejected By
[ Head of Legal ▼ ]

──────────────────────────────────────────────

FINANCIAL IMPACT

Pre-development costs incurred: ৳3,200,000

These costs will remain as corporate expense
(P&L — Pre-Development Expense).

──────────────────────────────────────────────

[Cancel]                         [Confirm Rejection →]
```

#### After Rejection

```
✓ LAND REJECTED

Gulshan Plot 07

Rejected: Title Dispute
By: Head of Legal · 15 Aug 2026

Pre-development costs of ৳3.2M remain on P&L.

The land workspace is now read-only.

[View Workspace]    [Back to Land Pipeline]
```

---

## 11. Project Conversion

The end of the land lifecycle. Most information carries forward automatically.

#### Create Project Form

```
CREATE PROJECT

Most information has been carried forward from the land.

Project Name *
[ Gulshan Residence                    ]

Project Code *
[ GR-2026-01                           ]

Expected Start
[ 01 Sep 2026 ]

Expected Completion
[ 31 Dec 2029 ]

Accounting

Responsibility Center
[ Real Estate Development ▼ ]

Cost Center
[ Gulshan Residence ▼ ]

Profit Center
[ Gulshan Residence ▼ ]


Automatically carry forward:

✓ Approved feasibility (V3)
✓ Land acquisition cost (৳450M)
✓ Pre-development costs (৳8.4M)
✓ 37 documents
✓ JV / agreement terms
✓ Project assumptions


Transfer pre-development costs?

● Transfer to Project WIP (Dr Pre-Construction WIP / Cr Pre-Dev Expense)
○ Keep as corporate expense


                        [Create Project →]
```

#### After Project Created

```
✓ PROJECT CREATED

Gulshan Residence (GR-2026-01)

Carried forward:
• Approved feasibility V3
• Land cost ৳450M
• Pre-dev costs ৳8.4M transferred to WIP
• 37 documents linked
• JV terms and entitlements

Land workspace (Gulshan Plot 07) is now read-only.

[Open Project Workspace →]
```

---

## 12. Flow Summary

```
2. LAND PIPELINE
    │
    ├── [+ Add Land] → 2.2 Add Form → Post-save next step
    │
    └── [Open →] → 3. LAND WORKSPACE
                        │
                        ├── 3.2 Overview
                        │     (progress, attention, upcoming, activity)
                        │     [View Full Details →] → 9. Land Info
                        │
                        │   ┌──────── PARALLEL TABS ────────┐
                        │   │ (work on any tab at any time)  │
                        │   │                                │
                        ├───┤── 4. Investigation             │
                        │   │     ├── Checklist              │
                        │   │     ├── Site Visits            │
                        │   │     │   (schedule, record,     │
                        │   │     │    history)               │
                        │   │     └── Task Details            │
                        │   │                                │
                        ├───┤── 5. Feasibility               │
                        │   │     ├── Task Board             │
                        │   │     │   (assign sections)      │
                        │   │     ├── Financial Model        │
                        │   │     │   (summary, costs,       │
                        │   │     │    scenarios)             │
                        │   │     └── 5.3 Approval           │
                        │   │         → Purchase or JV       │
                        │   │                                │
                        ├───┤── 6. Acquisition               │
                        │   │     ├── Purchase or JV         │
                        │   │     ├── Entitlement Builder    │
                        │   │     ├── Payment Milestones     │
                        │   │     └── Complete               │
                        │   │         → [Create Project]     │
                        │   │                                │
                        ├───┤── 7. Costs                     │
                        │   │     (pre-dev GL expenses)      │
                        │   │                                │
                        ├───┤── 8. Files                     │
                        │   │     (document vault)           │
                        │   └────────────────────────────────┘
                        │
                        ├── 10. Reject (available at any stage)
                        │
                        └── 11. Project Conversion (exit point)
                              → Opens Project Workspace
```
