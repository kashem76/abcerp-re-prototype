import type { ScreenGuide } from "../types";

export const landPipelineGuide: ScreenGuide = {
  route: "/real-estate/land-leads",
  screenName: "Land Pipeline",
  overview: {
    description:
      "Kanban pipeline with 6 stages (New → Assessment → Feasibility → Decision → Acquisition → Closed). KPI strip, advanced filters, aging badges, department status dots, team performance.",
    personas: [
      { role: "BD Head", does: "Monitors pipeline health and team performance" },
      { role: "BD Officer", does: "Works leads through pipeline stages" },
    ],
    workflow: [
      "Review pipeline KPIs",
      "Check aging badges (on track / overdue / stale)",
      "Identify department bottlenecks via status dots",
    ],
  },
  stories: {
    summary: "Pipeline visibility with bottleneck detection",
    items: [
      { id: "L02", role: "BD Head", story: "Pipeline view showing all leads with stage, aging, and attention flags" },
      { id: "L05", role: "BD Head", story: "See which departments are blocking progress (status dots)" },
      { id: "L08", role: "BD Officer", story: "Aging badges (on track / overdue / stale) to prioritize work" },
    ],
  },
  flow: {
    title: "Land Pipeline Stages",
    description: "6 stages from lead capture to closure",
    steps: [
      { label: "New", sub: "Lead captured, basic info entered", color: "blue", active: true },
      { label: "Assessment", sub: "Initial selection scoring, site visits", color: "blue" },
      { label: "Feasibility", sub: "Full evaluation study with 8 departments", color: "amber" },
      { label: "Decision", sub: "CEO reviews management report", color: "purple" },
      { label: "Acquisition", sub: "Purchase agreement or JV terms", color: "green" },
      { label: "Closed", sub: "Converted to project or rejected", color: "slate", branch: { label: "Outcomes", steps: [{ label: "Converted → Project created", color: "green" }, { label: "Rejected → closed with reason", color: "red" }, { label: "On Hold → revisit later", color: "amber" }] } },
    ],
  },
  value: {
    summary: "Visual pipeline replacing Excel tracking",
    painPoints: [
      "Land pipeline tracked in Excel, no stage visibility",
      "Stale leads forgotten for months",
      "Department bottlenecks invisible",
    ],
    outcomes: [
      "Visual pipeline with bottleneck detection",
      "Automatic staleness alerts",
      "Department-level progress tracking",
    ],
  },
  technical: {
    summary: "Stage and aging derived from business events",
    dataFlow: [
      "Stage derived from business events (PDR-003)",
      "Aging: on-track (within threshold), overdue (past threshold), stale (>30d no activity)",
      "Department dots: LS (Legal), EN (Engineering), MK (Market), FN (Finance)",
    ],
  },
};
