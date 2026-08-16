"use client";

import Link from "next/link";
import { ArrowLeft, PieChart, TrendingUp, TrendingDown, Award } from "lucide-react";
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

interface UnitProfit {
  unit: string;
  type: string;
  sizeSFT: number;
  salePrice: number;
  landCost: number;
  constructionCost: number;
  overheadCost: number;
}

const units: UnitProfit[] = [
  { unit: "A-101", type: "3-BHK", sizeSFT: 1450, salePrice: 18_850_000, landCost: 5_075_000, constructionCost: 8_700_000, overheadCost: 1_450_000 },
  { unit: "A-201", type: "3-BHK", sizeSFT: 1450, salePrice: 19_575_000, landCost: 5_075_000, constructionCost: 8_700_000, overheadCost: 1_450_000 },
  { unit: "A-301", type: "3-BHK", sizeSFT: 1450, salePrice: 20_300_000, landCost: 5_075_000, constructionCost: 8_700_000, overheadCost: 1_450_000 },
  { unit: "A-401", type: "4-BHK (Duplex)", sizeSFT: 2200, salePrice: 35_200_000, landCost: 7_700_000, constructionCost: 14_300_000, overheadCost: 2_200_000 },
  { unit: "A-102", type: "2-BHK", sizeSFT: 1100, salePrice: 13_200_000, landCost: 3_850_000, constructionCost: 6_600_000, overheadCost: 1_100_000 },
  { unit: "A-202", type: "2-BHK", sizeSFT: 1100, salePrice: 13_750_000, landCost: 3_850_000, constructionCost: 6_600_000, overheadCost: 1_100_000 },
  { unit: "A-302", type: "2-BHK", sizeSFT: 1100, salePrice: 14_300_000, landCost: 3_850_000, constructionCost: 6_600_000, overheadCost: 1_100_000 },
  { unit: "A-103", type: "3-BHK (Corner)", sizeSFT: 1600, salePrice: 22_400_000, landCost: 5_600_000, constructionCost: 9_600_000, overheadCost: 1_600_000 },
  { unit: "A-203", type: "3-BHK (Corner)", sizeSFT: 1600, salePrice: 23_200_000, landCost: 5_600_000, constructionCost: 9_600_000, overheadCost: 1_600_000 },
  { unit: "A-303", type: "3-BHK (Corner)", sizeSFT: 1600, salePrice: 24_000_000, landCost: 5_600_000, constructionCost: 9_600_000, overheadCost: 1_600_000 },
  { unit: "A-104", type: "Studio", sizeSFT: 650, salePrice: 7_150_000, landCost: 2_275_000, constructionCost: 3_900_000, overheadCost: 650_000 },
  { unit: "A-204", type: "Studio", sizeSFT: 650, salePrice: 7_475_000, landCost: 2_275_000, constructionCost: 3_900_000, overheadCost: 650_000 },
];

const enriched = units.map((u) => {
  const allocatedCost = u.landCost + u.constructionCost + u.overheadCost;
  const grossProfit = u.salePrice - allocatedCost;
  const margin = (grossProfit / u.salePrice) * 100;
  const pricePerSFT = u.salePrice / u.sizeSFT;
  const costPerSFT = allocatedCost / u.sizeSFT;
  return { ...u, allocatedCost, grossProfit, margin, pricePerSFT, costPerSFT };
});

const avgMargin = enriched.reduce((s, u) => s + u.margin, 0) / enriched.length;
const best = enriched.reduce((b, u) => (u.margin > b.margin ? u : b));
const worst = enriched.reduce((w, u) => (u.margin < w.margin ? u : w));
const totalRevenue = enriched.reduce((s, u) => s + u.salePrice, 0);
const totalCost = enriched.reduce((s, u) => s + u.allocatedCost, 0);
const totalProfit = totalRevenue - totalCost;

