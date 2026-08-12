"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { boqNewLine, formatNumber } from "@/lib/mock-data";
import {
  Calculator,
  Plus,
  Save,
  Layers,
  HardHat,
  Wrench,
  Info,
} from "lucide-react";

type RateLineItem = {
  item: string;
  coefficient: number;
  unit: string;
  rate: number;
  amount: number;
};

function RateSection({
  title,
  icon,
  color,
  items,
  subtotal,
  addLabel,
}: {
  title: string;
  icon: React.ReactNode;
  color: string;
  items: RateLineItem[];
  subtotal: number;
  addLabel: string;
}) {
  const [rows, setRows] = useState(items);

  const updateRow = (
    index: number,
    field: "coefficient" | "rate",
    value: string
  ) => {
    setRows((prev) => {
      const updated = [...prev];
      const numVal = parseFloat(value) || 0;
      updated[index] = {
        ...updated[index],
        [field]: numVal,
        amount: +(
          (field === "coefficient" ? numVal : updated[index].coefficient) *
          (field === "rate" ? numVal : updated[index].rate)
        ).toFixed(2),
      };
      return updated;
    });
  };

  const currentSubtotal = rows.reduce((sum, r) => sum + r.amount, 0);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            {icon}
            {title}
          </CardTitle>
          <Badge variant="outline" className={color}>
            Subtotal: BDT {currentSubtotal.toFixed(2)}
          </Badge>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="pt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[200px]">Item</TableHead>
              <TableHead className="text-right w-28">Coefficient</TableHead>
              <TableHead className="w-20">Unit</TableHead>
              <TableHead className="text-right w-32">Rate (BDT)</TableHead>
              <TableHead className="text-right w-32">Amount (BDT)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={i}>
                <TableCell className="text-sm font-medium">
                  {row.item}
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={row.coefficient}
                    onChange={(e) =>
                      updateRow(i, "coefficient", e.target.value)
                    }
                    className="h-8 text-sm text-right"
                    step="0.001"
                  />
                </TableCell>
                <TableCell className="text-sm text-gray-500">
                  {row.unit}
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={row.rate}
                    onChange={(e) => updateRow(i, "rate", e.target.value)}
                    className="h-8 text-sm text-right"
                  />
                </TableCell>
                <TableCell className="text-right font-mono text-sm font-medium">
                  {row.amount.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-gray-50 font-bold border-t-2">
              <TableCell colSpan={4} className="text-right text-sm">
                {title} Subtotal:
              </TableCell>
              <TableCell className="text-right font-mono text-sm">
                {currentSubtotal.toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="mt-3">
          <Button variant="ghost" size="sm" className="gap-1 text-xs">
            <Plus className="h-3 w-3" />
            {addLabel}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function RateAnalysisPage() {
  const { rateAnalysis } = boqNewLine;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Calculator className="h-6 w-6 text-gray-400" />
            Rate Analysis — RCC Column Work (per CFT)
          </h1>
          <p className="text-gray-500">
            Detailed cost breakdown per unit of work
          </p>
        </div>
      </div>

      {/* Material Section */}
      <RateSection
        title="MATERIAL"
        icon={<Layers className="h-4 w-4 text-blue-600" />}
        color="bg-blue-50 text-blue-700 border-blue-200"
        items={rateAnalysis.materials}
        subtotal={rateAnalysis.materialTotal}
        addLabel="Add Material"
      />

      {/* Labour Section */}
      <RateSection
        title="LABOUR"
        icon={<HardHat className="h-4 w-4 text-amber-600" />}
        color="bg-amber-50 text-amber-700 border-amber-200"
        items={rateAnalysis.labour}
        subtotal={rateAnalysis.labourTotal}
        addLabel="Add Labour"
      />

      {/* Equipment Section */}
      <RateSection
        title="EQUIPMENT"
        icon={<Wrench className="h-4 w-4 text-emerald-600" />}
        color="bg-emerald-50 text-emerald-700 border-emerald-200"
        items={rateAnalysis.equipment}
        subtotal={rateAnalysis.equipmentTotal}
        addLabel="Add Equipment"
      />

      {/* Summary */}
      <Card className="border-2 border-blue-200 bg-blue-50/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Calculator className="h-4 w-4 text-blue-600" />
            Rate Summary
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="max-w-md space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Material Total</span>
              <span className="font-mono font-medium">
                {rateAnalysis.materialTotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Labour Total</span>
              <span className="font-mono font-medium">
                {rateAnalysis.labourTotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Equipment Total</span>
              <span className="font-mono font-medium">
                {rateAnalysis.equipmentTotal.toFixed(2)}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                Overhead ({rateAnalysis.overheadPercent}%)
              </span>
              <span className="font-mono font-medium">
                {rateAnalysis.overhead.toFixed(2)}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span className="text-gray-900">TOTAL RATE PER CFT</span>
              <span className="font-mono text-blue-700">
                BDT {formatNumber(rateAnalysis.totalRate)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Note */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
        <Info className="h-5 w-5 text-amber-600 mt-0.5" />
        <p className="text-sm text-amber-800">
          Material items reference the existing Item master — no duplicate
          material records. Coefficients represent consumption per unit of output
          work.
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end">
        <Button className="gap-2">
          <Save className="h-4 w-4" />
          Save Rate Analysis
        </Button>
      </div>
    </div>
  );
}
