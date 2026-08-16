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
  GitPullRequest,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Clock,
  ArrowLeft,
  FileCheck,
} from "lucide-react";
import Link from "next/link";

const costImpactItems = [
  { item: "Additional Lift Shaft — RCC Structure", qty: 1, unit: "LS", rate: 3200000, amount: 3200000 },
  { item: "Lift Pit Excavation & Foundation", qty: 1, unit: "LS", rate: 850000, amount: 850000 },
  { item: "Machine Room Construction", qty: 1, unit: "LS", rate: 1200000, amount: 1200000 },
  { item: "Electrical Wiring & Panel for Lift", qty: 1, unit: "LS", rate: 450000, amount: 450000 },
  { item: "Architectural Modification (Lobby)", qty: 12, unit: "Floor", rate: 125000, amount: 1500000 },
];

const costImpactTotal = costImpactItems.reduce((s, i) => s + i.amount, 0);

const budgetComparison = {
  originalBudget: 700000000,
  voAmount: costImpactTotal,
  revisedBudget: 700000000 + costImpactTotal,
};

const approvalSteps = [
  { step: "Submitted", by: "Eng. Kamal Hossain", date: "2026-08-10", status: "DONE" },
  { step: "Technical Review", by: "Eng. Rafiq Ahmed", date: "2026-08-11", status: "DONE" },
  { step: "Cost Verification", by: "Mr. Anwar Hossain (QS)", date: "2026-08-12", status: "IN_PROGRESS" },
  { step: "Approved / Rejected", by: "Mr. Shafiqul Islam (Director)", date: "—", status: "PENDING" },
];

const stepStatusColors: Record<string, string> = {
  DONE: "bg-emerald-100 text-emerald-800",
  IN_PROGRESS: "bg-blue-100 text-blue-800",
  PENDING: "bg-gray-100 text-gray-600",
};

const stepIcons: Record<string, typeof CheckCircle2> = {
  DONE: CheckCircle2,
  IN_PROGRESS: Clock,
  PENDING: Clock,
};

