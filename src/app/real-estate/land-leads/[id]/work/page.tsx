"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft, AlertTriangle, ArrowRight,
  CheckCircle2, Circle, Timer, Clock, Lock,
  MapPin, Send, Users, LayoutGrid, List, Building2,
  ChevronDown, User, Shield, Calendar, Zap,
} from "lucide-react";
import { formatBDT } from "@/lib/mock-data";

// ─── Types ─────────────────────────────────────────────────────

type StepStatus = "not-started" | "in-progress" | "review" | "complete";

interface WorkStep {
  id: string;
  name: string;
  department: string;
  assignee: string;
  reviewer: string;
  due: string;
  status: StepStatus;
  progress: number;
  total: number;
  overdue: boolean;
  dependency?: string;
  dependencyMet: boolean;
  findings: number;
  risks: number;
}

type BoardMode = "assignment-review" | "active";
type ViewMode = "board" | "list" | "department";
type FilterMode = "all" | "overdue" | "waiting" | "review";

// ─── Mock Data ─────────────────────────────────────────────────

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
  framework: "Standard Land Evaluation",
};

const workSteps: WorkStep[] = [
  {
    id: "land-site", name: "Land & Site Assessment", department: "Land / BD",
    assignee: "Rahim", reviewer: "BD Head", due: "14 Aug",
    status: "complete", progress: 6, total: 6, overdue: false,
    dependencyMet: true, findings: 0, risks: 0,
  },
  {
    id: "legal", name: "Legal Assessment", department: "Legal",
    assignee: "Adv. Rahman", reviewer: "Head of Legal", due: "20 Aug",
    status: "review", progress: 9, total: 9, overdue: true,
    dependencyMet: true, findings: 2, risks: 1,
  },
  {
    id: "engineering", name: "Engineering Assessment", department: "Engineering",
    assignee: "Eng. Rafi", reviewer: "Chief Engineer", due: "22 Aug",
    status: "in-progress", progress: 7, total: 11, overdue: false,
    dependencyMet: true, findings: 2, risks: 1,
  },
  {
    id: "regulatory", name: "Regulatory Review", department: "Planning",
    assignee: "Kamal", reviewer: "Planning Head", due: "21 Aug",
    status: "not-started", progress: 0, total: 6, overdue: false,
    dependencyMet: true, findings: 0, risks: 0,
  },
  {
    id: "market", name: "Market Assessment", department: "Marketing",
    assignee: "Nadia", reviewer: "Marketing Head", due: "19 Aug",
    status: "complete", progress: 8, total: 8, overdue: false,
    dependencyMet: true, findings: 0, risks: 0,
  },
  {
    id: "sales", name: "Sales Assessment", department: "Sales",
    assignee: "Tariq", reviewer: "Sales Head", due: "22 Aug",
    status: "review", progress: 5, total: 5, overdue: false,
    dependencyMet: true, findings: 0, risks: 0,
  },
  {
    id: "cost", name: "Preliminary Cost Estimate", department: "Engineering",
    assignee: "Cost Eng.", reviewer: "CFO", due: "24 Aug",
    status: "not-started", progress: 0, total: 17, overdue: false,
    dependency: "Engineering Assessment", dependencyMet: false, findings: 0, risks: 0,
  },
  {
    id: "financial", name: "Financial Feasibility", department: "Finance",
    assignee: "Analyst", reviewer: "CFO", due: "25 Aug",
    status: "not-started", progress: 0, total: 6, overdue: false,
    dependency: "Cost, Market, Sales", dependencyMet: false, findings: 0, risks: 0,
  },
];

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

// ─── Status Config ─────────────────────────────────────────────

const statusConfig: Record<StepStatus, { label: string; color: string; bg: string; icon: typeof Circle }> = {
  "not-started": { label: "Not Started", color: "text-gray-400", bg: "bg-gray-100 text-gray-700", icon: Circle },
  "in-progress": { label: "In Progress", color: "text-blue-600", bg: "bg-blue-100 text-blue-800", icon: Timer },
  "review": { label: "In Review", color: "text-amber-600", bg: "bg-amber-100 text-amber-800", icon: Clock },
  "complete": { label: "Complete", color: "text-emerald-600", bg: "bg-emerald-100 text-emerald-800", icon: CheckCircle2 },
};

