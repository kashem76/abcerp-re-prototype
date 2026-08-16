"use client";

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
import {
  BarChart3,
  TrendingUp,
  Home,
  Users,
  Banknote,
  XCircle,
  ArrowUpRight,
  Calendar,
  Award,
  DollarSign,
} from "lucide-react";

const kpis = [
  {
    label: "Units Sold This Month",
    value: "5",
    change: "+2 vs last month",
    icon: Home,
    color: "blue",
  },
  {
    label: "Bookings This Month",
    value: "3",
    change: "BDT 2.8Cr token",
    icon: Users,
    color: "emerald",
  },
  {
    label: "Collection This Month",
    value: formatBDT(42_500_000),
    change: "87% of target",
    icon: Banknote,
    color: "purple",
  },
  {
    label: "Cancellations",
    value: "1",
    change: "Refund BDT 3L",
    icon: XCircle,
    color: "red",
  },
  {
    label: "Avg Price/SFT",
    value: formatBDT(8_500),
    change: "+3.6% YoY",
    icon: TrendingUp,
    color: "amber",
  },
];

const salesPipeline = [
  {
    project: "ABC Nasirabad Heights",
    totalUnits: 48,
    available: 4,
    reserved: 2,
    booked: 6,
    sold: 30,
    landowner: 6,
  },
  {
    project: "Bay View Residence",
    totalUnits: 36,
    available: 3,
    reserved: 0,
    booked: 3,
    sold: 30,
    landowner: 0,
  },
  {
    project: "Halishahar Commercial",
    totalUnits: 24,
    available: 12,
    reserved: 4,
    booked: 5,
    sold: 3,
    landowner: 0,
  },
];

const salesVelocity = [
  { month: "Mar 2026", units: 3 },
  { month: "Apr 2026", units: 5 },
  { month: "May 2026", units: 4 },
  { month: "Jun 2026", units: 7 },
  { month: "Jul 2026", units: 6 },
  { month: "Aug 2026", units: 5 },
];

const topPerformers = [
  {
    name: "Mr. Zahir Uddin",
    unitsBooked: 8,
    revenueGenerated: 68_000_000,
    conversionRate: "42%",
  },
  {
    name: "Ms. Fatima Begum",
    unitsBooked: 6,
    revenueGenerated: 51_200_000,
    conversionRate: "38%",
  },
  {
    name: "Mr. Arif Hossain",
    unitsBooked: 5,
    revenueGenerated: 42_500_000,
    conversionRate: "35%",
  },
  {
    name: "Mr. Nasir Ahmed",
    unitsBooked: 4,
    revenueGenerated: 34_000_000,
    conversionRate: "31%",
  },
];

const upcomingDemands = [
  {
    customer: "Mr. Karim Uddin",
    unit: "A-501",
    project: "ABC Nasirabad Heights",
    dueDate: "2026-08-15",
    amount: 2_500_000,
    installment: "4th of 12",
  },
  {
    customer: "Mrs. Nasreen Akter",
    unit: "A-702",
    project: "ABC Nasirabad Heights",
    dueDate: "2026-08-20",
    amount: 3_200_000,
    installment: "3rd of 12",
  },
  {
    customer: "Mr. Shafiq Rahman",
    unit: "B-204",
    project: "Bay View Residence",
    dueDate: "2026-08-25",
    amount: 1_800_000,
    installment: "6th of 10",
  },
  {
    customer: "Mr. Jahangir Alam",
    unit: "C-103",
    project: "Halishahar Commercial",
    dueDate: "2026-09-01",
    amount: 5_000_000,
    installment: "2nd of 8",
  },
  {
    customer: "Mrs. Rehana Begum",
    unit: "A-303",
    project: "ABC Nasirabad Heights",
    dueDate: "2026-09-05",
    amount: 2_800_000,
    installment: "5th of 12",
  },
];

const priceTrend = [
  {
    project: "ABC Nasirabad Heights",
    q1: 7_800,
    q2: 8_200,
    q3: 8_500,
    q4: null,
    changeYTD: "+9.0%",
  },
  {
    project: "Bay View Residence",
    q1: 8_000,
    q2: 8_300,
    q3: 8_600,
    q4: null,
    changeYTD: "+7.5%",
  },
  {
    project: "Halishahar Commercial",
    q1: 9_500,
    q2: 9_800,
    q3: 10_200,
    q4: null,
    changeYTD: "+7.4%",
  },
];

const maxVelocity = Math.max(...salesVelocity.map((s) => s.units));

