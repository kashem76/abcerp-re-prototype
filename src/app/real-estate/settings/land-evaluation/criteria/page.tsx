"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronLeft, ClipboardList, Plus, Search, X, Pencil,
  Info, ExternalLink,
} from "lucide-react";

// ─── Mock Data ─────────────────────────────────────────────────

type ResponseType = "Rating" | "Pass/Fail" | "Choice" | "Numeric" | "Amount" | "Percentage";

interface Criterion {
  id: string;
  name: string;
  department: string;
  category: string;
  responseType: ResponseType;
  weight: number;
  critical: boolean;
  active: boolean;
  usedIn: number;
  description: string;
  guidance: string;
  scaleLabels?: string[];
  minimumAcceptable?: number;
  requiredOutputs: string[];
  reportInclusion: string[];
}

const departments = ["Engineering", "Legal", "Marketing", "Sales", "Finance", "Planning", "Management", "Land / BD"];
const categories = ["Site / Location", "Structural / Technical", "Title / Ownership", "Regulatory", "Market / Demand", "Financial / Return", "Risk"];
const responseTypes: ResponseType[] = ["Rating", "Pass/Fail", "Choice", "Numeric", "Amount", "Percentage"];

const mockCriteria: Criterion[] = [
  {
    id: "C001", name: "Site Accessibility", department: "Engineering", category: "Site / Location",
    responseType: "Rating", weight: 6, critical: false, active: true, usedIn: 3,
    description: "Assess the accessibility of the site for construction equipment and vehicles.",
    guidance: "Consider road width, turning radius for heavy vehicles, proximity to main roads, and any seasonal access restrictions.",
    scaleLabels: ["Very Poor", "Poor", "Acceptable", "Good", "Excellent"],
    minimumAcceptable: 3,
    requiredOutputs: ["Assessment", "Findings", "Evidence", "Risk", "Recommendation"],
    reportInclusion: ["Include score", "Include findings", "Include recommendation"],
  },
  {
    id: "C002", name: "Foundation Requirement", department: "Engineering", category: "Structural / Technical",
    responseType: "Rating", weight: 8, critical: false, active: true, usedIn: 2,
    description: "Assess likely foundation requirements based on soil condition and building load.",
    guidance: "Consider soil condition, proposed building load, groundwater level, nearby structures. Reference bore-log data if available.",
    scaleLabels: ["Very Poor", "Poor", "Acceptable", "Good", "Excellent"],
    minimumAcceptable: 3,
    requiredOutputs: ["Assessment", "Findings", "Evidence", "Risk", "Recommendation", "Cost Estimate"],
    reportInclusion: ["Include score", "Include findings", "Include recommendation"],
  },
  {
    id: "C003", name: "Ownership Verification", department: "Legal", category: "Title / Ownership",
    responseType: "Pass/Fail", weight: 15, critical: true, active: true, usedIn: 4,
    description: "Verify legal ownership of the land through title search and document verification.",
    guidance: "Check original deed, chain of title (min 25 years), mutation records, encumbrance certificate. Verify NID/TIN of all owners.",
    requiredOutputs: ["Assessment", "Findings", "Evidence", "Risk", "Recommendation"],
    reportInclusion: ["Include score", "Include findings", "Include recommendation"],
  },
  {
    id: "C004", name: "Chain of Title", department: "Legal", category: "Title / Ownership",
    responseType: "Pass/Fail", weight: 10, critical: true, active: true, usedIn: 3,
    description: "Verify unbroken chain of ownership from original record to current seller.",
    guidance: "Trace ownership through all transfers. Flag any gaps, disputed transfers, or inheritance without probate.",
    requiredOutputs: ["Assessment", "Findings", "Evidence"],
    reportInclusion: ["Include score", "Include findings"],
  },
  {
    id: "C005", name: "Encumbrance Check", department: "Legal", category: "Title / Ownership",
    responseType: "Pass/Fail", weight: 10, critical: true, active: true, usedIn: 3,
    description: "Check for any mortgages, liens, or encumbrances on the property.",
    guidance: "Obtain encumbrance certificate from sub-registrar office. Check for bank mortgages, court orders, or government acquisition notices.",
    requiredOutputs: ["Assessment", "Findings", "Evidence", "Risk"],
    reportInclusion: ["Include score", "Include findings", "Include recommendation"],
  },
  {
    id: "C006", name: "Mutation Verification", department: "Legal", category: "Title / Ownership",
    responseType: "Pass/Fail", weight: 8, critical: false, active: true, usedIn: 3,
    description: "Verify mutation record matches current ownership and deed details.",
    guidance: "Compare Khatian/Dag/Mouza details in mutation certificate with sale deed. Flag any discrepancies.",
    requiredOutputs: ["Assessment", "Findings", "Evidence"],
    reportInclusion: ["Include score", "Include findings"],
  },
  {
    id: "C007", name: "Market Demand", department: "Marketing", category: "Market / Demand",
    responseType: "Rating", weight: 8, critical: false, active: true, usedIn: 3,
    description: "Assess current and projected market demand for the proposed development type in this location.",
    guidance: "Review comparable launches in area, absorption rates, price trends, demographic data, and infrastructure development plans.",
    scaleLabels: ["Very Weak", "Weak", "Moderate", "Strong", "Very Strong"],
    minimumAcceptable: 3,
    requiredOutputs: ["Assessment", "Findings", "Evidence", "Recommendation"],
    reportInclusion: ["Include score", "Include findings", "Include recommendation"],
  },
  {
    id: "C008", name: "Expected Selling Price", department: "Marketing", category: "Market / Demand",
    responseType: "Amount", weight: 6, critical: false, active: true, usedIn: 2,
    description: "Determine expected selling price per square foot based on market analysis.",
    guidance: "Compare with recent transactions in 1km radius. Factor in project positioning, amenities, and market trajectory.",
    requiredOutputs: ["Assessment", "Findings", "Evidence"],
    reportInclusion: ["Include score", "Include findings"],
  },
  {
    id: "C009", name: "Soil Condition", department: "Engineering", category: "Structural / Technical",
    responseType: "Rating", weight: 7, critical: false, active: true, usedIn: 3,
    description: "Evaluate soil bearing capacity and suitability for construction.",
    guidance: "Review bore-log data if available. Assess soil type, bearing capacity, water table depth, and liquefaction risk.",
    scaleLabels: ["Very Poor", "Poor", "Acceptable", "Good", "Excellent"],
    minimumAcceptable: 2,
    requiredOutputs: ["Assessment", "Findings", "Evidence", "Risk", "Cost Estimate"],
    reportInclusion: ["Include score", "Include findings", "Include recommendation"],
  },
  {
    id: "C010", name: "Buildable Area", department: "Engineering", category: "Site / Location",
    responseType: "Numeric", weight: 5, critical: false, active: true, usedIn: 3,
    description: "Calculate effective buildable area after setbacks, road widening, and utility easements.",
    guidance: "Apply local authority setback rules (RAJUK/other). Deduct road widening, drainage easements, and any reserved land.",
    requiredOutputs: ["Assessment", "Findings"],
    reportInclusion: ["Include score"],
  },
  {
    id: "C011", name: "Utility Availability", department: "Engineering", category: "Site / Location",
    responseType: "Rating", weight: 4, critical: false, active: true, usedIn: 3,
    description: "Assess availability and capacity of water, electricity, gas, and sewerage.",
    guidance: "Check WASA, DESCO/DPDC, Titas Gas connections. Assess capacity for proposed development load.",
    scaleLabels: ["None Available", "Partial", "Available but Limited", "Good", "Excellent"],
    minimumAcceptable: 2,
    requiredOutputs: ["Assessment", "Findings", "Evidence"],
    reportInclusion: ["Include score", "Include findings"],
  },
  {
    id: "C012", name: "IRR", department: "Finance", category: "Financial / Return",
    responseType: "Percentage", weight: 10, critical: false, active: true, usedIn: 3,
    description: "Internal Rate of Return of the proposed development project.",
    guidance: "Calculate based on projected cash flows. Use company-standard discount rate for comparison.",
    minimumAcceptable: 15,
    requiredOutputs: ["Assessment", "Findings", "Recommendation"],
    reportInclusion: ["Include score", "Include findings", "Include recommendation"],
  },
  {
    id: "C013", name: "Regulatory Compliance", department: "Planning", category: "Regulatory",
    responseType: "Pass/Fail", weight: 10, critical: true, active: true, usedIn: 3,
    description: "Verify the land can be developed under current zoning and building regulations.",
    guidance: "Check DAP zoning, FAR limits, height restrictions, environmental clearances, and any government acquisition notices.",
    requiredOutputs: ["Assessment", "Findings", "Evidence", "Risk", "Recommendation"],
    reportInclusion: ["Include score", "Include findings", "Include recommendation"],
  },
  {
    id: "C014", name: "Construction Duration", department: "Engineering", category: "Structural / Technical",
    responseType: "Numeric", weight: 4, critical: false, active: true, usedIn: 2,
    description: "Estimated construction duration in months.",
    guidance: "Consider building height, number of basements, site constraints, and seasonal factors.",
    requiredOutputs: ["Assessment", "Findings"],
    reportInclusion: ["Include score"],
  },
  {
    id: "C015", name: "Litigation Search", department: "Legal", category: "Title / Ownership",
    responseType: "Pass/Fail", weight: 8, critical: true, active: true, usedIn: 3,
    description: "Search for any pending or past litigation related to the property.",
    guidance: "Search court records for cases involving the property, owners, or related parties. Check for civil suits, criminal cases, and revenue court matters.",
    requiredOutputs: ["Assessment", "Findings", "Evidence", "Risk"],
    reportInclusion: ["Include score", "Include findings", "Include recommendation"],
  },
  {
    id: "C016", name: "Sales Velocity", department: "Sales", category: "Market / Demand",
    responseType: "Numeric", weight: 5, critical: false, active: true, usedIn: 2,
    description: "Expected unit sales per quarter based on market conditions and project positioning.",
    guidance: "Reference comparable project sales data in the area. Consider project size, pricing strategy, and market conditions.",
    requiredOutputs: ["Assessment", "Findings", "Recommendation"],
    reportInclusion: ["Include score", "Include findings"],
  },
  {
    id: "C017", name: "Technical Risk", department: "Engineering", category: "Risk",
    responseType: "Rating", weight: 5, critical: false, active: true, usedIn: 2,
    description: "Overall technical risk assessment for the proposed development.",
    guidance: "Consider all engineering factors: soil, foundation, access, utilities, construction complexity, environmental hazards.",
    scaleLabels: ["Critical", "High", "Medium", "Low", "Very Low"],
    minimumAcceptable: 3,
    requiredOutputs: ["Assessment", "Findings", "Risk", "Recommendation"],
    reportInclusion: ["Include score", "Include findings", "Include recommendation"],
  },
  {
    id: "C018", name: "Seller Authority", department: "Legal", category: "Title / Ownership",
    responseType: "Pass/Fail", weight: 6, critical: false, active: true, usedIn: 2,
    description: "Verify the seller has legal authority to sell the property.",
    guidance: "Check for power of attorney validity, succession certificates, guardian/minor issues, NRI/foreign ownership restrictions.",
    requiredOutputs: ["Assessment", "Findings", "Evidence"],
    reportInclusion: ["Include score", "Include findings"],
  },
];

