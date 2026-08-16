"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  ChevronLeft, DollarSign, ArrowRight, Info, TrendingUp,
  AlertTriangle, ExternalLink,
} from "lucide-react";
import { WorkspaceNav } from "@/components/real-estate/workspace-nav";

// ─── Mock Data ─────────────────────────────────────────────────

interface LineItem {
  label: string;
  value: string;
  source: string;
  sourceDetail: string;
  updatedDate: string;
  stale?: boolean;
}

const revenue: LineItem[] = [
  { label: "Saleable Area", value: "151,400 sqft", source: "Architecture Assessment", sourceDetail: "V2", updatedDate: "16 Aug" },
  { label: "Average Selling Price", value: "৳12,000 / sqft", source: "Marketing Assessment", sourceDetail: "Nadia", updatedDate: "18 Aug" },
  { label: "Expected Revenue", value: "৳1.82B", source: "Calculated", sourceDetail: "Area x Price", updatedDate: "18 Aug" },
];

const costs: LineItem[] = [
  { label: "Land", value: "৳450M", source: "Acquisition Assumption", sourceDetail: "BD Team", updatedDate: "10 Aug" },
  { label: "Development", value: "৳848M", source: "Engineering Estimate", sourceDetail: "V3", updatedDate: "22 Aug" },
  { label: "Marketing & Sales", value: "৳56M", source: "Marketing Assessment", sourceDetail: "3% of revenue", updatedDate: "18 Aug" },
  { label: "Finance Cost", value: "৳84M", source: "Finance Department", sourceDetail: "12% p.a. assumed", updatedDate: "20 Aug" },
  { label: "Other / Professional", value: "৳32M", source: "Finance Department", sourceDetail: "Architect, legal, consultants", updatedDate: "20 Aug" },
];

const result = [
  { label: "Total Cost", value: "৳1.47B" },
  { label: "Expected Profit", value: "৳350M" },
  { label: "Margin", value: "19.2%" },
  { label: "IRR", value: "20.8%" },
  { label: "Payback", value: "4.4 yrs" },
  { label: "Cost / SFT", value: "৳9,710" },
  { label: "Revenue / SFT", value: "৳12,000" },
  { label: "Break-Even Price", value: "৳9,710 / sqft" },
];

const scenarios = [
  { metric: "Revenue", conservative: "৳1.65B", base: "৳1.82B", optimistic: "৳1.98B" },
  { metric: "Total Cost", conservative: "৳1.51B", base: "৳1.47B", optimistic: "৳1.44B" },
  { metric: "Profit", conservative: "৳140M", base: "৳350M", optimistic: "৳540M" },
  { metric: "Margin", conservative: "8.5%", base: "19.2%", optimistic: "27.3%" },
  { metric: "IRR", conservative: "12.4%", base: "20.8%", optimistic: "28.1%" },
];

const assumptions = [
  { assumption: "Selling Price", value: "৳12,000/sqft", source: "Marketing", assessor: "Nadia", updated: "18 Aug" },
  { assumption: "Sales Velocity", value: "8 units/quarter", source: "Sales", assessor: "Tariq", updated: "19 Aug" },
  { assumption: "Construction Cost", value: "৳848M", source: "Engineering", assessor: "Eng. Rafi", updated: "22 Aug" },
  { assumption: "Land Cost", value: "৳450M", source: "BD / Acquisition", assessor: "Rahim", updated: "10 Aug" },
  { assumption: "Finance Rate", value: "12% p.a.", source: "Finance", assessor: "Analyst", updated: "20 Aug" },
  { assumption: "Construction Duration", value: "32 months", source: "Engineering", assessor: "Eng. Rafi", updated: "22 Aug" },
  { assumption: "Marketing Budget", value: "3% of revenue", source: "Marketing", assessor: "Nadia", updated: "18 Aug" },
  { assumption: "Contingency", value: "5%", source: "Company Policy", assessor: "—", updated: "—" },
];

// ─── Component ─────────────────────────────────────────────────

export default function FinancialModelPage() {
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
        <div className="flex items-center gap-3">
          <DollarSign className="h-7 w-7 text-emerald-600" />
          <div>
            <h1 className="text-2xl font-bold">Financial Model</h1>
            <p className="text-muted-foreground">Gulshan Plot 07 &middot; All values sourced from department assessments</p>
          </div>
        </div>
      </div>

      {/* Workspace Navigation */}
      <WorkspaceNav active="financial" />

      {/* Revenue */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {revenue.map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    Source: {item.source} {item.sourceDetail} &middot; {item.updatedDate}
                  </p>
                </div>
                <p className="text-sm font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Costs */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Costs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {costs.map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    Source: {item.source} — {item.sourceDetail} &middot; {item.updatedDate}
                    {item.stale && (
                      <Badge variant="destructive" className="text-[10px] ml-1">Stale</Badge>
                    )}
                  </p>
                </div>
                <p className="text-sm font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Result */}
      <Card className="border-emerald-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Result</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {result.map((item) => (
              <div key={item.label} className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-lg font-bold">{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scenarios */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Scenarios</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead className="text-center">Conservative</TableHead>
                <TableHead className="text-center bg-blue-50">Base</TableHead>
                <TableHead className="text-center">Optimistic</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scenarios.map((row) => (
                <TableRow key={row.metric}>
                  <TableCell className="font-medium">{row.metric}</TableCell>
                  <TableCell className="text-center text-muted-foreground">{row.conservative}</TableCell>
                  <TableCell className="text-center font-semibold bg-blue-50/50">{row.base}</TableCell>
                  <TableCell className="text-center text-muted-foreground">{row.optimistic}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Source Assumptions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Source Assumptions</CardTitle>
          <p className="text-xs text-muted-foreground">Every number traces back to a department assessment.</p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Assumption</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Assessor</TableHead>
                <TableHead>Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assumptions.map((a) => (
                <TableRow key={a.assumption}>
                  <TableCell className="font-medium">{a.assumption}</TableCell>
                  <TableCell>{a.value}</TableCell>
                  <TableCell className="text-muted-foreground">{a.source}</TableCell>
                  <TableCell className="text-muted-foreground">{a.assessor}</TableCell>
                  <TableCell className="text-muted-foreground">{a.updated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Info */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardContent className="pt-4 flex gap-3">
          <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800">
            The financial model consumes department outputs — not manual entry. If Marketing revises selling price,
            the model recalculates automatically. Source dates show when each assumption was last validated.
            Assumptions older than 30 days are flagged as potentially stale.
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