export default function UnitProfitabilityPage() {
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
          <PieChart className="h-7 w-7 text-pink-600" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Unit Profitability Report
            </h1>
            <p className="text-muted-foreground">
              ABC Nasirabad Heights — Tower A (12 units)
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Gross Margin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${avgMargin >= 20 ? "text-green-700" : "text-yellow-700"}`}>
              {avgMargin.toFixed(1)}%
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatBDT(totalRevenue)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Profit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{formatBDT(totalProfit)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1">
              <Award className="h-3 w-3 text-green-600" />
              Best Performing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-green-700">{best.unit}</div>
            <p className="text-xs text-muted-foreground">{best.type} — {best.margin.toFixed(1)}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1">
              <TrendingDown className="h-3 w-3 text-red-500" />
              Worst Performing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-red-700">{worst.unit}</div>
            <p className="text-xs text-muted-foreground">{worst.type} — {worst.margin.toFixed(1)}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Detail Table */}
      <Card>
        <CardHeader>
          <CardTitle>Per-Unit Profitability Analysis</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Unit</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Size (SFT)</TableHead>
                <TableHead className="text-right">Sale Price</TableHead>
                <TableHead className="text-right">Land Cost</TableHead>
                <TableHead className="text-right">Construction</TableHead>
                <TableHead className="text-right">Overhead</TableHead>
                <TableHead className="text-right">Total Cost</TableHead>
                <TableHead className="text-right">Gross Profit</TableHead>
                <TableHead className="text-center">Margin %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enriched.map((u) => (
                <TableRow key={u.unit}>
                  <TableCell className="font-mono font-semibold">{u.unit}</TableCell>
                  <TableCell>{u.type}</TableCell>
                  <TableCell className="text-right font-mono">{formatNumber(u.sizeSFT)}</TableCell>
                  <TableCell className="text-right font-mono">{formatBDT(u.salePrice)}</TableCell>
                  <TableCell className="text-right font-mono text-muted-foreground">{formatBDT(u.landCost)}</TableCell>
                  <TableCell className="text-right font-mono text-muted-foreground">{formatBDT(u.constructionCost)}</TableCell>
                  <TableCell className="text-right font-mono text-muted-foreground">{formatBDT(u.overheadCost)}</TableCell>
                  <TableCell className="text-right font-mono font-semibold">{formatBDT(u.allocatedCost)}</TableCell>
                  <TableCell className={`text-right font-mono font-semibold ${u.grossProfit >= 0 ? "text-green-700" : "text-red-700"}`}>
                    {formatBDT(u.grossProfit)}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant="outline"
                      className={u.margin >= 25 ? "bg-green-50 text-green-700" : u.margin >= 15 ? "bg-yellow-50 text-yellow-700" : "bg-red-50 text-red-700"}
                    >
                      {u.margin.toFixed(1)}%
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="border-t-2 bg-muted/30 font-bold">
                <TableCell colSpan={3}>TOTAL / AVG</TableCell>
                <TableCell className="text-right font-mono">{formatBDT(totalRevenue)}</TableCell>
                <TableCell className="text-right font-mono">{formatBDT(enriched.reduce((s, u) => s + u.landCost, 0))}</TableCell>
                <TableCell className="text-right font-mono">{formatBDT(enriched.reduce((s, u) => s + u.constructionCost, 0))}</TableCell>
                <TableCell className="text-right font-mono">{formatBDT(enriched.reduce((s, u) => s + u.overheadCost, 0))}</TableCell>
                <TableCell className="text-right font-mono">{formatBDT(totalCost)}</TableCell>
                <TableCell className="text-right font-mono text-green-700">{formatBDT(totalProfit)}</TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline" className="bg-green-50 text-green-700">{avgMargin.toFixed(1)}%</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Cost Allocation Note */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-sm text-muted-foreground space-y-1">
            <p><strong>Cost Allocation Method:</strong> Land cost is allocated by saleable area ratio. Construction cost is allocated by actual floor area. Overhead is allocated as BDT 1,000/SFT flat rate covering marketing, legal, administrative, and finance charges.</p>
            <p><strong>Note:</strong> Higher floors command premium pricing (5-8% floor rise) while cost remains relatively constant, leading to higher margins on upper floors.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
