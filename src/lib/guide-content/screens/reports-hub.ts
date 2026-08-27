import type { ScreenGuide } from "../types";

export const reportsHubGuide: ScreenGuide = {
  route: "/real-estate/reports",
  screenName: "Reports Hub",
  overview: {
    description:
      "22 reports in 5 categories: Financial (4), Cost Control (5), Revenue & Sales (5), Operations (4), Corporate & Portfolio (4). Plus 8 role-based dashboards.",
    personas: [
      { role: "Director", does: "Accesses all 22 reports with category filters" },
      { role: "CFO", does: "Drills down financial reports by dimension" },
    ],
  },
  stories: {
    summary: "Standardized reports with dimensional drill-down",
    items: [
      { id: "RP01", role: "Director", story: "All 22 reports accessible from one hub with category filters" },
      { id: "RP02", role: "CFO", story: "Financial reports with drill-down (Company → Project → Phase → Unit)" },
    ],
  },
  value: {
    summary: "22 standardized reports replacing manual Excel",
    painPoints: [
      "Reports compiled manually in Excel, always stale",
      "Inconsistent formats across departments",
    ],
    outcomes: [
      "22 standardized reports with real-time data",
      "Dimensional drill-down",
      "Consistent methodology",
    ],
  },
  technical: {
    summary: "Dimensions x Measures framework (ADR-012)",
    dataFlow: [
      "Dimensions: Project, Phase, Tower, Floor, Unit, WBS, Cost Code, RC, CC, PC, Supplier, Customer, Period",
      "Drill-down: Company → BU → Project → Phase → Tower → Floor → Unit",
    ],
  },
};
