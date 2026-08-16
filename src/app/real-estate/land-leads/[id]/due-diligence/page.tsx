"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Shield,
  MapPin,
  Scale,
  Compass,
  Landmark,
  DollarSign,
  Mountain,
  Upload,
  Save,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  MinusCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const leadId = "LL-2026-042";
const leadLocation = "Bayazid Bostami, Chattogram";

type CheckItem = {
  id: string;
  label: string;
  status: "Not Started" | "In Progress" | "Passed" | "Failed" | "N/A";
  findings: string;
};

type Category = {
  key: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  items: CheckItem[];
};

const categories: Category[] = [
  {
    key: "LEGAL",
    label: "Legal Verification",
    icon: <Scale className="h-4 w-4" />,
    color: "text-purple-600",
    items: [
      { id: "L1", label: "Title verification (30-year chain)", status: "Passed", findings: "Title chain verified from 1996 CS record through SA, RS to current owner. Three transfers — all properly registered with sub-registrar Chattogram-4. No break in chain." },
      { id: "L2", label: "Encumbrance certificate check", status: "Passed", findings: "EC obtained for last 13 years. No mortgage, lien, or court attachment found. Clear certificate issued by sub-registrar office on 2026-07-20." },
      { id: "L3", label: "Mutation status verification", status: "In Progress", findings: "Mutation application submitted to AC Land Bayazid. Current khatian shows previous owner — mutation to seller pending. Expected completion 2 weeks." },
      { id: "L4", label: "Power of Attorney check", status: "Not Started", findings: "" },
    ],
  },
  {
    key: "SURVEY",
    label: "Survey & Investigation",
    icon: <Compass className="h-4 w-4" />,
    color: "text-blue-600",
    items: [
      { id: "S1", label: "Physical boundary survey", status: "Passed", findings: "RLRS surveyor completed boundary survey. Matches RS khatian within 2% tolerance. Eastern boundary encroachment noted — 2ft overlap with dag 345. Recommend resolution before purchase." },
      { id: "S2", label: "Soil investigation report", status: "Passed", findings: "4-point bore log completed to 80ft depth. Bearing capacity 3.5 ton/sft at 65ft. No peat layer. Water table at 12ft (monsoon). Pile foundation recommended — 14-inch RCC piles at 70ft." },
      { id: "S3", label: "Topographic survey", status: "In Progress", findings: "Survey initiated. Preliminary contour map shows relatively flat terrain with 1.5ft elevation variation. SW corner has existing pond (~8 katha) requiring fill." },
    ],
  },
  {
    key: "REGULATORY",
    label: "Regulatory Compliance",
    icon: <Landmark className="h-4 w-4" />,
    color: "text-orange-600",
    items: [
      { id: "R1", label: "CDA permission feasibility", status: "Passed", findings: "Confirmed CDA Residential Zone. Building construction permissible. Pre-consultation with CDA confirms 10-story approval likely given road width (30ft) and zone classification." },
      { id: "R2", label: "FAR & coverage assessment", status: "Passed", findings: "FAR 5.0 applicable per CDA Building Rules 2024. Maximum ground coverage 60%. With 22 katha (35,750 sft), buildable area up to 178,750 sft. Setback requirements: Front 10ft, Rear 6ft, Sides 5ft each." },
      { id: "R3", label: "Environmental clearance", status: "Not Started", findings: "" },
    ],
  },
  {
    key: "FINANCIAL",
    label: "Financial Assessment",
    icon: <DollarSign className="h-4 w-4" />,
    color: "text-emerald-600",
    items: [
      { id: "F1", label: "Market price validation", status: "Passed", findings: "Current market rate for Bayazid Bostami area: BDT 18-22 lakh/katha. Seller asking BDT 20 lakh/katha (BDT 4.40 Cr for 22 katha). Price is within market range and fair." },
      { id: "F2", label: "Comparable sales analysis", status: "In Progress", findings: "3 comparable transactions identified in last 12 months: Dag 312 (18 katha @ 19L), Dag 298 (15 katha @ 21L), Dag 401 (25 katha @ 20.5L). Average: BDT 20.17 lakh/katha." },
    ],
  },
  {
    key: "PHYSICAL",
    label: "Physical Conditions",
    icon: <Mountain className="h-4 w-4" />,
    color: "text-teal-600",
    items: [
      { id: "P1", label: "Road access verification", status: "Passed", findings: "Direct access from 30ft municipal road (North side). Secondary access via 15ft internal road (West side). No right-of-way issues. Road is metaled and in good condition." },
      { id: "P2", label: "Utility availability check", status: "Passed", findings: "BPDB power line available (11KV feeder 200m away). Chattogram WASA main 50m from site. Gas connection feasible — Karnaphuli Gas main line on adjacent road." },
      { id: "P3", label: "Flood history assessment", status: "Passed", findings: "Checked with local residents and ward councilor office. No flooding reported in last 20 years. Area is above flood level. Drainage system connected to municipal drain on main road." },
    ],
  },
];