export default function VariationOrderPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/real-estate/tender"
          className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2"
        >
          <ArrowLeft className="h-3 w-3" /> Back to Projects
        </Link>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <GitPullRequest className="h-6 w-6 text-orange-600" />
          Change Request / Variation Order
        </h1>
        <p className="text-gray-500">
          Raise change request and process variation order — ABC Properties Ltd
        </p>
      </div>

      {/* Part 1: Change Request */}
      <div className="bg-orange-50 border-l-4 border-orange-400 p-3 rounded-r">
        <p className="font-semibold text-orange-800">Part 1 — Change Request</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-orange-500" /> Change Request Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">CR Code</label>
              <Input className="mt-1 bg-gray-50" defaultValue="CR-RE27-004" readOnly />
            </div>
            <div>
              <label className="text-sm font-medium">Project</label>
              <Input className="mt-1 bg-gray-50" defaultValue="ABC Nasirabad Heights (RE-00027)" readOnly />
            </div>
            <div>
              <label className="text-sm font-medium">Status</label>
              <div className="mt-2">
                <Badge className="bg-blue-100 text-blue-800">UNDER REVIEW</Badge>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input className="mt-1" defaultValue="Additional Lift Shaft — Tower A" />
            </div>
            <div>
              <label className="text-sm font-medium">Raised By</label>
              <Input className="mt-1" defaultValue="Eng. Kamal Hossain — Project Manager" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="text-sm font-medium">Category</label>
              <Select defaultValue="client_request">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="design_change">Design Change</SelectItem>
                  <SelectItem value="client_request">Client Request</SelectItem>
                  <SelectItem value="site_condition">Site Condition</SelectItem>
                  <SelectItem value="regulatory">Regulatory Requirement</SelectItem>
                  <SelectItem value="error">Error / Omission</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Date Raised</label>
              <Input type="date" className="mt-1" defaultValue="2026-08-10" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                className="mt-1"
                rows={3}
                defaultValue="Client (ABC Properties Ltd) has requested an additional passenger lift shaft in Tower A to improve resident convenience. The current design has 2 lifts; the request adds a 3rd lift shaft adjacent to the existing lobby area."
              />
            </div>
            <div>
              <label className="text-sm font-medium">Justification</label>
              <Textarea
                className="mt-1"
                rows={3}
                defaultValue="Market feedback indicates buildings with 3 lifts for 12+ floors have better sales velocity. The additional lift will improve unit pricing by approximately 3-5% across upper floors. ROI analysis shows net positive impact on project feasibility."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Impact Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Impact Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm font-medium mb-3">Cost Impact — Itemized</p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead className="text-right">Qty</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead className="text-right">Rate (BDT)</TableHead>
                <TableHead className="text-right">Amount (BDT)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {costImpactItems.map((item, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{item.item}</TableCell>
                  <TableCell className="text-right">{formatNumber(item.qty)}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell className="text-right">{formatBDT(item.rate)}</TableCell>
                  <TableCell className="text-right font-semibold">{formatBDT(item.amount)}</TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-gray-50 font-bold">
                <TableCell colSpan={4} className="text-right">
                  Total Cost Impact
                </TableCell>
                <TableCell className="text-right text-orange-700">
                  {formatBDT(costImpactTotal)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Separator className="my-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium mb-2">Schedule Impact</p>
              <div className="flex items-center gap-3">
                <Input type="number" className="w-24" defaultValue={45} />
                <span className="text-sm text-gray-600">additional days</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Estimated delay to overall project completion
              </p>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">BOQ Lines Affected</p>
              <div className="space-y-1 text-sm">
                <Badge variant="outline" className="mr-1">WBS-02 — Structure</Badge>
                <Badge variant="outline" className="mr-1">WBS-03 — MEP</Badge>
                <Badge variant="outline">WBS-04 — Finishing</Badge>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                New BOQ lines will be added under these WBS nodes
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Part 2: Variation Order */}
      <div className="bg-indigo-50 border-l-4 border-indigo-400 p-3 rounded-r">
        <p className="font-semibold text-indigo-800">Part 2 — Variation Order (If Approved)</p>
      </div>

      <Card className="border-indigo-200">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-indigo-700">
            <FileCheck className="h-4 w-4" /> Variation Order
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">VO Code</label>
              <Input className="mt-1 bg-gray-50" defaultValue="VO-RE27-004" readOnly />
            </div>
            <div>
              <label className="text-sm font-medium">Linked CR</label>
              <Input className="mt-1 bg-gray-50" defaultValue="CR-RE27-004" readOnly />
            </div>
            <div>
              <label className="text-sm font-medium">Approved Amount</label>
              <Input
                type="number"
                className="mt-1 font-bold"
                defaultValue={costImpactTotal}
              />
            </div>
          </div>

          <Separator className="my-4" />
          <p className="text-sm font-medium mb-3">Budget Adjustment</p>
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-gray-50">
              <CardContent className="pt-4 pb-3 text-center">
                <p className="text-lg font-bold">{formatBDT(budgetComparison.originalBudget)}</p>
                <p className="text-xs text-gray-500">Original Budget</p>
              </CardContent>
            </Card>
            <Card className="bg-orange-50">
              <CardContent className="pt-4 pb-3 text-center">
                <p className="text-lg font-bold text-orange-700">+ {formatBDT(budgetComparison.voAmount)}</p>
                <p className="text-xs text-gray-500">VO Amount</p>
              </CardContent>
            </Card>
            <Card className="bg-indigo-50">
              <CardContent className="pt-4 pb-3 text-center">
                <p className="text-lg font-bold text-indigo-700">{formatBDT(budgetComparison.revisedBudget)}</p>
                <p className="text-xs text-gray-500">Revised Budget</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Approval Chain */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Approval Chain</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {approvalSteps.map((step, i) => {
              const Icon = stepIcons[step.status];
              return (
                <div
                  key={i}
                  className={`flex items-center justify-between p-3 rounded border ${
                    step.status === "IN_PROGRESS" ? "border-blue-300 bg-blue-50" : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center justify-center h-8 w-8 rounded-full text-sm font-bold ${
                      step.status === "DONE"
                        ? "bg-emerald-100 text-emerald-700"
                        : step.status === "IN_PROGRESS"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-400"
                    }`}>
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{step.step}</p>
                      <p className="text-xs text-gray-500">{step.by}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">{step.date}</span>
                    <Badge className={stepStatusColors[step.status]}>
                      {step.status.replace("_", " ")}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* GL Note */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <BookOpen className="h-4 w-4" /> GL Note
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-indigo-50 border border-indigo-200 rounded-md p-3">
            <p className="text-sm text-indigo-800">
              Approved Variation Order increases the project budget and corresponding WBS allocation.
              The VO amount will be added to committed cost and reflected in budget vs actual tracking.
            </p>
            <p className="text-sm text-indigo-700 mt-2 font-mono">
              DR Project Budget Reserve / CR WBS Cost Allocation (per affected WBS node)
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
          <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
            Reject CR
          </Button>
          <Button className="bg-orange-600 hover:bg-orange-700 text-white">
            <GitPullRequest className="h-4 w-4 mr-2" />
            Submit for Approval
          </Button>
        </div>
      </div>
    </div>
  );
}
