"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import {
  Layers, CheckCircle2, XCircle, Info, AlertTriangle, ArrowRight,
} from "lucide-react";

const dimensions = [
  { code: "PROJECT", name: "Project", description: "The real estate project (e.g., ABC Nasirabad Heights)" },
  { code: "WBS", name: "WBS Element", description: "Work Breakdown Structure node (e.g., Tower A > Structure > RCC)" },
  { code: "COST_CODE", name: "Cost Code", description: "BOQ cost classification (e.g., STR-RCC, MEP-ELECT)" },
  { code: "REVENUE_CENTER", name: "Revenue Center", description: "Revenue responsibility center (e.g., Sales — Nasirabad)" },
  { code: "COST_CENTER", name: "Cost Center", description: "Cost responsibility center (e.g., Construction — Tower A)" },
  { code: "PROFIT_CENTER", name: "Profit Center", description: "Profit tracking entity (e.g., Project Nasirabad Heights)" },
];

const transactionRules = [
  {
    type: "Running Bill",
    dimensions: { PROJECT: true, WBS: true, COST_CODE: true, REVENUE_CENTER: false, COST_CENTER: true, PROFIT_CENTER: true },
  },
  {
    type: "Material Issue",
    dimensions: { PROJECT: true, WBS: true, COST_CODE: true, REVENUE_CENTER: false, COST_CENTER: true, PROFIT_CENTER: false },
  },
  {
    type: "Booking",
    dimensions: { PROJECT: true, WBS: false, COST_CODE: false, REVENUE_CENTER: true, COST_CENTER: false, PROFIT_CENTER: true },
  },
  {
    type: "Revenue Recognition",
    dimensions: { PROJECT: true, WBS: false, COST_CODE: false, REVENUE_CENTER: true, COST_CENTER: false, PROFIT_CENTER: true },
  },
  {
    type: "Overhead Allocation",
    dimensions: { PROJECT: true, WBS: false, COST_CODE: false, REVENUE_CENTER: false, COST_CENTER: true, PROFIT_CENTER: true },
  },
  {
    type: "Land Payment",
    dimensions: { PROJECT: true, WBS: false, COST_CODE: false, REVENUE_CENTER: false, COST_CENTER: true, PROFIT_CENTER: true },
  },
];

const examples = [
  {
    transaction: "Running Bill — RA-003 (Civil Works, Tower A)",
    dimensions: [
      { dim: "Project", value: "RE-00027 (ABC Nasirabad Heights)" },
      { dim: "WBS", value: "Tower A > Structure > RCC Column" },
      { dim: "Cost Code", value: "STR-RCC" },
      { dim: "Cost Center", value: "CC-CONST-TWRA (Construction — Tower A)" },
      { dim: "Profit Center", value: "PC-RE27 (Project Nasirabad Heights)" },
    ],
    glEntries: [
      { account: "Construction WIP", debit: "8,000,000", credit: "—" },
      { account: "Accounts Payable — Contractor", debit: "—", credit: "6,650,000" },
      { account: "Retention Payable", debit: "—", credit: "800,000" },
      { account: "TDS Payable", debit: "—", credit: "200,000" },
      { account: "Advance Recovery", debit: "—", credit: "200,000" },
      { account: "Material Supplied Recovery", debit: "—", credit: "150,000" },
    ],
  },
  {
    transaction: "Booking — BK-RE27-008 (Unit A-201)",
    dimensions: [
      { dim: "Project", value: "RE-00027 (ABC Nasirabad Heights)" },
      { dim: "Revenue Center", value: "RC-SALES-NAS (Sales — Nasirabad)" },
      { dim: "Profit Center", value: "PC-RE27 (Project Nasirabad Heights)" },
    ],
    glEntries: [
      { account: "Accounts Receivable — Buyer", debit: "8,700,000", credit: "—" },
      { account: "Unearned Revenue", debit: "—", credit: "8,700,000" },
    ],
  },
];

function DimCheck({ required }: { required: boolean }) {
  return required ? (
    <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" />
  ) : (
    <XCircle className="h-4 w-4 text-slate-300 mx-auto" />
  );
}

