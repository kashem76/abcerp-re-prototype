"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronLeft, Filter, Plus, GripVertical, Pencil,
  Copy, Power, ArrowLeft, Check, AlertTriangle, Info,
} from "lucide-react";

// ─── Mock Data ─────────────────────────────────────────────────

interface SelectionCriterion {
  id: string;
  name: string;
  category: string;
  responseType: string;
  unit?: string;
  preferred?: string;
  acceptable?: string;
  belowStandard?: string;
  weight: number;
  critical: boolean;
  failAction: "reject" | "flag" | "management";
  department: string;
  role: string;
}

interface SelectionTemplate {
  id: string;
  name: string;
  description: string;
  active: boolean;
  isDefault: boolean;
  criteria: SelectionCriterion[];
  resultOptions: string[];
}

const templates: SelectionTemplate[] = [
  {
    id: "ST-001",
    name: "Standard Land Selection",
    description: "General residential / commercial land leads. Used as the default quick-screening template for all incoming leads.",
    active: true,
    isDefault: true,
    resultOptions: ["Qualify", "Hold", "Reject"],
    criteria: [
      { id: "SC1", name: "Target Location", category: "Site / Location", responseType: "Choice", weight: 15, critical: false, failAction: "flag", department: "Land / BD", role: "Land Officer" },
      { id: "SC2", name: "Minimum Land Area", category: "Site / Location", responseType: "Numeric", unit: "Katha", preferred: ">= 20", acceptable: ">= 10", belowStandard: "< 10", weight: 12, critical: false, failAction: "flag", department: "Land / BD", role: "Land Officer" },
      { id: "SC3", name: "Asking Price / Katha", category: "Financial", responseType: "Amount", unit: "BDT", preferred: "<= 1.2 Cr", acceptable: "<= 1.5 Cr", belowStandard: "> 1.5 Cr", weight: 15, critical: false, failAction: "flag", department: "Land / BD", role: "Land Officer" },
      { id: "SC4", name: "Road Width", category: "Site / Location", responseType: "Numeric", unit: "ft", preferred: ">= 40", acceptable: ">= 30", belowStandard: "< 30", weight: 10, critical: true, failAction: "flag", department: "Land / BD", role: "Land Officer" },
      { id: "SC5", name: "Owner Willingness", category: "Commercial", responseType: "Rating", weight: 10, critical: false, failAction: "flag", department: "Land / BD", role: "Land Officer" },
      { id: "SC6", name: "Development Potential", category: "Site / Location", responseType: "Rating", weight: 12, critical: false, failAction: "flag", department: "Land / BD", role: "Land Officer" },
      { id: "SC7", name: "Known Legal Dispute", category: "Legal", responseType: "Pass/Fail", weight: 10, critical: true, failAction: "reject", department: "Legal", role: "Legal Officer" },
      { id: "SC8", name: "Regulatory Red Flag", category: "Regulatory", responseType: "Pass/Fail", weight: 8, critical: true, failAction: "flag", department: "Planning", role: "Planning Officer" },
      { id: "SC9", name: "JV Willingness", category: "Commercial", responseType: "Choice", weight: 8, critical: false, failAction: "flag", department: "Land / BD", role: "Land Officer" },
    ],
  },
  {
    id: "ST-002",
    name: "JV Opportunity Selection",
    description: "Joint venture land opportunities where the landowner contributes land and the developer builds.",
    active: true,
    isDefault: false,
    resultOptions: ["Qualify", "Hold", "Reject"],
    criteria: [
      { id: "JC1", name: "Target Location", category: "Site / Location", responseType: "Choice", weight: 12, critical: false, failAction: "flag", department: "Land / BD", role: "Land Officer" },
      { id: "JC2", name: "Minimum Land Area", category: "Site / Location", responseType: "Numeric", unit: "Katha", preferred: ">= 15", acceptable: ">= 8", belowStandard: "< 8", weight: 10, critical: false, failAction: "flag", department: "Land / BD", role: "Land Officer" },
      { id: "JC3", name: "Owner Share Expectation", category: "Financial", responseType: "Percentage", weight: 15, critical: true, failAction: "flag", department: "Land / BD", role: "Land Officer" },
      { id: "JC4", name: "Road Width", category: "Site / Location", responseType: "Numeric", unit: "ft", preferred: ">= 40", acceptable: ">= 30", belowStandard: "< 30", weight: 8, critical: true, failAction: "flag", department: "Land / BD", role: "Land Officer" },
      { id: "JC5", name: "Number of Owners", category: "Legal", responseType: "Numeric", weight: 8, critical: false, failAction: "flag", department: "Legal", role: "Legal Officer" },
      { id: "JC6", name: "Owner Willingness", category: "Commercial", responseType: "Rating", weight: 10, critical: false, failAction: "flag", department: "Land / BD", role: "Land Officer" },
      { id: "JC7", name: "Known Legal Dispute", category: "Legal", responseType: "Pass/Fail", weight: 10, critical: true, failAction: "reject", department: "Legal", role: "Legal Officer" },
      { id: "JC8", name: "Regulatory Red Flag", category: "Regulatory", responseType: "Pass/Fail", weight: 7, critical: true, failAction: "flag", department: "Planning", role: "Planning Officer" },
      { id: "JC9", name: "Development Potential", category: "Site / Location", responseType: "Rating", weight: 10, critical: false, failAction: "flag", department: "Land / BD", role: "Land Officer" },
      { id: "JC10", name: "Cash Compensation Required", category: "Financial", responseType: "Amount", unit: "BDT", weight: 5, critical: false, failAction: "flag", department: "Finance", role: "Analyst" },
      { id: "JC11", name: "Negotiation Complexity", category: "Commercial", responseType: "Rating", weight: 5, critical: false, failAction: "flag", department: "Land / BD", role: "Land Officer" },
    ],
  },
];

