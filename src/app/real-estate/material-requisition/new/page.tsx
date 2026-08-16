"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  ClipboardList,
  Plus,
  Send,
  Save,
  AlertTriangle,
  Info,
} from "lucide-react";

const mrItems = [
  {
    id: 1,
    item: "MS Rod 16mm (Grade 500W)",
    boqLine: "STR-001",
    boqQty: 85,
    alreadyIssued: 32,
    storeAvailable: 18,
    requestedQty: 25,
    uom: "MT",
    estimatedRate: 88_500,
    get estimatedCost() {
      return this.requestedQty * this.estimatedRate;
    },
  },
  {
    id: 2,
    item: "OPC Cement (Shah Brand)",
    boqLine: "STR-004",
    boqQty: 12_000,
    alreadyIssued: 4_800,
    storeAvailable: 600,
    requestedQty: 1_500,
    uom: "Bag",
    estimatedRate: 520,
    get estimatedCost() {
      return this.requestedQty * this.estimatedRate;
    },
  },
  {
    id: 3,
    item: "Sylhet Sand (Coarse)",
    boqLine: "STR-006",
    boqQty: 3_200,
    alreadyIssued: 1_100,
    storeAvailable: 250,
    requestedQty: 500,
    uom: "CFT",
    estimatedRate: 2_800,
    get estimatedCost() {
      return this.requestedQty * this.estimatedRate;
    },
  },
  {
    id: 4,
    item: "Stone Aggregate 20mm",
    boqLine: "STR-007",
    boqQty: 4_500,
    alreadyIssued: 1_600,
    storeAvailable: 320,
    requestedQty: 800,
    uom: "CFT",
    estimatedRate: 3_500,
    get estimatedCost() {
      return this.requestedQty * this.estimatedRate;
    },
  },
];

const totalEstimatedCost = mrItems.reduce(
  (s, i) => s + i.requestedQty * i.estimatedRate,
  0
);

export default function NewMaterialRequisitionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <ClipboardList className="h-6 w-6 text-gray-400" />
          Create Material Requisition
        </h1>
        <p className="text-gray-500">
          Request materials from BOQ for site consumption
        </p>
      </div>

      {/* MR Header Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Requisition Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">
                MR Code
              </label>
              <Input value="MR-RE27-003" disabled className="bg-gray-50" />
              <p className="text-xs text-gray-400 mt-1">Auto-generated</p>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">
                Project
              </label>
              <Select defaultValue="RE-00027">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="RE-00027">
                    ABC Nasirabad Heights
                  </SelectItem>
                  <SelectItem value="RE-00031">Bay View Residence</SelectItem>
                  <SelectItem value="RE-00045">
                    Halishahar Commercial
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">
                WBS Node
              </label>
              <Select defaultValue="str-3f">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fnd">
                    1.0 Foundation
                  </SelectItem>
                  <SelectItem value="str-gf">
                    2.1 Structure — Ground Floor
                  </SelectItem>
                  <SelectItem value="str-1f">
                    2.2 Structure — 1st Floor
                  </SelectItem>
                  <SelectItem value="str-2f">
                    2.3 Structure — 2nd Floor
                  </SelectItem>
                  <SelectItem value="str-3f">
                    2.4 Structure — 3rd Floor
                  </SelectItem>
                  <SelectItem value="fin">
                    3.0 Finishing
                  </SelectItem>
                  <SelectItem value="mep">
                    4.0 MEP
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">
                Required Date
              </label>
              <Input type="date" defaultValue="2026-08-20" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">
                Priority
              </label>
              <Select defaultValue="normal">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">
                Requested By
              </label>
              <Input value="Eng. Kamal Hossain" disabled className="bg-gray-50" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Items Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Requisition Items</CardTitle>
          <Button variant="outline" size="sm" className="gap-1">
            <Plus className="h-4 w-4" />
            Add Row
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[220px]">Item</TableHead>
                <TableHead>BOQ Line</TableHead>
                <TableHead className="text-right">BOQ Qty</TableHead>
                <TableHead className="text-right">Already Issued</TableHead>
                <TableHead className="text-right">Store Avail.</TableHead>
                <TableHead className="text-right">Requested Qty</TableHead>
                <TableHead>UOM</TableHead>
                <TableHead className="text-right">Est. Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mrItems.map((item) => {
                const remaining = item.boqQty - item.alreadyIssued;
                const overBOQ = item.requestedQty > remaining;
                return (
                  <TableRow key={item.id}>
                    <TableCell className="text-sm font-medium">
                      {item.item}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {item.boqLine}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-sm">
                      {formatNumber(item.boqQty)}
                    </TableCell>
                    <TableCell className="text-right text-sm">
                      {formatNumber(item.alreadyIssued)}
                    </TableCell>
                    <TableCell className="text-right text-sm">
                      <span
                        className={
                          item.storeAvailable < item.requestedQty
                            ? "text-amber-600 font-medium"
                            : ""
                        }
                      >
                        {formatNumber(item.storeAvailable)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Input
                          className="w-20 text-right text-sm h-8"
                          defaultValue={item.requestedQty}
                        />
                        {overBOQ && (
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{item.uom}</TableCell>
                    <TableCell className="text-right text-sm font-medium">
                      {formatBDT(item.requestedQty * item.estimatedRate)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {/* Running Total */}
          <div className="flex justify-end mt-4 border-t pt-4">
            <div className="text-right">
              <p className="text-xs text-gray-500">Estimated Total Cost</p>
              <p className="text-xl font-bold text-blue-700">
                {formatBDT(totalEstimatedCost)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Justification */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Justification</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Describe why these materials are needed, reference work schedule or activity..."
            rows={3}
            defaultValue="Materials required for 3rd floor slab casting scheduled for 25-Aug-2026. Steel rod and cement must arrive by 20-Aug for pre-binding work. Current store stock insufficient for full slab pour."
          />
        </CardContent>
      </Card>

      {/* Info Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <Info className="h-5 w-5 text-blue-600 mt-0.5" />
        <div className="text-sm">
          <p className="font-medium text-blue-800">Workflow</p>
          <p className="text-blue-600">
            After PM approval, this MR will be routed to Procurement for PO
            creation or to the Store for direct issue (if stock is available).
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <Button className="gap-2">
          <Send className="h-4 w-4" />
          Submit for Approval
        </Button>
        <Button variant="outline" className="gap-2">
          <Save className="h-4 w-4" />
          Save as Draft
        </Button>
      </div>
    </div>
  );
}
