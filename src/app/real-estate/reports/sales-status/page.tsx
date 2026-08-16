"use client";

import Link from "next/link";
import { ArrowLeft, ShoppingCart, Building2, TrendingUp, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatBDT, formatNumber } from "@/lib/mock-data";

interface ProjectSales {
  project: string;
  id: string;
  stage: string;
  total: number;
  available: number;
  reserved: number;
  booked: number;
  underPayment: number;
  sold: number;
  landowner: number;
  totalSaleableValue: number;
  valueSold: number;
  valueBooked: number;
  valueAvailable: number;
  velocityPerMonth: number;
  expectedSellOut: string;
}

const projects: ProjectSales[] = [
  {
    project: "ABC Nasirabad Heights",
    id: "RE-00027",
    stage: "CONSTRUCTION",
    total: 48,
    available: 4,
    reserved: 2,
    booked: 6,
    underPayment: 18,
    sold: 12,
    landowner: 6,
    totalSaleableValue: 950_000_000,
    valueSold: 312_000_000,
    valueBooked: 148_500_000,
    valueAvailable: 98_000_000,
    velocityPerMonth: 2.4,
    expectedSellOut: "Mar 2027",
  },
  {
    project: "Bay View Residence",
    id: "RE-00031",
    stage: "SALES_COLLECTION",
    total: 36,
    available: 3,
    reserved: 0,
    booked: 3,
    underPayment: 14,
    sold: 16,
    landowner: 0,
    totalSaleableValue: 620_000_000,
    valueSold: 384_000_000,
    valueBooked: 72_000_000,
    valueAvailable: 68_500_000,
    velocityPerMonth: 1.8,
    expectedSellOut: "Oct 2026",
  },
  {
    project: "Green Valley Township",
    id: "RE-00035",
    stage: "PRE_LAUNCH",
    total: 120,
    available: 108,
    reserved: 8,
    booked: 4,
    underPayment: 0,
    sold: 0,
    landowner: 0,
    totalSaleableValue: 1_800_000_000,
    valueSold: 0,
    valueBooked: 62_000_000,
    valueAvailable: 1_620_000_000,
    velocityPerMonth: 0.8,
    expectedSellOut: "Dec 2030",
  },
];

const totalUnits = projects.reduce((s, p) => s + p.total, 0);
const totalSold = projects.reduce((s, p) => s + p.sold, 0);
const totalBooked = projects.reduce((s, p) => s + p.booked, 0);
const totalValue = projects.reduce((s, p) => s + p.totalSaleableValue, 0);
const totalValueSold = projects.reduce((s, p) => s + p.valueSold, 0);

const stageBadge: Record<string, string> = {
  CONSTRUCTION: "bg-blue-100 text-blue-700 border-blue-300",
  SALES_COLLECTION: "bg-green-100 text-green-700 border-green-300",
  PRE_LAUNCH: "bg-purple-100 text-purple-700 border-purple-300",
};

export default function SalesStatusPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/real-estate/reports"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-3"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Reports
        </Link>
        <div className="flex items-center gap-3">
          <ShoppingCart className="h-7 w-7 text-emerald-600" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Sales & Booking Status
            </h1>
            <p className="text-muted-foreground">
              All Projects — As at 12 Aug 2026
            </p>
          </div>
        </div>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Units (Portfolio)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUnits}</div>
            <p className="text-xs text-muted-foreground">Across {projects.length} projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Units Sold
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{totalSold}</div>
            <p className="text-xs text-muted-foreground">{((totalSold / totalUnits) * 100).toFixed(0)}% of total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Saleable Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatBDT(totalValue)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Value Sold
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">{formatBDT(totalValueSold)}</div>
            <p className="text-xs text-muted-foreground">{((totalValueSold / totalValue) * 100).toFixed(0)}% of total value</p>
          </CardContent>
        </Card>
      </div>

      {/* Per Project */}
      {projects.map((p) => {
        const soldPct = ((p.sold + p.underPayment) / (p.total - p.landowner)) * 100;
        return (
          <Card key={p.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3">
                  <Building2 className="h-5 w-5" />
                  {p.project}
                  <span className="text-sm font-normal text-muted-foreground">({p.id})</span>
                </CardTitle>
                <Badge variant="outline" className={stageBadge[p.stage] || ""}>
                  {p.stage.replace(/_/g, " ")}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Unit Inventory */}
              <div>
                <h4 className="text-sm font-semibold mb-2">Unit Inventory Breakdown</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Total</TableHead>
                      <TableHead className="text-center">Available</TableHead>
                      <TableHead className="text-center">Reserved</TableHead>
                      <TableHead className="text-center">Booked</TableHead>
                      <TableHead className="text-center">Under Payment</TableHead>
                      <TableHead className="text-center">Sold (Registered)</TableHead>
                      <TableHead className="text-center">Landowner</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-bold">{p.total}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-gray-50">{p.available}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700">{p.reserved}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">{p.booked}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-orange-50 text-orange-700">{p.underPayment}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-green-50 text-green-700">{p.sold}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-purple-50 text-purple-700">{p.landowner}</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <Separator />

              {/* Value and Velocity */}
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Total Saleable Value</p>
                  <p className="text-sm font-bold">{formatBDT(p.totalSaleableValue)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Value Sold</p>
                  <p className="text-sm font-bold text-green-700">{formatBDT(p.valueSold)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Value Booked</p>
                  <p className="text-sm font-bold text-blue-700">{formatBDT(p.valueBooked)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Value Available</p>
                  <p className="text-sm font-bold">{formatBDT(p.valueAvailable)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Sales Velocity</p>
                  <p className="text-sm font-bold">{p.velocityPerMonth} units/month</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Expected Sell-Out</p>
                  <p className="text-sm font-bold flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {p.expectedSellOut}
                  </p>
                </div>
              </div>

              {/* Sales Progress */}
              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Sales Progress</span>
                  <span>{soldPct.toFixed(0)}% (Sold + Under Payment)</span>
                </div>
                <Progress value={soldPct} className="h-3" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
