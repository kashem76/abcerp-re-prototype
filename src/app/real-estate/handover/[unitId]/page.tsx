"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatBDT } from "@/lib/mock-data";
import {
  Home,
  CheckCircle2,
  XCircle,
  Clock,
  Key,
  FileText,
  ClipboardCheck,
  PenTool,
  Eye,
  AlertTriangle,
  Zap,
  Droplets,
  Flame,
} from "lucide-react";

const unitInfo = {
  unitId: "B-101",
  project: "Bay View Residence",
  projectCode: "RE-00031",
  floor: "1st Floor",
  type: "3 BHK — 1,450 SFT",
  buyer: "Mr. Abdur Rahim Alam",
  buyerPhone: "+880-1711-XXXXXX",
  salePrice: 12_325_000,
  totalPaid: 12_325_000,
  outstanding: 0,
  agreementDate: "2025-02-15",
};

const clearances = [
  {
    item: "Construction Complete",
    status: "CLEARED",
    date: "2026-07-20",
    icon: CheckCircle2,
  },
  {
    item: "Snag List Cleared",
    status: "CLEARED",
    date: "2026-08-01",
    icon: CheckCircle2,
  },
  {
    item: "Account Settled (Outstanding = 0)",
    status: "CLEARED",
    date: "2026-08-05",
    icon: CheckCircle2,
  },
  {
    item: "Sale Agreement Executed",
    status: "CLEARED",
    date: "2025-02-15",
    icon: CheckCircle2,
  },
  {
    item: "All Documents Ready",
    status: "CLEARED",
    date: "2026-08-08",
    icon: CheckCircle2,
  },
  {
    item: "Registration Complete",
    status: "PENDING",
    date: null,
    icon: Clock,
  },
];

const snagItems = [
  {
    id: 1,
    location: "Master Bedroom",
    category: "Paint",
    description: "Touch-up needed on north wall near window frame",
    severity: "Minor",
    status: "RESOLVED",
  },
  {
    id: 2,
    location: "Kitchen",
    category: "Plumbing",
    description: "Sink faucet drip — washer replacement",
    severity: "Minor",
    status: "RESOLVED",
  },
  {
    id: 3,
    location: "Bathroom 2",
    category: "Tile",
    description: "Floor tile grout gap at shower drain",
    severity: "Moderate",
    status: "RESOLVED",
  },
];

const keysProvided = [
  { item: "Main Door Key", qty: 3, provided: true },
  { item: "Bedroom Keys", qty: 3, provided: true },
  { item: "Letterbox Key", qty: 1, provided: true },
  { item: "Parking Remote", qty: 1, provided: true },
];

const meterReadings = [
  { type: "Electric", icon: Zap, meterNo: "EM-BV-101-E", reading: "00042" },
  {
    type: "Water",
    icon: Droplets,
    meterNo: "WM-BV-101-W",
    reading: "00018",
  },
  { type: "Gas", icon: Flame, meterNo: "GM-BV-101-G", reading: "00005" },
];

const documentsHandedOver = [
  { doc: "Registered Deed Copy", provided: false, note: "Pending registration" },
  { doc: "Approved Building Plan (RAJUK Copy)", provided: true, note: "" },
  { doc: "NOC from Developer", provided: true, note: "" },
  { doc: "Warranty Cards (Lift, Generator, Pump)", provided: true, note: "" },
  { doc: "Fire Safety Certificate", provided: true, note: "" },
  { doc: "Apartment Handover Certificate", provided: true, note: "" },
  { doc: "Common Area Maintenance Guidelines", provided: true, note: "" },
];

