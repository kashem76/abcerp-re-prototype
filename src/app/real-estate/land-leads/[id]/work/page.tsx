import { getDefaultFramework } from "@/db/queries/frameworks";
import WorkBoardClient from "./work-board-client";

// Mock instance data — these would come from an evaluation_instances table in production
const mockInstanceData: Record<string, {
  id: string; assignee: string; reviewer: string; due: string;
  status: "not-started" | "in-progress" | "review" | "complete";
  progress: number; overdue: boolean; dependencyLabel?: string;
  dependencyMet: boolean; findings: number; risks: number;
}> = {
  "cat-land":        { id: "land-site", assignee: "Rahim", reviewer: "BD Head", due: "14 Aug", status: "complete", progress: 6, overdue: false, dependencyMet: true, findings: 0, risks: 0 },
  "cat-legal":       { id: "legal", assignee: "Adv. Rahman", reviewer: "Head of Legal", due: "20 Aug", status: "review", progress: 9, overdue: true, dependencyMet: true, findings: 2, risks: 1 },
  "cat-engineering": { id: "engineering", assignee: "Eng. Rafi", reviewer: "Chief Engineer", due: "22 Aug", status: "in-progress", progress: 7, overdue: false, dependencyMet: true, findings: 2, risks: 1 },
  "cat-regulatory":  { id: "regulatory", assignee: "Kamal", reviewer: "Planning Head", due: "21 Aug", status: "not-started", progress: 0, overdue: false, dependencyMet: true, findings: 0, risks: 0 },
  "cat-market":      { id: "market", assignee: "Nadia", reviewer: "Marketing Head", due: "19 Aug", status: "complete", progress: 8, overdue: false, dependencyMet: true, findings: 0, risks: 0 },
  "cat-sales":       { id: "sales", assignee: "Tariq", reviewer: "Sales Head", due: "22 Aug", status: "review", progress: 5, overdue: false, dependencyMet: true, findings: 0, risks: 0 },
  "cat-financial":   { id: "financial", assignee: "Analyst", reviewer: "CFO", due: "25 Aug", status: "not-started", progress: 0, overdue: false, dependencyLabel: "Cost, Market, Sales", dependencyMet: false, findings: 0, risks: 0 },
  "cat-risk":        { id: "cost", assignee: "Cost Eng.", reviewer: "CFO", due: "24 Aug", status: "not-started", progress: 0, overdue: false, dependencyLabel: "Engineering Assessment", dependencyMet: false, findings: 0, risks: 0 },
};

export default async function WorkBoardPage() {
  const framework = await getDefaultFramework();

  // Derive work steps from framework sections + mock instance data
  const workSteps = (framework?.sections ?? []).map((section) => {
    const instance = mockInstanceData[section.categoryId];
    const criteriaCount = section.criteria.length;
    return {
      id: instance?.id ?? section.id,
      name: `${section.category.name} Assessment`,
      department: section.defaultDepartment ?? section.category.department,
      assignee: instance?.assignee ?? section.defaultRole ?? "—",
      reviewer: instance?.reviewer ?? section.defaultReviewer ?? "—",
      due: instance?.due ?? "TBD",
      status: instance?.status ?? ("not-started" as const),
      progress: instance?.progress ?? 0,
      total: criteriaCount,
      overdue: instance?.overdue ?? false,
      dependency: instance?.dependencyLabel,
      dependencyMet: instance?.dependencyMet ?? true,
      findings: instance?.findings ?? 0,
      risks: instance?.risks ?? 0,
    };
  });

  const land = {
    id: "LL-2026-001",
    name: "Gulshan Plot 07",
    stage: "Feasibility",
    location: "Gulshan, Dhaka",
    area: "32 Katha",
    owner: "Mr Ahmed",
    coordinator: "Karim",
    targetDate: "25 Aug 2026",
    expectedPrice: 450_000_000,
    framework: framework?.name ?? "Standard Land Evaluation",
  };

  const departmentMembers: Record<string, string[]> = {
    "Land / BD": ["Rahim", "Kamal", "Sumon", "Faisal"],
    "Legal": ["Adv. Rahman", "Adv. Hasan", "Adv. Sultana"],
    "Engineering": ["Eng. Rafi", "Eng. Karim", "Eng. Sohel", "Cost Eng.", "Survey Team"],
    "Planning": ["Kamal", "Farhan", "Rashed"],
    "Marketing": ["Nadia", "Shafiq", "Ayesha"],
    "Sales": ["Tariq", "Imran", "Rubina"],
    "Finance": ["Analyst", "Sr. Analyst", "Accountant"],
  };

  const attentionItems = [
    { text: "Legal assessment overdue by 3 days", severity: "red" as const },
    { text: "Finance waiting for Engineering", severity: "amber" as const },
  ];

  const activityLog = [
    { time: "2h ago", user: "Rahim", type: "note" as const, text: "Spoke with owner today. Flexible on price if we close before October." },
    { time: "5h ago", user: "System", type: "system" as const, text: "Engineering Assessment: 7/11 criteria completed by Eng. Rafi" },
    { time: "1d ago", user: "Karim", type: "note" as const, text: "Legal team — mutation document is urgent. @Legal please prioritize." },
    { time: "1d ago", user: "System", type: "system" as const, text: "Marketing Assessment signed off by Marketing Head." },
    { time: "2d ago", user: "System", type: "system" as const, text: "Sales Assessment submitted for review by Tariq." },
  ];

  return (
    <WorkBoardClient
      land={land}
      workSteps={workSteps}
      departmentMembers={departmentMembers}
      attentionItems={attentionItems}
      activityLog={activityLog}
    />
  );
}
