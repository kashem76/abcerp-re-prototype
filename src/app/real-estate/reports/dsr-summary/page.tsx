"use client";

import Link from "next/link";
import { ArrowLeft, HardHat, Users, Wrench, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatNumber } from "@/lib/mock-data";

interface ManpowerDay {
  trade: string;
  mon: number;
  tue: number;
  wed: number;
  thu: number;
  fri: number;
  sat: number;
}

const ownManpower: ManpowerDay[] = [
  { trade: "Mason", mon: 12, tue: 14, wed: 12, thu: 13, fri: 11, sat: 8 },
  { trade: "Helper", mon: 8, tue: 10, wed: 8, thu: 9, fri: 8, sat: 6 },
  { trade: "Rod Binder", mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0 },
  { trade: "Carpenter", mon: 4, tue: 4, wed: 5, thu: 4, fri: 4, sat: 3 },
  { trade: "Electrician", mon: 2, tue: 2, wed: 3, thu: 2, fri: 2, sat: 0 },
  { trade: "Plumber", mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0 },
  { trade: "Painter", mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0 },
  { trade: "Supervisor", mon: 3, tue: 3, wed: 3, thu: 3, fri: 3, sat: 2 },
  { trade: "Welder", mon: 1, tue: 1, wed: 2, thu: 1, fri: 1, sat: 0 },
];

const contractorManpower: ManpowerDay[] = [
  { trade: "Mason", mon: 28, tue: 30, wed: 26, thu: 32, fri: 28, sat: 22 },
  { trade: "Helper", mon: 45, tue: 48, wed: 42, thu: 50, fri: 44, sat: 35 },
  { trade: "Rod Binder", mon: 18, tue: 20, wed: 16, thu: 22, fri: 18, sat: 14 },
  { trade: "Carpenter", mon: 12, tue: 14, wed: 10, thu: 15, fri: 12, sat: 8 },
  { trade: "Electrician", mon: 8, tue: 8, wed: 10, thu: 8, fri: 8, sat: 5 },
  { trade: "Plumber", mon: 6, tue: 6, wed: 4, thu: 8, fri: 6, sat: 4 },
  { trade: "Painter", mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0 },
  { trade: "Supervisor", mon: 5, tue: 5, wed: 5, thu: 5, fri: 5, sat: 3 },
  { trade: "Welder", mon: 3, tue: 4, wed: 3, thu: 4, fri: 3, sat: 2 },
];

const plannedManpower: Record<string, number> = {
  Mason: 45, Helper: 60, "Rod Binder": 22, Carpenter: 18, Electrician: 12,
  Plumber: 10, Painter: 8, Supervisor: 8, Welder: 6,
};

function weekTotal(row: ManpowerDay) {
  return row.mon + row.tue + row.wed + row.thu + row.fri + row.sat;
}

function avgPerDay(row: ManpowerDay) {
  return (weekTotal(row) / 6).toFixed(1);
}

function combinedRow(trade: string) {
  const own = ownManpower.find((m) => m.trade === trade)!;
  const con = contractorManpower.find((m) => m.trade === trade)!;
  return {
    trade,
    mon: own.mon + con.mon,
    tue: own.tue + con.tue,
    wed: own.wed + con.wed,
    thu: own.thu + con.thu,
    fri: own.fri + con.fri,
    sat: own.sat + con.sat,
  };
}

const trades = ownManpower.map((m) => m.trade);
const combinedData = trades.map(combinedRow);

const todayTotal = combinedData.reduce((s, r) => s + r.sat, 0);
const weekAvg = (combinedData.reduce((s, r) => s + weekTotal(r), 0) / 6).toFixed(0);
const peakDay = Math.max(
  combinedData.reduce((s, r) => s + r.mon, 0),
  combinedData.reduce((s, r) => s + r.tue, 0),
  combinedData.reduce((s, r) => s + r.wed, 0),
  combinedData.reduce((s, r) => s + r.thu, 0),
  combinedData.reduce((s, r) => s + r.fri, 0),
  combinedData.reduce((s, r) => s + r.sat, 0),
);

interface EquipmentRow {
  equipment: string;
  totalHours: number;
  productiveHours: number;
  idleHours: number;
}

