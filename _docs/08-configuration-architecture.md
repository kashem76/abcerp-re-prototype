# Configuration Architecture — Complete Specification

**Purpose:** This document defines how every configurable element in AbcERP Real Estate is organized, where it lives, how it's maintained, and what must never be hardcoded. It is the configuration governance document — the answer to "where does this setting belong?"

**Problem it solves:** The prototype currently has configuration scattered across 20+ files with no governing architecture. Department names appear in 8 different pages. GL accounts are hardcoded in booking, cancellation, and running bill forms. Approval thresholds live inside workflow definitions. Status values are duplicated everywhere. This is unmaintainable.

**Code Reference Counterpart:** `abcERPCode/07-abcerp-code-reference/13-real-estate-development/20-configuration-setup.md`

---

## 1. Core Principle

> **Non-Negotiable:**
> _Every value that could differ between two organizations using the same software is configuration, not code. Department names, GL accounts, approval thresholds, status labels, numbering formats, tax rates, forfeiture percentages, DLP periods, cost categories, response types — all configuration. The only things that are code are the engine behaviors: "post a journal entry", "compute IRR", "advance stage when conditions met."_

### The Test

Before hardcoding any value, ask: "Would a company in UAE need a different value here than a company in Bangladesh?" If yes, it's configuration.

| Example | Bangladesh | UAE | Verdict |
|---|---|---|---|
| Retention percentage | 5-10% | 5-10% | Config (varies by company) |
| TDS rate | 2-3% | 0% (no TDS) | Config |
| DLP period | 12 months | 12-24 months | Config |
| Currency | BDT | AED | Config |
| Land record fields | Khatian, Dag, Mouza | Title Deed No., Plot No. | Config (template) |
| RAJUK approval | Yes | No (Dubai Municipality) | Config (template) |
| IRR computation formula | Same | Same | **Code** |
| Double-entry posting | Same | Same | **Code** |
| Stage transition logic | Same | Same | **Code** |

---

## 2. Configuration Layers

All configuration in AbcERP follows a 4-layer hierarchy. Lower layers inherit from higher layers and can override where allowed.

```
LAYER 1 — PLATFORM DEFAULTS
    Hardcoded in code. Rarely changed. Universal across all industries.
    Examples: Account types (ASSET/LIABILITY/EQUITY/INCOME/EXPENSE),
    response type options (Rating/Pass-Fail/Numeric), stage engine behavior.

LAYER 2 — INDUSTRY PACK SEEDS
    Seeded when "Real Estate Development" is activated. Editable by admin.
    Examples: 25 GL accounts, 23 cost codes, 14 lifecycle stages,
    7 approval workflows, 12 numbering sequences, evaluation frameworks.

LAYER 3 — ORGANIZATION SETTINGS
    Set by admin during setup and ongoing. Per-organization.
    Examples: Retention %, TDS rate, DLP months, currency,
    approval thresholds, department names, role definitions.

LAYER 4 — TRANSACTION-LEVEL OVERRIDES
    Set per transaction where allowed. Exceptions to org defaults.
    Examples: Custom retention % on a specific contract,
    extended DLP for a specific unit, override price per sqft.
```

### Resolution Order

When the system needs a value (e.g., "what retention % to apply?"):
1. Check transaction-level override → if set, use it
2. Check organization settings → if set, use it
3. Check industry pack seed → if set, use it
4. Check platform default → always exists

---

## 3. Configuration Registry

Every configurable element in the system, categorized by domain.

### 3.1 Financial Parameters

| Parameter | Default (BD) | Where Set | Used By |
|---|---|---|---|
| Default Currency | BDT | Org Settings | All monetary displays and GL |
| Default Retention % | 5% | Org Settings | Running Bill, Contract |
| Default TDS Rate | 2% | Org Settings | Running Bill, Payment |
| Advance Recovery Rate | 10% per bill | Org Settings | Running Bill |
| Contingency % | 5% | Org Settings | Cost Estimation |
| Booking Forfeiture % | 10% | Org Settings | Booking Cancellation |
| Revenue Recognition Method | POC | Org Settings | Revenue Recognition engine |
| Minimum Discount Requiring Approval | 5% | Approval Workflow | Booking |
| Finance Rate (default) | 12% p.a. | Org Settings | Financial Model |
| Stamp Duty Rate | 3% | Org Settings | Land Registration |

### 3.2 Operational Parameters

| Parameter | Default | Where Set | Used By |
|---|---|---|---|
| DLP Period (months) | 12 | Org Settings | Handover, Closure |
| Staleness Threshold (days) | 30 | Org Settings | Financial Model assumptions |
| Overdue Warning (days before due) | 3 | Org Settings | Work Board, notifications |
| Aging Thresholds | 30d / 60d | Org Settings | Pipeline aging badges |
| Max Attachment Size (MB) | 25 | Org Settings | Evidence upload |
| Photo Compression | Yes | Org Settings | Site Visit, DSR |

