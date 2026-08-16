"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import {
  ShieldCheck, ArrowRight, AlertTriangle, CheckCircle2, XCircle, RotateCcw, Clock,
} from "lucide-react";

const workflows = [
  {
    docType: "BOQ",
    description: "Bill of Quantities approval",
    steps: [
      { role: "Site Engineer", canApprove: true, canReject: false, canReturn: true, slaHours: 24, escalation: "QS Manager" },
      { role: "QS Manager", canApprove: true, canReject: true, canReturn: true, slaHours: 48, escalation: "Project Manager" },
      { role: "Project Manager", canApprove: true, canReject: true, canReturn: true, slaHours: 48, escalation: "Finance Head" },
      { role: "Finance Head", canApprove: true, canReject: true, canReturn: false, slaHours: 72, escalation: "Managing Director" },
      { role: "Managing Director", canApprove: true, canReject: true, canReturn: false, slaHours: 72, escalation: "—" },
    ],
  },
  {
    docType: "Variation Order",
    description: "Change order / scope variation approval",
    steps: [
      { role: "Site Engineer", canApprove: true, canReject: false, canReturn: true, slaHours: 24, escalation: "Project Manager" },
      { role: "Project Manager", canApprove: true, canReject: true, canReturn: true, slaHours: 48, escalation: "Finance Head" },
      { role: "Finance Head", canApprove: true, canReject: true, canReturn: false, slaHours: 48, escalation: "Managing Director" },
      { role: "Managing Director", canApprove: true, canReject: true, canReturn: false, slaHours: 72, escalation: "Board" },
    ],
  },
  {
    docType: "Running Bill",
    description: "Contractor payment bill approval",
    steps: [
      { role: "Site Engineer", canApprove: true, canReject: false, canReturn: true, slaHours: 24, escalation: "QS Manager" },
      { role: "QS Manager", canApprove: true, canReject: true, canReturn: true, slaHours: 48, escalation: "Project Manager" },
      { role: "Project Manager", canApprove: true, canReject: true, canReturn: true, slaHours: 48, escalation: "Finance Head" },
      { role: "Finance Head", canApprove: true, canReject: true, canReturn: false, slaHours: 24, escalation: "Managing Director" },
    ],
  },
  {
    docType: "Material Requisition",
    description: "Site material request approval",
    steps: [
      { role: "Site Engineer", canApprove: true, canReject: false, canReturn: false, slaHours: 12, escalation: "Project Manager" },
      { role: "Project Manager", canApprove: true, canReject: true, canReturn: true, slaHours: 24, escalation: "Procurement Head" },
      { role: "Procurement Head", canApprove: true, canReject: true, canReturn: false, slaHours: 24, escalation: "Finance Head" },
    ],
  },
  {
    docType: "Booking Discount",
    description: "Special discount on unit booking",
    steps: [
      { role: "Sales Manager", canApprove: true, canReject: true, canReturn: false, slaHours: 24, escalation: "Sales Head" },
      { role: "Sales Head", canApprove: true, canReject: true, canReturn: false, slaHours: 48, escalation: "Managing Director" },
      { role: "Managing Director", canApprove: true, canReject: true, canReturn: false, slaHours: 72, escalation: "—" },
    ],
  },
  {
    docType: "Booking Cancellation",
    description: "Unit booking cancellation with forfeiture",
    steps: [
      { role: "Sales Manager", canApprove: true, canReject: true, canReturn: true, slaHours: 24, escalation: "Sales Head" },
      { role: "Finance Head", canApprove: true, canReject: true, canReturn: false, slaHours: 48, escalation: "Managing Director" },
      { role: "Managing Director", canApprove: true, canReject: true, canReturn: false, slaHours: 72, escalation: "—" },
    ],
  },
  {
    docType: "Project Closure",
    description: "Final project closure and P&L settlement",
    steps: [
      { role: "Project Manager", canApprove: true, canReject: false, canReturn: false, slaHours: 48, escalation: "Finance Head" },
      { role: "Finance Head", canApprove: true, canReject: true, canReturn: true, slaHours: 72, escalation: "Managing Director" },
      { role: "Managing Director", canApprove: true, canReject: true, canReturn: false, slaHours: 72, escalation: "Board" },
      { role: "Board", canApprove: true, canReject: true, canReturn: false, slaHours: 168, escalation: "—" },
    ],
  },
];

