"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { formatBDT, formatNumber } from "@/lib/mock-data";
import { FileText, BookOpen, Calculator, Minus } from "lucide-react";

const contractInfo = {
  contractor: "M/s Rahman & Sons Construction",
  contractNo: "CON-2025-014",
  contractTitle: "Structural & Civil Works — ABC Nasirabad Heights",
  contractValue: 185_000_000,
  prevBilled: 72_400_000,
  billNo: "RB-014-04",
  billPeriod: { from: "2026-07-01", to: "2026-07-31" },
};

const measurementItems = [
  {
    item: "RCC Column (Ground to 3rd Floor)",
    unit: "Cum",
    contractQty: 420,
    prevMeasured: 285,
    currentMeasurement: 65,
    rate: 18_500,
  },
  {
    item: "RCC Beam (3rd Floor)",
    unit: "Cum",
    contractQty: 180,
    prevMeasured: 120,
    currentMeasurement: 35,
    rate: 17_200,
  },
  {
    item: "RCC Slab (3rd Floor)",
    unit: "Sqm",
    contractQty: 2800,
    prevMeasured: 1900,
    currentMeasurement: 450,
    rate: 4_800,
  },
  {
    item: "Brick Work (2nd & 3rd Floor)",
    unit: "Sqm",
    contractQty: 6500,
    prevMeasured: 3200,
    currentMeasurement: 820,
    rate: 1_250,
  },
  {
    item: "Plastering (Internal — 2nd Floor)",
    unit: "Sqm",
    contractQty: 5200,
    prevMeasured: 1800,
    currentMeasurement: 650,
    rate: 380,
  },
  {
    item: "Earth Filling & Compaction",
    unit: "Cum",
    contractQty: 350,
    prevMeasured: 350,
    currentMeasurement: 0,
    rate: 1_100,
  },
];

const grossAmount = measurementItems.reduce((sum, item) => sum + item.currentMeasurement * item.rate, 0);

const deductions = {
  retentionPercent: 5,
  retentionAmount: Math.round(grossAmount * 0.05),
  advanceRecovery: 150_000,
  tdsPercent: 5,
  tdsAmount: Math.round(grossAmount * 0.05),
  materialSupplied: 85_000,
};

const totalDeductions =
  deductions.retentionAmount + deductions.advanceRecovery + deductions.tdsAmount + deductions.materialSupplied;
const netPayable = grossAmount - totalDeductions;

const glPreview = [
  { account: "1510 — Construction WIP (Asset)", debit: grossAmount, credit: 0 },
  { account: "2110 — Accounts Payable — Contractor", debit: 0, credit: netPayable },
  { account: "2320 — Retention Payable (Liability)", debit: 0, credit: deductions.retentionAmount },
  { account: "2330 — TDS Payable (Liability)", debit: 0, credit: deductions.tdsAmount },
  { account: "2340 — Advance Recovery (contra)", debit: 0, credit: deductions.advanceRecovery },
  { account: "1520 — Material Issued to Contractor", debit: 0, credit: deductions.materialSupplied },
];

