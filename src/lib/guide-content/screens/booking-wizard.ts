import type { ScreenGuide } from "../types";

export const bookingWizardGuide: ScreenGuide = {
  route: "/real-estate/booking/new",
  screenName: "Booking Wizard",
  overview: {
    description:
      "5-step wizard: (1) Select Unit, (2) Customer + NID + nominee, (3) Price breakdown with premiums/discounts, (4) Payment plan with auto-generated schedule, (5) Review + GL preview + Confirm.",
    personas: [
      { role: "Sales", does: "Walks through 5-step booking flow" },
      { role: "Finance", does: "Reviews GL journal preview at step 5" },
    ],
    workflow: [
      "Select unit with specs",
      "Enter customer details + NID + nominee",
      "Review price breakdown (base + premiums − discounts)",
      "Choose payment plan template → auto-generated schedule",
      "Review GL preview → Confirm",
    ],
  },
  stories: {
    summary: "Structured booking with IFRS-compliant GL",
    items: [
      { id: "R02", role: "Sales", story: "5-step wizard generating agreement and payment schedule" },
      { id: "R03", role: "Finance", story: "Booking advance posted as LIABILITY (not revenue) per IFRS" },
      { id: "R04", role: "Sales", story: "Auto-generated payment schedule from selected plan template" },
    ],
  },
  flow: {
    title: "Booking Wizard Steps",
    description: "5-step guided process from unit selection to GL posting",
    steps: [
      { label: "1. Select Unit", sub: "Choose project, tower, floor → view unit specs", color: "blue" },
      { label: "2. Customer Details", sub: "Name, NID, phone, email, address, nominee", color: "blue" },
      { label: "3. Price & Discount", sub: "Base + Floor Premium + Facing Premium − Discount = Final", color: "amber" },
      { label: "4. Payment Plan", sub: "Select template → auto-generate installment schedule", color: "purple" },
      { label: "5. Review & Confirm", sub: "Summary + GL journal preview → Confirm booking", color: "green", branch: { label: "GL Entry at Booking", steps: [{ label: "DR Cash/Bank", color: "green" }, { label: "CR Booking Advance (LIABILITY)", color: "amber" }] } },
    ],
  },
  value: {
    summary: "Auto-generated everything replacing paper forms",
    painPoints: [
      "Booking on paper forms, payment plans calculated manually",
      "GL entries posted days later",
    ],
    outcomes: [
      "Structured booking with auto-generated schedule",
      "IFRS-compliant GL at point of booking",
      "Complete audit trail",
    ],
  },
  technical: {
    summary: "GL preview and price calculation",
    glEntries: [
      "DR Cash/Bank",
      "CR Booking Advance (LIABILITY — not revenue, ADR-007)",
    ],
    dataFlow: [
      "Price = Base + Floor Premium + Facing Premium + Corner Premium − Discount",
      "Schedule auto-generates from plan template (milestone % × final price)",
    ],
  },
};
