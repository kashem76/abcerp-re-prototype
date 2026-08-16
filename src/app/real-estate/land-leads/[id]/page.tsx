"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft, MapPin, Calendar, AlertTriangle, ArrowRight,
  Clock, CheckCircle2, Circle, Lock, FileText, DollarSign,
  FolderOpen, Clipboard, ChevronDown, Send, User, Activity,
  TrendingUp, Eye,
} from "lucide-react";
import { formatBDT } from "@/lib/mock-data";

// ─── Mock Data ─────────────────────────────────────────────────

const land = {
  id: "LL-2026-001",
  name: "Gulshan Plot 07",
  stage: "Feasibility" as const,
  location: "Gulshan, Dhaka",
  area: "32 Katha",
  owner: "Mr Ahmed",
  coordinator: "Karim",
  assignedTo: "Rahim",
  targetDate: "25 Aug 2026",
  expectedPrice: 450_000_000,
  source: "Direct Owner",
};

const stageProgress = [
  { name: "Assessment", progress: 100, status: "complete" as const },
  { name: "Feasibility", progress: 63, status: "active" as const },
  { name: "Decision", progress: 0, status: "locked" as const },
  { name: "Acquisition", progress: 0, status: "locked" as const },
];

const attentionItems = [
  { severity: "red", text: "Legal assessment overdue by 3 days", action: "Open", href: "/real-estate/land-leads/LL-2026-001/work/legal" },
  { severity: "amber", text: "Mutation document missing", action: "Upload", href: "#" },
  { severity: "amber", text: "Construction estimate +8% above baseline", action: "Review", href: "/real-estate/land-leads/LL-2026-001/feasibility" },
];

const upcoming = [
  { date: "18 Aug", event: "Authority visit", dept: "Planning" },
  { date: "20 Aug", event: "Engineering deadline", dept: "Engineering" },
  { date: "25 Aug", event: "Feasibility target", dept: "All" },
];

const activityLog = [
  { time: "2h ago", user: "Rahim", type: "note", text: "Spoke with owner today. Flexible on price if we close before October. Wants min 2 units in JV arrangement." },
  { time: "5h ago", user: "System", type: "system", text: "Engineering Assessment submitted for review. Reviewer: Chief Engineer" },
  { time: "1d ago", user: "Karim", type: "note", text: "Legal team — mutation document is urgent. Registration can't proceed without it. @Legal please prioritize." },
  { time: "1d ago", user: "System", type: "system", text: "Marketing Assessment signed off by Marketing Head." },
  { time: "2d ago", user: "Eng. Rafi", type: "system", text: "Foundation Requirement criterion completed. Rating: 3/5 (Acceptable)." },
  { time: "3d ago", user: "System", type: "system", text: "Land & Site assessment signed off by BD Head." },
];

// Selection criteria for initial selection (shown when stage is New)
const selectionCriteria = [
  { name: "Target location", status: "done", result: "Preferred" },
  { name: "Land area", status: "done", result: "32 Katha" },
  { name: "Asking price", status: "done", result: "Acceptable" },
  { name: "Owner willingness", status: "done", result: "Strong" },
  { name: "Development potential", status: "done", result: "Good" },
  { name: "JV willingness", status: "done", result: "Yes" },
  { name: "Known title dispute", status: "done", result: "None" },
  { name: "Road accessibility", status: "done", result: "40 ft" },
  { name: "Regulatory red flags", status: "done", result: "None" },
];

// ─── Component ─────────────────────────────────────────────────

export default function LandWorkspacePage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-0">
      {/* Persistent Header */}
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
              <Badge className="bg-purple-100 text-purple-800">{land.stage}</Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {land.location}</span>
              <span>{land.area}</span>
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
          </div>
        </div>

        {/* Tab Bar */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-6 w-full max-w-2xl">
            <TabsTrigger value="overview" className="text-xs gap-1">
              <Eye className="h-3.5 w-3.5" /> Overview
            </TabsTrigger>
            <TabsTrigger value="work" className="text-xs gap-1">
              <Clipboard className="h-3.5 w-3.5" /> Work
            </TabsTrigger>
            <TabsTrigger value="feasibility" className="text-xs gap-1">
              <TrendingUp className="h-3.5 w-3.5" /> Feasibility
            </TabsTrigger>
            <TabsTrigger value="acquisition" className="text-xs gap-1">
              <Lock className="h-3.5 w-3.5" /> Acquisition
            </TabsTrigger>
            <TabsTrigger value="financials" className="text-xs gap-1">
              <DollarSign className="h-3.5 w-3.5" /> Financials
            </TabsTrigger>
            <TabsTrigger value="documents" className="text-xs gap-1">
              <FolderOpen className="h-3.5 w-3.5" /> Documents
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "work" && <WorkTabPlaceholder />}
        {activeTab === "feasibility" && <FeasibilityTabPlaceholder />}
        {activeTab === "acquisition" && <AcquisitionLocked />}
        {activeTab === "financials" && <FinancialsPlaceholder />}
        {activeTab === "documents" && <DocumentsPlaceholder />}
      </div>
    </div>
  );
}

// ─── Overview Tab ───────────────────────────────────────────────

