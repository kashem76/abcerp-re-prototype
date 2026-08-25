"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft, MapPin, AlertTriangle, ArrowRight,
  CheckCircle2, Circle, Lock, DollarSign,
  FolderOpen, Clipboard, Send,
  TrendingUp, Eye, Calendar, ChevronRight,
} from "lucide-react";
import { formatBDT } from "@/lib/mock-data";

// ─── Mock Data ─────────────────────────────────────────────────

type LandStageKey = "New" | "Assessment" | "Feasibility" | "Decision" | "Acquisition";

const land = {
  id: "LL-2026-001",
  name: "Gulshan Plot 07",
  stage: "Feasibility" as LandStageKey,
  location: "Gulshan, Dhaka",
  area: "32 Katha",
  owner: "Mr Ahmed",
  coordinator: "Karim",
  assignedTo: "Rahim",
  targetDate: "25 Aug 2026",
  expectedPrice: 450_000_000,
  source: "Direct Owner",
  createdDate: "05 Aug 2026",
};

interface StageStep {
  name: LandStageKey;
  status: "complete" | "active" | "locked";
  progress: number;
}

const stageSteps: StageStep[] = [
  { name: "Assessment", status: "complete", progress: 100 },
  { name: "Feasibility", status: "active", progress: 63 },
  { name: "Decision", status: "locked", progress: 0 },
  { name: "Acquisition", status: "locked", progress: 0 },
];

const attentionItems = [
  { severity: "red" as const, text: "Legal assessment overdue by 3 days", action: "Open", href: "/real-estate/land-leads/LL-2026-001/work/legal" },
  { severity: "amber" as const, text: "Mutation document missing", action: "Upload", href: "#" },
  { severity: "amber" as const, text: "Construction estimate +8% above baseline", action: "Review", href: "/real-estate/land-leads/LL-2026-001/feasibility" },
];

const upcoming = [
  { date: "18 Aug", event: "Authority visit", dept: "Planning" },
  { date: "20 Aug", event: "Engineering deadline", dept: "Engineering" },
  { date: "22 Aug", event: "Sales assessment due", dept: "Sales" },
  { date: "25 Aug", event: "Feasibility target", dept: "All" },
];

const activityLog = [
  { time: "2h ago", user: "Rahim", type: "note" as const, text: "Spoke with owner today. Flexible on price if we close before October. Wants min 2 units in JV." },
  { time: "5h ago", user: "System", type: "system" as const, text: "Engineering Assessment submitted for review. Reviewer: Chief Engineer" },
  { time: "1d ago", user: "Karim", type: "note" as const, text: "Legal team — mutation document is urgent. @Legal please prioritize." },
  { time: "1d ago", user: "System", type: "system" as const, text: "Marketing Assessment signed off by Marketing Head." },
  { time: "2d ago", user: "Eng. Rafi", type: "system" as const, text: "Foundation Requirement criterion completed. Rating: 3/5." },
  { time: "3d ago", user: "System", type: "system" as const, text: "Land & Site assessment signed off by BD Head." },
];

// Initial Selection — interactive for NEW lands, read-only summary for qualified lands
interface SelectionCriterion {
  name: string;
  status: "done" | "pending";
  result: string;
  type: "rating" | "yes-no" | "numeric" | "choice";
  critical: boolean;
}

const selectionCriteria: SelectionCriterion[] = [
  { name: "Target location", status: "done", result: "Preferred", type: "choice", critical: false },
  { name: "Land area within range", status: "done", result: "32 Katha", type: "numeric", critical: false },
  { name: "Asking price acceptable", status: "done", result: "Acceptable", type: "choice", critical: false },
  { name: "Owner willingness", status: "done", result: "Strong", type: "rating", critical: false },
  { name: "Development potential", status: "done", result: "Good", type: "rating", critical: false },
  { name: "JV willingness", status: "done", result: "Yes", type: "yes-no", critical: false },
  { name: "Known title dispute", status: "done", result: "None", type: "yes-no", critical: true },
  { name: "Road accessibility", status: "done", result: "40 ft road", type: "numeric", critical: false },
  { name: "Regulatory red flags", status: "done", result: "None", type: "yes-no", critical: true },
];

