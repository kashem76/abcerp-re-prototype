"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  MapPin, Plus, Search, AlertTriangle, Clock,
  Users, ChevronDown, ArrowUpDown, ChevronRight,
} from "lucide-react";
import { formatBDT } from "@/lib/mock-data";

// ─── Mock Data ─────────────────────────────────────────────────

type LandStage = "New" | "Assessment" | "Feasibility" | "Decision" | "Acquisition" | "Closed";

interface LandLead {
  id: string;
  name: string;
  location: string;
  area: string;
  stage: LandStage;
  owner: string;
  assignedTo: string;
  expectedPrice: number;
  overallProgress: number;
  deptStatus: { name: string; status: string }[];
  attentionCount: number;
  attentionItems: string[];
  nextAction: string;
  updatedAgo: string;
  createdDaysAgo: number;
}

const mockLeads: LandLead[] = [
  {
    id: "LL-2026-001",
    name: "Gulshan Plot 07",
    location: "Gulshan",
    area: "32 Katha",
    stage: "Feasibility",
    owner: "Mr Ahmed",
    assignedTo: "Rahim",
    expectedPrice: 450_000_000,
    overallProgress: 64,
    deptStatus: [
      { name: "Engineering", status: "In Progress" },
      { name: "Legal", status: "Under Review" },
      { name: "Marketing", status: "Complete" },
      { name: "Finance", status: "Waiting" },
    ],
    attentionCount: 2,
    attentionItems: ["Legal assessment overdue", "Finance waiting for Engineering"],
    nextAction: "Review engineering cost assessment",
    updatedAgo: "2h ago",
    createdDaysAgo: 34,
  },
  {
    id: "LL-2026-002",
    name: "Bashundhara Plot 12",
    location: "Bashundhara",
    area: "48 Katha",
    stage: "Assessment",
    owner: "Mrs Begum",
    assignedTo: "Kamal",
    expectedPrice: 720_000_000,
    overallProgress: 38,
    deptStatus: [
      { name: "Land & Site", status: "Complete" },
      { name: "Engineering", status: "In Progress" },
      { name: "Legal", status: "Not Started" },
    ],
    attentionCount: 0,
    attentionItems: [],
    nextAction: "Complete engineering site assessment",
    updatedAgo: "5h ago",
    createdDaysAgo: 18,
  },
  {
    id: "LL-2026-003",
    name: "Uttara Sector 11 Land",
    location: "Uttara",
    area: "22 Katha",
    stage: "Decision",
    owner: "Haque Family",
    assignedTo: "Rahim",
    expectedPrice: 330_000_000,
    overallProgress: 92,
    deptStatus: [
      { name: "Engineering", status: "Signed Off" },
      { name: "Legal", status: "Signed Off" },
      { name: "Marketing", status: "Signed Off" },
      { name: "Finance", status: "Signed Off" },
    ],
    attentionCount: 0,
    attentionItems: [],
    nextAction: "Submit to management for decision",
    updatedAgo: "1d ago",
    createdDaysAgo: 52,
  },
  {
    id: "LL-2026-004",
    name: "Purbachal 300ft Road",
    location: "Purbachal",
    area: "65 Katha",
    stage: "New",
    owner: "Development Corp.",
    assignedTo: "Sumon",
    expectedPrice: 975_000_000,
    overallProgress: 0,
    deptStatus: [],
    attentionCount: 0,
    attentionItems: [],
    nextAction: "Complete initial selection",
    updatedAgo: "3h ago",
    createdDaysAgo: 2,
  },
  {
    id: "LL-2026-005",
    name: "Banani DOHS Plot",
    location: "Banani DOHS",
    area: "15 Katha",
    stage: "Assessment",
    owner: "Col. Rahman (Retd)",
    assignedTo: "Rahim",
    expectedPrice: 375_000_000,
    overallProgress: 55,
    deptStatus: [
      { name: "Land & Site", status: "Complete" },
      { name: "Engineering", status: "Under Review" },
      { name: "Legal", status: "In Progress" },
      { name: "Marketing", status: "In Progress" },
    ],
    attentionCount: 1,
    attentionItems: ["Engineering review overdue by 2 days"],
    nextAction: "Follow up on engineering review",
    updatedAgo: "6h ago",
    createdDaysAgo: 28,
  },
  {
    id: "LL-2026-006",
    name: "Mirpur DOHS Corner",
    location: "Mirpur DOHS",
    area: "20 Katha",
    stage: "Feasibility",
    owner: "Karim & Sons",
    assignedTo: "Kamal",
    expectedPrice: 300_000_000,
    overallProgress: 78,
    deptStatus: [
      { name: "Engineering", status: "Complete" },
      { name: "Legal", status: "Complete" },
      { name: "Marketing", status: "Complete" },
      { name: "Finance", status: "In Progress" },
    ],
    attentionCount: 1,
    attentionItems: ["Construction estimate +8% above baseline"],
    nextAction: "Complete financial feasibility",
    updatedAgo: "1h ago",
    createdDaysAgo: 41,
  },
  {
    id: "LL-2026-007",
    name: "Dhanmondi Plot 9/A",
    location: "Dhanmondi",
    area: "12 Katha",
    stage: "Acquisition",
    owner: "Prof. Islam",
    assignedTo: "Rahim",
    expectedPrice: 480_000_000,
    overallProgress: 100,
    deptStatus: [],
    attentionCount: 0,
    attentionItems: [],
    nextAction: "Complete land registration",
    updatedAgo: "2d ago",
    createdDaysAgo: 78,
  },
  {
    id: "LL-2026-008",
    name: "Keraniganj Riverfront",
    location: "Keraniganj",
    area: "100 Katha",
    stage: "Closed",
    owner: "Miah Group",
    assignedTo: "Sumon",
    expectedPrice: 500_000_000,
    overallProgress: 45,
    deptStatus: [],
    attentionCount: 0,
    attentionItems: [],
    nextAction: "—",
    updatedAgo: "2w ago",
    createdDaysAgo: 90,
  },
];

