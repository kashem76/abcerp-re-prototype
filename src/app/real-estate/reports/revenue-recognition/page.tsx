"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

interface RevenueProject {
  project: string;
  id: string;
  method: "POC" | "CC";
  totalContractRevenue: number;
  percentComplete: number;
  revenueRecognizedToDate: number;
  revenueThisPeriod: number;
  deferredRevenue: number;
  totalExpectedCost: number;
  costIncurred: number;
  costThisPeriod: number;
}

const projects: RevenueProject[] = [
  {
    project: "ABC Nasirabad Heights",
    id: "RE-00027",
    method: "POC",
    totalContractRevenue: 950_000_000,
    percentComplete: 64,
    revenueRecognizedToDate: 608_000_000,
    revenueThisPeriod: 42_500_000,
    deferredRevenue: 342_000_000,
    totalExpectedCost: 700_000_000,
    costIncurred: 448_000_000,
    costThisPeriod: 31_200_000,
  },
  {
    project: "Bay View Residence",
    id: "RE-00031",
    method: "CC",
    totalContractRevenue: 620_000_000,
    percentComplete: 82,
    revenueRecognizedToDate: 0,
    revenueThisPeriod: 0,
    deferredRevenue: 620_000_000,
    totalExpectedCost: 440_000_000,
    costIncurred: 361_000_000,
    costThisPeriod: 18_600_000,
  },
  {
    project: "Green Valley Township",
    id: "RE-00035",
    method: "POC",
    totalContractRevenue: 1_800_000_000,
    percentComplete: 8,
    revenueRecognizedToDate: 144_000_000,
    revenueThisPeriod: 28_800_000,
    deferredRevenue: 1_656_000_000,
    totalExpectedCost: 1_200_000_000,
    costIncurred: 96_000_000,
    costThisPeriod: 19_200_000,
  },
];

const totals = projects.reduce(
  (acc, p) => ({
    totalContractRevenue: acc.totalContractRevenue + p.totalContractRevenue,
    revenueRecognizedToDate: acc.revenueRecognizedToDate + p.revenueRecognizedToDate,
    revenueThisPeriod: acc.revenueThisPeriod + p.revenueThisPeriod,
    deferredRevenue: acc.deferredRevenue + p.deferredRevenue,
    totalExpectedCost: acc.totalExpectedCost + p.totalExpectedCost,
    costIncurred: acc.costIncurred + p.costIncurred,
    costThisPeriod: acc.costThisPeriod + p.costThisPeriod,
  }),
  { totalContractRevenue: 0, revenueRecognizedToDate: 0, revenueThisPeriod: 0, deferredRevenue: 0, totalExpectedCost: 0, costIncurred: 0, costThisPeriod: 0 }
);

