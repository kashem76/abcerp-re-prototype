"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Calculator,
  Save,
  Layers,
  Building2,
  LayoutGrid,
  TrendingUp,
  Receipt,
  BarChart3,
  GitCompare,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatBDT, formatNumber } from "@/lib/mock-data";

// Step 3: Unit Mix
const unitMix = [
  { type: "3 Bed (A-Type)", count: 24, avgSize: 1450, rate: 7500, total: 24 * 1450 * 7500 },
  { type: "2 Bed (B-Type)", count: 18, avgSize: 1100, rate: 7000, total: 18 * 1100 * 7000 },
  { type: "Commercial (Ground)", count: 6, avgSize: 650, rate: 12000, total: 6 * 650 * 12000 },
];
const totalUnits = unitMix.reduce((s, u) => s + u.count, 0);
const totalSaleableArea = unitMix.reduce((s, u) => s + u.count * u.avgSize, 0);
const totalUnitRevenue = unitMix.reduce((s, u) => s + u.total, 0);

// Step 4: Revenue
const revenueLines = [
  { item: "Apartment Sales (48 units)", amount: totalUnitRevenue },
  { item: "Car Parking (36 spots @ BDT 8 lakh)", amount: 28800000 },
  { item: "Commercial Space Premium", amount: 46800000 },
  { item: "Utility Charges (per unit)", amount: 14400000 },
];
const totalRevenue = revenueLines.reduce((s, r) => s + r.amount, 0);

// Step 5: Cost items
const costItems = [
  { category: "Land Acquisition", amount: 44000000, pct: null },
  { category: "Construction (@ BDT 2,800/sft)", amount: 285600000, pct: null },
  { category: "Consultant Fees (5%)", amount: 14280000, pct: 5 },
  { category: "Statutory & Approvals", amount: 8500000, pct: null },
  { category: "Marketing (3%)", amount: 8568000, pct: 3 },
  { category: "Finance Cost (8% avg)", amount: 22848000, pct: 8 },
  { category: "Contingency (5%)", amount: 14280000, pct: 5 },
];
const totalCost = costItems.reduce((s, c) => s + c.amount, 0);

// Step 6: Financial Metrics
const profit = totalRevenue - totalCost;
const margin = ((profit / totalRevenue) * 100).toFixed(1);
const roi = ((profit / totalCost) * 100).toFixed(1);
const costPerSft = Math.round(totalCost / totalSaleableArea);
const revenuePerSft = Math.round(totalRevenue / totalSaleableArea);
const breakEvenUnits = Math.ceil((totalCost / totalRevenue) * totalUnits);

// Step 7: Scenarios
const scenarios = [
  { name: "Optimistic", rateChange: "+10%", costChange: "Base", revenue: Math.round(totalRevenue * 1.1), cost: totalCost, profit: Math.round(totalRevenue * 1.1) - totalCost, margin: (((totalRevenue * 1.1 - totalCost) / (totalRevenue * 1.1)) * 100).toFixed(1), irr: "28.4%", color: "text-emerald-600" },
  { name: "Base Case", rateChange: "Base", costChange: "Base", revenue: totalRevenue, cost: totalCost, profit, margin, irr: "22.1%", color: "text-blue-600" },
  { name: "Conservative", rateChange: "-10%", costChange: "+5%", revenue: Math.round(totalRevenue * 0.9), cost: Math.round(totalCost * 1.05), profit: Math.round(totalRevenue * 0.9) - Math.round(totalCost * 1.05), margin: (((totalRevenue * 0.9 - totalCost * 1.05) / (totalRevenue * 0.9)) * 100).toFixed(1), irr: "14.7%", color: "text-orange-600" },
];

