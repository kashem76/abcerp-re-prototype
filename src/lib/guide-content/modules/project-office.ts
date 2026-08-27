import type { ModuleGuide } from "../types";

export const projectOfficeGuide: ModuleGuide = {
  moduleId: "project-office",
  moduleName: "Project Office",
  overview: {
    description:
      "Project lifecycle management from setup through closure. 14-stage lifecycle with gate conditions. WBS builder, BOQ estimation with measurement sheets and rate analysis, budget generation, variation control, handover, and closure.",
    personas: [
      { role: "Project Manager", does: "Project setup, WBS, monitoring, team coordination" },
      { role: "Quantity Surveyor", does: "BOQ creation, measurement, rate analysis, variation costing" },
      { role: "Project Director", does: "SPI/CPI monitoring, contractor oversight, critical path" },
      { role: "Finance", does: "Budget allocation, cost center mapping, period close" },
    ],
    workflow: [
      "Create Project (from land or standalone)",
      "Define WBS hierarchy",
      "Create BOQ lines with measurements",
      "Rate analysis",
      "BOQ approval → Lock baseline",
      "Generate budget",
      "Monitor budget vs actual",
      "Manage variations",
      "Handover units",
      "Close project",
    ],
  },
  stories: {
    summary: "From project setup to closure — every deliverable tracked.",
    items: [
      { id: "PO-01", role: "PM", story: "Create project from approved land with auto-carry-forward of feasibility data" },
      { id: "PO-02", role: "QS", story: "Add BOQ line by selecting WBS node + cost code + item from master" },
      { id: "PO-03", role: "QS", story: "Measurement sheet with formula-driven quantities" },
      { id: "PO-04", role: "Director", story: "SPI/CPI dashboard with contractor performance" },
      { id: "PO-05", role: "PM", story: "Variation orders tracked against contingency budget" },
      { id: "PO-06", role: "PM", story: "Automated closure checks before sealing project" },
    ],
  },
  flow: {
    title: "Project Lifecycle (14 Stages)",
    description: "From project setup through sealed closure",
    steps: [
      { label: "Planning", sub: "Define phases, units, WBS hierarchy, assign team", color: "blue" },
      { label: "BOQ Estimation", sub: "Create BOQ lines with measurements and rate analysis", color: "blue" },
      { label: "BOQ Approval & Baseline", sub: "Multi-level approval → lock immutable baseline (V1)", color: "purple", branch: { label: "After Lock", steps: [{ label: "Budget auto-generated from BOQ", color: "green" }, { label: "All changes only via Variation Orders", color: "amber" }] } },
      { label: "Tendering", sub: "Bids received, comparative statements, contract award", color: "amber" },
      { label: "Pre-Sales", sub: "Marketing launched, pricing set, bookings open", color: "green" },
      { label: "Construction", sub: "DSR, material management, running bills, progress tracking", color: "amber" },
      { label: "Sales & Collection", sub: "Unit bookings, payment schedules, demand letters, AR aging", color: "green" },
      { label: "Finishing", sub: "Punch lists, final bills, QC sign-offs", color: "purple" },
      { label: "Handover", sub: "Unit inspection → snag list → clearances → key transfer → revenue recognition", color: "green" },
      { label: "Defect Liability", sub: "12-24 months: track snags, hold retention, warranty claims", color: "amber" },
      { label: "Closed", sub: "All checks passed → project sealed permanently", color: "slate", branch: { label: "Closure Checks", steps: [{ label: "All units handed over, WIP = 0", color: "green" }, { label: "AR = 0, no open POs/WOs", color: "green" }, { label: "Retentions released, DLP cases closed", color: "green" }, { label: "Feasibility vs Actual reviewed", color: "blue" }] } },
    ],
  },
  value: {
    summary: "From disconnected Excel BOQ to immutable baseline with real-time variance.",
    painPoints: [
      "BOQ in Excel — no version control, no audit trail",
      "BOQ disconnected from budget and actuals",
      "Variation orders tracked in Word/email with no cost traceability",
    ],
    outcomes: [
      "Immutable BOQ baseline (ADR-006) — all changes via versioned VOs",
      "Budget auto-generated from approved BOQ",
      "Real-time variance tracking across all dimensions",
    ],
    timeSavings: "BOQ to budget generation: 1-2 days → instant",
  },
  technical: {
    summary: "14-stage lifecycle with module activation matrix and immutable BOQ baseline.",
    architectureNotes: [
      "14-stage lifecycle with module activation matrix",
      "BOQ baseline immutable after approval (ADR-006)",
      "Seven dimensions on every transaction (ADR-003)",
      "Budget auto-generated from approved BOQ",
      "Closure checks: all units handed over, WIP=0, AR=0, no open POs, all retentions released",
      "Feasibility vs Actual comparison at closure",
    ],
  },
};
