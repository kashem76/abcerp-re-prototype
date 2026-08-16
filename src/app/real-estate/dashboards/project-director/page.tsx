"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  LayoutDashboard,
  TrendingUp,
  TrendingDown,
  Users,
  Wrench,
  Layers,
  AlertCircle,
  HardHat,
  ShieldCheck,
  Activity,
  Clock,
  ArrowRight,
  Star,
  Flag,
} from "lucide-react";

const healthKPIs = [
  {
    label: "Budget Variance",
    value: "-2.4%",
    trend: "good",
    detail: "Under budget",
    icon: TrendingDown,
  },
  {
    label: "Schedule Variance",
    value: "-5.2%",
    trend: "warning",
    detail: "Slightly behind",
    icon: Clock,
  },
  {
    label: "Quality Score",
    value: "92%",
    trend: "good",
    detail: "Above target (85%)",
    icon: Star,
  },
  {
    label: "Safety Score",
    value: "97%",
    trend: "good",
    detail: "0 incidents this month",
    icon: ShieldCheck,
  },
  {
    label: "SPI",
    value: "0.95",
    trend: "warning",
    detail: "Schedule Performance",
    icon: Activity,
  },
  {
    label: "CPI",
    value: "1.02",
    trend: "good",
    detail: "Cost Performance",
    icon: TrendingUp,
  },
];

const todaySnapshot = [
  { label: "Manpower on Site", value: "120", icon: Users },
  { label: "Equipment Utilization", value: "85%", icon: Wrench },
  { label: "Active Work Fronts", value: "4", icon: Layers },
  { label: "Open Issues", value: "3", icon: AlertCircle },
];

const weeklyProgress = [
  {
    activity: "3rd Floor Column Casting",
    wbs: "2.4",
    planned: 100,
    actual: 95,
  },
  {
    activity: "3rd Floor Slab Rebar Binding",
    wbs: "2.4",
    planned: 80,
    actual: 65,
  },
  {
    activity: "2nd Floor Brick Masonry",
    wbs: "3.2",
    planned: 60,
    actual: 58,
  },
  {
    activity: "GF Electrical Conduit",
    wbs: "4.1",
    planned: 45,
    actual: 48,
  },
  {
    activity: "1st Floor Plastering",
    wbs: "3.1",
    planned: 90,
    actual: 82,
  },
  {
    activity: "Lift Shaft Construction",
    wbs: "2.5",
    planned: 70,
    actual: 70,
  },
];

const contractors = [
  {
    name: "Rahman Steel Works",
    contractValue: 45_000_000,
    billedToDate: 28_500_000,
    scheduleAdherence: 94,
    qualityRating: 4.2,
  },
  {
    name: "Chattogram Builders",
    contractValue: 82_000_000,
    billedToDate: 51_200_000,
    scheduleAdherence: 88,
    qualityRating: 3.8,
  },
  {
    name: "Eastern Plumbing Co.",
    contractValue: 18_500_000,
    billedToDate: 7_400_000,
    scheduleAdherence: 96,
    qualityRating: 4.5,
  },
  {
    name: "Skyline Electrical",
    contractValue: 22_000_000,
    billedToDate: 9_900_000,
    scheduleAdherence: 91,
    qualityRating: 4.0,
  },
];

const pendingActions = [
  { type: "MR", code: "MR-RE27-004", desc: "MEP materials — 2nd Floor", days: 2 },
  { type: "MR", code: "MR-RE27-005", desc: "Finishing materials — GF", days: 1 },
  { type: "RA", code: "RA-RE27-008", desc: "Rahman Steel — July RA", days: 5 },
  { type: "RA", code: "RA-RE27-009", desc: "Chattogram Builders — July RA", days: 3 },
  { type: "Issue", code: "ISS-027", desc: "Rebar spacing deviation — 3F Col C4", days: 1 },
];

const criticalPath = [
  {
    activity: "3rd Floor Slab Casting",
    start: "2026-08-25",
    end: "2026-08-28",
    floatDays: 0,
    status: "ON_TRACK",
  },
  {
    activity: "4th Floor Column Layout",
    start: "2026-09-01",
    end: "2026-09-08",
    floatDays: 0,
    status: "ON_TRACK",
  },
  {
    activity: "Lift Machine Room Slab",
    start: "2026-11-15",
    end: "2026-11-22",
    floatDays: 2,
    status: "AT_RISK",
  },
  {
    activity: "Roof Waterproofing",
    start: "2026-12-01",
    end: "2026-12-10",
    floatDays: 0,
    status: "ON_TRACK",
  },
];

