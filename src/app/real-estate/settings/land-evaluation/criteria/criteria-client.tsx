"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
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
  Info, Trash2, AlertTriangle,
} from "lucide-react";
import {
  createCriterionAction,
  updateCriterionAction,
  deleteCriterionAction,
} from "./actions";

// ─── Types ────────────────────────────────────────────────────

type ResponseType = "Rating" | "Pass/Fail" | "Choice" | "Numeric" | "Amount" | "Percentage";

export interface CriterionRow {
  id: string;
  name: string;
  description: string | null;
  guidance: string | null;
  responseType: string;
  weight: number;
  critical: boolean;
  active: boolean;
  minimumAcceptable: number | null;
  scaleLabels: string | null;
  requiredOutputs: string | null;
  reportInclusion: string | null;
  categoryId: string;
  category: { id: string; name: string; department: string };
  _count: { frameworkCriteria: number };
}

export interface CategoryRow {
  id: string;
  name: string;
  department: string;
}

interface Props {
  criteria: CriterionRow[];
  categories: CategoryRow[];
}

// ─── Constants ────────────────────────────────────────────────

const responseTypes: ResponseType[] = ["Rating", "Pass/Fail", "Choice", "Numeric", "Amount", "Percentage"];
const outputOptions = ["Assessment", "Findings", "Evidence", "Risk", "Recommendation", "Cost Estimate"];
const reportOptions = ["Include score", "Include findings", "Include recommendation"];

// ─── Component ────────────────────────────────────────────────

