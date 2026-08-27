import type { ScreenGuide } from "../types";

export const buyerPortalGuide: ScreenGuide = {
  route: "/real-estate/buyer-portal",
  screenName: "Buyer Portal",
  overview: {
    description:
      "Customer-facing view — booking details, unit specs, construction progress, payment schedule with status, document downloads, query submission.",
    personas: [
      { role: "Customer", does: "Views booking, payments, progress, and downloads documents" },
      { role: "Sales", does: "Reduces inbound calls with self-service portal" },
    ],
  },
  stories: {
    summary: "Self-service buyer portal eliminating phone calls",
    items: [
      { id: "R15", role: "Customer", story: "Payment schedule with what I've paid and what's upcoming" },
      { id: "R16", role: "Customer", story: "Construction progress photos and completion percentage" },
      { id: "R17", role: "Customer", story: "Download agreement and payment receipts" },
    ],
  },
  value: {
    summary: "Zero phone calls for status queries",
    painPoints: [
      "Buyers call office for every update",
      "Payment receipts requested manually, no progress visibility",
    ],
    outcomes: [
      "Self-service buyer portal",
      "Zero phone calls for status queries",
      "Transparent construction progress",
    ],
  },
};
