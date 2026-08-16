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
  ArrowRight, FileText, Send, Plus, Trash2, Lock, Info,
  Award, TrendingUp, DollarSign, X,
} from "lucide-react";
import { formatBDT } from "@/lib/mock-data";
import { WorkspaceNav } from "@/components/real-estate/workspace-nav";

// ─── Mock Data ─────────────────────────────────────────────────

interface ReadinessItem {
  label: string;
  status: "done" | "pending" | "warning";
  detail?: string;
}

const readinessChecklist: ReadinessItem[] = [
  { label: "Land & Site assessment signed off", status: "done" },
  { label: "Legal assessment signed off", status: "done" },
  { label: "Engineering assessment signed off", status: "done" },
  { label: "Marketing assessment signed off", status: "done" },
  { label: "Sales assessment signed off", status: "done" },
  { label: "Financial assessment signed off", status: "done" },
  { label: "No unresolved critical findings", status: "done" },
  { label: "2 medium risks remain open", status: "warning", detail: "Foundation cost uncertainty, Mutation documentation" },
];

const deptRecommendations = [
  { dept: "Land & Site", result: "Proceed", color: "text-emerald-600", icon: "✓" },
  { dept: "Legal", result: "Proceed with Conditions", color: "text-amber-600", icon: "⚠" },
  { dept: "Engineering", result: "Proceed with Conditions", color: "text-amber-600", icon: "⚠" },
  { dept: "Marketing", result: "Proceed", color: "text-emerald-600", icon: "✓" },
  { dept: "Sales", result: "Proceed", color: "text-emerald-600", icon: "✓" },
  { dept: "Finance", result: "Proceed", color: "text-emerald-600", icon: "✓" },
];

const keyFindings = [
  "Strong residential market potential with ৳12,000/sqft achievable",
  "Pile foundation likely required — cost +6.9% above benchmark",
  "Mutation record correction required before registration",
  "Good utility availability — WASA, DESCO, Titas within 200m",
  "Access constraints manageable with construction planning",
];

const risks = [
  { level: "Medium", title: "Foundation cost uncertainty", dept: "Engineering" },
  { level: "Medium", title: "Mutation documentation correction", dept: "Legal" },
  { level: "Low", title: "Selling price sensitivity to market shifts", dept: "Marketing" },
];

const scenarios = [
  { metric: "Revenue", conservative: "৳1.65B", base: "৳1.82B", optimistic: "৳1.98B" },
  { metric: "Profit", conservative: "৳140M", base: "৳350M", optimistic: "৳540M" },
  { metric: "IRR", conservative: "12.4%", base: "20.8%", optimistic: "28.1%" },
];

const deptNarratives = [
  {
    dept: "Engineering", result: "Proceed with Conditions", score: 78,
    summary: "Site is technically suitable for the proposed development. Pile foundation is expected and access constraints require planning.",
    findings: ["Pile foundation likely required", "Heavy equipment access requires planning"],
    headComment: "Technically viable subject to detailed geotechnical verification.",
    headName: "Chief Engineer", date: "22 Aug 2026",
  },
  {
    dept: "Legal", result: "Proceed with Conditions", score: 74,
    summary: "Ownership is substantially verified. Mutation record requires correction before registration. No active litigation found.",
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
    summary: "Financial metrics meet company thresholds. IRR of 20.8% exceeds minimum 15%. Payback of 4.4 years is acceptable.",
    findings: ["IRR 20.8% exceeds 15% threshold", "Peak funding requirement ৳680M"],
    headComment: "Financially viable. Recommend proceeding with standard financing structure.",
    headName: "CFO", date: "24 Aug 2026",
  },
];

type DecisionType = "approve" | "conditions" | "return" | "reject" | null;

interface Condition {
  id: number;
  text: string;
  before: string;
  responsible: string;
  due: string;
}

// ─── Component ─────────────────────────────────────────────────

