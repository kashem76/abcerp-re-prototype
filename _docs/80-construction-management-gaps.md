# Construction Management — Engineering & Site Operations Gaps

**Purpose:** This document specs out the engineering/site management workflows that are **not yet covered** in the existing docs. These are the features that make AbcERP a true construction management ERP — not just a construction accounting ERP.

**Key Insight:** The existing docs thoroughly cover the **financial chain** (BOQ → procurement → bills → WIP → revenue). What's missing is the **management chain** — scheduling, drawing control, quality, safety, resource planning — the activities that engineers and PMs do every day that don't directly post to the GL but are critical for project delivery.

**Priority Principle:** A feature is high priority if it either (a) directly prevents financial losses (delay costs, rework, penalties) or (b) is legally/contractually required (safety compliance, as-built documentation).

---

## 1. Construction Scheduling & Planning

**Who needs it:** Planning Engineer, Project Manager
**Current coverage:** ZERO — the Planning Engineer role is entirely absent
**Impact:** Without a schedule, there's no baseline to measure delay, no critical path to protect, no look-ahead to plan resources

### 1.1 What Must Be Built

| Feature | Description | Financial Link |
|---|---|---|
| **Master Schedule** | Activity-level construction schedule with durations, dependencies, milestones | Baseline for delay cost analysis |
| **Baseline Capture** | Lock the approved schedule as baseline (like BOQ baseline — immutable) | Required for schedule variance |
| **Progress Update** | Actual start/finish dates, % complete per activity | Feeds: SPI, S-Curve, POC revenue recognition |
| **Critical Path** | Auto-computed longest path. Flag activities on critical path | Delay to critical = project delay = cost |
| **Look-Ahead (3-4 week)** | Short-term plan extracted from master schedule | Drives: material ordering, manpower planning, equipment mobilization |
| **S-Curve** | Planned vs Actual cumulative progress over time | PM's primary health metric |
| **Schedule Variance** | Planned dates vs actual dates per activity | Feeds: earned value analysis (SPI) |
| **Delay Analysis** | Categorize delays: Excusable (weather, authority) vs Non-Excusable (contractor, developer) | Feeds: EOT claims, LD calculations |

### 1.2 Entity Model

```
ScheduleBaseline (1:1 per project, versioned)
  └── ScheduleActivity (1:N)
        ├── name, wbsId, duration (days), startDate, endDate
        ├── predecessors[] (FS/FF/SS/SF with lag)
        ├── actualStart, actualFinish, percentComplete
        ├── isCritical (computed from CPM)
        ├── assignedContractorId (optional)
        └── ScheduleDelay (0:N)
              ├── delayDays, category (EXCUSABLE / NON_EXCUSABLE / COMPENSABLE)
              ├── cause, evidence
              └── eotClaimId (optional → links to EOT claim)
```

### 1.3 Data Source Trace

| Field | Source |
|---|---|
| Activities | User input by Planning Engineer. Aligned with ProjectWBS nodes |
| Durations | User input. Reference: historical project data |
| Dependencies | User input (Finish-to-Start default) |
| Baseline dates | Locked on approval. Config: Settings > Approval Workflows > Schedule |
| Actual dates | Updated from DSR work done entries or manual input |
| Critical path | Computed: forward pass + backward pass algorithm |
| SPI | Computed: Earned Value / Planned Value |

### 1.4 Integration Points

- **WBS:** Schedule activities map to WBS leaf nodes (same structure)
- **DSR:** Work done section updates activity % complete
- **Material Planning:** Look-ahead drives when to raise MRs (lead time calculation)
- **Manpower Planning:** Look-ahead drives trade-wise manpower requirements
- **Contractor Monitoring:** Schedule vs actual per contractor → feeds performance score
- **Revenue Recognition (POC):** Construction progress % from schedule feeds POC calculation

### 1.5 Scope Decision

