"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  MapPin, Plus, Search, ArrowRight, AlertTriangle, Clock,
  TrendingUp, Users, Filter, ChevronRight, CircleDot,
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

const stages: { label: LandStage | "All"; count: number }[] = [
  { label: "All", count: mockLeads.length },
  { label: "New", count: mockLeads.filter((l) => l.stage === "New").length },
  { label: "Assessment", count: mockLeads.filter((l) => l.stage === "Assessment").length },
  { label: "Feasibility", count: mockLeads.filter((l) => l.stage === "Feasibility").length },
  { label: "Decision", count: mockLeads.filter((l) => l.stage === "Decision").length },
  { label: "Acquisition", count: mockLeads.filter((l) => l.stage === "Acquisition").length },
  { label: "Closed", count: mockLeads.filter((l) => l.stage === "Closed").length },
];

const stageBadgeColor: Record<LandStage, string> = {
  New: "bg-slate-100 text-slate-800",
  Assessment: "bg-blue-100 text-blue-800",
  Feasibility: "bg-purple-100 text-purple-800",
  Decision: "bg-amber-100 text-amber-800",
  Acquisition: "bg-emerald-100 text-emerald-800",
  Closed: "bg-gray-100 text-gray-500",
};

const deptStatusColor: Record<string, string> = {
  "Complete": "text-emerald-600",
  "Signed Off": "text-emerald-600",
  "In Progress": "text-blue-600",
  "Under Review": "text-amber-600",
  "Not Started": "text-gray-400",
  "Waiting": "text-gray-400",
};

function agingColor(days: number) {
  if (days < 30) return "text-emerald-600";
  if (days < 60) return "text-amber-600";
  return "text-red-600";
}

// ─── Component ─────────────────────────────────────────────────

export default function LandPipelinePage() {
  const [activeStage, setActiveStage] = useState<LandStage | "All">("All");
  const [search, setSearch] = useState("");

  const filtered = mockLeads.filter((lead) => {
    if (activeStage !== "All" && lead.stage !== activeStage) return false;
    if (search && !lead.name.toLowerCase().includes(search.toLowerCase()) && !lead.location.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const activeLeads = mockLeads.filter((l) => l.stage !== "Closed");
  const totalValue = activeLeads.reduce((s, l) => s + l.expectedPrice, 0);
  const totalAttention = activeLeads.reduce((s, l) => s + l.attentionCount, 0);

  // Team performance
  const teamPerf = Object.entries(
    activeLeads.reduce<Record<string, { total: number; progressed: number }>>((acc, l) => {
      if (!acc[l.assignedTo]) acc[l.assignedTo] = { total: 0, progressed: 0 };
      acc[l.assignedTo].total++;
      if (l.overallProgress > 50) acc[l.assignedTo].progressed++;
      return acc;
    }, {})
  );

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MapPin className="h-7 w-7 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold">Land Pipeline</h1>
            <p className="text-muted-foreground">One pipeline, one workspace per land.</p>
          </div>
        </div>
        <Link href="/real-estate/land-leads/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Add Land
          </Button>
        </Link>
      </div>

      {/* Funnel Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">Active Leads</p>
            <p className="text-2xl font-bold">{activeLeads.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">Total Pipeline Value</p>
            <p className="text-2xl font-bold">{formatBDT(totalValue)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">In Decision</p>
            <p className="text-2xl font-bold">{mockLeads.filter((l) => l.stage === "Decision").length}</p>
          </CardContent>
        </Card>
        <Card className={totalAttention > 0 ? "border-amber-300" : ""}>
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">Need Attention</p>
            <p className={`text-2xl font-bold ${totalAttention > 0 ? "text-amber-600" : ""}`}>{totalAttention}</p>
          </CardContent>
        </Card>
      </div>

      {/* Stage Filter Tabs + Search */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-1 bg-muted rounded-lg p-1">
          {stages.map((s) => (
            <button
              key={s.label}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                activeStage === s.label
                  ? "bg-white text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveStage(s.label)}
            >
              {s.label} <span className="text-xs ml-1 opacity-60">{s.count}</span>
            </button>
          ))}
        </div>
        <div className="relative flex-1 min-w-[200px] max-w-sm ml-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search lands..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Lead Cards */}
      <div className="space-y-3">
        {filtered.map((lead) => (
          <Link key={lead.id} href={`/real-estate/land-leads/${lead.id}/work`}>
            <Card className="hover:border-primary/40 transition-colors cursor-pointer mb-3">
              <CardContent className="pt-5 pb-4">
                <div className="flex gap-4">
                  {/* Main content */}
                  <div className="flex-1 min-w-0">
                    {/* Top row */}
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-base">{lead.name}</h3>
                      <Badge className={stageBadgeColor[lead.stage]}>{lead.stage}</Badge>
                      {lead.attentionCount > 0 && (
                        <Badge variant="destructive" className="text-[10px] gap-1">
                          <AlertTriangle className="h-3 w-3" /> {lead.attentionCount}
                        </Badge>
                      )}
                    </div>

                    {/* Location / details */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span>{lead.location}</span>
                      <span>{lead.area}</span>
                      <span>{formatBDT(lead.expectedPrice)}</span>
                    </div>

                    {/* Progress */}
                    {lead.stage !== "New" && lead.stage !== "Closed" && (
                      <div className="mb-3">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-xs text-muted-foreground">Progress</span>
                          <span className="text-xs font-medium">{lead.overallProgress}%</span>
                        </div>
                        <Progress value={lead.overallProgress} className="h-1.5" />
                      </div>
                    )}

                    {/* Department status */}
                    {lead.deptStatus.length > 0 && (
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs mb-3">
                        {lead.deptStatus.map((d) => (
                          <span key={d.name} className={deptStatusColor[d.status] || "text-gray-500"}>
                            {d.name}: {d.status}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Attention */}
                    {lead.attentionItems.length > 0 && (
                      <div className="space-y-1 mb-3">
                        {lead.attentionItems.map((item, i) => (
                          <p key={i} className="text-xs text-amber-700 flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3" /> {item}
                          </p>
                        ))}
                      </div>
                    )}

                    {/* Next Action */}
                    {lead.nextAction !== "—" && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">Next:</span>
                        <span className="font-medium">{lead.nextAction}</span>
                      </div>
                    )}
                  </div>

                  {/* Right side */}
                  <div className="flex flex-col items-end justify-between text-right shrink-0">
                    <div>
                      <p className="text-xs text-muted-foreground">Owner: {lead.assignedTo}</p>
                      <p className="text-xs text-muted-foreground">{lead.updatedAgo}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-xs ${agingColor(lead.createdDaysAgo)}`}>
                        <Clock className="h-3 w-3 inline mr-1" />
                        {lead.createdDaysAgo}d
                      </span>
                      <Button variant="outline" size="sm" className="gap-1 text-xs">
                        Open <ChevronRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="pt-6 text-center text-muted-foreground">
            No lands match the current filter.
          </CardContent>
        </Card>
      )}

      {/* Team Performance */}
      <Separator />
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-2">
          <Users className="h-4 w-4" /> Team Performance
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {teamPerf.map(([name, data]) => (
            <Card key={name}>
              <CardContent className="pt-4">
                <p className="text-sm font-medium">{name}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {data.total} active leads &middot; {data.progressed} progressing
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