export default function SalesDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-gray-400" />
          Sales Head Dashboard
        </h1>
        <p className="text-gray-500">
          ABC Properties Ltd — All Projects | August 2026
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="pt-4 pb-3 px-4">
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`h-9 w-9 rounded-lg flex items-center justify-center ${
                    kpi.color === "blue"
                      ? "bg-blue-50"
                      : kpi.color === "emerald"
                      ? "bg-emerald-50"
                      : kpi.color === "purple"
                      ? "bg-purple-50"
                      : kpi.color === "red"
                      ? "bg-red-50"
                      : "bg-amber-50"
                  }`}
                >
                  <kpi.icon
                    className={`h-5 w-5 ${
                      kpi.color === "blue"
                        ? "text-blue-600"
                        : kpi.color === "emerald"
                        ? "text-emerald-600"
                        : kpi.color === "purple"
                        ? "text-purple-600"
                        : kpi.color === "red"
                        ? "text-red-600"
                        : "text-amber-600"
                    }`}
                  />
                </div>
              </div>
              <p className="text-lg font-bold">{kpi.value}</p>
              <p className="text-xs text-gray-500">{kpi.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{kpi.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sales Pipeline by Project */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Sales Pipeline by Project</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">Available</TableHead>
                <TableHead className="text-right">Reserved</TableHead>
                <TableHead className="text-right">Booked</TableHead>
                <TableHead className="text-right">Sold</TableHead>
                <TableHead className="text-right">Landowner</TableHead>
                <TableHead className="text-right">Sold %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesPipeline.map((p) => {
                const soldPct = Math.round(
                  (p.sold / p.totalUnits) * 100
                );
                return (
                  <TableRow key={p.project}>
                    <TableCell className="text-sm font-medium">
                      {p.project}
                    </TableCell>
                    <TableCell className="text-right text-sm">
                      {p.totalUnits}
                    </TableCell>
                    <TableCell className="text-right text-sm">
                      <Badge className="bg-blue-100 text-blue-800">
                        {p.available}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-sm">
                      <Badge className="bg-amber-100 text-amber-800">
                        {p.reserved}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-sm">
                      <Badge className="bg-purple-100 text-purple-800">
                        {p.booked}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-sm">
                      <Badge className="bg-emerald-100 text-emerald-800">
                        {p.sold}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-sm">
                      {p.landowner > 0 ? (
                        <Badge variant="outline">{p.landowner}</Badge>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right text-sm font-semibold">
                      {soldPct}%
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Sales Velocity Chart (div-based bar chart) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Sales Velocity — Units Sold (Last 6 Months)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between gap-4 h-48 px-4">
            {salesVelocity.map((s) => {
              const heightPct = (s.units / maxVelocity) * 100;
              return (
                <div
                  key={s.month}
                  className="flex flex-col items-center flex-1 gap-1"
                >
                  <span className="text-sm font-bold text-blue-700">
                    {s.units}
                  </span>
                  <div
                    className="w-full bg-blue-500 rounded-t-md transition-all"
                    style={{ height: `${heightPct}%` }}
                  />
                  <span className="text-xs text-gray-500 mt-1">
                    {s.month.split(" ")[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Top Sales Performers */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Award className="h-4 w-4" />
            Top Sales Performers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Agent Name</TableHead>
                <TableHead className="text-right">Units Booked</TableHead>
                <TableHead className="text-right">Revenue Generated</TableHead>
                <TableHead className="text-right">Conversion Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topPerformers.map((p, idx) => (
                <TableRow key={p.name}>
                  <TableCell>
                    <div
                      className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        idx === 0
                          ? "bg-amber-100 text-amber-800"
                          : idx === 1
                          ? "bg-gray-100 text-gray-700"
                          : idx === 2
                          ? "bg-orange-100 text-orange-700"
                          : "bg-gray-50 text-gray-500"
                      }`}
                    >
                      #{idx + 1}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm font-medium">
                    {p.name}
                  </TableCell>
                  <TableCell className="text-right text-sm font-semibold">
                    {p.unitsBooked}
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    {formatBDT(p.revenueGenerated)}
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    {p.conversionRate}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Upcoming Payment Demands */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Upcoming Payment Demands — Next 30 Days
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Installment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {upcomingDemands.map((d, idx) => (
                <TableRow key={idx}>
                  <TableCell className="text-sm font-medium">
                    {d.customer}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {d.unit}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{d.project}</TableCell>
                  <TableCell className="text-sm">{d.dueDate}</TableCell>
                  <TableCell className="text-right text-sm font-medium">
                    {formatBDT(d.amount)}
                  </TableCell>
                  <TableCell className="text-xs text-gray-500">
                    {d.installment}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Price Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Avg Selling Price/SFT by Project & Quarter (2026)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead className="text-right">Q1</TableHead>
                <TableHead className="text-right">Q2</TableHead>
                <TableHead className="text-right">Q3</TableHead>
                <TableHead className="text-right">Q4</TableHead>
                <TableHead className="text-right">Change YTD</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {priceTrend.map((p) => (
                <TableRow key={p.project}>
                  <TableCell className="text-sm font-medium">
                    {p.project}
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    {p.q1 ? formatBDT(p.q1) : "-"}
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    {p.q2 ? formatBDT(p.q2) : "-"}
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    {p.q3 ? formatBDT(p.q3) : "-"}
                  </TableCell>
                  <TableCell className="text-right text-sm text-gray-400">
                    {p.q4 ? formatBDT(p.q4) : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1 text-emerald-600 text-sm font-medium">
                      <ArrowUpRight className="h-4 w-4" />
                      {p.changeYTD}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
