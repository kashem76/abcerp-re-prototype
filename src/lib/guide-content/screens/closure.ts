import type { ScreenGuide } from "../types";

export const closureGuide: ScreenGuide = {
  route: "/real-estate/closure",
  screenName: "Project Closure",
  overview: {
    description:
      "Final project seal with automated checks — all units handed over, WIP=0, AR=0, no open POs/WOs, all retentions released, all DLP cases closed, feasibility vs actual reviewed.",
    personas: [
      { role: "PM", does: "Runs closure checks and seals project" },
      { role: "Finance", does: "Reviews feasibility vs actual comparison" },
      { role: "CFO", does: "Confirms permanent project seal" },
    ],
  },
  stories: {
    summary: "Clean closure with no residual postings",
    items: [
      { id: "H05", role: "PM", story: "Automated closure checks blocking seal until all conditions met" },
      { id: "H06", role: "Finance", story: "Feasibility vs actual comparison as organizational learning" },
      { id: "H07", role: "CFO", story: "Project sealed permanently with no further postings allowed" },
    ],
  },
  flow: {
    title: "Project Closure Process",
    description: "Automated checks before permanent seal",
    steps: [
      { label: "Initiate Closure", sub: "PM triggers closure process", color: "blue", active: true },
      { label: "Automated Check: Units", sub: "All units must be in HANDED_OVER status", color: "amber" },
      { label: "Automated Check: Finance", sub: "WIP balance = 0, AR balance = 0", color: "amber" },
      { label: "Automated Check: Contracts", sub: "No open POs or Work Orders", color: "amber" },
      { label: "Automated Check: Retention", sub: "All retentions released to contractors", color: "amber" },
      { label: "Automated Check: DLP", sub: "All defect liability cases closed or expired", color: "amber" },
      { label: "Final P&L Approval", sub: "CFO reviews and approves final project P&L", color: "purple" },
      { label: "Feasibility vs Actual", sub: "Line-by-line comparison — organizational learning", color: "blue" },
      { label: "Project Sealed", sub: "Status → CLOSED. No further GL postings allowed", color: "slate" },
    ],
  },
  value: {
    summary: "Formal closure replacing never-closed projects",
    painPoints: [
      "Projects never formally closed, costs keep posting to completed projects",
      "No lessons learned or feasibility accountability",
    ],
    outcomes: [
      "Clean project closure",
      "Zero residual postings",
      "Feasibility vs actual accountability",
    ],
  },
  technical: {
    summary: "Automated closure checks and permanent seal",
    dataFlow: [
      "Checks: All units HANDED_OVER, WIP=0, AR=0, no open POs/WOs",
      "All retentions released, all DLP cases closed/expired",
      "Final P&L approved",
      "Post-closure: Project → CLOSED, no further GL postings",
    ],
  },
};
