"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import {
  GitBranch, ArrowRight, Info, CheckCircle2,
} from "lucide-react";

const stages = [
  {
    name: "Land Acquisition",
    code: "LAND_ACQUISITION",
    sequence: 1,
    color: "#8B5CF6",
    transitions: ["FEASIBILITY"],
    autoChecks: ["Land lead converted", "Due diligence passed", "Agreement signed"],
    allowedOps: ["Land Payments", "Pre-Dev Expenses"],
  },
  {
    name: "Feasibility",
    code: "FEASIBILITY",
    sequence: 2,
    color: "#F59E0B",
    transitions: ["PRE_CONSTRUCTION", "LAND_ACQUISITION"],
    autoChecks: ["Feasibility study created", "Financial model approved"],
    allowedOps: ["Feasibility Reports", "Cost Estimates"],
  },
  {
    name: "Pre-Construction",
    code: "PRE_CONSTRUCTION",
    sequence: 3,
    color: "#3B82F6",
    transitions: ["BOQ_ESTIMATION"],
    autoChecks: ["CDA permission obtained", "Architect plan finalized"],
    allowedOps: ["Authority Fees", "Consultant Payments"],
  },
  {
    name: "BOQ Estimation",
    code: "BOQ_ESTIMATION",
    sequence: 4,
    color: "#10B981",
    transitions: ["TENDERING"],
    autoChecks: ["BOQ approved by QS Manager", "Rate analysis complete"],
    allowedOps: ["BOQ Lines", "Rate Analysis", "WBS Setup"],
  },
  {
    name: "Tendering",
    code: "TENDERING",
    sequence: 5,
    color: "#6366F1",
    transitions: ["CONSTRUCTION"],
    autoChecks: ["At least 3 bids received", "Bid evaluation complete", "Contract awarded"],
    allowedOps: ["Tender", "Bid Evaluation", "Contract Award"],
  },
  {
    name: "Construction",
    code: "CONSTRUCTION",
    sequence: 6,
    color: "#EF4444",
    transitions: ["SALES_COLLECTION", "HANDOVER"],
    autoChecks: ["Contract signed", "Work order issued", "Site mobilized"],
    allowedOps: ["Running Bills", "Material Requisitions", "Material Issues", "DSR", "Quality Checks", "Variation Orders"],
  },
  {
    name: "Sales & Collection",
    code: "SALES_COLLECTION",
    sequence: 7,
    color: "#EC4899",
    transitions: ["HANDOVER"],
    autoChecks: ["Unit pricing finalized", "Sales team assigned"],
    allowedOps: ["Bookings", "Payment Schedules", "Collection Tracking", "Demand Notes"],
  },
  {
    name: "Handover",
    code: "HANDOVER",
    sequence: 8,
    color: "#14B8A6",
    transitions: ["DLP"],
    autoChecks: ["Construction 100%", "All snags resolved", "Buyer account cleared"],
    allowedOps: ["Inspection", "Snag List", "Key Handover", "Registration"],
  },
  {
    name: "Defect Liability Period",
    code: "DLP",
    sequence: 9,
    color: "#F97316",
    transitions: ["CLOSED"],
    autoChecks: ["Handover complete", "DLP start date recorded"],
    allowedOps: ["Defect Reports", "Warranty Claims", "Retention Release"],
  },
  {
    name: "Closed",
    code: "CLOSED",
    sequence: 10,
    color: "#6B7280",
    transitions: [],
    autoChecks: ["DLP expired", "All retentions released", "Final accounts settled", "Project P&L finalized"],
    allowedOps: ["View Only — No new transactions"],
  },
];

const transactionRules = [
  { transaction: "Running Bills", allowedStages: ["CONSTRUCTION"] },
  { transaction: "Material Requisitions", allowedStages: ["CONSTRUCTION"] },
  { transaction: "Bookings", allowedStages: ["CONSTRUCTION", "SALES_COLLECTION"] },
  { transaction: "Variation Orders", allowedStages: ["CONSTRUCTION"] },
  { transaction: "Land Payments", allowedStages: ["LAND_ACQUISITION"] },
  { transaction: "Retention Release", allowedStages: ["DLP", "CLOSED"] },
  { transaction: "Revenue Recognition", allowedStages: ["CONSTRUCTION", "SALES_COLLECTION", "HANDOVER"] },
];

export default function LifecyclePage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <div className="flex items-center gap-3">
          <GitBranch className="h-7 w-7 text-blue-600" />
          <h1 className="text-2xl font-bold">Lifecycle Stage Configuration</h1>
        </div>
        <p className="text-muted-foreground mt-1">Configure project lifecycle stages, transitions, and entry conditions</p>
      </div>

      {/* Stage Table */}
      <Card>
        <CardHeader>
          <CardTitle>Project Lifecycle Stages</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">#</TableHead>
                <TableHead>Stage Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Color</TableHead>
                <TableHead>Allowed Transitions</TableHead>
                <TableHead>Auto-Checks (Entry Conditions)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stages.map((stage) => (
                <TableRow key={stage.code}>
                  <TableCell className="font-medium">{stage.sequence}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stage.color }} />
                      <span className="font-medium">{stage.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="text-xs bg-muted px-2 py-1 rounded">{stage.code}</code>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded border" style={{ backgroundColor: stage.color }} />
                      <span className="text-xs text-muted-foreground">{stage.color}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {stage.transitions.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {stage.transitions.map((t) => (
                          <Badge key={t} variant="outline" className="text-xs">
                            <ArrowRight className="h-3 w-3 mr-1" /> {t}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">Terminal stage</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {stage.autoChecks.map((check, i) => (
                        <div key={i} className="flex items-center gap-1 text-xs text-muted-foreground">
                          <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                          {check}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Stage Flow Visual */}
      <Card>
        <CardHeader>
          <CardTitle>Stage Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center flex-wrap gap-2">
            {stages.map((stage, i) => (
              <div key={stage.code} className="flex items-center gap-2">
                <div
                  className="px-3 py-1.5 rounded-full text-white text-xs font-medium"
                  style={{ backgroundColor: stage.color }}
                >
                  {stage.sequence}. {stage.name}
                </div>
                {i < stages.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Allowed Operations per Stage */}
      <Card>
        <CardHeader>
          <CardTitle>Allowed Operations by Stage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stages.map((stage) => (
              <div key={stage.code} className="border rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stage.color }} />
                  <span className="font-medium text-sm">{stage.name}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {stage.allowedOps.map((op) => (
                    <Badge key={op} variant="secondary" className="text-xs">{op}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transaction Rules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-500" /> Transaction Stage Rules
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction Type</TableHead>
                <TableHead>Allowed In Stages</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactionRules.map((rule) => (
                <TableRow key={rule.transaction}>
                  <TableCell className="font-medium">{rule.transaction}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {rule.allowedStages.map((s) => (
                        <Badge key={s} variant="outline" className="text-xs">{s}</Badge>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