> **What we build vs what we integrate:**
> Full-featured Gantt/CPM (like Primavera P6 or MS Project) is a specialist tool. AbcERP should provide:
> - Activity-level schedule with milestones and dependencies (simple Gantt)
> - Baseline capture and progress tracking
> - S-Curve and SPI computation
> - Look-ahead extraction
> - Delay categorization for EOT
>
> For complex scheduling (resource leveling, multi-calendar, what-if), integrate with external tools via API.

---

## 2. Drawing & Document Management

**Who needs it:** All engineers, Architect, Consultants
**Current coverage:** ZERO — most critical gap for daily engineering work
**Impact:** Wrong drawing revision → wrong construction → rework cost. RFI delays → schedule delay

### 2.1 What Must Be Built

| Feature | Description | Financial Link |
|---|---|---|
| **Drawing Register** | Centralized register of all project drawings with revision history | Prevents rework from wrong revision |
| **Revision Control** | Track: Issued for Review → Reviewed → Approved for Construction → Superseded | Contractual evidence |
| **Drawing Distribution** | Who received which revision, when, acknowledgment | Liability protection |
| **RFI (Request for Information)** | Formal query from site to consultant when drawings are unclear or conflicting | Tracked response time → schedule impact |
| **Site Instruction (SI)** | Formal instruction from architect/consultant to contractor | May have cost/time impact → links to VO |
| **Transmittal Log** | Record of documents sent/received between parties | Contractual record |
| **As-Built Marking** | Flag drawings as "as-built" when actual construction deviates from design | Required for handover package |

### 2.2 Entity Model

```
Drawing
  ├── drawingCode, title, discipline (Architectural/Structural/MEP)
  ├── currentRevision → DrawingRevision (latest)
  └── DrawingRevision (1:N)
        ├── revisionCode (R0, R1, R2, A, B, C)
        ├── status (FOR_REVIEW / REVIEWED / APPROVED_FOR_CONSTRUCTION / SUPERSEDED)
        ├── issuedDate, issuedById
        ├── filePath (PDF/DWG)
        └── DrawingDistribution (1:N)
              ├── recipientId, recipientRole
              ├── distributedDate, acknowledgedDate

RFI (Request for Information)
  ├── rfiCode (auto: RFI-PROJECT-SEQ)
  ├── subject, description, relatedDrawingId
  ├── raisedById, raisedDate
  ├── directedTo (Architect / Structural / MEP consultant)
  ├── responseDueDate, actualResponseDate
  ├── response, responseById
  ├── status (OPEN / RESPONDED / CLOSED)
  ├── scheduleImpactDays
  └── linkedVOId (if response triggers a variation)

SiteInstruction
  ├── siCode (auto: SI-PROJECT-SEQ)
  ├── issuedBy (Architect / Consultant), issuedTo (Contractor)
  ├── subject, instruction
  ├── hasCostImpact, hasTimeImpact
  ├── contractorAcknowledgedDate
  └── linkedVOId (if SI triggers scope change)
```

### 2.3 Data Source Trace

| Field | Source |
|---|---|
| Drawing code / title | From architect/consultant. User registers in system |
| Revision status | User updates. Workflow: Review → Approve → Distribute |
| RFI response due date | Config: per-project or contract (typically 5-7 working days) |
| RFI schedule impact | User input by Planning Engineer |
| SI cost/time impact | User assessment → may link to Change Request (Doc 50) |

---

## 3. Quality Management System (QMS)

**Who needs it:** QA Engineer, Site Engineer, PM
**Current coverage:** Doc 31 has inspection checklist designs and concrete test log, but no NCR process
**Impact:** Quality failures → rework → direct cost (5-15% of construction cost in poorly managed projects)

### 3.1 What Must Be Built

