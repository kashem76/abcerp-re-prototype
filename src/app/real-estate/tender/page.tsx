"use client";

import { ArrowLeft, Award, RotateCcw } from "lucide-react";
import Link from "next/link";
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
import { tenderData, formatBDT, formatNumber } from "@/lib/mock-data";

export default function TenderPage() {
  const tender = tenderData;
  const contractors = tender.bids.map((b) => b.contractor);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/real-estate"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-3"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Dashboard
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">
                Tender &mdash; {tender.code}
              </h1>
              <Badge
                variant="outline"
                className="bg-amber-100 text-amber-700 border-amber-300"
              >
                {tender.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {tender.title}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="destructive" size="sm">
              Reject
            </Button>
            <Button variant="outline" size="sm">
              <RotateCcw className="mr-1 h-3 w-3" />
              Request Re-bid
            </Button>
            <Button size="sm">Approve CS</Button>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4 pb-4 px-4">
            <p className="text-xs font-medium text-muted-foreground">Project</p>
            <p className="text-sm font-semibold mt-1">{tender.project}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 px-4">
            <p className="text-xs font-medium text-muted-foreground">
              Estimated Value
            </p>
            <p className="text-lg font-bold mt-1">
              {formatBDT(tender.estimatedValue)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 px-4">
            <p className="text-xs font-medium text-muted-foreground">
              Open Date
            </p>
            <p className="text-sm font-semibold mt-1">{tender.openDate}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 px-4">
            <p className="text-xs font-medium text-muted-foreground">
              Close Date
            </p>
            <p className="text-sm font-semibold mt-1">{tender.closeDate}</p>
          </CardContent>
        </Card>
      </div>

      {/* Bids Summary */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            Bid Summary &amp; Scoring
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contractor</TableHead>
                <TableHead className="text-right">Bid Amount</TableHead>
                <TableHead className="text-right">Technical Score</TableHead>
                <TableHead className="text-right">Price Score</TableHead>
                <TableHead className="text-right">Weighted Total</TableHead>
                <TableHead className="text-center">Rank</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tender.bids.map((bid) => (
                <TableRow
                  key={bid.contractor}
                  className={bid.rank === 1 ? "bg-emerald-50" : ""}
                >
                  <TableCell className="text-sm font-medium">
                    {bid.rank === 1 && (
                      <Award className="inline mr-1.5 h-4 w-4 text-emerald-600" />
                    )}
                    {bid.contractor}
                  </TableCell>
                  <TableCell className="text-sm text-right">
                    {formatBDT(bid.bidAmount)}
                  </TableCell>
                  <TableCell className="text-sm text-right">
                    {bid.technicalScore}
                  </TableCell>
                  <TableCell className="text-sm text-right">
                    {bid.priceScore}
                  </TableCell>
                  <TableCell className="text-sm text-right font-semibold">
                    {bid.weightedTotal}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={bid.rank === 1 ? "default" : "secondary"}
                      className={
                        bid.rank === 1
                          ? "bg-emerald-600 hover:bg-emerald-700"
                          : ""
                      }
                    >
                      #{bid.rank}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Line-Level Comparison */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            Line-Level Rate Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>UOM</TableHead>
                <TableHead className="text-right">Est. Rate</TableHead>
                {contractors.map((c) => (
                  <TableHead key={c} className="text-right text-xs">
                    {c.replace("M/S ", "")}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {tender.lineComparison.map((line) => {
                const minBid = Math.min(...line.bids);
                const maxBid = Math.max(...line.bids);
                return (
                  <TableRow key={line.item}>
                    <TableCell className="text-sm font-medium">
                      {line.item}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {line.uom}
                    </TableCell>
                    <TableCell className="text-sm text-right">
                      {formatNumber(line.estimatedRate)}
                    </TableCell>
                    {line.bids.map((rate, i) => (
                      <TableCell
                        key={i}
                        className={`text-sm text-right font-medium ${
                          rate === minBid
                            ? "text-emerald-600 bg-emerald-50"
                            : rate === maxBid
                            ? "text-red-600 bg-red-50"
                            : ""
                        }`}
                      >
                        {formatNumber(rate)}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recommendation */}
      <Card className="border-emerald-200 bg-emerald-50">
        <CardContent className="pt-4 pb-4 flex items-center gap-4">
          <Award className="h-8 w-8 text-emerald-600 flex-shrink-0" />
          <div>
            <p className="font-semibold text-emerald-900">
              Recommended: M/S Reliable Construction
            </p>
            <p className="text-sm text-emerald-700 mt-0.5">
              Highest weighted score (89.2) combining technical capability (85)
              and competitive pricing (BDT 14.3 Cr). Proven track record with
              prior ABC projects.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
