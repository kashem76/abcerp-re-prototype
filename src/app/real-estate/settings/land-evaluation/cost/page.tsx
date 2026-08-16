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
import {
  ChevronLeft, DollarSign, GripVertical, Plus, Info, Pencil,
} from "lucide-react";

// ─── Mock Data ─────────────────────────────────────────────────

interface CostCategory {
  id: string;
  name: string;
  code: string;
  group: string;
  department: string;
  defaultMethod: string;
  allowedMethods: string[];
  benchmarkEnabled: boolean;
  historicalAvg: string;
  recentRange: string;
  showInSummary: boolean;
  showVariance: boolean;
  includeInReport: boolean;
}

const groups = ["Site Works", "Structure", "Finishes", "Services", "External", "Other"];
const allMethods = ["Lump Sum", "Cost / sqft", "Cost / sqm", "Quantity x Rate", "Percentage", "Historical Average", "Manual"];

const costCategories: CostCategory[] = [
  { id: "CC01", name: "Site Preparation & Earthwork", code: "SITE-PREP", group: "Site Works", department: "Engineering", defaultMethod: "Cost / sqft", allowedMethods: ["Lump Sum", "Cost / sqft", "Quantity x Rate", "Manual"], benchmarkEnabled: true, historicalAvg: "৳85 / sqft", recentRange: "৳70 – ৳110", showInSummary: true, showVariance: true, includeInReport: true },
  { id: "CC02", name: "Foundation / Substructure", code: "FOUNDATION", group: "Structure", department: "Engineering", defaultMethod: "Cost / sqft", allowedMethods: ["Lump Sum", "Cost / sqft", "Cost / sqm", "Quantity x Rate", "Historical Average", "Manual"], benchmarkEnabled: true, historicalAvg: "৳520 / sqft", recentRange: "৳450 – ৳620", showInSummary: true, showVariance: true, includeInReport: true },
  { id: "CC03", name: "RCC / Structural Frame", code: "RCC", group: "Structure", department: "Engineering", defaultMethod: "Cost / sqft", allowedMethods: ["Lump Sum", "Cost / sqft", "Cost / sqm", "Quantity x Rate", "Historical Average", "Manual"], benchmarkEnabled: true, historicalAvg: "৳1,200 / sqft", recentRange: "৳1,050 – ৳1,400", showInSummary: true, showVariance: true, includeInReport: true },
  { id: "CC04", name: "Masonry / Brickwork", code: "MASONRY", group: "Structure", department: "Engineering", defaultMethod: "Cost / sqft", allowedMethods: ["Lump Sum", "Cost / sqft", "Quantity x Rate", "Manual"], benchmarkEnabled: true, historicalAvg: "৳180 / sqft", recentRange: "৳150 – ৳220", showInSummary: true, showVariance: false, includeInReport: true },
  { id: "CC05", name: "Plastering & Waterproofing", code: "PLASTER", group: "Finishes", department: "Engineering", defaultMethod: "Cost / sqft", allowedMethods: ["Lump Sum", "Cost / sqft", "Quantity x Rate", "Manual"], benchmarkEnabled: true, historicalAvg: "৳120 / sqft", recentRange: "৳100 – ৳150", showInSummary: true, showVariance: false, includeInReport: false },
  { id: "CC06", name: "Flooring & Finishes", code: "FLOORING", group: "Finishes", department: "Engineering", defaultMethod: "Cost / sqft", allowedMethods: ["Lump Sum", "Cost / sqft", "Quantity x Rate", "Manual"], benchmarkEnabled: true, historicalAvg: "৳250 / sqft", recentRange: "৳180 – ৳350", showInSummary: true, showVariance: true, includeInReport: true },
  { id: "CC07", name: "Doors, Windows & Glazing", code: "DOORS-WIN", group: "Finishes", department: "Engineering", defaultMethod: "Lump Sum", allowedMethods: ["Lump Sum", "Quantity x Rate", "Manual"], benchmarkEnabled: true, historicalAvg: "৳140 / sqft", recentRange: "৳110 – ৳180", showInSummary: true, showVariance: false, includeInReport: false },
  { id: "CC08", name: "Painting", code: "PAINTING", group: "Finishes", department: "Engineering", defaultMethod: "Cost / sqft", allowedMethods: ["Lump Sum", "Cost / sqft", "Quantity x Rate", "Manual"], benchmarkEnabled: true, historicalAvg: "৳65 / sqft", recentRange: "৳50 – ৳85", showInSummary: true, showVariance: false, includeInReport: false },
  { id: "CC09", name: "Electrical Works", code: "ELECTRICAL", group: "Services", department: "Engineering", defaultMethod: "Cost / sqft", allowedMethods: ["Lump Sum", "Cost / sqft", "Quantity x Rate", "Percentage", "Manual"], benchmarkEnabled: true, historicalAvg: "৳280 / sqft", recentRange: "৳240 – ৳340", showInSummary: true, showVariance: true, includeInReport: true },
  { id: "CC10", name: "Plumbing & Sanitary", code: "PLUMBING", group: "Services", department: "Engineering", defaultMethod: "Cost / sqft", allowedMethods: ["Lump Sum", "Cost / sqft", "Quantity x Rate", "Manual"], benchmarkEnabled: true, historicalAvg: "৳160 / sqft", recentRange: "৳130 – ৳200", showInSummary: true, showVariance: false, includeInReport: false },
  { id: "CC11", name: "Fire Protection", code: "FIRE", group: "Services", department: "Engineering", defaultMethod: "Lump Sum", allowedMethods: ["Lump Sum", "Quantity x Rate", "Percentage", "Manual"], benchmarkEnabled: true, historicalAvg: "৳45 / sqft", recentRange: "৳35 – ৳60", showInSummary: true, showVariance: false, includeInReport: false },
  { id: "CC12", name: "HVAC / Mechanical", code: "HVAC", group: "Services", department: "Engineering", defaultMethod: "Cost / sqft", allowedMethods: ["Lump Sum", "Cost / sqft", "Quantity x Rate", "Manual"], benchmarkEnabled: false, historicalAvg: "—", recentRange: "—", showInSummary: true, showVariance: false, includeInReport: false },
  { id: "CC13", name: "Lift / Elevator", code: "LIFT", group: "Services", department: "Engineering", defaultMethod: "Lump Sum", allowedMethods: ["Lump Sum", "Quantity x Rate", "Manual"], benchmarkEnabled: true, historicalAvg: "৳35L / unit", recentRange: "৳28L – ৳45L", showInSummary: true, showVariance: true, includeInReport: true },
  { id: "CC14", name: "External / Site Development", code: "EXTERNAL", group: "External", department: "Engineering", defaultMethod: "Lump Sum", allowedMethods: ["Lump Sum", "Cost / sqft", "Percentage", "Manual"], benchmarkEnabled: true, historicalAvg: "৳55 / sqft", recentRange: "৳40 – ৳75", showInSummary: true, showVariance: false, includeInReport: false },
  { id: "CC15", name: "Utility & Services Connection", code: "UTILITY", group: "External", department: "Engineering", defaultMethod: "Lump Sum", allowedMethods: ["Lump Sum", "Manual"], benchmarkEnabled: false, historicalAvg: "—", recentRange: "—", showInSummary: true, showVariance: false, includeInReport: false },
  { id: "CC16", name: "Other / Special Works", code: "OTHER", group: "Other", department: "Engineering", defaultMethod: "Manual", allowedMethods: ["Lump Sum", "Quantity x Rate", "Manual"], benchmarkEnabled: false, historicalAvg: "—", recentRange: "—", showInSummary: true, showVariance: false, includeInReport: false },
  { id: "CC17", name: "Contingency", code: "CONTINGENCY", group: "Other", department: "Finance", defaultMethod: "Percentage", allowedMethods: ["Percentage", "Lump Sum", "Manual"], benchmarkEnabled: false, historicalAvg: "5%", recentRange: "3% – 7%", showInSummary: true, showVariance: true, includeInReport: true },
];

