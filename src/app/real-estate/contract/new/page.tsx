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
  FileSignature,
  Building2,
  BookOpen,
  Calendar,
  ClipboardList,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

const boqItems = [
  { code: "BOQ-F-01", description: "Pile Foundation (RCC Bored Pile)", unit: "RM", qty: 2400, rate: 3200, amount: 7680000 },
  { code: "BOQ-F-02", description: "Pile Cap & Grade Beam", unit: "CUM", qty: 180, rate: 12500, amount: 2250000 },
  { code: "BOQ-S-01", description: "Column (RCC M25)", unit: "CUM", qty: 420, rate: 14500, amount: 6090000 },
  { code: "BOQ-S-02", description: "Beam (RCC M25)", unit: "CUM", qty: 650, rate: 13800, amount: 8970000 },
  { code: "BOQ-S-03", description: "Slab (RCC M20)", unit: "CUM", qty: 1200, rate: 11500, amount: 13800000 },
  { code: "BOQ-S-04", description: "Staircase (RCC)", unit: "CUM", qty: 85, rate: 15000, amount: 1275000 },
  { code: "BOQ-S-05", description: "Shear Wall", unit: "CUM", qty: 320, rate: 16500, amount: 5280000 },
  { code: "BOQ-EW-01", description: "Brickwork (250mm)", unit: "SQM", qty: 4500, rate: 1850, amount: 8325000 },
  { code: "BOQ-EW-02", description: "Plastering (Internal & External)", unit: "SQM", qty: 12000, rate: 450, amount: 5400000 },
  { code: "BOQ-MS-01", description: "Reinforcement Steel (60 Grade)", unit: "MT", qty: 580, rate: 135000, amount: 78300000 },
  { code: "BOQ-MS-02", description: "Formwork (Steel + Plywood)", unit: "SQM", qty: 8500, rate: 620, amount: 5270000 },
];

const contractTotal = boqItems.reduce((s, i) => s + i.amount, 0);

const paymentMilestones = [
  { milestone: "Foundation Complete", percentage: 15, amount: contractTotal * 0.15 },
  { milestone: "Structure — 4th Floor", percentage: 20, amount: contractTotal * 0.20 },
  { milestone: "Structure — 8th Floor", percentage: 20, amount: contractTotal * 0.20 },
  { milestone: "Structure — 12th Floor", percentage: 20, amount: contractTotal * 0.20 },
  { milestone: "Brickwork & Plastering", percentage: 15, amount: contractTotal * 0.15 },
  { milestone: "Final Completion", percentage: 10, amount: contractTotal * 0.10 },
];

