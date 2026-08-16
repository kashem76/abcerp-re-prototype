"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { formatBDT, formatNumber } from "@/lib/mock-data";
import { BarChart3, TrendingUp, TrendingDown, DollarSign } from "lucide-react";

const plData = {
  revenue: [
    { line: "Apartment Sales (32 units)", feasibility: 820_000_000, actual: 785_000_000 },
    { line: "Parking Space Sales", feasibility: 48_000_000, actual: 52_500_000 },
    { line: "Commercial Space (Ground Floor)", feasibility: 65_000_000, actual: 68_200_000 },
    { line: "Utility Connection Charges", feasibility: 17_000_000, actual: 15_800_000 },
  ],
  costOfSales: {
    land: { line: "Land Acquisition Cost", feasibility: 120_000_000, actual: 125_400_000 },
    construction: [
      { line: "Foundation & Piling", feasibility: 52_000_000, actual: 55_800_000 },
      { line: "Structural (RCC Frame)", feasibility: 135_000_000, actual: 142_300_000 },
      { line: "MEP (Mechanical/Electrical/Plumbing)", feasibility: 68_000_000, actual: 63_500_000 },
      { line: "Finishing & Interior", feasibility: 95_000_000, actual: 88_200_000 },
      { line: "External Development", feasibility: 28_000_000, actual: 26_100_000 },
    ],
    other: [
      { line: "Consultant Fees (Arch/Struct/MEP)", feasibility: 18_000_000, actual: 18_500_000 },
      { line: "Statutory & Approval Costs", feasibility: 12_000_000, actual: 14_200_000 },
      { line: "Marketing & Sales Commission", feasibility: 22_000_000, actual: 19_800_000 },
      { line: "Finance Cost (Interest)", feasibility: 35_000_000, actual: 32_000_000 },
      { line: "Contingency Reserve", feasibility: 25_000_000, actual: 18_400_000 },
    ],
  },
  overheadAllocation: { line: "Overhead Allocation (Admin, HR, Office)", feasibility: 28_000_000, actual: 30_200_000 },
};

// Totals
const totalRevenueFeas = plData.revenue.reduce((s, r) => s + r.feasibility, 0);
const totalRevenueActual = plData.revenue.reduce((s, r) => s + r.actual, 0);

const allCosts = [
  plData.costOfSales.land,
  ...plData.costOfSales.construction,
  ...plData.costOfSales.other,
];
const totalCostFeas = allCosts.reduce((s, c) => s + c.feasibility, 0);
const totalCostActual = allCosts.reduce((s, c) => s + c.actual, 0);

const constructionFeas = plData.costOfSales.construction.reduce((s, c) => s + c.feasibility, 0);
const constructionActual = plData.costOfSales.construction.reduce((s, c) => s + c.actual, 0);

const grossProfitFeas = totalRevenueFeas - totalCostFeas;
const grossProfitActual = totalRevenueActual - totalCostActual;
const grossMarginFeas = ((grossProfitFeas / totalRevenueFeas) * 100).toFixed(1);
const grossMarginActual = ((grossProfitActual / totalRevenueActual) * 100).toFixed(1);

const netProfitFeas = grossProfitFeas - plData.overheadAllocation.feasibility;
const netProfitActual = grossProfitActual - plData.overheadAllocation.actual;
const netMarginFeas = ((netProfitFeas / totalRevenueFeas) * 100).toFixed(1);
const netMarginActual = ((netProfitActual / totalRevenueActual) * 100).toFixed(1);

function variance(feas: number, actual: number) {
  const diff = actual - feas;
  const pct = feas !== 0 ? ((diff / feas) * 100).toFixed(1) : "—";
  return { diff, pct };
}

function VarianceCell({ feas, actual, isRevenue = false }: { feas: number; actual: number; isRevenue?: boolean }) {
  const v = variance(feas, actual);
  const favorable = isRevenue ? v.diff >= 0 : v.diff <= 0;
  const color = v.diff === 0 ? "text-gray-500" : favorable ? "text-emerald-600" : "text-red-600";
  return (
    <>
      <TableCell className={`text-right ${color}`}>
        {v.diff >= 0 ? "" : "("}{formatBDT(Math.abs(v.diff))}{v.diff < 0 ? ")" : ""}
      </TableCell>
      <TableCell className={`text-right ${color}`}>{v.pct}%</TableCell>
    </>
  );
}

