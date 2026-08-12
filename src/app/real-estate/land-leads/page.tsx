"use client";

import Link from "next/link";
import { Plus, MapPin, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { landLeads, formatBDT } from "@/lib/mock-data";

const statusColor: Record<string, string> = {
  NEW: "bg-gray-100 text-gray-700 border-gray-300",
  QUALIFIED: "bg-blue-100 text-blue-700 border-blue-300",
  SITE_VISITED: "bg-purple-100 text-purple-700 border-purple-300",
  CONVERTED: "bg-emerald-100 text-emerald-700 border-emerald-300",
  REJECTED: "bg-red-100 text-red-700 border-red-300",
};

const summaryCards = [
  { label: "Total Leads", value: 6, color: "text-slate-900" },
  { label: "New", value: 1, color: "text-gray-600" },
  { label: "Qualified", value: 2, color: "text-blue-600" },
  { label: "Site Visited", value: 1, color: "text-purple-600" },
  { label: "Converted", value: 1, color: "text-emerald-600" },
  { label: "Rejected", value: 1, color: "text-red-600" },
];

export default function LandLeadsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Land Pipeline</h1>
          <p className="text-sm text-muted-foreground">
            Track land acquisition leads from discovery to conversion
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Lead
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {summaryCards.map((card) => (
          <Card key={card.label}>
            <CardContent className="pt-4 pb-4 px-4 text-center">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {card.label}
              </p>
              <p className={`text-2xl font-bold mt-1 ${card.color}`}>
                {card.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">All Leads</CardTitle>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-3 w-3" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Mouza</TableHead>
                <TableHead className="text-right">Area</TableHead>
                <TableHead className="text-right">Est. Price</TableHead>
                <TableHead className="text-right">Price/Katha</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead className="text-right">Days in Pipeline</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {landLeads.map((lead) => (
                <TableRow key={lead.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell>
                    <Link
                      href={`/real-estate/land-leads/${lead.id}`}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      {lead.id}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm">{lead.location}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{lead.mouza}</TableCell>
                  <TableCell className="text-right text-sm">
                    {lead.area} {lead.areaUnit}
                  </TableCell>
                  <TableCell className="text-right text-sm font-medium">
                    {formatBDT(lead.estimatedPrice)}
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    {formatBDT(lead.pricePerKatha)}
                  </TableCell>
                  <TableCell className="text-sm">
                    {lead.source.replace(/_/g, " ")}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`text-xs ${statusColor[lead.status] ?? ""}`}
                    >
                      {lead.status.replace(/_/g, " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{lead.assignedTo}</TableCell>
                  <TableCell className="text-right text-sm">
                    {lead.daysInPipeline}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
