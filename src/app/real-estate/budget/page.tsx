"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { budgetVsActual, formatNumber, formatBDT } from "@/lib/mock-data";
import { BarChart3, TrendingUp, AlertTriangle } from "lucide-react";

export default function BudgetPage() {
  const totalBudget = budgetVsActual.reduce((s, b) => s + b.budget, 0);
  const totalActual = budgetVsActual.reduce((s, b) => s + b.actual, 0);
  const totalCommitted = budgetVsActual.reduce((s, b) => s + b.committed, 0);
  const totalForecast = budgetVsActual.reduce((s, b) => s + b.forecast, 0);
  const totalVariance = totalForecast - totalBudget;
  const available = totalBudget - totalActual - totalCommitted;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-gray-400" />
          Budget vs Actual — ABC Nasirabad Heights
        </h1>
        <p className="text-gray-500">Project cost control dashboard</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        {[
          { label: "Original Budget", value: formatBDT(totalBudget), color: "text-gray-900" },
          { label: "Actual Spent", value: formatBDT(totalActual), color: "text-blue-600" },
          { label: "Committed (PO/WO)", value: formatBDT(totalCommitted), color: "text-purple-600" },
          { label: "Truly Available", value: formatBDT(available), color: available > 0 ? "text-emerald-600" : "text-red-600" },
          { label: "Forecast (EAC)", value: formatBDT(totalForecast), color: "text-orange-600" },
          { label: "Variance", value: `${totalVariance > 0 ? "+" : ""}${formatBDT(totalVariance)}`, color: totalVariance > 0 ? "text-red-600" : "text-emerald-600" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="pt-4 pb-3 text-center">
              <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Important: Truly Available explanation */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
        <div className="text-sm">
          <p className="font-medium text-amber-800">Truly Available ≠ Budget − Actual</p>
          <p className="text-amber-700 mt-1">
            Budget ({formatBDT(totalBudget)}) − Actual ({formatBDT(totalActual)}) = {formatBDT(totalBudget - totalActual)} apparent remaining.
            But {formatBDT(totalCommitted)} is already committed via signed POs and Work Orders.
            <strong> Truly Available = {formatBDT(available)}</strong>.
          </p>
        </div>
      </div>

      {/* Budget vs Actual Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Budget vs Actual by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Budget (BDT)</TableHead>
                <TableHead className="text-right">Actual (BDT)</TableHead>
                <TableHead className="text-right">Committed (BDT)</TableHead>
                <TableHead className="text-right">Forecast EAC (BDT)</TableHead>
                <TableHead className="text-right">Variance</TableHead>
                <TableHead className="text-right">Var %</TableHead>
                <TableHead className="w-32">Consumption</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {budgetVsActual.map((b) => (
                <TableRow key={b.category}>
                  <TableCell className="font-medium">{b.category}</TableCell>
                  <TableCell className="text-right font-mono">{formatNumber(b.budget)}</TableCell>
                  <TableCell className="text-right font-mono">{formatNumber(b.actual)}</TableCell>
                  <TableCell className="text-right font-mono text-purple-600">{formatNumber(b.committed)}</TableCell>
                  <TableCell className="text-right font-mono">{formatNumber(b.forecast)}</TableCell>
                  <TableCell className={`text-right font-mono font-semibold ${b.variance > 0 ? "text-red-600" : "text-emerald-600"}`}>
                    {b.variance > 0 ? "+" : ""}{formatNumber(b.variance)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge className={
                      Math.abs(b.variancePct) > 5 ? "bg-red-100 text-red-800" :
                      Math.abs(b.variancePct) > 2 ? "bg-yellow-100 text-yellow-800" :
                      "bg-emerald-100 text-emerald-800"
                    }>
                      {b.variancePct > 0 ? "+" : ""}{b.variancePct}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Progress value={b.budget > 0 ? (b.actual / b.budget) * 100 : 0} className="h-2" />
                    <p className="text-xs text-gray-400 mt-1">{b.budget > 0 ? ((b.actual / b.budget) * 100).toFixed(0) : 0}%</p>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="font-bold border-t-2">
                <TableCell>TOTAL</TableCell>
                <TableCell className="text-right font-mono">{formatNumber(totalBudget)}</TableCell>
                <TableCell className="text-right font-mono">{formatNumber(totalActual)}</TableCell>
                <TableCell className="text-right font-mono text-purple-600">{formatNumber(totalCommitted)}</TableCell>
                <TableCell className="text-right font-mono">{formatNumber(totalForecast)}</TableCell>
                <TableCell className={`text-right font-mono ${totalVariance > 0 ? "text-red-600" : "text-emerald-600"}`}>
                  +{formatNumber(totalVariance)}
                </TableCell>
                <TableCell className="text-right">
                  <Badge className="bg-red-100 text-red-800">+{((totalVariance / totalBudget) * 100).toFixed(1)}%</Badge>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Budget Waterfall */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4" /> Budget Waterfall
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 font-mono text-sm">
              <div className="flex justify-between">
                <span>Original BOQ (Baseline)</span>
                <span className="font-semibold">BDT {formatBDT(420_000_000)}</span>
              </div>
              <div className="flex justify-between text-blue-600">
                <span>+ VO-001 Extra pile work</span>
                <span>+ {formatBDT(8_500_000)}</span>
              </div>
              <div className="flex justify-between text-blue-600">
                <span>+ VO-002 Design change floor 8</span>
                <span>+ {formatBDT(3_200_000)}</span>
              </div>
              <div className="flex justify-between text-emerald-600">
                <span>- VO-003 Scope reduction external</span>
                <span>- {formatBDT(2_100_000)}</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>+ VO-004 Rate revision steel</span>
                <span>+ {formatBDT(12_400_000)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Current Approved Budget</span>
                <span>BDT {formatBDT(442_000_000)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Estimate at Completion (EAC)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 font-mono text-sm">
              <div className="flex justify-between">
                <span>Actual Cost to Date</span>
                <span>{formatBDT(285_000_000)}</span>
              </div>
              <div className="flex justify-between">
                <span>Committed (PO + WO not billed)</span>
                <span>{formatBDT(98_000_000)}</span>
              </div>
              <div className="flex justify-between">
                <span>Cost-to-Complete (estimate)</span>
                <span>{formatBDT(72_000_000)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Estimate at Completion (EAC)</span>
                <span className="text-orange-600">{formatBDT(455_000_000)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-red-600 font-semibold">
                <span>Variance vs Approved Budget</span>
                <span>+{formatBDT(13_000_000)} OVERRUN</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>Variance vs Original Baseline</span>
                <span>+{formatBDT(35_000_000)} OVERRUN</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700 font-medium">
                Forecast exceeds approved budget by BDT {formatBDT(13_000_000)} (2.9%).
                Primary driver: steel price increase (+8.2%) impacting structural work.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
