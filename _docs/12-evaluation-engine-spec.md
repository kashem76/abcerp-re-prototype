# Evaluation Framework Engine — Specification

**Module:** Configurable Multi-Department Evaluation Engine
**Release:** R6.1 — Real Estate Industry Pack (but engine is industry-neutral)
**Scope:** Framework Configuration → Criteria Library → Evaluation Instance → Department Work → Sign-off → Auto-Report → Management Decision
**Prototype Authority:** `10-land-evaluation-design.md` (screen detail)
**Code Reference Counterpart:** New — to be added as `22-evaluation-engine.md` in `abcERPCode/07-abcerp-code-reference/13-real-estate-development/`

---

## 1. Overview & Core Principle

The Evaluation Framework Engine is a **configurable, multi-department, collaborative evaluation system** that replaces hardcoded feasibility forms. It allows each organization to encode their own investment methodology into the ERP — defining what to evaluate, how to evaluate it, who is responsible, what evidence is required, how results are interpreted, and how approval decisions are made.

The engine is used by the Land module today (powering both Initial Selection and full Feasibility evaluation) but is architecturally independent — it can power any future evaluation type (project appraisal, vendor qualification, investment committee reviews).

Three applications in the current system:

| Application | Evaluation Type | Triggered When |
|---|---|---|
| **Initial Selection** | Quick screening (qualify/hold/reject) | Land record created (NEW stage) |
| **Land Evaluation** | Full multi-department feasibility study | Selection qualified |
| **Due Diligence** | Verification of land claims and conditions | During evaluation (merged into Work) |

> **Non-Negotiable Core Principle:**
> _We are not giving organizations our feasibility template. We are giving each organization the ability to encode their own investment methodology into the ERP. The engine understands: Framework → Section → Criterion → Response → Finding → Risk → Department Sign-off → Report. The customer defines what those mean for their country, industry, and risk tolerance. Every criterion response, finding, and department sign-off automatically flows into the management report — no one prepares Word documents manually._

---

## 2. What This Module Delivers

### Configuration Layer (Settings)
- **Evaluation Framework** builder with 6 configuration tabs (Structure, Team, Workflow, Scoring, Report, Preview)
- **Criteria Library** — reusable criteria shared across frameworks, each with response type, guidance, AI instructions
- **Selection Templates** — quick screening criteria with pass/fail rules and critical overrides
- **Cost Estimation Categories** — configurable construction cost categories with estimation methods
- **Report Templates** — management report structure with department output mapping
- **Scoring Rules** — section weights, result thresholds, critical deal-breaker overrides
- **Seeded Templates** — Bangladesh default, with country packs for UAE, KSA, UK, etc.

