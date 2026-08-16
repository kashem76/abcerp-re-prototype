"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { formatBDT, formatNumber } from "@/lib/mock-data";
import {
  FolderArchive,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  BarChart3,
  UserCheck,
  ArrowLeft,
  Lock,
  FileText,
} from "lucide-react";
import Link from "next/link";

const projectInfo = {
  name: "Bay View Residence",
  code: "RE-00031",
  location: "Patenga, Chattogram",
  totalUnits: 36,
  handedOver: 32,
  pending: 4,
};

const automatedChecks = [
  { check: "Construction WIP Balance", expected: "BDT 0", actual: "BDT 0", value: 0, pass: true },
  { check: "Outstanding AR (Buyer Receivables)", expected: "BDT 0", actual: formatBDT(450000), value: 450000, pass: false },
  { check: "All Units Handed Over", expected: "36 / 36", actual: "32 / 36", value: null, pass: false },
  { check: "Retention Money Released", expected: "All released", actual: "All released", value: 0, pass: true },
  { check: "Defect Liability Period Expired", expected: "Expired", actual: "Expired (2026-06-30)", value: null, pass: true },
  { check: "All Variation Orders Settled", expected: "All settled", actual: "3/3 settled", value: null, pass: true },
  { check: "All Running Bills Finalized", expected: "All finalized", actual: "All finalized", value: null, pass: true },
  { check: "Contractor Final Accounts Closed", expected: "All closed", actual: "All closed", value: null, pass: true },
];

const passCount = automatedChecks.filter((c) => c.pass).length;
const totalChecks = automatedChecks.length;
const canClose = passCount === totalChecks;

const financialSummary = {
  totalRevenue: 540000000,
  totalCost: 385000000,
  grossProfit: 155000000,
  grossMargin: 28.7,
  adminOverhead: 22000000,
  marketingCost: 15000000,
  financeCost: 18000000,
  netProfit: 100000000,
  netMargin: 18.5,
};

const feasibilityComparison = [
  { metric: "Total Revenue", feasibility: 520000000, actual: 540000000, variance: 20000000, pct: 3.8 },
  { metric: "Construction Cost", feasibility: 350000000, actual: 385000000, variance: -35000000, pct: -10.0 },
  { metric: "Land Cost", feasibility: 80000000, actual: 80000000, variance: 0, pct: 0 },
  { metric: "Admin & Overhead", feasibility: 18000000, actual: 22000000, variance: -4000000, pct: -22.2 },
  { metric: "Marketing", feasibility: 12000000, actual: 15000000, variance: -3000000, pct: -25.0 },
  { metric: "Finance Cost", feasibility: 15000000, actual: 18000000, variance: -3000000, pct: -20.0 },
  { metric: "Net Profit", feasibility: 45000000, actual: 100000000, variance: 55000000, pct: 122.2 },
  { metric: "Net Margin", feasibility: null, actual: null, variance: null, pct: null, special: "8.7% → 18.5%" },
];

const signoffs = [
  { department: "Engineering", signatory: "Eng. Rafiq Ahmed", date: "2026-08-05", signed: true },
  { department: "Finance & Accounts", signatory: "Mr. Anwar Hossain", date: "2026-08-08", signed: true },
  { department: "Legal & Compliance", signatory: "Adv. Nasreen Begum", date: "", signed: false },
  { department: "Management / Director", signatory: "Mr. Shafiqul Islam", date: "", signed: false },
];

const finalActions = [
  { action: "Archive project documents", description: "Move all project files to archive storage", status: "READY" },
  { action: "Generate closure report", description: "Auto-generate comprehensive closure PDF", status: "READY" },
  { action: "Transfer remaining balances", description: "Clear any residual GL balances to retained earnings", status: "BLOCKED" },
  { action: "Release project cost codes", description: "Prevent future postings to this project", status: "READY" },
  { action: "Notify stakeholders", description: "Send closure notification to all parties", status: "READY" },
];

const actionStatusColors: Record<string, string> = {
  READY: "bg-emerald-100 text-emerald-800",
  BLOCKED: "bg-red-100 text-red-800",
  DONE: "bg-gray-100 text-gray-600",
};

