import type { ModuleGuide } from "../types";

export const landGuide: ModuleGuide = {
  moduleId: "land-bd",
  moduleName: "Land & BD",
  overview: {
    description:
      "Complete land acquisition pipeline from first lead to project conversion. Three-layer separation: Work, Evaluation, Decision. Configurable evaluation framework with 54+ criteria across 8 departments.",
    personas: [
      { role: "BD Officer", does: "Captures leads, schedules site visits, manages pipeline" },
      { role: "BD Head", does: "Pipeline health, team assignment, bottleneck tracking" },
      { role: "Dept Assessor", does: "Evaluates criteria, logs findings, flags risks" },
      { role: "Dept Head", does: "Reviews team work, signs off assessments" },
      { role: "CEO / MD", does: "Makes proceed/reject/conditional decisions" },
      { role: "CFO", does: "Financial model review, cost traceability" },
    ],
    workflow: [
      "Capture Lead (30 sec)",
      "Initial Selection scoring",
      "Assign evaluation team",
      "Department-wise assessment",
      "Sign-offs",
      "Financial model",
      "Auto-assembled management report",
      "CEO Decision",
      "Acquisition / JV",
      "Project Conversion",
    ],
  },
  stories: {
    summary: "From lead capture to CEO decision — every step tracked.",
    items: [
      { id: "LD-01", role: "BD Officer", story: "Add a land lead in under 60 seconds" },
      { id: "LD-02", role: "BD Head", story: "Pipeline view with stage filters and aging badges" },
      { id: "LD-03", role: "Assessor", story: "Evaluate criteria and log findings with severity" },
      { id: "LD-04", role: "Dept Head", story: "Review and sign off my team's work" },
      { id: "LD-05", role: "CEO", story: "1-page decision screen with all department summaries" },
      { id: "LD-06", role: "CFO", story: "Financial model with source attribution per assumption" },
    ],
  },
  flow: {
    title: "Land Acquisition Pipeline",
    description: "Lead capture to project conversion — 3 layers: Work, Evaluation, Decision",
    steps: [
      { label: "Lead Capture", sub: "BD Officer adds land in 30 seconds", color: "blue" },
      { label: "Initial Selection", sub: "Quick scoring — pass/fail on critical criteria", color: "blue", branch: { label: "If Critical Failure", steps: [{ label: "Auto-reject — lead closed", color: "red" }] } },
      { label: "Evaluation Study Created", sub: "Framework assigned, team auto-notified", color: "purple" },
      { label: "Department Assessments", sub: "8 departments evaluate in parallel (Legal, Engineering, Market, Finance...)", color: "amber" },
      { label: "Department Sign-offs", sub: "Each head reviews and locks their section", color: "amber" },
      { label: "Financial Model", sub: "Auto-assembled from department inputs, IRR/NPV/scenarios", color: "purple" },
      { label: "Management Report", sub: "Auto-generated 16-section report — zero manual compilation", color: "green" },
      { label: "CEO Decision", sub: "1-page screen: Approve / Conditions / Return / Reject", color: "green", branch: { label: "Decision Options", steps: [{ label: "Approve → proceed to acquisition", color: "green" }, { label: "Approve with Conditions → track conditions", color: "amber" }, { label: "Return → send back for more work", color: "amber" }, { label: "Reject → lead closed with reason", color: "red" }] } },
      { label: "Land Acquisition", sub: "Purchase agreement or JV terms finalized", color: "green" },
      { label: "Project Conversion", sub: "Land → Project with auto-carry-forward of all data", color: "green" },
    ],
  },
  value: {
    summary: "From 45-60 day Word/WhatsApp chaos to 15-21 day structured evaluation.",
    painPoints: [
      "Land evaluation takes 45-60 days with Word docs and WhatsApp",
      "No audit trail — who evaluated what and when is unknown",
      "Management report manually compiled over 2-3 days",
    ],
    outcomes: [
      "15-21 day evaluation cycle (60-65% reduction)",
      "Auto-assembled reports — zero manual compilation",
      "Complete audit trail for every finding and decision",
    ],
    timeSavings: "Management report: 2-3 days manual → instant auto-assembly",
  },
  technical: {
    summary: "30 Prisma models powering a three-layer evaluation engine.",
    architectureNotes: [
      "PDR-001: Three-layer separation — Work / Evaluation / Decision",
      "PDR-002: Findings are first-class objects",
      "PDR-003: Stage derived from business events, not dropdown",
      "Pre-dev expenses post to P&L with land as cost object",
      "Project conversion optionally transfers pre-dev costs from P&L to WIP",
    ],
  },
};
