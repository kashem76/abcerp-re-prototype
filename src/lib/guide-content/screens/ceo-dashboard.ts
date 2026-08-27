import type { ScreenGuide } from "../types";

export const ceoDashboardGuide: ScreenGuide = {
  route: "/real-estate/dashboards/ceo",
  screenName: "CEO Dashboard",
  overview: {
    description:
      '"The Two Questions" — is each project on track? Is the portfolio healthy? 14-stage lifecycle map, portfolio KPIs, cost control, revenue collection, profit erosion waterfall, pending CEO decisions.',
    personas: [
      { role: "CEO", does: "Reviews portfolio health and pending decisions" },
      { role: "Director", does: "Monitors project-level risk signals" },
    ],
    workflow: [
      "Review portfolio KPIs",
      "Check profit erosion waterfall",
      "Act on pending decisions (auto-routed by urgency)",
    ],
  },
  stories: {
    summary: "One screen answering profitability and risk",
    items: [
      { id: "L48", role: "CEO", story: 'One screen answering "are we making money?" and "is anything at risk?"' },
      { id: "E01", role: "CEO", story: "Profit erosion waterfall showing exactly where margin was lost" },
      { id: "E02", role: "CEO", story: "Pending decisions auto-routed by urgency and financial impact" },
    ],
  },
  flow: {
    title: "CEO Decision Cycle",
    description: "From portfolio review to action",
    steps: [
      { label: "Review Two Questions", sub: "Project-level: each on track? Company-level: portfolio healthy?", color: "blue", active: true },
      { label: "Check 14-Stage Lifecycle Map", sub: "See where each project sits across PRE-DEV/SETUP/EXEC/CLOSE", color: "blue" },
      { label: "Analyze Profit Erosion", sub: "Waterfall: where exactly did margin go?", color: "amber" },
      { label: "Review Pending Decisions", sub: "Auto-routed, ranked by urgency and financial impact", color: "purple" },
      { label: "Take Action", sub: "Approve, reject, or request more info", color: "green" },
    ],
  },
  value: {
    summary: "Real-time portfolio truth replacing fragmented WhatsApp updates",
    painPoints: [
      "CEO gets fragmented updates from 5 WhatsApp groups, weekly",
      "No profit accountability by factor",
      "Decisions lack financial context",
    ],
    outcomes: [
      "Real-time portfolio truth",
      "Profit accountability factor-by-factor",
      "Decisions with full context",
    ],
    timeSavings: "Board preparation from 2-3 days to zero",
  },
  technical: {
    summary: "Aggregates across all projects",
    dataFlow: [
      "Profit erosion = Feasibility margin − (material + labour + design + timeline + discount)",
      "Pending decisions filtered by approval threshold from config",
    ],
  },
};
