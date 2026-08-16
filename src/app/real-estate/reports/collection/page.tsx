"use client";

import Link from "next/link";
import { ArrowLeft, Receipt, TrendingUp, AlertCircle } from "lucide-react";
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

interface CollectionMonth {
  month: string;
  demandRaised: number;
  amountCollected: number;
  overdueCarriedForward: number;
}

const monthlyData: CollectionMonth[] = [
  { month: "Mar 2026", demandRaised: 18_500_000, amountCollected: 16_200_000, overdueCarriedForward: 4_800_000 },
  { month: "Apr 2026", demandRaised: 22_400_000, amountCollected: 19_800_000, overdueCarriedForward: 7_400_000 },
  { month: "May 2026", demandRaised: 19_600_000, amountCollected: 18_100_000, overdueCarriedForward: 8_900_000 },
  { month: "Jun 2026", demandRaised: 24_800_000, amountCollected: 22_600_000, overdueCarriedForward: 11_100_000 },
  { month: "Jul 2026", demandRaised: 21_200_000, amountCollected: 20_500_000, overdueCarriedForward: 11_800_000 },
  { month: "Aug 2026", demandRaised: 23_600_000, amountCollected: 19_400_000, overdueCarriedForward: 16_000_000 },
];

const totalDemanded = monthlyData.reduce((s, m) => s + m.demandRaised, 0);
const totalCollected = monthlyData.reduce((s, m) => s + m.amountCollected, 0);
const overallEfficiency = (totalCollected / totalDemanded) * 100;
const currentOverdue = monthlyData[monthlyData.length - 1].overdueCarriedForward;

// Cumulative
let cumDemand = 0;
let cumCollected = 0;
const enriched = monthlyData.map((m) => {
  cumDemand += m.demandRaised;
  cumCollected += m.amountCollected;
  const collectionPct = (m.amountCollected / m.demandRaised) * 100;
  const cumulativePct = (cumCollected / cumDemand) * 100;
  return { ...m, collectionPct, cumulativePct };
});

function effBadge(pct: number) {
  if (pct >= 95) return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">{pct.toFixed(1)}%</Badge>;
  if (pct >= 85) return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">{pct.toFixed(1)}%</Badge>;
  return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">{pct.toFixed(1)}%</Badge>;
}

export default function CollectionReportPage() {
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
          <Receipt className="h-7 w-7 text-teal-600" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Collection Efficiency Report
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
              Total Demanded
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatBDT(totalDemanded)}</div>
            <p className="text-xs text-muted-foreground">6-month period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Collected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{formatBDT(totalCollected)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Overall Efficiency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className={`text-2xl font-bold ${overallEfficiency >= 90 ? "text-green-700" : "text-yellow-700"}`}>
                {overallEfficiency.toFixed(1)}%
              </div>
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <Progress value={overallEfficiency} className="mt-2 h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Current Overdue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <div className="text-2xl font-bold text-red-700">{formatBDT(currentOverdue)}</div>
            </div>
            <p className="text-xs text-muted-foreground">As at Aug 2026</p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Table */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Collection Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead className="text-right">Demand Raised</TableHead>
                <TableHead className="text-right">Amount Collected</TableHead>
                <TableHead className="text-center">Collection %</TableHead>
                <TableHead className="text-right">Overdue C/F</TableHead>
                <TableHead className="text-center">Cumulative %</TableHead>
                <TableHead className="w-[120px]">Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enriched.map((row) => (
                <TableRow key={row.month}>
                  <TableCell className="font-medium">{row.month}</TableCell>
                  <TableCell className="text-right font-mono">{formatBDT(row.demandRaised)}</TableCell>
                  <TableCell className="text-right font-mono text-green-700">{formatBDT(row.amountCollected)}</TableCell>
                  <TableCell className="text-center">{effBadge(row.collectionPct)}</TableCell>
                  <TableCell className="text-right font-mono text-red-600">{formatBDT(row.overdueCarriedForward)}</TableCell>
                  <TableCell className="text-center">{effBadge(row.cumulativePct)}</TableCell>
                  <TableCell>
                    <Progress
                      value={row.collectionPct}
                      className={`h-2 ${row.collectionPct >= 95 ? "[&>div]:bg-green-500" : row.collectionPct >= 85 ? "[&>div]:bg-yellow-500" : "[&>div]:bg-red-500"}`}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Overdue Aging */}
      <Card>
        <CardHeader>
          <CardTitle>Overdue Aging Breakdown (Current: {formatBDT(currentOverdue)})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Aging Bucket</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">% of Overdue</TableHead>
                <TableHead>Buyers</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { bucket: "0-30 Days", amount: 6_200_000, buyers: 8 },
                { bucket: "31-60 Days", amount: 4_800_000, buyers: 5 },
                { bucket: "61-90 Days", amount: 3_200_000, buyers: 3 },
                { bucket: "90+ Days", amount: 1_800_000, buyers: 2 },
              ].map((row) => (
                <TableRow key={row.bucket}>
                  <TableCell className="font-medium">{row.bucket}</TableCell>
                  <TableCell className="text-right font-mono text-red-600">{formatBDT(row.amount)}</TableCell>
                  <TableCell className="text-right">{((row.amount / currentOverdue) * 100).toFixed(1)}%</TableCell>
                  <TableCell>{row.buyers} buyers</TableCell>
                </TableRow>
              ))}
              <TableRow className="border-t-2 font-bold bg-muted/30">
                <TableCell>TOTAL</TableCell>
                <TableCell className="text-right font-mono text-red-700">{formatBDT(currentOverdue)}</TableCell>
                <TableCell className="text-right">100.0%</TableCell>
                <TableCell>18 buyers</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
