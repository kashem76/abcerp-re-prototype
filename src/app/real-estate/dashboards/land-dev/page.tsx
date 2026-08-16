"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { formatBDT, formatNumber } from "@/lib/mock-data";
import {
  MapPin, TrendingUp, Search, FileCheck, Handshake, Calendar,
  Building2, Landmark, CheckCircle2, XCircle, Clock, Eye,
} from "lucide-react";

const pipelineKPIs = [
  { label: "Active Leads", value: 6, icon: MapPin, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Qualified", value: 2, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Under Due Diligence", value: 1, icon: Search, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Converted", value: 1, icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50" },
  { label: "Rejected", value: 1, icon: XCircle, color: "text-red-600", bg: "bg-red-50" },
];

const landLeads = [
  { id: "LL-2026-001", location: "Nasirabad R/A, Chattogram", area: "42 Katha", estimatedPrice: 180_000_000, source: "Broker", status: "CONVERTED", assignedTo: "Kamal Uddin", daysInPipeline: 45 },
  { id: "LL-2026-002", location: "Agrabad C/A, Chattogram", area: "28 Katha", estimatedPrice: 252_000_000, source: "Direct Owner", status: "QUALIFIED", assignedTo: "Kamal Uddin", daysInPipeline: 12 },
  { id: "LL-2026-003", location: "Hathazari, Chattogram", area: "85 Katha", estimatedPrice: 127_500_000, source: "Referral", status: "SITE_VISITED", assignedTo: "Rafiq Ahmed", daysInPipeline: 8 },
  { id: "LL-2026-004", location: "Khulshi, Chattogram", area: "18 Katha", estimatedPrice: 144_000_000, source: "Broker", status: "NEW", assignedTo: "Nasir Uddin", daysInPipeline: 2 },
  { id: "LL-2026-005", location: "Bayazid, Chattogram", area: "32 Katha", estimatedPrice: 96_000_000, source: "Auction", status: "REJECTED", assignedTo: "Kamal Uddin", daysInPipeline: 30 },
  { id: "LL-2026-006", location: "Panchlaish, Chattogram", area: "22 Katha", estimatedPrice: 176_000_000, source: "Direct Owner", status: "QUALIFIED", assignedTo: "Rafiq Ahmed", daysInPipeline: 15 },
];

const opportunities = [
  {
    code: "OPP-00041", title: "Nasirabad Residential Development", landLead: "LL-2026-001",
    status: "CONVERTED", estimatedRevenue: 950_000_000, estimatedCost: 700_000_000,
    preDevExpenses: 350_000, expenseBreakdown: [
      { type: "Survey", amount: 155_000 },
      { type: "Legal", amount: 80_000 },
      { type: "Authority Fee", amount: 25_000 },
      { type: "Consultancy", amount: 75_000 },
      { type: "Travel", amount: 15_000 },
    ],
  },
  {
    code: "OPP-00042", title: "Agrabad Commercial Complex", landLead: "LL-2026-002",
    status: "FEASIBILITY", estimatedRevenue: 1_200_000_000, estimatedCost: 880_000_000,
    preDevExpenses: 185_000, expenseBreakdown: [
      { type: "Survey", amount: 45_000 },
      { type: "Legal", amount: 65_000 },
      { type: "Consultancy", amount: 50_000 },
      { type: "Authority Fee", amount: 25_000 },
    ],
  },
];

const feasibilities = [
  { code: "FS-001", project: "Nasirabad Residential", status: "APPROVED", irr: 22.3, margin: 25.9, npv: 185_000_000, approvedDate: "2026-04-15" },
  { code: "FS-002", project: "Agrabad Commercial", status: "IN_PROGRESS", irr: null, margin: null, npv: null, approvedDate: null },
];

const landAgreements = [
  { code: "LA-001", project: "ABC Nasirabad Heights", type: "PURCHASE", landowner: "Mr. Abdul Karim & Mrs. Fatema Begum", totalValue: 180_000_000, paid: 162_000_000, balance: 18_000_000, status: "ACTIVE" },
  { code: "LA-002", project: "Hathazari Township (Planned)", type: "JV", landowner: "M/S Hathazari Landowners Group", landownerShare: "30% Built Units", devShare: "70% Built Units", status: "NEGOTIATION" },
];

const milestones = [
  { date: "2026-08-20", event: "Mutation Certificate — Nasirabad Plot P-002", project: "ABC Nasirabad Heights", priority: "HIGH" },
  { date: "2026-08-28", event: "Sub-Registry — Agrabad Plot (Deed Signing)", project: "Agrabad Commercial", priority: "HIGH" },
  { date: "2026-09-05", event: "Feasibility Approval — Board Review", project: "Agrabad Commercial", priority: "MEDIUM" },
  { date: "2026-09-15", event: "Final Land Payment — Nasirabad Balance", project: "ABC Nasirabad Heights", priority: "HIGH" },
  { date: "2026-09-30", event: "CDA Permission Application Deadline", project: "Agrabad Commercial", priority: "MEDIUM" },
];

