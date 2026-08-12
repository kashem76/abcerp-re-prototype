"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { projects, formatBDT } from "@/lib/mock-data";
import { Building2, MapPin } from "lucide-react";
import Link from "next/link";

const stageColors: Record<string, string> = {
  CONSTRUCTION: "bg-blue-100 text-blue-800",
  SALES_COLLECTION: "bg-emerald-100 text-emerald-800",
  BOQ_ESTIMATION: "bg-purple-100 text-purple-800",
  PLANNING_BUDGETING: "bg-yellow-100 text-yellow-800",
  FEASIBILITY_STUDY: "bg-orange-100 text-orange-800",
};

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Projects</h1>
        <p className="text-gray-500">All real estate development projects</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p) => (
          <Link key={p.id} href={`/real-estate/projects/${p.id}`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge className={stageColors[p.stage] || "bg-gray-100"}>{p.stage.replace(/_/g, " ")}</Badge>
                  <span className="text-xs text-gray-400">{p.id}</span>
                </div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-gray-400" />
                  {p.name}
                </CardTitle>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {p.location}
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <div>
                    <p className="text-gray-500">Budget</p>
                    <p className="font-semibold">BDT {formatBDT(p.totalBudget)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Revenue</p>
                    <p className="font-semibold">BDT {formatBDT(p.totalRevenue)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Sold</p>
                    <p className="font-semibold">{p.soldUnits} / {p.totalUnits} units</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Completion</p>
                    <p className="font-semibold">{p.completionPercent}%</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-gray-400">PM: {p.manager}</span>
                  <Badge className={
                    p.healthScore >= 80 ? "bg-emerald-100 text-emerald-800" :
                    p.healthScore >= 60 ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  }>
                    Health: {p.healthScore}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
