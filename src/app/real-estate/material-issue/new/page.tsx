"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { formatBDT, formatNumber } from "@/lib/mock-data";
import {
  PackageOpen,
  Truck,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Send,
  Save,
} from "lucide-react";

const issueItems = [
  {
    id: 1,
    item: "MS Rod 16mm (Grade 500W)",
    mrQty: 25,
    alreadyIssued: 0,
    thisIssueQty: 18,
    uom: "MT",
    unitCost: 88_500,
    currentStock: 18,
    lotNo: "LOT-STL-2026-07-14",
  },
  {
    id: 2,
    item: "OPC Cement (Shah Brand)",
    mrQty: 1_500,
    alreadyIssued: 0,
    thisIssueQty: 600,
    uom: "Bag",
    unitCost: 520,
    currentStock: 600,
    lotNo: "LOT-CEM-2026-07-22",
  },
  {
    id: 3,
    item: "Sylhet Sand (Coarse)",
    mrQty: 500,
    alreadyIssued: 0,
    thisIssueQty: 250,
    uom: "CFT",
    unitCost: 2_800,
    currentStock: 250,
    lotNo: "",
  },
  {
    id: 4,
    item: "Stone Aggregate 20mm",
    mrQty: 800,
    alreadyIssued: 0,
    thisIssueQty: 320,
    uom: "CFT",
    unitCost: 3_500,
    currentStock: 320,
    lotNo: "",
  },
];

const totalIssueValue = issueItems.reduce(
  (s, i) => s + i.thisIssueQty * i.unitCost,
  0
);

export default function NewMaterialIssuePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <PackageOpen className="h-6 w-6 text-gray-400" />
          Material Issue
        </h1>
        <p className="text-gray-500">
          Issue materials from store against approved MR
        </p>
      </div>

      {/* Issue Header */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Issue Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">
                Issue Code
              </label>
              <Input value="MI-RE27-005" disabled className="bg-gray-50" />
              <p className="text-xs text-gray-400 mt-1">Auto-generated</p>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">
                From Store
              </label>
              <Input
                value="Main Store — Nasirabad Site"
                disabled
                className="bg-gray-50"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">
                Against MR
              </label>
              <Select defaultValue="mr-001">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mr-001">
                    MR-RE27-001 (Approved)
                  </SelectItem>
                  <SelectItem value="mr-002">
                    MR-RE27-002 (Approved)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">
                Project
              </label>
              <Input
                value="ABC Nasirabad Heights"
                disabled
                className="bg-gray-50"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">
                WBS Node
              </label>
              <Input
                value="2.4 Structure — 3rd Floor"
                disabled
                className="bg-gray-50"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">
                Issue Date
              </label>
              <Input type="date" defaultValue="2026-08-12" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Items Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Issue Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Item</TableHead>
                <TableHead className="text-right">MR Qty</TableHead>
                <TableHead className="text-right">Already Issued</TableHead>
                <TableHead className="text-right">This Issue</TableHead>
                <TableHead>UOM</TableHead>
                <TableHead className="text-right">Unit Cost</TableHead>
                <TableHead className="text-right">Total Cost</TableHead>
                <TableHead className="text-right">Stock After</TableHead>
                <TableHead>Lot/Batch</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {issueItems.map((item) => {
                const stockAfter = item.currentStock - item.thisIssueQty;
                const stockWarning = stockAfter <= 0;
                return (
                  <TableRow key={item.id}>
                    <TableCell className="text-sm font-medium">
                      {item.item}
                    </TableCell>
                    <TableCell className="text-right text-sm">
                      {formatNumber(item.mrQty)}
                    </TableCell>
                    <TableCell className="text-right text-sm">
                      {formatNumber(item.alreadyIssued)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Input
                        className="w-20 text-right text-sm h-8"
                        defaultValue={item.thisIssueQty}
                      />
                    </TableCell>
                    <TableCell className="text-sm">{item.uom}</TableCell>
                    <TableCell className="text-right text-sm">
                      {formatBDT(item.unitCost)}
                    </TableCell>
                    <TableCell className="text-right text-sm font-medium">
                      {formatBDT(item.thisIssueQty * item.unitCost)}
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={`text-sm font-medium ${
                          stockWarning
                            ? "text-red-600"
                            : stockAfter < 50
                            ? "text-amber-600"
                            : "text-emerald-600"
                        }`}
                      >
                        {formatNumber(stockAfter)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Input
                        className="w-36 text-xs h-8"
                        defaultValue={item.lotNo}
                        placeholder="Optional"
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Gate Pass Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Truck className="h-4 w-4" />
            Gate Pass
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">
                Vehicle No
              </label>
              <Input placeholder="e.g. CTG-MA-12-3456" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">
                Driver Name
              </label>
              <Input placeholder="Driver name" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">
                Gate Pass No
              </label>
              <Input value="GP-2026-0812-001" disabled className="bg-gray-50" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* GL Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">GL Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-100 text-blue-800">DR</Badge>
                <span className="text-sm">
                  Construction WIP — 2.4 Structure 3rd Floor
                </span>
              </div>
              <span className="text-sm font-semibold">
                {formatBDT(totalIssueValue)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge className="bg-emerald-100 text-emerald-800">CR</Badge>
                <span className="text-sm">
                  Inventory — Main Store (Nasirabad Site)
                </span>
              </div>
              <span className="text-sm font-semibold">
                {formatBDT(totalIssueValue)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary & Warnings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Issue Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-500">Total Items</p>
              <p className="text-2xl font-bold">{issueItems.length}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Issue Value</p>
              <p className="text-2xl font-bold text-blue-700">
                {formatBDT(totalIssueValue)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Stock Adequacy</p>
              <div className="flex items-center gap-1 mt-1">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <span className="text-sm font-medium text-emerald-700">
                  All items in stock
                </span>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500">Zero-Stock After Issue</p>
              <div className="flex items-center gap-1 mt-1">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-medium text-amber-700">
                  2 items will reach zero
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <Button className="gap-2">
          <Send className="h-4 w-4" />
          Confirm Issue
        </Button>
        <Button variant="outline" className="gap-2">
          <Save className="h-4 w-4" />
          Save Draft
        </Button>
      </div>
    </div>
  );
}
