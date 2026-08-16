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
  ShoppingCart,
  FileText,
  ClipboardList,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
  Star,
  Truck,
  Package,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const kpis = [
  {
    label: "Active POs",
    value: "18",
    change: "+3 this week",
    icon: ShoppingCart,
    color: "blue",
  },
  {
    label: "Pending MRs",
    value: "7",
    change: "2 urgent",
    icon: ClipboardList,
    color: "amber",
  },
  {
    label: "Open Tenders",
    value: "4",
    change: "1 closing today",
    icon: FileText,
    color: "purple",
  },
  {
    label: "Avg Procurement Cycle",
    value: "12 days",
    change: "vs 14 days target",
    icon: Clock,
    color: "emerald",
  },
];

const mrPipeline = [
  {
    code: "MR-RE27-007",
    project: "ABC Nasirabad Heights",
    items: 6,
    value: 3_200_000,
    status: "DRAFT",
    requestedBy: "Eng. Kamal Hossain",
    date: "2026-08-11",
  },
  {
    code: "MR-RE27-006",
    project: "ABC Nasirabad Heights",
    items: 4,
    value: 1_850_000,
    status: "SUBMITTED",
    requestedBy: "Eng. Kamal Hossain",
    date: "2026-08-09",
  },
  {
    code: "MR-RE27-005",
    project: "ABC Nasirabad Heights",
    items: 8,
    value: 5_400_000,
    status: "APPROVED",
    requestedBy: "Eng. Kamal Hossain",
    date: "2026-08-06",
  },
  {
    code: "MR-RE31-003",
    project: "Bay View Residence",
    items: 3,
    value: 980_000,
    status: "APPROVED",
    requestedBy: "Eng. Rafiq Ahmed",
    date: "2026-08-05",
  },
  {
    code: "MR-RE27-004",
    project: "ABC Nasirabad Heights",
    items: 5,
    value: 4_100_000,
    status: "PO_ISSUED",
    requestedBy: "Eng. Kamal Hossain",
    date: "2026-08-01",
  },
  {
    code: "MR-RE31-002",
    project: "Bay View Residence",
    items: 7,
    value: 2_650_000,
    status: "PO_ISSUED",
    requestedBy: "Eng. Rafiq Ahmed",
    date: "2026-07-28",
  },
];

const activeTenders = [
  {
    code: "TNR-2026-014",
    title: "Lift Installation — Nasirabad Heights",
    invited: 5,
    bidsReceived: 3,
    evalStatus: "EVALUATION",
    closingDate: "2026-08-15",
  },
  {
    code: "TNR-2026-015",
    title: "Aluminum Windows & Doors — Tower A",
    invited: 4,
    bidsReceived: 4,
    evalStatus: "SHORTLISTED",
    closingDate: "2026-08-10",
  },
  {
    code: "TNR-2026-016",
    title: "External Painting Works",
    invited: 6,
    bidsReceived: 2,
    evalStatus: "OPEN",
    closingDate: "2026-08-20",
  },
  {
    code: "TNR-2026-017",
    title: "Fire Fighting System Supply & Install",
    invited: 3,
    bidsReceived: 0,
    evalStatus: "OPEN",
    closingDate: "2026-08-25",
  },
];

const rateIntelligence = [
  {
    material: "OPC Cement (Shah)",
    uom: "Bag",
    currentRate: 520,
    lastPORate: 515,
    marketRate: 530,
    trend: "up",
  },
  {
    material: "MS Rod 16mm (500W)",
    uom: "MT",
    currentRate: 88_500,
    lastPORate: 90_000,
    marketRate: 87_000,
    trend: "down",
  },
  {
    material: "Sylhet Sand (Coarse)",
    uom: "CFT",
    currentRate: 2_800,
    lastPORate: 3_200,
    marketRate: 2_750,
    trend: "down",
  },
  {
    material: "Stone Aggregate 20mm",
    uom: "CFT",
    currentRate: 3_500,
    lastPORate: 3_400,
    marketRate: 3_600,
    trend: "up",
  },
  {
    material: "1st Class Bricks",
    uom: "Pcs",
    currentRate: 14,
    lastPORate: 13.5,
    marketRate: 14.5,
    trend: "up",
  },
];

const supplierPerformance = [
  {
    name: "Shah Cement Industries",
    deliveryOnTime: 96,
    qualityRating: 4.7,
    costCompetitiveness: "A",
    totalPOs: 12,
  },
  {
    name: "BSRM Steel",
    deliveryOnTime: 92,
    qualityRating: 4.5,
    costCompetitiveness: "A",
    totalPOs: 8,
  },
  {
    name: "Sylhet Sand Traders",
    deliveryOnTime: 85,
    qualityRating: 3.8,
    costCompetitiveness: "B",
    totalPOs: 15,
  },
  {
    name: "Rahman Brick Works",
    deliveryOnTime: 90,
    qualityRating: 4.2,
    costCompetitiveness: "B+",
    totalPOs: 6,
  },
  {
    name: "Eastern Aggregate Co.",
    deliveryOnTime: 88,
    qualityRating: 4.0,
    costCompetitiveness: "B",
    totalPOs: 9,
  },
];

