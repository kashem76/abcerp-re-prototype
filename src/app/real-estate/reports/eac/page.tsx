"use client";

import Link from "next/link";
import { ArrowLeft, Target, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { formatBDT } from "@/lib/mock-data";

interface EACRow {
  wbs: string;
  originalBudget: number;
  approvedChanges: number;
  actualToDate: number;
  committed: number;
  etc: number;
}

const data: EACRow[] = [
  { wbs: "1.0 Land & Approvals", originalBudget: 120_000_000, approvedChanges: 0, actualToDate: 118_500_000, committed: 0, etc: 1_500_000 },
  { wbs: "1.1 Piling & Foundation", originalBudget: 85_000_000, approvedChanges: 4_200_000, actualToDate: 78_500_000, committed: 6_800_000, etc: 5_200_000 },
  { wbs: "1.2 RCC Structure", originalBudget: 145_000_000, approvedChanges: 8_500_000, actualToDate: 92_300_000, committed: 42_000_000, etc: 22_800_000 },
  { wbs: "1.3 Brickwork & Masonry", originalBudget: 42_000_000, approvedChanges: 0, actualToDate: 28_600_000, committed: 11_200_000, etc: 4_500_000 },
  { wbs: "1.4 MEP — Electrical", originalBudget: 65_000_000, approvedChanges: 3_200_000, actualToDate: 18_400_000, committed: 38_500_000, etc: 14_200_000 },
  { wbs: "1.5 MEP — Plumbing/Fire", originalBudget: 48_000_000, approvedChanges: 1_800_000, actualToDate: 12_200_000, committed: 32_600_000, etc: 7_800_000 },
  { wbs: "1.6 Finishing & Interior", originalBudget: 120_000_000, approvedChanges: 0, actualToDate: 15_800_000, committed: 24_000_000, etc: 85_000_000 },
  { wbs: "1.7 External Development", originalBudget: 35_000_000, approvedChanges: 2_500_000, actualToDate: 4_200_000, committed: 8_500_000, etc: 26_200_000 },
  { wbs: "1.8 Overheads & Supervision", originalBudget: 28_000_000, approvedChanges: 0, actualToDate: 16_800_000, committed: 9_200_000, etc: 4_500_000 },
];

const enriched = data.map((r) => {
  const currentBudget = r.originalBudget + r.approvedChanges;
  const eac = r.actualToDate + r.committed + r.etc;
  const varianceAtCompletion = currentBudget - eac;
  return { ...r, currentBudget, eac, varianceAtCompletion };
});

const totals = enriched.reduce(
  (acc, r) => ({
    originalBudget: acc.originalBudget + r.originalBudget,
    approvedChanges: acc.approvedChanges + r.approvedChanges,
    currentBudget: acc.currentBudget + r.currentBudget,
    actualToDate: acc.actualToDate + r.actualToDate,
    committed: acc.committed + r.committed,
    etc: acc.etc + r.etc,
    eac: acc.eac + r.eac,
    varianceAtCompletion: acc.varianceAtCompletion + r.varianceAtCompletion,
  }),
  { originalBudget: 0, approvedChanges: 0, currentBudget: 0, actualToDate: 0, committed: 0, etc: 0, eac: 0, varianceAtCompletion: 0 }
);

// Performance indices
const budgetedCostOfWorkPerformed = totals.actualToDate * (totals.currentBudget / totals.eac);
const cpi = budgetedCostOfWorkPerformed / totals.actualToDate;
const plannedCompletion = 0.68; // 68% planned by Aug 2026
const actualCompletion = 0.64;
const spi = actualCompletion / plannedCompletion;

export default function EACPage() {
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
          <Target className="h-7 w-7 text-purple-600" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Estimate at Completion (EAC)
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
              Current Budget
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{formatBDT(totals.currentBudget)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Project EAC
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-xl font-bold ${totals.eac > totals.currentBudget ? "text-red-700" : "text-green-700"}`}>
              {formatBDT(totals.eac)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Variance at Completion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-xl font-bold flex items-center gap-1 ${totals.varianceAtCompletion >= 0 ? "text-green-700" : "text-red-700"}`}>
              {totals.varianceAtCompletion >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              {formatBDT(totals.varianceAtCompletion)}
            </div>
            <p className="text-xs text-muted-foreground">
              {totals.varianceAtCompletion >= 0 ? "Under budget" : "Over budget"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              CPI (Cost Performance)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-xl font-bold ${cpi >= 1 ? "text-green-700" : "text-red-700"}`}>
              {cpi.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {cpi >= 1 ? "Under budget pace" : "Over budget pace"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              SPI (Schedule Performance)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-xl font-bold ${spi >= 1 ? "text-green-700" : "text-yellow-700"}`}>
              {spi.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {spi >= 1 ? "On/ahead of schedule" : "Behind schedule"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detail Table */}
      <Card>
        <CardHeader>
          <CardTitle>EAC by WBS / Cost Category</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>WBS</TableHead>
                <TableHead className="text-right">Original Budget</TableHead>
                <TableHead className="text-right">Approved Changes</TableHead>
                <TableHead className="text-right">Current Budget</TableHead>
                <TableHead className="text-right">Actual to Date</TableHead>
                <TableHead className="text-right">Committed</TableHead>
                <TableHead className="text-right">ETC</TableHead>
                <TableHead className="text-right">EAC</TableHead>
                <TableHead className="text-right">Variance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enriched.map((row) => (
                <TableRow
                  key={row.wbs}
                  className={row.varianceAtCompletion < 0 ? "bg-red-50/50" : ""}
                >
                  <TableCell className="font-medium">{row.wbs}</TableCell>
                  <TableCell className="text-right font-mono">{formatBDT(row.originalBudget)}</TableCell>
                  <TableCell className="text-right font-mono">
                    {row.approvedChanges > 0 ? formatBDT(row.approvedChanges) : "—"}
                  </TableCell>
                  <TableCell className="text-right font-mono font-semibold">{formatBDT(row.currentBudget)}</TableCell>
                  <TableCell className="text-right font-mono text-blue-700">{formatBDT(row.actualToDate)}</TableCell>
                  <TableCell className="text-right font-mono text-orange-700">{formatBDT(row.committed)}</TableCell>
                  <TableCell className="text-right font-mono">{formatBDT(row.etc)}</TableCell>
                  <TableCell className="text-right font-mono font-semibold">{formatBDT(row.eac)}</TableCell>
                  <TableCell className={`text-right font-mono font-semibold ${row.varianceAtCompletion >= 0 ? "text-green-700" : "text-red-700"}`}>
                    {row.varianceAtCompletion >= 0 ? "" : ""}{formatBDT(row.varianceAtCompletion)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="border-t-2 bg-muted/30 font-bold">
                <TableCell>PROJECT TOTAL</TableCell>
                <TableCell className="text-right font-mono">{formatBDT(totals.originalBudget)}</TableCell>
                <TableCell className="text-right font-mono">{formatBDT(totals.approvedChanges)}</TableCell>
                <TableCell className="text-right font-mono">{formatBDT(totals.currentBudget)}</TableCell>
                <TableCell className="text-right font-mono text-blue-700">{formatBDT(totals.actualToDate)}</TableCell>
                <TableCell className="text-right font-mono text-orange-700">{formatBDT(totals.committed)}</TableCell>
                <TableCell className="text-right font-mono">{formatBDT(totals.etc)}</TableCell>
                <TableCell className="text-right font-mono">{formatBDT(totals.eac)}</TableCell>
                <TableCell className={`text-right font-mono ${totals.varianceAtCompletion >= 0 ? "text-green-700" : "text-red-700"}`}>
                  {formatBDT(totals.varianceAtCompletion)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Performance Index Legend */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Index Interpretation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold">CPI — Cost Performance Index</h4>
              <p className="text-sm text-muted-foreground">
                CPI = BCWP / ACWP. A value &gt; 1.0 means under budget, &lt; 1.0 means over budget.
              </p>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-green-50 text-green-700">CPI &ge; 1.0: Good</Badge>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700">0.9 &le; CPI &lt; 1.0: Caution</Badge>
                <Badge variant="outline" className="bg-red-50 text-red-700">CPI &lt; 0.9: Critical</Badge>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">SPI — Schedule Performance Index</h4>
              <p className="text-sm text-muted-foreground">
                SPI = EV / PV. A value &gt; 1.0 means ahead of schedule, &lt; 1.0 means behind schedule.
              </p>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-green-50 text-green-700">SPI &ge; 1.0: On track</Badge>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700">0.9 &le; SPI &lt; 1.0: Watch</Badge>
                <Badge variant="outline" className="bg-red-50 text-red-700">SPI &lt; 0.9: Delayed</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
