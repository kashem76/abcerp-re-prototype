import type { ScreenGuide } from "../types";

export const dsrGuide: ScreenGuide = {
  route: "/real-estate/dsr",
  screenName: "Daily Site Report",
  overview: {
    description:
      "DSR submission list with KPI cards (DSRs this week, total manpower, equipment active, open issues). Table of recent DSRs with date, project, engineer, counts, status.",
    personas: [
      { role: "Site Engineer", does: "Submits daily site reports" },
      { role: "Director", does: "Reviews manpower and equipment utilization" },
    ],
  },
  stories: {
    summary: "Digital DSR register with trend analysis",
    items: [
      { id: "S01", role: "Site Engineer", story: "DSR list showing this week's submissions and gaps" },
      { id: "S02", role: "Director", story: "Manpower and equipment utilization at a glance" },
    ],
  },
  flow: {
    title: "DSR Daily Cycle",
    description: "Morning check to evening submission",
    steps: [
      { label: "Check Dashboard", sub: "Weather, yesterday's carryover issues", color: "blue" },
      { label: "Tab 1: Manpower", sub: "Record trade-wise count with contractor", color: "blue", active: true },
      { label: "Tab 2: Equipment", sub: "Status, hours, idle reason for each machine", color: "blue" },
      { label: "Tab 3: Work Done", sub: "Progress % against WBS nodes", color: "amber" },
      { label: "Tab 4: Issues", sub: "Log with severity, action taken", color: "red" },
      { label: "Tab 5: Photos", sub: "Site photos with captions and geo-tags", color: "blue" },
      { label: "Submit DSR", sub: "Engineer submits → PM reviews → archived", color: "green" },
    ],
  },
  value: {
    summary: "Digital DSR replacing paper and WhatsApp",
    painPoints: [
      "DSR on paper or WhatsApp, never compiled",
      "No trend analysis or gap detection",
    ],
    outcomes: [
      "Digital DSR register",
      "Instant progress visibility",
      "Historical trend analysis",
    ],
  },
};