const conditionalRules = [
  { condition: "Discount > 5%", action: "Requires Managing Director approval", appliesTo: "Booking Discount" },
  { condition: "Discount > 10%", action: "Requires Board approval", appliesTo: "Booking Discount" },
  { condition: "Variation Order > BDT 50 Lakh", action: "Requires Managing Director approval", appliesTo: "Variation Order" },
  { condition: "Variation Order > BDT 5 Crore", action: "Requires Board approval", appliesTo: "Variation Order" },
  { condition: "Running Bill > BDT 1 Crore", action: "Requires Managing Director approval", appliesTo: "Running Bill" },
  { condition: "Material Requisition > BDT 10 Lakh", action: "Requires Finance Head approval", appliesTo: "Material Requisition" },
  { condition: "Cancellation Forfeiture < Standard Rate", action: "Requires Managing Director approval", appliesTo: "Booking Cancellation" },
];

export default function ApprovalWorkflowsPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-7 w-7 text-purple-600" />
          <h1 className="text-2xl font-bold">Approval Workflow Templates</h1>
        </div>
        <p className="text-muted-foreground mt-1">Multi-step approval chains with SLA tracking and escalation rules</p>
      </div>

      {/* Workflow Cards */}
      {workflows.map((wf) => (
        <Card key={wf.docType}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">{wf.docType}</CardTitle>
              <Badge variant="secondary">{wf.steps.length} Steps</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{wf.description}</p>
          </CardHeader>
          <CardContent>
            {/* Visual Step Flow */}
            <div className="flex items-center flex-wrap gap-2 mb-4">
              {wf.steps.map((step, i) => (
                <div key={step.role} className="flex items-center gap-2">
                  <div className="border rounded-lg px-3 py-1.5 bg-slate-50">
                    <span className="text-xs font-medium">{step.role}</span>
                  </div>
                  {i < wf.steps.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
                </div>
              ))}
            </div>

            {/* Step Details Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Step</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-center">Approve</TableHead>
                  <TableHead className="text-center">Reject</TableHead>
                  <TableHead className="text-center">Return</TableHead>
                  <TableHead className="text-right">SLA</TableHead>
                  <TableHead>Escalation To</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {wf.steps.map((step, i) => (
                  <TableRow key={step.role}>
                    <TableCell className="font-medium">{i + 1}</TableCell>
                    <TableCell className="font-medium">{step.role}</TableCell>
                    <TableCell className="text-center">
                      {step.canApprove ? <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" /> : <XCircle className="h-4 w-4 text-muted-foreground mx-auto" />}
                    </TableCell>
                    <TableCell className="text-center">
                      {step.canReject ? <XCircle className="h-4 w-4 text-red-500 mx-auto" /> : <span className="text-muted-foreground text-xs">—</span>}
                    </TableCell>
                    <TableCell className="text-center">
                      {step.canReturn ? <RotateCcw className="h-4 w-4 text-amber-500 mx-auto" /> : <span className="text-muted-foreground text-xs">—</span>}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{step.slaHours}h</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{step.escalation}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}

      {/* Conditional Rules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" /> Conditional Approval Rules
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Additional approvals triggered when specific thresholds are exceeded
          </p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Condition</TableHead>
                <TableHead>Required Action</TableHead>
                <TableHead>Applies To</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {conditionalRules.map((rule, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Badge variant="outline" className="font-mono text-xs">{rule.condition}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{rule.action}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{rule.appliesTo}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Info */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardContent className="pt-4">
          <p className="text-sm text-blue-800">
            <strong>SLA Enforcement:</strong> When a step exceeds its SLA, the system automatically escalates to the
            designated escalation contact. All approval actions are audit-logged with timestamp, user, IP address, and
            comments. Approval chains cannot be bypassed — every step must be completed in sequence.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
