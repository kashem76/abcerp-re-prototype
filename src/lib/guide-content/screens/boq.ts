import type { ScreenGuide } from "../types";

export const boqGuide: ScreenGuide = {
  route: "/real-estate/boq",
  screenName: "BOQ & Estimation",
  overview: {
    description:
      "Bill of Quantities with items, WBS, quantities (BOQ vs Actual), rates, amounts, and variance %. Locked baseline banner. Variance alerts for items exceeding threshold.",
    personas: [
      { role: "QS", does: "Manages BOQ items and tracks variance" },
      { role: "Director", does: "Reviews variance alerts" },
    ],
    workflow: [
      "Review BOQ items with real-time variance",
      "Check locked baseline status",
      "Investigate items exceeding 10% variance",
    ],
  },
  stories: {
    summary: "Immutable baseline with real-time variance tracking",
    items: [
      { id: "B01", role: "QS", story: "BOQ table with real-time variance tracking (BOQ vs Actual)" },
      { id: "B06", role: "QS", story: "Locked baseline — all changes only via Variation Orders" },
      { id: "B07", role: "Director", story: "Variance alerts highlighting items exceeding 10% threshold" },
    ],
  },
  flow: {
    title: "BOQ Lifecycle",
    description: "From estimation to locked baseline",
    steps: [
      { label: "Build WBS Hierarchy", sub: "Project → Tower → Trade → Activity", color: "blue" },
      { label: "Create BOQ Lines", sub: "WBS + Cost Code + Quantity + Rate", color: "blue" },
      { label: "Measurement Sheets", sub: "Nos × L × W × H formula-driven quantities", color: "amber" },
      { label: "Rate Analysis", sub: "Material + Labour + Equipment + Overhead breakdown", color: "amber" },
      { label: "BOQ Approval", sub: "Estimator → QS → Director → CFO (threshold-based)", color: "purple" },
      { label: "Lock Baseline (V1)", sub: "Immutable — all changes via Variation Orders only", color: "green", active: true },
      { label: "Generate Budget", sub: "Auto-creates BudgetLine entries from approved BOQ", color: "green" },
      { label: "Monitor Variance", sub: "BOQ Amount vs Actual Amount — alerts at >10%", color: "amber", branch: { label: "Change Path", steps: [{ label: "Raise Variation Order for scope changes", color: "amber" }, { label: "VO creates BOQ delta (V1 → V2)", color: "purple" }, { label: "Budget updated: Baseline + VOs = Current", color: "green" }] } },
    ],
  },
  value: {
    summary: "Version-controlled BOQ replacing untracked Excel",
    painPoints: [
      "BOQ in Excel, no version control or variance tracking",
      "Changes made without audit trail",
    ],
    outcomes: [
      "Immutable baseline after approval",
      "Real-time variance alerts",
      "Full audit trail via Variation Orders",
    ],
  },
  technical: {
    summary: "Baseline immutability and variance calculation",
    dataFlow: [
      "Variance = (Actual − BOQ) / BOQ × 100",
      "Each approved BOQ line creates a BudgetLine entry",
      "All changes tracked via Variation Orders (new BOQ version deltas)",
    ],
    architectureNotes: [
      "BOQ baseline immutable after approval (ADR-006)",
    ],
  },
};