export default function UnitHandoverPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Home className="h-6 w-6 text-gray-400" />
            Unit Handover — {unitInfo.unitId}
          </h1>
          <p className="text-gray-500">
            {unitInfo.project} | {unitInfo.type} | Buyer: {unitInfo.buyer}
          </p>
        </div>
        <Badge className="bg-amber-100 text-amber-800">
          HANDOVER IN PROGRESS
        </Badge>
      </div>

      {/* Unit & Buyer Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Unit & Buyer Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-500">Unit</p>
              <p className="font-semibold">{unitInfo.unitId}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Floor / Type</p>
              <p className="text-sm">
                {unitInfo.floor} — {unitInfo.type}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Buyer</p>
              <p className="font-semibold">{unitInfo.buyer}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Sale Price</p>
              <p className="font-semibold">{formatBDT(unitInfo.salePrice)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Paid</p>
              <p className="text-sm text-emerald-700 font-medium">
                {formatBDT(unitInfo.totalPaid)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Outstanding</p>
              <p className="text-sm font-medium text-emerald-700">
                {formatBDT(unitInfo.outstanding)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Agreement Date</p>
              <p className="text-sm">{unitInfo.agreementDate}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Project</p>
              <p className="text-sm">{unitInfo.project}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 1: Pre-Handover Clearances */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <ClipboardCheck className="h-4 w-4" />
            Pre-Handover Clearances
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {clearances.map((c, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-2 border-b last:border-0"
              >
                <div className="flex items-center gap-3">
                  {c.status === "CLEARED" ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <Clock className="h-5 w-5 text-amber-500" />
                  )}
                  <span className="text-sm">{c.item}</span>
                </div>
                <div className="flex items-center gap-3">
                  {c.date && (
                    <span className="text-xs text-gray-400">{c.date}</span>
                  )}
                  <Badge
                    className={
                      c.status === "CLEARED"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }
                  >
                    {c.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded p-3 flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
            <p className="text-xs text-amber-700">
              Registration is pending. Handover can proceed but registered deed
              copy will be provided after registration completion.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Inspection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Inspection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">
                Inspection Date
              </label>
              <Input type="date" defaultValue="2026-08-01" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">
                Inspector
              </label>
              <Input value="Eng. Rafiq Ahmed" disabled className="bg-gray-50" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">
                Inspection Type
              </label>
              <Input value="Final Inspection" disabled className="bg-gray-50" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">
                Result
              </label>
              <Badge className="bg-emerald-100 text-emerald-800 mt-1">
                PASSED
              </Badge>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">
              Findings
            </label>
            <Textarea
              defaultValue="All snag items from pre-handover inspection have been rectified. Unit is in handover-ready condition. Paint, plumbing, electrical, and tiling all verified."
              rows={2}
              disabled
              className="bg-gray-50"
            />
          </div>

          <div>
            <p className="text-xs font-medium text-gray-500 mb-2">
              Snag Items (Resolved)
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Location</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {snagItems.map((snag) => (
                  <TableRow key={snag.id}>
                    <TableCell className="text-sm">{snag.location}</TableCell>
                    <TableCell className="text-sm">{snag.category}</TableCell>
                    <TableCell className="text-sm">
                      {snag.description}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          snag.severity === "Moderate"
                            ? "text-amber-700 border-amber-300"
                            : "text-gray-600"
                        }
                      >
                        {snag.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-emerald-100 text-emerald-800">
                        {snag.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Section 3: Key Handover & Meter Readings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Key className="h-4 w-4" />
              Keys Provided
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {keysProvided.map((k, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-1"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm">{k.item}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    x{k.qty}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Meter Readings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {meterReadings.map((m, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <m.icon className="h-5 w-5 text-gray-400" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{m.type}</p>
                    <p className="text-xs text-gray-400">
                      Meter: {m.meterNo}
                    </p>
                  </div>
                  <Input
                    className="w-28 text-right text-sm h-8"
                    defaultValue={m.reading}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Section 4: Sign-off */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <PenTool className="h-4 w-4" />
            Sign-off
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">
                  Buyer Signature
                </label>
                <div className="h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                  Signature Placeholder — {unitInfo.buyer}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">
                  Handover Date
                </label>
                <Input type="date" defaultValue="2026-08-12" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">
                  Company Representative
                </label>
                <div className="h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                  Signature Placeholder — Eng. Rafiq Ahmed
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">
                  Witness
                </label>
                <Input placeholder="Witness name" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 5: Documents Handed Over */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Documents Handed Over
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {documentsHandedOver.map((d, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-2 border-b last:border-0"
              >
                <div className="flex items-center gap-3">
                  {d.provided ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-400" />
                  )}
                  <span className="text-sm">{d.doc}</span>
                </div>
                {d.note && (
                  <span className="text-xs text-amber-600">{d.note}</span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <Button className="gap-2">
          <CheckCircle2 className="h-4 w-4" />
          Complete Handover
        </Button>
        <Button variant="outline">Print Handover Certificate</Button>
      </div>
    </div>
  );
}
