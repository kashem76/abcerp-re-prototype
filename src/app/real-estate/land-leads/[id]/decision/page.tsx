"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  ChevronLeft, Shield, CheckCircle2, Circle, Clock, AlertTriangle,
  ArrowRight, FileText, Plus, Trash2, Lock, Info,
  DollarSign, XCircle, RotateCcw,
} from "lucide-react";

// ─── Mock Data ─────────────────────────────────────────────────

interface DeptSignoff {
  dept: string;
  signedOff: boolean;
  signedBy?: string;
  date?: string;
  result: string;
  score: number;
}

const deptSignoffs: DeptSignoff[] = [
  { dept: "Land & Site", signedOff: true, signedBy: "BD Head", date: "14 Aug", result: "Proceed", score: 90 },
  { dept: "Legal", signedOff: true, signedBy: "Head of Legal", date: "18 Aug", result: "Proceed with Conditions", score: 74 },
  { dept: "Engineering", signedOff: true, signedBy: "Chief Engineer", date: "22 Aug", result: "Proceed with Conditions", score: 78 },
  { dept: "Regulatory", signedOff: true, signedBy: "Planning Head", date: "21 Aug", result: "Proceed", score: 84 },
  { dept: "Marketing", signedOff: true, signedBy: "Marketing Head", date: "19 Aug", result: "Proceed", score: 88 },
  { dept: "Sales", signedOff: true, signedBy: "Sales Head", date: "22 Aug", result: "Proceed", score: 85 },
  { dept: "Cost Estimate", signedOff: true, signedBy: "CFO", date: "24 Aug", result: "Proceed", score: 80 },
  { dept: "Financial", signedOff: true, signedBy: "CFO", date: "24 Aug", result: "Proceed", score: 82 },
];

const criticalFindings = 0;
const mediumRisks = 2;
const overallScore = 82;

const keyFindings = [
  { text: "Strong residential market — ৳12,000/sqft achievable", severity: "positive" as const },
  { text: "Pile foundation likely required — cost +6.9% above benchmark", severity: "medium" as const },
  { text: "Mutation record correction required before registration", severity: "medium" as const },
  { text: "Good utility availability — WASA, DESCO, Titas within 200m", severity: "positive" as const },
  { text: "Access constraints manageable with construction planning", severity: "low" as const },
];

const risks = [
  { level: "Medium" as const, title: "Foundation cost uncertainty", dept: "Engineering", status: "Open" },
  { level: "Medium" as const, title: "Mutation documentation correction", dept: "Legal", status: "Open" },
  { level: "Low" as const, title: "Selling price sensitivity to market shifts", dept: "Marketing", status: "Monitoring" },
];

const scenarios = [
  { metric: "Revenue", conservative: "৳1.65B", base: "৳1.82B", optimistic: "৳1.98B" },
  { metric: "Total Cost", conservative: "৳1.51B", base: "৳1.47B", optimistic: "৳1.44B" },
  { metric: "Profit", conservative: "৳140M", base: "৳350M", optimistic: "৳540M" },
  { metric: "Margin", conservative: "8.5%", base: "19.2%", optimistic: "27.3%" },
  { metric: "IRR", conservative: "12.4%", base: "20.8%", optimistic: "28.1%" },
];

