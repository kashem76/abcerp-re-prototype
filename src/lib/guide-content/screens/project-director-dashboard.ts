import type { ScreenGuide } from "../types";

export const projectDirectorDashboardGuide: ScreenGuide = {
  route: "/real-estate/dashboards/project-director",
  screenName: "Project Director Dashboard",
  overview: {
    description:
      "Single project deep-dive — health KPIs (budget/schedule variance, quality, safety, SPI, CPI), today's snapshot (manpower, equipment, work fronts, issues), weekly progress, contractor performance, critical path.",
    personas: [
      { role: "Director", does: "Deep-dives into single project health" },
      { role: "PM", does: "Reviews SPI/CPI and contractor performance" },
    ],
    workflow: [
      "Check SPI and CPI",
      "Review today's snapshot (manpower, equipment, issues)",
      "Rank contractor performance",
      "Analyze critical path float",
    ],
  },
  stories: {
    summary: "Quantitative project tracking replacing verbal updates",
    items: [
      { id: "P10", role: "Director", story: "SPI and CPI to know if project is behind schedule or over budget" },
      { id: "P11", role: "Director", story: "Contractor performance ranked by schedule adherence and quality" },
      { id: "P12", role: "Director", story: "Critical path float analysis to identify schedule risks" },
    ],
  },
  value: {
    summary: "Real-time SPI/CPI replacing daily phone calls",
    painPoints: [
      "Director calls site engineer daily for verbal updates",
      "No quantitative tracking or contractor accountability",
    ],
    outcomes: [
      "Real-time SPI/CPI",
      "Contractor accountability with performance scoring",
      "Critical path visibility",
    ],
  },
};