| Feature | Description | Financial Link |
|---|---|---|
| **Inspection Plan** | Pre-defined inspection points per WBS activity (mandatory hold points) | Prevention is cheaper than cure |
| **Inspection Execution** | Checklist completion with pass/fail/NA per item, photos, inspector sign-off | Evidence for disputes |
| **Non-Conformance Report (NCR)** | Formal record when inspection fails: root cause, corrective action, preventive action, closure | Rework cost tracking |
| **Concrete Test Log** | Cube casting → lab testing → 7-day/28-day strength → pass/fail | Structural compliance |
| **Material Test Reports** | Steel mill test certificates, brick crushing strength, aggregate gradation | Material acceptance |
| **Rework Cost Tracking** | Cost of fixing non-conformances → back-charged to contractor or absorbed | Direct P&L impact |
| **Quality Dashboard** | First-time-pass rate, NCR trend, rework cost %, open NCRs | PM visibility |

### 3.2 Entity Model

```
InspectionPlan (per project, configurable)
  └── InspectionPoint (1:N)
        ├── wbsNodeId, activityName
        ├── inspectionType (HOLD_POINT / WITNESS_POINT / SURVEILLANCE)
        ├── checklistTemplateId → QualityChecklistTemplate
        └── responsibleRole

InspectionRecord
  ├── inspectionPointId, date, inspectorId
  ├── result (PASS / FAIL / CONDITIONAL)
  ├── checklistResponses (JSON: item → pass/fail/NA + notes)
  ├── photos[]
  ├── contractorRepresentativePresent (boolean)
  └── ncrId (if FAIL → auto-creates NCR)

NCR (Non-Conformance Report)
  ├── ncrCode (auto: NCR-PROJECT-SEQ)
  ├── inspectionRecordId (source)
  ├── description, wbsNodeId
  ├── rootCause, rootCauseCategory (Material / Workmanship / Design / Process)
  ├── correctiveAction, preventiveAction
  ├── responsibleContractorId
  ├── estimatedReworkCost          ← Financial impact
  ├── actualReworkCost             ← Posted to GL (DR Rework Expense or back-charge)
  ├── status (OPEN / ACTION_IN_PROGRESS / VERIFIED / CLOSED)
  ├── closedById, closedDate
  └── isBackCharged (boolean) → links to contractor deduction

ConcreteTestLog
  ├── cubeId (auto: PROJECT-DATE-SEQ)
  ├── pourLocationWBSId, pourDate
  ├── concreteGrade (M20/M25/M30/M35)
  ├── batchNo, supplierName
  ├── slumpTestResult (mm)
  ├── testDate7Day, strength7Day (N/mm²)
  ├── testDate28Day, strength28Day (N/mm²)
  ├── requiredStrength, result (PASS / FAIL)
  └── actionIfFail (RETEST / CORE_TEST / STRUCTURAL_REVIEW)
```

### 3.3 Config Dependencies

| Config | Source |
|---|---|
| Checklist templates | Org-level master: QualityChecklistTemplate (seeded per industry pack) |
| Hold point definitions | Per-project: InspectionPlan (which activities need mandatory hold) |
| Concrete grade requirements | Per-project: from structural design (user input) |
| NCR auto-creation | System: FAIL inspection → auto-creates NCR |
| Rework cost GL account | Master: Cost Code for rework or Config: dedicated rework account |

---

## 4. Safety Management System (SMS)

**Who needs it:** Safety Officer, PM, all site personnel
**Current coverage:** Doc 31 has incident reporting design (reactive). Proactive safety is not covered.
**Impact:** Legal compliance (BNBC), insurance requirements, worker welfare, potential criminal liability

### 4.1 What Must Be Built

| Feature | Description | Financial Link |
|---|---|---|
| **Toolbox Talk Register** | Daily pre-work safety briefing. Topic, attendees, sign-off | Legal compliance record |
| **Permit to Work (PTW)** | Hot work, confined space, excavation, working at height, crane operation | Prevents incidents → prevents cost |
| **Safety Inspection** | Periodic (weekly/monthly) safety audit with checklist | Compliance evidence |
| **Safety Incident Report** | Already designed in Doc 13. Build it. | Insurance claims, liability |
| **PPE Compliance Check** | Trade-wise PPE check with photo evidence | Compliance record |
| **Equipment Certification** | Crane inspection, scaffolding load test, hoist certificate — validity tracking | Legal requirement, insurance |
| **Safety Dashboard** | Incident-free days, open corrective actions, PTW active, equipment cert expiry | PM visibility |

