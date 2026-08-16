"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Handshake,
  AlertTriangle,
  CheckCircle2,
  Building2,
  Car,
  Save,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

type UnitAllocation = {
  unit: string;
  type: string;
  floor: number;
  size: number;
  allocatedTo: "Landowner" | "Developer";
  estimatedValue: number;
};

const floors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const unitsPerFloor = ["01", "02", "03", "04"];
const unitTypes: Record<string, string> = {
  "01": "3 Bed (A)",
  "02": "3 Bed (A)",
  "03": "2 Bed (B)",
  "04": "2 Bed (B)",
};
const unitSizes: Record<string, number> = {
  "01": 1450,
  "02": 1450,
  "03": 1100,
  "04": 1100,
};
const unitRates: Record<string, number> = {
  "01": 7500,
  "02": 7500,
  "03": 7000,
  "04": 7000,
};

// Generate ground floor commercial
const commercialUnits: UnitAllocation[] = [
  { unit: "G-01", type: "Commercial", floor: 0, size: 650, allocatedTo: "Developer", estimatedValue: 650 * 12000 },
  { unit: "G-02", type: "Commercial", floor: 0, size: 650, allocatedTo: "Developer", estimatedValue: 650 * 12000 },
  { unit: "G-03", type: "Commercial", floor: 0, size: 650, allocatedTo: "Landowner", estimatedValue: 650 * 12000 },
  { unit: "G-04", type: "Commercial", floor: 0, size: 650, allocatedTo: "Developer", estimatedValue: 650 * 12000 },
  { unit: "G-05", type: "Commercial", floor: 0, size: 650, allocatedTo: "Landowner", estimatedValue: 650 * 12000 },
  { unit: "G-06", type: "Commercial", floor: 0, size: 650, allocatedTo: "Developer", estimatedValue: 650 * 12000 },
];

// Generate residential units — 40 units, landowner gets floors 2,4,7,9 (positions 01,03) + some others
const landownerFloors = new Set([2, 4, 7, 9]);
const residentialUnits: UnitAllocation[] = floors.flatMap((floor) =>
  unitsPerFloor.map((pos) => {
    const unit = `A-${floor}${pos}`;
    const type = unitTypes[pos];
    const size = unitSizes[pos];
    const rate = unitRates[pos];
    // Landowner gets position 01 & 03 on floors 2,4,7,9 = 8 units, plus position 01 on floor 1 & 6 = 2 more = 10 total
    const isLandowner =
      (landownerFloors.has(floor) && (pos === "01" || pos === "03")) ||
      ((floor === 1 || floor === 6) && pos === "01") ||
      ((floor === 3 || floor === 5) && pos === "03") ||
      (floor === 8 && pos === "04") ||
      (floor === 10 && pos === "02");
    return {
      unit,
      type,
      floor,
      size,
      allocatedTo: isLandowner ? ("Landowner" as const) : ("Developer" as const),
      estimatedValue: size * rate,
    };
  })
);

const allUnits = [...commercialUnits, ...residentialUnits];

const landownerUnits = allUnits.filter((u) => u.allocatedTo === "Landowner");
const developerUnits = allUnits.filter((u) => u.allocatedTo === "Developer");
const landownerValue = landownerUnits.reduce((s, u) => s + u.estimatedValue, 0);
const developerValue = developerUnits.reduce((s, u) => s + u.estimatedValue, 0);
const totalValue = landownerValue + developerValue;
const landownerPct = ((landownerUnits.length / allUnits.length) * 100).toFixed(1);
const developerPct = ((developerUnits.length / allUnits.length) * 100).toFixed(1);
const agreedLandownerPct = 40;
const agreedDeveloperPct = 60;
const isBalanced = Math.abs(parseFloat(landownerPct) - agreedLandownerPct) <= 2;

// Parking
const parkingSpots = Array.from({ length: 36 }, (_, i) => ({
  id: `P-${String(i + 1).padStart(2, "0")}`,
  type: i < 12 ? "Covered" : "Open",
  allocatedTo: (i < 5 || (i >= 12 && i < 17) ? "Landowner" : "Developer") as "Landowner" | "Developer",
  value: i < 12 ? 800000 : 500000,
}));
const landownerParking = parkingSpots.filter((p) => p.allocatedTo === "Landowner");
const developerParking = parkingSpots.filter((p) => p.allocatedTo === "Developer");

