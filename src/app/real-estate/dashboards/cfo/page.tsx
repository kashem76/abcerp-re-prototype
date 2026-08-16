"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { formatBDT, formatNumber } from "@/lib/mock-data";
import {
  Wallet, TrendingUp, TrendingDown, Building2, Banknote,
  AlertTriangle, ArrowUpRight, ArrowDownRight, Landmark, Calendar,
} from "lucide-react";

// KPI Data
const kpis = {
  cashPosition: 48_500_000,
  monthlyBurnRate: 18_200_000,
  monthsRunway: 2.7,
  totalAR: 7_580_000,
  totalAP: 32_400_000,
  netWorkingCapital: 23_680_000,
};

// Cash Flow
const cashFlow = {
  collectionsThisMonth: 12_800_000,
  collectionsLastMonth: 10_200_000,
  paymentsThisMonth: 18_200_000,
  netCashFlow: -5_400_000,
};

// Project Financial Health
const projectHealth = [
  {
    project: "ABC Nasirabad Heights",
    budget: 700_000_000,
    spent: 285_000_000,
    committed: 145_000_000,
    available: 270_000_000,
    risk: "LOW",
  },
  {
    project: "Bay View Residence",
    budget: 440_000_000,
    spent: 361_000_000,
    committed: 52_000_000,
    available: 27_000_000,
    risk: "HIGH",
  },
  {
    project: "Green Valley Township",
    budget: 520_000_000,
    spent: 78_000_000,
    committed: 95_000_000,
    available: 347_000_000,
    risk: "LOW",
  },
  {
    project: "Halishahar Commercial",
    budget: 280_000_000,
    spent: 245_000_000,
    committed: 42_000_000,
    available: -7_000_000,
    risk: "CRITICAL",
  },
];

// Fund Requirements
const fundRequirements = [
  { period: "Next 30 Days", contractors: 12_500_000, materials: 4_200_000, overheads: 3_800_000, statutory: 1_200_000, total: 21_700_000 },
  { period: "31-60 Days", contractors: 15_800_000, materials: 5_600_000, overheads: 3_800_000, statutory: 800_000, total: 26_000_000 },
  { period: "61-90 Days", contractors: 18_200_000, materials: 6_100_000, overheads: 3_800_000, statutory: 2_500_000, total: 30_600_000 },
];

// Collection Performance
const collectionPerformance = [
  { project: "ABC Nasirabad Heights", demanded: 18_500_000, collected: 12_800_000 },
  { project: "Bay View Residence", demanded: 8_200_000, collected: 7_600_000 },
  { project: "Green Valley Township", demanded: 5_400_000, collected: 3_200_000 },
  { project: "Halishahar Commercial", demanded: 3_800_000, collected: 3_500_000 },
];

// Bank Balances
const bankBalances = [
  { bank: "Islami Bank Bangladesh Ltd", accountNo: "1234-5678-001", type: "Current", balance: 22_300_000 },
  { bank: "Dutch Bangla Bank Ltd", accountNo: "9876-5432-002", type: "Current", balance: 15_800_000 },
  { bank: "BRAC Bank Ltd", accountNo: "5555-1234-003", type: "STD", balance: 8_400_000 },
  { bank: "Eastern Bank Ltd", accountNo: "7777-8888-004", type: "FDR", balance: 2_000_000 },
];

const totalBankBalance = bankBalances.reduce((s, b) => s + b.balance, 0);

const riskColors: Record<string, string> = {
  LOW: "bg-emerald-100 text-emerald-800",
  MEDIUM: "bg-yellow-100 text-yellow-800",
  HIGH: "bg-orange-100 text-orange-800",
  CRITICAL: "bg-red-100 text-red-800",
};

