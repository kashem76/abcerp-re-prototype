"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { units, paymentSchedule, formatNumber, formatBDT } from "@/lib/mock-data";
import { Home, Building2 } from "lucide-react";

const statusColors: Record<string, string> = {
  AVAILABLE: "bg-emerald-100 text-emerald-800",
  RESERVED: "bg-yellow-100 text-yellow-800",
  BOOKED: "bg-blue-100 text-blue-800",
  UNDER_PAYMENT: "bg-orange-100 text-orange-800",
  SOLD: "bg-emerald-500 text-white",
  LANDOWNER: "bg-slate-200 text-slate-700",
};

const scheduleStatusColors: Record<string, string> = {
  PAID: "bg-emerald-100 text-emerald-800",
  OVERDUE: "bg-red-100 text-red-800",
  DUE: "bg-yellow-100 text-yellow-800",
  UPCOMING: "bg-gray-100 text-gray-600",
};

export default function BookingPage() {
  const counts = {
    available: units.filter(u => u.status === "AVAILABLE").length,
    reserved: units.filter(u => u.status === "RESERVED").length,
    booked: units.filter(u => u.status === "BOOKED").length,
    underPayment: units.filter(u => u.status === "UNDER_PAYMENT").length,
    sold: units.filter(u => u.status === "SOLD").length,
    landowner: units.filter(u => u.status === "LANDOWNER").length,
  };

  const totalPaid = paymentSchedule.filter(p => p.status === "PAID").reduce((s, p) => s + p.paidAmount, 0);
  const totalDue = paymentSchedule.reduce((s, p) => s + p.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Building2 className="h-6 w-6 text-gray-400" />
          Unit Inventory & Booking — ABC Nasirabad Heights
        </h1>
        <p className="text-gray-500">Tower A — 12 units shown (prototype sample)</p>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        {[
          { label: "Available", count: counts.available, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Reserved", count: counts.reserved, color: "text-yellow-600", bg: "bg-yellow-50" },
          { label: "Booked", count: counts.booked, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Under Payment", count: counts.underPayment, color: "text-orange-600", bg: "bg-orange-50" },
          { label: "Sold", count: counts.sold, color: "text-emerald-700", bg: "bg-emerald-50" },
          { label: "Landowner", count: counts.landowner, color: "text-slate-600", bg: "bg-slate-50" },
        ].map((s) => (
          <Card key={s.label} className={s.bg}>
            <CardContent className="pt-4 pb-3 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Unit Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Home className="h-4 w-4" /> Unit Inventory
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Unit</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Size (SFT)</TableHead>
                <TableHead>Floor</TableHead>
                <TableHead>Facing</TableHead>
                <TableHead className="text-right">Price (BDT)</TableHead>
                <TableHead className="text-right">Price/SFT</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Buyer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {units.map((u) => (
                <TableRow key={u.code} className={u.status === "LANDOWNER" ? "bg-slate-50" : ""}>
                  <TableCell className="font-semibold">{u.code}</TableCell>
                  <TableCell>{u.type}</TableCell>
                  <TableCell className="text-right font-mono">{formatNumber(u.size)}</TableCell>
                  <TableCell>{u.floor}</TableCell>
                  <TableCell>{u.facing}</TableCell>
                  <TableCell className="text-right font-mono">{formatNumber(u.price)}</TableCell>
                  <TableCell className="text-right font-mono">{formatNumber(u.pricePerSft)}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[u.status] || "bg-gray-100"}>{u.status.replace(/_/g, " ")}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">{u.buyer || "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Payment Schedule */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Payment Schedule — Unit A-201 (Mr. Hasanul Islam)</CardTitle>
            <div className="text-sm text-gray-500">
              Agreement: BDT {formatNumber(8_700_000)} | Paid: BDT {formatNumber(totalPaid)} |
              <span className="text-red-600 font-medium"> Balance: BDT {formatNumber(totalDue - totalPaid)}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">#</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Amount (BDT)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Paid Date</TableHead>
                <TableHead className="text-right">Paid (BDT)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentSchedule.map((p) => (
                <TableRow key={p.installment} className={p.status === "OVERDUE" ? "bg-red-50" : ""}>
                  <TableCell className="font-medium">{p.installment}</TableCell>
                  <TableCell>{p.type}</TableCell>
                  <TableCell>{p.dueDate}</TableCell>
                  <TableCell className="text-right font-mono">{formatNumber(p.amount)}</TableCell>
                  <TableCell>
                    <Badge className={scheduleStatusColors[p.status] || "bg-gray-100"}>{p.status}</Badge>
                  </TableCell>
                  <TableCell>{p.paidDate || "—"}</TableCell>
                  <TableCell className="text-right font-mono">{p.paidAmount ? formatNumber(p.paidAmount) : "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
