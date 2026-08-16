"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  FileBarChart, DollarSign, TrendingUp, Wallet,
  BarChart3, Users, Hammer, Building2,
} from "lucide-react";

const reportGroups = [
  {
    title: "Financial",
    icon: DollarSign,
    color: "bg-blue-50 text-blue-600",
    reports: [
      { href: "/real-estate/reports/project-pl",       label: "Project P&L",            desc: "Revenue, COGS, gross profit, net profit" },
      { href: "/real-estate/reports/project-bs",       label: "Project Balance Sheet",   desc: "WIP, AR, AP, retention, advances" },
      { href: "/real-estate/reports/project-cashflow", label: "Project Cash Flow",       desc: "Operating, investing, financing flows" },
      { href: "/real-estate/reports/cash-forecast",    label: "Cash Flow Forecast",      desc: "12-month projection with funding gap" },
    ],
  },
  {
    title: "Cost Control",
    icon: Wallet,
    color: "bg-orange-50 text-orange-600",
    reports: [
      { href: "/real-estate/reports/boq-variance",     label: "BOQ Variance",            desc: "Planned vs actual qty, rate, amount" },
      { href: "/real-estate/reports/commitment",       label: "Commitment",              desc: "Budget − Actual − Committed = Available" },
      { href: "/real-estate/reports/eac",              label: "Estimate at Completion",  desc: "Actual + Committed + ETC, CPI/SPI" },
      { href: "/real-estate/reports/profit-erosion",   label: "Profit Erosion",          desc: "Factor-by-factor waterfall analysis" },
      { href: "/real-estate/reports/cost-intelligence",label: "Cost Intelligence",       desc: "Item rates: standard, PO, market, actual" },
    ],
  },
  {
    title: "Revenue & Sales",
    icon: TrendingUp,
    color: "bg-emerald-50 text-emerald-600",
    reports: [
      { href: "/real-estate/reports/ar-aging",         label: "AR Aging",                desc: "30/60/90/>90 day buckets by customer" },
      { href: "/real-estate/reports/sales-status",     label: "Sales & Booking Status",  desc: "Available, booked, sold, landowner units" },
      { href: "/real-estate/reports/collection",       label: "Collection Efficiency",   desc: "Demanded vs collected by project" },
      { href: "/real-estate/reports/revenue-recognition",label: "Revenue Recognition",   desc: "POC vs CC method, recognized vs deferred" },
      { href: "/real-estate/reports/unit-profitability",label: "Unit Profitability",     desc: "Sale price − allocated cost per unit" },
    ],
  },
  {
    title: "Operations",
    icon: Hammer,
    color: "bg-purple-50 text-purple-600",
    reports: [
      { href: "/real-estate/reports/wip-movement",    label: "WIP Movement",            desc: "Opening + additions − transfers = closing" },
      { href: "/real-estate/reports/contractor-performance", label: "Contractor Performance", desc: "Cost, schedule, quality scores" },
      { href: "/real-estate/reports/material-consumption",   label: "Material Consumption",   desc: "BOQ vs purchased vs consumed vs wasted" },
      { href: "/real-estate/reports/dsr-summary",      label: "DSR Summary",             desc: "Manpower by trade, equipment utilization" },
    ],
  },
  {
    title: "Corporate & Portfolio",
    icon: Building2,
    color: "bg-slate-50 text-slate-600",
    reports: [
      { href: "/real-estate/reports/overhead-allocation",    label: "Overhead Allocation",     desc: "Driver, source account, per-project split" },
      { href: "/real-estate/reports/feasibility-vs-actual",  label: "Feasibility vs Actual",   desc: "Line-by-line feasibility comparison" },
      { href: "/real-estate/reports/portfolio-risk",         label: "Portfolio Risk",           desc: "Risk matrix, heat map, mitigation status" },
      { href: "/real-estate/reports/landowner-statement",    label: "Landowner Statement",     desc: "Entitlement, allocation, payments, progress" },
    ],
  },
];

export default function ReportsHubPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FileBarChart className="h-6 w-6 text-gray-400" />
          Reports
        </h1>
        <p className="text-gray-500 mt-1">
          {reportGroups.reduce((sum, g) => sum + g.reports.length, 0)} reports across {reportGroups.length} categories
        </p>
      </div>

      {reportGroups.map((group) => {
        const GroupIcon = group.icon;
        return (
          <div key={group.title}>
            <div className="flex items-center gap-2 mb-3">
              <div className={`h-7 w-7 rounded-md flex items-center justify-center ${group.color}`}>
                <GroupIcon className="h-4 w-4" />
              </div>
              <h2 className="text-base font-semibold text-gray-800">{group.title}</h2>
              <span className="text-xs text-gray-400 ml-1">{group.reports.length} reports</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {group.reports.map((report) => (
                <Link key={report.href} href={report.href}>
                  <Card className="hover:shadow-md hover:border-blue-200 transition-all cursor-pointer h-full">
                    <CardContent className="pt-4 pb-4 px-4">
                      <p className="text-sm font-medium text-gray-900">{report.label}</p>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{report.desc}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
