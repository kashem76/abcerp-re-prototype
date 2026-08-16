"use client";

import Link from "next/link";
import { ArrowLeft, BarChart3, AlertTriangle } from "lucide-react";
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
import { formatBDT, formatNumber } from "@/lib/mock-data";

interface BOQLine {
  code: string;
  wbs: string;
  item: string;
  uom: string;
  boqQty: number;
  actualQty: number;
  boqRate: number;
  actualRate: number;
}

const boqLines: BOQLine[] = [
  { code: "FND-001", wbs: "1.1 Foundation", item: "Earth Excavation", uom: "CFT", boqQty: 45000, actualQty: 48200, boqRate: 18, actualRate: 20 },
  { code: "FND-002", wbs: "1.1 Foundation", item: "Pile Driving (RCC)", uom: "RFT", boqQty: 12000, actualQty: 12350, boqRate: 420, actualRate: 435 },
  { code: "FND-003", wbs: "1.1 Foundation", item: "Pile Cap Concrete", uom: "CFT", boqQty: 8500, actualQty: 8800, boqRate: 350, actualRate: 360 },
  { code: "STR-001", wbs: "1.2 Structure", item: "RCC Column", uom: "CFT", boqQty: 6200, actualQty: 6450, boqRate: 480, actualRate: 510 },
  { code: "STR-002", wbs: "1.2 Structure", item: "RCC Beam", uom: "CFT", boqQty: 9800, actualQty: 9600, boqRate: 460, actualRate: 455 },
  { code: "STR-003", wbs: "1.2 Structure", item: "RCC Slab", uom: "CFT", boqQty: 22000, actualQty: 22800, boqRate: 420, actualRate: 440 },
  { code: "STR-004", wbs: "1.2 Structure", item: "Brickwork", uom: "CFT", boqQty: 18500, actualQty: 17200, boqRate: 180, actualRate: 195 },
  { code: "MEP-001", wbs: "1.3 MEP", item: "Electrical Wiring", uom: "Point", boqQty: 960, actualQty: 985, boqRate: 2800, actualRate: 2650 },
  { code: "MEP-002", wbs: "1.3 MEP", item: "Plumbing (PVC Pipe)", uom: "RFT", boqQty: 4200, actualQty: 4500, boqRate: 120, actualRate: 135 },
  { code: "MEP-003", wbs: "1.3 MEP", item: "Fire Safety System", uom: "LS", boqQty: 1, actualQty: 1, boqRate: 3_200_000, actualRate: 3_450_000 },
  { code: "FIN-001", wbs: "1.4 Finishing", item: "Floor Tiles (Homogeneous)", uom: "SFT", boqQty: 32000, actualQty: 31500, boqRate: 85, actualRate: 92 },
  { code: "FIN-002", wbs: "1.4 Finishing", item: "Painting (Interior)", uom: "SFT", boqQty: 64000, actualQty: 58000, boqRate: 22, actualRate: 24 },
];

function varPercent(boq: number, actual: number) {
  if (boq === 0) return 0;
  return ((actual - boq) / boq) * 100;
}

const enriched = boqLines.map((l) => {
  const qtyVar = varPercent(l.boqQty, l.actualQty);
  const rateVar = varPercent(l.boqRate, l.actualRate);
  const boqAmt = l.boqQty * l.boqRate;
  const actAmt = l.actualQty * l.actualRate;
  const amtVar = varPercent(boqAmt, actAmt);
  return { ...l, qtyVar, rateVar, boqAmt, actAmt, amtVar };
});

const totalBOQ = enriched.reduce((s, r) => s + r.boqAmt, 0);
const totalActual = enriched.reduce((s, r) => s + r.actAmt, 0);
const overallVar = varPercent(totalBOQ, totalActual);

function varBadge(pct: number) {
  const abs = Math.abs(pct);
  if (abs <= 2) return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">{pct >= 0 ? "+" : ""}{pct.toFixed(1)}%</Badge>;
  if (abs <= 5) return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">{pct >= 0 ? "+" : ""}{pct.toFixed(1)}%</Badge>;
  return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">{pct >= 0 ? "+" : ""}{pct.toFixed(1)}%</Badge>;
}

export default function BOQVariancePage() {
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
          <BarChart3 className="h-7 w-7 text-orange-600" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              BOQ Variance Report
            </h1>
            <p className="text-muted-foreground">
              ABC Nasirabad Heights — As at 12 Aug 2026
            </p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total BOQ Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatBDT(totalBOQ)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Actual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatBDT(totalActual)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Overall Variance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${overallVar > 0 ? "text-red-700" : "text-green-700"}`}>
              {overallVar > 0 ? "+" : ""}{overallVar.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">{formatBDT(totalActual - totalBOQ)} variance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Items &gt;5% Variance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <span className="text-2xl font-bold text-red-700">
                {enriched.filter((r) => Math.abs(r.amtVar) > 5).length}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">of {enriched.length} line items</p>
          </CardContent>
        </Card>
      </div>

      {/* Detail Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed BOQ Variance</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>WBS</TableHead>
                <TableHead>Item</TableHead>
                <TableHead className="text-center">UOM</TableHead>
                <TableHead className="text-right">BOQ Qty</TableHead>
                <TableHead className="text-right">Act. Qty</TableHead>
                <TableHead className="text-center">Qty Var%</TableHead>
                <TableHead className="text-right">BOQ Rate</TableHead>
                <TableHead className="text-right">Act. Rate</TableHead>
                <TableHead className="text-center">Rate Var%</TableHead>
                <TableHead className="text-right">BOQ Amount</TableHead>
                <TableHead className="text-right">Act. Amount</TableHead>
                <TableHead className="text-center">Amt Var%</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enriched.map((row) => (
                <TableRow
                  key={row.code}
                  className={Math.abs(row.amtVar) > 5 ? "bg-red-50/50" : ""}
                >
                  <TableCell className="font-mono text-sm">{row.code}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{row.wbs}</TableCell>
                  <TableCell>{row.item}</TableCell>
                  <TableCell className="text-center">{row.uom}</TableCell>
                  <TableCell className="text-right font-mono">{formatNumber(row.boqQty)}</TableCell>
                  <TableCell className="text-right font-mono">{formatNumber(row.actualQty)}</TableCell>
                  <TableCell className="text-center">{varBadge(row.qtyVar)}</TableCell>
                  <TableCell className="text-right font-mono">{formatNumber(row.boqRate)}</TableCell>
                  <TableCell className="text-right font-mono">{formatNumber(row.actualRate)}</TableCell>
                  <TableCell className="text-center">{varBadge(row.rateVar)}</TableCell>
                  <TableCell className="text-right font-mono">{formatBDT(row.boqAmt)}</TableCell>
                  <TableCell className="text-right font-mono">{formatBDT(row.actAmt)}</TableCell>
                  <TableCell className="text-center">{varBadge(row.amtVar)}</TableCell>
                </TableRow>
              ))}
              <TableRow className="border-t-2 bg-muted/30 font-semibold">
                <TableCell colSpan={10}>TOTAL</TableCell>
                <TableCell className="text-right font-mono">{formatBDT(totalBOQ)}</TableCell>
                <TableCell className="text-right font-mono">{formatBDT(totalActual)}</TableCell>
                <TableCell className="text-center">{varBadge(overallVar)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
