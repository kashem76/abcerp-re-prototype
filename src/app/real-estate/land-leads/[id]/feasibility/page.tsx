"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  ChevronLeft, TrendingUp, ArrowRight, AlertTriangle, CheckCircle2,
  Clock, Circle, ChevronRight, ArrowLeft, FileText,
  DollarSign,
} from "lucide-react";

// ─── Mock Data ─────────────────────────────────────────────────

interface DeptAssessment {
  id: string;
  department: string;
  score: number;
  result: string;
  resultColor: string;
  status: "signed-off" | "in-review" | "in-progress" | "not-started" | "waiting";
  summary: string;
  headComment: string;
  headName: string;
  signOffDate: string;
  criteriaScores: { name: string; score: string }[];
  keyFindings: string[];
  costEstimate?: string;
  costBenchmark?: string;
  costVariance?: string;
}

const departments: DeptAssessment[] = [
  {
    id: "land-site", department: "Land & Site", score: 90, result: "Proceed", resultColor: "bg-emerald-100 text-emerald-800",
    status: "signed-off", summary: "Site is well-located with good road access and utilities. Buildable area of 24,800 sqft after setbacks.",
    headComment: "Strong location. Proceed with confidence.", headName: "BD Head", signOffDate: "14 Aug",
    criteriaScores: [
      { name: "Location Suitability", score: "5/5" }, { name: "Road Access & Width", score: "5/5" },
      { name: "Neighborhood Character", score: "4/5" }, { name: "Land Shape", score: "4/5" },
      { name: "Surrounding Development", score: "4/5" }, { name: "Owner Information", score: "Pass" },
    ],
    keyFindings: ["Good road access (40ft)", "Utilities available within 200m"],
  },
  {
    id: "legal", department: "Legal", score: 74, result: "Conditional", resultColor: "bg-amber-100 text-amber-800",
    status: "signed-off", summary: "Ownership verified. Mutation record requires correction before registration. No active litigation.",
    headComment: "Title is clean but mutation correction is mandatory before registration.", headName: "Head of Legal", signOffDate: "18 Aug",
    criteriaScores: [
      { name: "Ownership Verification", score: "Pass" }, { name: "Chain of Title", score: "Pass" },
      { name: "Encumbrance Check", score: "Pass" }, { name: "Mutation Verification", score: "Fail" },
      { name: "Litigation Search", score: "Pass" }, { name: "Seller Authority", score: "Pass" },
      { name: "Power of Attorney", score: "N/A" }, { name: "Succession Certificate", score: "Pending" },
      { name: "Govt Acquisition Notice", score: "Pass" },
    ],
    keyFindings: ["Mutation record needs correction", "Succession certificate pending for one co-owner"],
  },
  {
    id: "engineering", department: "Engineering", score: 78, result: "Conditional", resultColor: "bg-amber-100 text-amber-800",
    status: "signed-off", summary: "Site is technically suitable. Pile foundation expected. Access constraints require planning.",
    headComment: "Technically viable subject to detailed geotechnical verification.", headName: "Chief Engineer", signOffDate: "22 Aug",
    criteriaScores: [
      { name: "Site Accessibility", score: "4/5" }, { name: "Existing Condition", score: "4/5" },
      { name: "Topography", score: "4/5" }, { name: "Soil Condition", score: "3/5" },
      { name: "Buildable Area", score: "5/5" }, { name: "Utility Availability", score: "4/5" },
      { name: "Foundation Requirement", score: "3/5" }, { name: "Construction Constraints", score: "3/5" },
      { name: "Construction Approach", score: "4/5" }, { name: "Construction Duration", score: "4/5" },
      { name: "Technical Risk", score: "3/5" },
    ],
    keyFindings: ["Pile foundation likely required", "Access road manageable with planning", "Estimated 30-34 months construction"],
    costEstimate: "৳716M", costBenchmark: "৳670M", costVariance: "+6.9%",
  },
  {
    id: "regulatory", department: "Regulatory", score: 84, result: "Proceed", resultColor: "bg-emerald-100 text-emerald-800",
    status: "signed-off", summary: "Zoning compliant. FAR 6.5 allows 14-floor development. No environmental restrictions.",
    headComment: "No regulatory barriers. Standard RAJUK process applies.", headName: "Planning Head", signOffDate: "21 Aug",
    criteriaScores: [
      { name: "Zoning Compliance", score: "Pass" }, { name: "FAR / Coverage", score: "6.5 FAR" },
      { name: "Height Restriction", score: "14 floors" }, { name: "Environmental", score: "Pass" },
      { name: "RAJUK Approval", score: "Standard" }, { name: "Road Widening", score: "None" },
    ],
    keyFindings: ["No regulatory barriers identified"],
  },
  {
    id: "market", department: "Marketing", score: 88, result: "Proceed", resultColor: "bg-emerald-100 text-emerald-800",
    status: "signed-off", summary: "Strong demand for premium residential. Comparable projects achieving ৳11,500-13,000/sqft.",
    headComment: "Market conditions are favorable. Recommend premium positioning.", headName: "Marketing Head", signOffDate: "19 Aug",
    criteriaScores: [
      { name: "Market Demand", score: "5/5" }, { name: "Expected Selling Price", score: "৳12,000" },
      { name: "Competitive Supply", score: "4/5" }, { name: "Price Trend", score: "4/5" },
      { name: "Target Demographic", score: "5/5" }, { name: "Infrastructure Dev", score: "4/5" },
      { name: "Comparable Projects", score: "4/5" }, { name: "Marketing Complexity", score: "4/5" },
    ],
    keyFindings: ["Strong premium demand", "৳12,000/sqft achievable", "3 comparable projects in 1km"],
  },
  {
    id: "sales", department: "Sales", score: 85, result: "Proceed", resultColor: "bg-emerald-100 text-emerald-800",
    status: "signed-off", summary: "Sales velocity 8 units/quarter. Strong pre-sales potential given location.",
    headComment: "Good absorption expected. Standard payment plan will work.", headName: "Sales Head", signOffDate: "22 Aug",
    criteriaScores: [
      { name: "Sales Velocity", score: "8 units/qtr" }, { name: "Pre-Sales Potential", score: "5/5" },
      { name: "Payment Plan", score: "4/5" }, { name: "Customer Profile", score: "4/5" },
      { name: "Competition Impact", score: "3/5" },
    ],
    keyFindings: ["8 units/quarter velocity estimate", "Strong pre-sales potential"],
  },
  {
    id: "cost", department: "Cost Estimate", score: 80, result: "Proceed", resultColor: "bg-emerald-100 text-emerald-800",
    status: "signed-off", summary: "Total development cost ৳848M. Construction cost ৳716M is 6.9% above company benchmark.",
    headComment: "Cost is within acceptable range given pile foundation requirement.", headName: "CFO", signOffDate: "24 Aug",
    criteriaScores: [],
    keyFindings: ["Construction cost +6.9% above benchmark", "Pile foundation adds ~৳46M"],
    costEstimate: "৳716M", costBenchmark: "৳670M", costVariance: "+6.9%",
  },
  {
    id: "financial", department: "Financial", score: 82, result: "Proceed", resultColor: "bg-emerald-100 text-emerald-800",
    status: "signed-off", summary: "IRR 20.8% exceeds 15% minimum. Margin 19.2%. Payback 4.4 years.",
    headComment: "Financially viable. Recommend standard financing structure.", headName: "CFO", signOffDate: "24 Aug",
    criteriaScores: [
      { name: "IRR", score: "20.8%" }, { name: "Net Margin", score: "19.2%" },
      { name: "Payback Period", score: "4.4 yrs" }, { name: "Peak Funding", score: "৳680M" },
      { name: "Break-Even", score: "42 units" }, { name: "Finance Cost Sensitivity", score: "3/5" },
    ],
    keyFindings: ["IRR exceeds 15% threshold", "Peak funding ৳680M manageable"],
  },
];