export default function ProjectClosurePage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/real-estate/projects"
          className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2"
        >
          <ArrowLeft className="h-3 w-3" /> Back to Projects
        </Link>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FolderArchive className="h-6 w-6 text-slate-600" />
          Project Closure Wizard
        </h1>
        <p className="text-gray-500">
          {projectInfo.name} ({projectInfo.code}) — {projectInfo.location} — ABC Properties Ltd
        </p>
      </div>

      {/* Closure Readiness */}
      <Card className={canClose ? "border-emerald-300" : "border-red-300"}>
        <CardContent className="pt-4 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {canClose ? (
                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
              ) : (
                <AlertTriangle className="h-6 w-6 text-red-500" />
              )}
              <div>
                <p className="font-semibold">
                  {canClose
                    ? "Project ready for closure"
                    : "Project cannot be closed yet"}
                </p>
                <p className="text-sm text-gray-500">
                  {passCount} of {totalChecks} checks passed
                </p>
              </div>
            </div>
            <div className="text-right">
              <Progress
                value={(passCount / totalChecks) * 100}
                className="w-48 h-3"
              />
              <p className="text-xs text-gray-400 mt-1">
                {((passCount / totalChecks) * 100).toFixed(0)}% complete
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="checks" className="w-full">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="checks" className="flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" /> Checks
          </TabsTrigger>
          <TabsTrigger value="financial" className="flex items-center gap-1">
            <BarChart3 className="h-3 w-3" /> Financial
          </TabsTrigger>
          <TabsTrigger value="signoffs" className="flex items-center gap-1">
            <UserCheck className="h-3 w-3" /> Sign-offs
          </TabsTrigger>
          <TabsTrigger value="actions" className="flex items-center gap-1">
            <FileText className="h-3 w-3" /> Actions
          </TabsTrigger>
        </TabsList>

        {/* Step 1: Automated Checks */}
        <TabsContent value="checks">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Step 1 — Automated Closure Checks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {automatedChecks.map((check, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-3 rounded border ${
                      check.pass
                        ? "border-emerald-200 bg-emerald-50"
                        : "border-red-200 bg-red-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {check.pass ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 shrink-0" />
                      )}
                      <div>
                        <p className="font-medium text-sm">{check.check}</p>
                        <p className="text-xs text-gray-500">
                          Expected: {check.expected}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-semibold ${check.pass ? "text-emerald-700" : "text-red-700"}`}>
                        {check.actual}
                      </p>
                      <Badge className={check.pass ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}>
                        {check.pass ? "PASS" : "FAIL"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>

              {!canClose && (
                <>
                  <Separator className="my-4" />
                  <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
                    <p className="font-semibold text-amber-800 text-sm flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Items Requiring Resolution
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-amber-700">
                      <li>
                        - Outstanding AR of {formatBDT(450000)} — Collect from remaining buyers or write off
                      </li>
                      <li>
                        - 4 units pending handover — Complete handover process for units B-301, B-302, B-401, B-402
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Step 2: Financial Summary */}
        <TabsContent value="financial">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Step 2 — Financial Summary (Final P&L)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                  <Card className="bg-blue-50">
                    <CardContent className="pt-4 pb-3 text-center">
                      <p className="text-lg font-bold text-blue-700">
                        {formatBDT(financialSummary.totalRevenue)}
                      </p>
                      <p className="text-xs text-gray-500">Total Revenue</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-red-50">
                    <CardContent className="pt-4 pb-3 text-center">
                      <p className="text-lg font-bold text-red-700">
                        {formatBDT(financialSummary.totalCost)}
                      </p>
                      <p className="text-xs text-gray-500">Total Cost</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-emerald-50">
                    <CardContent className="pt-4 pb-3 text-center">
                      <p className="text-lg font-bold text-emerald-700">
                        {formatBDT(financialSummary.grossProfit)}
                      </p>
                      <p className="text-xs text-gray-500">Gross Profit</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-emerald-50">
                    <CardContent className="pt-4 pb-3 text-center">
                      <p className="text-lg font-bold text-emerald-700">
                        {formatBDT(financialSummary.netProfit)}
                      </p>
                      <p className="text-xs text-gray-500">Net Profit</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-indigo-50">
                    <CardContent className="pt-4 pb-3 text-center">
                      <p className="text-lg font-bold text-indigo-700">
                        {financialSummary.netMargin}%
                      </p>
                      <p className="text-xs text-gray-500">Net Margin</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-2 text-sm">
                  {[
                    { label: "Total Revenue", value: financialSummary.totalRevenue },
                    { label: "(-) Construction Cost", value: financialSummary.totalCost, negative: true },
                    { label: "= Gross Profit", value: financialSummary.grossProfit, bold: true },
                    { label: "(-) Admin & Overhead", value: financialSummary.adminOverhead, negative: true },
                    { label: "(-) Marketing Cost", value: financialSummary.marketingCost, negative: true },
                    { label: "(-) Finance Cost", value: financialSummary.financeCost, negative: true },
                    { label: "= Net Profit", value: financialSummary.netProfit, bold: true, highlight: true },
                  ].map((line, i) => (
                    <div
                      key={i}
                      className={`flex justify-between py-1 px-2 rounded ${
                        line.highlight ? "bg-emerald-50" : line.bold ? "bg-gray-50" : ""
                      }`}
                    >
                      <span className={line.bold ? "font-bold" : "text-gray-600"}>
                        {line.label}
                      </span>
                      <span
                        className={`${line.bold ? "font-bold" : ""} ${
                          line.highlight ? "text-emerald-700" : line.negative ? "text-red-600" : ""
                        }`}
                      >
                        {line.negative ? "(" : ""}
                        {formatBDT(line.value)}
                        {line.negative ? ")" : ""}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Feasibility vs Actual Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Metric</TableHead>
                      <TableHead className="text-right">Feasibility (BDT)</TableHead>
                      <TableHead className="text-right">Actual (BDT)</TableHead>
                      <TableHead className="text-right">Variance (BDT)</TableHead>
                      <TableHead className="text-right">Variance %</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {feasibilityComparison.map((row, i) => (
                      <TableRow key={i} className={row.metric === "Net Profit" ? "bg-emerald-50 font-bold" : ""}>
                        <TableCell className="font-medium">{row.metric}</TableCell>
                        <TableCell className="text-right">
                          {row.special ? row.special.split(" → ")[0] : row.feasibility !== null ? formatBDT(row.feasibility) : "—"}
                        </TableCell>
                        <TableCell className="text-right">
                          {row.special ? row.special.split(" → ")[1] : row.actual !== null ? formatBDT(row.actual) : "—"}
                        </TableCell>
                        <TableCell className="text-right">
                          {row.variance !== null ? (
                            <span className={row.variance >= 0 ? "text-emerald-700" : "text-red-600"}>
                              {row.variance >= 0 ? "+" : ""}{formatBDT(Math.abs(row.variance))}
                            </span>
                          ) : "—"}
                        </TableCell>
                        <TableCell className="text-right">
                          {row.pct !== null ? (
                            <Badge className={row.pct >= 0 ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}>
                              {row.pct >= 0 ? "+" : ""}{row.pct.toFixed(1)}%
                            </Badge>
                          ) : (
                            <Badge className="bg-emerald-100 text-emerald-800">+9.8pp</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Step 3: Manual Sign-offs */}
        <TabsContent value="signoffs">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Step 3 — Manual Sign-offs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {signoffs.map((s, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-4 rounded border ${
                      s.signed ? "border-emerald-200 bg-emerald-50" : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        defaultChecked={s.signed}
                        className="h-5 w-5 rounded"
                      />
                      <div>
                        <p className="font-semibold">{s.department}</p>
                        <p className="text-sm text-gray-500">{s.signatory}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Input
                        type="date"
                        className="w-40"
                        defaultValue={s.date || ""}
                        placeholder="Sign date"
                      />
                      {s.signed ? (
                        <Badge className="bg-emerald-100 text-emerald-800">SIGNED</Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-500">PENDING</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-3">
                All department heads must sign off before project can be closed
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Step 4: Final Actions */}
        <TabsContent value="actions">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Step 4 — Final Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {finalActions.map((action, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded border"
                  >
                    <div>
                      <p className="font-medium text-sm">{action.action}</p>
                      <p className="text-xs text-gray-500">{action.description}</p>
                    </div>
                    <Badge className={actionStatusColors[action.status]}>
                      {action.status}
                    </Badge>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />
              <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-start gap-2">
                <Lock className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-red-800">
                    Cannot close project until all checks pass
                  </p>
                  <p className="text-xs text-red-700 mt-1">
                    Resolve outstanding AR ({formatBDT(450000)}) and complete
                    handover for 4 pending units before proceeding.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <Link
          href="/real-estate/projects"
          className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent"
        >
          Back to Projects
        </Link>
        <div className="flex gap-3">
          <Button variant="outline">Save Progress</Button>
          <Button
            disabled={!canClose}
            className={
              canClose
                ? "bg-slate-700 hover:bg-slate-800 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }
          >
            <FolderArchive className="h-4 w-4 mr-2" />
            Close Project
          </Button>
        </div>
      </div>
    </div>
  );
}
