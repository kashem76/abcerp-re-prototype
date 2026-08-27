import type { ScreenGuide } from "../types";

export const cfoDashboardGuide: ScreenGuide = {
  route: "/real-estate/dashboards/cfo",
  screenName: "CFO Dashboard",
  overview: {
    description:
      "Financial command center — cash position, burn rate, runway, AR/AP, net working capital. Cash flow, collection performance, project-wise health, fund requirements (30/60/90 days), bank balances.",
    personas: [
      { role: "CFO", does: "Monitors cash position and fund requirements" },
      { role: "Finance Head", does: "Tracks collection efficiency by project" },
    ],
    workflow: [
      "Review cash position and runway",
      "Check collection performance by project",
      "Plan fund requirements (30/60/90 days)",
    ],
  },
  stories: {
    summary: "Cash visibility and proactive fund planning",
    items: [
      { id: "F01", role: "CFO", story: "Cash runway projection to know when bridge funding is needed" },
      { id: "F02", role: "CFO", story: "Collection efficiency by project to identify poor-paying projects" },
      { id: "F03", role: "CFO", story: "Fund requirements forecast for planned bank draws" },
    ],
  },
  value: {
    summary: "Real-time cash position replacing stale Excel sheets",
    painPoints: [
      "CFO relies on accountant-compiled Excel, always 2 weeks stale",
      "No per-project collection health",
      "Fund requirements discovered reactively",
    ],
    outcomes: [
      "Real-time cash position",
      "Collection health per project",
      "Proactive fund planning",
    ],
  },
  technical: {
    summary: "Cash flow and fund requirement calculations",
    dataFlow: [
      "Cash flow = Collections − (Contractor + Material + Overheads + Loan EMIs)",
      "Fund requirements = pending MRs + upcoming running bills + scheduled payments + EMIs",
    ],
  },
};