export default function CFODashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Wallet className="h-6 w-6 text-gray-400" />
          CFO Dashboard — ABC Properties Ltd
        </h1>
        <p className="text-gray-500">Financial overview as of 12 August 2026</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Cash Position", value: kpis.cashPosition, icon: Banknote, color: "text-emerald-600" },
          { label: "Monthly Burn Rate", value: kpis.monthlyBurnRate, icon: TrendingDown, color: "text-red-600" },
          { label: "Months of Runway", value: null, display: `${kpis.monthsRunway} months`, icon: Calendar, color: kpis.monthsRunway < 3 ? "text-red-600" : "text-emerald-600" },
          { label: "Total AR", value: kpis.totalAR, icon: ArrowUpRight, color: "text-blue-600" },
          { label: "Total AP", value: kpis.totalAP, icon: ArrowDownRight, color: "text-orange-600" },
          { label: "Net Working Capital", value: kpis.netWorkingCapital, icon: TrendingUp, color: "text-purple-600" },
        ].map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="pt-4 pb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">{kpi.label}</span>
                <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
              </div>
              <p className={`text-lg font-bold ${kpi.color}`}>
                {kpi.display ?? formatBDT(kpi.value!)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cash Flow Summary + Collection Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Banknote className="h-4 w-4" />
              Cash Flow Summary — August 2026
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-gray-500">Collections This Month</p>
                <p className="text-xl font-bold text-emerald-600">{formatBDT(cashFlow.collectionsThisMonth)}</p>
                <p className="text-xs text-gray-400">
                  vs Last Month: {formatBDT(cashFlow.collectionsLastMonth)}
                  <span className="text-emerald-600 ml-1">
                    (+{(((cashFlow.collectionsThisMonth - cashFlow.collectionsLastMonth) / cashFlow.collectionsLastMonth) * 100).toFixed(0)}%)
                  </span>
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500">Payments This Month</p>
                <p className="text-xl font-bold text-red-600">{formatBDT(cashFlow.paymentsThisMonth)}</p>
              </div>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="font-medium">Net Cash Flow</span>
              <span className={`text-xl font-bold ${cashFlow.netCashFlow >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                {formatBDT(cashFlow.netCashFlow)}
              </span>
            </div>
            {cashFlow.netCashFlow < 0 && (
              <div className="flex items-center gap-2 p-2 bg-red-50 rounded text-sm text-red-700">
                <AlertTriangle className="h-4 w-4" />
                <span>Negative cash flow — collections trailing payments by {formatBDT(Math.abs(cashFlow.netCashFlow))}</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Collection Performance — This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {collectionPerformance.map((cp) => {
                const pct = Math.round((cp.collected / cp.demanded) * 100);
                return (
                  <div key={cp.project} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{cp.project}</span>
                      <span className={`font-semibold ${pct >= 80 ? "text-emerald-600" : pct >= 60 ? "text-yellow-600" : "text-red-600"}`}>
                        {pct}%
                      </span>
                    </div>
                    <Progress value={pct} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Demanded: {formatBDT(cp.demanded)}</span>
                      <span>Collected: {formatBDT(cp.collected)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Financial Health */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Project-wise Financial Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead className="text-right">Budget</TableHead>
                <TableHead className="text-right">Spent</TableHead>
                <TableHead className="text-right">Committed</TableHead>
                <TableHead className="text-right">Available</TableHead>
                <TableHead className="text-right">Utilization</TableHead>
                <TableHead className="text-center">Risk</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projectHealth.map((p) => {
                const utilization = Math.round(((p.spent + p.committed) / p.budget) * 100);
                return (
                  <TableRow key={p.project}>
                    <TableCell className="font-medium">{p.project}</TableCell>
                    <TableCell className="text-right">{formatBDT(p.budget)}</TableCell>
                    <TableCell className="text-right">{formatBDT(p.spent)}</TableCell>
                    <TableCell className="text-right">{formatBDT(p.committed)}</TableCell>
                    <TableCell className={`text-right font-semibold ${p.available < 0 ? "text-red-600" : ""}`}>
                      {formatBDT(p.available)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <Progress value={Math.min(utilization, 100)} className="h-2 w-16" />
                        <span className="text-sm">{utilization}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className={riskColors[p.risk]}>{p.risk}</Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Fund Requirements + Bank Balances */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Upcoming Fund Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Period</TableHead>
                  <TableHead className="text-right">Contractors</TableHead>
                  <TableHead className="text-right">Materials</TableHead>
                  <TableHead className="text-right">Overheads</TableHead>
                  <TableHead className="text-right">Statutory</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fundRequirements.map((fr) => (
                  <TableRow key={fr.period}>
                    <TableCell className="font-medium">{fr.period}</TableCell>
                    <TableCell className="text-right">{formatBDT(fr.contractors)}</TableCell>
                    <TableCell className="text-right">{formatBDT(fr.materials)}</TableCell>
                    <TableCell className="text-right">{formatBDT(fr.overheads)}</TableCell>
                    <TableCell className="text-right">{formatBDT(fr.statutory)}</TableCell>
                    <TableCell className="text-right font-bold">{formatBDT(fr.total)}</TableCell>
                  </TableRow>
                ))}
                <TableRow className="font-bold border-t-2">
                  <TableCell>90-Day Total</TableCell>
                  <TableCell className="text-right">
                    {formatBDT(fundRequirements.reduce((s, f) => s + f.contractors, 0))}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatBDT(fundRequirements.reduce((s, f) => s + f.materials, 0))}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatBDT(fundRequirements.reduce((s, f) => s + f.overheads, 0))}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatBDT(fundRequirements.reduce((s, f) => s + f.statutory, 0))}
                  </TableCell>
                  <TableCell className="text-right text-red-600">
                    {formatBDT(fundRequirements.reduce((s, f) => s + f.total, 0))}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Landmark className="h-4 w-4" />
              Bank Balance Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bank</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Balance (BDT)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bankBalances.map((b) => (
                  <TableRow key={b.accountNo}>
                    <TableCell className="font-medium">{b.bank}</TableCell>
                    <TableCell className="font-mono text-sm">{b.accountNo}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{b.type}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">{formatBDT(b.balance)}</TableCell>
                  </TableRow>
                ))}
                <TableRow className="font-bold border-t-2">
                  <TableCell colSpan={3}>Total Bank Balance</TableCell>
                  <TableCell className="text-right text-emerald-600 text-lg">{formatBDT(totalBankBalance)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
