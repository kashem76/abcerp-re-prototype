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
  Sheet, SheetContent, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft, Clipboard, Clock, AlertTriangle, ArrowRight,
  CheckCircle2, Circle, Timer, User, MapPin, Lock,
  TrendingUp, DollarSign, FileText, Eye, Shield, Send,
  Calendar, Info, Users, UserCog,
} from "lucide-react";
import { formatBDT } from "@/lib/mock-data";

// ─── Mock Data ─────────────────────────────────────────────────

type CardStatus = "not-started" | "in-progress" | "review" | "complete" | "locked";

interface WorkCard {
  id: string;
  name: string;
  type: "overview" | "assessment" | "cost" | "evaluation" | "financial" | "report" | "decision";
  department?: string;
  assignee?: string;
  reviewer?: string;
  due?: string;
  status: CardStatus;
  progress?: number;
  total?: number;
  dependency?: string;
  overdue?: boolean;
  subtitle?: string;
  href: string;
  icon: typeof Clipboard;
  score?: number;
}

const BASE = "/real-estate/land-leads/LL-2026-001";

const workCards: WorkCard[] = [
  // Overview
  {
    id: "overview", name: "Overview", type: "overview",
    status: "complete", subtitle: "Land details, selection, owners, activity",
    href: `${BASE}`, icon: Eye,
  },
  // Department assessments
  {
    id: "land-site", name: "Land & Site", type: "assessment",
    department: "Land / BD", assignee: "Rahim", reviewer: "BD Head", due: "14 Aug",
    status: "complete", progress: 6, total: 6, overdue: false,
    href: `${BASE}/work/land-site`, icon: MapPin,
  },
  {
    id: "legal", name: "Legal Assessment", type: "assessment",
    department: "Legal", assignee: "Adv. Rahman", reviewer: "Head of Legal", due: "20 Aug",
    status: "review", progress: 8, total: 9, overdue: true,
    href: `${BASE}/work/legal`, icon: Shield,
  },
  {
    id: "engineering", name: "Engineering Assessment", type: "assessment",
    department: "Engineering", assignee: "Eng. Rafi", reviewer: "Chief Engineer", due: "22 Aug",
    status: "in-progress", progress: 7, total: 11, overdue: false,
    href: `${BASE}/work/engineering`, icon: Clipboard,
  },
  {
    id: "regulatory", name: "Regulatory Review", type: "assessment",
    department: "Planning", assignee: "Kamal", reviewer: "Planning Head", due: "21 Aug",
    status: "not-started", progress: 0, total: 6, overdue: false,
    href: `${BASE}/work/regulatory`, icon: FileText,
  },
  {
    id: "market", name: "Market Assessment", type: "assessment",
    department: "Marketing", assignee: "Nadia", reviewer: "Marketing Head", due: "19 Aug",
    status: "complete", progress: 8, total: 8, overdue: false,
    href: `${BASE}/work/market`, icon: TrendingUp,
  },
  {
    id: "sales", name: "Sales Assessment", type: "assessment",
    department: "Sales", assignee: "Tariq", reviewer: "Sales Head", due: "22 Aug",
    status: "review", progress: 5, total: 5, overdue: false,
    href: `${BASE}/work/sales`, icon: User,
  },
  // Cost
  {
    id: "cost", name: "Preliminary Cost", type: "cost",
    department: "Engineering", assignee: "Cost Eng.", reviewer: "CFO", due: "24 Aug",
    status: "not-started", progress: 0, total: 17,
    dependency: "Engineering Assessment", overdue: false,
    href: `${BASE}/work/cost`, icon: DollarSign,
  },
  {
    id: "financial", name: "Financial Feasibility", type: "financial",
    department: "Finance", assignee: "Analyst", reviewer: "CFO", due: "25 Aug",
    status: "not-started",
    dependency: "Preliminary Cost, Market, Sales",
    href: `${BASE}/feasibility/financial`, icon: DollarSign, subtitle: "Revenue, costs, IRR, scenarios",
  },
  // Evaluation & Decision
  {
    id: "evaluation", name: "Evaluation Summary", type: "evaluation",
    status: "in-progress", subtitle: "Department scores, findings, risks",
    score: 81,
    href: `${BASE}/feasibility`, icon: TrendingUp,
  },
  {
    id: "report", name: "Management Report", type: "report",
    status: "in-progress", subtitle: "Auto-assembled from sign-offs",
    href: `${BASE}/decision`, icon: FileText,
  },
  {
    id: "decision", name: "Management Decision", type: "decision",
    status: "locked", subtitle: "Requires all sign-offs",
    href: `${BASE}/decision`, icon: Shield,
  },
];

