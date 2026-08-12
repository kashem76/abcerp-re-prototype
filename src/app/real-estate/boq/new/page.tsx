"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { boqNewLine, formatNumber } from "@/lib/mock-data";
import {
  ChevronRight,
  Calculator,
  FileSpreadsheet,
  Ruler,
  DollarSign,
  Save,
  Plus,
  ExternalLink,
} from "lucide-react";

export default function BOQNewLinePage() {
  const { measurement, rateAnalysis } = boqNewLine;
  const totalAmount = measurement.totalQty * rateAnalysis.totalRate;

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-sm text-gray-500">
        <span>BOQ</span>
        <ChevronRight className="h-3 w-3" />
        <span className="text-gray-900 font-medium">New Line</span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FileSpreadsheet className="h-6 w-6 text-gray-400" />
            Add BOQ Line
          </h1>
          <p className="text-gray-500">
            Create a new BOQ line item with measurement and rate analysis
          </p>
        </div>
      </div>

      {/* Section 1: Location */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <span className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              1
            </span>
            Location
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                WBS Node
              </label>
              <div className="border rounded-md px-3 py-2 bg-gray-50 text-sm">
                <span className="text-gray-500">Tower A</span>
                <ChevronRight className="h-3 w-3 inline mx-1 text-gray-400" />
                <span className="text-gray-500">Structure</span>
                <ChevronRight className="h-3 w-3 inline mx-1 text-gray-400" />
                <span className="font-medium text-gray-900">RCC Column</span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                Cost Code
              </label>
              <div className="border rounded-md px-3 py-2 bg-gray-50 text-sm font-mono">
                {boqNewLine.costCode}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                Phase
              </label>
              <div className="border rounded-md px-3 py-2 bg-gray-50 text-sm">
                Structure
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Item */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <span className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              2
            </span>
            Item
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                BOQ Master Item
              </label>
              <div className="border rounded-md px-3 py-2 bg-gray-50 text-sm">
                BOQ-003: {boqNewLine.item}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                  Description
                </label>
                <Input
                  defaultValue="RCC Column Work with mix ratio 1:1.5:3 using OPC 53 Grade cement, Sylhet sand, and 3/4 inch stone aggregate"
                  className="text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                  Specification
                </label>
                <Input
                  defaultValue="M20 grade concrete, 60 Grade TMT rebar, minimum 28-day strength 20 N/mm2"
                  className="text-sm"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 3: Quantity */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <span className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              3
            </span>
            Quantity
            <Ruler className="h-4 w-4 text-gray-400" />
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Calculated from measurement sheet
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">
                  {formatNumber(measurement.totalQty)}
                </span>
                <span className="text-lg text-gray-500">{measurement.uom}</span>
              </div>
            </div>
            <Button variant="outline" className="gap-2">
              <a href="/real-estate/boq/measurement">
                <ExternalLink className="h-4 w-4" />
                Open Measurement Sheet
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Section 4: Rate */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <span className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              4
            </span>
            Rate
            <DollarSign className="h-4 w-4 text-gray-400" />
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Calculated from rate analysis
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-sm text-gray-500">BDT</span>
                <span className="text-3xl font-bold text-gray-900">
                  {formatNumber(rateAnalysis.totalRate)}
                </span>
                <span className="text-lg text-gray-500">
                  / {measurement.uom}
                </span>
              </div>
            </div>
            <Button variant="outline" className="gap-2">
              <a href="/real-estate/boq/rate-analysis">
                <ExternalLink className="h-4 w-4" />
                Open Rate Analysis
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Section 5: Summary */}
      <Card className="border-2 border-blue-200 bg-blue-50/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Calculator className="h-4 w-4 text-blue-600" />
            Summary
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="flex items-center gap-6 mb-4">
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Quantity
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {formatNumber(measurement.totalQty)}
              </p>
              <p className="text-xs text-gray-400">{measurement.uom}</p>
            </div>
            <span className="text-2xl text-gray-300 font-light">&times;</span>
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Rate
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {formatNumber(rateAnalysis.totalRate)}
              </p>
              <p className="text-xs text-gray-400">BDT / {measurement.uom}</p>
            </div>
            <span className="text-2xl text-gray-300 font-light">=</span>
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Amount
              </p>
              <p className="text-2xl font-bold text-blue-700">
                BDT {formatNumber(totalAmount)}
              </p>
            </div>
          </div>
          <Separator className="my-4" />
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">
              Rate Source
            </label>
            <div className="border rounded-md px-3 py-2 bg-white text-sm w-64">
              <select className="w-full bg-transparent outline-none text-gray-700">
                <option>Rate Analysis</option>
                <option>Market Rate</option>
                <option>Historical</option>
                <option>Quotation</option>
                <option>Lump Sum</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 justify-end">
        <Button variant="outline" className="gap-2">
          <Save className="h-4 w-4" />
          Save Draft
        </Button>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add to BOQ
        </Button>
      </div>
    </div>
  );
}
