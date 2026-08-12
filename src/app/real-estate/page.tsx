"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { projects, formatBDT } from "@/lib/mock-data";
import { Building2, DollarSign, TrendingUp, Wallet, BarChart3 } from "lucide-react";
import Link from "next/link";

const stageColors: Record<string, string> = {
  CONSTRUCTION: "bg-blue-100 text-blue-800",
  SALES_COLLECTION: "bg-emerald-100 text-emerald-800",
  BOQ_ESTIMATION: "bg-purple-100 text-purple-800",
};

export default function DashboardPage() {
  const totalBudget = projects.reduce((s, p) => s + p.totalBudget, 0);
  const totalRevenue = projects.reduce((s, p) => s + p.totalRevenue, 0);
  const totalWIP = projects.reduce((s, p) => s + (p.actualCost - (p.recognizedRevenue * (p.actualCost / p.totalRevenue))), 0);
  const avgCollection = Math.round(projects.filter(p => p.collectionEfficiency > 0).reduce((s, p) => s + p.collectionEfficiency, 0) / projects.filter(p => p.collectionEfficiency > 0).length);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Building2 className="h-6 w-6 text-gray-400" />
          Real Estate Portfolio
        </h1>
        <p className="text-gray-500">{projects.length} Active Projects</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">BDT {formatBDT(totalBudget)}</p>
                <p className="text-sm text-gray-500">Total Investment</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">BDT {formatBDT(totalRevenue)}</p>
                <p className="text-sm text-gray-500">Total Expected Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <Wallet className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">BDT {formatBDT(688_000_000)}</p>
                <p className="text-sm text-gray-500">Total Actual Spend</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{avgCollection}%</p>
                <p className="text-sm text-gray-500">Avg Collection Efficiency</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">All Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead className="text-right">Budget</TableHead>
                <TableHead className="text-right">Spent</TableHead>
                <TableHead className="text-right">Forecast</TableHead>
                <TableHead className="text-center">Sold</TableHead>
                <TableHead className="text-center">Completion</TableHead>
                <TableHead className="text-center">Health</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((p) => (
                <TableRow key={p.id} className="cursor-pointer hover:bg-gray-50">
                  <TableCell>
                    <Link href={`/real-estate/projects/${p.id}`} className="hover:underline">
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-xs text-gray-400">{p.id}</p>
                    </Link>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">{p.location}</TableCell>
                  <TableCell>
                    <Badge className={stageColors[p.stage] || "bg-gray-100"}>
                      {p.stage.replace(/_/g, " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">{formatBDT(p.totalBudget)}</TableCell>
                  <TableCell className="text-right font-mono text-sm">{formatBDT(p.actualCost)}</TableCell>
                  <TableCell className="text-right font-mono text-sm">{formatBDT(p.forecastCost)}</TableCell>
                  <TableCell className="text-center text-sm">{p.soldUnits}/{p.totalUnits}</TableCell>
                  <TableCell className="text-center text-sm font-semibold">{p.completionPercent}%</TableCell>
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
    </div>
  );
}
