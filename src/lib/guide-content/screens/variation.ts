import type { ScreenGuide } from "../types";

export const variationGuide: ScreenGuide = {
  route: "/real-estate/variation",
  screenName: "Variation Orders",
  overview: {
    description:
      "Change control for scope/cost changes. Sources: site condition, design change, client request, regulatory, error, value engineering. Tracks cost impact, schedule impact, contingency burn.",
    personas: [
      { role: "QS", does: "Raises variation orders with impact assessment" },
      { role: "PM", does: "Routes approvals based on value thresholds" },
      { role: "Director", does: "Monitors contingency burn rate" },
    ],
  },
  stories: {
    summary: "Structured change control with contingency tracking",
    items: [
      { id: "V01", role: "QS", story: "Raise variation order with cost and schedule impact" },
      { id: "V02", role: "PM", story: "Approval routing based on VO value thresholds" },
      { id: "V03", role: "Director", story: "Contingency burn rate and remaining budget visibility" },
    ],
  },
  flow: {
    title: "Variation Order Flow",
    description: "Change request to budget update",
    steps: [
      { label: "Change Request Raised", sub: "Source: site condition, design, client, regulatory, error", color: "blue", active: true },
      { label: "Cost Impact Assessment", sub: "QS evaluates affected BOQ lines, additional cost", color: "amber" },
      { label: "Schedule Impact", sub: "Days added, critical path affected?", color: "amber" },
      { label: "Approval Chain", sub: "PM (<5L) → Director (<25L) → CFO (<1Cr) → Board (>1Cr)", color: "purple" },
      { label: "VO Approved", sub: "Creates BOQ version delta (e.g. V3 → V4)", color: "green", branch: { label: "Budget Impact", steps: [{ label: "Baseline + All Approved VOs = Current Budget", color: "green" }, { label: "Contingency: original − used = remaining", color: "amber" }] } },
      { label: "Work Execution", sub: "Additional scope executed, tracked via DSR", color: "blue" },
    ],
  },
  value: {
    summary: "Formal change control replacing verbal instructions",
    painPoints: [
      "Change orders in emails/verbal instructions, no cost tracking",
      "Budget overruns discovered late",
    ],
    outcomes: [
      "Structured change control with impact assessment",
      "Threshold-based approvals",
      "Contingency tracking and budget waterfall visibility",
    ],
  },
  technical: {
    summary: "Budget waterfall and approval thresholds",
    dataFlow: [
      "Budget waterfall: Baseline (V1) + Approved VOs = Current Approved Budget",
      "VO creates BOQ version delta (V3 → V4)",
      "Contingency: Original − Used = Remaining",
    ],
    architectureNotes: [
      "Approval thresholds: PM (<5L), Director (<25L), CFO (<1Cr), Board (>1Cr)",
    ],
  },
};