const stageOrder: LandStage[] = ["New", "Assessment", "Feasibility", "Decision", "Acquisition", "Closed"];

const stageBadgeStyle: Record<LandStage, string> = {
  New: "bg-slate-100 text-slate-700",
  Assessment: "bg-blue-100 text-blue-700",
  Feasibility: "bg-purple-100 text-purple-700",
  Decision: "bg-amber-100 text-amber-700",
  Acquisition: "bg-emerald-100 text-emerald-700",
  Closed: "bg-gray-100 text-gray-500",
};

const deptDotColor: Record<string, string> = {
  "Complete": "bg-emerald-500",
  "Signed Off": "bg-emerald-500",
  "In Progress": "bg-blue-500",
  "Under Review": "bg-amber-500",
  "Not Started": "bg-gray-300",
  "Waiting": "bg-gray-300",
};

const deptAbbrev: Record<string, string> = {
  "Land & Site": "LS",
  "Engineering": "EN",
  "Legal": "LG",
  "Marketing": "MK",
  "Finance": "FN",
};

type SortOption = "newest" | "oldest" | "value-high" | "value-low" | "progress" | "attention";

const sortLabels: Record<SortOption, string> = {
  "newest": "Newest First",
  "oldest": "Oldest First",
  "value-high": "Value: High → Low",
  "value-low": "Value: Low → High",
  "progress": "Progress",
  "attention": "Needs Attention",
};

function agingBadge(days: number) {
  if (days < 30) return { cls: "text-emerald-700 bg-emerald-50", label: "On track" };
  if (days < 60) return { cls: "text-amber-700 bg-amber-50", label: "Overdue" };
  return { cls: "text-red-700 bg-red-50", label: "Stale" };
}

// ─── Dropdown helper ───────────────────────────────────────────