const allFindings = [
  { severity: "Medium" as const, text: "Pile foundation likely required — cost +6.9%", dept: "Engineering" },
  { severity: "Medium" as const, text: "Mutation record correction required", dept: "Legal" },
  { severity: "Medium" as const, text: "Access road constraints during piling", dept: "Engineering" },
  { severity: "Low" as const, text: "Limited site storage area", dept: "Engineering" },
  { severity: "Low" as const, text: "Succession certificate pending", dept: "Legal" },
  { severity: "Low" as const, text: "Selling price sensitivity to market", dept: "Marketing" },
  { severity: "Low" as const, text: "Competition from 3 nearby projects", dept: "Marketing" },
];

const riskItems: { level: string; title: string; dept: string; owner: string; status: string }[] = [
  { level: "Medium", title: "Foundation cost uncertainty", dept: "Engineering", owner: "Eng. Karim", status: "Open" },
  { level: "Medium", title: "Mutation documentation delay", dept: "Legal", owner: "Adv. Rahman", status: "Open" },
  { level: "Low", title: "Sales price sensitivity", dept: "Marketing", owner: "Nadia", status: "Monitoring" },
];

const statusCfg: Record<string, { icon: typeof CheckCircle2; color: string; label: string }> = {
  "signed-off": { icon: CheckCircle2, color: "text-emerald-600", label: "Signed Off" },
  "in-review": { icon: Clock, color: "text-amber-600", label: "In Review" },
  "in-progress": { icon: Clock, color: "text-blue-600", label: "In Progress" },
  "not-started": { icon: Circle, color: "text-gray-400", label: "Not Started" },
  "waiting": { icon: Clock, color: "text-gray-400", label: "Waiting" },
};

