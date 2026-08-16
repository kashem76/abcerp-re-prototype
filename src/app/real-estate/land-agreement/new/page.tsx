"use client";

import Link from "next/link";
import {
  ArrowLeft,
  FileSignature,
  User,
  MapPin,
  Banknote,
  Calendar,
  Handshake,
  Building2,
  Save,
  Plus,
  Trash2,
  Info,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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

const paymentSchedule = [
  { installment: 1, date: "2026-09-01", amount: 10000000, mode: "Bank Transfer", note: "Signing advance" },
  { installment: 2, date: "2026-10-15", amount: 10000000, mode: "Cheque", note: "After mutation" },
  { installment: 3, date: "2026-11-30", amount: 10000000, mode: "Bank Transfer", note: "Before registration" },
  { installment: 4, date: "2026-12-15", amount: 14000000, mode: "Bank Transfer", note: "At registration" },
];

const jvUnits = [
  { type: "3 Bed (A-Type)", total: 24, landowner: 10, developer: 14 },
  { type: "2 Bed (B-Type)", total: 18, landowner: 7, developer: 11 },
  { type: "Commercial", total: 6, landowner: 2, developer: 4 },
];

export default function LandAgreementNewPage() {
  const totalPayment = paymentSchedule.reduce((s, p) => s + p.amount, 0);
  const totalJvUnits = jvUnits.reduce((s, u) => s + u.total, 0);
  const totalLandownerUnits = jvUnits.reduce((s, u) => s + u.landowner, 0);
  const totalDevUnits = jvUnits.reduce((s, u) => s + u.developer, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/real-estate/land-agreement"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-3"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Agreements
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <FileSignature className="h-6 w-6 text-amber-600" />
              New Land Agreement
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              OPP-2026-018 &middot; Bayazid Bostami Residential Project
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Save Draft</Button>
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Create Agreement
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      {/* Agreement Type Toggle */}
      <Tabs defaultValue="purchase" className="space-y-6">
        <TabsList className="grid grid-cols-2 w-[400px]">
          <TabsTrigger value="purchase" className="gap-2">
            <Banknote className="h-4 w-4" />
            Purchase
          </TabsTrigger>
          <TabsTrigger value="jv" className="gap-2">
            <Handshake className="h-4 w-4" />
            Joint Venture (JV)
          </TabsTrigger>
        </TabsList>

        {/* PURCHASE MODE */}
        <TabsContent value="purchase" className="space-y-6">
          {/* Seller Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                Seller Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Seller Name</label>
                  <Input defaultValue="Md. Abdul Karim" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">NID Number</label>
                  <Input defaultValue="1991234567890" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Contact Number</label>
                  <Input defaultValue="+880 1812-345678" />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <label className="text-sm font-medium">Address</label>
                <Input defaultValue="House 12, Road 5, Bayazid Bostami, Chattogram" />
              </div>
            </CardContent>
          </Card>

          {/* Land Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                Land Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Mouza</label>
                  <Input defaultValue="Bayazid Bostami" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Dag No.</label>
                  <Input defaultValue="342, 343" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Khatian No.</label>
                  <Input defaultValue="RS-1245" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Area (Katha)</label>
                  <Input type="number" defaultValue="22" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Purchase Price & Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Banknote className="h-4 w-4 text-muted-foreground" />
                Purchase Price &amp; Payment Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Total Purchase Price</label>
                  <Input type="text" defaultValue="44,000,000" />
                  <p className="text-xs text-muted-foreground">@ BDT 20 lakh/katha × 22</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium">Payment Schedule</h4>
                <Button variant="outline" size="sm" className="gap-1">
                  <Plus className="h-3 w-3" />
                  Add Installment
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[60px]">#</TableHead>
                    <TableHead className="w-[140px]">Date</TableHead>
                    <TableHead className="text-right w-[160px]">Amount (BDT)</TableHead>
                    <TableHead className="w-[150px]">Mode</TableHead>
                    <TableHead>Note</TableHead>
                    <TableHead className="w-[50px]" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentSchedule.map((p) => (
                    <TableRow key={p.installment}>
                      <TableCell className="font-medium">{p.installment}</TableCell>
                      <TableCell>
                        <Input type="date" defaultValue={p.date} className="h-8 text-xs" />
                      </TableCell>
                      <TableCell className="text-right">
                        <Input type="text" defaultValue={p.amount.toLocaleString()} className="h-8 text-sm text-right" />
                      </TableCell>
                      <TableCell>
                        <Select defaultValue={p.mode}>
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {["Cash", "Cheque", "Bank Transfer"].map((m) => (
                              <SelectItem key={m} value={m} className="text-xs">{m}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{p.note}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-muted-foreground hover:text-red-600">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-muted/30 font-semibold">
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell className="text-right">{formatBDT(totalPayment)}</TableCell>
                    <TableCell colSpan={3} />
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Registration Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                Registration Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sub-Registrar Office</label>
                  <Input defaultValue="Sub-Registrar Office, Chattogram-4 (Bayazid)" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Estimated Registration Date</label>
                  <Input type="date" defaultValue="2026-12-15" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Registration Cost (Est.)</label>
                  <Input type="text" defaultValue="1,320,000" />
                  <p className="text-xs text-muted-foreground">~3% of deed value</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Stamp Duty (Est.)</label>
                  <Input type="text" defaultValue="660,000" />
                  <p className="text-xs text-muted-foreground">~1.5% of deed value</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* GL Impact */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800 flex items-start gap-2">
            <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <div>
              <strong>GL Impact:</strong> Each payment will debit <code className="text-xs bg-blue-100 px-1 rounded">Land Advance (1310)</code> and credit <code className="text-xs bg-blue-100 px-1 rounded">Bank/Cash</code>.
              On registration, the total transfers from Land Advance to <code className="text-xs bg-blue-100 px-1 rounded">Land Asset (1510)</code>.
              Registration cost and stamp duty are capitalized into the land cost.
            </div>
          </div>
        </TabsContent>

        {/* JV MODE */}
        <TabsContent value="jv" className="space-y-6">
          {/* Landowner Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                Landowner Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Landowner Name</label>
                  <Input defaultValue="Md. Abdul Karim" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">NID Number</label>
                  <Input defaultValue="1991234567890" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Contact</label>
                  <Input defaultValue="+880 1812-345678" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Land Contribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Land Contribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Land Area (Katha)</label>
                  <Input type="number" defaultValue="22" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Estimated Land Value</label>
                  <Input type="text" defaultValue="44,000,000" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Developer Contribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                Developer Contribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <label className="text-sm font-medium">Construction Cost Estimate</label>
                <Input type="text" defaultValue="285,600,000" />
                <p className="text-xs text-muted-foreground">Developer bears all construction, approval, and marketing costs</p>
              </div>
            </CardContent>
          </Card>

          {/* Share Split */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Handshake className="h-4 w-4 text-muted-foreground" />
                Share Split
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Landowner Share (%)</label>
                  <Input type="number" defaultValue="40" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Developer Share (%)</label>
                  <Input type="number" defaultValue="60" />
                </div>
              </div>

              <Separator />

              <h4 className="text-sm font-medium">Entitlement Summary</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Unit Type</TableHead>
                    <TableHead className="text-center">Total Units</TableHead>
                    <TableHead className="text-center">Landowner (40%)</TableHead>
                    <TableHead className="text-center">Developer (60%)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jvUnits.map((u) => (
                    <TableRow key={u.type}>
                      <TableCell>{u.type}</TableCell>
                      <TableCell className="text-center">{u.total}</TableCell>
                      <TableCell className="text-center font-medium text-amber-700">{u.landowner}</TableCell>
                      <TableCell className="text-center font-medium text-blue-700">{u.developer}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-muted/30 font-semibold">
                    <TableCell>Total</TableCell>
                    <TableCell className="text-center">{totalJvUnits}</TableCell>
                    <TableCell className="text-center text-amber-700">{totalLandownerUnits}</TableCell>
                    <TableCell className="text-center text-blue-700">{totalDevUnits}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* GL Impact */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800 flex items-start gap-2">
            <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <div>
              <strong>GL Impact (JV):</strong> Land is not purchased — no asset entry. Instead, landowner&apos;s share is tracked as a
              contingent obligation. Construction costs debit <code className="text-xs bg-blue-100 px-1 rounded">WIP (1410)</code>.
              Landowner units are excluded from developer&apos;s revenue recognition. Revenue is recognized only on developer&apos;s entitled units.
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