const statusColor: Record<string, string> = {
  DRAFT: "bg-gray-100 text-gray-700",
  SUBMITTED: "bg-blue-100 text-blue-800",
  APPROVED: "bg-emerald-100 text-emerald-800",
  PO_ISSUED: "bg-purple-100 text-purple-800",
  OPEN: "bg-blue-100 text-blue-800",
  EVALUATION: "bg-amber-100 text-amber-800",
  SHORTLISTED: "bg-emerald-100 text-emerald-800",
};

export default function ProcurementDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <ShoppingCart className="h-6 w-6 text-gray-400" />
          Procurement Dashboard
        </h1>
        <p className="text-gray-500">
          ABC Properties Ltd — All Projects Overview
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="pt-4 pb-3 px-4">
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`h-9 w-9 rounded-lg flex items-center justify-center ${
                    kpi.color === "blue"
                      ? "bg-blue-50"
                      : kpi.color === "amber"
                      ? "bg-amber-50"
                      : kpi.color === "purple"
                      ? "bg-purple-50"
                      : "bg-emerald-50"
                  }`}
                >
                  <kpi.icon
                    className={`h-5 w-5 ${
                      kpi.color === "blue"
                        ? "text-blue-600"
                        : kpi.color === "amber"
                        ? "text-amber-600"
                        : kpi.color === "purple"
                        ? "text-purple-600"
                        : "text-emerald-600"
                    }`}
                  />
                </div>
              </div>
              <p className="text-2xl font-bold">{kpi.value}</p>
              <p className="text-xs text-gray-500">{kpi.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{kpi.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* MR Pipeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <ClipboardList className="h-4 w-4" />
            Material Requisition Pipeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>MR Code</TableHead>
                <TableHead>Project</TableHead>
                <TableHead className="text-right">Items</TableHead>
                <TableHead className="text-right">Est. Value</TableHead>
                <TableHead>Requested By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mrPipeline.map((mr) => (
                <TableRow key={mr.code}>
                  <TableCell className="text-sm font-medium">
                    {mr.code}
                  </TableCell>
                  <TableCell className="text-sm">{mr.project}</TableCell>
                  <TableCell className="text-right text-sm">
                    {mr.items}
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    {formatBDT(mr.value)}
                  </TableCell>
                  <TableCell className="text-sm">{mr.requestedBy}</TableCell>
                  <TableCell className="text-sm">{mr.date}</TableCell>
                  <TableCell>
                    <Badge className={statusColor[mr.status] || ""}>
                      {mr.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Active Tenders */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Active Tenders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tender Code</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="text-right">Invited</TableHead>
                <TableHead className="text-right">Bids Received</TableHead>
                <TableHead>Closing Date</TableHead>
                <TableHead>Evaluation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeTenders.map((t) => (
                <TableRow key={t.code}>
                  <TableCell className="text-sm font-medium">
                    {t.code}
                  </TableCell>
                  <TableCell className="text-sm">{t.title}</TableCell>
                  <TableCell className="text-right text-sm">
                    {t.invited}
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    {t.bidsReceived}
                  </TableCell>
                  <TableCell className="text-sm">{t.closingDate}</TableCell>
                  <TableCell>
                    <Badge className={statusColor[t.evalStatus] || ""}>
                      {t.evalStatus}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Rate Intelligence */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Rate Intelligence — Key Materials
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Material</TableHead>
                <TableHead>UOM</TableHead>
                <TableHead className="text-right">Current Rate</TableHead>
                <TableHead className="text-right">Last PO Rate</TableHead>
                <TableHead className="text-right">Market Rate</TableHead>
                <TableHead className="text-center">Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rateIntelligence.map((r) => (
                <TableRow key={r.material}>
                  <TableCell className="text-sm font-medium">
                    {r.material}
                  </TableCell>
                  <TableCell className="text-sm">{r.uom}</TableCell>
                  <TableCell className="text-right text-sm">
                    {formatBDT(r.currentRate)}
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    {formatBDT(r.lastPORate)}
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    {formatBDT(r.marketRate)}
                  </TableCell>
                  <TableCell className="text-center">
                    {r.trend === "up" ? (
                      <ArrowUpRight className="h-5 w-5 text-red-500 inline" />
                    ) : r.trend === "down" ? (
                      <ArrowDownRight className="h-5 w-5 text-emerald-500 inline" />
                    ) : (
                      <Minus className="h-5 w-5 text-gray-400 inline" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Supplier Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Truck className="h-4 w-4" />
            Top Supplier Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Supplier</TableHead>
                <TableHead className="text-right">Total POs</TableHead>
                <TableHead className="text-right">Delivery On-Time</TableHead>
                <TableHead className="text-right">Quality Rating</TableHead>
                <TableHead className="text-center">Cost Grade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {supplierPerformance.map((s) => (
                <TableRow key={s.name}>
                  <TableCell className="text-sm font-medium">
                    {s.name}
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    {s.totalPOs}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      className={
                        s.deliveryOnTime >= 95
                          ? "bg-emerald-100 text-emerald-800"
                          : s.deliveryOnTime >= 90
                          ? "bg-amber-100 text-amber-800"
                          : "bg-red-100 text-red-800"
                      }
                    >
                      {s.deliveryOnTime}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    <div className="flex items-center justify-end gap-1">
                      <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                      {s.qualityRating.toFixed(1)}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className="font-semibold">
                      {s.costCompetitiveness}
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
