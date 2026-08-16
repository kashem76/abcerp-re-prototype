"use client";

import Link from "next/link";
import { ArrowLeft, Package, AlertTriangle, TrendingDown, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { formatBDT, formatNumber } from "@/lib/mock-data";

interface MaterialLine {
  material: string;
  uom: string;
  boqQty: number;
  purchasedQty: number;
  receivedQty: number;
  issuedToSite: number;
  consumed: number;
  wastage: number;
  unitRate: number;
}

const materials: MaterialLine[] = [
  { material: "Cement (OPC 53 Grade)", uom: "Bag", boqQty: 42000, purchasedQty: 38500, receivedQty: 37200, issuedToSite: 36800, consumed: 35400, wastage: 1400, unitRate: 520 },
  { material: "Steel Rod 12mm (60 Grade)", uom: "KG", boqQty: 185000, purchasedQty: 172000, receivedQty: 170500, issuedToSite: 168000, consumed: 165200, wastage: 2800, unitRate: 84 },
  { material: "Steel Rod 16mm (60 Grade)", uom: "KG", boqQty: 128000, purchasedQty: 125000, receivedQty: 124000, issuedToSite: 122500, consumed: 121800, wastage: 700, unitRate: 86 },
  { material: "Steel Rod 20mm (60 Grade)", uom: "KG", boqQty: 95000, purchasedQty: 88000, receivedQty: 87500, issuedToSite: 86000, consumed: 84500, wastage: 1500, unitRate: 88 },
  { material: "Sand (Sylhet)", uom: "CFT", boqQty: 62000, purchasedQty: 58000, receivedQty: 57200, issuedToSite: 56800, consumed: 55400, wastage: 1400, unitRate: 85 },
  { material: "Stone Aggregate (3/4\")", uom: "CFT", boqQty: 48000, purchasedQty: 52000, receivedQty: 51500, issuedToSite: 50800, consumed: 50200, wastage: 600, unitRate: 180 },
  { material: "Bricks (1st Class)", uom: "PCS", boqQty: 850000, purchasedQty: 720000, receivedQty: 715000, issuedToSite: 710000, consumed: 695000, wastage: 15000, unitRate: 12 },
  { material: "Floor Tiles (Homogeneous)", uom: "SFT", boqQty: 32000, purchasedQty: 18000, receivedQty: 17500, issuedToSite: 16800, consumed: 16200, wastage: 600, unitRate: 85 },
  { material: "MS Pipe (1\")", uom: "RFT", boqQty: 8500, purchasedQty: 5200, receivedQty: 5100, issuedToSite: 4800, consumed: 4650, wastage: 150, unitRate: 120 },
  { material: "Binding Wire", uom: "KG", boqQty: 18000, purchasedQty: 17200, receivedQty: 17000, issuedToSite: 16800, consumed: 16500, wastage: 300, unitRate: 120 },
];

const enriched = materials.map((m) => {
  const variancePct = ((m.consumed - (m.boqQty * (m.consumed / m.boqQty > 1 ? 1 : m.consumed / m.boqQty))) / m.boqQty) * 100;
  const consumptionPct = (m.consumed / m.boqQty) * 100;
  const wastagePct = m.wastage > 0 ? (m.wastage / m.issuedToSite) * 100 : 0;
  const wastageValue = m.wastage * m.unitRate;
  return { ...m, consumptionPct, wastagePct, wastageValue };
});

const totalTracked = materials.length;
const overConsumed = enriched.filter((m) => m.consumptionPct > 100).length;
const underBudget = enriched.filter((m) => m.consumptionPct <= 95).length;
const totalWastageValue = enriched.reduce((s, m) => s + m.wastageValue, 0);

function varBadge(pct: number) {
  if (pct <= 95) return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">{pct.toFixed(1)}%</Badge>;
  if (pct <= 105) return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">{pct.toFixed(1)}%</Badge>;
  return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">{pct.toFixed(1)}%</Badge>;
}

const wastageAnalysis = [
  { material: "Bricks (1st Class)", wastage: 15000, pct: 2.1, cause: "Breakage during transport & handling", action: "Improve stacking & covered storage" },
  { material: "Cement (OPC 53 Grade)", wastage: 1400, pct: 3.8, cause: "Spillage during mixing, expired bags", action: "FIFO enforcement, covered storage" },
  { material: "Steel Rod 12mm", wastage: 2800, pct: 1.7, cause: "Cutting waste & off-cuts", action: "Optimize cutting schedule, reuse off-cuts" },
  { material: "Steel Rod 20mm", wastage: 1500, pct: 1.7, cause: "Cutting waste", action: "Bar bending schedule optimization" },
  { material: "Sand (Sylhet)", wastage: 1400, pct: 2.5, cause: "Spillage, wind loss", action: "Covered sand bins, tarpaulin" },
];

export default function MaterialConsumptionPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/real-estate/reports" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-3">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to Reports
        </Link>
        <div className="flex items-center gap-3">
          <Package className="h-7 w-7 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Material Consumption vs BOQ</h1>
            <p className="text-muted-foreground">ABC Nasirabad Heights — As at 12 Aug 2026</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Materials Tracked</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{totalTracked}</div><p className="text-xs text-muted-foreground">Key construction materials</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Items Over-consumed</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-red-500" /><span className="text-2xl font-bold text-red-700">{overConsumed}</span></div>
            <p className="text-xs text-muted-foreground">Consumption &gt; BOQ quantity</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Items Under Budget</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-500" /><span className="text-2xl font-bold text-green-700">{underBudget}</span></div>
            <p className="text-xs text-muted-foreground">Within 95% of BOQ</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Wastage Value</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center gap-2"><TrendingDown className="h-5 w-5 text-orange-500" /><span className="text-2xl font-bold text-orange-700">{formatBDT(totalWastageValue)}</span></div>
            <p className="text-xs text-muted-foreground">Material waste cost</p>
          </CardContent>
        </Card>
      </div>

      {/* Consumption Table */}
      <Card>
        <CardHeader><CardTitle>Material Consumption Detail</CardTitle></CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Material</TableHead>
                <TableHead className="text-center">UOM</TableHead>
                <TableHead className="text-right">BOQ Qty</TableHead>
                <TableHead className="text-right">Purchased</TableHead>
                <TableHead className="text-right">Received</TableHead>
                <TableHead className="text-right">Issued to Site</TableHead>
                <TableHead className="text-right">Consumed (DSR)</TableHead>
                <TableHead className="text-right">Wastage</TableHead>
                <TableHead className="text-center">Consumption %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enriched.map((row) => (
                <TableRow key={row.material} className={row.consumptionPct > 105 ? "bg-red-50/50" : ""}>
                  <TableCell className="font-medium">{row.material}</TableCell>
                  <TableCell className="text-center text-sm">{row.uom}</TableCell>
                  <TableCell className="text-right font-mono">{formatNumber(row.boqQty)}</TableCell>
                  <TableCell className="text-right font-mono">{formatNumber(row.purchasedQty)}</TableCell>
                  <TableCell className="text-right font-mono">{formatNumber(row.receivedQty)}</TableCell>
                  <TableCell className="text-right font-mono">{formatNumber(row.issuedToSite)}</TableCell>
                  <TableCell className="text-right font-mono">{formatNumber(row.consumed)}</TableCell>
                  <TableCell className="text-right font-mono text-orange-700">{formatNumber(row.wastage)}</TableCell>
                  <TableCell className="text-center">{varBadge(row.consumptionPct)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Wastage Analysis */}
      <Card>
        <CardHeader><CardTitle>Wastage Analysis</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Material</TableHead>
                <TableHead className="text-right">Wastage Qty</TableHead>
                <TableHead className="text-center">Wastage %</TableHead>
                <TableHead>Root Cause</TableHead>
                <TableHead>Mitigation Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {wastageAnalysis.map((row) => (
                <TableRow key={row.material}>
                  <TableCell className="font-medium">{row.material}</TableCell>
                  <TableCell className="text-right font-mono">{formatNumber(row.wastage)}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className={row.pct > 2 ? "bg-red-50 text-red-700 border-red-300" : "bg-yellow-50 text-yellow-700 border-yellow-300"}>
                      {row.pct.toFixed(1)}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{row.cause}</TableCell>
                  <TableCell className="text-sm">{row.action}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <p className="text-sm font-medium">Industry Benchmark: Acceptable wastage is 2-3% for most materials, 1-2% for steel.</p>
            <div className="mt-2 grid grid-cols-3 gap-4">
              <div><p className="text-xs text-muted-foreground">Cement Wastage</p><Progress value={3.8} max={5} className="h-2 mt-1" /><p className="text-xs mt-1 text-orange-600">3.8% (target: &lt;3%)</p></div>
              <div><p className="text-xs text-muted-foreground">Steel Wastage</p><Progress value={1.7} max={5} className="h-2 mt-1" /><p className="text-xs mt-1 text-green-600">1.7% (target: &lt;2%)</p></div>
              <div><p className="text-xs text-muted-foreground">Brick Wastage</p><Progress value={2.1} max={5} className="h-2 mt-1" /><p className="text-xs mt-1 text-yellow-600">2.1% (target: &lt;3%)</p></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
