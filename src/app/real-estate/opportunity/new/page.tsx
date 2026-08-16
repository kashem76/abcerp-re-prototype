"use client";

import Link from "next/link";
import {
  ArrowLeft,
  TrendingUp,
  MapPin,
  Calendar,
  Save,
  Plus,
  Trash2,
  Info,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatBDT } from "@/lib/mock-data";

const landLeads = [
  { id: "LL-2026-042", location: "Bayazid Bostami, Chattogram", area: "22 Katha" },
  { id: "LL-2026-038", location: "Halishahar, Chattogram", area: "18 Katha" },
  { id: "LL-2026-035", location: "Panchlaish, Chattogram", area: "12 Katha" },
  { id: "LL-2026-029", location: "Khulshi, Chattogram", area: "30 Katha" },
];

const responsibilityCenters = [
  "RE-Development-CTG",
  "RE-Development-DHK",
  "RE-Commercial-CTG",
];

const costCenters = [
  "CC-PRE-DEV-001",
  "CC-PRE-DEV-002",
  "CC-LAND-ACQ-001",
];

const preDevExpenses = [
  { id: 1, type: "Survey", description: "Topographic & boundary survey by RLRS", amount: 85000, date: "2026-07-05" },
  { id: 2, type: "Legal", description: "Title search & verification (30-year chain)", amount: 45000, date: "2026-07-10" },
  { id: 3, type: "Consultancy", description: "Soil investigation — 4 point bore log", amount: 120000, date: "2026-07-15" },
  { id: 4, type: "Authority Fee", description: "CDA pre-consultation fee", amount: 15000, date: "2026-07-22" },
  { id: 5, type: "Travel", description: "Site visit transport & accommodation (3 trips)", amount: 12500, date: "2026-07-28" },
];

const expenseTypeColors: Record<string, string> = {
  Survey: "bg-blue-100 text-blue-700",
  Legal: "bg-purple-100 text-purple-700",
  Consultancy: "bg-cyan-100 text-cyan-700",
  "Authority Fee": "bg-orange-100 text-orange-700",
  Travel: "bg-gray-100 text-gray-700",
};

export default function CreateOpportunityPage() {
  const totalPreDev = preDevExpenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/real-estate/opportunity"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-3"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Opportunities
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-emerald-600" />
              Create New Opportunity
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Register a land opportunity for pre-development tracking and feasibility analysis
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Cancel</Button>
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Create Opportunity
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Link to Lead */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Link to Land Lead</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Land Lead</label>
                <Select defaultValue="LL-2026-042">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a land lead..." />
                  </SelectTrigger>
                  <SelectContent>
                    {landLeads.map((ll) => (
                      <SelectItem key={ll.id} value={ll.id}>
                        {ll.id} — {ll.location} ({ll.area})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="p-3 rounded-md bg-muted/50 border text-sm">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <MapPin className="h-4 w-4" />
                  Auto-filled from lead
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div><span className="text-muted-foreground">Location:</span> Bayazid Bostami, Chattogram</div>
                  <div><span className="text-muted-foreground">Area:</span> 22 Katha (35,750 sft)</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Opportunity Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Opportunity Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input defaultValue="Bayazid Bostami Residential Project — 22 Katha" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Input defaultValue="Bayazid Bostami, Chattogram" disabled className="bg-muted/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Land Area (Katha)</label>
                  <Input type="number" defaultValue="22" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Estimates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Financial Estimates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Estimated Land Cost</label>
                  <Input type="text" defaultValue="44,000,000" />
                  <p className="text-xs text-muted-foreground">@ BDT 20 lakh/katha</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Estimated Project Cost</label>
                  <Input type="text" defaultValue="350,000,000" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Estimated Revenue</label>
                  <Input type="text" defaultValue="520,000,000" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Responsibility / Cost Centers */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Organizational Assignment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Responsibility Center</label>
                  <Select defaultValue={responsibilityCenters[0]}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {responsibilityCenters.map((rc) => (
                        <SelectItem key={rc} value={rc}>{rc}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Cost Center</label>
                  <Select defaultValue={costCenters[0]}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {costCenters.map((cc) => (
                        <SelectItem key={cc} value={cc}>{cc}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Expected Start Date</label>
                  <Input type="date" defaultValue="2026-10-01" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pre-Development Expenses */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Initial Pre-Development Expenses</CardTitle>
                <Button variant="outline" size="sm" className="gap-1">
                  <Plus className="h-3 w-3" />
                  Add Expense
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right w-[130px]">Amount (BDT)</TableHead>
                    <TableHead className="w-[120px]">Date</TableHead>
                    <TableHead className="w-[60px]" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {preDevExpenses.map((exp) => (
                    <TableRow key={exp.id}>
                      <TableCell>
                        <Select defaultValue={exp.type}>
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {["Survey", "Legal", "Consultancy", "Authority Fee", "Travel"].map(
                              (t) => (
                                <SelectItem key={t} value={t} className="text-xs">{t}</SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input defaultValue={exp.description} className="h-8 text-sm" />
                      </TableCell>
                      <TableCell className="text-right">
                        <Input
                          type="text"
                          defaultValue={exp.amount.toLocaleString()}
                          className="h-8 text-sm text-right"
                        />
                      </TableCell>
                      <TableCell>
                        <Input type="date" defaultValue={exp.date} className="h-8 text-xs" />
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-muted-foreground hover:text-red-600">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-muted/30 font-medium">
                    <TableCell colSpan={2} className="text-right">Total Pre-Development</TableCell>
                    <TableCell className="text-right">{formatBDT(totalPreDev)}</TableCell>
                    <TableCell colSpan={2} />
                  </TableRow>
                </TableBody>
              </Table>

              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-800 flex items-start gap-2">
                <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>
                  Pre-dev expenses will be tracked in GL under this opportunity&apos;s cost center.
                  On conversion to project, costs transfer to project WIP (Work-in-Progress) account automatically.
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Land Cost</span>
                <span className="font-medium">{formatBDT(44000000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Project Cost</span>
                <span className="font-medium">{formatBDT(350000000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Revenue Est.</span>
                <span className="font-medium">{formatBDT(520000000)}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Gross Margin</span>
                <span className="font-semibold text-emerald-600">32.7%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pre-Dev Costs</span>
                <span className="font-medium">{formatBDT(totalPreDev)}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>After creating this opportunity:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Complete due diligence on the linked lead</li>
                <li>Create a feasibility study</li>
                <li>Present to management for approval</li>
                <li>Convert to project on approval</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