export default function RevenueRecognitionPage() {
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
          <BookOpen className="h-7 w-7 text-violet-600" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Revenue Recognition Schedule
            </h1>
            <p className="text-muted-foreground">
              All Projects — Period ending Aug 2026
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Contract Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatBDT(totals.totalContractRevenue)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Revenue Recognized to Date
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{formatBDT(totals.revenueRecognizedToDate)}</div>
            <p className="text-xs text-muted-foreground">
              {((totals.revenueRecognizedToDate / totals.totalContractRevenue) * 100).toFixed(1)}% recognized
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Revenue This Period
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">{formatBDT(totals.revenueThisPeriod)}</div>
            <p className="text-xs text-muted-foreground">Aug 2026</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Deferred Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">{formatBDT(totals.deferredRevenue)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Recognition Table */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Recognition by Project</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead className="text-center">Method</TableHead>
                <TableHead className="text-right">Total Contract Revenue</TableHead>
                <TableHead className="text-center">% Complete</TableHead>
                <TableHead className="text-right">Revenue to Date</TableHead>
                <TableHead className="text-right">Revenue This Period</TableHead>
                <TableHead className="text-right">Deferred Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{p.project}</div>
                      <div className="text-xs text-muted-foreground">{p.id}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant="outline"
                      className={p.method === "POC" ? "bg-blue-50 text-blue-700 border-blue-300" : "bg-gray-100 text-gray-700 border-gray-300"}
                    >
                      {p.method === "POC" ? "% of Completion" : "Completed Contract"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono">{formatBDT(p.totalContractRevenue)}</TableCell>
                  <TableCell className="text-center font-semibold">{p.percentComplete}%</TableCell>
                  <TableCell className="text-right font-mono text-green-700">
                    {p.revenueRecognizedToDate > 0 ? formatBDT(p.revenueRecognizedToDate) : "—"}
                  </TableCell>
                  <TableCell className="text-right font-mono text-blue-700">
                    {p.revenueThisPeriod > 0 ? formatBDT(p.revenueThisPeriod) : "—"}
                  </TableCell>
                  <TableCell className="text-right font-mono text-orange-700">{formatBDT(p.deferredRevenue)}</TableCell>
                </TableRow>
              ))}
              <TableRow className="border-t-2 bg-muted/30 font-bold">
                <TableCell>TOTAL</TableCell>
                <TableCell />
                <TableCell className="text-right font-mono">{formatBDT(totals.totalContractRevenue)}</TableCell>
                <TableCell />
                <TableCell className="text-right font-mono text-green-700">{formatBDT(totals.revenueRecognizedToDate)}</TableCell>
                <TableCell className="text-right font-mono text-blue-700">{formatBDT(totals.revenueThisPeriod)}</TableCell>
                <TableCell className="text-right font-mono text-orange-700">{formatBDT(totals.deferredRevenue)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Cost Recognition (Matching Principle) */}
      <Card>
        <CardHeader>
          <CardTitle>Cost Recognition (Matching Principle)</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead className="text-right">Total Expected Cost</TableHead>
                <TableHead className="text-right">Cost Incurred to Date</TableHead>
                <TableHead className="text-right">Cost This Period</TableHead>
                <TableHead className="text-right">Remaining Cost</TableHead>
                <TableHead className="text-right">Gross Margin %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((p) => {
                const remaining = p.totalExpectedCost - p.costIncurred;
                const margin = ((p.totalContractRevenue - p.totalExpectedCost) / p.totalContractRevenue) * 100;
                return (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.project}</TableCell>
                    <TableCell className="text-right font-mono">{formatBDT(p.totalExpectedCost)}</TableCell>
                    <TableCell className="text-right font-mono text-red-600">{formatBDT(p.costIncurred)}</TableCell>
                    <TableCell className="text-right font-mono">{formatBDT(p.costThisPeriod)}</TableCell>
                    <TableCell className="text-right font-mono">{formatBDT(remaining)}</TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant="outline"
                        className={margin >= 25 ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}
                      >
                        {margin.toFixed(1)}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow className="border-t-2 bg-muted/30 font-bold">
                <TableCell>TOTAL</TableCell>
                <TableCell className="text-right font-mono">{formatBDT(totals.totalExpectedCost)}</TableCell>
                <TableCell className="text-right font-mono text-red-600">{formatBDT(totals.costIncurred)}</TableCell>
                <TableCell className="text-right font-mono">{formatBDT(totals.costThisPeriod)}</TableCell>
                <TableCell className="text-right font-mono">{formatBDT(totals.totalExpectedCost - totals.costIncurred)}</TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    {(((totals.totalContractRevenue - totals.totalExpectedCost) / totals.totalContractRevenue) * 100).toFixed(1)}%
                  </Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Method Note */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-muted-foreground space-y-1">
              <p><strong>POC (Percentage of Completion):</strong> Revenue is recognized proportionally as construction progresses. Used when outcome can be reliably measured (ABC Nasirabad Heights, Green Valley Township).</p>
              <p><strong>CC (Completed Contract):</strong> All revenue is deferred until project completion and handover. Used when outcome cannot be reliably estimated or project is near completion (Bay View Residence).</p>
              <p><strong>Matching Principle:</strong> Costs are recognized in the same period as the related revenue to ensure proper profit/loss reporting per IAS 11 / IFRS 15.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
