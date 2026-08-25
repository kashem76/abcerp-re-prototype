"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  ChevronLeft, DollarSign, ArrowRight, Info, AlertTriangle,
} from "lucide-react";

// ─── Mock Data ─────────────────────────────────────────────────

interface LineItem {
  label: string;
  value: string;
  source: string;
  assessor: string;
  updatedDate: string;
  stale?: boolean;
}

const revenueItems: LineItem[] = [
  { label: "Saleable Area", value: "151,400 sqft", source: "Engineering Assessment", assessor: "Eng. Rafi", updatedDate: "16 Aug" },
  { label: "Average Selling Price", value: "৳12,000 / sqft", source: "Marketing Assessment", assessor: "Nadia", updatedDate: "18 Aug" },
  { label: "Expected Revenue", value: "৳1,816,800,000", source: "Calculated", assessor: "Area × Price", updatedDate: "18 Aug" },
];

const costItems: LineItem[] = [
  { label: "Land Acquisition", value: "৳450,000,000", source: "BD / Acquisition", assessor: "Rahim", updatedDate: "10 Aug", stale: true },
  { label: "Construction", value: "৳716,100,000", source: "Engineering Estimate V3", assessor: "Cost Eng.", updatedDate: "22 Aug" },
  { label: "Site & External", value: "৳54,000,000", source: "Engineering Estimate V3", assessor: "Cost Eng.", updatedDate: "22 Aug" },
  { label: "Professional / Consultants", value: "৳38,000,000", source: "Finance Department", assessor: "Analyst", updatedDate: "20 Aug" },
  { label: "Marketing & Sales", value: "৳56,000,000", source: "Marketing Assessment", assessor: "Nadia", updatedDate: "18 Aug" },
  { label: "Finance Cost", value: "৳84,000,000", source: "Finance Department", assessor: "Analyst", updatedDate: "20 Aug" },
  { label: "Contingency (5%)", value: "৳40,000,000", source: "Company Policy", assessor: "—", updatedDate: "—" },
];

const resultMetrics = [
  { label: "Expected Revenue", value: "৳1.82B", highlight: false },
  { label: "Total Cost", value: "৳1.47B", highlight: false },
  { label: "Expected Profit", value: "৳350M", highlight: true },
  { label: "Margin", value: "19.2%", highlight: true },
  { label: "IRR", value: "20.8%", highlight: true },
  { label: "Payback", value: "4.4 yrs", highlight: false },
];

const perUnitMetrics = [
  { label: "Cost / SFT", value: "৳9,710" },
  { label: "Revenue / SFT", value: "৳12,000" },
  { label: "Break-Even Price", value: "৳9,710 / sqft" },
  { label: "Peak Funding", value: "৳680M" },
];

const scenarios = [
  { metric: "Revenue", conservative: "৳1.65B", base: "৳1.82B", optimistic: "৳1.98B" },
  { metric: "Total Cost", conservative: "৳1.51B", base: "৳1.47B", optimistic: "৳1.44B" },
  { metric: "Profit", conservative: "৳140M", base: "৳350M", optimistic: "৳540M" },
  { metric: "Margin", conservative: "8.5%", base: "19.2%", optimistic: "27.3%" },
  { metric: "IRR", conservative: "12.4%", base: "20.8%", optimistic: "28.1%" },
];

const sourceAssumptions = [
  { assumption: "Selling Price", value: "৳12,000/sqft", source: "Marketing", assessor: "Nadia", updated: "18 Aug", stale: false },
  { assumption: "Sales Velocity", value: "8 units/qtr", source: "Sales", assessor: "Tariq", updated: "19 Aug", stale: false },
  { assumption: "Construction Cost", value: "৳716M", source: "Engineering", assessor: "Cost Eng.", updated: "22 Aug", stale: false },
  { assumption: "Land Cost", value: "৳450M", source: "BD / Acquisition", assessor: "Rahim", updated: "10 Aug", stale: true },
  { assumption: "Finance Rate", value: "12% p.a.", source: "Finance", assessor: "Analyst", updated: "20 Aug", stale: false },
  { assumption: "Construction Duration", value: "32 months", source: "Engineering", assessor: "Eng. Rafi", updated: "22 Aug", stale: false },
  { assumption: "Marketing Budget", value: "3% of revenue", source: "Marketing", assessor: "Nadia", updated: "18 Aug", stale: false },
  { assumption: "Contingency", value: "5%", source: "Company Policy", assessor: "—", updated: "—", stale: false },
];

// ─── Component ─────────────────────────────────────────────────

