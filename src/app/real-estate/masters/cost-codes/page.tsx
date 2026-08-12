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
import { Tags, Plus, Pencil, Trash2, Info } from "lucide-react";

const costCodes = [
  { code: "FND-EARTH", name: "Earthwork", category: "Foundation", glAccount: "5010-01", status: "Active" },
  { code: "FND-RCC", name: "RCC Foundation", category: "Foundation", glAccount: "5010-02", status: "Active" },
  { code: "FND-PILE", name: "Pile Work", category: "Foundation", glAccount: "5010-03", status: "Active" },
  { code: "STR-RCC", name: "RCC Structural", category: "Structure", glAccount: "5020-01", status: "Active" },
  { code: "STR-BRICK", name: "Brickwork", category: "Structure", glAccount: "5020-02", status: "Active" },
  { code: "STR-REBAR", name: "Reinforcement Steel", category: "Structure", glAccount: "5020-03", status: "Active" },
  { code: "MEP-ELECT", name: "Electrical", category: "MEP", glAccount: "5030-01", status: "Active" },
  { code: "MEP-PLUMB", name: "Plumbing", category: "MEP", glAccount: "5030-02", status: "Active" },
  { code: "MEP-HVAC", name: "HVAC", category: "MEP", glAccount: "5030-03", status: "Active" },
  { code: "MEP-FIRE", name: "Fire Fighting", category: "MEP", glAccount: "5030-04", status: "Active" },
  { code: "FIN-PLSTR", name: "Plastering", category: "Finishing", glAccount: "5040-01", status: "Active" },
  { code: "FIN-TILE", name: "Tiling", category: "Finishing", glAccount: "5040-02", status: "Active" },
  { code: "FIN-PAINT", name: "Painting", category: "Finishing", glAccount: "5040-03", status: "Active" },
  { code: "FIN-DOOR", name: "Doors & Windows", category: "Finishing", glAccount: "5040-04", status: "Active" },
  { code: "EXT-LAND", name: "Landscaping", category: "External", glAccount: "5050-01", status: "Active" },
  { code: "EXT-ROAD", name: "Internal Roads", category: "External", glAccount: "5050-02", status: "Active" },
  { code: "GEN-SITE", name: "Site Establishment", category: "General", glAccount: "5060-01", status: "Active" },
  { code: "GEN-OVER", name: "Project Overhead", category: "General", glAccount: "5060-02", status: "Active" },
];

const categories = [
  "Foundation",
  "Structure",
  "MEP",
  "Finishing",
  "External",
  "General",
];

const categoryColors: Record<string, string> = {
  Foundation: "bg-amber-100 text-amber-800",
  Structure: "bg-blue-100 text-blue-800",
  MEP: "bg-purple-100 text-purple-800",
  Finishing: "bg-emerald-100 text-emerald-800",
  External: "bg-teal-100 text-teal-800",
  General: "bg-gray-100 text-gray-800",
};

export default function CostCodesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Tags className="h-6 w-6 text-gray-400" />
            Cost Code Master
          </h1>
          <p className="text-gray-500">
            Standardized cost classification for project accounting
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Cost Code
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">
              All Cost Codes ({costCodes.length})
            </CardTitle>
            <div className="flex items-center gap-2">
              {categories.map((cat) => (
                <Badge
                  key={cat}
                  variant="outline"
                  className={`text-xs ${categoryColors[cat]}`}
                >
                  {cat} (
                  {costCodes.filter((c) => c.category === cat).length})
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
                <TableHead className="w-32">Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="w-28">Category</TableHead>
                <TableHead className="w-28">GL Account</TableHead>
                <TableHead className="w-20">Status</TableHead>
                <TableHead className="w-28 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => {
                const items = costCodes.filter(
                  (c) => c.category === category
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
                      {item.glAccount}
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
          Cost codes are seeded automatically when the Real Estate industry pack
          is activated. Each cost code maps to a GL account for automatic
          financial posting.
        </p>
      </div>
    </div>
  );
}