const equipment: EquipmentRow[] = [
  { equipment: "Tower Crane", totalHours: 48, productiveHours: 46, idleHours: 2 },
  { equipment: "Concrete Mixer", totalHours: 48, productiveHours: 38, idleHours: 10 },
  { equipment: "Bar Bending Machine", totalHours: 48, productiveHours: 42, idleHours: 6 },
  { equipment: "Vibrator", totalHours: 48, productiveHours: 32, idleHours: 16 },
  { equipment: "Hoist", totalHours: 48, productiveHours: 44, idleHours: 4 },
  { equipment: "Dewatering Pump", totalHours: 48, productiveHours: 8, idleHours: 40 },
  { equipment: "Generator (100 KVA)", totalHours: 48, productiveHours: 12, idleHours: 36 },
];

const avgUtilization = (equipment.reduce((s, e) => s + (e.productiveHours / e.totalHours) * 100, 0) / equipment.length).toFixed(0);

function ManpowerTable({ data, label }: { data: ManpowerDay[]; label: string }) {
  const totals = {
    mon: data.reduce((s, r) => s + r.mon, 0),
    tue: data.reduce((s, r) => s + r.tue, 0),
    wed: data.reduce((s, r) => s + r.wed, 0),
    thu: data.reduce((s, r) => s + r.thu, 0),
    fri: data.reduce((s, r) => s + r.fri, 0),
    sat: data.reduce((s, r) => s + r.sat, 0),
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Trade ({label})</TableHead>
          <TableHead className="text-center">Mon</TableHead>
          <TableHead className="text-center">Tue</TableHead>
          <TableHead className="text-center">Wed</TableHead>
          <TableHead className="text-center">Thu</TableHead>
          <TableHead className="text-center">Fri</TableHead>
          <TableHead className="text-center">Sat</TableHead>
          <TableHead className="text-center">Week Total</TableHead>
          <TableHead className="text-center">Avg/Day</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.trade}>
            <TableCell className="font-medium">{row.trade}</TableCell>
            <TableCell className="text-center font-mono">{row.mon}</TableCell>
            <TableCell className="text-center font-mono">{row.tue}</TableCell>
            <TableCell className="text-center font-mono">{row.wed}</TableCell>
            <TableCell className="text-center font-mono">{row.thu}</TableCell>
            <TableCell className="text-center font-mono">{row.fri}</TableCell>
            <TableCell className="text-center font-mono">{row.sat}</TableCell>
            <TableCell className="text-center font-mono font-semibold">{weekTotal(row)}</TableCell>
            <TableCell className="text-center font-mono">{avgPerDay(row)}</TableCell>
          </TableRow>
        ))}
        <TableRow className="border-t-2 bg-muted/30 font-semibold">
          <TableCell>TOTAL</TableCell>
          <TableCell className="text-center font-mono">{totals.mon}</TableCell>
          <TableCell className="text-center font-mono">{totals.tue}</TableCell>
          <TableCell className="text-center font-mono">{totals.wed}</TableCell>
          <TableCell className="text-center font-mono">{totals.thu}</TableCell>
          <TableCell className="text-center font-mono">{totals.fri}</TableCell>
          <TableCell className="text-center font-mono">{totals.sat}</TableCell>
          <TableCell className="text-center font-mono">{totals.mon + totals.tue + totals.wed + totals.thu + totals.fri + totals.sat}</TableCell>
          <TableCell className="text-center font-mono">{((totals.mon + totals.tue + totals.wed + totals.thu + totals.fri + totals.sat) / 6).toFixed(0)}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default function DSRSummaryPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/real-estate/reports" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-3">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to Reports
        </Link>
        <div className="flex items-center gap-3">
          <HardHat className="h-7 w-7 text-yellow-600" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">DSR Manpower Summary</h1>
            <p className="text-muted-foreground">ABC Nasirabad Heights — Week of 7-12 Aug 2026</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Manpower Today</CardTitle></CardHeader>
          <CardContent><div className="flex items-center gap-2"><Users className="h-5 w-5 text-blue-500" /><span className="text-2xl font-bold">{todayTotal}</span></div><p className="text-xs text-muted-foreground">Saturday, 12 Aug 2026</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Avg Daily This Week</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{weekAvg}</div><p className="text-xs text-muted-foreground">6 working days</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Peak Day</CardTitle></CardHeader>
          <CardContent><div className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-green-500" /><span className="text-2xl font-bold">{peakDay}</span></div><p className="text-xs text-muted-foreground">Thursday</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Equipment Utilization</CardTitle></CardHeader>
          <CardContent><div className="flex items-center gap-2"><Wrench className="h-5 w-5 text-purple-500" /><span className="text-2xl font-bold">{avgUtilization}%</span></div><p className="text-xs text-muted-foreground">Avg across 7 equipment</p></CardContent>
        </Card>
      </div>

      {/* Manpower vs Planned */}
      <Card>
        <CardHeader><CardTitle>Actual vs Planned Manpower (Daily Average)</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {trades.map((trade) => {
              const combined = combinedRow(trade);
              const actual = parseFloat(avgPerDay(combined));
              const planned = plannedManpower[trade];
              const pct = planned > 0 ? (actual / planned) * 100 : 0;
              return (
                <div key={trade} className="flex items-center gap-3">
                  <div className="w-28 text-sm font-medium">{trade}</div>
                  <div className="flex-1">
                    <Progress value={Math.min(pct, 100)} className="h-3" />
                  </div>
                  <div className="w-32 text-right">
                    <span className={`text-sm font-mono ${pct < 70 ? "text-red-600" : pct < 90 ? "text-yellow-600" : "text-green-600"}`}>
                      {actual} / {planned}
                    </span>
                    <Badge variant="outline" className={`ml-2 text-xs ${pct < 70 ? "bg-red-50 text-red-700" : pct < 90 ? "bg-yellow-50 text-yellow-700" : "bg-green-50 text-green-700"}`}>
                      {pct.toFixed(0)}%
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Manpower Tables */}
      <Card>
        <CardHeader><CardTitle>Weekly Manpower Breakdown</CardTitle></CardHeader>
        <CardContent>
          <Tabs defaultValue="combined">
            <TabsList>
              <TabsTrigger value="combined">Combined</TabsTrigger>
              <TabsTrigger value="own">Own Manpower</TabsTrigger>
              <TabsTrigger value="contractor">Contractor</TabsTrigger>
            </TabsList>
            <TabsContent value="combined" className="overflow-x-auto mt-4">
              <ManpowerTable data={combinedData.map((c) => ({ ...c, trade: c.trade } as ManpowerDay))} label="All" />
            </TabsContent>
            <TabsContent value="own" className="overflow-x-auto mt-4">
              <ManpowerTable data={ownManpower} label="Own" />
            </TabsContent>
            <TabsContent value="contractor" className="overflow-x-auto mt-4">
              <ManpowerTable data={contractorManpower} label="Contractor" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Equipment Utilization */}
      <Card>
        <CardHeader><CardTitle>Equipment Utilization (Weekly)</CardTitle></CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Equipment</TableHead>
                <TableHead className="text-right">Total Hours</TableHead>
                <TableHead className="text-right">Productive Hrs</TableHead>
                <TableHead className="text-right">Idle Hrs</TableHead>
                <TableHead className="text-center">Utilization %</TableHead>
                <TableHead className="w-48">Utilization</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {equipment.map((row) => {
                const util = (row.productiveHours / row.totalHours) * 100;
                return (
                  <TableRow key={row.equipment} className={util < 30 ? "bg-red-50/30" : ""}>
                    <TableCell className="font-medium">{row.equipment}</TableCell>
                    <TableCell className="text-right font-mono">{row.totalHours}</TableCell>
                    <TableCell className="text-right font-mono">{row.productiveHours}</TableCell>
                    <TableCell className="text-right font-mono text-orange-600">{row.idleHours}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className={`text-xs ${util >= 75 ? "bg-green-50 text-green-700" : util >= 50 ? "bg-yellow-50 text-yellow-700" : "bg-red-50 text-red-700"}`}>
                        {util.toFixed(0)}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Progress value={util} className="h-2" />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