### 4.2 Entity Model

```
ToolboxTalk
  ├── date, topic, conductedById
  ├── attendees[] (name, trade, contractorId)
  └── photoEvidence

PermitToWork
  ├── permitCode (auto), type (HOT_WORK / CONFINED_SPACE / EXCAVATION / HEIGHT / CRANE / ELECTRICAL)
  ├── location (WBS), description, validFrom, validTo
  ├── issuedById, approvedById
  ├── precautions[] (checklist)
  ├── status (ACTIVE / EXPIRED / CANCELLED)
  └── closedById, closedDate

SafetyInspection
  ├── inspectionDate, inspectorId, type (WEEKLY / MONTHLY / SPECIAL)
  ├── checklistResponses (JSON)
  ├── findings[] → SafetyFinding (corrective action, due, status)
  └── overallRating (SATISFACTORY / NEEDS_IMPROVEMENT / UNSATISFACTORY)

EquipmentCertification
  ├── equipmentId, certificationType (LOAD_TEST / INSPECTION / CALIBRATION)
  ├── certifiedDate, validUntil, certifiedBy (external agency)
  ├── certificateFilePath
  └── status (VALID / EXPIRING_SOON / EXPIRED)
```

---

## 5. Resource Management (Labour + Equipment)

**Who needs it:** PM, Planning Engineer, Site Engineer
**Current coverage:** DSR captures daily actuals. No planning baseline, no costing mechanism, no allocation.
**Impact:** Labour is 25-35% of construction cost. Equipment is 5-10%. Untracked = uncontrolled.

### 5.1 Labour Management

| Feature | Description | Financial Link |
|---|---|---|
| **Muster Roll** | Daily attendance register by name (not just count) | Basis for wage payment |
| **Trade-wise Planning** | Planned manpower histogram by trade per week/month | Resource planning |
| **Planned vs Actual** | DSR actuals compared against plan | Productivity analysis |
| **Labour Cost Allocation** | Hours × rate per trade → allocated to project/WBS/cost code | DR WIP / CR Payroll |
| **Overtime Tracking** | OT hours, rate, approval | Cost control |
| **Piece-rate Workers** | Output-based payment (e.g., ৳X per sqft of tiling) | Different costing model |
| **Subcontractor vs Own Labour** | Separate tracking and costing | Different GL accounts |

```
LabourMusterRoll
  ├── date, projectId
  └── LabourAttendance (1:N)
        ├── workerId, name, trade, contractorId (null if own labour)
        ├── present (boolean), hoursWorked, overtimeHours
        ├── wbsNodeId (what work assigned)
        └── rateType (DAILY / PIECE_RATE), rate, amount

LabourPlan (per project, weekly/monthly)
  └── LabourPlanLine (1:N)
        ├── trade, plannedCount, weekNumber
        └── wbsNodeId
```

### 5.2 Equipment Management

| Feature | Description | Financial Link |
|---|---|---|
| **Equipment Register** | All equipment on site: owned, hired, contractor-provided | Asset tracking |
| **Hire Charges** | External equipment: daily/hourly rate, hire period | DR WIP / CR AP |
| **Fuel Consumption** | Generator, crane, pump — fuel consumed per day | DR WIP / CR Inventory |
| **Utilization Tracking** | Hours used vs available hours | Efficiency metric |
| **Equipment Allocation** | Hours × rate → allocated to WBS/cost code | Cost allocation |
| **Mobilization / Demobilization** | When equipment arrives/leaves site | Schedule planning |

```
EquipmentRegister
  ├── equipmentId, name, type (CRANE / MIXER / PUMP / GENERATOR / etc.)
  ├── ownership (OWN / HIRED / CONTRACTOR_PROVIDED)
  ├── hireRate, hireRateUnit (PER_DAY / PER_HOUR / PER_MONTH)
  ├── supplierIdIfHired
  ├── mobilizedDate, demobilizedDate
  └── currentProjectId

EquipmentLog (daily, from DSR or standalone)
  ├── date, equipmentId, projectId
  ├── hoursWorked, idleHours, breakdownHours
  ├── fuelConsumed (liters), fuelRate
  ├── wbsNodeId (what work)
  └── allocatedCost (computed: hours × rate + fuel)
```

