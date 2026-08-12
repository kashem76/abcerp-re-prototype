"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatNumber } from "@/lib/mock-data";
import { Package, Plus, Pencil, Trash2, Info } from "lucide-react";

const boqMasterItems = [
  { code: "BOQ-001", name: "Excavation", category: "Earthwork", costCode: "FND-EARTH", uom: "CFT", defaultRate: 45, linkedItem: "-", status: "Active" },
  { code: "BOQ-002", name: "Pile Work (RCC)", category: "Earthwork", costCode: "FND-PILE", uom: "NOS", defaultRate: 28000, linkedItem: "-", status: "Active" },
  { code: "BOQ-003", name: "RCC Column Work (1:1.5:3)", category: "RCC Work", costCode: "STR-RCC", uom: "CFT", defaultRate: 634, linkedItem: "Cement/Sand/Aggregate", status: "Active" },
  { code: "BOQ-004", name: "RCC Beam Work", category: "RCC Work", costCode: "STR-RCC", uom: "CFT", defaultRate: 610, linkedItem: "-", status: "Active" },
  { code: "BOQ-005", name: "Brickwork (5\" wall)", category: "Brickwork", costCode: "STR-BRICK", uom: "SFT", defaultRate: 85, linkedItem: "Brick", status: "Active" },
  { code: "BOQ-006", name: "Internal Plastering", category: "Finishing", costCode: "FIN-PLSTR", uom: "SFT", defaultRate: 35, linkedItem: "Cement", status: "Active" },
  { code: "BOQ-007", name: "Floor Tiling", category: "Finishing", costCode: "FIN-TILE", uom: "SFT", defaultRate: 120, linkedItem: "-", status: "Active" },
  { code: "BOQ-008", name: "Electrical Wiring (per unit)", category: "MEP", costCode: "MEP-ELECT", uom: "UNIT", defaultRate: 45000, linkedItem: "-", status: "Active" },
];

const categories = ["Earthwork", "RCC Work", "Brickwork", "MEP", "Finishing"];

const categoryColors: Record<string, string> = {
  Earthwork: "bg-amber-100 text-amber-800",
  "RCC Work": "bg-blue-100 text-blue-800",
  Brickwork: "bg-orange-100 text-orange-800",
  MEP: "bg-purple-100 text-purple-800",
  Finishing: "bg-emerald-100 text-emerald-800",
};

export default function BOQItemsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Package className="h-6 w-6 text-gray-400" />
            BOQ Item Master
          </h1>
          <p className="text-gray-500">
            Standardized bill of quantities item catalog
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add BOQ Item
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">
              All BOQ Items ({boqMasterItems.length})
            </CardTitle>
            <div className="flex items-center gap-2">
              {categories.map((cat) => (
                <Badge
                  key={cat}
                  variant="outline"
                  className={`text-xs ${categoryColors[cat]}`}
                >
                  {cat} (
                  {boqMasterItems.filter((i) => i.category === cat).length})
                </Badge>
              ))}
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="w-24">Category</TableHead>
                <TableHead className="w-28">Default Cost Code</TableHead>
                <TableHead className="w-16">UOM</TableHead>
                <TableHead className="text-right w-28">Default Rate</TableHead>
                <TableHead className="w-40">Linked Item</TableHead>
                <TableHead className="w-20">Status</TableHead>
                <TableHead className="w-24 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => {
                const items = boqMasterItems.filter(
                  (i) => i.category === category
                );
                return items.map((item, i) => (
                  <TableRow
                    key={item.code}
                    className={i === 0 ? "border-t-2" : ""}
                  >
                    <TableCell className="font-mono text-sm font-medium">
                      {item.code}
                    </TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={`text-xs ${categoryColors[item.category]}`}
                      >
                        {item.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm text-gray-500">
                      {item.costCode}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {item.uom}
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm">
                      {formatNumber(item.defaultRate)}
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {item.linkedItem === "-" ? (
                        <span className="text-gray-300">-</span>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                        >
                          {item.linkedItem}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-emerald-100 text-emerald-800 text-xs">
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0"
                        >
                          <Pencil className="h-3.5 w-3.5 text-gray-500" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0"
                        >
                          <Trash2 className="h-3.5 w-3.5 text-red-400" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ));
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <Info className="h-5 w-5 text-blue-600 mt-0.5" />
        <p className="text-sm text-blue-800">
          BOQ items reference existing Item master for materials — no
          duplication. The &quot;Linked Item&quot; column shows which Item master
          records are consumed when this BOQ item is used.
        </p>
      </div>
    </div>
  );
}