export default function ContractEntryPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/real-estate/tender"
          className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2"
        >
          <ArrowLeft className="h-3 w-3" /> Back to Tenders
        </Link>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FileSignature className="h-6 w-6 text-indigo-600" />
          Contract Entry
        </h1>
        <p className="text-gray-500">
          Create contract from awarded tender — ABC Properties Ltd
        </p>
      </div>

      {/* Contract Header */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Building2 className="h-4 w-4" /> Contract Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Contract Code</label>
              <Input className="mt-1 bg-gray-50" defaultValue="CT-RE27-001" readOnly />
              <p className="text-xs text-gray-400 mt-1">Auto-generated</p>
            </div>
            <div>
              <label className="text-sm font-medium">Project</label>
              <Select defaultValue="re27">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="re27">ABC Nasirabad Heights (RE-00027)</SelectItem>
                  <SelectItem value="re31">Bay View Residence (RE-00031)</SelectItem>
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
              <label className="text-sm font-medium">Linked Tender</label>
              <Select defaultValue="tnd001">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tnd001">TND-RE27-001 — Foundation & Structural Works</SelectItem>
                  <SelectItem value="tnd002">TND-RE27-002 — MEP Works</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Contractor</label>
              <Input className="mt-1 bg-gray-50" defaultValue="M/S Reliable Construction" readOnly />
              <p className="text-xs text-gray-400 mt-1">Auto-filled from tender award</p>
            </div>
            <div>
              <label className="text-sm font-medium">Contract Type</label>
              <Select defaultValue="item_rate">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="item_rate">Item Rate</SelectItem>
                  <SelectItem value="lump_sum">Lump Sum</SelectItem>
                  <SelectItem value="cost_plus">Cost Plus</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-4">
            <label className="text-sm font-medium">Contract Value</label>
            <p className="text-2xl font-bold text-indigo-700 mt-1">
              {formatBDT(142640000)}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Contract Terms */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="h-4 w-4" /> Contract Terms
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Start Date</label>
              <Input type="date" className="mt-1" defaultValue="2026-09-01" />
            </div>
            <div>
              <label className="text-sm font-medium">End Date</label>
              <Input type="date" className="mt-1" defaultValue="2028-02-28" />
            </div>
            <div>
              <label className="text-sm font-medium">Duration</label>
              <Input className="mt-1 bg-gray-50" defaultValue="18 months" readOnly />
            </div>
            <div>
              <label className="text-sm font-medium">Retention (%)</label>
              <Input type="number" className="mt-1" defaultValue={10} min={0} max={20} />
            </div>
            <div>
              <label className="text-sm font-medium">Performance Security (%)</label>
              <Input type="number" className="mt-1" defaultValue={5} min={0} max={15} />
            </div>
            <div>
              <label className="text-sm font-medium">Defect Liability (months)</label>
              <Input type="number" className="mt-1" defaultValue={12} min={6} max={36} />
            </div>
            <div>
              <label className="text-sm font-medium">LD Rate (% per week delay)</label>
              <Input type="number" className="mt-1" defaultValue={0.5} step={0.1} min={0} max={5} />
            </div>
            <div>
              <label className="text-sm font-medium">Max LD Cap (%)</label>
              <Input type="number" className="mt-1" defaultValue={10} min={0} max={20} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* BOQ Scope */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <ClipboardList className="h-4 w-4" /> Scope — BOQ Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>BOQ Code</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead className="text-right">Qty</TableHead>
                <TableHead className="text-right">Rate (BDT)</TableHead>
                <TableHead className="text-right">Amount (BDT)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {boqItems.map((item) => (
                <TableRow key={item.code}>
                  <TableCell className="font-mono text-sm">{item.code}</TableCell>
                  <TableCell className="font-medium">{item.description}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell className="text-right">{formatNumber(item.qty)}</TableCell>
                  <TableCell className="text-right">{formatNumber(item.rate)}</TableCell>
                  <TableCell className="text-right font-semibold">{formatBDT(item.amount)}</TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-gray-50 font-bold">
                <TableCell colSpan={5} className="text-right">
                  Contract Total
                </TableCell>
                <TableCell className="text-right text-indigo-700">
                  {formatBDT(contractTotal)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Payment Terms */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Payment Terms — Milestone Based</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <label className="text-sm font-medium">Payment Mode</label>
            <Select defaultValue="milestone">
              <SelectTrigger className="mt-1 w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="milestone">Milestone Based</SelectItem>
                <SelectItem value="monthly">Monthly Measurement</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Milestone</TableHead>
                <TableHead className="text-right">Percentage (%)</TableHead>
                <TableHead className="text-right">Amount (BDT)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentMilestones.map((m, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{m.milestone}</TableCell>
                  <TableCell className="text-right">{m.percentage}%</TableCell>
                  <TableCell className="text-right">{formatBDT(m.amount)}</TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-gray-50 font-bold">
                <TableCell>Total</TableCell>
                <TableCell className="text-right">100%</TableCell>
                <TableCell className="text-right">{formatBDT(contractTotal)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Special Conditions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Special Conditions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            rows={4}
            defaultValue={`1. All materials to be approved by the Project Engineer before procurement.\n2. Contractor shall maintain daily work log and submit weekly progress reports.\n3. Safety equipment mandatory for all workers on site.\n4. Any deviation from approved drawings requires written Change Request.`}
          />
          <Separator />
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
            <p className="text-sm font-semibold text-blue-800 flex items-center gap-2">
              <BookOpen className="h-4 w-4" /> GL Posting Note
            </p>
            <p className="text-sm text-blue-700 mt-1">
              On Running Bill posting:{" "}
              <span className="font-mono">
                DR Work-in-Progress (WIP) / CR Accounts Payable + Retention Payable + TDS Payable
              </span>
            </p>
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
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <FileSignature className="h-4 w-4 mr-2" />
            Create Contract
          </Button>
        </div>
      </div>
    </div>
  );
}
