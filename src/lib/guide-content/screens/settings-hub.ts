import type { ScreenGuide } from "../types";

export const settingsHubGuide: ScreenGuide = {
  route: "/real-estate/settings",
  screenName: "Module Settings",
  overview: {
    description:
      "Configuration hub — lifecycle stages, numbering, approval workflows, dimension rules, land evaluation, master data. All configurable areas with completion status.",
    personas: [
      { role: "Admin", does: "Configures system settings without developer help" },
    ],
  },
  stories: {
    summary: "Self-service configuration for business users",
    items: [
      { id: "A01", role: "Admin", story: "Settings hub showing all configurable areas with completion status" },
      { id: "A02", role: "Admin", story: "Changes propagate immediately without developer intervention" },
    ],
  },
  value: {
    summary: "Business user self-service replacing developer tickets",
    painPoints: [
      "Every config change needs a developer ticket and deployment cycle",
    ],
    outcomes: [
      "Business user self-service configuration",
      "Immediate effect, no code changes needed",
    ],
  },
};
