"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  ShieldCheck,
  CheckCircle2,
  XCircle,
  RotateCcw,
  MessageSquare,
  History,
  Lock,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";

const boqSummary = {
  project: "ABC Nasirabad Heights",
  projectCode: "RE-00027",
  boqVersion: "V1",
  totalItems: 45,
  totalValue: 420_000_000,
  status: "UNDER_REVIEW",
  preparedBy: "Eng. Kamal Hossain",
  preparedDate: "2026-07-10",
  lastUpdated: "2026-07-28",
};

const pipelineStages = [
  { key: "DRAFT", label: "Draft", done: true },
  { key: "UNDER_REVIEW", label: "Under Review", current: true },
  { key: "APPROVED", label: "Approved", done: false },
  { key: "LOCKED", label: "Locked (Baseline)", done: false },
];

const reviewerComments = [
  {
    id: 1,
    date: "2026-07-25",
    name: "Eng. Rafiq Ahmed",
    role: "Structural Engineer",
    comment:
      "Steel rebar rates seem 8% above current market. Recommend re-quoting from at least 3 suppliers before approval.",
  },
  {
    id: 2,
    date: "2026-07-26",
    name: "Mr. Shahidul Islam",
    role: "Procurement Head",
    comment:
      "Cement rate is aligned with our last PO (BDT 520/bag). Sand rate needs revision — Sylhet sand is now BDT 2,800/CFT, not 3,200.",
  },
  {
    id: 3,
    date: "2026-07-27",
    name: "Eng. Nusrat Jahan",
    role: "QS Manager",
    comment:
      "Formwork quantities for 3rd–10th floor look correct per structural drawings. Foundation pile quantities verified against soil report.",
  },
  {
    id: 4,
    date: "2026-07-28",
    name: "Mr. Tanvir Hasan",
    role: "Finance Controller",
    comment:
      "Total BOQ value BDT 420M is within feasibility budget of BDT 450M. Contingency of BDT 30M maintained. Financial clearance given.",
  },
];

const changeLog = [
  {
    date: "2026-07-22",
    changedBy: "Eng. Kamal Hossain",
    field: "Steel Rebar 16mm — Rate",
    oldValue: "BDT 92,000/MT",
    newValue: "BDT 88,500/MT",
  },
  {
    date: "2026-07-24",
    changedBy: "Eng. Rafiq Ahmed",
    field: "RCC Pile — Quantity",
    oldValue: "120 nos",
    newValue: "132 nos",
  },
  {
    date: "2026-07-26",
    changedBy: "Mr. Shahidul Islam",
    field: "Sylhet Sand — Rate",
    oldValue: "BDT 3,200/CFT",
    newValue: "BDT 2,800/CFT",
  },
  {
    date: "2026-07-27",
    changedBy: "Eng. Nusrat Jahan",
    field: "Formwork (Plywood) — Rate",
    oldValue: "BDT 380/SFT",
    newValue: "BDT 350/SFT",
  },
  {
    date: "2026-07-28",
    changedBy: "Mr. Tanvir Hasan",
    field: "Contingency Allowance",
    oldValue: "5%",
    newValue: "7%",
  },
];

export default function BOQApprovalPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-gray-400" />
          BOQ Approval Workflow
        </h1>
        <p className="text-gray-500">
          {boqSummary.project} — {boqSummary.boqVersion} Review & Approval
        </p>
      </div>

      {/* BOQ Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">BOQ Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-500">Project</p>
              <p className="font-semibold">{boqSummary.project}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Items</p>
              <p className="font-semibold">{boqSummary.totalItems}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Value</p>
              <p className="font-semibold text-blue-700">
                {formatBDT(boqSummary.totalValue)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Current Status</p>
              <Badge className="bg-amber-100 text-amber-800 mt-1">
                UNDER REVIEW
              </Badge>
            </div>
            <div>
              <p className="text-xs text-gray-500">Prepared By</p>
              <p className="text-sm">{boqSummary.preparedBy}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Prepared Date</p>
              <p className="text-sm">{boqSummary.preparedDate}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Last Updated</p>
              <p className="text-sm">{boqSummary.lastUpdated}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Version</p>
              <p className="text-sm">{boqSummary.boqVersion}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Approval Pipeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Approval Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            {pipelineStages.map((stage, idx) => (
              <div key={stage.key} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                      stage.done
                        ? "bg-emerald-100 border-emerald-500 text-emerald-700"
                        : stage.current
                        ? "bg-amber-100 border-amber-500 text-amber-700 ring-4 ring-amber-100"
                        : "bg-gray-50 border-gray-300 text-gray-400"
                    }`}
                  >
                    {stage.done ? (
                      <CheckCircle2 className="h-6 w-6" />
                    ) : stage.current ? (
                      <RotateCcw className="h-5 w-5 animate-spin" />
                    ) : stage.key === "LOCKED" ? (
                      <Lock className="h-5 w-5" />
                    ) : (
                      <div className="w-3 h-3 rounded-full bg-gray-300" />
                    )}
                  </div>
                  <p
                    className={`text-xs mt-2 font-medium ${
                      stage.done
                        ? "text-emerald-700"
                        : stage.current
                        ? "text-amber-700"
                        : "text-gray-400"
                    }`}
                  >
                    {stage.label}
                  </p>
                </div>
                {idx < pipelineStages.length - 1 && (
                  <ArrowRight
                    className={`h-5 w-5 mx-1 shrink-0 ${
                      stage.done ? "text-emerald-400" : "text-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reviewer Comments */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Reviewer Comments
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {reviewerComments.map((c) => (
            <div
              key={c.id}
              className="border rounded-lg p-4 bg-gray-50 space-y-1"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-sm">{c.name}</p>
                  <Badge variant="outline" className="text-xs">
                    {c.role}
                  </Badge>
                </div>
                <p className="text-xs text-gray-400">{c.date}</p>
              </div>
              <p className="text-sm text-gray-700">{c.comment}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Approval Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Approval Decision</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Add your review comments before taking action..."
            rows={3}
          />
          <div className="flex items-center gap-3">
            <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Approve BOQ
            </Button>
            <Button variant="destructive" className="gap-2">
              <XCircle className="h-4 w-4" />
              Reject
            </Button>
            <Button variant="outline" className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Request Changes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Change Log */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <History className="h-4 w-4" />
            Change Log
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Changed By</TableHead>
                <TableHead>Field</TableHead>
                <TableHead>Old Value</TableHead>
                <TableHead>New Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {changeLog.map((entry, idx) => (
                <TableRow key={idx}>
                  <TableCell className="text-sm">{entry.date}</TableCell>
                  <TableCell className="text-sm">{entry.changedBy}</TableCell>
                  <TableCell className="text-sm font-medium">
                    {entry.field}
                  </TableCell>
                  <TableCell className="text-sm text-red-600">
                    {entry.oldValue}
                  </TableCell>
                  <TableCell className="text-sm text-emerald-600">
                    {entry.newValue}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Important Note */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
        <div className="text-sm">
          <p className="font-medium text-amber-800">Baseline Lock Notice</p>
          <p className="text-amber-700">
            Once approved and locked, this BOQ becomes the cost baseline for the
            project. Any subsequent changes will require a formal Variation Order
            (VO) with full audit trail and re-approval.
          </p>
        </div>
      </div>
    </div>
  );
}
