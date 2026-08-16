"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { formatBDT, formatNumber } from "@/lib/mock-data";
import {
  ClipboardList, Building2, User, Calculator, CalendarDays, CheckCircle2,
  ChevronRight, BookOpen,
} from "lucide-react";

const selectedUnit = {
  project: "ABC Nasirabad Heights",
  projectId: "RE-00027",
  tower: "Tower A",
  unit: "A-302",
  floor: 3,
  type: "2BR",
  area: 1050,
  facing: "South",
  status: "AVAILABLE",
  baseRate: 5500,
  basePrice: 5_775_000,
  floorPremium: 52_500,
  facingPremium: 157_500,
  totalPrice: 5_985_000,
};

const customerInfo = {
  name: "Md. Rafiqul Islam",
  nid: "1991 7234 5678 0001",
  phone: "+880-1711-234567",
  email: "rafiqul.islam@email.com",
  address: "42/B, Agrabad R/A, Chattogram-4100",
  nomineeName: "Fatema Akhtar",
  nomineeRelation: "Spouse",
  nomineeNid: "1995 8123 4567 0002",
  nomineePhone: "+880-1811-345678",
};

const priceBreakdown = {
  basePrice: 5_775_000,
  floorPremium: 52_500,
  facingPremium: 157_500,
  grossPrice: 5_985_000,
  discountPercent: 2,
  discountAmount: 119_700,
  finalPrice: 5_865_300,
};

const paymentPlan = {
  bookingMoney: 500_000,
  downPayment: 1_000_000,
  totalInstallments: 4_365_300,
  installmentType: "MILESTONE",
  installments: [
    { milestone: "Foundation Complete", percent: 20, amount: 873_060, dueDate: "2026-10-15" },
    { milestone: "2nd Floor Casting", percent: 20, amount: 873_060, dueDate: "2027-01-15" },
    { milestone: "Brick Work Complete", percent: 25, amount: 1_091_325, dueDate: "2027-06-15" },
    { milestone: "Finishing & Handover", percent: 35, amount: 1_528_855, dueDate: "2027-11-15" },
  ],
};

const glPreview = [
  { account: "1010 — Cash / Bank (Asset)", debit: 500_000, credit: 0 },
  { account: "2310 — Booking Advance (Liability)", debit: 0, credit: 500_000 },
];

const steps = [
  { id: "unit", label: "Select Unit", icon: Building2 },
  { id: "customer", label: "Customer", icon: User },
  { id: "price", label: "Price", icon: Calculator },
  { id: "payment", label: "Payment Plan", icon: CalendarDays },
  { id: "review", label: "Review", icon: CheckCircle2 },
];

