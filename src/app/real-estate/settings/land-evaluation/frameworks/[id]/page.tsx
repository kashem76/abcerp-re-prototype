"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ChevronLeft, Layers, GripVertical, Plus, ChevronRight,
  ArrowRight, ArrowDown, Info, Check, AlertTriangle, Eye,
  FileText, Users, GitBranch, BarChart3, ClipboardList,
} from "lucide-react";

// ─── Mock Data ─────────────────────────────────────────────────

interface SectionCriterion {
  name: string;
  type: string;
  weight: number;
  critical: boolean;
}

interface EvalSection {
  name: string;
  department: string;
  criteria: SectionCriterion[];
  expanded?: boolean;
}

const sections: EvalSection[] = [
  {
    name: "Land & Location", department: "Land / BD",
    criteria: [
      { name: "Site Accessibility", type: "Rating", weight: 6, critical: false },
      { name: "Site Condition", type: "Rating", weight: 5, critical: false },
      { name: "Topography", type: "Rating", weight: 4, critical: false },
      { name: "Buildable Area", type: "Numeric", weight: 5, critical: false },
      { name: "Utility Availability", type: "Rating", weight: 4, critical: false },
      { name: "Road Access & Width", type: "Numeric", weight: 6, critical: false },
    ],
  },
  {
    name: "Legal", department: "Legal",
    criteria: [
      { name: "Ownership Verification", type: "Pass/Fail", weight: 15, critical: true },
      { name: "Chain of Title", type: "Pass/Fail", weight: 10, critical: true },
      { name: "Encumbrance Check", type: "Pass/Fail", weight: 10, critical: true },
      { name: "Mutation Verification", type: "Pass/Fail", weight: 8, critical: false },
      { name: "Litigation Search", type: "Pass/Fail", weight: 8, critical: true },
      { name: "Seller Authority", type: "Pass/Fail", weight: 6, critical: false },
      { name: "Power of Attorney", type: "Pass/Fail", weight: 4, critical: false },
      { name: "Succession Certificate", type: "Pass/Fail", weight: 4, critical: false },
      { name: "Government Acquisition Notice", type: "Pass/Fail", weight: 5, critical: true },
    ],
  },
  {
    name: "Regulatory", department: "Planning",
    criteria: [
      { name: "Zoning Compliance", type: "Pass/Fail", weight: 8, critical: true },
      { name: "FAR / Coverage Limit", type: "Numeric", weight: 6, critical: false },
      { name: "Height Restriction", type: "Numeric", weight: 5, critical: false },
      { name: "Environmental Clearance", type: "Pass/Fail", weight: 6, critical: false },
      { name: "RAJUK / Authority Approval", type: "Pass/Fail", weight: 8, critical: false },
      { name: "Road Widening Impact", type: "Numeric", weight: 4, critical: false },
    ],
  },
  {
    name: "Engineering", department: "Engineering",
    criteria: [
      { name: "Site Accessibility", type: "Rating", weight: 6, critical: false },
      { name: "Existing Site Condition", type: "Rating", weight: 5, critical: false },
      { name: "Topography", type: "Rating", weight: 4, critical: false },
      { name: "Soil Condition", type: "Rating", weight: 7, critical: false },
      { name: "Buildable Area", type: "Numeric", weight: 5, critical: false },
      { name: "Utility Availability", type: "Rating", weight: 4, critical: false },
      { name: "Foundation Requirement", type: "Rating", weight: 8, critical: false },
      { name: "Construction Constraints", type: "Rating", weight: 5, critical: false },
      { name: "Preliminary Cost Assessment", type: "Amount", weight: 8, critical: false },
      { name: "Construction Duration", type: "Numeric", weight: 4, critical: false },
      { name: "Technical Risk", type: "Rating", weight: 5, critical: false },
    ],
  },
  {
    name: "Market", department: "Marketing",
    criteria: [
      { name: "Market Demand", type: "Rating", weight: 8, critical: false },
      { name: "Competitive Supply", type: "Rating", weight: 5, critical: false },
      { name: "Expected Selling Price", type: "Amount", weight: 6, critical: false },
      { name: "Price Trend", type: "Rating", weight: 4, critical: false },
      { name: "Target Demographic", type: "Choice", weight: 3, critical: false },
      { name: "Infrastructure Development", type: "Rating", weight: 4, critical: false },
      { name: "Comparable Projects", type: "Rating", weight: 4, critical: false },
      { name: "Marketing Complexity", type: "Rating", weight: 3, critical: false },
    ],
  },
  {
    name: "Sales", department: "Sales",
    criteria: [
      { name: "Sales Velocity Estimate", type: "Numeric", weight: 5, critical: false },
      { name: "Pre-Sales Potential", type: "Rating", weight: 4, critical: false },
      { name: "Payment Plan Feasibility", type: "Rating", weight: 3, critical: false },
      { name: "Customer Profile Match", type: "Rating", weight: 3, critical: false },
      { name: "Competition Impact", type: "Rating", weight: 3, critical: false },
    ],
  },
  {
    name: "Financial", department: "Finance",
    criteria: [
      { name: "IRR", type: "Percentage", weight: 10, critical: false },
      { name: "Net Profit Margin", type: "Percentage", weight: 8, critical: false },
      { name: "Payback Period", type: "Numeric", weight: 5, critical: false },
      { name: "Peak Funding Requirement", type: "Amount", weight: 5, critical: false },
      { name: "Break-Even Analysis", type: "Numeric", weight: 4, critical: false },
      { name: "Finance Cost Sensitivity", type: "Rating", weight: 4, critical: false },
    ],
  },
  {
    name: "Risk", department: "Management",
    criteria: [
      { name: "Overall Risk Rating", type: "Rating", weight: 5, critical: false },
      { name: "Market Risk", type: "Rating", weight: 3, critical: false },
      { name: "Execution Risk", type: "Rating", weight: 3, critical: false },
    ],
  },
];

