"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { boqItems, formatNumber } from "@/lib/mock-data";
import { Calculator, Lock, AlertTriangle } from "lucide-react";

export default function BOQPage() {
  const totalBOQ = boqItems.reduce((s, b) => s + b.amount, 0);
  const totalActual = boqItems.reduce((s, b) => s + b.actualAmount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Calculator className="h-6 w-6 text-gray-400" />
            Bill of Quantities — ABC Nasirabad Heights
          </h1>
          <p className="text-gray-500">Tower A — Foundation & Structure (sample)</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-emerald-100 text-emerald-800 gap-1">
            <Lock className="h-3 w-3" /> V1 — BASELINE (Locked)
          </Badge>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <Lock className="h-5 w-5 text-blue-600 mt-0.5" />
        <div className="text-sm">
          <p className="font-medium text-blue-800">Baseline is locked</p>
          <p className="text-blue-600">The approved BOQ V1 cannot be modified. All changes must go through Variation Orders. BASELINE + APPROVED VARIATIONS = CURRENT APPROVED BUDGET.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">BOQ Items with Variance Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>WBS</TableHead>
                <TableHead>Item</TableHead>
                <TableHead className="text-right">BOQ Qty</TableHead>
                <TableHead>UOM</TableHead>
                <TableHead className="text-right">BOQ Rate</TableHead>
                <TableHead className="text-right">BOQ Amount</TableHead>
                <TableHead className="text-right">Actual Qty</TableHead>
                <TableHead className="text-right">Actual Rate</TableHead>
                <TableHead className="text-right">Actual Amount</TableHead>
                <TableHead className="text-right">Variance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {boqItems.map((b) => (
                <TableRow key={b.code}>
                  <TableCell className="font-mono text-sm">{b.code}</TableCell>
                  <TableCell className="text-xs text-gray-500 max-w-48 truncate">{b.wbs}</TableCell>
                  <TableCell className="font-medium">{b.item}</TableCell>
                  <TableCell className="text-right font-mono text-sm">{formatNumber(b.qty)}</TableCell>
                  <TableCell className="text-sm">{b.uom}</TableCell>
                  <TableCell className="text-right font-mono text-sm">{formatNumber(b.rate)}</TableCell>
                  <TableCell className="text-right font-mono text-sm">{formatNumber(b.amount)}</TableCell>
                  <TableCell className="text-right font-mono text-sm">{formatNumber(b.actualQty)}</TableCell>
                  <TableCell className="text-right font-mono text-sm">{formatNumber(b.actualRate)}</TableCell>
                  <TableCell className="text-right font-mono text-sm">{formatNumber(b.actualAmount)}</TableCell>
                  <TableCell className="text-right">
                    <Badge className={
                      Math.abs(b.variance) > 10 ? "bg-red-100 text-red-800 font-bold" :
                      b.variance > 0 ? "bg-yellow-100 text-yellow-800" :
                      "bg-emerald-100 text-emerald-800"
                    }>
                      {b.variance > 0 ? "+" : ""}{b.variance}%
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="font-bold border-t-2 bg-gray-50">
                <TableCell colSpan={6}>TOTAL (sample items)</TableCell>
                <TableCell className="text-right font-mono">{formatNumber(totalBOQ)}</TableCell>
                <TableCell colSpan={2}></TableCell>
                <TableCell className="text-right font-mono">{formatNumber(totalActual)}</TableCell>
                <TableCell className="text-right">
                  <Badge className={totalActual > totalBOQ ? "bg-red-100 text-red-800" : "bg-emerald-100 text-emerald-800"}>
                    {totalActual > totalBOQ ? "+" : ""}{(((totalActual - totalBOQ) / totalBOQ) * 100).toFixed(1)}%
                  </Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Variance Alert */}
      <Card className="border-red-200 bg-red-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
            <div>
              <p className="font-medium text-red-800">Variance Alert — 2 items exceed 10% threshold</p>
              <ul className="text-sm text-red-700 mt-2 space-y-1">
                <li><strong>FND-001 Excavation:</strong> +14.3% variance — quantity overrun (2,680 vs 2,500 CFT) + rate increase</li>
                <li><strong>FND-002 Pile Work:</strong> +11.4% variance — rate increase (31,200 vs 28,000 per NOS)</li>
              </ul>
              <p className="text-xs text-red-600 mt-2">Action: Raise a Change Request to evaluate budget impact and initiate Variation Order if approved.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