export default function ProjectDirectorDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <LayoutDashboard className="h-6 w-6 text-gray-400" />
          Project Director Dashboard
        </h1>
        <p className="text-gray-500">
          ABC Nasirabad Heights — RE-00027 | As of {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
        </p>
      </div>

      {/* Health KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {healthKPIs.map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="pt-4 pb-3 px-4">
              <div className="flex items-center justify-between mb-1">
                <kpi.icon
                  className={`h-4 w-4 ${
                    kpi.trend === "good" ? "text-emerald-500" : "text-amber-500"
                  }`}
                />
                <Badge
                  className={
                    kpi.trend === "good"
                      ? "bg-emerald-100 text-emerald-800 text-xs"
                      : "bg-amber-100 text-amber-800 text-xs"
                  }
                >
                  {kpi.trend === "good" ? "Good" : "Watch"}
                </Badge>
              </div>
              <p className="text-2xl font-bold">{kpi.value}</p>
              <p className="text-xs text-gray-500">{kpi.label}</p>
              <p className="text-xs text-gray-400">{kpi.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Today's Snapshot */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {todaySnapshot.map((s) => (
          <Card key={s.label}>
            <CardContent className="pt-4 pb-3 px-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <s.icon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xl font-bold">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Weekly Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Weekly Progress — Planned vs Actual</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Activity</TableHead>
                <TableHead>WBS</TableHead>
                <TableHead className="w-[200px]">Planned</TableHead>
                <TableHead className="w-[200px]">Actual</TableHead>
                <TableHead className="text-right">Variance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {weeklyProgress.map((w, idx) => {
                const variance = w.actual - w.planned;
                return (
                  <TableRow key={idx}>
                    <TableCell className="text-sm font-medium">
                      {w.activity}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {w.wbs}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={w.planned} className="flex-1 h-2" />
                        <span className="text-xs text-gray-500 w-8">
                          {w.planned}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={w.actual}
                          className={`flex-1 h-2 ${
                            w.actual >= w.planned
                              ? "[&>div]:bg-emerald-500"
                              : "[&>div]:bg-amber-500"
                          }`}
                        />
                        <span className="text-xs text-gray-500 w-8">
                          {w.actual}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell
                      className={`text-right text-sm font-medium ${
                        variance >= 0 ? "text-emerald-600" : "text-red-600"
                      }`}
                    >
                      {variance >= 0 ? "+" : ""}
                      {variance}%
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Contractor Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Contractor Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contractor</TableHead>
                <TableHead className="text-right">Contract Value</TableHead>
                <TableHead className="text-right">Billed to Date</TableHead>
                <TableHead className="text-right">Schedule Adherence</TableHead>
                <TableHead className="text-right">Quality Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contractors.map((c, idx) => (
                <TableRow key={idx}>
                  <TableCell className="text-sm font-medium">
                    {c.name}
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    {formatBDT(c.contractValue)}
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    {formatBDT(c.billedToDate)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      className={
                        c.scheduleAdherence >= 95
                          ? "bg-emerald-100 text-emerald-800"
                          : c.scheduleAdherence >= 90
                          ? "bg-amber-100 text-amber-800"
                          : "bg-red-100 text-red-800"
                      }
                    >
                      {c.scheduleAdherence}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    <div className="flex items-center justify-end gap-1">
                      <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                      {c.qualityRating.toFixed(1)}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pending Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Flag className="h-4 w-4" />
            Pending Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pendingActions.map((a, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-2 border-b last:border-0"
              >
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className={
                      a.type === "Issue"
                        ? "text-red-700 border-red-300"
                        : a.type === "RA"
                        ? "text-blue-700 border-blue-300"
                        : "text-gray-700"
                    }
                  >
                    {a.type}
                  </Badge>
                  <div>
                    <p className="text-sm font-medium">{a.code}</p>
                    <p className="text-xs text-gray-400">{a.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">
                    {a.days}d pending
                  </span>
                  <ArrowRight className="h-4 w-4 text-gray-300" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Critical Path */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <HardHat className="h-4 w-4" />
            Critical Path Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Activity</TableHead>
                <TableHead>Start</TableHead>
                <TableHead>End</TableHead>
                <TableHead className="text-right">Float (Days)</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {criticalPath.map((cp, idx) => (
                <TableRow key={idx}>
                  <TableCell className="text-sm font-medium">
                    {cp.activity}
                  </TableCell>
                  <TableCell className="text-sm">{cp.start}</TableCell>
                  <TableCell className="text-sm">{cp.end}</TableCell>
                  <TableCell
                    className={`text-right text-sm font-medium ${
                      cp.floatDays === 0 ? "text-red-600" : "text-amber-600"
                    }`}
                  >
                    {cp.floatDays}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        cp.status === "ON_TRACK"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }
                    >
                      {cp.status.replace("_", " ")}
                    </Badge>
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
