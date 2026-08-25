# Variation & Change Control — Complete Specification

**Module:** Change Requests, Variation Orders, Budget Impact, Authority Matrix, BOQ Versioning
**Code Reference:** `18-variation-change-control.md`
**Prototype Screens:** Variation Order (Change Request + VO + Budget Impact)

---

## 1. Overview & Core Principle

Changes during construction are inevitable — soil conditions differ from investigation, architects revise drawings, clients request additions, material prices fluctuate. Without a formal process, these changes silently inflate costs and erode profit.

This module enforces a strict chain: **Issue Identified → Change Request → Evaluation → Approval → Variation Order → Budget Updated → Contractor Notified**. The locked baseline BOQ is never touched.

> **Non-Negotiable Core Principle:**
> _The original approved BOQ (Baseline V1) is permanently immutable (ADR-006). Every budget change must originate from an approved Variation Order. The budget waterfall — Baseline + Approved VOs = Current Approved Budget — must reconcile at every period close._

---

## 2. Real-World Workflow

### What Actually Happens on Site

1. **Site engineer discovers** pile depth needs to increase from 55ft to 65ft due to unexpected soil at Tower B.
2. **Raises a Change Request (CR)** with source: Site Condition. Describes the issue, attaches bore-log evidence.
3. **QS evaluates cost impact:** 4 additional piles × ৳450,000/pile = ৳1.8M. Schedule: +5 days. On critical path: Yes.
4. **PM reviews.** Checks contingency: ৳12.4M remaining → ৳10.6M after this VO. Acceptable.
5. **Approval chain:** PM approves (< ৳50L). If > ৳50L → Director. If > ৳5Cr → Board. Source: Config > Approval Workflows > VO.
6. **Variation Order issued.** BOQ version V3 → V4 (delta: +4 pile lines). Budget updated. Contractor notified.
7. **Work proceeds.** Contractor bills against the updated BOQ.

### Change Request Sources

| Source | Example | Typical % of Changes |
|---|---|---|
| Site Condition | Unexpected soil, water table, rock | 25-30% |
| Design Change | Architect revises layout, MEP routing | 20-25% |
| Client Request | Buyer wants extra bedroom, different finishing | 15-20% |
| Regulatory | Authority requires additional setback, fire exit | 10-15% |
| Error Correction | Drawing error, measurement error | 5-10% |
| Value Engineering | Cheaper alternative that meets spec | 5-10% |
| Market Condition | Material price escalation beyond contingency | 5% |

---

## 3. Entity Model with Data Sources

### Change Request (CR)

| Field | Source |
|---|---|
| CR Reference | Auto-generated. Config: Settings > Numbering |
| Source | User selects. Config: CR source types (Site Condition, Design Change, etc.) |
| Description | User input |
| WBS Affected | User selects from ProjectWBS tree |
| Evidence / Attachments | User uploads (photos, bore-logs, revised drawings) |
| Priority | User selects: Low / Medium / High / Critical |
| Raised By | Auto: current user |
| Raised Date | Auto: now |

### Impact Assessment (on CR)

| Field | Source |
|---|---|
| BOQ Impact Lines | User adds: item, qty change, rate, additional cost |
| BOQ Items affected | From ProjectBOQLine[] (existing lines being modified) or new items |
| Cost Impact | Computed: SUM(additional cost lines) |
| Schedule Impact (days) | User input |
| On Critical Path? | User selects: Yes / No |
| Mitigation Plan | User input |
| Contingency Before | Computed: original contingency − SUM(prior approved VOs) |
| Contingency After | Computed: before − this VO cost |
| Budget Impact Summary | Computed: Current Budget → Revised Budget |

### Variation Order (VO)

| Field | Source |
|---|---|
| VO Reference | Auto-generated. Config: Settings > Numbering > VO format |
| Source CR | From approved Change Request |
| VO Lines | From CR impact assessment (cost lines) |
| Cost Code per line | User selects. Source: Masters > Cost Codes |
| WBS per line | From CR WBS affected |
| BOQ Version Created | Auto: current version + 1 (delta) |
| Approval Status | Config: Settings > Approval Workflows > VO |
| Authority Level | Computed from VO value vs threshold. Config: approval thresholds |

### Approval Thresholds

| VO Value | Authority Required | Source |
|---|---|---|
| ≤ ৳10 Lakh | Project Manager | Config: Settings > Approval Workflows > VO |
| ৳10L - ৳50 Lakh | Project Director | Config |
| ৳50L - ৳5 Crore | CFO + Director | Config |
| > ৳5 Crore | Board / MD | Config |

### Budget Waterfall

```
BASELINE (V1)           ৳806M       Source: Locked BOQ
+ VO-001 (soil)         +৳4.2M      Approved 15 Aug
+ VO-002 (waterproof)   +৳1.8M      Approved 22 Aug
+ VO-003 (client req)   +৳3.5M      Pending approval
─────────────────────────────────
CURRENT APPROVED        ৳812M       = Baseline + Approved VOs
PENDING                 +৳3.5M      = Submitted, not yet approved
FORECAST (EAC)          ৳815.5M     = Current + Pending + Estimated future

Original Contingency    ৳40M        Source: BOQ contingency line
Used by VOs             −৳6.0M
Remaining               ৳34M        ← If this hits zero, management alert
```

---

## 4. Business Rules

- Change Requests can be raised by any project team member. Approval is required before VO is issued.
- A CR can result in: Approved → VO, Rejected (with reason), or Deferred.
- Every approved VO creates a BOQ version delta — the original BOQ remains untouched.
- Budget = Baseline + SUM(Approved VO deltas). Not manually editable.
- Contingency is tracked as a budget line. Each VO draws from contingency first.
- When contingency reaches zero, a management alert is triggered. Further VOs require explicit funding approval.
- VOs affecting contractor scope require contractor acknowledgment and contract amendment.
- VO cost lines must reference valid cost codes and WBS nodes.
- Schedule impact feeds project timeline (if on critical path, project end date adjusts).

---

## 5. Configuration Dependencies

| Config / Master | How VO Module Uses It |
|---|---|
| Settings > Numbering | CR and VO reference formats |
| Settings > Approval Workflows > VO | Approval chain with amount thresholds |
| Settings > General > contingencyPercent | Original contingency in BOQ |
| Masters > Cost Codes | Classification on VO lines → GL account |
| Project > BOQ (BASELINE) | Locked baseline that VOs modify as deltas |
| Project > WBS | WBS nodes affected by changes |

---

## 6. What's Built in Prototype

| Screen | Route | Status |
|---|---|---|
| Variation Order (CR + VO + Budget Impact) | `variation/new` | DONE — full workflow |

---

_Variation control is not bureaucracy — it's the difference between a project that costs what you planned and one that silently overruns. Every uncontrolled change is profit leaking through the cracks._