### 3.3 Lifecycle & Stages

| Element | Count | Where Configured | Notes |
|---|---|---|---|
| Land Pipeline Stages | 7 | Settings > Lifecycle | NEW → ASSESSMENT → FEASIBILITY → DECISION → ACQUISITION → CONVERTED → CLOSED |
| Project Lifecycle Stages | 14 | Settings > Lifecycle | PLANNING → BOQ → TENDERING → PRE_SALES → CONSTRUCTION → ... → CLOSED |
| Stage Transition Rules | Per stage | Settings > Lifecycle | What business event triggers each transition |
| Stage Gate Conditions | Per stage | Settings > Lifecycle | What must be true before entering a stage |
| Allowed Operations | Per stage | Settings > Lifecycle | What transactions are permitted in each stage |

### 3.4 Numbering Sequences

| Entity | Format | Reset Rule | Where Configured |
|---|---|---|---|
| Land Lead | LL-{YYYY}-{SEQ:5} | Per Year | Settings > Numbering |
| Project | RE-{SEQ:5} | Never | Settings > Numbering |
| Evaluation | EVL-{YYYY}-{SEQ:5} | Per Year | Settings > Numbering |
| BOQ Line | BOQ-{PROJECT}-{SEQ:4} | Per Project | Settings > Numbering |
| Tender | TND-{PROJECT}-{SEQ:3} | Per Project | Settings > Numbering |
| Contract | CON-{PROJECT}-{SEQ:3} | Per Project | Settings > Numbering |
| Work Order | WO-{PROJECT}-{SEQ:3} | Per Project | Settings > Numbering |
| Running Bill | RA-{PROJECT}-{SEQ:3} | Per Project | Settings > Numbering |
| Material Requisition | MR-{PROJECT}-{SEQ:3} | Per Project | Settings > Numbering |
| Material Issue | MI-{PROJECT}-{SEQ:3} | Per Project | Settings > Numbering |
| Booking | BK-{PROJECT}-{SEQ:3} | Per Project | Settings > Numbering |
| Variation Order | VO-{PROJECT}-{SEQ:3} | Per Project | Settings > Numbering |

### 3.5 Approval Workflows

| Workflow | Steps | Thresholds | Where Configured |
|---|---|---|---|
| BOQ Approval | Estimator → QS → PM → Director | All amounts | Settings > Approval Workflows |
| Variation Order | PM → Director → CFO (if > threshold) | > ৳50L: CFO, > ৳5Cr: Board | Settings > Approval Workflows |
| Running Bill | Site Eng → PM → Director (if > threshold) | > ৳1Cr: Director | Settings > Approval Workflows |
| Material Requisition | Site Eng → PM | > ৳10L: PM approval | Settings > Approval Workflows |
| Booking Discount | Sales → Sales Head → Director | > 5%: Head, > 10%: Director | Settings > Approval Workflows |
| Booking Cancellation | Sales → Finance → Director | All amounts | Settings > Approval Workflows |
| Project Closure | PM → Director → CFO → MD | All amounts | Settings > Approval Workflows |

### 3.6 Dimension Rules

| Transaction Type | Required Dimensions | Where Configured |
|---|---|---|
| Running Bill | Project, WBS, Cost Code, CC | Settings > Dimension Rules |
| Material Issue | Project, WBS, Cost Code, CC | Settings > Dimension Rules |
| Booking Receipt | Project, Unit, PC | Settings > Dimension Rules |
| Revenue Recognition | Project, Unit, PC | Settings > Dimension Rules |
| Overhead Allocation | Project, CC, PC | Settings > Dimension Rules |
| Land Payment | Land (as cost object), CC | Settings > Dimension Rules |

### 3.7 Master Data

| Master | Count (Seed) | Where Managed | Used By |
|---|---|---|---|
| GL Accounts (RE-specific) | 25 | Core > Chart of Accounts | All GL postings |
| Cost Code Categories | 6 | Masters > Cost Codes | BOQ, Running Bill, Budget |
| Cost Codes | 23 | Masters > Cost Codes | BOQ lines, procurement, reporting |
| BOQ Item Templates | ~20 | Masters > BOQ Items | BOQ entry |
| Rate Analysis Templates | ~10 | Masters > Rate Templates | BOQ rate analysis |
| Departments | 8 | Core > Departments | Work Board, evaluations |
| Evaluation Frameworks | 3 | Settings > Land Evaluation > Frameworks | Land evaluation |
| Criteria Library | 54+ | Settings > Land Evaluation > Criteria | Evaluation |
| Selection Templates | 2 | Settings > Land Evaluation > Selection | Initial screening |
| Cost Estimation Categories | 17 | Settings > Land Evaluation > Cost | Construction cost estimate |
| Report Templates | 1 | Settings > Land Evaluation > Report | Management report |

