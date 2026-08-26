"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft, Layers, Plus, ArrowRight, Info,
} from "lucide-react";

const BASE = "/real-estate/settings/land-evaluation";

interface FrameworkRow {
  id: string;
  name: string;
  description: string | null;
  isDefault: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  sections: {
    id: string;
    category: { name: string };
    _count: { criteria: number };
  }[];
}

export default function FrameworkListClient({ frameworks }: { frameworks: FrameworkRow[] }) {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <Link
          href={BASE}
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-2"
        >
          <ChevronLeft className="h-4 w-4" /> Land Evaluation Settings
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Layers className="h-7 w-7 text-purple-600" />
            <div>
              <h1 className="text-2xl font-bold">Evaluation Frameworks</h1>
              <p className="text-muted-foreground">
                Define the overall evaluation structure for each land type.
              </p>
            </div>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> New Framework
          </Button>
        </div>
      </div>

      {/* Framework Cards */}
      <div className="space-y-4">
        {frameworks.map((fw) => {
          const totalCriteria = fw.sections.reduce((sum, s) => sum + s._count.criteria, 0);
          return (
            <Card
              key={fw.id}
              className={`hover:border-primary/40 transition-colors ${fw.isDefault ? "border-purple-300" : ""}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    {fw.name}
                    {fw.isDefault && (
                      <Badge className="bg-purple-100 text-purple-800 text-[10px]">Default</Badge>
                    )}
                  </CardTitle>
                  <Badge className={fw.active ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-600"}>
                    {fw.active ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{fw.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold">{fw.sections.length}</p>
                    <p className="text-xs text-muted-foreground">Sections</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold">{totalCriteria}</p>
                    <p className="text-xs text-muted-foreground">Criteria</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold">{fw.sections.length}</p>
                    <p className="text-xs text-muted-foreground">Workflow Steps</p>
                  </div>
                </div>

                {/* Section Breakdown */}
                <div className="flex flex-wrap gap-2">
                  {fw.sections.map((s) => (
                    <Badge key={s.id} variant="outline" className="text-xs font-normal">
                      {s.category.name} <span className="ml-1 text-muted-foreground">{s._count.criteria}</span>
                    </Badge>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-muted-foreground">
                    Last modified: {new Date(fw.updatedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                  </span>
                  <Link href={`${BASE}/frameworks/${fw.id}`}>
                    <Button variant="outline" size="sm" className="gap-1">
                      Open <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Info */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardContent className="pt-4 flex gap-3">
          <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800">
            Each framework defines sections, criteria, team assignments, workflow, scoring rules, and report structure.
            When evaluation starts on a land lead, the selected framework generates all work packages automatically.
            The default framework is pre-selected but can be changed per land.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
