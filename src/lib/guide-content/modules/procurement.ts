import type { ModuleGuide } from "../types";

export const procurementGuide: ModuleGuide = {
  moduleId: "procurement",
  moduleName: "Procurement",
  overview: {
    description:
      "End-to-end procurement from material requisition to supplier payment. Tender management with bid evaluation, contract lifecycle, work orders, and rate intelligence.",
    personas: [
      { role: "Site Engineer", does: "Raises material requisitions from site need" },
      { role: "Procurement Manager", does: "Manages tenders, evaluates bids, negotiates contracts" },
      { role: "QS", does: "Reviews comparative statements, validates rates" },
      { role: "Finance", does: "Approves POs above threshold, tracks AP" },
    ],
    workflow: [
      "Site raises MR",
      "MR approval (checks BOQ qty & budget)",
      "Create Tender from BOQ work package",
      "Invite suppliers",
      "Receive bids",
      "Comparative Statement",
      "Award contract",
      "Issue Work Orders",
      "Track delivery",
      "Process payment",
    ],
  },
  stories: {
    summary: "From site need to supplier payment — every rupee tracked.",
    items: [
      { id: "PR-01", role: "Site Engineer", story: "Raise MR linked to BOQ item — remaining qty auto-checked" },
      { id: "PR-02", role: "Procurement", story: "Create tender from BOQ work package with pre-filled scope" },
      { id: "PR-03", role: "Procurement", story: "Comparative statement ranking suppliers by price, delivery, quality" },
      { id: "PR-04", role: "QS", story: "Rate intelligence: current vs last PO vs market vs company average" },
      { id: "PR-05", role: "Finance", story: "PO approval routing based on value thresholds" },
    ],
  },
  flow: {
    title: "Procurement Cycle",
    description: "Material requisition to supplier payment",
    steps: [
      { label: "Material Requisition (MR)", sub: "Site engineer raises MR linked to BOQ item", color: "blue", branch: { label: "Auto-Checks", steps: [{ label: "BOQ remaining quantity check", color: "amber" }, { label: "Budget availability check", color: "amber" }] } },
      { label: "MR Approval", sub: "PM approves based on need and budget", color: "purple" },
      { label: "Tender Creation", sub: "Create tender from BOQ work package, invite suppliers", color: "blue" },
      { label: "Bid Receipt & Evaluation", sub: "Suppliers submit bids, system auto-ranks", color: "amber" },
      { label: "Comparative Statement", sub: "Side-by-side comparison: price, delivery, quality, history", color: "purple" },
      { label: "Contract Award", sub: "Select supplier, define terms (retention %, advance, TDS)", color: "green" },
      { label: "Work Order", sub: "Issue specific scope of work under contract", color: "blue" },
      { label: "Delivery & Inspection", sub: "Material received, quality checked, gate pass generated", color: "amber" },
      { label: "Running Bill / Payment", sub: "Measurement-based billing with auto-deductions → GL posting", color: "green" },
    ],
  },
  value: {
    summary: "From phone-call procurement to data-driven sourcing.",
    painPoints: [
      "Procurement via phone calls with no rate history",
      "No supplier comparison — decisions based on relationships",
      "Manual tracking with no contract-to-payment traceability",
    ],
    outcomes: [
      "Rate intelligence with trend analysis across projects",
      "Automated bid comparison with configurable ranking criteria",
      "Full contract-to-payment traceability",
    ],
    timeSavings: "Tender evaluation: days → hours with auto-ranked comparative statements",
  },
  technical: {
    summary: "BOQ-linked procurement with auto-computed deductions on running bills.",
    architectureNotes: [
      "MR checks BOQ remaining quantity and budget availability before approval",
      "Tender links to BOQ items for scope definition",
      "Comparative Statement auto-ranks by configurable criteria",
      "Contract types: Item Rate, Lump Sum",
      "Deductions on running bills: retention, advance recovery, TDS (auto-computed)",
    ],
  },
};
