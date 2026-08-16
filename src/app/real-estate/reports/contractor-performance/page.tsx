"use client";

import Link from "next/link";
import { ArrowLeft, HardHat, Star, AlertTriangle, CheckCircle2, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatBDT } from "@/lib/mock-data";

interface Contractor {
  name: string;
  contract: string;
  contractValue: number;
  billedToDate: number;
  percentComplete: number;
  plannedProgress: number;
  budgetActualRatio: number;
  defectsPer100: number;
  safetyIncidents: number;
  onTimeDelivery: number;
  reworkPct: number;
  avgPaymentCycleDays: number;
  overallRating: "A" | "B" | "C" | "D";
}

const contractors: Contractor[] = [
  {
    name: "Rahman Construction Ltd.",
    contract: "RCC Structure (Tower A & B)",
    contractValue: 145_000_000,
    billedToDate: 92_300_000,
    percentComplete: 68,
    plannedProgress: 72,
    budgetActualRatio: 1.04,
    defectsPer100: 2.1,
    safetyIncidents: 1,
    onTimeDelivery: 88,
    reworkPct: 3.2,
    avgPaymentCycleDays: 28,
    overallRating: "B",
  },
  {
    name: "Nasir Piling Co.",
    contract: "Piling & Foundation",
    contractValue: 85_000_000,
    billedToDate: 78_500_000,
    percentComplete: 96,
    plannedProgress: 100,
    budgetActualRatio: 1.02,
    defectsPer100: 0.8,
    safetyIncidents: 0,
    onTimeDelivery: 95,
    reworkPct: 1.1,
    avgPaymentCycleDays: 21,
    overallRating: "A",
  },
  {
    name: "Bengal MEP Solutions",
    contract: "Electrical & Fire Safety",
    contractValue: 65_000_000,
    billedToDate: 18_400_000,
    percentComplete: 32,
    plannedProgress: 35,
    budgetActualRatio: 0.97,
    defectsPer100: 1.5,
    safetyIncidents: 0,
    onTimeDelivery: 92,
    reworkPct: 2.0,
    avgPaymentCycleDays: 25,
    overallRating: "A",
  },
  {
    name: "CTG Plumbing Works",
    contract: "Plumbing & Sanitary",
    contractValue: 48_000_000,
    billedToDate: 12_200_000,
    percentComplete: 28,
    plannedProgress: 38,
    budgetActualRatio: 1.12,
    defectsPer100: 4.5,
    safetyIncidents: 2,
    onTimeDelivery: 72,
    reworkPct: 6.8,
    avgPaymentCycleDays: 35,
    overallRating: "D",
  },
  {
    name: "Elite Interiors",
    contract: "Interior Finishing (Phase 1)",
    contractValue: 42_000_000,
    billedToDate: 15_800_000,
    percentComplete: 42,
    plannedProgress: 45,
    budgetActualRatio: 1.06,
    defectsPer100: 3.2,
    safetyIncidents: 0,
    onTimeDelivery: 85,
    reworkPct: 4.1,
    avgPaymentCycleDays: 30,
    overallRating: "C",
  },
];

const ratingColors: Record<string, string> = {
  A: "bg-green-100 text-green-800 border-green-400",
  B: "bg-blue-100 text-blue-800 border-blue-400",
  C: "bg-yellow-100 text-yellow-800 border-yellow-400",
  D: "bg-red-100 text-red-800 border-red-400",
};

const totalContractValue = contractors.reduce((s, c) => s + c.contractValue, 0);
const totalBilled = contractors.reduce((s, c) => s + c.billedToDate, 0);
const avgOnTime = contractors.reduce((s, c) => s + c.onTimeDelivery, 0) / contractors.length;
const avgRework = contractors.reduce((s, c) => s + c.reworkPct, 0) / contractors.length;
const avgPaymentCycle = Math.round(contractors.reduce((s, c) => s + c.avgPaymentCycleDays, 0) / contractors.length);

