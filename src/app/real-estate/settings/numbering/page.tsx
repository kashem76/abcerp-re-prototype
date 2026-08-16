"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Hash, ArrowRight, Info, RefreshCw, FileText,
} from "lucide-react";

const sequences = [
  {
    entity: "Project",
    prefix: "RE-",
    currentSeq: 35,
    format: "{PREFIX}{SEQ:5}",
    resetRule: "Never",
    example: "RE-00035",
  },
  {
    entity: "Land Lead",
    prefix: "LL-",
    currentSeq: 6,
    format: "{PREFIX}{YEAR}-{SEQ:3}",
    resetRule: "Per Year",
    example: "LL-2026-006",
  },
  {
    entity: "Opportunity",
    prefix: "OPP-",
    currentSeq: 42,
    format: "{PREFIX}{SEQ:5}",
    resetRule: "Never",
    example: "OPP-00042",
  },
  {
    entity: "BOQ Line",
    prefix: "BOQ-",
    currentSeq: 148,
    format: "{COST_CODE}-{SEQ:3}",
    resetRule: "Per Project",
    example: "STR-001",
  },
  {
    entity: "Tender",
    prefix: "TND-",
    currentSeq: 3,
    format: "{PREFIX}{PROJECT}-{SEQ:3}",
    resetRule: "Per Project",
    example: "TND-RE27-003",
  },
  {
    entity: "Contract",
    prefix: "CT-",
    currentSeq: 5,
    format: "{PREFIX}{PROJECT}-{SEQ:3}",
    resetRule: "Per Project",
    example: "CT-RE27-005",
  },
  {
    entity: "Work Order",
    prefix: "WO-",
    currentSeq: 8,
    format: "{PREFIX}{PROJECT}-{SEQ:3}",
    resetRule: "Per Project",
    example: "WO-RE27-008",
  },
  {
    entity: "Running Bill",
    prefix: "RA-",
    currentSeq: 3,
    format: "{PREFIX}{SEQ:3}",
    resetRule: "Per Contract",
    example: "RA-003",
  },
  {
    entity: "Material Requisition",
    prefix: "MR-",
    currentSeq: 3,
    format: "{PREFIX}{PROJECT}-{SEQ:3}",
    resetRule: "Per Project",
    example: "MR-RE27-003",
  },
  {
    entity: "Material Issue",
    prefix: "MI-",
    currentSeq: 12,
    format: "{PREFIX}{PROJECT}-{SEQ:3}",
    resetRule: "Per Project",
    example: "MI-RE27-012",
  },
  {
    entity: "Booking",
    prefix: "BK-",
    currentSeq: 38,
    format: "{PREFIX}{PROJECT}-{SEQ:3}",
    resetRule: "Per Project",
    example: "BK-RE27-038",
  },
  {
    entity: "Variation Order",
    prefix: "VO-",
    currentSeq: 2,
    format: "{PREFIX}{PROJECT}-{SEQ:3}",
    resetRule: "Per Project",
    example: "VO-RE27-002",
  },
];

const formatExplanation = [
  { token: "{PREFIX}", description: "Entity prefix (e.g., RE-, LL-, MR-)" },
  { token: "{SEQ:N}", description: "Zero-padded sequence number with N digits" },
  { token: "{YEAR}", description: "4-digit year (e.g., 2026)" },
  { token: "{PROJECT}", description: "Short project code (e.g., RE27)" },
  { token: "{COST_CODE}", description: "WBS cost code (e.g., STR, MEP, FND)" },
];

export default function NumberingPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <div className="flex items-center gap-3">
          <Hash className="h-7 w-7 text-emerald-600" />
          <h1 className="text-2xl font-bold">Numbering Sequences</h1>
        </div>
        <p className="text-muted-foreground mt-1">Auto-numbering configuration for all Real Estate transaction documents</p>
      </div>

      {/* Sequence Table */}
      <Card>
        <CardHeader>
          <CardTitle>Document Numbering Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Entity</TableHead>
                <TableHead>Prefix</TableHead>
                <TableHead className="text-right">Current Seq</TableHead>
                <TableHead className="text-right">Next Number</TableHead>
                <TableHead>Format Pattern</TableHead>
                <TableHead>Reset Rule</TableHead>
                <TableHead>Example</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sequences.map((seq) => (
                <TableRow key={seq.entity}>
                  <TableCell className="font-medium">{seq.entity}</TableCell>
                  <TableCell>
                    <code className="text-xs bg-muted px-2 py-1 rounded font-mono">{seq.prefix}</code>
                  </TableCell>
                  <TableCell className="text-right">{seq.currentSeq}</TableCell>
                  <TableCell className="text-right font-medium">{seq.currentSeq + 1}</TableCell>
                  <TableCell>
                    <code className="text-xs bg-slate-100 px-2 py-1 rounded font-mono">{seq.format}</code>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      seq.resetRule === "Never" ? "default" :
                      seq.resetRule === "Per Year" ? "outline" : "secondary"
                    } className="text-xs">
                      <RefreshCw className="h-3 w-3 mr-1" />
                      {seq.resetRule}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <code className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded font-mono font-medium">
                      {seq.example}
                    </code>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Format Tokens */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-500" /> Format Pattern Tokens
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Token</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {formatExplanation.map((fe) => (
                <TableRow key={fe.token}>
                  <TableCell>
                    <code className="text-sm bg-muted px-2 py-1 rounded font-mono">{fe.token}</code>
                  </TableCell>
                  <TableCell>{fe.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Generated Examples */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-slate-600" /> Generated Number Examples
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4 space-y-2">
              <h4 className="font-medium text-sm">Project: ABC Nasirabad Heights (RE-00027)</h4>
              <div className="space-y-1">
                {[
                  { label: "Tender", number: "TND-RE27-001" },
                  { label: "Contract", number: "CT-RE27-001" },
                  { label: "Work Order", number: "WO-RE27-001" },
                  { label: "Running Bill #3", number: "RA-003" },
                  { label: "Material Req", number: "MR-RE27-001" },
                  { label: "Booking", number: "BK-RE27-008" },
                  { label: "Variation Order", number: "VO-RE27-001" },
                ].map((ex) => (
                  <div key={ex.label} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{ex.label}</span>
                    <code className="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded">{ex.number}</code>
                  </div>
                ))}
              </div>
            </div>

            <div className="border rounded-lg p-4 space-y-2">
              <h4 className="font-medium text-sm">Project: Bay View Residence (RE-00031)</h4>
              <div className="space-y-1">
                {[
                  { label: "Tender", number: "TND-RE31-001" },
                  { label: "Contract", number: "CT-RE31-001" },
                  { label: "Work Order", number: "WO-RE31-001" },
                  { label: "Running Bill #8", number: "RA-008" },
                  { label: "Material Req", number: "MR-RE31-015" },
                  { label: "Booking", number: "BK-RE31-030" },
                  { label: "Variation Order", number: "VO-RE31-003" },
                ].map((ex) => (
                  <div key={ex.label} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{ex.label}</span>
                    <code className="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded">{ex.number}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rules Info */}
      <Card className="border-amber-200 bg-amber-50/50">
        <CardContent className="pt-4">
          <p className="text-sm text-amber-800">
            <strong>Reset Rules:</strong> &quot;Per Project&quot; resets the sequence counter when a new project is created.
            &quot;Per Year&quot; resets on January 1st. &quot;Per Contract&quot; resets per contractor agreement.
            &quot;Never&quot; is a global monotonic counter. Sequences are gap-free within their reset scope and are
            protected by database-level advisory locks to prevent duplicates under concurrency.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
