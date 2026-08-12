"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Home,
  ClipboardCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { handoverData } from "@/lib/mock-data";

const inspectionColor: Record<string, string> = {
  PASSED: "bg-emerald-100 text-emerald-700 border-emerald-300",
  CONDITIONAL: "bg-amber-100 text-amber-700 border-amber-300",
  NOT_DONE: "bg-gray-100 text-gray-700 border-gray-300",
};

const unitStatusColor: Record<string, string> = {
  HANDED_OVER: "bg-emerald-100 text-emerald-700 border-emerald-300",
  PENDING_REGISTRATION: "bg-blue-100 text-blue-700 border-blue-300",
  SNAGS_PENDING: "bg-amber-100 text-amber-700 border-amber-300",
  CONSTRUCTION_PENDING: "bg-red-100 text-red-700 border-red-300",
};

const severityColor: Record<string, string> = {
  MAJOR: "bg-red-100 text-red-700 border-red-300",
  MINOR: "bg-yellow-100 text-yellow-700 border-yellow-300",
  COSMETIC: "bg-gray-100 text-gray-700 border-gray-300",
};

const snagStatusColor: Record<string, string> = {
  OPEN: "bg-red-100 text-red-700 border-red-300",
  ASSIGNED: "bg-blue-100 text-blue-700 border-blue-300",
  IN_PROGRESS: "bg-amber-100 text-amber-700 border-amber-300",
  RESOLVED: "bg-emerald-100 text-emerald-700 border-emerald-300",
};

function ClearanceIcon({ ok }: { ok: boolean }) {
  return ok ? (
    <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" />
  ) : (
    <XCircle className="h-4 w-4 text-red-400 mx-auto" />
  );
}

export default function HandoverPage() {
  const data = handoverData;

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
        <div className="flex items-center gap-3">
          <Home className="h-6 w-6 text-blue-500" />
          <h1 className="text-2xl font-bold tracking-tight">
            Handover &mdash; {data.project}
          </h1>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4 pb-4 px-4 text-center">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Total Units
            </p>
            <p className="text-2xl font-bold mt-1">{data.totalUnits}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 px-4 text-center">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Handed Over
            </p>
            <p className="text-2xl font-bold mt-1 text-emerald-600">
              {data.handedOver}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 px-4 text-center">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Pending
            </p>
            <p className="text-2xl font-bold mt-1 text-amber-600">
              {data.pending}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 px-4 text-center">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Under Inspection
            </p>
            <p className="text-2xl font-bold mt-1 text-blue-600">
              {data.inspection}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Units Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            Unit Handover Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Unit</TableHead>
                <TableHead>Buyer</TableHead>
                <TableHead>Inspection</TableHead>
                <TableHead className="text-center">Construction</TableHead>
                <TableHead className="text-center">Snags</TableHead>
                <TableHead className="text-center">Accounts</TableHead>
                <TableHead className="text-center">Agreement</TableHead>
                <TableHead className="text-center">Documents</TableHead>
                <TableHead className="text-center">Registration</TableHead>
                <TableHead>Handover Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.units.map((unit) => (
                <TableRow key={unit.code}>
                  <TableCell className="text-sm font-medium">
                    {unit.code}
                  </TableCell>
                  <TableCell className="text-sm">{unit.buyer}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`text-xs ${inspectionColor[unit.inspectionStatus] ?? ""}`}
                    >
                      {unit.inspectionStatus.replace(/_/g, " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <ClearanceIcon ok={unit.clearances.construction} />
                  </TableCell>
                  <TableCell>
                    <ClearanceIcon ok={unit.clearances.snags} />
                  </TableCell>
                  <TableCell>
                    <ClearanceIcon ok={unit.clearances.accounts} />
                  </TableCell>
                  <TableCell>
                    <ClearanceIcon ok={unit.clearances.agreement} />
                  </TableCell>
                  <TableCell>
                    <ClearanceIcon ok={unit.clearances.documents} />
                  </TableCell>
                  <TableCell>
                    <ClearanceIcon ok={unit.clearances.registration} />
                  </TableCell>
                  <TableCell className="text-sm">
                    {unit.handoverDate ?? "---"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`text-xs ${unitStatusColor[unit.status] ?? ""}`}
                    >
                      {unit.status.replace(/_/g, " ")}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Snag List */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5 text-amber-500" />
            <CardTitle className="text-base font-semibold">
              Snag List
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Unit</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Contractor</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.snags.map((snag, i) => (
                <TableRow key={i}>
                  <TableCell className="text-sm font-medium">
                    {snag.unit}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">
                      {snag.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{snag.description}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`text-xs ${severityColor[snag.severity] ?? ""}`}
                    >
                      {snag.severity}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{snag.contractor}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`text-xs ${snagStatusColor[snag.status] ?? ""}`}
                    >
                      {snag.status.replace(/_/g, " ")}
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