function Dropdown<T extends string>({
  value,
  options,
  labels,
  onChange,
  icon,
  prefix,
}: {
  value: T;
  options: T[];
  labels: Record<T, string>;
  onChange: (v: T) => void;
  icon?: React.ReactNode;
  prefix?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 text-sm border rounded-lg bg-white hover:bg-muted/50 transition-colors"
      >
        {icon}
        {prefix && <span className="text-muted-foreground">{prefix}</span>}
        <span className="font-medium">{labels[value]}</span>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full mt-1 z-50 bg-white border rounded-lg shadow-lg py-1 min-w-44">
            {options.map((opt) => (
              <button
                key={opt}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors ${value === opt ? "bg-muted font-medium" : ""}`}
                onClick={() => { onChange(opt); setOpen(false); }}
              >
                {labels[opt]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Component ─────────────────────────────────────────────────

export default function LandPipelinePage() {
  const [activeStage, setActiveStage] = useState<LandStage | "All">("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("newest");

  const activeLeads = mockLeads.filter((l) => l.stage !== "Closed");
  const totalValue = activeLeads.reduce((s, l) => s + l.expectedPrice, 0);
  const totalAttention = activeLeads.reduce((s, l) => s + l.attentionCount, 0);
  const inDecisionCount = mockLeads.filter((l) => l.stage === "Decision").length;

  // Filtering + sorting
  const filtered = mockLeads
    .filter((lead) => {
      if (activeStage !== "All" && lead.stage !== activeStage) return false;
      if (search) {
        const q = search.toLowerCase();
        return lead.name.toLowerCase().includes(q) || lead.location.toLowerCase().includes(q);
      }
      return true;
    })
    .sort((a, b) => {
      switch (sort) {
        case "newest": return a.createdDaysAgo - b.createdDaysAgo;
        case "oldest": return b.createdDaysAgo - a.createdDaysAgo;
        case "value-high": return b.expectedPrice - a.expectedPrice;
        case "value-low": return a.expectedPrice - b.expectedPrice;
        case "progress": return b.overallProgress - a.overallProgress;
        case "attention": return b.attentionCount - a.attentionCount;
        default: return 0;
      }
    });

  // Team performance
  const teamPerf = Object.entries(
    activeLeads.reduce<Record<string, { total: number; progressed: number }>>((acc, l) => {
      if (!acc[l.assignedTo]) acc[l.assignedTo] = { total: 0, progressed: 0 };
      acc[l.assignedTo].total++;
      if (l.overallProgress > 50) acc[l.assignedTo].progressed++;
      return acc;
    }, {})
  );

  // Stage dropdown labels with counts
  const stageLabels = {
    All: `All (${mockLeads.length})`,
    ...Object.fromEntries(stageOrder.map((s) => [s, `${s} (${mockLeads.filter((l) => l.stage === s).length})`])),
  } as Record<LandStage | "All", string>;

  return (
    <div className="space-y-5 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MapPin className="h-6 w-6 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold">Land Pipeline</h1>
            <p className="text-sm text-muted-foreground">One pipeline, one workspace per land.</p>
          </div>
        </div>
        <Link href="/real-estate/land-leads/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Add Land
          </Button>
        </Link>
      </div>

      {/* ── KPI Strip ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="py-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Active Leads</p>
            <p className="text-2xl font-bold">{activeLeads.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Total Pipeline Value</p>
            <p className="text-2xl font-bold">{formatBDT(totalValue)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">In Decision</p>
            <p className="text-2xl font-bold">{inDecisionCount}</p>
          </CardContent>
        </Card>
        <Card className={totalAttention > 0 ? "border-amber-300" : ""}>
          <CardContent className="py-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Need Attention</p>
            <p className={`text-2xl font-bold ${totalAttention > 0 ? "text-amber-600" : ""}`}>{totalAttention}</p>
          </CardContent>
        </Card>
      </div>

      {/* ── Filter Row: Stage dropdown + Sort dropdown + Search ── */}
      <div className="flex flex-wrap items-center gap-3">
        <Dropdown
          value={activeStage}
          options={["All", ...stageOrder] as (LandStage | "All")[]}
          labels={stageLabels}
          onChange={setActiveStage}
          prefix="Stage:"
        />

        <Dropdown
          value={sort}
          options={Object.keys(sortLabels) as SortOption[]}
          labels={sortLabels}
          onChange={setSort}
          icon={<ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />}
        />

        <div className="relative flex-1 min-w-48 max-w-xs ml-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search lands..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* ── Table Header ── */}
      <div className="hidden md:grid grid-cols-12 gap-4 px-5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
        <div className="col-span-3">Lead Name / Location</div>
        <div className="col-span-2">Size / Value</div>
        <div className="col-span-2">Stage / Progress</div>
        <div className="col-span-3">Next Step</div>
        <div className="col-span-1 text-right">Assigned</div>
        <div className="col-span-1 text-right">Action</div>
      </div>

      {/* ── Lead Rows ── */}
      <div className="space-y-2">
        {filtered.map((lead) => {
          const aging = agingBadge(lead.createdDaysAgo);
          const hasAttention = lead.attentionCount > 0;

          return (
            <div key={lead.id}>
              {/* Attention strip — sits above the row */}
              {hasAttention && (
                <div className="flex items-center gap-2 px-5 py-1.5 text-xs text-amber-800 bg-amber-50 border border-b-0 border-amber-200 rounded-t-lg">
                  <AlertTriangle className="h-3 w-3 text-amber-600 shrink-0" />
                  <span className="font-medium">{lead.attentionItems[0]}</span>
                  {lead.attentionItems.length > 1 && (
                    <span className="text-amber-500">+{lead.attentionItems.length - 1} more</span>
                  )}
                </div>
              )}

              <Card className={`hover:border-primary/30 hover:shadow-sm transition-all ${hasAttention ? "rounded-t-none border-t-amber-200" : ""}`}>
                <CardContent className="py-4 px-5">
                  {/* Desktop: table row */}
                  <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                    {/* Lead Name / Location */}
                    <div className="col-span-3">
                      <div className="flex items-center gap-1.5">
                        <p className="font-semibold text-sm truncate">{lead.name}</p>
                        {hasAttention && (
                          <span className="flex items-center justify-center h-4 w-4 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold shrink-0">
                            {lead.attentionCount}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{lead.location}</p>
                    </div>

                    {/* Size / Value */}
                    <div className="col-span-2">
                      <p className="text-sm">{lead.area}</p>
                      <p className="text-xs text-muted-foreground">{formatBDT(lead.expectedPrice)}</p>
                    </div>

                    {/* Stage / Progress */}
                    <div className="col-span-2">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Badge className={`text-[11px] font-medium ${stageBadgeStyle[lead.stage]}`}>
                          {lead.stage}
                        </Badge>
                        {lead.stage !== "New" && lead.stage !== "Closed" && (
                          <span className="text-xs text-muted-foreground tabular-nums">{lead.overallProgress}%</span>
                        )}
                      </div>
                      {lead.stage !== "New" && lead.stage !== "Closed" && (
                        <Progress value={lead.overallProgress} className="h-1 w-full" />
                      )}
                      {/* Dept dots */}
                      {lead.deptStatus.length > 0 && (
                        <div className="flex items-center gap-1.5 mt-2">
                          {lead.deptStatus.map((d) => (
                            <div
                              key={d.name}
                              className="flex items-center gap-1"
                              title={`${d.name}: ${d.status}`}
                            >
                              <div className={`h-1.5 w-1.5 rounded-full ${deptDotColor[d.status] || "bg-gray-300"}`} />
                              <span className="text-[10px] text-muted-foreground">{deptAbbrev[d.name] || d.name.slice(0, 2).toUpperCase()}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Next Step */}
                    <div className="col-span-3">
                      {lead.nextAction !== "—" ? (
                        <p className="text-sm text-muted-foreground leading-snug">{lead.nextAction}</p>
                      ) : (
                        <p className="text-xs text-muted-foreground italic">No pending action</p>
                      )}
                      <p className="text-[11px] text-muted-foreground/70 mt-1">Updated {lead.updatedAgo}</p>
                    </div>

                    {/* Assigned / Status */}
                    <div className="col-span-1 text-right">
                      <p className="text-sm font-medium">{lead.assignedTo}</p>
                      <div className={`inline-flex items-center gap-1 text-[11px] font-medium mt-1 px-2 py-0.5 rounded-full ${aging.cls}`}>
                        <Clock className="h-2.5 w-2.5" />
                        {aging.label}
                      </div>
                    </div>

                    {/* Action */}
                    <div className="col-span-1 text-right">
                      <Link href={`/real-estate/land-leads/${lead.id}/work`}>
                        <Button variant="outline" size="sm" className="text-xs h-8">
                          Open
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Mobile: stacked layout */}
                  <Link href={`/real-estate/land-leads/${lead.id}/work`} className="md:hidden block">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-sm">{lead.name}</p>
                          <Badge className={`text-[10px] ${stageBadgeStyle[lead.stage]}`}>{lead.stage}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{lead.location}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                      <span>{lead.area}</span>
                      <span>{formatBDT(lead.expectedPrice)}</span>
                      <span>{lead.assignedTo}</span>
                    </div>
                    {lead.stage !== "New" && lead.stage !== "Closed" && (
                      <div className="flex items-center gap-2">
                        <Progress value={lead.overallProgress} className="h-1 flex-1" />
                        <span className="text-[11px] text-muted-foreground tabular-nums">{lead.overallProgress}%</span>
                      </div>
                    )}
                  </Link>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="py-10 text-center">
            <Search className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No lands match your filters.</p>
            <button
              className="text-sm text-blue-600 hover:underline mt-1"
              onClick={() => { setActiveStage("All"); setSearch(""); }}
            >
              Clear filters
            </button>
          </CardContent>
        </Card>
      )}

      {/* ── Team Performance ── */}
      <Separator />
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-2">
          <Users className="h-4 w-4" /> Team Performance
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {teamPerf.map(([name, data]) => (
            <Card key={name}>
              <CardContent className="py-4">
                <p className="text-sm font-semibold">{name}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {data.total} active {data.total === 1 ? "lead" : "leads"} &middot; {data.progressed} progressing
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