// ─── Component ─────────────────────────────────────────────────

export default function SelectionTemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<SelectionTemplate | null>(null);
  const [editCriterion, setEditCriterion] = useState<SelectionCriterion | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  if (selectedTemplate) {
    return (
      <TemplateDetail
        template={selectedTemplate}
        onBack={() => setSelectedTemplate(null)}
        onEditCriterion={(c) => { setEditCriterion(c); setSheetOpen(true); }}
      />
    );
  }

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
            <Filter className="h-7 w-7 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold">Selection Templates</h1>
              <p className="text-muted-foreground">
                Quick screening rules applied before detailed evaluation begins.
              </p>
            </div>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> New Selection Template
          </Button>
        </div>
      </div>

      {/* Template List */}
      <div className="space-y-4">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`cursor-pointer hover:border-primary/40 transition-colors ${template.isDefault ? "border-blue-300" : ""}`}
            onClick={() => setSelectedTemplate(template)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  {template.name}
                  {template.isDefault && (
                    <Badge className="bg-blue-100 text-blue-800 text-[10px]">Default</Badge>
                  )}
                </CardTitle>
                <Badge className={template.active ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-600"}>
                  {template.active ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
              <div className="flex items-center gap-6 text-sm">
                <span>
                  <span className="font-medium">{template.criteria.length}</span>
                  <span className="text-muted-foreground"> criteria</span>
                </span>
                <span>
                  <span className="font-medium">{template.criteria.filter((c) => c.critical).length}</span>
                  <span className="text-muted-foreground"> critical criteria</span>
                </span>
                <span className="text-muted-foreground">
                  Result Options: {template.resultOptions.join(" / ")}
                </span>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); setSelectedTemplate(template); }}>
                    <Pencil className="h-3.5 w-3.5 mr-1" /> Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={(e) => e.stopPropagation()}>
                    <Copy className="h-3.5 w-3.5 mr-1" /> Duplicate
                  </Button>
                  <Button variant="outline" size="sm" onClick={(e) => e.stopPropagation()}>
                    <Power className="h-3.5 w-3.5 mr-1" /> Deactivate
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardContent className="pt-4 flex gap-3">
          <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800">
            Selection templates provide a quick initial screen before committing to full evaluation.
            When a land lead is created, the assigned template determines which quick criteria appear on the Overview tab.
            A lead must pass selection before detailed evaluation begins.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Template Detail ────────────────────────────────────────────