---

## 6. Contractor Workflow Gaps

**Current coverage:** Doc 12 covers the financial chain well. These are the management gaps.

### 6.1 What Must Be Added

| Feature | Description | Financial Link |
|---|---|---|
| **Contractor Performance Scoring** | Weighted score: quality (30%), schedule (30%), safety (20%), cooperation (20%) | Drives future tender shortlisting |
| **Extension of Time (EOT) Claims** | Contractor claims additional time for excusable delays | Delays LD calculation |
| **Liquidated Damages (LD)** | Penalty for contractor schedule delay beyond allowed time | Deduction from bills or retention |
| **Price Escalation Claims** | Contractual price adjustment based on material price index movement | Additional payment obligation |
| **Contractor Back-Charge Workflow** | Formal process: raise back-charge → contractor response → deduct from bill | Reduces payment |
| **Hindrance Register** | Obstacles preventing work: pending approvals, material shortage, design hold | Feeds EOT analysis |
| **Mobilization/Demobilization Tracking** | When contractor starts/finishes on site | Schedule tracking |

### 6.2 Entity Model

```
EOTClaim
  ├── claimCode (auto), contractId, contractorId
  ├── claimDays, reason, supportingEvidence[]
  ├── delayCategory (EXCUSABLE / COMPENSABLE / NON_EXCUSABLE)
  ├── siteEngineerRecommendation, pmDecision
  ├── approvedDays, status (SUBMITTED / REVIEWED / APPROVED / REJECTED)
  └── linkedScheduleDelayIds[]

LiquidatedDamages
  ├── contractId, contractorId
  ├── contractCompletionDate, actualCompletionDate
  ├── approvedEOTDays → adjustedCompletionDate
  ├── delayDays (actual − adjusted)
  ├── ldRate (per day, from contract)       ← Source: Contract.ldRatePerDay
  ├── ldAmount (computed: delayDays × rate)
  └── deductedFromBillId or retentionDeduction

PriceEscalation
  ├── contractId, claimPeriod
  ├── baseIndex, currentIndex, escalationPercent
  ├── affectedBOQItems[], additionalAmount
  ├── status (CLAIMED / VERIFIED / APPROVED / PAID)
  └── Config: Contract.escalationClause (boolean), indexSource

HindranceRegister
  ├── date, projectId, wbsNodeId
  ├── hindranceType (MATERIAL_SHORTAGE / DESIGN_HOLD / AUTHORITY_DELAY / WEATHER / LABOUR_SHORTAGE / OTHER)
  ├── description, impactOnSchedule (days)
  ├── responsibleParty (DEVELOPER / CONTRACTOR / AUTHORITY / FORCE_MAJEURE)
  ├── resolvedDate, resolution
  └── linkedEOTClaimId (if used to support EOT)
```

---

## 7. Site Communication & Coordination

**Who needs it:** PM, all site team
**Current coverage:** ZERO
**Impact:** Undocumented decisions lead to disputes, rework, and blame

### What Must Be Built

| Feature | Description |
|---|---|
| **Meeting Minutes** | Weekly site meeting, monthly progress review. Attendees, decisions, action items, follow-up status |
| **Action Item Tracker** | From meetings, inspections, safety audits. Assigned to person, due date, status |
| **Site Diary** | Daily narrative record of key events (beyond DSR — more about decisions and observations) |

```
MeetingRecord
  ├── meetingCode, date, type (WEEKLY_SITE / MONTHLY_PROGRESS / SAFETY / DESIGN_COORDINATION)
  ├── attendees[] (name, role, organization)
  ├── agenda[], minutes (text)
  └── ActionItem (1:N)
        ├── description, assignedToId, dueDate
        ├── status (OPEN / IN_PROGRESS / CLOSED / OVERDUE)
        └── closedDate, closedById
```

