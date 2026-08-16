"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft, DollarSign, ChevronDown, ChevronRight, AlertTriangle,
  CheckCircle2, Circle, Clock, User, Shield, Save, Send, Info,
  TrendingUp, TrendingDown, Minus, Upload,
} from "lucide-react";

// ─── Mock Data ─────────────────────────────────────────────────

type EstimationMethod = "Cost / sqft" | "Cost / sqm" | "Lump Sum" | "Quantity x Rate" | "Percentage" | "Historical Average" | "Manual";
type EntryStatus = "complete" | "in-progress" | "not-started";

interface CostEntry {
  id: string;
  category: string;
  code: string;
  group: string;
  method: EstimationMethod;
  status: EntryStatus;
  // Estimation inputs
  area?: number;
  rate?: number;
  quantity?: number;
  unitRate?: number;
  unit?: string;
  lumpSum?: number;
  percentage?: number;
  baseAmount?: number;
  manualAmount?: number;
  // Calculated
  estimate: number;
  // Benchmark
  benchmarkRate: number;
  benchmarkUnit: string;
  benchmarkTotal: number;
  variance: number; // percentage
  // Detail
  notes: string;
  assumptions: string;
  evidence: string[];
}

const constructionArea = 151_400; // sqft

const costEntries: CostEntry[] = [
  {
    id: "CE01", category: "Site Preparation & Earthwork", code: "SITE-PREP", group: "Site Works",
    method: "Cost / sqft", status: "complete",
    area: constructionArea, rate: 85,
    estimate: 12_869_000, benchmarkRate: 83, benchmarkUnit: "/sqft", benchmarkTotal: 12_566_200, variance: 2.4,
    notes: "Includes demolition of existing shed and site leveling.", assumptions: "Standard site prep, no major earthwork required.", evidence: ["Site_Survey.pdf"],
  },
  {
    id: "CE02", category: "Foundation / Substructure", code: "FOUNDATION", group: "Structure",
    method: "Cost / sqft", status: "complete",
    area: constructionArea, rate: 560,
    estimate: 84_784_000, benchmarkRate: 520, benchmarkUnit: "/sqft", benchmarkTotal: 78_728_000, variance: 7.7,
    notes: "Pile foundation required based on soil investigation. 60ft depth assumed.", assumptions: "Pile foundation, not raft. Cost includes pile cap and grade beams.", evidence: ["Bore_Log.pdf", "Foundation_Estimate.xlsx"],
  },
  {
    id: "CE03", category: "RCC / Structural Frame", code: "RCC", group: "Structure",
    method: "Cost / sqft", status: "complete",
    area: constructionArea, rate: 1_200,
    estimate: 181_680_000, benchmarkRate: 1_200, benchmarkUnit: "/sqft", benchmarkTotal: 181_680_000, variance: 0,
    notes: "14-story RCC frame. Standard design.", assumptions: "No transfer beams. Regular column grid.", evidence: [],
  },
  {
    id: "CE04", category: "Masonry / Brickwork", code: "MASONRY", group: "Structure",
    method: "Cost / sqft", status: "complete",
    area: constructionArea, rate: 185,
    estimate: 28_009_000, benchmarkRate: 180, benchmarkUnit: "/sqft", benchmarkTotal: 27_252_000, variance: 2.8,
    notes: "", assumptions: "1st class bricks, standard mortar mix.", evidence: [],
  },
  {
    id: "CE05", category: "Plastering & Waterproofing", code: "PLASTER", group: "Finishes",
    method: "Cost / sqft", status: "complete",
    area: constructionArea, rate: 125,
    estimate: 18_925_000, benchmarkRate: 120, benchmarkUnit: "/sqft", benchmarkTotal: 18_168_000, variance: 4.2,
    notes: "Waterproofing for basements, bathrooms, and roof.", assumptions: "Standard plaster. Chemical waterproofing for wet areas.", evidence: [],
  },
  {
    id: "CE06", category: "Flooring & Finishes", code: "FLOORING", group: "Finishes",
    method: "Cost / sqft", status: "complete",
    area: constructionArea, rate: 260,
    estimate: 39_364_000, benchmarkRate: 250, benchmarkUnit: "/sqft", benchmarkTotal: 37_850_000, variance: 4.0,
    notes: "Premium positioning — higher spec flooring for Gulshan market.", assumptions: "Imported tiles for living areas, local for service areas.", evidence: [],
  },
  {
    id: "CE07", category: "Doors, Windows & Glazing", code: "DOORS-WIN", group: "Finishes",
    method: "Cost / sqft", status: "complete",
    area: constructionArea, rate: 150,
    estimate: 22_710_000, benchmarkRate: 140, benchmarkUnit: "/sqft", benchmarkTotal: 21_196_000, variance: 7.1,
    notes: "Aluminum windows with tinted glass. Premium doors for units.", assumptions: "Thai aluminum. Tinted 5mm glass.", evidence: [],
  },
  {
    id: "CE08", category: "Painting", code: "PAINTING", group: "Finishes",
    method: "Cost / sqft", status: "complete",
    area: constructionArea, rate: 65,
    estimate: 9_841_000, benchmarkRate: 65, benchmarkUnit: "/sqft", benchmarkTotal: 9_841_000, variance: 0,
    notes: "", assumptions: "Berger or equivalent. 2 coats.", evidence: [],
  },
  {
    id: "CE09", category: "Electrical Works", code: "ELECTRICAL", group: "Services",
    method: "Cost / sqft", status: "complete",
    area: constructionArea, rate: 290,
    estimate: 43_906_000, benchmarkRate: 280, benchmarkUnit: "/sqft", benchmarkTotal: 42_392_000, variance: 3.6,
    notes: "Includes generator backup and substation.", assumptions: "Full backup generator. DESCO substation included.", evidence: ["Electrical_BOQ_Draft.xlsx"],
  },
  {
    id: "CE10", category: "Plumbing & Sanitary", code: "PLUMBING", group: "Services",
    method: "Cost / sqft", status: "complete",
    area: constructionArea, rate: 165,
    estimate: 24_981_000, benchmarkRate: 160, benchmarkUnit: "/sqft", benchmarkTotal: 24_224_000, variance: 3.1,
    notes: "", assumptions: "RAK or equivalent fittings.", evidence: [],
  },
  {
    id: "CE11", category: "Fire Protection", code: "FIRE", group: "Services",
    method: "Lump Sum", status: "complete",
    lumpSum: 8_500_000,
    estimate: 8_500_000, benchmarkRate: 45, benchmarkUnit: "/sqft", benchmarkTotal: 6_813_000, variance: 24.8,
    notes: "Fire code compliance for 14-story building. Sprinkler system included.", assumptions: "Full sprinkler + hose reel + fire alarm. BNBC 2020 compliant.", evidence: ["Fire_Quote.pdf"],
  },
  {
    id: "CE12", category: "HVAC / Mechanical", code: "HVAC", group: "Services",
    method: "Manual", status: "in-progress",
    manualAmount: 0,
    estimate: 0, benchmarkRate: 0, benchmarkUnit: "", benchmarkTotal: 0, variance: 0,
    notes: "Awaiting HVAC consultant input.", assumptions: "", evidence: [],
  },
  {
    id: "CE13", category: "Lift / Elevator", code: "LIFT", group: "Services",
    method: "Quantity x Rate", status: "complete",
    quantity: 3, unitRate: 3_500_000, unit: "units",
    estimate: 10_500_000, benchmarkRate: 3_200_000, benchmarkUnit: "/unit", benchmarkTotal: 9_600_000, variance: 9.4,
    notes: "3 passenger lifts. 14-stop.", assumptions: "Sigma or equivalent. 1000kg capacity.", evidence: ["Lift_Quotation.pdf"],
  },
  {
    id: "CE14", category: "External / Site Development", code: "EXTERNAL", group: "External",
    method: "Lump Sum", status: "complete",
    lumpSum: 42_000_000,
    estimate: 42_000_000, benchmarkRate: 55, benchmarkUnit: "/sqft", benchmarkTotal: 45_000_000, variance: -6.7,
    notes: "Boundary wall, gate, guard house, landscaping, internal roads, drainage.", assumptions: "Standard external works.", evidence: [],
  },
  {
    id: "CE15", category: "Utility & Services Connection", code: "UTILITY", group: "External",
    method: "Lump Sum", status: "complete",
    lumpSum: 12_000_000,
    estimate: 12_000_000, benchmarkRate: 0, benchmarkUnit: "", benchmarkTotal: 0, variance: 0,
    notes: "WASA, DESCO, Titas Gas connections.", assumptions: "All utilities available within 200m.", evidence: [],
  },
  {
    id: "CE16", category: "Other / Special Works", code: "OTHER", group: "Other",
    method: "Manual", status: "not-started",
    manualAmount: 0,
    estimate: 0, benchmarkRate: 0, benchmarkUnit: "", benchmarkTotal: 0, variance: 0,
    notes: "", assumptions: "", evidence: [],
  },
  {
    id: "CE17", category: "Contingency", code: "CONTINGENCY", group: "Other",
    method: "Percentage", status: "complete",
    percentage: 5, baseAmount: 540_069_000,
    estimate: 27_003_450, benchmarkRate: 5, benchmarkUnit: "%", benchmarkTotal: 27_003_450, variance: 0,
    notes: "5% of subtotal per company policy.", assumptions: "Standard contingency.", evidence: [],
  },
];

