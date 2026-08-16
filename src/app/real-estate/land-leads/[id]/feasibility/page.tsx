"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  ChevronLeft, TrendingUp, ArrowRight, AlertTriangle, CheckCircle2,
  Clock, Circle, ChevronRight, ArrowLeft, Shield, FileText,
  DollarSign, Info,
} from "lucide-react";
import { formatBDT } from "@/lib/mock-data";
import { WorkspaceNav } from "@/components/real-estate/workspace-nav";

// ─── Mock Data ─────────────────────────────────────────────────

interface DeptAssessment {
  department: string;
  score: number;
  result: string;
  resultColor: string;
  status: "signed-off" | "in-review" | "in-progress" | "not-started";
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
    department: "Land & Site", score: 86, result: "Proceed", resultColor: "bg-emerald-100 text-emerald-800",
    status: "signed-off", summary: "Site is well-located with good road access and utilities. Buildable area of 24,800 sqft after setbacks.",
    headComment: "Strong location. Proceed with confidence.", headName: "BD Head", signOffDate: "14 Aug 2026",
    criteriaScores: [
      { name: "Site Accessibility", score: "4/5" }, { name: "Site Condition", score: "4/5" },
      { name: "Topography", score: "4/5" }, { name: "Buildable Area", score: "5/5" },
      { name: "Utility Availability", score: "4/5" }, { name: "Road Access", score: "5/5" },
    ],
    keyFindings: ["Good road access (40ft)", "Utilities available within 200m"],
  },
  {
    department: "Legal", score: 74, result: "Proceed w/ Conditions", resultColor: "bg-amber-100 text-amber-800",
    status: "signed-off", summary: "Ownership substantially verified. Mutation record requires correction before registration. No active litigation found.",
    headComment: "Title is clean but mutation correction is mandatory before any registration.", headName: "Head of Legal", signOffDate: "18 Aug 2026",
    criteriaScores: [
      { name: "Ownership Verification", score: "Pass" }, { name: "Chain of Title", score: "Pass" },
      { name: "Encumbrance Check", score: "Pass" }, { name: "Mutation Verification", score: "Fail" },
      { name: "Litigation Search", score: "Pass" }, { name: "Seller Authority", score: "Pass" },
      { name: "Power of Attorney", score: "N/A" }, { name: "Succession Certificate", score: "N/A" },
      { name: "Govt Acquisition Notice", score: "Pass" },
    ],
    keyFindings: ["Mutation record needs correction", "One owner's succession certificate pending"],
  },
  {
    department: "Engineering", score: 78, result: "Proceed w/ Conditions", resultColor: "bg-amber-100 text-amber-800",
    status: "signed-off", summary: "Site is technically suitable. Pile foundation is expected. Access constraints require planning during construction.",
    headComment: "Technically viable subject to detailed geotechnical verification.", headName: "Chief Engineer", signOffDate: "22 Aug 2026",
    criteriaScores: [
      { name: "Site Accessibility", score: "4/5" }, { name: "Existing Site Condition", score: "4/5" },
      { name: "Topography", score: "4/5" }, { name: "Soil Condition", score: "3/5" },
      { name: "Buildable Area", score: "5/5" }, { name: "Utility Availability", score: "4/5" },
      { name: "Foundation Requirement", score: "3/5" }, { name: "Construction Constraints", score: "3/5" },
      { name: "Preliminary Cost", score: "3/5" }, { name: "Construction Duration", score: "4/5" },
      { name: "Technical Risk", score: "3/5" },
    ],
    keyFindings: ["Pile foundation likely required", "Site access acceptable with constraints", "Estimated construction: 30-34 months"],
    costEstimate: "৳716M", costBenchmark: "৳670M", costVariance: "+6.9%",
  },
  {
    department: "Marketing", score: 88, result: "Proceed", resultColor: "bg-emerald-100 text-emerald-800",
    status: "signed-off", summary: "Strong demand for premium residential units in Gulshan area. Comparable projects achieving ৳11,500-13,000/sqft.",
    headComment: "Market conditions are favorable. Recommend premium positioning.", headName: "Marketing Head", signOffDate: "19 Aug 2026",
    criteriaScores: [
      { name: "Market Demand", score: "5/5" }, { name: "Competitive Supply", score: "4/5" },
      { name: "Expected Selling Price", score: "4/5" }, { name: "Price Trend", score: "4/5" },
      { name: "Target Demographic", score: "5/5" }, { name: "Infrastructure Dev", score: "4/5" },
      { name: "Comparable Projects", score: "4/5" }, { name: "Marketing Complexity", score: "4/5" },
    ],
    keyFindings: ["Strong demand for premium residential", "Average ৳12,000/sqft achievable", "3 comparable projects in 1km radius"],
  },
  {
    department: "Sales", score: 84, result: "Proceed", resultColor: "bg-emerald-100 text-emerald-800",
    status: "in-review", summary: "Estimated sales velocity of 8 units per quarter. Pre-sales potential is strong given location and market demand.",
    headComment: "", headName: "Sales Head", signOffDate: "",
    criteriaScores: [
      { name: "Sales Velocity", score: "4/5" }, { name: "Pre-Sales Potential", score: "5/5" },
      { name: "Payment Plan", score: "4/5" }, { name: "Customer Profile", score: "4/5" },
      { name: "Competition Impact", score: "3/5" },
    ],
    keyFindings: ["8 units/quarter velocity estimate", "Strong pre-sales potential"],
  },
  {
    department: "Finance", score: 0, result: "—", resultColor: "bg-gray-100 text-gray-500",
    status: "in-progress", summary: "", headComment: "", headName: "CFO", signOffDate: "",
    criteriaScores: [], keyFindings: [],
  },
];