export default function CreateFeasibilityPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/real-estate/feasibility"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-3"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Feasibility Studies
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Calculator className="h-6 w-6 text-indigo-600" />
              Create Feasibility Study
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              OPP-2026-018 &middot; Bayazid Bostami Residential Project
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Save Draft</Button>
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Submit for Review
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      {/* Multi-step Wizard */}
      <Tabs defaultValue="step1" className="space-y-6">
        <TabsList className="grid grid-cols-7 w-full">
          <TabsTrigger value="step1" className="text-xs">1. Land</TabsTrigger>
          <TabsTrigger value="step2" className="text-xs">2. Dev Plan</TabsTrigger>
          <TabsTrigger value="step3" className="text-xs">3. Unit Mix</TabsTrigger>
          <TabsTrigger value="step4" className="text-xs">4. Revenue</TabsTrigger>
          <TabsTrigger value="step5" className="text-xs">5. Cost</TabsTrigger>
          <TabsTrigger value="step6" className="text-xs">6. Metrics</TabsTrigger>
          <TabsTrigger value="step7" className="text-xs">7. Scenarios</TabsTrigger>
        </TabsList>

        {/* Step 1: Land Assumptions */}
        <TabsContent value="step1">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Layers className="h-4 w-4 text-muted-foreground" />
                Land Assumptions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Total Land Area (Katha)</label>
                  <Input type="number" defaultValue="22" />
                  <p className="text-xs text-muted-foreground">= 35,750 sft</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">FAR (Floor Area Ratio)</label>
                  <Input type="number" defaultValue="5.0" step="0.1" />
                  <p className="text-xs text-muted-foreground">CDA Residential Zone</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Max Ground Coverage (%)</label>
                  <Input type="number" defaultValue="60" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Front Setback (ft)</label>
                  <Input type="number" defaultValue="10" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Rear Setback (ft)</label>
                  <Input type="number" defaultValue="6" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Side Setbacks (ft)</label>
                  <Input type="number" defaultValue="5" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Buildable Area (sft)</label>
                  <Input type="number" defaultValue="21450" disabled className="bg-muted/50 font-medium" />
                  <p className="text-xs text-muted-foreground">Auto: Land × Coverage%</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Number of Floors</label>
                  <Input type="number" defaultValue="10" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Max Buildable (sft)</label>
                  <Input type="number" defaultValue="178750" disabled className="bg-muted/50 font-medium" />
                  <p className="text-xs text-muted-foreground">Auto: Land × FAR</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Step 2: Development Plan */}
        <TabsContent value="step2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                Development Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Total Built-up Area (sft)</label>
                  <Input type="number" defaultValue="102000" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Total Saleable Area (sft)</label>
                  <Input type="number" defaultValue="68400" />
                  <p className="text-xs text-muted-foreground">67% of built-up</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Common Area (sft)</label>
                  <Input type="number" defaultValue="23600" />
                  <p className="text-xs text-muted-foreground">Staircase, lobby, corridor</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Parking Area (sft)</label>
                  <Input type="number" defaultValue="10000" />
                  <p className="text-xs text-muted-foreground">Ground + Basement</p>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Total Parking Spots</label>
                  <Input type="number" defaultValue="36" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Lifts</label>
                  <Input type="number" defaultValue="2" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Staircases</label>
                  <Input type="number" defaultValue="2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Step 3: Unit Mix */}
        <TabsContent value="step3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <LayoutGrid className="h-4 w-4 text-muted-foreground" />
                  Unit Mix
                </CardTitle>
                <Badge variant="outline">{totalUnits} units &middot; {formatNumber(totalSaleableArea)} sft</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Unit Type</TableHead>
                    <TableHead className="text-center">Count</TableHead>
                    <TableHead className="text-right">Avg Size (sft)</TableHead>
                    <TableHead className="text-right">Rate/sft (BDT)</TableHead>
                    <TableHead className="text-right">Total Value (BDT)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {unitMix.map((u) => (
                    <TableRow key={u.type}>
                      <TableCell>
                        <Input defaultValue={u.type} className="h-8 text-sm" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Input type="number" defaultValue={u.count} className="h-8 text-sm text-center w-20 mx-auto" />
                      </TableCell>
                      <TableCell className="text-right">
                        <Input type="number" defaultValue={u.avgSize} className="h-8 text-sm text-right w-24 ml-auto" />
                      </TableCell>
                      <TableCell className="text-right">
                        <Input type="number" defaultValue={u.rate} className="h-8 text-sm text-right w-24 ml-auto" />
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatBDT(u.total)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-muted/30 font-semibold">
                    <TableCell>Total</TableCell>
                    <TableCell className="text-center">{totalUnits}</TableCell>
                    <TableCell className="text-right">{formatNumber(totalSaleableArea)}</TableCell>
                    <TableCell className="text-right text-muted-foreground">—</TableCell>
                    <TableCell className="text-right">{formatBDT(totalUnitRevenue)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Step 4: Revenue Projection */}
        <TabsContent value="step4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                Revenue Projection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Revenue Item</TableHead>
                    <TableHead className="text-right">Amount (BDT)</TableHead>
                    <TableHead className="text-right">% of Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {revenueLines.map((r) => (
                    <TableRow key={r.item}>
                      <TableCell>{r.item}</TableCell>
                      <TableCell className="text-right">{formatBDT(r.amount)}</TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {((r.amount / totalRevenue) * 100).toFixed(1)}%
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-muted/30 font-semibold">
                    <TableCell>Total Projected Revenue</TableCell>
                    <TableCell className="text-right">{formatBDT(totalRevenue)}</TableCell>
                    <TableCell className="text-right">100%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Step 5: Cost Estimation */}
        <TabsContent value="step5">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Receipt className="h-4 w-4 text-muted-foreground" />
                Cost Estimation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cost Category</TableHead>
                    <TableHead className="text-right">Amount (BDT)</TableHead>
                    <TableHead className="text-right">% of Total</TableHead>
                    <TableHead className="text-center">Basis</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {costItems.map((c) => (
                    <TableRow key={c.category}>
                      <TableCell>{c.category}</TableCell>
                      <TableCell className="text-right">
                        <Input
                          type="text"
                          defaultValue={c.amount.toLocaleString()}
                          className="h-8 text-sm text-right w-36 ml-auto"
                        />
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {((c.amount / totalCost) * 100).toFixed(1)}%
                      </TableCell>
                      <TableCell className="text-center text-xs text-muted-foreground">
                        {c.pct ? `${c.pct}% of construction` : "Lump sum"}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-muted/30 font-semibold">
                    <TableCell>Total Estimated Cost</TableCell>
                    <TableCell className="text-right">{formatBDT(totalCost)}</TableCell>
                    <TableCell className="text-right">100%</TableCell>
                    <TableCell />
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Step 6: Financial Metrics */}
        <TabsContent value="step6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                Financial Metrics (Auto-Calculated)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Gross Profit", value: formatBDT(profit), sub: "Revenue - Cost" },
                  { label: "Profit Margin", value: `${margin}%`, sub: "Profit / Revenue" },
                  { label: "ROI", value: `${roi}%`, sub: "Profit / Cost" },
                  { label: "IRR (Est.)", value: "22.1%", sub: "3-year projection" },
                  { label: "NPV (@ 12%)", value: formatBDT(Math.round(profit * 0.78)), sub: "Discounted 3yr" },
                  { label: "Payback Period", value: "26 months", sub: "From first sale" },
                  { label: "Break-even Units", value: `${breakEvenUnits} of ${totalUnits}`, sub: `${((breakEvenUnits / totalUnits) * 100).toFixed(0)}% of total` },
                  { label: "Cost/sft", value: `BDT ${formatNumber(costPerSft)}`, sub: "Total cost / saleable" },
                ].map((m) => (
                  <div key={m.label} className="p-4 rounded-lg border bg-muted/30 space-y-1">
                    <p className="text-xs text-muted-foreground">{m.label}</p>
                    <p className="text-xl font-bold">{m.value}</p>
                    <p className="text-xs text-muted-foreground">{m.sub}</p>
                  </div>
                ))}
              </div>
              <Separator className="my-6" />
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border space-y-1">
                  <p className="text-sm text-muted-foreground">Revenue per sft</p>
                  <p className="text-2xl font-bold text-emerald-600">BDT {formatNumber(revenuePerSft)}</p>
                </div>
                <div className="p-4 rounded-lg border space-y-1">
                  <p className="text-sm text-muted-foreground">Cost per sft</p>
                  <p className="text-2xl font-bold text-orange-600">BDT {formatNumber(costPerSft)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Step 7: Scenario Comparison */}
        <TabsContent value="step7">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <GitCompare className="h-4 w-4 text-muted-foreground" />
                Scenario Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    {scenarios.map((s) => (
                      <TableHead key={s.name} className={`text-center ${s.color}`}>
                        {s.name}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Rate Change</TableCell>
                    {scenarios.map((s) => (
                      <TableCell key={s.name} className="text-center">{s.rateChange}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Cost Change</TableCell>
                    {scenarios.map((s) => (
                      <TableCell key={s.name} className="text-center">{s.costChange}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Total Revenue</TableCell>
                    {scenarios.map((s) => (
                      <TableCell key={s.name} className="text-center">{formatBDT(s.revenue)}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Total Cost</TableCell>
                    {scenarios.map((s) => (
                      <TableCell key={s.name} className="text-center">{formatBDT(s.cost)}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow className="bg-muted/30">
                    <TableCell className="font-semibold">Profit</TableCell>
                    {scenarios.map((s) => (
                      <TableCell key={s.name} className={`text-center font-semibold ${s.profit > 0 ? "text-emerald-600" : "text-red-600"}`}>
                        {formatBDT(s.profit)}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Margin</TableCell>
                    {scenarios.map((s) => (
                      <TableCell key={s.name} className={`text-center font-medium ${s.color}`}>
                        {s.margin}%
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">IRR</TableCell>
                    {scenarios.map((s) => (
                      <TableCell key={s.name} className={`text-center font-medium ${s.color}`}>
                        {s.irr}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
              <div className="mt-4 p-3 bg-muted/50 border rounded-md text-sm text-muted-foreground">
                <strong>Note:</strong> Conservative scenario assumes 10% lower selling price with 5% cost overrun.
                Optimistic scenario assumes 10% higher selling price with base costs. All scenarios use same unit mix and timeline.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