const columnOrder: StepStatus[] = ["not-started", "in-progress", "review", "complete"];
const columnLabels: Record<StepStatus, string> = {
  "not-started": "Not Started",
  "in-progress": "In Progress",
  "review": "In Review",
  "complete": "Complete",
};

// ─── Component ─────────────────────────────────────────────────

export default function WorkBoardPage() {
  const [boardMode, setBoardMode] = useState<BoardMode>("active");
  const [view, setView] = useState<ViewMode>("board");
  const [filter, setFilter] = useState<FilterMode>("all");
  const [noteText, setNoteText] = useState("");

  const assessments = workSteps.filter((s) => s.status !== "not-started" || s.dependencyMet);
  const completedDepts = workSteps.filter((s) => s.status === "complete").length;
  const totalProgress = workSteps.reduce((s, c) => s + c.progress, 0);
  const totalItems = workSteps.reduce((s, c) => s + c.total, 0);
  const overallPct = totalItems > 0 ? Math.round((totalProgress / totalItems) * 100) : 0;

  // Filtering
  const filtered = workSteps.filter((step) => {
    switch (filter) {
      case "overdue": return step.overdue;
      case "waiting": return !step.dependencyMet;
      case "review": return step.status === "review";
      default: return true;
    }
  });

  // Group by department
  const byDepartment = filtered.reduce<Record<string, WorkStep[]>>((acc, step) => {
    if (!acc[step.department]) acc[step.department] = [];
    acc[step.department].push(step);
    return acc;
  }, {});

  // Group by status column
  const byColumn = columnOrder.map((status) => ({
    status,
    steps: filtered.filter((s) => s.status === status),
  }));

  return (
    <div className="space-y-5 p-6">
      {/* ── Header ── */}
      <div>
        <Link
          href="/real-estate/land-leads"
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-2"
        >
          <ChevronLeft className="h-4 w-4" /> Land Pipeline
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">{land.name}</h1>
              <Badge className="bg-purple-100 text-purple-800">{land.stage}</Badge>
              {attentionItems.length > 0 && (
                <Badge variant="destructive" className="text-[10px] gap-1">
                  <AlertTriangle className="h-3 w-3" /> {attentionItems.length}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {land.location} &middot; {land.area}</span>
              <span>{formatBDT(land.expectedPrice)}</span>
              <span>Owner: {land.owner}</span>
            </div>
          </div>
          <div className="text-right text-sm text-muted-foreground">
            <div>Coordinator: <span className="text-foreground font-medium">{land.coordinator}</span></div>
            <div>Target: <span className="text-foreground font-medium">{land.targetDate}</span></div>
          </div>
        </div>
      </div>

      {/* ── Progress Bar ── */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 flex-1">
          <span className="text-sm text-muted-foreground">Overall</span>
          <Progress value={overallPct} className="h-2 flex-1 max-w-sm" />
          <span className="text-sm font-medium">{overallPct}%</span>
          <span className="text-xs text-muted-foreground">{completedDepts}/{workSteps.length} steps</span>
        </div>
        {/* Mode toggle for demo */}
        <div className="flex gap-1 bg-muted rounded-lg p-1">
          <button
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              boardMode === "active" ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setBoardMode("active")}
          >
            Work Board
          </button>
          <button
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              boardMode === "assignment-review" ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setBoardMode("assignment-review")}
          >
            Assignments
          </button>
        </div>
      </div>

      {/* ── Attention Bar ── */}
      {attentionItems.length > 0 && boardMode === "active" && (
        <div className="flex flex-wrap gap-2">
          {attentionItems.map((item, i) => (
            <div key={i} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
              item.severity === "red" ? "bg-red-50 text-red-700 border border-red-200" : "bg-amber-50 text-amber-700 border border-amber-200"
            }`}>
              <AlertTriangle className="h-3 w-3" />
              {item.text}
            </div>
          ))}
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════ */}
      {/* MODE A — ASSIGNMENT REVIEW                                  */}
      {/* ════════════════════════════════════════════════════════════ */}

      {boardMode === "assignment-review" && (
        <div className="space-y-4">
          {/* Banner */}
          <Card className="border-blue-200 bg-blue-50/40">
            <CardContent className="py-4">
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-semibold">{workSteps.length} work steps created from "{land.framework}"</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Review and confirm team assignments before starting work. Auto-assigned from framework defaults.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Assignment Cards */}
          <div className="space-y-2">
            {/* Header row */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              <div className="col-span-3">Work Step</div>
              <div className="col-span-2">Department</div>
              <div className="col-span-2">Assignee</div>
              <div className="col-span-2">Reviewer</div>
              <div className="col-span-2">Due Date</div>
              <div className="col-span-1">Criteria</div>
            </div>

            {workSteps.map((step) => (
              <Card key={step.id} className={`${!step.dependencyMet ? "opacity-60" : ""}`}>
                <CardContent className="py-3 px-5">
                  <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-3">
                      <p className="text-sm font-medium">{step.name}</p>
                      {!step.dependencyMet && (
                        <p className="text-[11px] text-amber-600 flex items-center gap-1 mt-0.5">
                          <Lock className="h-3 w-3" /> Waiting: {step.dependency}
                        </p>
                      )}
                    </div>
                    <div className="col-span-2">
                      <span className="text-sm text-muted-foreground">{step.department}</span>
                    </div>
                    <div className="col-span-2">
                      <Select defaultValue={step.assignee}>
                        <SelectTrigger className="h-8 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {(departmentMembers[step.department] || [step.assignee]).map((m) => (
                            <SelectItem key={m} value={m}>{m}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2">
                      <Select defaultValue={step.reviewer}>
                        <SelectTrigger className="h-8 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {(departmentMembers[step.department] || [step.reviewer]).map((m) => (
                            <SelectItem key={m} value={m}>{m}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2">
                      <span className="text-sm text-muted-foreground">{step.due}</span>
                    </div>
                    <div className="col-span-1 text-right">
                      <span className="text-sm text-muted-foreground">{step.total}</span>
                    </div>
                  </div>

                  {/* Mobile layout */}
                  <div className="md:hidden space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{step.name}</p>
                      <span className="text-xs text-muted-foreground">{step.total} criteria</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{step.department}</span>
                      <span>{step.assignee}</span>
                      <span>Due {step.due}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2">
            <p className="text-sm text-muted-foreground">
              {workSteps.filter((s) => !s.dependencyMet).length} steps will auto-start when dependencies are met.
            </p>
            <div className="flex gap-3">
              <Button variant="outline">Save Assignments</Button>
              <Button className="gap-2" onClick={() => setBoardMode("active")}>
                Start Work <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════ */}
      {/* MODE B — ACTIVE WORK BOARD                                  */}
      {/* ════════════════════════════════════════════════════════════ */}

      {boardMode === "active" && (
        <>
          {/* ── View Switcher + Filters ── */}
          <div className="flex items-center justify-between">
            <div className="flex gap-1 bg-muted rounded-lg p-1">
              {([
                { key: "board" as const, label: "Board", icon: LayoutGrid },
                { key: "list" as const, label: "List", icon: List },
                { key: "department" as const, label: "By Department", icon: Building2 },
              ]).map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                    view === key ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setView(key)}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </button>
              ))}
            </div>

            <div className="flex gap-1 bg-muted rounded-lg p-1">
              {([
                { key: "all" as const, label: "All", count: workSteps.length },
                { key: "overdue" as const, label: "Overdue", count: workSteps.filter((s) => s.overdue).length },
                { key: "waiting" as const, label: "Waiting", count: workSteps.filter((s) => !s.dependencyMet).length },
                { key: "review" as const, label: "In Review", count: workSteps.filter((s) => s.status === "review").length },
              ]).map(({ key, label, count }) => (
                <button
                  key={key}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                    filter === key ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setFilter(key)}
                >
                  {label}
                  {count > 0 && key !== "all" && (
                    <span className={`ml-1 ${key === "overdue" ? "text-red-600" : ""}`}>{count}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ── BOARD VIEW ── */}
          {view === "board" && (
            <div className="grid grid-cols-4 gap-4">
              {byColumn.map(({ status, steps }) => (
                <div key={status}>
                  {/* Column header */}
                  <div className="flex items-center justify-between mb-3 px-1">
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${
                        status === "complete" ? "bg-emerald-500" :
                        status === "review" ? "bg-amber-500" :
                        status === "in-progress" ? "bg-blue-500" : "bg-gray-300"
                      }`} />
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {columnLabels[status]}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">{steps.length}</span>
                  </div>

                  {/* Column cards */}
                  <div className="space-y-2 min-h-32">
                    {steps.map((step) => (
                      <StepCard key={step.id} step={step} compact />
                    ))}
                    {steps.length === 0 && (
                      <div className="border border-dashed rounded-lg p-4 text-center text-xs text-muted-foreground">
                        No steps
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── LIST VIEW ── */}
          {view === "list" && (
            <div className="space-y-1">
              {/* Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                <div className="col-span-3">Step</div>
                <div className="col-span-2">Department</div>
                <div className="col-span-2">Assignee</div>
                <div className="col-span-2">Progress</div>
                <div className="col-span-1">Due</div>
                <div className="col-span-1">Status</div>
                <div className="col-span-1 text-right">Action</div>
              </div>

              {filtered.map((step) => {
                const cfg = statusConfig[step.status];
                const pct = step.total > 0 ? Math.round((step.progress / step.total) * 100) : 0;
                return (
                  <Card key={step.id} className={`${!step.dependencyMet ? "opacity-50" : "hover:border-primary/30"} transition-colors`}>
                    <CardContent className="py-3 px-5">
                      <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-3">
                          <p className="text-sm font-medium">{step.name}</p>
                          {step.overdue && <p className="text-[11px] text-red-600 mt-0.5">Overdue</p>}
                          {!step.dependencyMet && (
                            <p className="text-[11px] text-amber-600 flex items-center gap-1 mt-0.5">
                              <Timer className="h-3 w-3" /> Waiting: {step.dependency}
                            </p>
                          )}
                        </div>
                        <div className="col-span-2 text-sm text-muted-foreground">{step.department}</div>
                        <div className="col-span-2">
                          <p className="text-sm">{step.assignee}</p>
                          <p className="text-[11px] text-muted-foreground">{step.reviewer}</p>
                        </div>
                        <div className="col-span-2">
                          <div className="flex items-center gap-2">
                            <Progress value={pct} className="h-1.5 flex-1" />
                            <span className="text-xs text-muted-foreground tabular-nums w-10">{step.progress}/{step.total}</span>
                          </div>
                        </div>
                        <div className="col-span-1 text-sm text-muted-foreground">{step.due}</div>
                        <div className="col-span-1">
                          <Badge className={`${cfg.bg} text-[10px]`}>{cfg.label}</Badge>
                        </div>
                        <div className="col-span-1 text-right">
                          {step.dependencyMet && (
                            <Link href={`/real-estate/land-leads/${land.id}/work/${step.id}`}>
                              <Button variant="outline" size="sm" className="text-xs h-7">Open</Button>
                            </Link>
                          )}
                        </div>
                      </div>

                      {/* Mobile */}
                      <Link href={`/real-estate/land-leads/${land.id}/work/${step.id}`} className="md:hidden block">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium">{step.name}</p>
                          <Badge className={`${cfg.bg} text-[10px]`}>{cfg.label}</Badge>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{step.department}</span>
                          <span>{step.assignee}</span>
                          <span>Due {step.due}</span>
                        </div>
                        {step.total > 0 && (
                          <div className="flex items-center gap-2 mt-2">
                            <Progress value={pct} className="h-1 flex-1" />
                            <span className="text-[11px] text-muted-foreground">{step.progress}/{step.total}</span>
                          </div>
                        )}
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* ── BY DEPARTMENT VIEW ── */}
          {view === "department" && (
            <div className="space-y-6">
              {Object.entries(byDepartment).map(([dept, steps]) => {
                const deptProgress = steps.reduce((s, c) => s + c.progress, 0);
                const deptTotal = steps.reduce((s, c) => s + c.total, 0);
                const deptPct = deptTotal > 0 ? Math.round((deptProgress / deptTotal) * 100) : 0;
                const deptComplete = steps.filter((s) => s.status === "complete").length;

                return (
                  <div key={dept}>
                    {/* Department header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <h3 className="text-sm font-semibold">{dept}</h3>
                        <span className="text-xs text-muted-foreground">
                          {steps.length} {steps.length === 1 ? "step" : "steps"} &middot; {deptComplete} complete
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Progress value={deptPct} className="h-1.5 w-24" />
                        <span className="text-xs text-muted-foreground tabular-nums">{deptPct}%</span>
                      </div>
                    </div>

                    {/* Department step cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ml-7">
                      {steps.map((step) => (
                        <StepCard key={step.id} step={step} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ── Empty state ── */}
          {filtered.length === 0 && (
            <Card className="border-dashed">
              <CardContent className="py-8 text-center">
                <p className="text-sm text-muted-foreground">No steps match this filter.</p>
                <button className="text-sm text-blue-600 hover:underline mt-1" onClick={() => setFilter("all")}>
                  Show all steps
                </button>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* ── Activity & Notes ── */}
      <Separator />
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Recent Activity</h2>
        <div className="flex gap-2 mb-4">
          <Textarea
            placeholder="Add a note... @mention team members"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            rows={2}
            className="flex-1"
          />
          <Button size="sm" className="self-end gap-1" disabled={!noteText.trim()}>
            <Send className="h-3.5 w-3.5" /> Post
          </Button>
        </div>
        <div className="space-y-3">
          {activityLog.map((entry, i) => (
            <div key={i} className="flex gap-3 text-sm">
              <div className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${entry.type === "note" ? "bg-blue-500" : "bg-gray-300"}`} />
              <div>
                <span className="font-medium">{entry.user}</span>
                <span className="text-muted-foreground ml-2">{entry.time}</span>
                {entry.type === "note" && <Badge variant="outline" className="text-[10px] ml-2">Note</Badge>}
                <p className="text-muted-foreground mt-0.5">{entry.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Step Card Component ───────────────────────────────────────

function StepCard({ step, compact }: { step: WorkStep; compact?: boolean }) {
  const cfg = statusConfig[step.status];
  const StatusIcon = cfg.icon;
  const pct = step.total > 0 ? Math.round((step.progress / step.total) * 100) : 0;
  const isBlocked = !step.dependencyMet;
  const BASE = `/real-estate/land-leads/LL-2026-001/work`;

  const card = (
    <Card className={`transition-all h-full ${
      isBlocked ? "opacity-50" :
      step.overdue ? "border-red-200 hover:border-red-300" :
      "hover:border-primary/30 hover:shadow-sm"
    } ${isBlocked ? "" : "cursor-pointer"}`}>
      <CardContent className={compact ? "py-3 px-3.5" : "py-4"}>
        {/* Title + Status */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <StatusIcon className={`h-3.5 w-3.5 ${cfg.color} shrink-0`} />
            <p className={`font-medium truncate ${compact ? "text-xs" : "text-sm"}`}>{step.name}</p>
          </div>
          {step.overdue && !compact && (
            <Badge variant="destructive" className="text-[9px] shrink-0">Overdue</Badge>
          )}
        </div>

        {/* Department + Assignee */}
        <div className={`flex items-center gap-2 text-muted-foreground mb-2 ${compact ? "text-[11px]" : "text-xs"}`}>
          <span>{step.department}</span>
          <span>&middot;</span>
          <span className="flex items-center gap-1"><User className="h-3 w-3" /> {step.assignee}</span>
        </div>

        {/* Progress */}
        {step.status !== "not-started" && step.status !== "complete" && (
          <div className="flex items-center gap-2 mb-2">
            <Progress value={pct} className="h-1 flex-1" />
            <span className="text-[10px] text-muted-foreground tabular-nums">{step.progress}/{step.total}</span>
          </div>
        )}

        {/* Complete indicator */}
        {step.status === "complete" && (
          <p className="text-[11px] text-emerald-600 flex items-center gap-1 mb-2">
            <CheckCircle2 className="h-3 w-3" /> Signed off
          </p>
        )}

        {/* Dependency warning */}
        {isBlocked && (
          <p className="text-[11px] text-amber-600 flex items-center gap-1 mb-2">
            <Timer className="h-3 w-3" /> Waiting: {step.dependency}
          </p>
        )}

        {/* Findings + risks */}
        {(step.findings > 0 || step.risks > 0) && !compact && (
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-2">
            {step.findings > 0 && <span>{step.findings} findings</span>}
            {step.risks > 0 && <span className="text-amber-600">{step.risks} risk</span>}
          </div>
        )}

        {/* Footer: due + reviewer */}
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span className={`flex items-center gap-1 ${step.overdue ? "text-red-600 font-medium" : ""}`}>
            <Calendar className="h-3 w-3" />
            {step.overdue && <AlertTriangle className="h-3 w-3" />}
            Due {step.due}
          </span>
          {!compact && (
            <span className="flex items-center gap-1">
              <Shield className="h-3 w-3" /> {step.reviewer}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (isBlocked) return card;

  return <Link href={`${BASE}/${step.id}`}>{card}</Link>;
}
