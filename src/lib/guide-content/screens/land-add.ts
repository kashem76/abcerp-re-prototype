import type { ScreenGuide } from "../types";

export const landAddGuide: ScreenGuide = {
  route: "/real-estate/land-leads/new",
  screenName: "Add Land Lead",
  overview: {
    description:
      "Minimal form for 30-second lead capture: name, location, area, expected price, owner, source, assigned to. Post-save guidance shows success and recommended next steps.",
    personas: [
      { role: "BD Officer", does: "Captures new land leads quickly" },
    ],
    workflow: [
      "Fill minimal fields (30 seconds)",
      "Save lead",
      "Follow post-save guidance (next steps)",
    ],
  },
  stories: {
    summary: "Fastest path from lead to workspace",
    items: [
      { id: "L01", role: "BD Officer", story: "Add a land lead in under 60 seconds with minimal fields" },
      { id: "L03", role: "BD Officer", story: "Post-save guidance telling me what to do next (not a dead end)" },
    ],
  },
  flow: {
    title: "Lead Capture Flow",
    description: "30-second capture → guided next steps",
    steps: [
      { label: "Enter Lead Details", sub: "Name, location, area, price, owner, source", color: "blue", active: true },
      { label: "Save & Create Workspace", sub: "Land entity + workspace auto-created", color: "green" },
      { label: "Post-Save Guidance", sub: "System recommends next step — no dead end", color: "purple", branch: { label: "Recommended Next Steps", steps: [{ label: "Complete Initial Selection (scoring)", color: "blue" }, { label: "Schedule Site Visit", color: "amber" }, { label: "Add Documents", color: "gray" }, { label: "Open Workspace", color: "green" }] } },
    ],
  },
  value: {
    summary: "Structured capture replacing notebooks and WhatsApp",
    painPoints: [
      "New leads captured in notebooks or WhatsApp, often lost",
      "No structured data from day one",
    ],
    outcomes: [
      "30-second structured capture",
      "Immediate workspace created",
      "Guided next step (no dead ends)",
    ],
  },
  technical: {
    summary: "Creates Land entity with initial workspace",
    dataFlow: [
      "Creates Land entity + initial workspace",
      "Post-save shows 3 options: Complete Initial Selection, Schedule Site Visit, Add Documents",
    ],
    architectureNotes: [
      'UX principle: every screen ends with a recommended next step (doc 01)',
    ],
  },
};