const deptNarratives = [
  {
    dept: "Engineering", result: "Proceed with Conditions", score: 78,
    summary: "Site is technically suitable. Pile foundation expected. Access constraints require planning during construction.",
    findings: ["Pile foundation likely required", "Heavy equipment access requires planning"],
    headComment: "Technically viable subject to detailed geotechnical verification.",
    headName: "Chief Engineer", date: "22 Aug 2026",
  },
  {
    dept: "Legal", result: "Proceed with Conditions", score: 74,
    summary: "Ownership verified. Mutation record requires correction before registration. No active litigation.",
    findings: ["Mutation record needs correction", "One owner's succession certificate pending"],
    headComment: "Title is clean but mutation correction is mandatory before any registration.",
    headName: "Head of Legal", date: "18 Aug 2026",
  },
  {
    dept: "Marketing", result: "Proceed", score: 88,
    summary: "Strong demand for premium residential units in Gulshan. Comparable projects achieving ৳11,500-13,000/sqft.",
    findings: ["Strong demand for premium residential", "3 comparable projects in 1km radius"],
    headComment: "Market conditions are favorable. Recommend premium positioning.",
    headName: "Marketing Head", date: "19 Aug 2026",
  },
  {
    dept: "Finance", result: "Proceed", score: 82,
    summary: "Financial metrics meet company thresholds. IRR of 20.8% exceeds minimum 15%. Payback 4.4 years.",
    findings: ["IRR 20.8% exceeds 15% threshold", "Peak funding requirement ৳680M"],
    headComment: "Financially viable. Recommend proceeding with standard financing structure.",
    headName: "CFO", date: "24 Aug 2026",
  },
];

type DecisionChoice = "approve" | "conditions" | "return" | "reject" | null;
type PageState = "readiness" | "report" | "decision" | "post-approve" | "post-reject" | "post-return";

interface Condition {
  id: number;
  text: string;
  before: string;
  responsible: string;
  due: string;
}

// ─── Component ─────────────────────────────────────────────────

