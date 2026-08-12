"use client";

import Link from "next/link";
import {
  ArrowLeft,
  TrendingUp,
  DollarSign,
  BarChart3,
  Receipt,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { opportunity, formatBDT, formatNumber } from "@/lib/mock-data";

const typeColor: Record<string, string> = {
  SURVEY: "bg-blue-100 text-blue-700 border-blue-300",
  LEGAL: "bg-purple-100 text-purple-700 border-purple-300",
  AUTHORITY_FEE: "bg-orange-100 text-orange-700 border-orange-300",
  CONSULTANCY: "bg-cyan-100 text-cyan-700 border-cyan-300",
  TRAVEL: "bg-gray-100 text-gray-700 border-gray-300",
};

export default function OpportunityPage() {
  const opp = opportunity;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/real-estate/land-leads"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-3"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Land Pipeline
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">{opp.code}</h1>
              <Badge
                variant="outline"
                className="bg-emerald-100 text-emerald-700 border-emerald-300"
              >
                {opp.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{opp.title}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">View Feasibility</Button>
            <Link href="/real-estate/opportunity/convert">
              <Button>Convert to Project</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4 pb-4 px-4">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="h-4 w-4 text-amber-500" />
              <p className="text-xs font-medium text-muted-foreground">
                Est. Land Cost
              </p>
            </div>
            <p className="text-xl font-bold">
              {formatBDT(opp.estimatedLandCost)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 px-4">
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 className="h-4 w-4 text-blue-500" />
              <p className="text-xs font-medium text-muted-foreground">
                Est. Project Cost
              </p>
            </div>
            <p className="text-xl font-bold">
              {formatBDT(opp.estimatedProjectCost)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 px-4">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              <p className="text-xs font-medium text-muted-foreground">
                Est. Revenue
              </p>
            </div>
            <p className="text-xl font-bold">
              {formatBDT(opp.estimatedRevenue)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 px-4">
            <div className="flex items-center gap-2 mb-1">
              <Receipt className="h-4 w-4 text-red-500" />
              <p className="text-xs font-medium text-muted-foreground">
                Pre-Dev Expenses
              </p>
            </div>
            <p className="text-xl font-bold">
              {formatBDT(opp.totalExpenses)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Expenses Table */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">
              Pre-Development Expenses
            </CardTitle>
            <Badge variant="secondary" className="text-xs">
              Cost Center: {opp.costCenter}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount (BDT)</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {opp.expenses.map((exp, i) => (
                <TableRow key={i}>
                  <TableCell className="text-sm">{exp.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`text-xs ${typeColor[exp.type] ?? ""}`}
                    >
                      {exp.type.replace(/_/g, " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{exp.description}</TableCell>
                  <TableCell className="text-sm text-right font-medium">
                    {formatNumber(exp.amount)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="text-xs bg-emerald-100 text-emerald-700 border-emerald-300"
                    >
                      {exp.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Separator className="my-3" />
          <div className="flex justify-end">
            <div className="text-sm">
              <span className="text-muted-foreground">Total Expenses: </span>
              <span className="font-bold text-base">
                BDT {formatNumber(opp.totalExpenses)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Note */}
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm text-amber-800">
          <strong>Note:</strong> Pre-development expenses are real GL postings
          even before a project exists. These costs are tracked under Cost Center{" "}
          <strong>{opp.costCenter}</strong> and can be capitalized or reclassified
          when the opportunity converts to a project.
        </p>
      </div>
    </div>
  );
}
