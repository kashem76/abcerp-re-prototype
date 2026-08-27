import type { ScreenGuide } from "../types";

export const projectNewGuide: ScreenGuide = {
  route: "/real-estate/projects/new",
  screenName: "Create Project",
  overview: {
    description:
      "Standalone project creation form. Project identity, location, area & units, timeline, financial centers (RC/CC/PC), budget allocation across 9 categories.",
    personas: [
      { role: "PM", does: "Creates project with budget allocation" },
      { role: "Finance", does: "Assigns financial centers from day one" },
    ],
    workflow: [
      "Fill project identity and location",
      "Set area, units, and timeline",
      "Assign Revenue/Cost/Profit Centers",
      "Allocate budget across 9 categories",
    ],
  },
  stories: {
    summary: "Complete project setup in one form",
    items: [
      { id: "P03", role: "PM", story: "Create project with budget allocated across 9 cost categories" },
      { id: "P04", role: "Finance", story: "Project linked to revenue/cost/profit centers from day one" },
    ],
  },
  value: {
    summary: "One-form setup replacing days of back-and-forth",
    painPoints: [
      "Project setup takes days of back-and-forth between PM, finance, admin",
      "Financial centers assigned late or never",
    ],
    outcomes: [
      "Complete project setup in one form",
      "Financial centers assigned upfront",
      "Budget pre-allocated across categories",
    ],
  },
  technical: {
    summary: "Budget categories and financial center assignment",
    dataFlow: [
      "9 categories: Land, Foundation, Structure, MEP, Finishing, External, Consultant, Marketing, Contingency",
    ],
    architectureNotes: [
      "Financial centers: Revenue Center, Cost Center, Profit Center — each a ResponsibilityCenter (ADR-013)",
    ],
  },
};