### Operational Layer (Per Land)
- **Work Step Generation** — framework configuration auto-generates task cards on the Work Board
- **Assignment Resolution** — 4 modes: Role → Person → Department Queue → Manual
- **Criterion Evaluation** — 14 response types (Rating, Pass/Fail, Numeric, Currency, Percentage, etc.)
- **5-Part Response Model** — assessment value, findings (narrative), evidence, risk level, recommendation
- **Formal Findings** — first-class objects with severity, impact, recommendation, owner, status
- **Risk Promotion** — finding → risk (adds mitigation plan, monitoring status)
- **Department Sign-off** — assignee submits → reviewer/head approves or returns
- **Cross-Department Dependencies** — Finance waits for Engineering's cost estimate
- **Discussion Threads** — per-criterion comments with @mentions (informal, don't flow to report)
- **Evidence Collection** — files, photos, links attached to criteria (auto-tagged with context)

### Decision Layer (Management)
- **Readiness Gate** — all departments signed off, no unresolved critical findings
- **Auto-Assembled Report** — 10+ sections from department work, versioned and immutable
- **Management Decision** — 4 options with structured conditions and return instructions
- **Decision Versioning** — if returned, new evaluation version created, prior locked

---

## 3. How to Use

### 3.1 One-Time Setup (Settings)

1. Navigate to **Settings > Land Evaluation**.
2. Review the **Criteria Library** — 50+ seeded criteria. Add organization-specific criteria.
3. Review the **Selection Template** — 9 seeded screening criteria. Customize thresholds.
4. Review the **Evaluation Framework** — "Standard Land Evaluation" is seeded with 8 sections, 54 criteria.
5. In the Framework Builder:
   - **Structure tab** — add/remove/reorder sections and criteria.
   - **Team tab** — set default department, role, reviewer per section.
   - **Workflow tab** — define dependencies (Financial waits for Engineering + Marketing + Sales).
   - **Scoring tab** — set section weights (must sum to 100%), result thresholds, critical overrides.
   - **Report tab** — configure which department outputs appear in each report section.
   - **Preview tab** — verify configuration: "When a land is qualified, 8 work packages will be generated."
6. Configure **Cost Categories** — 17 seeded construction cost categories. Customize estimation methods.
7. Configure **Report Template** — 16 report sections. Set inclusion/exclusion rules per department.
8. **Publish Configuration** — active framework is used for all new evaluations.

### 3.2 Per Land — Initial Selection

1. BD officer opens a NEW land workspace → Overview tab shows **Initial Selection** checklist.
2. Each criterion shows an inline evaluator (dropdown for Choice, input for Numeric, etc.).
3. As criteria are completed, score updates in real-time.
4. **Critical criteria** that fail → overall result cannot be QUALIFIED regardless of score.
5. BD officer or BD Head clicks: [Qualify] → triggers evaluation, [Hold] → revisit later, [Reject] → close.

### 3.3 Per Land — Full Evaluation

1. After qualification, system prompts: "Start Evaluation? Framework: Standard Land Evaluation."
2. Coordinator reviews **Assignment Review** screen:
   - 8 work steps with auto-resolved assignees (from Team defaults).
   - [Change] to override any assignment.
   - [Start Work] generates WorkStep records and notifies assignees.
3. Each department member works their assigned step:
   - Opens from **My Work** or the **Work Board**.
   - Evaluates each criterion: value + assessment text + evidence + risk + recommendation.
   - Creates **Findings** from observations (formal, structured, flow to report).
   - Creates **Risks** from findings (adds mitigation plan).
4. When all criteria in a step are complete, **Department Sign-off** section appears:
   - Summary score, key findings, risks auto-aggregated.
   - Department head reviews, comments, and signs off (or returns for revision).
   - Signed-off step is **locked** — no further edits without admin reopen.
5. **Dependencies auto-unblock** — when Engineering completes, Financial Feasibility step becomes available.
6. Coordinator monitors progress via **Work Board** (Board / List / By Department views).

### 3.4 Per Land — Management Decision

1. When all required departments are signed off, **Readiness Check** shows green.
2. Coordinator clicks [Submit to Management].
3. System auto-assembles **Management Report** from department sign-offs:
   - Executive Summary, Financial Summary, Department Recommendations, Key Findings, Risks, Scenarios, Department Narratives.
4. CEO/MD reviews the concise **Decision Screen** (not the full report):
   - Financial summary, department recommendations, key risks, scenario range.
   - 4 options: Approve / Conditions / Return / Reject.
5. **Approve with Conditions** → structured condition builder (condition text, must-complete-before, responsible dept, due date).
6. **Return for Revision** → select departments, attach revision instructions per department.
7. Decision is recorded. Evaluation version is locked. Post-decision state displayed.

---

## 4. Schema Reference

### 4.1 Entity Diagram

```
EvaluationFramework (organization-level configuration)
  ├── FrameworkSection (1:N)
  │     └── FrameworkCriterion (1:N) → references Criterion (shared library)
  ├── TeamDefault (1:N per section)
  ├── WorkflowRule (1:N — dependencies between sections)
  ├── ScoringRule (1:1)
  │     └── SectionWeight (1:N)
  │     └── CriticalOverride (1:N)
  └── ReportConfig (1:1)
        └── ReportSectionConfig (1:N)

Criterion (organization-level shared library)
  ├── name, description, guidance
  ├── responseType (enum)
  ├── requiredOutputs (bitmask: assessment, findings, evidence, risk, recommendation)
  ├── weight, minimumAcceptable, isCritical
  └── aiInstructions

SelectionTemplate (organization-level)
  └── SelectionCriterion (1:N)

CostCategory (organization-level)
  └── estimationMethod, benchmarkData

─── Per-Land Instance ───

EvaluationStudy (1:1 per Land)
  ├── frameworkId → EvaluationFramework
  ├── coordinatorId → User
  ├── version, status
  │
  ├── WorkStep (1:N — generated from FrameworkSection)
  │     ├── sectionId → FrameworkSection
  │     ├── assigneeId, reviewerId → User
  │     ├── department, due, status, progress, total
  │     ├── dependsOn[] → WorkStep[]
  │     │
  │     ├── CriterionResponse (1:N)
  │     │     ├── criterionId → Criterion
  │     │     ├── value (polymorphic: number, string, boolean, JSON)
  │     │     ├── rating, assessment, riskLevel, recommendation, confidence
  │     │     ├── evaluatorId, completedAt
  │     │     └── ResponseEvidence (1:N)
  │     │
  │     ├── Finding (1:N)
  │     │     ├── title, severity, impact, recommendation
  │     │     ├── relatedCriterionId, owner, status
  │     │     └── Risk (0:1)
  │     │           ├── level, mitigationPlan, monitoringStatus
  │     │           └── ownerId → User
  │     │
  │     ├── StepComment (1:N)
  │     │     ├── authorId, content, mentions[], attachments[]
  │     │     └── includeInReport (boolean)
  │     │
  │     └── DepartmentSignoff (1:1)
  │           ├── reviewerId, status (APPROVED / RETURNED)
  │           ├── comments, score
  │           └── signedAt
  │
  ├── FinancialModel (1:1)
  │     ├── RevenueAssumption (1:N) — each with sourceStepId, assessor, updatedAt
  │     ├── CostAssumption (1:N) — each with sourceStepId, assessor, updatedAt
  │     ├── ComputedResult (1:1) — revenue, cost, profit, margin, irr, payback
  │     └── Scenario (1:N) — conservative, base, optimistic variations
  │
  ├── ManagementReport (1:N — versioned, immutable after submission)
  │     ├── version, generatedAt, status (DRAFT / SUBMITTED / LOCKED)
  │     └── ReportSnapshot (JSON — complete structured content at generation time)
  │
  └── ManagementDecision (0:1 — created when CEO decides)
        ├── decision (APPROVE / CONDITIONS / RETURN / REJECT)
        ├── comments, decidedById, decidedAt
        ├── DecisionCondition (1:N)
        │     ├── text, mustCompleteBefore, responsibleDept, dueDate, status
        │     └── completedAt, completedById
        └── DecisionRevision (1:N — for RETURN: which depts, what instructions)
              ├── departmentId, instructions
              └── reopenedStepId → WorkStep
```

### 4.2 Full Prisma Schema

```prisma
// ═══════════════════════════════════════════════════════════════
// CONFIGURATION — Organization-Level
// ═══════════════════════════════════════════════════════════════

enum ResponseType {
  YES_NO
  PASS_FAIL
  RATING_1_5
  RISK_LEVEL
  NUMBER
  PERCENTAGE
  CURRENCY
  MEASUREMENT
  DATE
  SINGLE_CHOICE
  MULTIPLE_CHOICE
  CHECKLIST
  TEXT_FINDINGS
  FORMULA
  RECOMMENDATION
}

model Criterion {
  id               String       @id @default(uuid()) @db.Uuid
  organizationId   String       @db.Uuid

  name             String
  description      String?
  evaluatorGuidance String?     // "How should this normally be evaluated?"
  aiInstructions   String?      // Optional AI agent instructions

  responseType     ResponseType
  unit             String?      // sqft, kg, BDT, etc.
  scaleLabels      Json?        // For Rating: { 1: "Very Poor", 2: "Poor", ... }
  options          Json?        // For Choice types: ["Option A", "Option B"]

  isCritical       Boolean      @default(false)
  isRequired       Boolean      @default(true)
  evidenceRequired Boolean      @default(false)
  weight           Decimal      @db.Decimal(5, 2)   @default(0)
  minimumAcceptable Decimal?    @db.Decimal(5, 2)

  // What the evaluator must provide
  requiresAssessment     Boolean @default(true)
  requiresFindings       Boolean @default(false)
  requiresEvidence       Boolean @default(false)
  requiresRisk           Boolean @default(false)
  requiresRecommendation Boolean @default(true)

  // Reporting
  includeScoreInReport   Boolean @default(true)
  includeFindingsInReport Boolean @default(true)

  frameworkCriteria FrameworkCriterion[]
  responses        CriterionResponse[]

  createdAt        DateTime     @default(now())
  updatedAt        DateTime     @updatedAt

  @@index([organizationId])
  @@index([responseType])
}

model EvaluationFramework {
  id               String       @id @default(uuid()) @db.Uuid
  organizationId   String       @db.Uuid

  name             String       // "Standard Land Evaluation"
  description      String?
  applicationType  String       // "LAND_FEASIBILITY", "LAND_DUE_DILIGENCE", etc.
  isDefault        Boolean      @default(false)
  isActive         Boolean      @default(true)

  sections         FrameworkSection[]
  teamDefaults     TeamDefault[]
  workflowRules    WorkflowRule[]
  scoringRule      ScoringRule?
  reportConfig     ReportConfig?
  studies          EvaluationStudy[]

  createdAt        DateTime     @default(now())
  updatedAt        DateTime     @updatedAt

  @@index([organizationId])
  @@index([applicationType])
}

model FrameworkSection {
  id               String       @id @default(uuid()) @db.Uuid
  frameworkId       String       @db.Uuid
  framework        EvaluationFramework @relation(fields: [frameworkId], references: [id])

  name             String       // "Engineering", "Legal", "Marketing"
  description      String?
  department       String       // Default department name
  sortOrder        Int          @default(0)

  criteria         FrameworkCriterion[]
  teamDefault      TeamDefault?
  workSteps        WorkStep[]

  @@index([frameworkId])
}

model FrameworkCriterion {
  id               String       @id @default(uuid()) @db.Uuid
  sectionId        String       @db.Uuid
  section          FrameworkSection @relation(fields: [sectionId], references: [id])
  criterionId      String       @db.Uuid
  criterion        Criterion    @relation(fields: [criterionId], references: [id])

  sortOrder        Int          @default(0)
  overrideDepartment String?    // If different from section's department
  overrideWeight   Decimal?     @db.Decimal(5, 2)

  @@index([sectionId])
  @@unique([sectionId, criterionId])
}

enum AssignmentMethod {
  SPECIFIC_PERSON
  ROLE
  DEPARTMENT_QUEUE
  DECIDE_AT_CREATION
}

model TeamDefault {
  id               String       @id @default(uuid()) @db.Uuid
  frameworkId       String       @db.Uuid
  framework        EvaluationFramework @relation(fields: [frameworkId], references: [id])
  sectionId        String       @unique @db.Uuid
  section          FrameworkSection @relation(fields: [sectionId], references: [id])

  assignmentMethod AssignmentMethod @default(ROLE)
  defaultRole      String?      // "Legal Officer", "Site Engineer"
  specificPersonId String?      @db.Uuid
  accountableOwner String?      // Usually department head role
  defaultReviewer  String?      // Role or person who signs off
  defaultDeadlineDays Int       @default(10)  // Working days after start
  escalationTarget String?      // Who to notify on overdue

  @@index([frameworkId])
}

model WorkflowRule {
  id               String       @id @default(uuid()) @db.Uuid
  frameworkId       String       @db.Uuid
  framework        EvaluationFramework @relation(fields: [frameworkId], references: [id])

  stepSectionId    String       @db.Uuid   // The section this rule applies to
  dependsOnSectionId String     @db.Uuid   // The section that must complete first
  dependencyRule   String       @default("ALL_COMPLETE")  // ALL_COMPLETE | ANY_COMPLETE

  @@index([frameworkId])
  @@unique([frameworkId, stepSectionId, dependsOnSectionId])
}

model ScoringRule {
  id               String       @id @default(uuid()) @db.Uuid
  frameworkId       String       @unique @db.Uuid
  framework        EvaluationFramework @relation(fields: [frameworkId], references: [id])

  sectionWeights   Json         // { sectionId: weight% } — must sum to 100
  thresholds       Json         // { 85: "Strongly Recommended", 75: "Recommended", 60: "Conditional" }
  criticalOverrides Json        // [{ criterionId, failAction: "NOT_RECOMMENDED" | "MANAGEMENT_EXCEPTION" }]
}

model ReportConfig {
  id               String       @id @default(uuid()) @db.Uuid
  frameworkId       String       @unique @db.Uuid
  framework        EvaluationFramework @relation(fields: [frameworkId], references: [id])

  sections         Json         // Ordered list of report sections with include/exclude rules
  // Each section: { name, type, includeDepartments[], includeFindings: "ALL"|"CRITICAL_ONLY", includeEvidence: bool }
}

// ═══════════════════════════════════════════════════════════════
// INSTANCE — Per-Land Evaluation
// ═══════════════════════════════════════════════════════════════

enum EvaluationStatus {
  CREATED
  ASSIGNMENTS_CONFIRMED
  IN_PROGRESS
  REVIEW
  SUBMITTED
  DECIDED
  LOCKED
}

model EvaluationStudy {
  id               String       @id @default(uuid()) @db.Uuid
  organizationId   String       @db.Uuid
  landId           String       @db.Uuid    // FK to Land entity

  frameworkId       String       @db.Uuid
  framework        EvaluationFramework @relation(fields: [frameworkId], references: [id])

  evaluationCode   String       @unique     // EVL-YYYY-SEQ
  coordinatorId    String       @db.Uuid
  targetDate       DateTime
  version          Int          @default(1)
  status           EvaluationStatus @default(CREATED)

  workSteps        WorkStep[]
  financialModel   FinancialModel?
  reports          ManagementReport[]
  decision         ManagementDecision?

  createdAt        DateTime     @default(now())
  updatedAt        DateTime     @updatedAt

  @@index([organizationId])
  @@index([landId])
  @@index([status])
}

enum WorkStepStatus {
  NOT_STARTED
  WAITING          // Dependency not met
  IN_PROGRESS
  REVIEW           // Submitted, awaiting head sign-off
  RETURNED         // Returned by head for revision
  COMPLETE         // Signed off and locked
}

model WorkStep {
  id               String       @id @default(uuid()) @db.Uuid
  studyId          String       @db.Uuid
  study            EvaluationStudy @relation(fields: [studyId], references: [id])
  sectionId        String       @db.Uuid
  section          FrameworkSection @relation(fields: [sectionId], references: [id])

  name             String
  department       String
  assigneeId       String?      @db.Uuid
  reviewerId       String?      @db.Uuid
  dueDate          DateTime?
  status           WorkStepStatus @default(NOT_STARTED)

  progress         Int          @default(0)   // Completed criteria count
  total            Int          @default(0)   // Total criteria count

  responses        CriterionResponse[]
  findings         Finding[]
  comments         StepComment[]
  signoff          DepartmentSignoff?

  // Dependency tracking
  dependsOn        WorkStep[]   @relation("StepDependency")
  dependedOnBy     WorkStep[]   @relation("StepDependency")

  createdAt        DateTime     @default(now())
  updatedAt        DateTime     @updatedAt

  @@index([studyId])
  @@index([status])
  @@index([assigneeId])
}

enum RecommendationType {
  PROCEED
  PROCEED_WITH_CONDITIONS
  FURTHER_INVESTIGATION
  NOT_RECOMMENDED
}

model CriterionResponse {
  id               String       @id @default(uuid()) @db.Uuid
  stepId           String       @db.Uuid
  step             WorkStep     @relation(fields: [stepId], references: [id])
  criterionId      String       @db.Uuid
  criterion        Criterion    @relation(fields: [criterionId], references: [id])

  // Polymorphic value storage
  valueText        String?      // For text, findings
  valueNumber      Decimal?     @db.Decimal(20, 4)  // For numeric, currency, percentage
  valueBoolean     Boolean?     // For yes/no, pass/fail
  valueJson        Json?        // For choice, checklist, formula results
  rating           Int?         // For rating 1-5

  assessment       String?      // Evaluator's narrative
  riskLevel        String?      // Low, Medium, High, Critical
  recommendation   RecommendationType?
  confidence       String?      // High, Medium, Low

  evaluatorId      String       @db.Uuid
  isDraft          Boolean      @default(true)
  completedAt      DateTime?

  evidence         ResponseEvidence[]

  createdAt        DateTime     @default(now())
  updatedAt        DateTime     @updatedAt

  @@index([stepId])
  @@unique([stepId, criterionId])
}

model ResponseEvidence {
  id               String       @id @default(uuid()) @db.Uuid
  responseId       String       @db.Uuid
  response         CriterionResponse @relation(fields: [responseId], references: [id])

  evidenceType     String       // DOCUMENT, PHOTO, LINK, ERP_DATA
  fileName         String?
  filePath         String?
  url              String?
  caption          String?
  uploadedById     String       @db.Uuid
  uploadedAt       DateTime     @default(now())

  @@index([responseId])
}

enum FindingSeverity {
  CRITICAL
  HIGH
  MEDIUM
  LOW
}

enum FindingStatus {
  OPEN
  UNDER_REVIEW
  RESOLVED
  MONITORING
  ACCEPTED      // Accepted as-is by management
}

model Finding {
  id               String       @id @default(uuid()) @db.Uuid
  stepId           String       @db.Uuid
  step             WorkStep     @relation(fields: [stepId], references: [id])

  title            String
  severity         FindingSeverity
  impact           String       // Description of business impact
  recommendation   String       // What should be done
  relatedCriterionId String?    @db.Uuid
  ownerDepartment  String
  status           FindingStatus @default(OPEN)

  risk             Risk?        // Promoted finding

  raisedById       String       @db.Uuid
  raisedAt         DateTime     @default(now())
  resolvedAt       DateTime?

  @@index([stepId])
  @@index([severity])
  @@index([status])
}

model Risk {
  id               String       @id @default(uuid()) @db.Uuid
  findingId        String       @unique @db.Uuid
  finding          Finding      @relation(fields: [findingId], references: [id])

  level            String       // Maps to finding.severity but can be overridden
  mitigationPlan   String?
  ownerId          String       @db.Uuid
  monitoringStatus String       @default("ACTIVE")  // ACTIVE, MITIGATED, CLOSED

  createdAt        DateTime     @default(now())
  updatedAt        DateTime     @updatedAt
}

model StepComment {
  id               String       @id @default(uuid()) @db.Uuid
  stepId           String       @db.Uuid
  step             WorkStep     @relation(fields: [stepId], references: [id])

  authorId         String       @db.Uuid
  content          String
  mentions         String[]     // User IDs mentioned
  attachments      Json?        // File references
  includeInReport  Boolean      @default(false)  // Promoted to report content
  parentCommentId  String?      @db.Uuid         // Threading

  createdAt        DateTime     @default(now())

  @@index([stepId])
}

enum SignoffStatus {
  PENDING
  APPROVED
  RETURNED
}

model DepartmentSignoff {
  id               String       @id @default(uuid()) @db.Uuid
  stepId           String       @unique @db.Uuid
  step             WorkStep     @relation(fields: [stepId], references: [id])

  reviewerId       String       @db.Uuid
  status           SignoffStatus @default(PENDING)
  score            Int?         // Department score (0-100)
  recommendation   RecommendationType?
  comments         String?
  signedAt         DateTime?
  returnReason     String?      // If RETURNED

  @@index([reviewerId])
}

// ═══════════════════════════════════════════════════════════════
// FINANCIAL MODEL — Computed from Department Outputs
// ═══════════════════════════════════════════════════════════════

model FinancialModel {
  id               String       @id @default(uuid()) @db.Uuid
  studyId          String       @unique @db.Uuid
  study            EvaluationStudy @relation(fields: [studyId], references: [id])

  // Revenue
  saleableArea     Decimal?     @db.Decimal(12, 2)
  sellingPrice     Decimal?     @db.Decimal(20, 2)
  expectedRevenue  Decimal?     @db.Decimal(20, 2)

  // Costs (each with source attribution)
  landCost         Decimal?     @db.Decimal(20, 2)
  constructionCost Decimal?     @db.Decimal(20, 2)
  marketingCost    Decimal?     @db.Decimal(20, 2)
  financeCost      Decimal?     @db.Decimal(20, 2)
  professionalCost Decimal?     @db.Decimal(20, 2)
  contingency      Decimal?     @db.Decimal(20, 2)
  totalCost        Decimal?     @db.Decimal(20, 2)

  // Computed results
  expectedProfit   Decimal?     @db.Decimal(20, 2)
  margin           Decimal?     @db.Decimal(6, 2)
  irr              Decimal?     @db.Decimal(6, 2)
  npv              Decimal?     @db.Decimal(20, 2)
  paybackYears     Decimal?     @db.Decimal(4, 1)
  costPerSft       Decimal?     @db.Decimal(12, 2)
  revenuePerSft    Decimal?     @db.Decimal(12, 2)
  breakEvenPrice   Decimal?     @db.Decimal(12, 2)
  peakFunding      Decimal?     @db.Decimal(20, 2)

  assumptions      SourceAssumption[]
  scenarios        Scenario[]

  lastComputedAt   DateTime?
  isStale          Boolean      @default(false)

  @@index([studyId])
}

model SourceAssumption {
  id               String       @id @default(uuid()) @db.Uuid
  modelId          String       @db.Uuid
  model            FinancialModel @relation(fields: [modelId], references: [id])

  name             String       // "Selling Price", "Construction Cost", etc.
  value            String       // Display value
  sourceDepartment String
  assessorId       String       @db.Uuid
  sourceStepId     String?      @db.Uuid
  lastUpdatedAt    DateTime
  isStale          Boolean      @default(false)   // >30 days since update

  @@index([modelId])
}

model Scenario {
  id               String       @id @default(uuid()) @db.Uuid
  modelId          String       @db.Uuid
  model            FinancialModel @relation(fields: [modelId], references: [id])

  name             String       // "Conservative", "Base", "Optimistic"
  revenue          Decimal      @db.Decimal(20, 2)
  totalCost        Decimal      @db.Decimal(20, 2)
  profit           Decimal      @db.Decimal(20, 2)
  margin           Decimal      @db.Decimal(6, 2)
  irr              Decimal      @db.Decimal(6, 2)

  @@index([modelId])
}

// ═══════════════════════════════════════════════════════════════
// MANAGEMENT REPORT & DECISION
// ═══════════════════════════════════════════════════════════════

enum ReportStatus {
  DRAFT
  SUBMITTED
  LOCKED
}

model ManagementReport {
  id               String       @id @default(uuid()) @db.Uuid
  studyId          String       @db.Uuid
  study            EvaluationStudy @relation(fields: [studyId], references: [id])

  version          Int
  generatedAt      DateTime     @default(now())
  status           ReportStatus @default(DRAFT)

  // Immutable snapshot of all report content at generation time
  snapshot         Json         // Complete structured report content
  overallScore     Int
  overallResult    String       // "Strongly Recommended", "Recommended", etc.

  @@index([studyId])
  @@unique([studyId, version])
}

enum DecisionType {
  APPROVE
  APPROVE_WITH_CONDITIONS
  RETURN_FOR_REVISION
  REJECT
}

model ManagementDecision {
  id               String       @id @default(uuid()) @db.Uuid
  studyId          String       @unique @db.Uuid
  study            EvaluationStudy @relation(fields: [studyId], references: [id])

  decision         DecisionType
  comments         String?
  decidedById      String       @db.Uuid
  decidedByRole    String       // "Managing Director", "CEO", "Board"
  decidedAt        DateTime     @default(now())

  conditions       DecisionCondition[]
  revisions        DecisionRevision[]

  @@index([studyId])
}

enum ConditionStatus {
  OPEN
  IN_PROGRESS
  COMPLETED
  WAIVED
}

model DecisionCondition {
  id               String       @id @default(uuid()) @db.Uuid
  decisionId       String       @db.Uuid
  decision         ManagementDecision @relation(fields: [decisionId], references: [id])

  text             String
  mustCompleteBefore String     // Stage name: "Land Registration", "Project Baseline", etc.
  responsibleDept  String
  dueDate          DateTime?
  status           ConditionStatus @default(OPEN)
  completedAt      DateTime?
  completedById    String?      @db.Uuid

  @@index([decisionId])
  @@index([status])
}

model DecisionRevision {
  id               String       @id @default(uuid()) @db.Uuid
  decisionId       String       @db.Uuid
  decision         ManagementDecision @relation(fields: [decisionId], references: [id])

  department       String
  instructions     String
  reopenedStepId   String?      @db.Uuid

  @@index([decisionId])
}
```

### 4.3 Status Flow Diagrams

**Evaluation Study:**
```
CREATED → ASSIGNMENTS_CONFIRMED → IN_PROGRESS → REVIEW → SUBMITTED → DECIDED → LOCKED
                                                                        ↓
                                                          (if RETURN) → IN_PROGRESS (new version)
```

**Work Step:**
```
NOT_STARTED → IN_PROGRESS → REVIEW → COMPLETE (locked)
    ↓                          ↓
  WAITING                   RETURNED → IN_PROGRESS (revision)
  (dependency)
```

**Finding:**
```
OPEN → UNDER_REVIEW → RESOLVED
                    → MONITORING
                    → ACCEPTED (by management)
```

**Management Report:**
```
DRAFT → SUBMITTED → LOCKED (immutable after decision or superseded by new version)
```

**Decision Condition:**
```
OPEN → IN_PROGRESS → COMPLETED
                   → WAIVED (with justification)
```

---

## 5. Business Rules

### Framework Configuration
- Section weights must sum to 100%.
- Critical override rules take precedence over aggregate score (e.g., Legal Title = Fail → result cannot be "Recommended" regardless of score).
- A framework must have at least 1 section with at least 1 criterion to be publishable.
- Criteria are reusable — changing a criterion in the library updates its definition everywhere, but existing responses are immutable.

### Work Step Execution
- Only the assigned user can edit criterion responses.
- Only the reviewer can sign off.
- Coordinator can reassign, change deadlines, and comment on any step.
- A step cannot be submitted for review until all required criteria have responses.
- Draft responses are saved immediately. Only `completedAt` marks a criterion as done.

### Findings & Risks
- Findings must have severity (Critical / High / Medium / Low).
- Critical findings that are OPEN block the Readiness Gate — cannot submit to management.
- Creating a Risk from a Finding copies severity but allows override.
- Resolved findings cannot be reopened without admin action.

### Financial Model
- All computed fields (IRR, NPV, margin) are recalculated when any source assumption changes.
- Assumptions are flagged as stale if `lastUpdatedAt` is more than 30 days ago.
- Scenarios are computed by applying percentage variations to base assumptions.
- The model never contains manually entered numbers that bypass department assessments.

### Management Decision
- Cannot submit report until all required departments are signed off.
- Cannot submit report if any OPEN Critical findings exist.
- APPROVE and APPROVE_WITH_CONDITIONS both advance the Land stage to ACQUISITION.
- APPROVE_WITH_CONDITIONS creates DecisionCondition records that are tracked until resolution.
- RETURN_FOR_REVISION creates DecisionRevision records and reopens specified work steps.
- REJECT sets the Land stage to CLOSED. All tabs become read-only.
- Decision is final — the evaluation version is locked after decision. If returned and resubmitted, a new version is created.

### Report Versioning
- Each ManagementReport is an immutable snapshot (JSON) of the evaluation state at generation time.
- If any department changes an assessment after a report is generated, the report is marked stale and a new version must be generated.
- All versions are preserved for audit trail.

---

## 6. Implementation Notes (TypeScript)

### 6.1 Work Step Generation from Framework

```typescript
async function generateWorkSteps(
  studyId: string,
  frameworkId: string,
  ctx: ServerContext
): Promise<WorkStep[]> {
  return ctx.db.$transaction(async (tx) => {
    const framework = await tx.evaluationFramework.findUniqueOrThrow({
      where: { id: frameworkId },
      include: {
        sections: { include: { criteria: true }, orderBy: { sortOrder: 'asc' } },
        teamDefaults: true,
        workflowRules: true,
      },
    });

    const steps: WorkStep[] = [];

    for (const section of framework.sections) {
      const teamDefault = framework.teamDefaults.find(
        (t) => t.sectionId === section.id
      );

      // Resolve assignee from team default
      const assigneeId = await resolveAssignee(
        teamDefault?.assignmentMethod ?? 'DECIDE_AT_CREATION',
        teamDefault,
        ctx
      );

      const step = await tx.workStep.create({
        data: {
          studyId,
          sectionId: section.id,
          name: section.name,
          department: section.department,
          assigneeId,
          reviewerId: teamDefault?.specificPersonId ?? null,
          dueDate: teamDefault
            ? addWorkingDays(new Date(), teamDefault.defaultDeadlineDays)
            : null,
          status: 'NOT_STARTED',
          progress: 0,
          total: section.criteria.length,
        },
      });

      steps.push(step);
    }

    // Apply dependency rules
    for (const rule of framework.workflowRules) {
      const dependentStep = steps.find(
        (s) => s.sectionId === rule.stepSectionId
      );
      const prerequisiteStep = steps.find(
        (s) => s.sectionId === rule.dependsOnSectionId
      );

      if (dependentStep && prerequisiteStep) {
        await tx.workStep.update({
          where: { id: dependentStep.id },
          data: {
            status: 'WAITING',
            dependsOn: { connect: { id: prerequisiteStep.id } },
          },
        });
      }
    }

    return steps;
  });
}
```

### 6.2 Score Computation

```typescript
function computeOverallScore(
  steps: WorkStepWithSignoffs[],
  scoringRule: ScoringRule
): { score: number; result: string; criticalFailures: string[] } {
  const weights = scoringRule.sectionWeights as Record<string, number>;
  const thresholds = scoringRule.thresholds as Record<number, string>;
  const criticalOverrides = scoringRule.criticalOverrides as Array<{
    criterionId: string;
    failAction: string;
  }>;

  let weightedSum = 0;
  let totalWeight = 0;
  const criticalFailures: string[] = [];

  for (const step of steps) {
    if (!step.signoff || step.signoff.score === null) continue;

    const weight = weights[step.sectionId] ?? 0;
    weightedSum += step.signoff.score * weight;
    totalWeight += weight;

    // Check critical overrides
    for (const override of criticalOverrides) {
      const response = step.responses.find(
        (r) => r.criterionId === override.criterionId
      );
      if (response?.valueBoolean === false || response?.rating === 1) {
        criticalFailures.push(
          `${step.name}: ${response.criterion.name} failed`
        );
      }
    }
  }

  const score = totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0;

  // Determine result label from thresholds
  let result = 'Not Recommended';
  const sortedThresholds = Object.entries(thresholds)
    .map(([k, v]) => [Number(k), v] as [number, string])
    .sort((a, b) => b[0] - a[0]);

  for (const [threshold, label] of sortedThresholds) {
    if (score >= threshold) {
      result = label;
      break;
    }
  }

  // Critical failures override result
  if (criticalFailures.length > 0) {
    result = 'Not Recommended';
  }

  return { score, result, criticalFailures };
}
```

### 6.3 Report Auto-Assembly

```typescript
async function assembleManagementReport(
  studyId: string,
  ctx: ServerContext
): Promise<ManagementReport> {
  const study = await ctx.db.evaluationStudy.findUniqueOrThrow({
    where: { id: studyId },
    include: {
      workSteps: {
        include: {
          signoff: true,
          responses: { include: { criterion: true } },
          findings: { include: { risk: true } },
          comments: { where: { includeInReport: true } },
        },
      },
      financialModel: { include: { scenarios: true, assumptions: true } },
      framework: { include: { scoringRule: true, reportConfig: true } },
    },
  });

  const { score, result, criticalFailures } = computeOverallScore(
    study.workSteps,
    study.framework.scoringRule!
  );

  // Build the report snapshot — complete structured content
  const snapshot = {
    executiveSummary: buildExecutiveSummary(study, score, result),
    financialSummary: buildFinancialSummary(study.financialModel),
    departmentRecommendations: study.workSteps
      .filter((s) => s.signoff?.status === 'APPROVED')
      .map((s) => ({
        department: s.department,
        score: s.signoff!.score,
        recommendation: s.signoff!.recommendation,
        comments: s.signoff!.comments,
      })),
    keyFindings: study.workSteps
      .flatMap((s) => s.findings)
      .sort((a, b) => severityRank(a.severity) - severityRank(b.severity)),
    risks: study.workSteps
      .flatMap((s) => s.findings.filter((f) => f.risk))
      .map((f) => f.risk!),
    scenarios: study.financialModel?.scenarios ?? [],
    departmentNarratives: study.workSteps
      .filter((s) => s.signoff)
      .map((s) => buildDepartmentNarrative(s)),
    criticalFailures,
  };

  // Get next version number
  const existingReports = await ctx.db.managementReport.count({
    where: { studyId },
  });

  return ctx.db.managementReport.create({
    data: {
      studyId,
      version: existingReports + 1,
      overallScore: score,
      overallResult: result,
      snapshot,
      status: 'DRAFT',
    },
  });
}
```

---

## 7. Screen Inventory

| # | Screen | Route | What It Shows |
|---|---|---|---|
| **Settings** |
| 1 | Settings Home | `settings/land-evaluation` | 8 configuration cards |
| 2 | Selection Templates | `settings/land-evaluation/selection` | Quick screening criteria + rules |
| 3 | Framework List | `settings/land-evaluation/frameworks` | Card per framework |
| 4 | Framework Builder | `settings/land-evaluation/frameworks/[id]` | 6 tabs: Structure, Team, Workflow, Scoring, Report, Preview |
| 5 | Criteria Library | `settings/land-evaluation/criteria` | Searchable table, edit dialog |
| 6 | Cost Categories | `settings/land-evaluation/cost` | 17 categories, estimation methods |
| 7 | Report Templates | `settings/land-evaluation/report` | Report structure + dept output config |
| **Operational** |
| 8 | Initial Selection | `land-leads/[id]` (embedded in Overview) | Interactive checklist, score, qualify/hold/reject |
| 9 | Assignment Review | `land-leads/[id]/work` (mode A) | Team confirmation before work starts |
| 10 | Work Board | `land-leads/[id]/work` (mode B) | Board / List / By Department views |
| 11 | Step Assessment | `land-leads/[id]/work/[stepId]` | 5 tabs: Assessment, Findings, Files, Discussion, History |
| 12 | Dept Sign-off | `land-leads/[id]/work/[stepId]` (bottom) | Score, findings, head comments, approve/return |
| 13 | Evaluation Overview | `land-leads/[id]/feasibility` | Scores, findings, risks, cost, dept drill-in |
| 14 | Financial Model | `land-leads/[id]/feasibility/financial` | Revenue, costs, results, scenarios, source assumptions |
| 15 | Readiness Check | `land-leads/[id]/decision` (state 1) | Dept sign-off status, gate checks |
| 16 | Management Report | `land-leads/[id]/decision` (state 2) | Auto-assembled report preview |
| 17 | Management Decision | `land-leads/[id]/decision` (state 3) | 4 options, conditions, return instructions |
| 18 | Post-Decision | `land-leads/[id]/decision` (state 4) | Approved/Rejected/Returned outcome |

---

## 8. Seeded Templates

### 8.1 Land Evaluation Framework (Bangladesh Default)

| Section | Department | Criteria Count | Key Criteria |
|---|---|---|---|
| Land & Location | Development | 6 | Location suitability, road access, neighborhood, shape, surrounding dev, owner info |
| Legal & Title | Legal | 9 | Ownership verification, chain of title, encumbrance, mutation, litigation, seller authority, POA, succession, govt acquisition |
| Engineering | Engineering | 11 | Accessibility, soil condition, buildable area, utilities, foundation, constraints, approach, duration, cost estimate, topography, technical risk |
| Regulatory | Planning | 6-16 | Zoning, FAR, MGC, height, setbacks, road width, DAP, environmental, RAJUK permit, utility NOCs, parking, fire safety, BNBC |
| Marketing | Marketing | 8 | Market demand, selling price, competition, price trend, demographics, infrastructure, comparables, complexity |
| Sales | Sales | 5 | Sales velocity, pre-sales potential, payment plan, customer profile, competition impact |
| Cost Estimate | Engineering | 17 | Per cost category (Foundation, RCC, Masonry, MEP, Finishing, External, Contingency) |
| Financial | Finance | 6 | IRR, net margin, payback, peak funding, break-even, finance cost sensitivity |

### 8.2 Initial Selection Template (Bangladesh Default)

| Criterion | Type | Critical |
|---|---|---|
| Target location | Choice | No |
| Land area within range | Numeric | No |
| Asking price acceptable | Choice | No |
| Owner willingness | Rating | No |
| Development potential | Rating | No |
| JV willingness | Yes/No | No |
| Known title dispute | Yes/No | **Yes** |
| Road accessibility | Numeric | No |
| Regulatory red flags | Yes/No | **Yes** |

---

## 9. AI Readiness

Every criterion in the library has an optional `aiInstructions` field. When AI agents are deployed, the evaluation engine becomes the instruction set:

```
Criterion: "Expected Selling Price"
Guidance: "Review comparable projects, recent transactions, and company historical sales."
AI Instructions: "Use property listing data within 2km radius. Weight recent transactions (< 6 months)
higher. Compare against 3+ comparable projects. Flag if proposed price deviates > 10% from average."
```

The engine's structured data model (response types, findings, evidence, recommendations) maps directly to AI agent outputs. AI assists — it does not silently make investment decisions.

---

_This specification is the implementation authority for the Evaluation Framework Engine. When in doubt, read the prototype — it demonstrates the intended user experience for every screen listed above._
