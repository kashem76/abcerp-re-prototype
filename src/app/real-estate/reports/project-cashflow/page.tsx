"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpDown,
  Wallet,
  TrendingUp,
  TrendingDown,
  Building2,
} from "lucide-react";
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

const months = ["Apr 2026", "May 2026", "Jun 2026", "Jul 2026", "Aug 2026"];

const operatingData = [
  {
    item: "Collections from Buyers",
    values: [18_500_000, 22_100_000, 19_800_000, 24_600_000, 21_300_000],
    isInflow: true,
  },
  {
    item: "Payments to Contractors",
    values: [-12_400_000, -15_200_000, -11_800_000, -14_900_000, -13_600_000],
    isInflow: false,
  },
  {
    item: "Payments for Materials",
    values: [-4_800_000, -6_100_000, -5_200_000, -7_300_000, -5_900_000],
    isInflow: false,
  },
  {
    item: "Overhead Payments",
    values: [-1_200_000, -1_350_000, -1_180_000, -1_420_000, -1_280_000],
    isInflow: false,
  },
];

const investingData = [
  {
    item: "Land Acquisition (Installments)",
    values: [-5_000_000, 0, -5_000_000, 0, -5_000_000],
    isInflow: false,
  },
  {
    item: "Equipment Purchases",
    values: [-800_000, -350_000, 0, -1_200_000, 0],
    isInflow: false,
  },
];

const financingData = [
  {
    item: "Loan Drawdown",
    values: [15_000_000, 0, 10_000_000, 0, 20_000_000],
    isInflow: true,
  },
  {
    item: "Loan Repayment",
    values: [-3_200_000, -3_200_000, -3_200_000, -3_200_000, -3_200_000],
    isInflow: false,
  },
  {
    item: "Interest Paid",
    values: [-1_800_000, -1_850_000, -1_900_000, -1_950_000, -2_000_000],
    isInflow: false,
  },
];

const openingBalance = 12_400_000;

function sumByMonth(data: typeof operatingData, monthIdx: number) {
  return data.reduce((s, r) => s + r.values[monthIdx], 0);
}

function computeCashFlow() {
  const rows: {
    month: string;
    opening: number;
    opNet: number;
    invNet: number;
    finNet: number;
    netCash: number;
    closing: number;
  }[] = [];
  let bal = openingBalance;
  for (let i = 0; i < months.length; i++) {
    const opNet = sumByMonth(operatingData, i);
    const invNet = sumByMonth(investingData, i);
    const finNet = sumByMonth(financingData, i);
    const net = opNet + invNet + finNet;
    rows.push({
      month: months[i],
      opening: bal,
      opNet,
      invNet,
      finNet,
      netCash: net,
      closing: bal + net,
    });
    bal = bal + net;
  }
  return rows;
}

const cashFlowRows = computeCashFlow();
const closingBalance = cashFlowRows[cashFlowRows.length - 1].closing;
const totalNetCash = closingBalance - openingBalance;

