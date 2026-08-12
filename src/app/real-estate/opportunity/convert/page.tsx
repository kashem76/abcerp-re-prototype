"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { formatNumber } from "@/lib/mock-data";

export default function ConvertOpportunityPage() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div>
        <Link
          href="/real-estate/opportunity"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-3"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Opportunity
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">
          Create Project from Opportunity
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Convert a qualified opportunity into an active project with proper
          accounting setup
        </p>
      </div>

      {/* Source */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">
            Source Opportunity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">OPP-00041</span>
                <Badge
                  variant="outline"
                  className="bg-emerald-100 text-emerald-700 border-emerald-300 text-xs"
                >
                  CONVERTED
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Nasirabad Residential Development &middot; 42 Katha &middot;
                Nasirabad, Chattogram
              </p>
            </div>
            <div className="text-right text-sm">
              <p className="text-muted-foreground">Est. Revenue</p>
              <p className="font-bold text-lg">95.0 Cr</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Details */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">
            Project Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                Project Code
              </label>
              <Input value="RE-00027" readOnly className="bg-muted/50" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                Project Name
              </label>
              <Input
                value="ABC Nasirabad Heights"
                readOnly
                className="bg-muted/50"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">
              Location
            </label>
            <Input
              value="Nasirabad R/A, Block-G, Chattogram"
              readOnly
              className="bg-muted/50"
            />
          </div>
        </CardContent>
      </Card>

      {/* Accounting Setup */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">
            Accounting Setup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">
              Responsibility Center
            </label>
            <div className="relative">
              <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring">
                <option>Project Operations</option>
                <option>Business Development</option>
                <option>Corporate</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                Default Cost Center
              </label>
              <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring">
                <option>ABC Nasirabad Heights</option>
                <option>Bay View Residence</option>
                <option>Green Valley Township</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                Profit Center
              </label>
              <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring">
                <option>ABC Nasirabad Heights</option>
                <option>Bay View Residence</option>
                <option>Green Valley Township</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pre-Development Cost Transfer */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">
            Pre-Development Cost Transfer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="transfer"
              defaultChecked
              className="h-4 w-4 rounded border-gray-300"
            />
            <label htmlFor="transfer" className="text-sm">
              Transfer pre-development costs to project
            </label>
            <span className="ml-auto font-semibold text-sm">
              BDT {formatNumber(350_000)}
            </span>
          </div>

          <Separator />

          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">
              Transfer Method
            </p>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="transfer-method"
                  value="capitalize"
                  className="h-4 w-4"
                />
                Capitalize to WIP
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="transfer-method"
                  value="reclassify"
                  defaultChecked
                  className="h-4 w-4"
                />
                Reclassify
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="transfer-method"
                  value="leave"
                  className="h-4 w-4"
                />
                Leave as expense
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Note */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Original opportunity expenses will NOT be
          deleted. Transfer creates new journal entries that reclassify the
          expense from the pre-development cost center to the project cost
          center.
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Link href="/real-estate/opportunity">
          <Button variant="outline">Cancel</Button>
        </Link>
        <Button>Create Project</Button>
      </div>
    </div>
  );
}