// ─── Team Assignment Data ───────────────────────────────────────

interface TeamAssignment {
  stepId: string;
  stepName: string;
  department: string;
  assignee: string;
  reviewer: string;
  due: string;
  status: CardStatus;
}

const teamAssignments: TeamAssignment[] = [
  { stepId: "land-site", stepName: "Land & Site", department: "Land / BD", assignee: "Rahim", reviewer: "BD Head", due: "14 Aug", status: "complete" },
  { stepId: "legal", stepName: "Legal Assessment", department: "Legal", assignee: "Adv. Rahman", reviewer: "Head of Legal", due: "20 Aug", status: "review" },
  { stepId: "engineering", stepName: "Engineering Assessment", department: "Engineering", assignee: "Eng. Rafi", reviewer: "Chief Engineer", due: "22 Aug", status: "in-progress" },
  { stepId: "regulatory", stepName: "Regulatory Review", department: "Planning", assignee: "Kamal", reviewer: "Planning Head", due: "21 Aug", status: "not-started" },
  { stepId: "market", stepName: "Market Assessment", department: "Marketing", assignee: "Nadia", reviewer: "Marketing Head", due: "19 Aug", status: "complete" },
  { stepId: "sales", stepName: "Sales Assessment", department: "Sales", assignee: "Tariq", reviewer: "Sales Head", due: "22 Aug", status: "review" },
  { stepId: "cost", stepName: "Preliminary Cost", department: "Engineering", assignee: "Cost Eng.", reviewer: "CFO", due: "24 Aug", status: "not-started" },
  { stepId: "financial", stepName: "Financial Feasibility", department: "Finance", assignee: "Analyst", reviewer: "CFO", due: "25 Aug", status: "not-started" },
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

const statusConfig: Record<CardStatus, { label: string; color: string; bgColor: string }> = {
  "not-started": { label: "Not Started", color: "text-gray-500", bgColor: "bg-gray-100 text-gray-700" },
  "in-progress": { label: "In Progress", color: "text-blue-600", bgColor: "bg-blue-100 text-blue-800" },
  "review": { label: "In Review", color: "text-amber-600", bgColor: "bg-amber-100 text-amber-800" },
  "complete": { label: "Complete", color: "text-emerald-600", bgColor: "bg-emerald-100 text-emerald-800" },
  "locked": { label: "Locked", color: "text-gray-400", bgColor: "bg-gray-100 text-gray-500" },
};

const statusIcons: Record<CardStatus, typeof Circle> = {
  "not-started": Circle,
  "in-progress": Timer,
  "review": Clock,
  "complete": CheckCircle2,
  "locked": Lock,
};

const land = {
  name: "Gulshan Plot 07",
  stage: "Feasibility",
  location: "Gulshan, Dhaka",
  area: "32 Katha",
  owner: "Mr Ahmed",
  coordinator: "Karim",
  assignedTo: "Rahim",
  targetDate: "25 Aug 2026",
  expectedPrice: 450_000_000,
};

const attentionItems = [
  { text: "Legal assessment overdue by 3 days", severity: "red" },
  { text: "Finance waiting for Engineering", severity: "amber" },
  { text: "Construction estimate +8% above baseline", severity: "amber" },
];

// ─── Component ─────────────────────────────────────────────────

export default function WorkspacePage() {
  const [noteText, setNoteText] = useState("");
  const [teamSheetOpen, setTeamSheetOpen] = useState(false);

  const assessments = workCards.filter((c) => c.type === "assessment");
  const completed = assessments.filter((c) => c.status === "complete").length;
  const totalProgress = assessments.reduce((s, c) => s + (c.progress || 0), 0);
  const totalItems = assessments.reduce((s, c) => s + (c.total || 0), 0);
  const overallPct = totalItems > 0 ? Math.round((totalProgress / totalItems) * 100) : 0;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
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
              <span>{land.location} &middot; {land.area}</span>
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

      {/* Progress + Attention */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 flex-1">
          <span className="text-sm text-muted-foreground">Overall</span>
          <Progress value={overallPct} className="h-2 flex-1 max-w-sm" />
          <span className="text-sm font-medium">{overallPct}%</span>
          <span className="text-xs text-muted-foreground">{completed}/{assessments.length} departments</span>
        </div>
      </div>

      {/* Attention Bar */}
      {attentionItems.length > 0 && (
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

      {/* Card Grid — The Switchboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {workCards.map((card) => (
          <WorkCardComponent key={card.id} card={card} />
        ))}

        {/* Team & Assignments Card */}
        <Card
          className="border-slate-200 bg-slate-50/30 hover:border-primary/40 cursor-pointer transition-colors h-full"
          onClick={() => setTeamSheetOpen(true)}
        >
          <CardContent className="pt-4 pb-3">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-slate-500" />
                <p className="font-medium text-sm">Team & Assignments</p>
              </div>
              <Badge className="bg-slate-100 text-slate-700 text-[10px]">
                {teamAssignments.length} steps
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mb-2">
              Reassign team members, change reviewers
            </p>
            <div className="flex flex-wrap gap-1">
              {[...new Set(teamAssignments.map((t) => t.assignee))].slice(0, 4).map((name) => (
                <span key={name} className="text-[10px] bg-white border rounded px-1.5 py-0.5">{name}</span>
              ))}
              {[...new Set(teamAssignments.map((t) => t.assignee))].length > 4 && (
                <span className="text-[10px] text-muted-foreground">+{[...new Set(teamAssignments.map((t) => t.assignee))].length - 4}</span>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Assignment Sheet */}
      <Sheet open={teamSheetOpen} onOpenChange={setTeamSheetOpen}>
        <SheetContent className="w-[600px] sm:max-w-[600px] overflow-y-auto">
          <TeamAssignmentSheet onClose={() => setTeamSheetOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Activity & Notes */}
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
          {[
            { time: "2h ago", user: "Rahim", type: "note" as const, text: "Spoke with owner today. Flexible on price if we close before October." },
            { time: "5h ago", user: "System", type: "system" as const, text: "Engineering Assessment submitted for review. Reviewer: Chief Engineer" },
            { time: "1d ago", user: "Karim", type: "note" as const, text: "Legal team — mutation document is urgent. @Legal please prioritize." },
            { time: "1d ago", user: "System", type: "system" as const, text: "Marketing Assessment signed off by Marketing Head." },
          ].map((entry, i) => (
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

// ─── Work Card ──────────────────────────────────────────────────

function WorkCardComponent({ card }: { card: WorkCard }) {
  const cfg = statusConfig[card.status];
  const StatusIcon = statusIcons[card.status];
  const CardIcon = card.icon;

  const isLocked = card.status === "locked";
  const isPhaseCard = ["overview", "evaluation", "financial", "report", "decision"].includes(card.type);

  const cardContent = (
    <Card className={`transition-colors h-full ${
      isLocked ? "opacity-60" :
      card.overdue ? "border-red-300 hover:border-red-400" :
      isPhaseCard ? "border-slate-200 bg-slate-50/30 hover:border-primary/40" :
      "hover:border-primary/40"
    } ${isLocked ? "" : "cursor-pointer"}`}>
      <CardContent className="pt-4 pb-3">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <CardIcon className={`h-4 w-4 ${isPhaseCard ? "text-slate-500" : "text-muted-foreground"}`} />
            <p className="font-medium text-sm">{card.name}</p>
          </div>
          {!isLocked ? (
            <Badge className={`${cfg.bgColor} text-[10px]`}>{cfg.label}</Badge>
          ) : (
            <Lock className="h-3.5 w-3.5 text-gray-400" />
          )}
        </div>

        {/* Department + Assignee (for assessment cards) */}
        {card.department && (
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
            <span>{card.department}</span>
            {card.assignee && <span>&middot; {card.assignee}</span>}
          </div>
        )}

        {/* Subtitle (for phase cards) */}
        {card.subtitle && (
          <p className="text-xs text-muted-foreground mb-2">{card.subtitle}</p>
        )}

        {/* Score (evaluation) */}
        {card.score && (
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg font-bold">{card.score}</span>
            <span className="text-xs text-muted-foreground">/ 100</span>
          </div>
        )}

        {/* Progress bar (assessment + cost cards) */}
        {card.progress !== undefined && card.total && card.status !== "complete" && card.status !== "not-started" && (
          <div className="mb-2">
            <Progress value={(card.progress / card.total) * 100} className="h-1.5" />
            <p className="text-[10px] text-muted-foreground mt-1">{card.progress}/{card.total}</p>
          </div>
        )}

        {/* Complete */}
        {card.status === "complete" && card.type === "assessment" && (
          <p className="text-xs text-emerald-600 flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" /> Signed off
          </p>
        )}

        {/* Due + dependency */}
        <div className="flex items-center justify-between mt-auto pt-1">
          {card.due && (
            <span className={`text-[10px] ${card.overdue ? "text-red-600 font-medium" : "text-muted-foreground"}`}>
              {card.overdue && <AlertTriangle className="h-3 w-3 inline mr-0.5" />}
              Due {card.due}
            </span>
          )}
          {card.dependency && card.status === "not-started" && (
            <span className="text-[10px] text-amber-600 flex items-center gap-0.5">
              <Timer className="h-3 w-3" /> Waiting
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (isLocked) return cardContent;

  return <Link href={card.href}>{cardContent}</Link>;
}

// ─── Team Assignment Sheet ──────────────────────────────────────

function TeamAssignmentSheet({ onClose }: { onClose: () => void }) {
  return (
    <div className="space-y-6">
      <SheetHeader>
        <SheetTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Team & Assignments
        </SheetTitle>
        <p className="text-sm text-muted-foreground">
          Reassign team members for each work step. Department is fixed by the evaluation framework.
        </p>
      </SheetHeader>

      <div className="space-y-4">
        {teamAssignments.map((assignment) => {
          const members = departmentMembers[assignment.department] || [];
          const cfg = statusConfig[assignment.status];
          const isComplete = assignment.status === "complete";

          return (
            <div
              key={assignment.stepId}
              className={`p-4 border rounded-lg space-y-3 ${isComplete ? "bg-muted/30" : ""}`}
            >
              {/* Step header */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{assignment.stepName}</p>
                  <p className="text-xs text-muted-foreground">{assignment.department}</p>
                </div>
                <Badge className={`${cfg.bgColor} text-[10px]`}>{cfg.label}</Badge>
              </div>

              {/* Assignee + Reviewer */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Assignee</label>
                  <Select defaultValue={assignment.assignee}>
                    <SelectTrigger className="mt-1 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {members.map((m) => (
                        <SelectItem key={m} value={m}>{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Reviewer</label>
                  <Select defaultValue={assignment.reviewer}>
                    <SelectTrigger className="mt-1 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {members.map((m) => (
                        <SelectItem key={m} value={m}>{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Due date */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Due: {assignment.due}</span>
                {isComplete && (
                  <span className="text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Signed off — reassignment creates new revision
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <Separator />
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={onClose}>Save Assignments</Button>
      </div>
    </div>
  );
}