const allFindings = [
  { severity: "Medium" as const, text: "Pile foundation likely required", dept: "Engineering" },
  { severity: "Medium" as const, text: "Mutation record needs correction", dept: "Legal" },
  { severity: "Medium" as const, text: "Access road constraints during piling", dept: "Engineering" },
  { severity: "Low" as const, text: "Limited site storage area", dept: "Engineering" },
  { severity: "Low" as const, text: "One succession certificate pending", dept: "Legal" },
  { severity: "Low" as const, text: "Sales price sensitivity to market shifts", dept: "Marketing" },
  { severity: "Low" as const, text: "Competition from 3 nearby projects", dept: "Marketing" },
];

const risks = [
  { level: "Medium", title: "Foundation cost uncertainty", dept: "Engineering", owner: "Eng. Karim" },
  { level: "Medium", title: "Mutation documentation", dept: "Legal", owner: "Adv. Rahman" },
  { level: "Low", title: "Sales price sensitivity", dept: "Marketing", owner: "Nadia" },
];

const statusIcon = {
  "signed-off": CheckCircle2,
  "in-review": Clock,
  "in-progress": Circle,
  "not-started": Circle,
};

const statusColor = {
  "signed-off": "text-emerald-600",
  "in-review": "text-amber-600",
  "in-progress": "text-blue-600",
  "not-started": "text-gray-400",
};

const statusLabel = {
  "signed-off": "Signed Off",
  "in-review": "In Review",
  "in-progress": "In Progress",
  "not-started": "Not Started",
};

// ─── Component ─────────────────────────────────────────────────

