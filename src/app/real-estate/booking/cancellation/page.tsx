"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { formatBDT } from "@/lib/mock-data";
import {
  XCircle,
  AlertTriangle,
  Building2,
  User,
  Calculator,
  BookOpen,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

const bookingData = {
  code: "BK-RE27-008",
  date: "2026-03-15",
  project: "ABC Nasirabad Heights",
  tower: "Tower A",
  unit: "A-201",
  unitType: "3 BHK",
  floor: "2nd Floor",
  area: 1450,
  buyer: "Mr. Hasanul Islam",
  buyerNID: "1990-3456-7890-1234",
  buyerPhone: "+880 1812-345678",
  buyerAddress: "45/B, Agrabad C/A, Chattogram",
  agreementValue: 8700000,
  status: "BOOKED",
};

const paymentSummary = {
  totalPaid: 3700000,
  installments: [
    { label: "Booking Money", date: "2026-03-15", amount: 500000, status: "PAID" },
    { label: "Down Payment", date: "2026-04-15", amount: 1200000, status: "PAID" },
    { label: "1st Installment", date: "2026-06-15", amount: 1000000, status: "PAID" },
    { label: "2nd Installment", date: "2026-08-15", amount: 1000000, status: "PAID" },
    { label: "3rd Installment", date: "2026-10-15", amount: 1000000, status: "DUE" },
    { label: "4th Installment", date: "2026-12-15", amount: 1000000, status: "UPCOMING" },
    { label: "5th Installment", date: "2027-02-15", amount: 1000000, status: "UPCOMING" },
    { label: "On Handover", date: "2027-12-15", amount: 1000000, status: "UPCOMING" },
  ],
};

const forfeiturePercent = 10;
const forfeitureAmount = paymentSummary.totalPaid * (forfeiturePercent / 100);
const refundableAmount = paymentSummary.totalPaid - forfeitureAmount;
const totalDue = bookingData.agreementValue - paymentSummary.totalPaid;

const glPreview = [
  {
    account: "2100 — Booking Advance (Liability)",
    debit: paymentSummary.totalPaid,
    credit: 0,
    narration: "Close buyer advance liability",
  },
  {
    account: "2150 — Refund Payable",
    debit: 0,
    credit: refundableAmount,
    narration: "Refund due to buyer",
  },
  {
    account: "4200 — Forfeiture Income",
    debit: 0,
    credit: forfeitureAmount,
    narration: "Forfeiture per cancellation policy",
  },
];

const statusColors: Record<string, string> = {
  PAID: "bg-emerald-100 text-emerald-800",
  DUE: "bg-yellow-100 text-yellow-800",
  UPCOMING: "bg-gray-100 text-gray-600",
};

export default function BookingCancellationPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/real-estate/booking"
          className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2"
        >
          <ArrowLeft className="h-3 w-3" /> Back to Booking
        </Link>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <XCircle className="h-6 w-6 text-red-500" />
          Booking Cancellation
        </h1>
        <p className="text-gray-500">
          Cancel booking and process forfeiture / refund — ABC Properties Ltd
        </p>
      </div>

      {/* Booking Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Building2 className="h-4 w-4" /> Booking Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-500">Booking Code</p>
              <p className="font-semibold">{bookingData.code}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Booking Date</p>
              <p className="font-semibold">{bookingData.date}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Project</p>
              <p className="font-semibold">{bookingData.project}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Status</p>
              <Badge className="bg-blue-100 text-blue-800">{bookingData.status}</Badge>
            </div>
            <div>
              <p className="text-xs text-gray-500">Unit</p>
              <p className="font-semibold">
                {bookingData.unit} — {bookingData.unitType} ({bookingData.area} sft)
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Tower / Floor</p>
              <p className="font-semibold">
                {bookingData.tower}, {bookingData.floor}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Agreement Value</p>
              <p className="font-bold text-lg">{formatBDT(bookingData.agreementValue)}</p>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <User className="h-3 w-3" /> Buyer Name
              </p>
              <p className="font-semibold">{bookingData.buyer}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">NID</p>
              <p className="font-mono text-sm">{bookingData.buyerNID}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Phone</p>
              <p className="text-sm">{bookingData.buyerPhone}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Address</p>
              <p className="text-sm">{bookingData.buyerAddress}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Payment Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <Card className="bg-emerald-50">
              <CardContent className="pt-4 pb-3 text-center">
                <p className="text-xl font-bold text-emerald-700">
                  {formatBDT(paymentSummary.totalPaid)}
                </p>
                <p className="text-xs text-gray-500">Total Paid</p>
              </CardContent>
            </Card>
            <Card className="bg-yellow-50">
              <CardContent className="pt-4 pb-3 text-center">
                <p className="text-xl font-bold text-yellow-700">{formatBDT(totalDue)}</p>
                <p className="text-xs text-gray-500">Total Due</p>
              </CardContent>
            </Card>
            <Card className="bg-blue-50">
              <CardContent className="pt-4 pb-3 text-center">
                <p className="text-xl font-bold text-blue-700">
                  {formatBDT(bookingData.agreementValue)}
                </p>
                <p className="text-xs text-gray-500">Agreement Value</p>
              </CardContent>
            </Card>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Installment</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentSummary.installments.map((inst, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{inst.label}</TableCell>
                  <TableCell>{inst.date}</TableCell>
                  <TableCell className="text-right">{formatBDT(inst.amount)}</TableCell>
                  <TableCell className="text-center">
                    <Badge className={statusColors[inst.status] || ""} variant="outline">
                      {inst.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Cancellation Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2 text-red-700">
              <AlertTriangle className="h-4 w-4" /> Cancellation Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Cancellation Reason</label>
              <Select defaultValue="buyer_request">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buyer_request">Buyer Request</SelectItem>
                  <SelectItem value="financial_difficulty">Financial Difficulty</SelectItem>
                  <SelectItem value="non_payment">Non-Payment Default</SelectItem>
                  <SelectItem value="mutual_agreement">Mutual Agreement</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Cancellation Date</label>
              <Input type="date" defaultValue="2026-08-12" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Remarks</label>
              <Textarea
                className="mt-1"
                placeholder="Additional notes for cancellation..."
                defaultValue="Buyer requested cancellation due to relocation plans. Mutual settlement agreed."
              />
            </div>
            <Separator />
            <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-sm">
              <p className="font-semibold text-amber-800">Unit Status Change</p>
              <p className="text-amber-700 mt-1">
                Unit {bookingData.unit} will change from{" "}
                <Badge className="bg-blue-100 text-blue-800">BOOKED</Badge> to{" "}
                <Badge className="bg-emerald-100 text-emerald-800">AVAILABLE</Badge>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Forfeiture Calculation */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Calculator className="h-4 w-4" /> Forfeiture Calculation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Forfeiture Percentage (%)</label>
              <Input
                type="number"
                defaultValue={forfeiturePercent}
                className="mt-1 w-32"
                min={0}
                max={100}
              />
              <p className="text-xs text-gray-400 mt-1">
                As per company cancellation policy
              </p>
            </div>
            <Separator />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Paid by Buyer</span>
                <span className="font-semibold">{formatBDT(paymentSummary.totalPaid)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Forfeiture ({forfeiturePercent}%)
                </span>
                <span className="font-semibold text-red-600">
                  {formatBDT(forfeitureAmount)}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between text-base">
                <span className="font-medium">Refundable Amount</span>
                <span className="font-bold text-emerald-700">
                  {formatBDT(refundableAmount)}
                </span>
              </div>
            </div>

            <Separator />
            <p className="text-sm font-medium">Refund Details</p>
            <div>
              <label className="text-sm text-gray-600">Refund Mode</label>
              <Select defaultValue="bank_transfer">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cheque">Cheque</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-gray-600">Bank Account Name</label>
              <Input className="mt-1" defaultValue="Hasanul Islam" />
            </div>
            <div>
              <label className="text-sm text-gray-600">Account Number</label>
              <Input className="mt-1" defaultValue="1234-5678-9012" />
            </div>
            <div>
              <label className="text-sm text-gray-600">Bank & Branch</label>
              <Input className="mt-1" defaultValue="DBBL, Agrabad Branch" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* GL Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <BookOpen className="h-4 w-4" /> GL Journal Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-gray-500 mb-3">
            The following journal entry will be posted on cancellation approval
          </p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account</TableHead>
                <TableHead>Narration</TableHead>
                <TableHead className="text-right">Debit (BDT)</TableHead>
                <TableHead className="text-right">Credit (BDT)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {glPreview.map((entry, i) => (
                <TableRow key={i}>
                  <TableCell className="font-mono text-sm">{entry.account}</TableCell>
                  <TableCell className="text-sm text-gray-600">{entry.narration}</TableCell>
                  <TableCell className="text-right font-semibold">
                    {entry.debit > 0 ? formatBDT(entry.debit) : "—"}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {entry.credit > 0 ? formatBDT(entry.credit) : "—"}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-gray-50 font-bold">
                <TableCell colSpan={2} className="text-right">
                  Total
                </TableCell>
                <TableCell className="text-right">
                  {formatBDT(glPreview.reduce((s, e) => s + e.debit, 0))}
                </TableCell>
                <TableCell className="text-right">
                  {formatBDT(glPreview.reduce((s, e) => s + e.credit, 0))}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <Link
          href="/real-estate/booking"
          className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent"
        >
          Cancel
        </Link>
        <div className="flex gap-3">
          <Button variant="outline">Save as Draft</Button>
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            <XCircle className="h-4 w-4 mr-2" />
            Process Cancellation
          </Button>
        </div>
      </div>
    </div>
  );
}
