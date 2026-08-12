"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { buyerPortalData, paymentSchedule, formatBDT, formatNumber } from "@/lib/mock-data";
import {
  Home, CreditCard, FileText, HardHat, Phone,
  CheckCircle2, Clock, AlertCircle, Download, Send,
  User, Building2, CalendarDays
} from "lucide-react";

const bp = buyerPortalData;

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    PAID: "bg-emerald-100 text-emerald-800",
    OVERDUE: "bg-red-100 text-red-800",
    DUE: "bg-yellow-100 text-yellow-800",
    UPCOMING: "bg-gray-100 text-gray-600",
    DONE: "bg-emerald-100 text-emerald-800",
    IN_PROGRESS: "bg-blue-100 text-blue-800",
  };
  return <Badge className={colors[status] || "bg-gray-100"}>{status}</Badge>;
}

function MilestoneIcon({ status }: { status: string }) {
  if (status === "DONE") return <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
  if (status === "IN_PROGRESS") return <Clock className="h-5 w-5 text-blue-500" />;
  return <Clock className="h-5 w-5 text-gray-300" />;
}

export default function BuyerPortalPage() {
  const totalPaid = paymentSchedule.filter(p => p.status === "PAID").reduce((s, p) => s + p.paidAmount, 0);
  const totalDue = paymentSchedule.reduce((s, p) => s + p.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Portal Header */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">ABC Nasirabad Heights</h1>
            <p className="text-sm text-gray-500">Buyer Portal</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-gray-500" />
          <span className="text-sm font-medium">{bp.buyer.name}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Unit Info + Payment Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
                <Home className="h-4 w-4" /> My Unit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{bp.unit.code}</p>
              <p className="text-sm text-gray-600">{bp.unit.type} — {bp.unit.size}</p>
              <p className="text-sm text-gray-500">{bp.unit.floor}, {bp.unit.block}, {bp.unit.facing} Facing</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
                <CreditCard className="h-4 w-4" /> Payment Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-emerald-600">BDT {formatBDT(totalPaid)}</p>
              <p className="text-sm text-gray-500">Paid of BDT {formatBDT(totalDue)}</p>
              <Progress value={(totalPaid / totalDue) * 100} className="mt-2 h-2" />
              <p className="text-xs text-gray-400 mt-1">{((totalPaid / totalDue) * 100).toFixed(0)}% paid</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
                <HardHat className="h-4 w-4" /> Construction Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-blue-600">{bp.progress.overall}%</p>
              <p className="text-sm text-gray-500">Overall completion</p>
              <Progress value={bp.progress.overall} className="mt-2 h-2" />
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="payment" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="handover">Handover</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>

          {/* Payment Tab */}
          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Payment Schedule</CardTitle>
                <p className="text-sm text-gray-500">Booking: {bp.booking.code} — Agreement Value: BDT {formatBDT(bp.booking.agreementValue)}</p>
              </CardHeader>
              <CardContent>
                {/* Next Due Alert */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="font-medium text-yellow-800">Next Payment Due</p>
                      <p className="text-sm text-yellow-700">Installment 5 — BDT {formatNumber(500_000)} — Due: {bp.booking.nextDue}</p>
                    </div>
                  </div>
                  <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">Pay Now</Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10">#</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead className="text-right">Amount (BDT)</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Paid Date</TableHead>
                      <TableHead className="text-right">Paid (BDT)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentSchedule.map((p) => (
                      <TableRow key={p.installment} className={p.status === "OVERDUE" ? "bg-red-50" : ""}>
                        <TableCell className="font-medium">{p.installment}</TableCell>
                        <TableCell>{p.type}</TableCell>
                        <TableCell>{p.dueDate}</TableCell>
                        <TableCell className="text-right font-mono">{formatNumber(p.amount)}</TableCell>
                        <TableCell><StatusBadge status={p.status} /></TableCell>
                        <TableCell>{p.paidDate || "—"}</TableCell>
                        <TableCell className="text-right font-mono">{p.paidAmount ? formatNumber(p.paidAmount) : "—"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <Separator className="my-4" />
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total Paid</span>
                  <span className="font-bold text-emerald-600">BDT {formatNumber(totalPaid)}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-500">Balance Remaining</span>
                  <span className="font-bold text-red-600">BDT {formatNumber(totalDue - totalPaid)}</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Construction Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Foundation", value: bp.progress.foundation },
                    { label: "Structure", value: bp.progress.structure },
                    { label: "MEP", value: bp.progress.mep },
                    { label: "Finishing", value: bp.progress.finishing },
                  ].map((p) => (
                    <div key={p.label} className="text-center">
                      <p className="text-sm text-gray-500">{p.label}</p>
                      <p className="text-2xl font-bold">{p.value}%</p>
                      <Progress value={p.value} className="mt-1 h-2" />
                    </div>
                  ))}
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-3">Project Milestones</h3>
                  <div className="space-y-3">
                    {bp.milestones.map((m) => (
                      <div key={m.name} className="flex items-center gap-3">
                        <MilestoneIcon status={m.status} />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{m.name}</p>
                          <p className="text-xs text-gray-500">{m.date}</p>
                        </div>
                        <StatusBadge status={m.status} />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">My Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Allotment Letter", date: "2026-01-15", available: true },
                    { name: "Sales Agreement (Signed)", date: "2026-02-01", available: true },
                    { name: "Payment Receipt — Booking Money", date: "2026-01-14", available: true },
                    { name: "Payment Receipt — Down Payment", date: "2026-02-12", available: true },
                    { name: "Payment Receipt — Installment 1-4", date: "2026-06-16", available: true },
                    { name: "Floor Plan — Unit A-201", date: "2026-01-10", available: true },
                    { name: "AIT Certificate", date: "—", available: false },
                    { name: "Completion Certificate", date: "—", available: false },
                    { name: "Handover Certificate", date: "—", available: false },
                  ].map((doc) => (
                    <div key={doc.name} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className={`h-5 w-5 ${doc.available ? "text-blue-500" : "text-gray-300"}`} />
                        <div>
                          <p className="font-medium text-sm">{doc.name}</p>
                          <p className="text-xs text-gray-500">{doc.date}</p>
                        </div>
                      </div>
                      {doc.available ? (
                        <Button variant="outline" size="sm" className="gap-1">
                          <Download className="h-3 w-3" /> Download
                        </Button>
                      ) : (
                        <Badge variant="outline" className="text-gray-400">Not yet available</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Handover Tab */}
          <TabsContent value="handover">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Handover Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <CalendarDays className="h-5 w-5 text-blue-600" />
                    <p className="font-medium text-blue-800">Expected Handover: December 2027</p>
                  </div>
                  <p className="text-sm text-blue-600 ml-7">Based on current construction progress ({bp.progress.overall}% complete)</p>
                </div>

                <h3 className="font-medium mb-3">Clearance Checklist</h3>
                <div className="space-y-3">
                  {[
                    { check: "Construction Complete", status: "PENDING", note: "Structure 72% complete" },
                    { check: "Unit Inspection Passed", status: "PENDING", note: "Scheduled after finishing" },
                    { check: "All Snags Resolved", status: "PENDING", note: "Inspection not yet done" },
                    { check: "Accounts Clearance", status: "PENDING", note: "BDT 5,000,000 balance remaining" },
                    { check: "Agreement Completed", status: "DONE", note: "Agreement signed and registered" },
                    { check: "Documents Ready", status: "PENDING", note: "Awaiting completion certificate" },
                  ].map((c) => (
                    <div key={c.check} className="flex items-center gap-3 p-3 border rounded-lg">
                      {c.status === "DONE" ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      ) : (
                        <Clock className="h-5 w-5 text-gray-300" />
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-sm">{c.check}</p>
                        <p className="text-xs text-gray-500">{c.note}</p>
                      </div>
                      <StatusBadge status={c.status} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Support Tab */}
          <TabsContent value="support">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Raise a Query</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Category</label>
                    <select className="w-full mt-1 border rounded-md p-2 text-sm">
                      <option>Payment Related</option>
                      <option>Construction Progress</option>
                      <option>Handover</option>
                      <option>Maintenance / Defect</option>
                      <option>Document Request</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Priority</label>
                    <select className="w-full mt-1 border rounded-md p-2 text-sm">
                      <option>Normal</option>
                      <option>Urgent</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Description</label>
                  <Textarea placeholder="Describe your query or concern..." className="mt-1" rows={4} />
                </div>
                <Button className="gap-2">
                  <Send className="h-4 w-4" /> Submit Query
                </Button>

                <Separator className="my-4" />

                <h3 className="font-medium">My Previous Queries</h3>
                <div className="space-y-3">
                  {[
                    { code: "QRY-001", date: "2026-06-20", category: "Payment", subject: "Need duplicate receipt for installment 3", status: "RESOLVED" },
                    { code: "QRY-002", date: "2026-07-15", category: "Construction", subject: "What is the current floor being constructed?", status: "RESOLVED" },
                  ].map((q) => (
                    <div key={q.code} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{q.subject}</p>
                        <p className="text-xs text-gray-500">{q.code} — {q.category} — {q.date}</p>
                      </div>
                      <StatusBadge status={q.status} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Contact */}
        <Card>
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Phone className="h-4 w-4" />
                <span>Need help? Call: 01711-XXXXXX (Sales Office)</span>
              </div>
              <p className="text-xs text-gray-400">ABC Properties Ltd. — Buyer Portal v1.0</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