export default function CriteriaLibraryClient({ criteria: initialCriteria, categories }: Props) {
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("active");
  const [selectedCriterion, setSelectedCriterion] = useState<CriterionRow | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetMode, setSheetMode] = useState<"create" | "edit">("edit");

  const departments = [...new Set(categories.map((c) => c.department))];

  const filtered = initialCriteria.filter((c) => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.category.department.toLowerCase().includes(search.toLowerCase())) return false;
    if (deptFilter !== "all" && c.category.department !== deptFilter) return false;
    if (typeFilter !== "all" && c.responseType !== typeFilter) return false;
    if (statusFilter === "active" && !c.active) return false;
    if (statusFilter === "inactive" && c.active) return false;
    return true;
  });

  const openEdit = (c: CriterionRow) => {
    setSelectedCriterion(c);
    setSheetMode("edit");
    setSheetOpen(true);
  };

  const openCreate = () => {
    setSelectedCriterion(null);
    setSheetMode("create");
    setSheetOpen(true);
  };

  const responseTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      "Rating": "bg-blue-100 text-blue-800",
      "Pass/Fail": "bg-red-100 text-red-800",
      "Choice": "bg-purple-100 text-purple-800",
      "Numeric": "bg-amber-100 text-amber-800",
      "Amount": "bg-emerald-100 text-emerald-800",
      "Percentage": "bg-cyan-100 text-cyan-800",
    };
    return <Badge className={`${colors[type] || "bg-gray-100 text-gray-800"} text-[10px] font-medium`}>{type}</Badge>;
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
          <Button className="gap-2" onClick={openCreate}>
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
        <span>{new Set(filtered.map((c) => c.category.department)).size} departments</span>
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
                onClick={() => openEdit(c)}
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{c.name}</span>
                    {c.critical && (
                      <Badge variant="destructive" className="text-[10px] px-1.5 py-0">Critical</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{c.category.department}</TableCell>
                <TableCell className="text-muted-foreground">{c.category.name}</TableCell>
                <TableCell>{responseTypeBadge(c.responseType)}</TableCell>
                <TableCell className="text-center">{c.weight}%</TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline" className="text-xs">{c._count.frameworkCriteria} frameworks</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); openEdit(c); }}>
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

      {/* Create / Edit Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-[520px] sm:max-w-[520px] overflow-y-auto">
          <CriterionForm
            mode={sheetMode}
            criterion={selectedCriterion}
            categories={categories}
            onClose={() => setSheetOpen(false)}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}

// ─── Unified Create / Edit Form ─────────────────────────────────

function CriterionForm({
  mode,
  criterion,
  categories,
  onClose,
}: {
  mode: "create" | "edit";
  criterion: CriterionRow | null;
  categories: CategoryRow[];
  onClose: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  // Form state
  const [name, setName] = useState(criterion?.name ?? "");
  const [categoryId, setCategoryId] = useState(criterion?.categoryId ?? categories[0]?.id ?? "");
  const [responseType, setResponseType] = useState<string>(criterion?.responseType ?? "Rating");
  const [description, setDescription] = useState(criterion?.description ?? "");
  const [guidance, setGuidance] = useState(criterion?.guidance ?? "");
  const [weight, setWeight] = useState(criterion?.weight ?? 5);
  const [critical, setCritical] = useState(criterion?.critical ?? false);
  const [minimumAcceptable, setMinimumAcceptable] = useState<string>(
    criterion?.minimumAcceptable?.toString() ?? ""
  );

  // JSON array fields
  const parsedOutputs: string[] = criterion?.requiredOutputs ? JSON.parse(criterion.requiredOutputs) : ["Assessment", "Recommendation"];
  const parsedReport: string[] = criterion?.reportInclusion ? JSON.parse(criterion.reportInclusion) : ["Include score"];
  const [requiredOutputs, setRequiredOutputs] = useState<Set<string>>(new Set(parsedOutputs));
  const [reportInclusion, setReportInclusion] = useState<Set<string>>(new Set(parsedReport));

  const isUsedInFrameworks = (criterion?._count.frameworkCriteria ?? 0) > 0;

  function toggleOutput(output: string) {
    setRequiredOutputs((prev) => {
      const next = new Set(prev);
      next.has(output) ? next.delete(output) : next.add(output);
      return next;
    });
  }

  function toggleReport(opt: string) {
    setReportInclusion((prev) => {
      const next = new Set(prev);
      next.has(opt) ? next.delete(opt) : next.add(opt);
      return next;
    });
  }

  function handleSave() {
    if (!name.trim()) return;

    const data = {
      categoryId,
      name: name.trim(),
      description: description || undefined,
      guidance: guidance || undefined,
      responseType,
      weight,
      critical,
      minimumAcceptable: minimumAcceptable ? Number(minimumAcceptable) : undefined,
      requiredOutputs: JSON.stringify([...requiredOutputs]),
      reportInclusion: JSON.stringify([...reportInclusion]),
    };

    startTransition(async () => {
      if (mode === "create") {
        await createCriterionAction(data);
      } else if (criterion) {
        await updateCriterionAction(criterion.id, data);
      }
      onClose();
    });
  }

  function handleDelete() {
    if (!criterion) return;
    startTransition(async () => {
      await deleteCriterionAction(criterion.id);
      onClose();
    });
  }

  return (
    <div className="space-y-6">
      <SheetHeader>
        <SheetTitle className="flex items-center gap-2">
          {mode === "create" ? "New Criterion" : "Edit Criterion"}
          {criterion?.critical && (
            <Badge variant="destructive" className="text-[10px]">Critical</Badge>
          )}
        </SheetTitle>
      </SheetHeader>

      {/* Identity */}
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium">Name *</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Soil Condition Assessment"
            className="mt-1"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium">Category</label>
            <Select value={categoryId} onValueChange={(v) => v && setCategoryId(v)}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.name} ({c.department})</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Response Type</label>
            <Select value={responseType} onValueChange={(v) => v && setResponseType(v)}>
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
        </div>
      </div>

      <Separator />

      {/* Guidance */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Guidance</h3>
        <div>
          <label className="text-sm font-medium">Description</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What does this criterion evaluate?"
            className="mt-1"
            rows={2}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Evaluator Guidance</label>
          <Textarea
            value={guidance}
            onChange={(e) => setGuidance(e.target.value)}
            placeholder="How should the evaluator assess this?"
            className="mt-1"
            rows={3}
          />
        </div>
      </div>

      <Separator />

      {/* Required Output */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Required Output</h3>
        <div className="space-y-2">
          {outputOptions.map((output) => (
            <div key={output} className="flex items-center gap-2">
              <Checkbox
                id={`output-${output}`}
                checked={requiredOutputs.has(output)}
                onCheckedChange={() => toggleOutput(output)}
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
              <Input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="max-w-[80px]"
                min={0}
                max={100}
              />
              <span className="text-sm text-muted-foreground">%</span>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Minimum Acceptable</label>
            <Input
              type="number"
              value={minimumAcceptable}
              onChange={(e) => setMinimumAcceptable(e.target.value)}
              placeholder="—"
              className="mt-1 max-w-[80px]"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="critical"
            checked={critical}
            onCheckedChange={(v) => setCritical(v === true)}
          />
          <label htmlFor="critical" className="text-sm font-medium">Critical Criterion</label>
        </div>
        {critical && (
          <p className="text-xs text-amber-600 flex items-center gap-1 ml-6">
            <AlertTriangle className="h-3 w-3" />
            Critical criteria can override overall evaluation result regardless of score.
          </p>
        )}
      </div>

      <Separator />

      {/* Reporting */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Reporting</h3>
        <div className="space-y-2">
          {reportOptions.map((opt) => (
            <div key={opt} className="flex items-center gap-2">
              <Checkbox
                id={`report-${opt}`}
                checked={reportInclusion.has(opt)}
                onCheckedChange={() => toggleReport(opt)}
              />
              <label htmlFor={`report-${opt}`} className="text-sm">{opt}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Usage (edit mode only) */}
      {mode === "edit" && criterion && (
        <>
          <Separator />
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Usage</h3>
            <p className="text-sm text-muted-foreground">
              Used in <span className="font-medium text-foreground">{criterion._count.frameworkCriteria} framework(s)</span>
            </p>
          </div>
        </>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-2">
        {/* Delete (edit mode, not used in frameworks) */}
        {mode === "edit" && criterion && (
          <div>
            {isUsedInFrameworks ? (
              <p className="text-xs text-muted-foreground">Cannot delete — used in frameworks</p>
            ) : deleteConfirm ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-red-600">Delete this criterion?</span>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  disabled={isPending}
                  onClick={handleDelete}
                >
                  {isPending ? "Deleting..." : "Confirm Delete"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setDeleteConfirm(false)}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50 gap-1"
                onClick={() => setDeleteConfirm(true)}
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </Button>
            )}
          </div>
        )}
        {mode === "create" && <div />}

        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button
            disabled={isPending || !name.trim()}
            onClick={handleSave}
          >
            {isPending ? "Saving..." : mode === "create" ? "Create Criterion" : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
