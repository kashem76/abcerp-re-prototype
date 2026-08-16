"use client";

import Link from "next/link";
import { ArrowLeft, Layers, TrendingUp, ArrowDownToLine } from "lucide-react";
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
import { formatBDT } from "@/lib/mock-data";

interface WIPMonth {
  month: string;
  openingWIP: number;
  contractorBills: number;
  materialIssues: number;
  overheads: number;
  costOfSales: number;
  writeOffs: number;
}

const wipData: WIPMonth[] = [
  { month: "Mar 2026", openingWIP: 142_500_000, contractorBills: 14_800_000, materialIssues: 6_200_000, overheads: 1_350_000, costOfSales: 12_400_000, writeOffs: 0 },
  { month: "Apr 2026", openingWIP: 152_450_000, contractorBills: 16_200_000, materialIssues: 7_100_000, overheads: 1_420_000, costOfSales: 18_600_000, writeOffs: 250_000 },
  { month: "May 2026", openingWIP: 158_320_000, contractorBills: 15_400_000, materialIssues: 5_800_000, overheads: 1_280_000, costOfSales: 14_200_000, writeOffs: 0 },
  { month: "Jun 2026", openingWIP: 166_600_000, contractorBills: 18_900_000, materialIssues: 8_400_000, overheads: 1_500_000, costOfSales: 16_800_000, writeOffs: 180_000 },
  { month: "Jul 2026", openingWIP: 178_420_000, contractorBills: 17_200_000, materialIssues: 7_600_000, overheads: 1_380_000, costOfSales: 22_400_000, writeOffs: 0 },
  { month: "Aug 2026", openingWIP: 182_200_000, contractorBills: 15_800_000, materialIssues: 6_900_000, overheads: 1_450_000, costOfSales: 19_200_000, writeOffs: 350_000 },
];

const enriched = wipData.map((row) => {
  const totalAdditions = row.contractorBills + row.materialIssues + row.overheads;
  const totalDeductions = row.costOfSales + row.writeOffs;
  const closingWIP = row.openingWIP + totalAdditions - totalDeductions;
  return { ...row, totalAdditions, totalDeductions, closingWIP };
});

const currentWIP = enriched[enriched.length - 1].closingWIP;
const totalAdditionsYTD = enriched.reduce((s, r) => s + r.totalAdditions, 0);
const totalCostOfSalesYTD = enriched.reduce((s, r) => s + r.costOfSales, 0);
const totalWriteOffsYTD = enriched.reduce((s, r) => s + r.writeOffs, 0);

export default function WIPMovementPage() {
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
          <Layers className="h-7 w-7 text-cyan-600" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              WIP Movement Report
            </h1>
            <p className="text-muted-foreground">
              ABC Nasirabad Heights — Mar to Aug 2026
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Current WIP Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">{formatBDT(currentWIP)}</div>
            <p className="text-xs text-muted-foreground">As at 31 Aug 2026</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Additions YTD
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div className="text-2xl font-bold text-green-700">{formatBDT(totalAdditionsYTD)}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Cost of Sales YTD
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <ArrowDownToLine className="h-5 w-5 text-orange-600" />
              <div className="text-2xl font-bold text-orange-700">{formatBDT(totalCostOfSalesYTD)}</div>
            </div>
            <p className="text-xs text-muted-foreground">Units handed over</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Write-offs YTD
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">{formatBDT(totalWriteOffsYTD)}</div>
          </CardContent>
        </Card>
      </div>

      {/* WIP Movement Table */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly WIP Movement</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead className="text-right">Opening WIP</TableHead>
                <TableHead className="text-right text-green-700">Contractor Bills</TableHead>
                <TableHead className="text-right text-green-700">Material Issues</TableHead>
                <TableHead className="text-right text-green-700">Overheads</TableHead>
                <TableHead className="text-right font-semibold text-green-700">Total Additions</TableHead>
                <TableHead className="text-right text-orange-700">Cost of Sales</TableHead>
                <TableHead className="text-right text-red-700">Write-offs</TableHead>
                <TableHead className="text-right font-semibold">Closing WIP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enriched.map((row) => (
                <TableRow key={row.month}>
                  <TableCell className="font-medium">{row.month}</TableCell>
                  <TableCell className="text-right font-mono">{formatBDT(row.openingWIP)}</TableCell>
                  <TableCell className="text-right font-mono text-green-600">{formatBDT(row.contractorBills)}</TableCell>
                  <TableCell className="text-right font-mono text-green-600">{formatBDT(row.materialIssues)}</TableCell>
                  <TableCell className="text-right font-mono text-green-600">{formatBDT(row.overheads)}</TableCell>
                  <TableCell className="text-right font-mono font-semibold text-green-700">{formatBDT(row.totalAdditions)}</TableCell>
                  <TableCell className="text-right font-mono text-orange-600">({formatBDT(row.costOfSales)})</TableCell>
                  <TableCell className="text-right font-mono text-red-600">
                    {row.writeOffs > 0 ? `(${formatBDT(row.writeOffs)})` : "—"}
                  </TableCell>
                  <TableCell className="text-right font-mono font-bold">{formatBDT(row.closingWIP)}</TableCell>
                </TableRow>
              ))}
              <TableRow className="border-t-2 bg-muted/30 font-bold">
                <TableCell>TOTAL (6 months)</TableCell>
                <TableCell className="text-right font-mono">{formatBDT(wipData[0].openingWIP)}</TableCell>
                <TableCell className="text-right font-mono text-green-700">{formatBDT(enriched.reduce((s, r) => s + r.contractorBills, 0))}</TableCell>
                <TableCell className="text-right font-mono text-green-700">{formatBDT(enriched.reduce((s, r) => s + r.materialIssues, 0))}</TableCell>
                <TableCell className="text-right font-mono text-green-700">{formatBDT(enriched.reduce((s, r) => s + r.overheads, 0))}</TableCell>
                <TableCell className="text-right font-mono text-green-700">{formatBDT(totalAdditionsYTD)}</TableCell>
                <TableCell className="text-right font-mono text-orange-700">({formatBDT(totalCostOfSalesYTD)})</TableCell>
                <TableCell className="text-right font-mono text-red-700">({formatBDT(totalWriteOffsYTD)})</TableCell>
                <TableCell className="text-right font-mono">{formatBDT(currentWIP)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* WIP Composition */}
      <Card>
        <CardHeader>
          <CardTitle>Current WIP Composition</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Component</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">% of WIP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { component: "Land & Approvals", amount: 52_000_000 },
                { component: "Foundation & Piling", amount: 28_500_000 },
                { component: "RCC Structure", amount: 45_200_000 },
                { component: "Brickwork & Masonry", amount: 18_400_000 },
                { component: "MEP Works", amount: 22_800_000 },
                { component: "Finishing (In Progress)", amount: 12_600_000 },
                { component: "Overheads Absorbed", amount: 7_300_000 },
              ].map((row) => (
                <TableRow key={row.component}>
                  <TableCell className="font-medium">{row.component}</TableCell>
                  <TableCell className="text-right font-mono">{formatBDT(row.amount)}</TableCell>
                  <TableCell className="text-right">{((row.amount / currentWIP) * 100).toFixed(1)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