### 3.8 Status & Enum Values

These are **platform defaults** (Layer 1) — they don't change per organization, but their **labels** can be localized.

| Domain | Status Values | Layer |
|---|---|---|
| Work Step | NOT_STARTED, WAITING, IN_PROGRESS, REVIEW, RETURNED, COMPLETE | Platform |
| Finding Severity | CRITICAL, HIGH, MEDIUM, LOW | Platform |
| Finding Status | OPEN, UNDER_REVIEW, RESOLVED, MONITORING, ACCEPTED | Platform |
| Decision | APPROVE, CONDITIONS, RETURN, REJECT | Platform |
| Criterion Response Type | YES_NO, PASS_FAIL, RATING_1_5, RISK_LEVEL, NUMBER, PERCENTAGE, CURRENCY, MEASUREMENT, DATE, SINGLE_CHOICE, MULTIPLE_CHOICE, CHECKLIST, TEXT_FINDINGS, FORMULA, RECOMMENDATION | Platform |
| Unit Status | AVAILABLE, RESERVED, BOOKED, SOLD, HANDED_OVER, CANCELLED, LANDOWNER | Platform |
| Payment Status | UPCOMING, DUE, OVERDUE, PAID, WAIVED | Platform |
| Agreement Type | PURCHASE, JOINT_VENTURE, LEASE, DEVELOPMENT_RIGHTS | Platform + Org can add |

---

## 4. Settings Screen Architecture

### 4.1 Settings Navigation

```
Settings (Hub)
├── General                         ← Currency, retention %, TDS, DLP, forfeiture %, revenue method
├── Lifecycle Stages                ← Land stages + Project stages, transitions, gate conditions
├── Numbering Sequences             ← 12 entity numbering patterns
├── Approval Workflows              ← 7 workflow templates with thresholds
├── Dimension Rules                 ← Required dimensions per transaction type
├── Land Evaluation                 ← Sub-hub for evaluation engine config
│   ├── Selection Templates         ← Quick screening criteria
│   ├── Evaluation Frameworks       ← Framework list
│   │   └── Framework Builder       ← 6 tabs: Structure, Team, Workflow, Scoring, Report, Preview
│   ├── Criteria Library            ← Reusable criteria pool
│   ├── Cost Categories             ← Construction estimation categories
│   └── Report Templates            ← Management report structure
└── Masters (separate section)
    ├── Cost Codes                  ← Cost classification with GL mapping
    ├── BOQ Items                   ← Reusable work item templates
    └── Rate Templates              ← Rate analysis component templates
```

### 4.2 Screen Responsibility Matrix

Each configurable element must have **exactly one** authoritative settings screen. No element should be configurable from two places.

| Element | Authoritative Screen | Read-Only In |
|---|---|---|
| Retention % | Settings > General | Contract form (shows default, allows override) |
| TDS Rate | Settings > General | Running Bill (applies automatically) |
| Department names | Core > Departments | Work Board, Evaluation, everywhere |
| GL Account codes | Core > Chart of Accounts | Cost Code Master (mapping), all GL previews |
| Approval thresholds | Settings > Approval Workflows | Transaction forms (shows "requires approval") |
| Cost codes | Masters > Cost Codes | BOQ entry, Running Bill, procurement |
| Evaluation criteria | Settings > Land Evaluation > Criteria | Step Assessment (renders form from config) |
| Numbering format | Settings > Numbering | All entity creation (auto-generates) |

---

## 5. What Must Change in the Prototype

### 5.1 Critical: Centralize Shared Constants

Currently, department names are hardcoded in 8+ files. Status colors are duplicated in 12+ files. Create a single source:

```
src/lib/config/
├── departments.ts          ← Department names, codes, default roles
├── status.ts               ← Status values, colors, icons for all domains
├── financial-defaults.ts   ← Retention %, TDS, DLP, forfeiture, currency
├── gl-accounts.ts          ← All GL account codes used in previews
├── stages.ts               ← Land stages + Project stages with colors
└── index.ts                ← Re-exports everything
```

**Rule:** No page file should contain a hardcoded department name, GL account code, status color, or financial parameter. Import from `@/lib/config`.

### 5.2 Important: Extract Inline Mock Config

These items are currently buried inside page files as inline constants. They should move to the config directory so they're maintainable:

| Currently In | What | Move To |
|---|---|---|
| `booking/new/page.tsx` | Payment plan milestones (20/20/25/35) | `config/financial-defaults.ts` |
| `booking/cancellation/page.tsx` | Forfeiture % (10%), GL accounts | `config/financial-defaults.ts`, `config/gl-accounts.ts` |
| `running-bill/new/page.tsx` | Deduction types (retention, TDS, advance) | `config/financial-defaults.ts` |
| `tender/new/page.tsx` | Document checklist items | `config/document-checklists.ts` |
| `variation/new/page.tsx` | Approval step definitions | `config/approval-workflows.ts` |
| `dsr/new/page.tsx` | Trade types, equipment types | `config/operational-masters.ts` |
| Multiple work pages | Department names, assignee lists | `config/departments.ts` |

### 5.3 Nice-to-Have: Settings Should Drive Screens

In the production system, operational screens must read from Settings, not from their own constants. The prototype can demonstrate this pattern even with mock data:

```typescript
// BAD — hardcoded in page file
const retentionRate = 0.05;
const tdsRate = 0.02;

// GOOD — imported from config (today: static, tomorrow: from DB)
import { financialDefaults } from "@/lib/config";
const retentionRate = financialDefaults.retentionPercent;
const tdsRate = financialDefaults.tdsRate;
```

---

## 6. Configuration Governance Rules

### Rule 1: Single Source of Truth
Every configurable value has exactly one place where it's defined. All other uses import from that source.

### Rule 2: Settings Drive Operation
Operational screens read from configuration, never from inline constants. If a setting changes, every screen that uses it reflects the change automatically.

### Rule 3: Industry Pack Is Additive Only
Activating the RE pack seeds configuration but never modifies core config. Deactivating hides RE screens but never deletes data.

### Rule 4: Override Flows Downward
Platform defaults → Industry seeds → Organization settings → Transaction overrides. Each layer can override the layer above. No layer can override a layer below.

### Rule 5: Every Override Is Auditable
When a transaction uses an override value (e.g., custom retention % on a contract), the system records both the default and the override with the user who changed it.

### Rule 6: Enums Are Platform, Labels Are Config
Status values (APPROVED, REJECTED) are platform code. Display labels ("Approved", "মঞ্জুর") are configuration that can be localized.

### Rule 7: Templates Are Not Code
Evaluation criteria, document checklists, approval workflows, numbering patterns — these are templates seeded from industry packs and editable by admins. The engine that processes them is code. The content is configuration.

---

## 7. Prototype Implementation Plan

### Phase 1: Create `src/lib/config/` (Immediate)

Extract all shared constants into the config directory. No screen changes — just centralize the source.

| File | What It Contains | Lines Saved Across Codebase |
|---|---|---|
| `departments.ts` | 8 department objects with name, code, members | ~80 lines removed from 8 files |
| `status.ts` | Status configs for WorkStep, Finding, Decision, Unit, Payment | ~120 lines removed from 12 files |
| `financial-defaults.ts` | Retention, TDS, DLP, forfeiture, currency, payment plans | ~40 lines removed from 5 files |
| `gl-accounts.ts` | All GL account codes used in previews | ~30 lines removed from 6 files |
| `stages.ts` | Land + Project stage definitions with colors | ~50 lines removed from 4 files |

### Phase 2: Update Page Imports (After Phase 1)

Replace inline constants in each page with imports from `@/lib/config/`. This is mechanical — no UX changes.

### Phase 3: Document (Done — This File)

This document is the governance reference. Developers check it before adding any new configurable element.

---

## 8. Cross-Reference: Settings Screens Built

| # | Route | Status | What It Configures |
|---|---|---|---|
| 1 | `settings/` | DONE | General params (currency, retention, TDS, DLP, forfeiture, revenue method) |
| 2 | `settings/lifecycle` | DONE | 10 project stages, transitions, gate conditions, allowed operations |
| 3 | `settings/numbering` | DONE | 12 entity numbering sequences |
| 4 | `settings/approval-workflows` | DONE | 7 workflows, role chains, SLAs, conditional rules |
| 5 | `settings/dimension-rules` | DONE | 6 dimension requirements per transaction type |
| 6 | `settings/land-evaluation` | DONE | Hub for 7 sub-screens (Selection, Frameworks, Criteria, Cost, Report) |
| 7 | `masters/cost-codes` | DONE | 18 cost codes in 6 categories |
| 8 | `masters/boq-items` | DONE | 8 BOQ item templates |
| 9 | `masters/rate-templates` | DONE | 8 rate analysis templates |

**Not Yet Built:**
- Role & Permission Matrix configuration UI
- GL Account mapping UI (currently hardcoded in cost code master)
- Document checklist templates (currently inline)
- Notification & escalation rules configuration
- Dashboard widget configuration

---

_Configuration is the difference between software that works for one company and software that works for any company. Get this right and every other module becomes portable._
