"use client";

import Link from "next/link";
import { ArrowLeft, PieChart, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { formatBDT } from "@/lib/mock-data";

interface OverheadLine {
  account: string;
  totalAmount: number;
  driver: string;
  abcPct: number;
  bayPct: number;
  gvPct: number;
}

const overheads: OverheadLine[] = [
  { account: "Admin Salary", totalAmount: 18_000_000, driver: "Built-up Area %", abcPct: 38, bayPct: 32, gvPct: 30 },
  { account: "Office Rent", totalAmount: 4_800_000, driver: "Built-up Area %", abcPct: 38, bayPct: 32, gvPct: 30 },
  { account: "Utilities (Office)", totalAmount: 2_400_000, driver: "Built-up Area %", abcPct: 38, bayPct: 32, gvPct: 30 },
  { account: "Insurance (CAR + TPL)", totalAmount: 8_500_000, driver: "Direct Cost %", abcPct: 42, bayPct: 35, gvPct: 23 },
  { account: "Depreciation (Equipment)", totalAmount: 6_200_000, driver: "Direct Cost %", abcPct: 42, bayPct: 35, gvPct: 23 },
  { account: "Marketing (Central)", totalAmount: 12_000_000, driver: "Revenue %", abcPct: 40, bayPct: 26, gvPct: 34 },
  { account: "IT Costs", totalAmount: 3_600_000, driver: "Built-up Area %", abcPct: 38, bayPct: 32, gvPct: 30 },
  { account: "Legal & Compliance", totalAmount: 5_500_000, driver: "Revenue %", abcPct: 40, bayPct: 26, gvPct: 34 },
];

const enriched = overheads.map((o) => ({
  ...o,
  abcAmt: Math.round(o.totalAmount * o.abcPct / 100),
  bayAmt: Math.round(o.totalAmount * o.bayPct / 100),
  gvAmt: Math.round(o.totalAmount * o.gvPct / 100),
}));

const totalOverhead = enriched.reduce((s, r) => s + r.totalAmount, 0);
const totalAbc = enriched.reduce((s, r) => s + r.abcAmt, 0);
const totalBay = enriched.reduce((s, r) => s + r.bayAmt, 0);
const totalGv = enriched.reduce((s, r) => s + r.gvAmt, 0);

const projectBreakdown = [
  { name: "ABC Nasirabad Heights", amount: totalAbc, pct: (totalAbc / totalOverhead * 100), color: "bg-blue-500", textColor: "text-blue-700" },
  { name: "Bay View Residence", amount: totalBay, pct: (totalBay / totalOverhead * 100), color: "bg-emerald-500", textColor: "text-emerald-700" },
  { name: "Green Valley Township", amount: totalGv, pct: (totalGv / totalOverhead * 100), color: "bg-amber-500", textColor: "text-amber-700" },
];

const driverLegend = [
  { driver: "Built-up Area %", description: "ABC: 150,000 SFT (38%) | Bay View: 126,000 SFT (32%) | Green Valley: 118,000 SFT (30%)", color: "bg-blue-100 text-blue-800" },
  { driver: "Direct Cost %", description: "ABC: BDT 285m (42%) | Bay View: BDT 238m (35%) | Green Valley: BDT 156m (23%)", color: "bg-purple-100 text-purple-800" },
  { driver: "Revenue %", description: "ABC: BDT 950m (40%) | Bay View: BDT 620m (26%) | Green Valley: BDT 810m (34%)", color: "bg-green-100 text-green-800" },
];

function driverBadge(driver: string) {
  if (driver === "Built-up Area %") return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300 text-xs">{driver}</Badge>;
  if (driver === "Direct Cost %") return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-300 text-xs">{driver}</Badge>;
  return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300 text-xs">{driver}</Badge>;
}

export default function OverheadAllocationPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/real-estate/reports" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-3">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to Reports
        </Link>
        <div className="flex items-center gap-3">
          <PieChart className="h-7 w-7 text-purple-600" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Overhead Allocation Report</h1>
            <p className="text-muted-foreground">ABC Properties Ltd — FY 2026-27 (Apr-Aug 2026)</p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Overhead</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{formatBDT(totalOverhead)}</div><p className="text-xs text-muted-foreground">8 overhead accounts</p></CardContent>
        </Card>
        {projectBreakdown.map((p) => (
          <Card key={p.name}>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">{p.name}</CardTitle></CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${p.textColor}`}>{formatBDT(p.amount)}</div>
              <p className="text-xs text-muted-foreground">{p.pct.toFixed(1)}% of total overhead</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Visual Breakdown */}
      <Card>
        <CardHeader><CardTitle>Allocation Breakdown</CardTitle></CardHeader>
        <CardContent>
          <div className="flex h-10 rounded-lg overflow-hidden mb-4">
            {projectBreakdown.map((p) => (
              <div key={p.name} className={`${p.color} flex items-center justify-center text-white text-xs font-medium`} style={{ width: `${p.pct}%` }}>
                {p.pct.toFixed(0)}%
              </div>
            ))}
          </div>
          <div className="flex gap-6 justify-center">
            {projectBreakdown.map((p) => (
              <div key={p.name} className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${p.color}`} />
                <span className="text-sm">{p.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Allocation Drivers */}
      <Card>
        <CardHeader><CardTitle>Allocation Driver Basis</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {driverLegend.map((d) => (
            <div key={d.driver} className={`p-3 rounded-lg ${d.color}`}>
              <p className="font-medium text-sm">{d.driver}</p>
              <p className="text-xs mt-1">{d.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Detail Table */}
      <Card>
        <CardHeader><CardTitle>Detailed Overhead Allocation</CardTitle></CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Overhead Account</TableHead>
                <TableHead className="text-right">Total Amount</TableHead>
                <TableHead className="text-center">Allocation Driver</TableHead>
                <TableHead className="text-center">ABC Heights %</TableHead>
                <TableHead className="text-right">ABC Heights Amt</TableHead>
                <TableHead className="text-center">Bay View %</TableHead>
                <TableHead className="text-right">Bay View Amt</TableHead>
                <TableHead className="text-center">Green Valley %</TableHead>
                <TableHead className="text-right">Green Valley Amt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enriched.map((row) => (
                <TableRow key={row.account}>
                  <TableCell className="font-medium">{row.account}</TableCell>
                  <TableCell className="text-right font-mono">{formatBDT(row.totalAmount)}</TableCell>
                  <TableCell className="text-center">{driverBadge(row.driver)}</TableCell>
                  <TableCell className="text-center font-mono">{row.abcPct}%</TableCell>
                  <TableCell className="text-right font-mono">{formatBDT(row.abcAmt)}</TableCell>
                  <TableCell className="text-center font-mono">{row.bayPct}%</TableCell>
                  <TableCell className="text-right font-mono">{formatBDT(row.bayAmt)}</TableCell>
                  <TableCell className="text-center font-mono">{row.gvPct}%</TableCell>
                  <TableCell className="text-right font-mono">{formatBDT(row.gvAmt)}</TableCell>
                </TableRow>
              ))}
              <TableRow className="border-t-2 bg-muted/30 font-semibold">
                <TableCell>TOTAL</TableCell>
                <TableCell className="text-right font-mono">{formatBDT(totalOverhead)}</TableCell>
                <TableCell />
                <TableCell className="text-center font-mono">{(totalAbc / totalOverhead * 100).toFixed(0)}%</TableCell>
                <TableCell className="text-right font-mono">{formatBDT(totalAbc)}</TableCell>
                <TableCell className="text-center font-mono">{(totalBay / totalOverhead * 100).toFixed(0)}%</TableCell>
                <TableCell className="text-right font-mono">{formatBDT(totalBay)}</TableCell>
                <TableCell className="text-center font-mono">{(totalGv / totalOverhead * 100).toFixed(0)}%</TableCell>
                <TableCell className="text-right font-mono">{formatBDT(totalGv)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Per-project overhead rate */}
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Building2 className="h-5 w-5" /> Overhead as % of Project Cost</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "ABC Nasirabad Heights", overhead: totalAbc, directCost: 285_000_000 },
              { name: "Bay View Residence", overhead: totalBay, directCost: 361_000_000 },
              { name: "Green Valley Township", overhead: totalGv, directCost: 42_000_000 },
            ].map((p) => {
              const pct = (p.overhead / p.directCost) * 100;
              return (
                <div key={p.name} className="p-4 border rounded-lg">
                  <p className="font-medium text-sm">{p.name}</p>
                  <p className="text-2xl font-bold mt-2">{pct.toFixed(1)}%</p>
                  <p className="text-xs text-muted-foreground mt-1">Overhead: {formatBDT(p.overhead)} / Direct: {formatBDT(p.directCost)}</p>
                  <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: `${Math.min(pct, 100)}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
