"use client";

import Link from "next/link";
import { ArrowLeft, ShieldAlert, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

type RiskTrend = "improving" | "stable" | "worsening";

interface RiskEntry {
  category: string;
  likelihood: number;
  impact: number;
  affectedProjects: string[];
  mitigationStatus: string;
  owner: string;
  trend: RiskTrend;
  topMitigation: string;
}

const risks: RiskEntry[] = [
  { category: "Cost Overrun", likelihood: 4, impact: 4, affectedProjects: ["ABC Heights", "Green Valley"], mitigationStatus: "In Progress", owner: "CFO", trend: "worsening", topMitigation: "Monthly EAC review, value engineering for Green Valley structural scope" },
  { category: "Schedule Delay", likelihood: 4, impact: 3, affectedProjects: ["ABC Heights"], mitigationStatus: "Active", owner: "Project Director", trend: "stable", topMitigation: "Fast-track Tower B structure, deploy additional crane, weekend shifts" },
  { category: "Sales / Collection", likelihood: 3, impact: 4, affectedProjects: ["ABC Heights", "Green Valley"], mitigationStatus: "Active", owner: "Sales Head", trend: "improving", topMitigation: "Payment reminder automation, 3 buyers on legal notice, flexible plans" },
  { category: "Material Price", likelihood: 5, impact: 4, affectedProjects: ["ABC Heights", "Bay View", "Green Valley"], mitigationStatus: "Partial", owner: "Procurement Head", trend: "worsening", topMitigation: "Annual rate contracts for cement/steel, forward booking, alternative sourcing" },
  { category: "Regulatory", likelihood: 2, impact: 5, affectedProjects: ["Green Valley"], mitigationStatus: "Monitoring", owner: "Legal Head", trend: "stable", topMitigation: "CDA liaison for Green Valley building permit, pre-compliance for FAR changes" },
  { category: "Quality", likelihood: 2, impact: 3, affectedProjects: ["Bay View"], mitigationStatus: "Active", owner: "QA Manager", trend: "improving", topMitigation: "Third-party lab testing for concrete, snag resolution SLA with contractors" },
  { category: "Safety", likelihood: 3, impact: 5, affectedProjects: ["ABC Heights", "Bay View"], mitigationStatus: "Active", owner: "Safety Officer", trend: "stable", topMitigation: "Weekly safety audits, mandatory PPE enforcement, fall protection installed" },
  { category: "Liquidity", likelihood: 3, impact: 4, affectedProjects: ["ABC Heights", "Green Valley"], mitigationStatus: "Monitoring", owner: "CFO", trend: "worsening", topMitigation: "Accelerate collections, defer non-critical procurement, bank facility renewal" },
];

function riskScore(l: number, i: number) { return l * i; }

function scoreColor(score: number) {
  if (score >= 16) return "bg-red-500 text-white";
  if (score >= 10) return "bg-orange-500 text-white";
  if (score >= 6) return "bg-yellow-400 text-yellow-900";
  return "bg-green-400 text-green-900";
}

function scoreBadge(score: number) {
  if (score >= 16) return <Badge className="bg-red-100 text-red-800 border-red-300">Critical</Badge>;
  if (score >= 10) return <Badge className="bg-orange-100 text-orange-800 border-orange-300">High</Badge>;
  if (score >= 6) return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Medium</Badge>;
  return <Badge className="bg-green-100 text-green-800 border-green-300">Low</Badge>;
}

function TrendDisplay({ trend }: { trend: RiskTrend }) {
  if (trend === "worsening") return <div className="flex items-center gap-1 text-red-600"><TrendingUp className="h-4 w-4" /><span className="text-xs">Worsening</span></div>;
  if (trend === "improving") return <div className="flex items-center gap-1 text-green-600"><TrendingDown className="h-4 w-4" /><span className="text-xs">Improving</span></div>;
  return <div className="flex items-center gap-1 text-gray-500"><Minus className="h-4 w-4" /><span className="text-xs">Stable</span></div>;
}

const criticalRisks = risks.filter((r) => riskScore(r.likelihood, r.impact) >= 16).length;
const highRisks = risks.filter((r) => { const s = riskScore(r.likelihood, r.impact); return s >= 10 && s < 16; }).length;
const worseningCount = risks.filter((r) => r.trend === "worsening").length;

// Heat map grid: 5x5
const heatMapGrid = Array.from({ length: 5 }, (_, li) =>
  Array.from({ length: 5 }, (_, ii) => {
    const likelihood = 5 - li;
    const impact = ii + 1;
    const matchingRisks = risks.filter((r) => r.likelihood === likelihood && r.impact === impact);
    return { likelihood, impact, score: likelihood * impact, risks: matchingRisks };
  })
);

export default function PortfolioRiskPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/real-estate/reports" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-3">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to Reports
        </Link>
        <div className="flex items-center gap-3">
          <ShieldAlert className="h-7 w-7 text-red-600" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Portfolio Risk Dashboard</h1>
            <p className="text-muted-foreground">ABC Properties Ltd — All Active Projects — Aug 2026</p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Risk Items</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{risks.length}</div><p className="text-xs text-muted-foreground">Across 8 categories</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Critical (Score 16+)</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-red-700">{criticalRisks}</div><p className="text-xs text-muted-foreground">Require immediate action</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">High (Score 10-15)</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-orange-700">{highRisks}</div><p className="text-xs text-muted-foreground">Active monitoring needed</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Worsening Trends</CardTitle></CardHeader>
          <CardContent><div className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-red-500" /><span className="text-2xl font-bold text-red-700">{worseningCount}</span></div></CardContent>
        </Card>
      </div>

      {/* Heat Map */}
      <Card>
        <CardHeader><CardTitle>Risk Heat Map (Likelihood x Impact)</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[500px]">
              <div className="flex items-end mb-1">
                <div className="w-20" />
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex-1 text-center text-xs text-muted-foreground">Impact {i}</div>
                ))}
              </div>
              {heatMapGrid.map((row, li) => (
                <div key={li} className="flex items-stretch">
                  <div className="w-20 flex items-center text-xs text-muted-foreground pr-2 justify-end">L={5 - li}</div>
                  {row.map((cell) => (
                    <div
                      key={`${cell.likelihood}-${cell.impact}`}
                      className={`flex-1 h-16 border border-white/50 rounded-sm flex flex-col items-center justify-center ${scoreColor(cell.score)}`}
                    >
                      <span className="text-xs font-bold">{cell.score}</span>
                      {cell.risks.length > 0 && (
                        <div className="mt-0.5">
                          {cell.risks.map((r) => (
                            <span key={r.category} className="text-[9px] block leading-tight">{r.category}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-4 mt-4 justify-center">
            <div className="flex items-center gap-1"><div className="h-3 w-3 rounded bg-green-400" /><span className="text-xs">Low (1-5)</span></div>
            <div className="flex items-center gap-1"><div className="h-3 w-3 rounded bg-yellow-400" /><span className="text-xs">Medium (6-9)</span></div>
            <div className="flex items-center gap-1"><div className="h-3 w-3 rounded bg-orange-500" /><span className="text-xs">High (10-15)</span></div>
            <div className="flex items-center gap-1"><div className="h-3 w-3 rounded bg-red-500" /><span className="text-xs">Critical (16+)</span></div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Register Table */}
      <Card>
        <CardHeader><CardTitle>Risk Register</CardTitle></CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Risk Category</TableHead>
                <TableHead className="text-center">Likelihood</TableHead>
                <TableHead className="text-center">Impact</TableHead>
                <TableHead className="text-center">Score</TableHead>
                <TableHead className="text-center">Rating</TableHead>
                <TableHead>Affected Projects</TableHead>
                <TableHead className="text-center">Mitigation</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead className="text-center">Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {risks.sort((a, b) => riskScore(b.likelihood, b.impact) - riskScore(a.likelihood, a.impact)).map((row) => {
                const score = riskScore(row.likelihood, row.impact);
                return (
                  <TableRow key={row.category} className={score >= 16 ? "bg-red-50/50" : score >= 10 ? "bg-orange-50/30" : ""}>
                    <TableCell className="font-medium">{row.category}</TableCell>
                    <TableCell className="text-center font-mono">{row.likelihood}</TableCell>
                    <TableCell className="text-center font-mono">{row.impact}</TableCell>
                    <TableCell className="text-center"><span className={`inline-flex items-center justify-center h-7 w-7 rounded-full text-xs font-bold ${scoreColor(score)}`}>{score}</span></TableCell>
                    <TableCell className="text-center">{scoreBadge(score)}</TableCell>
                    <TableCell><div className="flex flex-wrap gap-1">{row.affectedProjects.map((p) => <Badge key={p} variant="outline" className="text-xs">{p}</Badge>)}</div></TableCell>
                    <TableCell className="text-center"><Badge variant="outline" className="text-xs">{row.mitigationStatus}</Badge></TableCell>
                    <TableCell className="text-sm">{row.owner}</TableCell>
                    <TableCell className="text-center"><TrendDisplay trend={row.trend} /></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Top Risks with Mitigation */}
      <Card>
        <CardHeader><CardTitle>Top Risks — Mitigation Actions</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {risks.filter((r) => riskScore(r.likelihood, r.impact) >= 12).sort((a, b) => riskScore(b.likelihood, b.impact) - riskScore(a.likelihood, a.impact)).map((r) => {
            const score = riskScore(r.likelihood, r.impact);
            return (
              <div key={r.category} className={`p-4 border rounded-lg ${score >= 16 ? "border-red-300 bg-red-50/30" : "border-orange-300 bg-orange-50/30"}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center justify-center h-6 w-6 rounded-full text-xs font-bold ${scoreColor(score)}`}>{score}</span>
                    <span className="font-medium">{r.category}</span>
                    <TrendDisplay trend={r.trend} />
                  </div>
                  <span className="text-sm text-muted-foreground">Owner: {r.owner}</span>
                </div>
                <p className="text-sm mt-2">{r.topMitigation}</p>
                <div className="flex gap-1 mt-2">{r.affectedProjects.map((p) => <Badge key={p} variant="outline" className="text-xs">{p}</Badge>)}</div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
