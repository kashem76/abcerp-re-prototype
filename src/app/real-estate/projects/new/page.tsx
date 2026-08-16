"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Calendar,
  User,
  Save,
  Info,
  Hash,
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

const projectTypes = [
  "Residential",
  "Commercial",
  "Mixed Use",
  "Township",
];

const districts = [
  "Chattogram",
  "Dhaka",
  "Sylhet",
  "Rajshahi",
  "Khulna",
  "Barishal",
  "Rangpur",
  "Mymensingh",
];

const projectManagers = [
  { id: "PM01", name: "Eng. Kamal Hossain" },
  { id: "PM02", name: "Eng. Rafiq Ahmed" },
  { id: "PM03", name: "Eng. Nasima Begum" },
  { id: "PM04", name: "Eng. Shahidul Islam" },
];

const revenueCenters = ["RC-RE-CTG-001", "RC-RE-CTG-002", "RC-RE-DHK-001"];
const costCenters = ["CC-RE-CTG-001", "CC-RE-CTG-002", "CC-RE-DHK-001"];
const profitCenters = ["PC-RE-CTG-001", "PC-RE-CTG-002", "PC-RE-DHK-001"];

const budgetCategories = [
  { category: "Land Acquisition", code: "BUD-LAND", amount: 44000000 },
  { category: "Foundation & Piling", code: "BUD-FNDN", amount: 42000000 },
  { category: "Structure (RCC)", code: "BUD-STRC", amount: 95000000 },
  { category: "MEP (Mechanical/Electrical/Plumbing)", code: "BUD-MEP", amount: 48000000 },
  { category: "Finishing & Interior", code: "BUD-FNSH", amount: 62000000 },
  { category: "External Development", code: "BUD-EXTL", amount: 15000000 },
  { category: "Consultant & Design Fees", code: "BUD-CONS", amount: 14280000 },
  { category: "Marketing & Sales", code: "BUD-MKTG", amount: 12000000 },
  { category: "Contingency (5%)", code: "BUD-CONT", amount: 16614000 },
];

const totalBudget = budgetCategories.reduce((s, b) => s + b.amount, 0);

export default function CreateProjectPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/real-estate/projects"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-3"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Projects
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Building2 className="h-6 w-6 text-violet-600" />
              Create New Project (Standalone)
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Register a project directly without going through the opportunity pipeline
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Cancel</Button>
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Create Project
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Project Identity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Hash className="h-4 w-4 text-muted-foreground" />
                Project Identity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Project Name</label>
                  <Input placeholder="e.g., ABC Bayazid Heights" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Project Code</label>
                  <Input defaultValue="RE-00048" disabled className="bg-muted/50 font-mono" />
                  <p className="text-xs text-muted-foreground">Auto-generated, sequential</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Project Type</label>
                  <Select defaultValue="Residential">
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {projectTypes.map((t) => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Project Manager</label>
                  <Select defaultValue="PM01">
                    <SelectTrigger>
                      <SelectValue placeholder="Select manager" />
                    </SelectTrigger>
                    <SelectContent>
                      {projectManagers.map((pm) => (
                        <SelectItem key={pm.id} value={pm.id}>{pm.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location / Area</label>
                  <Input placeholder="e.g., Bayazid Bostami, Chattogram" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">District</label>
                  <Select defaultValue="Chattogram">
                    <SelectTrigger>
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                      {districts.map((d) => (
                        <SelectItem key={d} value={d}>{d}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Area & Units */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Area &amp; Units</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Land Area (Katha)</label>
                  <Input type="number" placeholder="e.g., 22" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Total Built-up (sft)</label>
                  <Input type="number" placeholder="e.g., 102000" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Total Saleable (sft)</label>
                  <Input type="number" placeholder="e.g., 68400" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Total Units</label>
                  <Input type="number" placeholder="e.g., 48" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Expected Start Date</label>
                  <Input type="date" defaultValue="2026-10-01" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Expected End Date</label>
                  <Input type="date" defaultValue="2029-06-30" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Centers */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                Financial Centers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Revenue Center</label>
                  <Select defaultValue={revenueCenters[0]}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {revenueCenters.map((rc) => (
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
                  <label className="text-sm font-medium">Profit Center</label>
                  <Select defaultValue={profitCenters[0]}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {profitCenters.map((pc) => (
                        <SelectItem key={pc} value={pc}>{pc}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Budget */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Initial Budget Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead className="w-[100px]">Code</TableHead>
                    <TableHead className="text-right w-[180px]">Budget Amount (BDT)</TableHead>
                    <TableHead className="text-right w-[80px]">% of Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {budgetCategories.map((b) => (
                    <TableRow key={b.code}>
                      <TableCell>{b.category}</TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">{b.code}</TableCell>
                      <TableCell className="text-right">
                        <Input
                          type="text"
                          defaultValue={b.amount.toLocaleString()}
                          className="h-8 text-sm text-right w-40 ml-auto"
                        />
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {((b.amount / totalBudget) * 100).toFixed(1)}%
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-muted/30 font-semibold">
                    <TableCell>Total Budget</TableCell>
                    <TableCell />
                    <TableCell className="text-right">{formatBDT(totalBudget)}</TableCell>
                    <TableCell className="text-right">100%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-2 text-sm text-blue-800">
                <Info className="h-4 w-4 mt-0.5 flex-shrink-0 text-blue-600" />
                <div className="space-y-2">
                  <p className="font-medium">Standalone Project</p>
                  <p className="text-blue-700">
                    This form creates a project directly without requiring an Opportunity or Feasibility Study.
                    Suitable for projects where land is already acquired or for legacy project imports.
                  </p>
                  <Separator className="my-2" />
                  <p className="text-blue-600 text-xs">
                    For full financial analysis, create a Feasibility Study first, then convert via the Opportunity pipeline.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Project Checklist</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              {[
                { label: "Project name & code", done: false },
                { label: "Location & district", done: false },
                { label: "Area specifications", done: false },
                { label: "Timeline defined", done: false },
                { label: "Financial centers assigned", done: false },
                { label: "Budget allocated", done: false },
                { label: "Project manager assigned", done: false },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div className={`h-4 w-4 rounded border ${item.done ? "bg-emerald-500 border-emerald-500" : "border-muted-foreground/30"}`} />
                  <span className={item.done ? "text-muted-foreground line-through" : ""}>{item.label}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Budget Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Budget</span>
                <span className="font-semibold">{formatBDT(totalBudget)}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Land</span>
                <span>{formatBDT(44000000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Construction</span>
                <span>{formatBDT(247000000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Soft Costs</span>
                <span>{formatBDT(42894000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Contingency</span>
                <span>{formatBDT(16614000)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
