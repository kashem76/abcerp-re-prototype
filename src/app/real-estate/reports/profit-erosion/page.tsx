"use client";

import Link from "next/link";
import { ArrowLeft, TrendingDown, ArrowDown, ArrowUp, Minus, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatBDT } from "@/lib/mock-data";

interface ErosionFactor {
  category: string;
  description: string;
  amount: number;
  direction: "erosion" | "addition";
  details: string[];
  period: string;
}

const feasibilityProfit = 246_000_000;

const factors: ErosionFactor[] = [
  {
    category: "Material Inflation",
    description: "Market price increases on key materials",
    amount: -28_500_000,
    direction: "erosion",
    details: ["Steel rod price +8.2% (BDT 84 to 91/kg) — Impact: BDT 14.2m", "Cement price +3.5% (BDT 520 to 538/bag) — Impact: BDT 3.8m", "Stone aggregate +12% (BDT 180 to 202/CFT) — Impact: BDT 10.5m"],
    period: "Mar 2025 - Aug 2026",
  },
  {
    category: "Design Changes",
    description: "Client-requested changes and architectural modifications",
    amount: -18_000_000,
    direction: "erosion",
    details: ["Lobby redesign with Italian marble — BDT 8.5m", "Additional fire escape staircase (regulatory) — BDT 5.2m", "Upgraded elevator specification — BDT 4.3m"],
    period: "Jun 2025 - Jan 2026",
  },
  {
    category: "Quantity Overruns",
    description: "Actual quantities exceeding BOQ estimates",
    amount: -12_400_000,
    direction: "erosion",
    details: ["Excavation overrun (rock layer) — BDT 5.8m", "Brickwork quantity increase (design revision) — BDT 3.2m", "Additional pile work (soil condition) — BDT 3.4m"],
    period: "Mar 2025 - Oct 2025",
  },
  {
    category: "Schedule Delay",
    description: "Finance cost from project timeline extension",
    amount: -14_000_000,
    direction: "erosion",
    details: ["Extended construction loan interest (4 months delay) — BDT 9.2m", "Site overhead for extended duration — BDT 3.1m", "Equipment rental extension — BDT 1.7m"],
    period: "Jan 2026 - ongoing",
  },
  {
    category: "Rate Variances",
    description: "Labour and equipment rate differences from estimates",
    amount: -6_800_000,
    direction: "erosion",
    details: ["Mason daily rate +15% (BDT 800 to 920) — BDT 3.2m", "Equipment hire rate increase — BDT 2.1m", "Supervisor salary adjustment — BDT 1.5m"],
    period: "Jul 2025 - Aug 2026",
  },
  {
    category: "Selling Price Increase",
    description: "Upward revision of unit selling prices",
    amount: 22_000_000,
    direction: "addition",
    details: ["Average rate increased from BDT 6,000 to BDT 6,350/SFT", "Premium floors repriced at +8%", "Parking price revised upward BDT 2L per slot"],
    period: "Oct 2025",
  },
  {
    category: "Procurement Savings",
    description: "Competitive bidding and bulk purchase savings",
    amount: 8_000_000,
    direction: "addition",
    details: ["Bulk cement purchase (annual contract) — Saved BDT 3.5m", "Competitive tender for MEP package — Saved BDT 2.8m", "Direct import of tiles (bypassing dealer) — Saved BDT 1.7m"],
    period: "Apr 2025 - Jun 2026",
  },
];

const totalErosion = factors.filter((f) => f.direction === "erosion").reduce((s, f) => s + f.amount, 0);
const totalAddition = factors.filter((f) => f.direction === "addition").reduce((s, f) => s + f.amount, 0);
const netImpact = totalErosion + totalAddition;
const currentForecastProfit = feasibilityProfit + netImpact;
const erosionPct = ((feasibilityProfit - currentForecastProfit) / feasibilityProfit * 100);

const timeline = [
  { period: "Mar 2025", event: "Excavation overrun discovered", impact: -5_800_000 },
  { period: "Jun 2025", event: "Lobby redesign approved", impact: -8_500_000 },
  { period: "Jul 2025", event: "Labour rate increase effective", impact: -3_200_000 },
  { period: "Oct 2025", event: "Selling price revision (+5.8%)", impact: 22_000_000 },
  { period: "Jan 2026", event: "Schedule delay — finance cost starts", impact: -9_200_000 },
  { period: "Mar 2026", event: "Steel price spike (+8.2%)", impact: -14_200_000 },
  { period: "Jun 2026", event: "Bulk cement contract savings", impact: 3_500_000 },
  { period: "Aug 2026", event: "Aggregate price increase (+12%)", impact: -10_500_000 },
];