interface TeamAssignment {
  section: string;
  department: string;
  method: string;
  role: string;
  reviewer: string;
  deadline: string;
}

const teamAssignments: TeamAssignment[] = [
  { section: "Land & Location", department: "Land / BD", method: "Role", role: "Land Officer", reviewer: "BD Head", deadline: "+2 days" },
  { section: "Legal", department: "Legal", method: "Role", role: "Legal Officer", reviewer: "Head of Legal", deadline: "+7 days" },
  { section: "Regulatory", department: "Planning", method: "Role", role: "Planning Officer", reviewer: "Planning Head", deadline: "+10 days" },
  { section: "Engineering", department: "Engineering", method: "Role", role: "Engineer", reviewer: "Chief Engineer", deadline: "+7 days" },
  { section: "Market", department: "Marketing", method: "Role", role: "Analyst", reviewer: "Marketing Head", deadline: "+5 days" },
  { section: "Sales", department: "Sales", method: "Role", role: "Sales Manager", reviewer: "Sales Head", deadline: "+5 days" },
  { section: "Financial", department: "Finance", method: "Role", role: "Analyst", reviewer: "CFO", deadline: "+4 days" },
  { section: "Risk", department: "Management", method: "Role", role: "Coordinator", reviewer: "Director", deadline: "After deps" },
];

interface WorkflowStep {
  name: string;
  startsWhen: string;
  deadline: string;
  department: string;
  dependencies: string[];
}

const workflowSteps: WorkflowStep[] = [
  { name: "Land & Site", startsWhen: "Evaluation starts", deadline: "+2 days", department: "Land / BD", dependencies: [] },
  { name: "Legal", startsWhen: "Land & Site complete", deadline: "+7 days", department: "Legal", dependencies: ["Land & Site"] },
  { name: "Engineering", startsWhen: "Land & Site complete", deadline: "+7 days", department: "Engineering", dependencies: ["Land & Site"] },
  { name: "Regulatory", startsWhen: "Land & Site complete", deadline: "+10 days", department: "Planning", dependencies: ["Land & Site"] },
  { name: "Market", startsWhen: "Evaluation starts", deadline: "+5 days", department: "Marketing", dependencies: [] },
  { name: "Sales", startsWhen: "Market complete", deadline: "+5 days", department: "Sales", dependencies: ["Market"] },
  { name: "Preliminary Cost", startsWhen: "Engineering complete", deadline: "+3 days", department: "Engineering", dependencies: ["Engineering"] },
  { name: "Financial Feasibility", startsWhen: "Cost + Market + Sales done", deadline: "+4 days", department: "Finance", dependencies: ["Preliminary Cost", "Market", "Sales"] },
];

