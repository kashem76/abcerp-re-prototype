import type { ScreenGuide } from "../types";

export const procurementDashboardGuide: ScreenGuide = {
  route: "/real-estate/dashboards/procurement",
  screenName: "Procurement Dashboard",
  overview: {
    description:
      "Procurement KPIs (active POs, pending MRs, open tenders, avg cycle time). MR pipeline, active tenders, rate intelligence (current vs last PO vs market), supplier performance.",
    personas: [
      { role: "Procurement", does: "Tracks MR pipeline and supplier performance" },
      { role: "PM", does: "Monitors procurement cycle time" },
    ],
  },
  stories: {
    summary: "Rate intelligence and supplier accountability",
    items: [
      { id: "C01", role: "Procurement", story: "Dashboard showing all pending MRs and their aging" },
      { id: "C02", role: "Procurement", story: "Rate intelligence showing rate trends by material" },
      { id: "C03", role: "Procurement", story: "Supplier performance scored by delivery, quality, and cost" },
    ],
  },
  value: {
    summary: "Data-driven procurement replacing relationship-based decisions",
    painPoints: [
      "No rate history, suppliers chosen by relationship not performance",
      "Procurement cycle time unmeasured",
    ],
    outcomes: [
      "Rate intelligence with trend analysis",
      "Supplier scorecards",
      "Cycle time visibility",
    ],
  },
};
