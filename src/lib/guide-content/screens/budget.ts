import type { ScreenGuide } from "../types";

export const budgetGuide: ScreenGuide = {
  route: "/real-estate/budget",
  screenName: "Budget vs Actual",
  overview: {
    description:
      "Budget monitoring — utilization, variance trends, forecast-to-complete. Shows Budget − Actual − Committed = Available per cost category and project.",
    personas: [
      { role: "PM", does: "Tracks budget consumption by cost category" },
      { role: "Finance", does: "Reviews committed costs and available balance" },
      { role: "Director", does: "Monitors budget waterfall and overrun alerts" },
    ],
  },
  stories: {
    summary: "Real-time budget consumption with committed visibility",
    items: [
      { id: "B10", role: "PM", story: "Budget vs actual by cost category with available balance" },
      { id: "B11", role: "Finance", story: "Committed costs (open POs + approved WOs) included in budget utilization" },
      { id: "B12", role: "Director", story: "Budget waterfall: Baseline + Approved VOs = Current Budget" },
    ],
  },
  value: {
    summary: "Proactive overrun alerts replacing year-end surprises",
    painPoints: [
      "Budget tracking in Excel, committed costs invisible",
      "Overruns discovered at year-end",
    ],
    outcomes: [
      "Real-time budget consumption with committed visibility",
      "Proactive overrun alerts",
    ],
  },
  technical: {
    summary: "Budget formula with committed cost calculation",
    dataFlow: [
      "Available = Budget + VOs − Actual − Committed",
      "Committed = Open PO values + Approved WO values",
      "Budget auto-generated from approved BOQ lines",
    ],
  },
};
