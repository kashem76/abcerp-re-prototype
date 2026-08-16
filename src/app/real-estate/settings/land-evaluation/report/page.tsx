"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft, FileText, Plus, GripVertical, ArrowRight,
  Info, Pencil, Settings,
} from "lucide-react";

// ─── Mock Data ─────────────────────────────────────────────────

interface ReportSection {
  id: string;
  name: string;
  source: string;
  configurable: boolean;
}

const reportSections: ReportSection[] = [
  { id: "RS01", name: "Executive Summary", source: "Auto-generated", configurable: false },
  { id: "RS02", name: "Land Information", source: "Land record", configurable: false },
  { id: "RS03", name: "Initial Selection Summary", source: "Selection assessment", configurable: true },
  { id: "RS04", name: "Site Assessment", source: "Engineering / Land BD", configurable: true },
  { id: "RS05", name: "Legal Assessment", source: "Legal department", configurable: true },
  { id: "RS06", name: "Regulatory Assessment", source: "Planning department", configurable: true },
  { id: "RS07", name: "Engineering Assessment", source: "Engineering department", configurable: true },
  { id: "RS08", name: "Market Assessment", source: "Marketing department", configurable: true },
  { id: "RS09", name: "Sales Assessment", source: "Sales department", configurable: true },
  { id: "RS10", name: "Preliminary Cost Estimate", source: "Engineering / Finance", configurable: true },
  { id: "RS11", name: "Financial Feasibility", source: "Finance department", configurable: true },
  { id: "RS12", name: "Key Findings", source: "All departments (aggregated)", configurable: true },
  { id: "RS13", name: "Risk Register", source: "All departments (aggregated)", configurable: true },
  { id: "RS14", name: "Department Recommendations", source: "Department sign-offs", configurable: false },
  { id: "RS15", name: "Overall Recommendation", source: "Scoring engine + coordinator", configurable: false },
  { id: "RS16", name: "Management Decision", source: "Management", configurable: false },
];

interface DeptConfig {
  department: string;
  section: string;
  includeRecommendation: boolean;
  includeHeadComments: boolean;
  includeScore: boolean;
  findingsLevel: string;
  riskLevels: string[];
  includeCost: boolean;
  includeCostBreakdown: boolean;
  includeBenchmark: boolean;
  includeEvidence: boolean;
  excludeDrafts: boolean;
  excludeInternal: boolean;
  excludeReturned: boolean;
}

const departmentConfigs: DeptConfig[] = [
  { department: "Engineering", section: "Engineering Assessment", includeRecommendation: true, includeHeadComments: true, includeScore: true, findingsLevel: "Critical + High + Medium", riskLevels: ["Critical", "High", "Medium"], includeCost: true, includeCostBreakdown: true, includeBenchmark: true, includeEvidence: true, excludeDrafts: true, excludeInternal: true, excludeReturned: true },
  { department: "Legal", section: "Legal Assessment", includeRecommendation: true, includeHeadComments: true, includeScore: true, findingsLevel: "Critical + High + Medium", riskLevels: ["Critical", "High", "Medium"], includeCost: false, includeCostBreakdown: false, includeBenchmark: false, includeEvidence: true, excludeDrafts: true, excludeInternal: true, excludeReturned: true },
  { department: "Marketing", section: "Market Assessment", includeRecommendation: true, includeHeadComments: true, includeScore: true, findingsLevel: "Critical + High", riskLevels: ["Critical", "High"], includeCost: false, includeCostBreakdown: false, includeBenchmark: false, includeEvidence: false, excludeDrafts: true, excludeInternal: true, excludeReturned: true },
  { department: "Sales", section: "Sales Assessment", includeRecommendation: true, includeHeadComments: false, includeScore: true, findingsLevel: "Critical + High", riskLevels: ["Critical", "High"], includeCost: false, includeCostBreakdown: false, includeBenchmark: false, includeEvidence: false, excludeDrafts: true, excludeInternal: true, excludeReturned: true },
  { department: "Finance", section: "Financial Feasibility", includeRecommendation: true, includeHeadComments: true, includeScore: true, findingsLevel: "All findings", riskLevels: ["Critical", "High", "Medium"], includeCost: true, includeCostBreakdown: true, includeBenchmark: true, includeEvidence: true, excludeDrafts: true, excludeInternal: true, excludeReturned: true },
  { department: "Planning", section: "Regulatory Assessment", includeRecommendation: true, includeHeadComments: true, includeScore: true, findingsLevel: "Critical + High + Medium", riskLevels: ["Critical", "High"], includeCost: false, includeCostBreakdown: false, includeBenchmark: false, includeEvidence: true, excludeDrafts: true, excludeInternal: true, excludeReturned: true },
];

