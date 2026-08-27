import type { ModuleId } from "@/lib/navigation";

// ─── Flow diagram types ─────────────────────────────────────

export type FlowStepColor = "blue" | "green" | "amber" | "red" | "gray" | "purple" | "slate";

export interface FlowStep {
  label: string;
  sub?: string;
  color?: FlowStepColor;
  active?: boolean;
  branch?: {
    label: string;
    steps: { label: string; color?: FlowStepColor }[];
  };
}

export interface FlowData {
  title: string;
  description?: string;
  steps: FlowStep[];
}

// ─── Guide tab types ────────────────────────────────────────

export interface GuideTab {
  overview: {
    description: string;
    personas: { role: string; does: string }[];
    workflow?: string[];
  };
  stories: {
    summary: string;
    items: { id: string; role: string; story: string }[];
  };
  flow?: FlowData;
  value: {
    summary: string;
    painPoints: string[];
    outcomes: string[];
    timeSavings?: string;
  };
  technical: {
    summary: string;
    dataFlow?: string[];
    glEntries?: string[];
    architectureNotes?: string[];
  };
}

export interface ScreenGuide extends Partial<GuideTab> {
  route: string;
  screenName: string;
}

export interface ModuleGuide extends GuideTab {
  moduleId: ModuleId;
  moduleName: string;
}

export type GuideTabId = "overview" | "stories" | "flow" | "value" | "technical";

export const guideTabs: { id: GuideTabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "stories", label: "Stories" },
  { id: "flow", label: "Flow" },
  { id: "value", label: "Value" },
  { id: "technical", label: "Technical" },
];