export default function DecisionPage() {
  const [state, setState] = useState<PageState>("readiness");

  const allSignedOff = deptSignoffs.every((d) => d.signedOff);
  const stepIndex = state === "readiness" ? 0 : state === "report" ? 1 : state === "decision" ? 2 : 3;

  const steps = [
    { id: "readiness", label: "Readiness" },
    { id: "report", label: "Report" },
    { id: "decision", label: "Decision" },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <Link
          href="/real-estate/land-leads/LL-2026-001"
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-2"
        >
          <ChevronLeft className="h-4 w-4" /> Gulshan Plot 07
        </Link>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-amber-50 flex items-center justify-center">
            <Shield className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Management Decision</h1>
            <p className="text-sm text-muted-foreground">Gulshan Plot 07 &middot; 32 Katha &middot; Gulshan, Dhaka</p>
          </div>
        </div>
      </div>

      {/* Progress Steps — hidden after decision */}
      {!["post-approve", "post-reject", "post-return"].includes(state) && (
        <div className="flex items-center gap-2">
          {steps.map((step, i) => {
            const isCurrent = i === stepIndex;
            const isPast = i < stepIndex;
            return (
              <div key={step.id} className="flex items-center gap-2">
                {i > 0 && <div className={`h-0.5 w-8 ${isPast ? "bg-emerald-400" : "bg-gray-200"}`} />}
                <button
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    isCurrent ? "bg-primary text-primary-foreground" :
                    isPast ? "bg-emerald-100 text-emerald-800" :
                    "bg-muted text-muted-foreground"
                  }`}
                  onClick={() => setState(step.id as PageState)}
                >
                  {isPast && <CheckCircle2 className="h-3.5 w-3.5" />}
                  {step.label}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* ── State 1: Readiness Check ── */}
      {state === "readiness" && (
        <div className="space-y-6">
          {/* Department Sign-off Status */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Department Sign-off Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {deptSignoffs.map((d) => (
                  <div key={d.dept} className="flex items-center gap-3 py-2">
                    {d.signedOff ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    ) : (
                      <Circle className="h-4 w-4 text-gray-300 shrink-0" />
                    )}
                    <span className="text-sm font-medium w-32">{d.dept}</span>
                    <span className={`text-xs font-medium flex-1 ${
                      d.result === "Proceed" ? "text-emerald-600" : "text-amber-600"
                    }`}>
                      {d.signedOff ? `${d.result === "Proceed" ? "✓" : "⚠"} ${d.result}` : "Pending"}
                    </span>
                    <span className="text-xs text-muted-foreground w-20 text-right tabular-nums">{d.score}/100</span>
                    {d.signedOff && (
                      <span className="text-[11px] text-muted-foreground w-32 text-right">{d.signedBy} &middot; {d.date}</span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Gate Checks */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Decision Gate</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                {allSignedOff ? <CheckCircle2 className="h-5 w-5 text-emerald-600" /> : <Circle className="h-5 w-5 text-gray-300" />}
                <span className="text-sm">All departments signed off</span>
                <span className="text-xs text-muted-foreground ml-auto">{deptSignoffs.filter((d) => d.signedOff).length}/{deptSignoffs.length}</span>
              </div>
              <div className="flex items-center gap-3">
                {criticalFindings === 0 ? <CheckCircle2 className="h-5 w-5 text-emerald-600" /> : <AlertTriangle className="h-5 w-5 text-red-500" />}
                <span className="text-sm">No unresolved critical findings</span>
                <span className="text-xs text-muted-foreground ml-auto">{criticalFindings} critical</span>
              </div>
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <span className="text-sm">{mediumRisks} medium risks remain open</span>
                <span className="text-xs text-muted-foreground ml-auto">Foundation cost, Mutation</span>
              </div>
            </CardContent>
          </Card>

          {/* Readiness Summary */}
          <Card className={allSignedOff ? "border-emerald-300 bg-emerald-50/30" : "border-amber-300 bg-amber-50/30"}>
            <CardContent className="py-5 text-center">
              {allSignedOff ? (
                <>
                  <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                  <p className="font-semibold text-emerald-800">Ready for Management Review</p>
                  <p className="text-sm text-emerald-700 mt-1">All departments signed off. Overall score: {overallScore}/100.</p>
                </>
              ) : (
                <>
                  <Clock className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                  <p className="font-semibold text-amber-800">Not Ready</p>
                  <p className="text-sm text-amber-700 mt-1">
                    Waiting for: {deptSignoffs.filter((d) => !d.signedOff).map((d) => d.dept).join(", ")}
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" className="gap-2" onClick={() => setState("report")}>
              <FileText className="h-4 w-4" /> Preview Report
            </Button>
            <Button onClick={() => setState("report")} className="gap-2" disabled={!allSignedOff}>
              Submit to Management <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* ── State 2: Management Report ── */}
      {state === "report" && (
        <div className="space-y-6">
          {/* Report Title */}
          <Card className="bg-slate-50/50">
            <CardContent className="py-6 text-center">
              <p className="text-[11px] text-muted-foreground uppercase tracking-widest mb-1">Land Evaluation & Feasibility Report</p>
              <h2 className="text-2xl font-bold">Gulshan Plot 07</h2>
              <p className="text-sm text-muted-foreground mt-1">Gulshan, Dhaka &middot; 32 Katha &middot; Prepared 25 Aug 2026</p>
            </CardContent>
          </Card>

          {/* Overall Recommendation */}
          <Card className="border-blue-200">
            <CardContent className="py-5 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Overall Recommendation</p>
              <Badge className="bg-blue-100 text-blue-800 text-base px-4 py-1.5">PROCEED WITH CONDITIONS</Badge>
              <p className="text-3xl font-bold mt-3">{overallScore} <span className="text-lg text-muted-foreground font-normal">/ 100</span></p>
            </CardContent>
          </Card>

          {/* Executive Summary */}
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-base">Executive Summary</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">
                The land is suitable for residential development. Market demand is strong with ৳12,000/sqft
                achievable. Financial returns meet company thresholds (IRR 20.8%). Two conditions require
                attention: mutation correction before registration and foundation estimate validation after
                detailed soil investigation.
              </p>
            </CardContent>
          </Card>

          {/* Financial Summary */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2"><DollarSign className="h-4 w-4" /> Financial Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-3 text-center">
                {[
                  { label: "Revenue", value: "৳1.82B" },
                  { label: "Total Cost", value: "৳1.47B" },
                  { label: "Profit", value: "৳350M" },
                  { label: "Margin", value: "19.2%" },
                  { label: "IRR", value: "20.8%" },
                ].map((kpi) => (
                  <div key={kpi.label} className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-lg font-bold">{kpi.value}</p>
                    <p className="text-xs text-muted-foreground">{kpi.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Department Recommendations */}
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-base">Department Recommendations</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-1.5">
                {deptSignoffs.map((d) => (
                  <div key={d.dept} className="flex items-center justify-between py-1.5">
                    <span className="text-sm">{d.dept}</span>
                    <span className={`text-sm font-medium ${
                      d.result === "Proceed" ? "text-emerald-600" : "text-amber-600"
                    }`}>
                      {d.result === "Proceed" ? "✓" : "⚠"} {d.result}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Key Findings */}
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-base">Key Findings</CardTitle></CardHeader>
            <CardContent>
              <ol className="space-y-2">
                {keyFindings.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-xs text-muted-foreground font-medium mt-0.5 w-4 shrink-0">{i + 1}.</span>
                    <span>{f.text}</span>
                    {f.severity === "medium" && <Badge className="bg-amber-100 text-amber-800 text-[9px] shrink-0">Medium</Badge>}
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          {/* Risk Register */}
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-base">Key Risks</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {risks.map((r, i) => (
                <div key={i} className="flex items-center gap-3 py-1">
                  <Badge className={r.level === "Medium" ? "bg-amber-100 text-amber-800" : "bg-gray-100 text-gray-700"}>{r.level}</Badge>
                  <span className="text-sm flex-1">{r.title}</span>
                  <span className="text-xs text-muted-foreground">{r.dept}</span>
                  <Badge variant="outline" className="text-[10px]">{r.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Scenarios */}
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-base">Scenario Analysis</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead></TableHead>
                    <TableHead className="text-center">Conservative</TableHead>
                    <TableHead className="text-center bg-blue-50">Base Case</TableHead>
                    <TableHead className="text-center">Optimistic</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scenarios.map((row) => (
                    <TableRow key={row.metric}>
                      <TableCell className="font-medium text-sm">{row.metric}</TableCell>
                      <TableCell className="text-center text-sm text-muted-foreground">{row.conservative}</TableCell>
                      <TableCell className="text-center text-sm font-semibold bg-blue-50/50">{row.base}</TableCell>
                      <TableCell className="text-center text-sm text-muted-foreground">{row.optimistic}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Department Narratives */}
          <div className="space-y-4">
            <h2 className="text-base font-semibold">Department Assessments</h2>
            {deptNarratives.map((d) => (
              <Card key={d.dept}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">{d.dept}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className={d.result === "Proceed" ? "bg-emerald-100 text-emerald-800 text-[10px]" : "bg-amber-100 text-amber-800 text-[10px]"}>
                        {d.result}
                      </Badge>
                      <span className="text-xs text-muted-foreground tabular-nums">{d.score}/100</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">{d.summary}</p>
                  <ul className="list-disc list-inside text-xs text-muted-foreground space-y-0.5">
                    {d.findings.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                  <div className="bg-muted/50 rounded p-3">
                    <p className="text-sm italic">&ldquo;{d.headComment}&rdquo;</p>
                    <p className="text-[11px] text-muted-foreground mt-1">{d.headName} &middot; {d.date}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-between">
            <Button variant="outline" className="gap-2">
              <FileText className="h-4 w-4" /> Export PDF
            </Button>
            <Button onClick={() => setState("decision")} className="gap-2">
              Proceed to Decision <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* ── State 3: Management Decision ── */}
      {state === "decision" && <DecisionForm onComplete={(choice) => {
        if (choice === "approve" || choice === "conditions") setState("post-approve");
        else if (choice === "reject") setState("post-reject");
        else if (choice === "return") setState("post-return");
      }} />}

      {/* ── Post-Decision: Approved ── */}
      {state === "post-approve" && <PostApproved />}

      {/* ── Post-Decision: Rejected ── */}
      {state === "post-reject" && <PostRejected onBack={() => setState("readiness")} />}

      {/* ── Post-Decision: Returned ── */}
      {state === "post-return" && <PostReturned onBack={() => setState("readiness")} />}
    </div>
  );
}

// ─── Decision Form ─────────────────────────────────────────────

function DecisionForm({ onComplete }: { onComplete: (choice: DecisionChoice) => void }) {
  const [decision, setDecision] = useState<DecisionChoice>(null);
  const [conditions, setConditions] = useState<Condition[]>([
    { id: 1, text: "Mutation correction", before: "Land Registration", responsible: "Legal", due: "30 Aug 2026" },
    { id: 2, text: "Validate foundation estimate", before: "Project Baseline Approval", responsible: "Engineering", due: "28 Aug 2026" },
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Management Decision</CardTitle>
          <p className="text-sm text-muted-foreground">
            Overall Recommendation: <Badge className="bg-blue-100 text-blue-800 text-[10px] ml-1">PROCEED WITH CONDITIONS</Badge>
            <span className="ml-2">Score: {overallScore}/100</span>
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Decision Options */}
          <div className="space-y-2">
            {([
              { value: "approve" as const, label: "Approve", desc: "Proceed to land acquisition", icon: CheckCircle2, colors: "border-emerald-300 bg-emerald-50" },
              { value: "conditions" as const, label: "Approve with Conditions", desc: "Proceed subject to specified conditions", icon: AlertTriangle, colors: "border-blue-300 bg-blue-50" },
              { value: "return" as const, label: "Return for Revision", desc: "Send back to departments for revision", icon: RotateCcw, colors: "border-amber-300 bg-amber-50" },
              { value: "reject" as const, label: "Reject", desc: "Close the land opportunity", icon: XCircle, colors: "border-red-300 bg-red-50" },
            ]).map((opt) => {
              const Icon = opt.icon;
              return (
                <div
                  key={opt.value}
                  className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    decision === opt.value ? opt.colors : "border-transparent bg-muted/30 hover:bg-muted/50"
                  }`}
                  onClick={() => setDecision(opt.value)}
                >
                  <input type="radio" name="decision" checked={decision === opt.value} onChange={() => setDecision(opt.value)} className="h-4 w-4" />
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-semibold text-sm">{opt.label}</p>
                    <p className="text-xs text-muted-foreground">{opt.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Conditions Builder (for "conditions") */}
          {decision === "conditions" && (
            <>
              <Separator />
              <div>
                <label className="text-sm font-medium">Approval Conditions</label>
                <div className="space-y-3 mt-3">
                  {conditions.map((cond, i) => (
                    <Card key={cond.id} className="border-blue-200">
                      <CardContent className="pt-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-muted-foreground">Condition {i + 1}</span>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setConditions(conditions.filter((c) => c.id !== cond.id))}>
                            <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                          </Button>
                        </div>
                        <Input defaultValue={cond.text} placeholder="Condition description" />
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="text-[11px] text-muted-foreground">Must complete before</label>
                            <Select defaultValue={cond.before || undefined}>
                              <SelectTrigger className="mt-1 h-8 text-sm"><SelectValue placeholder="Stage" /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Land Registration">Land Registration</SelectItem>
                                <SelectItem value="Project Baseline Approval">Project Baseline</SelectItem>
                                <SelectItem value="Construction Start">Construction Start</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="text-[11px] text-muted-foreground">Responsible</label>
                            <Select defaultValue={cond.responsible || undefined}>
                              <SelectTrigger className="mt-1 h-8 text-sm"><SelectValue placeholder="Dept" /></SelectTrigger>
                              <SelectContent>
                                {["Legal", "Engineering", "Finance", "Marketing", "Management"].map((d) => (
                                  <SelectItem key={d} value={d}>{d}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="text-[11px] text-muted-foreground">Due date</label>
                            <Input defaultValue={cond.due} placeholder="DD Mon YYYY" className="mt-1 h-8 text-sm" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Button variant="outline" size="sm" className="gap-1" onClick={() => setConditions([...conditions, { id: Date.now(), text: "", before: "", responsible: "", due: "" }])}>
                    <Plus className="h-3.5 w-3.5" /> Add Condition
                  </Button>
                </div>
              </div>
            </>
          )}

          {/* Return Departments (for "return") */}
          {decision === "return" && (
            <>
              <Separator />
              <div>
                <label className="text-sm font-medium">Return to which departments?</label>
                <div className="space-y-2 mt-3">
                  {["Engineering", "Legal", "Marketing", "Sales", "Finance", "Planning"].map((dept) => (
                    <div key={dept} className="flex items-center gap-3 p-3 border rounded-lg">
                      <input type="checkbox" className="h-4 w-4" />
                      <span className="text-sm font-medium w-28">{dept}</span>
                      <Input placeholder="Revision instructions..." className="flex-1 text-sm h-8" />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <Separator />

          {/* Comments + Decision By */}
          <div>
            <label className="text-sm font-medium">Management Comments</label>
            <Textarea
              placeholder="Decision rationale..."
              defaultValue={decision === "conditions" ? "Commercially attractive. Proceed subject to conditions above." : ""}
              className="mt-1"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Decision By</label>
              <Select defaultValue="md">
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="md">Managing Director</SelectItem>
                  <SelectItem value="ceo">CEO</SelectItem>
                  <SelectItem value="board">Board of Directors</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Date</label>
              <Input type="date" defaultValue="2026-08-26" className="mt-1" />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              disabled={!decision}
              onClick={() => decision && onComplete(decision)}
              className={`gap-2 ${
                decision === "approve" || decision === "conditions" ? "bg-emerald-600 hover:bg-emerald-700" :
                decision === "reject" ? "bg-red-600 hover:bg-red-700" : ""
              }`}
            >
              <Shield className="h-4 w-4" /> Confirm Decision
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Post-Decision: Approved ───────────────────────────────────

function PostApproved() {
  return (
    <div className="space-y-6">
      <Card className="border-emerald-300 bg-emerald-50/30">
        <CardContent className="py-6 text-center space-y-2">
          <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto" />
          <h2 className="text-2xl font-bold text-emerald-800">Land Approved</h2>
          <p className="text-sm text-emerald-700">Approved by Managing Director &middot; 26 Aug 2026</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Lock className="h-4 w-4" /> Approved Feasibility Baseline
          </CardTitle>
          <p className="text-xs text-muted-foreground">Locked — compared against actuals at project closure.</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-3 text-center">
            {[
              { label: "Land Cost", value: "৳450M" },
              { label: "Dev Cost", value: "৳848M" },
              { label: "Revenue", value: "৳1.82B" },
              { label: "Profit", value: "৳350M" },
              { label: "IRR", value: "20.8%" },
            ].map((kpi) => (
              <div key={kpi.label} className="p-3 bg-muted/50 rounded-lg">
                <p className="text-lg font-bold">{kpi.value}</p>
                <p className="text-xs text-muted-foreground">{kpi.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-amber-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500" /> Open Conditions
            <Badge className="bg-amber-100 text-amber-800 text-[10px]">2</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Condition</TableHead>
                <TableHead>Responsible</TableHead>
                <TableHead>Due</TableHead>
                <TableHead>Before</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-sm">Mutation correction</TableCell>
                <TableCell className="text-sm">Legal</TableCell>
                <TableCell className="text-sm">30 Aug</TableCell>
                <TableCell className="text-sm text-muted-foreground">Registration</TableCell>
                <TableCell><Badge variant="outline" className="text-[10px]">Open</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-sm">Foundation estimate validation</TableCell>
                <TableCell className="text-sm">Engineering</TableCell>
                <TableCell className="text-sm">28 Aug</TableCell>
                <TableCell className="text-sm text-muted-foreground">Project Baseline</TableCell>
                <TableCell><Badge variant="outline" className="text-[10px]">Open</Badge></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="py-5">
          <p className="text-sm mb-3">The Acquisition tab is now unlocked. Proceed with land purchase or JV agreement.</p>
          <div className="flex gap-3">
            <Link href="/real-estate/land-leads/LL-2026-001">
              <Button variant="outline" className="gap-2"><ChevronLeft className="h-4 w-4" /> Back to Workspace</Button>
            </Link>
            <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700">
              Start Acquisition <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-200 bg-blue-50/50">
        <CardContent className="py-4 flex gap-3">
          <Info className="h-5 w-5 text-blue-600 shrink-0" />
          <p className="text-sm text-blue-800">
            Assessment and Feasibility stages are now read-only. The baseline is locked for Feasibility vs Actual
            comparison at project closure. Open conditions remain visible until resolved.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Post-Decision: Rejected ───────────────────────────────────

function PostRejected({ onBack }: { onBack: () => void }) {
  return (
    <div className="space-y-6">
      <Card className="border-red-300 bg-red-50/30">
        <CardContent className="py-6 text-center space-y-2">
          <XCircle className="h-12 w-12 text-red-500 mx-auto" />
          <h2 className="text-2xl font-bold text-red-800">Land Rejected</h2>
          <p className="text-sm text-red-700">Rejected by Managing Director &middot; 26 Aug 2026</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-base">Decision Rationale</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground italic">
            &ldquo;After review, the risk profile does not justify the investment at this time.&rdquo;
          </p>
          <p className="text-xs text-muted-foreground mt-2">Managing Director &middot; 26 Aug 2026</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="py-5">
          <p className="text-sm text-muted-foreground mb-3">
            The land workspace is now read-only. Pre-development costs of ৳3.2M remain as corporate expense.
          </p>
          <div className="flex gap-3">
            <Link href="/real-estate/land-leads">
              <Button variant="outline" className="gap-2"><ChevronLeft className="h-4 w-4" /> Back to Pipeline</Button>
            </Link>
            <Button variant="outline" onClick={onBack}>Reopen (Demo)</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Post-Decision: Returned ───────────────────────────────────

function PostReturned({ onBack }: { onBack: () => void }) {
  return (
    <div className="space-y-6">
      <Card className="border-amber-300 bg-amber-50/30">
        <CardContent className="py-6 text-center space-y-2">
          <RotateCcw className="h-12 w-12 text-amber-600 mx-auto" />
          <h2 className="text-2xl font-bold text-amber-800">Returned for Revision</h2>
          <p className="text-sm text-amber-700">Returned by Managing Director &middot; 26 Aug 2026</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-base">Revision Instructions</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3 p-3 border rounded-lg border-amber-200 bg-amber-50/50">
            <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium">Engineering</p>
              <p className="text-xs text-muted-foreground">Provide detailed foundation cost with bore-log data. Current estimate uncertainty too high.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 border rounded-lg border-amber-200 bg-amber-50/50">
            <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium">Legal</p>
              <p className="text-xs text-muted-foreground">Resolve mutation issue and provide updated timeline for completion.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="py-5">
          <p className="text-sm text-muted-foreground mb-3">
            Returned departments have been notified. Their work steps are re-opened on the Work Board.
          </p>
          <div className="flex gap-3">
            <Link href="/real-estate/land-leads/LL-2026-001/work">
              <Button className="gap-2">Open Work Board <ArrowRight className="h-4 w-4" /></Button>
            </Link>
            <Button variant="outline" onClick={onBack}>Reset (Demo)</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