export default function FeasibilityPage() {
  const [drillDept, setDrillDept] = useState<DeptAssessment | null>(null);

  if (drillDept) {
    return <DepartmentDrillIn dept={drillDept} onBack={() => setDrillDept(null)} />;
  }

  const completeDepts = departments.filter((d) => d.status === "signed-off").length;
  const activeDepts = departments.filter((d) => d.status !== "not-started").length;
  const overallScore = Math.round(
    departments.filter((d) => d.score > 0).reduce((s, d) => s + d.score, 0) /
    departments.filter((d) => d.score > 0).length
  );

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
            <TrendingUp className="h-7 w-7 text-purple-600" />
            <div>
              <h1 className="text-2xl font-bold">Evaluation Overview</h1>
              <p className="text-muted-foreground">
                {activeDepts} departments &middot; {completeDepts} complete &middot; {activeDepts - completeDepts} in progress
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Progress value={(completeDepts / departments.length) * 100} className="h-2 w-32" />
            <span className="text-sm font-medium">{Math.round((completeDepts / departments.length) * 100)}%</span>
          </div>
        </div>
      </div>

      {/* Workspace Navigation */}
      <WorkspaceNav active="evaluation" />

      {/* Overall Assessment */}
      <Card className="border-purple-200">
        <CardContent className="pt-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Current Score</p>
              <p className="text-4xl font-bold mt-1">{overallScore} <span className="text-lg text-muted-foreground">/ 100</span></p>
            </div>
            <div className="text-right">
              <Badge className="bg-blue-100 text-blue-800 text-sm px-3 py-1">Recommended</Badge>
              <p className="text-xs text-muted-foreground mt-2">No critical failures</p>
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
                <TableHead className="text-center">Score</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departments.map((dept) => {
                const Icon = statusIcon[dept.status];
                return (
                  <TableRow key={dept.department} className="cursor-pointer hover:bg-muted/50" onClick={() => dept.score > 0 && setDrillDept(dept)}>
                    <TableCell className="font-medium">{dept.department}</TableCell>
                    <TableCell className="text-center">
                      {dept.score > 0 ? <span className="font-semibold">{dept.score}</span> : <span className="text-muted-foreground">—</span>}
                    </TableCell>
                    <TableCell>
                      {dept.result !== "—" ? (
                        <Badge className={`${dept.resultColor} text-[10px]`}>{dept.result}</Badge>
                      ) : (
                        <span className="text-muted-foreground text-sm">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className={`flex items-center gap-1.5 text-sm ${statusColor[dept.status]}`}>
                        <Icon className="h-3.5 w-3.5" /> {statusLabel[dept.status]}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {dept.score > 0 && (
                        <Button variant="ghost" size="sm" className="text-xs gap-1">
                          View <ChevronRight className="h-3 w-3" />
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
            <div className="flex gap-4 text-xs text-muted-foreground mb-3">
              <span className="text-red-600">0 Critical</span>
              <span className="text-amber-600">{allFindings.filter((f) => f.severity === "Medium").length} Important</span>
              <span>{allFindings.filter((f) => f.severity === "Low").length} Advisory</span>
            </div>
            {allFindings.map((f, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <div className={`h-2 w-2 rounded-full mt-1.5 shrink-0 ${
                  f.severity === "Medium" ? "bg-amber-500" : "bg-gray-300"
                }`} />
                <div>
                  <p>{f.text}</p>
                  <p className="text-xs text-muted-foreground">{f.dept}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" className="text-xs mt-2">View All Findings</Button>
          </CardContent>
        </Card>

        {/* Risk Register */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              Key Risks
              <Badge variant="secondary" className="text-[10px]">{risks.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {risks.map((risk, i) => (
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
              </div>
            ))}
            <Button variant="outline" size="sm" className="text-xs">Risk Register</Button>
          </CardContent>
        </Card>
      </div>

      {/* Preliminary Cost */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Preliminary Cost</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: "Construction", value: "৳716M" },
              { label: "Site / External", value: "৳54M" },
              { label: "Professional / Other", value: "৳38M" },
              { label: "Contingency", value: "৳40M" },
              { label: "Total Development Cost", value: "৳848M", bold: true },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className={`text-lg ${item.bold ? "font-bold" : "font-semibold"}`}>{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <Link href="/real-estate/land-leads/LL-2026-001/feasibility/financial">
              <Button variant="outline" size="sm" className="gap-1">
                View Financial Model <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
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
      <div>
        <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-2">
          <ArrowLeft className="h-4 w-4" /> Evaluation Overview
        </button>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{dept.department} Assessment</h1>
          <Badge className={`${dept.resultColor} text-sm px-3 py-1`}>{dept.result}</Badge>
        </div>
        <p className="text-muted-foreground mt-1">Score: {dept.score} / 100</p>
      </div>

      {/* Summary */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{dept.summary}</p>
        </CardContent>
      </Card>

      {/* Criteria Scores */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Assessment Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {dept.criteriaScores.map((c) => (
              <div key={c.name} className="flex items-center justify-between text-sm py-1">
                <span>{c.name}</span>
                <span className={`font-medium ${
                  c.score === "Pass" ? "text-emerald-600" :
                  c.score === "Fail" ? "text-red-600" :
                  c.score.startsWith("5") || c.score.startsWith("4") ? "text-emerald-600" :
                  c.score.startsWith("3") ? "text-amber-600" :
                  "text-muted-foreground"
                }`}>{c.score}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Findings */}
      {dept.keyFindings.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Key Findings</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {dept.keyFindings.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Cost (Engineering) */}
      {dept.costEstimate && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Preliminary Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xl font-bold">{dept.costEstimate}</p>
                <p className="text-xs text-muted-foreground">Estimated Cost</p>
              </div>
              <div>
                <p className="text-xl font-bold">{dept.costBenchmark}</p>
                <p className="text-xs text-muted-foreground">Historical Benchmark</p>
              </div>
              <div>
                <p className="text-xl font-bold text-amber-600">{dept.costVariance}</p>
                <p className="text-xs text-muted-foreground">Variance</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Department Head Comment */}
      {dept.headComment && (
        <Card className="border-slate-300">
          <CardContent className="pt-5">
            <p className="text-sm italic">&ldquo;{dept.headComment}&rdquo;</p>
            <p className="text-xs text-muted-foreground mt-2">{dept.headName} &middot; {dept.signOffDate}</p>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <Link href={`/real-estate/land-leads/LL-2026-001/work/${dept.department.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}>
          <Button variant="outline" className="gap-1">
            <FileText className="h-4 w-4" /> Supporting Evidence
          </Button>
        </Link>
        <Link href={`/real-estate/land-leads/LL-2026-001/work/${dept.department.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}>
          <Button variant="outline" className="gap-1">
            Full Details <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
