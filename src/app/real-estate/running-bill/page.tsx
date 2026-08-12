"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { runningBill, formatNumber, formatBDT } from "@/lib/mock-data";
import { FileText, CheckCircle, Send, BookOpen } from "lucide-react";

const rb = runningBill;

export default function RunningBillPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">Running Account Bill — {rb.billNumber}</h1>
            <Badge className="bg-yellow-100 text-yellow-800">PENDING CERTIFICATION</Badge>
          </div>
          <p className="text-gray-500 mt-1">{rb.contractor}</p>
          <p className="text-sm text-gray-400">{rb.contract}</p>
        </div>
        <div className="text-right text-sm text-gray-500">
          <p>Contract Value: <span className="font-semibold text-gray-900">BDT {formatBDT(rb.contractValue)}</span></p>
          <p>Period: {rb.periodFrom} to {rb.periodTo}</p>
        </div>
      </div>

      {/* Line Items */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="h-4 w-4" /> Bill Line Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead className="text-center">Unit</TableHead>
                <TableHead className="text-right">Contract Qty</TableHead>
                <TableHead className="text-right">Cum. Measured</TableHead>
                <TableHead className="text-right">Prev. Billed</TableHead>
                <TableHead className="text-right">Current Billed</TableHead>
                <TableHead className="text-right">Rate (BDT)</TableHead>
                <TableHead className="text-right">Gross Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rb.lines.map((line, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{line.item}</TableCell>
                  <TableCell className="text-center">{line.unit}</TableCell>
                  <TableCell className="text-right font-mono">{formatNumber(line.contractQty)}</TableCell>
                  <TableCell className="text-right font-mono">{formatNumber(line.cumMeasured)}</TableCell>
                  <TableCell className="text-right font-mono text-gray-500">{formatNumber(line.prevBilled)}</TableCell>
                  <TableCell className="text-right font-mono font-semibold">{formatNumber(line.currentBilled)}</TableCell>
                  <TableCell className="text-right font-mono">{formatNumber(line.rate)}</TableCell>
                  <TableCell className="text-right font-mono">{formatNumber(line.grossAmount)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Deduction Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Deduction Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Gross Amount (this bill)</span>
              <span className="font-mono font-semibold">BDT {formatNumber(rb.summary.grossAmount)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Cumulative Gross (all bills)</span>
              <span className="font-mono text-gray-500">BDT {formatNumber(rb.summary.cumulativeGross)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-sm text-red-600">
              <span>Less: Retention (10%)</span>
              <span className="font-mono">- BDT {formatNumber(rb.summary.retention)}</span>
            </div>
            <div className="flex justify-between text-sm text-red-600">
              <span>Less: Advance Recovery</span>
              <span className="font-mono">- BDT {formatNumber(rb.summary.advanceRecovery)}</span>
            </div>
            <div className="flex justify-between text-sm text-red-600">
              <span>Less: TDS / Withholding Tax</span>
              <span className="font-mono">- BDT {formatNumber(rb.summary.tdsWithholding)}</span>
            </div>
            <div className="flex justify-between text-sm text-red-600">
              <span>Less: Material Supplied by Developer</span>
              <span className="font-mono">- BDT {formatNumber(rb.summary.materialSupplied)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-sm font-medium">
              <span>Total Deductions</span>
              <span className="font-mono text-red-600">- BDT {formatNumber(rb.summary.totalDeductions)}</span>
            </div>
            <Separator className="border-2" />
            <div className="flex justify-between text-lg font-bold">
              <span>NET PAYABLE</span>
              <span className="font-mono text-emerald-600">BDT {formatNumber(rb.summary.netPayable)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">GL Journal Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-blue-700">Construction WIP — Project (DR)</span>
                <span className="font-semibold">{formatNumber(rb.summary.grossAmount)}</span>
              </div>
              <div className="flex justify-between text-gray-600 pl-4">
                <span>AP — Contractor (CR)</span>
                <span>{formatNumber(rb.summary.netPayable)}</span>
              </div>
              <div className="flex justify-between text-gray-600 pl-4">
                <span>Retention Payable (CR)</span>
                <span>{formatNumber(rb.summary.retention)}</span>
              </div>
              <div className="flex justify-between text-gray-600 pl-4">
                <span>Advance Recovery (CR)</span>
                <span>{formatNumber(rb.summary.advanceRecovery)}</span>
              </div>
              <div className="flex justify-between text-gray-600 pl-4">
                <span>TDS Payable (CR)</span>
                <span>{formatNumber(rb.summary.tdsWithholding)}</span>
              </div>
              <div className="flex justify-between text-gray-600 pl-4">
                <span>Material Supplied (CR)</span>
                <span>{formatNumber(rb.summary.materialSupplied)}</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              Retention is a balance sheet liability — not a discount. Released after DLP expiry.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-end">
        <Button variant="outline">Save Draft</Button>
        <Button variant="outline" className="gap-2 text-blue-600 border-blue-200">
          <CheckCircle className="h-4 w-4" /> Certify Bill
        </Button>
        <Button variant="outline" className="gap-2 text-emerald-600 border-emerald-200">
          <Send className="h-4 w-4" /> Approve
        </Button>
        <Button className="gap-2">
          <BookOpen className="h-4 w-4" /> Post to GL
        </Button>
      </div>
    </div>
  );
}