export default function ProfitErosionPage() {
  let runningProfit = feasibilityProfit;

  return (
    <div className="space-y-6">
      <div>
        <Link href="/real-estate/reports" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-3">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to Reports
        </Link>
        <div className="flex items-center gap-3">
          <TrendingDown className="h-7 w-7 text-red-600" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Profit Erosion Analysis</h1>
            <p className="text-muted-foreground">ABC Nasirabad Heights — Factor-by-factor breakdown</p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Feasibility Profit</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-700">{formatBDT(feasibilityProfit)}</div><p className="text-xs text-muted-foreground">Original estimate (25.9% margin)</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Erosion</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-red-700">{formatBDT(Math.abs(totalErosion))}</div><p className="text-xs text-muted-foreground">5 erosion factors</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Additions</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-blue-700">{formatBDT(totalAddition)}</div><p className="text-xs text-muted-foreground">2 positive factors</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Current Forecast Profit</CardTitle></CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatBDT(currentForecastProfit)}</div>
            <p className="text-xs text-red-600">Eroded by {erosionPct.toFixed(1)}% from feasibility</p>
          </CardContent>
        </Card>
      </div>

      {/* Waterfall */}
      <Card>
        <CardHeader><CardTitle>Profit Waterfall</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2">
            {/* Start */}
            <div className="flex items-center gap-3">
              <div className="w-48 text-sm font-medium text-right">Feasibility Profit</div>
              <div className="flex-1 flex items-center">
                <div className="h-8 bg-green-500 rounded flex items-center justify-center text-white text-xs font-medium" style={{ width: `${(feasibilityProfit / feasibilityProfit) * 60}%` }}>
                  {formatBDT(feasibilityProfit)}
                </div>
              </div>
            </div>
            <Separator />
            {factors.map((f) => {
              const barWidth = Math.max((Math.abs(f.amount) / feasibilityProfit) * 60, 8);
              return (
                <div key={f.category} className="flex items-center gap-3">
                  <div className="w-48 text-sm text-right">{f.category}</div>
                  <div className="flex-1 flex items-center gap-2">
                    <div
                      className={`h-8 rounded flex items-center justify-center text-white text-xs font-medium ${f.direction === "erosion" ? "bg-red-500" : "bg-blue-500"}`}
                      style={{ width: `${barWidth}%` }}
                    >
                      {f.direction === "erosion" ? "-" : "+"}{formatBDT(Math.abs(f.amount))}
                    </div>
                    {f.direction === "erosion" ? <ArrowDown className="h-4 w-4 text-red-500" /> : <ArrowUp className="h-4 w-4 text-blue-500" />}
                  </div>
                </div>
              );
            })}
            <Separator />
            {/* End */}
            <div className="flex items-center gap-3">
              <div className="w-48 text-sm font-medium text-right">Current Forecast</div>
              <div className="flex-1 flex items-center">
                <div className="h-8 bg-amber-500 rounded flex items-center justify-center text-white text-xs font-medium" style={{ width: `${(currentForecastProfit / feasibilityProfit) * 60}%` }}>
                  {formatBDT(currentForecastProfit)}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Factor Details */}
      <Card>
        <CardHeader><CardTitle>Factor Details</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {factors.map((f) => (
            <div key={f.category} className={`p-4 border rounded-lg ${f.direction === "erosion" ? "border-red-200 bg-red-50/30" : "border-blue-200 bg-blue-50/30"}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {f.direction === "erosion" ? <ArrowDown className="h-4 w-4 text-red-500" /> : <ArrowUp className="h-4 w-4 text-blue-500" />}
                  <span className="font-medium">{f.category}</span>
                  <Badge variant="outline" className="text-xs">{f.period}</Badge>
                </div>
                <span className={`font-bold font-mono ${f.direction === "erosion" ? "text-red-700" : "text-blue-700"}`}>
                  {f.direction === "erosion" ? "-" : "+"}{formatBDT(Math.abs(f.amount))}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{f.description}</p>
              <ul className="mt-2 space-y-1">
                {f.details.map((d, i) => (
                  <li key={i} className="text-sm flex items-start gap-2">
                    <Minus className="h-3 w-3 mt-1 shrink-0" />{d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Impact Timeline */}
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5" /> Impact Timeline</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {timeline.map((t, i) => {
              runningProfit += t.impact;
              return (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-24 text-sm font-mono text-muted-foreground">{t.period}</div>
                  <div className={`w-3 h-3 rounded-full shrink-0 ${t.impact < 0 ? "bg-red-500" : "bg-blue-500"}`} />
                  <div className="flex-1 text-sm">{t.event}</div>
                  <div className={`font-mono text-sm font-medium ${t.impact < 0 ? "text-red-600" : "text-blue-600"}`}>
                    {t.impact < 0 ? "-" : "+"}{formatBDT(Math.abs(t.impact))}
                  </div>
                  <div className="w-24 text-right font-mono text-sm">{formatBDT(runningProfit)}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
