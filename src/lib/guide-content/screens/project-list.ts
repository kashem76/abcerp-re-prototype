import type { ScreenGuide } from "../types";

export const projectListGuide: ScreenGuide = {
  route: "/real-estate/projects",
  screenName: "Projects",
  overview: {
    description:
      "Grid of project cards showing stage, code, name, location, budget/revenue/units, PM, and health score. Entry point to all project workspaces.",
    personas: [
      { role: "PM", does: "Views all assigned projects with health scores" },
      { role: "Director", does: "Clicks into any project workspace" },
    ],
  },
  stories: {
    summary: "Portfolio view with one-click workspace access",
    items: [
      { id: "P01", role: "PM", story: "See all my projects with health scores at a glance" },
      { id: "P02", role: "Director", story: "Click any project card to enter its workspace" },
    ],
  },
  value: {
    summary: "Portfolio view replacing scattered status updates",
    painPoints: [
      "Project status scattered across emails, calls, site visits",
      "No health scoring or visual overview",
    ],
    outcomes: [
      "Portfolio view with health scoring",
      "One-click access to any project",
    ],
  },
};
