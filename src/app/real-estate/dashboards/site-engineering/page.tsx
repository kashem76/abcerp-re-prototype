"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { formatNumber } from "@/lib/mock-data";
import {
  HardHat, CloudSun, Users, Wrench, AlertTriangle, CheckCircle2,
  Clock, FileText, MapPin, Thermometer, CircleDot, AlertOctagon,
} from "lucide-react";

const weather = { condition: "Partly Cloudy", temp: 32, humidity: 78, wind: "12 km/h SW" };

const manpower = [
  { trade: "Mason", own: 12, contractor: 28, total: 40 },
  { trade: "Helper", own: 8, contractor: 45, total: 53 },
  { trade: "Rod Binder", own: 0, contractor: 18, total: 18 },
  { trade: "Carpenter", own: 4, contractor: 12, total: 16 },
  { trade: "Electrician", own: 2, contractor: 8, total: 10 },
  { trade: "Plumber", own: 0, contractor: 6, total: 6 },
  { trade: "Supervisor", own: 3, contractor: 5, total: 8 },
];

const totalManpower = manpower.reduce((s, m) => s + m.total, 0);

const equipment = [
  { name: "Tower Crane", status: "ACTIVE", hoursUsed: 8, idleHours: 0, operator: "Ramzan Ali" },
  { name: "Concrete Mixer", status: "ACTIVE", hoursUsed: 6, idleHours: 2, operator: "Jamal Hossain" },
  { name: "Bar Bending Machine", status: "ACTIVE", hoursUsed: 7, idleHours: 1, operator: "Rubel Mia" },
  { name: "Vibrator", status: "ACTIVE", hoursUsed: 5, idleHours: 3, operator: "Siraj Uddin" },
  { name: "Hoist", status: "ACTIVE", hoursUsed: 8, idleHours: 0, operator: "Babul Khan" },
  { name: "Pump (Dewatering)", status: "IDLE", hoursUsed: 0, idleHours: 8, operator: "N/A" },
];

const workFronts = [
  { area: "Tower A - Level 8", activity: "RCC Column Casting", progress: 65, team: "M/S Reliable Construction", workers: 28 },
  { area: "Tower A - Level 7", activity: "Beam Shuttering", progress: 45, team: "M/S Reliable Construction", workers: 22 },
  { area: "Tower A - Level 5-6 (MEP)", activity: "Electrical Conduit Laying", progress: 72, team: "M/S Power Electric", workers: 10 },
  { area: "Tower A - Level 1-2 (Finishing)", activity: "Internal Plastering", progress: 38, team: "M/S Finish Works", workers: 18 },
];

const materialStatus = [
  { item: "Cement (OPC 53)", stockQty: 180, unit: "Bags", dailyUsage: 90, daysStock: 2, status: "CRITICAL" },
  { item: "Sand (Sylhet)", stockQty: 250, unit: "CFT", dailyUsage: 50, daysStock: 5, status: "LOW" },
  { item: "60 Grade Rod (12mm)", stockQty: 3200, unit: "KG", dailyUsage: 400, daysStock: 8, status: "OK" },
  { item: "Stone Aggregate 3/4\"", stockQty: 300, unit: "CFT", dailyUsage: 60, daysStock: 5, status: "LOW" },
  { item: "Bricks (1st Class)", stockQty: 12000, unit: "Nos", dailyUsage: 800, daysStock: 15, status: "OK" },
];

const pendingMRs = [
  { code: "MR-RE27-002", items: 6, status: "SUBMITTED", priority: "NORMAL" },
  { code: "MR-RE27-003", items: 3, status: "DRAFT", priority: "NORMAL" },
];

const qualityCheckpoints = [
  { id: "QC-001", checkpoint: "Rebar Check - Level 8 Columns", type: "PRE-POUR", scheduledTime: "09:00 AM", inspector: "Eng. Masud Rana", status: "PENDING" },
  { id: "QC-002", checkpoint: "Concrete Cube Test (7-Day)", type: "LAB_TEST", scheduledTime: "10:30 AM", inspector: "QC Lab", status: "PENDING" },
  { id: "QC-003", checkpoint: "Column Alignment Check - L7", type: "MEASUREMENT", scheduledTime: "11:00 AM", inspector: "Eng. Masud Rana", status: "PENDING" },
  { id: "QC-004", checkpoint: "Plaster Thickness Verification - L1", type: "FINISHING", scheduledTime: "02:00 PM", inspector: "Eng. Faisal", status: "COMPLETED" },
];

const openIssues = [
  { id: "ISS-018", severity: "HIGH", description: "Rod delivery delayed by supplier — expected 3 days late. May impact Level 9 column schedule.", assignedTo: "Procurement Team", daysOpen: 2, status: "IN_PROGRESS" },
  { id: "ISS-016", severity: "MEDIUM", description: "Plumbing contractor manpower shortage — only 6 workers instead of 12. Slowing MEP progress.", assignedTo: "M/S Delta Plumbing", daysOpen: 5, status: "OPEN" },
  { id: "ISS-015", severity: "LOW", description: "Temporary site lighting insufficient on north-east corner. Safety concern for evening shift.", assignedTo: "Site Admin", daysOpen: 8, status: "OPEN" },
];

const dsrStatus = { date: "2026-08-12", status: "DRAFT", engineer: "Eng. Masud Rana", lastSaved: "02:45 PM" };

function severityColor(s: string) {
  if (s === "HIGH" || s === "CRITICAL") return "destructive";
  if (s === "MEDIUM") return "outline";
  return "secondary";
}