// Department work summary for feasibility progress
const deptSummary = [
  { dept: "Land & Site", status: "complete" as const, progress: "6/6" },
  { dept: "Legal", status: "review" as const, progress: "9/9" },
  { dept: "Engineering", status: "in-progress" as const, progress: "7/11" },
  { dept: "Regulatory", status: "not-started" as const, progress: "0/6" },
  { dept: "Marketing", status: "complete" as const, progress: "8/8" },
  { dept: "Sales", status: "review" as const, progress: "5/5" },
  { dept: "Cost Estimate", status: "waiting" as const, progress: "0/17" },
  { dept: "Financial", status: "waiting" as const, progress: "0/6" },
];

const deptStatusStyle: Record<string, { label: string; color: string }> = {
  "complete": { label: "Signed Off", color: "text-emerald-600" },
  "review": { label: "In Review", color: "text-amber-600" },
  "in-progress": { label: "In Progress", color: "text-blue-600" },
  "not-started": { label: "Not Started", color: "text-gray-400" },
  "waiting": { label: "Waiting", color: "text-gray-400" },
};

// ─── Tabs ──────────────────────────────────────────────────────

type TabKey = "overview" | "work" | "feasibility" | "acquisition" | "financials" | "documents";

const tabs: { key: TabKey; label: string; icon: typeof Eye; href?: string; locked?: boolean }[] = [
  { key: "overview", label: "Overview", icon: Eye },
  { key: "work", label: "Work", icon: Clipboard, href: `/real-estate/land-leads/LL-2026-001/work` },
  { key: "feasibility", label: "Feasibility", icon: TrendingUp, href: `/real-estate/land-leads/LL-2026-001/feasibility` },
  { key: "acquisition", label: "Acquisition", icon: Lock, locked: true },
  { key: "financials", label: "Financials", icon: DollarSign },
  { key: "documents", label: "Documents", icon: FolderOpen },
];

// ─── Component ─────────────────────────────────────────────────