function statusBadge(status: string) {
  const map: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    CONVERTED: "default", APPROVED: "default", ACTIVE: "default",
    QUALIFIED: "outline", SITE_VISITED: "outline", FEASIBILITY: "outline",
    IN_PROGRESS: "outline", NEGOTIATION: "outline", NEW: "secondary",
    REJECTED: "destructive",
  };
  return <Badge variant={map[status] ?? "secondary"}>{status.replace(/_/g, " ")}</Badge>;
}

export default function LandDevDashboard() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <div className="flex items-center gap-3">
          <Landmark className="h-7 w-7 text-emerald-700" />
          <h1 className="text-2xl font-bold">Land & Development Dashboard</h1>
        </div>
        <p className="text-muted-foreground mt-1">ABC Properties Ltd — Land Pipeline & Pre-Development Overview</p>
      </div>

      {/* Pipeline KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {pipelineKPIs.map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${kpi.bg}`}>
                  <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{kpi.value}</p>
                  <p className="text-xs text-muted-foreground">{kpi.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Land Lead Pipeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" /> Land Lead Pipeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lead ID</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Area</TableHead>
                <TableHead className="text-right">Est. Price</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead className="text-right">Days</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {landLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-mono text-xs">{lead.id}</TableCell>
                  <TableCell className="font-medium">{lead.location}</TableCell>
                  <TableCell>{lead.area}</TableCell>
                  <TableCell className="text-right">{formatBDT(lead.estimatedPrice)}</TableCell>
                  <TableCell>{lead.source}</TableCell>
                  <TableCell>{lead.assignedTo}</TableCell>
                  <TableCell className="text-right">{lead.daysInPipeline}</TableCell>
                  <TableCell className="text-center">{statusBadge(lead.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Active Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-purple-600" /> Active Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {opportunities.map((opp) => (
              <div key={opp.code} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-mono text-xs text-muted-foreground">{opp.code}</span>
                    <h4 className="font-medium">{opp.title}</h4>
                  </div>
                  {statusBadge(opp.status)}
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">Est. Revenue</p>
                    <p className="font-medium">{formatBDT(opp.estimatedRevenue)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Est. Cost</p>
                    <p className="font-medium">{formatBDT(opp.estimatedCost)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Pre-Dev Expense</p>
                    <p className="font-medium">{formatBDT(opp.preDevExpenses)}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {opp.expenseBreakdown.map((e) => (
                    <Badge key={e.type} variant="secondary" className="text-xs">
                      {e.type}: {formatBDT(e.amount)}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Feasibility Studies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-amber-600" /> Feasibility Studies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Project</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">IRR</TableHead>
                <TableHead className="text-right">Gross Margin</TableHead>
                <TableHead className="text-right">NPV</TableHead>
                <TableHead>Approved Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feasibilities.map((f) => (
                <TableRow key={f.code}>
                  <TableCell className="font-mono text-xs">{f.code}</TableCell>
                  <TableCell className="font-medium">{f.project}</TableCell>
                  <TableCell className="text-center">{statusBadge(f.status)}</TableCell>
                  <TableCell className="text-right">{f.irr ? `${f.irr}%` : "—"}</TableCell>
                  <TableCell className="text-right">{f.margin ? `${f.margin}%` : "—"}</TableCell>
                  <TableCell className="text-right">{f.npv ? formatBDT(f.npv) : "—"}</TableCell>
                  <TableCell>{f.approvedDate ?? "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Land Agreements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Handshake className="h-5 w-5 text-slate-600" /> Land Agreements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Landowner</TableHead>
                <TableHead className="text-right">Total / Terms</TableHead>
                <TableHead className="text-right">Paid / Share</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {landAgreements.map((la) => (
                <TableRow key={la.code}>
                  <TableCell className="font-mono text-xs">{la.code}</TableCell>
                  <TableCell className="font-medium">{la.project}</TableCell>
                  <TableCell><Badge variant="secondary">{la.type}</Badge></TableCell>
                  <TableCell>{la.landowner}</TableCell>
                  <TableCell className="text-right">
                    {la.type === "PURCHASE" ? formatBDT(la.totalValue!) : la.landownerShare}
                  </TableCell>
                  <TableCell className="text-right">
                    {la.type === "PURCHASE" ? (
                      <span>{formatBDT(la.paid!)} <span className="text-muted-foreground text-xs">({Math.round((la.paid! / la.totalValue!) * 100)}%)</span></span>
                    ) : la.devShare}
                  </TableCell>
                  <TableCell className="text-center">{statusBadge(la.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Upcoming Milestones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-indigo-600" /> Upcoming Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {milestones.map((ms, i) => (
              <div key={i} className="flex items-center gap-4 border-l-2 border-indigo-200 pl-4 py-2">
                <div className="min-w-[90px]">
                  <p className="text-sm font-medium">{ms.date}</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{ms.event}</p>
                  <p className="text-xs text-muted-foreground">{ms.project}</p>
                </div>
                <Badge variant={ms.priority === "HIGH" ? "destructive" : "outline"}>{ms.priority}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