const statusConfig: Record<string, { color: string; icon: React.ReactNode }> = {
  "Not Started": { color: "bg-gray-100 text-gray-600 border-gray-300", icon: <MinusCircle className="h-3 w-3" /> },
  "In Progress": { color: "bg-blue-100 text-blue-700 border-blue-300", icon: <Clock className="h-3 w-3" /> },
  Passed: { color: "bg-emerald-100 text-emerald-700 border-emerald-300", icon: <CheckCircle2 className="h-3 w-3" /> },
  Failed: { color: "bg-red-100 text-red-700 border-red-300", icon: <XCircle className="h-3 w-3" /> },
  "N/A": { color: "bg-gray-50 text-gray-400 border-gray-200", icon: <MinusCircle className="h-3 w-3" /> },
};

function computeOverallStatus(cats: Category[]) {
  const all = cats.flatMap((c) => c.items);
  const total = all.length;
  const passed = all.filter((i) => i.status === "Passed").length;
  const failed = all.filter((i) => i.status === "Failed").length;
  const inProgress = all.filter((i) => i.status === "In Progress").length;
  const notStarted = all.filter((i) => i.status === "Not Started").length;
  const pct = Math.round((passed / total) * 100);
  return { total, passed, failed, inProgress, notStarted, pct };
}

export default function DueDiligenceEntryPage() {
  const overall = computeOverallStatus(categories);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/real-estate/land-leads"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-3"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Lead Detail
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Shield className="h-6 w-6 text-purple-600" />
              Due Diligence Checklist
            </h1>
            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {leadId} &middot; {leadLocation}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Cancel</Button>
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Save Progress
            </Button>
          </div>
        </div>
      </div>

      {/* Overall Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Overall Completion</span>
              <span className="text-2xl font-bold text-primary">{overall.pct}%</span>
            </div>
            <div className="flex gap-4 text-sm">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                {overall.passed} Passed
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-blue-500" />
                {overall.inProgress} In Progress
              </span>
              <span className="flex items-center gap-1">
                <MinusCircle className="h-4 w-4 text-gray-400" />
                {overall.notStarted} Not Started
              </span>
              <span className="flex items-center gap-1">
                <XCircle className="h-4 w-4 text-red-500" />
                {overall.failed} Failed
              </span>
            </div>
          </div>
          <Progress value={overall.pct} className="h-3" />
          <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-md text-sm text-amber-800 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>
              Due diligence must reach 100% &quot;Passed&quot; (or N/A) status before a land acquisition can proceed to Agreement stage.
              Items marked &quot;Failed&quot; require management sign-off with documented risk acceptance.
            </span>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Checklist by Category */}
      <div className="space-y-6">
        {categories.map((cat) => {
          const catPassed = cat.items.filter((i) => i.status === "Passed").length;
          return (
            <Card key={cat.key}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className={`text-base flex items-center gap-2 ${cat.color}`}>
                    {cat.icon}
                    {cat.label}
                  </CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {catPassed}/{cat.items.length} completed
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {cat.items.map((item, idx) => (
                  <div key={item.id}>
                    {idx > 0 && <Separator className="mb-4" />}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-muted-foreground w-6">{item.id}</span>
                          <span className="text-sm font-medium">{item.label}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Select defaultValue={item.status}>
                            <SelectTrigger className="w-[150px] h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {["Not Started", "In Progress", "Passed", "Failed", "N/A"].map(
                                (s) => (
                                  <SelectItem key={s} value={s} className="text-xs">
                                    <span className="flex items-center gap-1">
                                      {statusConfig[s].icon}
                                      {s}
                                    </span>
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                          <Badge
                            variant="outline"
                            className={`text-xs ${statusConfig[item.status].color}`}
                          >
                            <span className="flex items-center gap-1">
                              {statusConfig[item.status].icon}
                              {item.status}
                            </span>
                          </Badge>
                        </div>
                      </div>
                      <Textarea
                        defaultValue={item.findings}
                        placeholder="Enter findings and observations..."
                        className="min-h-[70px] text-sm"
                      />
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-1 text-xs h-7">
                          <Upload className="h-3 w-3" />
                          Attach Document
                        </Button>
                        <span className="text-xs text-muted-foreground">
                          No documents attached
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
