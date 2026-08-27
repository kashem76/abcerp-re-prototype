import type { ModuleGuide } from "../types";

export const settingsGuide: ModuleGuide = {
  moduleId: "settings",
  moduleName: "Settings",
  overview: {
    description:
      "Configuration layer that makes the system adaptable without code changes. Three-layer hierarchy: platform defaults → industry pack seeds → organization settings. Covers lifecycle stages, numbering, approval workflows, dimension rules, land evaluation config, and master data.",
    personas: [
      { role: "System Admin", does: "Configures workflows, numbering, lifecycle stages" },
      { role: "CFO", does: "Sets financial parameters — retention %, TDS rate, DLP months, revenue method" },
      { role: "QS", does: "Manages cost codes, BOQ item master, rate templates" },
      { role: "BD Head", does: "Configures evaluation frameworks, criteria library, selection templates" },
    ],
  },
  stories: {
    summary: "Business users configure the system — no developer needed.",
    items: [
      { id: "ST-01", role: "Admin", story: "Configure 14-stage project lifecycle with mandatory gate conditions" },
      { id: "ST-02", role: "Admin", story: "Auto-numbering sequences for all 12 entity types" },
      { id: "ST-03", role: "CFO", story: "Approval workflows with value-based routing thresholds" },
      { id: "ST-04", role: "BD Head", story: "Build custom evaluation frameworks from criteria library" },
      { id: "ST-05", role: "QS", story: "Cost code master with GL account mapping" },
      { id: "ST-06", role: "Admin", story: "Dimension rules: which 7 dimensions required per transaction type" },
    ],
  },
  flow: {
    title: "Configuration Hierarchy",
    description: "Three layers: Platform → Industry → Organization",
    steps: [
      { label: "Platform Defaults", sub: "Universal rules — double-entry, dimension enforcement, stage engine", color: "slate" },
      { label: "Industry Pack (Real Estate)", sub: "Seeded config — 14 stages, 23 cost codes, 25 GL accounts, 54 criteria", color: "blue", branch: { label: "Included Seeds", steps: [{ label: "Lifecycle stages & gate conditions", color: "blue" }, { label: "Cost codes with GL mapping", color: "blue" }, { label: "Evaluation criteria & frameworks", color: "blue" }, { label: "Numbering sequences (12 entities)", color: "blue" }] } },
      { label: "Organization Settings", sub: "Per-company overrides — retention %, TDS rate, DLP months, thresholds", color: "green" },
      { label: "Approval Workflows", sub: "7 workflows with value-based routing thresholds", color: "purple" },
      { label: "Dimension Rules", sub: "Which 7 dimensions required per transaction type", color: "amber" },
      { label: "Master Data", sub: "Cost codes, BOQ items, rate templates — business user managed", color: "green" },
    ],
  },
  value: {
    summary: "From developer-dependent config to business user self-service.",
    painPoints: [
      "Every configuration change requires developer intervention",
      "Hard-coded business rules — no multi-country support",
      "New market entry means new codebase fork",
    ],
    outcomes: [
      "Business users configure workflows, criteria, and rules themselves",
      "Same engine works for BD, UAE, KSA, Africa with different config",
      "Configuration changes: developer sprint → business user self-service",
    ],
  },
  technical: {
    summary: "34-category configuration registry with three-layer hierarchy.",
    architectureNotes: [
      "Three-layer hierarchy (doc 02): platform defaults → industry pack seeds → org settings",
      "Configuration registry: 34 categories",
      "7 approval workflows with threshold-based routing",
      "12 numbering sequences",
      "54+ evaluation criteria (reusable, tagged)",
      "17 cost estimation categories",
      "Land evaluation: 7 sub-pages (Selection Templates, Framework List, Framework Builder, Criteria Library, Cost Categories, Report Templates, Settings Home)",
    ],
  },
};