---

## 8. Handover Package Gaps

**Current coverage:** Doc 51 covers unit handover and snag management well. These are documentation gaps.

| Feature | Description | Status |
|---|---|---|
| **As-Built Drawing Register** | Track which drawings have as-built markings | NOT COVERED |
| **O&M Manual Checklist** | Equipment manuals, warranty cards, maintenance schedules | NOT COVERED |
| **Warranty Register** | Per-unit warranty items: waterproofing (10yr), MEP equipment (2yr), structural (lifetime) | PARTIALLY in Doc 51 |
| **Utility Meter Reading** | Initial meter readings at handover (water, electricity, gas) | NOT COVERED |
| **Key Register** | How many keys per unit, who received, signature | NOT COVERED |
| **Completion Certificate** | Formal certificate per contractor/work package | PARTIALLY in Doc 12 |

---

## 9. Priority Matrix

### Must Have (P1) — Without these, the ERP is incomplete for construction companies

| Feature | Why Critical | Docs to Update |
|---|---|---|
| **Construction Schedule (simple Gantt + baseline + S-curve)** | Planning Engineer's entire job. Feeds SPI, delay analysis, resource planning, POC revenue | New section in Doc 31 or standalone doc |
| **Drawing Register + RFI** | Engineers cannot function without revision control. RFIs are contractual. | New section in Doc 31 |
| **Quality Inspections + NCR** | Rework costs 5-15% without systematic quality. Already designed, needs build. | Build from Doc 31 Section 3.3 design |
| **Labour Costing (Muster Roll → GL)** | 25-35% of project cost with no entity model | New section in Doc 31 |
| **Equipment Register + Costing** | 5-10% of project cost with no entity model | New section in Doc 31 |

### Should Have (P2) — Important for professional construction management

| Feature | Why Important | Docs to Update |
|---|---|---|
| **Safety Incident Reporting** | Already designed in Doc 13. Legal compliance. Build it. | Build from Doc 31 Section 3.4 |
| **Permit to Work** | Safety compliance. Prevents incidents. | Add to Doc 31 |
| **EOT Claims + LD Calculation** | Contractor dispute resolution. Financial impact. | Add to Doc 12 |
| **Hindrance Register** | Supports EOT analysis. Schedule accountability. | Add to Doc 31 |
| **Contractor Performance Scoring** | Drives future shortlisting decisions. Referenced but not spec'd. | Add to Doc 12 |
| **Meeting Minutes + Action Items** | Coordination tool. Prevents undocumented decisions. | New lightweight doc or section |

### Nice to Have (P3) — Enhances completeness

| Feature | Notes |
|---|---|
| Site petty cash / direct purchases | Small but frequent. Could use existing AP workflow |
| Price escalation claims | Complex contractual mechanism. Rare in BD market |
| Environmental compliance | Emerging requirement. Template-based checklist |
| Neighbor complaint register | Liability management |
| As-built documentation tracking | Handover quality |
| Material delivery scheduling | Bridge between schedule and procurement |

---

## 10. What This Means for the Prototype

The prototype currently demonstrates **the financial chain excellently** — every taka from land lead to project closure is tracked. What's missing is the **management chain** — the daily reality of how 50-200 people on a construction site coordinate their work.

Adding P1 features would make the prototype demonstrate:
- "Here's how an engineer plans work" (schedule)
- "Here's how an engineer controls quality" (inspections + NCR)
- "Here's how an engineer tracks drawings" (revision control + RFI)
- "Here's how labour and equipment costs actually get to the GL" (muster roll + equipment log → cost allocation)

This transforms AbcERP from a **construction accounting system** (good for CFO) to a **construction management system** (good for everyone on site).

---

_The best ERP is one the site engineer opens voluntarily — not because finance forced them to. If the engineer's daily tools (schedule, drawings, quality, safety) live in the same system as the financial tools (BOQ, bills, budget), data flows naturally. If they're separate, you get WhatsApp photos and Excel spreadsheets — and the ERP becomes an accounting afterthought._