interface ScoringSection {
  name: string;
  weight: number;
}

const scoringWeights: ScoringSection[] = [
  { name: "Land & Location", weight: 10 },
  { name: "Legal", weight: 20 },
  { name: "Regulatory", weight: 10 },
  { name: "Engineering", weight: 20 },
  { name: "Market", weight: 15 },
  { name: "Sales", weight: 5 },
  { name: "Financial", weight: 15 },
  { name: "Risk", weight: 5 },
];

const criticalRules = [
  { criterion: "Legal Title Verification", condition: "= Fail", result: "Not Recommended" },
  { criterion: "Critical Regulatory Restriction", condition: "= Yes", result: "Not Recommended" },
  { criterion: "IRR", condition: "< 15%", result: "Management Exception Required" },
  { criterion: "Critical Engineering Risk", condition: "= Yes", result: "Management Exception Required" },
];

const reportSections = [
  "Executive Summary", "Land Information", "Initial Selection Summary",
  "Site Assessment", "Legal Assessment", "Regulatory Assessment",
  "Engineering Assessment", "Market Assessment", "Sales Assessment",
  "Preliminary Cost Estimate", "Financial Feasibility", "Key Findings",
  "Risk Register", "Department Recommendations", "Overall Recommendation",
  "Management Decision",
];

// ─── Component ─────────────────────────────────────────────────