export default function ProjectPLPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-gray-400" />
          Project Profit & Loss — ABC Nasirabad Heights
        </h1>
        <p className="text-gray-500">
          Feasibility vs Actual/Forecast comparison as of August 2026
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Total Revenue", value: totalRevenueActual, icon: DollarSign, color: "text-blue-600" },
          { label: "Total COGS", value: totalCostActual, icon: TrendingDown, color: "text-red-600" },
          { label: "Gross Profit", value: grossProfitActual, icon: TrendingUp, color: "text-emerald-600" },
          { label: "Gross Margin", value: null, display: `${grossMarginActual}%`, icon: BarChart3, color: "text-purple-600" },
          { label: "Net Profit", value: netProfitActual, icon: TrendingUp, color: "text-emerald-700" },
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

      {/* P&L Table */}
      <Card>
        <CardContent className="pt-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[280px]">Line Item</TableHead>
                  <TableHead className="text-right">Feasibility (BDT)</TableHead>
                  <TableHead className="text-right">%</TableHead>
                  <TableHead className="text-right">Actual/Forecast (BDT)</TableHead>
                  <TableHead className="text-right">%</TableHead>
                  <TableHead className="text-right">Variance (BDT)</TableHead>
                  <TableHead className="text-right">Var %</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Revenue */}
                <TableRow className="bg-blue-50 font-semibold">
                  <TableCell colSpan={7}>REVENUE</TableCell>
                </TableRow>
                {plData.revenue.map((r) => {
                  const feasPct = ((r.feasibility / totalRevenueFeas) * 100).toFixed(1);
                  const actPct = ((r.actual / totalRevenueActual) * 100).toFixed(1);
                  return (
                    <TableRow key={r.line}>
                      <TableCell className="pl-6">{r.line}</TableCell>
                      <TableCell className="text-right">{formatBDT(r.feasibility)}</TableCell>
                      <TableCell className="text-right text-gray-400">{feasPct}%</TableCell>
                      <TableCell className="text-right">{formatBDT(r.actual)}</TableCell>
                      <TableCell className="text-right text-gray-400">{actPct}%</TableCell>
                      <VarianceCell feas={r.feasibility} actual={r.actual} isRevenue />
                    </TableRow>
                  );
                })}
                <TableRow className="font-bold border-t-2">
                  <TableCell>Total Revenue</TableCell>
                  <TableCell className="text-right">{formatBDT(totalRevenueFeas)}</TableCell>
                  <TableCell className="text-right">100%</TableCell>
                  <TableCell className="text-right">{formatBDT(totalRevenueActual)}</TableCell>
                  <TableCell className="text-right">100%</TableCell>
                  <VarianceCell feas={totalRevenueFeas} actual={totalRevenueActual} isRevenue />
                </TableRow>

                {/* Cost of Sales */}
                <TableRow className="bg-red-50 font-semibold">
                  <TableCell colSpan={7}>LESS: COST OF SALES</TableCell>
                </TableRow>

                {/* Land */}
                <TableRow>
                  <TableCell className="pl-6">{plData.costOfSales.land.line}</TableCell>
                  <TableCell className="text-right">{formatBDT(plData.costOfSales.land.feasibility)}</TableCell>
                  <TableCell className="text-right text-gray-400">
                    {((plData.costOfSales.land.feasibility / totalRevenueFeas) * 100).toFixed(1)}%
                  </TableCell>
                  <TableCell className="text-right">{formatBDT(plData.costOfSales.land.actual)}</TableCell>
                  <TableCell className="text-right text-gray-400">
                    {((plData.costOfSales.land.actual / totalRevenueActual) * 100).toFixed(1)}%
                  </TableCell>
                  <VarianceCell feas={plData.costOfSales.land.feasibility} actual={plData.costOfSales.land.actual} />
                </TableRow>

                {/* Construction sub-header */}
                <TableRow className="bg-gray-50">
                  <TableCell className="pl-6 font-medium text-gray-600">Construction</TableCell>
                  <TableCell className="text-right font-medium text-gray-600">{formatBDT(constructionFeas)}</TableCell>
                  <TableCell className="text-right text-gray-400">
                    {((constructionFeas / totalRevenueFeas) * 100).toFixed(1)}%
                  </TableCell>
                  <TableCell className="text-right font-medium text-gray-600">{formatBDT(constructionActual)}</TableCell>
                  <TableCell className="text-right text-gray-400">
                    {((constructionActual / totalRevenueActual) * 100).toFixed(1)}%
                  </TableCell>
                  <VarianceCell feas={constructionFeas} actual={constructionActual} />
                </TableRow>
                {plData.costOfSales.construction.map((c) => (
                  <TableRow key={c.line}>
                    <TableCell className="pl-10 text-gray-600">{c.line}</TableCell>
                    <TableCell className="text-right">{formatBDT(c.feasibility)}</TableCell>
                    <TableCell className="text-right text-gray-400">
                      {((c.feasibility / totalRevenueFeas) * 100).toFixed(1)}%
                    </TableCell>
                    <TableCell className="text-right">{formatBDT(c.actual)}</TableCell>
                    <TableCell className="text-right text-gray-400">
                      {((c.actual / totalRevenueActual) * 100).toFixed(1)}%
                    </TableCell>
                    <VarianceCell feas={c.feasibility} actual={c.actual} />
                  </TableRow>
                ))}

                {/* Other costs */}
                {plData.costOfSales.other.map((c) => (
                  <TableRow key={c.line}>
                    <TableCell className="pl-6">{c.line}</TableCell>
                    <TableCell className="text-right">{formatBDT(c.feasibility)}</TableCell>
                    <TableCell className="text-right text-gray-400">
                      {((c.feasibility / totalRevenueFeas) * 100).toFixed(1)}%
                    </TableCell>
                    <TableCell className="text-right">{formatBDT(c.actual)}</TableCell>
                    <TableCell className="text-right text-gray-400">
                      {((c.actual / totalRevenueActual) * 100).toFixed(1)}%
                    </TableCell>
                    <VarianceCell feas={c.feasibility} actual={c.actual} />
                  </TableRow>
                ))}

                <TableRow className="font-bold border-t-2">
                  <TableCell>Total Cost of Sales</TableCell>
                  <TableCell className="text-right">{formatBDT(totalCostFeas)}</TableCell>
                  <TableCell className="text-right">
                    {((totalCostFeas / totalRevenueFeas) * 100).toFixed(1)}%
                  </TableCell>
                  <TableCell className="text-right">{formatBDT(totalCostActual)}</TableCell>
                  <TableCell className="text-right">
                    {((totalCostActual / totalRevenueActual) * 100).toFixed(1)}%
                  </TableCell>
                  <VarianceCell feas={totalCostFeas} actual={totalCostActual} />
                </TableRow>

                {/* Gross Profit */}
                <TableRow className="font-bold bg-emerald-50 text-lg">
                  <TableCell>GROSS PROFIT</TableCell>
                  <TableCell className="text-right">{formatBDT(grossProfitFeas)}</TableCell>
                  <TableCell className="text-right">{grossMarginFeas}%</TableCell>
                  <TableCell className="text-right">{formatBDT(grossProfitActual)}</TableCell>
                  <TableCell className="text-right">{grossMarginActual}%</TableCell>
                  <VarianceCell feas={grossProfitFeas} actual={grossProfitActual} isRevenue />
                </TableRow>

                {/* Overhead */}
                <TableRow className="bg-gray-50 font-semibold">
                  <TableCell colSpan={7}>LESS: OVERHEAD ALLOCATION</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="pl-6">{plData.overheadAllocation.line}</TableCell>
                  <TableCell className="text-right">{formatBDT(plData.overheadAllocation.feasibility)}</TableCell>
                  <TableCell className="text-right text-gray-400">
                    {((plData.overheadAllocation.feasibility / totalRevenueFeas) * 100).toFixed(1)}%
                  </TableCell>
                  <TableCell className="text-right">{formatBDT(plData.overheadAllocation.actual)}</TableCell>
                  <TableCell className="text-right text-gray-400">
                    {((plData.overheadAllocation.actual / totalRevenueActual) * 100).toFixed(1)}%
                  </TableCell>
                  <VarianceCell feas={plData.overheadAllocation.feasibility} actual={plData.overheadAllocation.actual} />
                </TableRow>

                {/* Net Profit */}
                <TableRow className="font-bold bg-emerald-100 text-lg border-t-2">
                  <TableCell>NET PROFIT BEFORE TAX</TableCell>
                  <TableCell className="text-right">{formatBDT(netProfitFeas)}</TableCell>
                  <TableCell className="text-right">{netMarginFeas}%</TableCell>
                  <TableCell className="text-right">{formatBDT(netProfitActual)}</TableCell>
                  <TableCell className="text-right">{netMarginActual}%</TableCell>
                  <VarianceCell feas={netProfitFeas} actual={netProfitActual} isRevenue />
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
