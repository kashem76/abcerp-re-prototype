import type { ScreenGuide } from "../types";

export const salesDashboardGuide: ScreenGuide = {
  route: "/real-estate/dashboards/sales",
  screenName: "Sales Dashboard",
  overview: {
    description:
      "Sales KPIs (units sold, bookings, collections, cancellations, avg price/SFT). Pipeline by project, velocity chart, top performers, upcoming payment demands, price trend.",
    personas: [
      { role: "Sales Head", does: "Tracks velocity, collection efficiency, and team performance" },
      { role: "Finance", does: "Monitors collection pipeline" },
    ],
  },
  stories: {
    summary: "Real-time sales velocity and team performance",
    items: [
      { id: "R10", role: "Sales Head", story: "Sales velocity showing monthly booking trend" },
      { id: "R11", role: "Sales Head", story: "Collection efficiency percentage by project" },
      { id: "R12", role: "Sales Head", story: "Top performer leaderboard to incentivize team" },
    ],
  },
  flow: {
    title: "Sales Monitoring Cycle",
    description: "Daily sales head workflow",
    steps: [
      { label: "Check Today's KPIs", sub: "Units sold, bookings, collections, cancellations", color: "blue", active: true },
      { label: "Review Sales Pipeline", sub: "Units by status across all projects", color: "blue" },
      { label: "Monitor Velocity", sub: "Monthly trend — are we accelerating or slowing?", color: "amber" },
      { label: "Track Collections", sub: "Upcoming demands, overdue payments", color: "red" },
      { label: "Review Team Performance", sub: "Top performers, conversion rates", color: "green" },
      { label: "Price Trend Analysis", sub: "Avg price/SFT by project, quarter over quarter", color: "purple" },
    ],
  },
  value: {
    summary: "Real-time sales data replacing end-of-month compilation",
    painPoints: [
      "Sales numbers compiled manually end-of-month",
      "No velocity tracking, incentives delayed",
    ],
    outcomes: [
      "Real-time sales velocity",
      "Performance visibility",
      "Proactive collection tracking",
    ],
  },
};
