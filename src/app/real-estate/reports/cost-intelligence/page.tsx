"use client";

import Link from "next/link";
import { ArrowLeft, Brain, TrendingUp, TrendingDown, Minus, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { formatNumber } from "@/lib/mock-data";

type Trend = "up" | "down" | "stable";

interface CostItem {
  category: string;
  item: string;
  uom: string;
  standardRate: number;
  lastPORate: number;
  marketRate: number;
  lowestQuote: number;
  weightedAvgRate: number;
  trend: Trend;
}

const costItems: CostItem[] = [
  { category: "Structural", item: "Cement (OPC 53 Grade)", uom: "Bag", standardRate: 520, lastPORate: 538, marketRate: 545, lowestQuote: 510, weightedAvgRate: 532, trend: "up" },
  { category: "Structural", item: "Steel Rod 60 Grade (12mm)", uom: "KG", standardRate: 84, lastPORate: 91, marketRate: 93, lowestQuote: 88, weightedAvgRate: 90, trend: "up" },
  { category: "Structural", item: "Sand (Sylhet)", uom: "CFT", standardRate: 85, lastPORate: 82, marketRate: 80, lowestQuote: 78, weightedAvgRate: 83, trend: "down" },
  { category: "Structural", item: "Stone Aggregate (3/4\")", uom: "CFT", standardRate: 180, lastPORate: 202, marketRate: 210, lowestQuote: 195, weightedAvgRate: 198, trend: "up" },
  { category: "MEP", item: "Electrical Wire (3/29)", uom: "Coil", standardRate: 4200, lastPORate: 4350, marketRate: 4400, lowestQuote: 4100, weightedAvgRate: 4280, trend: "up" },
  { category: "MEP", item: "PVC Pipe (1\")", uom: "RFT", standardRate: 120, lastPORate: 118, marketRate: 115, lowestQuote: 112, weightedAvgRate: 117, trend: "down" },
  { category: "MEP", item: "Modular Switch (Havells)", uom: "PCS", standardRate: 280, lastPORate: 275, marketRate: 270, lowestQuote: 260, weightedAvgRate: 272, trend: "stable" },
  { category: "MEP", item: "PVC Conduit (25mm)", uom: "RFT", standardRate: 35, lastPORate: 38, marketRate: 40, lowestQuote: 34, weightedAvgRate: 37, trend: "up" },
  { category: "Finishing", item: "Floor Tiles (Homogeneous)", uom: "SFT", standardRate: 85, lastPORate: 92, marketRate: 95, lowestQuote: 82, weightedAvgRate: 89, trend: "up" },
  { category: "Finishing", item: "Weather Coat Paint", uom: "Gallon", standardRate: 1800, lastPORate: 1750, marketRate: 1720, lowestQuote: 1680, weightedAvgRate: 1740, trend: "down" },
  { category: "Finishing", item: "Wall Putty (Birla)", uom: "Bag(40kg)", standardRate: 1200, lastPORate: 1220, marketRate: 1250, lowestQuote: 1150, weightedAvgRate: 1210, trend: "stable" },
  { category: "Finishing", item: "Bathroom Fittings (Set)", uom: "Set", standardRate: 18000, lastPORate: 17500, marketRate: 17200, lowestQuote: 16800, weightedAvgRate: 17400, trend: "down" },
];

const trendHistory = [
  { month: "Mar 2026", cement: 520, steel: 84, aggregate: 180 },
  { month: "Apr 2026", cement: 525, steel: 86, aggregate: 185 },
  { month: "May 2026", cement: 528, steel: 88, aggregate: 190 },
  { month: "Jun 2026", cement: 532, steel: 89, aggregate: 195 },
  { month: "Jul 2026", cement: 535, steel: 90, aggregate: 200 },
  { month: "Aug 2026", cement: 538, steel: 91, aggregate: 202 },
];

const supplierComparison = {
  cement: [
    { supplier: "Shah Cement Ltd", rate: 510, leadTime: "2 days", quality: "A", lastOrder: "2026-08-05" },
    { supplier: "Meghna Cement", rate: 535, leadTime: "1 day", quality: "A+", lastOrder: "2026-07-28" },
    { supplier: "Holcim Bangladesh", rate: 545, leadTime: "3 days", quality: "A+", lastOrder: "2026-07-15" },
  ],
  steel: [
    { supplier: "BSRM Steel", rate: 88, leadTime: "5 days", quality: "A+", lastOrder: "2026-08-08" },
    { supplier: "KSRM Steel", rate: 91, leadTime: "3 days", quality: "A", lastOrder: "2026-08-01" },
    { supplier: "GPH Ispat", rate: 93, leadTime: "4 days", quality: "A", lastOrder: "2026-07-20" },
  ],
};

function TrendIcon({ trend }: { trend: Trend }) {
  if (trend === "up") return <ArrowUpRight className="h-4 w-4 text-red-500" />;
  if (trend === "down") return <ArrowDownRight className="h-4 w-4 text-green-500" />;
  return <Minus className="h-4 w-4 text-gray-400" />;
}

function trendBadge(trend: Trend) {
  if (trend === "up") return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300 text-xs">Rising</Badge>;
  if (trend === "down") return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300 text-xs">Falling</Badge>;
  return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300 text-xs">Stable</Badge>;
}

function rateDiffPct(standard: number, actual: number) {
  const pct = ((actual - standard) / standard) * 100;
  return pct;
}

const risingItems = costItems.filter((i) => i.trend === "up").length;
const fallingItems = costItems.filter((i) => i.trend === "down").length;
const stableItems = costItems.filter((i) => i.trend === "stable").length;

export default function CostIntelligencePage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/real-estate/reports" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-3">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to Reports
        </Link>
        <div className="flex items-center gap-3">
          <Brain className="h-7 w-7 text-indigo-600" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Cost Intelligence Report</h1>
            <p className="text-muted-foreground">ABC Properties Ltd — Rate tracking across 12 key items — Aug 2026</p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Items Tracked</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{costItems.length}</div><p className="text-xs text-muted-foreground">Across 3 categories</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Prices Rising</CardTitle></CardHeader>
          <CardContent><div className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-red-500" /><span className="text-2xl font-bold text-red-700">{risingItems}</span></div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Prices Falling</CardTitle></CardHeader>
          <CardContent><div className="flex items-center gap-2"><TrendingDown className="h-5 w-5 text-green-500" /><span className="text-2xl font-bold text-green-700">{fallingItems}</span></div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Stable Prices</CardTitle></CardHeader>
          <CardContent><div className="flex items-center gap-2"><Minus className="h-5 w-5 text-gray-400" /><span className="text-2xl font-bold">{stableItems}</span></div></CardContent>
        </Card>
      </div>

      {/* Rate Tracking Table */}
      <Card>
        <CardHeader><CardTitle>Rate Tracking — Key Construction Items</CardTitle></CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Item</TableHead>
                <TableHead className="text-center">UOM</TableHead>
                <TableHead className="text-right">Std Rate</TableHead>
                <TableHead className="text-right">Last PO</TableHead>
                <TableHead className="text-right">Market Rate</TableHead>
                <TableHead className="text-right">Lowest RFQ</TableHead>
                <TableHead className="text-right">Wtd Avg</TableHead>
                <TableHead className="text-center">vs Std %</TableHead>
                <TableHead className="text-center">Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {costItems.map((row) => {
                const diff = rateDiffPct(row.standardRate, row.weightedAvgRate);
                return (
                  <TableRow key={row.item}>
                    <TableCell className="text-xs text-muted-foreground">{row.category}</TableCell>
                    <TableCell className="font-medium">{row.item}</TableCell>
                    <TableCell className="text-center text-sm">{row.uom}</TableCell>
                    <TableCell className="text-right font-mono">{formatNumber(row.standardRate)}</TableCell>
                    <TableCell className="text-right font-mono">{formatNumber(row.lastPORate)}</TableCell>
                    <TableCell className="text-right font-mono">{formatNumber(row.marketRate)}</TableCell>
                    <TableCell className="text-right font-mono text-green-700">{formatNumber(row.lowestQuote)}</TableCell>
                    <TableCell className="text-right font-mono font-medium">{formatNumber(row.weightedAvgRate)}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className={`text-xs ${diff > 3 ? "bg-red-50 text-red-700 border-red-300" : diff < -1 ? "bg-green-50 text-green-700 border-green-300" : "bg-yellow-50 text-yellow-700 border-yellow-300"}`}>
                        {diff > 0 ? "+" : ""}{diff.toFixed(1)}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center"><div className="flex items-center justify-center gap-1"><TrendIcon trend={row.trend} />{trendBadge(row.trend)}</div></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Price Trend - 6 months */}
      <Card>
        <CardHeader><CardTitle>Price Trend — Last 6 Months</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead className="text-right">Cement (BDT/Bag)</TableHead>
                <TableHead className="text-right">Steel 60G (BDT/KG)</TableHead>
                <TableHead className="text-right">Aggregate (BDT/CFT)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trendHistory.map((row, i) => (
                <TableRow key={row.month}>
                  <TableCell className="font-mono text-sm">{row.month}</TableCell>
                  <TableCell className="text-right font-mono">
                    <span className={i > 0 && row.cement > trendHistory[i - 1].cement ? "text-red-600" : ""}>{row.cement}</span>
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    <span className={i > 0 && row.steel > trendHistory[i - 1].steel ? "text-red-600" : ""}>{row.steel}</span>
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    <span className={i > 0 && row.aggregate > trendHistory[i - 1].aggregate ? "text-red-600" : ""}>{row.aggregate}</span>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="border-t-2 bg-muted/30 font-semibold">
                <TableCell>Change (6 mo)</TableCell>
                <TableCell className="text-right font-mono text-red-600">+{((538 - 520) / 520 * 100).toFixed(1)}%</TableCell>
                <TableCell className="text-right font-mono text-red-600">+{((91 - 84) / 84 * 100).toFixed(1)}%</TableCell>
                <TableCell className="text-right font-mono text-red-600">+{((202 - 180) / 180 * 100).toFixed(1)}%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Supplier Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(supplierComparison).map(([material, suppliers]) => (
          <Card key={material}>
            <CardHeader><CardTitle>Top Suppliers — {material === "cement" ? "Cement" : "Steel Rod"}</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Supplier</TableHead>
                    <TableHead className="text-right">Rate</TableHead>
                    <TableHead className="text-center">Lead Time</TableHead>
                    <TableHead className="text-center">Quality</TableHead>
                    <TableHead>Last Order</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {suppliers.map((s, i) => (
                    <TableRow key={s.supplier}>
                      <TableCell className="font-medium">
                        {i === 0 && <Badge className="mr-2 bg-green-100 text-green-800 text-xs">Best</Badge>}
                        {s.supplier}
                      </TableCell>
                      <TableCell className="text-right font-mono font-medium">{formatNumber(s.rate)}</TableCell>
                      <TableCell className="text-center text-sm">{s.leadTime}</TableCell>
                      <TableCell className="text-center"><Badge variant="outline" className="text-xs">{s.quality}</Badge></TableCell>
                      <TableCell className="text-sm text-muted-foreground">{s.lastOrder}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