// ─── Component ─────────────────────────────────────────────────

export default function CostCategoriesPage() {
  const [selected, setSelected] = useState<CostCategory | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("categories");

  const openDetail = (cat: CostCategory) => {
    setSelected(cat);
    setSheetOpen(true);
  };

  const groupedCategories = groups.map((g) => ({
    group: g,
    items: costCategories.filter((c) => c.group === g),
  })).filter((g) => g.items.length > 0);

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
            <DollarSign className="h-7 w-7 text-amber-600" />
            <div>
              <h1 className="text-2xl font-bold">Preliminary Cost</h1>
              <p className="text-muted-foreground">
                Engineering cost categories and estimation methods used during land evaluation.
              </p>
            </div>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Add Category
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="methods">Estimation Methods</TabsTrigger>
          <TabsTrigger value="benchmarks">Historical Data</TabsTrigger>
        </TabsList>

        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-4 mt-4">
          {groupedCategories.map(({ group, items }) => (
            <div key={group}>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">{group}</h3>
              <Card>
                <div className="divide-y">
                  {items.map((cat) => (
                    <div
                      key={cat.id}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 cursor-pointer group"
                      onClick={() => openDetail(cat)}
                    >
                      <GripVertical className="h-4 w-4 text-muted-foreground/50 cursor-grab" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{cat.name}</span>
                          <Badge variant="outline" className="text-[10px] font-mono">{cat.code}</Badge>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                          <span>{cat.department}</span>
                          <span>Default: {cat.defaultMethod}</span>
                        </div>
                      </div>
                      {cat.benchmarkEnabled && (
                        <div className="text-right hidden md:block">
                          <p className="text-xs font-medium">{cat.historicalAvg}</p>
                          <p className="text-[10px] text-muted-foreground">{cat.recentRange}</p>
                        </div>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100"
                        onClick={(e) => { e.stopPropagation(); openDetail(cat); }}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          ))}
        </TabsContent>

        {/* Methods Tab */}
        <TabsContent value="methods" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Available Estimation Methods</CardTitle>
              <p className="text-sm text-muted-foreground">Methods available for preliminary cost estimation during land evaluation.</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { method: "Lump Sum", description: "Single fixed amount based on professional judgment", usage: "Small or well-understood items" },
                  { method: "Cost / sqft", description: "Rate per square foot of construction area", usage: "Most common for Bangladesh market benchmarking" },
                  { method: "Cost / sqm", description: "Rate per square meter of construction area", usage: "International standard, used for consultant estimates" },
                  { method: "Quantity x Rate", description: "Measured quantity multiplied by unit rate", usage: "Detailed estimation when quantities are known" },
                  { method: "Percentage", description: "Percentage of total construction cost or subtotal", usage: "Contingency, professional fees, overhead" },
                  { method: "Historical Average", description: "Average of last N similar projects", usage: "Quick benchmarking against company portfolio" },
                  { method: "Manual", description: "Free-form entry with justification", usage: "Special items, non-standard requirements" },
                ].map((m) => (
                  <div key={m.method} className="flex gap-4 p-3 border rounded-lg">
                    <Badge variant="secondary" className="text-xs h-fit mt-0.5 shrink-0">{m.method}</Badge>
                    <div>
                      <p className="text-sm">{m.description}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Best for: {m.usage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Benchmarks Tab */}
        <TabsContent value="benchmarks" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Historical Benchmarks</CardTitle>
              <p className="text-sm text-muted-foreground">Company average costs from recent projects. Used as reference during preliminary cost estimation.</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="grid grid-cols-4 gap-4 text-xs font-medium text-muted-foreground uppercase tracking-wide pb-2 border-b">
                  <span>Category</span>
                  <span className="text-right">Company Avg</span>
                  <span className="text-right">Recent Range</span>
                  <span className="text-right">Projects</span>
                </div>
                {costCategories.filter((c) => c.benchmarkEnabled).map((cat) => (
                  <div key={cat.id} className="grid grid-cols-4 gap-4 py-2 text-sm border-b border-dashed last:border-0">
                    <span>{cat.name}</span>
                    <span className="text-right font-medium">{cat.historicalAvg}</span>
                    <span className="text-right text-muted-foreground">{cat.recentRange}</span>
                    <span className="text-right text-muted-foreground">Last 5</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50/50">
            <CardContent className="pt-4 flex gap-3">
              <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                Historical benchmarks are calculated from completed project data. When a new project closes,
                benchmarks are automatically updated. Evaluators see these as reference points during cost estimation
                and are flagged when their estimates deviate significantly.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Detail Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-[520px] sm:max-w-[520px] overflow-y-auto">
          {selected && <CostCategoryDetailForm category={selected} onClose={() => setSheetOpen(false)} />}
        </SheetContent>
      </Sheet>
    </div>
  );
}

// ─── Cost Category Detail Form ──────────────────────────────────

function CostCategoryDetailForm({ category, onClose }: { category: CostCategory; onClose: () => void }) {
  return (
    <div className="space-y-6">
      <SheetHeader>
        <SheetTitle>Cost Category</SheetTitle>
      </SheetHeader>

      {/* Identity */}
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium">Name *</label>
          <Input defaultValue={category.name} className="mt-1" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium">Code</label>
            <Input defaultValue={category.code} className="mt-1 font-mono" />
          </div>
          <div>
            <label className="text-sm font-medium">Group</label>
            <Select defaultValue={category.group}>
              <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                {groups.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">Responsible Department</label>
          <Select defaultValue={category.department}>
            <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
            <SelectContent>
              {["Engineering", "Finance", "Management"].map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      {/* Estimation */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Estimation</h3>
        <div>
          <label className="text-sm font-medium">Default Method</label>
          <Select defaultValue={category.defaultMethod}>
            <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
            <SelectContent>
              {allMethods.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium">Allowed Methods</label>
          <div className="space-y-1 mt-2">
            {allMethods.map((m) => (
              <div key={m} className="flex items-center gap-2">
                <Checkbox defaultChecked={category.allowedMethods.includes(m)} />
                <span className="text-sm">{m}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Separator />

      {/* Benchmarking */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Benchmarking</h3>
        <div className="space-y-2">
          {[
            { label: "Show historical company average", checked: category.benchmarkEnabled },
            { label: "Show recent project range", checked: category.benchmarkEnabled },
            { label: "Show variance from benchmark", checked: category.showVariance },
          ].map((opt) => (
            <div key={opt.label} className="flex items-center gap-2">
              <Checkbox defaultChecked={opt.checked} />
              <span className="text-sm">{opt.label}</span>
            </div>
          ))}
        </div>
        <div>
          <label className="text-sm font-medium">Historical Lookback</label>
          <Select defaultValue="5">
            <SelectTrigger className="mt-1 max-w-[200px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="3">Last 3 projects</SelectItem>
              <SelectItem value="5">Last 5 projects</SelectItem>
              <SelectItem value="10">Last 10 projects</SelectItem>
              <SelectItem value="all">All projects</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {category.benchmarkEnabled && (
          <div className="bg-muted/50 rounded p-3 space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Company Average</span>
              <span className="font-medium">{category.historicalAvg}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Recent Range</span>
              <span>{category.recentRange}</span>
            </div>
          </div>
        )}
      </div>

      <Separator />

      {/* Reporting */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Reporting</h3>
        <div className="space-y-2">
          {[
            { label: "Show in cost summary", checked: category.showInSummary },
            { label: "Show significant variance", checked: category.showVariance },
            { label: "Include in management report", checked: category.includeInReport },
          ].map((opt) => (
            <div key={opt.label} className="flex items-center gap-2">
              <Checkbox defaultChecked={opt.checked} />
              <span className="text-sm">{opt.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={onClose}>Save Category</Button>
      </div>
    </div>
  );
}
