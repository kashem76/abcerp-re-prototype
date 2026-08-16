"use client";

import Link from "next/link";
import { ArrowLeft, ShieldCheck, AlertTriangle, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatBDT } from "@/lib/mock-data";

interface CommitmentRow {
  category: string;
  originalBudget: number;
  approvedVOs: number;
  actualSpent: number;
  committed: number;
}

const data: CommitmentRow[] = [
  { category: "Piling & Foundation", originalBudget: 85_000_000, approvedVOs: 4_200_000, actualSpent: 78_500_000, committed: 6_800_000 },
  { category: "RCC Structure", originalBudget: 145_000_000, approvedVOs: 8_500_000, actualSpent: 92_300_000, committed: 42_000_000 },
  { category: "Brickwork & Masonry", originalBudget: 42_000_000, approvedVOs: 0, actualSpent: 28_600_000, committed: 11_200_000 },
  { category: "MEP (Electrical)", originalBudget: 65_000_000, approvedVOs: 3_200_000, actualSpent: 18_400_000, committed: 38_500_000 },
  { category: "MEP (Plumbing & Fire)", originalBudget: 48_000_000, approvedVOs: 1_800_000, actualSpent: 12_200_000, committed: 32_600_000 },
  { category: "Finishing & Interior", originalBudget: 120_000_000, approvedVOs: 0, actualSpent: 15_800_000, committed: 24_000_000 },
  { category: "External Development", originalBudget: 35_000_000, approvedVOs: 2_500_000, actualSpent: 4_200_000, committed: 8_500_000 },
  { category: "Overheads & Supervision", originalBudget: 28_000_000, approvedVOs: 0, actualSpent: 16_800_000, committed: 9_200_000 },
];

const enriched = data.map((r) => {
  const revisedBudget = r.originalBudget + r.approvedVOs;
  const trulyAvailable = revisedBudget - r.actualSpent - r.committed;
  const utilization = ((r.actualSpent + r.committed) / revisedBudget) * 100;
  return { ...r, revisedBudget, trulyAvailable, utilization };
});

const totals = enriched.reduce(
  (acc, r) => ({
    originalBudget: acc.originalBudget + r.originalBudget,
    approvedVOs: acc.approvedVOs + r.approvedVOs,
    revisedBudget: acc.revisedBudget + r.revisedBudget,
    actualSpent: acc.actualSpent + r.actualSpent,
    committed: acc.committed + r.committed,
    trulyAvailable: acc.trulyAvailable + r.trulyAvailable,
  }),
  { originalBudget: 0, approvedVOs: 0, revisedBudget: 0, actualSpent: 0, committed: 0, trulyAvailable: 0 }
);

export default function CommitmentReportPage() {
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
          <ShieldCheck className="h-7 w-7 text-indigo-600" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Commitment Report
            </h1>
            <p className="text-muted-foreground">
              ABC Nasirabad Heights — As at 12 Aug 2026
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revised Budget
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatBDT(totals.revisedBudget)}</div>
            <p className="text-xs text-muted-foreground">
              Original: {formatBDT(totals.originalBudget)} + VO: {formatBDT(totals.approvedVOs)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Spent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">{formatBDT(totals.actualSpent)}</div>
            <p className="text-xs text-muted-foreground">
              {((totals.actualSpent / totals.revisedBudget) * 100).toFixed(1)}% of budget
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Committed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">{formatBDT(totals.committed)}</div>
            <p className="text-xs text-muted-foreground">POs & Contracts not yet billed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Truly Available
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totals.trulyAvailable >= 0 ? "text-green-700" : "text-red-700"}`}>
              {formatBDT(totals.trulyAvailable)}
            </div>
            <p className="text-xs text-muted-foreground">Budget - Spent - Committed</p>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Commitment by Cost Category</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Original Budget</TableHead>
                <TableHead className="text-right">Approved VOs</TableHead>
                <TableHead className="text-right">Revised Budget</TableHead>
                <TableHead className="text-right">Actual Spent</TableHead>
                <TableHead className="text-right">Committed</TableHead>
                <TableHead className="text-right">Truly Available</TableHead>
                <TableHead className="w-[120px]">Utilization</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enriched.map((row) => (
                <TableRow
                  key={row.category}
                  className={row.trulyAvailable < 0 ? "bg-red-50" : ""}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {row.category}
                      {row.trulyAvailable < 0 && (
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono">{formatBDT(row.originalBudget)}</TableCell>
                  <TableCell className="text-right font-mono">
                    {row.approvedVOs > 0 ? formatBDT(row.approvedVOs) : "—"}
                  </TableCell>
                  <TableCell className="text-right font-mono font-semibold">{formatBDT(row.revisedBudget)}</TableCell>
                  <TableCell className="text-right font-mono text-blue-700">{formatBDT(row.actualSpent)}</TableCell>
                  <TableCell className="text-right font-mono text-orange-700">{formatBDT(row.committed)}</TableCell>
                  <TableCell className={`text-right font-mono font-semibold ${row.trulyAvailable < 0 ? "text-red-700" : "text-green-700"}`}>
                    {formatBDT(row.trulyAvailable)}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Progress
                        value={Math.min(row.utilization, 100)}
                        className={`h-2 ${row.utilization > 100 ? "[&>div]:bg-red-500" : row.utilization > 85 ? "[&>div]:bg-yellow-500" : "[&>div]:bg-green-500"}`}
                      />
                      <span className="text-xs text-muted-foreground">
                        {row.utilization.toFixed(0)}%
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="border-t-2 bg-muted/30 font-bold">
                <TableCell>TOTAL</TableCell>
                <TableCell className="text-right font-mono">{formatBDT(totals.originalBudget)}</TableCell>
                <TableCell className="text-right font-mono">{formatBDT(totals.approvedVOs)}</TableCell>
                <TableCell className="text-right font-mono">{formatBDT(totals.revisedBudget)}</TableCell>
                <TableCell className="text-right font-mono text-blue-700">{formatBDT(totals.actualSpent)}</TableCell>
                <TableCell className="text-right font-mono text-orange-700">{formatBDT(totals.committed)}</TableCell>
                <TableCell className={`text-right font-mono ${totals.trulyAvailable < 0 ? "text-red-700" : "text-green-700"}`}>
                  {formatBDT(totals.trulyAvailable)}
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {(((totals.actualSpent + totals.committed) / totals.revisedBudget) * 100).toFixed(0)}%
                  </span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
