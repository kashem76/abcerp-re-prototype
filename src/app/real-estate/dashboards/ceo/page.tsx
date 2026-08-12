"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { projects, formatBDT, formatNumber } from "@/lib/mock-data";
import {
  Building2, TrendingUp, Wallet, DollarSign, AlertTriangle,
  AlertCircle, Info, Users, ShoppingBag, BarChart3, ArrowUp,
  ArrowDown, CircleDot, CheckCircle2, Clock, XCircle,
  Banknote, PieChart, Activity
} from "lucide-react";

// Derived portfolio data
const portfolio = {
  totalGDV: 2_350_000_000,
  totalInvestment: 1_720_000_000,
  totalSpent: 688_000_000,
  totalWIP: 412_000_000,
  totalAR: 189_000_000,
  totalAP: 142_000_000,
  customerAdvances: 105_000_000,
  totalCash: 78_000_000,
  revenueYTD: 888_000_000,
  recognizedRevenue: 888_000_000,
  profitYTD: 196_000_000,
  forecastProfit: 578_000_000,
  totalUnits: 156,
  soldUnits: 70,
  bookedUnits: 23,
  availableUnits: 47,
  landownerUnits: 16,
  collectionEfficiency: 87,
  salesVelocity: 4.2,
  unsoldInventoryValue: 482_000_000,
};

const alerts = [
  { type: "CRITICAL", project: "ABC Heights", message: "Forecast cost exceeds budget by 7.4% — BDT 13m overrun expected", time: "2h ago" },
  { type: "CRITICAL", project: "ABC Heights", message: "Tower B structural work 31 days behind schedule", time: "4h ago" },
  { type: "WARNING", project: "ABC Heights", message: "Steel price increased 8.2% this quarter — portfolio exposure BDT 9.6m", time: "1d ago" },
  { type: "WARNING", project: "Bay View", message: "3 buyer installments overdue > 60 days — BDT 4.2m at risk", time: "1d ago" },
  { type: "WARNING", project: "Green Valley", message: "Land mutation still pending — 45 days since application", time: "2d ago" },
  { type: "INFO", project: "ABC Heights", message: "12,500 excess tiles at ABC Heights — transfer to Bay View possible", time: "3d ago" },
  { type: "INFO", project: "Portfolio", message: "Cement supplier offering 4.1% discount on bulk order (3 projects)", time: "3d ago" },
];

