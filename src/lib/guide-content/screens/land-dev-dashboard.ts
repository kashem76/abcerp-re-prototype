import type { ScreenGuide } from "../types";

export const landDevDashboardGuide: ScreenGuide = {
  route: "/real-estate/dashboards/land-dev",
  screenName: "Land Development Dashboard",
  overview: {
    description:
      "Land pipeline KPIs (active leads, qualified, under DD, converted, rejected). Pipeline table, active opportunities, feasibility studies, land agreements (Purchase vs JV), upcoming milestones.",
    personas: [
      { role: "BD Head", does: "Monitors pipeline conversion funnel" },
      { role: "Finance", does: "Tracks land agreement payment status" },
    ],
  },
  stories: {
    summary: "Complete pipeline visibility with feasibility comparison",
    items: [
      { id: "L10", role: "BD Head", story: "Pipeline KPIs showing conversion funnel" },
      { id: "L11", role: "BD Head", story: "Feasibility studies with IRR, gross margin, and NPV at a glance" },
      { id: "L12", role: "BD Head", story: "Track land agreements with payment status" },
    ],
  },
  value: {
    summary: "Portfolio view replacing personal notebooks",
    painPoints: [
      "Land pipeline in personal notebooks",
      "Feasibility studies in standalone Excel files, no portfolio view",
    ],
    outcomes: [
      "Complete pipeline visibility",
      "Feasibility comparison across deals",
      "Agreement tracking with payment status",
    ],
  },
};