function stockBadge(status: string) {
  if (status === "CRITICAL") return <Badge variant="destructive">Critical</Badge>;
  if (status === "LOW") return <Badge variant="outline" className="border-amber-500 text-amber-600">Low</Badge>;
  return <Badge variant="secondary">OK</Badge>;
}

export default function SiteEngineeringDashboard() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <div className="flex items-center gap-3">
          <HardHat className="h-7 w-7 text-orange-600" />
          <h1 className="text-2xl font-bold">Site Engineering Dashboard</h1>
        </div>
        <p className="text-muted-foreground mt-1">ABC Nasirabad Heights — {dsrStatus.date}</p>
      </div>

      {/* Today's Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CloudSun className="h-4 w-4 text-amber-500" /> Weather
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Thermometer className="h-5 w-5 text-red-500" />
              <span className="text-2xl font-bold">{weather.temp}°C</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{weather.condition}</p>
            <p className="text-xs text-muted-foreground">Humidity: {weather.humidity}% | Wind: {weather.wind}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" /> Manpower Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalManpower}</p>
            <p className="text-sm text-muted-foreground">Own: {manpower.reduce((s, m) => s + m.own, 0)} | Contractor: {manpower.reduce((s, m) => s + m.contractor, 0)}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {manpower.map((m) => (
                <Badge key={m.trade} variant="secondary" className="text-xs">
                  {m.trade}: {m.total}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Wrench className="h-4 w-4 text-slate-600" /> Equipment Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{equipment.filter(e => e.status === "ACTIVE").length} / {equipment.length} Active</p>
            <div className="mt-2 space-y-1">
              {equipment.map((eq) => (
                <div key={eq.name} className="flex items-center justify-between text-xs">
                  <span>{eq.name}</span>
                  <Badge variant={eq.status === "ACTIVE" ? "default" : "secondary"} className="text-xs">
                    {eq.status === "ACTIVE" ? `${eq.hoursUsed}h` : "Idle"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Work Fronts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-emerald-600" /> Active Work Fronts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {workFronts.map((wf) => (
              <div key={wf.area} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">{wf.area}</h4>
                  <Badge variant="secondary">{wf.workers} workers</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{wf.activity}</p>
                <div className="flex items-center gap-2">
                  <Progress value={wf.progress} className="flex-1" />
                  <span className="text-xs font-medium w-10 text-right">{wf.progress}%</span>
                </div>
                <p className="text-xs text-muted-foreground">{wf.team}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Material Status + Pending MRs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Material Stock Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Material</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead className="text-right">Daily Usage</TableHead>
                  <TableHead className="text-right">Days Left</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {materialStatus.map((m) => (
                  <TableRow key={m.item}>
                    <TableCell className="font-medium">{m.item}</TableCell>
                    <TableCell className="text-right">{formatNumber(m.stockQty)} {m.unit}</TableCell>
                    <TableCell className="text-right">{formatNumber(m.dailyUsage)}</TableCell>
                    <TableCell className="text-right font-medium">{m.daysStock}</TableCell>
                    <TableCell className="text-center">{stockBadge(m.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Pending Material Requisitions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingMRs.map((mr) => (
              <div key={mr.code} className="border rounded-lg p-3 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-medium">{mr.code}</span>
                  <Badge variant="outline">{mr.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{mr.items} items | {mr.priority}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quality Checkpoints */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-blue-600" /> Quality Checkpoints — Today
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Checkpoint</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Scheduled</TableHead>
                <TableHead>Inspector</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {qualityCheckpoints.map((qc) => (
                <TableRow key={qc.id}>
                  <TableCell className="font-mono text-xs">{qc.id}</TableCell>
                  <TableCell className="font-medium">{qc.checkpoint}</TableCell>
                  <TableCell><Badge variant="secondary" className="text-xs">{qc.type}</Badge></TableCell>
                  <TableCell>{qc.scheduledTime}</TableCell>
                  <TableCell>{qc.inspector}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={qc.status === "COMPLETED" ? "default" : "outline"}>
                      {qc.status === "COMPLETED" ? "Done" : "Pending"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Open Issues */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" /> Open Issues
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead className="text-right">Days Open</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {openIssues.map((iss) => (
                <TableRow key={iss.id}>
                  <TableCell className="font-mono text-xs">{iss.id}</TableCell>
                  <TableCell>
                    <Badge variant={severityColor(iss.severity)}>{iss.severity}</Badge>
                  </TableCell>
                  <TableCell className="max-w-[300px]">{iss.description}</TableCell>
                  <TableCell>{iss.assignedTo}</TableCell>
                  <TableCell className="text-right font-medium">{iss.daysOpen}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline">{iss.status.replace("_", " ")}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* DSR Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-slate-600" /> Daily Site Report (DSR)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-medium">{dsrStatus.date}</p>
            </div>
            <Separator orientation="vertical" className="h-10" />
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge variant="outline" className="border-amber-500 text-amber-600 text-sm">
                {dsrStatus.status}
              </Badge>
            </div>
            <Separator orientation="vertical" className="h-10" />
            <div>
              <p className="text-sm text-muted-foreground">Site Engineer</p>
              <p className="font-medium">{dsrStatus.engineer}</p>
            </div>
            <Separator orientation="vertical" className="h-10" />
            <div>
              <p className="text-sm text-muted-foreground">Last Saved</p>
              <p className="font-medium">{dsrStatus.lastSaved}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