const alertStyles: Record<string, { icon: typeof AlertTriangle; bg: string; border: string; text: string }> = {
  CRITICAL: { icon: AlertTriangle, bg: "bg-red-50", border: "border-red-200", text: "text-red-800" },
  WARNING: { icon: AlertCircle, bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-800" },
  INFO: { icon: Info, bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-800" },
};

const stageColors: Record<string, string> = {
  CONSTRUCTION: "bg-blue-100 text-blue-800",
  SALES_COLLECTION: "bg-emerald-100 text-emerald-800",
  BOQ_ESTIMATION: "bg-purple-100 text-purple-800",
};

const profitErosion = [
  { factor: "Original Feasibility Profit", amount: 578_000_000, type: "base" },
  { factor: "Material inflation (steel, cement)", amount: -32_000_000, type: "negative" },
  { factor: "Design variations (client requests)", amount: -18_000_000, type: "negative" },
  { factor: "Schedule delay — finance cost", amount: -14_000_000, type: "negative" },
  { factor: "Quantity overruns", amount: -9_000_000, type: "negative" },
  { factor: "Selling price increase", amount: 22_000_000, type: "positive" },
  { factor: "Procurement savings", amount: 8_000_000, type: "positive" },
  { factor: "Current Forecast Profit", amount: 535_000_000, type: "result" },
];

const portfolioRisks = [
  { risk: "Cost Overrun", projects: 1, exposure: "BDT 13m", severity: "HIGH" },
  { risk: "Schedule Delay", projects: 1, exposure: "31 days", severity: "HIGH" },
  { risk: "Collection Risk", projects: 2, exposure: "BDT 4.2m overdue", severity: "MEDIUM" },
  { risk: "Material Inflation", projects: 3, exposure: "BDT 9.6m exposure", severity: "MEDIUM" },
  { risk: "Regulatory Delay", projects: 1, exposure: "Mutation pending", severity: "LOW" },
  { risk: "Sales Slowdown", projects: 0, exposure: "—", severity: "LOW" },
];

export default function CEODashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">CEO Dashboard</h1>
          <p className="text-gray-500">ABC Properties Ltd. — Portfolio Overview</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Activity className="h-4 w-4" />
          <span>Live — As of 12 Aug 2026, 2:30 PM</span>
        </div>
      </div>

      {/* Row 1 — Top-Level KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {[
          { label: "Portfolio GDV", value: formatBDT(portfolio.totalGDV), icon: Building2, color: "text-gray-900", bg: "bg-white" },
          { label: "Total Investment", value: formatBDT(portfolio.totalInvestment), icon: DollarSign, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Revenue (Recognized)", value: formatBDT(portfolio.recognizedRevenue), icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Forecast Profit", value: formatBDT(portfolio.forecastProfit), icon: PieChart, color: "text-emerald-700", bg: "bg-emerald-50" },
          { label: "Cash Available", value: formatBDT(portfolio.totalCash), icon: Banknote, color: portfolio.totalCash > 50_000_000 ? "text-emerald-600" : "text-red-600", bg: portfolio.totalCash > 50_000_000 ? "bg-emerald-50" : "bg-red-50" },
          { label: "Active Projects", value: "3", icon: Building2, color: "text-blue-600", bg: "bg-blue-50" },
        ].map((kpi) => (
          <Card key={kpi.label} className={kpi.bg}>
            <CardContent className="pt-4 pb-3">
              <div className="flex items-center gap-2 mb-1">
                <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
                <span className="text-xs text-gray-500">{kpi.label}</span>
              </div>
              <p className={`text-xl font-bold ${kpi.color}`}>{kpi.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Row 2 — Financial Position + Sales Position */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Financial Position */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Financial Position</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "Total Spent to Date", value: portfolio.totalSpent, color: "text-gray-900" },
              { label: "Construction WIP (Balance Sheet)", value: portfolio.totalWIP, color: "text-blue-600" },
              { label: "Accounts Receivable — Buyers", value: portfolio.totalAR, color: "text-orange-600" },
              { label: "Accounts Payable — Suppliers/Contractors", value: portfolio.totalAP, color: "text-red-600" },
              { label: "Customer Advances (Liability)", value: portfolio.customerAdvances, color: "text-purple-600" },
              { label: "Unsold Inventory (at cost)", value: portfolio.unsoldInventoryValue, color: "text-gray-600" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{item.label}</span>
                <span className={`text-sm font-mono font-semibold ${item.color}`}>BDT {formatBDT(item.value)}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Sales Position */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Sales Position (All Projects)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-3xl font-bold">{portfolio.totalUnits}</p>
                <p className="text-xs text-gray-500">Total Units</p>
              </div>
              <div className="text-center p-3 bg-emerald-50 rounded-lg">
                <p className="text-3xl font-bold text-emerald-600">{portfolio.soldUnits}</p>
                <p className="text-xs text-gray-500">Sold</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center">
                <p className="text-lg font-bold text-blue-600">{portfolio.bookedUnits}</p>
                <p className="text-xs text-gray-500">Booked</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-emerald-500">{portfolio.availableUnits}</p>
                <p className="text-xs text-gray-500">Available</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-400">{portfolio.landownerUnits}</p>
                <p className="text-xs text-gray-500">Landowner</p>
              </div>
            </div>
            <Separator className="my-3" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Sales Velocity</span>
              <span className="font-semibold">{portfolio.salesVelocity} units/month</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-gray-600">Collection Efficiency</span>
              <span className="font-semibold text-emerald-600">{portfolio.collectionEfficiency}%</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-gray-600">Expected Sell-Out</span>
              <span className="font-semibold">~11 months at current velocity</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 3 — Projects at a Glance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Project Portfolio</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead className="text-right">Budget</TableHead>
                <TableHead className="text-right">Spent</TableHead>
                <TableHead className="text-right">Forecast</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-center">Sold</TableHead>
                <TableHead className="text-center">Collection</TableHead>
                <TableHead className="text-center">Completion</TableHead>
                <TableHead className="text-center">Health</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <p className="font-semibold">{p.name}</p>
                    <p className="text-xs text-gray-400">{p.location}</p>
                  </TableCell>
                  <TableCell>
                    <Badge className={stageColors[p.stage] || "bg-gray-100"} >{p.stage.replace(/_/g, " ")}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">{formatBDT(p.totalBudget)}</TableCell>
                  <TableCell className="text-right font-mono text-sm">{formatBDT(p.actualCost)}</TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    <span className={p.forecastCost > p.totalBudget ? "text-red-600 font-semibold" : ""}>
                      {formatBDT(p.forecastCost)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">{formatBDT(p.totalRevenue)}</TableCell>
                  <TableCell className="text-center text-sm">{p.soldUnits}/{p.totalUnits}</TableCell>
                  <TableCell className="text-center text-sm">
                    {p.collectionEfficiency > 0 ? `${p.collectionEfficiency}%` : "—"}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center gap-2">
                      <Progress value={p.completionPercent} className="h-2 w-16" />
                      <span className="text-xs font-medium">{p.completionPercent}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className={
                      p.healthScore >= 80 ? "bg-emerald-100 text-emerald-800" :
                      p.healthScore >= 60 ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }>
                      {p.healthScore}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Row 4 — Alerts + Profit Erosion */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              Alerts & Early Warnings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 max-h-96 overflow-y-auto">
            {alerts.map((a, i) => {
              const style = alertStyles[a.type];
              const Icon = style.icon;
              return (
                <div key={i} className={`flex items-start gap-2 p-3 border rounded-lg ${style.bg} ${style.border}`}>
                  <Icon className={`h-4 w-4 mt-0.5 ${style.text}`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <Badge className={`${style.bg} ${style.text} text-[10px]`}>{a.type}</Badge>
                      <span className="text-[10px] text-gray-400">{a.time}</span>
                    </div>
                    <p className="text-sm mt-1">{a.message}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{a.project}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Profit Erosion Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              Profit Erosion Analysis (Portfolio)
            </CardTitle>
            <p className="text-xs text-gray-500">Where is our profit going?</p>
          </CardHeader>
          <CardContent className="space-y-2">
            {profitErosion.map((item, i) => (
              <div key={i} className={`flex items-center justify-between py-1.5 ${item.type === "result" ? "border-t-2 pt-3 mt-2" : ""}`}>
                <div className="flex items-center gap-2">
                  {item.type === "negative" && <ArrowDown className="h-3 w-3 text-red-500" />}
                  {item.type === "positive" && <ArrowUp className="h-3 w-3 text-emerald-500" />}
                  {item.type === "base" && <CircleDot className="h-3 w-3 text-gray-400" />}
                  {item.type === "result" && <CheckCircle2 className="h-3 w-3 text-emerald-600" />}
                  <span className={`text-sm ${item.type === "result" ? "font-bold" : ""}`}>{item.factor}</span>
                </div>
                <span className={`font-mono text-sm font-semibold ${
                  item.type === "negative" ? "text-red-600" :
                  item.type === "positive" ? "text-emerald-600" :
                  item.type === "result" ? "text-emerald-700 text-base" :
                  "text-gray-900"
                }`}>
                  {item.type === "negative" ? "-" : item.type === "positive" ? "+" : ""}
                  BDT {formatBDT(Math.abs(item.amount))}
                </span>
              </div>
            ))}
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">
                <span className="font-semibold">BDT {formatBDT(43_000_000)} profit erosion</span> across portfolio.
                Primary drivers: material inflation (BDT 32m) and design changes (BDT 18m),
                partially offset by selling price increase (+BDT 22m) and procurement savings (+BDT 8m).
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 5 — Portfolio Risk + Key Decisions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Portfolio Risk */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Portfolio Risk Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Risk</TableHead>
                  <TableHead className="text-center">Projects</TableHead>
                  <TableHead>Exposure</TableHead>
                  <TableHead>Severity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {portfolioRisks.map((r) => (
                  <TableRow key={r.risk}>
                    <TableCell className="font-medium">{r.risk}</TableCell>
                    <TableCell className="text-center">{r.projects}</TableCell>
                    <TableCell className="text-sm">{r.exposure}</TableCell>
                    <TableCell>
                      <Badge className={
                        r.severity === "HIGH" ? "bg-red-100 text-red-800" :
                        r.severity === "MEDIUM" ? "bg-yellow-100 text-yellow-800" :
                        "bg-gray-100 text-gray-600"
                      }>{r.severity}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pending Management Decisions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Pending Management Decisions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { priority: "HIGH", decision: "Approve VO-004 (Steel rate revision) — BDT 12.4m budget impact", project: "ABC Heights", daysOpen: 5 },
              { priority: "HIGH", decision: "Green Valley — Approve feasibility & proceed with land acquisition", project: "Green Valley", daysOpen: 12 },
              { priority: "MEDIUM", decision: "Review Bay View handover schedule — 8 units pending", project: "Bay View", daysOpen: 3 },
              { priority: "MEDIUM", decision: "Cross-project tile transfer — 12,500 tiles from ABC to Bay View", project: "Portfolio", daysOpen: 7 },
              { priority: "LOW", decision: "Bulk cement procurement — consolidate across 3 projects for 4.1% discount", project: "Portfolio", daysOpen: 3 },
            ].map((d, i) => (
              <div key={i} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50">
                <Badge className={
                  d.priority === "HIGH" ? "bg-red-100 text-red-800" :
                  d.priority === "MEDIUM" ? "bg-yellow-100 text-yellow-800" :
                  "bg-gray-100 text-gray-600"
                }>{d.priority}</Badge>
                <div className="flex-1">
                  <p className="text-sm font-medium">{d.decision}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-gray-400">{d.project}</span>
                    <span className="text-[10px] text-gray-400">•</span>
                    <span className={`text-[10px] ${d.daysOpen > 7 ? "text-red-500" : "text-gray-400"}`}>
                      Open {d.daysOpen} days
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Footer Note */}
      <div className="text-center text-xs text-gray-400 py-4">
        <p>AbcERP Real Estate — CEO Dashboard</p>
        <p>Every number traces back to a posted journal entry. Click any figure to drill down.</p>
      </div>
    </div>
  );
}
