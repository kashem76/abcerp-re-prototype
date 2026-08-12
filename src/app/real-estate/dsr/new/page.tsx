"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { dsrData } from "@/lib/mock-data";
import { ClipboardList, Users, Wrench, Hammer, AlertTriangle, Cloud, Save, Send, Camera } from "lucide-react";

const dsr = dsrData;

export default function DSREntryPage() {
  const totalOwn = dsr.manpower.reduce((s, m) => s + m.own, 0);
  const totalContractor = dsr.manpower.reduce((s, m) => s + m.contractor, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ClipboardList className="h-6 w-6 text-gray-400" />
            Daily Site Report
          </h1>
          <p className="text-gray-500">ABC Nasirabad Heights — {dsr.date}</p>
        </div>
        <div className="text-right text-sm">
          <div className="flex items-center gap-2 text-gray-500">
            <Cloud className="h-4 w-4" /> {dsr.weather}
          </div>
          <p className="text-gray-400 mt-0.5">Site Engineer: {dsr.siteEngineer}</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card>
          <CardContent className="pt-4 pb-3 flex items-center gap-3">
            <Users className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-2xl font-bold">{totalOwn + totalContractor}</p>
              <p className="text-xs text-gray-500">Total Manpower</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-3 flex items-center gap-3">
            <Wrench className="h-8 w-8 text-purple-500" />
            <div>
              <p className="text-2xl font-bold">{dsr.equipment.filter(e => e.status === "ACTIVE").length}</p>
              <p className="text-xs text-gray-500">Equipment Active</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-3 flex items-center gap-3">
            <Hammer className="h-8 w-8 text-emerald-500" />
            <div>
              <p className="text-2xl font-bold">{dsr.workDone.length}</p>
              <p className="text-xs text-gray-500">Activities Logged</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-3 flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 text-yellow-500" />
            <div>
              <p className="text-2xl font-bold">{dsr.issues.length}</p>
              <p className="text-xs text-gray-500">Issues Reported</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="manpower" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="manpower">Manpower</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
          <TabsTrigger value="work">Work Done</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
        </TabsList>

        {/* Manpower Tab */}
        <TabsContent value="manpower">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-4 w-4" /> Manpower Deployment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Trade</TableHead>
                    <TableHead className="text-right">Own Labour</TableHead>
                    <TableHead className="text-right">Contractor Labour</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dsr.manpower.map((m) => (
                    <TableRow key={m.trade}>
                      <TableCell className="font-medium">{m.trade}</TableCell>
                      <TableCell className="text-right">
                        <Input type="number" defaultValue={m.own} className="w-20 text-right ml-auto h-8" />
                      </TableCell>
                      <TableCell className="text-right">
                        <Input type="number" defaultValue={m.contractor} className="w-20 text-right ml-auto h-8" />
                      </TableCell>
                      <TableCell className="text-right font-semibold">{m.own + m.contractor}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="font-bold border-t-2 bg-gray-50">
                    <TableCell>TOTAL</TableCell>
                    <TableCell className="text-right">{totalOwn}</TableCell>
                    <TableCell className="text-right">{totalContractor}</TableCell>
                    <TableCell className="text-right text-blue-600">{totalOwn + totalContractor}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Equipment Tab */}
        <TabsContent value="equipment">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Wrench className="h-4 w-4" /> Equipment on Site
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Equipment</TableHead>
                    <TableHead className="text-right">Hours Used</TableHead>
                    <TableHead className="text-right">Idle Hours</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dsr.equipment.map((e) => (
                    <TableRow key={e.name}>
                      <TableCell className="font-medium">{e.name}</TableCell>
                      <TableCell className="text-right">
                        <Input type="number" defaultValue={e.hoursUsed} className="w-20 text-right ml-auto h-8" />
                      </TableCell>
                      <TableCell className="text-right">
                        <Input type="number" defaultValue={e.idleHours} className="w-20 text-right ml-auto h-8" />
                      </TableCell>
                      <TableCell>
                        <Badge className={e.status === "ACTIVE" ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-600"}>
                          {e.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Work Done Tab */}
        <TabsContent value="work">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Hammer className="h-4 w-4" /> Work Performed Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>WBS</TableHead>
                    <TableHead>Activity</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead>UOM</TableHead>
                    <TableHead>Remarks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dsr.workDone.map((w, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-sm text-gray-600">{w.wbs}</TableCell>
                      <TableCell className="font-medium">{w.activity}</TableCell>
                      <TableCell className="text-right font-mono">{w.qty}</TableCell>
                      <TableCell>{w.uom}</TableCell>
                      <TableCell className="text-sm text-gray-500">{w.remarks}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button variant="outline" size="sm" className="mt-3">+ Add Activity</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Issues Tab */}
        <TabsContent value="issues">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" /> Site Issues & Delays
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {dsr.issues.map((issue, i) => (
                <div key={i} className={`p-4 border rounded-lg ${issue.severity === "HIGH" ? "bg-red-50 border-red-200" : "bg-yellow-50 border-yellow-200"}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={issue.severity === "HIGH" ? "bg-red-200 text-red-800" : "bg-yellow-200 text-yellow-800"}>
                      {issue.severity}
                    </Badge>
                  </div>
                  <p className="text-sm">{issue.description}</p>
                  <p className="text-xs text-gray-500 mt-2">Action taken: {issue.action}</p>
                </div>
              ))}
              <Button variant="outline" size="sm">+ Report Issue</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Photos Tab */}
        <TabsContent value="photos">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Camera className="h-4 w-4" /> Site Photos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <Camera className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">Upload Site Photos</p>
                <p className="text-sm text-gray-400 mt-1">Drag and drop photos or click to browse</p>
                <p className="text-xs text-gray-400 mt-2">Tag each photo with WBS / Floor / Unit for filtering</p>
                <Button variant="outline" className="mt-4">Browse Files</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Actions */}
      <div className="flex gap-3 justify-end">
        <Button variant="outline" className="gap-2">
          <Save className="h-4 w-4" /> Save Draft
        </Button>
        <Button className="gap-2">
          <Send className="h-4 w-4" /> Submit DSR
        </Button>
      </div>
    </div>
  );
}
