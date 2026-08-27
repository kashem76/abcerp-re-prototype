import type { ModuleGuide } from "../types";

export const salesGuide: ModuleGuide = {
  moduleId: "sales",
  moduleName: "Sales",
  overview: {
    description:
      "Unit inventory management, 5-step booking wizard, payment schedule tracking, collections, cancellation/transfer workflows, and buyer portal. Revenue recognition at handover (completed contract method).",
    personas: [
      { role: "Sales Agent", does: "Shows available units, processes bookings, follows up payments" },
      { role: "Sales Head", does: "Monitors velocity, collection efficiency, pricing trends" },
      { role: "Finance", does: "Revenue recognition, AR aging, demand letters" },
      { role: "Customer", does: "Buyer portal — payment status, progress, documents" },
    ],
    workflow: [
      "View unit inventory (color-coded status)",
      "Select available unit",
      "5-step booking wizard (Unit → Customer → Price → Plan → Review)",
      "Track payment schedule",
      "Send demand letters for overdue",
      "Process handover",
      "Revenue recognition",
    ],
  },
  stories: {
    summary: "From unit selection to handover — every taka accounted for.",
    items: [
      { id: "SL-01", role: "Sales Agent", story: "Unit inventory grid with color-coded status (Available, Reserved, Booked, Sold, Landowner)" },
      { id: "SL-02", role: "Sales Agent", story: "5-step booking wizard with auto-generated payment schedule" },
      { id: "SL-03", role: "Sales Head", story: "Sales velocity chart — units sold per month" },
      { id: "SL-04", role: "Sales Head", story: "Collection efficiency by project with aging breakdown" },
      { id: "SL-05", role: "Finance", story: "Booking advance posted as LIABILITY not revenue (IFRS compliant)" },
      { id: "SL-06", role: "Customer", story: "Buyer portal: payment status, construction progress, documents" },
    ],
  },
  flow: {
    title: "Unit Sales Lifecycle",
    description: "From available inventory to revenue recognition at handover",
    steps: [
      { label: "Unit Inventory", sub: "Color-coded grid: Available, Reserved, Booked, Sold, Landowner", color: "blue" },
      { label: "Customer Inquiry", sub: "Walk-in or referral — select available unit", color: "blue" },
      { label: "Booking Wizard (5 Steps)", sub: "Unit → Customer → Price → Payment Plan → GL Preview", color: "purple" },
      { label: "Booking Confirmed", sub: "GL: DR Cash / CR Booking Advance (LIABILITY — not revenue)", color: "green", branch: { label: "Status Changes", steps: [{ label: "AVAILABLE → BOOKED", color: "green" }, { label: "If cancelled → AVAILABLE (with forfeiture)", color: "red" }, { label: "If transferred → new buyer assigned", color: "amber" }] } },
      { label: "Payment Schedule Active", sub: "Auto-generated installments tracked with status badges", color: "amber" },
      { label: "Collections & Follow-up", sub: "Demand letters, reminders, penalty interest for overdue", color: "amber" },
      { label: "Construction Progress", sub: "Buyer portal shows live progress with photos", color: "blue" },
      { label: "Handover", sub: "Inspection → snags → clearances → key transfer", color: "green" },
      { label: "Revenue Recognition", sub: "At handover: DR AR, CR Revenue; DR COGS, CR WIP", color: "green" },
    ],
  },
  value: {
    summary: "From Excel booking and notebook tracking to IFRS-compliant revenue cycle.",
    painPoints: [
      "Unit booking in Excel, payment tracking in notebooks",
      "No visibility into collection health or AR aging",
      "Revenue recognized incorrectly — booking advance treated as income",
    ],
    outcomes: [
      "Real-time inventory with status tracking",
      "IFRS-compliant revenue recognition at handover",
      "Automated payment schedule and collection dashboard",
    ],
    timeSavings: "Demand letters: 4-6 hours → 1 click. AR aging: half day/month → real-time.",
  },
  technical: {
    summary: "Unit state machine with IFRS-compliant booking and revenue recognition GL.",
    dataFlow: [
      "Unit status: AVAILABLE → RESERVED → BOOKED → SOLD → HANDED_OVER (with CANCELLED branch)",
      "Payment schedule auto-generated from plan template",
      "Cancellation: forfeiture % configurable, refund processed, unit released to AVAILABLE",
    ],
    glEntries: [
      "Booking: DR Cash/Bank, CR Booking Advance (LIABILITY) — not revenue (ADR-007)",
      "Revenue at handover (CC method): DR AR, CR Revenue; DR COGS, CR WIP; DR Booking Advance, CR AR",
    ],
  },
};
