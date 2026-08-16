"use client";

import Link from "next/link";
import { ArrowLeft, Handshake, Home, CreditCard, CalendarCheck, CheckCircle2, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { formatBDT, formatNumber } from "@/lib/mock-data";

const agreement = {
  date: "2025-01-15",
  agreementNo: "JV-2025-001",
  project: "ABC Nasirabad Heights",
  landArea: "42 Katha",
  landLocation: "Nasirabad R/A, Block-G, Chattogram",
  landownerShare: "40%",
  developerShare: "60%",
  landowners: [
    { name: "Mr. Abdul Karim", nid: "1991XXXXXXXX01", share: "60%", role: "Primary Landowner" },
    { name: "Mrs. Fatema Begum", nid: "1985XXXXXXXX02", share: "40%", role: "Joint Landowner" },
  ],
};

const entitlements = {
  units: [
    { code: "A-301", type: "3BR Apartment", size: 1450, floor: "3rd Floor", block: "Tower A", estimatedValue: 8_990_000, constructionProgress: 72, status: "Under Construction" },
    { code: "A-501", type: "3BR Apartment", size: 1450, floor: "5th Floor", block: "Tower A", estimatedValue: 9_280_000, constructionProgress: 55, status: "Under Construction" },
    { code: "B-201", type: "3BR Apartment", size: 1520, floor: "2nd Floor", block: "Tower B", estimatedValue: 9_120_000, constructionProgress: 38, status: "Under Construction" },
    { code: "B-401", type: "3BR Apartment", size: 1520, floor: "4th Floor", block: "Tower B", estimatedValue: 9_500_000, constructionProgress: 25, status: "Under Construction" },
    { code: "B-601", type: "2BR Apartment", size: 1100, floor: "6th Floor", block: "Tower B", estimatedValue: 6_820_000, constructionProgress: 15, status: "Under Construction" },
    { code: "B-602", type: "2BR Apartment", size: 1100, floor: "6th Floor", block: "Tower B", estimatedValue: 6_820_000, constructionProgress: 15, status: "Under Construction" },
  ],
  parking: [
    { code: "P-G05", type: "Covered Parking", location: "Ground Floor", estimatedValue: 800_000 },
    { code: "P-G06", type: "Covered Parking", location: "Ground Floor", estimatedValue: 800_000 },
    { code: "P-B12", type: "Basement Parking", location: "Basement-1", estimatedValue: 600_000 },
    { code: "P-B13", type: "Basement Parking", location: "Basement-1", estimatedValue: 600_000 },
  ],
};

const totalUnitValue = entitlements.units.reduce((s, u) => s + u.estimatedValue, 0);
const totalParkingValue = entitlements.parking.reduce((s, p) => s + p.estimatedValue, 0);
const totalEntitlement = totalUnitValue + totalParkingValue;

const cashPayments = [
  { date: "2025-02-01", description: "Advance against JV Agreement", amount: 5_000_000, status: "PAID", method: "Bank Transfer", ref: "TXN-20250201-001" },
  { date: "2025-06-15", description: "2nd Tranche — On CDA Approval", amount: 3_000_000, status: "PAID", method: "Bank Transfer", ref: "TXN-20250615-002" },
  { date: "2025-12-01", description: "3rd Tranche — On Foundation Completion", amount: 4_000_000, status: "PAID", method: "Bank Transfer", ref: "TXN-20251201-003" },
  { date: "2026-06-01", description: "4th Tranche — On Structure 50%", amount: 3_000_000, status: "PAID", method: "Bank Transfer", ref: "TXN-20260601-004" },
  { date: "2026-12-01", description: "5th Tranche — On Structure 100%", amount: 3_000_000, status: "UPCOMING", method: "—", ref: "—" },
  { date: "2027-06-01", description: "6th Tranche — On MEP Completion", amount: 2_000_000, status: "UPCOMING", method: "—", ref: "—" },
];

const totalCashComponent = cashPayments.reduce((s, p) => s + p.amount, 0);
const paidCash = cashPayments.filter((p) => p.status === "PAID").reduce((s, p) => s + p.amount, 0);
const pendingCash = totalCashComponent - paidCash;

const handoverTimeline = [
  { unit: "A-301", expectedDate: "2027-06-30", status: "On Track" },
  { unit: "A-501", expectedDate: "2027-09-30", status: "On Track" },
  { unit: "B-201", expectedDate: "2027-09-30", status: "At Risk" },
  { unit: "B-401", expectedDate: "2027-12-31", status: "At Risk" },
  { unit: "B-601", expectedDate: "2028-03-31", status: "On Track" },
  { unit: "B-602", expectedDate: "2028-03-31", status: "On Track" },
];

const grandTotal = totalEntitlement + totalCashComponent;
const delivered = paidCash;
const deliveredPct = (delivered / grandTotal * 100);

export default function LandownerStatementPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/real-estate/reports" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-3">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to Reports
        </Link>
        <div className="flex items-center gap-3">
          <Handshake className="h-7 w-7 text-teal-600" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">JV / Landowner Statement</h1>
            <p className="text-muted-foreground">ABC Nasirabad Heights — As at 12 Aug 2026</p>
          </div>
        </div>
      </div>

      {/* Agreement Summary */}
      <Card>
        <CardHeader><CardTitle>JV Agreement Summary</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">Agreement No</span><span className="font-mono font-medium">{agreement.agreementNo}</span></div>
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">Agreement Date</span><span className="font-medium">{agreement.date}</span></div>
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">Project</span><span className="font-medium">{agreement.project}</span></div>
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">Land Area</span><span className="font-medium">{agreement.landArea}</span></div>
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">Location</span><span className="font-medium text-right text-sm">{agreement.landLocation}</span></div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">Landowner Share</span><Badge className="bg-teal-100 text-teal-800">{agreement.landownerShare}</Badge></div>
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">Developer Share</span><Badge className="bg-blue-100 text-blue-800">{agreement.developerShare}</Badge></div>
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">Units Allocated</span><span className="font-medium">6 Units + 4 Parking</span></div>
              <Separator />
              {agreement.landowners.map((lo) => (
                <div key={lo.name} className="flex justify-between items-center">
                  <div><p className="font-medium text-sm">{lo.name}</p><p className="text-xs text-muted-foreground">{lo.role} ({lo.share})</p></div>
                  <Badge variant="outline" className="text-xs">NID: {lo.nid}</Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Entitlement Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Entitlement Value</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-teal-700">{formatBDT(grandTotal)}</div><p className="text-xs text-muted-foreground">Units + Parking + Cash</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Units Value</CardTitle></CardHeader>
          <CardContent><div className="flex items-center gap-2"><Home className="h-5 w-5 text-blue-500" /><span className="text-2xl font-bold">{formatBDT(totalUnitValue)}</span></div><p className="text-xs text-muted-foreground">6 apartments</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Cash Component</CardTitle></CardHeader>
          <CardContent><div className="flex items-center gap-2"><CreditCard className="h-5 w-5 text-green-500" /><span className="text-2xl font-bold">{formatBDT(totalCashComponent)}</span></div><p className="text-xs text-muted-foreground">Paid: {formatBDT(paidCash)} | Pending: {formatBDT(pendingCash)}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Delivered to Date</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{deliveredPct.toFixed(1)}%</div><Progress value={deliveredPct} className="h-2 mt-2" /><p className="text-xs text-muted-foreground mt-1">Cash paid: {formatBDT(paidCash)} of {formatBDT(grandTotal)}</p></CardContent>
        </Card>
      </div>

      {/* Allocated Units */}
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Home className="h-5 w-5" /> Allocated Units — Entitlement</CardTitle></CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Unit Code</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Size (SFT)</TableHead>
                <TableHead>Floor</TableHead>
                <TableHead>Block</TableHead>
                <TableHead className="text-right">Est. Value</TableHead>
                <TableHead className="text-center">Construction %</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entitlements.units.map((u) => (
                <TableRow key={u.code}>
                  <TableCell className="font-mono font-medium">{u.code}</TableCell>
                  <TableCell>{u.type}</TableCell>
                  <TableCell className="text-right font-mono">{formatNumber(u.size)}</TableCell>
                  <TableCell>{u.floor}</TableCell>
                  <TableCell>{u.block}</TableCell>
                  <TableCell className="text-right font-mono">{formatBDT(u.estimatedValue)}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center gap-2 justify-center">
                      <Progress value={u.constructionProgress} className="h-2 w-16" />
                      <span className="text-xs font-mono">{u.constructionProgress}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center"><Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700">{u.status}</Badge></TableCell>
                </TableRow>
              ))}
              <TableRow className="border-t-2 bg-muted/30 font-semibold">
                <TableCell colSpan={2}>Total (6 Units)</TableCell>
                <TableCell className="text-right font-mono">{formatNumber(entitlements.units.reduce((s, u) => s + u.size, 0))}</TableCell>
                <TableCell colSpan={2} />
                <TableCell className="text-right font-mono">{formatBDT(totalUnitValue)}</TableCell>
                <TableCell colSpan={2} />
              </TableRow>
            </TableBody>
          </Table>
          <Separator className="my-4" />
          <h4 className="font-medium mb-2">Parking Allocation</h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Parking Code</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Est. Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entitlements.parking.map((p) => (
                <TableRow key={p.code}>
                  <TableCell className="font-mono font-medium">{p.code}</TableCell>
                  <TableCell>{p.type}</TableCell>
                  <TableCell>{p.location}</TableCell>
                  <TableCell className="text-right font-mono">{formatBDT(p.estimatedValue)}</TableCell>
                </TableRow>
              ))}
              <TableRow className="border-t bg-muted/30 font-semibold">
                <TableCell colSpan={3}>Total (4 Parking)</TableCell>
                <TableCell className="text-right font-mono">{formatBDT(totalParkingValue)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Cash Payments */}
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><CreditCard className="h-5 w-5" /> Cash Component — Payment Schedule</CardTitle></CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Reference</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cashPayments.map((p, i) => (
                <TableRow key={i}>
                  <TableCell className="font-mono text-sm">{p.date}</TableCell>
                  <TableCell>{p.description}</TableCell>
                  <TableCell className="text-right font-mono">{formatBDT(p.amount)}</TableCell>
                  <TableCell className="text-center">
                    {p.status === "PAID" ? (
                      <Badge className="bg-green-100 text-green-800"><CheckCircle2 className="h-3 w-3 mr-1" />Paid</Badge>
                    ) : (
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700"><Clock className="h-3 w-3 mr-1" />Upcoming</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-sm">{p.method}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{p.ref}</TableCell>
                </TableRow>
              ))}
              <TableRow className="border-t-2 bg-muted/30 font-semibold">
                <TableCell colSpan={2}>Total Cash Component</TableCell>
                <TableCell className="text-right font-mono">{formatBDT(totalCashComponent)}</TableCell>
                <TableCell className="text-center"><span className="text-sm">Paid: {formatBDT(paidCash)}</span></TableCell>
                <TableCell colSpan={2}><span className="text-sm text-orange-600">Outstanding: {formatBDT(pendingCash)}</span></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Handover Timeline */}
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><CalendarCheck className="h-5 w-5" /> Expected Handover Timeline</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {handoverTimeline.map((h) => (
              <div key={h.unit} className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="font-mono font-medium w-16">{h.unit}</div>
                <div className="flex-1">
                  <Progress value={entitlements.units.find((u) => u.code === h.unit)?.constructionProgress ?? 0} className="h-2" />
                </div>
                <div className="text-sm font-mono w-28 text-right">{h.expectedDate}</div>
                <Badge variant="outline" className={h.status === "On Track" ? "bg-green-50 text-green-700" : "bg-orange-50 text-orange-700"}>
                  {h.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Grand Total */}
      <Card className="border-teal-200 bg-teal-50/30">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground">Total Entitlement</p>
              <p className="text-2xl font-bold text-teal-800">{formatBDT(grandTotal)}</p>
              <p className="text-xs text-muted-foreground mt-1">6 Units ({formatBDT(totalUnitValue)}) + 4 Parking ({formatBDT(totalParkingValue)}) + Cash ({formatBDT(totalCashComponent)})</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Delivered / Paid</p>
              <p className="text-2xl font-bold text-green-700">{formatBDT(paidCash)}</p>
              <p className="text-xs text-muted-foreground mt-1">Cash payments made to date</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Outstanding (Cash + Units)</p>
              <p className="text-2xl font-bold text-orange-700">{formatBDT(grandTotal - paidCash)}</p>
              <p className="text-xs text-muted-foreground mt-1">Units to be handed over + remaining cash</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
