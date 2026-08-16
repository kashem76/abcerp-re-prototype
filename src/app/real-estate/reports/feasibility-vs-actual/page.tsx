"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { formatBDT, formatNumber } from "@/lib/mock-data";
import { GitCompareArrows, TrendingUp, TrendingDown, AlertTriangle, Info } from "lucide-react";

type LineItem = {
  line: string;
  feasibility: number;
  actual: number;
  indent?: number;
  isBold?: boolean;
  isRevenue?: boolean;
  isMetric?: boolean;
  unit?: string;
};

const revenueLines: LineItem[] = [
  { line: "Apartment Sales (32 units)", feasibility: 820_000_000, actual: 785_000_000, isRevenue: true },
  { line: "Parking Space Sales (48 slots)", feasibility: 48_000_000, actual: 52_500_000, isRevenue: true },
  { line: "Commercial Space (Ground Floor)", feasibility: 65_000_000, actual: 68_200_000, isRevenue: true },
  { line: "Utility Connection Charges", feasibility: 17_000_000, actual: 15_800_000, isRevenue: true },
];

const costLines: LineItem[] = [
  { line: "Land Acquisition Cost", feasibility: 120_000_000, actual: 125_400_000 },
  { line: "Foundation & Piling", feasibility: 52_000_000, actual: 55_800_000, indent: 1 },
  { line: "Structural (RCC Frame)", feasibility: 135_000_000, actual: 142_300_000, indent: 1 },
  { line: "MEP (Mechanical/Electrical/Plumbing)", feasibility: 68_000_000, actual: 63_500_000, indent: 1 },
  { line: "Finishing & Interior", feasibility: 95_000_000, actual: 88_200_000, indent: 1 },
  { line: "External Development", feasibility: 28_000_000, actual: 26_100_000, indent: 1 },
  { line: "Consultant Fees", feasibility: 18_000_000, actual: 18_500_000 },
  { line: "Statutory & Approval Costs", feasibility: 12_000_000, actual: 14_200_000 },
  { line: "Marketing & Sales Commission", feasibility: 22_000_000, actual: 19_800_000 },
  { line: "Finance Cost (Interest)", feasibility: 35_000_000, actual: 32_000_000 },
  { line: "Contingency Reserve", feasibility: 25_000_000, actual: 18_400_000 },
  { line: "Overhead Allocation", feasibility: 28_000_000, actual: 30_200_000 },
];

const totalRevFeas = revenueLines.reduce((s, r) => s + r.feasibility, 0);
const totalRevActual = revenueLines.reduce((s, r) => s + r.actual, 0);
const totalCostFeas = costLines.reduce((s, c) => s + c.feasibility, 0);
const totalCostActual = costLines.reduce((s, c) => s + c.actual, 0);
const profitFeas = totalRevFeas - totalCostFeas;
const profitActual = totalRevActual - totalCostActual;
const marginFeas = ((profitFeas / totalRevFeas) * 100).toFixed(1);
const marginActual = ((profitActual / totalRevActual) * 100).toFixed(1);

const metricLines: LineItem[] = [
  { line: "Net Profit", feasibility: profitFeas, actual: profitActual, isBold: true, isRevenue: true },
  { line: "Net Margin (%)", feasibility: parseFloat(marginFeas), actual: parseFloat(marginActual), isMetric: true, unit: "%" },
  { line: "IRR (Internal Rate of Return)", feasibility: 24.5, actual: 21.8, isMetric: true, unit: "%" },
  { line: "Payback Period", feasibility: 3.2, actual: 3.6, isMetric: true, unit: " years" },
];

function getVariance(feas: number, actual: number) {
  const diff = actual - feas;
  const pct = feas !== 0 ? ((diff / Math.abs(feas)) * 100).toFixed(1) : "—";
  return { diff, pct };
}

function isFavorable(diff: number, isRevenue: boolean) {
  return isRevenue ? diff >= 0 : diff <= 0;
}