export default function DecisionPage() {
  const [view, setView] = useState<"readiness" | "report" | "decision" | "complete">("readiness");

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
          <Shield className="h-7 w-7 text-amber-600" />
          <div>
            <h1 className="text-2xl font-bold">Management Decision</h1>
            <p className="text-muted-foreground">Gulshan Plot 07 &middot; 32 Katha &middot; Owner: Mr Ahmed</p>
          </div>
        </div>
      </div>

      {/* Workspace Navigation */}
      <WorkspaceNav active="decision" />

      {/* Progress Steps */}
      <div className="flex items-center gap-2">
        {[
          { id: "readiness", label: "Readiness" },
          { id: "report", label: "Report" },
          { id: "decision", label: "Decision" },
        ].map((step, i) => {
          const isCurrent = view === step.id;
          const isPast = (view === "report" && step.id === "readiness") ||
                         (view === "decision" && step.id !== "decision") ||
                         view === "complete";
          return (
            <div key={step.id} className="flex items-center gap-2">
              {i > 0 && <div className={`h-px w-8 ${isPast ? "bg-emerald-400" : "bg-gray-200"}`} />}
              <button
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  isCurrent ? "bg-primary text-primary-foreground" :
                  isPast ? "bg-emerald-100 text-emerald-800" :
                  "bg-muted text-muted-foreground"
                }`}
                onClick={() => step.id !== "complete" && setView(step.id as typeof view)}
              >
                {isPast && !isCurrent ? <CheckCircle2 className="h-3.5 w-3.5" /> : null}
                {step.label}
              </button>
            </div>
          );
        })}
      </div>

      {view === "readiness" && <ReadinessView onProceed={() => setView("report")} />}
      {view === "report" && <ReportView onProceed={() => setView("decision")} />}
      {view === "decision" && <DecisionView onComplete={() => setView("complete")} />}
      {view === "complete" && <DecisionComplete />}
    </div>
  );
}

// ─── Readiness View ─────────────────────────────────────────────

function ReadinessView({ onProceed }: { onProceed: () => void }) {
  const allReady = readinessChecklist.every((r) => r.status !== "pending");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Report Readiness</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {readinessChecklist.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              {item.status === "done" ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : item.status === "warning" ? (
                <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              ) : (
                <Circle className="h-5 w-5 text-gray-300 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="text-sm">{item.label}</p>
                {item.detail && <p className="text-xs text-muted-foreground">{item.detail}</p>}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className={allReady ? "border-emerald-300 bg-emerald-50/30" : "border-amber-300 bg-amber-50/30"}>
        <CardContent className="pt-5 text-center">
          {allReady ? (
            <>
              <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              <p className="font-semibold text-emerald-800">Ready for Management Review</p>
              <p className="text-sm text-emerald-700 mt-1">All department assessments are signed off.</p>
            </>
          ) : (
            <>
              <Clock className="h-8 w-8 text-amber-500 mx-auto mb-2" />
              <p className="font-semibold text-amber-800">Not Ready for Submission</p>
              <p className="text-sm text-amber-700 mt-1">Waiting for pending items to complete.</p>
            </>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={onProceed} className="gap-2">
          View Report <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// ─── Report View ────────────────────────────────────────────────

function ReportView({ onProceed }: { onProceed: () => void }) {
  return (
    <div className="space-y-6">
      {/* Title */}
      <Card className="border-slate-300 bg-slate-50/30">
        <CardContent className="pt-6 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Land Evaluation & Feasibility</p>
          <h2 className="text-2xl font-bold">Gulshan Plot 07</h2>
          <p className="text-muted-foreground mt-1">Gulshan &middot; 32 Katha</p>
        </CardContent>
      </Card>

      {/* Overall Recommendation */}
      <Card className="border-blue-300">
        <CardContent className="pt-6 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Overall Recommendation</p>
          <Badge className="bg-blue-100 text-blue-800 text-lg px-4 py-2">PROCEED</Badge>
          <p className="text-3xl font-bold mt-3">82 <span className="text-lg text-muted-foreground">/ 100</span></p>
        </CardContent>
      </Card>

      {/* Executive Summary */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Executive Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">
            The land is considered suitable for residential development. Market demand is strong and expected
            returns meet company targets. Two conditions require attention: mutation correction before
            registration and foundation estimate validation after detailed soil investigation.
          </p>
        </CardContent>
      </Card>

      {/* Financial Summary */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <DollarSign className="h-4 w-4" /> Financial Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4 text-center">
            {[
              { label: "Revenue", value: "৳1.82B" },
              { label: "Total Cost", value: "৳1.47B" },
              { label: "Expected Profit", value: "৳350M" },
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
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Department Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {deptRecommendations.map((d) => (
              <div key={d.dept} className="flex items-center justify-between py-2">
                <span className="text-sm font-medium">{d.dept}</span>
                <span className={`text-sm font-medium ${d.color}`}>
                  {d.icon} {d.result}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Findings */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Key Findings</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            {keyFindings.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {/* Risk Register */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Key Risks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {risks.map((r, i) => (
            <div key={i} className="flex items-center gap-3">
              <Badge className={
                r.level === "High" ? "bg-red-100 text-red-800" :
                r.level === "Medium" ? "bg-amber-100 text-amber-800" :
                "bg-gray-100 text-gray-700"
              }>{r.level}</Badge>
              <span className="text-sm">{r.title}</span>
              <span className="text-xs text-muted-foreground ml-auto">{r.dept}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Scenarios */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Scenarios</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead className="text-center">Conservative</TableHead>
                <TableHead className="text-center bg-blue-50">Base</TableHead>
                <TableHead className="text-center">Optimistic</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scenarios.map((row) => (
                <TableRow key={row.metric}>
                  <TableCell className="font-medium">{row.metric}</TableCell>
                  <TableCell className="text-center text-muted-foreground">{row.conservative}</TableCell>
                  <TableCell className="text-center font-semibold bg-blue-50/50">{row.base}</TableCell>
                  <TableCell className="text-center text-muted-foreground">{row.optimistic}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Department Narratives */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Department Assessments</h2>
        <div className="space-y-4">
          {deptNarratives.map((d) => (
            <Card key={d.dept}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{d.dept}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className={
                      d.result === "Proceed" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                    }>{d.result}</Badge>
                    <span className="text-sm font-medium">{d.score}/100</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm">{d.summary}</p>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Key Findings</p>
                  <ul className="list-disc list-inside text-sm space-y-0.5 text-muted-foreground">
                    {d.findings.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                </div>
                <div className="bg-muted/50 rounded p-3">
                  <p className="text-sm italic">&ldquo;{d.headComment}&rdquo;</p>
                  <p className="text-xs text-muted-foreground mt-1">{d.headName} &middot; {d.date}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" className="gap-2">
          <FileText className="h-4 w-4" /> Export PDF
        </Button>
        <Button onClick={onProceed} className="gap-2">
          Proceed to Decision <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// ─── Decision View ──────────────────────────────────────────────

function DecisionView({ onComplete }: { onComplete: () => void }) {
  const [decision, setDecision] = useState<DecisionType>(null);
  const [conditions, setConditions] = useState<Condition[]>([
    { id: 1, text: "Mutation correction", before: "Land Registration", responsible: "Legal", due: "30 Aug 2026" },
    { id: 2, text: "Validate foundation estimate", before: "Project Baseline Approval", responsible: "Engineering", due: "28 Aug 2026" },
  ]);

  const addCondition = () => {
    setConditions([...conditions, { id: Date.now(), text: "", before: "", responsible: "", due: "" }]);
  };

  const removeCondition = (id: number) => {
    setConditions(conditions.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Management Decision</CardTitle>
          <p className="text-sm text-muted-foreground">Gulshan Plot 07</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Decision Radio */}
          <div>
            <label className="text-sm font-medium">Decision *</label>
            <div className="space-y-3 mt-3">
              {([
                { value: "approve", label: "APPROVE", desc: "Proceed to land acquisition", color: "border-emerald-300 bg-emerald-50" },
                { value: "conditions", label: "APPROVE WITH CONDITIONS", desc: "Proceed subject to specified conditions being met", color: "border-blue-300 bg-blue-50" },
                { value: "return", label: "RETURN FOR REVISION", desc: "Send back to specific departments for revision", color: "border-amber-300 bg-amber-50" },
                { value: "reject", label: "REJECT", desc: "Close the land opportunity", color: "border-red-300 bg-red-50" },
              ] as { value: DecisionType; label: string; desc: string; color: string }[]).map((opt) => (
                <div
                  key={opt.value}
                  className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    decision === opt.value ? opt.color : "border-transparent bg-muted/30 hover:bg-muted/50"
                  }`}
                  onClick={() => setDecision(opt.value)}
                >
                  <input
                    type="radio"
                    name="decision"
                    checked={decision === opt.value}
                    onChange={() => setDecision(opt.value)}
                    className="h-4 w-4"
                  />
                  <div>
                    <p className="font-semibold text-sm">{opt.label}</p>
                    <p className="text-xs text-muted-foreground">{opt.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conditions (shown for "conditions") */}
          {decision === "conditions" && (
            <>
              <Separator />
              <div>
                <label className="text-sm font-medium">Approval Conditions</label>
                <div className="space-y-4 mt-3">
                  {conditions.map((cond, i) => (
                    <Card key={cond.id} className="border-blue-200">
                      <CardContent className="pt-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-muted-foreground">Condition {i + 1}</span>
                          <Button variant="ghost" size="sm" onClick={() => removeCondition(cond.id)}>
                            <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                          </Button>
                        </div>
                        <Input defaultValue={cond.text} placeholder="Condition description" />
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="text-xs text-muted-foreground">Must complete before</label>
                            <Select defaultValue={cond.before || undefined}>
                              <SelectTrigger className="mt-1"><SelectValue placeholder="Select stage" /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Land Registration">Land Registration</SelectItem>
                                <SelectItem value="Project Baseline Approval">Project Baseline Approval</SelectItem>
                                <SelectItem value="Construction Start">Construction Start</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground">Responsible</label>
                            <Select defaultValue={cond.responsible || undefined}>
                              <SelectTrigger className="mt-1"><SelectValue placeholder="Department" /></SelectTrigger>
                              <SelectContent>
                                {["Legal", "Engineering", "Finance", "Marketing", "Management"].map((d) => (
                                  <SelectItem key={d} value={d}>{d}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground">Due</label>
                            <Input type="date" defaultValue={cond.due ? "2026-08-30" : ""} className="mt-1" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Button variant="outline" size="sm" className="gap-1" onClick={addCondition}>
                    <Plus className="h-4 w-4" /> Add Condition
                  </Button>
                </div>
              </div>
            </>
          )}

          {/* Return departments (shown for "return") */}
          {decision === "return" && (
            <>
              <Separator />
              <div>
                <label className="text-sm font-medium">Return to which departments?</label>
                <div className="space-y-2 mt-3">
                  {["Engineering", "Legal", "Marketing", "Sales", "Finance", "Planning"].map((dept) => (
                    <div key={dept} className="flex items-center gap-3 p-3 border rounded-lg">
                      <input type="checkbox" className="h-4 w-4" />
                      <span className="text-sm font-medium flex-1">{dept}</span>
                      <Input placeholder="Revision instructions..." className="max-w-xs text-sm" />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <Separator />

          {/* Comments */}
          <div>
            <label className="text-sm font-medium">Management Comments</label>
            <Textarea
              placeholder="Decision rationale and comments..."
              defaultValue={decision === "conditions" ? "The project is commercially attractive. Proceed subject to the conditions above." : ""}
              className="mt-1"
              rows={4}
            />
          </div>

          {/* Decision By */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Decision By</label>
              <Select defaultValue="md">
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="md">Managing Director</SelectItem>
                  <SelectItem value="ceo">CEO</SelectItem>
                  <SelectItem value="director">Director</SelectItem>
                  <SelectItem value="board">Board of Directors</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Date</label>
              <Input type="date" defaultValue="2026-08-26" className="mt-1" />
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <Button
              disabled={!decision}
              onClick={onComplete}
              className={`gap-2 ${
                decision === "approve" || decision === "conditions" ? "bg-emerald-600 hover:bg-emerald-700" :
                decision === "reject" ? "bg-red-600 hover:bg-red-700" :
                ""
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

// ─── Decision Complete ──────────────────────────────────────────

function DecisionComplete() {
  return (
    <div className="space-y-6">
      {/* Approved Banner */}
      <Card className="border-emerald-300 bg-emerald-50/30">
        <CardContent className="pt-6 text-center space-y-3">
          <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto" />
          <h2 className="text-2xl font-bold text-emerald-800">Land Approved</h2>
          <p className="text-sm text-emerald-700">
            Gulshan Plot 07 &middot; Approved by Managing Director &middot; 26 Aug 2026
          </p>
        </CardContent>
      </Card>

      {/* Approved Baseline */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Lock className="h-4 w-4" /> Approved Feasibility Baseline
          </CardTitle>
          <p className="text-xs text-muted-foreground">This baseline is locked and will be compared against actuals at project closure.</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4 text-center">
            {[
              { label: "Land Cost", value: "৳450M" },
              { label: "Development Cost", value: "৳848M" },
              { label: "Expected Revenue", value: "৳1.82B" },
              { label: "Expected Profit", value: "৳350M" },
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

      {/* Open Conditions */}
      <Card className="border-amber-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            Open Approval Conditions
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
                <TableCell className="font-medium">Mutation correction</TableCell>
                <TableCell>Legal</TableCell>
                <TableCell>30 Aug 2026</TableCell>
                <TableCell className="text-muted-foreground">Registration</TableCell>
                <TableCell><Badge variant="outline" className="text-[10px]">Open</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Foundation estimate validation</TableCell>
                <TableCell>Engineering</TableCell>
                <TableCell>28 Aug 2026</TableCell>
                <TableCell className="text-muted-foreground">Project Baseline</TableCell>
                <TableCell><Badge variant="outline" className="text-[10px]">Open</Badge></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Next Steps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm">Proceed with land acquisition. The Acquisition tab is now unlocked.</p>
          <div className="flex gap-3">
            <Link href="/real-estate/land-leads/LL-2026-001">
              <Button variant="outline" className="gap-2">
                <ChevronLeft className="h-4 w-4" /> Back to Workspace
              </Button>
            </Link>
            <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700">
              Start Acquisition <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Info */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardContent className="pt-4 flex gap-3">
          <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800">
            All prior stages (Assessment, Feasibility) are now read-only. The approved feasibility baseline
            is locked and will be compared against actual results at project closure. Open conditions remain
            visible on the workspace until resolved.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
