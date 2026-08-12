"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, ClipboardList, Users, Wrench, AlertTriangle } from "lucide-react";
import Link from "next/link";

const dsrList = [
  { date: "2026-08-12", project: "ABC Nasirabad Heights", engineer: "Eng. Masud Rana", manpower: 151, equipment: 6, issues: 2, status: "DRAFT" },
  { date: "2026-08-11", project: "ABC Nasirabad Heights", engineer: "Eng. Masud Rana", manpower: 148, equipment: 6, issues: 1, status: "SUBMITTED" },
  { date: "2026-08-10", project: "ABC Nasirabad Heights", engineer: "Eng. Masud Rana", manpower: 142, equipment: 5, issues: 0, status: "SUBMITTED" },
  { date: "2026-08-09", project: "ABC Nasirabad Heights", engineer: "Eng. Masud Rana", manpower: 155, equipment: 6, issues: 3, status: "SUBMITTED" },
  { date: "2026-08-08", project: "ABC Nasirabad Heights", engineer: "Eng. Masud Rana", manpower: 138, equipment: 6, issues: 1, status: "SUBMITTED" },
  { date: "2026-08-12", project: "Bay View Residence", engineer: "Eng. Rafiq Ahmed", manpower: 92, equipment: 4, issues: 0, status: "SUBMITTED" },
  { date: "2026-08-11", project: "Bay View Residence", engineer: "Eng. Rafiq Ahmed", manpower: 88, equipment: 4, issues: 1, status: "SUBMITTED" },
];

export default function DSRListPage() {
  const totalManpower = dsrList.filter(d => d.date === "2026-08-12").reduce((s, d) => s + d.manpower, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Daily Site Reports</h1>
          <p className="text-gray-500">Engineering team daily operational reports</p>
        </div>
        <Link href="/real-estate/dsr/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> New DSR
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">7</p>
                <p className="text-sm text-gray-500">DSRs this week</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-emerald-500" />
              <div>
                <p className="text-2xl font-bold">{totalManpower}</p>
                <p className="text-sm text-gray-500">Total manpower today</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">10</p>
                <p className="text-sm text-gray-500">Equipment active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-gray-500">Open issues today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent DSRs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Site Engineer</TableHead>
                <TableHead className="text-right">Manpower</TableHead>
                <TableHead className="text-right">Equipment</TableHead>
                <TableHead className="text-right">Issues</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dsrList.map((d, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{d.date}</TableCell>
                  <TableCell>{d.project}</TableCell>
                  <TableCell>{d.engineer}</TableCell>
                  <TableCell className="text-right">{d.manpower}</TableCell>
                  <TableCell className="text-right">{d.equipment}</TableCell>
                  <TableCell className="text-right">
                    {d.issues > 0 ? (
                      <Badge className="bg-yellow-100 text-yellow-800">{d.issues}</Badge>
                    ) : (
                      <span className="text-gray-400">0</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className={d.status === "DRAFT" ? "bg-gray-100 text-gray-800" : "bg-emerald-100 text-emerald-800"}>
                      {d.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Link href="/real-estate/dsr/new">
                      <Button variant="ghost" size="sm">View</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