// ─── Component ─────────────────────────────────────────────────

export default function EvaluationOverviewPage() {
  const [drillDept, setDrillDept] = useState<DeptAssessment | null>(null);

  if (drillDept) return <DepartmentDrillIn dept={drillDept} onBack={() => setDrillDept(null)} />;

  const signedOff = departments.filter((d) => d.status === "signed-off").length;
  const scored = departments.filter((d) => d.score > 0);
  const overallScore = scored.length > 0 ? Math.round(scored.reduce((s, d) => s + d.score, 0) / scored.length) : 0;
  const resultLabel = overallScore >= 85 ? "Strongly Recommended" : overallScore >= 75 ? "Recommended" : overallScore >= 60 ? "Conditional" : "Not Recommended";

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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Evaluation Overview</h1>
              <p className="text-sm text-muted-foreground">
                {departments.length} departments &middot; {signedOff} signed off &middot; {departments.length - signedOff} remaining
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Progress value={(signedOff / departments.length) * 100} className="h-2 w-28" />
            <span className="text-sm font-medium">{Math.round((signedOff / departments.length) * 100)}%</span>
          </div>
        </div>
      </div>

      {/* Overall Score */}
      <Card className="border-purple-200">
        <CardContent className="py-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Overall Score</p>
              <p className="text-4xl font-bold mt-1">{overallScore} <span className="text-lg text-muted-foreground font-normal">/ 100</span></p>
            </div>
            <div className="text-right space-y-1">
              <Badge className="bg-blue-100 text-blue-800 text-sm px-3 py-1">{resultLabel}</Badge>
              <p className="text-xs text-muted-foreground">
                {allFindings.filter((f) => f.severity === "Medium").length} important findings &middot; 0 critical failures
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Department Assessments Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Department Assessments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department</TableHead>
                <TableHead className="text-center w-16">Score</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departments.map((dept) => {
                const cfg = statusCfg[dept.status];
                const Icon = cfg.icon;
                return (
                  <TableRow
                    key={dept.id}
                    className={dept.score > 0 ? "cursor-pointer hover:bg-muted/50" : ""}
                    onClick={() => dept.score > 0 && setDrillDept(dept)}
                  >
                    <TableCell className="font-medium text-sm">{dept.department}</TableCell>
                    <TableCell className="text-center">
                      {dept.score > 0 ? (
                        <span className="font-semibold">{dept.score}</span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {dept.result !== "—" ? (
                        <Badge className={`${dept.resultColor} text-[10px]`}>{dept.result}</Badge>
                      ) : (
                        <span className="text-sm text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className={`flex items-center gap-1.5 text-sm ${cfg.color}`}>
                        <Icon className="h-3.5 w-3.5" /> {cfg.label}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {dept.score > 0 && (
                        <Button variant="ghost" size="sm" className="text-xs gap-1">
                          Details <ChevronRight className="h-3 w-3" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Key Findings */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              Key Findings
              <Badge variant="secondary" className="text-[10px]">{allFindings.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex gap-4 text-xs mb-3">
              <span className="text-red-600 font-medium">0 Critical</span>
              <span className="text-amber-600 font-medium">{allFindings.filter((f) => f.severity === "Medium").length} Important</span>
              <span className="text-muted-foreground">{allFindings.filter((f) => f.severity === "Low").length} Advisory</span>
            </div>
            {allFindings.map((f, i) => (
              <div key={i} className="flex items-start gap-2.5 text-sm py-1">
                <div className={`h-2 w-2 rounded-full mt-1.5 shrink-0 ${
                  f.severity === "Medium" ? "bg-amber-500" : "bg-gray-300"
                }`} />
                <div className="flex-1">
                  <p>{f.text}</p>
                  <p className="text-[11px] text-muted-foreground">{f.dept}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Risk Register */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              Key Risks
              <Badge variant="secondary" className="text-[10px]">{riskItems.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {riskItems.map((risk, i) => (
              <div key={i} className="flex items-center gap-3 p-3 border rounded-lg">
                <Badge className={
                  risk.level === "High" ? "bg-red-100 text-red-800" :
                  risk.level === "Medium" ? "bg-amber-100 text-amber-800" :
                  "bg-gray-100 text-gray-700"
                }>{risk.level}</Badge>
                <div className="flex-1">
                  <p className="text-sm font-medium">{risk.title}</p>
                  <p className="text-xs text-muted-foreground">{risk.dept} &middot; {risk.owner}</p>
                </div>
                <Badge variant="outline" className="text-[10px]">{risk.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Preliminary Cost Summary */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Preliminary Cost Summary</CardTitle>
            <Link href="/real-estate/land-leads/LL-2026-001/feasibility/financial">
              <Button variant="ghost" size="sm" className="text-xs gap-1 text-muted-foreground">
                Financial Model <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            {[
              { label: "Construction", value: "৳716M", sub: "+6.9% vs benchmark" },
              { label: "Site / External", value: "৳54M", sub: "" },
              { label: "Professional", value: "৳38M", sub: "" },
              { label: "Contingency", value: "৳40M", sub: "5% of subtotal" },
              { label: "Total Dev Cost", value: "৳848M", sub: "৳3,420/sqft", bold: true },
            ].map((item) => (
              <div key={item.label}>
                <p className={`text-lg ${item.bold ? "font-bold" : "font-semibold"}`}>{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.label}</p>
                {item.sub && <p className="text-[11px] text-amber-600 mt-0.5">{item.sub}</p>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Navigation Footer */}
      <div className="flex justify-between">
        <Link href="/real-estate/land-leads/LL-2026-001/feasibility/financial">
          <Button variant="outline" className="gap-2">
            <DollarSign className="h-4 w-4" /> Financial Model
          </Button>
        </Link>
        <Link href="/real-estate/land-leads/LL-2026-001/decision">
          <Button className="gap-2">
            Decision <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

// ─── Department Drill-In ────────────────────────────────────────

function DepartmentDrillIn({ dept, onBack }: { dept: DeptAssessment; onBack: () => void }) {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Evaluation Overview
        </button>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{dept.department} Assessment</h1>
          <div className="flex items-center gap-3">
            <Badge className={`${dept.resultColor} text-xs px-3 py-1`}>{dept.result}</Badge>
            <span className="text-lg font-bold">{dept.score}/100</span>
          </div>
        </div>
        {dept.status === "signed-off" && (
          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3 text-emerald-600" />
            Signed off by {dept.headName} &middot; {dept.signOffDate}
          </p>
        )}
      </div>

      {/* Summary */}
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm">Summary</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm">{dept.summary}</p>
        </CardContent>
      </Card>

      {/* Criteria Scores */}
      {dept.criteriaScores.length > 0 && (
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Assessment Scores</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-1.5">
              {dept.criteriaScores.map((c) => {
                const isPass = c.score === "Pass" || c.score.startsWith("5") || c.score.startsWith("4");
                const isFail = c.score === "Fail";
                const isWarn = c.score.startsWith("3") || c.score === "Pending";
                return (
                  <div key={c.name} className="flex items-center justify-between text-sm py-1.5 px-2 rounded hover:bg-muted/50">
                    <span>{c.name}</span>
                    <span className={`font-medium ${
                      isFail ? "text-red-600" : isPass ? "text-emerald-600" : isWarn ? "text-amber-600" : "text-muted-foreground"
                    }`}>{c.score}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Key Findings */}
      {dept.keyFindings.length > 0 && (
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Key Findings</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-1.5">
              {dept.keyFindings.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Cost Benchmark (Engineering / Cost depts) */}
      {dept.costEstimate && (
        <Card className="border-amber-200">
          <CardHeader className="pb-2"><CardTitle className="text-sm">Cost vs Benchmark</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xl font-bold">{dept.costEstimate}</p>
                <p className="text-xs text-muted-foreground">Estimate</p>
              </div>
              <div>
                <p className="text-xl font-bold">{dept.costBenchmark}</p>
                <p className="text-xs text-muted-foreground">Company Benchmark</p>
              </div>
              <div>
                <p className="text-xl font-bold text-amber-600">{dept.costVariance}</p>
                <p className="text-xs text-muted-foreground">Variance</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Head Comment */}
      {dept.headComment && (
        <Card className="bg-slate-50/50">
          <CardContent className="py-4">
            <p className="text-sm italic">&ldquo;{dept.headComment}&rdquo;</p>
            <p className="text-xs text-muted-foreground mt-2">{dept.headName} &middot; {dept.signOffDate}</p>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <Link href={`/real-estate/land-leads/LL-2026-001/work/${dept.id}`}>
          <Button variant="outline" className="gap-1 text-sm">
            <FileText className="h-4 w-4" /> View Full Assessment
          </Button>
        </Link>
      </div>
    </div>
  );
}