export default function DimensionRulesPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <div className="flex items-center gap-3">
          <Layers className="h-7 w-7 text-amber-600" />
          <h1 className="text-2xl font-bold">Dimension Rules</h1>
        </div>
        <p className="text-muted-foreground mt-1">Mandatory accounting dimensions per transaction type</p>
      </div>

      {/* Explanation */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardContent className="pt-4">
          <div className="flex gap-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">What are Dimension Rules?</p>
              <p>
                Dimension rules ensure every financial transaction carries the right accounting tags
                for multi-dimensional reporting. Missing dimensions will <strong>block posting</strong> to
                the General Ledger. This guarantees that project profitability, cost center, and revenue
                center reports are always complete and accurate.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Dimensions */}
      <Card>
        <CardHeader>
          <CardTitle>Available Dimensions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dimensions.map((d) => (
                <TableRow key={d.code}>
                  <TableCell>
                    <code className="text-xs bg-muted px-2 py-1 rounded font-mono">{d.code}</code>
                  </TableCell>
                  <TableCell className="font-medium">{d.name}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{d.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dimension Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Required Dimensions by Transaction Type</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction Type</TableHead>
                <TableHead className="text-center">Project</TableHead>
                <TableHead className="text-center">WBS</TableHead>
                <TableHead className="text-center">Cost Code</TableHead>
                <TableHead className="text-center">Revenue Center</TableHead>
                <TableHead className="text-center">Cost Center</TableHead>
                <TableHead className="text-center">Profit Center</TableHead>
                <TableHead className="text-right">Required Count</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactionRules.map((rule) => {
                const requiredCount = Object.values(rule.dimensions).filter(Boolean).length;
                return (
                  <TableRow key={rule.type}>
                    <TableCell className="font-medium">{rule.type}</TableCell>
                    <TableCell className="text-center"><DimCheck required={rule.dimensions.PROJECT} /></TableCell>
                    <TableCell className="text-center"><DimCheck required={rule.dimensions.WBS} /></TableCell>
                    <TableCell className="text-center"><DimCheck required={rule.dimensions.COST_CODE} /></TableCell>
                    <TableCell className="text-center"><DimCheck required={rule.dimensions.REVENUE_CENTER} /></TableCell>
                    <TableCell className="text-center"><DimCheck required={rule.dimensions.COST_CENTER} /></TableCell>
                    <TableCell className="text-center"><DimCheck required={rule.dimensions.PROFIT_CENTER} /></TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary">{requiredCount} / 6</Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Posting Examples */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Posting Examples with Dimensions</h2>
        <div className="space-y-4">
          {examples.map((ex, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{ex.transaction}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Dimension Values */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">ASSIGNED DIMENSIONS</p>
                  <div className="flex flex-wrap gap-2">
                    {ex.dimensions.map((d) => (
                      <div key={d.dim} className="border rounded-lg px-3 py-1.5 bg-slate-50">
                        <span className="text-xs text-muted-foreground">{d.dim}:</span>{" "}
                        <span className="text-xs font-medium">{d.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* GL Entries */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">RESULTING GL ENTRIES</p>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Account</TableHead>
                        <TableHead className="text-right">Debit (BDT)</TableHead>
                        <TableHead className="text-right">Credit (BDT)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ex.glEntries.map((entry, j) => (
                        <TableRow key={j}>
                          <TableCell className="font-medium text-sm">{entry.account}</TableCell>
                          <TableCell className="text-right font-mono text-sm">{entry.debit}</TableCell>
                          <TableCell className="text-right font-mono text-sm">{entry.credit}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Warning */}
      <Card className="border-amber-200 bg-amber-50/50">
        <CardContent className="pt-4">
          <div className="flex gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-amber-800">
              <p className="font-medium mb-1">Posting Validation</p>
              <p>
                Any transaction missing a required dimension will be <strong>blocked from posting</strong> to the GL.
                The system shows a clear error message indicating which dimensions are missing. This is enforced at
                the server action level — it cannot be bypassed from the UI. Changes to dimension rules apply only
                to new transactions; existing posted entries remain unchanged.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
