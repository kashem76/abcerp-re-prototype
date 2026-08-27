import type { ModuleGuide } from "../types";

export const siteEngineeringGuide: ModuleGuide = {
  moduleId: "site-engineering",
  moduleName: "Site Engineering",
  overview: {
    description:
      "Daily site operations: DSR (manpower, equipment, work done, issues, photos), material management (requisition → issue → consumption), contractor billing (running bills with measurement-based invoicing), and variation orders.",
    personas: [
      { role: "Site Engineer", does: "Files DSR daily, raises MRs, tracks issues" },
      { role: "Store Keeper", does: "Manages material issue, gate passes, stock levels" },
      { role: "QS", does: "Prepares running bills from measurements, manages variations" },
      { role: "Project Director", does: "Reviews daily progress, SPI/CPI" },
    ],
    workflow: [
      "Log manpower by trade",
      "Record equipment usage",
      "Document work done against WBS",
      "Log issues with severity",
      "Attach site photos",
      "Submit DSR",
      "Take measurements → Map to BOQ",
      "Prepare running bill",
      "Apply deductions (retention, advance, TDS)",
      "Approval → GL posting → Payment",
    ],
  },
  stories: {
    summary: "Daily site reality captured digitally — from DSR to running bill.",
    items: [
      { id: "SE-01", role: "Site Engineer", story: "File DSR with 5 tabs: manpower, equipment, work, issues, photos" },
      { id: "SE-02", role: "Store Keeper", story: "Material stock status with days-left and critical/low alerts" },
      { id: "SE-03", role: "QS", story: "Running bill auto-computing retention, advance recovery, and TDS" },
      { id: "SE-04", role: "QS", story: "Variation order with cost impact and schedule impact assessment" },
      { id: "SE-05", role: "Engineer", story: "BOQ consumption tracking: planned vs purchased vs consumed vs wasted" },
    ],
  },
  flow: {
    title: "Daily Site Operations",
    description: "Two cycles: daily reporting + contractor billing",
    steps: [
      { label: "Morning: Check Dashboard", sub: "Weather, manpower, equipment, active work fronts", color: "blue" },
      { label: "Record Manpower", sub: "Trade-wise count with contractor and overtime", color: "blue" },
      { label: "Record Equipment", sub: "Crane, generator, mixer — hours, status, idle reason", color: "blue" },
      { label: "Record Work Done", sub: "Map progress against WBS nodes", color: "amber" },
      { label: "Log Issues", sub: "Description, severity, action taken, photos", color: "red" },
      { label: "Submit DSR", sub: "5-tab daily report → PM review", color: "green" },
      { label: "Material Management", sub: "MR → Issue → Gate Pass → Consumption tracking", color: "purple", branch: { label: "Stock Alerts", steps: [{ label: "CRITICAL: < 3 days remaining", color: "red" }, { label: "LOW: 3-7 days remaining", color: "amber" }, { label: "OK: > 7 days remaining", color: "green" }] } },
      { label: "Running Bill Preparation", sub: "Take measurements → map to BOQ → compute deductions", color: "amber" },
      { label: "Running Bill Approval & GL", sub: "DR WIP / CR AP, Retention, Advance Recovery, TDS", color: "green" },
    ],
  },
  value: {
    summary: "From paper DSR and manual deductions to real-time digital site ops.",
    painPoints: [
      "DSR on paper/WhatsApp — no structured data, no trend analysis",
      "Running bills in Excel with manual deduction calculation",
      "No material consumption tracking — waste invisible",
    ],
    outcomes: [
      "Digital DSR with real-time progress against WBS",
      "Auto-calculated running bill deductions",
      "Material consumption vs BOQ tracking in real time",
    ],
    timeSavings: "Running bill deductions: 30-45 min → instant. Material tracking: non-existent → real-time.",
  },
  technical: {
    summary: "Structured DSR capture with auto-computed running bill GL postings.",
    glEntries: [
      "Running bill: DR Construction WIP (cost code GL) / CR AP-Contractor, CR Retention Payable, CR Advance Recovery, CR TDS Payable",
      "Retention is BS liability, not discount (ADR-009)",
      "Material issue posts GL automatically with gate pass generation",
    ],
    architectureNotes: [
      "DSR captures: manpower by trade/contractor, equipment with hours/idle reason, work done against WBS with progress %",
    ],
  },
};
