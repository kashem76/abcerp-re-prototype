"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from "@/components/ui/table";
import { projects, formatBDT } from "@/lib/mock-data";
import {
  Building2, TrendingUp, AlertTriangle, ArrowUp,
  ArrowDown, CircleDot, CheckCircle2, Clock,
  Activity, ShieldAlert, ShieldCheck, Banknote,
  BarChart3, Users, Target, Landmark,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════
   INLINE MOCK DATA — CEO DASHBOARD
   ═══════════════════════════════════════════════════════ */

const portfolio = {
  totalGDV: 2_350_000_000,
  totalInvestment: 1_720_000_000,
  cashAvailable: 78_000_000,
  forecastProfit: 535_000_000,
  revenueRecognized: 888_000_000,
  totalUnits: 156,
  soldUnits: 70,
  collectionEfficiency: 87,
};

const twoQuestionsProject = {
  costOverrunRisk: 1,
  behindSchedule: 1,
  overdueAR90: 1,
};

const twoQuestionsCompany = {
  portfolioGDV: 2_350_000_000,
  cashAvailable: 78_000_000,
  forecastProfit: 535_000_000,
};

// Lifecycle stages — 14 stages across 4 phases
const lifecycleStages = [
  { id: 0, name: "Land Lead", phase: "PRE-DEV" },
  { id: 1, name: "Due Diligence", phase: "PRE-DEV" },
  { id: 2, name: "Feasibility", phase: "PRE-DEV" },
  { id: 3, name: "Land Agreement", phase: "SETUP" },
  { id: 4, name: "Project Setup", phase: "SETUP" },
  { id: 5, name: "BOQ & Estimation", phase: "SETUP" },
  { id: 6, name: "Tendering", phase: "SETUP" },
  { id: 7, name: "Contract Award", phase: "EXECUTION" },
  { id: 8, name: "Construction", phase: "EXECUTION" },
  { id: 9, name: "Sales & Collections", phase: "EXECUTION" },
  { id: 10, name: "Running Bills", phase: "EXECUTION" },
  { id: 11, name: "Handover", phase: "CLOSE" },
  { id: 12, name: "Defects Liability", phase: "CLOSE" },
  { id: 13, name: "Project Sealed", phase: "CLOSE" },
];

const projectLifecycle = [
  { name: "ABC Nasirabad Heights", shortName: "ABC Heights", stageId: 8, daysInStage: 142 },
  { name: "Bay View Residence", shortName: "Bay View", stageId: 9, daysInStage: 98 },
  { name: "Green Valley Township", shortName: "Green Valley", stageId: 5, daysInStage: 34 },
];

const phaseColors: Record<string, { bg: string; text: string; border: string }> = {
  "PRE-DEV": { bg: "bg-slate-100", text: "text-slate-700", border: "border-slate-300" },
  "SETUP": { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-300" },
  "EXECUTION": { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-300" },
  "CLOSE": { bg: "bg-emerald-100", text: "text-emerald-700", border: "border-emerald-300" },
};

const phaseLabels: Record<string, string> = {
  "PRE-DEV": "PRE-DEVELOPMENT",
  "SETUP": "SETUP",
  "EXECUTION": "EXECUTION",
  "CLOSE": "CLOSE",
};

const costControl = [
  { project: "ABC Heights", budget: 700_000_000, spent: 285_000_000, committed: 145_000_000, trulyAvailable: 270_000_000, risk: "warn", riskLabel: "7.4% forecast overrun" },
  { project: "Bay View", budget: 440_000_000, spent: 361_000_000, committed: 52_000_000, trulyAvailable: 27_000_000, risk: "ok", riskLabel: "On track" },
  { project: "Green Valley", budget: 580_000_000, spent: 42_000_000, committed: 0, trulyAvailable: 538_000_000, risk: "ok", riskLabel: "Not started" },
];

const revenueCollection = [
  { project: "ABC Heights", totalRevenue: 950_000_000, collected: 380_000_000, outstanding: 124_000_000, overdue90: 21_000_000, collectionPct: 87 },
  { project: "Bay View", totalRevenue: 620_000_000, collected: 508_000_000, outstanding: 42_000_000, overdue90: 8_000_000, collectionPct: 92 },
  { project: "Green Valley", totalRevenue: 780_000_000, collected: 0, outstanding: 0, overdue90: 0, collectionPct: 0 },
];

const budgetVsCollected = [
  { project: "ABC Heights", budget: 700_000_000, collected: 380_000_000 },
  { project: "Bay View", budget: 440_000_000, collected: 508_000_000 },
  { project: "Green Valley", budget: 580_000_000, collected: 0 },
];

const riskAlerts = [
  { type: "warn", project: "ABC Heights", message: "Steel price +8.2% — change order BDT 12.4m needed", time: "2h ago" },
  { type: "warn", project: "ABC Heights", message: "Tower B structural work 31 days behind schedule", time: "4h ago" },
  { type: "warn", project: "Bay View", message: "3 buyers overdue >60 days — BDT 4.2m at risk", time: "1d ago" },
  { type: "warn", project: "Green Valley", message: "Land mutation still pending — 45 days since application", time: "2d ago" },
  { type: "ok", project: "Bay View", message: "Handover of Tower B on track — 24 of 36 units handed over", time: "1d ago" },
  { type: "ok", project: "Portfolio", message: "Cement bulk order — 4.1% discount captured across 3 projects", time: "3d ago" },
];

const profitErosion = [
  { factor: "Original Feasibility Profit", amount: 578_000_000, type: "base" },
  { factor: "Material inflation (steel, cement)", amount: -32_000_000, type: "negative" },
  { factor: "Design variations (client requests)", amount: -18_000_000, type: "negative" },
  { factor: "Schedule delay — finance cost", amount: -14_000_000, type: "negative" },
  { factor: "Quantity overruns", amount: -9_000_000, type: "negative" },
  { factor: "Selling price increase", amount: 22_000_000, type: "positive" },
  { factor: "Procurement savings", amount: 8_000_000, type: "positive" },
  { factor: "Current Forecast Profit", amount: 535_000_000, type: "result" },
];

const pendingDecisions = [
  { priority: "HIGH", decision: "Approve VO-004 (Steel rate revision) — BDT 12.4m budget impact", project: "ABC Heights", daysOpen: 5 },
  { priority: "HIGH", decision: "Green Valley — Approve feasibility & proceed with land acquisition", project: "Green Valley", daysOpen: 12 },
  { priority: "MEDIUM", decision: "Review Bay View handover schedule — 8 units pending", project: "Bay View", daysOpen: 3 },
  { priority: "MEDIUM", decision: "Cross-project tile transfer — 12,500 tiles from ABC to Bay View", project: "Portfolio", daysOpen: 7 },
  { priority: "LOW", decision: "Bulk cement procurement — consolidate across 3 projects for 4.1% discount", project: "Portfolio", daysOpen: 3 },
];

/* ═══════════════════════════════════════════════════════
   CEO DASHBOARD — THE PITCH DECK, ALIVE
   ═══════════════════════════════════════════════════════ */

export default function CEODashboardPage() {
  const maxBudgetCollected = Math.max(
    ...budgetVsCollected.map((p) => Math.max(p.budget, p.collected))
  );

  return (
    <div className="space-y-8">

      {/* ──────────────────────────────────────────────────
          SECTION 1: HEADER
         ────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            CEO Dashboard
          </h1>
          <p className="text-base text-slate-500 mt-0.5">ABC Properties Ltd.</p>
          <p className="text-sm text-slate-400 mt-1 italic">
            One financial truth — from land to handover
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border">
          <Activity className="h-3.5 w-3.5 text-emerald-500 animate-pulse" />
          <span>Live — As of 12 Aug 2026, 2:30 PM</span>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────
          SECTION 2: THE TWO QUESTIONS
         ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Question 1 — Project-level */}
        <Card className="bg-slate-50 border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-slate-600 flex items-center gap-2">
              <Target className="h-4 w-4" />
              How is THIS project doing?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-slate-400 mb-4">
              On budget? Collecting on time? Will it hit the margin?
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-red-600">{twoQuestionsProject.costOverrunRisk}</p>
                <p className="text-xs text-slate-500 mt-1 leading-tight">Cost Overrun Risk</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-amber-600">{twoQuestionsProject.behindSchedule}</p>
                <p className="text-xs text-slate-500 mt-1 leading-tight">Behind Schedule</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-orange-600">{twoQuestionsProject.overdueAR90}</p>
                <p className="text-xs text-slate-500 mt-1 leading-tight">{">"}90-Day Overdue AR</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Question 2 — Company-level */}
        <Card className="bg-amber-50/60 border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-amber-800 flex items-center gap-2">
              <Landmark className="h-4 w-4" />
              How is the COMPANY doing?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-amber-600/70 mb-4">
              Across all projects + head office — profitable? Liquid? Ready for the next launch?
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-slate-900">
                  {formatBDT(twoQuestionsCompany.portfolioGDV)}
                </p>
                <p className="text-xs text-amber-700 mt-1 leading-tight">Portfolio GDV</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-emerald-700">
                  {formatBDT(twoQuestionsCompany.cashAvailable)}
                </p>
                <p className="text-xs text-amber-700 mt-1 leading-tight">Cash Available</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-700">
                  {formatBDT(twoQuestionsCompany.forecastProfit)}
                </p>
                <p className="text-xs text-amber-700 mt-1 leading-tight">Forecast Profit</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ──────────────────────────────────────────────────
          SECTION 3: PORTFOLIO KPIs
         ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: "Active Projects", value: "3", icon: Building2, color: "text-blue-700", accent: "bg-blue-50 border-blue-100" },
          { label: "Total Investment", value: formatBDT(portfolio.totalInvestment), icon: Banknote, color: "text-slate-900", accent: "bg-white border-slate-200" },
          { label: "Revenue Recognized", value: formatBDT(portfolio.revenueRecognized), icon: TrendingUp, color: "text-emerald-700", accent: "bg-emerald-50 border-emerald-100" },
          { label: "Total Units", value: "156", icon: Building2, color: "text-slate-700", accent: "bg-white border-slate-200" },
          { label: "Sold Units", value: "70 (45%)", icon: Users, color: "text-amber-700", accent: "bg-amber-50 border-amber-100" },
          { label: "Collection Efficiency", value: "87%", icon: BarChart3, color: "text-blue-700", accent: "bg-blue-50 border-blue-100" },
        ].map((kpi) => (
          <Card key={kpi.label} className={`${kpi.accent}`}>
            <CardContent className="pt-4 pb-3">
              <div className="flex items-center gap-1.5 mb-1">
                <kpi.icon className={`h-3.5 w-3.5 ${kpi.color}`} />
                <span className="text-[11px] text-slate-500">{kpi.label}</span>
              </div>
              <p className={`text-lg font-bold ${kpi.color}`}>{kpi.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ──────────────────────────────────────────────────
          SECTION 4: PROJECT LIFECYCLE MAP
         ────────────────────────────────────────────────── */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="h-4 w-4 text-slate-500" />
            Project Lifecycle Map
          </CardTitle>
          <p className="text-xs text-slate-400">Where each project sits in the 14-stage lifecycle</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Phase header strip */}
          <div className="grid grid-cols-14 gap-0 text-[9px] font-semibold text-center">
            {(["PRE-DEV", "SETUP", "EXECUTION", "CLOSE"] as const).map((phase) => {
              const stagesInPhase = lifecycleStages.filter((s) => s.phase === phase);
              const pc = phaseColors[phase];
              return (
                <div
                  key={phase}
                  className={`col-span-${phase === "PRE-DEV" ? "3" : phase === "SETUP" ? "4" : phase === "EXECUTION" ? "4" : "3"} ${pc.bg} ${pc.text} py-1 border ${pc.border} first:rounded-l-md last:rounded-r-md`}
                  style={{ gridColumn: `span ${stagesInPhase.length}` }}
                >
                  {phaseLabels[phase]} ({stagesInPhase[0].id}-{stagesInPhase[stagesInPhase.length - 1].id})
                </div>
              );
            })}
          </div>

          {/* Stage numbers row */}
          <div className="grid gap-0" style={{ gridTemplateColumns: "repeat(14, 1fr)" }}>
            {lifecycleStages.map((stage) => (
              <div
                key={stage.id}
                className="text-center text-[9px] text-slate-400 py-0.5 border-x border-slate-100"
                title={stage.name}
              >
                {stage.id}
              </div>
            ))}
          </div>

          {/* Per-project lifecycle tracks */}
          {projectLifecycle.map((proj) => (
            <div key={proj.name} className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-800">{proj.name}</span>
                  <Badge className={`text-[10px] ${phaseColors[lifecycleStages[proj.stageId].phase].bg} ${phaseColors[lifecycleStages[proj.stageId].phase].text}`}>
                    Stage {proj.stageId}: {lifecycleStages[proj.stageId].name}
                  </Badge>
                </div>
                <span className="text-xs text-slate-400">{proj.daysInStage} days in current stage</span>
              </div>
              {/* Track bar */}
              <div className="relative h-6 rounded-md bg-slate-100 overflow-hidden">
                <div className="absolute inset-0 grid" style={{ gridTemplateColumns: "repeat(14, 1fr)" }}>
                  {lifecycleStages.map((stage) => (
                    <div
                      key={stage.id}
                      className={`border-r border-slate-200/60 ${
                        stage.id < proj.stageId
                          ? "bg-slate-300"
                          : stage.id === proj.stageId
                          ? phaseColors[stage.phase].bg.replace("100", "400").includes("400")
                            ? "bg-blue-500"
                            : "bg-blue-500"
                          : ""
                      }`}
                      style={{
                        backgroundColor:
                          stage.id < proj.stageId
                            ? "#94a3b8"
                            : stage.id === proj.stageId
                            ? stage.phase === "PRE-DEV" ? "#64748b"
                            : stage.phase === "SETUP" ? "#7c3aed"
                            : stage.phase === "EXECUTION" ? "#2563eb"
                            : "#059669"
                            : undefined,
                      }}
                    />
                  ))}
                </div>
                {/* Current stage marker */}
                <div
                  className="absolute top-0 h-full flex items-center justify-center"
                  style={{
                    left: `${(proj.stageId / 14) * 100}%`,
                    width: `${(1 / 14) * 100}%`,
                  }}
                >
                  <span className="text-[10px] font-bold text-white drop-shadow-sm">
                    {proj.shortName}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Legend */}
          <div className="flex items-center gap-4 pt-1">
            {(["PRE-DEV", "SETUP", "EXECUTION", "CLOSE"] as const).map((phase) => {
              const colorMap: Record<string, string> = {
                "PRE-DEV": "#64748b", "SETUP": "#7c3aed", "EXECUTION": "#2563eb", "CLOSE": "#059669",
              };
              return (
                <div key={phase} className="flex items-center gap-1.5 text-[10px] text-slate-500">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: colorMap[phase] }} />
                  {phaseLabels[phase]}
                </div>
              );
            })}
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
              <div className="w-3 h-3 rounded-sm bg-slate-300" />
              Completed stages
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ──────────────────────────────────────────────────
          SECTION 5: THE TWO PROMISES
         ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Promise 1: Control Costs */}
        <Card className="border-blue-200">
          <CardHeader className="pb-2 bg-blue-50/50 rounded-t-lg">
            <CardTitle className="text-sm font-semibold text-blue-800 flex items-center gap-2">
              <ShieldAlert className="h-4 w-4" />
              Promise 1: Control Costs
            </CardTitle>
            <p className="text-xs text-blue-600/70">
              Budget vs Actual (BOQ-level) + Commitments + EAC
            </p>
          </CardHeader>
          <CardContent className="pt-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Project</TableHead>
                  <TableHead className="text-xs text-right">Budget</TableHead>
                  <TableHead className="text-xs text-right">Spent</TableHead>
                  <TableHead className="text-xs text-right">Committed</TableHead>
                  <TableHead className="text-xs text-right">Available</TableHead>
                  <TableHead className="text-xs text-center">Risk</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {costControl.map((row) => (
                  <TableRow key={row.project}>
                    <TableCell className="font-medium text-sm">{row.project}</TableCell>
                    <TableCell className="text-right font-mono text-sm">{formatBDT(row.budget)}</TableCell>
                    <TableCell className="text-right font-mono text-sm">{formatBDT(row.spent)}</TableCell>
                    <TableCell className="text-right font-mono text-sm">{formatBDT(row.committed)}</TableCell>
                    <TableCell className="text-right font-mono text-sm">{formatBDT(row.trulyAvailable)}</TableCell>
                    <TableCell className="text-center text-sm">
                      {row.risk === "warn" ? (
                        <span className="text-amber-600 font-medium">&#9888;&#65039; {row.riskLabel}</span>
                      ) : (
                        <span className="text-emerald-600 font-medium">&#9989; {row.riskLabel}</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800">
                <span className="font-semibold">Portfolio EAC: BDT 183.6 Cr</span> vs Budget BDT 172.0 Cr —
                BDT 11.6 Cr potential overrun driven by steel price inflation on ABC Heights.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Promise 2: Collect Revenue */}
        <Card className="border-amber-200">
          <CardHeader className="pb-2 bg-amber-50/50 rounded-t-lg">
            <CardTitle className="text-sm font-semibold text-amber-800 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              Promise 2: Collect Revenue
            </CardTitle>
            <p className="text-xs text-amber-600/70">
              AR Aging + Revenue Recognition (IFRS 15) + Advances as liability
            </p>
          </CardHeader>
          <CardContent className="pt-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Project</TableHead>
                  <TableHead className="text-xs text-right">Revenue</TableHead>
                  <TableHead className="text-xs text-right">Collected</TableHead>
                  <TableHead className="text-xs text-right">Outstanding</TableHead>
                  <TableHead className="text-xs text-right">{">"}90d</TableHead>
                  <TableHead className="text-xs text-center">Coll. %</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {revenueCollection.map((row) => (
                  <TableRow key={row.project}>
                    <TableCell className="font-medium text-sm">{row.project}</TableCell>
                    <TableCell className="text-right font-mono text-sm">{formatBDT(row.totalRevenue)}</TableCell>
                    <TableCell className="text-right font-mono text-sm">{formatBDT(row.collected)}</TableCell>
                    <TableCell className="text-right font-mono text-sm">{formatBDT(row.outstanding)}</TableCell>
                    <TableCell className="text-right font-mono text-sm">
                      {row.overdue90 > 0 ? (
                        <span className="text-red-600 font-semibold">{formatBDT(row.overdue90)}</span>
                      ) : (
                        <span className="text-slate-400">0</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center text-sm">
                      {row.collectionPct > 0 ? (
                        <span className={row.collectionPct >= 90 ? "text-emerald-600 font-semibold" : "text-amber-600 font-semibold"}>
                          {row.collectionPct}%
                        </span>
                      ) : (
                        <span className="text-slate-400">&mdash;</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">
                <span className="font-semibold">Total overdue {">"}90 days: BDT 2.9 Cr</span> across 6 buyers.
                Demand letters issued for 4. Legal notice pending for 2.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ──────────────────────────────────────────────────
          SECTION 6: BUDGET vs COLLECTED — BAR CHART
         ────────────────────────────────────────────────── */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-slate-500" />
            Budget vs Collected — Per Project
          </CardTitle>
          <p className="text-xs text-slate-400">
            The pitch deck&apos;s signature visualization — where the money stands
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-8 justify-center pt-4 pb-2" style={{ minHeight: 260 }}>
            {/* Y-axis labels */}
            <div className="flex flex-col justify-between h-52 text-right pr-2 text-[10px] text-slate-400 font-mono">
              {[100, 75, 50, 25, 0].map((pct) => (
                <span key={pct}>
                  {formatBDT(maxBudgetCollected * (pct / 100))}
                </span>
              ))}
            </div>

            {/* Bars */}
            {budgetVsCollected.map((proj) => {
              const budgetHeight = (proj.budget / maxBudgetCollected) * 100;
              const collectedHeight = (proj.collected / maxBudgetCollected) * 100;
              return (
                <div key={proj.project} className="flex flex-col items-center gap-2">
                  <div className="flex items-end gap-1.5" style={{ height: 208 }}>
                    {/* Budget bar */}
                    <div className="relative w-12 rounded-t-md flex flex-col items-center justify-end"
                      style={{
                        height: `${budgetHeight}%`,
                        backgroundColor: "#1e3a5f",
                      }}
                    >
                      <span className="text-[10px] font-bold text-white mb-1">
                        {formatBDT(proj.budget)}
                      </span>
                    </div>
                    {/* Collected bar */}
                    <div className="relative w-12 rounded-t-md flex flex-col items-center justify-end"
                      style={{
                        height: `${Math.max(collectedHeight, 1)}%`,
                        backgroundColor: "#d97706",
                      }}
                    >
                      {proj.collected > 0 && (
                        <span className="text-[10px] font-bold text-white mb-1">
                          {formatBDT(proj.collected)}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-xs font-medium text-slate-700 text-center w-28">
                    {proj.project}
                  </span>
                </div>
              );
            })}
          </div>
          {/* Legend */}
          <div className="flex items-center justify-center gap-6 pt-2">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <div className="w-4 h-3 rounded-sm" style={{ backgroundColor: "#1e3a5f" }} />
              Budget
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <div className="w-4 h-3 rounded-sm" style={{ backgroundColor: "#d97706" }} />
              Collected
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ──────────────────────────────────────────────────
          SECTION 7: RISK ALERTS
         ────────────────────────────────────────────────── */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            Risk Alerts &amp; Early Warnings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {riskAlerts.map((alert, i) => {
            const isWarn = alert.type === "warn";
            return (
              <div
                key={i}
                className={`flex items-start gap-3 p-3 rounded-lg border ${
                  isWarn
                    ? "bg-red-50 border-red-200"
                    : "bg-emerald-50 border-emerald-200"
                }`}
              >
                <div className="mt-0.5">
                  {isWarn ? (
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-xs font-semibold ${isWarn ? "text-red-700" : "text-emerald-700"}`}>
                      {alert.project}
                    </span>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap">{alert.time}</span>
                  </div>
                  <p className={`text-sm mt-0.5 ${isWarn ? "text-red-800" : "text-emerald-800"}`}>
                    {alert.message}
                  </p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* ──────────────────────────────────────────────────
          SECTION 8: PROFIT EROSION WATERFALL
         ────────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-500" />
            Profit Erosion Analysis (Portfolio)
          </CardTitle>
          <p className="text-xs text-slate-400">
            Where is our profit going? Feasibility to forecast waterfall.
          </p>
        </CardHeader>
        <CardContent className="space-y-2">
          {profitErosion.map((item, i) => (
            <div
              key={i}
              className={`flex items-center justify-between py-2 px-2 rounded ${
                item.type === "result" ? "border-t-2 border-slate-300 pt-3 mt-2 bg-emerald-50" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                {item.type === "negative" && <ArrowDown className="h-3.5 w-3.5 text-red-500" />}
                {item.type === "positive" && <ArrowUp className="h-3.5 w-3.5 text-emerald-500" />}
                {item.type === "base" && <CircleDot className="h-3.5 w-3.5 text-slate-400" />}
                {item.type === "result" && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />}
                <span className={`text-sm ${item.type === "result" ? "font-bold text-emerald-800" : "text-slate-700"}`}>
                  {item.factor}
                </span>
              </div>
              <span
                className={`font-mono text-sm font-semibold ${
                  item.type === "negative"
                    ? "text-red-600"
                    : item.type === "positive"
                    ? "text-emerald-600"
                    : item.type === "result"
                    ? "text-emerald-700 text-base"
                    : "text-slate-900"
                }`}
              >
                {item.type === "negative" ? "- " : item.type === "positive" ? "+ " : ""}
                BDT {formatBDT(Math.abs(item.amount))}
              </span>
            </div>
          ))}
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">
              <span className="font-semibold">BDT {formatBDT(43_000_000)} profit erosion</span> across
              portfolio. Primary drivers: material inflation (BDT 32m) and design changes (BDT 18m),
              partially offset by selling price increase (+BDT 22m) and procurement savings (+BDT 8m).
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ──────────────────────────────────────────────────
          SECTION 9: PENDING DECISIONS
         ────────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Pending CEO Decisions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {pendingDecisions.map((d, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3 border rounded-lg hover:bg-slate-50 transition-colors"
            >
              <Badge
                className={
                  d.priority === "HIGH"
                    ? "bg-red-100 text-red-800"
                    : d.priority === "MEDIUM"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-slate-100 text-slate-600"
                }
              >
                {d.priority}
              </Badge>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800">{d.decision}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-slate-400">{d.project}</span>
                  <span className="text-[10px] text-slate-300">|</span>
                  <span
                    className={`text-[10px] font-medium ${
                      d.daysOpen > 7 ? "text-red-500" : "text-slate-400"
                    }`}
                  >
                    Open {d.daysOpen} days
                  </span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ──────────────────────────────────────────────────
          SECTION 10: FOOTER
         ────────────────────────────────────────────────── */}
      <div className="text-center py-6 space-y-1.5">
        <Separator className="mb-4" />
        <p className="text-sm font-semibold text-slate-600">
          AbcERP Real Estate — One system. One truth.
        </p>
        <p className="text-xs text-slate-400">
          Every number traces back to a posted journal entry. Click any figure to drill down.
        </p>
        <p className="text-xs text-slate-400">
          Built for Bangladesh — BFRS / ICAB &middot; IFRS 15 &middot; Companies Act 1994 &middot; NBR-ready
        </p>
      </div>
    </div>
  );
}