// ─── Component ─────────────────────────────────────────────────

export default function ReportSetupPage() {
  const [activeTab, setActiveTab] = useState("structure");
  const [selectedDept, setSelectedDept] = useState<DeptConfig | null>(departmentConfigs[0]);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <Link
          href="/real-estate/settings/land-evaluation"
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-2"
        >
          <ChevronLeft className="h-4 w-4" /> Land Evaluation Settings
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="h-7 w-7 text-slate-600" />
            <div>
              <h1 className="text-2xl font-bold">Report Setup</h1>
              <p className="text-muted-foreground">
                Configure the management report structure and department output inclusions.
              </p>
            </div>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> New Template
          </Button>
        </div>
      </div>

      {/* Template Card */}
      <Card className="border-slate-300">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              Land Evaluation & Feasibility Report
              <Badge className="bg-slate-100 text-slate-800 text-[10px]">Default</Badge>
            </CardTitle>
            <Badge className="bg-emerald-100 text-emerald-800">Active</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span>Used by: <span className="text-foreground font-medium">Standard Land Evaluation</span></span>
            <span>Sections: <span className="text-foreground font-medium">{reportSections.length}</span></span>
            <span>Departments: <span className="text-foreground font-medium">{departmentConfigs.length}</span></span>
          </div>
        </CardContent>
      </Card>

      {/* Builder Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="structure">Structure</TabsTrigger>
          <TabsTrigger value="departments">Department Outputs</TabsTrigger>
          <TabsTrigger value="decision">Management Decision</TabsTrigger>
        </TabsList>

        {/* Structure Tab */}
        <TabsContent value="structure" className="space-y-4 mt-4">
          <p className="text-sm text-muted-foreground">
            Drag to reorder report sections. Configurable sections can be customized per department.
          </p>
          <Card>
            <div className="divide-y">
              {reportSections.map((section, i) => (
                <div key={section.id} className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50">
                  <GripVertical className="h-4 w-4 text-muted-foreground/50 cursor-grab" />
                  <span className="text-xs text-muted-foreground w-6 text-right">{i + 1}.</span>
                  <div className="flex-1">
                    <span className="text-sm font-medium">{section.name}</span>
                    <span className="text-xs text-muted-foreground ml-3">{section.source}</span>
                  </div>
                  {section.configurable ? (
                    <Badge variant="outline" className="text-[10px] gap-1">
                      <Settings className="h-3 w-3" /> Configurable
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="text-[10px]">Fixed</Badge>
                  )}
                </div>
              ))}
            </div>
          </Card>
          <Button variant="outline" size="sm" className="gap-1">
            <Plus className="h-4 w-4" /> Add Section
          </Button>
        </TabsContent>

        {/* Department Outputs Tab */}
        <TabsContent value="departments" className="space-y-4 mt-4">
          <p className="text-sm text-muted-foreground">
            Configure what each department contributes to the management report.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Department List */}
            <div className="space-y-1">
              {departmentConfigs.map((dept) => (
                <div
                  key={dept.department}
                  className={`px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                    selectedDept?.department === dept.department
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => setSelectedDept(dept)}
                >
                  <span className="text-sm font-medium">{dept.department}</span>
                  <p className={`text-xs ${selectedDept?.department === dept.department ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {dept.section}
                  </p>
                </div>
              ))}
            </div>

            {/* Department Config Detail */}
            <div className="lg:col-span-2">
              {selectedDept && (
                <DepartmentOutputConfig config={selectedDept} />
              )}
            </div>
          </div>
        </TabsContent>

        {/* Management Decision Tab */}
        <TabsContent value="decision" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Management Decision Section</CardTitle>
              <p className="text-sm text-muted-foreground">
                Configure how the decision section appears in the final report.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Decision Options</label>
                <div className="space-y-2 mt-2">
                  {[
                    { label: "Approve", color: "bg-emerald-100 text-emerald-800 border-emerald-200", desc: "Proceed to land acquisition" },
                    { label: "Approve with Conditions", color: "bg-blue-100 text-blue-800 border-blue-200", desc: "Proceed subject to specified conditions being met" },
                    { label: "Return for Revision", color: "bg-amber-100 text-amber-800 border-amber-200", desc: "Send back to specific departments for revision" },
                    { label: "Reject", color: "bg-red-100 text-red-800 border-red-200", desc: "Close the land opportunity" },
                  ].map((opt) => (
                    <div key={opt.label} className={`flex items-center gap-4 p-3 rounded-lg border ${opt.color}`}>
                      <Badge className={`${opt.color} min-w-[180px] justify-center`}>{opt.label}</Badge>
                      <span className="text-sm">{opt.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <label className="text-sm font-medium">Conditional Approval Requirements</label>
                <div className="space-y-1 mt-2">
                  {[
                    "Structured conditions (text, responsible dept, due date, must-complete-before stage)",
                    "Conditions tracked through acquisition and project stages",
                    "Conditions visible on project workspace until resolved",
                  ].map((req) => (
                    <div key={req} className="flex items-center gap-2">
                      <Checkbox defaultChecked />
                      <span className="text-sm">{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <label className="text-sm font-medium">Decision Record Includes</label>
                <div className="space-y-1 mt-2">
                  {[
                    "Decision type and date",
                    "Decision maker name and role",
                    "Management comments",
                    "Approved feasibility baseline (locked snapshot)",
                    "Open conditions (if conditional)",
                    "Revision instructions (if returned)",
                    "Rejection rationale (if rejected)",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <Checkbox defaultChecked />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <label className="text-sm font-medium">Post-Decision Behavior</label>
                <div className="space-y-3 mt-2">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm">After Approval</span>
                    <Select defaultValue="unlock-acquisition">
                      <SelectTrigger className="w-[250px]"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unlock-acquisition">Unlock Acquisition tab</SelectItem>
                        <SelectItem value="notify">Notify only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm">After Rejection</span>
                    <Select defaultValue="close-readonly">
                      <SelectTrigger className="w-[250px]"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="close-readonly">Close land (read-only)</SelectItem>
                        <SelectItem value="archive">Archive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm">Lock prior stages after decision</span>
                    <Select defaultValue="yes">
                      <SelectTrigger className="w-[250px]"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes (admin can reopen)</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button>Save Decision Configuration</Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Info */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardContent className="pt-4 flex gap-3">
          <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800">
            The management report is auto-assembled from department sign-offs. No one manually writes a 16-section report —
            they review and approve what the system composed from structured assessments, findings, and recommendations.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Department Output Config ───────────────────────────────────

function DepartmentOutputConfig({ config }: { config: DeptConfig }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Report Output &mdash; {config.department}</CardTitle>
        <p className="text-sm text-muted-foreground">
          What should be pulled into the management report from {config.section}?
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Include */}
        <div>
          <label className="text-sm font-medium">Include</label>
          <div className="space-y-1 mt-2">
            {[
              { label: "Overall recommendation", checked: config.includeRecommendation },
              { label: "Department head comments", checked: config.includeHeadComments },
              { label: "Overall score", checked: config.includeScore },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <Checkbox defaultChecked={item.checked} />
                <span className="text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Findings */}
        <div>
          <label className="text-sm font-medium">Findings</label>
          <div className="space-y-1 mt-2">
            {["Critical + High + Medium", "All findings", "Selected manually"].map((opt) => (
              <div key={opt} className="flex items-center gap-2">
                <input type="radio" name={`findings-${config.department}`} defaultChecked={config.findingsLevel === opt} className="h-4 w-4" />
                <span className="text-sm">{opt}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Risks */}
        <div>
          <label className="text-sm font-medium">Risks</label>
          <div className="space-y-1 mt-2">
            {["Critical", "High", "Medium", "Low"].map((level) => (
              <div key={level} className="flex items-center gap-2">
                <Checkbox defaultChecked={config.riskLevels.includes(level)} />
                <span className="text-sm">{level}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cost (Engineering / Finance only) */}
        {config.includeCost && (
          <>
            <Separator />
            <div>
              <label className="text-sm font-medium">Cost</label>
              <div className="space-y-1 mt-2">
                {[
                  { label: "Preliminary construction cost", checked: config.includeCost },
                  { label: "Cost category breakdown", checked: config.includeCostBreakdown },
                  { label: "Benchmark variance", checked: config.includeBenchmark },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <Checkbox defaultChecked={item.checked} />
                    <span className="text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <Separator />

        {/* Evidence */}
        <div>
          <label className="text-sm font-medium">Evidence</label>
          <div className="space-y-1 mt-2">
            {[
              { label: "Reference supporting documents", checked: config.includeEvidence },
              { label: "Embed documents", checked: false },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <Checkbox defaultChecked={item.checked} />
                <span className="text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Exclude */}
        <div>
          <label className="text-sm font-medium">Exclude</label>
          <div className="space-y-1 mt-2">
            {[
              { label: "Draft comments", checked: config.excludeDrafts },
              { label: "Internal discussions", checked: config.excludeInternal },
              { label: "Returned assessments", checked: config.excludeReturned },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <Checkbox defaultChecked={item.checked} />
                <span className="text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Save */}
        <div className="flex justify-end pt-2">
          <Button>Save {config.department} Output</Button>
        </div>
      </CardContent>
    </Card>
  );
}