export default function ContractorPerformancePage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/real-estate/reports"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-3"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Reports
        </Link>
        <div className="flex items-center gap-3">
          <HardHat className="h-7 w-7 text-amber-600" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Contractor Performance Report
            </h1>
            <p className="text-muted-foreground">
              ABC Nasirabad Heights — As at 12 Aug 2026
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Contractors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contractors.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Contract Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{formatBDT(totalContractValue)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg On-Time Delivery
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${avgOnTime >= 85 ? "text-green-700" : "text-yellow-700"}`}>
              {avgOnTime.toFixed(0)}%
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Rework Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${avgRework <= 3 ? "text-green-700" : "text-yellow-700"}`}>
              {avgRework.toFixed(1)}%
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Payment Cycle
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgPaymentCycle} days</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table */}
      <Card>
        <CardHeader>
          <CardTitle>Contractor Performance Scorecard</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contractor</TableHead>
                <TableHead>Contract</TableHead>
                <TableHead className="text-right">Contract Value</TableHead>
                <TableHead className="text-right">Billed to Date</TableHead>
                <TableHead className="text-center">% Complete</TableHead>
                <TableHead className="text-center">Schedule</TableHead>
                <TableHead className="text-center">Cost Perf.</TableHead>
                <TableHead className="text-center">Quality</TableHead>
                <TableHead className="text-center">Safety</TableHead>
                <TableHead className="text-center">Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contractors.map((c) => {
                const scheduleAdherence = ((c.percentComplete / c.plannedProgress) * 100);
                return (
                  <TableRow key={c.name} className={c.overallRating === "D" ? "bg-red-50/50" : ""}>
                    <TableCell className="font-medium">{c.name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{c.contract}</TableCell>
                    <TableCell className="text-right font-mono">{formatBDT(c.contractValue)}</TableCell>
                    <TableCell className="text-right font-mono">{formatBDT(c.billedToDate)}</TableCell>
                    <TableCell className="text-center">
                      <div className="space-y-1">
                        <span className="text-sm font-semibold">{c.percentComplete}%</span>
                        <Progress value={c.percentComplete} className="h-1.5" />
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className={scheduleAdherence >= 95 ? "bg-green-50 text-green-700" : scheduleAdherence >= 85 ? "bg-yellow-50 text-yellow-700" : "bg-red-50 text-red-700"}
                      >
                        {c.percentComplete}% / {c.plannedProgress}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className={c.budgetActualRatio <= 1.0 ? "bg-green-50 text-green-700" : c.budgetActualRatio <= 1.05 ? "bg-yellow-50 text-yellow-700" : "bg-red-50 text-red-700"}
                      >
                        {c.budgetActualRatio.toFixed(2)}x
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className={c.defectsPer100 <= 2 ? "bg-green-50 text-green-700" : c.defectsPer100 <= 3.5 ? "bg-yellow-50 text-yellow-700" : "bg-red-50 text-red-700"}
                      >
                        {c.defectsPer100}/100
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {c.safetyIncidents === 0 ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          <Shield className="h-3 w-3 mr-1" />0
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-red-50 text-red-700">
                          <AlertTriangle className="h-3 w-3 mr-1" />{c.safetyIncidents}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className={`text-lg font-bold ${ratingColors[c.overallRating]}`}>
                        {c.overallRating}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Performance Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contractor</TableHead>
                <TableHead className="text-center">On-Time Delivery %</TableHead>
                <TableHead className="text-center">Rework %</TableHead>
                <TableHead className="text-center">Avg Payment Cycle</TableHead>
                <TableHead className="text-center">Defects / 100 Units</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contractors.map((c) => (
                <TableRow key={c.name}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Progress
                        value={c.onTimeDelivery}
                        className={`h-2 w-20 ${c.onTimeDelivery >= 90 ? "[&>div]:bg-green-500" : c.onTimeDelivery >= 80 ? "[&>div]:bg-yellow-500" : "[&>div]:bg-red-500"}`}
                      />
                      <span className="text-sm font-mono">{c.onTimeDelivery}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant="outline"
                      className={c.reworkPct <= 2 ? "bg-green-50 text-green-700" : c.reworkPct <= 4 ? "bg-yellow-50 text-yellow-700" : "bg-red-50 text-red-700"}
                    >
                      {c.reworkPct}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant="outline"
                      className={c.avgPaymentCycleDays <= 25 ? "bg-green-50 text-green-700" : c.avgPaymentCycleDays <= 30 ? "bg-yellow-50 text-yellow-700" : "bg-red-50 text-red-700"}
                    >
                      {c.avgPaymentCycleDays} days
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center font-mono">{c.defectsPer100}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Rating Legend */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={ratingColors["A"]}>A</Badge>
              <span className="text-sm text-muted-foreground">Excellent — On time, within budget, minimal defects</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={ratingColors["B"]}>B</Badge>
              <span className="text-sm text-muted-foreground">Good — Minor schedule/cost deviations</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={ratingColors["C"]}>C</Badge>
              <span className="text-sm text-muted-foreground">Needs Improvement — Noticeable quality/schedule issues</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={ratingColors["D"]}>D</Badge>
              <span className="text-sm text-muted-foreground">Poor — Significant rework, delays, or safety concerns</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