export default function FrameworkBuilderPage() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "structure";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [expandedSection, setExpandedSection] = useState<string | null>("Engineering");

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <Link
          href="/real-estate/settings/land-evaluation/frameworks"
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-2"
        >
          <ChevronLeft className="h-4 w-4" /> Evaluation Frameworks
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              Standard Land Evaluation
              <Badge className="bg-purple-100 text-purple-800 text-xs">Default</Badge>
            </h1>
            <p className="text-muted-foreground mt-1">
              Residential / commercial land evaluation &middot; 8 sections &middot; 54 criteria
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Duplicate</Button>
            <Button>Save Changes</Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-6 w-full max-w-2xl">
          <TabsTrigger value="structure" className="gap-1.5 text-xs">
            <ClipboardList className="h-3.5 w-3.5" /> Structure
          </TabsTrigger>
          <TabsTrigger value="team" className="gap-1.5 text-xs">
            <Users className="h-3.5 w-3.5" /> Team
          </TabsTrigger>
          <TabsTrigger value="workflow" className="gap-1.5 text-xs">
            <GitBranch className="h-3.5 w-3.5" /> Workflow
          </TabsTrigger>
          <TabsTrigger value="scoring" className="gap-1.5 text-xs">
            <BarChart3 className="h-3.5 w-3.5" /> Scoring
          </TabsTrigger>
          <TabsTrigger value="report" className="gap-1.5 text-xs">
            <FileText className="h-3.5 w-3.5" /> Report
          </TabsTrigger>
          <TabsTrigger value="preview" className="gap-1.5 text-xs">
            <Eye className="h-3.5 w-3.5" /> Preview
          </TabsTrigger>
        </TabsList>

        {/* ─── Structure Tab ─────────────────────────── */}
        <TabsContent value="structure" className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Evaluation Structure</h2>
            <Button size="sm" className="gap-1">
              <Plus className="h-4 w-4" /> Add Section
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Section List */}
            <div className="space-y-1">
              {sections.map((section) => {
                const isExpanded = expandedSection === section.name;
                return (
                  <div
                    key={section.name}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                      isExpanded ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                    onClick={() => setExpandedSection(isExpanded ? null : section.name)}
                  >
                    <GripVertical className={`h-4 w-4 ${isExpanded ? "text-primary-foreground/60" : "text-muted-foreground/50"}`} />
                    <span className="flex-1 text-sm font-medium">{section.name}</span>
                    <Badge
                      variant={isExpanded ? "secondary" : "outline"}
                      className={`text-[10px] ${isExpanded ? "bg-primary-foreground/20 text-primary-foreground" : ""}`}
                    >
                      {section.criteria.length} criteria
                    </Badge>
                    <ChevronRight className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-90 text-primary-foreground/60" : "text-muted-foreground"}`} />
                  </div>
                );
              })}
            </div>

            {/* Section Detail */}
            <div className="lg:col-span-2">
              {expandedSection ? (
                <SectionDetail
                  section={sections.find((s) => s.name === expandedSection)!}
                />
              ) : (
                <Card className="border-dashed">
                  <CardContent className="pt-6 text-center text-muted-foreground">
                    <ClipboardList className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
                    <p>Select a section to configure its criteria.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        {/* ─── Team Tab ──────────────────────────────── */}
        <TabsContent value="team" className="space-y-4 mt-4">
          <h2 className="text-lg font-semibold">Team Setup</h2>
          <p className="text-sm text-muted-foreground">Configure who owns each assessment section.</p>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Section</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Assignee Role</TableHead>
                  <TableHead>Reviewer</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamAssignments.map((t) => (
                  <TableRow key={t.section}>
                    <TableCell className="font-medium">{t.section}</TableCell>
                    <TableCell>{t.department}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">{t.method}</Badge>
                    </TableCell>
                    <TableCell>{t.role}</TableCell>
                    <TableCell>{t.reviewer}</TableCell>
                    <TableCell className="text-muted-foreground">{t.deadline}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {/* Team Detail Example */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Engineering Team Setup</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Responsible Department *</label>
                  <Select defaultValue="Engineering">
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["Engineering", "Legal", "Finance", "Marketing", "Sales", "Planning", "Management", "Land / BD"].map((d) => (
                        <SelectItem key={d} value={d}>{d}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Assignment Method</label>
                  <Select defaultValue="role">
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="role">Role</SelectItem>
                      <SelectItem value="person">Specific Person</SelectItem>
                      <SelectItem value="queue">Department Queue</SelectItem>
                      <SelectItem value="decide">Decide when evaluation starts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Default Role</label>
                  <Select defaultValue="engineer">
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engineer">Engineer</SelectItem>
                      <SelectItem value="senior-engineer">Senior Engineer</SelectItem>
                      <SelectItem value="cost-engineer">Cost Engineer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Reviewer</label>
                  <Select defaultValue="chief">
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chief">Chief Engineer</SelectItem>
                      <SelectItem value="head">Head of Engineering</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Separator />
              <div>
                <label className="text-sm font-medium">Contributors</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="secondary">Quantity Surveyor</Badge>
                  <Badge variant="secondary">Structural Engineer</Badge>
                  <Button variant="outline" size="sm" className="h-6 text-xs gap-1">
                    <Plus className="h-3 w-3" /> Add Contributor
                  </Button>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Complete within</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input type="number" defaultValue={7} className="max-w-[80px]" />
                    <span className="text-sm text-muted-foreground">working days</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Escalate overdue to</label>
                  <Select defaultValue="head">
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="head">Head of Engineering</SelectItem>
                      <SelectItem value="director">Director</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ─── Workflow Tab ───────────────────────────── */}
        <TabsContent value="workflow" className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Workflow</h2>
              <p className="text-sm text-muted-foreground">Controls task generation and dependency order.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Visual Flow</Button>
              <Button variant="outline" size="sm">List</Button>
            </div>
          </div>

          {/* Visual Flow */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-2">
                <Badge className="bg-slate-100 text-slate-800">LAND CREATED</Badge>
                <ArrowDown className="h-4 w-4 text-muted-foreground" />
                <Badge className="bg-blue-100 text-blue-800">INITIAL SELECTION</Badge>
                <ArrowDown className="h-4 w-4 text-muted-foreground" />
                <Badge className="bg-emerald-100 text-emerald-800">QUALIFIED</Badge>
                <ArrowDown className="h-4 w-4 text-muted-foreground" />

                {/* Parallel group 1 */}
                <div className="flex items-center gap-3">
                  <Badge variant="outline">Land & Site</Badge>
                  <span className="text-xs text-muted-foreground">+</span>
                  <Badge variant="outline">Market</Badge>
                </div>
                <ArrowDown className="h-4 w-4 text-muted-foreground" />

                {/* Parallel group 2 */}
                <div className="border border-dashed rounded-lg p-3 flex flex-wrap justify-center gap-2">
                  <Badge variant="outline">Legal</Badge>
                  <Badge variant="outline">Engineering</Badge>
                  <Badge variant="outline">Regulatory</Badge>
                  <Badge variant="outline">Sales</Badge>
                </div>
                <ArrowDown className="h-4 w-4 text-muted-foreground" />
                <Badge variant="outline">Preliminary Cost</Badge>
                <ArrowDown className="h-4 w-4 text-muted-foreground" />
                <Badge variant="outline">Financial Feasibility</Badge>
                <ArrowDown className="h-4 w-4 text-muted-foreground" />
                <Badge className="bg-amber-100 text-amber-800">DEPARTMENT SIGN-OFFS</Badge>
                <ArrowDown className="h-4 w-4 text-muted-foreground" />
                <Badge className="bg-purple-100 text-purple-800">MANAGEMENT DECISION</Badge>
              </div>
            </CardContent>
          </Card>

          {/* List View */}
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Step</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Starts When</TableHead>
                  <TableHead>Dependencies</TableHead>
                  <TableHead>Deadline</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workflowSteps.map((step) => (
                  <TableRow key={step.name} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">{step.name}</TableCell>
                    <TableCell className="text-muted-foreground">{step.department}</TableCell>
                    <TableCell className="text-muted-foreground">{step.startsWhen}</TableCell>
                    <TableCell>
                      {step.dependencies.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {step.dependencies.map((d) => (
                            <Badge key={d} variant="outline" className="text-[10px]">{d}</Badge>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">None</span>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{step.deadline}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {/* Step Config Example */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Preliminary Cost Assessment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Type</label>
                  <Select defaultValue="assessment">
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="assessment">Assessment / Work Package</SelectItem>
                      <SelectItem value="review">Review / Sign-off</SelectItem>
                      <SelectItem value="decision">Decision</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Department</label>
                  <Select defaultValue="Engineering">
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["Engineering", "Finance", "Legal"].map((d) => (
                        <SelectItem key={d} value={d}>{d}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div>
                <label className="text-sm font-medium">Start Condition</label>
                <div className="space-y-2 mt-2">
                  {["Immediately", "After dependencies", "Manual"].map((opt) => (
                    <div key={opt} className="flex items-center gap-2">
                      <input type="radio" name="startCondition" value={opt} defaultChecked={opt === "After dependencies"} className="h-4 w-4" />
                      <label className="text-sm">{opt}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Dependencies</label>
                <div className="space-y-1 mt-2">
                  {["Engineering Assessment", "Site Survey"].map((dep) => (
                    <div key={dep} className="flex items-center gap-2">
                      <Checkbox defaultChecked />
                      <span className="text-sm">{dep}</span>
                    </div>
                  ))}
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="mt-2 max-w-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All selected must complete</SelectItem>
                    <SelectItem value="any">Any selected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div>
                <label className="text-sm font-medium">Deadline</label>
                <div className="flex items-center gap-2 mt-1">
                  <Input type="number" defaultValue={3} className="max-w-[80px]" />
                  <span className="text-sm text-muted-foreground">working days after start</span>
                </div>
              </div>

              <Separator />

              <div>
                <label className="text-sm font-medium">Required for Completion</label>
                <div className="space-y-1 mt-2">
                  {[
                    "All required criteria complete",
                    "Preliminary cost estimate complete",
                    "Required evidence attached",
                    "Reviewer sign-off",
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
                <label className="text-sm font-medium">On Completion</label>
                <div className="space-y-1 mt-2">
                  {[
                    { label: "Notify Finance", checked: true },
                    { label: "Unlock Financial Feasibility", checked: true },
                    { label: "Notify Management", checked: false },
                  ].map((action) => (
                    <div key={action.label} className="flex items-center gap-2">
                      <Checkbox defaultChecked={action.checked} />
                      <span className="text-sm">{action.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ─── Scoring Tab ────────────────────────────── */}
        <TabsContent value="scoring" className="space-y-4 mt-4">
          <h2 className="text-lg font-semibold">Scoring & Rules</h2>

          {/* Section Weights */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Section Weights</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Section</TableHead>
                    <TableHead className="text-right">Weight</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scoringWeights.map((s) => (
                    <TableRow key={s.name}>
                      <TableCell className="font-medium">{s.name}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Input type="number" defaultValue={s.weight} className="max-w-[70px] text-right" />
                          <span className="text-muted-foreground">%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="border-t-2">
                    <TableCell className="font-bold">Total</TableCell>
                    <TableCell className="text-right font-bold">
                      {scoringWeights.reduce((sum, s) => sum + s.weight, 0)}%
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Overall Result Thresholds */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Overall Result Thresholds</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { range: "85 – 100", label: "Strongly Recommended", color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
                  { range: "75 – 84", label: "Recommended", color: "bg-blue-100 text-blue-800 border-blue-200" },
                  { range: "60 – 74", label: "Conditional", color: "bg-amber-100 text-amber-800 border-amber-200" },
                  { range: "Below 60", label: "Not Recommended", color: "bg-red-100 text-red-800 border-red-200" },
                ].map((t) => (
                  <div key={t.label} className={`flex items-center justify-between p-3 rounded-lg border ${t.color}`}>
                    <span className="font-medium text-sm">{t.range}</span>
                    <span className="text-sm">{t.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Critical Rules */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                Critical Decision Rules
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Regardless of overall score, these rules override the result.
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {criticalRules.map((rule, i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{rule.criterion}</p>
                    <p className="text-xs text-muted-foreground">{rule.condition}</p>
                  </div>
                  <Select defaultValue={rule.result}>
                    <SelectTrigger className="w-[250px]"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Not Recommended">Not Recommended</SelectItem>
                      <SelectItem value="Management Exception Required">Management Exception Required</SelectItem>
                      <SelectItem value="Conditional">Conditional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}
              <Button variant="outline" size="sm" className="gap-1">
                <Plus className="h-4 w-4" /> Add Rule
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ─── Report Tab ─────────────────────────────── */}
        <TabsContent value="report" className="space-y-4 mt-4">
          <h2 className="text-lg font-semibold">Report Structure</h2>
          <p className="text-sm text-muted-foreground">
            Configure the management report sections and what each department contributes.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Report Sections */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Report Sections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {reportSections.map((section, i) => (
                    <div key={section} className="flex items-center gap-2 px-3 py-2 hover:bg-muted/50 rounded cursor-pointer">
                      <GripVertical className="h-4 w-4 text-muted-foreground/50" />
                      <span className="text-xs text-muted-foreground w-5">{i + 1}.</span>
                      <span className="text-sm">{section}</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="gap-1 mt-3">
                  <Plus className="h-4 w-4" /> Add Section
                </Button>
              </CardContent>
            </Card>

            {/* Department Output Config */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Engineering Output</CardTitle>
                <p className="text-sm text-muted-foreground">What should be pulled into the management report?</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Include</label>
                  <div className="space-y-1 mt-2">
                    {["Overall recommendation", "Department head comments", "Overall score"].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <Checkbox defaultChecked />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Findings</label>
                  <div className="space-y-1 mt-2">
                    {["Critical + High + Medium", "All findings", "Selected manually"].map((opt, i) => (
                      <div key={opt} className="flex items-center gap-2">
                        <input type="radio" name="findings" defaultChecked={i === 0} className="h-4 w-4" />
                        <span className="text-sm">{opt}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Risks</label>
                  <div className="space-y-1 mt-2">
                    {[
                      { label: "Critical", checked: true },
                      { label: "High", checked: true },
                      { label: "Medium", checked: true },
                      { label: "Low", checked: false },
                    ].map((r) => (
                      <div key={r.label} className="flex items-center gap-2">
                        <Checkbox defaultChecked={r.checked} />
                        <span className="text-sm">{r.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Cost</label>
                  <div className="space-y-1 mt-2">
                    {["Preliminary construction cost", "Cost category breakdown", "Benchmark variance"].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <Checkbox defaultChecked />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium">Exclude</label>
                  <div className="space-y-1 mt-2">
                    {["Draft comments", "Internal discussions", "Returned assessments"].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <Checkbox defaultChecked />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ─── Preview Tab ────────────────────────────── */}
        <TabsContent value="preview" className="space-y-4 mt-4">
          <h2 className="text-lg font-semibold">Configuration Preview</h2>
          <p className="text-sm text-muted-foreground">
            Summary of what happens when this framework is applied to a land evaluation.
          </p>

          <Card>
            <CardContent className="pt-6 space-y-6">
              {/* Work Packages */}
              <div>
                <h3 className="font-medium mb-3">When a land is qualified:</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  <span className="font-semibold text-foreground">{workflowSteps.length} work packages</span> will be generated.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {teamAssignments.map((t) => (
                    <div key={t.section} className="flex items-center justify-between p-2 bg-muted/50 rounded text-sm">
                      <span className="font-medium">{t.section}</span>
                      <span className="text-muted-foreground">{t.department}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Criteria */}
              <div>
                <p className="font-medium mb-3">
                  {sections.reduce((sum, s) => sum + s.criteria.length, 0)} criteria across {sections.length} sections
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {sections.map((s) => (
                    <div key={s.name} className="flex items-center justify-between text-sm">
                      <span>{s.name}</span>
                      <span className="text-muted-foreground">{s.criteria.length} criteria</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Duration */}
              <div>
                <p className="font-medium">Workflow estimated duration</p>
                <p className="text-2xl font-bold text-primary mt-1">14 working days</p>
              </div>

              <Separator />

              {/* Outputs */}
              <div>
                <p className="font-medium mb-3">Final output</p>
                <div className="space-y-2">
                  {[
                    "Department assessments",
                    "Preliminary cost estimate",
                    "Financial feasibility",
                    "Risk register",
                    "Management report",
                    "Management decision",
                  ].map((output) => (
                    <div key={output} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-emerald-600" />
                      <span>{output}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" className="gap-2">
              <Eye className="h-4 w-4" /> Run Test Evaluation
            </Button>
            <Button className="gap-2">
              <Check className="h-4 w-4" /> Publish Configuration
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ─── Section Detail Component ────────────────────────────────────

function SectionDetail({ section }: { section: EvalSection }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{section.name}</CardTitle>
          <Badge variant="outline" className="text-xs">Department: {section.department}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{section.criteria.length} criteria</p>
      </CardHeader>
      <CardContent className="space-y-1">
        {section.criteria.map((criterion) => (
          <div
            key={criterion.name}
            className="flex items-center gap-2 px-3 py-2 hover:bg-muted/50 rounded cursor-pointer"
          >
            <GripVertical className="h-4 w-4 text-muted-foreground/50" />
            <span className="text-sm flex-1">{criterion.name}</span>
            {criterion.critical && (
              <Badge variant="destructive" className="text-[10px] px-1.5 py-0">Critical</Badge>
            )}
            <Badge variant="outline" className="text-[10px]">{criterion.type}</Badge>
            <span className="text-xs text-muted-foreground w-10 text-right">{criterion.weight}%</span>
          </div>
        ))}
        <Separator className="my-2" />
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1 text-xs">
            <Plus className="h-3.5 w-3.5" /> Add Existing Criterion
          </Button>
          <Button variant="outline" size="sm" className="gap-1 text-xs">
            <Plus className="h-3.5 w-3.5" /> Create New Criterion
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
