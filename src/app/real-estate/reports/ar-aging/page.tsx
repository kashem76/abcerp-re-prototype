"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatBDT, formatNumber } from "@/lib/mock-data";
import { Clock, AlertTriangle, Users, DollarSign } from "lucide-react";

const arData = [
  {
    customer: "Md. Rafiqul Islam",
    unit: "A-302",
    project: "Nasirabad Heights",
    agreementValue: 5_865_300,
    totalBilled: 3_500_000,
    totalReceived: 2_800_000,
    outstanding: 700_000,
    current: 350_000,
    days31_60: 200_000,
    days61_90: 150_000,
    days90plus: 0,
  },
  {
    customer: "Fatema Begum",
    unit: "A-501",
    project: "Nasirabad Heights",
    agreementValue: 7_200_000,
    totalBilled: 5_040_000,
    totalReceived: 4_200_000,
    outstanding: 840_000,
    current: 0,
    days31_60: 0,
    days61_90: 340_000,
    days90plus: 500_000,
  },
  {
    customer: "Eng. Zahirul Haque",
    unit: "B-204",
    project: "Nasirabad Heights",
    agreementValue: 6_500_000,
    totalBilled: 4_550_000,
    totalReceived: 4_550_000,
    outstanding: 0,
    current: 0,
    days31_60: 0,
    days61_90: 0,
    days90plus: 0,
  },
  {
    customer: "Dr. Nasreen Akhtar",
    unit: "A-701",
    project: "Nasirabad Heights",
    agreementValue: 8_400_000,
    totalBilled: 5_880_000,
    totalReceived: 4_500_000,
    outstanding: 1_380_000,
    current: 580_000,
    days31_60: 400_000,
    days61_90: 400_000,
    days90plus: 0,
  },
  {
    customer: "Mohammad Karim",
    unit: "C-102",
    project: "Bay View Residence",
    agreementValue: 4_800_000,
    totalBilled: 3_360_000,
    totalReceived: 2_400_000,
    outstanding: 960_000,
    current: 0,
    days31_60: 0,
    days61_90: 0,
    days90plus: 960_000,
  },
  {
    customer: "Selina Rahman",
    unit: "B-601",
    project: "Nasirabad Heights",
    agreementValue: 7_800_000,
    totalBilled: 4_680_000,
    totalReceived: 4_100_000,
    outstanding: 580_000,
    current: 580_000,
    days31_60: 0,
    days61_90: 0,
    days90plus: 0,
  },
  {
    customer: "Anwar Hossain",
    unit: "A-803",
    project: "Nasirabad Heights",
    agreementValue: 9_200_000,
    totalBilled: 6_440_000,
    totalReceived: 5_200_000,
    outstanding: 1_240_000,
    current: 440_000,
    days31_60: 500_000,
    days61_90: 300_000,
    days90plus: 0,
  },
  {
    customer: "Taslima Sultana",
    unit: "C-301",
    project: "Bay View Residence",
    agreementValue: 5_100_000,
    totalBilled: 3_570_000,
    totalReceived: 3_570_000,
    outstanding: 0,
    current: 0,
    days31_60: 0,
    days61_90: 0,
    days90plus: 0,
  },
  {
    customer: "Abdul Mannan",
    unit: "B-402",
    project: "Nasirabad Heights",
    agreementValue: 6_900_000,
    totalBilled: 4_830_000,
    totalReceived: 3_800_000,
    outstanding: 1_030_000,
    current: 0,
    days31_60: 230_000,
    days61_90: 0,
    days90plus: 800_000,
  },
  {
    customer: "Shirin Akter",
    unit: "A-1001",
    project: "Nasirabad Heights",
    agreementValue: 10_500_000,
    totalBilled: 7_350_000,
    totalReceived: 6_500_000,
    outstanding: 850_000,
    current: 250_000,
    days31_60: 350_000,
    days61_90: 250_000,
    days90plus: 0,
  },
];

const totals = arData.reduce(
  (acc, row) => ({
    agreementValue: acc.agreementValue + row.agreementValue,
    totalBilled: acc.totalBilled + row.totalBilled,
    totalReceived: acc.totalReceived + row.totalReceived,
    outstanding: acc.outstanding + row.outstanding,
    current: acc.current + row.current,
    days31_60: acc.days31_60 + row.days31_60,
    days61_90: acc.days61_90 + row.days61_90,
    days90plus: acc.days90plus + row.days90plus,
  }),
  { agreementValue: 0, totalBilled: 0, totalReceived: 0, outstanding: 0, current: 0, days31_60: 0, days61_90: 0, days90plus: 0 }
);

const summaryCards = [
  { label: "Total Outstanding", value: totals.outstanding, color: "text-red-600", bg: "bg-red-50", icon: DollarSign },
  { label: "Current (0-30 days)", value: totals.current, color: "text-emerald-600", bg: "bg-emerald-50", icon: Clock },
  { label: "31-60 Days", value: totals.days31_60, color: "text-yellow-600", bg: "bg-yellow-50", icon: Clock },
  { label: "61-90 Days", value: totals.days61_90, color: "text-orange-600", bg: "bg-orange-50", icon: AlertTriangle },
  { label: "> 90 Days", value: totals.days90plus, color: "text-red-700", bg: "bg-red-50", icon: AlertTriangle },
];

