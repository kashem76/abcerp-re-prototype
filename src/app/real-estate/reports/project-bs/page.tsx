"use client";

import Link from "next/link";
import {
  ArrowLeft,
  FileSpreadsheet,
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
import { Separator } from "@/components/ui/separator";
import { formatBDT } from "@/lib/mock-data";

const assets = {
  constructionWIP: [
    { phase: "Foundation", amount: 42_500_000 },
    { phase: "Structure (RCC)", amount: 87_200_000 },
    { phase: "MEP (Mechanical/Electrical/Plumbing)", amount: 31_800_000 },
    { phase: "Finishing & Interior", amount: 18_600_000 },
  ],
  advances: [
    { item: "Advances to Contractors", amount: 14_250_000 },
    { item: "Advances to Suppliers", amount: 8_750_000 },
  ],
  receivables: [
    { item: "AR from Buyers — Installments Due", amount: 22_400_000 },
    { item: "AR from Buyers — Overdue", amount: 6_800_000 },
  ],
  inventory: [
    { item: "Unsold Units at Cost (4 units)", amount: 56_000_000 },
  ],
};

const liabilities = [
  { item: "AP to Contractors", amount: 18_600_000 },
  { item: "AP to Suppliers (Materials)", amount: 11_200_000 },
  { item: "Customer Advances — Booking Money", amount: 32_400_000 },
  { item: "Customer Advances — Installments Received", amount: 124_500_000 },
  { item: "Retention Payable (5%)", amount: 9_050_000 },
  { item: "TDS Payable (AIT on Contractors)", amount: 3_620_000 },
  { item: "VAT Payable", amount: 5_100_000 },
  { item: "Provision for DLP (Defect Liability Period)", amount: 7_200_000 },
];

const totalWIP = assets.constructionWIP.reduce((s, r) => s + r.amount, 0);
const totalAdvances = assets.advances.reduce((s, r) => s + r.amount, 0);
const totalReceivables = assets.receivables.reduce((s, r) => s + r.amount, 0);
const totalInventory = assets.inventory.reduce((s, r) => s + r.amount, 0);
const totalAssets = totalWIP + totalAdvances + totalReceivables + totalInventory;
const totalLiabilities = liabilities.reduce((s, r) => s + r.amount, 0);
const netPosition = totalAssets - totalLiabilities;

export default function ProjectBalanceSheetPage() {
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
          <FileSpreadsheet className="h-7 w-7 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Project Balance Sheet
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
              Total Assets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">
              {formatBDT(totalAssets)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Liabilities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">
              {formatBDT(totalLiabilities)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Net Position
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">
                {formatBDT(netPosition)}
              </div>
              {netPosition >= 0 ? (
                <TrendingUp className="h-5 w-5 text-green-600" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-600" />
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Construction WIP
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">
              {formatBDT(totalWIP)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Assets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60%]">Account</TableHead>
                <TableHead className="text-right">Amount (BDT)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Construction WIP */}
              <TableRow className="bg-muted/30">
                <TableCell className="font-semibold" colSpan={2}>
                  Construction Work-in-Progress
                </TableCell>
              </TableRow>
              {assets.constructionWIP.map((row) => (
                <TableRow key={row.phase}>
                  <TableCell className="pl-8">{row.phase}</TableCell>
                  <TableCell className="text-right font-mono">
                    {formatBDT(row.amount)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="border-t-2">
                <TableCell className="pl-8 font-semibold">
                  Sub-total: Construction WIP
                </TableCell>
                <TableCell className="text-right font-mono font-semibold">
                  {formatBDT(totalWIP)}
                </TableCell>
              </TableRow>

              <TableRow className="bg-muted/30">
                <TableCell className="font-semibold" colSpan={2}>
                  Advances
                </TableCell>
              </TableRow>
              {assets.advances.map((row) => (
                <TableRow key={row.item}>
                  <TableCell className="pl-8">{row.item}</TableCell>
                  <TableCell className="text-right font-mono">
                    {formatBDT(row.amount)}
                  </TableCell>
                </TableRow>
              ))}

              <TableRow className="bg-muted/30">
                <TableCell className="font-semibold" colSpan={2}>
                  Receivables
                </TableCell>
              </TableRow>
              {assets.receivables.map((row) => (
                <TableRow key={row.item}>
                  <TableCell className="pl-8">{row.item}</TableCell>
                  <TableCell className="text-right font-mono">
                    {formatBDT(row.amount)}
                  </TableCell>
                </TableRow>
              ))}

              <TableRow className="bg-muted/30">
                <TableCell className="font-semibold" colSpan={2}>
                  Inventory
                </TableCell>
              </TableRow>
              {assets.inventory.map((row) => (
                <TableRow key={row.item}>
                  <TableCell className="pl-8">{row.item}</TableCell>
                  <TableCell className="text-right font-mono">
                    {formatBDT(row.amount)}
                  </TableCell>
                </TableRow>
              ))}

              <TableRow className="border-t-2 bg-green-50">
                <TableCell className="font-bold text-green-800">
                  TOTAL ASSETS
                </TableCell>
                <TableCell className="text-right font-mono font-bold text-green-800">
                  {formatBDT(totalAssets)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Liabilities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-red-600" />
            Liabilities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60%]">Account</TableHead>
                <TableHead className="text-right">Amount (BDT)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {liabilities.map((row) => (
                <TableRow key={row.item}>
                  <TableCell>{row.item}</TableCell>
                  <TableCell className="text-right font-mono">
                    {formatBDT(row.amount)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="border-t-2 bg-red-50">
                <TableCell className="font-bold text-red-800">
                  TOTAL LIABILITIES
                </TableCell>
                <TableCell className="text-right font-mono font-bold text-red-800">
                  {formatBDT(totalLiabilities)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Separator className="my-4" />

          <div className="flex justify-between items-center px-4 py-3 bg-blue-50 rounded-lg">
            <span className="text-lg font-bold text-blue-900">
              NET POSITION (Assets - Liabilities)
            </span>
            <span className="text-xl font-bold font-mono text-blue-900">
              {formatBDT(netPosition)}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
