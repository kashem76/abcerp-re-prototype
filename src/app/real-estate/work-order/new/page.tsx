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
import { formatBDT, formatNumber } from "@/lib/mock-data";
import {
  ClipboardList,
  Building2,
  Calendar,
  HardHat,
  UserCheck,
  ArrowLeft,
  Info,
} from "lucide-react";
import Link from "next/link";

const workItems = [
  { wbs: "WBS-02.01", activity: "Column Casting — Ground to 4th Floor", unit: "CUM", qty: 140, rate: 14500, amount: 2030000 },
  { wbs: "WBS-02.02", activity: "Beam Casting — Ground to 4th Floor", unit: "CUM", qty: 210, rate: 13800, amount: 2898000 },
  { wbs: "WBS-02.03", activity: "Slab Casting — Ground to 4th Floor", unit: "CUM", qty: 400, rate: 11500, amount: 4600000 },
  { wbs: "WBS-02.04", activity: "Staircase — Ground to 4th Floor", unit: "CUM", qty: 28, rate: 15000, amount: 420000 },
  { wbs: "WBS-02.05", activity: "Shear Wall — Ground to 4th Floor", unit: "CUM", qty: 105, rate: 16500, amount: 1732500 },
  { wbs: "WBS-02.06", activity: "Reinforcement Supply & Fixing (60 Grade)", unit: "MT", qty: 195, rate: 135000, amount: 26325000 },
];

const woTotal = workItems.reduce((s, i) => s + i.amount, 0);

const milestones = [
  { name: "Ground Floor Structure Complete", targetDate: "2026-10-15", deliverable: "Column, beam, slab — GF complete with inspection" },
  { name: "1st Floor Structure Complete", targetDate: "2026-11-15", deliverable: "Column, beam, slab — 1F complete with inspection" },
  { name: "2nd Floor Structure Complete", targetDate: "2026-12-15", deliverable: "Column, beam, slab — 2F complete with inspection" },
  { name: "3rd Floor Structure Complete", targetDate: "2027-01-15", deliverable: "Column, beam, slab — 3F complete with inspection" },
  { name: "4th Floor Structure Complete", targetDate: "2027-02-15", deliverable: "All structural elements 4F, staircase, shear wall" },
];

export default function WorkOrderEntryPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/real-estate/contract/new"
          className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2"
        >
          <ArrowLeft className="h-3 w-3" /> Back to Contracts
        </Link>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <ClipboardList className="h-6 w-6 text-teal-600" />
          Work Order Entry
        </h1>
        <p className="text-gray-500">
          Issue work order against an existing contract — ABC Properties Ltd
        </p>
      </div>

      {/* Info Note */}
      <div className="bg-teal-50 border border-teal-200 rounded-md p-3 flex items-start gap-2">
        <Info className="h-4 w-4 text-teal-600 mt-0.5 shrink-0" />
        <p className="text-sm text-teal-800">
          A Work Order is a subset of the Contract. Multiple Work Orders can be issued against
          one Contract to phase out the work scope.
        </p>
      </div>

      {/* WO Header */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Building2 className="h-4 w-4" /> Work Order Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">WO Code</label>
              <Input className="mt-1 bg-gray-50" defaultValue="WO-RE27-001" readOnly />
              <p className="text-xs text-gray-400 mt-1">Auto-generated</p>
            </div>
            <div>
              <label className="text-sm font-medium">Linked Contract</label>
              <Select defaultValue="ct001">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ct001">CT-RE27-001 — Foundation & Structural (M/S Reliable)</SelectItem>
                  <SelectItem value="ct002">CT-RE27-002 — MEP Works (M/S PowerTech)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Status</label>
              <div className="mt-2">
                <Badge className="bg-gray-100 text-gray-600">DRAFT</Badge>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="text-sm font-medium">Contractor</label>
              <Input className="mt-1 bg-gray-50" defaultValue="M/S Reliable Construction" readOnly />
              <p className="text-xs text-gray-400 mt-1">Auto-filled from contract</p>
            </div>
            <div className="col-span-2">
              <label className="text-sm font-medium">Scope Description</label>
              <Input
                className="mt-1"
                defaultValue="Tower A — Structural work from Ground Floor to 4th Floor including columns, beams, slabs, staircase, and shear walls"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Work Items Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <HardHat className="h-4 w-4" /> Work Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>WBS Code</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead className="text-right">Qty</TableHead>
                <TableHead className="text-right">Rate (BDT)</TableHead>
                <TableHead className="text-right">Amount (BDT)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workItems.map((item) => (
                <TableRow key={item.wbs}>
                  <TableCell className="font-mono text-sm">{item.wbs}</TableCell>
                  <TableCell className="font-medium">{item.activity}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell className="text-right">{formatNumber(item.qty)}</TableCell>
                  <TableCell className="text-right">{formatNumber(item.rate)}</TableCell>
                  <TableCell className="text-right font-semibold">{formatBDT(item.amount)}</TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-gray-50 font-bold">
                <TableCell colSpan={5} className="text-right">
                  Total WO Value
                </TableCell>
                <TableCell className="text-right text-teal-700">
                  {formatBDT(woTotal)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="mt-3 text-sm text-gray-500 flex justify-between">
            <span>Contract Value: {formatBDT(142640000)}</span>
            <span>This WO: {((woTotal / 142640000) * 100).toFixed(1)}% of contract</span>
          </div>
        </CardContent>
      </Card>

      {/* Schedule & Milestones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Start Date</label>
              <Input type="date" className="mt-1" defaultValue="2026-09-01" />
            </div>
            <div>
              <label className="text-sm font-medium">End Date</label>
              <Input type="date" className="mt-1" defaultValue="2027-02-28" />
            </div>
            <div>
              <label className="text-sm font-medium">Duration</label>
              <Input className="mt-1 bg-gray-50" defaultValue="6 months" readOnly />
            </div>
            <Separator />
            <div>
              <label className="text-sm font-medium">Site Instructions</label>
              <Textarea
                className="mt-1"
                rows={4}
                defaultValue={`1. Maintain minimum 28-day curing for all RCC elements.\n2. Cube test mandatory at every 50 CUM of concrete.\n3. No concreting during heavy rain without protective measures.\n4. Steel lap length as per structural drawing — no deviation allowed.`}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Milestones</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Milestone</TableHead>
                  <TableHead>Target Date</TableHead>
                  <TableHead>Deliverable</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {milestones.map((m, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{m.name}</TableCell>
                    <TableCell className="text-sm">{m.targetDate}</TableCell>
                    <TableCell className="text-sm text-gray-600">{m.deliverable}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Authorization */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <UserCheck className="h-4 w-4" /> Authorization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Issued By</label>
              <Input className="mt-1" defaultValue="Eng. Kamal Hossain — Project Manager" />
            </div>
            <div>
              <label className="text-sm font-medium">Approved By</label>
              <Input className="mt-1" defaultValue="Mr. Shafiqul Islam — Director (Projects)" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="text-sm font-medium">Issue Date</label>
              <Input type="date" className="mt-1" defaultValue="2026-08-25" />
            </div>
            <div>
              <label className="text-sm font-medium">Approval Date</label>
              <Input type="date" className="mt-1" defaultValue="2026-08-28" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <Link
          href="/real-estate/tender"
          className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent"
        >
          Cancel
        </Link>
        <div className="flex gap-3">
          <Button variant="outline">Save as Draft</Button>
          <Button className="bg-teal-600 hover:bg-teal-700 text-white">
            <ClipboardList className="h-4 w-4 mr-2" />
            Issue Work Order
          </Button>
        </div>
      </div>
    </div>
  );
}