export default function RunningBillNewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FileText className="h-6 w-6 text-gray-400" />
          Running Bill Entry
        </h1>
        <p className="text-gray-500">
          Bill #{contractInfo.billNo} — {contractInfo.contractTitle}
        </p>
      </div>

      {/* Contract Info */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-gray-500">Contract Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Contractor</label>
              <Select defaultValue="rahman">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="rahman">M/s Rahman & Sons Construction</SelectItem>
                  <SelectItem value="elite">Elite Builders Ltd</SelectItem>
                  <SelectItem value="progressive">Progressive Engineers</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Contract</label>
              <Select defaultValue="con014">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="con014">CON-2025-014 — Structural & Civil</SelectItem>
                  <SelectItem value="con015">CON-2025-015 — MEP Works</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Bill Period From</label>
              <Input type="date" defaultValue="2026-07-01" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Bill Period To</label>
              <Input type="date" defaultValue="2026-07-31" />
            </div>
          </div>
          <div className="mt-3 flex gap-4 text-sm text-gray-500">
            <span>Contract Value: <strong className="text-gray-900">{formatBDT(contractInfo.contractValue)}</strong></span>
            <span>Previously Billed: <strong className="text-gray-900">{formatBDT(contractInfo.prevBilled)}</strong></span>
            <span>Balance: <strong className="text-gray-900">{formatBDT(contractInfo.contractValue - contractInfo.prevBilled)}</strong></span>
          </div>
        </CardContent>
      </Card>

      {/* Measurement Table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Measurement Sheet
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Item Description</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead className="text-right">Contract Qty</TableHead>
                  <TableHead className="text-right">Prev Measured</TableHead>
                  <TableHead className="text-right">Current Measurement</TableHead>
                  <TableHead className="text-right">Cumulative</TableHead>
                  <TableHead className="text-right">Rate (BDT)</TableHead>
                  <TableHead className="text-right">Amount (BDT)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {measurementItems.map((item, i) => {
                  const amount = item.currentMeasurement * item.rate;
                  const cumulative = item.prevMeasured + item.currentMeasurement;
                  const overContract = cumulative > item.contractQty;
                  return (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{item.item}</TableCell>
                      <TableCell>{item.unit}</TableCell>
                      <TableCell className="text-right">{formatNumber(item.contractQty)}</TableCell>
                      <TableCell className="text-right">{formatNumber(item.prevMeasured)}</TableCell>
                      <TableCell className="text-right">
                        <Input
                          type="number"
                          defaultValue={item.currentMeasurement}
                          className="w-20 text-right inline-block"
                        />
                      </TableCell>
                      <TableCell className={`text-right ${overContract ? "text-red-600 font-semibold" : ""}`}>
                        {formatNumber(cumulative)}
                        {overContract && <span className="text-xs ml-1">(over)</span>}
                      </TableCell>
                      <TableCell className="text-right">{formatBDT(item.rate)}</TableCell>
                      <TableCell className="text-right font-medium">
                        {item.currentMeasurement > 0 ? formatBDT(amount) : "—"}
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow className="font-bold bg-gray-50">
                  <TableCell colSpan={7} className="text-right">Gross Amount</TableCell>
                  <TableCell className="text-right text-lg">{formatBDT(grossAmount)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Deductions */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Minus className="h-4 w-4" />
            Deductions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Deduction Type</TableHead>
                <TableHead className="text-right">Rate / %</TableHead>
                <TableHead className="text-right">Amount (BDT)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Retention Money</TableCell>
                <TableCell className="text-right">{deductions.retentionPercent}%</TableCell>
                <TableCell className="text-right text-red-600">({formatBDT(deductions.retentionAmount)})</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Advance Recovery (Running)</TableCell>
                <TableCell className="text-right">Lump Sum</TableCell>
                <TableCell className="text-right text-red-600">({formatBDT(deductions.advanceRecovery)})</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>TDS / Withholding Tax (AIT u/s 52)</TableCell>
                <TableCell className="text-right">{deductions.tdsPercent}%</TableCell>
                <TableCell className="text-right text-red-600">({formatBDT(deductions.tdsAmount)})</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Material Supplied by Owner</TableCell>
                <TableCell className="text-right">As per MR</TableCell>
                <TableCell className="text-right text-red-600">({formatBDT(deductions.materialSupplied)})</TableCell>
              </TableRow>
              <TableRow className="font-semibold">
                <TableCell colSpan={2} className="text-right">Total Deductions</TableCell>
                <TableCell className="text-right text-red-600">({formatBDT(totalDeductions)})</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Separator className="my-4" />

          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">Net Payable to Contractor</span>
            <span className="text-2xl font-bold text-blue-700">{formatBDT(netPayable)}</span>
          </div>
        </CardContent>
      </Card>

      {/* GL Journal Preview */}
      <Card className="border-amber-200 bg-amber-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            GL Journal Preview — On Bill Approval
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account</TableHead>
                <TableHead className="text-right">Debit (BDT)</TableHead>
                <TableHead className="text-right">Credit (BDT)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {glPreview.map((row, i) => (
                <TableRow key={i}>
                  <TableCell className="font-mono text-sm">{row.account}</TableCell>
                  <TableCell className="text-right">{row.debit ? formatBDT(row.debit) : "—"}</TableCell>
                  <TableCell className="text-right">{row.credit ? formatBDT(row.credit) : "—"}</TableCell>
                </TableRow>
              ))}
              <TableRow className="font-bold">
                <TableCell>Total</TableCell>
                <TableCell className="text-right">{formatBDT(grossAmount)}</TableCell>
                <TableCell className="text-right">{formatBDT(grossAmount)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-amber-700 mt-2">
            Construction WIP is debited with the full gross amount. Liabilities are created for AP, Retention, and TDS.
            Advance recovery reduces the previously recorded Advance to Contractor asset.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline">Save as Draft</Button>
        <Button className="bg-emerald-600 hover:bg-emerald-700">Submit for Approval</Button>
      </div>
    </div>
  );
}
