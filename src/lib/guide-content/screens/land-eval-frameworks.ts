import type { ScreenGuide } from "../types";

export const landEvalFrameworksGuide: ScreenGuide = {
  route: "/real-estate/settings/land-evaluation/frameworks",
  screenName: "Evaluation Frameworks",
  overview: {
    description:
      "Library of evaluation frameworks (Standard, JV, Commercial). Each framework defines sections, team assignments, workflow rules, scoring weights, and report configuration.",
    personas: [
      { role: "BD Head", does: "Creates and manages evaluation frameworks" },
    ],
    workflow: [
      "Select or create framework",
      "Configure 6 tabs: Structure, Team, Workflow, Scoring, Report, Preview",
    ],
  },
  stories: {
    summary: "Deal-type-specific evaluation frameworks",
    items: [
      { id: "A10", role: "BD Head", story: "Different evaluation frameworks for different deal types" },
      { id: "A11", role: "BD Head", story: "Framework builder with 6 configuration tabs" },
    ],
  },
  value: {
    summary: "Configurable frameworks replacing one-size-fits-all checklists",
    painPoints: [
      "Same evaluation checklist for every land type",
      "No configurability or reusable criteria",
    ],
    outcomes: [
      "Deal-type-specific frameworks",
      "Configurable scoring",
      "Reusable criteria library",
    ],
  },
  technical: {
    summary: "Framework structure with reusable criteria",
    dataFlow: [
      "6 tabs: Structure (sections), Team (assignments), Workflow (dependencies), Scoring (weights/thresholds), Report (16-section auto-assembly), Preview",
      "Criteria are reusable — same criterion can appear in multiple frameworks",
      "15 response types: YES_NO, RATING_1_5, CURRENCY, MEASUREMENT, FORMULA, etc.",
    ],
  },
};
