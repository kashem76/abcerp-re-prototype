"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Map, ArrowRight, Filter, Layers, ClipboardList, Users,
  GitBranch, DollarSign, BarChart3, FileText, ChevronLeft,
  Info,
} from "lucide-react";

const BASE = "/real-estate/settings/land-evaluation";
const FW_BASE = `${BASE}/frameworks/standard`;

const sections = [
  {
    title: "Initial Selection",
    description: "Define quick screening rules before detailed evaluation starts. Criteria determine whether a land lead is worth pursuing.",
    icon: Filter,
    href: `${BASE}/selection`,
    color: "text-blue-600",
    bg: "bg-blue-50",
    stat: "2 templates",
  },
  {
    title: "Evaluation Frameworks",
    description: "Define the overall evaluation structure for each land type — sections, criteria grouping, and assessment flow.",
    icon: Layers,
    href: `${BASE}/frameworks`,
    color: "text-purple-600",
    bg: "bg-purple-50",
    stat: "3 frameworks",
  },
  {
    title: "Assessment Criteria",
    description: "Reusable criteria library with response types, weights, and required outputs. Shared across all frameworks.",
    icon: ClipboardList,
    href: `${BASE}/criteria`,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    stat: "54 active criteria",
  },
  {
    title: "Evaluation Team",
    description: "Default department, role, and reviewer assignments per evaluation section. Supports role-based or person-based assignment.",
    icon: Users,
    href: `${FW_BASE}?tab=team`,
    color: "text-orange-600",
    bg: "bg-orange-50",
    stat: "8 sections configured",
  },
  {
    title: "Workflow",
    description: "Dependencies, deadlines, assignment rules, and sign-off requirements. Controls task generation when evaluation starts.",
    icon: GitBranch,
    href: `${FW_BASE}?tab=workflow`,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    stat: "8 workflow steps",
  },
  {
    title: "Preliminary Cost",
    description: "Engineering cost categories and estimation methods used during land evaluation. Includes benchmarking against historical projects.",
    icon: DollarSign,
    href: `${BASE}/cost`,
    color: "text-amber-600",
    bg: "bg-amber-50",
    stat: "17 categories",
  },
  {
    title: "Scoring & Rules",
    description: "Section weights, overall thresholds, and critical decision rules. A weighted score alone should never determine the final result.",
    icon: BarChart3,
    href: `${FW_BASE}?tab=scoring`,
    color: "text-red-600",
    bg: "bg-red-50",
    stat: "4 critical rules",
  },
  {
    title: "Report Setup",
    description: "Configure management report sections, department output inclusions, and what findings/risks appear in the final report.",
    icon: FileText,
    href: `${BASE}/report`,
    color: "text-slate-600",
    bg: "bg-slate-50",
    stat: "1 template",
  },
];

const flowSteps = [
  { num: 1, label: "Selection", sub: "What makes a lead worth pursuing?" },
  { num: 2, label: "Framework", sub: "What must be evaluated?" },
  { num: 3, label: "Criteria", sub: "What questions must teams answer?" },
  { num: 4, label: "Team", sub: "Who should do the work?" },
  { num: 5, label: "Workflow", sub: "When should they do it?" },
  { num: 6, label: "Cost", sub: "How should Engineering estimate cost?" },
  { num: 7, label: "Scoring", sub: "How are results interpreted?" },
  { num: 8, label: "Report", sub: "What does management see?" },
];

export default function LandEvaluationSettingsPage() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <Link
          href="/real-estate/settings"
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-2"
        >
          <ChevronLeft className="h-4 w-4" /> Module Settings
        </Link>
        <div className="flex items-center gap-3">
          <Map className="h-7 w-7 text-teal-600" />
          <div>
            <h1 className="text-2xl font-bold">Land Evaluation Settings</h1>
            <p className="text-muted-foreground">
              Configure how potential land is selected, evaluated, assigned to teams, scored, and presented to management.
            </p>
          </div>
        </div>
      </div>

      {/* Configuration Flow */}
      <Card className="border-teal-200 bg-teal-50/30">
        <CardContent className="pt-5 pb-4">
          <p className="text-sm font-medium text-teal-900 mb-3">Configuration follows the evaluation workflow:</p>
          <div className="flex flex-wrap gap-1 items-center">
            {flowSteps.map((step, i) => (
              <div key={step.num} className="flex items-center gap-1">
                <div className="flex items-center gap-1.5 bg-white border border-teal-200 rounded px-2 py-1">
                  <span className="text-xs font-bold text-teal-700">{step.num}</span>
                  <span className="text-xs font-medium text-teal-900">{step.label}</span>
                </div>
                {i < flowSteps.length - 1 && (
                  <ArrowRight className="h-3 w-3 text-teal-400 shrink-0" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Section Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((section) => (
          <Link key={section.title} href={section.href}>
            <Card className="hover:border-primary/40 transition-colors cursor-pointer h-full">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <div className={`p-1.5 rounded ${section.bg}`}>
                    <section.icon className={`h-4 w-4 ${section.color}`} />
                  </div>
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  {section.description}
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {section.stat}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-primary font-medium">
                    Configure <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Separator />

      {/* Active Frameworks Summary */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Active Frameworks</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "Standard Land Evaluation", sections: 8, criteria: 54, steps: 8, isDefault: true },
            { name: "Joint Venture Evaluation", sections: 9, criteria: 61, steps: 9, isDefault: false },
            { name: "Commercial Site Evaluation", sections: 7, criteria: 48, steps: 7, isDefault: false },
          ].map((fw) => (
            <Card key={fw.name} className={fw.isDefault ? "border-teal-300" : ""}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  {fw.name}
                  {fw.isDefault && (
                    <Badge className="bg-teal-100 text-teal-800 text-[10px]">Default</Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-lg font-bold">{fw.sections}</p>
                    <p className="text-[11px] text-muted-foreground">Sections</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold">{fw.criteria}</p>
                    <p className="text-[11px] text-muted-foreground">Criteria</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold">{fw.steps}</p>
                    <p className="text-[11px] text-muted-foreground">Steps</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Info Box */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardContent className="pt-4 flex gap-3">
          <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">How settings drive operations</p>
            <p>
              When a land lead is qualified and evaluation starts, the selected framework automatically generates
              work packages, assigns teams based on department/role defaults, sets deadlines from workflow rules,
              and prepares the management report structure. Changes here affect all future evaluations — active
              evaluations continue with their original configuration.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
