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
import { Ruler, Plus, Save, ArrowLeft } from "lucide-react";

export default function MeasurementSheetPage() {
  const { measurement } = boqNewLine;

  const [rows, setRows] = useState(
    measurement.lines.map((line) => ({
      ...line,
    }))
  );

  const computeQty = (row: (typeof rows)[0]) =>
    +(row.nos * row.length * row.breadth * row.height).toFixed(2);

  const totalQty = rows.reduce((sum, row) => sum + computeQty(row), 0);

  const updateRow = (
    index: number,
    field: keyof (typeof rows)[0],
    value: string
  ) => {
    setRows((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: field === "description" ? value : parseFloat(value) || 0,
      };
      return updated;
    });
  };

  const addRow = () => {
    setRows((prev) => [
      ...prev,
      { description: "", nos: 0, length: 0, breadth: 0, height: 0, qty: 0 },
    ]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Ruler className="h-6 w-6 text-gray-400" />
            Measurement Sheet — RCC Column Work
          </h1>
          <p className="text-gray-500">
            Detailed measurements for quantity calculation
          </p>
        </div>
        <Badge
          variant="outline"
          className="bg-amber-50 text-amber-700 border-amber-200 text-sm px-3 py-1"
        >
          Formula: {measurement.formula}
        </Badge>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">
            Measurement Lines — {measurement.uom}
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-8">#</TableHead>
                <TableHead className="min-w-[200px]">Description</TableHead>
                <TableHead className="text-right w-24">Nos</TableHead>
                <TableHead className="text-right w-28">Length (ft)</TableHead>
                <TableHead className="text-right w-28">Breadth (ft)</TableHead>
                <TableHead className="text-right w-28">Height (ft)</TableHead>
                <TableHead className="text-right w-32">
                  Quantity ({measurement.uom})
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, i) => {
                const qty = computeQty(row);
                return (
                  <TableRow key={i}>
                    <TableCell className="text-gray-400 text-sm">
                      {i + 1}
                    </TableCell>
                    <TableCell>
                      <Input
                        value={row.description}
                        onChange={(e) =>
                          updateRow(i, "description", e.target.value)
                        }
                        className="h-8 text-sm"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={row.nos}
                        onChange={(e) => updateRow(i, "nos", e.target.value)}
                        className="h-8 text-sm text-right"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={row.length}
                        onChange={(e) => updateRow(i, "length", e.target.value)}
                        className="h-8 text-sm text-right"
                        step="0.01"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={row.breadth}
                        onChange={(e) =>
                          updateRow(i, "breadth", e.target.value)
                        }
                        className="h-8 text-sm text-right"
                        step="0.01"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={row.height}
                        onChange={(e) => updateRow(i, "height", e.target.value)}
                        className="h-8 text-sm text-right"
                        step="0.01"
                      />
                    </TableCell>
                    <TableCell className="text-right font-bold font-mono text-sm">
                      {formatNumber(qty)}
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow className="border-t-2 bg-gray-50 font-bold">
                <TableCell colSpan={6} className="text-right text-sm">
                  Total Quantity:
                </TableCell>
                <TableCell className="text-right font-mono text-lg text-blue-700">
                  {formatNumber(totalQty)} {measurement.uom}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <Button variant="outline" className="gap-2">
          <a href="/real-estate/boq/new">
            <ArrowLeft className="h-4 w-4" />
            Back to BOQ Line
          </a>
        </Button>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2" onClick={addRow}>
            <Plus className="h-4 w-4" />
            Add Row
          </Button>
          <Button className="gap-2">
            <Save className="h-4 w-4" />
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