const groups = ["Site Works", "Structure", "Finishes", "Services", "External", "Other"];

function formatM(value: number): string {
  if (value === 0) return "—";
  if (value >= 1_000_000_000) return `৳${(value / 1_000_000_000).toFixed(2)}B`;
  if (value >= 1_000_000) return `৳${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `৳${(value / 1_000).toFixed(0)}K`;
  return `৳${value}`;
}

function varianceColor(v: number): string {
  if (v === 0) return "text-muted-foreground";
  if (Math.abs(v) <= 5) return "text-muted-foreground";
  if (v > 0) return "text-amber-600";
  return "text-emerald-600";
}

function varianceIcon(v: number) {
  if (v === 0 || Math.abs(v) <= 1) return Minus;
  if (v > 0) return TrendingUp;
  return TrendingDown;
}

// ─── Component ─────────────────────────────────────────────────

export default function CostEstimationPage() {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const completed = costEntries.filter((e) => e.status === "complete").length;
  const totalEstimate = costEntries.reduce((s, e) => s + e.estimate, 0);
  const totalBenchmark = costEntries.filter((e) => e.benchmarkTotal > 0).reduce((s, e) => s + e.benchmarkTotal, 0);
  const overallVariance = totalBenchmark > 0 ? ((totalEstimate - totalBenchmark) / totalBenchmark) * 100 : 0;
  const allDone = completed === costEntries.length;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <Link
          href="/real-estate/land-leads/LL-2026-001/work"
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-2"
        >
          <ChevronLeft className="h-4 w-4" /> Work Board
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Preliminary Cost Estimate</h1>
            <p className="text-muted-foreground">Gulshan Plot 07 &middot; {constructionArea.toLocaleString()} sqft construction area</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-3.5 w-3.5" /> Cost Engineer
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="h-3.5 w-3.5" /> CFO
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-3.5 w-3.5" /> Due 24 Aug
              </div>
            </div>
            <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-3">
          <Progress value={(completed / costEntries.length) * 100} className="h-2 flex-1 max-w-xs" />
          <span className="text-sm font-medium">{completed} / {costEntries.length} categories</span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Estimate</p>
            <p className="text-xl font-bold">{formatM(totalEstimate)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Company Benchmark</p>
            <p className="text-xl font-bold">{formatM(totalBenchmark)}</p>
          </CardContent>
        </Card>
        <Card className={Math.abs(overallVariance) > 5 ? "border-amber-300" : ""}>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Overall Variance</p>
            <p className={`text-xl font-bold ${varianceColor(overallVariance)}`}>
              {overallVariance > 0 ? "+" : ""}{overallVariance.toFixed(1)}%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Cost / sqft</p>
            <p className="text-xl font-bold">৳{Math.round(totalEstimate / constructionArea).toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Cost Table by Group */}
      {groups.map((group) => {
        const groupEntries = costEntries.filter((e) => e.group === group);
        if (groupEntries.length === 0) return null;
        const groupTotal = groupEntries.reduce((s, e) => s + e.estimate, 0);

        return (
          <div key={group}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{group}</h3>
              <span className="text-sm font-medium">{formatM(groupTotal)}</span>
            </div>
            <Card>
              <div className="divide-y">
                {groupEntries.map((entry) => {
                  const isExpanded = expandedRow === entry.id;
                  const VarIcon = varianceIcon(entry.variance);
                  const StatusIcon = entry.status === "complete" ? CheckCircle2 : entry.status === "in-progress" ? Clock : Circle;
                  const statusColor = entry.status === "complete" ? "text-emerald-600" : entry.status === "in-progress" ? "text-blue-600" : "text-gray-300";

                  return (
                    <div key={entry.id}>
                      {/* Row */}
                      <div
                        className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${isExpanded ? "bg-muted/50" : "hover:bg-muted/30"}`}
                        onClick={() => setExpandedRow(isExpanded ? null : entry.id)}
                      >
                        <StatusIcon className={`h-4 w-4 ${statusColor} shrink-0`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{entry.category}</span>
                            <Badge variant="outline" className="text-[10px] font-mono">{entry.code}</Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">{entry.method}</span>
                        </div>

                        {/* Estimate */}
                        <div className="text-right w-24">
                          <p className="text-sm font-semibold">{formatM(entry.estimate)}</p>
                        </div>

                        {/* Benchmark */}
                        <div className="text-right w-24 hidden md:block">
                          <p className="text-xs text-muted-foreground">{entry.benchmarkTotal > 0 ? formatM(entry.benchmarkTotal) : "—"}</p>
                        </div>

                        {/* Variance */}
                        <div className="text-right w-20 hidden md:block">
                          {entry.variance !== 0 && entry.benchmarkTotal > 0 ? (
                            <span className={`text-xs font-medium flex items-center justify-end gap-1 ${varianceColor(entry.variance)}`}>
                              <VarIcon className="h-3 w-3" />
                              {entry.variance > 0 ? "+" : ""}{entry.variance.toFixed(1)}%
                            </span>
                          ) : entry.benchmarkTotal > 0 ? (
                            <span className="text-xs text-muted-foreground">On target</span>
                          ) : (
                            <span className="text-xs text-muted-foreground">—</span>
                          )}
                        </div>

                        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform shrink-0 ${isExpanded ? "rotate-180" : ""}`} />
                      </div>

                      {/* Expanded Detail */}
                      {isExpanded && (
                        <CostEntryDetail entry={entry} constructionArea={constructionArea} />
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        );
      })}

      {/* Total */}
      <Card className="border-2">
        <CardContent className="pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-bold">Total Development Cost</p>
              <p className="text-xs text-muted-foreground">{costEntries.length} categories &middot; {completed} estimated</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{formatM(totalEstimate)}</p>
              <p className={`text-sm ${varianceColor(overallVariance)}`}>
                {overallVariance > 0 ? "+" : ""}{overallVariance.toFixed(1)}% vs benchmark ({formatM(totalBenchmark)})
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button variant="outline" className="gap-1">
            <Save className="h-4 w-4" /> Save Draft
          </Button>
          <Button variant="outline" className="gap-1">
            <Upload className="h-4 w-4" /> Attach Backup
          </Button>
        </div>
        <Button disabled={!allDone} className="gap-1">
          <Send className="h-4 w-4" /> Submit for Review
        </Button>
      </div>

      {/* Sign-off Section */}
      {allDone && (
        <Card className="border-emerald-300">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="h-5 w-5 text-emerald-600" />
              Cost Estimate Review
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-xl font-bold">{formatM(totalEstimate)}</p>
                <p className="text-xs text-muted-foreground">Total Estimate</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-xl font-bold">৳{Math.round(totalEstimate / constructionArea).toLocaleString()}/sqft</p>
                <p className="text-xs text-muted-foreground">Cost per sqft</p>
              </div>
              <div className={`text-center p-3 rounded-lg ${Math.abs(overallVariance) > 5 ? "bg-amber-50 border border-amber-200" : "bg-muted/50"}`}>
                <p className={`text-xl font-bold ${varianceColor(overallVariance)}`}>
                  {overallVariance > 0 ? "+" : ""}{overallVariance.toFixed(1)}%
                </p>
                <p className="text-xs text-muted-foreground">vs Benchmark</p>
              </div>
            </div>

            {/* Variance flags */}
            {costEntries.filter((e) => Math.abs(e.variance) > 7 && e.benchmarkTotal > 0).length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2">Significant Variances</p>
                <div className="space-y-1">
                  {costEntries.filter((e) => Math.abs(e.variance) > 7 && e.benchmarkTotal > 0).map((e) => (
                    <div key={e.id} className="flex items-center gap-2 text-sm p-2 bg-amber-50 rounded border border-amber-200">
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                      <span className="font-medium">{e.category}</span>
                      <span className="text-amber-700">
                        {e.variance > 0 ? "+" : ""}{e.variance.toFixed(1)}% ({formatM(e.estimate)} vs benchmark {formatM(e.benchmarkTotal)})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="text-sm font-medium">Reviewer Comments</label>
              <Textarea placeholder="CFO or reviewer comments on the cost estimate..." className="mt-1" rows={3} />
            </div>

            <div className="flex gap-3 justify-end">
              <Button variant="outline">Return for Revision</Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700 gap-1">
                <CheckCircle2 className="h-4 w-4" /> Approve Estimate
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Info */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardContent className="pt-4 flex gap-3">
          <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800">
            This preliminary estimate feeds directly into the Financial Model. Categories and benchmarks
            are configured in Settings &gt; Land Evaluation &gt; Preliminary Cost. Variances above 7%
            are automatically flagged for reviewer attention.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Cost Entry Detail ──────────────────────────────────────────

function CostEntryDetail({ entry, constructionArea }: { entry: CostEntry; constructionArea: number }) {
  return (
    <div className="px-4 pb-4 pt-2 ml-7 space-y-4 border-t border-dashed">
      {/* Estimation Inputs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="text-xs font-medium text-muted-foreground">Method</label>
          <Select defaultValue={entry.method}>
            <SelectTrigger className="mt-1 text-sm"><SelectValue /></SelectTrigger>
            <SelectContent>
              {["Cost / sqft", "Cost / sqm", "Lump Sum", "Quantity x Rate", "Percentage", "Historical Average", "Manual"].map((m) => (
                <SelectItem key={m} value={m}>{m}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {entry.method === "Cost / sqft" && (
          <>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Construction Area</label>
              <div className="flex items-center gap-1 mt-1">
                <Input type="number" defaultValue={constructionArea} className="text-sm" disabled />
                <span className="text-xs text-muted-foreground shrink-0">sqft</span>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Rate</label>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs text-muted-foreground">৳</span>
                <Input type="number" defaultValue={entry.rate} className="text-sm" />
                <span className="text-xs text-muted-foreground shrink-0">/sqft</span>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Estimate</label>
              <p className="text-sm font-semibold mt-2">{formatM(entry.estimate)}</p>
            </div>
          </>
        )}

        {entry.method === "Lump Sum" && (
          <>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Amount</label>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs text-muted-foreground">৳</span>
                <Input type="number" defaultValue={entry.lumpSum} className="text-sm" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Estimate</label>
              <p className="text-sm font-semibold mt-2">{formatM(entry.estimate)}</p>
            </div>
          </>
        )}

        {entry.method === "Quantity x Rate" && (
          <>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Quantity</label>
              <div className="flex items-center gap-1 mt-1">
                <Input type="number" defaultValue={entry.quantity} className="text-sm" />
                <span className="text-xs text-muted-foreground shrink-0">{entry.unit}</span>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Unit Rate</label>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs text-muted-foreground">৳</span>
                <Input type="number" defaultValue={entry.unitRate} className="text-sm" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Estimate</label>
              <p className="text-sm font-semibold mt-2">{formatM(entry.estimate)}</p>
            </div>
          </>
        )}

        {entry.method === "Percentage" && (
          <>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Percentage</label>
              <div className="flex items-center gap-1 mt-1">
                <Input type="number" defaultValue={entry.percentage} className="text-sm max-w-[80px]" />
                <span className="text-xs text-muted-foreground">%</span>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Base Amount</label>
              <p className="text-sm mt-2">{formatM(entry.baseAmount || 0)}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Estimate</label>
              <p className="text-sm font-semibold mt-2">{formatM(entry.estimate)}</p>
            </div>
          </>
        )}

        {entry.method === "Manual" && (
          <>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Amount</label>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs text-muted-foreground">৳</span>
                <Input type="number" defaultValue={entry.manualAmount} className="text-sm" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Estimate</label>
              <p className="text-sm font-semibold mt-2">{formatM(entry.estimate)}</p>
            </div>
          </>
        )}
      </div>

      {/* Benchmark Comparison */}
      {entry.benchmarkTotal > 0 && (
        <div className="bg-muted/30 rounded-lg p-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Benchmark Comparison</p>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Company Average</p>
              <p className="font-medium">৳{entry.benchmarkRate.toLocaleString()} {entry.benchmarkUnit}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Benchmark Total</p>
              <p className="font-medium">{formatM(entry.benchmarkTotal)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Variance</p>
              <p className={`font-medium ${varianceColor(entry.variance)}`}>
                {entry.variance > 0 ? "+" : ""}{entry.variance.toFixed(1)}%
                {Math.abs(entry.variance) > 7 && (
                  <AlertTriangle className="h-3.5 w-3.5 inline ml-1 text-amber-500" />
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Notes & Assumptions */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-muted-foreground">Notes</label>
          <Textarea defaultValue={entry.notes} placeholder="Notes..." className="mt-1 text-sm" rows={2} />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">Assumptions</label>
          <Textarea defaultValue={entry.assumptions} placeholder="Key assumptions..." className="mt-1 text-sm" rows={2} />
        </div>
      </div>

      {/* Evidence */}
      <div>
        <label className="text-xs font-medium text-muted-foreground">Supporting Documents</label>
        <div className="flex flex-wrap gap-2 mt-1">
          {entry.evidence.map((file) => (
            <Badge key={file} variant="secondary" className="text-xs">{file}</Badge>
          ))}
          <Button variant="outline" size="sm" className="text-xs gap-1 h-6">
            <Upload className="h-3 w-3" /> Attach
          </Button>
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <Button size="sm" className="gap-1">
          <Save className="h-3.5 w-3.5" /> Save Category
        </Button>
      </div>
    </div>
  );
}
