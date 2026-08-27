import type { ScreenGuide } from "../types";

export const runningBillGuide: ScreenGuide = {
  route: "/real-estate/running-bill",
  screenName: "Running Bills",
  overview: {
    description:
      "Contractor invoicing from site measurements. Links BOQ items to measured quantities, auto-applies deductions (retention, advance recovery, TDS), shows GL preview before approval.",
    personas: [
      { role: "QS", does: "Prepares running bills from measurements" },
      { role: "Finance", does: "Reviews GL entries and approves payment" },
    ],
    workflow: [
      "Link BOQ items to measured quantities",
      "Auto-calculate deductions (retention, advance, TDS)",
      "Preview GL entries",
      "Submit for approval",
    ],
  },
  stories: {
    summary: "Measurement-based billing with auto-deductions",
    items: [
      { id: "C10", role: "QS", story: "Running bill with auto-computed deductions (retention, advance, TDS)" },
      { id: "C11", role: "QS", story: "GL preview before submitting running bill for approval" },
      { id: "C12", role: "Finance", story: "Running bill posting real GL entries with seven dimensions" },
    ],
  },
  flow: {
    title: "Running Bill Process",
    description: "Measurement to GL posting with auto-deductions",
    steps: [
      { label: "Take Site Measurements", sub: "Physical measurement of completed work", color: "blue" },
      { label: "Map to BOQ Items", sub: "Link measurements to BOQ line items", color: "blue" },
      { label: "Compute Gross Amount", sub: "Measured quantity × contracted rate", color: "amber" },
      { label: "Auto-Apply Deductions", sub: "System computes retention, advance recovery, TDS", color: "purple", active: true, branch: { label: "Deduction Breakdown", steps: [{ label: "Retention: gross × retention % (5-10%)", color: "amber" }, { label: "Advance Recovery: proportional to progress", color: "amber" }, { label: "TDS: gross × TDS rate (per NBR)", color: "amber" }] } },
      { label: "GL Preview", sub: "Review journal entries before submission", color: "purple" },
      { label: "Approval", sub: "QS → PM → Finance (threshold-based routing)", color: "green" },
      { label: "GL Posting", sub: "DR WIP / CR AP, Retention, Advance, TDS", color: "green" },
    ],
  },
  value: {
    summary: "Zero manual calculation replacing error-prone Excel",
    painPoints: [
      "Running bills in Excel, deductions calculated manually (errors common)",
      "GL posted separately by accountant",
    ],
    outcomes: [
      "Measurement-based billing",
      "Auto-calculated deductions",
      "GL posted at approval, zero manual calculation",
    ],
  },
  technical: {
    summary: "GL entries with retention, advance recovery, and TDS",
    glEntries: [
      "DR Construction WIP (from cost code GL mapping)",
      "CR AP-Contractor (net payable)",
      "CR Retention Payable (BS liability — ADR-009)",
      "CR Advance Recovery",
      "CR TDS Payable",
    ],
    dataFlow: [
      "Retention = gross × retention % (configurable, typically 5-10%)",
      "TDS = gross × TDS rate (per NBR rules)",
    ],
  },
};