export default function FeasibilityVsActualPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <GitCompareArrows className="h-6 w-6 text-gray-400" />
          Feasibility vs Actual — ABC Nasirabad Heights
        </h1>
        <p className="text-gray-500">
          Line-by-line comparison of feasibility projections against actual/forecast figures
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Revenue Variance",
            feas: totalRevFeas,
            actual: totalRevActual,
            isRev: true,
          },
          {
            label: "Cost Variance",
            feas: totalCostFeas,
            actual: totalCostActual,
            isRev: false,
          },
          {
            label: "Profit Variance",
            feas: profitFeas,
            actual: profitActual,
            isRev: true,
          },
          {
            label: "Margin Change",
            feas: parseFloat(marginFeas),
            actual: parseFloat(marginActual),
            isRev: true,
            isPercent: true,
          },
        ].map((card) => {
          const v = getVariance(card.feas, card.actual);
          const fav = isFavorable(v.diff, card.isRev);
          return (
            <Card key={card.label}>
              <CardContent className="pt-4 pb-3">
                <p className="text-xs text-gray-500 mb-1">{card.label}</p>
                <div className="flex items-center gap-2">
                  {fav ? (
                    <TrendingUp className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-500" />
                  )}
                  <span className={`text-lg font-bold ${fav ? "text-emerald-600" : "text-red-600"}`}>
                    {(card as { isPercent?: boolean }).isPercent
                      ? `${v.diff >= 0 ? "+" : ""}${v.diff.toFixed(1)}pp`
                      : `${v.diff >= 0 ? "+" : ""}${formatBDT(v.diff)}`}
                  </span>
                </div>
                <p className="text-xs text-gray-400">{v.pct}% {fav ? "favorable" : "unfavorable"}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Comparison Table */}
      <Card>
        <CardContent className="pt-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[280px]">Line Item</TableHead>
                  <TableHead className="text-right">Feasibility</TableHead>
                  <TableHead className="text-right">Actual / Forecast</TableHead>
                  <TableHead className="text-right">Variance</TableHead>
                  <TableHead className="text-right">Var %</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Revenue Section */}
                <TableRow className="bg-blue-50 font-semibold">
                  <TableCell colSpan={5}>REVENUE</TableCell>
                </TableRow>
                {revenueLines.map((r) => {
                  const v = getVariance(r.feasibility, r.actual);
                  const fav = isFavorable(v.diff, true);
                  const color = v.diff === 0 ? "text-gray-500" : fav ? "text-emerald-600" : "text-red-600";
                  return (
                    <TableRow key={r.line}>
                      <TableCell className="pl-6">{r.line}</TableCell>
                      <TableCell className="text-right">{formatBDT(r.feasibility)}</TableCell>
                      <TableCell className="text-right">{formatBDT(r.actual)}</TableCell>
                      <TableCell className={`text-right ${color}`}>
                        {v.diff >= 0 ? "+" : ""}{formatBDT(v.diff)}
                      </TableCell>
                      <TableCell className={`text-right ${color}`}>{v.pct}%</TableCell>
                    </TableRow>
                  );
                })}
                <TableRow className="font-bold border-t">
                  <TableCell>Total Revenue</TableCell>
                  <TableCell className="text-right">{formatBDT(totalRevFeas)}</TableCell>
                  <TableCell className="text-right">{formatBDT(totalRevActual)}</TableCell>
                  {(() => {
                    const v = getVariance(totalRevFeas, totalRevActual);
                    const fav = isFavorable(v.diff, true);
                    const color = fav ? "text-emerald-600" : "text-red-600";
                    return (
                      <>
                        <TableCell className={`text-right ${color}`}>
                          {v.diff >= 0 ? "+" : ""}{formatBDT(v.diff)}
                        </TableCell>
                        <TableCell className={`text-right ${color}`}>{v.pct}%</TableCell>
                      </>
                    );
                  })()}
                </TableRow>

                {/* Cost Section */}
                <TableRow className="bg-red-50 font-semibold">
                  <TableCell colSpan={5}>COSTS</TableCell>
                </TableRow>
                {costLines.map((c) => {
                  const v = getVariance(c.feasibility, c.actual);
                  const fav = isFavorable(v.diff, false);
                  const color = v.diff === 0 ? "text-gray-500" : fav ? "text-emerald-600" : "text-red-600";
                  return (
                    <TableRow key={c.line}>
                      <TableCell className={c.indent ? "pl-10" : "pl-6"}>
                        {c.line}
                      </TableCell>
                      <TableCell className="text-right">{formatBDT(c.feasibility)}</TableCell>
                      <TableCell className="text-right">{formatBDT(c.actual)}</TableCell>
                      <TableCell className={`text-right ${color}`}>
                        {v.diff >= 0 ? "+" : ""}{formatBDT(v.diff)}
                      </TableCell>
                      <TableCell className={`text-right ${color}`}>{v.pct}%</TableCell>
                    </TableRow>
                  );
                })}
                <TableRow className="font-bold border-t">
                  <TableCell>Total Costs</TableCell>
                  <TableCell className="text-right">{formatBDT(totalCostFeas)}</TableCell>
                  <TableCell className="text-right">{formatBDT(totalCostActual)}</TableCell>
                  {(() => {
                    const v = getVariance(totalCostFeas, totalCostActual);
                    const fav = isFavorable(v.diff, false);
                    const color = fav ? "text-emerald-600" : "text-red-600";
                    return (
                      <>
                        <TableCell className={`text-right ${color}`}>
                          {v.diff >= 0 ? "+" : ""}{formatBDT(v.diff)}
                        </TableCell>
                        <TableCell className={`text-right ${color}`}>{v.pct}%</TableCell>
                      </>
                    );
                  })()}
                </TableRow>

                {/* Metrics Section */}
                <TableRow className="bg-purple-50 font-semibold">
                  <TableCell colSpan={5}>KEY METRICS</TableCell>
                </TableRow>
                {metricLines.map((m) => {
                  const v = getVariance(m.feasibility, m.actual);
                  const fav = m.line === "Payback Period"
                    ? v.diff <= 0
                    : v.diff >= 0;
                  const color = v.diff === 0 ? "text-gray-500" : fav ? "text-emerald-600" : "text-red-600";
                  return (
                    <TableRow key={m.line} className={m.isBold ? "font-bold" : ""}>
                      <TableCell className="pl-6">{m.line}</TableCell>
                      <TableCell className="text-right">
                        {m.isMetric ? `${m.feasibility}${m.unit}` : formatBDT(m.feasibility)}
                      </TableCell>
                      <TableCell className="text-right">
                        {m.isMetric ? `${m.actual}${m.unit}` : formatBDT(m.actual)}
                      </TableCell>
                      <TableCell className={`text-right ${color}`}>
                        {m.isMetric
                          ? `${v.diff >= 0 ? "+" : ""}${v.diff.toFixed(1)}${m.unit}`
                          : `${v.diff >= 0 ? "+" : ""}${formatBDT(v.diff)}`}
                      </TableCell>
                      <TableCell className={`text-right ${color}`}>{v.pct}%</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Insight Box */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Info className="h-4 w-4 text-blue-600" />
            Key Variance Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-3">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
            <p>
              <strong>Revenue shortfall of {formatBDT(totalRevFeas - totalRevActual)}:</strong> Apartment sales are
              below feasibility by {formatBDT(820_000_000 - 785_000_000)} due to 4 unsold units being repriced
              downward. Parking and commercial sales partially offset this gap.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
            <p>
              <strong>Construction cost overrun of {formatBDT(constructionOverrun())}:</strong> Foundation and structural
              costs exceeded feasibility by {formatBDT(55_800_000 + 142_300_000 - 52_000_000 - 135_000_000)} due to
              additional piling and steel price increases. MEP and finishing came in under budget.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
            <p>
              <strong>Contingency savings of {formatBDT(25_000_000 - 18_400_000)}:</strong> Only 73.6% of contingency
              reserve utilized, indicating good project risk management.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <TrendingDown className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
            <p>
              <strong>IRR declined from 24.5% to 21.8%:</strong> Net impact of lower revenue and higher costs reduced
              project returns by 2.7 percentage points. Still above the company&apos;s 18% hurdle rate.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function constructionOverrun() {
  const feasConstruction = 52_000_000 + 135_000_000 + 68_000_000 + 95_000_000 + 28_000_000;
  const actualConstruction = 55_800_000 + 142_300_000 + 63_500_000 + 88_200_000 + 26_100_000;
  return actualConstruction - feasConstruction;
}
