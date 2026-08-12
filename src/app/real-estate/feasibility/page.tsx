"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { feasibility, formatNumber, formatBDT } from "@/lib/mock-data";
import { TrendingUp, DollarSign, Percent, Target, BarChart3, MapPin } from "lucide-react";

const f = feasibility;

export default function FeasibilityPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">Feasibility Study — {f.opportunityCode}</h1>
            <Badge className="bg-emerald-100 text-emerald-800">APPROVED</Badge>
          </div>
          <p className="text-gray-500">{f.projectName} — {f.location}</p>
        </div>
        <div className="text-right text-sm text-gray-500">
          <p className="flex items-center gap-1 justify-end"><MapPin className="h-3 w-3" /> {f.landArea} | FAR: {f.far}</p>
          <p>{f.totalUnits} units | Saleable: {formatNumber(f.saleableArea)} SFT</p>
        </div>
      </div>

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
          <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
        </TabsList>

        {/* Summary Tab */}
        <TabsContent value="summary" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Expected Profit", value: `BDT ${formatBDT(f.metrics.profit)}`, icon: DollarSign, color: "text-emerald-600" },
              { label: "Gross Margin", value: `${f.metrics.grossMargin}%`, icon: Percent, color: "text-blue-600" },
              { label: "ROI", value: `${f.metrics.roi}%`, icon: TrendingUp, color: "text-purple-600" },
              { label: "IRR", value: `${f.metrics.irr}%`, icon: BarChart3, color: "text-orange-600" },
            ].map((m) => (
              <Card key={m.label}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <m.icon className={`h-5 w-5 ${m.color}`} />
                    <div>
                      <p className={`text-2xl font-bold ${m.color}`}>{m.value}</p>
                      <p className="text-sm text-gray-500">{m.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Cost / SFT", value: `BDT ${formatNumber(f.metrics.costPerSft)}` },
              { label: "Revenue / SFT", value: `BDT ${formatNumber(f.metrics.revenuePerSft)}` },
              { label: "Break-Even", value: `${f.metrics.breakEvenUnits} units (${f.metrics.breakEvenPercent}%)` },
              { label: "Payback", value: `${f.metrics.paybackMonths} months` },
            ].map((m) => (
              <Card key={m.label}>
                <CardContent className="pt-4 pb-3 text-center">
                  <p className="text-lg font-bold">{m.value}</p>
                  <p className="text-xs text-gray-500">{m.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Revenue & Cost */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base text-emerald-700">Revenue Projection</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    {Object.entries(f.revenue).filter(([k]) => k !== "total").map(([key, val]) => (
                      <TableRow key={key}>
                        <TableCell className="capitalize">{key} Sales</TableCell>
                        <TableCell className="text-right font-mono">BDT {formatBDT(val)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="font-bold border-t-2">
                      <TableCell>Total Revenue</TableCell>
                      <TableCell className="text-right font-mono text-emerald-600">BDT {formatBDT(f.revenue.total)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base text-red-700">Cost Estimation</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    {Object.entries(f.cost).filter(([k]) => k !== "total").map(([key, val]) => (
                      <TableRow key={key}>
                        <TableCell className="capitalize">{key}</TableCell>
                        <TableCell className="text-right font-mono">BDT {formatBDT(val)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="font-bold border-t-2">
                      <TableCell>Total Cost</TableCell>
                      <TableCell className="text-right font-mono text-red-600">BDT {formatBDT(f.cost.total)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Profit Summary */}
          <Card className="bg-slate-50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between text-lg">
                <span>Revenue</span>
                <span className="font-mono font-bold text-emerald-600">BDT {formatBDT(f.revenue.total)}</span>
              </div>
              <div className="flex items-center justify-between text-lg">
                <span>Total Cost</span>
                <span className="font-mono font-bold text-red-600">BDT {formatBDT(f.cost.total)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex items-center justify-between text-xl font-bold">
                <span>Expected Profit</span>
                <span className="font-mono text-emerald-700">BDT {formatBDT(f.metrics.profit)} ({f.metrics.grossMargin}%)</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Scenarios Tab */}
        <TabsContent value="scenarios">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Scenario Comparison</CardTitle>
              <p className="text-sm text-gray-500">What happens if assumptions change?</p>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    {f.scenarios.map((s) => (
                      <TableHead key={s.name} className="text-right">
                        <Badge className={
                          s.name === "Optimistic" ? "bg-emerald-100 text-emerald-800" :
                          s.name === "Base Case" ? "bg-blue-100 text-blue-800" :
                          "bg-yellow-100 text-yellow-800"
                        }>{s.name}</Badge>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Revenue</TableCell>
                    {f.scenarios.map((s) => (
                      <TableCell key={s.name} className="text-right font-mono">BDT {formatBDT(s.revenue)}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Total Cost</TableCell>
                    {f.scenarios.map((s) => (
                      <TableCell key={s.name} className="text-right font-mono">BDT {formatBDT(s.cost)}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow className="font-bold">
                    <TableCell>Profit</TableCell>
                    {f.scenarios.map((s) => (
                      <TableCell key={s.name} className="text-right font-mono text-emerald-600">BDT {formatBDT(s.profit)}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Margin %</TableCell>
                    {f.scenarios.map((s) => (
                      <TableCell key={s.name} className="text-right font-mono">{s.margin}%</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">IRR %</TableCell>
                    {f.scenarios.map((s) => (
                      <TableCell key={s.name} className="text-right font-mono">{s.irr}%</TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="font-medium text-yellow-800">Management Question:</p>
                <p className="text-sm text-yellow-700 mt-1">&quot;What happens if construction cost increases 10% and selling prices fall 5%?&quot;</p>
                <p className="text-sm text-yellow-600 mt-2">ABC recalculates: Profit → BDT {formatBDT(145_000_000)}, Margin → 16.5%, IRR → 14.7%</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cash Flow Tab */}
        <TabsContent value="cashflow">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Cash Flow Projection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <BarChart3 className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Monthly cash flow projection chart</p>
                <p className="text-sm text-gray-400 mt-1">S-curve showing cumulative cash inflow vs outflow over 36 months</p>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-red-50">
                  <CardContent className="pt-4 pb-3 text-center">
                    <p className="text-lg font-bold text-red-600">BDT {formatBDT(285_000_000)}</p>
                    <p className="text-xs text-gray-500">Peak Funding Requirement (Month 18)</p>
                  </CardContent>
                </Card>
                <Card className="bg-blue-50">
                  <CardContent className="pt-4 pb-3 text-center">
                    <p className="text-lg font-bold text-blue-600">Month 28</p>
                    <p className="text-xs text-gray-500">Cash-Flow Break-Even</p>
                  </CardContent>
                </Card>
                <Card className="bg-emerald-50">
                  <CardContent className="pt-4 pb-3 text-center">
                    <p className="text-lg font-bold text-emerald-600">BDT {formatBDT(246_000_000)}</p>
                    <p className="text-xs text-gray-500">Net Cash at Completion</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
