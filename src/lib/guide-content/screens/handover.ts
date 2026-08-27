import type { ScreenGuide } from "../types";

export const handoverGuide: ScreenGuide = {
  route: "/real-estate/handover",
  screenName: "Handover",
  overview: {
    description:
      "Unit handover workflow — pre-handover inspection, snag list, buyer walkthrough, clearance checklist (financial, technical, legal, utility, municipal), key transfer.",
    personas: [
      { role: "PM", does: "Manages handover checklist and clearances" },
      { role: "QS", does: "Assigns snag list items to contractors" },
      { role: "Finance", does: "Triggers revenue recognition at handover" },
    ],
    workflow: [
      "Pre-handover inspection",
      "Generate and assign snag list",
      "Buyer walkthrough",
      "Verify all clearances (financial, technical, legal, utility, municipal)",
      "Key transfer",
    ],
  },
  stories: {
    summary: "Structured handover with revenue recognition",
    items: [
      { id: "H01", role: "PM", story: "Handover checklist ensuring all clearances before key transfer" },
      { id: "H02", role: "QS", story: "Snag list assigned to contractors for rectification" },
      { id: "H03", role: "Finance", story: "Revenue recognition triggered at handover (completed contract method)" },
    ],
  },
  flow: {
    title: "Unit Handover Workflow",
    description: "Inspection to revenue recognition",
    steps: [
      { label: "Pre-Handover Inspection", sub: "Engineer inspects unit before buyer visit", color: "blue", active: true },
      { label: "Snag List Created", sub: "Defects logged, assigned to contractor for fix", color: "amber" },
      { label: "Buyer Walkthrough", sub: "Customer inspects, additional snags added", color: "blue" },
      { label: "Snag Rectification", sub: "Contractor fixes all items, engineer verifies", color: "amber" },
      { label: "Clearance Checklist", sub: "Financial, technical, legal, utility, municipal", color: "purple", branch: { label: "All Must Clear", steps: [{ label: "Financial: all dues paid", color: "green" }, { label: "Technical: snags resolved", color: "green" }, { label: "Legal: agreement signed", color: "green" }, { label: "Utility: connections active", color: "green" }] } },
      { label: "Key Handover", sub: "Documents transferred, keys handed over", color: "green" },
      { label: "Revenue Recognition", sub: "GL: DR AR, CR Revenue; DR COGS, CR WIP", color: "green" },
      { label: "DLP Period Starts", sub: "12-24 months defect liability, retention held", color: "slate" },
    ],
  },
  value: {
    summary: "Structured workflow replacing paper registers",
    painPoints: [
      "Handover tracked in paper registers, snags lost",
      "Clearances missed, revenue recognition delayed",
    ],
    outcomes: [
      "Structured handover workflow",
      "Tracked snag resolution",
      "Automated revenue recognition at key transfer",
    ],
  },
  technical: {
    summary: "GL entries at handover and DLP trigger",
    glEntries: [
      "DR AR, CR Revenue",
      "DR COGS, CR WIP",
      "DR Booking Advance (liability), CR AR",
    ],
    dataFlow: [
      "Unit status: SOLD → HANDED_OVER",
      "Triggers DLP period start (configurable: 12-24 months)",
      "Snags assigned to contractor under warranty obligation",
    ],
  },
};
