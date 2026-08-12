"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Database, Plus, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { formatNumber } from "@/lib/mock-data";

const templates = [
  { code: "RAT-001", name: "RCC Column Work (1:1.5:3)", boqItem: "RCC Column Work", uom: "CFT", totalRate: 634, materials: 5, labour: 2, equipment: 1, status: "ACTIVE" },
  { code: "RAT-002", name: "RCC Beam Work (1:1.5:3)", boqItem: "RCC Beam Work", uom: "CFT", totalRate: 610, materials: 5, labour: 2, equipment: 1, status: "ACTIVE" },
  { code: "RAT-003", name: "RCC Slab Work (1:2:4)", boqItem: "RCC Slab Work", uom: "SFT", totalRate: 450, materials: 4, labour: 2, equipment: 2, status: "ACTIVE" },
  { code: "RAT-004", name: "Brickwork 5\" Wall", boqItem: "Brickwork", uom: "SFT", totalRate: 85, materials: 3, labour: 2, equipment: 0, status: "ACTIVE" },
  { code: "RAT-005", name: "Internal Plastering (1:4)", boqItem: "Internal Plastering", uom: "SFT", totalRate: 35, materials: 2, labour: 2, equipment: 0, status: "ACTIVE" },
  { code: "RAT-006", name: "Floor Tiling (Homogeneous)", boqItem: "Floor Tiling", uom: "SFT", totalRate: 120, materials: 3, labour: 2, equipment: 0, status: "ACTIVE" },
  { code: "RAT-007", name: "Earthwork Excavation", boqItem: "Excavation", uom: "CFT", totalRate: 45, materials: 0, labour: 2, equipment: 1, status: "ACTIVE" },
  { code: "RAT-008", name: "Pile Work (RCC Bored)", boqItem: "Pile Work", uom: "NOS", totalRate: 28000, materials: 4, labour: 3, equipment: 2, status: "ACTIVE" },
];

export default function RateTemplatesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Database className="h-6 w-6 text-gray-400" />
            Rate Analysis Templates
          </h1>
          <p className="text-gray-500">Reusable rate breakdowns for BOQ items — material, labour, equipment, overhead</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> New Template
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{templates.length} Rate Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Template Name</TableHead>
                <TableHead>BOQ Item</TableHead>
                <TableHead className="text-center">UOM</TableHead>
                <TableHead className="text-right">Total Rate (BDT)</TableHead>
                <TableHead className="text-center">Materials</TableHead>
                <TableHead className="text-center">Labour</TableHead>
                <TableHead className="text-center">Equipment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templates.map((t) => (
                <TableRow key={t.code}>
                  <TableCell className="font-mono text-sm">{t.code}</TableCell>
                  <TableCell className="font-medium">
                    <Link href="/real-estate/boq/rate-analysis" className="text-blue-600 hover:underline">
                      {t.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">{t.boqItem}</TableCell>
                  <TableCell className="text-center">{t.uom}</TableCell>
                  <TableCell className="text-right font-mono font-semibold">{formatNumber(t.totalRate)}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline">{t.materials}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline">{t.labour}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline">{t.equipment}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-emerald-100 text-emerald-800">{t.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button variant="ghost" size="sm"><Pencil className="h-3 w-3" /></Button>
                      <Button variant="ghost" size="sm" className="text-red-500"><Trash2 className="h-3 w-3" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-700">
        <p className="font-medium text-blue-800">How Rate Templates Work</p>
        <p className="mt-1">Each template breaks down a unit rate into material, labour, and equipment components. When creating a BOQ line, you can pull a rate from a template — or enter manually. Templates are reusable across projects.</p>
        <p className="mt-1">Material lines reference the existing Item master. No duplicate material records.</p>
      </div>
    </div>
  );
}
