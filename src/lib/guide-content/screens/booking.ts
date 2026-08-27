import type { ScreenGuide } from "../types";

export const bookingGuide: ScreenGuide = {
  route: "/real-estate/booking",
  screenName: "Unit Booking",
  overview: {
    description:
      "Unit inventory grid with color-coded status (Available, Reserved, Booked, Under Payment, Sold, Landowner). Payment schedule tracking with installment status badges.",
    personas: [
      { role: "Sales", does: "Views unit inventory and payment status" },
      { role: "Finance", does: "Monitors overdue installments" },
    ],
  },
  stories: {
    summary: "Real-time inventory with payment tracking",
    items: [
      { id: "R01", role: "Sales", story: "Unit inventory with color-coded status at a glance" },
      { id: "R05", role: "Sales", story: "Payment schedule showing paid, overdue, and upcoming installments" },
      { id: "R08", role: "Finance", story: "All overdue installments to trigger demand letters" },
    ],
  },
  value: {
    summary: "Real-time inventory replacing Excel and notebooks",
    painPoints: [
      "Unit inventory in Excel, payment tracking in notebooks",
      "Overdue follow-ups missed regularly",
    ],
    outcomes: [
      "Real-time inventory status",
      "Automated payment tracking",
      "Overdue visibility for demand letters",
    ],
  },
};