// ─── Component ─────────────────────────────────────────────────

export default function CriteriaLibraryPage() {
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("active");
  const [selectedCriterion, setSelectedCriterion] = useState<Criterion | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const filtered = mockCriteria.filter((c) => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.department.toLowerCase().includes(search.toLowerCase())) return false;
    if (deptFilter !== "all" && c.department !== deptFilter) return false;
    if (typeFilter !== "all" && c.responseType !== typeFilter) return false;
    if (statusFilter === "active" && !c.active) return false;
    if (statusFilter === "inactive" && c.active) return false;
    return true;
  });

  const openCriterion = (c: Criterion) => {
    setSelectedCriterion(c);
    setSheetOpen(true);
  };

  const responseTypeBadge = (type: ResponseType) => {
    const colors: Record<ResponseType, string> = {
      "Rating": "bg-blue-100 text-blue-800",
      "Pass/Fail": "bg-red-100 text-red-800",
      "Choice": "bg-purple-100 text-purple-800",
      "Numeric": "bg-amber-100 text-amber-800",
      "Amount": "bg-emerald-100 text-emerald-800",
      "Percentage": "bg-cyan-100 text-cyan-800",
    };
    return <Badge className={`${colors[type]} text-[10px] font-medium`}>{type}</Badge>;
  };

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
            <ClipboardList className="h-7 w-7 text-emerald-600" />
            <div>
              <h1 className="text-2xl font-bold">Assessment Criteria</h1>
              <p className="text-muted-foreground">
                Reusable criteria library shared across all evaluation frameworks.
              </p>
            </div>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> New Criterion
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search criteria..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={deptFilter} onValueChange={(v) => setDeptFilter(v ?? "all")}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map((d) => (
              <SelectItem key={d} value={d}>{d}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v ?? "all")}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {responseTypes.map((t) => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? "active")}>
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        {(search || deptFilter !== "all" || typeFilter !== "all" || statusFilter !== "active") && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => { setSearch(""); setDeptFilter("all"); setTypeFilter("all"); setStatusFilter("active"); }}
          >
            <X className="h-4 w-4 mr-1" /> Clear
          </Button>
        )}
      </div>

      {/* Summary */}
      <div className="flex gap-4 text-sm text-muted-foreground">
        <span>{filtered.length} criteria</span>
        <span>{filtered.filter((c) => c.critical).length} critical</span>
        <span>{new Set(filtered.map((c) => c.department)).size} departments</span>
      </div>

      {/* Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[280px]">Criterion</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-center">Weight</TableHead>
              <TableHead className="text-center">Used In</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((c) => (
              <TableRow
                key={c.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => openCriterion(c)}
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{c.name}</span>
                    {c.critical && (
                      <Badge variant="destructive" className="text-[10px] px-1.5 py-0">Critical</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{c.department}</TableCell>
                <TableCell className="text-muted-foreground">{c.category}</TableCell>
                <TableCell>{responseTypeBadge(c.responseType)}</TableCell>
                <TableCell className="text-center">{c.weight}%</TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline" className="text-xs">{c.usedIn} frameworks</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); openCriterion(c); }}>
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Info */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardContent className="pt-4 flex gap-3">
          <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800">
            Criteria are reusable across frameworks. Editing a criterion here updates it in all frameworks that reference it.
            To create a framework-specific variant, duplicate the criterion and modify the copy.
          </p>
        </CardContent>
      </Card>

      {/* Edit Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-[520px] sm:max-w-[520px] overflow-y-auto">
          {selectedCriterion && (
            <CriterionEditForm criterion={selectedCriterion} onClose={() => setSheetOpen(false)} />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

// ─── Criterion Edit Form ────────────────────────────────────────

function CriterionEditForm({ criterion, onClose }: { criterion: Criterion; onClose: () => void }) {
  return (
    <div className="space-y-6">
      <SheetHeader>
        <SheetTitle className="flex items-center gap-2">
          Assessment Criterion
          {criterion.critical && (
            <Badge variant="destructive" className="text-[10px]">Critical</Badge>
          )}
        </SheetTitle>
      </SheetHeader>

      {/* Identity */}
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium">Name *</label>
          <Input defaultValue={criterion.name} className="mt-1" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium">Department</label>
            <Select defaultValue={criterion.department}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {departments.map((d) => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Category</label>
            <Select defaultValue={criterion.category}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      {/* Guidance */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Guidance</h3>
        <div>
          <label className="text-sm font-medium">Description</label>
          <Textarea defaultValue={criterion.description} className="mt-1" rows={2} />
        </div>
        <div>
          <label className="text-sm font-medium">Evaluator Guidance</label>
          <Textarea defaultValue={criterion.guidance} className="mt-1" rows={3} />
        </div>
      </div>

      <Separator />

      {/* Response */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Response</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium">Response Type</label>
            <Select defaultValue={criterion.responseType}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {responseTypes.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {criterion.responseType === "Rating" && (
            <div>
              <label className="text-sm font-medium">Scale</label>
              <Select defaultValue="1-5">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-5">1 - 5</SelectItem>
                  <SelectItem value="1-10">1 - 10</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        {criterion.scaleLabels && (
          <div className="space-y-1 bg-muted/50 rounded p-3">
            {criterion.scaleLabels.map((label, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <span className="font-mono text-muted-foreground w-4 text-right">{i + 1}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <Separator />

      {/* Required Output */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Required Output</h3>
        <div className="space-y-2">
          {["Assessment", "Findings", "Evidence", "Risk", "Recommendation", "Cost Estimate"].map((output) => (
            <div key={output} className="flex items-center gap-2">
              <Checkbox
                id={`output-${output}`}
                defaultChecked={criterion.requiredOutputs.includes(output)}
              />
              <label htmlFor={`output-${output}`} className="text-sm">{output}</label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Scoring */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Scoring</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium">Weight</label>
            <div className="flex items-center gap-2 mt-1">
              <Input type="number" defaultValue={criterion.weight} className="max-w-[80px]" />
              <span className="text-sm text-muted-foreground">%</span>
            </div>
          </div>
          {criterion.minimumAcceptable !== undefined && (
            <div>
              <label className="text-sm font-medium">Minimum Acceptable</label>
              <Input type="number" defaultValue={criterion.minimumAcceptable} className="mt-1 max-w-[80px]" />
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="critical" defaultChecked={criterion.critical} />
          <label htmlFor="critical" className="text-sm font-medium">Critical Criterion</label>
        </div>
      </div>

      <Separator />

      {/* Reporting */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Reporting</h3>
        <div className="space-y-2">
          {["Include score", "Include major findings", "Include recommendation", "Allow inclusion in management report"].map((opt) => (
            <div key={opt} className="flex items-center gap-2">
              <Checkbox
                id={`report-${opt}`}
                defaultChecked={criterion.reportInclusion.includes(opt) || opt === "Allow inclusion in management report"}
              />
              <label htmlFor={`report-${opt}`} className="text-sm">{opt}</label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Usage */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Usage</h3>
        <p className="text-sm text-muted-foreground">
          Used in <span className="font-medium text-foreground">{criterion.usedIn} frameworks</span>
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={onClose}>Save Criterion</Button>
      </div>
    </div>
  );
}