export default function LandWorkspacePage() {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [noteText, setNoteText] = useState("");
  // For demo: toggle between NEW (selection in progress) and Feasibility (qualified)
  const [demoStage, setDemoStage] = useState<"new" | "qualified">("qualified");

  const isNew = demoStage === "new";
  const selectionDone = selectionCriteria.filter((c) => c.status === "done").length;
  const selectionTotal = selectionCriteria.length;
  const selectionScore = 86;
  const criticalFailures = 0;

  return (
    <div className="space-y-0">
      {/* ── Persistent Header ── */}
      <div className="px-6 pt-5 pb-4 border-b bg-white sticky top-14 z-10">
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
              <Badge className={isNew ? "bg-slate-100 text-slate-700" : "bg-purple-100 text-purple-800"}>
                {isNew ? "New" : land.stage}
              </Badge>
              {attentionItems.length > 0 && !isNew && (
                <Badge variant="destructive" className="text-[10px] gap-1">
                  <AlertTriangle className="h-3 w-3" /> {attentionItems.length}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {land.location}</span>
              <span>{land.area}</span>
              <span>{formatBDT(land.expectedPrice)}</span>
              <span>Owner: {land.owner}</span>
            </div>
          </div>
          <div className="text-right text-sm">
            <div className="text-muted-foreground">
              Coordinator: <span className="text-foreground font-medium">{land.coordinator}</span>
            </div>
            <div className="text-muted-foreground">
              Target: <span className="text-foreground font-medium">{land.targetDate}</span>
            </div>
            {/* Demo toggle */}
            <button
              className="text-[10px] text-blue-600 hover:underline mt-1"
              onClick={() => setDemoStage(isNew ? "qualified" : "new")}
            >
              Demo: {isNew ? "Show Feasibility Stage →" : "Show NEW Stage →"}
            </button>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="flex gap-1 mt-4 border-b -mb-px">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;

            // Tabs that navigate to separate pages
            if (tab.href && !isActive) {
              return (
                <Link key={tab.key} href={tab.href}>
                  <button className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium text-muted-foreground hover:text-foreground border-b-2 border-transparent transition-colors">
                    <Icon className="h-3.5 w-3.5" /> {tab.label}
                  </button>
                </Link>
              );
            }

            return (
              <button
                key={tab.key}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium border-b-2 transition-colors ${
                  isActive
                    ? "text-foreground border-foreground"
                    : tab.locked
                      ? "text-muted-foreground/50 border-transparent cursor-not-allowed"
                      : "text-muted-foreground hover:text-foreground border-transparent"
                }`}
                onClick={() => !tab.locked && setActiveTab(tab.key)}
              >
                <Icon className="h-3.5 w-3.5" />
                {tab.label}
                {tab.locked && <Lock className="h-3 w-3 ml-0.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Tab Content ── */}
      <div className="p-6">
        {activeTab === "overview" && (
          <div className="space-y-6">

            {/* ══════════════════════════════════════════════════════ */}
            {/* NEW LAND — Initial Selection + Get Started            */}
            {/* ══════════════════════════════════════════════════════ */}

            {isNew && (
              <>
                {/* Get Started guidance */}
                <Card className="border-blue-200 bg-blue-50/30">
                  <CardContent className="pt-5 pb-4">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                        <ArrowRight className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Get Started</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Complete the initial selection below to qualify this land. Once qualified,
                          the system will generate work steps for detailed evaluation.
                        </p>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline" className="text-xs gap-1">
                            <Calendar className="h-3.5 w-3.5" /> Schedule Site Visit
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs gap-1">
                            <FolderOpen className="h-3.5 w-3.5" /> Add Documents
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Interactive Initial Selection */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Initial Selection</CardTitle>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{selectionDone}/{selectionTotal} completed</span>
                        <Progress value={(selectionDone / selectionTotal) * 100} className="h-1.5 w-20" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectionCriteria.map((c) => (
                        <div key={c.name} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-2">
                            {c.status === "done" ? (
                              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                            ) : (
                              <Circle className="h-4 w-4 text-gray-300 shrink-0" />
                            )}
                            <span className="text-sm">{c.name}</span>
                            {c.critical && (
                              <Badge variant="outline" className="text-[9px] text-red-600 border-red-200">Critical</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {c.status === "done" ? (
                              <span className="text-xs text-muted-foreground">{c.result}</span>
                            ) : (
                              <Select>
                                <SelectTrigger className="h-7 text-xs w-32">
                                  <SelectValue placeholder="Evaluate" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="good">Good</SelectItem>
                                  <SelectItem value="acceptable">Acceptable</SelectItem>
                                  <SelectItem value="poor">Poor</SelectItem>
                                  <SelectItem value="reject">Reject</SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Selection Result */}
                    <Separator className="my-4" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Score</p>
                          <p className="text-lg font-bold">{selectionScore}/100</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Critical Failures</p>
                          <p className="text-lg font-bold text-emerald-600">{criticalFailures}</p>
                        </div>
                        <Badge className="bg-emerald-100 text-emerald-800">Likely Suitable</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="text-xs">Hold</Button>
                        <Button variant="outline" size="sm" className="text-xs text-red-600 border-red-200 hover:bg-red-50">Reject</Button>
                        <Button size="sm" className="text-xs gap-1" onClick={() => setDemoStage("qualified")}>
                          Qualify & Start Evaluation <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Land Details for NEW */}
                <LandDetailsCard />
              </>
            )}

            {/* ══════════════════════════════════════════════════════ */}
            {/* QUALIFIED LAND — Full Workspace Overview               */}
            {/* ══════════════════════════════════════════════════════ */}

            {!isNew && (
              <>
                {/* Stage Progress Stepper */}
                <Card>
                  <CardContent className="py-5">
                    <div className="flex items-center">
                      {stageSteps.map((stage, i) => (
                        <div key={stage.name} className="flex items-center flex-1">
                          {/* Node */}
                          <div className="flex flex-col items-center gap-1.5 flex-1">
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                              stage.status === "complete" ? "bg-emerald-100" :
                              stage.status === "active" ? "bg-blue-100 ring-2 ring-blue-500 ring-offset-2" :
                              "bg-gray-100"
                            }`}>
                              {stage.status === "complete" ? (
                                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                              ) : stage.status === "active" ? (
                                <span className="text-xs font-bold text-blue-600">{stage.progress}%</span>
                              ) : (
                                <Lock className="h-3.5 w-3.5 text-gray-400" />
                              )}
                            </div>
                            <span className={`text-xs font-medium ${
                              stage.status === "active" ? "text-foreground" :
                              stage.status === "complete" ? "text-emerald-600" :
                              "text-muted-foreground"
                            }`}>{stage.name}</span>
                            {stage.status === "active" && (
                              <Progress value={stage.progress} className="h-1 w-16" />
                            )}
                          </div>
                          {/* Connector */}
                          {i < stageSteps.length - 1 && (
                            <div className={`h-0.5 w-full max-w-12 ${
                              stage.status === "complete" ? "bg-emerald-300" : "bg-gray-200"
                            }`} />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">

                    {/* Next Action */}
                    <Card className="border-blue-200 bg-blue-50/30">
                      <CardContent className="pt-5 pb-4">
                        <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-2">What's Next</p>
                        <p className="text-sm text-muted-foreground mb-3">
                          Engineering assessment is blocking Financial Feasibility. 4 criteria remaining.
                        </p>
                        <div className="flex items-center justify-between bg-white rounded-lg border p-3">
                          <div>
                            <p className="font-medium text-sm">Engineering Assessment</p>
                            <p className="text-xs text-muted-foreground mt-0.5">7/11 criteria &middot; Due 22 Aug &middot; Eng. Rafi</p>
                          </div>
                          <Link href="/real-estate/land-leads/LL-2026-001/work/engineering">
                            <Button size="sm" className="gap-1">
                              Open <ArrowRight className="h-3.5 w-3.5" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Attention */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          Attention
                          <Badge variant="destructive" className="text-[10px]">{attentionItems.length}</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {attentionItems.map((item, i) => (
                          <div key={i} className={`flex items-center justify-between p-3 rounded-lg border ${
                            item.severity === "red" ? "border-red-200 bg-red-50/50" : "border-amber-200 bg-amber-50/50"
                          }`}>
                            <div className="flex items-center gap-2">
                              <AlertTriangle className={`h-4 w-4 shrink-0 ${item.severity === "red" ? "text-red-500" : "text-amber-500"}`} />
                              <span className="text-sm">{item.text}</span>
                            </div>
                            <Link href={item.href}>
                              <Button variant="outline" size="sm" className="text-xs shrink-0">{item.action}</Button>
                            </Link>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Department Work Summary */}
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">Department Progress</CardTitle>
                          <Link href="/real-estate/land-leads/LL-2026-001/work">
                            <Button variant="outline" size="sm" className="text-xs gap-1">
                              Open Work Board <ChevronRight className="h-3.5 w-3.5" />
                            </Button>
                          </Link>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {deptSummary.map((d) => {
                            const style = deptStatusStyle[d.status];
                            const [done, total] = d.progress.split("/").map(Number);
                            const pct = total > 0 ? Math.round((done / total) * 100) : 0;
                            return (
                              <div key={d.dept} className="flex items-center gap-3 py-1.5">
                                <span className="text-sm w-28 shrink-0">{d.dept}</span>
                                <Progress value={pct} className="h-1.5 flex-1" />
                                <span className="text-xs text-muted-foreground tabular-nums w-10 text-right">{d.progress}</span>
                                <span className={`text-[11px] font-medium w-20 text-right ${style.color}`}>{style.label}</span>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Feasibility Snapshot */}
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">Feasibility Snapshot</CardTitle>
                          <Link href="/real-estate/land-leads/LL-2026-001/feasibility">
                            <Button variant="ghost" size="sm" className="text-xs gap-1 text-muted-foreground">
                              Details <ChevronRight className="h-3.5 w-3.5" />
                            </Button>
                          </Link>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-5 gap-4 text-center">
                          {[
                            { label: "Revenue", value: "৳1.82B" },
                            { label: "Cost", value: "৳1.39B" },
                            { label: "Profit", value: "৳430M" },
                            { label: "Margin", value: "23.6%" },
                            { label: "IRR", value: "22.4%" },
                          ].map((kpi) => (
                            <div key={kpi.label}>
                              <p className="text-lg font-bold">{kpi.value}</p>
                              <p className="text-xs text-muted-foreground">{kpi.label}</p>
                            </div>
                          ))}
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-3 text-center">
                          Based on department inputs as of 18 Aug. Cost estimate pending.
                        </p>
                      </CardContent>
                    </Card>

                    {/* Activity & Notes */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Activity & Notes</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex gap-2">
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
                        <Separator />
                        <div className="space-y-4">
                          {activityLog.map((entry, i) => (
                            <div key={i} className="flex gap-3">
                              <div className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${
                                entry.type === "note" ? "bg-blue-500" : "bg-gray-300"
                              }`} />
                              <div className="min-w-0">
                                <div className="flex items-center gap-2 text-xs">
                                  <span className="font-medium text-foreground">{entry.user}</span>
                                  <span className="text-muted-foreground">{entry.time}</span>
                                  {entry.type === "note" && <Badge variant="outline" className="text-[10px]">Note</Badge>}
                                </div>
                                <p className="text-sm text-muted-foreground mt-0.5">{entry.text}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Right Sidebar */}
                  <div className="space-y-4">
                    {/* Upcoming */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Upcoming Deadlines</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {upcoming.map((event, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="text-center shrink-0 w-12 py-1 bg-muted/50 rounded">
                              <p className="text-xs font-bold">{event.date.split(" ")[0]}</p>
                              <p className="text-[10px] text-muted-foreground">{event.date.split(" ")[1]}</p>
                            </div>
                            <div>
                              <p className="text-sm">{event.event}</p>
                              <p className="text-[11px] text-muted-foreground">{event.dept}</p>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Land Details */}
                    <LandDetailsCard />

                    {/* Selection Summary (read-only for qualified lands) */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center gap-2">
                          Initial Selection
                          <Badge className="bg-emerald-100 text-emerald-800 text-[10px]">Qualified</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-1">
                          {selectionCriteria.slice(0, 5).map((c) => (
                            <div key={c.name} className="flex items-center justify-between text-xs py-0.5">
                              <span className="flex items-center gap-1.5">
                                <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                                {c.name}
                              </span>
                              <span className="text-muted-foreground">{c.result}</span>
                            </div>
                          ))}
                          <p className="text-[11px] text-muted-foreground pt-1">+{selectionCriteria.length - 5} more criteria</p>
                        </div>
                        <div className="mt-3 pt-3 border-t flex items-center justify-between text-sm">
                          <span className="font-medium">Score: {selectionScore}/100</span>
                          <span className="text-xs text-muted-foreground">0 critical failures</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Placeholder tabs for tabs that don't navigate away */}
        {activeTab === "acquisition" && (
          <Card className="border-dashed">
            <CardContent className="py-10 text-center">
              <Lock className="h-8 w-8 mx-auto mb-2 text-muted-foreground/40" />
              <p className="font-medium mb-1">Acquisition is locked</p>
              <p className="text-sm text-muted-foreground">Complete feasibility and get management approval first.</p>
              <p className="text-xs text-muted-foreground mt-3">
                Current: Feasibility 63% &middot; 2/8 departments signed off
              </p>
            </CardContent>
          </Card>
        )}

        {activeTab === "financials" && (
          <Card className="border-dashed">
            <CardContent className="py-10 text-center">
              <DollarSign className="h-8 w-8 mx-auto mb-2 text-muted-foreground/40" />
              <p className="text-muted-foreground">Pre-development expenses, payments, commitments</p>
              <p className="text-xs text-muted-foreground mt-1">No expenses recorded yet.</p>
            </CardContent>
          </Card>
        )}

        {activeTab === "documents" && (
          <Card className="border-dashed">
            <CardContent className="py-10 text-center">
              <FolderOpen className="h-8 w-8 mx-auto mb-2 text-muted-foreground/40" />
              <p className="text-muted-foreground">Documents from all work steps, aggregated by category</p>
              <p className="text-xs text-muted-foreground mt-1">14 files across 4 departments.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

// ─── Land Details Card ─────────────────────────────────────────

function LandDetailsCard() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Land Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        {[
          { label: "ID", value: land.id },
          { label: "Location", value: land.location },
          { label: "Area", value: land.area },
          { label: "Expected Price", value: formatBDT(land.expectedPrice) },
          { label: "Owner", value: land.owner },
          { label: "Source", value: land.source },
          { label: "Assigned To", value: land.assignedTo },
          { label: "Created", value: land.createdDate },
        ].map((field) => (
          <div key={field.label} className="flex justify-between">
            <span className="text-muted-foreground">{field.label}</span>
            <span className="font-medium">{field.value}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