export default function ProjectCashFlowPage() {
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
          <ArrowUpDown className="h-7 w-7 text-emerald-600" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Project Cash Flow Statement
            </h1>
            <p className="text-muted-foreground">
              ABC Nasirabad Heights — Apr to Aug 2026
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Opening Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatBDT(openingBalance)}</div>
            <p className="text-xs text-muted-foreground">1 Apr 2026</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Net Cash Flow
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalNetCash >= 0 ? "text-green-700" : "text-red-700"}`}>
              {formatBDT(totalNetCash)}
            </div>
            <p className="text-xs text-muted-foreground">5-month period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Closing Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">
              {formatBDT(closingBalance)}
            </div>
            <p className="text-xs text-muted-foreground">31 Aug 2026</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Monthly Net
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatBDT(Math.round(totalNetCash / 5))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Operating Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Operating Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30%]">Item</TableHead>
                {months.map((m) => (
                  <TableHead key={m} className="text-right">{m}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {operatingData.map((row) => (
                <TableRow key={row.item}>
                  <TableCell>{row.item}</TableCell>
                  {row.values.map((v, i) => (
                    <TableCell key={i} className={`text-right font-mono ${v < 0 ? "text-red-600" : "text-green-600"}`}>
                      {formatBDT(v)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              <TableRow className="border-t-2 font-semibold bg-muted/30">
                <TableCell>Net Operating</TableCell>
                {months.map((_, i) => {
                  const net = sumByMonth(operatingData, i);
                  return (
                    <TableCell key={i} className={`text-right font-mono ${net < 0 ? "text-red-700" : "text-green-700"}`}>
                      {formatBDT(net)}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Investing Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Investing Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30%]">Item</TableHead>
                {months.map((m) => (
                  <TableHead key={m} className="text-right">{m}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {investingData.map((row) => (
                <TableRow key={row.item}>
                  <TableCell>{row.item}</TableCell>
                  {row.values.map((v, i) => (
                    <TableCell key={i} className={`text-right font-mono ${v < 0 ? "text-red-600" : v > 0 ? "text-green-600" : ""}`}>
                      {v === 0 ? "—" : formatBDT(v)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              <TableRow className="border-t-2 font-semibold bg-muted/30">
                <TableCell>Net Investing</TableCell>
                {months.map((_, i) => {
                  const net = sumByMonth(investingData, i);
                  return (
                    <TableCell key={i} className={`text-right font-mono ${net < 0 ? "text-red-700" : "text-green-700"}`}>
                      {net === 0 ? "—" : formatBDT(net)}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Financing Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Financing Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30%]">Item</TableHead>
                {months.map((m) => (
                  <TableHead key={m} className="text-right">{m}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {financingData.map((row) => (
                <TableRow key={row.item}>
                  <TableCell>{row.item}</TableCell>
                  {row.values.map((v, i) => (
                    <TableCell key={i} className={`text-right font-mono ${v < 0 ? "text-red-600" : v > 0 ? "text-green-600" : ""}`}>
                      {v === 0 ? "—" : formatBDT(v)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              <TableRow className="border-t-2 font-semibold bg-muted/30">
                <TableCell>Net Financing</TableCell>
                {months.map((_, i) => {
                  const net = sumByMonth(financingData, i);
                  return (
                    <TableCell key={i} className={`text-right font-mono ${net < 0 ? "text-red-700" : "text-green-700"}`}>
                      {formatBDT(net)}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Monthly Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Cash Position</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead className="text-right">Opening</TableHead>
                <TableHead className="text-right">Operating</TableHead>
                <TableHead className="text-right">Investing</TableHead>
                <TableHead className="text-right">Financing</TableHead>
                <TableHead className="text-right">Net Cash Flow</TableHead>
                <TableHead className="text-right">Closing</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cashFlowRows.map((row) => (
                <TableRow key={row.month}>
                  <TableCell className="font-medium">{row.month}</TableCell>
                  <TableCell className="text-right font-mono">{formatBDT(row.opening)}</TableCell>
                  <TableCell className={`text-right font-mono ${row.opNet < 0 ? "text-red-600" : "text-green-600"}`}>
                    {formatBDT(row.opNet)}
                  </TableCell>
                  <TableCell className={`text-right font-mono ${row.invNet < 0 ? "text-red-600" : ""}`}>
                    {formatBDT(row.invNet)}
                  </TableCell>
                  <TableCell className={`text-right font-mono ${row.finNet < 0 ? "text-red-600" : "text-green-600"}`}>
                    {formatBDT(row.finNet)}
                  </TableCell>
                  <TableCell className={`text-right font-mono font-semibold ${row.netCash < 0 ? "text-red-700" : "text-green-700"}`}>
                    {formatBDT(row.netCash)}
                  </TableCell>
                  <TableCell className="text-right font-mono font-semibold">{formatBDT(row.closing)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