function OverviewTab() {
  const [noteText, setNoteText] = useState("");

  return (
    <div className="space-y-6">
      {/* Stage Progress */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Current Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {stageProgress.map((stage) => (
            <div key={stage.name} className="flex items-center gap-4">
              <span className="text-sm font-medium w-28">{stage.name}</span>
              {stage.status === "locked" ? (
                <div className="flex-1 flex items-center gap-2 text-muted-foreground">
                  <Lock className="h-3.5 w-3.5" />
                  <span className="text-xs">Not started</span>
                </div>
              ) : (
                <>
                  <div className="flex-1">
                    <Progress value={stage.progress} className="h-2" />
                  </div>
                  <span className="text-sm font-medium w-12 text-right">{stage.progress}%</span>
                  {stage.status === "complete" && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                </>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Next Action */}
          <Card className="border-blue-200 bg-blue-50/30">
            <CardContent className="pt-5">
              <p className="text-xs font-medium text-blue-700 uppercase tracking-wide mb-2">Next Action</p>
              <p className="text-sm mb-3">
                Engineering assessment is blocking Financial Feasibility.
              </p>
              <div className="flex items-center justify-between bg-white rounded-lg border p-3">
                <div>
                  <p className="font-medium text-sm">Engineering Assessment</p>
                  <p className="text-xs text-muted-foreground">7 / 11 criteria complete &middot; Due 20 Aug &middot; Eng. Rafi</p>
                </div>
                <Link href="/real-estate/land-leads/LL-2026-001/work/engineering">
                  <Button size="sm" className="gap-1">
                    Open <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Attention Items */}
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
                    <AlertTriangle className={`h-4 w-4 ${item.severity === "red" ? "text-red-500" : "text-amber-500"}`} />
                    <span className="text-sm">{item.text}</span>
                  </div>
                  <Link href={item.href}>
                    <Button variant="outline" size="sm" className="text-xs">{item.action}</Button>
                  </Link>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Feasibility Snapshot */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Feasibility Snapshot</CardTitle>
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
            </CardContent>
          </Card>

          {/* Activity & Notes */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Activity & Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add Note */}
              <div className="flex gap-2">
                <Textarea
                  placeholder="Add a note... Use @name to mention someone."
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

              {/* Timeline */}
              <div className="space-y-4">
                {activityLog.map((entry, i) => (
                  <div key={i} className="flex gap-3">
                    <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${
                      entry.type === "note" ? "bg-blue-500" : "bg-gray-300"
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">{entry.user}</span>
                        <span>{entry.time}</span>
                        {entry.type === "note" && <Badge variant="outline" className="text-[10px]">Note</Badge>}
                      </div>
                      <p className="text-sm mt-0.5">{entry.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          {/* Upcoming */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Upcoming</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcoming.map((event, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="text-center shrink-0 w-12">
                    <p className="text-xs font-bold">{event.date.split(" ")[0]}</p>
                    <p className="text-[10px] text-muted-foreground">{event.date.split(" ")[1]}</p>
                  </div>
                  <div>
                    <p className="text-sm">{event.event}</p>
                    <p className="text-xs text-muted-foreground">{event.dept}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Land Details */}
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
              ].map((field) => (
                <div key={field.label} className="flex justify-between">
                  <span className="text-muted-foreground">{field.label}</span>
                  <span className="font-medium">{field.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Selection Summary */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                Initial Selection
                <Badge className="bg-emerald-100 text-emerald-800 text-[10px]">Qualified</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1.5">
                {selectionCriteria.map((c) => (
                  <div key={c.name} className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                      {c.name}
                    </span>
                    <span className="text-muted-foreground">{c.result}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t flex items-center justify-between text-sm">
                <span className="font-medium">Score: 86 / 100</span>
                <Badge className="bg-emerald-100 text-emerald-800 text-xs">Qualified</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── Placeholder Tabs ──────────────────────────────────────────

function WorkTabPlaceholder() {
  return (
    <Card className="border-dashed">
      <CardContent className="pt-6 text-center">
        <Clipboard className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
        <p className="text-muted-foreground mb-2">Work Board</p>
        <p className="text-sm text-muted-foreground">Board / List / By Department / My Work views</p>
        <Link href="/real-estate/land-leads/LL-2026-001/work">
          <Button variant="outline" size="sm" className="mt-4 gap-1">
            Open Work Board <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

function FeasibilityTabPlaceholder() {
  return (
    <Card className="border-dashed">
      <CardContent className="pt-6 text-center">
        <TrendingUp className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
        <p className="text-muted-foreground mb-2">Evaluation Overview</p>
        <p className="text-sm text-muted-foreground">Department scores, findings, risks, financial model</p>
        <Link href="/real-estate/land-leads/LL-2026-001/feasibility">
          <Button variant="outline" size="sm" className="mt-4 gap-1">
            Open Feasibility <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

function AcquisitionLocked() {
  return (
    <Card className="border-dashed">
      <CardContent className="pt-6 text-center">
        <Lock className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
        <p className="font-medium mb-1">Acquisition has not started.</p>
        <p className="text-sm text-muted-foreground">Complete and approve feasibility first.</p>
        <div className="mt-4 text-sm text-muted-foreground">
          Current: Feasibility 63% &middot; 4 / 8 departments submitted
        </div>
      </CardContent>
    </Card>
  );
}

function FinancialsPlaceholder() {
  return (
    <Card className="border-dashed">
      <CardContent className="pt-6 text-center">
        <DollarSign className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
        <p className="text-muted-foreground mb-2">Financials</p>
        <p className="text-sm text-muted-foreground">Pre-development expenses, payments, commitments</p>
      </CardContent>
    </Card>
  );
}

function DocumentsPlaceholder() {
  return (
    <Card className="border-dashed">
      <CardContent className="pt-6 text-center">
        <FolderOpen className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
        <p className="text-muted-foreground mb-2">Documents</p>
        <p className="text-sm text-muted-foreground">Files attached across all work steps, aggregated by category</p>
      </CardContent>
    </Card>
  );
}
