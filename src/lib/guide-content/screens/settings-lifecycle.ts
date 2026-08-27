import type { ScreenGuide } from "../types";

export const settingsLifecycleGuide: ScreenGuide = {
  route: "/real-estate/settings/lifecycle",
  screenName: "Lifecycle Stages",
  overview: {
    description:
      "Configure 14-stage project lifecycle with phase groupings (Pre-Dev, Setup, Execution, Close), mandatory gates, module activation per stage, auto-transition rules.",
    personas: [
      { role: "Admin", does: "Configures lifecycle stages and gate conditions" },
    ],
    workflow: [
      "Define stages and phase groupings",
      "Set gate conditions per stage transition",
      "Configure module activation matrix",
    ],
  },
  stories: {
    summary: "Controlled stage progression with gate enforcement",
    items: [
      { id: "A03", role: "Admin", story: "Configure which modules activate at each lifecycle stage" },
      { id: "A04", role: "Admin", story: "Gate conditions preventing stage transition until requirements met" },
    ],
  },
  value: {
    summary: "Stage-appropriate module access replacing open-for-all",
    painPoints: [
      "Project stages tracked informally",
      "Modules available from day one regardless of readiness",
    ],
    outcomes: [
      "Controlled stage progression",
      "Stage-appropriate module access",
      "Gate-enforced quality",
    ],
  },
  technical: {
    summary: "14-stage lifecycle with module activation matrix",
    dataFlow: [
      "Stages: Planning → BOQ_Estimation → Tendering → Pre_Sales → Construction → Sales_Collection → Finishing → Handover → Defect_Liability → Closed",
      "Module activation matrix controls tab visibility per stage",
    ],
  },
};
