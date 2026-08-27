import type { ScreenGuide } from "../types";

export const siteDashboardGuide: ScreenGuide = {
  route: "/real-estate/dashboards/site-engineering",
  screenName: "Site Engineering Dashboard",
  overview: {
    description:
      "Today's operations — weather, manpower (trade-wise), equipment utilization, active work fronts, material stock (days-left alerts), pending MRs, quality checkpoints, open issues, DSR status.",
    personas: [
      { role: "Site Engineer", does: "Manages daily operations from one screen" },
      { role: "Store Keeper", does: "Monitors material stock and days-left alerts" },
    ],
  },
  stories: {
    summary: "Digital operations dashboard with proactive alerts",
    items: [
      { id: "S03", role: "Site Engineer", story: "Today's dashboard showing manpower, equipment, and issues" },
      { id: "S04", role: "Store Keeper", story: "Material stock with days-left calculation and critical alerts" },
      { id: "S05", role: "Engineer", story: "DSR status showing if today's report is submitted or draft" },
    ],
  },
  value: {
    summary: "Real-time site visibility replacing phone calls",
    painPoints: [
      "Site status requires phone calls and site visits",
      "Material stockouts discovered too late",
    ],
    outcomes: [
      "Digital operations dashboard",
      "Proactive material alerts",
      "Real-time progress visibility",
    ],
  },
};
