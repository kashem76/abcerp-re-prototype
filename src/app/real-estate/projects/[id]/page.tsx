"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { projectDetail, formatBDT, formatNumber } from "@/lib/mock-data";
import { AlertTriangle, AlertCircle, Info, Building2, CheckCircle2 } from "lucide-react";

const pd = projectDetail;

const alertIcons: Record<string, React.ReactNode> = {
  CRITICAL: <AlertTriangle className="h-4 w-4 text-red-500" />,
  WARNING: <AlertCircle className="h-4 w-4 text-yellow-500" />,
  INFO: <Info className="h-4 w-4 text-blue-500" />,
};

const alertColors: Record<string, string> = {
  CRITICAL: "bg-red-50 border-red-200",
  WARNING: "bg-yellow-50 border-yellow-200",
  INFO: "bg-blue-50 border-blue-200",
};

const statusColors: Record<string, string> = {
  COMPLETED: "bg-emerald-100 text-emerald-800",
  IN_PROGRESS: "bg-blue-100 text-blue-800",
  NOT_STARTED: "bg-gray-100 text-gray-600",
};

export default function ProjectDetailPage() {
  const totalBudget = pd.phases.reduce((s, p) => s + p.budget, 0);
  const totalActual = pd.phases.reduce((s, p) => s + p.actual, 0);
  const overallProgress = Math.round(pd.phases.reduce((s, p) => s + p.progress * (p.budget / totalBudget), 0));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Building2 className="h-6 w-6 text-gray-400" />
            <h1 className="text-2xl font-bold">{pd.name}</h1>
            <Badge className="bg-blue-100 text-blue-800">{pd.stage}</Badge>
            <Badge className={
              76 >= 80 ? "bg-emerald-100 text-emerald-800" :
              76 >= 60 ? "bg-yellow-100 text-yellow-800" :
              "bg-red-100 text-red-800"
            }>
              Health: 76
            </Badge>
          </div>
          <p className="text-gray-500 ml-9">{pd.location} — {pd.id}</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        {[
          { label: "Budget", value: formatBDT(700_000_000), color: "text-gray-900" },
          { label: "Spent", value: formatBDT(totalActual), color: "text-blue-600" },
          { label: "Committed", value: formatBDT(145_000_000), color: "text-purple-600" },
          { label: "Forecast", value: formatBDT(455_000_000), color: "text-orange-600" },
          { label: "Revenue", value: formatBDT(950_000_000), color: "text-emerald-600" },
          { label: "Collection", value: "87%", color: "text-emerald-600" },
        ].map((k) => (
          <Card key={k.label}>
            <CardContent className="pt-4 pb-3 text-center">
              <p className={`text-lg font-bold ${k.color}`}>{k.value}</p>
              <p className="text-xs text-gray-500">{k.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Phase Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Phase Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Phase</TableHead>
                <TableHead className="text-right">Budget (BDT)</TableHead>
                <TableHead className="text-right">Actual (BDT)</TableHead>
                <TableHead className="w-48">Progress</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pd.phases.map((p) => (
                <TableRow key={p.name}>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell className="text-right font-mono text-sm">{formatNumber(p.budget)}</TableCell>
                  <TableCell className="text-right font-mono text-sm">{formatNumber(p.actual)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={p.progress} className="h-2 flex-1" />
                      <span className="text-sm font-medium w-10 text-right">{p.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[p.status] || "bg-gray-100"}>{p.status.replace(/_/g, " ")}</Badge>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="font-bold border-t-2">
                <TableCell>TOTAL</TableCell>
                <TableCell className="text-right font-mono">{formatNumber(totalBudget)}</TableCell>
                <TableCell className="text-right font-mono">{formatNumber(totalActual)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={overallProgress} className="h-2 flex-1" />
                    <span className="text-sm font-medium w-10 text-right">{overallProgress}%</span>
                  </div>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Alerts & Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {pd.alerts.map((a, i) => (
            <div key={i} className={`flex items-start gap-3 p-3 border rounded-lg ${alertColors[a.type]}`}>
              {alertIcons[a.type]}
              <div>
                <Badge className={
                  a.type === "CRITICAL" ? "bg-red-200 text-red-800" :
                  a.type === "WARNING" ? "bg-yellow-200 text-yellow-800" :
                  "bg-blue-200 text-blue-800"
                }>{a.type}</Badge>
                <p className="text-sm mt-1">{a.message}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
