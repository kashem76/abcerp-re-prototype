"use client";

import Link from "next/link";
import {
  MapPin,
  CheckCircle2,
  XCircle,
  Clock,
  FileText,
  ArrowLeft,
} from "lucide-react";
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
import { landLeadDetail, formatBDT } from "@/lib/mock-data";

const ddStatusColor: Record<string, string> = {
  PASSED: "bg-emerald-100 text-emerald-700 border-emerald-300",
  PENDING: "bg-yellow-100 text-yellow-700 border-yellow-300",
  FAILED: "bg-red-100 text-red-700 border-red-300",
};

export default function LandLeadDetailPage() {
  const lead = landLeadDetail;

  return (
    <div className="space-y-6">
      {/* Back + Header */}
      <div>
        <Link
          href="/real-estate/land-leads"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-3"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Land Pipeline
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">{lead.id}</h1>
              <Badge
                variant="outline"
                className="bg-emerald-100 text-emerald-700 border-emerald-300"
              >
                CONVERTED
              </Badge>
            </div>
            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {lead.location} &middot; {lead.area} {lead.areaUnit}
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/real-estate/opportunity">
              <Button>Create Opportunity</Button>
            </Link>
            <Button variant="destructive">Reject Lead</Button>
          </div>
        </div>
      </div>

      {/* Land Info, Owner Info, Price Info */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Land Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">District</span>
              <span className="font-medium">{lead.district}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Thana</span>
              <span className="font-medium">{lead.thana}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Mouza</span>
              <span className="font-medium">{lead.mouza}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Khatian No</span>
              <span className="font-medium">{lead.khatianNo}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Dag No</span>
              <span className="font-medium">{lead.dagNo}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Owner Info</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Owner</TableHead>
                  <TableHead className="text-xs text-right">Share %</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lead.parcels.map((p) => (
                  <TableRow key={p.code}>
                    <TableCell className="text-sm">{p.owner}</TableCell>
                    <TableCell className="text-sm text-right font-medium">
                      {p.sharePercent}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Price Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Estimated Price</span>
              <span className="font-bold text-lg">
                {formatBDT(lead.estimatedPrice)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Source</span>
              <span className="font-medium">{lead.source}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Source Name</span>
              <span className="font-medium">{lead.sourceName}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Due Diligence */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            Due Diligence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Check Item</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lead.dueDiligence.checks.map((check, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">
                      {check.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{check.item}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`text-xs ${ddStatusColor[check.status] ?? ""}`}
                    >
                      {check.status === "PASSED" && (
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                      )}
                      {check.status === "PENDING" && (
                        <Clock className="mr-1 h-3 w-3" />
                      )}
                      {check.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Documents */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="text-center">Verified</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lead.documents.map((doc, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">
                      {doc.type.replace(/_/g, " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    <div className="flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                      {doc.title}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {doc.verified ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-400 mx-auto" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Site Visits */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Site Visits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {lead.siteVisits.map((visit, i) => (
              <Card key={i} className="border">
                <CardContent className="pt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">{visit.date}</span>
                    <Badge
                      variant="outline"
                      className="bg-emerald-100 text-emerald-700 border-emerald-300 text-xs"
                    >
                      {visit.recommendation}
                    </Badge>
                  </div>
                  <Separator />
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Visited By</span>
                      <span className="font-medium">{visit.visitedBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Purpose</span>
                      <span className="font-medium">{visit.purpose}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground bg-muted/50 rounded-md p-3">
                    {visit.findings}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