function TemplateDetail({
  template,
  onBack,
  onEditCriterion,
}: {
  template: SelectionTemplate;
  onBack: () => void;
  onEditCriterion: (c: SelectionCriterion) => void;
}) {
  const [activeTab, setActiveTab] = useState("criteria");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingCriterion, setEditingCriterion] = useState<SelectionCriterion | null>(null);

  const openEdit = (c: SelectionCriterion) => {
    setEditingCriterion(c);
    setSheetOpen(true);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <button
          onClick={onBack}
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-2"
        >
          <ArrowLeft className="h-4 w-4" /> Selection Templates
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              {template.name}
              {template.isDefault && (
                <Badge className="bg-blue-100 text-blue-800 text-xs">Default</Badge>
              )}
            </h1>
            <p className="text-muted-foreground mt-1">{template.description}</p>
          </div>
          <Badge className={`text-sm ${template.active ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-600"}`}>
            {template.active ? "Active" : "Inactive"}
          </Badge>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="criteria">Criteria</TabsTrigger>
          <TabsTrigger value="rules">Decision Rules</TabsTrigger>
        </TabsList>

        {/* General Tab */}
        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div>
                <label className="text-sm font-medium">Template Name</label>
                <Input defaultValue={template.name} className="mt-1 max-w-md" />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea defaultValue={template.description} className="mt-1 max-w-md" rows={3} />
              </div>
              <div>
                <label className="text-sm font-medium">Used For</label>
                <Input defaultValue="General residential / commercial land leads" className="mt-1 max-w-md" />
              </div>
              <div className="grid grid-cols-2 gap-4 max-w-md">
                <div>
                  <label className="text-sm font-medium">Result Options</label>
                  <Input defaultValue={template.resultOptions.join(", ")} className="mt-1" disabled />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <Checkbox defaultChecked={template.isDefault} id="default" />
                  <label htmlFor="default" className="text-sm font-medium">Set as default template</label>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </TabsContent>

        {/* Criteria Tab */}
        <TabsContent value="criteria" className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {template.criteria.length} criteria &middot; {template.criteria.filter((c) => c.critical).length} critical
            </p>
            <Button size="sm" className="gap-1">
              <Plus className="h-4 w-4" /> Add Criterion
            </Button>
          </div>

          <Card>
            <div className="divide-y">
              {template.criteria.map((criterion, idx) => (
                <div
                  key={criterion.id}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 cursor-pointer group"
                  onClick={() => openEdit(criterion)}
                >
                  <GripVertical className="h-4 w-4 text-muted-foreground/50 cursor-grab" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{criterion.name}</span>
                      {criterion.critical && (
                        <Badge variant="destructive" className="text-[10px] px-1.5 py-0">Critical</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                      <span>{criterion.category}</span>
                      <span>{criterion.responseType}</span>
                      {criterion.unit && <span>{criterion.unit}</span>}
                      <span>{criterion.weight}% weight</span>
                    </div>
                  </div>
                  {criterion.preferred && (
                    <div className="text-xs text-muted-foreground text-right hidden md:block">
                      <div className="text-emerald-600">Preferred: {criterion.preferred}</div>
                      <div>Acceptable: {criterion.acceptable}</div>
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100"
                    onClick={(e) => { e.stopPropagation(); openEdit(criterion); }}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Decision Rules Tab */}
        <TabsContent value="rules" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Scoring</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 max-w-md">
                <div>
                  <label className="text-sm font-medium">Qualify Threshold</label>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-muted-foreground">Score &ge;</span>
                    <Input type="number" defaultValue={70} className="max-w-[80px]" />
                    <span className="text-sm text-muted-foreground">/ 100</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Hold Threshold</label>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-muted-foreground">Score &ge;</span>
                    <Input type="number" defaultValue={50} className="max-w-[80px]" />
                    <span className="text-sm text-muted-foreground">/ 100</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Below Hold threshold = Reject</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                Critical Criterion Rules
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                When a critical criterion fails, these rules override the overall score.
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {template.criteria.filter((c) => c.critical).map((criterion) => (
                  <div key={criterion.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{criterion.name}</p>
                      <p className="text-xs text-muted-foreground">{criterion.category}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">If fails:</span>
                      <Select defaultValue={criterion.failAction}>
                        <SelectTrigger className="w-[200px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="reject">Reject automatically</SelectItem>
                          <SelectItem value="flag">Flag for review</SelectItem>
                          <SelectItem value="management">Management exception required</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Result Mapping</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                  <Badge className="bg-emerald-100 text-emerald-800 min-w-[70px] justify-center">Qualify</Badge>
                  <span className="text-sm">Score &ge; 70 and no critical failures</span>
                  <span className="text-xs text-muted-foreground ml-auto">→ Proceed to Evaluation</span>
                </div>
                <div className="flex items-center gap-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <Badge className="bg-amber-100 text-amber-800 min-w-[70px] justify-center">Hold</Badge>
                  <span className="text-sm">Score 50–69 or critical flagged for review</span>
                  <span className="text-xs text-muted-foreground ml-auto">→ Management review required</span>
                </div>
                <div className="flex items-center gap-4 p-3 bg-red-50 rounded-lg border border-red-200">
                  <Badge className="bg-red-100 text-red-800 min-w-[70px] justify-center">Reject</Badge>
                  <span className="text-sm">Score &lt; 50 or critical auto-reject triggered</span>
                  <span className="text-xs text-muted-foreground ml-auto">→ Lead closed</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button>Save Decision Rules</Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Criterion Edit Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-[520px] sm:max-w-[520px] overflow-y-auto">
          {editingCriterion && (
            <SelectionCriterionEditForm
              criterion={editingCriterion}
              onClose={() => setSheetOpen(false)}
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

// ─── Selection Criterion Edit Form ──────────────────────────────

function SelectionCriterionEditForm({
  criterion,
  onClose,
}: {
  criterion: SelectionCriterion;
  onClose: () => void;
}) {
  return (
    <div className="space-y-6">
      <SheetHeader>
        <SheetTitle>Selection Criterion</SheetTitle>
      </SheetHeader>

      {/* Identity */}
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium">Name *</label>
          <Input defaultValue={criterion.name} className="mt-1" />
        </div>
        <div>
          <label className="text-sm font-medium">Category</label>
          <Select defaultValue={criterion.category}>
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["Site / Location", "Financial", "Commercial", "Legal", "Regulatory"].map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium">Description</label>
          <Textarea placeholder="Brief description of what this criterion evaluates..." className="mt-1" rows={2} />
        </div>
      </div>

      <Separator />

      {/* Input */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Input</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium">Response Type</label>
            <Select defaultValue={criterion.responseType}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["Rating", "Pass/Fail", "Choice", "Numeric", "Amount", "Percentage"].map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {criterion.unit && (
            <div>
              <label className="text-sm font-medium">Unit</label>
              <Select defaultValue={criterion.unit}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["ft", "m", "Katha", "Decimal", "BDT", "sqft", "%"].map((u) => (
                    <SelectItem key={u} value={u}>{u}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>

      <Separator />

      {/* Rules */}
      {criterion.preferred && (
        <>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Rule</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Badge className="bg-emerald-100 text-emerald-800 min-w-[100px] justify-center text-xs">Preferred</Badge>
                <Input defaultValue={criterion.preferred} className="max-w-[200px]" />
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-amber-100 text-amber-800 min-w-[100px] justify-center text-xs">Acceptable</Badge>
                <Input defaultValue={criterion.acceptable} className="max-w-[200px]" />
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-red-100 text-red-800 min-w-[100px] justify-center text-xs">Below Standard</Badge>
                <Input defaultValue={criterion.belowStandard} className="max-w-[200px]" />
              </div>
            </div>
          </div>
          <Separator />
        </>
      )}

      {/* Importance */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Importance</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium">Weight</label>
            <div className="flex items-center gap-2 mt-1">
              <Input type="number" defaultValue={criterion.weight} className="max-w-[80px]" />
              <span className="text-sm text-muted-foreground">%</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="sel-critical" defaultChecked={criterion.critical} />
          <label htmlFor="sel-critical" className="text-sm font-medium">Critical Criterion</label>
        </div>
        {criterion.critical && (
          <div>
            <label className="text-sm font-medium">If Critical Rule Fails</label>
            <div className="space-y-2 mt-2">
              {[
                { value: "reject", label: "Reject automatically" },
                { value: "flag", label: "Flag for review" },
                { value: "management", label: "Management exception required" },
              ].map((opt) => (
                <div key={opt.value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="failAction"
                    value={opt.value}
                    defaultChecked={criterion.failAction === opt.value}
                    className="h-4 w-4"
                  />
                  <label className="text-sm">{opt.label}</label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Separator />

      {/* Assignment */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Assignment</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium">Default Department</label>
            <Select defaultValue={criterion.department}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["Land / BD", "Legal", "Planning", "Engineering", "Finance", "Marketing"].map((d) => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Default Role</label>
            <Select defaultValue={criterion.role}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["Land Officer", "Legal Officer", "Planning Officer", "Engineer", "Analyst"].map((r) => (
                  <SelectItem key={r} value={r}>{r}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={onClose}>Save Criterion</Button>
      </div>
    </div>
  );
}