export default function FinancialModelPage() {
  const staleCount = sourceAssumptions.filter((a) => a.stale).length;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <Link
          href="/real-estate/land-leads/LL-2026-001/feasibility"
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-2"
        >
          <ChevronLeft className="h-4 w-4" /> Evaluation Overview
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Financial Model</h1>
              <p className="text-sm text-muted-foreground">Gulshan Plot 07 &middot; All values sourced from department assessments</p>
            </div>
          </div>
          {staleCount > 0 && (
            <Badge className="bg-amber-100 text-amber-800 gap-1">
              <AlertTriangle className="h-3 w-3" /> {staleCount} stale assumption
            </Badge>
          )}
        </div>
      </div>

      {/* ── Revenue ── */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-0">
            {revenueItems.map((item) => (
              <SourcedLine key={item.label} item={item} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── Costs ── */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Costs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-0">
            {costItems.map((item) => (
              <SourcedLine key={item.label} item={item} />
            ))}
            {/* Total */}
            <div className="flex items-center justify-between pt-3 mt-2 border-t">
              <p className="text-sm font-bold">Total Project Cost</p>
              <p className="text-sm font-bold">৳1,438,100,000</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Result ── */}
      <Card className="border-emerald-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Result</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
            {resultMetrics.map((item) => (
              <div key={item.label} className={`text-center p-3 rounded-lg ${item.highlight ? "bg-emerald-50 border border-emerald-200" : "bg-muted/50"}`}>
                <p className={`text-lg font-bold ${item.highlight ? "text-emerald-700" : ""}`}>{item.value}</p>
                <p className="text-[11px] text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-3">
            {perUnitMetrics.map((item) => (
              <div key={item.label} className="text-center p-2 bg-muted/30 rounded">
                <p className="text-sm font-semibold">{item.value}</p>
                <p className="text-[11px] text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── Scenarios ── */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Scenario Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead className="text-center text-muted-foreground">Conservative</TableHead>
                <TableHead className="text-center bg-blue-50 font-semibold">Base Case</TableHead>
                <TableHead className="text-center text-muted-foreground">Optimistic</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scenarios.map((row) => {
                const isIRR = row.metric === "IRR";
                return (
                  <TableRow key={row.metric}>
                    <TableCell className="font-medium text-sm">{row.metric}</TableCell>
                    <TableCell className="text-center text-sm text-muted-foreground">
                      {row.conservative}
                      {isIRR && <span className="block text-[10px] text-red-600">Below 15% target</span>}
                    </TableCell>
                    <TableCell className="text-center text-sm font-semibold bg-blue-50/50">{row.base}</TableCell>
                    <TableCell className="text-center text-sm text-muted-foreground">{row.optimistic}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ── Source Assumptions ── */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Source Assumptions</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Every number traces back to a department assessment. Stale items updated &gt;30 days ago.</p>
            </div>
            {staleCount > 0 && (
              <Badge variant="outline" className="text-amber-700 border-amber-300 text-[10px]">
                {staleCount} stale
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Assumption</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Source Dept</TableHead>
                <TableHead>Assessor</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sourceAssumptions.map((a) => (
                <TableRow key={a.assumption} className={a.stale ? "bg-amber-50/50" : ""}>
                  <TableCell className="font-medium text-sm">{a.assumption}</TableCell>
                  <TableCell className="text-sm">{a.value}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{a.source}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{a.assessor}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{a.updated}</TableCell>
                  <TableCell>
                    {a.stale && (
                      <Badge className="bg-amber-100 text-amber-800 text-[9px] gap-0.5">
                        <AlertTriangle className="h-2.5 w-2.5" /> Stale
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ── Info ── */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardContent className="py-4 flex gap-3">
          <Info className="h-5 w-5 text-blue-600 shrink-0" />
          <p className="text-sm text-blue-800">
            This model consumes department outputs — not manual entry. If Marketing revises selling price, the model
            recalculates automatically. Source dates show when each assumption was last validated. Assumptions older
            than 30 days are flagged as stale and should be reconfirmed before management decision.
          </p>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Link href="/real-estate/land-leads/LL-2026-001/feasibility">
          <Button variant="outline" className="gap-2">
            <ChevronLeft className="h-4 w-4" /> Evaluation Overview
          </Button>
        </Link>
        <Link href="/real-estate/land-leads/LL-2026-001/decision">
          <Button className="gap-2">
            Decision <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

// ─── Sourced Line Item ─────────────────────────────────────────

function SourcedLine({ item }: { item: LineItem }) {
  return (
    <div className={`flex items-center justify-between py-3 border-b last:border-b-0 ${item.stale ? "bg-amber-50/50 -mx-4 px-4 rounded" : ""}`}>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{item.label}</p>
        <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
          {item.source} &middot; {item.assessor} &middot; {item.updatedDate}
          {item.stale && (
            <Badge className="bg-amber-100 text-amber-800 text-[9px] gap-0.5 ml-1">
              <AlertTriangle className="h-2.5 w-2.5" /> Stale
            </Badge>
          )}
        </p>
      </div>
      <p className="text-sm font-semibold tabular-nums">{item.value}</p>
    </div>
  );
}
