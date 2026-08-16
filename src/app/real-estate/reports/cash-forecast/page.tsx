"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatBDT, formatNumber } from "@/lib/mock-data";
import { TrendingUp, TrendingDown, AlertTriangle, Calendar, Banknote, ArrowDown } from "lucide-react";

const months = [
  "Aug 26", "Sep 26", "Oct 26", "Nov 26", "Dec 26", "Jan 27",
  "Feb 27", "Mar 27", "Apr 27", "May 27", "Jun 27", "Jul 27",
];

const inflows = {
  collections: [12_800, 14_200, 11_500, 15_800, 18_500, 13_200, 12_000, 16_400, 14_800, 13_500, 17_200, 15_000],
  newBookings: [3_500, 5_000, 2_000, 4_500, 8_000, 3_000, 2_500, 6_000, 4_000, 3_500, 5_500, 4_000],
  otherIncome: [200, 150, 300, 180, 250, 200, 150, 300, 200, 180, 250, 200],
};

const outflows = {
  construction: [8_500, 9_200, 10_800, 11_500, 8_000, 9_800, 10_200, 12_000, 11_500, 10_800, 9_500, 8_200],
  contractors: [4_200, 5_100, 6_300, 5_800, 4_500, 5_200, 5_800, 6_500, 5_200, 4_800, 5_100, 4_500],
  materials: [3_800, 4_500, 5_200, 4_800, 3_200, 4_100, 4_600, 5_000, 4_500, 4_200, 3_800, 3_500],
  overheads: [3_800, 3_800, 3_800, 3_800, 3_800, 3_800, 3_800, 3_800, 3_800, 3_800, 3_800, 3_800],
  landPayments: [0, 0, 15_000, 0, 0, 0, 15_000, 0, 0, 0, 0, 0],
  statutory: [1_200, 800, 1_500, 1_000, 2_500, 800, 1_200, 1_500, 1_000, 800, 1_200, 2_000],
  financeCost: [1_800, 1_800, 1_800, 1_800, 1_800, 1_800, 1_800, 1_800, 1_800, 1_800, 1_800, 1_800],
};

// All values in thousands (multiply by 1000 for display)
const K = 1_000;

function sumRow(row: number[]): number {
  return row.reduce((a, b) => a + b, 0);
}

function totalInflowsRow(): number[] {
  return months.map((_, i) => inflows.collections[i] + inflows.newBookings[i] + inflows.otherIncome[i]);
}

function totalOutflowsRow(): number[] {
  return months.map((_, i) =>
    outflows.construction[i] + outflows.contractors[i] + outflows.materials[i] +
    outflows.overheads[i] + outflows.landPayments[i] + outflows.statutory[i] + outflows.financeCost[i]
  );
}

function netCashFlowRow(): number[] {
  const tin = totalInflowsRow();
  const tout = totalOutflowsRow();
  return months.map((_, i) => tin[i] - tout[i]);
}

function closingBalanceRow(): { opening: number[]; closing: number[] } {
  const net = netCashFlowRow();
  const opening: number[] = [48_500]; // opening balance Aug 2026 in thousands
  const closing: number[] = [];
  for (let i = 0; i < 12; i++) {
    closing.push(opening[i] + net[i]);
    if (i < 11) opening.push(closing[i]);
  }
  return { opening, closing };
}

const tInflows = totalInflowsRow();
const tOutflows = totalOutflowsRow();
const tNet = netCashFlowRow();
const { opening, closing } = closingBalanceRow();

const total12MInflow = sumRow(tInflows);
const total12MOutflow = sumRow(tOutflows);
const peakFundingGap = Math.min(...closing);
const monthsNegative = closing.filter((c) => c < 0).length;

