"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft, MapPin, Info, CheckCircle2, ArrowRight,
  Calendar, FolderOpen, ClipboardList,
} from "lucide-react";

export default function AddLandPage() {
  const [saved, setSaved] = useState(false);

  if (saved) return <PostSaveGuidance />;

  return (
    <div className="space-y-6 p-6 max-w-2xl">
      {/* Header */}
      <div>
        <Link
          href="/real-estate/land-leads"
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-2"
        >
          <ChevronLeft className="h-4 w-4" /> Land Pipeline
        </Link>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
            <MapPin className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Add Land</h1>
            <p className="text-sm text-muted-foreground">Record a new land opportunity for evaluation.</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div>
            <label className="text-sm font-medium">Land Name *</label>
            <Input placeholder="e.g., Gulshan Plot 07" className="mt-1" />
          </div>

          <div>
            <label className="text-sm font-medium">Location *</label>
            <Input placeholder="e.g., Gulshan, Dhaka" className="mt-1" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Approx. Area</label>
              <div className="flex gap-2 mt-1">
                <Input type="number" placeholder="32" className="max-w-24" />
                <Select defaultValue="katha">
                  <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="katha">Katha</SelectItem>
                    <SelectItem value="decimal">Decimal</SelectItem>
                    <SelectItem value="bigha">Bigha</SelectItem>
                    <SelectItem value="sqft">Sq Ft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Expected Price</label>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-muted-foreground">৳</span>
                <Input type="number" placeholder="450000000" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Owner / Contact</label>
              <Input placeholder="Owner name" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Source</label>
              <Select>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Select source" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="broker">Broker</SelectItem>
                  <SelectItem value="direct">Direct Owner</SelectItem>
                  <SelectItem value="auction">Auction</SelectItem>
                  <SelectItem value="referral">Referral</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Assigned To</label>
            <Select>
              <SelectTrigger className="mt-1"><SelectValue placeholder="Select team member" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="rahim">Rahim</SelectItem>
                <SelectItem value="kamal">Kamal</SelectItem>
                <SelectItem value="sumon">Sumon</SelectItem>
                <SelectItem value="nadia">Nadia</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Notes</label>
            <Textarea placeholder="Any initial observations or context..." className="mt-1" rows={3} />
          </div>
        </CardContent>
      </Card>

      {/* Info */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardContent className="py-4 flex gap-3">
          <Info className="h-5 w-5 text-blue-600 shrink-0" />
          <p className="text-sm text-blue-800">
            After saving, a workspace is created for this land with initial assessment steps
            generated from the configured workflow template.
          </p>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Link href="/real-estate/land-leads">
          <Button variant="outline">Cancel</Button>
        </Link>
        <Button onClick={() => setSaved(true)}>Create Land</Button>
      </div>
    </div>
  );
}

// ─── Post-Save Guidance ────────────────────────────────────────

function PostSaveGuidance() {
  return (
    <div className="space-y-6 p-6 max-w-2xl">
      {/* Success */}
      <Card className="border-emerald-300 bg-emerald-50/30">
        <CardContent className="py-6 text-center space-y-2">
          <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto" />
          <h2 className="text-xl font-bold text-emerald-800">Land Created</h2>
          <p className="text-sm text-emerald-700">Gulshan Plot 07</p>
          <p className="text-xs text-muted-foreground">
            A workspace has been created. Initial selection criteria are ready for evaluation.
          </p>
        </CardContent>
      </Card>

      {/* Recommended Next Step */}
      <Card className="border-blue-200 bg-blue-50/30">
        <CardContent className="py-5">
          <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-3">Recommended Next Step</p>
          <Link href="/real-estate/land-leads/LL-2026-001">
            <div className="flex items-center justify-between bg-white rounded-lg border p-4 hover:border-blue-300 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-blue-100 flex items-center justify-center">
                  <ClipboardList className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Complete Initial Selection</p>
                  <p className="text-xs text-muted-foreground">Quick screening to qualify or reject this land before detailed evaluation.</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-blue-600" />
            </div>
          </Link>
        </CardContent>
      </Card>

      {/* Alternative Actions */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Or</p>
        <div className="grid grid-cols-3 gap-3">
          <Card className="hover:border-primary/30 transition-colors cursor-pointer">
            <CardContent className="py-4 text-center">
              <Calendar className="h-5 w-5 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm font-medium">Schedule Site Visit</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Before screening</p>
            </CardContent>
          </Card>
          <Card className="hover:border-primary/30 transition-colors cursor-pointer">
            <CardContent className="py-4 text-center">
              <FolderOpen className="h-5 w-5 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm font-medium">Add Documents</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Title, photos, maps</p>
            </CardContent>
          </Card>
          <Link href="/real-estate/land-leads/LL-2026-001">
            <Card className="hover:border-primary/30 transition-colors cursor-pointer h-full">
              <CardContent className="py-4 text-center">
                <MapPin className="h-5 w-5 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-medium">Open Workspace</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">View full details</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Back to pipeline */}
      <div className="flex justify-between pt-2">
        <Link href="/real-estate/land-leads">
          <Button variant="outline" className="gap-2">
            <ChevronLeft className="h-4 w-4" /> Back to Pipeline
          </Button>
        </Link>
        <Link href="/real-estate/land-leads/new">
          <Button variant="outline">Add Another Land</Button>
        </Link>
      </div>
    </div>
  );
}
