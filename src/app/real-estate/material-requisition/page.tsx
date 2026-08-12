"use client";

import Link from "next/link";
import { ArrowLeft, Plus, Package } from "lucide-react";
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
import {
  materialRequisitions,
  mrDetail,
  formatBDT,
  formatNumber,
} from "@/lib/mock-data";

const priorityColor: Record<string, string> = {
  URGENT: "bg-red-100 text-red-700 border-red-300",
  NORMAL: "bg-blue-100 text-blue-700 border-blue-300",
  LOW: "bg-gray-100 text-gray-700 border-gray-300",
};

const statusColor: Record<string, string> = {
  APPROVED: "bg-emerald-100 text-emerald-700 border-emerald-300",
  SUBMITTED: "bg-amber-100 text-amber-700 border-amber-300",
  DRAFT: "bg-gray-100 text-gray-700 border-gray-300",
  REJECTED: "bg-red-100 text-red-700 border-red-300",
};

export default function MaterialRequisitionPage() {
  const detail = mrDetail;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/real-estate"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-3"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Dashboard
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Material Requisitions
            </h1>
            <p className="text-sm text-muted-foreground">
              Track material requests from site to warehouse
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New MR
          </Button>
        </div>
      </div>

      {/* MR List Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            All Requisitions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Requested By</TableHead>
                <TableHead>WBS</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Items</TableHead>
                <TableHead className="text-right">Value (BDT)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {materialRequisitions.map((mr) => (
                <TableRow
                  key={mr.code}
                  className={
                    mr.code === detail.code
                      ? "bg-blue-50 border-l-2 border-l-blue-500"
                      : ""
                  }
                >
                  <TableCell className="text-sm font-medium text-blue-600">
                    {mr.code}
                  </TableCell>
                  <TableCell className="text-sm">{mr.date}</TableCell>
                  <TableCell className="text-sm">{mr.requestedBy}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {mr.wbs}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`text-xs ${priorityColor[mr.priority] ?? ""}`}
                    >
                      {mr.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`text-xs ${statusColor[mr.status] ?? ""}`}
                    >
                      {mr.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-right">{mr.items}</TableCell>
                  <TableCell className="text-sm text-right font-medium">
                    {formatBDT(mr.totalValue)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detail Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package className="h-5 w-5 text-blue-500" />
              <CardTitle className="text-base font-semibold">
                {detail.code} &mdash; Detail
              </CardTitle>
              <Badge
                variant="outline"
                className="bg-emerald-100 text-emerald-700 border-emerald-300 text-xs"
              >
                {detail.status}
              </Badge>
              <Badge
                variant="outline"
                className="bg-red-100 text-red-700 border-red-300 text-xs"
              >
                {detail.priority}
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button variant="destructive" size="sm">
                Reject
              </Button>
              <Button variant="outline" size="sm">
                Approve
              </Button>
              <Button size="sm">Create Material Issue</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <div className="text-sm">
              <span className="text-muted-foreground">Project</span>
              <p className="font-medium">{detail.project}</p>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">WBS</span>
              <p className="font-medium">{detail.wbs}</p>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Requested By</span>
              <p className="font-medium">{detail.requestedBy}</p>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Required Date</span>
              <p className="font-medium">{detail.requiredDate}</p>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Priority</span>
              <p className="font-medium">{detail.priority}</p>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Approved By</span>
              <p className="font-medium">{detail.approvedBy}</p>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Lines Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>BOQ Line</TableHead>
                <TableHead className="text-right">Requested Qty</TableHead>
                <TableHead>UOM</TableHead>
                <TableHead className="text-right">Approved Qty</TableHead>
                <TableHead className="text-right">Issued Qty</TableHead>
                <TableHead className="text-right">Stock Available</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {detail.lines.map((line, i) => {
                const stockOk = line.stockAvailable >= line.requested;
                return (
                  <TableRow key={i}>
                    <TableCell className="text-sm font-medium">
                      {line.item}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs">
                        {line.boqLine}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-right">
                      {formatNumber(line.requested)}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {line.uom}
                    </TableCell>
                    <TableCell className="text-sm text-right">
                      {formatNumber(line.approved)}
                    </TableCell>
                    <TableCell className="text-sm text-right">
                      {formatNumber(line.issued)}
                    </TableCell>
                    <TableCell
                      className={`text-sm text-right font-semibold ${
                        stockOk ? "text-emerald-600" : "text-red-600"
                      }`}
                    >
                      {formatNumber(line.stockAvailable)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
