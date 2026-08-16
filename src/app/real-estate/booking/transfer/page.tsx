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
  ArrowRightLeft,
  Building2,
  User,
  UserPlus,
  BookOpen,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const currentBooking = {
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
  totalPaid: 3700000,
  status: "BOOKED",
};

const newBuyer = {
  name: "Mr. Rafiqul Alam",
  nid: "1985-7890-1234-5678",
  phone: "+880 1955-678901",
  address: "12/A, Halishahar, Chattogram",
};

const settlement = {
  transferPremium: 200000,
  premiumPaidBy: "New Buyer",
  transferFee: 50000,
  feePaidBy: "Old Buyer",
  newAgreementValue: 8900000,
};

const statusFlow = [
  { step: "Current Booking", code: "BK-RE27-008", buyer: currentBooking.buyer, status: "CANCELLED", color: "bg-red-100 text-red-800" },
  { step: "New Booking", code: "BK-RE27-015", buyer: newBuyer.name, status: "BOOKED", color: "bg-blue-100 text-blue-800" },
];

const glPreview = [
  { account: "2100 — Booking Advance (Old Buyer)", debit: currentBooking.totalPaid, credit: 0, narration: "Close old buyer advance" },
  { account: "2100 — Booking Advance (New Buyer)", debit: 0, credit: currentBooking.totalPaid, narration: "Transfer advance to new buyer" },
  { account: "1100 — Cash / Bank", debit: settlement.transferPremium, credit: 0, narration: "Transfer premium received" },
  { account: "4210 — Transfer Premium Income", debit: 0, credit: settlement.transferPremium, narration: "Premium income on unit transfer" },
  { account: "1100 — Cash / Bank", debit: settlement.transferFee, credit: 0, narration: "Transfer fee received" },
  { account: "4220 — Transfer Fee Income", debit: 0, credit: settlement.transferFee, narration: "Administrative transfer fee" },
];

export default function BookingTransferPage() {
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
          <ArrowRightLeft className="h-6 w-6 text-blue-600" />
          Unit Transfer
        </h1>
        <p className="text-gray-500">
          Transfer unit ownership from one buyer to another — ABC Properties Ltd
        </p>
      </div>

      {/* Current Booking Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Building2 className="h-4 w-4" /> Current Booking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-500">Booking Code</p>
              <p className="font-semibold">{currentBooking.code}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Booking Date</p>
              <p className="font-semibold">{currentBooking.date}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Unit</p>
              <p className="font-semibold">
                {currentBooking.unit} — {currentBooking.unitType} ({currentBooking.area} sft)
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Status</p>
              <Badge className="bg-blue-100 text-blue-800">{currentBooking.status}</Badge>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <User className="h-3 w-3" /> Current Buyer
              </p>
              <p className="font-semibold">{currentBooking.buyer}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">NID</p>
              <p className="font-mono text-sm">{currentBooking.buyerNID}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Agreement Value</p>
              <p className="font-bold">{formatBDT(currentBooking.agreementValue)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Paid</p>
              <p className="font-bold text-emerald-700">{formatBDT(currentBooking.totalPaid)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transfer To — New Buyer */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-blue-700">
            <UserPlus className="h-4 w-4" /> Transfer To — New Buyer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <Input className="mt-1" defaultValue={newBuyer.name} />
            </div>
            <div>
              <label className="text-sm font-medium">NID Number</label>
              <Input className="mt-1" defaultValue={newBuyer.nid} />
            </div>
            <div>
              <label className="text-sm font-medium">Phone</label>
              <Input className="mt-1" defaultValue={newBuyer.phone} />
            </div>
            <div>
              <label className="text-sm font-medium">Address</label>
              <Input className="mt-1" defaultValue={newBuyer.address} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settlement Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Settlement Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Transfer Premium</label>
              <Input
                type="number"
                className="mt-1"
                defaultValue={settlement.transferPremium}
              />
              <p className="text-xs text-gray-400 mt-1">
                Additional amount charged on transfer (if any)
              </p>
            </div>
            <div>
              <label className="text-sm font-medium">Premium Paid By</label>
              <Select defaultValue="new_buyer">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="old_buyer">Old Buyer</SelectItem>
                  <SelectItem value="new_buyer">New Buyer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div>
              <label className="text-sm font-medium">Transfer Fee (Admin)</label>
              <Input
                type="number"
                className="mt-1"
                defaultValue={settlement.transferFee}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Fee Paid By</label>
              <Select defaultValue="old_buyer">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="old_buyer">Old Buyer</SelectItem>
                  <SelectItem value="new_buyer">New Buyer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Remarks</label>
              <Textarea
                className="mt-1"
                defaultValue="Transfer agreed by both parties. Premium payable by new buyer before transfer effective date."
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">New Agreement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">New Agreement Value</label>
              <Input
                type="number"
                className="mt-1"
                defaultValue={settlement.newAgreementValue}
              />
              <p className="text-xs text-gray-400 mt-1">
                May differ from original agreement
              </p>
            </div>
            <div>
              <label className="text-sm font-medium">Transfer Effective Date</label>
              <Input type="date" className="mt-1" defaultValue="2026-08-15" />
            </div>

            <Separator />
            <p className="text-sm font-medium mb-2">Settlement Summary</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Original Agreement</span>
                <span>{formatBDT(currentBooking.agreementValue)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount Paid (Transferred to New Buyer)</span>
                <span className="text-emerald-700">{formatBDT(currentBooking.totalPaid)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Transfer Premium</span>
                <span>{formatBDT(settlement.transferPremium)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Transfer Fee</span>
                <span>{formatBDT(settlement.transferFee)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>New Agreement Value</span>
                <span>{formatBDT(settlement.newAgreementValue)}</span>
              </div>
            </div>

            {/* Status Flow */}
            <Separator />
            <p className="text-sm font-medium">Status Flow</p>
            <div className="flex items-center gap-3 mt-2">
              {statusFlow.map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="text-center">
                    <p className="text-xs text-gray-500">{s.step}</p>
                    <p className="text-xs font-mono">{s.code}</p>
                    <p className="text-xs">{s.buyer}</p>
                    <Badge className={s.color}>{s.status}</Badge>
                  </div>
                  {i < statusFlow.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              ))}
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
            Close old booking advance, open new booking under new buyer
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

      {/* Actions */}
      <div className="flex items-center justify-between">
        <Link
          href="/real-estate/booking"
          className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent"
        >
          Cancel
        </Link>
        <div className="flex gap-3">
          <Button variant="outline">Save as Draft</Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <ArrowRightLeft className="h-4 w-4 mr-2" />
            Process Transfer
          </Button>
        </div>
      </div>
    </div>
  );
}