export default function BookingNewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <ClipboardList className="h-6 w-6 text-gray-400" />
          New Unit Booking
        </h1>
        <p className="text-gray-500">
          Complete all steps to create a new booking for ABC Nasirabad Heights
        </p>
      </div>

      <Tabs defaultValue="unit" className="space-y-6">
        {/* Step Indicators */}
        <TabsList className="grid grid-cols-5 h-auto p-1">
          {steps.map((step, i) => (
            <TabsTrigger
              key={step.id}
              value={step.id}
              className="flex items-center gap-1.5 py-2 text-xs sm:text-sm data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              <span className="hidden sm:flex items-center justify-center w-5 h-5 rounded-full bg-gray-200 text-xs font-bold data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                {i + 1}
              </span>
              <step.icon className="h-4 w-4 sm:hidden" />
              <span className="hidden md:inline">{step.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Step 1: Select Unit */}
        <TabsContent value="unit">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Step 1: Select Project & Unit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Project</label>
                  <Select defaultValue="RE-00027">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="RE-00027">ABC Nasirabad Heights</SelectItem>
                      <SelectItem value="RE-00031">Bay View Residence</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Tower / Block</label>
                  <Select defaultValue="A">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">Tower A</SelectItem>
                      <SelectItem value="B">Tower B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Selected Unit</h3>
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Unit No</p>
                        <p className="font-bold text-lg">{selectedUnit.unit}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Type</p>
                        <p className="font-semibold">{selectedUnit.type} — {formatNumber(selectedUnit.area)} SFT</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Floor / Facing</p>
                        <p className="font-semibold">Floor {selectedUnit.floor} / {selectedUnit.facing}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Status</p>
                        <Badge className="bg-emerald-100 text-emerald-800">{selectedUnit.status}</Badge>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Base Rate</p>
                        <p className="font-semibold">{formatBDT(selectedUnit.baseRate)} / SFT</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Base Price</p>
                        <p className="font-semibold">{formatBDT(selectedUnit.basePrice)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Premiums</p>
                        <p className="font-semibold">{formatBDT(selectedUnit.floorPremium + selectedUnit.facingPremium)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Total Price</p>
                        <p className="font-bold text-blue-700 text-lg">{formatBDT(selectedUnit.totalPrice)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-end">
                <Button className="gap-1">Next: Customer Details <ChevronRight className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Step 2: Customer Details */}
        <TabsContent value="customer">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Step 2: Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Full Name *</label>
                  <Input defaultValue={customerInfo.name} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">NID Number *</label>
                  <Input defaultValue={customerInfo.nid} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Mobile Number *</label>
                  <Input defaultValue={customerInfo.phone} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <Input defaultValue={customerInfo.email} />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium text-gray-700">Mailing Address *</label>
                  <Textarea defaultValue={customerInfo.address} rows={2} />
                </div>
              </div>

              <Separator />

              <h3 className="text-sm font-semibold text-gray-700">Nominee Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Nominee Name</label>
                  <Input defaultValue={customerInfo.nomineeName} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Relationship</label>
                  <Select defaultValue="spouse">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spouse">Spouse</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="child">Son/Daughter</SelectItem>
                      <SelectItem value="sibling">Sibling</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Nominee NID</label>
                  <Input defaultValue={customerInfo.nomineeNid} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Nominee Phone</label>
                  <Input defaultValue={customerInfo.nomineePhone} />
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline">Back</Button>
                <Button className="gap-1">Next: Price & Discount <ChevronRight className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Step 3: Price & Discount */}
        <TabsContent value="price">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Step 3: Price & Discount</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Component</TableHead>
                    <TableHead className="text-right">Amount (BDT)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Base Price ({formatNumber(selectedUnit.area)} SFT x {formatBDT(selectedUnit.baseRate)})</TableCell>
                    <TableCell className="text-right">{formatBDT(priceBreakdown.basePrice)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Floor Premium (Floor {selectedUnit.floor})</TableCell>
                    <TableCell className="text-right">{formatBDT(priceBreakdown.floorPremium)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Facing Premium ({selectedUnit.facing})</TableCell>
                    <TableCell className="text-right">{formatBDT(priceBreakdown.facingPremium)}</TableCell>
                  </TableRow>
                  <TableRow className="font-semibold">
                    <TableCell>Gross Price</TableCell>
                    <TableCell className="text-right">{formatBDT(priceBreakdown.grossPrice)}</TableCell>
                  </TableRow>
                  <TableRow className="text-red-600">
                    <TableCell>Less: Discount ({priceBreakdown.discountPercent}%)</TableCell>
                    <TableCell className="text-right">({formatBDT(priceBreakdown.discountAmount)})</TableCell>
                  </TableRow>
                  <TableRow className="font-bold text-lg">
                    <TableCell>Final Agreement Price</TableCell>
                    <TableCell className="text-right text-blue-700">{formatBDT(priceBreakdown.finalPrice)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Discount Type</label>
                  <Select defaultValue="percent">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percent">Percentage</SelectItem>
                      <SelectItem value="flat">Flat Amount</SelectItem>
                      <SelectItem value="none">No Discount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Discount Value</label>
                  <Input type="number" defaultValue="2" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium text-gray-700">Discount Reason</label>
                  <Input defaultValue="Early bird booking — pre-launch offer" />
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline">Back</Button>
                <Button className="gap-1">Next: Payment Plan <ChevronRight className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Step 4: Payment Plan */}
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Step 4: Payment Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Booking Money *</label>
                  <Input type="number" defaultValue="500000" />
                  <p className="text-xs text-gray-400">{formatBDT(paymentPlan.bookingMoney)}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Down Payment *</label>
                  <Input type="number" defaultValue="1000000" />
                  <p className="text-xs text-gray-400">{formatBDT(paymentPlan.downPayment)}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Installment Type</label>
                  <Select defaultValue="milestone">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="milestone">Milestone-Based</SelectItem>
                      <SelectItem value="time">Time-Based (Monthly)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Installment Schedule — Balance: {formatBDT(paymentPlan.totalInstallments)}
                </h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>Milestone</TableHead>
                      <TableHead className="text-right">%</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Due Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentPlan.installments.map((inst, i) => (
                      <TableRow key={i}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>{inst.milestone}</TableCell>
                        <TableCell className="text-right">{inst.percent}%</TableCell>
                        <TableCell className="text-right">{formatBDT(inst.amount)}</TableCell>
                        <TableCell>{inst.dueDate}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="font-bold">
                      <TableCell></TableCell>
                      <TableCell>Total Installments</TableCell>
                      <TableCell className="text-right">100%</TableCell>
                      <TableCell className="text-right">{formatBDT(paymentPlan.totalInstallments)}</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <Card className="bg-gray-50">
                <CardContent className="pt-4">
                  <h4 className="text-sm font-semibold mb-2">Payment Summary</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div>
                      <p className="text-gray-500">Agreement Value</p>
                      <p className="font-bold">{formatBDT(priceBreakdown.finalPrice)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Booking Money</p>
                      <p className="font-bold">{formatBDT(paymentPlan.bookingMoney)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Down Payment</p>
                      <p className="font-bold">{formatBDT(paymentPlan.downPayment)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Balance in Installments</p>
                      <p className="font-bold">{formatBDT(paymentPlan.totalInstallments)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline">Back</Button>
                <Button className="gap-1">Next: Review & Confirm <ChevronRight className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Step 5: Review & Confirm */}
        <TabsContent value="review">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Step 5: Review & Confirm</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Unit Summary */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Unit Details</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div><span className="text-gray-500">Project:</span> <span className="font-medium">{selectedUnit.project}</span></div>
                    <div><span className="text-gray-500">Unit:</span> <span className="font-medium">{selectedUnit.unit}</span></div>
                    <div><span className="text-gray-500">Type:</span> <span className="font-medium">{selectedUnit.type}, {formatNumber(selectedUnit.area)} SFT</span></div>
                    <div><span className="text-gray-500">Floor/Facing:</span> <span className="font-medium">{selectedUnit.floor} / {selectedUnit.facing}</span></div>
                  </div>
                </div>

                <Separator />

                {/* Customer Summary */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Customer</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div><span className="text-gray-500">Name:</span> <span className="font-medium">{customerInfo.name}</span></div>
                    <div><span className="text-gray-500">NID:</span> <span className="font-medium">{customerInfo.nid}</span></div>
                    <div><span className="text-gray-500">Phone:</span> <span className="font-medium">{customerInfo.phone}</span></div>
                    <div><span className="text-gray-500">Nominee:</span> <span className="font-medium">{customerInfo.nomineeName} ({customerInfo.nomineeRelation})</span></div>
                  </div>
                </div>

                <Separator />

                {/* Price Summary */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Pricing</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div><span className="text-gray-500">Gross:</span> <span className="font-medium">{formatBDT(priceBreakdown.grossPrice)}</span></div>
                    <div><span className="text-gray-500">Discount:</span> <span className="font-medium text-red-600">({formatBDT(priceBreakdown.discountAmount)})</span></div>
                    <div><span className="text-gray-500">Final Price:</span> <span className="font-bold text-blue-700">{formatBDT(priceBreakdown.finalPrice)}</span></div>
                    <div><span className="text-gray-500">Installments:</span> <span className="font-medium">{paymentPlan.installments.length} (Milestone)</span></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* GL Preview */}
            <Card className="border-amber-200 bg-amber-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  GL Journal Preview — On Booking Confirmation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Account</TableHead>
                      <TableHead className="text-right">Debit (BDT)</TableHead>
                      <TableHead className="text-right">Credit (BDT)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {glPreview.map((row, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-mono text-sm">{row.account}</TableCell>
                        <TableCell className="text-right">{row.debit ? formatBDT(row.debit) : "—"}</TableCell>
                        <TableCell className="text-right">{row.credit ? formatBDT(row.credit) : "—"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <p className="text-xs text-amber-700 mt-2">
                  Booking Advance is recorded as a Liability (CR) until revenue recognition criteria are met.
                </p>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline">Back to Payment Plan</Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Confirm Booking
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