export default function ARAgingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Users className="h-6 w-6 text-gray-400" />
          Accounts Receivable Aging Report
        </h1>
        <p className="text-gray-500">
          Outstanding balances by customer and aging bucket — as of 12 Aug 2026
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {summaryCards.map((card) => (
          <Card key={card.label} className={card.bg}>
            <CardContent className="pt-4 pb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">{card.label}</span>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
              <p className={`text-lg font-bold ${card.color}`}>{formatBDT(card.value)}</p>
              {card.label === "Total Outstanding" && (
                <p className="text-xs text-gray-400 mt-1">
                  {arData.filter((r) => r.outstanding > 0).length} of {arData.length} customers
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AR Table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Customer-wise Aging Detail</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[160px]">Customer</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead className="text-right">Agreement Value</TableHead>
                  <TableHead className="text-right">Total Billed</TableHead>
                  <TableHead className="text-right">Total Received</TableHead>
                  <TableHead className="text-right">Outstanding</TableHead>
                  <TableHead className="text-right">Current (0-30)</TableHead>
                  <TableHead className="text-right">31-60 Days</TableHead>
                  <TableHead className="text-right">61-90 Days</TableHead>
                  <TableHead className="text-right">&gt;90 Days</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {arData.map((row, i) => (
                  <TableRow key={i} className={row.outstanding === 0 ? "text-gray-400" : ""}>
                    <TableCell className="font-medium">{row.customer}</TableCell>
                    <TableCell>
                      <span className="font-mono text-sm">{row.unit}</span>
                      <span className="text-xs text-gray-400 block">{row.project}</span>
                    </TableCell>
                    <TableCell className="text-right">{formatBDT(row.agreementValue)}</TableCell>
                    <TableCell className="text-right">{formatBDT(row.totalBilled)}</TableCell>
                    <TableCell className="text-right">{formatBDT(row.totalReceived)}</TableCell>
                    <TableCell className={`text-right font-semibold ${row.outstanding > 0 ? "text-red-600" : "text-emerald-600"}`}>
                      {row.outstanding > 0 ? formatBDT(row.outstanding) : "Nil"}
                    </TableCell>
                    <TableCell className="text-right">
                      {row.current > 0 ? formatBDT(row.current) : "—"}
                    </TableCell>
                    <TableCell className={`text-right ${row.days31_60 > 0 ? "text-yellow-600" : ""}`}>
                      {row.days31_60 > 0 ? formatBDT(row.days31_60) : "—"}
                    </TableCell>
                    <TableCell className={`text-right ${row.days61_90 > 0 ? "text-orange-600 font-medium" : ""}`}>
                      {row.days61_90 > 0 ? formatBDT(row.days61_90) : "—"}
                    </TableCell>
                    <TableCell className={`text-right ${row.days90plus > 0 ? "text-red-700 font-bold" : ""}`}>
                      {row.days90plus > 0 ? formatBDT(row.days90plus) : "—"}
                    </TableCell>
                  </TableRow>
                ))}

                {/* Totals Row */}
                <TableRow className="font-bold border-t-2 bg-gray-50">
                  <TableCell>TOTAL ({arData.length} customers)</TableCell>
                  <TableCell></TableCell>
                  <TableCell className="text-right">{formatBDT(totals.agreementValue)}</TableCell>
                  <TableCell className="text-right">{formatBDT(totals.totalBilled)}</TableCell>
                  <TableCell className="text-right">{formatBDT(totals.totalReceived)}</TableCell>
                  <TableCell className="text-right text-red-600">{formatBDT(totals.outstanding)}</TableCell>
                  <TableCell className="text-right">{formatBDT(totals.current)}</TableCell>
                  <TableCell className="text-right text-yellow-600">{formatBDT(totals.days31_60)}</TableCell>
                  <TableCell className="text-right text-orange-600">{formatBDT(totals.days61_90)}</TableCell>
                  <TableCell className="text-right text-red-700">{formatBDT(totals.days90plus)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Collection Efficiency */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-4 text-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-gray-500">Collection Ratio</p>
              <p className="text-xl font-bold text-blue-700">
                {((totals.totalReceived / totals.totalBilled) * 100).toFixed(1)}%
              </p>
            </div>
            <div>
              <p className="text-gray-500">Overdue (&gt;30 days)</p>
              <p className="text-xl font-bold text-red-600">
                {formatBDT(totals.days31_60 + totals.days61_90 + totals.days90plus)}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Overdue as % of Outstanding</p>
              <p className="text-xl font-bold text-orange-600">
                {totals.outstanding > 0
                  ? (((totals.days31_60 + totals.days61_90 + totals.days90plus) / totals.outstanding) * 100).toFixed(1)
                  : 0}%
              </p>
            </div>
            <div>
              <p className="text-gray-500">Avg Days Outstanding</p>
              <p className="text-xl font-bold text-gray-700">42 days</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