export default function CashForecastPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Calendar className="h-6 w-6 text-gray-400" />
          12-Month Cash Flow Forecast
        </h1>
        <p className="text-gray-500">
          ABC Properties Ltd — Rolling forecast from August 2026 to July 2027
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4 pb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500">Total 12M Inflow</span>
              <TrendingUp className="h-4 w-4 text-emerald-600" />
            </div>
            <p className="text-lg font-bold text-emerald-600">{formatBDT(total12MInflow * K)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500">Total 12M Outflow</span>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </div>
            <p className="text-lg font-bold text-red-600">{formatBDT(total12MOutflow * K)}</p>
          </CardContent>
        </Card>
        <Card className={peakFundingGap < 0 ? "bg-red-50" : ""}>
          <CardContent className="pt-4 pb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500">Peak Funding Gap</span>
              <ArrowDown className={`h-4 w-4 ${peakFundingGap < 0 ? "text-red-600" : "text-emerald-600"}`} />
            </div>
            <p className={`text-lg font-bold ${peakFundingGap < 0 ? "text-red-600" : "text-emerald-600"}`}>
              {formatBDT(peakFundingGap * K)}
            </p>
          </CardContent>
        </Card>
        <Card className={monthsNegative > 0 ? "bg-red-50" : ""}>
          <CardContent className="pt-4 pb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500">Months Negative Cash</span>
              <AlertTriangle className={`h-4 w-4 ${monthsNegative > 0 ? "text-red-600" : "text-emerald-600"}`} />
            </div>
            <p className={`text-lg font-bold ${monthsNegative > 0 ? "text-red-600" : "text-emerald-600"}`}>
              {monthsNegative} {monthsNegative === 1 ? "month" : "months"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Forecast Table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Banknote className="h-4 w-4" />
            Monthly Cash Flow Detail (amounts in BDT thousands)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="w-full">
            <div className="min-w-[1200px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[220px] sticky left-0 bg-white z-10">Line Item</TableHead>
                    {months.map((m) => (
                      <TableHead key={m} className="text-right min-w-[90px]">{m}</TableHead>
                    ))}
                    <TableHead className="text-right min-w-[100px] font-bold">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* INFLOWS */}
                  <TableRow className="bg-emerald-50 font-semibold">
                    <TableCell className="sticky left-0 bg-emerald-50 z-10">INFLOWS</TableCell>
                    {months.map((m) => (<TableCell key={m} />))}
                    <TableCell />
                  </TableRow>
                  <DataRow label="Collections from Buyers" data={inflows.collections} indent />
                  <DataRow label="New Booking Money" data={inflows.newBookings} indent />
                  <DataRow label="Other Income" data={inflows.otherIncome} indent />
                  <TotalRow label="Total Inflows" data={tInflows} className="font-bold text-emerald-700 border-t" bgClass="bg-emerald-50" />

                  {/* OUTFLOWS */}
                  <TableRow className="bg-red-50 font-semibold">
                    <TableCell className="sticky left-0 bg-red-50 z-10">OUTFLOWS</TableCell>
                    {months.map((m) => (<TableCell key={m} />))}
                    <TableCell />
                  </TableRow>
                  <DataRow label="Construction Payments" data={outflows.construction} indent />
                  <DataRow label="Contractor Bills" data={outflows.contractors} indent />
                  <DataRow label="Material Purchases" data={outflows.materials} indent />
                  <DataRow label="Overheads" data={outflows.overheads} indent />
                  <DataRow label="Land Payments" data={outflows.landPayments} indent highlight />
                  <DataRow label="Statutory & Taxes" data={outflows.statutory} indent />
                  <DataRow label="Finance Cost" data={outflows.financeCost} indent />
                  <TotalRow label="Total Outflows" data={tOutflows} className="font-bold text-red-700 border-t" bgClass="bg-red-50" />

                  {/* NET */}
                  <TableRow className="border-t-2 font-bold">
                    <TableCell className="sticky left-0 bg-white z-10">NET CASH FLOW</TableCell>
                    {tNet.map((v, i) => (
                      <TableCell key={i} className={`text-right ${v < 0 ? "text-red-600" : "text-emerald-600"}`}>
                        {formatNumber(v)}
                      </TableCell>
                    ))}
                    <TableCell className={`text-right ${sumRow(tNet) < 0 ? "text-red-600" : "text-emerald-600"}`}>
                      {formatNumber(sumRow(tNet))}
                    </TableCell>
                  </TableRow>

                  {/* Opening / Closing */}
                  <TableRow className="bg-gray-50">
                    <TableCell className="sticky left-0 bg-gray-50 z-10 text-gray-500">Opening Balance</TableCell>
                    {opening.map((v, i) => (
                      <TableCell key={i} className="text-right text-gray-500">{formatNumber(v)}</TableCell>
                    ))}
                    <TableCell />
                  </TableRow>
                  <TableRow className="bg-gray-100 font-bold text-lg">
                    <TableCell className="sticky left-0 bg-gray-100 z-10">CLOSING BALANCE</TableCell>
                    {closing.map((v, i) => (
                      <TableCell
                        key={i}
                        className={`text-right ${v < 0 ? "text-red-600 bg-red-100" : "text-emerald-700"}`}
                      >
                        {formatNumber(v)}
                      </TableCell>
                    ))}
                    <TableCell />
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Warning for negative months */}
      {monthsNegative > 0 && (
        <Card className="border-red-300 bg-red-50">
          <CardContent className="pt-4 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-semibold text-red-800 mb-1">Cash Deficit Alert</p>
              <p className="text-red-700">
                {monthsNegative} month(s) show negative closing balance. The peak funding gap of{" "}
                <strong>{formatBDT(Math.abs(peakFundingGap) * K)}</strong> occurs in{" "}
                <strong>{months[closing.indexOf(peakFundingGap)]}</strong>.
                Management should arrange bridge financing or accelerate collections to cover the shortfall.
                Consider: (1) expediting buyer installment collection, (2) negotiating deferred land payment terms,
                (3) arranging CC/OD facility with bank.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function DataRow({ label, data, indent, highlight }: { label: string; data: number[]; indent?: boolean; highlight?: boolean }) {
  return (
    <TableRow className={highlight ? "bg-yellow-50" : ""}>
      <TableCell className={`sticky left-0 ${highlight ? "bg-yellow-50" : "bg-white"} z-10 ${indent ? "pl-6" : ""}`}>
        {label}
      </TableCell>
      {data.map((v, i) => (
        <TableCell key={i} className={`text-right ${highlight && v > 0 ? "text-orange-600 font-medium" : ""}`}>
          {v > 0 ? formatNumber(v) : "—"}
        </TableCell>
      ))}
      <TableCell className="text-right font-medium">{formatNumber(sumRow(data))}</TableCell>
    </TableRow>
  );
}

function TotalRow({ label, data, className, bgClass }: { label: string; data: number[]; className?: string; bgClass?: string }) {
  return (
    <TableRow className={className}>
      <TableCell className={`sticky left-0 ${bgClass ?? "bg-white"} z-10`}>{label}</TableCell>
      {data.map((v, i) => (
        <TableCell key={i} className="text-right">{formatNumber(v)}</TableCell>
      ))}
      <TableCell className="text-right">{formatNumber(sumRow(data))}</TableCell>
    </TableRow>
  );
}
