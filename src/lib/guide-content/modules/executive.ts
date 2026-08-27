import type { ModuleGuide } from "../types";

export const executiveGuide: ModuleGuide = {
  moduleId: "executive",
  moduleName: "Executive",
  overview: {
    description:
      "Strategic portfolio monitoring for CEO and CFO. Two dashboards: CEO (project health, profit erosion, pending decisions) and CFO (cash position, liquidity, AR/AP, fund requirements).",
    personas: [
      { role: "CEO / MD", does: "Portfolio health, risk flags, strategic decisions" },
      { role: "CFO", does: "Cash management, financial integrity, collections" },
      { role: "Board Members", does: "Quarterly performance review" },
    ],
    workflow: [
      "Portfolio overview",
      "Identify at-risk projects",
      "Drill into P&L",
      "Make decisions",
      "Track outcomes",
    ],
  },
  stories: {
    summary: "What leadership needs from the system on any given day.",
    items: [
      { id: "EX-01", role: "CEO", story: "One-screen portfolio health with RAG scores" },
      { id: "EX-02", role: "CEO", story: "Profit erosion waterfall showing where margin went" },
      { id: "EX-03", role: "CEO", story: "Pending decisions ranked by urgency and impact" },
      { id: "EX-04", role: "CFO", story: "Cash runway projection with monthly burn rate" },
      { id: "EX-05", role: "CFO", story: "Collection efficiency by project to flag poor payers" },
      { id: "EX-06", role: "CFO", story: "Fund requirements forecast (30/60/90 days)" },
    ],
  },
  flow: {
    title: "Executive Decision Cycle",
    description: "Portfolio monitoring to strategic decision making",
    steps: [
      { label: "Portfolio Health Check", sub: "Review all project KPIs and health scores", color: "blue" },
      { label: "Profit Erosion Analysis", sub: "Where is margin being lost? Factor by factor", color: "amber" },
      { label: "Risk Identification", sub: "Flag at-risk projects by SPI/CPI/budget variance", color: "red" },
      { label: "Cash & Liquidity Review", sub: "CFO: cash position, burn rate, runway, fund gaps", color: "purple" },
      { label: "Pending Decisions", sub: "Auto-routed by urgency and financial impact", color: "amber", branch: { label: "Decision Types", steps: [{ label: "Land acquisition approval", color: "green" }, { label: "Budget overrun approval", color: "red" }, { label: "Variation order approval", color: "amber" }, { label: "Contract award approval", color: "blue" }] } },
      { label: "Board Reporting", sub: "Auto-generated portfolio summary with drill-down", color: "green" },
    ],
  },
  value: {
    summary: "From fragmented reports to one-screen strategic clarity.",
    painPoints: [
      "CEOs get fragmented reports from Excel, WhatsApp, verbal updates",
      "Decisions delayed for days waiting for consolidated data",
      "Board reports manually assembled from multiple sources",
    ],
    outcomes: [
      "One-screen strategic view with real-time portfolio health",
      "Zero-delay decisions with drill-down capability",
      "Instant board-ready reports",
    ],
    timeSavings: "Monthly board reports: 2-3 days → instant",
  },
  technical: {
    summary: "Aggregation layer built on Dimensions × Measures reporting framework.",
    architectureNotes: [
      "Dimensions × Measures reporting framework (doc 60)",
      "Reports built on Project × Period dimensions",
      "No GL entries at this layer — pure aggregation",
      "ADR-012: Reports built on dimensions × measures",
    ],
  },
};