export default function JVEntitlementBuilderPage() {
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
              <Handshake className="h-6 w-6 text-amber-600" />
              JV Entitlement Builder
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              AGR-2026-007 &middot; Bayazid Bostami JV with Md. Abdul Karim
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Reset to Default</Button>
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Save Allocation
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      {/* JV Summary */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Landowner</p>
              <p className="font-semibold">Md. Abdul Karim</p>
            </div>
            <div>
              <p className="text-muted-foreground">Developer</p>
              <p className="font-semibold">ABC Properties Ltd</p>
            </div>
            <div>
              <p className="text-muted-foreground">Total Units</p>
              <p className="font-semibold">{allUnits.length}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Agreed Split</p>
              <p className="font-semibold">
                <span className="text-amber-700">{agreedLandownerPct}%</span> /{" "}
                <span className="text-blue-700">{agreedDeveloperPct}%</span>
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Balance</p>
              {isBalanced ? (
                <Badge variant="outline" className="bg-emerald-100 text-emerald-700 border-emerald-300 gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Balanced
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-red-100 text-red-700 border-red-300 gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Imbalanced
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Running Totals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-amber-200 bg-amber-50/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-700 font-medium">Landowner Allocation</p>
                <p className="text-2xl font-bold text-amber-800">{landownerUnits.length} units</p>
                <p className="text-sm text-amber-600">{landownerPct}% of total &middot; {formatBDT(landownerValue)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Agreed: {agreedLandownerPct}%</p>
                <p className="text-xs text-muted-foreground">Actual: {landownerPct}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-blue-200 bg-blue-50/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-medium">Developer Allocation</p>
                <p className="text-2xl font-bold text-blue-800">{developerUnits.length} units</p>
                <p className="text-sm text-blue-600">{developerPct}% of total &middot; {formatBDT(developerValue)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Agreed: {agreedDeveloperPct}%</p>
                <p className="text-xs text-muted-foreground">Actual: {developerPct}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Unit Allocation Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            Unit Allocation
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Commercial */}
          <h4 className="text-sm font-medium mb-2 text-muted-foreground">Ground Floor — Commercial</h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Unit</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-center">Floor</TableHead>
                <TableHead className="text-right">Size (sft)</TableHead>
                <TableHead className="w-[180px]">Allocated To</TableHead>
                <TableHead className="text-right">Est. Value (BDT)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {commercialUnits.map((u) => (
                <TableRow key={u.unit}>
                  <TableCell className="font-mono text-sm">{u.unit}</TableCell>
                  <TableCell>{u.type}</TableCell>
                  <TableCell className="text-center">G</TableCell>
                  <TableCell className="text-right">{u.size.toLocaleString()}</TableCell>
                  <TableCell>
                    <Select defaultValue={u.allocatedTo}>
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Landowner" className="text-xs">Landowner</SelectItem>
                        <SelectItem value="Developer" className="text-xs">Developer</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">{formatBDT(u.estimatedValue)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Separator className="my-6" />

          {/* Residential */}
          <h4 className="text-sm font-medium mb-2 text-muted-foreground">Floors 1–10 — Residential</h4>
          <div className="max-h-[500px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Unit</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-center">Floor</TableHead>
                  <TableHead className="text-right">Size (sft)</TableHead>
                  <TableHead className="w-[180px]">Allocated To</TableHead>
                  <TableHead className="text-right">Est. Value (BDT)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {residentialUnits.map((u) => (
                  <TableRow
                    key={u.unit}
                    className={u.allocatedTo === "Landowner" ? "bg-amber-50/50" : ""}
                  >
                    <TableCell className="font-mono text-sm">{u.unit}</TableCell>
                    <TableCell>{u.type}</TableCell>
                    <TableCell className="text-center">{u.floor}</TableCell>
                    <TableCell className="text-right">{u.size.toLocaleString()}</TableCell>
                    <TableCell>
                      <Select defaultValue={u.allocatedTo}>
                        <SelectTrigger className={`h-8 text-xs ${u.allocatedTo === "Landowner" ? "border-amber-300" : ""}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Landowner" className="text-xs">Landowner</SelectItem>
                          <SelectItem value="Developer" className="text-xs">Developer</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">{formatBDT(u.estimatedValue)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Parking Allocation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Car className="h-4 w-4 text-muted-foreground" />
            Parking Spot Allocation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div className="p-3 rounded-md bg-amber-50 border border-amber-200">
              <span className="text-amber-700 font-medium">Landowner: {landownerParking.length} spots</span>
              <span className="text-amber-600 ml-2">({formatBDT(landownerParking.reduce((s, p) => s + p.value, 0))})</span>
            </div>
            <div className="p-3 rounded-md bg-blue-50 border border-blue-200">
              <span className="text-blue-700 font-medium">Developer: {developerParking.length} spots</span>
              <span className="text-blue-600 ml-2">({formatBDT(developerParking.reduce((s, p) => s + p.value, 0))})</span>
            </div>
          </div>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
            {parkingSpots.map((p) => (
              <div
                key={p.id}
                className={`p-2 rounded border text-center text-xs cursor-pointer transition-colors ${
                  p.allocatedTo === "Landowner"
                    ? "bg-amber-100 border-amber-300 text-amber-800"
                    : "bg-blue-50 border-blue-200 text-blue-700"
                }`}
              >
                <div className="font-mono font-medium">{p.id}</div>
                <div className="text-[10px] mt-0.5">{p.type === "Covered" ? "C" : "O"}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <div className="h-3 w-3 rounded bg-amber-100 border border-amber-300" /> Landowner
            </span>
            <span className="flex items-center gap-1">
              <div className="h-3 w-3 rounded bg-blue-50 border border-blue-200" /> Developer
            </span>
            <span>C = Covered (BDT 8L) &middot; O = Open (BDT 5L)</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
